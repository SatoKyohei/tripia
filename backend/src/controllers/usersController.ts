import { PrismaClient, User } from "@prisma/client";
import { Body, Controller, Get, Path, Post, Response, Route } from "tsoa";
import { ValidateErrorJSON } from "../types/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { tokenBlacklist } from "..";

const prisma = new PrismaClient();

type UserCreationParams = Pick<User, "email" | "name" | "password">;
type LoginParams = Pick<User, "email" | "password">;

@Route("users")
export class UsersController extends Controller {
    // ユーザー情報の取得
    @Response<ValidateErrorJSON>(404, "User Not Found")
    @Get("{userId}")
    public async getUser(@Path() userId: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { userId },
        });
    }

    // 新規ユーザー登録
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @Response<ValidateErrorJSON>(409, "Conflict")
    @Post("register")
    public async createUser(
        @Body() requestBody: UserCreationParams,
    ): Promise<{ message: string; details?: any } | void> {
        const { email, name, password } = requestBody;

        // ユーザーが作成済みかどうかチェック
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            this.setStatus(409);
            return {
                message: "メールアドレスは既に存在します",
                details: { email: "このメールアドレスは既に登録されています。" },
            };
        }

        // パスワードをハッシュ化し、ユーザー作成
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            this.setStatus(201);
            return { message: "ユーザーの作成に成功しました" };
        } catch (error) {
            console.error(error);
            this.setStatus(500);
            return { message: "ユーザーの作成に失敗しました" };
        }
    }

    // ログイン
    @Response<ValidateErrorJSON>(404, "User Not Found")
    @Response<ValidateErrorJSON>(401, "Invalid Password")
    @Post("login")
    public async loginUser(
        @Body() requestBody: LoginParams,
    ): Promise<{ token?: string; userId?: string; message?: string } | null> {
        const { email, password } = requestBody;

        // ユーザー情報取得・存在チェック
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            this.setStatus(404);
            return { message: "ユーザーが見つかりません" };
        }

        // パスワード照合・妥当性チェック
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            this.setStatus(401);
            return { message: "無効なパスワードです" };
        }

        // トークン生成
        const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
            expiresIn: "1h",
        });

        this.setStatus(200);
        return { token, userId: user.userId };
    }

    // ログアウト
    @Post("logout")
    public async logoutUser(
        @Body() requestBody: { token: string },
    ): Promise<{ message?: string } | void> {
        const { token } = requestBody;

        if (token) {
            tokenBlacklist.add(token);
            this.setStatus(200);
            return;
        }
        this.setStatus(400);
        return { message: "トークンが提供されていません" };
    }
}

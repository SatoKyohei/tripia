import { User } from "@prisma/client";
import { prisma } from "../lib/PrismaClient";
import { Body, Controller, Get, Path, Post, Response, Route } from "tsoa";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { ValidateErrorJSON } from "../types/types";

type UserCreationParams = Pick<User, "name" | "email" | "password">;
type LoginParams = Pick<User, "email" | "password">;

@Route("users")
export class UsersController extends Controller {
    // ユーザー情報取得
    @Response<ValidateErrorJSON>(404, "Users Not Found")
    @Get("{userId}")
    public async getUser(@Path() userId: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { userId },
        });
    }

    // ユーザー作成
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @Response<ValidateErrorJSON>(409, "Conflict")
    @Post("register")
    public async createUser(
        @Body() requestBody: UserCreationParams,
    ): Promise<{ message: string; details?: any } | void> {
        const { email, name, password } = requestBody;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            this.setStatus(409);
            return {
                message: "メールアドレスは既に存在します",
                details: { email: "このメールアドレスは既に登録されています。" },
            };
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                },
            });
            this.setStatus(201);
        } catch (error) {
            console.error(error);
            this.setStatus(500);
            return { message: "ユーザーの作成に失敗しました" };
        }
    }

    // ログイン処理
    @Response<ValidateErrorJSON>(404, "User Not Found")
    @Response<ValidateErrorJSON>(401, "Invalid Password")
    @Post("login")
    public async loginUser(
        @Body() requestBody: LoginParams,
    ): Promise<{ token?: string; userId?: string; message?: string } | null> {
        const { email, password } = requestBody;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            this.setStatus(404);
            return { message: "ユーザーが見つかりません。" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            this.setStatus(401);
            return { message: "無効なパスワードです。" };
        }

        const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: "1h" });

        // 課題：Secure;を入れた方が良いが、入れるとHTTPSじゃないと通信できなくなる。開発環境ではhttpだと思うので今は外している。
        this.setHeader("Set-Cookie", `token=${token}; HttpOnly; SameSite=Strict; Path=/`);

        this.setStatus(200);
        return { token, userId: user.userId };
    }

    // ログアウト
    @Post("logout")
    public async logoutUser(): Promise<{ message?: string } | void> {
        // 課題：Secure;を入れた方が良いが、入れるとHTTPSじゃないと通信できなくなる。開発環境ではhttpだと思うので今は外している。
        this.setHeader(
            "Set-Cookie",
            `token=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`,
        );
        this.setStatus(400);
        return { message: "トークンが提供されていません" };
    }
}

import { Body, Controller, Get, Path, Post, Response, Route } from "tsoa";

import { User } from "../types/userTypes";
import { ValidateErrorJSON } from "../types/validationTypes";
import { createUser, authenticateUser } from "../services/userService";
import { HTTP_STATUS } from "../types/httpStatusTypes";
import prisma from "../lib/PrismaClient";
import { tokenBlacklist } from "../lib/TokenBlackList";

type UserCreationParams = Pick<User, "email" | "name" | "password">;
type LoginParams = Pick<User, "email" | "password">;

@Route("users")
export class UsersController extends Controller {
    // ユーザー情報の取得
    @Response<ValidateErrorJSON>(HTTP_STATUS.NOT_FOUND, "User Not Found")
    @Get("{userId}")
    public async getUser(@Path() userId: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { userId },
        });
    }

    // 新規ユーザー登録
    @Response<ValidateErrorJSON>(HTTP_STATUS.UNPROCESSABLE_ENTITY, "Validation Failed")
    @Response<ValidateErrorJSON>(HTTP_STATUS.CONFLICT, "Conflict")
    @Post("register")
    public async createUser(
        @Body() requestBody: UserCreationParams,
    ): Promise<{ message: string; details?: User } | void> {
        try {
            const user = await createUser(requestBody);
            this.setStatus(HTTP_STATUS.CREATED);
            return { message: "ユーザーが作成されました", details: user };
        } catch (error) {
            console.error(error);
            this.setStatus(HTTP_STATUS.CONFLICT);
            return { message: (error as Error).message };
        }
    }

    // ログイン
    @Response<ValidateErrorJSON>(HTTP_STATUS.NOT_FOUND, "User Not Found")
    @Response<ValidateErrorJSON>(HTTP_STATUS.UNAUTHORIZED, "Invalid Password")
    @Post("login")
    public async login(
        @Body() requestBody: LoginParams,
    ): Promise<{ token: string } | { message?: string }> {
        try {
            const token = await authenticateUser(requestBody);
            this.setStatus(HTTP_STATUS.OK);
            return { token };
        } catch (error) {
            console.error(error);
            this.setStatus(HTTP_STATUS.UNAUTHORIZED);
            return { message: (error as Error).message };
        }
    }

    // ログアウト
    @Post("logout")
    public async logoutUser(
        @Body() requestBody: { token: string },
    ): Promise<{ message?: string } | void> {
        const { token } = requestBody;

        if (token) {
            tokenBlacklist.add(token);
            this.setStatus(HTTP_STATUS.OK);
            return;
        }
        this.setStatus(HTTP_STATUS.BAD_REQUEST);
        return { message: "トークンが提供されていません" };
    }
}

import { PrismaClient, User } from "@prisma/client";
import { Controller, Get, Request, Response, Route, Security } from "tsoa";
import { ValidateErrorJSON } from "../types/types";
import { AuthenticateRequest } from "../middleware/authenticate";

const prisma = new PrismaClient();

@Route("dashboard")
@Security("jwt")
export class DashboardController extends Controller {
    @Response<ValidateErrorJSON>(404, "User Not Found")
    @Get()
    public async getProfile(
        @Request() req: AuthenticateRequest,
    ): Promise<User | { message: string }> {
        try {
            const userId = req.user?.userId;
            const user = await prisma.user.findUnique({
                where: {
                    userId,
                },
            });

            if (!user) {
                this.setStatus(404);
                throw new Error("ユーザーが存在しません");
            }

            this.setStatus(200);
            return user;
        } catch (error) {
            console.error(error);
            this.setStatus(500);
            throw new Error("ユーザー取得に失敗しました");
        }
    }
}

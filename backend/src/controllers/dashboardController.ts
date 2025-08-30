import { Controller, Get, Request, Response, Route, Security } from "tsoa";
import { User } from "@prisma/client";

import { ValidateErrorJSON } from "../types/validationTypes";
import { AuthenticateRequest } from "../middleware/authenticate";
import { getUserProfile } from "../services/dashboardService";
import { HTTP_STATUS } from "../types/httpStatusTypes";

@Route("dashboard")
@Security("jwt")
export class DashboardController extends Controller {
    @Response<ValidateErrorJSON>(HTTP_STATUS.NOT_FOUND, "User Not Found")
    @Get()
    public async getProfile(
        @Request() req: AuthenticateRequest,
    ): Promise<User | { message: string }> {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                this.setStatus(HTTP_STATUS.BAD_REQUEST);
                throw new Error("ユーザーIDが提供されていません");
            }

            const user = await getUserProfile(userId);

            this.setStatus(HTTP_STATUS.OK);
            return user;
        } catch (error) {
            console.error(error);
            this.setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            throw new Error("ユーザー取得に失敗しました");
        }
    }
}

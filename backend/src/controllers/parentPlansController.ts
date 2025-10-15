import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Request,
    Response,
    Route,
    Security,
} from "tsoa";

import { ValidateErrorJSON } from "../types/validationTypes";
import { AuthenticateRequest } from "../middleware/authenticate";
import { parentPlanService } from "../services/parentPlanService";
import { ParentAndChildPlan, ParentPlan } from "../types/planTypes";
import { HTTP_STATUS } from "../types/httpStatusTypes";

@Route("plans")
@Security("jwt")
export class ParentPlansController extends Controller {
    // 共通関数: userIdの取得とエラーハンドリング
    private getUserIdOrThrow(request: AuthenticateRequest): string {
        const userId = request.user?.userId;
        if (!userId) {
            throw new Error("Unauthorized");
        }
        return userId;
    }

    // すべての親プランを取得
    @Response<ValidateErrorJSON>(HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error")
    @Get()
    public async getAllParentPlans(
        @Request() request: AuthenticateRequest,
    ): Promise<ParentPlan[] | { message: string }> {
        try {
            const userId = this.getUserIdOrThrow(request);

            const parentPlans = await parentPlanService.getAllParentPlans(userId);
            return parentPlans;
        } catch (error) {
            this.setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            console.error(error);
            return { message: "Failed to retrieve plans" };
        }
    }

    // 特定の親プランとその子プランを取得
    @Response<ValidateErrorJSON>(HTTP_STATUS.BAD_REQUEST, "Plan Not Found")
    @Get("{parentPlanId}")
    public async getPlans(
        @Path() parentPlanId: string,
        @Request() request: AuthenticateRequest,
    ): Promise<ParentAndChildPlan> {
        try {
            this.getUserIdOrThrow(request);

            const parentAndChildPlans =
                await parentPlanService.getParentAndChildPlans(parentPlanId);

            this.setStatus(HTTP_STATUS.OK);
            return parentAndChildPlans;
        } catch (error) {
            this.setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            console.error(error);
            throw new Error("プランの取得に失敗しました");
        }
    }

    // 親プランの作成
    @Response<ValidateErrorJSON>(HTTP_STATUS.BAD_REQUEST, "Invalid requests")
    @Response<ValidateErrorJSON>(HTTP_STATUS.UNAUTHORIZED, "Unauthorized")
    @Post("create")
    public async createParentPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: ParentPlan,
    ): Promise<{ message?: string; parentPlanId?: string }> {
        try {
            const userId = this.getUserIdOrThrow(request);

            const newParentPlan = await parentPlanService.createParentPlan(userId, requestBody);
            this.setStatus(HTTP_STATUS.CREATED);
            return { message: "", parentPlanId: newParentPlan.parentPlanId };
        } catch (error) {
            this.setStatus(HTTP_STATUS.BAD_REQUEST);
            console.error(error);
            return { message: (error as Error).message };
        }
    }

    // 親プランの更新
    @Response<ValidateErrorJSON>(HTTP_STATUS.BAD_REQUEST, "Invalid requests")
    @Response<ValidateErrorJSON>(HTTP_STATUS.UNAUTHORIZED, "Unauthorized")
    @Put("update")
    public async updateParentPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: ParentPlan,
    ): Promise<{ message?: string } | void> {
        try {
            const userId = this.getUserIdOrThrow(request);
            await parentPlanService.updateParentPlan(userId, requestBody);
            this.setStatus(HTTP_STATUS.CREATED);
        } catch (error) {
            this.setStatus(HTTP_STATUS.BAD_REQUEST);
            console.error(error);
            return { message: (error as Error).message };
        }
    }

    // 親プランの削除（紐づく子プランも削除）
    @Response<ValidateErrorJSON>(HTTP_STATUS.BAD_REQUEST, "Invalid requests")
    @Response<ValidateErrorJSON>(HTTP_STATUS.UNAUTHORIZED, "Unauthorized")
    @Delete("{parentPlanId}/delete")
    public async deleteParentPlan(
        @Request() request: AuthenticateRequest,
        parentPlanId: string,
    ): Promise<{ message?: string } | void> {
        try {
            this.getUserIdOrThrow(request);
            await parentPlanService.deleteParentPlan(parentPlanId);
            this.setStatus(HTTP_STATUS.OK);
        } catch (error) {
            this.setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            console.error(error);
            return { message: "Failed to delete plan" };
        }
    }

    // 親プランの複製
    @Response<ValidateErrorJSON>(HTTP_STATUS.BAD_REQUEST, "Invalid requests")
    @Response<ValidateErrorJSON>(HTTP_STATUS.UNAUTHORIZED, "Unauthorized")
    @Post("duplicate")
    public async duplicateParentPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: { parentPlanId: string },
    ): Promise<{ message?: string }> {
        try {
            this.getUserIdOrThrow(request);
            const { parentPlanId } = requestBody;
            await parentPlanService.duplicateParentPlan(parentPlanId);
            return { message: "Successfully duplicated Parent plan" };
        } catch (error) {
            this.setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            console.error(error);
            return { message: "Failed to duplicate ParentPlan" };
        }
    }
}

import {
    Body,
    Controller,
    Delete,
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
import { childPlanService } from "../services/childPlanService";
import { ChildPlan } from "../types/planTypes";
import { HTTP_STATUS } from "../types/httpStatusTypes";

@Route("child-plans")
@Security("jwt")
export class ChildrenPlanController extends Controller {
    // 共通関数: userIdの取得とエラーハンドリング
    private getUserIdOrThrow(request: AuthenticateRequest): string {
        const userId = request.user?.userId;
        if (!userId) {
            throw new Error("Unauthorized");
        }
        return userId;
    }

    // 子プランの作成
    @Response<ValidateErrorJSON>(HTTP_STATUS.BAD_REQUEST, "Invalid Requests")
    @Response<ValidateErrorJSON>(HTTP_STATUS.UNAUTHORIZED, "Unauthorized")
    @Post("create")
    public async createChildPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: ChildPlan,
    ): Promise<{ message?: string } | { message?: string; newChildPlan: ChildPlan } | void> {
        try {
            const userId = this.getUserIdOrThrow(request);
            const newChildPlan = await childPlanService.createChildPlan(userId, requestBody);

            this.setStatus(HTTP_STATUS.OK);
            return { message: "Successfully created child plan", newChildPlan };
        } catch (error) {
            this.setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            console.error(error);
            return { message: "Failed to create plans" };
        }
    }

    // 子プランの更新
    @Response<ValidateErrorJSON>(HTTP_STATUS.BAD_REQUEST, "Invalid Requests")
    @Response<ValidateErrorJSON>(HTTP_STATUS.UNAUTHORIZED, "Unauthorized")
    @Put("update")
    public async updateChildPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: ChildPlan,
    ): Promise<{ message?: string } | void> {
        try {
            this.getUserIdOrThrow(request);
            await childPlanService.updateChildPlan(requestBody);

            this.setStatus(HTTP_STATUS.OK);
            return { message: "Successfully updated child plan" };
        } catch (error) {
            this.setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            console.error(error);
            return { message: "Failed to update plans" };
        }
    }

    // 子プランの削除
    @Response<ValidateErrorJSON>(HTTP_STATUS.BAD_REQUEST, "Invalid Requests")
    @Response<ValidateErrorJSON>(HTTP_STATUS.UNAUTHORIZED, "Unauthorized")
    @Delete("{childPlanId}")
    public async deleteChildPlan(
        @Request() request: AuthenticateRequest,
        @Path() childPlanId: string,
    ): Promise<
        { message?: string } | { message?: string; remainingChildPlans: ChildPlan[] } | void
    > {
        try {
            this.getUserIdOrThrow(request);

            const remainingChildPlans = await childPlanService.deleteChildPlan(childPlanId);

            return { message: "Successfully deleted child plans", remainingChildPlans };
        } catch (error) {
            this.setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            console.error(error);
            return { message: "Failed to retrieve plans" };
        }
    }

    // 子プランの複製（同じ親プラン内で）
    @Response<ValidateErrorJSON>(HTTP_STATUS.BAD_REQUEST, "Invalid Requests")
    @Response<ValidateErrorJSON>(HTTP_STATUS.UNAUTHORIZED, "Unauthorized")
    @Post("{childPlanId}/duplicate")
    public async duplicateChildPlan(
        @Request() request: AuthenticateRequest,
        @Path() childPlanId: string,
    ): Promise<{ message?: string } | { message?: string; newChildPlan: ChildPlan } | void> {
        try {
            this.getUserIdOrThrow(request);

            const newChildPlan =
                await childPlanService.duplicateChildPlanToSameParentPlan(childPlanId);

            this.setStatus(HTTP_STATUS.OK);
            return { message: "Successfully duplicated child plans", newChildPlan };
        } catch (error) {
            this.setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            console.error(error);
            return { message: "Failed to duplicate child plan" };
        }
    }
}

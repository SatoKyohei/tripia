import { Controller, FormField, Post, Response, Route, UploadedFile } from "tsoa";

import { ValidateErrorJSON } from "../types/validationTypes";
import { uploadImageAndSave } from "../services/uploadService";
import { HTTP_STATUS } from "../types/httpStatusTypes";

@Route("upload")
export class UploadController extends Controller {
    // AWS S3へのアップロード
    @Response<ValidateErrorJSON>(HTTP_STATUS.NOT_FOUND, "User Not Found")
    @Post()
    public async uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @FormField() parentPlanId: string,
    ): Promise<{ url: string } | { error: string }> {
        if (!file) {
            this.setStatus(HTTP_STATUS.BAD_REQUEST);
            return { error: "No file uploaded" };
        }

        try {
            const url = await uploadImageAndSave(file, parentPlanId);
            this.setStatus(HTTP_STATUS.OK);
            return { url };
        } catch (error) {
            console.error(error);
            this.setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            return { error: (error as Error).message };
        }
    }
}

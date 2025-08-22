import { Controller, FormField, Post, Response, Route, UploadedFile } from "tsoa";
import { ValidateErrorJSON } from "../types/types";
import { uploadImageToS3 } from "../services/s3Service";
import { savePlanImage } from "../services/planService";

@Route("upload")
export class UploadController extends Controller {
    // AWS S3へのアップロード
    @Response<ValidateErrorJSON>(404, "User Not Found")
    @Post()
    public async uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @FormField() parentPlanId: string,
    ) {
        if (!file) {
            this.setStatus(400);
            return { error: "No file uploaded" };
        }

        // S3にアップデート
        const url = await uploadImageToS3(file);

        // DBにURL保存
        await savePlanImage(parentPlanId, url);

        return { url };
    }
}

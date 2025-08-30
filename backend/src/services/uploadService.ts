import prisma from "../lib/PrismaClient";
import { uploadImageToS3 } from "../services/s3Service";

/**
 * プランの画像を保存するサービス関数
 * @param planId プランID
 * @param imageURL 画像のURL
 * @returns 更新されたプラン情報
 */
const savePlanImage = async (planId: string, imageURL: string) => {
    return await prisma.parentPlan.update({
        where: {
            parentPlanId: planId,
        },
        data: { planThumbnail: imageURL },
    });
};

/**
 * 画像をアップロードし、データベースに保存するサービス関数
 * @param file アップロードされたファイル
 * @param parentPlanId 親プランID
 * @returns アップロードされた画像のURL
 */
export const uploadImageAndSave = async (
    file: Express.Multer.File,
    parentPlanId: string,
): Promise<string> => {
    if (!file) {
        throw new Error("ファイルがアップロードされていません");
    }

    // S3にアップロード
    const url = await uploadImageToS3(file);

    // データベースに保存
    await savePlanImage(parentPlanId, url);

    return url;
};

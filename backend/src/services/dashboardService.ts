import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * ユーザープロファイルを取得するサービス関数
 * @param userId ユーザーID
 * @returns ユーザー情報またはエラーメッセージ
 */
export const getUserProfile = async (userId: string): Promise<User | { message: string }> => {
    const user = await prisma.user.findUnique({
        where: {
            userId,
        },
    });

    if (!user) {
        throw new Error("ユーザーが存在しません");
    }

    return user;
};

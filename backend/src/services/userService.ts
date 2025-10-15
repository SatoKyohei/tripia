import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../types/userTypes";
import { SECRET_KEY } from "../config";
import prisma from "../lib/PrismaClient";

const SALT_ROUNDS = 10;

type UserCreationParams = Pick<User, "email" | "name" | "password">;
type LoginParams = Pick<User, "email" | "password">;

/**
 * ユーザーを作成するサービス関数
 * @param params ユーザー作成パラメータ
 * @returns 作成結果
 */
export const createUser = async (params: UserCreationParams): Promise<User> => {
    const { email, name, password } = params;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("メールアドレスは既に存在します");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return await prisma.user.create({
        data: { email, name, password: hashedPassword },
    });
};

/**
 * ユーザーを認証するサービス関数
 * @param params ログインパラメータ
 * @returns トークン
 */
export const authenticateUser = async (params: LoginParams): Promise<string> => {
    const { email, password } = params;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("認証に失敗しました");
    }

    return jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: "12h" });
};

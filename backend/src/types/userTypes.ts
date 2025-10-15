export interface User {
    name: string;
    userId: string;
    email: string;
    password: string;
    profileThumbnail: Uint8Array<ArrayBufferLike> | null;
    loginAttempts: number;
    lastLoginAt: Date | null;
    isGoogleAccount: boolean;
    createdAt: Date;
    updatedAt: Date;
}

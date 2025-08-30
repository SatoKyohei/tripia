// HTTP ステータスコードを定義する定数オブジェクト
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
} as const;

// HTTP ステータスコードの型
export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

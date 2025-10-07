// 画像アップロード用の型定義
// parentPlanId: 親プランのID
// file: アップロードする画像ファイル
type UploadImage = {
    parentPlanId: string;
    file: File;
};

// 画像をアップロードする関数
// 引数: parentPlanId（親プランのID）、file（アップロードする画像ファイル）
// 戻り値: アップロードされた画像のURL
export const uploadImage = async ({ parentPlanId, file }: UploadImage) => {
    if (!file) return; // ファイルが存在しない場合は処理を中断

    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentPlanId", String(parentPlanId));

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("アップロードに失敗しました");
        }

        const data = await response.json();
        return data.url; // アップロードされた画像のURLを返す
    } catch (error) {
        console.error("画像アップロードエラー:", error);
    }
};

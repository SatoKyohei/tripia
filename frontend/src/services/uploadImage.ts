type UploadImage = {
    parentPlanId: string;
    file: File;
};

export const uploadImage = async ({ parentPlanId, file }: UploadImage) => {
    if (!file) return;

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
        return data.url;
    } catch (error) {
        console.error(error);
    }
};

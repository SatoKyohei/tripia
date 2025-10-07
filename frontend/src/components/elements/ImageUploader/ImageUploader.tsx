"use client";
import Image from "next/image";
import React from "react";
import { Box } from "@mui/material";

import { uploadImage } from "@/services/uploadImageApi";
import Button from "@/components/elements/Button/Button";

type ImageUploaderProps = {
    parentPlanId?: string;
    imageURL: string | null;
    setImageURL: (value: string | null) => void;
    autoUpload?: boolean;
    onFileSelect?: (file: File) => void;
};

const ImageUploader = ({
    parentPlanId,
    imageURL,
    setImageURL,
    autoUpload = false,
    onFileSelect,
}: ImageUploaderProps) => {
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setImageURL(URL.createObjectURL(selectedFile)); // 一時プレビュー用URL

        // 作成ページ用：即時アップロードしない
        if (!autoUpload) {
            onFileSelect?.(selectedFile);
            return;
        }

        // 詳細ページ用：即時アップロード
        if (parentPlanId) {
            const uploadUrl = await uploadImage({ parentPlanId, file: selectedFile });
            if (uploadUrl) setImageURL(uploadUrl);
        }
    };

    return (
        <div>
            {imageURL && (
                <Box sx={{ mt: 2, mb: 2 }}>
                    <Image
                        src={imageURL}
                        alt="サムネイル画像"
                        width={500}
                        height={300}
                        style={{
                            objectFit: "cover",
                            borderRadius: "12px",
                            width: "100%",
                            height: "auto",
                        }}
                    />
                </Box>
            )}
            <Button variant="contained" component="label">
                画像をアップロード
                <input type="file" hidden onChange={handleChange} accept="image/*" />
            </Button>
        </div>
    );
};

export default ImageUploader;

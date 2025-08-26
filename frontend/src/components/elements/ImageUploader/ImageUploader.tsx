"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { uploadImage } from "@/services/uploadImage";

type ImageUploaderProps = {
    parentPlanId?: string;
    imageURL: string | null;
    setImageURL: (value: string | null) => void;
    autoUpload: boolean;
    onFileSelect?: (file: File) => void;
};

const ImageUploader = ({
    parentPlanId,
    imageURL,
    setImageURL,
    autoUpload,
    onFileSelect,
}: ImageUploaderProps) => {
    const [file, setFile] = useState<File | null>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setImageURL(URL.createObjectURL(selectedFile)); // 一時プレビュー用URL

        if (!autoUpload) {
            onFileSelect?.(selectedFile);
            return;
        }

        // 詳細ページ：即アップロード
        if (parentPlanId) {
            const uploadUrl = await uploadImage({ parentPlanId, file: selectedFile });
            if (uploadUrl) setImageURL(uploadUrl);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleChange} accept="image/*" />
            {imageURL && (
                <Box sx={{ mt: 2 }}>
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
        </div>
    );
};

export default ImageUploader;

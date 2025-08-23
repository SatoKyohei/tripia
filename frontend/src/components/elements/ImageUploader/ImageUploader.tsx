"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { uploadImage } from "@/services/uploadImage";

type ImageUploaderProps = {
    parentPlanId: string;
    setFile: (file: File | null) => void;
    imageURL: string | null;
    setImageURL: (value: string | null) => void;
};

const ImageUploader = ({ parentPlanId, setFile, imageURL, setImageURL }: ImageUploaderProps) => {
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setImageURL(URL.createObjectURL(selectedFile)); // 一時プレビュー用URL

        const uploadUrl = await uploadImage({ parentPlanId, file: selectedFile });
        if (uploadUrl) setImageURL(uploadUrl);
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
                        style={{ objectFit: "cover", borderRadius: "12px" }}
                    />
                </Box>
            )}
        </div>
    );
};

export default ImageUploader;

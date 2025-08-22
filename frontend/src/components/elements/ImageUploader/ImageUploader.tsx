"use client";
import Image from "next/image";
import React, { useState } from "react";
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
            {imageURL && <Image src={imageURL} alt="preview" width={500} height={500} />}
        </div>
    );
};

export default ImageUploader;

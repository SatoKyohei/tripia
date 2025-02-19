import { CloudUpload } from "@mui/icons-material";
import BasicButton from "@/components/elements/Button/Basic/BasicButton";

const ImageUploadButton = () => {
    return (
        <BasicButton
            buttonName="画像をアップロード"
            component="label"
            startIcon={<CloudUpload />}
            variant="contained"
        />
    );
};

export default ImageUploadButton;

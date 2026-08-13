import { useState } from "react";
import { checkError } from "../utils/checkError";
import * as imageApi from "../api/endpoints/image.api";
import { ImagePickerAsset } from "expo-image-picker";
import { UploadImageResponse } from "../types/api";

export default function useImageAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    /**
     * @throws {Error} Si le téléversement échoue.
     */
    const uploadImage = async (imageFile: ImagePickerAsset): Promise<UploadImageResponse> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            return await imageApi.uploadImage(
                imageFile,
                (await imageApi.fetchImgDirectUploadUrl()).uploadURL
            );
        } catch (e) {
            setErrorMessage(checkError(e as Error));
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        errorMessage,
        uploadImage
    };
}

import { useState } from "react";
import * as imageApi from "../api/endpoints/image.api";
import { ImagePickerAsset } from "expo-image-picker";

export default function useImageAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Téléverse une image et retourne son identifiant Cloudflare.
     *
     * @throws {Error} Si le téléversement échoue.
     */
    const uploadImage = async (imageFile: ImagePickerAsset): Promise<string> => {
        setIsLoading(true);

        try {
            const { id, uploadURL } = await imageApi.fetchImgDirectUploadUrl();
            const response = await imageApi.uploadImage(imageFile, uploadURL);

            return response.result?.id ?? id;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        uploadImage
    };
}

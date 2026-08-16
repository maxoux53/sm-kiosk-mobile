import { useState } from "react";
import { checkError } from "../utils/checkError";
import * as imageApi from "../api/endpoints/image.api";
import { ImagePickerAsset } from "expo-image-picker";

export default function useImageAPI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    /**
     * Téléverse une image et retourne son identifiant Cloudflare.
     *
     * @throws {Error} Si le téléversement échoue.
     */
    const uploadImage = async (imageFile: ImagePickerAsset): Promise<string> => {
        setIsLoading(true);
        setErrorMessage(undefined);
        
        try {
            const { id, uploadURL } = await imageApi.fetchImgDirectUploadUrl();
            const response = await imageApi.uploadImage(imageFile, uploadURL);

            return response.result?.id ?? id;
        } catch (e) {
            const msgStaleClosure = checkError(e as Error);
            setErrorMessage(msgStaleClosure);
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

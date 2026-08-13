import { apiClient } from "../client";
import { ImagePickerAsset } from "expo-image-picker";
import axios, { AxiosError } from "axios";
import { ImageUploadUrl, UploadImageResponse } from "../../types/api";

/**
 * @throws {AxiosError} Si la requête échoue.
 */
export const fetchImgDirectUploadUrl = async (): Promise<ImageUploadUrl> => {
    return (await apiClient.get<ImageUploadUrl>(
        "img-upload"
    )).data;
};

/**
 * @throws {AxiosError} Si le téléversement échoue.
 */
export const uploadImage = async (imageFile: ImagePickerAsset, directUploadUrl: string): Promise<UploadImageResponse> => {
    const formData = new FormData();

    formData.append("file", {
        uri: imageFile.uri,
        name: imageFile.fileName,
        type: imageFile.mimeType,
    } as unknown as Blob);

    const response = await axios.post<UploadImageResponse>(
        directUploadUrl,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

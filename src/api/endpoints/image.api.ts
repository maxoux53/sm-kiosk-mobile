import { apiClient } from "../client";
import { ImagePickerAsset } from "expo-image-picker";
import axios from "axios";
import { ImageUploadUrl, UploadImageResponse } from "../../types/api";

const requestImgDirectUploadUrl = async (): Promise<string> => {
    const response = await apiClient.get<ImageUploadUrl>(
        "img-upload"
    );

    return response.data.uploadURL;
};

export const uploadImage = async (imageFile: ImagePickerAsset): Promise<UploadImageResponse> => {
    const formData = new FormData();

    formData.append("file", {
        uri: imageFile.uri,
        name: imageFile.fileName,
        type: imageFile.mimeType,
    } as unknown as Blob);

    const response = await axios.post<UploadImageResponse>(
        await requestImgDirectUploadUrl(),
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

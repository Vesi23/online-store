import { ref } from "firebase/storage";
import { storage } from "../config/firebase-config";
import { deleteObject, getDownloadURL, listAll, uploadBytes } from "firebase/storage";

// Upload файл
export const uploadFile = async (file: File, path: string): Promise<string> => {
    try {
        const storageRef = ref(storage, path);
        // Provide contentType metadata so Storage sets correct MIME type
        const metadata = { contentType: file.type || 'application/octet-stream' };
        const snapshot = await uploadBytes(storageRef, file, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;

    } catch (error) {
        console.error('Error uploading file:', error);
        try {
            // Some Firebase errors include extra data in nested properties — log them if present
            const anyErr: any = error;
            if (anyErr.serverResponse) console.error('Firebase serverResponse:', anyErr.serverResponse);
            if (anyErr.customData) console.error('Firebase customData:', anyErr.customData);
            // Dump full error object (including non-enumerable properties) for debugging
            console.error('Full error details:', JSON.stringify(Object.getOwnPropertyNames(anyErr).reduce((acc: any, key) => {
                acc[key] = anyErr[key];
                return acc;
            }, {}), null, 2));
        } catch (logErr) {
            console.error('Error while logging upload error details:', logErr);
        }
        throw error;
    }
}

// Upload image за продукт
export const uploadProductImage = async (file: File, productId: string): Promise<string> => {
    const timestamp = Date.now();
    const path = `products/${productId}/${timestamp}_${file.name}`;
    return uploadFile(file, path);
}

// Upload general image
export const uploadImage = async (file: File, folder: string = "images"): Promise<string> => {
    const timestamp = Date.now();
    const path = `${folder}/${timestamp}_${file.name}`;
    return uploadFile(file, path);
}

// Delete файл
export const deleteFile = async (fileUrl: string): Promise<void> => {
    try {
        const fileRef = ref(storage, fileUrl);
        await deleteObject(fileRef);

    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
}

// Get all files from folder
export const getAllFilesFromFolder = async (folderPath: string): Promise<string[]> => {
    try {
        const folderRef = ref(storage, folderPath);
        const result = await listAll(folderRef);
        const urls = await Promise.all(
            result.items.map(item => getDownloadURL(item))
        );
        return urls;
    } catch (error) {
        console.error('Error getting files:', error);
        throw error;
    }
}
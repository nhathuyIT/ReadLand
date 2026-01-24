import type { CreatePostInput, Post } from "@/types/post.type";
import axios from "axios";

const DEVMOCK_API = import.meta.env.VITE_DEVMOCK_API;
const api = axios.create({
    baseURL: DEVMOCK_API,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Get posts by user ID
 * Used in My Posts page to fetch user's own posts
 */
export async function getPostsByUserId(userId: string): Promise<Post[]> {
    const { data } = await api.get<Post[]>("/post", {
        params: { userId },
    });
    return data.filter((post) => String(post.userId) === String(userId));
}

/**
 * Create a new post
 * Used in My Posts page when user creates a post
 */
export async function createPost(
    post: CreatePostInput & { userId: string },
): Promise<Post> {
    const { data } = await api.post<Post>("/post", {
        ...post,
        slug: post.title.toLowerCase().replace(/\s+/g, "-"),
        view: 0,
        createdAt: post.createdAt || new Date().toISOString(),
        updatedAt: post.updatedAt || new Date().toISOString(),
    });
    return data;
}

/**
 * Update an existing post
 * Used in My Posts page when user edits their post
 */
export async function updatePost(
    id: string,
    post: Partial<CreatePostInput>,
): Promise<Post> {
    const { data } = await api.put<Post>(`/post/${id}`, {
        ...post,
        updatedAt: post.updatedAt || new Date().toISOString(),
    });
    return data;
}

/**
 * Delete a post
 * Used in My Posts page when user deletes their post
 */
export async function deletePost(id: string): Promise<void> {
    await api.delete(`/post/${id}`);
}

/**
 * Upload image to storage service
 * 
 * @param file - Image file to upload
 * @returns Promise with uploaded image URL
 * 
 * TODO: Implement actual image upload service integration
 * Options:
 * - Cloudinary: https://cloudinary.com/documentation/image_upload_api_reference
 * - AWS S3: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
 * - ImgBB: https://api.imgbb.com/
 * - Imgur: https://apidocs.imgur.com/
 * 
 * Current: Returns mock URL for development
 */
export async function uploadImage(file: File): Promise<string> {
    // Validate file
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
        throw new Error("Invalid file type. Please upload JPG, PNG, WEBP, or GIF.");
    }

    if (file.size > maxSize) {
        throw new Error("File too large. Maximum size is 5MB.");
    }

    // TODO: Replace with actual upload implementation
    // Example for Cloudinary:
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("upload_preset", "your_preset");
    // const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud/image/upload", {
    //     method: "POST",
    //     body: formData,
    // });
    // const data = await response.json();
    // return data.secure_url;

    // Mock implementation - simulate upload delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // Generate mock URL using picsum.photos
            const mockUrl = `https://picsum.photos/seed/${Date.now()}/800/600`;
            resolve(mockUrl);
        }, 1500); // Simulate 1.5s upload time
    });
}

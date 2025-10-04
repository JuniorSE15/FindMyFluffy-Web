'use server';

import { z } from 'zod';
import { FormPostFoundSchema, FormPostLostSchema } from '@/schemas/post.schema';
import { baseApiAction } from './api.service';
import {
  FoundPetPostFormData,
  FoundPetPostResponse,
  LostPetPostFormData,
  LostPetPostResponse,
  PostQueryParams,
} from '@/types/post';

export type ApiResponse<T> = {
  data?: T;
  error?: {
    statusCode: number;
    message: string;
    detail?: string;
    path: string;
    timestamp: string;
  };
};

export enum Gender {
  Unknown = 1000,
  Male = 1001,
  Female = 1002,
}

// Utility function to convert object to FormData
function objectToFormData(data: Record<string, unknown>): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // Skip undefined values
    if (value === undefined) return;

    // Handle arrays (specifically for images)
    if (Array.isArray(value)) {
      if (value.length > 0) {
        value.forEach((item) => {
          if (item instanceof File) {
            formData.append(key, item, item.name);
          } else {
            formData.append(key, item.toString());
          }
        });
      }
      return;
    }

    // Handle null values
    if (value === null) {
      formData.append(key, '');
      return;
    }

    // Convert booleans and numbers to strings
    if (typeof value === 'boolean' || typeof value === 'number') {
      formData.append(key, value.toString());
      return;
    }

    // Handle strings and other primitives
    if (value !== '') {
      formData.append(key, value.toString());
    }
  });

  return formData;
}

// Transform form data to API request format
export async function transformFoundPetFormToApi(
  formData: z.infer<typeof FormPostFoundSchema>,
  userId: string,
): Promise<FoundPetPostFormData> {
  const postDatetime =
    formData.date && formData.time
      ? new Date(`${formData.date}T${formData.time}`).toISOString()
      : new Date().toISOString();

  return {
    ...formData,
    gender: Gender[formData.gender as keyof typeof Gender] ?? Gender.Unknown,
    postDatetime,
    catched: false,
    isLost: false,
    userId,
  };
}

export async function transformLostPetFormToApi(
  formData: z.infer<typeof FormPostLostSchema>,
  userId: string,
): Promise<LostPetPostFormData> {
  const postDatetime =
    formData.date && formData.time
      ? new Date(`${formData.date}T${formData.time}`).toISOString()
      : new Date().toISOString();

  return {
    ...formData,
    gender: Gender[formData.gender as keyof typeof Gender] ?? Gender.Unknown,
    postDatetime,
    isLost: true,
    userId,
  };
}

export async function submitFoundPetPostAction(
  formData: z.infer<typeof FormPostFoundSchema>,
  userId: string,
) {
  try {
    const apiData = await transformFoundPetFormToApi(formData, userId);
    const formDataPayload = objectToFormData(apiData);

    const response = await baseApiAction<FoundPetPostResponse>(
      '/api/posts/found',
      {
        method: 'POST',
        body: formDataPayload,
        requiresAuth: true,
      },
    );

    if (response.error) {
      let errorMessage =
        response.error.message || 'Failed to submit found pet post';

      if (response.error.detail) {
        errorMessage += '\n\nValidation errors:\n' + response.error.detail;
      }

      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    console.error('Error submitting found pet post:', error);
    throw error;
  }
}

export async function submitLostPetPostAction(
  formData: z.infer<typeof FormPostLostSchema>,
  userId: string,
) {
  try {
    const apiData = await transformLostPetFormToApi(formData, userId);
    const formDataPayload = objectToFormData(apiData);

    const response = await baseApiAction<LostPetPostResponse>(
      '/api/posts/lost',
      {
        method: 'POST',
        body: formDataPayload,
        requiresAuth: true,
      },
    );

    if (response.error) {
      let errorMessage =
        response.error.message || 'Failed to submit lost pet post';

      if (response.error.detail) {
        errorMessage += '\n\nValidation errors:\n' + response.error.detail;
      }

      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    console.error('Error submitting lost pet post:', error);
    throw error;
  }
}

function buildQueryParams(postQueryParams: PostQueryParams): URLSearchParams {
  const queryParams = new URLSearchParams();
  if (postQueryParams.isLost !== undefined && postQueryParams.isLost !== null) {
    queryParams.set('isLost', postQueryParams.isLost.toString());
  }
  if (postQueryParams.skip !== undefined && postQueryParams.skip !== null) {
    queryParams.set('skip', postQueryParams.skip.toString());
  }
  if (postQueryParams.take !== undefined && postQueryParams.take !== null) {
    queryParams.set('take', postQueryParams.take.toString());
  }
  if (postQueryParams.userId) {
    queryParams.set('userId', postQueryParams.userId);
  }
  if (postQueryParams.postId) {
    queryParams.set('postId', postQueryParams.postId);
  }
  return queryParams;
}

export async function getPostsAction<
  T extends LostPetPostResponse | FoundPetPostResponse,
>(postQueryParams: PostQueryParams): Promise<T[]> {
  try {
    const queryParams = buildQueryParams(postQueryParams);

    const response = await baseApiAction<T[]>(`/api/posts?${queryParams}`, {
      method: 'GET',
      requiresAuth: true,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as T[];
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
}

export async function getPostByIdAction<
  T extends LostPetPostResponse | FoundPetPostResponse,
>(postId: string): Promise<T> {
  try {
    if (!postId) {
      throw new Error('Post ID is required');
    }

    const response = await baseApiAction<T>(`/api/posts/${postId}`, {
      method: 'GET',
      requiresAuth: true,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    if (!response.data) {
      throw new Error('No data received from API');
    }

    return response.data;
  } catch (error) {
    console.error('Error in getPostByIdAction:', error);
    throw error;
  }
}

export async function getUserPostsAction<
  T extends LostPetPostResponse | FoundPetPostResponse,
>(userId: string): Promise<T[]> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const endpoint = `/user/${userId}`;

    const response = await baseApiAction<T[]>(endpoint, {
      method: 'GET',
      requiresAuth: true,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as T[];
  } catch (error) {
    console.error('Error getting user posts:', error);
    throw error;
  }
}

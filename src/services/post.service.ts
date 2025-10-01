'use server';

import { z } from 'zod';
import { FormPostFoundSchema, FormPostLostSchema } from '@/schemas/post.schema';
import { baseApiAction } from './api.service';
import {
  FoundPetPostFormData,
  FoundPetPostResponse,
  LostPetPostFormData,
  LostPetPostResponse,
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

// Constants
const GENDER_MAP: Record<string, number> = {
  Male: 1001,
  Female: 1002,
  Unknown: 1000,
};

// Transform form data to API request format
export async function transformFoundPetFormToApi(
  formData: z.infer<typeof FormPostFoundSchema>,
  userId: string,
): Promise<FoundPetPostFormData> {
  // Combine date and time into ISO datetime string
  const postDatetime =
    formData.dateFound && formData.timeFound
      ? new Date(`${formData.dateFound}T${formData.timeFound}`).toISOString()
      : new Date().toISOString();

  return {
    catched: true,
    userId: userId,
    title: formData.title,
    type: formData.petType.toLowerCase(),
    breed: formData.breed || '',
    gender: GENDER_MAP[formData.gender] ?? 1000,
    description: formData.description || '',
    onlinePost: formData.socialMediaLink || '',
    isLost: false,
    latitude: formData.lastSeenLat || 0,
    longitude: formData.lastSeenLng || 0,
    postDatetime: postDatetime,
    images: formData.images || [],
  };
}

// Transform lost pet form data to API request format
export async function transformLostPetFormToApi(
  formData: z.infer<typeof FormPostLostSchema>,
  userId: string,
): Promise<LostPetPostFormData> {
  // Combine date and time into ISO datetime string
  const postDatetime =
    formData.dateLost && formData.timeLost
      ? new Date(`${formData.dateLost}T${formData.timeLost}`).toISOString()
      : new Date().toISOString();

  return {
    userId: userId,
    title: formData.title,
    name: formData.petName,
    type: formData.petType.toLowerCase(),
    breed: formData.breed || '',
    age: formData.age,
    gender: GENDER_MAP[formData.gender] ?? 1000,
    microchip: formData.microchip || '',
    description: formData.description || '',
    onlinePost: formData.socialMediaLink || '',
    isLost: true,
    bounty: formData.bounty,
    latitude: formData.lastSeenLat || 0,
    longitude: formData.lastSeenLng || 0,
    postDatetime: postDatetime,
    images: formData.images || [],
  };
}

// API Functions

// Submit found pet post to the API
export async function submitFoundPetPost(
  data: FoundPetPostFormData,
): Promise<ApiResponse<FoundPetPostResponse>> {
  // Create FormData for multipart/form-data submission
  const formData = new FormData();

  // Add all the fields to FormData
  formData.append('Catched', data.catched ? 'true' : 'false');
  formData.append('UserId', data.userId);
  formData.append('Title', data.title);
  formData.append('Type', data.type);
  formData.append('Gender', data.gender.toString());
  formData.append('IsLost', data.isLost ? 'true' : 'false');
  formData.append('PostDatetime', data.postDatetime);

  if (data.breed) {
    formData.append('Breed', data.breed);
  }
  if (data.description) {
    formData.append('Description', data.description);
  }
  if (data.onlinePost) {
    formData.append('OnlinePost', data.onlinePost);
  }
  if (data.latitude !== undefined) {
    formData.append('Latitude', data.latitude.toString());
  }
  if (data.longitude !== undefined) {
    formData.append('Longitude', data.longitude.toString());
  }

  // Add images as null for testing
  // formData.append('images', 'null');
  //
  // Append each image file to FormData
  if (data.images && data.images.length > 0) {
    data.images.forEach((file, index) => {
      formData.append('images', file, file.name);
    });
  }

  // Log FormData keys and values for debugging
  // for (const pair of formData.entries()) {
  //   console.log(`${pair[0]}: ${pair[1]}`);
  // }

  return baseApiAction<FoundPetPostResponse>('/api/posts/found', {
    method: 'POST',
    body: formData,
    requiresAuth: true,
  });
}

// Submit lost pet post to the API
export async function submitLostPetPost(
  data: LostPetPostFormData,
): Promise<ApiResponse<LostPetPostResponse>> {
  // Create FormData for multipart/form-data submission
  const formData = new FormData();

  // Add all the fields to FormData
  formData.append('UserId', data.userId);
  formData.append('Title', data.title);
  formData.append('Name', data.name);
  formData.append('Type', data.type);
  formData.append('Gender', data.gender.toString());
  formData.append('IsLost', data.isLost ? 'true' : 'false');
  formData.append('PostDatetime', data.postDatetime);

  if (data.breed) {
    formData.append('Breed', data.breed);
  }
  if (data.age !== undefined) {
    formData.append('Age', data.age.toString());
  }
  if (data.microchip) {
    formData.append('Microchip', data.microchip);
  }
  if (data.description) {
    formData.append('Description', data.description);
  }
  if (data.onlinePost) {
    formData.append('OnlinePost', data.onlinePost);
  }
  if (data.bounty !== undefined) {
    formData.append('Bounty', data.bounty.toString());
  }
  if (data.latitude !== undefined) {
    formData.append('Latitude', data.latitude.toString());
  }
  if (data.longitude !== undefined) {
    formData.append('Longitude', data.longitude.toString());
  }

  // Append each image file to FormData
  if (data.images && data.images.length > 0) {
    data.images.forEach((file, index) => {
      formData.append('images', file, file.name);
    });
  }

  return baseApiAction<LostPetPostResponse>('/api/posts/lost', {
    method: 'POST',
    body: formData,
    requiresAuth: true,
  });
}

export async function submitFoundPetPostAction(
  formData: z.infer<typeof FormPostFoundSchema>,
  userId: string,
) {
  try {
    const apiData = await transformFoundPetFormToApi(formData, userId);

    // console.log('Transformed API data:', {
    //   ...apiData,
    //   images: apiData.images?.length || 0,
    // });

    const response = await submitFoundPetPost(apiData);

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

    // console.log('Transformed API data:', {
    //   ...apiData,
    //   images: apiData.images?.length || 0,
    // });

    const response = await submitLostPetPost(apiData);

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

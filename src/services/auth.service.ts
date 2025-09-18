'use server';

import {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
  Session,
} from '@/types/auth';
import { baseApiAction } from './api.service';

const BASE_ENDPOINT = '/api/Auth';

export async function registerAction(data: RegisterRequestDto) {
  try {
    const response = await baseApiAction<null>(`${BASE_ENDPOINT}/register`, {
      method: 'POST',
      body: data,
      requiresAuth: false,
    });

    if (response.error) {
      throw new Error(response.error.detail);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loginAction(data: LoginRequestDto) {
  try {
    const response = await baseApiAction<AuthResponseDto>(
      `${BASE_ENDPOINT}/login`,
      {
        method: 'POST',
        body: data,
        requiresAuth: false,
      },
    );

    if (response.error) {
      throw new Error(
        `Failed to login: ${response.error.message || response.error.detail}`,
      );
    }

    if (!response.data) {
      throw new Error('Failed to login: No response data');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSessionAction() {
  try {
    const response = await baseApiAction<Session>(`${BASE_ENDPOINT}/claims`, {
      method: 'GET',
      requiresAuth: true,
    });

    if (response.error) {
      throw new Error(response.error.detail);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function refreshTokenAction() {
  try {
    const response = await baseApiAction<AuthResponseDto>(
      `${BASE_ENDPOINT}/refresh`,
      {
        method: 'POST',
        requiresAuth: true,
      },
    );

    if (response.error) {
      throw new Error(response.error.detail);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logoutAction() {
  try {
    const response = await baseApiAction<null>(`${BASE_ENDPOINT}/logout`, {
      method: 'POST',
      requiresAuth: true,
    });

    if (response.error) {
      throw new Error(response.error.detail);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

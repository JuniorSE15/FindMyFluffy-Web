'use server';

import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

type ApiResponse<T> = {
  data?: T;
  error?: {
    statusCode: number;
    message: string;
    path: string;
    timestamp: string;
  };
};

type RequestConfig = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: object | FormData;
  requiresAuth?: boolean;
};

export async function baseApiAction<T>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, requiresAuth = true } = config;

  try {
    const headers: HeadersInit = {
      accept: 'application/json',
    };

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (requiresAuth) {
      const cookieStore = await cookies();
      const token = cookieStore.get('access_token')?.value;
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body:
        body instanceof FormData
          ? body
          : body
            ? JSON.stringify(body)
            : undefined,
    });

    const contentType = response.headers.get('Content-Type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
        return {
          data,
          error: {
            statusCode: response.status,
            message: response.statusText,
            path: endpoint,
            timestamp: new Date().toISOString(),
          },
        };
      } catch (error) {
        console.error('Invalid JSON response:', error);
        data = null;
      }
    } else if (contentType && contentType.includes('image/')) {
      data = await response.blob();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      return {
        error: {
          statusCode: response.status,
          message: response.statusText,
          path: endpoint,
          timestamp: new Date().toISOString(),
        },
      };
    }

    return { data: data as T };
  } catch (error) {
    console.error('API Error:', error);
    return {
      error: {
        statusCode: 500,
        message:
          typeof error === 'object' && error instanceof Error
            ? error.message
            : 'An error occurred while fetching data',
        path: endpoint,
        timestamp: new Date().toISOString(),
      },
    };
  }
}

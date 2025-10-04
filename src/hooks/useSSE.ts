import { useEffect, useRef, useState } from 'react';

export const SSEMessageType = {
  2000: 'system',
  2001: 'match',
  2002: 'comment',
};

export interface SSEMessage {
  Title: string;
  Description: string;
  CreatedAt: string;
  Type: number;
  // Also support lowercase for backward compatibility
  title?: string;
  description?: string;
  createdAt?: string;
  type?: number;
}

interface UseSSEOptions {
  url: string;
  enabled?: boolean;
  onMessage?: (message: SSEMessage) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export const useSSE = ({
  url,
  enabled = true,
  onMessage,
  onError,
  onOpen,
  onClose,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5,
}: UseSSEOptions) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const connect = () => {
    if (!enabled || !isMountedRef.current) return;

    try {
      // Close existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        if (!isMountedRef.current) return;

        setIsConnected(true);
        setIsReconnecting(false);
        setError(null);
        setReconnectAttempts(0);
        onOpen?.();
      };

      eventSource.onmessage = (event) => {
        if (!isMountedRef.current) return;

        try {
          const message: SSEMessage = JSON.parse(event.data);
          console.log('SSE message:', message);
          onMessage?.(message);
        } catch (err) {
          console.error('Failed to parse SSE message:', err);
        }
      };

      eventSource.onerror = (event) => {
        if (!isMountedRef.current) return;

        setIsConnected(false);
        setError('Connection error');
        onError?.(event);

        // Attempt to reconnect
        if (reconnectAttempts < maxReconnectAttempts) {
          setIsReconnecting(true);
          setReconnectAttempts((prev) => prev + 1);

          reconnectTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              connect();
            }
          }, reconnectInterval);
        }
      };
    } catch (err) {
      if (!isMountedRef.current) return;

      setError('Failed to create SSE connection');
      console.error('SSE connection error:', err);
    }
  };

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setIsConnected(false);
    setIsReconnecting(false);
    onClose?.();
  };

  const reconnect = () => {
    setReconnectAttempts(0);
    setError(null);
    connect();
  };

  useEffect(() => {
    isMountedRef.current = true;

    if (enabled) {
      connect();
    }

    return () => {
      isMountedRef.current = false;
      disconnect();
    };
  }, [enabled, url]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      disconnect();
    };
  }, []);

  return {
    isConnected,
    isReconnecting,
    error,
    reconnectAttempts,
    connect,
    disconnect,
    reconnect,
  };
};

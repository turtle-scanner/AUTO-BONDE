"use client";

import { useState, useEffect, useRef } from 'react';

export function useMarketData() {
  const [data, setData] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to the FastAPI WebSocket
    // Note: In production, this would be your server's URL
    const connect = () => {
      if (typeof window === 'undefined' || !window.WebSocket) return;
      ws.current = new WebSocket('ws://localhost:8000/ws/market');

      ws.current.onopen = () => {
        console.log("WebSocket Connected");
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'MARKET_UPDATE') {
          setData(message.data);
          setLastUpdate(message.timestamp);
        }
      };

      ws.current.onclose = () => {
        console.log("WebSocket Disconnected. Retrying...");
        setIsConnected(false);
        setTimeout(connect, 3000); // Reconnect after 3s
      };

      ws.current.onerror = (err) => {
        console.error("WebSocket Error:", err);
        ws.current?.close();
      };
    };

    connect();

    return () => {
      ws.current?.close();
    };
  }, []);

  return { data, lastUpdate, isConnected };
}

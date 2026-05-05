"use client";

import { useState, useEffect, useRef } from 'react';

export function useMarketData() {
  const [marketState, setMarketState] = useState<{
    data: any[];
    lastUpdate: string;
    isConnected: boolean;
  }>({
    data: [],
    lastUpdate: "",
    isConnected: false,
  });

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      if (typeof window === 'undefined' || !window.WebSocket) return;
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.hostname === 'localhost' ? 'localhost:8000' : 'stockdragonfly.cloud';
      
      // ?...?????...??????...????...
      if (ws.current) {
        ws.current.close();
      }

      ws.current = new WebSocket(`${protocol}//${host}/ws/market`);

      ws.current.onopen = () => {
        console.log("WebSocket Connected");
        setMarketState(prev => ({ ...prev, isConnected: true }));
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'MARKET_UPDATE') {
            // ?...?...?...?? ??...????...??...?????...?...???...
            setMarketState(prev => ({
              ...prev,
              data: message.data,
              lastUpdate: message.timestamp
            }));
          }
        } catch (err) {
          console.error("Data Parsing Error:", err);
        }
      };

      ws.current.onclose = () => {
        console.log("WebSocket Disconnected. Retrying...");
        setMarketState(prev => ({ ...prev, isConnected: false }));
        setTimeout(connect, 5000); // ???...??...?...??5?...?...?...???      };

      ws.current.onerror = (err) => {
        console.error("WebSocket Error:", err);
        ws.current?.close();
      };
    };

    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return { 
    data: marketState.data, 
    lastUpdate: marketState.lastUpdate, 
    isConnected: marketState.isConnected 
  };
}

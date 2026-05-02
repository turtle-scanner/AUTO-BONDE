"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallbackName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Tactical System Error in [${this.props.fallbackName || 'Unknown'}]:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback glass">
          <div className="error-content">
            <AlertTriangle size={24} className="status-down" />
            <div className="error-text">
              <h4>[{this.props.fallbackName || 'Component'}] Malfunction</h4>
              <p>전술 장비 일시적 오류. 자동 복구 시도 중...</p>
            </div>
            <button 
              className="retry-btn glass"
              onClick={() => this.setState({ hasError: false })}
            >
              <RefreshCw size={14} /> REBOOT
            </button>
          </div>

          <style jsx>{`
            .error-fallback {
              padding: 20px;
              border: 1px solid rgba(255, 0, 85, 0.2);
              background: rgba(255, 0, 85, 0.05);
              border-radius: 12px;
              margin: 10px 0;
            }
            .error-content {
              display: flex;
              align-items: center;
              gap: 16px;
            }
            .error-text h4 {
              font-size: 0.9rem;
              font-weight: 800;
              color: #ff0055;
              margin-bottom: 2px;
            }
            .error-text p {
              font-size: 0.75rem;
              color: var(--text-muted);
            }
            .retry-btn {
              margin-left: auto;
              padding: 8px 12px;
              font-size: 0.7rem;
              font-weight: 800;
              color: var(--primary);
              display: flex;
              align-items: center;
              gap: 6px;
              cursor: pointer;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

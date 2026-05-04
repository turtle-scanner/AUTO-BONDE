"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("COMMAND ERROR:", error);
  }, [error]);

  return (
    <div className="error-fallback glass" style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#050505',
      color: 'white',
      fontFamily: 'Orbitron, sans-serif',
      padding: '40px',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#d4af37', fontSize: '2rem', marginBottom: '20px' }}>
        [ SYSTEM CRITICAL ERROR ]
      </h2>
      <p style={{ color: '#ef4444', marginBottom: '30px', maxWidth: '600px' }}>
        사령부 시스템 가동 중 예상치 못한 충돌이 발생했습니다.<br/>
        에러 내용: {error.message}
      </p>
      <button
        onClick={() => reset()}
        style={{
          background: '#d4af37',
          color: 'black',
          border: 'none',
          padding: '12px 30px',
          borderRadius: '8px',
          fontWeight: '900',
          cursor: 'pointer'
        }}
      >
        시스템 재부팅 시도 (REBOOT)
      </button>
    </div>
  );
}

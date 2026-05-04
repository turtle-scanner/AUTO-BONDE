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
        ??�댖?�뺣?�野�? ??筌�?痢�???�씈�읈???濚�?????彛�???�ル??��?�쾮?��????�껊챶爾�????袁⑸즵獒뺣뎾�떐????��????�뜄�렡.<br/>
        ???????��?�챶裕�: {error.message}
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
        ??筌�?痢�?????????筌먲?���?(REBOOT)
      </button>
    </div>
  );
}

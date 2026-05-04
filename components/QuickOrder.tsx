"use client";

import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { Send, DollarSign, Tag, Hash } from 'lucide-react';

const QuickOrder: React.FC = () => {
  const [formData, setFormData] = useState({ code: '', name: '', qty: '', reason: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ code: '', name: '', qty: '', reason: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <GlassCard title="Manual Quick Order" className="quick-order-card">
      <form onSubmit={handleSubmit} className="order-form">
        <div className="input-group">
          <div className="input-wrapper">
            <Hash size={14} className="input-icon" />
            <input 
              type="text" 
              placeholder="Ticker Code" 
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              required 
            />
          </div>
          <div className="input-wrapper">
            <Tag size={14} className="input-icon" />
            <input 
              type="text" 
              placeholder="Stock Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <DollarSign size={14} className="input-icon" />
            <input 
              type="number" 
              placeholder="Quantity" 
              value={formData.qty}
              onChange={(e) => setFormData({...formData, qty: e.target.value})}
              required 
            />
          </div>
          <input 
            type="text" 
            placeholder="Reason (Optional)" 
            className="full-width"
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${status}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Processing...' : status === 'success' ? 'Order Placed!' : 'Execute Order'}
          <Send size={16} />
        </button>
      </form>

      <style jsx>{`
        .order-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 12px;
        }
        .input-group {
          display: flex;
          gap: 12px;
        }
        .input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          padding: 10px 12px 10px 32px;
          color: white;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.2s;
        }
        input:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.06);
        }
        input.full-width {
          flex: 2;
          padding-left: 12px;
        }
        .submit-btn {
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: var(--primary);
          color: black;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px var(--primary-glow);
        }
        .submit-btn.success {
          background: var(--success);
        }
        .submit-btn.error {
          background: var(--danger);
          color: white;
        }
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </GlassCard>
  );
};

export default QuickOrder;

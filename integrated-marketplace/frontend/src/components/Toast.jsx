import React from 'react';
import { useApp } from '../context';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={20} color="var(--neon-cyan)" />,
    error: <AlertCircle size={20} color="var(--neon-magenta)" />,
    info: <Info size={20} color="#00b4d8" />
  };

  const borderColors = {
    success: 'rgba(0, 245, 212, 0.5)',
    error: 'rgba(255, 0, 127, 0.5)',
    info: 'rgba(0, 180, 216, 0.5)'
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(15, 9, 38, 0.95)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${borderColors[toast.type] || borderColors.info}`,
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 245, 212, 0.2)',
        borderRadius: '14px',
        padding: '14px 20px',
        color: '#ffffff',
        fontFamily: 'var(--font-body)',
        fontSize: '0.9rem',
        fontWeight: 600,
        maxWidth: '400px',
        animation: 'slideUpToast 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {icons[toast.type] || icons.info}
      <span>{toast.message}</span>

      <style>{`
        @keyframes slideUpToast {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Toast;

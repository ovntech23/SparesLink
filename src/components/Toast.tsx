"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { IconBell } from '@tabler/icons-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useStore();

  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2800); // 2.8s dismiss
      
      return () => clearTimeout(timer);
    }
  }, [toast?.visible, hideToast]);

  return (
    <AnimatePresence>
      {toast?.visible && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-4 w-full max-w-[400px] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 400 }}
            className="pointer-events-auto w-full shadow-2xl text-white rounded-full py-3.5 px-5 flex items-center gap-3 justify-center"
            style={{ backgroundColor: 'var(--ink)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <IconBell className="w-4 h-4 flex-shrink-0 animate-pulse" style={{ color: 'var(--orange)' }} />
            <span
              className="truncate leading-tight"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: 'white', letterSpacing: '0.01em' }}
            >
              {toast.message}
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

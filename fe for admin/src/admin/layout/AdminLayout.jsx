import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');
        * { font-family: 'Inter', system-ui, sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(192,82,43,0.25); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(192,82,43,0.45); }
      `}</style>

      <div className="min-h-screen flex" style={{ background: '#F7F1E8' }}>
        {/* Layered background */}
        <div className="fixed inset-0 pointer-events-none z-0" style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 40% at 15% 0%, rgba(192,82,43,0.05) 0%, transparent 55%),
            radial-gradient(ellipse 50% 35% at 85% 100%, rgba(139,58,26,0.04) 0%, transparent 55%)
          `,
        }} />

        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0 relative z-10 ml-4">
          <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="px-8 py-10 min-h-full max-w-7xl mx-auto w-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}

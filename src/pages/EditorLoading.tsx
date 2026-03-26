import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const EditorLoading = () => {
  const navigate = useNavigate();
  const { themeId } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/editor/${themeId}`, { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate, themeId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8"
      style={{ background: "linear-gradient(135deg, var(--header-start), var(--header-end))" }}>
      
      {/* Spinner */}
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-white/20"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-white/70 border-b-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Text */}
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white">Carregando tema...</h2>
        <p className="text-white/70 text-sm">Preparando seu editor</p>
      </motion.div>

      {/* Progress bar */}
      <motion.div className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.3, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default EditorLoading;

import { motion } from "framer-motion";

const TutorialArrow = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-16 right-[180px] md:right-[220px] z-[60] pointer-events-none"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <span className="text-xs font-semibold text-primary bg-card px-3 py-1.5 rounded-lg shadow-lg border border-border whitespace-nowrap mb-1">
          Assista quando quiser! 👆
        </span>
        <svg width="24" height="32" viewBox="0 0 24 32" className="text-primary">
          <path
            d="M12 0 L12 24 M4 16 L12 24 L20 16"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="rotate(180 12 16)"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default TutorialArrow;

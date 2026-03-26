import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, Sparkles, Download, CheckCircle2, Loader2 } from "lucide-react";

interface ProjectLoadingScreenProps {
  projectName: string;
  onComplete: () => void;
}

const steps = [
  {
    icon: Search,
    label: "Verificando projetos...",
    sublabel: "Localizando dados salvos",
    duration: 1200,
  },
  {
    icon: RefreshCw,
    label: "Procurando atualizações...",
    sublabel: "Checando versões disponíveis",
    duration: 1400,
  },
  {
    icon: Sparkles,
    label: "Nova versão encontrada!",
    sublabel: "Preparando arquivos para atualização",
    duration: 1000,
  },
  {
    icon: Download,
    label: "Atualizando...",
    sublabel: "",
    duration: 2500,
    hasProgress: true,
  },
  {
    icon: CheckCircle2,
    label: "Tudo pronto!",
    sublabel: "Redirecionando para o editor...",
    duration: 800,
  },
];

/* Animated spinning icon wrapper */
const SpinningIcon = ({ icon: Icon, spin }: { icon: typeof Search; spin?: boolean }) => (
  <motion.div
    animate={spin ? { rotate: 360 } : {}}
    transition={spin ? { duration: 1.2, repeat: Infinity, ease: "linear" } : {}}
  >
    <Icon className="w-6 h-6" />
  </motion.div>
);

const ProjectLoadingScreen = ({ projectName, onComplete }: ProjectLoadingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const runStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setTimeout(onComplete, 400);
        return;
      }

      setCurrentStep(stepIndex);

      if (steps[stepIndex].hasProgress) {
        setProgress(0);
        let p = 0;
        const increment = 100 / (steps[stepIndex].duration / 50);
        progressInterval = setInterval(() => {
          p += increment;
          if (p >= 100) {
            p = 100;
            clearInterval(progressInterval);
          }
          setProgress(p);
        }, 50);
      }

      timeout = setTimeout(() => {
        runStep(stepIndex + 1);
      }, steps[stepIndex].duration);
    };

    runStep(0);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const step = steps[currentStep];
  const StepIcon = step?.icon || Loader2;
  const isSpinning = currentStep === 0 || currentStep === 1;
  const isComplete = currentStep === steps.length - 1;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {/* Animated icon area */}
      <motion.div
        key={currentStep}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
          isComplete
            ? "bg-green-500/10 text-green-500"
            : "bg-primary/10 text-primary"
        }`}
      >
        <SpinningIcon icon={StepIcon} spin={isSpinning} />
      </motion.div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-foreground">{step?.label}</p>
          {step?.sublabel && (
            <p className="text-xs text-muted-foreground mt-1">{step.sublabel}</p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      {step?.hasProgress && (
        <div className="w-full max-w-[220px] mt-5">
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            {Math.round(progress)}%
          </p>
        </div>
      )}

      {/* Project name pill */}
      <div className="mt-6 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
        <p className="text-[11px] text-muted-foreground">
          Projeto: <span className="font-medium text-foreground">{projectName}</span>
        </p>
      </div>

      {/* Subtle message */}
      {!isComplete && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-[11px] text-muted-foreground/60 text-center mt-6 max-w-[240px] leading-relaxed"
        >
          Estamos preparando tudo para você. Em instantes seu projeto estará pronto para edição ✨
        </motion.p>
      )}
    </div>
  );
};

export default ProjectLoadingScreen;
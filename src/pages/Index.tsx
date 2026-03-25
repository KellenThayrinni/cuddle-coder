import HeroSide from "@/components/HeroSide";
import LoginForm from "@/components/LoginForm";
import { MessageCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left - Hero */}
      <div className="hidden lg:block lg:w-[55%] xl:w-[50%]">
        <HeroSide />
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center bg-background p-6 md:p-12 relative">
        {/* Mobile gradient header */}
        <div className="lg:hidden absolute top-0 left-0 right-0 h-2 hero-gradient" />
        
        <LoginForm />

        {/* WhatsApp FAB */}
        <a
          href="https://wa.me/5500000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-50"
          aria-label="Fale conosco no WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default Index;

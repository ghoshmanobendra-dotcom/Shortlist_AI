import { DashboardLayout } from "@/components/DashboardLayout";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

const InnerHome = () => {
    return (
        <DashboardLayout>
            <div className="space-y-0">
                <HeroSection />
                <HowItWorksSection />
                <FeaturesSection />
                <FAQSection />
                <CTASection />
            </div>
        </DashboardLayout>
    );
};

export default InnerHome;

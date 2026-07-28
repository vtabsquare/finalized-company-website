import React, { useState } from 'react';
import { NavTab, Product } from './types';
import { NeuralBackground } from './components/NeuralBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VisionMission } from './components/VisionMission';
import { AiEmployeesBanner } from './components/AiEmployeesBanner';
import { PortfolioSection } from './components/PortfolioSection';
import { FutureInnovations } from './components/FutureInnovations';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ImpactStats } from './components/ImpactStats';
import { ClosingBanner } from './components/ClosingBanner';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { InteractiveAiSandboxModal } from './components/InteractiveAiSandboxModal';
import { PageViews } from './components/PageViews';
import { AiChatBot } from './components/AiChatBot';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoInterest, setDemoInterest] = useState('');
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  const isLightMode = theme === 'light';

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOpenDemoModal = (interestArea?: string) => {
    if (interestArea) {
      setDemoInterest(interestArea);
    } else {
      setDemoInterest('AI Reporting Platform');
    }
    setIsDemoModalOpen(true);
  };

  const handleExploreProducts = () => {
    setActiveTab('products');
    const el = document.getElementById('ai-portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (prod: Product) => {
    sessionStorage.setItem('last_selected_product_id', prod.id);
    sessionStorage.setItem('last_scroll_y', window.scrollY.toString());
    setSelectedProduct(prod);
  };

  const handleBackFromDetail = () => {
    const savedScrollY = sessionStorage.getItem('last_scroll_y');
    setSelectedProduct(null);
    setTimeout(() => {
      if (savedScrollY !== null && savedScrollY !== undefined) {
        window.scrollTo({ top: parseInt(savedScrollY, 10), behavior: 'instant' });
      } else {
        const el = document.getElementById('ai-portfolio');
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      }
    }, 20);
  };

  return (
    <div className={`min-h-screen selection:bg-blue-500 selection:text-white relative transition-colors duration-300 ${
      isLightMode ? 'light-mode bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      
      {/* Animated Neural Network Canvas Background */}
      <NeuralBackground isLightMode={isLightMode} />

      {/* Glassmorphism Header Bar */}
      {!selectedProduct && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenDemoModal={handleOpenDemoModal}
          onOpenSandboxModal={() => setIsSandboxModalOpen(true)}
          isLightMode={isLightMode}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Main Content Area */}
      <main className="relative z-10">
        
        {/* Full-page detail view for all selected products */}
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={handleBackFromDetail}
            onScheduleDemo={handleOpenDemoModal}
            isLightMode={isLightMode}
          />
        ) : activeTab !== 'home' && activeTab !== 'products' ? (
          <PageViews
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onScheduleDemo={handleOpenDemoModal}
            onOpenSandbox={() => setIsSandboxModalOpen(true)}
            onSelectProduct={handleSelectProduct}
          />
        ) : (
          <>
            {/* Hero Section */}
            <HeroSection
              onExploreProducts={handleExploreProducts}
              onScheduleDemo={handleOpenDemoModal}
              onOpenSandbox={() => setIsSandboxModalOpen(true)}
              isLightMode={isLightMode}
            />

            {/* Vision & Mission */}
            <VisionMission isLightMode={isLightMode} />

            {/* AI Employees Banner */}
            <AiEmployeesBanner
              onScheduleDemo={handleOpenDemoModal}
              onOpenSandbox={() => setIsSandboxModalOpen(true)}
              isLightMode={isLightMode}
            />

            {/* AI Portfolio */}
            <PortfolioSection
              onSelectProduct={handleSelectProduct}
              onScheduleDemo={handleOpenDemoModal}
              isLightMode={isLightMode}
            />

            {/* Future Innovations (Coming Soon) */}
            <FutureInnovations onScheduleDemo={handleOpenDemoModal} isLightMode={isLightMode} />

            {/* Why Choose Us */}
            <WhyChooseUs onScheduleDemo={handleOpenDemoModal} isLightMode={isLightMode} />

            {/* Impact Numbers */}
            <ImpactStats isLightMode={isLightMode} />

            {/* Closing Banner */}
            <ClosingBanner
              onScheduleDemo={handleOpenDemoModal}
              onOpenSandbox={() => setIsSandboxModalOpen(true)}
              isLightMode={isLightMode}
            />
          </>
        )}

      </main>

      {/* Footer */}
      {!selectedProduct && (
        <Footer
          setActiveTab={setActiveTab}
          onOpenDemoModal={handleOpenDemoModal}
          isLightMode={isLightMode}
        />
      )}

      {/* Integrated Floating AI Assistant Bot */}
      {!selectedProduct && (
        <AiChatBot
          onScheduleDemo={handleOpenDemoModal}
          onOpenSandbox={() => setIsSandboxModalOpen(true)}
          onSelectProduct={handleSelectProduct}
          onNavigateTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'products') {
              setTimeout(() => {
                const el = document.getElementById('ai-portfolio');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
          isLightMode={isLightMode}
        />
      )}

      {/* Modals & Dialogs */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        initialInterest={demoInterest}
      />

      <InteractiveAiSandboxModal
        isOpen={isSandboxModalOpen}
        onClose={() => setIsSandboxModalOpen(false)}
        onScheduleDemo={handleOpenDemoModal}
      />

    </div>
  );
}

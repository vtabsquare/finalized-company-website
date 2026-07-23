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
import { ProductDetailModal } from './components/ProductDetailModal';
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

  return (
    <div className={`min-h-screen selection:bg-blue-500 selection:text-white relative transition-colors duration-300 ${
      isLightMode ? 'light-mode bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      
      {/* Animated Neural Network Canvas Background */}
      <NeuralBackground isLightMode={isLightMode} />

      {/* Glassmorphism Header Bar */}
      {(!selectedProduct || !selectedProduct.detailContent) && (
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
        
        {/* Full-page detail view for products with detailContent */}
        {selectedProduct && selectedProduct.detailContent ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onScheduleDemo={handleOpenDemoModal}
            isLightMode={isLightMode}
          />
        ) : activeTab !== 'home' && activeTab !== 'products' ? (
          <PageViews
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onScheduleDemo={handleOpenDemoModal}
            onOpenSandbox={() => setIsSandboxModalOpen(true)}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
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
              onSelectProduct={(prod) => setSelectedProduct(prod)}
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
      {(!selectedProduct || !selectedProduct.detailContent) && (
        <Footer
          setActiveTab={setActiveTab}
          onOpenDemoModal={handleOpenDemoModal}
          isLightMode={isLightMode}
        />
      )}

      {/* Integrated Floating AI Assistant Bot */}
      {(!selectedProduct || !selectedProduct.detailContent) && (
        <AiChatBot
          onScheduleDemo={handleOpenDemoModal}
          onOpenSandbox={() => setIsSandboxModalOpen(true)}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
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

      {/* Product detail modal for products WITHOUT detailContent */}
      {selectedProduct && !selectedProduct.detailContent && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onScheduleDemo={handleOpenDemoModal}
          onOpenSandbox={() => setIsSandboxModalOpen(true)}
        />
      )}

      <InteractiveAiSandboxModal
        isOpen={isSandboxModalOpen}
        onClose={() => setIsSandboxModalOpen(false)}
        onScheduleDemo={handleOpenDemoModal}
      />

    </div>
  );
}

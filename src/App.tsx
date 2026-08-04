import React, { useState, Suspense, lazy } from 'react';
import { NavTab, Product } from './types';
import { NeuralBackground } from './components/NeuralBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DemoModal } from './components/DemoModal';
import { InteractiveAiSandboxModal } from './components/InteractiveAiSandboxModal';
import { AiChatBot } from './components/AiChatBot';

const VisionMission = lazy(() => import('./components/VisionMission').then(m => ({ default: m.VisionMission })));
const AiEmployeesBanner = lazy(() => import('./components/AiEmployeesBanner').then(m => ({ default: m.AiEmployeesBanner })));
const PortfolioSection = lazy(() => import('./components/PortfolioSection').then(m => ({ default: m.PortfolioSection })));
const FutureInnovations = lazy(() => import('./components/FutureInnovations').then(m => ({ default: m.FutureInnovations })));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs').then(m => ({ default: m.WhyChooseUs })));
const ImpactStats = lazy(() => import('./components/ImpactStats').then(m => ({ default: m.ImpactStats })));
const ClosingBanner = lazy(() => import('./components/ClosingBanner').then(m => ({ default: m.ClosingBanner })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const PageViews = lazy(() => import('./components/PageViews').then(m => ({ default: m.PageViews })));

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
          isOverHero={(activeTab === 'home' || activeTab === 'products') && !selectedProduct}
        />
      )}

      {/* Main Content Area */}
      <main className="relative z-10">
        
        {/* Full-page detail view for all selected products */}
        {selectedProduct ? (
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-white">Loading...</div>}>
            <ProductDetailPage
              product={selectedProduct}
              onBack={handleBackFromDetail}
              onScheduleDemo={handleOpenDemoModal}
              isLightMode={isLightMode}
            />
          </Suspense>
        ) : activeTab !== 'home' && activeTab !== 'products' ? (
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-white">Loading...</div>}>
            <PageViews
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onScheduleDemo={handleOpenDemoModal}
              onOpenSandbox={() => setIsSandboxModalOpen(true)}
              onSelectProduct={handleSelectProduct}
            />
          </Suspense>
        ) : (
          <>
            {/* Hero Section */}
            <HeroSection
              onExploreProducts={handleExploreProducts}
              onScheduleDemo={handleOpenDemoModal}
              onOpenSandbox={() => setIsSandboxModalOpen(true)}
              isLightMode={isLightMode}
            />

            <Suspense fallback={<div className="min-h-screen"></div>}>
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
  
              {/* Impact Statistics */}
              <ImpactStats isLightMode={isLightMode} />
  
              {/* Closing Call to Action */}
              <ClosingBanner
                onScheduleDemo={handleOpenDemoModal}
                onOpenSandbox={() => setIsSandboxModalOpen(true)}
                isLightMode={isLightMode}
              />
            </Suspense>
          </>
        )}

      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenDemoModal={handleOpenDemoModal}
        onSelectProduct={handleSelectProduct}
        isLightMode={isLightMode}
      />

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

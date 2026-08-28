import React, { useState, useEffect, Suspense, lazy } from 'react';
import { initSession, trackPageView, trackEvent, stopHeartbeat, initScrollTracking, trackSectionTime, trackClick } from './lib/analyticsService';
import { NavTab, Product } from './types';
import { NeuralBackground } from './components/NeuralBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DemoModal } from './components/DemoModal';
import { InteractiveAiSandboxModal } from './components/InteractiveAiSandboxModal';
import { AiChatBot } from './components/AiChatBot';
import { PRODUCTS_DATA } from './data/contentData';

const VisionMission = lazy(() => import('./components/VisionMission').then(m => ({ default: m.VisionMission })));
const AiEmployeesBanner = lazy(() => import('./components/AiEmployeesBanner').then(m => ({ default: m.AiEmployeesBanner })));
const PortfolioSection = lazy(() => import('./components/PortfolioSection').then(m => ({ default: m.PortfolioSection })));
const IndustrialIoTSection = lazy(() => import('./components/IndustrialIoTSection').then(m => ({ default: m.IndustrialIoTSection })));
const FutureInnovations = lazy(() => import('./components/FutureInnovations').then(m => ({ default: m.FutureInnovations })));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs').then(m => ({ default: m.WhyChooseUs })));
const ImpactStats = lazy(() => import('./components/ImpactStats').then(m => ({ default: m.ImpactStats })));
const ClosingBanner = lazy(() => import('./components/ClosingBanner').then(m => ({ default: m.ClosingBanner })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const PageViews = lazy(() => import('./components/PageViews').then(m => ({ default: m.PageViews })));
const DemoShowcaseSection = lazy(() => import('./components/DemoShowcaseSection').then(m => ({ default: m.DemoShowcaseSection })));

export default function App() {
  const tabRoutes: Partial<Record<NavTab, string>> = {
    home: '/',
    products: '/',
    iot: '/',
    solutions: '/solutions',
    industries: '/industries',
    lab: '/lab',
    about: '/about',
    careers: '/careers',
    contact: '/contact',
  };

  const readRoute = () => {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const architectureMatch = path.match(/^\/architecture\/([^/]+)$/);
    if (architectureMatch) {
      const productId = decodeURIComponent(architectureMatch[1]);
      return {
        tab: 'products' as NavTab,
        product: PRODUCTS_DATA.find(product => product.id === productId) || null,
      };
    }

    if (path === '/' && window.location.hash === '#industrial-iot') {
      return { tab: 'iot' as NavTab, product: null };
    }

    const matchedTab = (Object.entries(tabRoutes).find(([, route]) => route !== '/' && route === path)?.[0] || 'home') as NavTab;
    return { tab: matchedTab, product: null };
  };

  const initialRoute = readRoute();
  const [activeTab, setActiveTab] = useState<NavTab>(initialRoute.tab);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialRoute.product);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoInterest, setDemoInterest] = useState('');
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const isLightMode = theme === 'light';

  // ── Analytics: init once on mount ──────────────────────────────────────
  useEffect(() => {
    initSession('home');
    return () => stopHeartbeat();
  }, []);

  // Keep app state synchronized with browser Back/Forward navigation.
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const route = readRoute();
      const historyProduct = event.state?.product as Product | undefined;
      setActiveTab(route.tab);
      setSelectedProduct(historyProduct || route.product);

      if (!historyProduct && !route.product) {
        const savedScrollY = sessionStorage.getItem('last_scroll_y');
        requestAnimationFrame(() => {
          if (savedScrollY && route.tab === 'home') {
            window.scrollTo({ top: Number(savedScrollY), behavior: 'instant' });
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = selectedProduct
      ? `${selectedProduct.title} Architecture | VTab Square`
      : activeTab === 'careers'
        ? 'Careers | VTab Square'
        : 'VTab Square | Enterprise Intelligence';
  }, [activeTab, selectedProduct]);

  // ── Analytics: scroll depth (fires at 25/50/75/90/100%) ────────────────
  useEffect(() => {
    const cleanup = initScrollTracking();
    return cleanup;
  }, []);

  // ── Analytics: section time tracking ───────────────────────────────────
  useEffect(() => {
    if (activeTab !== 'home' && activeTab !== 'products' && activeTab !== 'iot') return;
    const sections = [
      ['section-hero',        'Hero'],
      ['section-vision',      'Vision & Mission'],
      ['section-employees',   'AI Employees'],
      ['section-portfolio',   'AI Portfolio'],
      ['industrial-iot',      'Industrial IoT & Edge AI'],
      ['section-demos',       'Live Demo Showcase'],
      ['section-innovations', 'Future Innovations'],
      ['section-why',         'Why Choose Us'],
      ['section-stats',       'Impact Stats'],
      ['section-closing',     'Closing CTA'],
    ];
    const cleanups = sections.map(([id, label]) => trackSectionTime(id, label));
    return () => cleanups.forEach(fn => fn());
  }, [activeTab]);

  // ── Analytics: track every tab change ──────────────────────────────────
  useEffect(() => {
    trackPageView(activeTab);
  }, [activeTab]);

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
    trackEvent('demo_modal_open', { interest: interestArea || 'AI Reporting Platform' });
    trackClick('Schedule Demo', { interest: interestArea || 'AI Reporting Platform' });
  };

  const handleExploreProducts = () => {
    setActiveTab('products');
    trackClick('Hero CTA: Explore Accelerators');
    trackEvent('explore_products_click');
    const el = document.getElementById('ai-portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProduct = (prod: Product) => {
    sessionStorage.setItem('last_selected_product_id', prod.id);
    sessionStorage.setItem('last_scroll_y', window.scrollY.toString());
    window.history.pushState(
      { view: 'architecture', product: prod },
      '',
      `/architecture/${encodeURIComponent(prod.id)}`
    );
    setSelectedProduct(prod);
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('product_detail_open', { product_id: prod.id, product_title: prod.title });
    trackClick('Explore Architecture', { product: prod.title });
  };

  const handleBackFromDetail = () => {
    if (window.history.state?.view === 'architecture') {
      window.history.back();
      return;
    }

    window.history.pushState({ view: 'landing' }, '', '/');
    setSelectedProduct(null);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateTab = (tab: NavTab) => {
    const targetPath = tab === 'iot' ? '/#industrial-iot' : (tabRoutes[tab] || '/');
    const currentPath = `${window.location.pathname}${window.location.hash}`;
    if (currentPath !== targetPath || selectedProduct) {
      window.history.pushState({ view: 'tab', tab }, '', targetPath);
    }
    setSelectedProduct(null);
    setActiveTab(tab);

    if (tab === 'iot') {
      setTimeout(() => {
        document.getElementById('industrial-iot')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
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
          setActiveTab={handleNavigateTab}
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
        ) : activeTab !== 'home' && activeTab !== 'products' && activeTab !== 'iot' ? (
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-white">Loading...</div>}>
            <PageViews
              activeTab={activeTab}
              setActiveTab={handleNavigateTab}
              onScheduleDemo={handleOpenDemoModal}
              onOpenSandbox={() => setIsSandboxModalOpen(true)}
              onSelectProduct={handleSelectProduct}
            />
          </Suspense>
        ) : (
          <>
            {/* Hero Section */}
            <div id="section-hero">
            <HeroSection
              onExploreProducts={handleExploreProducts}
              onScheduleDemo={handleOpenDemoModal}
              onOpenSandbox={() => { setIsSandboxModalOpen(true); trackClick('Open Sandbox (Hero)'); }}
              isLightMode={isLightMode}
            />
            </div>

            <Suspense fallback={<div className="min-h-screen"></div>}>
              <div id="section-vision"><VisionMission isLightMode={isLightMode} /></div>

              {/* AI Employees Banner */}
              <div id="section-employees">
              <AiEmployeesBanner
                onScheduleDemo={handleOpenDemoModal}
                onOpenSandbox={() => { setIsSandboxModalOpen(true); trackClick('Open Sandbox (Employees)'); }}
                isLightMode={isLightMode}
              />
              </div>

              {/* Industrial IoT & Edge AI */}
              <IndustrialIoTSection onScheduleDemo={handleOpenDemoModal} isLightMode={isLightMode} />

              {/* Live Demo Showcase */}
              <div id="section-demos">
                <DemoShowcaseSection isLightMode={isLightMode} />
              </div>

              {/* AI Portfolio */}
              <div id="section-portfolio">
              <PortfolioSection
                onSelectProduct={handleSelectProduct}
                onScheduleDemo={handleOpenDemoModal}
                isLightMode={isLightMode}
              />
              </div>

              {/* Future Innovations (Coming Soon) */}
              <div id="section-innovations"><FutureInnovations onScheduleDemo={handleOpenDemoModal} isLightMode={isLightMode} /></div>

              {/* Why Choose Us */}
              <div id="section-why"><WhyChooseUs onScheduleDemo={handleOpenDemoModal} isLightMode={isLightMode} /></div>

              {/* Impact Statistics */}
              <div id="section-stats"><ImpactStats isLightMode={isLightMode} /></div>

              {/* Closing Call to Action */}
              <div id="section-closing">
              <ClosingBanner
                onScheduleDemo={handleOpenDemoModal}
                onOpenSandbox={() => { setIsSandboxModalOpen(true); trackClick('Open Sandbox (Closing)'); }}
                isLightMode={isLightMode}
              />
              </div>
            </Suspense>
          </>
        )}

      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleNavigateTab}
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
            handleNavigateTab(tab);
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Home Components
import { HeroBanner } from './components/home/HeroBanner';
import { TrustHighlights } from './components/home/TrustHighlights';
import { FeaturedCategories } from './components/home/FeaturedCategories';
import { TopSellingCarousel } from './components/home/TopSellingCarousel';
import { CategorySection } from './components/home/CategorySection';
import { ComboOfferSection } from './components/home/ComboOfferSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';

// Page Views
import { CollectionPage } from './components/collection/CollectionPage';
import { ProductDetailView } from './components/product/ProductDetailView';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderSuccessView } from './components/checkout/OrderSuccessView';
import { OrderTrackingView } from './components/orders/OrderTrackingView';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { WishlistPage } from './components/pages/WishlistPage';

// Overlays
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SearchOverlay } from './components/common/SearchOverlay';
import { Toast } from './components/common/Toast';

const MainContent: React.FC = () => {
  const { currentView } = useStore();

  return (
    <main className="flex-1 min-h-[70vh]">
      {currentView === 'home' && (
        <div className="space-y-6">
          <HeroBanner />
          <TrustHighlights />
          <FeaturedCategories />
          <TopSellingCarousel />
          <CategorySection />
          <ComboOfferSection />
          <TestimonialsSection />
        </div>
      )}

      {currentView === 'collection' && <CollectionPage />}
      {currentView === 'product-detail' && <ProductDetailView />}
      {currentView === 'cart' && <CartPage />}
      {currentView === 'checkout' && <CheckoutPage />}
      {currentView === 'order-success' && <OrderSuccessView />}
      {currentView === 'track-order' && <OrderTrackingView />}
      {currentView === 'about' && <AboutPage />}
      {currentView === 'contact' && <ContactPage />}
      {currentView === 'wishlist' && <WishlistPage />}
    </main>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#FAEEDA]/30 text-[#3A2A1E] font-sans selection:bg-[#FAC775] selection:text-[#3A2A1E]">
        {/* Top Header Bars */}
        <Header />
        <Navbar />

        {/* Dynamic Route Content */}
        <MainContent />

        {/* Global Footer */}
        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <QuickViewModal />
        <SearchOverlay />
        <Toast />
      </div>
    </StoreProvider>
  );
}

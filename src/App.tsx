import { useState } from 'react';
import type { Brand, ViewType } from './types';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import GlobalHealth from './components/GlobalHealth';
import BrandParity from './components/BrandParity';
import ClusterManager from './components/ClusterManager';
import BigBoulderTracking from './components/BigBoulderTracking';
import DevinInsights from './components/DevinInsights';
import SentinelScoping from './components/SentinelScoping';
import ServiceCatalog from './components/ServiceCatalog';
import ServiceDetail from './components/ServiceDetail';

function App() {
  const [brand, setBrand] = useState<Brand>('unified');
  const [currentView, setCurrentView] = useState<ViewType>('global-health');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceSelect = (repoName: string) => {
    setSelectedService(repoName);
    setCurrentView('service-detail');
  };

  const handleBackToFleet = () => {
    setSelectedService(null);
    setCurrentView('global-health');
  };

  const handleViewChange = (view: ViewType) => {
    if (view !== 'service-detail') {
      setSelectedService(null);
    }
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'global-health':
        return <GlobalHealth brand={brand} />;
      case 'brand-parity':
        return <BrandParity />;
      case 'cluster-manager':
        return <ClusterManager brand={brand} />;
      case 'big-boulder':
        return <BigBoulderTracking />;
      case 'devin-insights':
        return <DevinInsights />;
      case 'sentinel-scoping':
        return <SentinelScoping />;
      case 'service-catalog':
        return <ServiceCatalog brand={brand} onServiceSelect={handleServiceSelect} />;
      case 'service-detail':
        return selectedService ? <ServiceDetail serviceName={selectedService} /> : <GlobalHealth brand={brand} />;
      default:
        return <GlobalHealth brand={brand} />;
    }
  };

  return (
    <div className="min-h-screen bg-expedia-bg">
      <TopNav selectedBrand={brand} onBrandChange={setBrand} />
      <div className="max-w-7xl mx-auto pt-14">
        <div className="grid grid-cols-[260px_1fr]">
          <Sidebar
            currentView={currentView}
            onViewChange={handleViewChange}
            selectedServiceName={selectedService}
            onBackToFleet={handleBackToFleet}
          />
          <main className="px-4 py-4 gap-4">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

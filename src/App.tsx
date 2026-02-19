import { useState } from 'react';
import type { Brand, ViewType } from './types';
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
        return <GlobalHealth brand={brand} onBrandChange={setBrand} />;
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
        return selectedService ? <ServiceDetail serviceName={selectedService} /> : <GlobalHealth brand={brand} onBrandChange={setBrand} />;
      default:
        return <GlobalHealth brand={brand} onBrandChange={setBrand} />;
    }
  };

  return (
    <div className="min-h-screen bg-expedia-bg">
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        selectedServiceName={selectedService}
        onBackToFleet={handleBackToFleet}
      />
      <main className="ml-28">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;

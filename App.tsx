
import React, { useState, useEffect, useCallback } from 'react';
import type { TemperatureReading } from './types';
import { FEVER_HIGH_THRESHOLD, FEVER_MEDIUM_THRESHOLD } from './constants';
import Header from './components/Header';
import TemperatureDisplay from './components/TemperatureDisplay';
import HistorySection from './components/HistorySection';
import WearableStatus from './components/WearableStatus';
import FeverAlertModal from './components/FeverAlertModal';

const App: React.FC = () => {
  const [history, setHistory] = useState<TemperatureReading[]>([]);
  const [currentReading, setCurrentReading] = useState<TemperatureReading | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [showFeverAlert, setShowFeverAlert] = useState<boolean>(false);

  // Simulate initial data load
  useEffect(() => {
    const initialHistory: TemperatureReading[] = [
      { value: 36.8, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
      { value: 37.1, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { value: 36.9, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    ];
    setHistory(initialHistory);
    setCurrentReading(initialHistory[initialHistory.length - 1]);
  }, []);

  const simulateTemperatureMeasurement = useCallback((): number => {
    // Generates a temperature between 36.2°C and 40.0°C
    // Biased towards normal temperatures but can spike
    const isFeverish = Math.random() > 0.8;
    let temp;
    if (isFeverish) {
      temp = 37.8 + Math.random() * 2.2; // 37.8 to 40.0
    } else {
      temp = 36.2 + Math.random() * 1.3; // 36.2 to 37.5
    }
    return parseFloat(temp.toFixed(1));
  }, []);

  const handleScan = useCallback(() => {
    setIsScanning(true);
    setCurrentReading(null);

    setTimeout(() => {
      const newValue = simulateTemperatureMeasurement();
      const newReading: TemperatureReading = {
        value: newValue,
        timestamp: new Date(),
      };

      setCurrentReading(newReading);
      setHistory(prevHistory => [...prevHistory, newReading]);
      setIsScanning(false);

      if (newValue >= FEVER_HIGH_THRESHOLD) {
        setShowFeverAlert(true);
      }
    }, 3000);
  }, [simulateTemperatureMeasurement]);

  const getTemperatureStatus = (temp: number | undefined | null) => {
    if (temp == null) return 'unknown';
    if (temp >= FEVER_HIGH_THRESHOLD) return 'high';
    if (temp >= FEVER_MEDIUM_THRESHOLD) return 'medium';
    return 'normal';
  };

  const status = getTemperatureStatus(currentReading?.value);

  const statusColors = {
    normal: 'from-green-400 to-cyan-400',
    medium: 'from-yellow-400 to-orange-400',
    high: 'from-red-500 to-rose-500',
    unknown: 'from-slate-400 to-slate-500',
  };

  return (
    <div className={`min-h-screen w-full bg-slate-50 font-sans text-slate-800 transition-all duration-500`}>
      <div className={`relative bg-gradient-to-br ${statusColors[status]} pb-32 pt-6 px-4 md:px-6`}>
        <Header />
        <TemperatureDisplay reading={currentReading} isScanning={isScanning} />
        <WearableStatus />
      </div>

      <main className="-mt-24 p-4 md:p-6 space-y-6">
        <HistorySection history={history} />
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200">
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="w-full h-16 bg-blue-600 text-white rounded-full text-xl font-bold shadow-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-100"
        >
          {isScanning ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-camera"></i>
              <span>Measure Temperature</span>
            </>
          )}
        </button>
      </div>

      <FeverAlertModal
        isOpen={showFeverAlert}
        onClose={() => setShowFeverAlert(false)}
        temperature={currentReading?.value}
      />
      <div className="h-24"></div> {/* Spacer for sticky footer */}
    </div>
  );
};

export default App;

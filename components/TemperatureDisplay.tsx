
import React from 'react';
import type { TemperatureReading } from '../types';
import { FEVER_HIGH_THRESHOLD, FEVER_MEDIUM_THRESHOLD } from '../constants';

interface TemperatureDisplayProps {
  reading: TemperatureReading | null;
  isScanning: boolean;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ reading, isScanning }) => {

  const getStatusInfo = (temp: number | undefined | null) => {
    if (temp == null) {
      return { text: 'N/A', icon: 'fa-question-circle', color: 'text-white' };
    }
    if (temp >= FEVER_HIGH_THRESHOLD) {
      return { text: 'High Fever', icon: 'fa-triangle-exclamation', color: 'text-red-300' };
    }
    if (temp >= FEVER_MEDIUM_THRESHOLD) {
      return { text: 'Slight Fever', icon: 'fa-circle-exclamation', color: 'text-yellow-200' };
    }
    return { text: 'Normal', icon: 'fa-circle-check', color: 'text-green-200' };
  };

  const statusInfo = getStatusInfo(reading?.value);

  if (isScanning) {
    return (
      <div className="text-center text-white my-8 animate-pulse">
        <div className="text-6xl font-light mb-2">--.- °C</div>
        <div className="text-xl font-semibold opacity-80">Scanning...</div>
        <div className="mt-4 text-sm opacity-60">Point camera at forehead</div>
      </div>
    );
  }

  return (
    <div className="text-center text-white my-8">
      <div className="text-7xl font-light tracking-tighter">
        {reading ? `${reading.value.toFixed(1)}` : '--.-'}
        <span className="text-5xl opacity-80 ml-1">°C</span>
      </div>
      <div className={`flex items-center justify-center gap-2 mt-2 text-lg font-semibold ${statusInfo.color}`}>
        <i className={`fa-solid ${statusInfo.icon}`}></i>
        <span>{statusInfo.text}</span>
      </div>
    </div>
  );
};

export default TemperatureDisplay;

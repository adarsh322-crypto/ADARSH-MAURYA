
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TemperatureReading } from '../types';
import { FEVER_HIGH_THRESHOLD, FEVER_MEDIUM_THRESHOLD } from '../constants';

interface HistorySectionProps {
  history: TemperatureReading[];
}

const HistoryListItem: React.FC<{ reading: TemperatureReading }> = ({ reading }) => {
  const getStatusColor = (temp: number) => {
    if (temp >= FEVER_HIGH_THRESHOLD) return 'bg-red-100 text-red-800';
    if (temp >= FEVER_MEDIUM_THRESHOLD) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <li className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
      <div>
        <p className="font-semibold text-slate-700">
          {reading.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p className="text-sm text-slate-500">
          {reading.timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' })}
        </p>
      </div>
      <div className={`px-3 py-1 text-lg font-bold rounded-full ${getStatusColor(reading.value)}`}>
        {reading.value.toFixed(1)}°C
      </div>
    </li>
  );
};

const HistorySection: React.FC<HistorySectionProps> = ({ history }) => {
  const chartData = history.map(r => ({
    time: r.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    temp: r.value,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Health History</h2>
      </div>
      <div className="h-56 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(4px)',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
              }}
            />
            <Line type="monotone" dataKey="temp" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5, fill: '#0284c7' }} activeDot={{ r: 8 }} name="Temp" unit="°C" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="p-2">
        <ul className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
          {[...history].reverse().map((reading, index) => (
            <HistoryListItem key={index} reading={reading} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistorySection;

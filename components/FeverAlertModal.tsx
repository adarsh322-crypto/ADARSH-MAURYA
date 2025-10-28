
import React from 'react';

interface FeverAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  temperature?: number;
}

const FeverAlertModal: React.FC<FeverAlertModalProps> = ({ isOpen, onClose, temperature }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center transform transition-all animate-in fade-in-0 zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <i className="fa-solid fa-triangle-exclamation text-3xl text-red-500"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">High Fever Alert</h2>
        <p className="text-4xl font-bold text-red-600 my-3">{temperature?.toFixed(1) ?? '--.-'}°C</p>
        <p className="text-slate-600 mb-6">
          Your temperature is high. Please rest and consider consulting a medical professional.
        </p>
        <button
          onClick={onClose}
          className="w-full h-12 bg-red-500 text-white rounded-full text-lg font-semibold hover:bg-red-600 transition-colors"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default FeverAlertModal;

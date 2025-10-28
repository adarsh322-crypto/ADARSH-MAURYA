
import React, { useState, useEffect } from 'react';

const WearableStatus: React.FC = () => {
    const [heartRate, setHeartRate] = useState(72);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeartRate(Math.floor(65 + Math.random() * 15));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-6 flex items-center justify-center gap-4 text-white text-sm">
            <div className="flex items-center gap-2 opacity-90">
                <i className="fa-brands fa-watch-fitness text-green-300 text-lg"></i>
                <span>Smartwatch Connected</span>
            </div>
            <div className="w-px h-5 bg-white/30"></div>
            <div className="flex items-center gap-2 opacity-90">
                <i className="fa-solid fa-heart-pulse text-red-300 animate-pulse"></i>
                <span>{heartRate} bpm</span>
            </div>
        </div>
    );
};

export default WearableStatus;

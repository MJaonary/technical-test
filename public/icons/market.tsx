import React from 'react';

interface MarketIconProps {
  className?: string;
}

function MarketIcon({ className }: MarketIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.792 2H1v2h3.218l2.77 12.678H7V17h13v-.248l2.193-9.661L22.531 6H6.655l-.57-2.611L5.792 2zm14.195 6H7.092l1.529 7h9.777l1.589-7z"
        clipRule="evenodd"
      ></path>
      <path fill="currentColor" d="M10 22a2 2 0 100-4 2 2 0 000 4zM19 20a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
  );
}

export default MarketIcon;

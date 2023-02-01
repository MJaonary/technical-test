import React from 'react';

interface BackIconProps {
  className?: string;
}

function BackIcon({ className }: BackIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M1.027 11.993l4.235 4.25L6.68 14.83l-1.821-1.828 18.115-.002v-2l-18.12.002L6.69 9.174 5.277 7.757l-4.25 4.236z"
      ></path>
    </svg>
  );
}

export default BackIcon;

import React from 'react';

interface LogoProps {
  className: string;
  label?: string;
}

export const Logo: React.FC<LogoProps> = ({ className, label }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
  >
    <rect width="24" height="24" rx="5.5" fill="#0D7C85" />
    <circle cx="12" cy="12" r="5.6" fill="none" stroke="#FFFFFF" strokeWidth="1.3" />
    <circle cx="12" cy="12" r="1.6" fill="#FFFFFF" />
  </svg>
);

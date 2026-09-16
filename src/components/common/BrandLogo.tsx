import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  href?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  onClick,
  href = '/'
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
        e.preventDefault();
        onClick(e);
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
      id="aghran-brand-logo"
    >
      {/* Circular Emblem with Rice Stalk Motif & Bangla "অ" */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Outer circle terracotta */}
          <circle cx="50" cy="50" r="48" fill="#D85A30" stroke="#FAF6EE" strokeWidth="2" />
          {/* Inner ring cream */}
          <circle cx="50" cy="50" r="42" fill="#FAF6EE" />
          
          {/* Rice stalk decorative arc left */}
          <path
            d="M 28 65 C 25 45, 35 25, 50 18"
            fill="none"
            stroke="#639922"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="30" cy="52" r="2.5" fill="#FAC775" />
          <circle cx="33" cy="40" r="2.5" fill="#FAC775" />
          <circle cx="40" cy="29" r="2.5" fill="#FAC775" />
          <circle cx="48" cy="21" r="2.5" fill="#FAC775" />

          {/* Rice stalk decorative arc right */}
          <path
            d="M 72 65 C 75 45, 65 25, 50 18"
            fill="none"
            stroke="#639922"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="70" cy="52" r="2.5" fill="#FAC775" />
          <circle cx="67" cy="40" r="2.5" fill="#FAC775" />
          <circle cx="60" cy="29" r="2.5" fill="#FAC775" />
          <circle cx="52" cy="21" r="2.5" fill="#FAC775" />

          {/* Center Bangla Script "অঘ্রাণ" */}
          <text
            x="50"
            y="54"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Tiro Bangla', 'Hind Siliguri', serif"
            fontWeight="bold"
            fontSize="18"
            fill="#D85A30"
          >
            অঘ্রাণ
          </text>

          {/* Small English text arc or base */}
          <text
            x="50"
            y="76"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="700"
            fontSize="7"
            letterSpacing="1.5"
            fill="#639922"
          >
            EST. 2024
          </text>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`font-serif-bangla font-bold text-[#D85A30] tracking-tight ${titleSizes[size]}`}>
          অঘ্রাণ
        </span>
      </div>
    </a>
  );
};

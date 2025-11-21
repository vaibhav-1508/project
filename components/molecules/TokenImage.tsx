import React from 'react';

interface TokenImageProps {
  symbol: string;
  imageColor: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TokenImage = React.memo<TokenImageProps>(({
  symbol,
  imageColor,
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={`${sizeStyles[size]} rounded-sm ${imageColor} shrink-0 flex items-center justify-center text-white font-bold shadow-lg`}
    >
      {symbol[0]}
    </div>
  );
});

TokenImage.displayName = 'TokenImage';

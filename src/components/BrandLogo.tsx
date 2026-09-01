import React from 'react';
import { ORIGINAL_LOGO_BASE64 } from '../assets/logoBase64';

export interface BrandLogoProps {
  variant?: 'full' | 'horizontal' | 'icon' | 'watermark' | 'stamp' | 'badge';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero' | 'custom';
  className?: string;
  theme?: 'default' | 'dark' | 'white' | 'monochrome';
  opacity?: number;
  removeBg?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  theme = 'default',
  opacity = 1,
  removeBg = true,
}) => {
  // Sizing definitions
  const sizeClasses = {
    xs: 'h-6 w-auto',
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto',
    '2xl': 'h-32 w-auto',
    hero: 'h-48 md:h-64 w-auto',
    custom: '',
  };

  const isDarkBg = theme === 'dark' || theme === 'white';

  // For dark containers / headers, mix-blend-multiply doesn't work on dark backgrounds,
  // so we use a clean container or screen filter, or styled badge
  const imageFilterStyle: React.CSSProperties = {
    opacity,
    // When removeBg is true on light surfaces, mix-blend-multiply makes the white background 100% transparent
    // preserving the exact original artwork, colors, towers, star and text!
    mixBlendMode: removeBg ? (theme === 'dark' ? 'normal' : 'multiply') : 'normal',
  };

  // Full Original Logo (The real original image with white background knocked out via multiply blend)
  if (variant === 'full') {
    return (
      <div 
        className={`inline-flex flex-col items-center justify-center select-none ${className}`}
        style={{ opacity }}
      >
        <img
          src={ORIGINAL_LOGO_BASE64}
          alt="Bistrô Pai D'égua - Logo Oficial"
          className={`${sizeClasses[size]} object-contain`}
          style={imageFilterStyle}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Horizontal Header Layout with original logo
  if (variant === 'horizontal') {
    if (theme === 'dark') {
      return (
        <div className={`inline-flex items-center space-x-2.5 select-none bg-stone-900/95 py-1 px-2.5 rounded-xl border border-stone-800 shadow-xs ${className}`}>
          <div className="h-7 w-7 bg-white rounded-lg p-0.5 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
            <img 
              src={ORIGINAL_LOGO_BASE64} 
              alt="Logo Bistrô Pai D'égua" 
              className="h-full w-full object-contain mix-blend-multiply" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[10px] font-bold tracking-wider text-stone-400 lowercase font-serif">bistrô</span>
            <span className="text-sm font-black text-red-500 font-serif tracking-tight flex items-center">
              Pai D<span className="text-sky-400 text-xs mx-0.5">★</span>égua
            </span>
          </div>
        </div>
      );
    }

    return (
      <div 
        className={`inline-flex items-center select-none ${sizeClasses[size]} ${className}`}
        style={{ opacity }}
      >
        <img
          src={ORIGINAL_LOGO_BASE64}
          alt="Bistrô Pai D'égua"
          className="h-9 w-auto object-contain mix-blend-multiply"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Icon Only (Compact Logo on badge or transparent)
  if (variant === 'icon') {
    if (theme === 'white' || theme === 'dark') {
      return (
        <div className={`inline-flex items-center justify-center bg-white rounded-xl p-1 shadow-sm ${className}`}>
          <img 
            src={ORIGINAL_LOGO_BASE64} 
            alt="Logo Bistrô Pai D'égua" 
            className="h-8 w-8 object-contain mix-blend-multiply" 
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={ORIGINAL_LOGO_BASE64}
          alt="Logo Bistrô Pai D'égua"
          className={`${sizeClasses[size]} object-contain mix-blend-multiply`}
          style={{ opacity }}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Watermark (Original mark knocked out and softened for backgrounds & printable forms)
  if (variant === 'watermark') {
    return (
      <div 
        className={`pointer-events-none select-none flex items-center justify-center ${className}`}
        style={{ opacity: opacity ?? 0.06 }}
      >
        <img
          src={ORIGINAL_LOGO_BASE64}
          alt="Marca D'água Bistrô Pai D'égua"
          className="max-h-72 md:max-h-96 w-auto object-contain mix-blend-multiply grayscale-25"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Stamp Seal Badge
  return (
    <div className={`inline-flex items-center space-x-2.5 bg-stone-900 text-white px-3 py-1.5 rounded-xl border border-stone-800 shadow-md ${className}`}>
      <div className="h-6 w-6 bg-white rounded-md p-0.5 flex items-center justify-center shrink-0">
        <img 
          src={ORIGINAL_LOGO_BASE64} 
          alt="Selo Bistrô Pai D'égua" 
          className="h-full w-full object-contain mix-blend-multiply" 
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] font-mono uppercase tracking-widest text-amber-300">Padrão Autêntico</span>
        <span className="text-xs font-black text-white">Bistrô Pai D'égua</span>
      </div>
    </div>
  );
};

// Full Document Watermark Container Component with responsive background overlay
export interface WatermarkOverlayProps {
  opacity?: number;
  className?: string;
  showMarajoaraBorders?: boolean;
}

export const BrandWatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  opacity = 0.05,
  className = '',
  showMarajoaraBorders = true
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* Centered Large Official Watermark using Original Logo without background */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <BrandLogo variant="watermark" opacity={opacity} />
      </div>

      {/* Top & Bottom Marajoara Color Stripe accents */}
      {showMarajoaraBorders && (
        <>
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-stone-800 to-sky-500 opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-800 via-red-600 to-stone-800 opacity-40" />
        </>
      )}
    </div>
  );
};

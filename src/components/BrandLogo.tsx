interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'on-red';
  showSubtitle?: boolean;
}

export default function BrandLogo({ size = 'md', variant = 'dark', showSubtitle = true }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const subtitleSizeClasses = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-[12px] tracking-[0.3em]',
    xl: 'text-[13px] tracking-[0.35em]'
  };

  const getTextColor = () => {
    if (variant === 'light') return 'text-white';
    if (variant === 'on-red') return 'text-white';
    return 'text-slate-900';
  };

  const getSubtitleColor = () => {
    if (variant === 'light') return 'text-slate-300';
    if (variant === 'on-red') return 'text-white/80';
    return 'text-slate-500';
  };

  const getRedColor = () => {
    if (variant === 'on-red') return 'text-yellow-300'; // high contrast on red background
    return 'text-red-600';
  };

  return (
    <div className="flex flex-col items-center select-none text-center">
      <div className={`font-black uppercase tracking-wider font-display flex items-baseline leading-none ${sizeClasses[size]} ${getTextColor()}`}>
        <span>YUKTH</span>
        <span className={`${getRedColor()} font-black`}>A</span>
      </div>
      {showSubtitle && (
        <span className={`font-semibold uppercase mt-1 ${subtitleSizeClasses[size]} ${getSubtitleColor()}`}>
          PROJECT GUIDANCE & TECHNICAL SERVICES
        </span>
      )}
    </div>
  );
}

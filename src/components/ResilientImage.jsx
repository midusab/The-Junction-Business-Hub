import {useState} from 'react';
import {ImageOff} from 'lucide-react';

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 text-slate-500 p-6 text-center ${className}`}
      >
        <ImageOff className="w-7 h-7 mb-2 text-slate-400" strokeWidth={1.5} />
        <span className="text-sm font-medium text-slate-700">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

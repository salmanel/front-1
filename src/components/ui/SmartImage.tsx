// src/components/ui/SmartImage.tsx
import React from 'react';

type SmartImageProps = React.ComponentProps<'img'> & {
  /** Exact rendered width in px (prefer exact to avoid shifts) */
  width?: number;
  /** Exact rendered height in px */
  height?: number;
  /** If exact size is unknown, you can set an aspect ratio like 16/9 or 1 */
  aspectRatio?: number;
  /** True for above-the-fold/critical images (prevents lazy) */
  critical?: boolean;
};

export function SmartImage({
  width,
  height,
  aspectRatio,
  critical,
  style,
  loading,
  decoding = 'async',
  ...rest
}: SmartImageProps) {
  const computedStyle = { ...style } as React.CSSProperties;
  if (!width && !height && aspectRatio) {
    computedStyle.aspectRatio = String(aspectRatio);
    // Let CSS lock the box; actual rendered size comes from Tailwind classes
  }

  return (
    <img
      width={width}
      height={height}
      loading={critical ? 'eager' : loading || 'lazy'}
      decoding={decoding}
      style={computedStyle}
      {...rest}
    />
  );
}

/**
 * ImageGallery
 * Interactive product image gallery with primary view and thumbnail switcher.
 *
 * @param {string[]} images - array of product image URLs
 * @param {string} alt - image accessibility text
 *
 * Used in: ProductDetails page
 */

import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [activeImage, setActiveImage] = useState(images[0] || '');

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {/* Thumbnail Switcher */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeImage === img
                  ? 'border-[#D4AF37] shadow-sm'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${alt} view ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 rounded-3xl overflow-hidden bg-[#1B1229] border border-[#2E2045] aspect-square relative shadow-xs">
        <img
          src={activeImage || images[0]}
          alt={alt}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

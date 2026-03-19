import { useState } from 'react';
import { type ProductImage } from '@/types/marketplace';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: ProductImage[];
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const mainImage = images.length > 0 ? images[activeImageIndex].url : 'https://picsum.photos/seed/placeholder/800/800';

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border bg-neutral-50">
        <img
          src={mainImage}
          alt="Product"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <button
              key={image.key}
              onClick={() => setActiveImageIndex(index)}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all",
                activeImageIndex === index ? "border-emerald-600 ring-2 ring-emerald-100" : "border-transparent hover:border-neutral-300"
              )}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

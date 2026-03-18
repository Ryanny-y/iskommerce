import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageUploadProps {
  images: File[];
  onChange: (images: File[]) => void;
  error?: string;
}

export const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  images,
  onChange,
  error
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages = [...images, ...files];
    onChange(newImages);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file as Blob));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);

    // Revoke URL to avoid memory leaks
    URL.revokeObjectURL(previews[index]);
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-4">
      <Label className={cn(error && "text-destructive")}>Product Images</Label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border bg-muted group">
            <img 
              src={preview} 
              alt={`Preview ${index}`} 
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 p-1 bg-red-300 text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors",
            error ? "border-destructive text-destructive" : "border-muted-foreground/25 text-muted-foreground"
          )}
        >
          <Upload className="h-6 w-6" />
          <span className="text-xs font-medium">Upload</span>
        </button>
      </div>

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
};

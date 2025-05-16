'use client';

import { useState } from 'react';

export function useImageUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelection = (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetImage = () => {
    setImage(null);
    setImagePreview(null);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  return {
    image,
    imagePreview,
    handleImageSelection,
    resetImage,
  };
}

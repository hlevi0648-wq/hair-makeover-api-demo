'use client';

import { useTextToImage } from '@/hooks/useTextToImage';
import { createContext, ReactNode, useContext } from 'react';

type TextToImageContextType = ReturnType<typeof useTextToImage>;

const TextToImageContext = createContext<TextToImageContextType | undefined>(undefined);

export function TextToImageProvider({ children }: { children: ReactNode }) {
  const textToImageState = useTextToImage();

  return (
    <TextToImageContext.Provider value={textToImageState}>{children}</TextToImageContext.Provider>
  );
}

export function useTextToImageContext() {
  const context = useContext(TextToImageContext);

  if (context === undefined) {
    throw new Error('useTextToImageContext must be used within a TextToImageProvider');
  }

  return context;
}

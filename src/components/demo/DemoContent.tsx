'use client';

import { HairstyleSelector } from '@/components/demo/HairstyleSelector';
import { ImagePicker } from '@/components/demo/ImagePicker';
import { ImagePreview } from '@/components/demo/ImagePreview';
import { LoadingState } from '@/components/demo/LoadingState';
import { ResultView } from '@/components/demo/ResultView';
import { useTextToImageContext } from '@/contexts/TextToImageContext';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useState } from 'react';
import { Button } from '../ui/button';

const hairstyles = [
  {
    imageUrl: '/images/hairstyles/1.jpeg',
    prompt: '',
  },
  {
    imageUrl: '/images/hairstyles/2.jpeg',
    prompt: '',
  },
  {
    imageUrl: '/images/hairstyles/3.jpeg',
    prompt: '',
  },
  {
    imageUrl: '/images/hairstyles/4.jpeg',
    prompt: '',
  },
  {
    imageUrl: '/images/hairstyles/5.jpeg',
    prompt: '',
  },
  {
    imageUrl: '/images/hairstyles/6.jpeg',
    prompt: '',
  },
  {
    imageUrl: '/images/hairstyles/7.jpeg',
    prompt: '',
  },
  {
    imageUrl: '/images/hairstyles/8.jpeg',
    prompt: '',
  },
  {
    imageUrl: '/images/hairstyles/9.jpeg',
    prompt: '',
  },
];

export function DemoContent() {
  const { image, imagePreview, handleImageSelection, resetImage } = useImageUpload();
  const { isLoading, results, generateImage, resetResults, apiKey } = useTextToImageContext();
  const [selectedHairstyle, setSelectedHairstyle] = useState<number>(-1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const index = selectedHairstyle - 1;
    const hairstyleData = hairstyles[index];

    if (image && hairstyleData && apiKey) {
      generateImage(image, hairstyleData.imageUrl, hairstyleData.prompt, apiKey);
    } else if (!apiKey) {
      console.warn('API key is not set. Please set it in the header.');
      alert('Please set your Runway API Key in the header first.');
    }
  };

  const handleReset = () => {
    resetImage();
    resetResults();
    setSelectedHairstyle(-1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="mx-auto flex flex-col items-center gap-2.5">
        <h2 className="text-3xl font-normal text-[#0C0C0C] sm:text-4xl">Hair Makeover Generator</h2>
        <p className="text-base font-normal text-[#7C7C7C] sm:text-lg">
          Try out different hairstyles with just one selfie.
        </p>
      </div>

      <div className="flex flex-col gap-8 rounded-lg border border-[#D0D4D4] bg-white p-4 sm:p-6 md:p-8">
        {isLoading ? (
          <LoadingState onCancel={() => handleReset()} />
        ) : (
          <>
            {results.length > 0 ? (
              <ResultView results={results} onReset={handleReset} />
            ) : (
              <>
                <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
                  <div className="flex w-full flex-1 flex-col gap-4 md:w-auto">
                    <p className="text-center text-xs font-medium text-[#0C0C0C] uppercase">
                      Add a selfie
                    </p>
                    {imagePreview ? (
                      <ImagePreview imageUrl={imagePreview} onClear={handleReset} />
                    ) : (
                      <ImagePicker onImageSelected={handleImageSelection} />
                    )}
                  </div>
                  <div className="flex w-full flex-1 flex-col gap-4 md:w-auto">
                    <p className="text-center text-xs font-medium text-[#0C0C0C] uppercase">
                      Select hairstyle
                    </p>
                    <HairstyleSelector onSelect={setSelectedHairstyle} />
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!image || selectedHairstyle === -1 || !apiKey}
                  className="mx-auto"
                  title={!apiKey ? 'Please set your API key in the header' : ''}
                >
                  Generate
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

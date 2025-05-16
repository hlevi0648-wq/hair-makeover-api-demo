import { cn } from '@/lib/utils';
import { useState } from 'react';

type HairstyleSelectorProps = {
  onSelect: (hairstyleId: number) => void;
};

export function HairstyleSelector({ onSelect }: HairstyleSelectorProps) {
  const [selectedHairstyle, setSelectedHairstyle] = useState<number | null>(null);

  const hairstyles = Array.from({ length: 9 }, (_, id) => ({
    id: id + 1,
    src: `/images/hairstyles/${id + 1}.jpeg`,
  }));

  const handleSelect = (id: number) => {
    if (selectedHairstyle === id) {
      setSelectedHairstyle(null);
      onSelect(-1); // -1 indicates no selection
    } else {
      setSelectedHairstyle(id);
      onSelect(id);
    }
  };

  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4"
      role="radiogroup"
      aria-label="Hairstyle options"
    >
      {hairstyles.map(hairstyle => (
        <button
          key={hairstyle.id}
          type="button"
          onClick={() => handleSelect(hairstyle.id)}
          className={cn(
            'mx-auto h-[100px] w-[100px] cursor-pointer overflow-hidden rounded-full border transition-all duration-300 focus:outline-none sm:h-30 sm:w-30',
            selectedHairstyle === hairstyle.id ? 'border-[#000000]' : 'border-[#E4E5E6]',
            selectedHairstyle !== null && selectedHairstyle !== hairstyle.id
              ? 'opacity-30'
              : 'opacity-100'
          )}
          role="radio"
          aria-checked={selectedHairstyle === hairstyle.id}
        >
          <img
            src={hairstyle.src}
            alt={`Hairstyle ${hairstyle.id}`}
            className="h-full w-full object-cover"
          />
          <span className="sr-only">
            {selectedHairstyle === hairstyle.id
              ? `Hairstyle ${hairstyle.id} selected`
              : `Select hairstyle ${hairstyle.id}`}
          </span>
        </button>
      ))}
    </div>
  );
}

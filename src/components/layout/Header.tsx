'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { GET_STARTED_URL } from '@/constants';
import { useTextToImageContext } from '@/contexts/TextToImageContext';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { apiKey, setApiKey } = useTextToImageContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPopoverOpen(false);
  };

  return (
    <header className="py-4">
      <div className="flex items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="relative rounded-full border-gray-500 px-4 py-2 text-sm text-gray-500 outline-none hover:border-black hover:text-black focus-visible:border-black focus-visible:text-black"
              >
                {apiKey ? 'Change API key' : 'Get started'}
                {!apiKey && (
                  <span className="absolute -top-1 right-0 block h-3 w-3 rounded-full bg-red-500" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Label htmlFor="apiKey">Runway API Key</Label>
                <Input
                  id="apiKey"
                  value={apiKey || ''}
                  onChange={e => setApiKey(e.target.value || null)}
                  placeholder="rk_..."
                  className="col-span-2 h-8"
                />
                <p className="text-muted-foreground text-xs">
                  Don&apos;t have an API key?{` `}
                  <Link
                    href={GET_STARTED_URL}
                    target="_blank"
                    className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
                  >
                    Get started
                  </Link>
                  .
                </p>
                <Button type="submit">Save & Close</Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}

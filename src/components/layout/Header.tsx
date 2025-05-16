'use client';

import { GET_STARTED_URL } from '@/constants';
import Link from 'next/link';

export function Header() {
  return (
    <header className="py-4">
      <div className="flex items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <Link
            href={GET_STARTED_URL}
            target="_blank"
            className="text-sm text-gray-500 hover:text-black"
          >
            Learn more about Runway API
          </Link>
        </div>
      </div>
    </header>
  );
}

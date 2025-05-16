import Link from 'next/link';

import {
  CODE_OF_CONDUCT_URL,
  LEARN_MORE_URL,
  PRIVACY_POLICY_URL,
  SYSTEM_STATUS_URL,
  TERMS_OF_USE_URL,
} from '@/constants';

export function Footer() {
  return (
    <footer className="py-4 text-xs">
      <div className="grid grid-cols-[auto_1fr_auto] px-4">
        <div />
        <div className="flex items-center justify-center gap-3 font-medium text-gray-500 uppercase">
          <span>
            © {new Date().getFullYear()}
            {` `}
            <Link
              href="https://runwayml.com/"
              target="_blank"
              className="outline-none hover:text-black focus-visible:text-black"
            >
              Runway
            </Link>
            {` `}
            AI, Inc.
          </span>
          <span>/</span>
          <Link
            href={TERMS_OF_USE_URL}
            target="_blank"
            className="outline-none hover:text-black focus-visible:text-black"
          >
            Terms of Use
          </Link>
          <span>/</span>
          <Link
            href={PRIVACY_POLICY_URL}
            target="_blank"
            className="outline-none hover:text-black focus-visible:text-black"
          >
            Privacy Policy
          </Link>
          <span>/</span>
          <Link
            href={CODE_OF_CONDUCT_URL}
            target="_blank"
            className="outline-none hover:text-black focus-visible:text-black"
          >
            Code of Conduct
          </Link>
          <span>/</span>
          <Link
            href={SYSTEM_STATUS_URL}
            target="_blank"
            className="outline-none hover:text-black focus-visible:text-black"
          >
            System Status
          </Link>
        </div>
        <Link
          href={LEARN_MORE_URL}
          target="_blank"
          className="flex items-center gap-1 text-xs font-medium font-normal text-[#7C7C7C]"
        >
          Made with
          <img src="/images/logo.svg" alt="Runway API" width={60} />
        </Link>
      </div>
    </footer>
  );
}

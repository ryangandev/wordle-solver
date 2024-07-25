import Link from 'next/link';
import React from 'react';

import { footerLinks } from '@/lib/data';

const Footer = () => {
  const getYear = () => new Date().getFullYear();

  return (
    <footer className="flex justify-center">
      <div className="flex w-full min-w-[350px] max-w-3xl flex-col items-center space-y-4 border-t p-6">
        <div className="flex flex-col justify-center space-y-2 sm:flex-row sm:space-x-8 sm:space-y-0">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              className="flex items-center space-x-2 transition-colors hover:text-blue-600 dark:hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="h-4 w-4">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
        <small className="text-muted-foreground">
          &copy; {getYear()} Ryan Gan. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;

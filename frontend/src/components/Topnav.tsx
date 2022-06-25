import { FC } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const TopNav: FC = () => {
  return (
    <nav className="bg-gray-500 flex-row-reverse">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}

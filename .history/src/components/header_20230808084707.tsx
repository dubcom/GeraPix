import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex container mx-auto lg:max-w-7xl md:items-center pb-12 justify-between md:flex md:px-2 p-2">
      <div className="text-white font-semibold px-4">
            <Link href="/">
            <Image
            src="/LogoDark.svg"
            alt="Logo Gera PIX"
            width={140}
            height={40}
          />
            </Link>
        </div>
        <div className="text-white font-semibold px-4">
            <Link href="/">
               Sair
            </Link>
        </div>
    </header>
  );
};

export default Header;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex container mx-auto lg:max-w-7xl md:items-center pb-12 justify-between md:flex md:px-2 p-2">
      <div className="text-white text-xs px-4">
            <Link href="/">
            <Image
            src="/LogoDark.svg"
            alt="Logo Gera PIX"
            width={140}
            height={40}
          />
            </Link>
        </div>
        <div className="text-white text-xs px-4">
            <Link href="/">
               Home
            </Link>
        </div>
        <div className="text-white text-xs px-4">
            <Link href="/">
               Gerar QR-Code
            </Link>
        </div>
        <div className="text-white text-xs px-4">
            <Link href="/">
               Sair
            </Link>
        </div>
        <div>
      <Image
        src="https://lh3.googleusercontent.com/a-/AOh14GiWEUq2IdzuupMmqGKLCNOvNW_TLMlG7_rb50CWqug=s96-c"
        alt="Minha Imagem"
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
    </header>
  );
};

export default Header;

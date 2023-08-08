import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Link from 'next/link'
import Footer from '@/components/footer'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <header> <Header /> </header>
      <main
        className={`flex flex-col container items-center p-12 ${inter.className}`}
      >
        

        <div className="flex flex-col items-center justify-center p-8">
          <Image
            src="/LogoDark.svg"
            alt="Logo Gera PIX"
            width={160}
            height={80}
          />
        </div>
        <h3 className="text-2xl font-bold text-center"> Entre agora</h3>
        <div className="text-sl text-center pt-4">
          <p> Faça seu login e cria sua conta PIX.</p> <p>Simples rápido e fácil.</p><p>Caso não tenha conta basta  criar uma. </p>
        </div>

        <form className="flex flex-col items-center justify-center pt-8">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16  rounded-lg text-sm focus:outline-none"
            type="text"
            placeholder="Seu e-mail"
          />
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 m-4 rounded-lg text-sm focus:outline-none"
            type="password"
            placeholder="Sua senha"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 flex p-4 rounded py-4 font-bold items-center m-4 "
            type="button"
          >

            ENTRAR AGORA

          </button>
          <button onClick="#" className=" bg-red-500 hover:bg-red-700 flex justify-center p-4 rounded py-2 font-bold items-center m-4  " >
            <Image className='flex mx-auto p-2'
              src="/google-icon.svg"
              alt="Logo Gera PIX"
              width={30}
              height={30}
            />
            COM GOOGLE
          </button>
        </form>

      </main>
      < Footer />

    </>
  )
}

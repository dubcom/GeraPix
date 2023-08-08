import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'


const inter = Inter({ subsets: ['latin'] })

export default function SignIn() {
  return (
    <div className='min-h-screen flex-col'>
    <header> <Header /> </header>
      <main>
        <div  className={`justify-center container mx-auto lg:max-w-7xl md:items-center pb-12 md:flex md:px-2 p-2'>
        ${inter.className}`}>
        <div className="flex flex-col items-center justify-center p-8"> 
          <Image
            src="/LogoDark.svg"
            alt="Logo Gera PIX"
            width={160}
            height={80}
          />
        <h3 className="text-2xl font-bold text-center"> Entre agora</h3>
        <div className="text-sl text-center p-4">
          <p> Faça seu login e cria sua conta PIX.</p> <p>Simples rápido e fácil.</p><p>Caso não tenha conta basta  criar uma. </p>
        </div>
        <button onClick="#" className=" bg-red-500 hover:bg-red-700 flex justify-center p-2 rounded  font-bold items-center  " >
            <Image className='flex mx-auto p-2'
              src="/google-icon.svg"
              alt="Logo Gera PIX"
              width={30}
              height={30}
            />
            Criar conta com Google
          </button>
        </div>
      

        <form className="flex flex-col items-center justify-center">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 m-2 rounded-lg text-sm focus:outline-none"
            type="text"
            placeholder="Seu Nome"
          />
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 m-2 rounded-lg text-sm focus:outline-none"
            type="text"
            placeholder="Seu e-mail"
          />
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 m-2 rounded-lg text-sm focus:outline-none"
            type="password"
            placeholder="Sua senha"
          />
            <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 m-2 rounded-lg text-sm focus:outline-none"
            type="password"
            placeholder="Confirme sua senha"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 flex lg:min-w-full justify-center p-4 rounded py-2 font-bold items-center m-4 "
            type="button"
          >

            Criar conta

          </button>
         
        </form>
        </div>
      </main>
      < Footer />
    </div>
  )
}

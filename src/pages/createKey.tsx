import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'


const inter = Inter({ subsets: ['latin'] })

export default function CreateKey() {
  return (
    <div className='min-h-screen flex-col'>
      <header> <Header /> </header>
      <main>
        <div className={`justify-center container mx-auto lg:max-w-7xl md:items-center pb-12 md:flex md:px-2 p-2'>
        ${inter.className}`}>
          <div className="flex flex-col items-center justify-center p-8">
            <Image
              src="/LogoDark.svg"
              alt="Logo Gera PIX"
              width={160}
              height={80}
            />
            <h3 className="text-2xl font-bold text-center"> Configure sua chave PIX</h3>
            <div className="text-sl text-center p-4">
              <p> verifique se seus dados já estão cadastrados no seu banco.</p><p>Caso não tenha uma chave validada no seu banco, o QR-Code não vai gerar um código valido. </p>
            </div>
          </div>


          <form className="flex flex-col items-center justify-center">
            <label className="block">
              <span className="block ml-2 text-sm font-medium text-slate-300">Nome completo</span>
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 mb-2 rounded-lg text-sm focus:outline-none"
                type="text"
                placeholder="Seu Nome"
              />
            </label>
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

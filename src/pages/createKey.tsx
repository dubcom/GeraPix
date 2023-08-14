import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import InputField from '@/components/inputForm'


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
              <p> Verifique se seus dados já estão cadastrados no seu banco.</p><p>Caso não tenha uma chave validada no seu banco, o QR-Code não vai gerar um código valido. </p>
            </div>
          </div>
          <form>
            <div className="flex flex-col items-center justify-center p-8">
              <InputField label="Chave PIX" placeholder={'Chave PIX valida'} type={'text'} />
              <InputField label="Nome do Beneficiário" placeholder={'Nome do beneficiário'} type={'text'} />
              <InputField label="Cidade" placeholder={'Cidade valida'} type={'text'} />

              <div className='mt-4 min-w-full'> 

              <button className="bg-green-500 hover:bg-green-700 min-w-full text-white font-bold py-2 px-4 rounded-lg">
                Gerar QR-Code
              </button>
              </div>
            </div>

          </form>

        </div>
      </main>
      < Footer />
    </div>
  )
}

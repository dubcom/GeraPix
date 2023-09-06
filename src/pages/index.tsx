import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useState } from 'react'
import InputField from '@/components/inputForm'

const inter = Inter({ subsets: ['latin'] })

interface User {
  password: string;
  email: string;
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 // função  login com google firebase
  const handleButtonClick = () => {
    console.log('Clicou no botão');
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  




  return (
    <div className='max-w-md flex-col min-h-screen'>
      <header> <Header /> </header>
      <main>
       
        <div className='justify-center container mx-auto lg:max-w-7xl md:items-center pb-12 md:flex md:px-2 p-2'>
        <div className="flex flex-col items-center justify-center p-8">
            <Image
              src="/LogoDark.svg"
              alt="Logo Gera PIX"
              width={160}
              height={80}
            />
            <h3 className="text-2xl font-bold text-center"> Entre agora</h3>
            
          </div>
        <div className="text-sl p-4">
              <p> Faça seu login e cria sua conta PIX. Simples rápido e fácil. Caso não tenha conta basta  criar uma. </p>
            </div>
          <form className="flex flex-col items-center max-w-full justify-center pt-4">
            <InputField label="E-mail" placeholder={'Seu E-mail'} type={'text'} name={'email'} onChange={handleEmailChange} value={email} />
            <InputField label="Senha" placeholder={'Sua Senha'} type={'password'} name={'password'} onChange={handlePasswordChange} value={password} />

            <button onClick={handleButtonClick} className="bg-blue-500 max-w-full hover:bg-blue-700 flex justify-center p-4 rounded py-2 font-bold items-center m-4 " type="button">
              ENTRAR
            </button>
            <button onClick="#" className=" bg-red-500 hover:bg-red-700 flex justify-center p-4 rounded py-2 font-bold items-center m-4 " >
            <Image className='flex mx-auto p-2'
              src="/google-icon.svg"
              alt="Logo Gera PIX"
              width={30}
              height={30}
            />
            COM GOOGLE
          </button>



          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

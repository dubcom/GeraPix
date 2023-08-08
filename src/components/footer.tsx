import Link from "next/link";

const Footer: React.FC = () => {
    return <footer className="container flex mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 justify-between p-4">
        <div className="text-white font-semibold px-4">
            <Link href="/">
                Criar conta
            </Link>
        </div>
        <div className="text-white font-semibold px-4">
            <Link href="/">
                Esqueceu a senha?
            </Link>
        </div>
    </footer>;
}

export default Footer;  
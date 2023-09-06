import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="container flex mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 justify-between p-4 absolute bottom-0 w-full">
            <div className="text-white text-xs px-4">
                <Link href="/">
                    Criar conta
                </Link>
            </div>
            <div className="text-white text-xs px-4 flex items-end">
                <Link href="/">
                    Esqueceu a senha?
                </Link>
            </div>
        </footer>
    );
}

export default Footer;

import AppLogoIcon from '../app-logo-icon';
import AppContainer from './app-container';

export default function Header() {
    return (
        <header className="border-b-solid flex h-16 w-full items-center justify-center border-b border-b-[#0000001A]">
            {/* <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </nav> */}
            <AppContainer>
                <AppLogoIcon className="h-6" />
            </AppContainer>
        </header>
    );
}

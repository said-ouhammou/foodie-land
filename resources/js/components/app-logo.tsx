import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="text-black-700 font-bolder flex aspect-square size-8 items-center justify-center rounded-md bg-orange-600">
                <span className="text-xl font-bold">F</span>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                {/* <span className="mb-0.5 truncate leading-tight font-semibold">
                    Foodeiland
                </span> */}
                <AppLogoIcon className="h-6 fill-current text-white dark:text-black" />
            </div>
        </>
    );
}

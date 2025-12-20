import AppContainer from './app-container';

export default function Footer() {
    return (
        <footer
            id="footer"
            className="border-t-solid border-t border-t-gray-200 px-2 py-8"
        >
            <AppContainer>
                <p className="text-center">
                    © 2025 Flowbase. Powered by
                    <span className="text-orange-700"> Webflow</span>
                </p>
            </AppContainer>
        </footer>
    );
}

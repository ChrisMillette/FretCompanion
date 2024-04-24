import "@/styles/globals.css";
import { AuthContextProvider } from "../auth-context";

export default function App({ Component, pageProps }) {
    return (
        <AuthContextProvider>
            < Component {...pageProps} />
        </AuthContextProvider>
    ) 
}

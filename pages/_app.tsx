import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {createTheme,NextUIProvider, Modal} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import { Nav } from '@/components/navbar/navbar';
import { Layout } from '@/components/navbar/layout';
import { Box } from '@/components/styles/box';
import { Footer } from '@/components/footer';
import { ModalConfirm } from '@/components/modal/ModalConfirm';
import React, { useEffect, useState } from 'react';
import { SessionProvider } from "next-auth/react"
import Script from 'next/script';
import { useRouter } from 'next/router';
import {Provider} from "react-redux";
import store from "../store/store";


const lightTheme = createTheme({
   type: 'light', theme: { colors: {},},
});
const darkTheme = createTheme({
   type: 'dark', theme: { colors: {},},
});


function MyApp({Component, pageProps}: AppProps) {
    const [showModal, setShowModal] = useState(false);
    const [mount, setMount]= useState(false)
    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_CONFIG_JSON_SITE}`)
            .then(response => response.json())
            .then(data => {
                // Handle the data from the config.json
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        setMount(true)
  
       }, [])
    function showModalHandler(){
        setShowModal(prevState => !prevState);
    }
    const router = useRouter();
    const bContactPage = router.pathname === "/contact"


   return (
<SessionProvider session={pageProps.session}>
<Provider store={store}>
<NextThemesProvider
    defaultTheme="system"
    attribute="class"
    value={{
    light: lightTheme.className,
    dark: darkTheme.className,
}}
>
<NextUIProvider>
    {mount && 
        <Layout>
            <Box as="main">
                <Nav showCopyModal={showModalHandler}/>
                {showModal && <ModalConfirm title={"Mobile Number Copied to Clipboard"} onClose={showModalHandler}/>}
                <Component {...pageProps} />
                <Footer bDivider={bContactPage}/>
            </Box>
        </Layout>
    }
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-4HLSHESRKE"/>
{/*         
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-4HLSHESRKE'); 
    */}
</NextUIProvider>
</NextThemesProvider>
</Provider>
</SessionProvider>
   );
}

export default MyApp;

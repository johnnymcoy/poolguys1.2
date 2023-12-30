import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {createTheme,NextUIProvider } from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import { Nav } from '@/components/navbar/navbar';
import { Layout } from '@/components/navbar/layout';
import { Box } from '@/components/styles/box';
import { Footer } from '@/components/footer';
import { ModalConfirm } from '@/components/modal/ModalConfirm';
import React, { useEffect, useState } from 'react';
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router';
import {Provider} from "react-redux";
import store from "../store/store";
import ThemeCover from '@/components/UI/ThemeCover';

// const lightTheme = createTheme({
//    type: 'light', 
//    theme: { 
//     colors: {
//     // primaryLight: '#5E1DAD',
//     // primaryLightHover: '#5E1DAD',
//     // primaryLightActive: '#5E1DAD',
//     // primaryLightContrast: '#5E1DAD',
//     // primary: '$green200',
//     // primaryBorder: '#5E1DAD',
//     // primaryBorderHover: '#5E1DAD',
//     // primarySolidHover: '#5E1DAD',
//     // primarySolidContrast: '#5E1DAD',
//     // primaryShadow: '#5E1DAD',
//     // gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
//     // link: '#5E1DAD',
//     background: "#5E1DAD",
//     // navbarBackgroundColor: "#5E1DAD",
//     text: '#ff4ecd',
//    },},
// });

// const darkTheme = createTheme({
//    type: 'dark', theme: { colors: {
//     // primaryLight: '$green200',
//     // primaryLightHover: '$green300',
//     // primaryLightActive: '$green400',
//     // primaryLightContrast: '$green600',
//     // primary: '#4ADE7B',
//     // primaryBorder: '$green500',
//     // primaryBorderHover: '$green600',
//     // primarySolidHover: '$green700',
//     // primarySolidContrast: '$white',
//     // primaryShadow: '$green500',
//     // gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
//     // link: '#5E1DAD',

//    },},
// });


function MyApp({Component, pageProps}: AppProps) {
    const [showModal, setShowModal] = useState(false);
    const [mount, setMount]= useState(false)
    useEffect(() => {
        setMount(true)
  
       }, [])
    function showModalHandler(){
        setShowModal(prevState => !prevState);
    }
    const router = useRouter();
    const bContactPage = router.pathname === "/contact"

   return (
<NextThemesProvider
    defaultTheme="system"
    attribute="class"
    value={{
    // light: lightTheme.className,
    // dark: darkTheme.className,
}}> 
{/* <NextUIProvider theme={lightTheme}> */}
<SessionProvider session={pageProps.session}>
<Provider store={store}>
<ThemeCover>

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
    {/* <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-4HLSHESRKE"/> */}
{/*         
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-4HLSHESRKE'); 
    */}
</ThemeCover>
</Provider>
</SessionProvider>
{/* </NextUIProvider> */}
</NextThemesProvider>
   );
}

export default MyApp;

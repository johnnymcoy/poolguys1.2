import React from 'react';
import {  NextUIProvider, createTheme, useTheme } from '@nextui-org/react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ThemeCoverProps {
    children?: React.ReactNode,
}

const ThemeCover = ({children}: ThemeCoverProps): JSX.Element => {

    const themeInfo = useSelector((state: RootState) => state.config.theme); 

    const lightTheme = createTheme({
        type: 'light', 
        theme: { 
         colors: {
         // primaryLight: '#5E1DAD',
         // primaryLightHover: '#5E1DAD',
         // primaryLightActive: '#5E1DAD',
         // primaryLightContrast: '#5E1DAD',
        //  primary: themeInfo.theme_color.primary,
         // primaryBorder: '#5E1DAD',
         // primaryBorderHover: '#5E1DAD',
         // primarySolidHover: '#5E1DAD',
         // primarySolidContrast: '#5E1DAD',
         // primaryShadow: '#5E1DAD',
         // gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
         // link: '#5E1DAD',
        //  background: themeInfo.theme_color.background,
         // navbarBackgroundColor: "#5E1DAD",
        //  text: themeInfo.theme_color.text,
        },},
     });
     
     const darkTheme = createTheme({
        type: 'dark', theme: { colors: {
         // primaryLight: '$green200',
         // primaryLightHover: '$green300',
         // primaryLightActive: '$green400',
         // primaryLightContrast: '$green600',
         // primary: '#4ADE7B',
         // primaryBorder: '$green500',
         // primaryBorderHover: '$green600',
         // primarySolidHover: '$green700',
         // primarySolidContrast: '$white',
         // primaryShadow: '$green500',
         // gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
         // link: '#5E1DAD',
     
        },},
     });

    return (
<NextUIProvider theme={lightTheme}>
    {children}
</NextUIProvider>
)};

export default ThemeCover;
import {Button, Switch, Link, Navbar} from '@nextui-org/react';
import React from 'react';
import {useTheme as useNextTheme} from 'next-themes';
import {useTheme} from '@nextui-org/react';
import Logo from './logo';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface NavProps {
    showCopyModal?: () => void
}

export const Nav = ({showCopyModal} : NavProps) => {
   const {setTheme} = useNextTheme();
   const {isDark, type} = useTheme();
   const router = useRouter();
//    console.log(theme)

   const menuItems = useSelector((state: RootState) => state.config.menu.main);
   const themeInfo = useSelector((state: RootState) => state.config.theme);

    const {phone_text, theme_switch, bPhone} = useSelector((state: RootState) => state.config.menu.nav);
    
    const {mobile} = useSelector((state: RootState) => state.config.contact);

    function numberClickedHandler(e : any){
        // console.log(e.target)
        const copyText : string = e.target.innerText;
        // const numberText : string = copyText.slice(2).replaceAll(" ", "");
        navigator.clipboard.writeText(mobile.replaceAll(" ", ""));
        if(showCopyModal)
        {
            showCopyModal();
        }
   }
   function numberPressedCallHandler(e : any){
        router.push(`${"tel:"}${mobile.replaceAll(" ", "")}`)
   }

   return (
<Navbar isBordered variant={"sticky"} 
    css={{ '& .nextui-navbar-container': //'overflow': 'hidden', 
    
    // { background: `${theme?.colors.background}`, borderBottom: 'none', boxShadow: "rgba(27, 31, 35, 0.06) 0px 1px 0px",
    { background: '$background', borderBottom: 'none', boxShadow: "rgba(27, 31, 35, 0.06) 0px 1px 0px",
        
        // position: "fixed", top: 0, width: "100%"
    },background: '$background' }}
    // },background: `${theme?.colors.background}` }}

    >
    <Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" showIn="sm" />
        <Logo />
        <Navbar.Content  hideIn="sm"  css={{pl: '6rem',}} variant={"highlight"} enableCursorHighlight>
            {menuItems.map((item, index : number) => (
                <Navbar.Link className='Test' isActive={router.pathname === item.url} href={item.url} key={index} id={item.url}>{item.name}</Navbar.Link>
                ))}
        </Navbar.Content>
    </Navbar.Brand>
    {/* Mobile Menu */}
    <Navbar.Collapse 
    css={{ padding: "0vh", overflow: "hidden", //position: "fixed", top: "0", 
        //alignItems: "center", 
        zIndex: "100", //display: "flex", //alignContent: "center"
        }}
    >
        {menuItems.map((item, index : number) => (
        <Navbar.CollapseItem key={index}
            css={{fontSize: "1.8rem", justifyContent: "center", maxHeight: "80vh",textAlign: "center", lineHeight: "5rem",
            padding: "1.2vh"
        
        }}
        >
            <Link
                color="inherit"
                // css={{minWidth: '100%', textAlign: "center", display: "flex", alignContent: "center", justifyContent: "center"}}
                href={item.url}>
                {item.name}
            </Link>
        </Navbar.CollapseItem>
        ))}

        {/* Light/Dark mode switch */}
        {themeInfo.bDarkMode && 
        <Navbar.CollapseItem  
            css={{fontSize: "1.5rem", justifyContent: "center", maxHeight: "80vh",textAlign: "center", padding: "5vh" }}
        >
            <Switch checked={isDark} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}/>
        </Navbar.CollapseItem>}
    </Navbar.Collapse>
        {/* Call Now Button */}
        <Navbar.Content>
        {bPhone && 
        <Navbar.Content hideIn={'xs'} id={"CallButtons"}>
            <Navbar.Item hideIn={'sm'} id={"CallNow"}>
                <Button auto flat href="#" onPress={numberClickedHandler}>
                    {phone_text}
                </Button>
            </Navbar.Item>
            <Navbar.Item showIn={'sm'} css={{pl: '6rem',}} className='Test' id={"PhoneNumberLink"}>
                <Button auto flat onPress={numberPressedCallHandler} href={`${"tel:"}${mobile.replaceAll(" ", "")}`} >
                    {phone_text}
                </Button>
            </Navbar.Item>
        </Navbar.Content>}

        {/* Light/Dark mode switch */}
        {themeInfo.bDarkMode && 
        <Navbar.Item hideIn={'xs'} id={"LightDarkSwitch"}>
            <Switch checked={isDark} onChange={(e: any) => setTheme(e.target.checked ? 'dark' : 'light')}/>
        </Navbar.Item>}
        </Navbar.Content>
      </Navbar>
   );
};



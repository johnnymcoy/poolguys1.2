import {Button, Divider, Image, Text} from '@nextui-org/react';
import React from 'react';
import {CheckIcon} from '../icons/CheckIcon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import Link from 'next/link';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Hero = () => {
    const {title, subtitle, description, points, pointsEnabled} = useSelector((state: RootState) => state.config.home);
    // const {title, subtitle, description, points} = config.home;
    const {home_image} = useSelector((state: RootState) => state.config.home.images);
    // const {home_image} = config.images;
    const contact = useSelector((state: RootState) => state.config.menu.main.find((element) => element.name === "Contact"));
    // const contact = menuConfig.main.find((element) => element.name === "Contact");

   return (
<>
    <Flex css={{
        'gap': '$3',
        'px': '$6',
        'flexDirection': 'column',
        'alignContent': 'center',
        'justifyContent': 'center',
        'alignItems': 'center',
        'width': '100%',
        '@sm': {
            flexDirection: 'row',
            mt: '$10',
        },}} justify={'center'}
    >
    <Box css={{pt: '$13', display: 'flex', flexDirection: 'column', gap: '$5',}} >
        <Box css={{maxWidth: '600px',}}>
            <Text h1 css={{ display: 'inline',}}>
                {title} {' '}
            </Text>
            <Text h1 css={{display: 'inline',}} color="primary">
                {subtitle}
            </Text>
        </Box>
        <Text css={{color: '$accents8', maxWidth: '400px',}} size={'$lg'} span>
            {description}
        </Text>
        {contact && <Flex css={{gap: '$8',pt: '$4',}}wrap={'wrap'}>
            <Link href={contact.url}> 
                <Button css={{zIndex: "1"}}>{contact.button_text}</Button>            
            </Link>
        </Flex>}
        <Flex  wrap={'wrap'} css={{ 'gap': '$8','py': '$7','@sm': { py: '$4', },}}>
            {pointsEnabled && points.map((item, index) => {
                if(!item.enabled){return(<div key={index}></div>)}
                return(
                <Flex  key={index} css={{  color: '$accents7', alignItems: 'center', }}>
                    <CheckIcon /> {item.text}
                </Flex>
            )})}
        </Flex>
    </Box>
    <Box css={{ '& img': { width: '775px',  objectFit: 'contain',},}}>
        <Image  src={home_image.src} alt={home_image.alt}/>
    </Box>
    </Flex>
    <Divider css={{position: 'absolute', inset: '0p', left: '0', mt: '$10'}}/>
</>
);};

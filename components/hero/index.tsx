import {Button, Divider, Input,Image, Text} from '@nextui-org/react';
import React from 'react';
import {CheckIcon} from '../icons/CheckIcon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import config from "@/api/config/config.json";
import Link from 'next/link';
import menuConfig from "@/api/config/menu.json";
// import Image from 'next/image';

export const Hero = () => {
    const {title, subtitle, description, points} = config.home;
    const {home_image} = config.images;

    const contact = menuConfig.main.find((element) => element.name === "Contact");

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
            {points.map((item, index) => (
                <Flex  key={index} css={{  color: '$accents7', alignItems: 'center', }}>
                    <CheckIcon /> {item.text}
                </Flex>
            ))}
        </Flex>
    </Box>
    <Box css={{ '& img': { width: '775px',  objectFit: 'contain',},}}>
        <Image  src={home_image.src} alt={home_image.alt}/>
    </Box>
    </Flex>
    <Divider css={{position: 'absolute', inset: '0p', left: '0', mt: '$10'}}/>
</>
);};

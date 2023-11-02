import {Card, Divider, Grid, Text, Image} from '@nextui-org/react';
import React from 'react';
import {BoxIcon} from '../icons/BoxIcon';
import {FeatureIcon} from '../icons/FeatureIcon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import config from "@/api/config/config.json";

export const Features1 = () => {
    const aboutInfo = config.about;

   return (
<>
    <Flex
    direction={'column'}
    css={{
        'gap': '1rem',
        'pt': '$20',
        'justifyContent': 'center',
        'alignItems': 'center',
        'px': '$6',
        '@sm': {
            justifyContent: 'space-around',
            px: '$32',
            flexDirection: 'row',
        },
        '@md': {
            px: '$64',
        },
    }}
    >
    <Flex direction="column">
        <Text span css={{color: '$blue600'}}>
            {aboutInfo.subtitle}
        </Text>
        <Text h2>{aboutInfo.title}</Text>
        <Text span
            css={{ maxWidth: '400px', color: '$accents8',}} >
            {aboutInfo.intro}
        </Text>
        {aboutInfo.points.map((item, index) => 
            {return(
            <Flex key={index} css={{py: '$10', gap: '$5',}}>
                <BoxIcon />
                <Flex direction={'column'}>
                    <Text h4 weight={'medium'}>
                        {item.title}
                    </Text>
                    <Text span
                        css={{
                        maxWidth: '400px',
                        color: '$accents8',}}>
                        {item.description}
                    </Text>
                </Flex>
            </Flex>)}
        )}
    </Flex>
    <Box css={{ pl: "$10",' & img': { width: '775px',  objectFit: 'contain',},}}>
        <Image  src={"/static/images/photos/pool-photo-01.webp"} alt={"Clean Pool"}/>
    </Box>
        {/* <FeatureIcon /> */}
    </Flex>
    <Divider
    css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}
    />
</>
);};

import {Card, Divider, Text} from '@nextui-org/react';
import React from 'react';
import {BoxIcon} from '../icons/BoxIcon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import config from "@/api/config/config.json";


export const Features3 = () => {
    const services = config.services;

   return (
<>
    <Box css={{px: '$6', pb: '$14',}}>
    <Flex
        direction={'column'}
        justify={'center'}
        align={'center'}
        css={{pt: '$14',}}
    >
        <Text h1>{services.title}</Text>
        <Text
            span
            css={{
                maxWidth: '800px',
                color: '$accents8',
                textAlign: 'center',
            }}
        >
            {services.description}
        </Text>
    </Flex>
    <Flex
        align={'center'}
        justify={'center'}
        wrap={'wrap'}
        css={{gap: '1rem', pt: '$14',}}>
        {services.list.map((item, index) => (
        <Card css={{mw: '500px'}} key={index}>
            <Card.Body>
                <Flex css={{gap: '0.5rem'}}>
                    <BoxIcon />
                    <Flex direction={'column'}>
                    <Text h5>{item.title}</Text>
                    <Text span>
                        {item.description}
                    </Text>
                    </Flex>
                </Flex>
            </Card.Body>
        </Card>
        ))}
    </Flex>
    </Box>

    <Divider css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}/>
</>
);};

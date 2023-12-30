import { Divider, Text} from '@nextui-org/react';
import React from 'react';
import {BoxIcon} from '../icons/BoxIcon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CustomCard from '../UI/CustomCard';


export const Features3 = () => {
    const services = useSelector((state: RootState) => state.config.services);
    // const services = config.services;

    if(!services.enabled){return (<></>)}
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
        {services.list.map((item, index) => 
        {
            if(!item.enabled || item.title === ""){return (<div key={index}></div>)}
        return(
        <CustomCard key={index} maxWidth={500}>
            <Flex css={{gap: '0.5rem'}}>
            <BoxIcon />
            <Flex direction={'column'}>
                <Text h5>{item.title}</Text>
                <Text span>
                    {item.description}
                </Text>
                </Flex>
            </Flex>
        </CustomCard>)
        })}

    </Flex>
    </Box>

    <Divider css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}/>
</>
);};

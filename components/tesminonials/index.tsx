import { Divider, Text} from '@nextui-org/react';
import React from 'react';
import {QuotesIcon} from '../icons/QuotesIcon';
import {Flex} from '../styles/flex';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CustomCard from '../UI/CustomCard';

export const Testimonials = () => {
    const testimonials = useSelector((state: RootState) => state.config.testimonials);

    if(!testimonials.enabled)
    {
        return (<></>);
    }
   return (
<>
    <Flex
    direction={'column'}
    css={{
        'gap': '1rem',
        'justifyContent': 'center',
        'alignItems': 'center',
        'px': '$6',
        'py': '$20',
        'flexDirection': 'column-reverse',
        '@sm': {
            justifyContent: 'space-around',
            px: '$32',
            flexDirection: 'row-reverse',
        },
        '@md': {
            px: '$64',
        },
    }}>
    <Flex direction="column" css={{gap: '1.5rem'}}>
        {testimonials && testimonials.list.map((item, index) => {
            
            if(!item.enabled){return (<div key={index}></div>)}
            return(
        <CustomCard key={index}>
        <Flex css={{py: '$10',gap: '$5',}}>
                <QuotesIcon />
                <Flex direction={'column'} css={{gap: '0.5rem'}}>
                    <Text span css={{ maxWidth: '400px', color: '$accents8',}} >
                        {item.description}
                    </Text>
                    <Text span weight={'bold'} css={{maxWidth: '400px', display: 'contents',color: '$accents9',}}>
                        {item.name}  
                    </Text>
                    <Text span css={{ display: 'contents',color: '$accents8',}}>
                        &nbsp;-&nbsp;{item.location ? item.location : item.occupation ? item.occupation : "Customer"}
                    </Text>
                </Flex>
                </Flex>
        </CustomCard>
        )})}

    </Flex>
    <Flex
        align={'start'}
        direction={'column'}
        css={{ 'alignItems': 'center', '@sm': { alignItems: 'start',},}}
    >
        <Text span css={{color: '$blue600'}}>
            {testimonials.subtitle}
        </Text>
        <Text h3>{testimonials.title}</Text>
        <Text span css={{color: '$accents8', maxW: '600px', pb: '$8'}}>
            {testimonials.description}
        </Text>
    </Flex>
</Flex>
<Divider css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}/>
</>
);};

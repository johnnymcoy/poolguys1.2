import { Divider, Text} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';
import { QuestionIcon } from '../icons/QuestionIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const Faq = () => {
    const faq = useSelector((state: RootState) => state.config.FAQ);
    // const faq = config.FAQ;

    if(!faq.enabled)
    {
        return(<div></div>);
    }

   return (
<>
    <Flex
    css={{
        py: '$20',
        gap: '$18',
        px: '$6',
    }} direction={'column'}
    >
    <Flex align={'center'} direction={'column'}>
        <Text span css={{color: '$blue600'}}>
            {faq.title}
        </Text>
        <Text h2>{faq.subtitle}</Text>
    </Flex>
    <Flex css={{'gap': '$10','@lg': {px: '$64',}, "padding": "$12",}} direction={'column'}>
        {faq.list.map((item, index) => (
            <Flex key={index} css={{gap: '$5'}} justify={'center'}>
                <QuestionIcon />
                <Flex direction={'column'} css={{gap: '$3', width: "100%"}}>
                    <Text h3>
                        {item.question}
                    </Text>
                    <Text span css={{color: '$accents8',}}>
                        {item.answer}
                    </Text>
                </Flex>
            </Flex>
        ))}

    </Flex>
    </Flex>

    <Divider
    css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}
    />
</>
);};

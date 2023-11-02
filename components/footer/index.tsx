import {Divider, Text} from '@nextui-org/react';
import React from 'react';
// import {AcmeLogo} from '../navbar/logo';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import Logo from '../navbar/logo';
import config from "@/api/config/menu.json";
import Link from 'next/link';

interface FooterProps {
    bDivider? : boolean;
}

export const Footer = ({bDivider = true}: FooterProps) => {

    const {copyright, terms, terms_link, bTerms, bPrivacyPolicy, privacy, privacy_link} : 
    { copyright: string; terms: string, terms_link: string, bTerms: boolean, bPrivacyPolicy: boolean, privacy: string, privacy_link: string} 
    = config.footer;
  

   return (
<Flex css={{ py: '$20',px: '$6',}}>
    <Box as={'footer'} css={{width: '100%'}}>
    <Box
        css={{
            'px': '$10',
            '@md': {
                px: '$56',
            },
        }}
    >
        {bDivider && <Divider
            css={{
                mt: '$14',
                display: 'flex',
                justifyContent: 'center',
            }}
        />}
        <Flex
            align={'center'}
            wrap={'wrap'}
            css={{
                'pt': '$8',
                'gap': '$10',
                'justifyContent': 'center',
                '@md': {
                justifyContent: 'space-between',
                },
            }}
        >
            <Flex  css={{gap: '$10',}}  wrap={'wrap'}>
            <Logo />
            </Flex>
            <Flex css={{ gap: '$6',}}>
            {bTerms &&  
            <Text span css={{color: '$accents8'}}>
                <Link href={terms_link}>{terms}</Link>
                </Text>
                }
            {bPrivacyPolicy && <Text span css={{color: '$accents8'}}>
                <Link href={privacy_link}>{privacy}</Link>
                </Text>
            }
            </Flex>
            <Flex css={{  gap: '$6', }}>
                <Text span css={{color: '$accents8'}}>
                {copyright}
                </Text>
            </Flex>
        </Flex>
    </Box>
    </Box>
</Flex>
   );
};

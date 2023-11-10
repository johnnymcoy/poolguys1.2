import {Button, Divider, Text} from '@nextui-org/react';
import React from 'react';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Statistics = () => {
    const {list, enabled, title, description} = useSelector((state: RootState) => state.config.stats);
    // const {list, enabled, title, description } = config.stats;

    if(!enabled){return(<div></div>)};

   return (
      <>
         <Box
            css={{
               pt: '$20',
               pb: '$16',
               px: '$6',
            }}
         >
            <Flex direction={'column'} align={'center'}>
               <Text
                  h3
                  css={{
                     textAlign: 'center',
                  }}
               >
                  {title}
               </Text>
               <Text
                  span
                  css={{
                     maxWidth: '800px',
                     textAlign: 'center',
                  }}
               >
                  {description}
               </Text>
            </Flex>
            <Flex
               direction={'row'}
               wrap={'wrap'}
               justify={'center'}
               css={{
                  'gap': '4rem',
                  'pt': '$16',
                  '@sm': {
                     gap: '10rem',
                  },
               }}
            >
            {list.map((item, index) => (
            <Flex key={index} direction={'column'}>
                <Text h2 css={{color: '$blue600'}}>
                    {item.description}
                </Text>
                <Text span css={{textAlign: 'center'}} weight={'medium'}>
                    {item.title}
                </Text>
            </Flex>
            ))}
            </Flex>
         </Box>

         <Divider
            css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}
         />
      </>
   );
};

import {Button, Divider, Link, Text} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Trial = () => {
    const {action_call} = useSelector((state: RootState) => state.config.contact);
    // const {action_call} = config.contact;
    const contact = useSelector((state: RootState) => state.config.menu.main.find((element) => element.name === "Contact"));
    // const contact = menuConfig.main.find((element) => element.name === "Contact");

   return (
<>
    <Flex
    css={{
        py: '$20',
        px: '$6',
    }}
    justify={'center'}
    direction={'column'}
    align={'center'}
    >
    <Text h3>Get in contact with us now</Text>
    <Text  span css={{
            color: '$accents8',
            pb: '$15',
            textAlign: 'center',}}>
        {action_call} 
    </Text>
    {contact && 
    <Link href={contact.url}>
        <Button >{contact.button_text}</Button>
    </Link>}
    </Flex>
    <Divider
    css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}
    />
</>);};

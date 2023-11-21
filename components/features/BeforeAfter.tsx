import {Card, Divider, Grid, Spacer, Text} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';
import { ImageCompare } from '../gallery/ImageCompare';
import CSS from "./BeforeAfter.module.css";
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';


export const BeforeAfter = () => {
    const {title, description, photos, enabled, photoDescription, photoTitle} = useSelector((state: RootState) => state.config.comparison);
    // const {title, description, photos, enabled, photoDescription, photoTitle} = config.comparison;


    const bEnabled = (!enabled || photos.length === 0);
    //@Todo Check that the photo strings are valid 
    // if(photos[0].beforeSrc === ""){}

    if(bEnabled){return(<div></div>);}

   return (
<>
<Flex
    css={{ py: '$20', gap: '2rem', px: '$6', width: "100%" }}
    justify={'center'}
    wrap={'wrap'}
    direction={'column'}
    align={'center'} 
>
    <Flex direction={'column'} align={'center'}>
        <Text span css={{ color: '$blue600' }}>
            {description}
        </Text>
        <Text h2>{title}</Text>
    </Flex>
    <Flex
        css={{ gap: '2rem', width: '100%' }}
        wrap={'wrap'} 
        justify={'center'}
    >
        {photos && photos.map((item, index) => 
        <Card key={index} css={{ p: '10px', mw: '550px', m: "0" }}>
            <Card.Header>
                <Grid.Container   >
                <Text span css={{color: '$blue600', marginBottom: "0rem", textAlign: "center", width: "100%"}}>
                    {photoDescription}
                </Text>
                <Grid xs={12} >
                    <Text h3 css={{ margin: "0rem", textAlign: "center", width: "100%",}} >{photoTitle}</Text>
                </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$6', overflow: "hidden" }}>
                <ImageCompare   
                    firstImgSrc={item.beforeSrc}
                    secondImgSrc={item.afterSrc}
                    />
            </Card.Body>
        </Card>
        )}
    </Flex>
</Flex>
<Divider css={{ inset: '0p', left: 0, bottom: '0', mt: '$5'}} />
</>

);};

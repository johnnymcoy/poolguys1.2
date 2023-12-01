import React, { ReactChild } from 'react';
import CSS from "./CustomCard.module.css"

interface CustomCardProps {
    children?: React.ReactNode,
    maxWidth?: number,
    header?: React.ReactNode,
    padding?: number,
}

const CustomCard = ({children, maxWidth, header, padding}: CustomCardProps): JSX.Element => {



    return (
<div className={CSS.container} style={{maxWidth: `${maxWidth}px`, padding: `${padding}px`}}>
    {header && <div className={CSS.header}>
        {header}
    </div>}
    <div className={CSS.inner}>
        <div className={CSS.main}>
            {children}
        </div>
    </div>
</div>
)};

export default CustomCard;
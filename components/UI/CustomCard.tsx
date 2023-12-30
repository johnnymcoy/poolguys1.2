import React, { ReactChild } from 'react';
import CSS from "./CustomCard.module.css"
import { Switch, useTheme } from '@nextui-org/react'

interface CustomCardProps {
    children?: React.ReactNode,
    maxWidth?: number,
    header?: React.ReactNode,
    padding?: number,
}

const CustomCard = ({children, maxWidth, header, padding}: CustomCardProps): JSX.Element => {
    const { type, isDark } = useTheme();
    const containerClasses = isDark ? `${CSS.container} ${CSS.dark}` : `${CSS.container}`


    return (
<div className={containerClasses} style={{maxWidth: `${maxWidth}px`, padding: `${padding}px`}}>
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
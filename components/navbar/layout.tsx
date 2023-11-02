import {Box} from '../styles/box';
import React from 'react';



interface LayoutProps {
   children?: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => (
   <Box
      css={{
         maxW: '100%',
         minHeight: "72vh",
         background: '$background',
      }}
   >
      {children}
   </Box>
);

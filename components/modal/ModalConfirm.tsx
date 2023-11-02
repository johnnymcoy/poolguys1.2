import React from 'react';
import {
   Modal,
   Input,
   Row,
   Checkbox,
   Button,
   Text,
   Navbar,
} from '@nextui-org/react';


interface ModalProps {
    bAccept?: boolean,
    title?: string,
    children?: React.ReactNode,
    onClose?: () => void,
}



export const ModalConfirm = ({bAccept , title, onClose} : ModalProps) => {
   const [visible, setVisible] = React.useState(true);
   const handler = () => setVisible(true);
   const closeHandler = () => {
        setVisible(false);
        if(onClose)
        {
            onClose();
        }
   };

   return (
      <div>
         {/* <Navbar.Link onClick={handler}>Login</Navbar.Link> */}
         <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
         >
            <Modal.Header>
               <Text id="modal-title" size={18}>
                  {title}
               </Text>
            </Modal.Header>
            <Modal.Body>
               {/* <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Email"
                  //   contentLeft={<Mail fill="currentColor" />}
               />
               <Input
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Password"
                  //   contentLeft={<Password fill="currentColor" />}
               /> */}
            </Modal.Body>
            <Modal.Footer>
               <Button auto flat color="error" onClick={closeHandler}>
                  Close
               </Button>
               {bAccept && 
                <Button auto onClick={closeHandler}>
                    Accept
                </Button>               
               }
            </Modal.Footer>
         </Modal>
      </div>
   );
};

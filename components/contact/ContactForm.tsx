// Imports
import {FormEvent, useState} from "react"
import useInput from "../../hooks/useInput";
import {BoxIcon} from '../icons/BoxIcon';
import {FeatureIcon} from '../icons/FeatureIcon';
import {Flex} from '../styles/flex';
import {Button, Card, Input,  Divider, StyledDropdownSection, StyledInputLabel, Text, Textarea, Spacer, useTheme, Loading, Popover} from '@nextui-org/react';
// import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

import config from "@/api/config/config.json";

import CSS from './ContactForm.module.css';
import ReCAPTCHA from "react-google-recaptcha";
import { Box } from "../styles/box";
import { ModalConfirm } from "../modal/ModalConfirm";

function ContactForm(){

    const {title, description, mobile, require_captcha} = config.contact;

    const fullDescription = description.replace("*", mobile);

    const [captcha, setCaptcha] = useState<string | null>();
    const [toggleModal, setToggleModal] = useState<boolean>(false);

    const {isDark, type} = useTheme();

    const [sendStatus, setSendStatus] = useState<string>("default");


    const {
        value: enteredName,
        isValid: nameIsValid,
        hasError: nameInputHasError,
        resetValue: nameResetValue,
        valueChangedHandler: nameChangedHandler,
        valueBlurHandler: nameBlurHandler,
    } = useInput(value => value.trim() !== "");

    const { 
        value: enteredEmail, 
        isValid: emailIsValid,
        hasError: emailInputHasError, 
        resetValue: emailResetValue,
        valueChangedHandler: emailChangedHandler, 
        valueBlurHandler: emailBlurHandler
    } = useInput(value => value.trim() !== "" && value.includes("@") && value.includes("."));

    const { 
        value: enteredMessage, 
        isValid: messageIsValid,
        hasError: messageInputHasError, 
        resetValue: messageResetValue,
        valueChangedHandler: messageChangedHandler, 
        valueBlurHandler: messageBlurHandler
    } = useInput(value => value.trim() !== "");

    let formIsValid = false;
    if(nameIsValid && emailIsValid && messageIsValid && (!require_captcha || captcha))
    {
        formIsValid = true;
    }

    function clearValues(){
        nameResetValue();
        emailResetValue();
        messageResetValue();
    }

    function formSubmitHandler(event : FormEvent){
        event.preventDefault();

        const sendData = {
            name: enteredName,
            email: enteredEmail,
            message: enteredMessage,
        }
        if(formIsValid)
        {
            setSendStatus("sending");
            fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendData),
            })
            // .then(response => response.json())
            .then(data => {
                if(data.status === 200)
                {
                    setTimeout(mailSent, 2000)
                }
                else
                {
                    setTimeout(mailFailed, 2000)
                }
                console.log("Response", data.status)
            }).catch(error => {
                setTimeout(mailFailed, 2000)
                console.error("Error sending packing data", error);
            })
        }
        else
        {
            setToggleModal(true);
        }
    };

    function mailSent(){
        setSendStatus("success");
        clearValues();
    }
    function mailFailed(){
        setSendStatus("error");
    }

    function closeModal(){
        setToggleModal(false);
    }

    const nameStatus = nameInputHasError ? "error" : "default";
    const emailStatus = emailInputHasError ? "error" : "default";
    const messageStatus = messageInputHasError ? "error" : "default";

    let sendText = "Send";
    if(sendStatus === "sending")
    {
        sendText="Sending"
    }
    if(sendStatus === "success")
    {
        sendText="Email Sent"
    }
    if(sendStatus === "error")
    {
        sendText="Email Failed"
    }

    function SubmitButton(){
        return (
            <Button  size="lg" className={CSS.submit} type="submit" /*color={sendStatus}*/>
            {sendText}
            {sendStatus === "sending" &&  
            <Flex>
                <Spacer />
                <Loading size="sm" color={"warning"} /> 
            </Flex>}
            {sendStatus === "completed"}
        </Button>)
    }


    //todo: p classname = error-text is not a class

   return(
<>
    <Flex direction={'column'}
       css={{'gap': '1rem', 'pt': '$20', 'justifyContent': 'center', 'alignItems': 'center','px': '$6',
          '@sm': { gap: '5rem', flexDirection: 'row-reverse', px: '$16', },
          '@md': { justifyContent: 'space-evenly',},}}
    >
       <Flex direction="column" align={'center'}>
          <Text span css={{color: '$blue600'}}>
                {title}
          </Text>
            <Text h1 css={{display: 'inline', pointerEvents: "none", }}>
                Contact Us
            </Text>

          {/* <Text h3>Contact Us</Text> */}
          <Text span css={{ maxWidth: '600px',color: '$accents8', p: "$6"}}>
            {fullDescription}
          </Text>


          <Flex justify={'center'} wrap={'wrap'} css={{ padding: '$10', px: "$10"}}>

        {toggleModal && <ModalConfirm title={"Please fill out each field"} onClose={closeModal}/>}

        <Card>
            <form onSubmit={formSubmitHandler} className={CSS.auth} >
                <Flex css={{justifyContent: "center", py: '$4', gap: '$0',}}>
                    <Input status={nameStatus} labelPlaceholder="Full Name" bordered={isDark} clearable value={enteredName} onBlur={nameBlurHandler} onChange={nameChangedHandler} placeholder="John Smith" type="text" id="name" name="from_name" aria-label="Full Name"/>
                </Flex>
                <Spacer />
                <Flex css={{justifyContent: "center", py: '$4', gap: '$5',}}>
                    <Input status={emailStatus} labelPlaceholder="Email" bordered={isDark} clearable value={enteredEmail}  onBlur={emailBlurHandler} onChange={emailChangedHandler} placeholder="JohnSmith@gmail.com" type='email' id='email' name="email" aria-label="Email Address" />
                </Flex>
                <Spacer />
                <Flex css={{justifyContent: "center", py: '$8', gap: '$5',}}>
                    <Textarea status={messageStatus} labelPlaceholder="Message" bordered={isDark} value={enteredMessage} onBlur={messageBlurHandler} onChange={messageChangedHandler} placeholder="Hey Lets get in touch" minRows={4} maxRows={10} cols={36} id='message' name="message" aria-label="Message"/>
                </Flex>
                <Spacer />
                <Flex css={{justifyContent: "center", py: '$4', gap: '$5',}}>
                    <ReCAPTCHA  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={setCaptcha} />
                </Flex>
                <Spacer />
                <Flex css={{justifyContent: "center", py: '$8', gap: '$5',}}>
                <Button  size="lg" className={CSS.submit} type="submit" /*color={sendStatus}*/>
                    {sendText}
                    {sendStatus === "sending" &&  
                    <Flex>
                        <Spacer />
                        <Loading size="sm" color={"warning"} /> 
                    </Flex>}
                    {sendStatus === "completed"}
                </Button>
                </Flex>
            </form>
        </Card>
        </Flex>
    </Flex>
</Flex>
    {/* <Divider css={{position: 'absolute', inset: '0p', left: '0', mt: '$5'}}/> */}
</>
);}

export default ContactForm;
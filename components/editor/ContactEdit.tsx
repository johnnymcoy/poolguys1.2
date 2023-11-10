import { Button, Card, Checkbox, Dropdown, Input, Loading, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { postConfig } from "../../store/config-store";
import { useState } from "react";

export interface SiteInfo {
    email : string,
    mobile : string,
    title: string,
    action_call: string,
    description: string,
    require_captcha: boolean,
}

export type Status = ("idle" | "loading" | "complete" | "failed")



interface ContactEditProps {
    sendData: (arg0: SiteInfo) => void,
    complete: Status
}


export default function ContactEdit({sendData, complete}: ContactEditProps) {
    const contactInfo = useSelector((state: RootState) => state.config.contact); 
    const [open, setOpen] = useState(false);

    const emailInput = useInput("");
    const mobileInput = useInput("");
    const titleInput = useInput("");
    const actionCallInput = useInput("");
    const descriptionInput = useInput("");
    const [requireCaptcha, setRequireCaptcha] = useState(contactInfo.require_captcha);

    function submitContactInfo(){
        let email = contactInfo.email;
        if(emailInput.value.replace(/\s/g, "") !== ""  && emailInput.value !== contactInfo.email)
        {
            email = emailInput.value;
        }
        let mobile = contactInfo.mobile;
        if(mobileInput.value.replace(/\s/g, "") !== ""  && mobileInput.value !== contactInfo.mobile)
        {
            mobile = mobileInput.value;
        }
        let title = contactInfo.title;
        if(titleInput.value.replace(/\s/g, "") !== ""  && titleInput.value !== contactInfo.title)
        {
            title = titleInput.value;
        }
        let action_call = contactInfo.action_call;
        if(actionCallInput.value.replace(/\s/g, "") !== ""  && actionCallInput.value !== contactInfo.action_call)
        {
            action_call = actionCallInput.value;
        }
        let description = contactInfo.description;
        if(descriptionInput.value.replace(/\s/g, "") !== ""  && descriptionInput.value !== contactInfo.description)
        {
            description = descriptionInput.value;
        }

        let require_captcha = requireCaptcha;

        const sendContactInfo: SiteInfo = {
            email,
            mobile,
            title,
            action_call,
            description,
            require_captcha,
        }
        if(sendData)
        {
            sendData(sendContactInfo)
        }
    }
   

    return (
<Card css={{ p: '10px', mw: '550px', m: "0", gap: "$2" }}>
    <Card.Header>
        <Text h3 css={{textAlign: "center", width: "100%"}}>Contact Info</Text>
    </Card.Header>
    {open &&
    <Card.Body>
    <Input type={"email"} clearable bordered label={"Email"} placeholder={contactInfo.email} value={emailInput.bindings.value} onChange={emailInput.bindings.onChange}/>
    <Text>Previous: {contactInfo.email}</Text>
    <Input clearable bordered label={"Mobile"} type={"text"} placeholder={contactInfo.mobile} value={mobileInput.bindings.value} onChange={mobileInput.bindings.onChange}/>
    <Text>Previous: {contactInfo.mobile}</Text>
    <Input clearable bordered label={"Title"} placeholder={contactInfo.title} value={titleInput.bindings.value} onChange={titleInput.bindings.onChange}/>
    <Text>Previous: {contactInfo.title}</Text>
    <Input clearable bordered label={"Action Call"} placeholder={contactInfo.action_call} value={actionCallInput.bindings.value} onChange={actionCallInput.bindings.onChange}/>
    <Text>Previous: {contactInfo.action_call}</Text>
    <Input clearable bordered label={"Description"} placeholder={contactInfo.description} value={descriptionInput.bindings.value} onChange={descriptionInput.bindings.onChange}/>
    <Text>Previous: {contactInfo.description}</Text>
    <Text>Require Capcha when sending email</Text>
    <Switch size="sm" initialChecked={contactInfo.require_captcha} onChange={(e) => {setRequireCaptcha(e.target.checked)}}/>
    <Text>Previous: {contactInfo.require_captcha ? "true" : "false"}</Text>
    <Button onPress={submitContactInfo}>Save Changes</Button>
    {complete === "loading" && <Loading></Loading>}
    </Card.Body>}
    <Card.Body><Button onPress={()=>{setOpen(prevState => !prevState)}}>{open ? "Close" : "Edit"}</Button></Card.Body>
</Card>
)}
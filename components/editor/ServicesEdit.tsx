import { Button, Card, Checkbox, Dropdown, Input, Loading, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import ServicesInput from "./input/ServicesInput";


export interface Service {
    title: string;
    description: string;
}

export interface ServicesInfo {
    title: string;
    description: string;
    list : Service[];
    enabled: boolean;
}

export type Status = ("idle" | "loading" | "complete" | "failed")



interface ServicesEditProps {
    sendData: (arg0: ServicesInfo) => void,
    complete: Status
}


export default function ServicesEdit({sendData, complete}: ServicesEditProps) {
    const servicesInfo = useSelector((state: RootState) => state.config.services); 
    const [open, setOpen] = useState(false);

    const titleInput = useInput("");
    const descriptionInput = useInput("");

    const [enabled, setEnabled] = useState(servicesInfo.enabled);


    const [services, setServices] = useState<Service[]>(servicesInfo.list);


    function setServicesHandler(data: Service, index: number){
        const newServices = services.map((item, i) => {
            if(i === index){
                return data;
            } else {
                return item;
            }
        });
        setServices(newServices);
    }


    function submitServicesInfo(){
        let title = servicesInfo.title;
        if(titleInput.value.replace(/\s/g, "") !== ""  && titleInput.value !== servicesInfo.title)
        {
            title = titleInput.value;
        }
        let description = servicesInfo.description;
        if(descriptionInput.value.replace(/\s/g, "") !== ""  && descriptionInput.value !== servicesInfo.description)
        {
            description = descriptionInput.value;
        }

        const sendServicesInfo: ServicesInfo = {
            title,
            description,
            list: services,
            enabled
        }
        if(sendData)
        {
            sendData(sendServicesInfo)
        }
    }
   

    return (
<Card css={{ p: '10px', mw: '550px', m: "0", gap: "$2" }}>
    <Card.Header>
        <Text h3 css={{textAlign: "center", width: "100%"}}>Services Page</Text>
    </Card.Header>
    {open && <Card.Body>
        <Text>Enabled</Text>
        <Switch size="sm" initialChecked={servicesInfo.enabled} onChange={(e) => {setEnabled(e.target.checked)}}/>
        <Text>Previous: {servicesInfo.enabled ? "true" : "false"}</Text>
        <Spacer />
        <Input clearable bordered label={"Services Title"} placeholder={servicesInfo.title}
            value={titleInput.bindings.value} onChange={titleInput.bindings.onChange}/>
        <Text>Previous: {servicesInfo.title}</Text>
        <Input clearable bordered label={"Services Subtitle"} placeholder={servicesInfo.description}
            value={descriptionInput.bindings.value} onChange={descriptionInput.bindings.onChange}/>
        <Text>Previous: {servicesInfo.description}</Text>

    {servicesInfo.list.map((item, index) =>
        <ServicesInput key={index} service={item} index={index} onChange={setServicesHandler} />
    )}
    <Button onPress={submitServicesInfo}>Save Changes</Button>
    {complete === "loading" && <Loading></Loading>}
    </Card.Body>}
    <Card.Body><Button onPress={()=>{setOpen(prevState => !prevState)}}>{open ? "Close" : "Edit"}</Button></Card.Body>
</Card>
)}
import { Button, Card, Checkbox, Dropdown, Input, Loading, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import ServicesInput from "./input/ServicesInput";


export interface Service {
    title: string;
    description: string;
    enabled: boolean;
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
    const [addedServices, setAddedServices] = useState<Service[]>([]);

    function addServiceHandler(){
        const newService = { title: "Cleaning", description: "Cleaning pools", enabled: true};
        setAddedServices(prevState => [...prevState, newService]);
        setServices(prevState => [...prevState, newService]);

    }

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

    function setAddedServicesHandler(data: Service, index: number){
        const newServices = addedServices.map((item, i) => {
            if((servicesInfo.list.length - i) === index){
                return data;
            } else {
                return item;
            }
        });
        setAddedServices(newServices);
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
        const allServices = [...services, ...addedServices];
        const filteredServices = allServices.filter(service => service.enabled !== false);
        setServices(filteredServices);

        const sendServicesInfo: ServicesInfo = {
            title,
            description,
            list: filteredServices,
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
    {addedServices.map((item, index) => {
        return(
        <div key={index}>
        <ServicesInput key={index} service={item} index={servicesInfo.list.length + index} onChange={setAddedServicesHandler} />
        </div>
        )
    })}

    <Spacer />
    <div>
        <Button auto size={"xs"} onClick={addServiceHandler}>Add Service</Button>
    </div>
    <Spacer />

    <Button onPress={submitServicesInfo}>Save Changes</Button>
    {complete === "loading" && <Loading></Loading>}
    </Card.Body>}
    <Card.Body><Button onPress={()=>{setOpen(prevState => !prevState)}}>{open ? "Close" : "Edit"}</Button></Card.Body>
</Card>
)}
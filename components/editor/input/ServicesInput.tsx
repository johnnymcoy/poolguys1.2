import { Box } from "@/components/styles/box";
import { Button, FormElement, Input, Text, useInput } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";

export interface Service {
    title: string;
    description: string;
}

interface ServicesProps {
    service: Service;
    index: number;
    onChange: (data: Service, index: number) => void;
    bHide?: boolean;
}

export default function ServicesInput({service, index, onChange, bHide}: ServicesProps) {

    const [serviceData, setServiceData] = useState<Service>({title: "", description: ""});


    function changeHandler(e: ChangeEvent<FormElement>, type: string){
        if(type === "title")
        {
            if(e.target.value.replace(/\s/g, "") === "")
            {
                setServiceData({...serviceData, title: service.title})     
            }
            else
            {
                setServiceData({...serviceData, title: e.target.value})     
            }
        }
        else if(type === "description")
        {
            if(e.target.value.replace(/\s/g, "") === "")
            {
                setServiceData({...serviceData, description: service.description})     
            }
            else
            {
                setServiceData({...serviceData, description: e.target.value})     
            }
        }
    }

    useEffect(() => {
        onChange(serviceData, index);
      }, [serviceData]);


    return (
<Box css={{width: "100%", py: "$6", display: `${ bHide ? "none" : "block"}` }}>
    <Text h4>{"Service " + (index + 1)} </Text>
    <Input clearable bordered label={"Title"} placeholder={service.title} css={{width: "100%"}} 
        value={serviceData?.title} onChange={(e: ChangeEvent<FormElement>) => changeHandler(e, "title")}/>
    <Text>Previous: {service.title}</Text>
    <Input clearable bordered label={"Description"} placeholder={service.description} css={{width: "100%"}}
        value={serviceData?.description} onChange={(e: ChangeEvent<FormElement>) => changeHandler(e, "description")}/>
    <Text>Previous: {service.description}</Text>
    {/* <Button size="xs">Remove</Button> */}
</Box>
)}
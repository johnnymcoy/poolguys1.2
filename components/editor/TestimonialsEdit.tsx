import { Button, Card, Checkbox, Dropdown, Input, Loading, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import TestimonialInput from "./input/TestimonialInput";


export interface Testimonial {
    name: string;
    description: string;
    location: string;
    occupation: string;
}

export interface TestimonialsInfo {
    title: string;
    subtitle: string;
    description: string;
    enabled: boolean;
    list: Testimonial[];
}

export type Status = ("idle" | "loading" | "complete" | "failed")



interface TestimonialsEditProps {
    sendData: (arg0: TestimonialsInfo) => void,
    complete: Status
}


export default function TestimonialsEdit({sendData, complete}: TestimonialsEditProps) {
    const testimonialsInfo = useSelector((state: RootState) => state.config.testimonials); 
    const [open, setOpen] = useState(false);

    const [enabled, setEnabled] = useState(testimonialsInfo.enabled);

    const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsInfo.list);

    function setTestimonialsHandler(data: Testimonial, index: number){
        const newTestimonials = testimonials.map((item, i) => {
            if(i === index){
                return data;
            } else {
                return item;
            }
        });
        setTestimonials(newTestimonials);
    }

    // useEffect(() => {
    //     console.log(testimonials)
    //   }, [testimonials]);

    const titleInput = useInput("");
    const subtitleInput = useInput("");
    const descriptionInput = useInput("");


    function submitTestimonialsInfo(){
        let title = testimonialsInfo.title;
        if(titleInput.value.replace(/\s/g, "") !== ""  && titleInput.value !== testimonialsInfo.title)
        {
            title = titleInput.value;
        }
        let subtitle = testimonialsInfo.subtitle;
        if(subtitleInput.value.replace(/\s/g, "") !== ""  && subtitleInput.value !== testimonialsInfo.subtitle)
        {
            subtitle = subtitleInput.value;
        }
        let description = testimonialsInfo.description;
        if(descriptionInput.value.replace(/\s/g, "") !== ""  && descriptionInput.value !== testimonialsInfo.description)
        {
            description = descriptionInput.value;
        }

        const sendTestimonialInfo: TestimonialsInfo = {
            enabled, 
            title,
            subtitle,
            description,
            list: testimonials,
        }
        if(sendData)
        {
            sendData(sendTestimonialInfo)
        }
    }
   

    return (
<Card css={{ p: '10px', mw: '550px', m: "0", gap: "$2" }}>
    <Card.Header>
        <Text h3 css={{textAlign: "center", width: "100%"}}>Testimonials</Text>
    </Card.Header>
    {open &&
    <Card.Body>
        <Text>Enabled</Text>
        <Switch size="sm" initialChecked={testimonialsInfo.enabled} onChange={(e) => {setEnabled(e.target.checked)}}/>
        <Text>Previous: {testimonialsInfo.enabled ? "true" : "false"}</Text>
        <Spacer />

        <Input clearable bordered label={"Testimonial Title"} placeholder={testimonialsInfo.title}
            value={titleInput.bindings.value} onChange={titleInput.bindings.onChange}/>
        <Text>Previous: {testimonialsInfo.title}</Text>
        <Input clearable bordered label={"Testimonial Subtitle"} placeholder={testimonialsInfo.subtitle}
            value={subtitleInput.bindings.value} onChange={subtitleInput.bindings.onChange}/>
        <Text>Previous: {testimonialsInfo.subtitle}</Text>
        <Input clearable bordered label={"Testimonial Description"} placeholder={testimonialsInfo.description}
            value={descriptionInput.bindings.value} onChange={descriptionInput.bindings.onChange}/>
        <Text>Previous: {testimonialsInfo.description}</Text>
        {testimonialsInfo.list.map((item, index) =>
            <TestimonialInput key={index} testimonial={item} index={index} onChange={setTestimonialsHandler} />
        )}
    <TestimonialInput bHide testimonial={{name: "",location: "", description: "", occupation: ""}} index={5} onChange={setTestimonialsHandler} />
    {/* <Button auto onPress={submitTestimonialsInfo}>Add New Testimonial</Button> */}
    <Spacer />
    <Button onPress={submitTestimonialsInfo}>Save Changes</Button>
    {complete === "loading" && <Loading></Loading>}
    </Card.Body>}
    <Card.Body><Button onPress={()=>{setOpen(prevState => !prevState)}}>{open ? "Close" : "Edit"}</Button></Card.Body>
</Card>
)}
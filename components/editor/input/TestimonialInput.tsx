import { Box } from "@/components/styles/box";
import { Checkbox, FormElement, Input, Text, useInput } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";

export interface Testimonial {
    name: string;
    description: string;
    location: string;
    occupation: string;
    enabled: boolean;
}

interface TestimonialProps {
    testimonial: Testimonial;
    index: number;
    onChange: (data: Testimonial, index: number) => void;
    bHide?: boolean;
}

export default function TestimonialInput({testimonial, index, onChange, bHide}: TestimonialProps) {

    const [testimonialData, setTestimonialData] = useState<Testimonial>({name: testimonial.name, 
        description: testimonial.description, location: testimonial.location, occupation: testimonial.occupation, enabled: testimonial.enabled});


    function changeHandler(e: ChangeEvent<FormElement>, type: string){
        if(type === "name")
        {
            if(e.target.value.replace(/\s/g, "") === "")
            {
                setTestimonialData({...testimonialData, name: testimonial.name})     
            }
            else
            {
                setTestimonialData({...testimonialData, name: e.target.value})     
            }
        }
        else if(type === "description")
        {
            if(e.target.value.replace(/\s/g, "") === "")
            {
                setTestimonialData({...testimonialData, description: testimonial.description})     
            }
            else
            {
                setTestimonialData({...testimonialData, description: e.target.value})     
            }
        }
        else if(type === "location")
        {
            if(e.target.value.replace(/\s/g, "") === "")
            {
                setTestimonialData({...testimonialData, location: testimonial.location})     
            }
            else
            {
                setTestimonialData({...testimonialData, location: e.target.value})     
            }
        }
    }

    function checkboxChangeHandler(e: boolean){
        const newTestimonial: Testimonial = {name: testimonialData.name, description: testimonialData.description, 
            location: testimonialData.location, occupation: testimonialData.occupation, enabled: e};
        setTestimonialData(newTestimonial);
    }


    useEffect(() => {
        onChange(testimonialData, index);
      }, [testimonialData]);


    return (
<Box css={{width: "100%", py: "$6", display: `${ bHide ? "none" : "block"}` }}>
    <Text h4>{"Testimonial " + (index + 1)} </Text>
    <Input clearable bordered label={"Name"} placeholder={testimonial.name} css={{width: "100%"}} 
        value={testimonialData?.name} onChange={(e: ChangeEvent<FormElement>) => changeHandler(e, "name")}/>
    <Text>Previous: {testimonial.name}</Text>
    <Input clearable bordered label={"Description"} placeholder={testimonial.description} css={{width: "100%"}}
        value={testimonialData?.description} onChange={(e: ChangeEvent<FormElement>) => changeHandler(e, "description")}/>
    <Text>Previous: {testimonial.description}</Text>
    <Input clearable bordered label={"Location"} placeholder={testimonial.location} css={{width: "100%"}}
        value={testimonialData?.location} onChange={(e: ChangeEvent<FormElement>) => changeHandler(e, "location")}/>
    <Text>Previous: {testimonial.location}</Text>
    <div>
        <Checkbox size="sm" label={"Enabled"} isSelected={testimonialData.enabled} defaultChecked={testimonialData.enabled} onChange={checkboxChangeHandler} />
    </div>

</Box>
)}
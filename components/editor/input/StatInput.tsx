import { Box } from "@/components/styles/box";
import { FormElement, Input, Text, useInput } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";

export interface Stat {
    title: string;
    description: string;
}


interface StatsProps {
    stat: Stat;
    index: number;
    onChange: (data: Stat, index: number) => void;
    bHide?: boolean;
}

export default function StatsInput({stat, index, onChange, bHide}: StatsProps) {

    const [statData, setStatData] = useState<Stat>({title: "", description: ""});


    function changeHandler(e: ChangeEvent<FormElement>, type: string){
        if(type === "title")
        {
            if(e.target.value.replace(/\s/g, "") === "")
            {
                setStatData({...statData, title: stat.title})     
            }
            else
            {
                setStatData({...statData, title: e.target.value})     
            }
        }
        else if(type === "description")
        {
            if(e.target.value.replace(/\s/g, "") === "")
            {
                setStatData({...statData, description: stat.description})     
            }
            else
            {
                setStatData({...statData, description: e.target.value})     
            }
        }
    }

    useEffect(() => {
        onChange(statData, index);
      }, [statData]);


    return (
<Box css={{width: "100%", py: "$6", display: `${ bHide ? "none" : "block"}` }}>
    <Text h4>{"Stat " + (index + 1)} </Text>
    <Input clearable bordered label={"Title"} placeholder={stat.title} css={{width: "100%"}} 
        value={statData?.title} onChange={(e: ChangeEvent<FormElement>) => changeHandler(e, "title")}/>
    <Text>Previous: {stat.title}</Text>
    <Input clearable bordered label={"Description"} placeholder={stat.description} css={{width: "100%"}}
        value={statData?.description} onChange={(e: ChangeEvent<FormElement>) => changeHandler(e, "description")}/>
    <Text>Previous: {stat.description}</Text>
</Box>
)}
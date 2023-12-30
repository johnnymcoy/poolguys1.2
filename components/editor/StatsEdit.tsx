import { Button, Card, Checkbox, Dropdown, Input, Loading, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { postConfig } from "../../store/config-store";
import { useEffect, useState } from "react";
import QuestionInput from "./input/FaqInput";
import StatsInput from "./input/StatInput";


export interface Stat {
    title: string;
    description: string;
}

export interface StatInfo {
    title: string;
    description: string;
    enabled: boolean;
    list: Stat[];
}

export type Status = ("idle" | "loading" | "complete" | "failed")



interface StatEditProps {
    sendData: (arg0: StatInfo) => void,
    complete: Status
}


export default function StatEdit({sendData, complete}: StatEditProps) {
    const statInfo = useSelector((state: RootState) => state.config.stats); 
    const [open, setOpen] = useState(false);

    const [enabled, setEnabled] = useState(statInfo.enabled);

    const [stats, setStats] = useState<Stat[]>(statInfo.list);

    function setStatsHandler(data: Stat, index: number){
        const newStats = stats.map((item, i) => {
            if(i === index){
                return data;
            } else {
                return item;
            }
        });
        setStats(newStats);
    }

    // useEffect(() => {
    //     console.log(testimonials)
    //   }, [testimonials]);

    const titleInput = useInput("");
    const descriptionInput = useInput("");


    function submitTestimonialsInfo(){
        let title = statInfo.title;
        if(titleInput.value.replace(/\s/g, "") !== ""  && titleInput.value !== statInfo.title)
        {
            title = titleInput.value;
        }
        let description = statInfo.description;
        if(descriptionInput.value.replace(/\s/g, "") !== ""  && descriptionInput.value !== statInfo.description)
        {
            description = descriptionInput.value;
        }

        const sendStatInfo: StatInfo = {
            enabled, 
            title,
            description,
            list: stats,
        }
        if(sendData)
        {
            sendData(sendStatInfo)
        }
    }
   

    return (
<Card css={{ p: '10px', mw: '550px', m: "0", gap: "$2" }}>
    <Card.Header>
        <Text h3 css={{textAlign: "center", width: "100%"}}>Stats</Text>
    </Card.Header>
    {open &&
    <Card.Body>
        <Text>Enabled</Text>
        <Switch size="sm" initialChecked={statInfo.enabled} onChange={(e) => {setEnabled(e.target.checked)}}/>
        <Text>Previous: {statInfo.enabled ? "true" : "false"}</Text>
        <Spacer />

        <Input clearable bordered label={"Testimonial Title"} placeholder={statInfo.title}
            value={titleInput.bindings.value} onChange={titleInput.bindings.onChange}/>
        <Text>Previous: {statInfo.title}</Text>
        <Input clearable bordered label={"Testimonial Description"} placeholder={statInfo.description}
            value={descriptionInput.bindings.value} onChange={descriptionInput.bindings.onChange}/>
        <Text>Previous: {statInfo.description}</Text>
        {statInfo.list.map((item, index) =>
            <StatsInput key={index} stat={item} index={index} onChange={setStatsHandler} />
        )}
    <StatsInput bHide stat={{title: "", description: "", }} index={4} onChange={setStatsHandler} />
    <Spacer />
    <Button onPress={submitTestimonialsInfo}>Save Changes</Button>
    {complete === "loading" && <Loading></Loading>}
    </Card.Body>}
    <Card.Body><Button onPress={()=>{setOpen(prevState => !prevState)}}>{open ? "Close" : "Edit"}</Button></Card.Body>
</Card>
)}
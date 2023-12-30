import { Button, Card, Checkbox, Dropdown, Input, Loading, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import ServicesInput from "./input/ServicesInput";
import StatsInput from "./input/StatInput";


export interface About {
    title: string;
    description: string;
}

export interface AboutInfo {
    title: string;
    subtitle: string;
    intro: string;
    pointsEnabled: boolean;
    points : About[];
}

export type Status = ("idle" | "loading" | "complete" | "failed")



interface AboutEditProps {
    sendData: (arg0: AboutInfo) => void,
    complete: Status
}


export default function AboutEdit({sendData, complete}: AboutEditProps) {
    const aboutInfo = useSelector((state: RootState) => state.config.about); 
    const [open, setOpen] = useState(false);

    const titleInput = useInput("");
    const subtitleInput = useInput("");
    const introInput = useInput("");

    const [enabled, setEnabled] = useState(aboutInfo.pointsEnabled);

    const [points, setPoints] = useState<About[]>(aboutInfo.points);


    function setPointsHandler(data: About, index: number){
        const newPoints = points.map((item, i) => {
            if(i === index){
                return data;
            } else {
                return item;
            }
        });
        setPoints(newPoints);
    }


    function submitServicesInfo(){
        let title = aboutInfo.title;
        if(titleInput.value.replace(/\s/g, "") !== ""  && titleInput.value !== aboutInfo.title)
        {
            title = titleInput.value;
        }
        let subtitle = aboutInfo.subtitle;
        if(subtitleInput.value.replace(/\s/g, "") !== ""  && subtitleInput.value !== aboutInfo.subtitle)
        {
            subtitle = subtitleInput.value;
        }
        let intro = aboutInfo.intro;
        if(introInput.value.replace(/\s/g, "") !== ""  && introInput.value !== aboutInfo.intro)
        {
            intro = introInput.value;
        }

        const sendServicesInfo: AboutInfo = {
            title,
            subtitle,
            intro,
            points: points,
            pointsEnabled: enabled,
        }
        if(sendData)
        {
            sendData(sendServicesInfo)
        }
    }
   

    return (
<Card css={{ p: '10px', mw: '550px', m: "0" }}>
    <Card.Header>
        <Text h3 css={{textAlign: "center", width: "100%"}}>About Page</Text>
    </Card.Header>
    {open && <Card.Body>
        <Input clearable bordered label={"About Title"} placeholder={aboutInfo.title}
            value={titleInput.bindings.value} onChange={titleInput.bindings.onChange}/>
        <Text>Previous: {aboutInfo.title}</Text>
        <Input clearable bordered label={"About Subtitle"} placeholder={aboutInfo.subtitle}
            value={subtitleInput.bindings.value} onChange={subtitleInput.bindings.onChange}/>
        <Text>Previous: {aboutInfo.subtitle}</Text>
        <Input clearable bordered label={"About Intro"} placeholder={aboutInfo.intro}
            value={introInput.bindings.value} onChange={introInput.bindings.onChange}/>
        <Text>Previous: {aboutInfo.intro}</Text>
        <Spacer />
        <Spacer />
        <Text>Points Enabled</Text>
        <Switch size="sm" initialChecked={aboutInfo.pointsEnabled} onChange={(e) => {setEnabled(e.target.checked)}}/>
        <Text>Previous: {aboutInfo.pointsEnabled ? "true" : "false"}</Text>
        <Spacer />

    {aboutInfo.points.map((item, index) =>
        <StatsInput key={index} stat={item} index={index} onChange={setPointsHandler} />
    )}
    <StatsInput bHide stat={{title: "", description: ""}} index={3} onChange={setPointsHandler} />
    <Button onPress={submitServicesInfo}>Save Changes</Button>
    {complete === "loading" && <Loading></Loading>}
    </Card.Body>}
    <Card.Body><Button onPress={()=>{setOpen(prevState => !prevState)}}>{open ? "Close" : "Edit"}</Button></Card.Body>
</Card>
)}
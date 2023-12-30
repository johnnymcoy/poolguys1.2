import { Button, Card, Checkbox, Dropdown, Input, Loading, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import HomeInput from "./input/HomeInput";


export interface Point {
    text: string;
    enabled: boolean;
}

// export interface PointEdit {
//     point: Point;
// }


export interface ImageType {
    src: string;
    alt: string;
}
export interface Images {
    home_image: ImageType;
}


export interface HomeInfo {
    title: string;
    subtitle: string;
    description: string;
    pointsEnabled: boolean;
    points : Point[];
    images: Images;
}

export type Status = ("idle" | "loading" | "complete" | "failed")



interface HomeEditProps {
    sendData: (arg0: HomeInfo) => void,
    complete: Status
}


export default function HomeEdit({sendData, complete}: HomeEditProps) {
    const homeInfo = useSelector((state: RootState) => state.config.home); 
    const [open, setOpen] = useState(false);

    const titleInput = useInput("");
    const subtitleInput = useInput("");
    const descriptionInput = useInput("");
    const [enabled, setEnabled] = useState(homeInfo.pointsEnabled);

    const [points, setPoints] = useState<Point[]>(homeInfo.points);

    // const pointsTotal = homeInfo.points.map((item) => ({ text: item.text, input: useInput(""), enabled: item.enabled}));
    // const [pointsTotal, setPointsTotal] = useState(homeInfo.points.map((item) => ({ text: item.text, input: useInput("") })));   

    // function addPointHandler(){
    //     // const newPoint = { text: "Cleaning", input: useInput("")};
    //     setPointsTotal(prevState => [...prevState, { text: "Cleaning", input: useInput("")}]);
    // }

    function setPointsHandler(data: Point, index: number){
        const newPoints = points.map((item, i) => {
            if(i === index){
                return data;
            } else {
                return item;
            }
        });
        setPoints(newPoints);
        console.log(points)
    }


    function submitHomeInfo(){
        let title = homeInfo.title;
        if(titleInput.value.replace(/\s/g, "") !== ""  && titleInput.value !== homeInfo.title)
        {
            title = titleInput.value;
        }
        let subtitle = homeInfo.subtitle;
        if(subtitleInput.value.replace(/\s/g, "") !== ""  && subtitleInput.value !== homeInfo.subtitle)
        {
            subtitle = subtitleInput.value;
        }
        let description = homeInfo.description;
        if(descriptionInput.value.replace(/\s/g, "") !== ""  && descriptionInput.value !== homeInfo.description)
        {
            description = descriptionInput.value;
        }
        // let points = [];
        // for(let i = 0; i < pointsTotal.length; i++)
        // {
        //     if(pointsTotal[i].input.currentRef.current.replace(/\s/g, "") !== "" && pointsTotal[i].input.currentRef.current !== homeInfo.points[i].text)
        //     {
        //         const newPoint: Point = { text: pointsTotal[i].input.currentRef.current, }//enabled: pointsTotal.};
        //         points.push(newPoint);
        //         console.log(pointsTotal[i].input.currentRef.current);
        //     }
        //     else
        //     {
        //         points.push(pointsTotal[i]);
        //     }
        //     if(pointsTotal[i].enabled !== homeInfo.points[i].enabled)
        //     {
                
        //     }
        // }
        // console.log(points)
        // for(let i = 0; i < pointsTotal.length; i++)
        // {
        //     if(pointsInput[i].value.replace(/\s/g, "") !== "" && pointsInput[i].value !== pointsTotal[i].text)
        //     {
        //         const newPoint: Point = { text: pointsInput[i].value};
        //         points.push(newPoint);
        //         console.log(pointsInput[i].value);
        //     }
        //     else
        //     {
        //         points.push(pointsTotal[i]);
        //     }
        // }
        // if(points.length === 0)
        // {
        //     points = pointsTotal;
        // }
        const sendHomeInfo: HomeInfo = {
            title,
            subtitle,
            description,
            points: points,
            pointsEnabled: enabled,
            images: homeInfo.images,
        }
        if(sendData)
        {
            sendData(sendHomeInfo)
        }
    }
   

    return (
<Card css={{ p: '10px', mw: '550px', m: "0" }}>
    <Card.Header>
        <Text h3 css={{textAlign: "center", width: "100%"}}>Home Page</Text>
    </Card.Header>
    {open && <Card.Body>
        <Input clearable bordered label={"Home Title"} placeholder={homeInfo.title}
            value={titleInput.bindings.value} onChange={titleInput.bindings.onChange}/>
        <Text>Previous: {homeInfo.title}</Text>
        <Input clearable bordered label={"Home Subtitle"} placeholder={homeInfo.subtitle}
            value={subtitleInput.bindings.value} onChange={subtitleInput.bindings.onChange}/>
        <Text>Previous: {homeInfo.subtitle}</Text>
        <Input clearable bordered label={"Home Description"} placeholder={homeInfo.description}
            value={descriptionInput.bindings.value} onChange={descriptionInput.bindings.onChange}/>
        <Text>Previous: {homeInfo.description}</Text>
        <Spacer />
        <Spacer />
        <Text>Points Enabled</Text>
        <Switch size="sm" initialChecked={homeInfo.pointsEnabled} onChange={(e) => {setEnabled(e.target.checked)}}/>
        <Text>Previous: {homeInfo.pointsEnabled ? "true" : "false"}</Text>
        <Spacer />
        {homeInfo.points.map((item, index) => {
            return(
            <div key={index}>
                <HomeInput point={item} index={index} onChange={setPointsHandler} />
                {/* <Input clearable bordered label={`${"Point "} ${index + 1}`} placeholder={item.text} 
                    value={item.input.bindings.value} onChange={item.input.bindings.onChange}/>
                <Text>Previous: {item.text}</Text>
                <div>
                </div> */}
            </div>
            )
        })}
        <Spacer />
        {/* <div>
            <Button auto size={"xs"} onClick={addPointHandler}>Add Point</Button>
        </div> */}
        <Spacer />

    <Button onPress={submitHomeInfo}>Save Changes</Button>
    {complete === "loading" && <Loading></Loading>}
    </Card.Body>}
    <Card.Body><Button onPress={()=>{setOpen(prevState => !prevState)}}>{open ? "Close" : "Edit"}</Button></Card.Body>
</Card>
)}
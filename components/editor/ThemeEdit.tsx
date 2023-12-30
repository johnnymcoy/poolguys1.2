import { Button, Card, Checkbox, Dropdown, Input, Loading, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";


export interface ColorInfo {
    primary: string;
    background: string;
    text: string;
}

export interface ThemeInfo {
    bDarkMode: boolean;
    theme_color: ColorInfo;
    // textColors: ColorInfo;
}

// TEXT
//primary
//

//  Theme
//  background
//  

export type Status = ("idle" | "loading" | "complete" | "failed")



interface ThemeEditProps {
    sendData: (arg0: ThemeInfo) => void,
    complete: Status
}


export default function ThemeEdit({sendData, complete}: ThemeEditProps) {
    const themeInfo = useSelector((state: RootState) => state.config.theme); 
    const [open, setOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(themeInfo.bDarkMode);
    const backgroundColorInput = useInput("");


    function submitTestimonialsInfo(){
        const sendThemeInfo: ThemeInfo = {
            bDarkMode: darkMode,
            theme_color: {
                primary: "string",
                background: "string",
                text: "string",        
            }
        }
        if(sendData)
        {
            sendData(sendThemeInfo)
        }
    }
   

    return (
<Card css={{ p: '10px', mw: '550px', m: "0", gap: "$2" }}>
    <Card.Header>
        <Text h3 css={{textAlign: "center", width: "100%"}}>Theme</Text>
    </Card.Header>
    {open &&
    <Card.Body>
        {/* <Input clearable bordered label={"Testimonial Title"} placeholder={testimonialsInfo.title}
            value={titleInput.bindings.value} onChange={titleInput.bindings.onChange}/>
        <Text>Previous: {testimonialsInfo.title}</Text>
        <Input clearable bordered label={"Testimonial Subtitle"} placeholder={testimonialsInfo.subtitle}
            value={subtitleInput.bindings.value} onChange={subtitleInput.bindings.onChange}/>
        <Text>Previous: {testimonialsInfo.subtitle}</Text>
        <Input clearable bordered label={"Testimonial Description"} placeholder={testimonialsInfo.description}
            value={descriptionInput.bindings.value} onChange={descriptionInput.bindings.onChange}/>
        <Text>Previous: {testimonialsInfo.description}</Text> */}
        {/* {testimonialsInfo.list.map((item, index) =>
            <TestimonialInput key={index} testimonial={item} index={index} onChange={setTestimonialsHandler} />
        )} */}
    {/* <TestimonialInput bHide testimonial={{name: "",location: "", description: "", occupation: ""}} index={5} onChange={setThemeHandler} /> */}
    {/* <Button auto onPress={submitTestimonialsInfo}>Add New Testimonial</Button> */}
    {/* <Input bordered label={"Description"} type="color" placeholder={themeInfo.backgroundColor} value={backgroundColorInput.bindings.value} onChange={backgroundColorInput.bindings.onChange}/> */}
    <Text>Have Dark Mode Option</Text>
    <Switch size="sm" initialChecked={themeInfo.bDarkMode} onChange={(e) => {setDarkMode(e.target.checked)}}/>
    <Text>Previous: {themeInfo.bDarkMode ? "true" : "false"}</Text>
    <Spacer />
    <Button onPress={submitTestimonialsInfo}>Save Changes</Button>
    {complete === "loading" && <Loading></Loading>}
    </Card.Body>}
    <Card.Body><Button onPress={()=>{setOpen(prevState => !prevState)}}>{open ? "Close" : "Edit"}</Button></Card.Body>
</Card>
)}
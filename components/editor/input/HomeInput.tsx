import { Box } from "@/components/styles/box";
import { Checkbox, FormElement, Input, Text, useInput } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";

export interface Point {
    text: string;
    enabled: boolean;
}

interface HomeInputProps {
    index: number;
    onChange: (data: Point, index: number) => void;
    bHide?: boolean;
    point: Point;

}

export default function HomeInput({point, index, onChange, bHide}: HomeInputProps) {

    const pointTextInput = useInput("");

    const [pointData, setPointData] = useState<Point>({text: point.text, enabled: point.enabled});

    function checkboxChangeHandler(e: boolean){
        const newPoint: Point = {text: pointData.text, enabled: e};
        setPointData(newPoint);
    }
    function textChangeHandler(e: ChangeEvent<FormElement>){
        // console.log(e.target.value)
        const newPoint: Point = {text: e.target.value, enabled: pointData.enabled};
        setPointData(newPoint);
    }

    useEffect(() => {
        onChange(pointData, index);
      }, [pointData]);


    return (
<div key={index}>
        <Input clearable bordered label={`${"Point "} ${index + 1}`} placeholder={point.text} 
            value={pointTextInput.bindings.value} onChange={textChangeHandler}/>
        <Text>Previous: {point.text}</Text>
        <div>
            <Checkbox size="sm" label={"Enabled"} isSelected={pointData.enabled} defaultChecked={point.enabled} onChange={checkboxChangeHandler} />
        </div>
    </div>
)}
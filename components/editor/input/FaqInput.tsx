import { Box } from "@/components/styles/box";
import { FormElement, Input, Text, useInput } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";

export interface Question {
    question: string;
    answer: string;
}

interface QuestionProps {
    faq: Question;
    index: number;
    onChange: (data: Question, index: number) => void;
    bHide?: boolean;
}

export default function QuestionInput({faq, index, onChange, bHide}: QuestionProps) {

    const [questionData, setQuestionData] = useState<Question>({question: "", answer: ""});


    function changeHandler(e: ChangeEvent<FormElement>, type: string){
        if(type === "question")
        {
            if(e.target.value.replace(/\s/g, "") === "")
            {
                setQuestionData({...questionData, question: faq.question})     
            }
            else
            {
                setQuestionData({...questionData, question: e.target.value})     
            }
        }
        else if(type === "answer")
        {
            if(e.target.value.replace(/\s/g, "") === "")
            {
                setQuestionData({...questionData, answer: faq.answer})     
            }
            else
            {
                setQuestionData({...questionData, answer: e.target.value})     
            }
        }
    }

    useEffect(() => {
        // console.log(questionData)
        onChange(questionData, index);
      }, [questionData]);


    return (
<Box css={{width: "100%", py: "$6", display: `${ bHide ? "none" : "block"}` }}>
    <Text h4>{"FAQ " + (index + 1)} </Text>
    <Input clearable bordered label={"Question"} placeholder={faq.question} css={{width: "100%"}} 
        value={questionData?.question} onChange={(e: ChangeEvent<FormElement>) => changeHandler(e, "question")}/>
    <Text>Previous: {faq.question}</Text>
    <Input clearable bordered label={"Answer"} placeholder={faq.answer} css={{width: "100%"}}
        value={questionData?.answer} onChange={(e: ChangeEvent<FormElement>) => changeHandler(e, "answer")}/>
    <Text>Previous: {faq.answer}</Text>
</Box>
)}
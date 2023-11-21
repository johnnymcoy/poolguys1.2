import { Button, Card, Checkbox, Dropdown, Input, Loading, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { postConfig } from "../../store/config-store";
import { useEffect, useState } from "react";
import QuestionInput from "./input/FaqInput";


export interface Question {
    question: string;
    answer: string;
}

export interface QuestionsInfo {
    title: string;
    subtitle: string;
    enabled: boolean;
    list: Question[];
}

export type Status = ("idle" | "loading" | "complete" | "failed")



interface QuestionsEditProps {
    sendData: (arg0: QuestionsInfo) => void,
    complete: Status
}


export default function QuestionsEdit({sendData, complete}: QuestionsEditProps) {
    const faqInfo = useSelector((state: RootState) => state.config.FAQ); 
    const [open, setOpen] = useState(false);


    const [faqs, setFaqs] = useState<Question[]>(faqInfo.list);

    function setFaqsHandler(data: Question, index: number){
        const newFaqs = faqs.map((item, i) => {
            if(i === index){
                return data;
            } else {
                return item;
            }
        });
        setFaqs(newFaqs);
    }

    // useEffect(() => {
    //     console.log(faqs)
    //   }, [faqs]);

    const titleInput = useInput("");
    const subtitleInput = useInput("");


    function submitQuestionsInfo(){
        let title = faqInfo.title;
        if(titleInput.value.replace(/\s/g, "") !== ""  && titleInput.value !== faqInfo.title)
        {
            title = titleInput.value;
        }
        let subtitle = faqInfo.subtitle;
        if(subtitleInput.value.replace(/\s/g, "") !== ""  && subtitleInput.value !== faqInfo.subtitle)
        {
            subtitle = subtitleInput.value;
        }

        const sendQuestionInfo: QuestionsInfo = {
            title,
            subtitle,
            enabled: true,
            list: faqs,
        }
        if(sendData)
        {
            sendData(sendQuestionInfo)
        }
    }
   

    return (
<Card css={{ p: '10px', mw: '550px', m: "0", gap: "$2" }}>
    <Card.Header>
        <Text h3 css={{textAlign: "center", width: "100%"}}>FAQ</Text>
    </Card.Header>
    {open &&
    <Card.Body>
        <Input clearable bordered label={"FAQ Title"} placeholder={faqInfo.title}
            value={titleInput.bindings.value} onChange={titleInput.bindings.onChange}/>
        <Text>Previous: {faqInfo.title}</Text>
        <Input clearable bordered label={"FAQ Description"} placeholder={faqInfo.subtitle}
            value={subtitleInput.bindings.value} onChange={subtitleInput.bindings.onChange}/>
        <Text>Previous: {faqInfo.subtitle}</Text>
        {faqInfo.list.map((item, index) =>
            <QuestionInput key={index} faq={item} index={index} onChange={setFaqsHandler} />
        )}
    <QuestionInput bHide faq={{question: "", answer: ""}} index={5} onChange={setFaqsHandler} />
    <Spacer />
    <Button onPress={submitQuestionsInfo}>Save Changes</Button>
    {complete === "loading" && <Loading></Loading>}
    </Card.Body>}
    <Card.Body><Button onPress={()=>{setOpen(prevState => !prevState)}}>{open ? "Close" : "Edit"}</Button></Card.Body>
</Card>
)}
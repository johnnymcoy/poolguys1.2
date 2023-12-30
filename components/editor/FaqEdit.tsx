import { Button, Card, Checkbox, Dropdown, Input, Loading, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { postConfig } from "../../store/config-store";
import { useEffect, useState } from "react";
import QuestionInput from "./input/FaqInput";


export interface Question {
    question: string;
    answer: string;
    enabled: boolean;
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

    const [enabled, setEnabled] = useState(faqInfo.enabled);

    const [faqs, setFaqs] = useState<Question[]>(faqInfo.list);
    const [addedFaqs, setAddedFaqs] = useState<Question[]>([]);

    function addQuestionHandler(){
        const newQuestion: Question = { question: "Do you offer money back", 
            answer: "Yes, we have a money back policy", enabled: true};

        setAddedFaqs(prevState => [...prevState, newQuestion]);
    }


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

    function setAddedFaqsHandler(data: Question, index: number){
        const newFaqs = addedFaqs.map((item, i) => {
            if((faqInfo.list.length - i) === index){
                return data;
            } else {
                return item;
            }
        });
        setAddedFaqs(newFaqs);
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
        const allFaq = [...faqs, ...addedFaqs];
        const filteredFaq = allFaq.filter(faq => faq.enabled !== false);
        setFaqs(filteredFaq);

        const sendQuestionInfo: QuestionsInfo = {
            title,
            subtitle,
            enabled,
            list: filteredFaq,
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
        <Text>Enabled</Text>
        <Switch size="sm" initialChecked={faqInfo.enabled} onChange={(e) => {setEnabled(e.target.checked)}}/>
        <Text>Previous: {faqInfo.enabled ? "true" : "false"}</Text>
        <Spacer />

        <Input clearable bordered label={"FAQ Title"} placeholder={faqInfo.title}
            value={titleInput.bindings.value} onChange={titleInput.bindings.onChange}/>
        <Text>Previous: {faqInfo.title}</Text>
        <Input clearable bordered label={"FAQ Description"} placeholder={faqInfo.subtitle}
            value={subtitleInput.bindings.value} onChange={subtitleInput.bindings.onChange}/>
        <Text>Previous: {faqInfo.subtitle}</Text>
        {faqInfo.list.map((item, index) =>
            <QuestionInput key={index} faq={item} index={index} onChange={setFaqsHandler} />
        )}
        {addedFaqs.map((item, index) =>
            <QuestionInput key={index} faq={item} index={faqInfo.list.length + index} onChange={setAddedFaqsHandler} />
        )}

    <QuestionInput bHide faq={{question: "", answer: "", enabled: false}} index={5} onChange={setFaqsHandler} />
    <Spacer />
        <div>
            <Button auto size={"xs"} onClick={addQuestionHandler}>Add Question</Button>
        </div>
        <Spacer />
    <Spacer />
    <Spacer />
    <Button onPress={submitQuestionsInfo}>Save Changes</Button>
    {complete === "loading" && <Loading></Loading>}
    </Card.Body>}
    <Card.Body><Button onPress={()=>{setOpen(prevState => !prevState)}}>{open ? "Close" : "Edit"}</Button></Card.Body>
</Card>
)}
import { Flex } from "../styles/flex"
import { Button, Card, Checkbox, Dropdown, Input, Spacer, Switch, Text, useInput } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Box } from "../styles/box";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { postConfig } from "../../store/config-store";
import { useState } from "react";
import ContactEdit, { SiteInfo, Status } from "./ContactEdit";
import ServicesEdit, { ServicesInfo } from "./ServicesEdit";
import TestimonialsEdit, { TestimonialsInfo } from "./TestimonialsEdit";
import QuestionsEdit, { QuestionsInfo } from "./FaqEdit";
import StatEdit, { StatInfo } from "./StatsEdit";
import AboutEdit, { AboutInfo } from "./AboutEdit";

export default function PageEditor() {
    const { data: session } = useSession()
    const config = useSelector((state: RootState) => state.config);

    const siteInfo = useSelector((state: RootState) => state.config.site);
    const homeInfo = useSelector((state: RootState) => state.config.home);
    const aboutInfo = useSelector((state: RootState) => state.config.about);
    const servicesInfo = useSelector((state: RootState) => state.config.services);
    const statsInfo = useSelector((state: RootState) => state.config.stats);
    const comparisonInfo = useSelector((state: RootState) => state.config.comparison);
    const testimonialsInfo = useSelector((state: RootState) => state.config.testimonials);
    const contactInfo = useSelector((state: RootState) => state.config.contact);
    const faqInfo = useSelector((state: RootState) => state.config.FAQ);
    const menuInfo = useSelector((state: RootState) => state.config.menu);

    const dispatch = useDispatch();
    
    let sendData = {
        site: siteInfo,
        home: homeInfo,
        about: aboutInfo,
        services: servicesInfo,
        stats: statsInfo,
        comparison: comparisonInfo,
        testimonials: testimonialsInfo,
        contact: contactInfo,
        FAQ: faqInfo,
        menu: menuInfo
    };

    const [contactLoading, setContactLoading] = useState<Status>("idle");
    const [servicesLoading, setServicesLoading] = useState<Status>("idle");
    const [testimonialsLoading, setTestimonialsLoading] = useState<Status>("idle");
    const [questionsLoading, setQuestionsLoading] = useState<Status>("idle");
    const [statsLoading, setStatsLoading] = useState<Status>("idle");
    const [aboutLoading, setAboutLoading] = useState<Status>("idle");

    function submitContactHandler(data: SiteInfo){
        setContactLoading("loading");
        sendData.contact = data;
        setTimeout(submitHandler, 2000)
    }

    function submitAboutHandler(data: AboutInfo){
        setAboutLoading("loading");
        sendData.about = data;
        setTimeout(submitHandler, 2000)
    }

    
    
    function submitServicesHandler(data: ServicesInfo){
        setServicesLoading("loading");
        sendData.services = data;
        setTimeout(submitHandler, 2000)
    }

    function submitTestimonialsHandler(data: TestimonialsInfo){
        setTestimonialsLoading("loading");
        sendData.testimonials = data;
        setTimeout(submitHandler, 2000)
    }
    function submitStatsHandler(data: StatInfo){
        setStatsLoading("loading");
        sendData.stats = data;
        setTimeout(submitHandler, 2000)
    }
    function submitQuestionsHandler(data: QuestionsInfo){
        setQuestionsLoading("loading");
        sendData.FAQ = data;
        setTimeout(submitHandler, 2000)
    }
    
    
    function submitHandler(){
        setContactLoading("complete");
        setServicesLoading("complete");
        setTestimonialsLoading("complete");
        setQuestionsLoading("complete");
        setStatsLoading("complete");
        setAboutLoading("complete");
        console.log(sendData);
        dispatch(postConfig(sendData))
    }
    
    
if(session){
    return (
<Flex
    css={{ py: '1rem', gap: '0.5rem', px: '1rem' }}
    justify={'center'}
    wrap={'wrap'}
    // direction={'column'}
    // align={'center'}
>
    <Text h1
        css={{
        width: '100%',
        textAlign: 'center',}}>
            Admin Dashboard
    </Text>
        {/* Web stats  */}
        <ContactEdit sendData={submitContactHandler} complete={contactLoading} />
        <AboutEdit sendData={submitAboutHandler} complete={aboutLoading}/>
        <ServicesEdit sendData={submitServicesHandler} complete={servicesLoading} />
        <TestimonialsEdit sendData={submitTestimonialsHandler} complete={testimonialsLoading}/>
        <QuestionsEdit sendData={submitQuestionsHandler} complete={questionsLoading} />
        <StatEdit sendData={submitStatsHandler} complete={statsLoading} />

    {/* <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>Home Page</Text>
        </Card.Header>
        <Input clearable bordered label={"Title Text"} placeholder={homeInfo.title}/>
        <Input clearable bordered label={"Subtitle Text"} placeholder={homeInfo.subtitle}/>
        <Input clearable bordered label={"Description"} placeholder={homeInfo.description}/>
        {homeInfo.points.map((item, index) =>
            <Input clearable bordered key={"point" + index} label={"Point "+ (index + 1)} placeholder={item.text}/>
        )}
    </Card> */}
    {/* <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>About Page</Text>
        </Card.Header>
        <Input clearable bordered label={"About Intro"} placeholder={aboutInfo.intro}/>
    </Card> */}
    {/* <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>Stats</Text>
        </Card.Header>
        <Button size={"sm"} auto >Disable</Button>
        <Input clearable bordered label={"Stats Title"} placeholder={statsInfo.title}/>
        <Input clearable bordered label={"Stats Description"} placeholder={statsInfo.description}/>
        {statsInfo.list.map((item, index) =>
        <Box key={"Stat " +  index} css={{width: "100%",}}>
            {"Stat " + (index + 1)}
            <Input clearable bordered label={"Title"} placeholder={item.title} css={{width: "100%"}}/>
            <Input clearable bordered label={"Description"} placeholder={item.description} css={{width: "100%"}}/>
        </Box>
        )}
    </Card> */}
    {/* <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>FAQ</Text>
        </Card.Header>
        <Button size={"sm"} auto >Disable</Button>
        <Input clearable bordered label={"FAQ Title"} placeholder={faqInfo.title}/>
        <Input clearable bordered label={"FAQ Subtitle"} placeholder={faqInfo.subtitle}/>
        {faqInfo.list.map((item, index) =>
        <Box key={"FAQ " +index} css={{width: "100%",}}>
            {"FAQ " + (index + 1)}
            <Input clearable bordered label={"Question"} placeholder={item.question} css={{width: "100%"}}/>
            <Input clearable bordered label={"Answer"} placeholder={item.answer} css={{width: "100%"}}/>
        </Box>
        )}
    </Card> */}
    {/* <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>Comparision Images</Text>
        </Card.Header>
    </Card> */}


    {/* <h3>Edit/Remove Page</h3> 
    {menuInfo.map((item, index) => {
        return(
        <div key={index}>
            <h4>{item.name}</h4>
            <Checkbox label="Enabled" size={"sm"} isSelected={item.enabled} />
        </div>);
    })} */}
    
    <Flex css={{py: '$10', gap: '2rem', px: '0', width: "100%" }}
        justify={'center'}
        wrap={'wrap'}
        direction={'row'}
        align={'center'}>
        <Button onPress={submitHandler}>Save Changes</Button>  
        {/* <Button>Save Changes</Button>   */}
    </Flex>
        <Link href="mailto:cbuccioljr@gmail.com">Email Question</Link>   
    <Text h1
        css={{
        width: '100%',
        // color: '$accents8',
        textAlign: 'center',}}>
            Guide
    </Text>


</Flex>
)}

  return (
<Flex
    css={{ py: '0', gap: '0rem', px: '0' }}
    justify={'center'}
    wrap={'wrap'}
    direction={'column'}
    align={'center'}
>
</Flex>
)}
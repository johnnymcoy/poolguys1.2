import { Flex } from "../styles/flex"
import { Button,  Text, } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchConfig, postConfig } from "../../store/config-store";
import { useEffect, useState } from "react";
import ContactEdit, { SiteInfo, Status } from "./ContactEdit";
import ServicesEdit, { ServicesInfo } from "./ServicesEdit";
import TestimonialsEdit, { TestimonialsInfo } from "./TestimonialsEdit";
import QuestionsEdit, { QuestionsInfo } from "./FaqEdit";
import StatEdit, { StatInfo } from "./StatsEdit";
import AboutEdit, { AboutInfo } from "./AboutEdit";
import ThemeEdit, {ThemeInfo} from "./ThemeEdit";
import HomeEdit, { HomeInfo } from "./HomeEdit";

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
    const themeInfo = useSelector((state: RootState) => state.config.theme);


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
        menu: menuInfo,
        theme: themeInfo
    };

    const [contactLoading, setContactLoading] = useState<Status>("idle");
    const [themeLoading, setThemeLoading] = useState<Status>("idle");

    const [servicesLoading, setServicesLoading] = useState<Status>("idle");
    const [testimonialsLoading, setTestimonialsLoading] = useState<Status>("idle");
    const [questionsLoading, setQuestionsLoading] = useState<Status>("idle");
    const [statsLoading, setStatsLoading] = useState<Status>("idle");
    const [aboutLoading, setAboutLoading] = useState<Status>("idle");
    const [homeLoading, setHomeLoading] = useState<Status>("idle");

    function submitContactHandler(data: SiteInfo){
        setContactLoading("loading");
        sendData.contact = data;
        setTimeout(submitHandler, 2000)
    }

    function submitThemeHandler(data: ThemeInfo){
        setThemeLoading("loading");
        sendData.theme = data;
        setTimeout(submitHandler, 2000)
    }


    function submitAboutHandler(data: AboutInfo){
        setAboutLoading("loading");
        sendData.about = data;
        setTimeout(submitHandler, 2000)
    }
    function submitHomeHandler(data: HomeInfo){
        setHomeLoading("loading");
        sendData.home = data;
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
        setThemeLoading("complete");
        setHomeLoading("complete");

        console.log(sendData);
        dispatch(postConfig(sendData))
        //TODO Show modal Complete

        setTimeout(fectchUpdated, 2000)
        // window.location.reload();
    }


    function fectchUpdated(){
        dispatch(fetchConfig());
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
        <HomeEdit sendData={submitHomeHandler} complete={homeLoading}/>
        <ContactEdit sendData={submitContactHandler} complete={contactLoading} />
        <ThemeEdit sendData={submitThemeHandler} complete={themeLoading} />
        <AboutEdit sendData={submitAboutHandler} complete={aboutLoading}/>
        <ServicesEdit sendData={submitServicesHandler} complete={servicesLoading} />
        <TestimonialsEdit sendData={submitTestimonialsHandler} complete={testimonialsLoading}/>
        <QuestionsEdit sendData={submitQuestionsHandler} complete={questionsLoading} />
        <StatEdit sendData={submitStatsHandler} complete={statsLoading} />
    <Flex css={{py: '$10', gap: '2rem', px: '0', width: "100%" }}
        justify={'center'}
        wrap={'wrap'}
        direction={'row'}
        align={'center'}>
        {/* <Button onPress={submitHandler}>Save Changes</Button>   */}
        <Link href="mailto:cbuccioljr@gmail.com">Email Question</Link>   
    </Flex>
    {/* <Text h1
        css={{
        width: '100%',
        // color: '$accents8',
        textAlign: 'center',}}>
            Guide
    </Text> */}


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
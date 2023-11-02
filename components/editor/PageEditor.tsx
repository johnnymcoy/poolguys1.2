import { Flex } from "../styles/flex"
import { Button, Card, Checkbox, Dropdown, Input, Switch, Text } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import config from "@/api/config/config.json";
import menuConfig from "@/api/config/menu.json";
import { Box } from "../styles/box";



export default function PageEditor() {
    const { data: session } = useSession()
    const siteInfo = config.site;
    const menuInfo = menuConfig.main;
    const homeInfo = config.home;
    const aboutInfo = config.about;
    const servicesInfo = config.services;

    const statsInfo = config.stats;

    const contactInfo = config.contact;


    const comparisonInfo = config.comparison;
    const testimonialsInfo = config.testimonials;
    const faqInfo = config.FAQ;

    console.log(servicesInfo)
    // console.log(menuInfo)

if(session){
    return (
<Flex
    css={{ py: '1rem', gap: '0.5rem', px: '1rem' }}
    justify={'center'}
    wrap={'wrap'}
    direction={'column'}
    align={'center'}
>
    <h1>Admin Dashboard</h1>
        {/* Web stats  */}
    <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>Contact Info</Text>
        </Card.Header>
        <Input label={"Email"} placeholder={contactInfo.email}/>
        <Input label={"Mobile"} placeholder={contactInfo.mobile}/>
        <Input label={"Title"} placeholder={contactInfo.title}/>
        <Input label={"Action Call"} placeholder={contactInfo.action_call}/>
        <Input label={"Description"} placeholder={contactInfo.description}/>
        <Text>Require Capcha when sending email</Text>
        <Switch size="sm" initialChecked={contactInfo.require_captcha}/>
    </Card>

    <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>Home Page</Text>
        </Card.Header>
        <Input label={"Title Text"} placeholder={homeInfo.title}/>
        <Input label={"Subtitle Text"} placeholder={homeInfo.subtitle}/>
        <Input label={"Description"} placeholder={homeInfo.description}/>
        {homeInfo.points.map((item, index) =>
            <Input key={index} label={"Point "+ (index + 1)} placeholder={item.text}/>
        )}
    </Card>
    <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>About Page</Text>
        </Card.Header>
        <Input label={"About Intro"} placeholder={aboutInfo.intro}/>
    </Card>
    <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>Services Page</Text>
        </Card.Header>
        {servicesInfo.list.map((item, index) =>
        <Box key={index} css={{width: "100%",}}>
            {"Service " + (index + 1)}
            <Input label={"Title"} placeholder={item.title} css={{width: "100%"}}/>
            <Input label={"Description"} placeholder={item.description} css={{width: "100%"}}/>
        </Box>
        )}
    </Card>
    <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>Stats</Text>
        </Card.Header>
        {/* <Button size={"sm"} auto >Disable</Button> */}
        <Input label={"Stats Title"} placeholder={statsInfo.title}/>
        <Input label={"Stats Description"} placeholder={statsInfo.description}/>
        {statsInfo.list.map((item, index) =>
        <Box key={index} css={{width: "100%",}}>
            {"Stat " + (index + 1)}
            <Input key={index} label={"Title"} placeholder={item.title} css={{width: "100%"}}/>
            <Input key={index} label={"Description"} placeholder={item.description} css={{width: "100%"}}/>
        </Box>
        )}
    </Card>
    <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>Testimonials</Text>
        </Card.Header>
        {/* <Button size={"sm"} auto >Disable</Button> */}
        <Input label={"Stats Title"} placeholder={testimonialsInfo.title}/>
        <Input label={"Stats Subtitle"} placeholder={testimonialsInfo.subtitle}/>
        <Input label={"Stats Description"} placeholder={testimonialsInfo.description}/>
        {testimonialsInfo.list.map((item, index) =>
        <Box key={index} css={{width: "100%",}}>
            {"Stat " + (index + 1)}
            <Input key={index} label={"Name"} placeholder={item.name} css={{width: "100%"}}/>
            <Input key={index} label={"Description"} placeholder={item.description} css={{width: "100%"}}/>
            <Input key={index} label={"Location"} placeholder={item.location} css={{width: "100%"}}/>
        </Box>
        )}
    </Card>
    <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>FAQ</Text>
        </Card.Header>
        {/* <Button size={"sm"} auto >Disable</Button> */}
        <Input label={"FAQ Title"} placeholder={faqInfo.title}/>
        <Input label={"FAQ Subtitle"} placeholder={faqInfo.subtitle}/>
        {faqInfo.list.map((item, index) =>
        <Box key={index} css={{width: "100%",}}>
            {"FAQ " + (index + 1)}
            <Input key={index} label={"Question"} placeholder={item.question} css={{width: "100%"}}/>
            <Input key={index} label={"Answer"} placeholder={item.answer} css={{width: "100%"}}/>
        </Box>
        )}
    </Card>
    <Card css={{ p: '10px', mw: '550px', m: "0" }}>
        <Card.Header>
            <Text h3 css={{textAlign: "center", width: "100%"}}>Comparision Images</Text>
        </Card.Header>
        {/* <Button size={"sm"} auto >Disable</Button> */}
        <Input label={"Comparison Title"} placeholder={comparisonInfo.title}/>
        <Input label={"Comparison description"} placeholder={comparisonInfo.description}/>
        {faqInfo.list.map((item, index) =>
        <Box key={index} css={{width: "100%",}}>
            {"FAQ " + (index + 1)}
            <Input key={index} label={"Question"} placeholder={item.question} css={{width: "100%"}}/>
            <Input key={index} label={"Answer"} placeholder={item.answer} css={{width: "100%"}}/>
        </Box>
        )}
    </Card>


    {/* <h3>Edit/Remove Page</h3> 
    {menuInfo.map((item, index) => {
        return(
        <div key={index}>
            <h4>{item.name}</h4>
            <Checkbox label="Enabled" size={"sm"} isSelected={item.enabled} />
        </div>);
    })} */}
    

    <Button>Save Changes</Button>  
    <Link href="mailto:cbuccioljr@gmail.com">Email Question</Link>   

    <h3>Guide</h3>


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
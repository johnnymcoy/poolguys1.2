import type {NextPage} from 'next';
import {Layout} from '../components/navbar/layout';
import ContactForm from "@/components/contact/ContactForm"

const Home: NextPage = () => {
   return (
<Layout>
    <ContactForm />
</Layout>
   );
};

export default Home;

import type {NextPage} from 'next';
import {Layout} from '../components/navbar/layout';
import ContactForm from "@/components/contact/ContactForm"
import { useDispatch} from "react-redux";
import { useEffect } from 'react';
import { fetchConfig } from '../store/config-store';

const Home: NextPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchConfig());
    }, [dispatch]);

   return (
<Layout>
    <ContactForm />
</Layout>
   );
};

export default Home;

import type {NextPage} from 'next';
import {Layout} from '../components/navbar/layout';
import {Features3} from '../components/features3';
import {Faq} from '../components/faq';
import {Trial} from '../components/trial';
import { BeforeAfter } from '@/components/features/BeforeAfter';
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
    <Features3 />
    {/* <BeforeAfter /> */}
    <Faq />
    <Trial />
</Layout>
   );
};

export default Home;

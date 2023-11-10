import type {NextPage} from 'next';
import {Layout} from '../components/navbar/layout';
import {Features1} from '../components/features1';
import {Statistics} from '../components/statistics';
import {Faq} from '../components/faq';
import {Trial} from '../components/trial';
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
    <Features1 />
    <Statistics />
    <Faq />
    <Trial />
</Layout>
);};

export default Home;

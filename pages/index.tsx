import type {NextPage} from 'next';
import {Hero} from '../components/hero';
import {Testimonials} from '../components/tesminonials';
import {Statistics} from '../components/statistics';
import {Faq} from '../components/faq';
import {Trial} from '../components/trial';
import { useDispatch} from "react-redux";
import { useEffect } from 'react';
import { fetchConfig } from '../store/config-store';
import { BeforeAfter } from '@/components/features/BeforeAfter';

const Home: NextPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchConfig());
    }, [dispatch]);


   return (
<div className="content">
    <Hero />
    <BeforeAfter />
    <Testimonials />
    <Statistics />
    <Faq />
    <Trial />
</div>
)};

export default Home;

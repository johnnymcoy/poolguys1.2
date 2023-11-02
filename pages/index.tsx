import type {NextPage} from 'next';
import {Hero} from '../components/hero';
import {Testimonials} from '../components/tesminonials';
import {Statistics} from '../components/statistics';
import {Faq} from '../components/faq';
import {Trial} from '../components/trial';

const Home: NextPage = () => {

   return (
<div className="content">
    <Hero />
    <Testimonials />
    <Statistics />
    <Faq />
    <Trial />
</div>
)};

export default Home;

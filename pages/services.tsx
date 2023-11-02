import type {NextPage} from 'next';
import {Nav} from '../components/navbar/navbar';
import {Layout} from '../components/navbar/layout';
import {Hero} from '../components/hero';
import {Trusted} from '../components/trusted';
import {Box} from '../components/styles/box';
import {Features1} from '../components/features1';
import {Features2} from '../components/features2';
import {Features3} from '../components/features3';
import {Testimonials} from '../components/tesminonials';
import {Statistics} from '../components/statistics';
import {Plans} from '../components/plans';
import {Faq} from '../components/faq';
import {Trial} from '../components/trial';
import {Footer} from '../components/footer';
import Logo from '@/components/navbar/logo';
import ContactForm from "@/components/contact/ContactForm"
import { BeforeAfter } from '@/components/features/BeforeAfter';

const Home: NextPage = () => {
   return (
<Layout>
    <Features3 />
    <BeforeAfter />
    {/* <Plans /> */}
    <Faq />
    <Trial />
</Layout>
   );
};

export default Home;

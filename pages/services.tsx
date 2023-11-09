import type {NextPage} from 'next';
import {Layout} from '../components/navbar/layout';
import {Features3} from '../components/features3';
import {Faq} from '../components/faq';
import {Trial} from '../components/trial';
import { BeforeAfter } from '@/components/features/BeforeAfter';

const Home: NextPage = () => {
   return (
<Layout>
    <Features3 />
    <BeforeAfter />
    <Faq />
    <Trial />
</Layout>
   );
};

export default Home;

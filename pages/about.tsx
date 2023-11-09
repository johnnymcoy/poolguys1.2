import type {NextPage} from 'next';
import {Layout} from '../components/navbar/layout';
import {Features1} from '../components/features1';
import {Statistics} from '../components/statistics';
import {Faq} from '../components/faq';
import {Trial} from '../components/trial';

const Home: NextPage = () => {
   return (
<Layout>
    <Features1 />
    <Statistics />
    <Faq />
    <Trial />
</Layout>
   );
};

export default Home;

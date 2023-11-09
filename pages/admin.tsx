import type {NextPage} from 'next';
import {Layout} from '../components/navbar/layout';
import Login from '@/components/auth/Login';
import PageEditor from '@/components/editor/PageEditor';

const Admin: NextPage = () => {
   return (
<Layout>
    <PageEditor />
    <Login />
</Layout>
   );
};

export default Admin;

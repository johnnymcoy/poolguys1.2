import type {NextPage} from 'next';
import {Layout} from '../components/navbar/layout';
import Login from '@/components/auth/Login';
import PageEditor from '@/components/editor/PageEditor';
import { useDispatch} from "react-redux";
import { useEffect } from 'react';
import { fetchConfig } from '../store/config-store';

const Admin: NextPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchConfig());
    }, [dispatch]);

   return (
<Layout>
    <PageEditor />
    <Login />
</Layout>
   );
};

export default Admin;

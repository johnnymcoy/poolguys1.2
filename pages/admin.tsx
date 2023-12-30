import type {NextPage} from 'next';
import {Layout} from '../components/navbar/layout';
import Login from '@/components/auth/Login';
import PageEditor from '@/components/editor/PageEditor';
import { useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import { fetchConfig } from '../store/config-store';

const Admin: NextPage = () => {
    const dispatch = useDispatch();

    // const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchConfig());
        // setLoaded(true);

    }, [dispatch]);

   return (
<Layout>
    <PageEditor />
    <Login />
</Layout>
   );
};

export default Admin;

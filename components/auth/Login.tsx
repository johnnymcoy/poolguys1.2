import { Flex } from "../styles/flex"
import { Button } from "@nextui-org/react"
import { useSession, signIn, signOut } from "next-auth/react"



export default function Login() {
    const { data: session } = useSession()


if(session){
    return (
<Flex
    css={{ py: '0', gap: '0rem', px: '0' }}
    justify={'center'}
    wrap={'wrap'}
    direction={'column'}
    align={'center'}
>
    {/* Signed in as {session.user.name}  */}
    <Button size={"sm"} onClick={() => signOut()}>Sign out</Button>
</Flex>
    )}

  return (
<Flex
    css={{ py: '0', gap: '0rem', px: '0' }}
    justify={'center'}
    wrap={'wrap'}
    direction={'column'}
    align={'center'}
>
    <Button size={"sm"} onClick={() => signIn()}>Sign in</Button>
</Flex>
)}


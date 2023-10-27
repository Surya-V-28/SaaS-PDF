

import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client';


const Page = async () => {
    const userRouter = useRouter();
    const searchParams= useSearchParams();
    const origin = searchParams.get("orgin");
    const {data, isLoading} = trpc.test.useQuery();


    
}

export default Page
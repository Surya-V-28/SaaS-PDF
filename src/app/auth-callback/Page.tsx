

import { useRouter, useSearchParams } from 'next/navigation'


const Page = () => {
    const userRouter = useRouter();
    const searchParams= useSearchParams();
    const origin = searchParams.get("orgin");
    
}

export default Page
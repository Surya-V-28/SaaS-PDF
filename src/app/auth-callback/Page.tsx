
"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client';
import { router } from '@/trpc/trpc';
import { Loader2 } from 'lucide-react';


const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userRouter = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const searchParams= useSearchParams();
    const origin = searchParams.get("orgin");

    const {data,isLoading} = trpc.authCallback.useQuery(undefined,{
        onSuccess:({success})=>{
            if(success) {
                //user 
                userRouter.push(origin? `/${origin}`: '/dashboard')
            } },
            onError:(err)=>{
                if(err.data?.code=="UNAUTHORIZED"){
                    userRouter.push("/signin");
            }
        },
        retry:true,
        retryDelay:500,
    })


    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='h-8 w-8 animate-spin text-zinc-800'></Loader2>
                <h3 className='font-semibold text-xl'> Setting up your accounts</h3>
                <p>You will be redirected shortly automatically.</p>

            </div>

        </div>
    ) 
}

export default page
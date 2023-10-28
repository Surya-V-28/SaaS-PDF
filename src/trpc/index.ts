

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, router } from './trpc';
import { TRPCClientError } from '@trpc/client';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
 
export const appRouter = router({
     /// Query for checking the user is logged in or not 

     authCallback:publicProcedure.query(async ()=>{
        const {getUser} = getKindeServerSession();
        const  user = getUser();
        if(!user.id || !user.email) throw new TRPCError({code:"UNAUTHORIZED"});

        // check if there user in the database 
        const dbUser = await db.user.findFirst({
         where:{
            id:user.id
         }
        })

        // if the user is not created  in the database 
        if(!dbUser) {
             await db.user.create({
               data:{
               id:user.id,
               email:user.email
               }
             })
        }
        // return the sucess is true if user has database 
        return {success:true}


     })
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
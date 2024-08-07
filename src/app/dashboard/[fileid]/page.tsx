import ChatWrapper from "@/components/chat/ChatWrapper";
import PdfRenders from "@/components/PdfRenders";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface PageParms {
    params : {
        fileid:string
    }
}





const Page =  async ({params}:PageParms) => {
    //retrived the file id 
    const {fileid} = params;

    const {getUser} = getKindeServerSession();

    const user = getUser();

    if(!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`);

      const file =  await  db.file.findFirst({
        where:{
            id:fileid,
            userId:user.id
        }
       })

       if(!file) notFound()





    // display all the datas 

    return (
        <div className='flex-1 justify-between flex  h-[calc(100vh-3.5rem)] flex-col'>
        <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
          {/* Left sidebar & main wrapper */}
          <div className='flex-1 xl:flex '>
            <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
              {/* Main area */}
              <PdfRenders url={file.url} />
            </div>
          </div>
  
          <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
            <ChatWrapper fileId={fileid} isSubscribed={false}  />
          </div>
        </div>
      </div>
    )


      
}


export default Page;
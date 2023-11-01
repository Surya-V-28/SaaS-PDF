"use client"
import { trpc } from "@/app/_trpc/client"
import UploadButton from "./UploadButton"
import { Ghost, Loader2, MessagesSquare, Plus, Trash } from "lucide-react";
import Skeleton from 'react-loading-skeleton'
import Link from "next/link";
import {format} from 'date-fns'
import { Button } from "./ui/button";
import { useState } from "react";

const Dashboard =() => {

  const [CurrentDeleteFiles, setCurrentDeleteFiles] = useState<string |null>(null);

  // use the contect to reload the page 
  const utils = trpc.useContext();

  const {data:files, isLoading } = trpc.getUserFiles.useQuery();

  const {mutate : deleteFiles} = trpc.deleteFiles.useMutation({
    onSuccess:()=>{
      utils.getUserFiles.invalidate();
    },
    onMutate({id}){
      setCurrentDeleteFiles(id);
    },
    onSettled(){
      setCurrentDeleteFiles(null);
    }
  });
   
    return <main className="mx-auto max-w-7xl md:p-10">
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b-4 border-grey-200 Pb-5 sm:flex-row sm:items-center sm:gap-0">
            <h1 className="mb-3 font-bold text-5xl text-grey-500"> My files</h1>
            <UploadButton />
          </div>
    

       {/* Display all the user files */}

       {files && files.length!=0 ? (
        <ul className="mt-8 grid grid-cols-3 gap-6 divide-y divide-zinc-200 md:grid-col-2 lg:grid-col-3">
          {/* className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3' */}
          {files.sort((a,b) =>
           new Date(b.createdAT).getTime() - new Date(a.createdAT).getTime()
           ).map((file) =>(
            
             <li 
                key={file.id}
                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg' >
                <Link
                  href={`/dashboard/${file.id}`}
                  className='flex flex-col gap-2'>
                  <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
                    <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' />
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='truncate text-lg font-medium text-zinc-900'>
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
                  <div className='flex items-center gap-2'>
                    <Plus className='h-4 w-4' />
                    {format( new Date(file.createdAT), "MMM yyyy")}
                    </div>
                      {/* Message Icons  */}
                  <div className="flex items-center gap-2">
                    <MessagesSquare className="h-4 w-4" />
                      mocked
                  </div>
                  {/* Dteleted icons */}
                  <Button size="sm"  className="w-full" variant="destructive" onClick={()=> deleteFiles({id:file.id})}>
                  {CurrentDeleteFiles === file.id ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Trash className='h-4 w-4' />
                    )}
                  </Button>
                  
                  </div>
            </li>
           ))
           }


        </ul>
     
       ):  isLoading ? (
         <Skeleton  height={100} className="my-2" count={3}/>
       ):
      (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost   className="text-zinc-800 h-8 w-8 "/>
          <h3 className=" font-semibold text-xl "> Pretty empty around here</h3>
          <p>let&apos;s upload your first PDF </p>
        </div>
      )
      }
       
    </main>

}


export default Dashboard
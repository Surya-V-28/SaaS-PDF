"use client"
import { ChevronDown, ChevronDownIcon, ChevronUp, Loader2, Search } from 'lucide-react';
import {Document, Page,pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useToast } from './ui/use-toast';
import {useResizeDetector} from 'react-resize-detector';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { DropdownMenuContent } from './ui/dropdown-menu';
interface PdfRenderProps {
    url:string
}
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
const PdfRenders = ({url}:PdfRenderProps)=> {
    const {toast} = useToast()
    const { width , ref} = useResizeDetector()
    const [NumPages , setNumPages] = useState<number |undefined >();
    const [CurrentPage , setCurrentPage] = useState<number>(1);

  
    const CustomPageValidator = z.object({
      page: z
        .string()
        .refine(
          (num) => Number(num) > 0 && Number(num) <= NumPages!
        ),
    })
    type TCustomPageValidator = z.infer<
    typeof CustomPageValidator
  >

  const {register, handleSubmit, formState:{errors}
  , 
  setValue

} = useForm<TCustomPageValidator>({
    defaultValues:{
      page:"1"
    },
    resolver:zodResolver(CustomPageValidator)
  });

  const handlePageSubmit= ({page}:TCustomPageValidator) =>{

    setCurrentPage(Number(page));
    setValue("page",String(page))

  }


    return (
        <div className="w-full bg-white rounded-md shadow flex flex-col items-center ">
         <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2 mt-2">
            <div className="flex items-center gap-1.5"> 
              <Button variant='ghost' aria-label='previous page '
              disabled={CurrentPage<=1}
                 onClick={()=>{
                    setCurrentPage((prev) =>
                      prev - 1 > 1 ? prev - 1 : 1
                    )
                 }}
              >
                <ChevronDown className='h-4 w-4' />

              </Button>

              <div className='flex item-center gap-1.5'>
                <Input {...register("page")} className={cn('w-12 h-8 ',errors.page &&  'focus-visible:ring-red-500')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(handlePageSubmit)()
                  }
                }}
                />
                <p className='text-zinc-700 text-sm space-x-1'>
                    <span>/</span>
                    <span>{NumPages?? "x"}</span>
                </p>
              </div>
              <Button variant='ghost' aria-label='next page '
               disabled={
                NumPages === undefined ||
                CurrentPage === NumPages
              }
               onClick={() => {
                setCurrentPage((prev) =>
                  prev + 1 > NumPages! ? NumPages! : prev + 1
                )
               }}
              
              >
                <ChevronUp className='h-4 w-4' />

              </Button>
            </div>
            <div className='space-x-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='gap-1.5'  aria-label='Zoom' variant='ghost'>
                    <Search className='h-4 w-4' />
                  </Button>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    100%
                  </DropdownMenuItem>
                </DropdownMenuContent>

              </DropdownMenu>
            </div>
            </div> 
            <div className=" flex-1 w-full max-h-screen">
                <div ref={ref}>
                   <Document loading = {
                    <div className='flex  justify-center'>
                        <Loader2 className=' my-24 h-6 w-6 animate-spin'></Loader2>

                    </div>
                   }
                   onLoadError={()=>{
                    toast({
                        title:"Error Loading PDF",
                        description:"Please try again later",
                        variant:"destructive"
                    })
                   }}
                   onLoadSuccess={({numPages})=>{
                    setNumPages(numPages);

                   }}
                    file={url} className="max-h-full">
                      <Page width={width?width:1} pageNumber={CurrentPage}

                      
                      ></Page>
                   </Document>
                </div>
               

            </div>
        </div>
    )

}



export default PdfRenders
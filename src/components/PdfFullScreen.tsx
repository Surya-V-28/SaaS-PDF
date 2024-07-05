import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Expand, Loader2 } from "lucide-react";
import SimpleBar from "simplebar-react";
import {Document, Page,pdfjs} from 'react-pdf';
import { useToast } from './ui/use-toast';
import { useResizeDetector } from "react-resize-detector";

interface PdfFullScreenProps {
    fileUrl:string
}

const PdfFullScreen = ({fileUrl}:PdfFullScreenProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {toast} = useToast();
    const [NumPages , setNumPages] = useState<number |undefined >();
    const [CurrentPage , setCurrentPage] = useState<number>(1);
    const { width , ref} = useResizeDetector()
  
    return (
        <Dialog open={isOpen} onOpenChange={(v)=>{
            if(!v){
                setIsOpen(v);
            }
        }}>

            <DialogTrigger asChild onClick={()=> setIsOpen(true)}> 
                <Button  aria-label="Zoom the Pdf" variant='ghost' >
                    <Expand className="h-4 w-4" />

                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-full">
                <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
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
                    file={fileUrl} className="max-h-full">
                      {new Array(NumPages).fill(0).map((_,i)=>(
                        <Page 
                        key={i}
                        width={width?width:1} pageNumber={i+1}
                      
                        ></Page>
                      )
                      
                      )}
                   </Document>
                </div>

                </SimpleBar>

            </DialogContent>

        </Dialog>

    )

}


export  default PdfFullScreen

"use client"

import { Button } from "./ui/button";
import { Dialog, DialogTrigger,DialogContent } from "./ui/dialog";
import { useState } from "react"

const UploadButton = () => {
    const [isOpen, setisOpen] = useState<boolean>(false);
    return (

        <Dialog open={isOpen} onOpenChange={(v)=>{
            if(!v){
                setisOpen(v);
            }
        }}>
            <DialogTrigger  onClick={()=>
                setisOpen(true)
            } asChild>
                 <Button> Upload PDF </Button>
                
            </DialogTrigger>
            <DialogContent>
                    Welcome tests
                 </DialogContent>

        </Dialog>
        

    )

}


export default UploadButton
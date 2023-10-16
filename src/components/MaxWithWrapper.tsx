import { cn } from "@/lib/utis"
import { ReactNode } from "react"



export const MaxWithWrapper = (
    {
        className,
        children
    }: {
        className?:String,
        children:ReactNode
    }
) => {
  return (
    <div className={cn("mx-auto w-full  max-w-screen-xl  px-2.5  md:px-20",className)}>

    {children}
    </div>
  )
}

import { MaxWithWrapper } from "@/components/MaxWithWrapper"


export default function Home() {
  return (
  <MaxWithWrapper>
    <div className="mt-12 mb-28  sm:mt-40 flex  flex-col items-center justify-center text-center">
     <div className="mx-auto mb-4 flex max-w-fit items-center justify-center  space-x-2 overflow-hidden rounded-full border-grey-200  bg-white
     px-7 py-2 shadow-md backdrop-blur transition-all hover:border-grey-300 hover:bg-white/50 hover:text-red
     ">
      <p className="text-sm font-semibold text-gray-700">
        Quilleans
      </p>
      </div>
      
      <h1 className="max-w-4xl font-bold text-5xl md:text-6xl lg:text-7xl  ">
        Chat With Your <span className="text-blue-600">Documents </span>


      </h1>
      </div>
    
  
  </MaxWithWrapper> 

  
  )
}

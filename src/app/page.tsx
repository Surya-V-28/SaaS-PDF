import { MaxWithWrapper } from "@/components/MaxWithWrapper"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import Image from 'next/image'
export default function Home() {
  return (
    <>
  <MaxWithWrapper   className="mt-12 mb-28  sm:mt-40 flex  flex-col items-center justify-center text-center">
   
     <div className="mx-auto mb-4 flex max-w-fit items-center justify-center  space-x-2 overflow-hidden rounded-full border-grey-200  bg-white
     px-7 py-2 shadow-md backdrop-blur transition-all hover:border-grey-300 hover:bg-white/50 hover:text-red
     ">
      <p className="text-sm font-semibold text-gray-700">
        Quilleans
      </p>
      </div>
      
      <h1 className="max-w-4xl font-bold text-5xl md:text-6xl lg:text-7xl  ">
        Chat With Your <span className="text-blue-600">Documents </span>
        in a seconds.
      </h1>
      <p className="mt-5 max-w-prose  text-zinc-700 sm:text-lg">

        Ouilleans allow to Conversations with any PDF Document. Just by Simply upload the documents 
        and start asking the questions
      </p>
      <Link className={buttonVariants({
        size:'lg',
        className:"mt-5"

      }

      )} href="/dashboard" target="_blank"> Get Started 
      <ArrowRight className="ml-2  h-5 w-5"></ArrowRight>
      </Link>
  </MaxWithWrapper> 
  {/* /* Value Proposections properties * / */}

  <div>
    <div className="relative isolate">
    <div  aria-hidden="true"   className="pointer-events-none absolute -z-10 inset-x-0   -top-40 transform-gpu overflow-hidden blur-3xl 
    sm:-top-80">
      <div 
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
      
      className="
      relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]">

      </div>

      <div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div   className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
            <Image
                src='/file-upload-preview.jpg'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
              />

            </div>

          </div>

        </div>
      </div>
    </div>

    </div>
  </div>
  </>

  
  )
}

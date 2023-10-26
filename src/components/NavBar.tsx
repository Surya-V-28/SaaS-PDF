

import React from 'react'
import { MaxWithWrapper } from './MaxWithWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import {LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/server"
import { ArrowRight } from 'lucide-react'

const NavBar = () => {
  return (
    <nav className='sticky h-14 inset-x-0 z-30 w-full top-0 border-b  border-gray-200 bg-white/75 backdrop-blur-lg transition-all '>
        <MaxWithWrapper>
            <div  className='h-14 flex items-center justify-between border-b border-zinc-100 '>
                <Link href="/" className='font-semibold  z-40 flex  ' >
                 <span>Quill.</span> 
                </Link>
            {/* Todo: Add the repsonive mobile navBar  */}
            <div className='hidden items-center sm:flex space-x-4'>
              <>

              <Link href="/pricing" className={buttonVariants({
                variant:'ghost',
                size:"sm"

              })}>
                Pricing 
              </Link>
              <LoginLink className={buttonVariants({
                variant:'ghost',
                size:"sm"
              })}>
                Sign In 
              </LoginLink>
              <RegisterLink className={buttonVariants({
                size:"sm"
              })}>
                Get Started  <ArrowRight className=' ml-2  h-5 w-5'></ArrowRight>
              </RegisterLink>

              </>

            </div>
            </div>
        </MaxWithWrapper>
    </nav>
  )
}

export default NavBar
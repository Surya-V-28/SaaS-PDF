import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
      container:{
        center:true,
        padding : "2rem",
        screens:{
          "2xl" :"1400px"
        },
      },

     extend : {
      maxWidth :{
        "8xl":"1048px",
              
      }
     }
  },
  plugins: [],
}
export default config

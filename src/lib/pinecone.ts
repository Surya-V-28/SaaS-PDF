
import  { Pinecone }  from '@pinecone-database/pinecone'

// export const getPineconeClient = async () => {
//   const client = new PineconeClient()

//   await client.init({
//     apiKey: process.env.PINECONE_API_KEY!,
//     environment: 'us-east1-gcp',
//   })

//   return client
// }

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
});

// import OpenAI from 'openai'
// export const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })
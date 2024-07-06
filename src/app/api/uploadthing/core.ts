import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'

// import { pinecone } from "@/lib/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { pinecone } from "@/lib/pinecone";

const f = createUploadthing();

 
export const ourFileRouter = {
  
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    
    .middleware(async ({ req }) => {
     const {getUser} = getKindeServerSession();
     const user = getUser();

     if(!user || !user.id) throw new Error("Unauthorized")



      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data:{
          key:file.key,
          name:file.name,
          userId:metadata.userId,
          url:`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadstatus:"PROCESSING"
        }   
      })
    
      try {
        const response = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`);
          const blob = await response.blob();
          const loader = new PDFLoader(blob);
          const pageLevelDocs = await loader.load();
          
          console.log("entering the pinecone");
          const pineconeIndex = pinecone.Index('quill');
          const model = await use.load();
          // const textEmbeddings = await model.embed(pageLevelDocs);
          // const embeddingsArray = textEmbeddings.arraySync();
          
          console.log("setting the vectors");
          // await PineconeStore.fromDocuments(pageLevelDocs, textEmbeddings, {
          //   pineconeIndex,
          //   namespace: createdFile.id,
          // });
          
        console.log("updating the success")
        await db.file.update({
          data: {
            uploadstatus: 'SUCCESS',
          },
          where: {
            id: createdFile.id,
          },
        })
      } catch (err) {
        console.log("error occupeied " , err)
        await db.file.update({
          data: {
            uploadstatus: 'FAILED',
          },
          where: {
            id: createdFile.id,
          },
        })
      }
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
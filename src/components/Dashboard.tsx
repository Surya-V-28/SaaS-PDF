
import UploadButton from "./UploadButton"


const Dashboard =() => {
   
    return <main className="mx-auto max-w-7xl md:p-10">
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b-4 border-grey-200 Pb-5 sm:flex-row sm:items-center sm:gap-0">
            <h1 className="mb-3 font-bold text-5xl text-grey-500"> My files</h1>
            <UploadButton />
          </div>
    

       {/* Display all the user files */}
       
    </main>

}


export default Dashboard
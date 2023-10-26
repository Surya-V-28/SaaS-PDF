import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";


const page = () => {
    const {getUser} = getKindeServerSession();
    const user = getUser();
    if(!user || !user.id) redirect("/auth-callback?orgin=dashboard");

  return (
    <div>{user.email}e</div>
  )
}

export default page
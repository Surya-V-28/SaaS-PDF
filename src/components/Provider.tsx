"use client"

// import { PropsWithChildren, useState } from "react";
// import {QueryClient, QueryClientProvider} from'@tanstack/react-query'
// import { trpc } from "@/app/_trpc/client";
// import { httpBatchLink } from "@trpc/client";

// const Provider = ({children}:PropsWithChildren) => {
//     const [queryClient] = useState(()=>
//         new QueryClient()
//     );

//     const [trpcClient] = useState(()=>
//         trpc.createClient({
//             links:[
//                 httpBatchLink({
//                     url:'http://localhost:3001/api/trpc',
//                 }),
//             ]
//         })
//     )

//     return (
//         <trpc.Provider client={trpcClient} queryClient={queryClient}>
//         <QueryClientProvider client={queryClient}>
//           {children}
//         </QueryClientProvider>
//       </trpc.Provider>
  
//     )


// }


// export default Provider;



// "use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "../app/_trpc/client";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3001/api/trpc",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );


}
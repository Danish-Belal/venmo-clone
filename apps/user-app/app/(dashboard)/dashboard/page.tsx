import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";

export default async function() {
    const session = await getServerSession(authOptions);
    // console.log(session);
    
     return <div>
        DashBoard<br/>
         {session.user.email}
     </div>
 }
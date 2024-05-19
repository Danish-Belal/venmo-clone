
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import DashboardCard from "../../../components/DashboardCard"
import {getBalance, getOnRampTransactions} from "../transfer/page"
import dashboard from "../../../public/Image.png"

export default async function() {
    const session = await getServerSession(authOptions);
    const transactions = await getBalance();
    const allTransactions = getOnRampTransactions();
   
    console.log("All transactions");
    
    console.log(allTransactions);

    
    return (
        <div>
         <div className="text-center text-2xl font-semibold mb-4 text-blue-500">Good Day, <span className="text-blue-500">{session.user.email}</span></div>

        
    <DashboardCard title="Portfolio Value " value={transactions.amount || 0}  transactions= {allTransactions}/>
    <div className="bg-gray-100  ">
        <img src={dashboard.src} alt="Description of the image" />
    </div>
    </div>
    
    );
 }
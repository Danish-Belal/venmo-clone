
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import DashboardCard from "../../../components/DashboardCard"
import {getBalance} from "../transfer/page"

export default async function() {
    const session = await getServerSession(authOptions);
    const transactions = await getBalance();
   
    console.log(transactions.amount);

    
    return (
        <div>
        <div className="text-center text-2xl font-semibold mb-4">Good morning, {session.user.email}</div>
        <div className="bg-gray-100 px-4 py-8">
        <DashboardCard title="Portfolio Value " value={transactions.amount || 0} ₹ />
        {/* <DashboardCard title="User Balance" value={balance || 0} /> */}
    </div>
    </div>
    );
 }
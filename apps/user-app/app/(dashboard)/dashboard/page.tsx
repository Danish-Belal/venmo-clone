import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import DashboardCard from "../../../components/DashboardCard";
import { getBalance, getOnRampTransactions } from "../transfer/page";
import dashboard from "../../../public/dashboardimg.png";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const transactions = await getBalance();
    const allTransactions = await getOnRampTransactions();
   
    console.log("All transactions", allTransactions);
    const userName = session.user.name || "Venmo User";
    return (
        <div>
            <div className="text-center text-2xl font-semibold mb-4 text-blue-500">
                {getGreeting()}, <span className="text-blue-500">{ userName}</span>
            </div>
            <div className="relative bg-gray-100">
                <img src={dashboard.src} alt="Description of the image" className="w-full h-auto" />
                <div className="absolute top-0 right-0 m-4">
                    <DashboardCard 
                        title="Portfolio Value" 
                        value={transactions.amount || 0}  
                        transactions={allTransactions} 
                    />
                </div>
            </div>
        </div>
    );
}

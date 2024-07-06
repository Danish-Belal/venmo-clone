
import { getServerSession } from 'next-auth';
import DashboardCard from '../../../components/DashboardCard';
import dashboard from '../../../public/dashboardimg.png';
import { authOptions } from '../../lib/auth';
import { getBalance } from '../../lib/actions/serverAction';
import Image from 'next/image';

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

async function fetchingBalance(){
    const balance = await getBalance();
    return balance.amount/100;
}
async function getuser(){
    const session = await getServerSession(authOptions);
    const userName = session.user.name || "Venmo User";
    return userName;
}
export default async function() {

    const balance = fetchingBalance();
    console.log(balance);
    
    const userName =  getuser();

    return (
        <div>
            <div className="text-center text-2xl font-semibold mb-4 text-blue-500">
                {getGreeting()}, <span className="text-blue-500">{userName}</span>
            </div>
            <div className="relative bg-gray-100">
                {/* <Image src={dashboard.src} alt="Description of the image" className="w-full h-auto" /> */}
                <Image 
                    src={dashboard.src} 
                    alt="Description of the image" 
                    width={dashboard.width} // replace with actual width
                    height={dashboard.height} // replace with actual height
                    className="w-full h-auto" 
                />
                <div className="absolute top-0 right-0 m-4">
                    <DashboardCard
                        title="Portfolio Value"
                        value={balance}
                        // transactions={allTransactions}
                    />
                </div>
            </div>
        </div>
    );
};



"use client"


const DashboardCard = ({ title, value, transactions }) => {
   

    return (
        <div>
            <div className="max-w-xs mx-auto bg-white overflow-hidden shadow rounded-lg w-full">
                <div className="px-4 py-5 sm:p-6">
                    <div className="text-center">
                        <span className="text-xs font-medium text-gray-500">{title}</span>
                    </div>
                    <div className="mt-2 text-center">
                        <p className="text-2xl font-semibold text-gray-900">{value} ₹</p>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default DashboardCard;
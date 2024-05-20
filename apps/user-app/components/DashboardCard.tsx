"use client";

const DashboardCard = ({ title, value, transactions }) => {
    return (
        <div className="w-80 max-w-xs mx-auto bg-blue-100 overflow-hidden shadow-lg rounded-lg">
            <div className="px-6 py-8 sm:p-10">
                <div className="text-center">
                    <span className="text-m font-medium text-gray-600">{title}</span>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-3xl font-bold text-gray-900">{value} ₹</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;

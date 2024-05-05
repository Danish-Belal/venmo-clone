import React from "react";

const DashboardCard = ({ title, value }) => {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <div className="text-center">
                    <span className="text-sm font-medium text-gray-500">{title}</span>
                </div>
                <div className="mt-2 text-center">
                    <p className="text-3xl font-semibold text-gray-900">{value} ₹</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;

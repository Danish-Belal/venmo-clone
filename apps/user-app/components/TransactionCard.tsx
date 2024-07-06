import React from 'react';

const TransactionCard = ({ transaction }:any) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white w-96 p-8 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
                <p><strong>Date:</strong> {transaction.time}</p>
                <p><strong>Status:</strong> {transaction.status}</p>
                <p><strong>Provider:</strong> {transaction.provider}</p>
                <p><strong>Amount:</strong> {transaction.amount}</p>
            </div>
        </div>
    );
};

export default TransactionCard;

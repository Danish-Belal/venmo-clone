import React from 'react';

const TransactionCard = ({ transaction }:any) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white w-96 p-8 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
                <p><strong>Date:</strong> {transaction.date}</p>
                <p><strong>Status:</strong> {transaction.status}</p>
                <p><strong>Provider:</strong> {transaction.provider}</p>
                <p><strong>Amount:</strong> {transaction.amount}</p>
                // @ts-ignore
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" >Close</button>
            </div>
        </div>
    );
};

export default TransactionCard;

import React, { useState, useEffect, use } from 'react';
import { getOnRampTransactions } from '../transfer/page';
import TransactionCard from '../../../components/TransactionCard';

const TransactionPage = async () => {
    const transactions = await getOnRampTransactions();
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">Transaction History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transactions.map(transaction => (
                    <div key={transaction.token} className="relative">
                        <div  className={`rounded-lg shadow-md p-6 ${getTransactionColor(transaction.status)}`}>
                            <h3 className="text-lg font-semibold mb-2">{transaction.date}</h3>
                            <p className="text-gray-600 mb-4">Status: {transaction.status}</p>
                            <p className="text-gray-600 mb-4">Provider: {transaction.provider}</p>
                            <p className="text-gray-600 mb-4">Amount: {transaction.amount}</p>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

// Function to get appropriate background color based on transaction status
const getTransactionColor = (status) => {
    switch (status) {
        case 'success':
            return 'bg-green-50'; // Greenish background for successful transactions
        case 'failed':
            return 'bg-red-50'; // Reddish background for failed transactions
        case 'pending':
            return 'bg-yellow-50'; // Yellowish background for pending transactions
        default:
            return 'bg-white'; // Default background color
    }
};

export default TransactionPage;

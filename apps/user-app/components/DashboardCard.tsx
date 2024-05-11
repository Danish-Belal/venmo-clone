"use client"
import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DashboardCard = ({ title, value, transactions }) => {
    const [transactionData, setTransactionData] = useState({ labels: [], amounts: [] });
    const chartRef = useRef(null);

    useEffect(() => {
        if (Array.isArray(transactions)) {
            // Prepare data for the graph
            const transactionLabels = transactions.map(transaction => transaction.date);
            const transactionAmounts = transactions.map(transaction => transaction.amount);

            // Update transaction data state
            setTransactionData({ labels: transactionLabels, amounts: transactionAmounts });
        }
    }, [transactions]);

    useEffect(() => {
        if (chartRef.current) {
            // If previous chart exists, destroy it
            chartRef.current.destroy();
        }

        // Render new chart using Chart.js
        const ctx = document.getElementById("transactionChart");
        const newChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: transactionData.labels,
                datasets: [{
                    label: "Transactions",
                    data: transactionData.amounts,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Store the chart instance in the ref
        chartRef.current = newChart;

        // Clean up function to destroy the chart when component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [transactionData]);

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
            {/* <div className="mt-4">
                <canvas id="transactionChart" style={{ width: "100%" }}></canvas>
            </div> */}
        </div>
    );
};

export default DashboardCard;
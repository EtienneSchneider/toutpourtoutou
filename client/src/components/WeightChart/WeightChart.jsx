import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const WeightChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (data) {
            const weight = data.health.weight;
            const weights = weight.map((entry) => parseFloat(entry.weight));
            const dates = data.health.weight.map((entry) => entry.date);
            const ctx = chartRef.current.getContext("2d");

            if (chartInstanceRef.current) {
                // Détruire le graphique existant
                chartInstanceRef.current.destroy();
            }

            // Créer un nouveau graphique
            const newChartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: "Poids (kg)",
                            data: weights,
                            borderColor: "#fe5f55",
                            backgroundColor: "#fe5f55",
                            borderWidth: 3,
                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                },
            });

            // Enregistrer la référence du nouveau graphique
            chartInstanceRef.current = newChartInstance;
        }
    }, [data]);

    return (
        <div>
            <h2>Graphique de poids</h2>
            <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
    );
};

export default WeightChart;

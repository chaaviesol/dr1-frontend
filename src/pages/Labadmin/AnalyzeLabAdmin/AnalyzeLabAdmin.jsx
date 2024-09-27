import React from 'react';
import "./AnalyzeLabAdmin.css";
import { NavBarAnalyze } from '../ComponentLab/NavbarAnalyze/NavBarAnalyze';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Registering the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const AnalyzeLabAdmin = () => {
    const Data = [
        { month: "jan", view: 2, contact: 3 },
        { month: "Feb", view: 1, contact: 14 },
        { month: "Mar", view: 13, contact: 15 },
        { month: "Apr", view: 13, contact: 2 },
        { month: "may", view: 15, contact: 17 },
        { month: "Jun", view: 3, contact: 2 },
        { month: "Jul", view: 10, contact: 10 },
        { month: "Aug", view: 2, contact: 3 }
    ];

    const AvailableData = {
        labels: Data.map(entry => {
            const words = entry.month.split(' ');
            return words[words.length - 1];
        }),
        datasets: [
            {
                label: "View",
                data: Data.map(entry => entry.view),
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "#A2CD3B"
            },
            {
                label: "Contacted",
                data: Data.map(entry => entry.contact),
                fill: false,
                borderColor: "#EB008B"

            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                align: 'end',
                labels: {
                    usePointStyle: true,  // This will use points instead of boxes
                    pointStyle: 'circle'  // This sets the point style to circle, making it rounded
                }
            }
        },
        scales: {
            x: {
                type: 'category',
            },
            y: {
                type: 'linear',
            }
        },
        chart: {
            type: 'line',
            height: 100,
            background: '#F6F8FA',
            toolbar: {
                show: false,
                autoSelected: 'pan'
            }
        }
    };

    return (
        <>
            <div className='AnalyzeLabAdminAlign'>
                <NavBarAnalyze />
                <div className='AnalyzeLabAdmin'>
                    <h1 className='AnalyzeLabAdminHeadding'>Analyze Your <span>Lab</span></h1>
                    <div className='AnalyzeLabAdminChart'>
                        <Line
                            options={options}
                            data={AvailableData}
                        />
                    </div>
                    <table className='AnalyzeLabAdminTable'>
                        <tr className='AnalyzeLabAdminTableTr'>
                            <th>
                                No
                            </th>
                            <th>
                                Customer name
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                PIN code
                            </th>
                            <th>
                                Mobile number
                            </th>
                        </tr>
                        <tr className='AnalyzeLabAdminTableTr'>
                            <td>
                                temp
                            </td>
                            <td>
                                temp
                            </td>
                            <td>
                                temp
                            </td>
                            <td>
                                temp
                            </td>
                            <td>
                                temp
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        </>
    )
}

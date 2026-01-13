import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler
);

export function Charts({ data }) {
    const moduleNames = data.modules.map(m => m.name);
    const completeness = data.modules.map(m => {
        if (m.maturity === 'High') return 90;
        if (m.maturity === 'Medium') return 60;
        return 35;
    });

    const barData = {
        labels: moduleNames,
        datasets: [
            {
                label: 'Feature Completeness (%)',
                data: completeness,
                backgroundColor: 'rgba(20, 20, 20, 0.8)',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: false },
        },
        scales: {
            y: { beginAtZero: true, max: 100 }
        }
    };

    const radarData = {
        labels: ['Coverage', 'Integration', 'Automation', 'Auditability', 'Reporting'],
        datasets: [
            {
                label: 'System Average',
                data: [70, 60, 50, 80, 60],
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: 'rgba(0, 0, 0, 0.8)',
                borderWidth: 1,
            },
            {
                label: 'Target',
                data: [100, 100, 100, 100, 100],
                backgroundColor: 'rgba(200, 200, 200, 0.1)',
                borderColor: '#ccc',
                borderWidth: 1,
                borderDash: [5, 5]
            }
        ],
    };

    const radarOptions = {
        maintainAspectRatio: false,
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-4 rounded-lg border shadow-sm h-[300px]">
                <h3 className="font-semibold mb-2">Feature Completeness</h3>
                <div className="h-[250px]">
                    <Bar options={barOptions} data={barData} />
                </div>
            </div>
            <div className="bg-card p-4 rounded-lg border shadow-sm h-[300px]">
                <h3 className="font-semibold mb-2 text-center">Maturity Radar</h3>
                <div className="h-[250px]">
                    <Radar data={radarData} options={radarOptions} />
                </div>
            </div>
        </div>
    );
}

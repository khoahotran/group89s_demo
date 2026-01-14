import { useState, useRef, useCallback } from 'react';
import { ModuleCard } from './ModuleCard';
import { FlowMap } from './FlowMap';
import { FlowPlayer } from './FlowPlayer';
import { FlowChart } from './FlowChart';
import { Download, FileText, Printer } from 'lucide-react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

export default function Dashboard({ data }) {
    const [activeFlowState, setActiveFlowState] = useState({
        modules: [],
        label: '',
        snippet: null,
        selectedFlow: null,
        currentStepIndex: -1
    });
    const mapRef = useRef(null);

    const handleExportPng = useCallback(() => {
        if (mapRef.current === null) {
            return;
        }
        // We target the inner flow container to avoid capturing headers if possible, 
        // but capturing the whole container is safer for context.
        toPng(mapRef.current, { cacheBust: true, backgroundColor: '#ffffff' })
            .then((dataUrl) => {
                saveAs(dataUrl, 'feature-map-diagram.png');
            })
            .catch((err) => {
                console.error("Export failed", err);
            });
    }, []);

    const handleExportFeatures = () => {
        let csv = "Module,Maturity,Feature,Description\n";
        data.modules.forEach(m => {
            m.features.forEach(f => {
                csv += `"${m.name}", "${m.maturity}", "${f}", "${m.description}"\n`;
            });
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "erp-features.csv");
    }

    return (
        <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-12">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">ERP Feature Map</h1>
                    <p className="text-muted-foreground mt-1">Interactive Feature Map & Navigation Flow Dashboard</p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-0 bg-card border rounded-md shadow-sm md:divide-x">
                    <button onClick={handleExportPng} className="flex items-center gap-2 px-4 py-2 hover:bg-muted text-sm font-medium transition-colors">
                        <Download className="h-4 w-4" /> Export Diagram
                    </button>
                    <button onClick={handleExportFeatures} className="flex items-center gap-2 px-4 py-2 hover:bg-muted text-sm font-medium transition-colors">
                        <FileText className="h-4 w-4" /> Export Features
                    </button>
                    <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 hover:bg-muted text-sm font-medium transition-colors">
                        <Printer className="h-4 w-4" /> Print View
                    </button>
                </div>
            </header>

            {/* Module Grid (Sitemap) */}
            <section className="space-y-6 break-inside-avoid">
                <h2 className="text-2xl font-semibold border-l-4 border-primary pl-4">Module Sitemap</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {data.modules.map(m => (
                        <ModuleCard
                            key={m.id}
                            module={m}
                            isHighlighted={activeFlowState.modules.includes(m.id)}
                        />
                    ))}
                </div>
            </section>


            {/* Interactive Flow Section */}
            <section className="space-y-8 break-before-all print:break-before-page">
                <h2 className="text-3xl font-bold border-l-4 border-[#005461] pl-5">Workflow Simulation</h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* System Map - 3/4 width */}
                    <div className="lg:col-span-3 border-2 border-[#00B7B5] rounded-xl bg-card shadow-lg p-8 flex flex-col" ref={mapRef}>
                        <div className="mb-6 flex justify-between items-center">
                            <h3 className="font-bold text-2xl text-[#005461]">System Map</h3>
                            {activeFlowState.label && (
                                <span className="px-4 py-2 bg-[#005461] text-white rounded-full text-sm font-mono animate-pulse">
                                    Active Step: {activeFlowState.label}
                                </span>
                            )}
                        </div>

                        {/* FlowMap and FlowChart in one row */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* FlowMap - Left side (2/3) */}
                            <div className="flex-[2] bg-gray-50/50 rounded-lg border-2 border-[#00B7B5] overflow-hidden relative min-h-[500px]">
                                <FlowMap
                                    activeStepModules={activeFlowState.modules}
                                    highlightedModules={activeFlowState.modules}
                                />
                            </div>

                            {/* Flow Chart - Right side (1/3) */}
                            {activeFlowState.selectedFlow && (
                                <div className="flex-1">
                                    <FlowChart
                                        flow={activeFlowState.selectedFlow}
                                        currentStepIndex={activeFlowState.currentStepIndex}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Flow Player - 1/3 width */}
                    <div className="lg:col-span-1 w-full">
                        <FlowPlayer flows={data.flows} onStateChange={setActiveFlowState} />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t pt-8 pb-8 text-center text-sm text-muted-foreground">
                <p>ERP Feature Map Visualizer — Generated for Stakeholder Review</p>
            </footer>
        </div>
    );
}

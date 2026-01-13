import { useState, useRef, useCallback } from 'react';
import { ModuleCard } from './ModuleCard';
import { FlowMap } from './FlowMap';
import { FlowPlayer } from './FlowPlayer';
import { Charts } from './Charts';
import { Download, FileText, Printer } from 'lucide-react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

export default function Dashboard({ data }) {
    const [activeFlowState, setActiveFlowState] = useState({ modules: [], label: '', snippet: null });
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
                csv += `"${m.name}","${m.maturity}","${f}","${m.description}"\n`;
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
            <section className="space-y-6 break-before-all print:break-before-page">
                <h2 className="text-2xl font-semibold border-l-4 border-primary pl-4">Navigation & Demo Flows</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Diagram */}
                    <div className="lg:col-span-2 border rounded-xl bg-card shadow-sm p-6 flex flex-col min-h-[500px]" ref={mapRef}>
                        <div className="mb-4 flex justify-between items-center">
                            <h3 className="font-semibold text-lg">System Map</h3>
                            {activeFlowState.label && (
                                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-mono animate-pulse">
                                    Active Step: {activeFlowState.label}
                                </span>
                            )}
                        </div>
                        <div className="flex-1 bg-gray-50/50 rounded-lg border overflow-hidden relative min-h-[400px]">
                            <FlowMap
                                activeStepModules={activeFlowState.modules}
                                highlightedModules={activeFlowState.modules}
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="h-full min-h-[500px]">
                        <FlowPlayer flows={data.flows} onStateChange={setActiveFlowState} />
                    </div>
                </div>
            </section>

            {/* Analytics */}
            <section className="space-y-6 pb-12 break-inside-avoid">
                <h2 className="text-2xl font-semibold border-l-4 border-primary pl-4">System Analytics</h2>
                <Charts data={data} />
            </section>

            {/* Footer */}
            <footer className="border-t pt-8 pb-8 text-center text-sm text-muted-foreground">
                <p>ERP Feature Map Visualizer — Generated for Stakeholder Review</p>
            </footer>
        </div>
    );
}

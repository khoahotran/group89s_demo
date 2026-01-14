import { useState, useEffect } from 'react';
import { Play, SkipForward, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

export function FlowPlayer({ flows, onStateChange }) {
    const [selectedFlowId, setSelectedFlowId] = useState(flows[0].id);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    const selectedFlow = flows.find(f => f.id === selectedFlowId);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentStepIndex(prev => {
                    if (prev >= selectedFlow.steps.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, selectedFlow]);

    useEffect(() => {
        if (currentStepIndex >= 0 && selectedFlow) {
            const step = selectedFlow.steps[currentStepIndex];
            onStateChange({
                modules: step.modules,
                label: step.label,
                snippet: getSampleData(step.step),
                selectedFlow: selectedFlow,
                currentStepIndex: currentStepIndex
            });
        } else {
            onStateChange({
                modules: [],
                label: '',
                snippet: null,
                selectedFlow: selectedFlow,
                currentStepIndex: -1
            });
        }
    }, [currentStepIndex, selectedFlow]); // Removed onStateChange from dependency to avoid loop if parent function isn't stable

    const handleFlowSelect = (id) => {
        setSelectedFlowId(id);
        setCurrentStepIndex(-1);
        setIsPlaying(false);
    };

    return (
        <div className="flex flex-col bg-card border-2 border-[#00B7B5] rounded-xl overflow-hidden shadow-lg">
            <div className="p-6 border-b-2 border-[#00B7B5] bg-[#F4F4F4]">
                <h3 className="font-bold mb-3 text-xl text-[#005461]">Workflow Simulation</h3>
                <select
                    className="w-full p-3 border-2 border-[#00B7B5] rounded-lg bg-background text-base font-medium"
                    value={selectedFlowId}
                    onChange={(e) => handleFlowSelect(e.target.value)}
                >
                    {flows.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
                {selectedFlow.steps.map((step, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "p-3 rounded border transition-all duration-300 text-sm",
                            idx === currentStepIndex ? "bg-primary text-primary-foreground border-primary shadow-md transform scale-102" : "bg-background border-border",
                            idx < currentStepIndex ? "opacity-40" : ""
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs border font-mono",
                                idx === currentStepIndex ? "bg-background text-foreground border-transparent" : "bg-muted"
                            )}>
                                {idx + 1}
                            </div>
                            <span className="font-medium">{step.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t bg-muted/20 flex justify-between items-center gap-2">
                <button onClick={() => setCurrentStepIndex(-1)} className="p-2 hover:bg-muted rounded border bg-background" title="Reset">
                    <RotateCcw className="h-4 w-4" />
                </button>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity"
                >
                    {isPlaying ? "Pause" : <><Play className="h-4 w-4" /> Play Flow</>}
                </button>
                <button
                    onClick={() => setCurrentStepIndex(prev => Math.min(prev + 1, selectedFlow.steps.length - 1))}
                    className="p-2 hover:bg-muted rounded border bg-background"
                    title="Next Step"
                    disabled={currentStepIndex >= selectedFlow.steps.length - 1}
                >
                    <SkipForward className="h-4 w-4" />
                </button>
            </div>

            {currentStepIndex >= 0 && (
                <div className="p-4 border-t bg-muted/50 font-mono text-xs text-muted-foreground">
                    <div className="font-bold mb-1 text-foreground">LIVE DATA:</div>
                    <pre className="whitespace-pre-wrap">{JSON.stringify(getSampleData(selectedFlow.steps[currentStepIndex].step), null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

function getSampleData(stepKey) {
    const id = Math.floor(1000 + Math.random() * 9000);
    if (stepKey.includes('quotation')) return { id: `QT-${id}`, customer: "Acme Corp", total: "$5,000" };
    if (stepKey.includes('order')) return { id: `SO-${id}`, status: "Confirmed", items: 5 };
    if (stepKey.includes('delivery')) return { id: `DO-${id}`, tracking: "DHL-12345" };
    if (stepKey.includes('invoice')) return { id: `INV-${id}`, due: "2026-02-01", amount: "$5,000" };
    if (stepKey.includes('payment')) return { id: `PAY-${id}`, method: "Wire Transfer", status: "Cleared" };
    if (stepKey.includes('job')) return { title: "Senior Engineer", dept: "Tech", budget: "Approved" };
    if (stepKey.includes('candidate')) return { name: "Alex Tech", email: "alex@example.com", score: "9/10" };
    if (stepKey.includes('pr')) return { id: `PR-${id}`, item: "Server Rack", cost: "$12,000" };
    return { status: "OK", timestamp: new Date().toISOString().split('T')[1] };
}

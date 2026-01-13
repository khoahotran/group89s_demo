import { useEffect } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export function FlowChart({ flow, currentStepIndex = -1 }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (!flow) return;

        // Create nodes from flow steps
        const newNodes = flow.steps.map((step, idx) => ({
            id: `step-${idx}`,
            position: { x: idx * 220, y: 100 },
            data: {
                label: (
                    <div className="text-center px-2">
                        <div className="font-bold text-sm mb-1">{idx + 1}</div>
                        <div className="text-xs leading-tight font-medium">{step.label}</div>
                    </div>
                )
            },
            type: 'default',
            style: {
                background: idx === currentStepIndex ? 'hsl(188 100% 19%)' : idx < currentStepIndex ? 'hsl(169 53% 49%)' : '#fff',
                color: idx <= currentStepIndex ? '#fff' : '#000',
                border: idx === currentStepIndex ? '3px solid hsl(175 63% 38%)' : '2px solid hsl(188 20% 90%)',
                borderRadius: '8px',
                padding: '16px',
                width: 180,
                fontSize: '13px',
                fontWeight: idx === currentStepIndex ? 'bold' : 'normal',
                boxShadow: idx === currentStepIndex ? '0 4px 12px rgba(0, 84, 97, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
            },
        }));

        // Create edges between consecutive steps
        const newEdges = flow.steps.slice(0, -1).map((_, idx) => ({
            id: `edge-${idx}`,
            source: `step-${idx}`,
            target: `step-${idx + 1}`,
            animated: idx < currentStepIndex,
            style: {
                stroke: idx < currentStepIndex ? 'hsl(175 63% 38%)' : 'hsl(188 20% 80%)',
                strokeWidth: idx < currentStepIndex ? 3 : 2,
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: idx < currentStepIndex ? 'hsl(175 63% 38%)' : 'hsl(188 20% 80%)',
            },
        }));

        setNodes(newNodes);
        setEdges(newEdges);
    }, [flow, currentStepIndex, setNodes, setEdges]);

    if (!flow) return null;

    return (
        <div className="h-[400px] w-full border rounded-lg bg-gradient-to-br from-gray-50 to-white overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                minZoom={0.5}
                maxZoom={1.5}
                attributionPosition="bottom-right"
            >
                <Background color="#e5e7eb" gap={16} size={1} />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}

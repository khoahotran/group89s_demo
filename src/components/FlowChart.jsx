import { useEffect } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, MarkerType, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export function FlowChart({ flow, currentStepIndex = -1 }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (!flow) return;

        // Create nodes from flow steps - VERTICAL layout
        const newNodes = flow.steps.map((step, idx) => ({
            id: `step-${idx}`,
            position: { x: 200, y: idx * 140 }, // Vertical: same x, increasing y
            sourcePosition: Position.Bottom,   // 👇 arrows go down
            targetPosition: Position.Top,       // 👆 arrows come from top
            data: {
                label: (
                    <div className="text-center px-3">
                        <div className="font-bold text-lg mb-2">{idx + 1}</div>
                        <div className="text-sm leading-tight font-medium">{step.label}</div>
                    </div>
                )
            },
            type: 'default',
            style: {
                background: idx === currentStepIndex ? '#005461' : idx < currentStepIndex ? '#018790' : '#fff',
                color: idx <= currentStepIndex ? '#fff' : '#000',
                border: idx === currentStepIndex ? '3px solid #00B7B5' : '2px solid #00B7B5',
                borderRadius: '10px',
                padding: '20px',
                width: 200,
                fontSize: '14px',
                fontWeight: idx === currentStepIndex ? 'bold' : 'normal',
                boxShadow: idx === currentStepIndex ? '0 6px 16px rgba(0, 84, 97, 0.4)' : '0 3px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
            },
        }));

        // Create edges between consecutive steps
        const newEdges = flow.steps.slice(0, -1).map((_, idx) => ({
            id: `edge-${idx}`,
            source: `step-${idx}`,
            target: `step-${idx + 1}`,
            type: "smoothstep",
            animated: idx < currentStepIndex,
            style: {
                stroke: idx < currentStepIndex ? '#00B7B5' : '#ddd',
                strokeWidth: idx < currentStepIndex ? 4 : 2,
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: idx < currentStepIndex ? '#00B7B5' : '#ddd',
            },
        }));

        setNodes(newNodes);
        setEdges(newEdges);
    }, [flow, currentStepIndex, setNodes, setEdges]);

    if (!flow) return null;

    return (
        <div className="h-[600px] w-full border-2 border-[#00B7B5] rounded-xl bg-gradient-to-br from-gray-50 to-white overflow-hidden shadow-lg">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                minZoom={0.4}
                maxZoom={1.2}
                attributionPosition="bottom-right"
            >
                <Background color="#e5e7eb" gap={20} size={1} />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}

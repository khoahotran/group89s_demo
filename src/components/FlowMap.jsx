import { useEffect } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    { id: 'core', position: { x: 300, y: 0 }, data: { label: 'Core System' }, type: 'default' },
    { id: 'admin', position: { x: 100, y: 0 }, data: { label: 'System & Admin' }, type: 'default' },
    { id: 'templates', position: { x: 500, y: 0 }, data: { label: 'Templates' }, type: 'default' },

    { id: 'sales', position: { x: 100, y: 150 }, data: { label: 'Sales' }, type: 'default' },
    { id: 'email', position: { x: -100, y: 150 }, data: { label: 'Email Marketing' }, type: 'default' },

    { id: 'purchase', position: { x: 100, y: 300 }, data: { label: 'Purchase' }, type: 'default' },
    { id: 'warehouse', position: { x: 300, y: 225 }, data: { label: 'Warehouse' }, type: 'default' },

    { id: 'hr', position: { x: 100, y: 450 }, data: { label: 'HR & Recruitment' }, type: 'default' },
    { id: 'payroll', position: { x: 300, y: 450 }, data: { label: 'Payroll' }, type: 'default' },

    { id: 'accounting', position: { x: 500, y: 300 }, data: { label: 'Accounting' }, type: 'default' },

    { id: 'expense', position: { x: 300, y: 550 }, data: { label: 'Expense' }, type: 'default' },
];

const initialEdges = [
    { id: 'e-core-sales', source: 'core', target: 'sales' },
    { id: 'e-core-purchase', source: 'core', target: 'purchase' },
    { id: 'e-core-hr', source: 'core', target: 'hr' },
    { id: 'e-core-admin', source: 'core', target: 'admin' },

    { id: 'e-sales-accounting', source: 'sales', target: 'accounting', label: 'Invoice' },
    { id: 'e-sales-warehouse', source: 'sales', target: 'warehouse', label: 'DO' },

    { id: 'e-purchase-warehouse', source: 'purchase', target: 'warehouse', label: 'GRN' },
    { id: 'e-purchase-accounting', source: 'purchase', target: 'accounting', label: 'Bill' },

    { id: 'e-warehouse-accounting', source: 'warehouse', target: 'accounting', label: 'Valuation' },

    { id: 'e-hr-payroll', source: 'hr', target: 'payroll', label: 'Data' },
    { id: 'e-payroll-accounting', source: 'payroll', target: 'accounting', label: 'Journal' },

    { id: 'e-expense-accounting', source: 'expense', target: 'accounting', label: 'Pay' },
];

export function FlowMap({ highlightedModules = [], activeStepModules = [] }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                const isHighlighted = highlightedModules.includes(node.id);
                const isActive = activeStepModules.includes(node.id);

                return {
                    ...node,
                    style: {
                        background: isActive ? '#000' : '#fff',
                        color: isActive ? '#fff' : '#000',
                        border: isActive ? '2px solid #000' : isHighlighted ? '2px dashed #999' : '1px solid #ddd',
                        width: 150,
                        fontWeight: isActive ? 'bold' : 'normal',
                        boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                        transition: 'all 0.3s ease',
                    },
                };
            })
        );

        // Simple logic: if both source and target are active/highlighted, highlight edge
        setEdges((eds) =>
            eds.map((edge) => {
                const sourceActive = activeStepModules.includes(edge.source);
                const targetActive = activeStepModules.includes(edge.target);
                // Highlight edge if both ends are in the current step OR if we are just tracing paths (optional)
                // For now, highlight if both are involved in the current active set
                const isEdgeActive = sourceActive && targetActive;

                return {
                    ...edge,
                    animated: isEdgeActive,
                    style: {
                        stroke: isEdgeActive ? '#000' : '#e5e7eb',
                        strokeWidth: isEdgeActive ? 2 : 1,
                    },
                    labelStyle: { fill: isEdgeActive ? '#000' : '#e5e7eb' },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        color: isEdgeActive ? '#000' : '#e5e7eb',
                    }
                };
            })
        );
    }, [highlightedModules, activeStepModules, setNodes, setEdges]);

    return (
        <div className="h-[600px] w-full border rounded-lg bg-gray-50/50">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background color="#eee" gap={20} />
                <Controls />
            </ReactFlow>
        </div>
    );
}

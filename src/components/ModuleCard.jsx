import { useState } from 'react';
import { cn } from '../lib/utils';
import { ChevronDown, ChevronUp, Package, ShoppingCart, ShoppingBag, Warehouse, Users, DollarSign, Calculator, Receipt, Mail, FileText, Settings } from 'lucide-react';

// Module configuration: icon and simplified color theme
// Palette: #005461 (dark teal), #018790 (medium teal), #00B7B5 (light teal), #F4F4F4 (light gray)
const moduleConfig = {
    core: { icon: Package, color: 'from-[#005461] to-[#018790]', iconColor: 'text-[#005461]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    'user-access': { icon: Users, color: 'from-[#018790] to-[#00B7B5]', iconColor: 'text-[#018790]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    partner: { icon: Users, color: 'from-[#005461] to-[#018790]', iconColor: 'text-[#005461]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    product: { icon: Package, color: 'from-[#018790] to-[#00B7B5]', iconColor: 'text-[#018790]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    document: { icon: FileText, color: 'from-[#005461] to-[#018790]', iconColor: 'text-[#005461]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    approval: { icon: Settings, color: 'from-[#018790] to-[#00B7B5]', iconColor: 'text-[#018790]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    sales: { icon: ShoppingCart, color: 'from-[#005461] to-[#018790]', iconColor: 'text-[#005461]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    purchase: { icon: ShoppingBag, color: 'from-[#018790] to-[#00B7B5]', iconColor: 'text-[#018790]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    warehouse: { icon: Warehouse, color: 'from-[#005461] to-[#018790]', iconColor: 'text-[#005461]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    hr: { icon: Users, color: 'from-[#018790] to-[#00B7B5]', iconColor: 'text-[#018790]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    payroll: { icon: DollarSign, color: 'from-[#005461] to-[#018790]', iconColor: 'text-[#005461]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    accounting: { icon: Calculator, color: 'from-[#018790] to-[#00B7B5]', iconColor: 'text-[#018790]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    expense: { icon: Receipt, color: 'from-[#005461] to-[#018790]', iconColor: 'text-[#005461]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    email: { icon: Mail, color: 'from-[#018790] to-[#00B7B5]', iconColor: 'text-[#018790]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    templates: { icon: FileText, color: 'from-[#005461] to-[#018790]', iconColor: 'text-[#005461]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    admin: { icon: Settings, color: 'from-[#018790] to-[#00B7B5]', iconColor: 'text-[#018790]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    integration: { icon: Settings, color: 'from-[#005461] to-[#018790]', iconColor: 'text-[#005461]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
    reporting: { icon: FileText, color: 'from-[#018790] to-[#00B7B5]', iconColor: 'text-[#018790]', borderColor: 'border-[#00B7B5]', bgColor: 'bg-[#F4F4F4]' },
};

export function ModuleCard({ module, isHighlighted }) {
    const [expanded, setExpanded] = useState(false);

    const config = moduleConfig[module.id] || moduleConfig.core;
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "flex flex-col rounded-lg border bg-card p-5 shadow-sm transition-all duration-300 overflow-hidden relative",
                isHighlighted ? `ring-2 ring-primary shadow-md scale-105 ${config.borderColor}` : `${config.borderColor} hover:shadow-lg`,
                "h-fit"
            )}
        >
            {/* Gradient header accent */}
            <div className={cn("absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r", config.color)} />

            <div className="flex items-start justify-between mt-1">
                <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-md", config.bgColor)}>
                        <Icon className={cn("h-6 w-6", config.iconColor)} />
                    </div>
                    <h3 className="font-semibold text-base">{module.name}</h3>
                </div>
                <span className={cn(
                    "text-xs px-2.5 py-1 rounded-full border font-mono uppercase",
                    module.maturity === 'High' ? "bg-primary text-primary-foreground border-primary" :
                        module.maturity === 'Medium' ? "bg-muted text-foreground border-border" : "bg-transparent text-muted-foreground border-dashed"
                )}>
                    {module.maturity}
                </span>
            </div>

            <p className="mt-3 text-sm text-muted-foreground line-clamp-2 min-h-[2.5em]">
                {module.description}
            </p>

            <button
                onClick={() => setExpanded(!expanded)}
                className={cn("mt-4 flex items-center gap-1 text-sm font-medium hover:underline transition-colors", config.iconColor)}
            >
                {expanded ? "Hide" : "Show"} Features
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {expanded && (
                <ul className={cn("mt-3 space-y-1.5 pl-1 border-l-2 ml-1", config.borderColor)}>
                    {module.features.map((f) => (
                        <li key={f} className="text-xs text-muted-foreground pl-3 block">
                            • {f}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

import { useState } from 'react';
import { cn } from '../lib/utils';
import { ChevronDown, ChevronUp, Package, ShoppingCart, ShoppingBag, Warehouse, Users, DollarSign, Calculator, Receipt, Mail, FileText, Settings } from 'lucide-react';

// Module configuration: icon and color theme
const moduleConfig = {
    core: { icon: Package, color: 'from-slate-500 to-slate-600', iconColor: 'text-slate-600', borderColor: 'border-slate-300', bgColor: 'bg-slate-50' },
    'user-access': { icon: Users, color: 'from-violet-500 to-violet-600', iconColor: 'text-violet-600', borderColor: 'border-violet-300', bgColor: 'bg-violet-50' },
    partner: { icon: Users, color: 'from-cyan-500 to-cyan-600', iconColor: 'text-cyan-600', borderColor: 'border-cyan-300', bgColor: 'bg-cyan-50' },
    product: { icon: Package, color: 'from-lime-500 to-lime-600', iconColor: 'text-lime-600', borderColor: 'border-lime-300', bgColor: 'bg-lime-50' },
    document: { icon: FileText, color: 'from-sky-500 to-sky-600', iconColor: 'text-sky-600', borderColor: 'border-sky-300', bgColor: 'bg-sky-50' },
    approval: { icon: Settings, color: 'from-rose-500 to-rose-600', iconColor: 'text-rose-600', borderColor: 'border-rose-300', bgColor: 'bg-rose-50' },
    sales: { icon: ShoppingCart, color: 'from-emerald-500 to-emerald-600', iconColor: 'text-emerald-600', borderColor: 'border-emerald-300', bgColor: 'bg-emerald-50' },
    purchase: { icon: ShoppingBag, color: 'from-blue-500 to-blue-600', iconColor: 'text-blue-600', borderColor: 'border-blue-300', bgColor: 'bg-blue-50' },
    warehouse: { icon: Warehouse, color: 'from-amber-500 to-amber-600', iconColor: 'text-amber-600', borderColor: 'border-amber-300', bgColor: 'bg-amber-50' },
    hr: { icon: Users, color: 'from-purple-500 to-purple-600', iconColor: 'text-purple-600', borderColor: 'border-purple-300', bgColor: 'bg-purple-50' },
    payroll: { icon: DollarSign, color: 'from-green-500 to-green-600', iconColor: 'text-green-600', borderColor: 'border-green-300', bgColor: 'bg-green-50' },
    accounting: { icon: Calculator, color: 'from-teal-500 to-teal-600', iconColor: 'text-teal-600', borderColor: 'border-teal-300', bgColor: 'bg-teal-50' },
    expense: { icon: Receipt, color: 'from-orange-500 to-orange-600', iconColor: 'text-orange-600', borderColor: 'border-orange-300', bgColor: 'bg-orange-50' },
    email: { icon: Mail, color: 'from-pink-500 to-pink-600', iconColor: 'text-pink-600', borderColor: 'border-pink-300', bgColor: 'bg-pink-50' },
    templates: { icon: FileText, color: 'from-indigo-500 to-indigo-600', iconColor: 'text-indigo-600', borderColor: 'border-indigo-300', bgColor: 'bg-indigo-50' },
    admin: { icon: Settings, color: 'from-gray-600 to-gray-700', iconColor: 'text-gray-600', borderColor: 'border-gray-300', bgColor: 'bg-gray-50' },
    integration: { icon: Settings, color: 'from-fuchsia-500 to-fuchsia-600', iconColor: 'text-fuchsia-600', borderColor: 'border-fuchsia-300', bgColor: 'bg-fuchsia-50' },
    reporting: { icon: FileText, color: 'from-emerald-600 to-emerald-700', iconColor: 'text-emerald-700', borderColor: 'border-emerald-400', bgColor: 'bg-emerald-50' },
};

export function ModuleCard({ module, isHighlighted }) {
    const [expanded, setExpanded] = useState(false);

    const config = moduleConfig[module.id] || moduleConfig.core;
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "flex flex-col rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 overflow-hidden relative",
                isHighlighted ? `ring-2 ring-primary shadow-md scale-105 ${config.borderColor}` : `${config.borderColor} hover:shadow-lg`,
                "h-fit"
            )}
        >
            {/* Gradient header accent */}
            <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", config.color)} />

            <div className="flex items-start justify-between mt-1">
                <div className="flex items-center gap-2">
                    <div className={cn("p-1.5 rounded-md", config.bgColor)}>
                        <Icon className={cn("h-5 w-5", config.iconColor)} />
                    </div>
                    <h3 className="font-semibold text-sm">{module.name}</h3>
                </div>
                <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full border font-mono uppercase",
                    module.maturity === 'High' ? "bg-primary text-primary-foreground border-primary" :
                        module.maturity === 'Medium' ? "bg-muted text-foreground border-border" : "bg-transparent text-muted-foreground border-dashed"
                )}>
                    {module.maturity}
                </span>
            </div>

            <p className="mt-2 text-xs text-muted-foreground line-clamp-2 min-h-[2.5em]">
                {module.description}
            </p>

            <button
                onClick={() => setExpanded(!expanded)}
                className={cn("mt-3 flex items-center gap-1 text-xs font-medium hover:underline transition-colors", config.iconColor)}
            >
                {expanded ? "Hide" : "Show"} Features
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>

            {expanded && (
                <ul className={cn("mt-2 space-y-1 pl-1 border-l-2 ml-1", config.borderColor)}>
                    {module.features.map((f) => (
                        <li key={f} className="text-[10px] text-muted-foreground pl-2 block">
                            • {f}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

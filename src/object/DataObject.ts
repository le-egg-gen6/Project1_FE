import { LucideIcon } from "lucide-react";

export interface Node {
    id: string;
    label: string;
}

export interface Edge {
    id: string;
    label: string;
    source: string;
    target: string;
}

export interface Graph {
    id: string;
    label: string;
    type: string;
    nodes: Node[];
    edges: Edge[];
}

export interface SidebarMeneuItem {
    id: string;
    label: string;
    icon: LucideIcon;
}
import { LucideIcon } from "lucide-react";

export interface Node {
    id: string;
    label: string;
}

export interface Edge {
    id: string;
    label: string;
    weight: number;
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

export interface AlgorithmResult {
    id: string;
    timeLimitExceeded: boolean;
    hasPath: boolean;
    totalWeight: number;
    nodes: Node[];
    edges: Edge[];
}

export interface SidebarMeneuItem {
    id: string;
    label: string;
    icon: LucideIcon;
}
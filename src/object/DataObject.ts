export interface _Node {
    id: string;
    label: string;
    radius: number;
    color: string;
}

export interface _Link {
    id: string;
    source: string;
    target: string;
}

export interface _Graph {
    id: string;
    type: string;
    nodes: _Node[];
    links: _Link[];
}
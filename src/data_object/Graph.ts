import { GraphType } from "../shared/GraphType";
import { Edge } from "./Edge";

export interface Graph {
    id: string;
    type: GraphType;
    nodes: Node[];
    edges: Edge[];
}
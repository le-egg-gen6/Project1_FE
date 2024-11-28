import { GraphType } from "@/shared/GraphType";

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface Node {
  id: string;
  data: {
    label: string;
  };
  props: {
    radius: number;
    color: string;
  };
}

export interface Graph {
  id: string;
  type: GraphType;
  nodes: Node[];
  edges: Edge[];
}

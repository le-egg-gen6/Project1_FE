import { GraphType } from "@/shared/GraphType";
import { Edge } from "@/data_object/Edge";
import { Node } from "@/data_object/Node";

export interface Graph {
  id: string;
  type: GraphType;
  nodes: Node[];
  edges: Edge[];
}

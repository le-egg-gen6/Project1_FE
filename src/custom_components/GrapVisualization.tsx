import { Edge, Node, Graph } from "@/object/APIObject";
import React from "react";

interface GraphVisualizationProps {
  graph: Graph;
  onNodeClick?: (node: Node) => void;
  onEdgeClick?: (edge: Edge) => void;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  graph,
  onNodeClick,
  onEdgeClick,
}) => {
  return (
    <div className="w-full h-full bg-muted rounded-md">
      {/* ForceGraph3D or ForceGraph2D would go here */}
      <p className="p-4">Placeholder for Force Graph</p>
    </div>
  );
};

export default GraphVisualization;

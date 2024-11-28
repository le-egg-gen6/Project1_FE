import { Graph } from "@/data_object/Graph";
import React from "react";

interface GraphStatsProps {
  graph: Graph;
}

const GraphStats: React.FC<GraphStatsProps> = ({ graph }) => {
  return (
    <div className="flex gap-4 text-sm text-muted-foreground">
      <span>Nodes: {graph.nodes.length}</span>
      <span>Edges: {graph.edges.length}</span>
      <span>Type: {graph.type}</span>
    </div>
  );
};

export default GraphStats;

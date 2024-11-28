import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edge } from "@/data_object/Edge";
import { Graph } from "@/data_object/Graph";
import { Node } from "@/data_object/Node";
import React from "react";
import GraphControls from "./GraphControl";
import GraphVisualization from "./GrapVisualization";
import GraphStats from "./GraphStats";

interface GraphContainerProps {
  graph: Graph;
  onNodeClick?: (node: Node) => void;
  onEdgeClick?: (edge: Edge) => void;
}

const GraphContainer: React.FC<GraphContainerProps> = ({
  graph,
  onNodeClick,
  onEdgeClick,
}) => {
  return (
    <Card className="w-full h-[600px]">
      <CardHeader>
        <CardTitle>Graph Visualization - {graph.id}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <GraphControls graph={graph} />
        <div className="relative h-96">
          <GraphVisualization
            graph={graph}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
          />
        </div>
        <GraphStats graph={graph} />
      </CardContent>
    </Card>
  );
};

export default GraphContainer;

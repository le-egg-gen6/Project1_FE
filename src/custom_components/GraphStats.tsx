import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Graph } from "@/object/DataObject";
import {
  GitBranchIcon,
  NetworkIcon,
  NetworkIcon as NodeIcon,
} from "lucide-react";
import React from "react";

interface GraphStatsProps {
  graph: Graph;
}

const GraphStats: React.FC<GraphStatsProps> = ({ graph }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-secondary/10 rounded-lg">
      <div className="flex items-center gap-2">
        <NodeIcon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Nodes:</span>
        <Badge variant="secondary">{graph.nodes.length}</Badge>
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex items-center gap-2">
        <GitBranchIcon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Edges:</span>
        <Badge variant="secondary">{graph.edges.length}</Badge>
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex items-center gap-2">
        <NetworkIcon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Type:</span>
        <Badge variant="outline" className="capitalize">
          {graph.type}
        </Badge>
      </div>
    </div>
  );
};

export default GraphStats;

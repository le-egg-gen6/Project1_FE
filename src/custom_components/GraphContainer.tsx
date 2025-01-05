import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Graph } from "@/object/DataObject";
import React from "react";
import GraphVisualizer from "./graph/GraphVisualizer";
import GraphStats from "./GraphStats";
import { Button } from "@/components/ui/button";
import { DownloadIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface GraphContainerProps {
  graph: Graph;
}

const GraphContainer: React.FC<GraphContainerProps> = ({ graph }) => {
  return (
    <Card className="w-full h-[600px] overflow-hidden bg-dot-pattern">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Graph Visualization</CardTitle>
        <Badge variant="secondary" className="text-sm">
          ID: {graph.id}
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-[calc(100%-2rem)] border-t">
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <Button variant="secondary" size="sm">
              <ZoomInIcon className="w-4 h-4 mr-1" /> Zoom In
            </Button>
            <Button variant="secondary" size="sm">
              <ZoomOutIcon className="w-4 h-4 mr-1" /> Zoom Out
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon className="w-4 h-4 mr-1" /> Export
            </Button>
          </div>
          <GraphVisualizer graph={graph} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm">
          <GraphStats graph={graph} />
        </div>
      </CardContent>
    </Card>
  );
};

export default GraphContainer;


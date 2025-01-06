import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edge, Graph, Node } from "@/object/DataObject";
import {
  GitBranchIcon,
  NetworkIcon,
  NetworkIcon as NodeIcon,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import GraphVisualizer from "./graph/GraphVisualizer";

interface GraphContainerProps {
  graph: Graph;
}

interface AlgorithmResult {
  hightlightedNodes: Node[];
  highlightedEdges: Edge[];
}

const GraphContainer: React.FC<GraphContainerProps> = ({ graph }) => {
  const [algorithm, setAlgorithm] = useState<"dijkstra" | "hamilton" | "">("");
  const [startNode, setStartNode] = useState<Node | null>(null);
  const [endNode, setEndNode] = useState<Node | null>(null);
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const runAlgorithm = () => {
    if (!algorithm || algorithm.length === 0) {
      toast.error("Please select an algorithm.");
      return;
    }
    if (algorithm === "dijkstra") {
      if (!startNode || !endNode) {
        toast.error(
          "Please select both start and end node for Dijkstra's algorithm."
        );
        return;
      }
    } else if (algorithm === "hamilton") {
      if (graph.type !== "undirected") {
        toast.error("Hamilton Cycle can only be applied to undirected graphs.");
        return;
      }
      if (!startNode) {
        toast.error("Please select a start node for Hamilton Cycle.");
        return;
      }
    }
  };

  const clearResult = () => {
    if (result) {
      setResult(null);
    }
  };

  return (
    <Card className="w-full h-[800px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Graph Visualization
        </CardTitle>
        <Badge
          variant="secondary"
          className="text-sm bg-gray-100 text-gray-600"
        >
          ID: {graph.id}
        </Badge>
      </CardHeader>
      <CardContent className="p-0 relative h-[calc(100%-4rem)]">
        <div className="absolute inset-0">
          <GraphVisualizer graph={graph} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <NodeIcon className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Nodes:</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                {graph.nodes.length}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <GitBranchIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Edges:</span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-600"
              >
                {graph.edges.length}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <NetworkIcon className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">Type:</span>
              <Badge
                variant="outline"
                className="capitalize border-purple-200 text-purple-600"
              >
                {graph.type}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <Select
              onValueChange={(value) =>
                setAlgorithm(value as "dijkstra" | "hamilton")
              }
            >
              <SelectTrigger className="w-full bg-white border-gray-300 text-gray-700">
                <SelectValue placeholder="Select an algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
                {graph.type === "undirected" && (
                  <SelectItem value="hamilton">Hamilton Cycle</SelectItem>
                )}
              </SelectContent>
            </Select>

            {algorithm && (
              <div className="flex space-x-2">
                <Select
                  onValueChange={(nodeId) => {
                    const node = graph.nodes.find((node) => node.id === nodeId);
                    if (node) {
                      setStartNode(node);
                    }
                  }}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 text-gray-700">
                    <SelectValue placeholder="Select start node" />
                  </SelectTrigger>
                  <SelectContent>
                    {graph.nodes.map((node: Node) => (
                      <SelectItem key={node.id} value={node.id}>
                        {node.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {algorithm === "dijkstra" && (
                  <Select
                    onValueChange={(nodeId) => {
                      const node = graph.nodes.find(
                        (node) => node.id === nodeId
                      );
                      if (node) {
                        setEndNode(node);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-700">
                      <SelectValue placeholder="Select end node" />
                    </SelectTrigger>
                    <SelectContent>
                      {graph.nodes.map((node: Node) => (
                        <SelectItem key={node.id} value={node.id}>
                          {node.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Button
                onClick={runAlgorithm}
                className="w-full bg-primary text-white hover:bg-gray-600"
              >
                Run Algorithm
              </Button>
              <Button
                onClick={clearResult}
                className="w-full bg-primary text-white hover:bg-gray-600"
              >
                Clear Result
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraphContainer;

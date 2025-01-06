import { Button } from "@/components/ui/button";
import { Edge, Graph, Node } from "@/object/DataObject";
import { PlusCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GraphCanvas, GraphCanvasRef } from "reagraph";
import EdgePopup from "./EdgePopup";
import { lightTheme } from "./GraphTheme";
import NodePopup from "./NodePopup";
import service from "@/service/service";
import { toast } from "sonner";

interface GraphVisualizerProps {
  graph: Graph;
  onNodeClick?: (node: Node) => void;
  onEdgeClick?: (edge: Edge) => void;
  highlightedNodes?: Node[];
  highlightedEdges?: Edge[];
}

export default function GraphVisualizer({
  graph,
  onNodeClick,
  onEdgeClick,
  highlightedNodes,
  highlightedEdges,
}: GraphVisualizerProps) {
  const graphRef = useRef<GraphCanvasRef>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [graphData, setGraphData] = useState<Graph>(graph);

  const handleNodeClick = useCallback(
    async (node: Node) => {
      setSelectedNode(node);
      setSelectedEdge(null);
      if (onNodeClick) onNodeClick(node);
    },
    [onNodeClick]
  );

  const handleEdgeClick = useCallback(
    (edge: Edge) => {
      setSelectedEdge(edge);
      setSelectedNode(null);
      if (onEdgeClick) onEdgeClick(edge);
    },
    [onEdgeClick]
  );

  const handleClosePopup = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const updateGraph = useCallback((newEdge: Edge) => {
    setGraphData((prevGraph) => ({
      ...prevGraph,
      edges: [...prevGraph.edges, newEdge],
    }));
  }, []);

  const selectionIds = () => {
    let highlightedIds: string[] = [];
    if (highlightedEdges) {
      highlightedIds = highlightedEdges.map((edge) => edge.id);
    }
    if (highlightedNodes) {
      highlightedIds = [
        ...highlightedIds,
        ...highlightedNodes.map((node) => node.id),
      ];
    }
    return highlightedIds;
  };

  const handleCreateNode = useCallback(async () => {
    try {
      const response = await service.get(`/graph/add-node?graphId=${graph.id}`);

      const newNode = await response.data;
      setGraphData((prevGraph) => ({
        ...prevGraph,
        nodes: [...prevGraph.nodes, newNode],
      }));
      toast.success("Node created successfully");
    } catch (error) {
      console.error("Error creating node:", error);
    }
  }, []);

  useEffect(() => {
    setGraphData(graph);
  }, [graph]);

  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-gray-900 to-gray-800">
      <GraphCanvas
        theme={lightTheme}
        ref={graphRef}
        nodes={graphData.nodes}
        edges={graphData.edges}
        edgeArrowPosition={graphData.type === "DIRECTED" ? "end" : "none"}
        layoutType="forceDirected2d"
        labelType="all"
        draggable
        enableZoom
        enablePanning
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        selections={selectionIds()}
        edgeLabel={(edge: Edge) => edge.label}
        className="w-full h-full"
      />
      {selectedNode && (
        <NodePopup
          node={selectedNode}
          graph={graphData}
          onClose={handleClosePopup}
          onCreateEdge={updateGraph}
        />
      )}
      {selectedEdge && (
        <EdgePopup
          edge={selectedEdge}
          graph={graphData}
          onClose={handleClosePopup}
        />
      )}
      <div className="absolute top-4 right-4">
        <Button
          onClick={handleCreateNode}
          className="flex items-center space-x-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Node</span>
        </Button>
      </div>
    </div>
  );
}

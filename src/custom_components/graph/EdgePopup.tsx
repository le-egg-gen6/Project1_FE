import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edge, Graph, Node } from "@/object/DataObject";
import { useEffect, useState } from "react";

interface EdgePopupProps {
  edge: Edge;
  graph: Graph;
  onClose: () => void;
}

interface EdgeDetails extends Edge {
  relatedNodes?: Node[];
  sourceNode?: Node;
  targetNode?: Node;
}

export default function EdgePopup({ edge, graph, onClose }: EdgePopupProps) {
  const [edgeDetails, setEdgeDetails] = useState<EdgeDetails | null>(null);

  useEffect(() => {
    const edgeDetails: EdgeDetails = {
      ...edge,
      relatedNodes: graph.nodes.filter((node) => node.id === edge.source || node.id === edge.target),
      sourceNode: graph.nodes.find((node) => node.id === edge.source),
      targetNode: graph.nodes.find((node) => node.id === edge.target),
    }
    setEdgeDetails(edgeDetails);
  }, [edge.id]);

  const getLabel = () => {
    if (edgeDetails) {
      if (graph.type === "directed") {
        return `Edge from ${edgeDetails.sourceNode?.label} to ${edgeDetails.targetNode?.label}`;
      } else {
        return `Edge connecting ${edgeDetails.sourceNode?.label} and ${edgeDetails.targetNode?.label}`;
      }
    }
    return "Loading...";
  };

  if (!edgeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edge Details</DialogTitle>
          <DialogDescription>
            View information about this edge.
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>{getLabel()}</CardTitle>
            <CardDescription>ID: {edgeDetails.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {edgeDetails.weight && (
              <p>
                <strong>Weight:</strong> {edgeDetails.weight}
              </p>
            )}

            {graph.type === "directed" ? (
              <>
                <p>
                  <strong>Source Node:</strong> {edgeDetails.sourceNode?.label}{" "}
                  (ID: {edgeDetails.sourceNode?.id})
                </p>
                <p>
                  <strong>Target Node:</strong> {edgeDetails.targetNode?.label}{" "}
                  (ID: {edgeDetails.targetNode?.id})
                </p>
              </>
            ) : (
              <div>
                <p>
                  <strong>Related Nodes:</strong>
                </p>
                <ul className="list-disc pl-5">
                  {edgeDetails.relatedNodes?.map((node) => (
                    <li key={node.id}>
                      {node.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

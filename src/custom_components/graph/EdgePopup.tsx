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
    const fetchEdgeDetails = async () => {
      //   try {
      //     const response = await fetch(`/api/edgeDetails/${edge.id}`);
      //     if (!response.ok) {
      //       throw new Error("Failed to fetch edge details");
      //     }
      //     const data = await response.json();
      //     setEdgeDetails(data);
      //   } catch (error) {
      //     console.error("Error fetching edge details:", error);
      //     // Handle error (e.g., show error message to user)
      //   }
      setEdgeDetails({
        id: "id",
        label: "label",
        weight: 1,
        source: "source",
        target: "target",
      });
    };

    fetchEdgeDetails();
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
                      {node.label} (ID: {node.id})
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

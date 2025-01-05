import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Edge, Graph, Node } from "@/object/DataObject";
import { useState } from "react";

interface NodePopupProps {
  node: Node;
  graph: Graph;
  onClose: () => void;
  onCreateEdge: (edge: Edge) => void;
}

export default function NodePopup({
  node,
  graph,
  onClose,
  onCreateEdge,
}: NodePopupProps) {
  const [targetNode, setTargetNode] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const handleCreateEdge = async () => {
    if (!targetNode) return;

    try {
      const response = await fetch("/api/createEdge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: node.id,
          target: targetNode,
          weight: weight,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create edge");
      }

      const newEdge = await response.json();
      onCreateEdge(newEdge);
      onClose();
    } catch (error) {
      console.error("Error creating edge:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Node Details</DialogTitle>
          <DialogDescription>
            View node information and create new connections.
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>{node.label}</CardTitle>
            <CardDescription>ID: {node.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="targetNode">Target Node</Label>
              <Select onValueChange={setTargetNode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target node" />
                </SelectTrigger>
                <SelectContent>
                  {graph.nodes
                    .filter((n) => n.id !== node.id)
                    .map((n) => (
                      <SelectItem key={n.id} value={n.id}>
                        {n.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreateEdge}>Create Connection</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

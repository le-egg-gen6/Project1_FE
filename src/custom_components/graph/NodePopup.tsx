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
import service from "@/service/service";
import { toast } from "sonner";
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
  const [targetNode, setTargetNode] = useState<Node | null>(null);
  const [weight, setWeight] = useState<string>("");

  const handleCreateEdge = async () => {
    if (!targetNode) {
      toast.error("Please select a target node");
      return;
    };

    try {
      const response = await service.get(`/graph/add-edge?graphId=${graph.id}&sourceId=${node.id}&targetId=${targetNode.id}&weight=${weight}`);

      const newEdge = await response.data;
      onCreateEdge(newEdge);
      setTimeout(() => toast.success("Node created successfully"), 1000);
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
              <Select onValueChange={(targetId) => {
                const targetNode = graph.nodes.find((n) => n.id === targetId);
                setTargetNode(targetNode || null);
              }}>
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

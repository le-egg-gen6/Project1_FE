import { useState } from "react";
import ForceGraph3DComponent from "@/custom_components/ForceGraph3DComponent";

// Sample graph data
const initialGraphData = {
  id: "graph",
  type: "undirected",
  nodes: [
    { id: "Node 1", label: "Main Hub", radius: 8, color: "#FF6B6B" },
    {
      id: "Node 2",
      label: "Secondary Hub",
      radius: 6,
      color: "#4ECDC4",
    },
    {
      id: "Node 3",
      label: "Connector A",
      radius: 4,
      color: "#45B7D1",
    },
    {
      id: "Node 4",
      label: "Connector B",
      radius: 4,
      color: "#F7B731",
    },
    { id: "Node 5", label: "Endpoint", radius: 5, color: "#5D5D5D" },
  ],
  links: [
    { id: "1", source: "Node 1", target: "Node 2" },
    { id: "2", source: "Node 1", target: "Node 3" },
    { id: "3", source: "Node 2", target: "Node 4" },
    { id: "4", source: "Node 3", target: "Node 4" },
    { id: "5", source: "Node 4", target: "Node 5" },
  ],
};

function Test() {
  const [graphData, setGraphData] = useState(initialGraphData);

  const addRandomNode = () => {
    const newNode = {
      id: `Node ${graphData.nodes.length + 1}`,
      label: `Random Node ${graphData.nodes.length + 1}`,
      radius: Math.random() * 4 + 2,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };

    const newLink = {
      id: "0",
      source: newNode.id,
      target:
        graphData.nodes[Math.floor(Math.random() * graphData.nodes.length)].id,
    };

    setGraphData((prevData) => ({
      id: prevData.id,
      type: prevData.type,
      nodes: [...prevData.nodes, newNode],
      links: [...prevData.links, newLink],
    }));
  };

  return (
    <div className="relative !max-h-fit">
      <ForceGraph3DComponent graphData={graphData}/>
      <button
        className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={addRandomNode}
      >
        Add Random Node
      </button>
    </div>
  );
}

export default Test;

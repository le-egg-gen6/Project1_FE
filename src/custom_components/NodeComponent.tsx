import React from "react";
import { Node } from "../data_object/Node";

interface NodeComponentProps {
  node: Node;
}

const NodeComponent: React.FC<NodeComponentProps> = ({ node }) => {
  return (
    <>
      <circle r={node.props.radius} fill={node.props.color} />
      <text
        textAnchor="middle"
        y={4}
        style={{ fontSize: "8px", fill: "#ffffff" }}
      >
        {node.data.label}
      </text>
    </>
  );
};

export default NodeComponent;
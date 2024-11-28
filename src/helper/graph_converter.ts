import { Edge, Node, Graph } from "@/object/APIObject";
import { _Link, _Node, _Graph } from "@/object/DataObject";
import { GraphType } from "@/shared/GraphType";

export function convertGraphToUsableData(graph: Graph) {
    const _nodes: _Node[] = graph.nodes.map((item) => {
        return convertNodeToUsableData(item);
    });
    const _links: _Link[] = graph.edges.map((item) => {
        return convertEdgeToUsableData(item);
    });
    
    const _graph: _Graph = {
        id: graph.id,
        type: graph.type === GraphType.DIRECTED ? "directed" : "undirected",
        nodes: _nodes,
        links: _links 
    }
    return _graph;
}

function convertNodeToUsableData(node: Node) {
    const _node: _Node = {
        id: node.id,
        label: node.data.label,
        radius: node.props.radius,
        color: node.props.color,
    };
    return _node;
}

function convertEdgeToUsableData(edge: Edge) {
    const _link: _Link = {
        id: edge.id,
        source: edge.source,
        target: edge.target,
    };
    return _link;
}
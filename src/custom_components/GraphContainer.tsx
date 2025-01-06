"use client"

import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, GitBranchIcon, NetworkIcon, NetworkIcon as NodeIcon } from 'lucide-react'
import { Graph, Node } from "@/object/DataObject"
import GraphVisualizer from "./graph/GraphVisualizer"

interface GraphContainerProps {
  graph: Graph
}

const GraphContainer: React.FC<GraphContainerProps> = ({ graph }) => {
  const [algorithm, setAlgorithm] = useState<'dijkstra' | 'hamilton' | ''>('')
  const [startNode, setStartNode] = useState<string>('')
  const [endNode, setEndNode] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const runAlgorithm = () => {
    if (algorithm === 'dijkstra') {
      if (!startNode || !endNode) {
        setResult('Please select both start and end nodes for Dijkstra\'s algorithm.')
        return
      }
      // Implement Dijkstra's algorithm here
      setResult(`Dijkstra's algorithm result: Shortest path from ${startNode} to ${endNode}`)
    } else if (algorithm === 'hamilton') {
      if (graph.type !== 'undirected') {
        setResult('Hamilton Cycle can only be applied to undirected graphs.')
        return
      }
      if (!startNode) {
        setResult('Please select a start node for Hamilton Cycle.')
        return
      }
      // Implement Hamilton Cycle algorithm here
      setResult(`Hamilton Cycle result: Starting from node ${startNode}`)
    }
  }

  return (
    <Card className="w-full h-[800px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Graph Visualization
        </CardTitle>
        <Badge variant="secondary" className="text-sm bg-gray-100 text-gray-600">
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
              <Badge variant="secondary" className="bg-blue-100 text-blue-600">{graph.nodes.length}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <GitBranchIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Edges:</span>
              <Badge variant="secondary" className="bg-green-100 text-green-600">{graph.edges.length}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <NetworkIcon className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">Type:</span>
              <Badge variant="outline" className="capitalize border-purple-200 text-purple-600">
                {graph.type}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-4">
            <Select onValueChange={(value) => setAlgorithm(value as 'dijkstra' | 'hamilton')}>
              <SelectTrigger className="w-full bg-white border-gray-300 text-gray-700">
                <SelectValue placeholder="Select an algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
                {graph.type === 'undirected' && <SelectItem value="hamilton">Hamilton Cycle</SelectItem>}
              </SelectContent>
            </Select>

            {algorithm && (
              <div className="flex space-x-2">
                <Select onValueChange={setStartNode}>
                  <SelectTrigger className="w-full bg-white border-gray-300 text-gray-700">
                    <SelectValue placeholder="Select start node" />
                  </SelectTrigger>
                  <SelectContent>
                    {graph.nodes.map((node: Node) => (
                      <SelectItem key={node.id} value={node.id}>{node.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {algorithm === 'dijkstra' && (
                  <Select onValueChange={setEndNode}>
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-700">
                      <SelectValue placeholder="Select end node" />
                    </SelectTrigger>
                    <SelectContent>
                      {graph.nodes.map((node: Node) => (
                        <SelectItem key={node.id} value={node.id}>{node.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}

            {algorithm && (
              <Button onClick={runAlgorithm} className="w-full bg-blue-500 text-white hover:bg-blue-600">
                Run Algorithm
              </Button>
            )}

            {result && (
              <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Algorithm Result</AlertTitle>
                <AlertDescription>{result}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GraphContainer


// GraphContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Graph } from "@/object/DataObject";
import service from '@/service/service';

interface GraphContextType {
  selectedGraph: Graph | null;
  setSelectedGraph: (graph: Graph) => void;
  graphData: Graph[];
  setGraphData: (data: Graph[]) => void;
  fetchGraphs: () => Promise<void>;
  addGraph: (graph: Graph) => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [graphData, setGraphData] = useState<Graph[]>([]);
  const [selectedGraph, setSelectedGraph] = useState<Graph | null>(null);

  const fetchGraphs = async () => {
    try {
      const response = await service.get("/graph/get-all");
      const listGraph: Graph[] = await response.data;
      setGraphData(listGraph);
    } catch (error) {
      console.error("Error fetching graphs:", error);
    }
  };

  const addGraph = (graph: Graph) => {
    setGraphData([...graphData, graph]);
  };

  useEffect(() => {
    fetchGraphs();
  }, []);

  return (
    <GraphContext.Provider value={{
      selectedGraph,
      setSelectedGraph,
      graphData,
      setGraphData,
      fetchGraphs,
      addGraph,
    }}>
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (context === undefined) {
    throw new Error('useGraph must be used within a GraphProvider');
  }
  return context;
};
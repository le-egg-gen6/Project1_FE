import { Graph } from "@/object/DataObject";
import { create } from "zustand";

export interface GraphData {
  graphs: Graph[];
}

interface GraphDataState {
  selectedGraph: Graph | null;
  graphData: GraphData;
  setSelectedGraph: (graph: Graph | null) => void;
  setGraphData: (graphData: GraphData) => void;
  addNewGraph: (graph: Graph) => void;
}

export const useGraphStore = create<GraphDataState>()((set) => ({
  selectedGraph: null,
  graphData: { graphs: [] },
  setSelectedGraph: (graph: Graph | null) => {
    if (graph !== null) {
      set({ selectedGraph: graph });
    }
  },
  setGraphData: (graphData: GraphData) => set({ graphData }),
  addNewGraph: (graph: Graph) =>
    set((state) => ({
      graphData: { graphs: [...state.graphData.graphs, graph] },
    })),
}));

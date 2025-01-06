import { SidebarProvider } from "@/components/ui/sidebar";
import { useGraph } from "@/context/GraphContext";
import CustomSidebar from "@/custom_components/CustomSidebar";
import TopBar from "@/custom_components/CustomTopbar";
import GraphContainer from "@/custom_components/GraphContainer";
import { Graph } from "@/object/DataObject";

const sampleGraph: Graph = {
  id: "graph-1",
  label: "Sample Graph",
  type: "undirected",
  nodes: [
    { id: "node-1", label: "Node 1" },
    { id: "node-2", label: "Node 2" },
    { id: "node-3", label: "Node 3" },
    { id: "node-4", label: "Node 4" },
    { id: "node-5", label: "Node 5" },
    { id: "node-6", label: "Node 6" },
    { id: "node-7", label: "Node 7" },
    { id: "node-8", label: "Node 8" },
    { id: "node-9", label: "Node 9" },
    { id: "node-10", label: "Node 10" },
  ],
  edges: [
    { id: "edge-1", label: "1", source: "node-1", target: "node-2", weight: 1 },
    { id: "edge-2", label: "2", source: "node-2", target: "node-3", weight: 2 },
    { id: "edge-3", label: "3", source: "node-3", target: "node-4", weight: 3 },
    { id: "edge-4", label: "4", source: "node-4", target: "node-5", weight: 4 },
    { id: "edge-5", label: "5", source: "node-5", target: "node-6", weight: 5 },
    { id: "edge-6", label: "6", source: "node-6", target: "node-7", weight: 6 },
    { id: "edge-7", label: "7", source: "node-7", target: "node-8", weight: 7 },
    { id: "edge-8", label: "8", source: "node-8", target: "node-9", weight: 8 },
    {
      id: "edge-9",
      label: "9",
      source: "node-9",
      target: "node-10",
      weight: 9,
    },
    {
      id: "edge-10",
      label: "10",
      source: "node-10",
      target: "node-1",
      weight: 10,
    },
    {
      id: "edge-11",
      label: "11",
      source: "node-1",
      target: "node-5",
      weight: 11,
    },
    {
      id: "edge-12",
      label: "12",
      source: "node-2",
      target: "node-6",
      weight: 12,
    },
    {
      id: "edge-13",
      label: "13",
      source: "node-3",
      target: "node-7",
      weight: 13,
    },
    {
      id: "edge-14",
      label: "14",
      source: "node-4",
      target: "node-8",
      weight: 14,
    },
    {
      id: "edge-15",
      label: "15",
      source: "node-5",
      target: "node-9",
      weight: 15,
    },
  ],
};

const MainPage = () => {
  const { selectedGraph } = useGraph();
  return (
    <SidebarProvider className="h-screen w-screen">
      <div className="h-full">
        <CustomSidebar />
      </div>
      <main className="relative flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden">
        <TopBar />
        <div className="flex-1 px-3 py-4">
          <div className="min-h-full">
            <GraphContainer graph={selectedGraph || sampleGraph} />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainPage;

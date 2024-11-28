import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/custom_components/CustomSidebar";

const sampleData = {
  menus: [
    {
      label: "Algorithms",
      items: [
        { id: "bfs", label: "Breadth-First Search" },
        { id: "dfs", label: "Depth-First Search" },
        { id: "dijkstra", label: "Dijkstra's Algorithm" },
        { id: "astar", label: "A* Search" },
      ],
    },
    {
      label: "Graph Types",
      items: [
        { id: "directed", label: "Directed Graph" },
        { id: "undirected", label: "Undirected Graph" },
        { id: "weighted", label: "Weighted Graph" },
      ],
    },
    {
      label: "Visualizations",
      items: [
        { id: "step-by-step", label: "Step-by-Step" },
        { id: "animation", label: "Animated" },
        { id: "comparison", label: "Algorithm Comparison" },
      ],
    },
  ],
};

const MainPage = () => {
  return (
    <SidebarProvider className="h-screen">
      <div className="h-full">
        <CustomSidebar menus={sampleData} />
      </div>
      <main className="relative flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden">
        <div className="flex-1 px-3 py-4">
          <div className="min-h-full">Test</div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainPage;

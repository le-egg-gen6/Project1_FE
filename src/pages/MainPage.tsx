import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/custom_components/CustomSidebar";
import TopBar from "@/custom_components/CustomTopbar";
import Test from "./Test";

const sampleData = {
  menus: [
    {
      label: "Directed Graphs",
      items: [
        { id: "test_1", label: "Graph_1" },
        { id: "test_2", label: "Graph_2" },
        { id: "test_3", label: "Graph_3" },
      ],
    },
    {
      label: "Undirected Graph",
      items: [
        { id: "test_4", label: "Graph_4" },
        { id: "test_5", label: "Graph_5" },
        { id: "test_6", label: "Graph_6" },
      ],
    }
  ],
};

const MainPage = () => {
  return (
    <SidebarProvider className="h-screen w-screen">
      <div className="h-full">
        <CustomSidebar menus={sampleData} />
      </div>
      <main className="relative flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden">
        <TopBar />
        <div className="flex-1 px-3 py-4">
          <div className="min-h-full"><Test /></div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainPage;

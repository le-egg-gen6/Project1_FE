import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/custom_components/CustomSidebar";
import TopBar from "@/custom_components/CustomTopbar";

const MainPage = () => {
  return (
    <SidebarProvider className="h-screen w-screen">
      <div className="h-full">
        <CustomSidebar/>
      </div>
      <main className="relative flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden">
        <TopBar />
        <div className="flex-1 px-3 py-4">
          <div className="min-h-full">
            
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainPage;

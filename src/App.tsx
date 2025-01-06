import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { Toaster } from "sonner";
import { GraphProvider } from "./context/GraphContext";

const App = () => {
  return (
    <GraphProvider>
      <BrowserRouter>
        <Router />
        <Toaster richColors theme="light" position="top-center" />
      </BrowserRouter>
    </GraphProvider>
  );
};

export default App;

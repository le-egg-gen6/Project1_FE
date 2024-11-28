import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
      <Toaster richColors theme="light" position="top-center" />
    </BrowserRouter>
  );
}

export default App;

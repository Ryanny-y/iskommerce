import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from '@/components/ui/sonner';
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <Toaster position="bottom-right" richColors closeButton />
    </Router>
  );
};

export default App;

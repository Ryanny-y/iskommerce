import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from '@/components/ui/sonner';
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <Toaster position="top-center" richColors />
    </Router>
  );
};

export default App;

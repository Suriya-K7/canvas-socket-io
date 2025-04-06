import { Route, Routes } from "react-router-dom";
import { DashboardBoard, SignIn } from "./pages";

function App() {

  return (
    <div className="min-h-screen">

      <Routes>
        <Route path="/" element={<DashboardBoard />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;

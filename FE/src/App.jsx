import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { DashboardBoard, SignIn } from "./pages";
import DataContext from "./context/DataContext";
import { ToastContainer } from "react-toastify";

function App() {

  const { token } = useContext(DataContext);

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={token ? <DashboardBoard /> : <SignIn />} />
      </Routes>
      <ToastContainer />

    </div>
  );
}

export default App;

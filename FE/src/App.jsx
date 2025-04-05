import { Button } from "@mui/material";
import { useState } from 'react';
import { DashboardBoard } from "./pages";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DashboardBoard />
    </>
  );
}

export default App;

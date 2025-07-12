import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/task/:id" element={<TaskPage />}></Route>
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import MainLayout from "./Layout";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/task/:id"
        element={
          <MainLayout>
            <TaskPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <RoleRoute role="Admin">
              <Admin />
            </RoleRoute>
          }
        />

        {/* Editor Route */}
        <Route
          path="/editor"
          element={
            <RoleRoute role="Editor">
              <Editor />
            </RoleRoute>
          }
        />

        {/* Viewer Route */}
        <Route
          path="/viewer"
          element={
            <RoleRoute role="Viewer">
              <Viewer />
            </RoleRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
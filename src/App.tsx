/** @jsxImportSource @emotion/react */
import "./App.css";
import BaseContact from "./components/BaseContact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormInput from "./components/FormInput";
import DetailContact from "./components/DetailContact";
import EditInput from "./components/EditInput";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseContact />,
  },
  {
    path: "/form",
    element: <FormInput />,
  },
  {
    path: "/detail/:id",
    element: <DetailContact />,
  },
  {
    path: "/edit/:id",
    element: <EditInput />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

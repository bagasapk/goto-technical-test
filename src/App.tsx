/** @jsxImportSource @emotion/react */
import "./App.css";
import BaseContact from "./components/BaseContact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormInput from "./components/FormInput";
import DetailContact from "./components/DetailContact";
import EditInput from "./components/EditInput";
import { footer } from "./style/js/emotion";

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
      <footer css={footer}>Last updated 23/09/2023 - Anugerah Prima Bagaskara</footer>
    </div>
  );
}

export default App;

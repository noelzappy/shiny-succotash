import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/404";
import Layout from "../components/Layout";
import Books from "../pages/Books";
import Characters from "../pages/Characters";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/characters",
        element: <Characters />,
      },
    ],
  },
]);

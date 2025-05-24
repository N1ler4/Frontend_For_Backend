import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
  Login,
  Main,
  Register,
  Library,
  BookDetails
} from "@pages";

export default function Router() {
  const root = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/main/*" element={<Main />}>
          <Route path="library" element={<Library />} />
          <Route path="library/:id" element={<BookDetails />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return <RouterProvider router={root} />;
}
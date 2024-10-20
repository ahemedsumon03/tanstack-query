import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from './components/Layout/MainLayout';
import Home from "./pages/Home";
import FetchOld from "./pages/FetchOld";
import FetchRq from "./pages/FetchRq";
import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import FetchSinglePost from './components/UI/FetchSingle';
import InfinityScoller from "./pages/IntinityScroll";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/traditional',
        element: <FetchOld />
      },
      {
        path: '/react-query',
        element: <FetchRq />
      },
      {
        path: '/data/:id',
        element: <FetchSinglePost />
      },
      {
        path: '/infinity-scrollbar',
        element: <InfinityScoller />
      }
    ]
  }
]);


const App = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App;
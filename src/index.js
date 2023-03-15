import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import VideoList from "./pages/VideoList";
import VideoDetail from "./pages/VideoDetail";

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    errorElement : <NotFound/>,
    children : [
      { index : true , element : <VideoList/>},
      { path : "/videos" , element : <VideoList/>},
      { path : "/videos/:keyword" , element : <VideoList/>},
      { path : "/videos/watch/:videoId" , element : <VideoDetail/>},
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
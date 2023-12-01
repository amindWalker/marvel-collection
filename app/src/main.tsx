import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./libs/lib-ui/components/ErrorPage.tsx";
import { CharacterPage } from "./libs/lib-ui/index.ts";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

const rootRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {path: "characters/:characterId", element: <CharacterPage />}
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={rootRouter} />
        </React.StrictMode>
    </Provider>
);

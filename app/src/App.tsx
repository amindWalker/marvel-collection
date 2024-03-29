import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CharacterPage, ErrorPage, HomePage } from "./libs/lib-ui/pages";
import { Modal } from "./libs/lib-ui/components";

const rootRouter = createBrowserRouter([
    {
        path: "/",
        Component: HomePage,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "characters/:charactersId",
                element: (
                    <div className="base-all">
                        <Modal>
                            <CharacterPage />
                        </Modal>
                    </div>
                ),
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={rootRouter} />;
}

export default App;

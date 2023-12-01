import { Outlet } from "react-router-dom";
import "./App.css";
import { Home } from "./libs/lib-ui";

export default function App() {
    return (
        <>
            <Home />
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}

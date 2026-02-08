import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
    <div className="bg-red-500 w-full h-full min-h-screen">
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </div>
);

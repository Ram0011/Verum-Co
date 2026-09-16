import AdminRoutes from "./routes/AdminRoutes";
import AppRoutes from "./routes/AppRoutes";
import { TopProgressBar, GlobalLoader } from "./components/loading";

function App() {
    return (
        <>
            <TopProgressBar />
            <GlobalLoader />
            <AppRoutes />
            <AdminRoutes />
        </>
    );
}

export default App;

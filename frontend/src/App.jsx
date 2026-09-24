import RootRoutes from "./routes/RootRoutes";
import { TopProgressBar, GlobalLoader } from "./components/loading";

function App() {
    return (
        <>
            <TopProgressBar />
            <GlobalLoader />
            <RootRoutes />
        </>
    );
}

export default App;

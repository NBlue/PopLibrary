import "./App.scss";
import { useLayoutEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import UserContextProvider from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

// React Router Dom v6: Scroll To Top on Route Change
const ScrollToTop = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};

function App() {
    return (
        <UserContextProvider>
            <Router>
                <div className="App">
                    <ScrollToTop>
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <>
                                                <Page
                                                    authRoute={
                                                        route.authRoute
                                                            ? route.authRoute
                                                            : null
                                                    }
                                                />
                                            </>
                                        }
                                    />
                                );
                            })}
                            {privateRoutes.map((route, index) => {
                                const Page = route.component;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <ProtectedRoute
                                                layout={
                                                    <DefaultLayout>
                                                        <Page />
                                                    </DefaultLayout>
                                                }
                                            />
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </ScrollToTop>
                </div>
            </Router>
        </UserContextProvider>
    );
}

export default App;

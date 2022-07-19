import Home from "~/pages/Home";
import OurBook from "~/pages/OurBook";
import Contact from "~/pages/Contact";
import CartOrder from "~/pages/CartOrder";
import NotFound from "~/pages/NotFound";
import Auth from "~/pages/Auth";
import OurBookDetail from "~/pages/OurBookDetail";
import Profile from "~/pages/Profile";
import SearchPage from "~/pages/SearchPage";

const publicRoutes = [
    { path: "/login", component: Auth, authRoute: "login" },
    { path: "/register", component: Auth, authRoute: "register" },
    { path: "*", component: NotFound },
];

const privateRoutes = [
    { path: "/", component: Home },
    { path: "/book", component: OurBook },
    { path: "/book/:id", component: OurBookDetail },
    { path: "/contact", component: Contact },
    { path: "/cartOrder", component: CartOrder },
    { path: "/user/:id", component: Profile },
    { path: "/search", component: SearchPage },
];

export { publicRoutes, privateRoutes };

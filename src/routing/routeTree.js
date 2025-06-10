import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../App";
import { authRoute } from "./authRoute";
import { dashboardRoute } from "./dashboard";
import { homePageRoute } from "./homePage";


export const rootRoute = createRootRoute({
    component: RootLayout,
});


export const routeTree = rootRoute.addChildren([homePageRoute, authRoute, dashboardRoute])


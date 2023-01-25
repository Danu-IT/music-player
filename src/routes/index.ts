import Home from "../pages/Home";
import Playlists from "../pages/Playlists";

export const privateRoutes = [
    { path: "/", component: Home },
    { path: "/playlists", component: Playlists },
]

export const publicRoutes = [{ path: "/login", component: Playlists },]
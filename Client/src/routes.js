import LoginPage from "./page/LoginPage.svelte";
import HomePage from "./page/HomePage.svelte";
import EditorPage from "./page/EditorPage.svelte";


const routes = {
    "/login": LoginPage,
    "/home": HomePage,
    "/editor/:id": EditorPage,
};

export default routes
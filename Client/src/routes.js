import LoginPage from "./page/LoginPage.svelte";
import HomePage from "./page/HomePage.svelte";
import EditorPage from "./page/EditorPage.svelte";
import DemoPage from "./page/DemoPage.svelte";


const routes = {
    "/login": LoginPage,
    "/home": HomePage,
    "/editor/:id": EditorPage,
    "/demo/:code&:name": DemoPage,
};

export default routes
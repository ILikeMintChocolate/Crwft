<script>
    import {push} from 'svelte-spa-router'
    import Router from 'svelte-spa-router'
    import routes from './routes'
    push('/login')
    
    //import EditorPage from "./page/EditorPage.svelte";
    //<EditorPage></EditorPage>
</script>


<Router {routes} /> 

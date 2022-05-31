<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function clickAlignButton(type) {
        dispatch('alignObject', {
            type: type,
        });
    }

</script>




<main>
    <div id="wrapper">
        <button on:click={()=>clickAlignButton('left')}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="10" width="2" height="11" transform="rotate(-90 8 10)" fill="#b8b7b7"/>
                <rect x="8" y="14" width="2" height="7" transform="rotate(-90 8 14)" fill="#b8b7b7"/>
                <rect x="5" y="19" width="16" height="1" transform="rotate(-90 5 19)" fill="#b8b7b7"/>
            </svg>
        </button>
        <button on:click={()=>clickAlignButton('horizontal-center')}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="10" width="2" height="11" transform="rotate(-90 6 10)" fill="#b8b7b7"/>
                <rect x="8" y="14" width="2" height="7" transform="rotate(-90 8 14)" fill="#b8b7b7"/>
                <rect x="11" y="19" width="16" height="1" transform="rotate(-90 11 19)" fill="#b8b7b7"/>
            </svg>
        </button>
        <button on:click={()=>clickAlignButton('right')}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="10" width="2" height="11" transform="rotate(-90 4 10)" fill="#b8b7b7"/>
                <rect x="8" y="14" width="2" height="7" transform="rotate(-90 8 14)" fill="#b8b7b7"/>
                <rect x="17" y="19" width="16" height="1" transform="rotate(-90 17 19)" fill="#b8b7b7"/>
            </svg>
        </button>
        <button on:click={()=>clickAlignButton('top')}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="13" y="8" width="2" height="11" fill="#b8b7b7"/>
                <rect x="9" y="8" width="2" height="7" fill="#b8b7b7"/>
                <rect x="4" y="5" width="16" height="1" fill="#b8b7b7"/>
            </svg>
        </button>
        <button on:click={()=>clickAlignButton('vertical-center')}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="13" y="6" width="2" height="11" fill="#b8b7b7"/>
                <rect x="9" y="8" width="2" height="7" fill="#b8b7b7"/>
                <rect x="4" y="11" width="16" height="1" fill="#b8b7b7"/>
            </svg>
        </button>
        <button on:click={()=>clickAlignButton('bottom')}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="13" y="4" width="2" height="11" fill="#b8b7b7"/>
                <rect x="9" y="8" width="2" height="7" fill="#b8b7b7"/>
                <rect x="4" y="17" width="16" height="1" fill="#b8b7b7"/> 
            </svg>
        </button>
    </div>
    <div>
        <button on:click={()=>clickAlignButton('down')}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="8" width="4" height="10" fill="#B8B7B7"/>
                <rect x="9" y="14" width="6" height="4" fill="#B8B7B7"/>
                <rect x="8" y="5" width="1" height="3" fill="#B8B7B7"/>
                <rect x="9" y="5" width="9" height="1" fill="#B8B7B7"/>
                <rect x="17" y="6" width="1" height="8" fill="#B8B7B7"/>
                <rect x="15" y="14" width="3" height="1" fill="#B8B7B7"/>
            </svg>
        </button>
        <button on:click={()=>clickAlignButton('up')}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="5" width="10" height="10" fill="#B8B7B7"/>
                <rect x="15" y="18" width="1" height="3" transform="rotate(-180 15 18)" fill="#B8B7B7"/>
                <rect x="14" y="18" width="9" height="1" transform="rotate(-180 14 18)" fill="#B8B7B7"/>
                <rect x="6" y="17" width="1" height="8" transform="rotate(-180 6 17)" fill="#B8B7B7"/>
                <rect x="8" y="9" width="3" height="1" transform="rotate(-180 8 9)" fill="#B8B7B7"/>
            </svg>
        </button>
    </div>
</main>

<style>
    main {
        margin-left: 31px;
        width: 138px;
        height: 46px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 0;
        padding: 0;
    }

    button {
        width: 23px;
        height: 23px;
        background-color: #ffffff;
        border: 0;
        margin: 0;
        padding: 0;
        border-radius: 0;
    }

    button:hover rect {
        fill: #383838;
    }


    svg {
        margin: 0;
        padding: 0;
    }
    


</style>
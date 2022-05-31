<script>
    
    import { createEventDispatcher } from 'svelte';
    import Select from './dependency/svelte-select/src/Select.svelte';
    

    export let title;
    export let items;
    export let borderStyle = true;

    export let valueWhen = null;
    export let valueDo = null;
    export let valueDetail = null;
    export let type;

    let value = null;


    if (valueWhen != null && type == 'when') {
        value = valueWhen;
    }

    if (valueDo != null && type == 'do') {
        value = valueDo;
    }

    if (valueDetail != null && type == 'detail') {
        value = valueDetail;
    }

    //console.log(value)





	const dispatch = createEventDispatcher();

    function selectFunc(event) {
        dispatch('message', {
            data: event.detail.value,
        });
    }




</script>


<main>

    <div id="wrapper" style="width: 150px; height: 26px;">
        {#if borderStyle == true}
            <div class="input-text-box border-style">
                <div class="input-text-title input-text-font ">
                    <p>{title}</p>
                </div>
                
                <div style="width: 100px;">
                    <form id="form-style">
                        <Select {items} {value} showChevron={true} on:select={selectFunc}></Select>
                    </form>
                </div>
            </div>
        {:else if borderStyle == false}
            <div class="input-text-box">
                <div class="input-text-title input-text-font no-border-style">
                    <p>{title}</p>
                </div>
                
                <div style="width: 100px;">
                    <form id="form-style">
                        <Select {items} {value} showChevron={true} on:select={selectFunc}></Select>
                    </form>
                </div>
            </div>
        {/if}
    </div>

    

</main>





<style>
    main {
        display: flex;
        justify-content: space-around;
    }

    #wrapper {
        display: flex;
        justify-content: space-between;
    }

    .border-style {
        border: 1px solid #FFFFFF;
        border-radius: 2px;
    }

    .border-style:hover {
        border: 1px solid #e2e2e2;
    }


    .input-text-box {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 150px;
        height: 26px;
    }

    

    .no-border-style {
        border: 0;
    }

    #form-style {
        max-width: 98px;
        --height: 20px;
        --border: 1px solid white;
        margin-top: 2px;
    }
    #form-style:hover {
        --border: 1px solid white;
    }
    

    .input-text-font {
        font-family: arial;
        color: #b8b7b7;
        font-size: 12px;
    }

    .input-text-title {
        text-align: left;
        width: 40px;
        height: 16px;
        margin-top: 5px;
        margin-left: 10px;
    }

    .input-text-title p {
        margin-top: 1px;
    }

</style>
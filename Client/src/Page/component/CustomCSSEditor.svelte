<script>
    
    import { createEventDispatcher } from 'svelte';

    export let title;
    export let data;

	const dispatch = createEventDispatcher();

    function changeValue(event) {
        dispatch('message', {
            data: data,
        });
	}

</script>


<main>

    <div id="wrapper" style="width: 150px; height: 200px;" >
        <div id="input-text-box" style="width: 150px; height: 200px">
            <div class="input-text-title input-text-font">
                <p>{title}</p>
            </div>
            <div id="row">
                <textarea id="textarea" type="text" class="input-text input-text-font" bind:value={data}
                on:blur={changeValue}
                placeholder="You can write css!"
                ></textarea>
            </div>
            
        </div>
    </div>

    


</main>








<style>
    main {
        display: flex;
        justify-content: center;
    }

    #wrapper {
        display: flex;
        justify-content: space-between;
    }

    #input-text-box {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        border: 1px solid #FFFFFF;
        border-radius: 2px;
    }

    #row {
        display: flex;
        justify-content: center;
        flex-direction: row;
        width: 150px;
    }

    #input-text-box:hover {
        border: 1px solid #e2e2e2;
    }

    .input-text:focus {
        outline:none;
    }

    .input-text::selection {
        background:#18a0fb5d;
    }

    #input-text-box:focus-within {
        border: 1px solid #18A0FB;
    }

    #input-text-box:focus-within .input-text-title {
        color: #18A0FB;
    }


    .input-text-font {
        font-family: arial;
        color: #b8b7b7;
        font-size: 12px;
    }

    .input-text-title {
        text-align: center;
        width: 70px;
        height: 16px;
        text-align: center;
        margin-top: 5px;
        margin-left: 10px;
    }

    .input-text {
        border: 0;
        width: 140px;
        height: 170px;
        margin-top: 3px;

    }

    .input-text-title p {
        margin-top: 1px;
    }
    
    #textarea{
        height: 170px;
        resize: none;
        color: #383838;
    }

    #textarea::placeholder {
        color: #b8b7b7;
    }






    
    
    #textarea::-webkit-scrollbar {
        width: 4px;
        background-color: #ffffff;
    }

    #textarea:hover::-webkit-scrollbar {
        width: 4px;
    }

    #textarea::-webkit-scrollbar-track {
        width: 4px;
        background-color: transparent;
    }

    #textarea::-webkit-scrollbar-thumb {
        width: 4px;
        border-radius: 2px;
        background-color: #ffffff;
    }

    #textarea:hover::-webkit-scrollbar-thumb {
        width: 4px;
        border-radius: 2px;
        background-color: #E6E6E6;
    }

    #textarea::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }

</style>
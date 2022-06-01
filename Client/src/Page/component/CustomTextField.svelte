<script>
    
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';


    export let data;
    export let type;
    export let title;
    export let dataType;
    export let borderStyle = true;
    export let size = null;


    let textField;


    let width;
    let inputWidth;
    let height = 26;
    let titleWidth = 16;

    onMount(async () => {
        if (title[0] == '') {
            inputWidth = 130;
            textField.style.marginLeft = '5px';
        }

	});


    if (type == 1) {
        width = 148;
        inputWidth = 119;
    }
    else if (type == 2) {
        width = 70;
        inputWidth = 40;
    }

    if (size) {
        width = size[0];
        inputWidth = size[1];
        titleWidth = width - inputWidth;
    }

    if (title[0] == 'Fs') {
        width = 148;
        inputWidth = 118
    }


    

    

    

    

    let dataArchive = data;
	
	//let data=[];

	const dispatch = createEventDispatcher();

	function changeValue1(event) {
        if(event.keyCode==13) {
            if (dataType == 'int' && !isNaN(parseInt(data))) {
                for (let i = 0;i < type; i++) {
                    data[i] = parseInt(data[i]).toString();
                }
                dispatch('message', {
                    data: data,
                });
                event.currentTarget.blur();
            }
            else if (dataType == 'int' && isNaN(parseInt(data))) {
                data = dataArchive;
            }
            else if (dataType == 'string') {
                dispatch('message', {
                    data: data,
                });
                event.currentTarget.blur();
            }
            else if (dataType == 'float') {
                dispatch('message', {
                    data: data,
                });
                event.currentTarget.blur();
            }
        }
	}

    function changeValue2() {
        if (dataType == 'int' && !isNaN(parseInt(data))) {
            for (let i = 0;i < type; i++) {
                data[i] = parseInt(data[i]).toString();
            }
            dispatch('message', {
                data: data,
            });
        }
        else if (dataType == 'int' && isNaN(parseInt(data))) {
            data = dataArchive;
        }
        else if (dataType == 'string') {
            dispatch('message', {
                data: data,
            });
            
        }
	}

    

    

</script>


<main>

    <div id="wrapper" style="width: 150px; height: 26px;">
        {#each title as title, i}
            {#if borderStyle == true}
                <div class="input-text-box border-style" style="width: {width}px; height: {height}px">
                    {#if title !== ''}
                    <div class="input-text-title input-text-font" style:width={titleWidth+'px'}>
                        <p>{title}</p>
                    </div>
                    {/if}
                    <input type="text" bind:this="{textField}" class="input-text input-text-font" bind:value={data[i]}
                        style="width: {inputWidth}px; color: #383838;"
                        on:keypress={changeValue1} 
                        on:blur={changeValue2}
                        onClick="this.select();"
                        >
                </div>
            {:else if borderStyle == false}
                <div class="input-text-box" style="width: {width}px; height: {height}px">
                    {#if title !== ''}
                    <div class="input-text-title input-text-font" style:width={titleWidth+'px'}>
                        <p>{title}</p>
                    </div>
                    {/if}
                    <input type="text" bind:this="{textField}" class="input-text input-text-font no-border-style" bind:value={data[i]}
                        style="width: {inputWidth}px; color: #383838;"
                        on:keypress={changeValue1} 
                        on:blur={changeValue2}
                        onClick="this.select();"
                        >
                </div>
            {/if}
        {/each}
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

    .border-style {
        border: 1px solid #FFFFFF;
    }

    .border-style:hover {
        border: 1px solid #e2e2e2;
    }

    .border-style:focus {
        outline: none;
    }

    .border-style::selection {
        background: #18a0fb5d;
    }

    .border-style:focus-within {
        border: 1px solid #18A0FB;
    }

    .border-style:focus-within .input-text-title {
        color: #18A0FB;
    }

    


    .input-text-box {
        margin: 0;
        padding: 0;
        display: flex;
        height: 26px;
        flex-direction: row;
        justify-content: space-between;
        border-radius: 2px;
    }

    .input-text-box:focus {
        outline:none;
    }

    .no-border-style {
        border: 0 !important;
    }
    


    .input-text-font {
        color: #b8b7b7;
        font-size: 12px;
    }

    .input-text-title {
        text-align: left;
        width: 16px;
        height: 16px;
        margin-top: 4px;
        margin-left: 10px;
    }

    .input-text {
        border: 0;
        height: 23px;
        margin-top: 1px;
        padding-left: 5px;
        outline:none;
    }

    .input-text-title p {
        margin-top: 1px;
    }

    input::selection {
        background: #18A0FB30;
    }







</style>
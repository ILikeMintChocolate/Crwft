<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount, afterUpdate } from 'svelte';

    export let theme;
    export let currentPageMode;
    export let mouseType;

    

    afterUpdate(() => {
		if (mouseType == 1) {
            toolButtonArray.forEach(element => {
                element.color = theme.backgroundColor;
                element.strokeColor = theme.fontColor1;
                element.hoverColor = theme.hoverColor;
            });

            toolButtonArray[0].color = theme.mainColor;
            toolButtonArray[0].strokeColor = theme.fontColor2;
            toolButtonArray[0].hoverColor = theme.mainColor;
        }
	})

    

    const dispatch = createEventDispatcher();

    class ToolButtonClass {
        constructor(id, color, strokeColor, hoverColor, path) {
            this.id = id;
            this.color = color;
            this.strokeColor = strokeColor;
            this.hoverColor = hoverColor;
            this.path = path;
        }
    }

    let toolButtonArray = [
        new ToolButtonClass('click', theme.mainColor, theme.backgroundColor, theme.mainColor, 'm19.074 33.083.63-17.783L32.48 27.683l-7.378 1.024-6.029 4.376Z'), 
        new ToolButtonClass('rect', theme.backgroundColor, theme.fontColor1, theme.hoverColor, 'M17.5 17.5h15v15h-15z'), 
        new ToolButtonClass('circle', theme.backgroundColor, theme.fontColor1, theme.hoverColor, 'M16.5 25c0-4.5 4-8.5 8.5-8.5s8.5 4 8.5 8.5-4 8.5-8.5 8.5-8.5-4-8.5-8.5Z'), 
        new ToolButtonClass('text', theme.backgroundColor, theme.fontColor1, theme.hoverColor, 'M18.5 20v-3.5h7m7 3.5v-3.5h-7m0 0v15m-4.5 0h9'), 
        new ToolButtonClass('move', theme.backgroundColor, theme.fontColor1, theme.hoverColor, 'M19.949 31.755c.359.32 1.795 2.245 2.871 2.245h4.667c.838-.107 2.013-.947 2.013-3V20.5h-2V24v-5.5h-2V24v-7.5h-2V24v-5.5h-2v9l-4.064-2.481L16 26.943l3.949 4.812Z')
    ]
        
    function selectToolMode(event) {
        let index;
        if (event.path[1].id == 'tool-section-click-icon')
            index = 0;
        else if (event.path[1].id == 'tool-section-rect-icon')
            index = 1;
        else if (event.path[1].id == 'tool-section-circle-icon')
            index = 2;
        else if (event.path[1].id == 'tool-section-text-icon')
            index = 3;
        else if (event.path[1].id == 'tool-section-move-icon')
            index = 4;
        else if (event.path[2].id == 'tool-section-click-icon')
            index = 0;
        else if (event.path[2].id == 'tool-section-rect-icon')
            index = 1;
        else if (event.path[2].id == 'tool-section-circle-icon')
            index = 2;
        else if (event.path[2].id == 'tool-section-text-icon')
            index = 3;
        else if (event.path[2].id == 'tool-section-move-icon')
            index = 4;

        dispatch('message', {
            data: index+1,
        });
        
        
        toolButtonArray.forEach(element => {
            element.color = theme.backgroundColor;
            element.strokeColor = theme.fontColor1;
            element.hoverColor = theme.hoverColor;
        });

        toolButtonArray[index].color = theme.mainColor;
        toolButtonArray[index].strokeColor = theme.fontColor2;
        toolButtonArray[index].hoverColor = theme.mainColor;



    }

    


    
</script>


<main>
    <div id="tool-section">
        {#if currentPageMode == 'component'}
            {#each toolButtonArray as toolButton}
            
                <button
                    id="tool-section-{toolButton.id}-icon"
                    class="tool-button"
                    style="background-color: {toolButton.color}"
                    onmouseover="this.style.backgroundColor='{toolButton.hoverColor}';"
                    onmouseleave="this.style.backgroundColor='{toolButton.color}';"
                >
                    <svg width="50" height="50" fill="none" on:click={selectToolMode}>
                        <path d={toolButton.path} stroke={toolButton.strokeColor} on:click={selectToolMode} />
                    </svg>
                </button>
            {/each}
        {:else if currentPageMode == 'page'}
            <button
                id="tool-section-click-icon"
                class="tool-button"
                style="background-color: #18A0FB"
            >
                <svg width="50" height="50" fill="none" on:click={selectToolMode}>
                    <path d='m19.074 33.083.63-17.783L32.48 27.683l-7.378 1.024-6.029 4.376Z' stroke='#FFFFFF' on:click={selectToolMode} />
                </svg>
            </button>
        {/if}

        
        
    </div>
    
</main>

<style>
    main {
        height: 50px;
        width: 250px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .tool-button {
        width: 50px;
        height: 50px;
        border: 0;
        border-radius: 0;
        margin: 0;
        padding: 0;
    }


</style>
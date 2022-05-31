<script>
    import { createEventDispatcher } from 'svelte';
  	const dispatch = createEventDispatcher();
    function selectRadioButton(event) {
        dispatch('message1', {
            data: event.currentTarget.value,
        });
    }


    let count = 0;

    function clickAddButton() {
        count++;
        if (count==2) {
            dispatch('message2', {
                data: 'AddButton',
            });
            count = 0;
        }
    }

    

</script>

<main>
    <div id="select-page-or-component" >
        <div class="flex-column" >
            <input type='radio'  class="page-or-component-input-class" value='Page' name='pageOrComponent' id='radioProperty' on:change={selectRadioButton} checked/>
            <label for='radioProperty' class="page-or-component-label-class" >Page</label>
        </div>
        <div class="flex-column">
            <input type='radio' class="page-or-component-input-class" value='Component' name='pageOrComponent' on:change={selectRadioButton} id='radioEvent'/>
            <label for='radioEvent' class="page-or-component-label-class" >Component</label>
        </div>
        <div class="flex-column">
            <div id="add-button" on:click={clickAddButton}>
                <svg id="add-button-svg" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={clickAddButton}>
                    <rect x="5" y="10" width="11" height="1" fill="#C4C4C4" on:click={clickAddButton}/>
                    <rect x="10" y="5" width="1" height="11" fill="#C4C4C4" on:click={clickAddButton}/>
                </svg>
            </div>
        </div>
        
    </div>
</main>




<style>

    main {
        width: 200px;
        height: 40px;
    }

    #select-page-or-component {
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;
        height: 40px;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
        justify-content: left;
    }

    .page-or-component-input-class {
        visibility:hidden;
        height: 3px;
    }
    .page-or-component-label-class {
        cursor: pointer;
        font-size: 12px;
        color: #8e8e8e;
        width: 80px;
        text-align: center;
        margin-left: -10px;
    }
    
    .page-or-component-input-class:checked + label {
        color: #404040;
        font-weight: 500;
    }

    label {
        user-select: none;
        -moz-user-select: none; 
        -ms-user-select: none; 
        -webkit-user-select: none;
    }

    #add-button {
        width: 21px;
        height: 21px;
        margin-top: 10px;
        padding: 0;

    }

    #add-button:hover {
        background-color: #E6E6E6;
    }

    #add-button-svg {
        width: 21px;
        height: 21px;
    }


</style>
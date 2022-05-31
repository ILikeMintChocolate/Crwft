<script>

    import { afterUpdate } from 'svelte'
    
    import { createEventDispatcher } from 'svelte';

    import CustomTextField from './CustomTextField.svelte';
    import CustomDropDown from './CustomDropDown.svelte';

    export let currentObject;
    export let pageArray;

    let dropDown;

    //console.log(currentObject.Event)

    let heightVar = 26;

    let valueWhen = null;
    let valueDo = null;
    let valueDetail = null;

    if (currentObject.Event.when != null) {
        valueWhen = currentObject.Event.when;
        heightVar = 26;
    }

    if (currentObject.Event.do != null) {
        valueDo = currentObject.Event.do;
        heightVar = 52;
    }

    if (currentObject.Event.detail != null) {
        valueDetail = currentObject.Event.detail;
        heightVar = 105;
    }

    let textField;
    let textFieldData;

	const dispatch = createEventDispatcher();



    let eventProperty;
    let pageList = Array(0);

    function resetEvent() {
        currentObject.Event.when = null;
        currentObject.Event.do = null;
        currentObject.Event.detail = null;
        valueWhen = null;
        valueDo = null;
        valueDetail = null;
        dispatch('reset', {
        });
        heightVar = 26;
    }

    export function refresh(data) {
        currentObject = data;
    }

    afterUpdate(async () => {
        pageList = Array(0);

        pageArray.forEach(element => {
            if (element.path != '//deleted//') {
                pageList[pageList.length] = element.path;
            }
        });
    });


    
    

    
</script>



<main>
    
    <div id="event-property" bind:this={eventProperty}>
        <div id="event-block" style="height:{heightVar}px">

            <CustomDropDown bind:this={dropDown} title={'when'} type={'when'} {valueWhen} {valueDo} {valueDetail} items={['Click', 'Mouse Over']} borderStyle={false} on:message={(event)=>{
                dispatch('when', {
                    data: event.detail.data,
                });
                heightVar = 52;
            }}></CustomDropDown>

            {#if currentObject.Event.when}
                <CustomDropDown title={'do'} type={'do'}  {valueWhen} {valueDo} {valueDetail} items={['Move Page', 'Alert', 'Style']} borderStyle={false} on:message={(event)=>{
                    dispatch('do', {
                        data: event.detail.data,
                    });
                    heightVar = 78;
                }}></CustomDropDown>
            {/if}


            {#if currentObject.Event.do == 'Move Page'}
                <CustomDropDown title={'to'} type={'detail'}  {valueWhen} {valueDo} {valueDetail} items={pageList} borderStyle={false} on:message={(event)=>{
                    dispatch('detail', {
                        data: event.detail.data,
                    });
                    heightVar = 105;
                }}></CustomDropDown>

            {:else if currentObject.Event.do == 'Alert'}
                <CustomTextField type={1} title={[""]} data={[textFieldData]} dataType={'string'} borderStyle={false} on:message={(event)=>{
                    dispatch('detail', {
                        data: event.detail.data[0],
                    });
                    heightVar = 105;
                }}></CustomTextField>

            {:else if currentObject.Event.do == 'Style'}
                <CustomTextField type={1} title={[""]} data={[textFieldData]} dataType={'string'} borderStyle={false} on:message={(event)=>{
                    dispatch('detail', {
                        data: event.detail.data[0],
                    });
                    heightVar = 105;
                }}></CustomTextField>
            {/if}


            {#if currentObject.Event.detail}
                <div id="reset-button-wrapper">
                    <button id="reset-button" on:click={resetEvent}>Reset</button>
                </div>
            {/if}
        </div>
    </div>
    
</main>



<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: top;
    }
    #event-property {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #event-block {
        border: 1px solid white;
        width: 148px;
        border-radius: 2px;
    }

    #event-block:hover {
        border: 1px solid #e2e2e2;
    }

    #event-block:focus-within {
        border: 1px solid #18A0FB;
    }

    #reset-button-wrapper {
        width: 148px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #reset-button {
        width: 60px;
        height: 26px;
        font-family: arial;
        font-size: 12px;
        border: 0;
        background-color: #ffffff;
        color: #b8b7b7;
    }

    #reset-button:hover {
        color: #18A0FB;
    }






    
    
</style>


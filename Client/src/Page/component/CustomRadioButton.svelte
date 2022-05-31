<script>
    import { afterUpdate } from 'svelte'
    import { createEventDispatcher } from 'svelte';
    export let propertyOrEvent;


  	const dispatch = createEventDispatcher();
    function selectRadioButton(event) {
        dispatch('select', {
            data: event.currentTarget.value.toLowerCase(),
        });
    }

    afterUpdate(async () => {
        if (propertyOrEvent == 'property'){
            // @ts-ignore
            document.getElementById('radioProperty').checked = true;
        }
        else if (propertyOrEvent == 'event'){
            // @ts-ignore
            document.getElementById('radioEvent').checked = true;
        }
    });

        
    
            
    

</script>

<main>
    <div id="select-property-or-event" >
        <div class="flex-column" >
            <input type='radio' class="property-or-event-input-class" value='Property' name='propertyOrEvent' id='radioProperty' on:change={selectRadioButton} checked/>
            <label for='radioProperty' class="property-or-event-label-class" >Property</label>
        </div>
        <div class="flex-column">
            <input type='radio' class="property-or-event-input-class" value='Event' name='propertyOrEvent' on:change={selectRadioButton} id='radioEvent'/>
            <label for='radioEvent' class="property-or-event-label-class" >Event</label>
        </div>
    </div>
</main>





<style>

    main {
        width: 200px;
        height: 40px;
    }

    #select-property-or-event {
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

    .property-or-event-input-class {
        visibility:hidden;
        height: 3px;
    }
    .property-or-event-label-class {
        cursor: pointer;
        font-size: 12px;
        color: #8e8e8e;
        width: 50px;
        margin-left: 8px;
    }
    .property-or-event-input-class:checked + label {
        color: #404040;
        font-weight: 500;
    }
</style>
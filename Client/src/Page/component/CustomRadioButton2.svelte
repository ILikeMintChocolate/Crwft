<script>
    import { createEventDispatcher } from 'svelte';
  	const dispatch = createEventDispatcher();
    function selectRadioButton(event) {
        dispatch('message', {
            data: event.currentTarget.value,
        });
    }

    

</script>

<main>
    <div id="select-property-or-event1" >
        <div class="flex-column" >
            <input type='radio'  class="property-or-event-input-class1" value='Property' name='propertyOrEvent1' id='radioProperty1' on:change={selectRadioButton} checked/>
            <label for='radioProperty1' class="property-or-event-label-class1" >Property</label>
        </div>
        <div class="flex-column">
            <input type='radio' class="property-or-event-input-class1" value='Event' name='propertyOrEvent1' on:change={selectRadioButton} id='radioEvent1'/>
            <label for='radioEvent1' class="property-or-event-label-class1" >Event</label>
        </div>
    </div>
</main>




<style>

    main {
        width: 200px;
        height: 40px;
    }

    #select-property-or-event1 {
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

    .property-or-event-input-class1 {
        visibility:hidden;
        height: 3px;
    }
    .property-or-event-label-class1 {
        cursor: pointer;
        font-size: 12px;
        color: #8e8e8e;
        width: 50px;
        margin-left: 8px;
    }
    .property-or-event-input-class1:checked + label {
        color: #404040;
        font-weight: 500;
    }

    label {
        user-select: none;
        -moz-user-select: none; 
        -ms-user-select: none; 
        -webkit-user-select: none;
    }
</style>
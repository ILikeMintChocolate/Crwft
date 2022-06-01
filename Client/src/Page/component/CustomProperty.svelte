<script>
    import {onMount, beforeUpdate, afterUpdate, onDestroy, tick} from 'svelte'

    import CustomRadioButton from './CustomRadioButton.svelte';
    
    import { createEventDispatcher } from 'svelte';

    import CustomTextField from './CustomTextField.svelte';
    import CustomColorPicker from './CustomColorPicker.svelte';
    import CustromHr from './CustomHr.svelte'
    import CustomEventProperty from './CustomEventProperty.svelte';
    import CustomCSSEditor from './CustomCSSEditor.svelte';
    import CustomAlignButton from './CustomAlignButton.svelte';
    import CustomWebRTC from './CustomWebRTC.svelte';
    

    export let type;
    export let currentObject = null;
    export let currentComponent = null;
    export let componentArray = null;
    export let currentSelect;
    export let pageArray;
    export let currentPageMode;
    export let propertyOrEvent = 'property';
    



    class CurrentObjectClass {
        constructor() {
            this.object = null;
            this.index = null;
            this.type = null;
            this.id = null;
            this.x = null;
            this.y = null;
            this.width = null;
            this.height = null;
            this.color = null;
            this.src = null;
            this.rotate = null;
            this.fontSize = null;
            this.stroke = null;
            this.strokeWidth = null;
            this.tagType = null;
            this.Event = new class Event {
                constructor() {
                    this.when = null;
                    this.do = null;
                    this.detail = null;
                }
            };
        }
    }

    class CurrentComponentClass {
        constructor() {
            this.width = null;
            this.height = null;
            this.css = null;
        }
    }

    if (!currentObject) {
        currentObject = new CurrentObjectClass();
    }
    else if (!currentComponent) {
        currentComponent = new CurrentComponentClass();
    }

	const dispatch = createEventDispatcher();



</script>




<main> 

    <div>

        
        {#if currentPageMode == 'component' && type != 'component'}
            <CustomRadioButton {propertyOrEvent} on:select={(event)=>{
                propertyOrEvent = event.detail.data;
            }}></CustomRadioButton>
        {/if}


        {#if propertyOrEvent == 'property'}

            {#if type == 'rect'}
                <div class="blank"></div>

                <CustomAlignButton on:alignObject={(event)=>{
                    dispatch('alignObject', {
                        type: event.detail.type,
                    });
                }}></CustomAlignButton>

                <div class="blank"></div>

                <CustomTextField type={1} title={["ID"]} data={[currentObject.id]} dataType={'string'} on:message={(event)=>{
                    currentObject.id = event.detail.data[0]
                    dispatch('editObjectProperty', {
                        id: currentObject.id,
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomTextField type={2} title={["X", "Y"]} data={[currentObject.x, currentObject.y]} dataType={'int'} on:message={(event)=>{
                    currentObject.x = event.detail.data[0] * 1;
                    currentObject.y = event.detail.data[1] * 1;
                    dispatch('editObjectProperty', {
                        x: parseInt(currentObject.x),
                        y: parseInt(currentObject.y),
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomTextField type={2} title={["W", "H"]} data={[currentObject.width, currentObject.height]} dataType={'int'} on:message={(event)=>{
                    currentObject.width = event.detail.data[0] * 1;
                    currentObject.height = event.detail.data[1] * 1;
                    dispatch('editObjectProperty', {
                        width: currentObject.width,
                        height: currentObject.height,
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomColorPicker title={"Color"} data={currentObject.color} on:message={(event)=>{
                    currentObject.color = event.detail.data
                    dispatch('editObjectProperty', {
                        color: currentObject.color,
                    });
                }}></CustomColorPicker>

                <div class="blank"></div>

                <CustomColorPicker title={"Stroke"} data={currentObject.stroke} data2={currentObject.strokeWidth} on:message={(event)=>{
                    currentObject.stroke = event.detail.data.toUpperCase();
                    currentObject.strokeWidth = event.detail.data2 * 1;
                    dispatch('editObjectProperty', {
                        stroke: currentObject.stroke,
                        strokeWidth: currentObject.strokeWidth,
                    });
                }}></CustomColorPicker>
                
            {:else if type == 'ellipse'}

                <div class="blank"></div>

                <CustomAlignButton on:alignObject={(event)=>{
                    dispatch('alignObject', {
                        type: event.detail.type,
                    });
                }}></CustomAlignButton>

                <div class="blank"></div>

                <CustomTextField type={1} title={["ID"]} data={[currentObject.id]} dataType={'string'} on:message={(event)=>{
                    currentObject.id = event.detail.data[0]
                    dispatch('editObjectProperty', {
                        id: currentObject.id,
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomTextField type={2} title={["X", "Y"]} data={[currentObject.x, currentObject.y]} dataType={'int'} on:message={(event)=>{
                    currentObject.x = event.detail.data[0] * 1;
                    currentObject.y = event.detail.data[1] * 1;
                    dispatch('editObjectProperty', {
                        x: currentObject.x,
                        y: currentObject.y,
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomTextField type={2} title={["W", "H"]} data={[currentObject.width, currentObject.height]} dataType={'int'} on:message={(event)=>{
                    currentObject.width = event.detail.data[0] * 1;
                    currentObject.height = event.detail.data[1] * 1;
                    dispatch('editObjectProperty', {
                        width: currentObject.width,
                        height: currentObject.height,
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomColorPicker title={"Color"} data={currentObject.color} on:message={(event)=>{
                    currentObject.color = event.detail.data
                    dispatch('editObjectProperty', {
                        color: currentObject.color,
                    });
                }}></CustomColorPicker>

                <div class="blank"></div>

                <CustomColorPicker title={"Stroke"} data={currentObject.stroke} data2={currentObject.strokeWidth} on:message={(event)=>{
                    currentObject.stroke = event.detail.data.toUpperCase();
                    currentObject.strokeWidth = event.detail.data2 * 1;
                    dispatch('editObjectProperty', {
                        stroke: currentObject.stroke,
                        strokeWidth: currentObject.strokeWidth,
                    });
                }}></CustomColorPicker>
                

            {:else if type == 'i-text'}
            
                <div class="blank"></div>

                <CustomAlignButton on:alignObject={(event)=>{
                    dispatch('alignObject', {
                        type: event.detail.type,
                    });
                }}></CustomAlignButton>

                <div class="blank"></div>

                <CustomTextField type={1} title={["ID"]} data={[currentObject.id]} dataType={'string'} on:message={(event)=>{
                    currentObject.id = event.detail.data[0]
                    dispatch('editObjectProperty', {
                        id: currentObject.id,
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomTextField type={2} title={["X", "Y"]} data={[currentObject.x, currentObject.y]} dataType={'int'} on:message={(event)=>{
                    currentObject.x = event.detail.data[0] * 1;
                    currentObject.y = event.detail.data[1] * 1;
                    dispatch('editObjectProperty', {
                        x: currentObject.x,
                        y: currentObject.y,
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomTextField type={1} title={["Font Size"]} size={[148, 40]} data={[currentObject.fontSize]} dataType={'int'} on:message={(event)=>{
                    currentObject.fontSize = event.detail.data[0] * 1;
                    dispatch('editObjectProperty', {
                        fontSize: currentObject.fontSize,
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomTextField type={1} title={["Line Space"]} size={[148, 40]} data={[currentObject.lineHeight]} dataType={'float'} on:message={(event)=>{
                    currentObject.lineHeight = event.detail.data[0] * 1;
                    dispatch('editObjectProperty', {
                        lineHeight: currentObject.lineHeight,
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomColorPicker title={"Color"} data={currentObject.color} on:message={(event)=>{
                    currentObject.color = event.detail.data;
                    dispatch('editObjectProperty', {
                        color: currentObject.color,
                    });
                }}></CustomColorPicker>
                
            {:else if type == 'component'}

                <div class="blank"></div>

                <CustomTextField type={1} title={["Width"]} data={[currentComponent.width]} size={[148, 90]} dataType={'int'} on:message={(event)=>{
                    currentComponent.width = event.detail.data[0] * 1;
                    dispatch('editComponentProperty', {
                        width: currentComponent.width,
                    });
                }}></CustomTextField>

                <div class="blank"></div>

                <CustomTextField type={1} title={["Height"]} data={[currentComponent.height]} size={[148, 90]} dataType={'int'} on:message={(event)=>{
                    currentComponent.height = event.detail.data[0] * 1;
                    dispatch('editComponentProperty', {
                        height: currentComponent.height,
                    });
                }}></CustomTextField>

                <div class="blank"></div>
                                
                <CustomCSSEditor title={"Custom CSS"} data={[currentComponent.css]} on:message={(event)=>{
                    currentComponent.css = event.detail.data;
                    dispatch('editComponentProperty', {
                        css: currentComponent.css,
                    });
                }}></CustomCSSEditor>

            {:else if type == 'componentImage'}

                <div class="blank"></div>
                <div class="blank"></div>

                <CustomAlignButton on:alignObject={(event)=>{
                    dispatch('alignComponentImage', {
                        type: event.detail.type,
                    });
                }}></CustomAlignButton>

                <div class="blank"></div>
                
                
                <CustomTextField type={2} title={["X", "Y"]} data={[currentObject.x, currentObject.y]} dataType={'int'} on:message={(event)=>{
                    currentObject.x = event.detail.data[0] * 1;
                    currentObject.y = event.detail.data[1] * 1;
                    dispatch('editComponentImageProperty', {
                        x: currentObject.x,
                        y: currentObject.y,
                    });
                }}></CustomTextField>
            {/if}
            

        {:else if propertyOrEvent == 'event'}
            <CustomEventProperty {currentObject} {pageArray}

            on:when={(event)=>{
                dispatch('eventWhen', {
                    data: event.detail.data,
                });
            }}

            on:do={(event)=>{
                dispatch('eventDo', {
                    data: event.detail.data,
                });
            }}

            on:detail={(event)=>{
                dispatch('eventDetail', {
                    data: event.detail.data,
                });
            }}
            
            on:reset={(event)=>{
                dispatch('eventReset', {
                });
            }}
            
            
            ></CustomEventProperty>
        {/if}

    </div>



    <div>
        <!--<CustomWebRTC></CustomWebRTC>-->
    </div>
    
</main>

<style>
    .blank {
        width: 200px;
        height: 8px;
    }

    main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
</style>

<script>
    
    import { createEventDispatcher} from 'svelte';
    import { onMount } from 'svelte';


    let selection = Array(0);
    let tempSelection = [];
    let tempCount = 0;

    export let componentArray;
    export let mode;
    export let type;
    export let currentSelect;

    const dispatch = createEventDispatcher();


    

    export function refresh(currentSelect2) {

        let checkedBoxes = document.querySelectorAll('input[name=checkbox]:checked');
        let allBoxes = document.querySelectorAll('input[name=checkbox]');
        
        checkedBoxes.forEach((element) => {
            element.checked = false;
        })

        currentSelect2.forEach(element1 => {
            allBoxes.forEach((element2) => {
                if (element1 == element2.id) {
                    element2.checked = true;
                }
            })
        });
        
    }


    class SelectComponentClass {
        constructor(id, src, index, width, height) {
            this.componentId = id;
            this.componentImage = src;
            this.componentIndex = index;
            this.componentObject = null;
            this.width = width;
            this.height = height;
            this.x = 0;
            this.y = 0;
            this.object = null;
        }
    }


    function checkButton(event) {
        console.log(tempSelection)
        console.log(componentArray)

        selection = Array(0);
        let data;
        let index;
        let tempList;

        

        tempSelection.forEach((element1, index1) => {
            componentArray.forEach((element2, index2) => {
                if (element2.index == element1)
                    data = new SelectComponentClass(element2.path, componentArray[index2].componentProperty.imageSrc, index2, 
                    componentArray[index2].defaultObject.box.width, componentArray[index2].defaultObject.box.height)
                    index = index2;
            });
        });

        console.log(event.path[0].defaultValue)
        console.log(index)

        if (event.target.checked) {
            dispatch('selectComponent1', {
                data: data,
            });
        }
        else if (!event.target.checked) {
            dispatch('deselectComponent1', {
                data: event.path[0].defaultValue,
                componentIndex: index,
                list: tempList,

            });
        }

        tempCount = tempSelection.length

        
    }

    onMount(async () => {
        if (mode == 'hide')
            document.getElementById('main').style.display = 'none';
        else if (mode == 'show') {
            document.getElementById('main').style.display = 'block';
            let checkedBoxes = document.querySelectorAll('input[name=checkbox]:checked');
            let allBoxes = document.querySelectorAll('input[name=checkbox]');
            
            checkedBoxes.forEach((element) => {
                element.checked = false;
            })

            currentSelect.forEach(element1 => {
                allBoxes.forEach((element2) => {
                    if (element1 == element2.id) {
                        element2.checked = true;
                    }
                })
            });
        }

    })

    
    

    



</script>


{#if type != 'componentImage'}

<main id="main">

    <div id="title-wrapper" >
        <div class="colomn-center">
            <div id="title" >Add Component</div>
        </div>
    </div>
    <div class="row-center">
        <div id="component-list-wrapper">
            {#each componentArray as list}
                <div>
                    <input name="checkbox" type="checkbox" id={list.index} value={list.index} bind:group={tempSelection} on:change={checkButton}>
                    <label class="list-label" for={list.index}>
                        {list.path}
                    </label>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="img-style" src={list.componentProperty.imageSrc}>
                </div>
            {/each}
        </div>
    </div>
</main>

{/if}






<style>
    main {
        width: 200px;
        display: flex;
        justify-content: left;
        flex-direction: column;
    }

    #title-wrapper {
        display: flex;
        justify-content: center;
        flex-direction: row;
        height: 40px;
    }

    #title {
        font-size: 12px;
        color: #404040;
        font-weight: 500;
        margin-top: -2px;
    }

    .colomn-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .row-center {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #component-list-wrapper {
        width: 150px;
    }

    .list-label {
        font-size: 12px;
    }



    input[type=checkbox] + label {
        display: block;
        margin: 0.2em;
        cursor: pointer;
        padding: 0.2em;
    }

    input[type=checkbox] {
        display: none;
        
    }

    input[type=checkbox] + label:before {
        content: "\0020";
        border: 1px solid #8e8e8e;
        border-radius: 2px;
        display: inline-block;
        width: 10px;
        height: 10px;
        color: transparent;
        margin-right: 10px;
        margin-left: 10px;
        margin-left: -5px;
        transition: .1s;
    }

    input[type=checkbox]:checked + label:before {
        background-color: #18A0FB;
        border-color: #18A0FB;
        color: #fff;
        
    }

    .img-style {
        width: 150px;
        margin-bottom: 10px;
        border: 1px solid #E6E6E6;
        -webkit-user-drag: none;
    }


    
</style>
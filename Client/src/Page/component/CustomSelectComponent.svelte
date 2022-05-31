<script>
    
    import { createEventDispatcher} from 'svelte';


    let selection = Array(0);
    let tempSelection = [];
    let tempCount = 0;

    export let componentArray;
    export let currentSelect;

    console.log(currentSelect)


    currentSelect.forEach((element, index) => {
        tempSelection[index] = element
    });


    const dispatch = createEventDispatcher();


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
        selection = Array(0);
        let data;
        let index;
        let tempList;




        tempSelection.forEach((element1, index1) => {
            componentArray.forEach((element2, index2) => {
                if (element2.path == element1)
                    data = new SelectComponentClass(element2.path, componentArray[index2].componentProperty.imageSrc, index2, 
                    componentArray[index2].defaultObject.box.width, componentArray[index2].defaultObject.box.height)
                    index = index2;
            });
        });

        //tempSelection.forEach((element, i) => {
        //    tempList[i] = new SelectComponentClass(element, componentArray[index2].componentProperty.imageSrc, index2, 
        //            componentArray[index2].defaultObject.box.width, componentArray[index2].defaultObject.box.height)
        //});

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

    /*
    export function refreshFunc(data) {
        tempSelection = null;
        tempSelection = Array(0);
        tempSelection = data;
    }
    */



</script>


<main>
    
    {#each currentSelect as e}
        {e.path}
    {/each}
    
    <div id="title-wrapper" >
        <div class="colomn-center">
            <div id="title" >Add Component</div>
        </div>
    </div>
    <div class="row-center">
        <div id="component-list-wrapper">
            {#each componentArray as list}
                <div>
                    <input type="checkbox" id={list.path} value={list.path} bind:group={tempSelection} on:change={checkButton}>
                    <label class="list-label" for={list.path}>
                        {list.path}
                    </label>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="img-style" src={list.componentProperty.imageSrc}>
                </div>
            {/each}
        </div>
    </div>
</main>






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
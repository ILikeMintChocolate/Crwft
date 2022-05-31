<script>
// @ts-nocheck

    import { createEventDispatcher } from 'svelte';

    import CustomHr from "./CustomHr.svelte";
    import { windowHeight } from '../store.js';
    import { toolSectionHeight } from '../store.js';
    import { radioSection } from '../store.js';

    

    export let pageOrComponent;
    export let pageArray;
    export let componentArray;
    export let currentPageMode;
    export let pageIndex;
    export let componentIndex;
    export let currentComponentObjectArray;
    


    let tempPagePath;
    let dblClickBool1 = false;
    let dblClickBool2 = false;
    let deleteButtonExist1 = false;
    let deleteButtonExist2 = false;
    let deleteButtonBool1 = false;
    let deleteButtonBool2 = false;

    const dispatch = createEventDispatcher();

    let innerHeight = window.innerHeight;



    class PageClass {
        constructor(index, path, canvas, canvasId, canvasWrapperId) {
            this.index = index;
            this.path = path;
            this.canvas = canvas;
            this.zoom = 0.3;
            this.canvasId = canvasId;
            this.canvasWrapperId = canvasWrapperId;
            this.object = new Array(0);
            this.defaultObject = new class DefaultObjectClass {
                constructor() {
                    this.box = null;
                    this.title = null;
                }
            }
            // 조합 추가
        }
    }

    class ComponentClass {
        constructor(index, path, canvas, canvasId, canvasWrapperId) {
            this.index = index;
            this.path = path;
            this.canvas = canvas;
            this.zoom = 0.3;
            this.canvasId = canvasId;
            this.canvasWrapperId = canvasWrapperId;
            this.object = new Array(0);
            this.defaultObject = new class DefaultObjectClass {
                constructor() {
                    this.box = null;
                    this.title = null;
                }
            }
        }
    }






    function selectPageOrComponent(event) {
        pageOrComponent = event.target.value.toLowerCase();
        dispatch('selectPageOrComponent', {
            pageOrComponent: pageOrComponent,
        });
    }

    function clickAddButton() {
        if (pageOrComponent == 'page') {
            //pageArray[pageArray.length] = new PageClass(pageArray.length, '/Page' + pageArray.length ,null,'','');
            //pageIndex = pageArray.length - 1;

            dispatch('createPage', {
                pageOrComponent: pageOrComponent,
                //pageIndex: pageIndex,
            });
        }
        else if (pageOrComponent == 'component') {
            //componentArray[pageArray.length] = new ComponentClass(componentArray.length, '/Component' + componentArray.length ,null,'','');
            //componentIndex = componentArray.length - 1;

            dispatch('createPage', {
                pageOrComponent: pageOrComponent,
                componentIndex: componentArray.length,
            });
        }

        
    }

    function pageButtonDblClick(event) {
        this.readOnly = '';
        tempPagePath = event.currentTarget.value;   
    }

    function compareName(array, path) {
        let bool = false;
        array.forEach((element) => {
            if(element.path == path) {
                bool = true;
            } 
        });
        return bool;
    }

    function returnIndex(array, path) {
        let index = null;
        array.forEach(element => {
            if (element.path == path) {
                index = element.index;
            }
        });
        return index;
    }

    function pageButtonBlur(event) {
        this.readOnly = 'true';

        if (pageOrComponent == 'page' && dblClickBool1) {
            dblClickBool1 = false;
            let bool = compareName(pageArray, event.currentTarget.value)
            let index = returnIndex(pageArray, tempPagePath);
            if (bool == false) {
                pageArray[index].path = event.currentTarget.value;
                //pageArray[index].defaultObject.title.set({
                //    text: tempPagePath,
                //});
                //pageArray[index].canvas.renderAll();
            }
            else {
                event.currentTarget.value = tempPagePath
            }
            event.currentTarget.blur();
            dispatch('pageButtonBlur', {
                pageOrComponent: pageOrComponent,
                pageArray: pageArray,
            });
        }
        else if (pageOrComponent == 'component' && dblClickBool2) {
            dblClickBool2 = false;
            let bool = compareName(componentArray, event.currentTarget.value)
            let index = returnIndex(componentArray, tempPagePath);
            if (bool == false) {
                componentArray[index].path = event.currentTarget.value;
                //componentArray[index].defaultObject.title.set({
                //    text: tempPagePath,
                //});
                //componentArray[index].canvas.renderAll();
            }
            else {
                event.currentTarget.value = tempPagePath
            }
            event.currentTarget.blur();
            dispatch('pageButtonBlur', {
                pageOrComponent: pageOrComponent,
                componentArray: componentArray,
            });
        }
    }

    function pageButtonEnter(event) {
        if (window.event.keyCode == 13) {
            if (pageOrComponent == 'page') {
                dblClickBool1 = true;
                if (event.code == 'Enter' || event.code == 'NumpadEnter') {
                    let bool = compareName(pageArray, event.currentTarget.value)
                    let index = returnIndex(pageArray, tempPagePath);
                    if (bool == false) {
                        pageArray[index].path = event.currentTarget.value;
                        //pageArray[index].defaultObject.title.set({
                        //    text: tempPagePath,
                        //});
                        //pageArray[index].canvas.renderAll();
                    }
                    else {
                        event.currentTarget.value = tempPagePath
                    }
                    event.currentTarget.blur();
                    dispatch('pageButtonEnter', {
                        pageOrComponent: pageOrComponent,
                        pageArray: pageArray,
                    });
                }
            }
            else if (pageOrComponent == 'component') {
                dblClickBool2 = true;
                if (event.code == 'Enter' || event.code == 'NumpadEnter') {
                    let bool = compareName(componentArray, event.currentTarget.value)
                    let index = returnIndex(componentArray, tempPagePath);
                    if (bool == false) {
                        componentArray[index].path = event.currentTarget.value;
                        componentArray[index].defaultObject.title.set({
                            text: tempPagePath,
                        });
                        componentArray[index].canvas.renderAll();
                    }
                    else {
                        event.currentTarget.value = tempPagePath
                    }
                    event.currentTarget.blur();
                    dispatch('pageButtonEnter', {
                        pageOrComponent: pageOrComponent,
                        componentArray: componentArray,
                        componentArrayIndex: index,
                        componentArrayPath: componentArray[index].path,
                    });
                }
                
            }
        }
    }

    function returnDeleteIcon(node) {
        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        );

        iconSvg.setAttribute('fill', 'none');
        iconSvg.setAttribute('width', '21');
        iconSvg.setAttribute('height', '21');
        iconSvg.setAttribute('viewBox', '0 0 21 21');
        iconSvg.setAttribute('stroke', '#C4C4C4');
        iconSvg.classList.add('post-icon');

        iconPath.setAttribute(
            'd',
            'M5 10.5H16'
        );
        iconPath.setAttribute('stroke-width', '1');

        iconSvg.appendChild(iconPath);

        return node.appendChild(iconSvg);
    }   

    function deleteButtonMouseOver(event) {
        if (pageOrComponent == 'page' && !deleteButtonExist1) {
            let deleteButton = document.createElement('button');
            deleteButton.id = 'delete-button';
            event.currentTarget.getElementsByClassName('delete-button-wrapper1')[0].appendChild(deleteButton);
            returnDeleteIcon(deleteButton);
            document.getElementById('delete-button').style.width = '21px';
            document.getElementById('delete-button').style.height = '21px';
            document.getElementById('delete-button').style.backgroundColor = 'transparent';
            document.getElementById('delete-button').style.border = '0';
            document.getElementById('delete-button').style.margin = '0';
            document.getElementById('delete-button').style.marginLeft = '-1px';
            document.getElementById('delete-button').style.padding = '0';

            document.getElementById('delete-button').addEventListener('mouseover', function() {
                document.getElementById('delete-button').style.backgroundColor = '#E6E6E6'; 
            });
            document.getElementById('delete-button').addEventListener('mouseleave', function() {
                document.getElementById('delete-button').style.backgroundColor = '#ffffff'; 
            });
            
            document.getElementById('delete-button').addEventListener('click', function(event) {
                
                deleteButtonBool1 = true;
                
                var el = event.target;
                var elListItem= el.parentNode;
                var elFullList = elListItem.parentNode;
                elFullList.removeChild(elListItem);
                deleteButtonExist1 = false;

                let index;

                if (event.path[0].nodeName == 'path') {
                    pageArray.forEach(element => {
                        if (element.path == event.path[4].getElementsByTagName("input")[0].value){
                            index = element.index;
                        }
                    });
                }
                else if (event.path[0].nodeName == 'svg') {
                    pageArray.forEach(element => {
                        if (element.path == event.path[3].getElementsByTagName("input")[0].value){
                            index = element.index;
                        }
                    });
                }

                pageArray[index].path = '//deleted//';

                if (pageIndex == index) {
                    let temp = pageArray.find((e) => e.path != '//deleted//');
                    if (temp == undefined)
                        pageIndex = 10000;
                    else 
                        pageIndex = temp.index;
                }

                dispatch('deletePage', {
                    pageOrComponent: pageOrComponent,
                    pageArray: pageArray,
                    pageIndex: pageIndex,
                });

            }, false);
            
            
            deleteButtonExist1 = true;
        }

        else if (pageOrComponent == 'component' && !deleteButtonExist2) {
            let deleteButton = document.createElement('button');
            deleteButton.id = 'delete-button';
            event.currentTarget.getElementsByClassName('delete-button-wrapper2')[0].appendChild(deleteButton);
            returnDeleteIcon(deleteButton);
            document.getElementById('delete-button').style.width = '21px';
            document.getElementById('delete-button').style.height = '21px';
            document.getElementById('delete-button').style.backgroundColor = 'transparent';
            document.getElementById('delete-button').style.border = '0';
            document.getElementById('delete-button').style.margin = '0';
            document.getElementById('delete-button').style.marginLeft = '-1px';
            document.getElementById('delete-button').style.padding = '0';

            document.getElementById('delete-button').addEventListener('mouseover', function() {
                document.getElementById('delete-button').style.backgroundColor = '#E6E6E6'; 
            });
            document.getElementById('delete-button').addEventListener('mouseleave', function() {
                document.getElementById('delete-button').style.backgroundColor = '#ffffff'; 
            });
            
            document.getElementById('delete-button').addEventListener('click', function(event) {
                deleteButtonBool2 = true;
                
                var el = event.target;
                var elListItem= el.parentNode;
                var elFullList = elListItem.parentNode;
                elFullList.removeChild(elListItem);
                deleteButtonExist2 = false;

                let index;


                if (event.path[0].nodeName == 'path') {
                    componentArray.forEach(element => {
                        if (element.path == event.path[4].getElementsByTagName("input")[0].value){
                            index = element.index;
                        }
                    });
                }
                else if (event.path[0].nodeName == 'svg') {
                    componentArray.forEach(element => {
                        if (element.path == event.path[3].getElementsByTagName("input")[0].value){
                            index = element.index;
                        }
                    });
                }

                componentArray[index].path = '//deleted//';

                if (componentIndex == index) {
                    let temp = componentArray.find((e) => e.path != '//deleted//');
                    if (temp == undefined)
                        componentIndex = 10000;
                    else 
                        componentIndex = temp.index;
                }

                dispatch('deletePage', {
                    pageOrComponent: pageOrComponent,
                    componentArray: componentArray,
                    componentIndex: componentIndex,
                });

            }, false);
            
            
            deleteButtonExist2 = true;
        }
    }

    function deleteButtonMouseLeave(event) {
        if (pageOrComponent == 'page') {
            let childButton = event.currentTarget.getElementsByTagName("button");
            childButton[0].remove();
            deleteButtonExist1 = false;
        }
        else if (pageOrComponent == 'component') {
            let childButton = event.currentTarget.getElementsByTagName("button");
            childButton[0].remove();
            deleteButtonExist2 = false;
        }
    }

    function changePage(event) {
        if (pageOrComponent == 'page') {
            if (!deleteButtonBool1) {
                currentPageMode = 'page';

                let path = null;
                let index = null;

                if (event.target.value != null)
                    path = event.target.value;

                try {
                    if (event.target.getElementsByTagName("input")[0].value != null)
                        path = event.target.getElementsByTagName("input")[0].value;
                } catch (error) { }
                
                try {
                    if (path == null) {
                        path = event.target.parentNode.getElementsByTagName("input")[0].value;
                    } 
                } catch (error) { }
                
                pageIndex = returnIndex(pageArray, path);

                dispatch('changePageComponent', {
                    pageOrComponent: pageOrComponent,
                    pageIndex: pageIndex,
                });
            }
            else {
                deleteButtonBool1 = false;
            }
        }
        else if (pageOrComponent == 'component') {
            
            if (!deleteButtonBool2) {
                
                currentPageMode = 'component';

                let path = null;
                let index = null;

                
                if (event.target.value != null)
                    path = event.target.value;

                try {
                    if (event.target.getElementsByTagName("input")[0].value != null)
                        path = event.target.getElementsByTagName("input")[0].value;
                } catch (error) { }


                try {
                    if (path == null) {
                        path = event.target.parentNode.getElementsByTagName("input")[0].value;
                    } 
                } catch (error) { }

                
                componentIndex = returnIndex(componentArray, path);

                dispatch('changePageComponent', {
                    pageOrComponent: pageOrComponent,
                    componentIndex: componentIndex,
                    mouseType: 1,
                });
            }
            else {
                deleteButtonBool2 = false;
            }
        }
    }


    function clickActiveObject(event) {
        
        let objId;
        
        if (event.target.value != null)
            objId = event.target.value;

        try {
            if (event.target.getElementsByTagName("div")[1].innerText != null)
                objId = event.target.getElementsByTagName("div")[1].innerText;
        } catch (error) { }

                
        try {
            if (objId == null) {
                objId = event.target.parentNode.getElementsByTagName("div")[1].innerText;
            } 
        } catch (error) { }

        dispatch('clickActiveObject', {
            objId: objId,
        });
        
    }


</script>
<main style:width={'200px'} style:height={innerHeight-$windowHeight-$toolSectionHeight+'px'}>

    <div class="flex-column">

        <CustomHr/>

        <div id="pageOrComponent-wrapper-1" class="flex-row center">
            <div id="pageOrComponent-wrapper-2" class="flex-column">
                <div id="pageOrComponent-wrapper-3" class="flex-row space-between">

                    <div class="flex-row">
                        <input type='radio' class="property-or-event-input-class" value='Page' name='pageOrComponent' id='radioPage' on:change={selectPageOrComponent} checked/>
                        <label for='radioPage' class="property-or-event-label-class">Page</label>
                    </div>
                    
                    <div class="flex-row">
                        <input type='radio' class="property-or-event-input-class" value='Component' name='pageOrComponent' on:change={selectPageOrComponent} id='radioComponent'/>
                        <label for='radioComponent' class="property-or-event-label-class">Component</label>
                    </div>
                    
                    <button id="add-button" on:click={clickAddButton}>
                        <svg id="add-button-svg" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="10" width="11" height="1" fill="#C4C4C4"/>
                            <rect x="10" y="5" width="1" height="11" fill="#C4C4C4"/>
                        </svg>
                    </button>
                    
                </div>
            </div>
        </div>


        {#if pageOrComponent == 'page'}
            <div style="height: {innerHeight-$windowHeight-$toolSectionHeight-$radioSection-2}px;" class="scroll-style">
                {#each pageArray as element}
                    {#if element.path !== '//deleted//'}
                        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                        <div class="layer-wrapper-1 flex-row center"  
                            on:mouseover={deleteButtonMouseOver} 
                            on:mouseleave={deleteButtonMouseLeave}
                            on:click={changePage}>
                            <div class="layer-wrapper-2 flex-column">
                                <div class="layer-wrapper-3 flex-row space-between">
                                    
                                    <div class="icon">
                                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H5V1H1V13H9V5H10V14H0V0Z" fill="#8e8e8e"/>
                                            <rect x="5" width="1" height="5" fill="#8e8e8e"/>
                                            <path d="M5 5V4H10V5H5Z" fill="#8e8e8e"/>
                                            <path d="M9.99805 3.99806L9.29094 4.70517L5.29289 0.707122L6 1.5187e-05L9.99805 3.99806Z" fill="#8e8e8e"/>
                                        </svg>
                                    </div>

                                    <input type="text" class="page-button-title"
                                        value={element.path} readonly="true" 
                                        on:dblclick={pageButtonDblClick} 
                                        on:blur={pageButtonBlur}
                                        on:keyup|preventDefault={pageButtonEnter}
                                        >

                                    <div class="delete-button-wrapper1">
                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    {/if}

                {/each}
            </div>
        {:else if pageOrComponent == 'component'}
            <div style="height:240px;" class="scroll-style">
                {#each componentArray as element}
                    {#if element.path !== '//deleted//'}
                        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                        <div class="layer-wrapper-1 flex-row center"  
                            on:mouseover={deleteButtonMouseOver} 
                            on:mouseleave={deleteButtonMouseLeave}
                            on:click={changePage}>
                            <div class="layer-wrapper-2 flex-column">
                                <div class="layer-wrapper-3 flex-row space-between">
                                    
                                    <div class="icon">
                                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="5.5" width="11" height="6" stroke="#8E8E8E"/>
                                            <rect x="2.5" y="3.5" width="2" height="2" stroke="#8E8E8E"/>
                                            <rect x="7.5" y="3.5" width="2" height="2" stroke="#8E8E8E"/>
                                        </svg>
                                    </div>

                                    <input type="text" class="page-button-title"
                                        value={element.path} readonly="true" 
                                        on:dblclick={pageButtonDblClick} 
                                        on:blur={pageButtonBlur}
                                        on:keyup|preventDefault={pageButtonEnter}
                                        >

                                    <div class="delete-button-wrapper2">
                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    {/if}

                {/each}
            </div>
            <CustomHr/>

        {/if}

        {#if currentPageMode == 'component' && pageOrComponent == 'component'}
            <div class="flex-row center" id="component-section-object-title-wrapper-1">
                <div class="flex-column center" id="component-section-object-title-wrapper-2">
                    <div id="component-section-object-title-wrapper-3">
                        Object
                    </div>
                </div>
            </div>

            <div class="scroll-style" style="height: {innerHeight - 412}px;">
                <div class="page-array-box-2">
                    {#each currentComponentObjectArray as element}
                        {#if element.object != null}
                            {#if element.object.id != '//**//'}
                                <!--svelte-ignore a11y-mouse-events-have-key-events-->
                                <div class="object-button-wrapper-1 flex-row center" on:click={clickActiveObject}>
                                    <div class="object-button-wrapper-2 flex-column">
                                        <div class="object-button-wrapper-3 flex-row space-between">

                                            {#if element.tagType == 'rect'}
                                                <div class="icon">
                                                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0.5" y="2.5" width="9" height="9" stroke="#8e8e8e"/>
                                                    </svg>
                                                </div>

                                            {:else if element.tagType == 'ellipse'}
                                                <div class="icon">
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="5" cy="5" r="4.5" stroke="#8E8E8E"/>
                                                    </svg>
                                                </div>

                                            {:else if element.tagType == 'i-text'}
                                                <div class="icon">
                                                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect y="2" width="1" height="3" fill="#8E8E8E"/>
                                                        <rect x="1" y="3" width="1" height="7" transform="rotate(-90 1 3)" fill="#8E8E8E"/>
                                                        <rect x="4" y="3" width="1" height="8" fill="#8E8E8E"/>
                                                        <rect x="8" y="2" width="1" height="3" fill="#8E8E8E"/>
                                                        <rect x="2" y="12" width="1" height="5" transform="rotate(-90 2 12)" fill="#8E8E8E"/>
                                                    </svg>
                                                </div>
                                            {/if}
                                            

                                            <div class="object-button-title">{element.object.id}</div>

                                            <div class="delete-button-wrapper2">
                                        
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            {/if}
                        {/if}
                    {/each}
                </div>
            </div>
        {/if}
        




    </div>


</main>




<style>


    .flex-row {
        display: flex;
        flex-direction: row;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .center {
        justify-content: center;
    }

    .left {
        justify-content: left;
    }

    .space-between {
        justify-content: space-between;
    }








    #pageOrComponent-wrapper-1 {
        width: 200px;
        height: 40px;
    }

    #pageOrComponent-wrapper-2 {
        width: 150px;
        height: 40px;
        justify-content: center;
    }

    #pageOrComponent-wrapper-3 {
        width: 150px;
        height: 20px;
        margin-top: 3px;
        
    }

    .property-or-event-input-class {
        visibility:hidden;
        height: 1px;
        width: 1px;
    }
    .property-or-event-label-class {
        cursor: pointer;
        font-size: 12px;
        color: #8e8e8e;
        margin-left: -9px;
    }
    .property-or-event-input-class:checked + label {
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
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        background-color: transparent;
    }

    #add-button:hover {
        background-color: #E6E6E6;
    }






    .layer-wrapper-1 {
        width: 200px;
        height: 40px;
    }

    .layer-wrapper-2 {
        width: 150px;
        height: 40px;
        justify-content: center;
    }

    .layer-wrapper-3 {
        width: 150px;
        height: 20px;
        margin: 0;
        padding: 0;
    }

    .icon {
        margin-left: 2px;
    }

    .delete-button-wrapper1 {
        width: 20px;
        width: 20px;
    }

    .delete-button-wrapper2 {
        width: 20px;
        width: 20px;
    }

    .page-button-title {
        color: #404040;
        font-size: 12px;
        font-weight: 600;
        width: 90px;
        border: 0;
        height: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: 20px;
        margin-top: 1px;
    }

    .page-button-title:focus {
        border: 0;
        outline:none;
    }

    .page-button-title::selection {
        background-color: #c2e4ff;
    }




    .object-button-wrapper-1 {
        width: 200px;
        height: 40px;
    }

    .object-button-wrapper-2 {
        width: 150px;
        height: 40px;
        justify-content: center;
    }

    .object-button-wrapper-3 {
        width: 150px;
        height: 20px;
        margin: 0;
        padding: 0;
    }

    .object-button-title {
        color: #404040;
        font-size: 12px;
        width: 90px;
        border: 0;
        height: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: 20px;
        margin-top: 2px;
    }



    .scroll-style {
        overflow: scroll;
        overflow-x: hidden;
    }

    .scroll-style::-webkit-scrollbar {
        width: 0px;
    }

    .scroll-style:hover::-webkit-scrollbar {
        width: 4px;
    }

    .scroll-style::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .scroll-style::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: #E6E6E6;
    }

    .scroll-style::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }


    #page-layer-wrapper {
        width: 200px;
    }


    #component-section-object-title-wrapper-1 {
        width: 200px;
        height: 40px;
    }

    #component-section-object-title-wrapper-2 {
        width: 150px;
        height: 40px;
    }

    #component-section-object-title-wrapper-3 {
        width: 150px;
        height: 20px;
        font-size: 12px;
        color: #404040;
        font-weight: 500;
    }


</style>
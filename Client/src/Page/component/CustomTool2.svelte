<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let zoom;
    function showPreview() {
        dispatch('showPreview', {
            
        });
    }
    function setZoomDefault(){
        dispatch('setZoomDefault', {
            
        });
    }



    function upload(){
        dispatch('upload', {
            
        });
    }

    function load() {
        dispatch('load', {
            
        });
    }
    
</script>


<main>

    <div>
        <button on:click={()=>{
            dispatch('consoleSomething', {
            
            });
        }}>출력</button>
    </div>

    <div>
        <button on:click={upload}>업로드</button>
    </div>

    <div>
        <button on:click={load}>불러오기</button>
    </div>


    <div class="flex-column-center">
        <div id="show-preview-button" class="flex-column-center" on:click={showPreview}>
            <div class="flex-row-center">
                <svg width="12" height="14" fill="none">
                    <path d="M0 12.259V1.74104C0 0.969246 0.837214 0.488375 1.50387 0.877258L10.5192 6.13622C11.1807 6.5221 11.1807 7.4779 10.5192 7.86378L1.50387 13.1227C0.837214 13.5116 0 13.0308 0 12.259Z" fill="#55B664"/>
                </svg>
            </div>
        </div>
        
    </div>

    <div class="wrapper">
        <div id="zoom-button" class="flex-column-center" on:click={setZoomDefault}>
            <div class="flex-row-center">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style="margin-top: 5px;">
                    <circle cx="5.5" cy="5.5" r="5" stroke="#949494"/>
                    <rect x="9" y="9.70711" width="1" height="4" transform="rotate(-45 9 9.70711)" fill="#949494"/>
                    <rect x="3" y="5" width="5" height="1" fill="#949494"/>
                    <rect x="5" y="8" width="5" height="1" transform="rotate(-90 5 8)" fill="#949494"/>
                </svg>
                <div id="zoom-title">
                    {zoom} %
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        height: 50px;
        width: 300px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .flex-column-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .flex-row-center {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #show-preview-button {
        width: 50px;
        height: 50px;
    }

    #show-preview-button:hover {
        background-color: #E6E6E6;
    }

    #zoom-button {
        width: 150px;
        height: 50px;
    }

    #zoom-button:hover {
        background-color: #E6E6E6;
    }

    #zoom-title {
        padding-left: 20px;
        cursor: default;
        user-select: none;
        -moz-user-select: none; 
        -ms-user-select: none; 
        -webkit-user-select: none;

    }


</style>
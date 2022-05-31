<script>
    
    import { createEventDispatcher } from 'svelte';
    import HsvPicker from './dependency/HsvPicker.svelte';

    export let title;
    export let data;
    export let data2 = 0;

    
    let wrapper;
    let inputTextBox;
    let colorPreview;
    let ifStrokeType = false;

    if (title == 'Stroke') 
        ifStrokeType = true;

    //data =  data.toUpperCase();
    

    let dataArchive = data;
    let dataArchive2 = data2;
	
	const dispatch = createEventDispatcher();

    function hexToRgbA(hex){
        hex = '#' + hex;
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            // @ts-ignore
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
        }
    }

	function changeValue1(event) {
        if(event.keyCode==13) {
            if (ifStrokeType) {
                if (hexToRgbA(data) && !isNaN(data2)) {
                    dispatch('message', {
                        data: data,
                        data2: data2,
                    });
                    dataArchive = data;
                    dataArchive2 = data2;
                }
                else {
                    data = dataArchive
                    data2 = dataArchive2;
                }
            }
            else {
                if (hexToRgbA(data)) {
                    dispatch('message', {
                        data: data,
                        data2: data2,
                    });
                    dataArchive = data;
                }
                else {
                    data = dataArchive
                }
            }
        }
	}

    function changeValue2() {
        if (ifStrokeType) {
            if (hexToRgbA(data) && !isNaN(data2)) {
                dispatch('message', {
                    data: data,
                    data2: data2,
                });
                dataArchive = data;
                dataArchive2 = data2;
            }
            else {
                data = dataArchive
                data2 = dataArchive2;
            }
        }
        else {
            if (hexToRgbA(data)) {
                dispatch('message', {
                    data: data,
                    data2: data2,
                });
                dataArchive = data;
            }
            else {
                data = dataArchive
            }
        }
	}

    let openColorPickerBool = false;

    function openColorPicker() {
        openColorPickerBool = !openColorPickerBool;
            
        if (openColorPickerBool) {
            wrapper.style.height = '202px';
            inputTextBox.style.height = '203px';
            colorPreview.focus();
            wrapper.focus();
        }
        else {
            wrapper.style.height = '52px';
            inputTextBox.style.height = '52px';
        }
    }
    



    function colorCallback(rgba) {
        colorPreview.focus();
        wrapper.focus();
        data = RGBAToHex(rgba.detail.r, rgba.detail.g, rgba.detail.b, rgba.detail.a);
        dispatch('message', {
            data: data,
            data2: data2,
        });
        dataArchive = data;
    }

    function RGBAToHex(r, g, b, a) {
        let rHex = r.toString(16);
        let gHex = g.toString(16);
        let bHex = b.toString(16);
        let aHex = Math.round(a * 255).toString(16);
        if (rHex.length == 1)
            rHex = "0" + rHex;
        if (gHex.length == 1)
            gHex = "0" + gHex;
        if (bHex.length == 1)
            bHex = "0" + bHex;
        if (a.length == 1)
            aHex = "0" + aHex;
        if (aHex == 'ff')
            return (rHex + gHex + bHex).toUpperCase();
        else
            return (rHex + gHex + bHex + aHex).toUpperCase();

    }

    





    

</script>


<main>

    <div id="wrapper" bind:this="{wrapper}" style="width: 150px; height: 52px;" >
        <div id="input-text-box" bind:this="{inputTextBox}" style="width: 150px; height: 52px">
            <div class="input-text-title input-text-font">
                <p>{title}</p>
            </div>
            <div id="row">
                <button id="color-preview" bind:this="{colorPreview}"  style="background-color: #{data};" on:click={openColorPicker}></button>
                <div class="two-in-line">
                    {#if ifStrokeType}
                        <input type="text" class="input-text input-text-font" bind:value={data}
                        style="width: 55px; color: #383838; text-transform:uppercase;"
                        on:keypress={changeValue1} 
                        on:blur={changeValue2}
                        >
                        <input type="text" class="input-text input-text-font" bind:value={data2}
                        style="width: 38px; color: #383838; text-transform:uppercase;"
                        on:keypress={changeValue1} 
                        on:blur={changeValue2}
                        >
                    {:else}
                        <input type="text" class="input-text input-text-font" bind:value={data}
                        style="width: 100px; color: #383838; text-transform:uppercase;"
                        on:keypress={changeValue1} 
                        on:blur={changeValue2}
                        >
                    {/if}
                </div>
            </div>
            
            {#if openColorPickerBool}
                <div id='hsvPickerWrapper'>
                    <HsvPicker on:colorChange={colorCallback} startColor={'#'+data}/>
                </div>
            {/if}

        </div>
    </div>

    


</main>








<style>
    main {
        display: flex;
        justify-content: center;
    }

    #wrapper {
        display: flex;
        justify-content: space-between;
    }

    #input-text-box {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        border: 1px solid #FFFFFF;
        border-radius: 2px;
    }

    #row {
        display: flex;
        justify-content: left;
        flex-direction: row;
    }

    #input-text-box:hover {
        border: 1px solid #e2e2e2;
    }

    .input-text:focus {
        outline:none;
    }

    .input-text::selection {
        background:#18a0fb5d;
    }

    #input-text-box:focus-within {
        border: 1px solid #18A0FB;
    }
    

    .input-text-font {
        font-family: arial;
        color: #b8b7b7;
        font-size: 12px;
    }

    .input-text-title {
        text-align: center;
        width: 16px;
        height: 16px;
        text-align: center;
        margin-top: 5px;
        margin-left: 10px;
    }

    .input-text {
        border: 0;
        height: 23px;
        margin-top: 3px;
        margin-right: 8px;
        
    }

    .input-text-title p {
        margin-top: 1px;
    }

    .two-in-line {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    #color-preview {
        width: 16px;
        height: 16px;
        border-radius: 2px;
        margin-top: 6px;
        margin-left: 10px;
        margin-right: 10px;
        border: 1px solid #ebebeb;
    }

    #input-text-box:focus-within .input-text-title {
        color: #18A0FB;
    }

</style>
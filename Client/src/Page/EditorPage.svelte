<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400&display=swap" rel="stylesheet" type='text/css'>


<script>
    import { doc, setDoc, getDoc } from "firebase/firestore";
    

    //const firebaseConfig = {
    //    apiKey: "AIzaSyDEZQSqcTsgGP1h39f1KY_jYa9vvlnVcKs",
    //    authDomain: "crwft-db1eb.firebaseapp.com",
    //    projectId: "crwft-db1eb",
    //    storageBucket: "crwft-db1eb.appspot.com",
    //    messagingSenderId: "301560353293",
    //    appId: "1:301560353293:web:2ce6281a58c7ee3d12fb44"
    //};
    //
    //const app = initializeApp(firebaseConfig);
    //const db = getFirestore(app);


    import CustomTool1 from './component/CustomTool1.svelte'
    import CustomTool2 from './component/CustomTool2.svelte'
    import CustomLayer from './component/CustomLayer.svelte'
    import CustomProperty from './component/CustomProperty.svelte'
    import CustomSelectComponent from './component/CustomSelectComponent.svelte'

    import { windowHeight } from './store.js';
    import { toolSectionHeight } from './store.js';
    import { radioSection } from './store.js';

    import { onMount } from "svelte";
    import { fabric } from "fabric";
    
    import { userUID } from './store.js';
    import { loadArray } from './store.js';
    import { firebaseDB } from './store.js';
    import { firebaseApp } from './store.js';

    export let params = {}

    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    let CustomPropertyChild;
    let CustomSelectComponentChild;
    let CustomSelectComponentChild2;


    //$userUID = 'Kolhg56pseZMgMPrq1Ou6E6O1HE2';



    class ThemeClass {
        constructor() {
            this.mainColor = '#18A0FB';         // 메인색상
            this.backgroundColor = '#FFFFFF';   // 배경색상
            this.fontColor1 = '#404040';        // 폰트색상1 - 배경이 배경색상일때
            this.fontColor2 = '#FFFFFF';        // 폰트색상2 - 배경이 메인색상일때
            this.hoverColor = '#E6E6E6';        // 마우스 오버시 색상
        }
    }

    class CurrentObjectClass {
        constructor() {
            this.object = null;
            this.activeObject = null;
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
            this.lineHeight = null;
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

    class PageClass {
        constructor(index, path, canvas, canvasId, canvasWrapperId) {
            this.index = index;
            this.path = path;
            this.canvas = canvas;
            this.zoom = 0.6;
            this.canvasId = canvasId;
            this.canvasWrapperId = canvasWrapperId;
            this.object = new Array(0);
            this.defaultObject = new class DefaultObjectClass {
                constructor() {
                    this.box = null;
                    this.title = null;
                }
            }
            this.selectComponent = new Array(0);
        }
    }

    class SelectComponentClass {
        constructor() {
            this.componentId = null;
            this.componentImage = null;
            this.x = null;
            this.y = null;
        }
    }

    class ComponentClass {
        constructor(index, path, canvas, canvasId, canvasWrapperId) {
            this.index = index;
            this.path = path;
            this.canvas = canvas;
            this.zoom = 0.6;
            this.canvasId = canvasId;
            this.canvasWrapperId = canvasWrapperId;
            this.object = new Array(0);
            this.defaultObject = new class DefaultObjectClass {
                constructor() {
                    this.box = null;
                    this.title = null;
                }
            }
            this.componentProperty = new class ComponentPropertyClass {
                constructor() {
                    this.imageSrc = null;
                    this.width = null;
                    this.height = null;
                }
            };
            this.css = null;
        }
    }

    class ObjectClass {
        constructor(object, index, componentIndex, tagType) {
            this.object = object;
            this.index = index;
            this.componentIndex = componentIndex;
            this.tagType = tagType;
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


    class UIClass {
        constructor() {
            this.mouseType = 1;
            //this.clickedObjectType = 'rect';
            this.propertyOrEvent = 'property';
            this.pageOrComponent = 'page';
            this.propertyOrEvent = 'property';
            this.currentZoom = null;
            this.currentPageMode = 'page';
            this.componentIndex = 0;
            this.currentPagePath = '/';
            this.pageIndex = 0;
            this.currentComponentObjectArray = new Array(0);
            this.objectType = 'page';
            this.moveViewBool = false;
            this.mouseMiddleDown = false;
            this.isDown = false;
            this.origX = null;
            this.origY = null;
            this.isMove = false;
            this.isScale = false;
            this.tempArray = new Array(0);
            this.currentSelect = new Array(0);
            this.changeText = 'Save';
        }
    }

    class ProjectInfo {
        constructor() {
            this.projectName = '';
            this.createDate = null;
            this.editedData = null;
        }
    }

    class SaveFileClass {
        constructor(componentId, componentImage, componentIndex, width, height, x, y) {
            this.componentId = componentId;
            this.componentImage = componentImage;
            this.componentIndex = componentIndex;
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
        }
    }


    let ui = new UIClass();
    let theme = new ThemeClass();
    let currentObject = new CurrentObjectClass();
    let currentComponent = new CurrentComponentClass();
    let pageArray = new Array(0);
    let projectInfo = new ProjectInfo();
    //pageArray[0] = new PageClass(0,'/Page0',null,'','');
    //pageArray[pageArray.length] = new PageClass(pageArray.length, '/Page' + pageArray.length ,null,'','');

    let componentArray = new Array(0);
    //ui.currentComponentObjectArray[0] = new ObjectClass(null,null,null,null);
    //componentArray[0] = new ComponentClass(0, '/Component0',null,'','');
    //componentArray[componentArray.length] = new ComponentClass(componentArray.length, '/Component' + componentArray.length ,null,'','');
    let saveFile;

    onMount(async () => {

            








        fabric.Object.prototype.set({
            borderColor: "#18A0FB",
            cornerColor: "#18A0FB",
            cornerSize: 8,
            transparentCorners: false,
        });

        // 기본 페이지 설정
        function setDefaultPage() {
            pageArray[0] = new PageClass(0, '/', new fabric.Canvas('canvas-page-' + 0, {
                    objectCaching:false,
                    imageSmoothingEnabled: false,
                    fireMiddleClick: true,
                }),
                'canvas-page-0',
                'canvas-page-0-wrapper',
            );

            pageArray[0].canvas.setWidth(innerWidth - 400);
            pageArray[0].canvas.setHeight(innerHeight - 90);
            pageArray[0].defaultObject.box = new fabric.Rect({
                id: '///defaultBox///',
                left: 0,
                top: 0,
                strokeWidth: 0,
                fill: "#ffffff",
                stroke: "#ffffff",
                width: 1920,
                height: 1080,
            })
            pageArray[0].defaultObject.title = new fabric.Textbox('/', {
                id: '///defaultText///',
                fontFamily: 'Nunito',
                width: 200,
                top: -40,
                fontSize: 20,
                fontWeight: '30',
                fill: '#404040',
            })
            pageArray[0].defaultObject.box.selectable = true;
            pageArray[0].defaultObject.box.hasControls = true;
            pageArray[0].defaultObject.box.lockMovementX = true;
            pageArray[0].defaultObject.box.lockMovementY = true;
            pageArray[0].defaultObject.box.setControlsVisibility({
                mt: false,
                mb: true,
                ml: false,
                mr: false,
                bl: false,
                br: false,
                tr: false,
                tl: false,
                mtr: false,
            });
            pageArray[0].defaultObject.title.selectable = false;
            pageArray[0].defaultObject.title.hasControls = false;
            pageArray[0].canvas.preserveObjectStacking = true;
            pageArray[0].canvas.add(pageArray[0].defaultObject.box);
            pageArray[0].canvas.add(pageArray[0].defaultObject.title);

            pageArray[0].canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
            pageArray[0].canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
            

            componentArray[0] = new ComponentClass(0, 'Component0', new fabric.Canvas('canvas-component-' + 0, {
                    objectCaching:false,    
                    imageSmoothingEnabled: false,
                    fireMiddleClick: true,
                }),
                'canvas-component-0',
                'canvas-component-0-wrapper',
            );

            componentArray[0].canvas.setWidth(innerWidth - 400);
            componentArray[0].canvas.setHeight(innerHeight - 90);
            componentArray[0].canvas.preserveObjectStacking = true;
            componentArray[0].defaultObject.box = new fabric.Rect({
                id: '///defaultBox///',
                left: 0,
                top: 0,
                strokeWidth: 0,
                fill: "#ffffff",
                stroke: "#ffffff",
                width: 1920,
                height: 1080,
            })
            componentArray[0].defaultObject.title = new fabric.Textbox('Component0', {
                id: '///defaultText///',
                fontFamily: 'Nunito',
                width: 200,
                top: -40,
                fontSize: 20,
                fontWeight: '400',
                fill: '#404040',
            })
            componentArray[0].defaultObject.box.selectable = false;
            componentArray[0].defaultObject.box.hasControls = false;
            componentArray[0].defaultObject.title.selectable = false;
            componentArray[0].defaultObject.title.hasControls = false;

            componentArray[0].canvas.add(componentArray[0].defaultObject.box);
            componentArray[0].canvas.add(componentArray[0].defaultObject.title);

            document.getElementById('canvas-component-0-wrapper').style.display = 'none';

            componentArray[0].canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
            componentArray[0].canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;

            pageArray[0].canvas.on('mouse:down', function(event) {
                if (event.button == 1) {
                    if (ui.mouseType == 1) {
                        if (event.target==null) {
                            ui.objectType = 'page';
                        }
                        else if (event.target.id != '///defaultBox///' && event.target.id != '///defaultText///') {
                            ui.objectType = 'componentImage'
                            let activeObject = pageArray[0].canvas.getActiveObject();
                            currentObject.object = activeObject;
                            currentObject.x = activeObject.left;
                            currentObject.y = activeObject.top;
                            currentObject.id = activeObject.id;
                        }
                        else {
                            ui.objectType = 'page';
                        }

                        console.log(ui.objectType)

                        pageArray[0].selectComponent.forEach((element, index2) => {
                            if (element.componentId != '//deleted//') 
                                ui.currentSelect[index2] = String(element.componentIndex);
                        });

                        pageArray[ui.pageIndex].canvas.remove(this)
                    }
                }

                if (event.button == 2) {
                    ui.mouseMiddleDown = true;
                }

            }); 

            pageArray[0].canvas.on('mouse:move', function(event) {
                if (ui.mouseMiddleDown) {
                    let delta = new fabric.Point(event.e.movementX, event.e.movementY);
                    pageArray[0].canvas.relativePan(delta);
                }

            }); 

            pageArray[0].canvas.on('mouse:up', function(event) {
                if (event.button == 2) {
                    ui.mouseMiddleDown = false;
                }
            }); 

            // 키보드 이동 이벤트
            fabric.util.addListener(document.body, 'keydown', function(event) {
                
                let key = event.which || event.keyCode;

                if(event.shiftKey && key === 37)
                    moveSelected(1, 10);
                else if(event.shiftKey && key === 38)
                    moveSelected(2, 10);
                else if(event.shiftKey && key === 39)
                    moveSelected(3, 10);
                else if(event.shiftKey && key === 40)
                    moveSelected(4, 10);
                else if(key === 37)
                    moveSelected(1, 1);
                else if(key === 38)
                    moveSelected(2, 1);
                else if(key === 39)
                    moveSelected(3, 1);
                else if(key === 40)
                    moveSelected(4, 1);
                else if(key === 46)
                    deleteObject();
            });

            function moveSelected(direction, value) {

                let activeObject = componentArray[0].canvas.getActiveObject();

                if (activeObject) {
                    switch (direction) {
                        case 1:
                            activeObject.set('left', activeObject.left - value);
                            break;
                        case 2:
                            activeObject.set('top', activeObject.top - value);
                            break;
                        case 3:
                            activeObject.set('left', activeObject.left + value);
                            break;
                        case 4:
                            activeObject.set('top', activeObject.top + value);
                            break;
                    }
                    activeObject.setCoords();
                    componentArray[0].canvas.renderAll();
                    currentObject.x = activeObject.left;
                    currentObject.y = activeObject.top;
                }  else {
                    
                }

            }

            function deleteObject() {
                if (ui.componentIndex == 0) {
                    let activeObject = componentArray[0].canvas.getActiveObject();
                    if (activeObject.type == "rect" || activeObject.type == "ellipse") {
                        componentArray[0].object.forEach(function(element) {
                            if(element.object.id === activeObject.id) {
                                componentArray[0].object[element.index].object.id = '//deleted//';
                            }
                        })
                        componentArray[0].canvas.remove(activeObject);
                        ui.currentComponentObjectArray = componentArray[0].object;
                    }
                    else if (activeObject.type == "i-text") {
                        if (!activeObject.isEditing){
                            componentArray[0].object.forEach(function(element) {
                                if(element.object.id === activeObject.id) {
                                    componentArray[0].object[element.index].object.id = '//deleted//';
                                }
                            })

                            componentArray[0].canvas.remove(activeObject);
                            ui.currentComponentObjectArray = componentArray[0].object;
                        }
                    }
                }
                
            }
            // 키보드 이동 이벤트

            componentArray[0].canvas.on('mouse:down', function(event) {
                
                if (event.button == 1) {
                
                    if (ui.mouseType == 1) {
                        if (event.target==null) {
                            ui.objectType = 'component';
                            currentComponent.width = componentArray[0].defaultObject.box.width;
                            currentComponent.height = componentArray[0].defaultObject.box.height;
                            currentComponent.css = componentArray[0].css;
                        }
                        else if (event.target.id != '///defaultBox///' && event.target.id != '///defaultText///') {

                            let activeObject = componentArray[0].canvas.getActiveObject();
                            currentObject.id = activeObject.id;
                            currentObject.x = activeObject.left;
                            currentObject.y = activeObject.top;
                            currentObject.width = activeObject.width;
                            currentObject.height = activeObject.height;
                            currentObject.color = activeObject.fill.substr(1);  
                            
                            componentArray[0].object.forEach(element => {
                                if (element.object.id == currentObject.id) {
                                    currentObject.Event.when = element.Event.when;
                                    currentObject.Event.do = element.Event.do;
                                    currentObject.Event.detail = element.Event.detail;
                                }
                            });

                            if (activeObject.type == 'rect') {
                                ui.objectType = 'rect';
                                currentObject.stroke = activeObject.stroke.substr(1);
                                currentObject.strokeWidth = activeObject.strokeWidth;
                            }

                            else if (activeObject.type == 'ellipse') {
                                ui.objectType = 'ellipse';
                                currentObject.stroke = activeObject.stroke.substr(1);
                                currentObject.strokeWidth = activeObject.strokeWidth;
                            }

                            else if (activeObject.type == 'i-text') {
                                ui.objectType = 'i-text';
                                currentObject.fontSize = activeObject.fontSize;
                                currentObject.lineHeight = activeObject.lineHeight;
                            }
                            currentObject.activeObject = activeObject;
                        }
                        
                        else {
                            ui.objectType = 'component';
                            currentComponent.width = componentArray[0].defaultObject.box.width;
                            currentComponent.height = componentArray[0].defaultObject.box.height;
                            currentComponent.css = componentArray[0].css;
                        }

                        ui.propertyOrEvent = 'property';
                    }
                    else if (ui.mouseType == 2) {

                        ui.isDown = true;
                        let pointer = componentArray[0].canvas.getPointer(event.e);
                        let objectIndex = componentArray[0].object.length;
                        ui.origX = parseInt(pointer.x);
                        ui.origY = parseInt(pointer.y);
                        
                        componentArray[0].object[objectIndex] = new ObjectClass(
                            new fabric.Rect({
                                id: 'Object' + objectIndex,
                                left: ui.origX,
                                top: ui.origY,
                                originX: 'left',
                                originY: 'top',
                                width: pointer.x-ui.origX,
                                height: pointer.y-ui.origY,
                                angle: 0,
                                fill: '#C4C4C4',
                                stroke: '#ffffff',
                                strokeWidth: 0,
                                transparentCorners: false,
                            }),
                            objectIndex,
                            0,
                            'rect',
                        )
                        componentArray[0].canvas.add(componentArray[0].object[objectIndex].object);
                        currentObject.object = componentArray[0].object[objectIndex].object;
                        currentObject.id = currentObject.object.id;
                        currentObject.rotate = currentObject.object.angle;
                        currentObject.color = currentObject.object.fill.substr(1);  
                        currentObject.stroke = currentObject.object.stroke.substr(1);
                        currentObject.strokeWidth = currentObject.object.strokeWidth;
                        currentObject.tagType = 'rect';
                        currentObject.Event.when = null;
                        currentObject.Event.do = null;
                        currentObject.Event.detail = null;
                        fabric.Object.prototype.selectable = true;
                        ui.currentComponentObjectArray = componentArray[0].object;
                        ui.objectType = 'rect';
                        currentObject.activeObject = currentObject.object;

                        componentArray[0].object[objectIndex].object.on('mouseover', function() {
                            this._renderControls(this.canvas.contextTop, {
                            hasControls: false
                            })
                        })
                        componentArray[0].object[objectIndex].object.on('mousedown', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                        componentArray[0].object[objectIndex].object.on('mouseout', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                    }

                    else if (ui.mouseType == 3) {

                        ui.isDown = true;
                        let pointer = componentArray[0].canvas.getPointer(event.e);
                        let objectIndex = componentArray[0].object.length;
                        ui.origX = parseInt(pointer.x);
                        ui.origY = parseInt(pointer.y);

                        componentArray[0].object[objectIndex] = new ObjectClass(
                            new fabric.Ellipse({
                                id: 'Object' + objectIndex,
                                left: ui.origX,
                                top: ui.origY,
                                originX: 'left',
                                originY: 'top',
                                rx: pointer.x-ui.origX,
                                ry: pointer.y-ui.origY,
                                angle: 0,
                                fill: '#C4C4C4',
                                stroke: '#ffffff',
                                strokeWidth: 0,
                                transparentCorners: false,
                            }),
                            objectIndex,
                            0,
                            'ellipse',
                        )
                        componentArray[0].canvas.add(componentArray[0].object[objectIndex].object);
                        currentObject.object = componentArray[0].object[objectIndex].object;
                        currentObject.id = currentObject.object.id;
                        currentObject.rotate = currentObject.object.angle;
                        currentObject.color = currentObject.object.fill.substr(1);  
                        currentObject.stroke = currentObject.object.stroke.substr(1);
                        currentObject.strokeWidth = currentObject.object.strokeWidth;
                        currentObject.Event.when = null;
                        currentObject.Event.do = null;
                        currentObject.Event.detail = null;
                        currentObject.tagType = 'ellipse';
                        fabric.Object.prototype.selectable = true;
                        ui.currentComponentObjectArray = componentArray[0].object;
                        ui.objectType = 'ellipse';
                        currentObject.activeObject = currentObject.object;

                        componentArray[0].object[objectIndex].object.on('mouseover', function() {
                            this._renderControls(this.canvas.contextTop, {
                            hasControls: false
                            })
                        })
                        componentArray[0].object[objectIndex].object.on('mousedown', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                        componentArray[0].object[objectIndex].object.on('mouseout', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                    }

                    else if (ui.mouseType == 4) {
                        
                        var pointer = componentArray[0].canvas.getPointer(event.e);
                        var objectIndex = componentArray[0].object.length;
                        ui.origX = parseInt(pointer.x);
                        ui.origY = parseInt(pointer.y);
                        
                        componentArray[0].object[objectIndex] = new ObjectClass(
                            new fabric.IText('', {
                                id: 'Object' + objectIndex,
                                left: ui.origX,
                                top: ui.origY,
                                originX: 'left',
                                originY: 'top',
                                width: 20,
                                editable: true,
                                hasControls: true,
                                fontSize: 20,
                                fill: '#000000',
                                fontFamily: 'Nunito',
                                fontWeight: 200,
                            }),
                            objectIndex,
                            0,
                            'i-text',
                        )
                        
                        componentArray[0].canvas.add(componentArray[0].object[objectIndex].object);
                        currentObject.object = componentArray[0].object[objectIndex].object;
                        currentObject.id = currentObject.object.id;
                        fabric.Object.prototype.selectable = true;
                        componentArray[0].canvas.setActiveObject(componentArray[0].object[objectIndex].object);
                        componentArray[0].object[objectIndex].object.enterEditing();
                        componentArray[0].canvas.renderAll();
                        ui.currentComponentObjectArray = componentArray[0].object;
                        ui.mouseType = 1;
                        ui.objectType = 'i-text';
                        currentObject.tagType = 'i-text';
                        currentObject.x = componentArray[0].object[objectIndex].object.left;
                        currentObject.y = componentArray[0].object[objectIndex].object.top;
                        currentObject.fontSize = componentArray[0].object[objectIndex].object.fontSize;
                        currentObject.lineHeight = componentArray[0].object[objectIndex].object.lineHeight;
                        currentObject.color = currentObject.object.fill.substr(1);
                        currentObject.Event.when = null;
                        currentObject.Event.do = null;
                        currentObject.Event.detail = null;
                        componentArray.forEach((element) => {
                            element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                            element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
                        });
                        currentObject.activeObject = currentObject.object;

                        componentArray[0].object[objectIndex].object.on('mouseover', function() {
                            this._renderControls(this.canvas.contextTop, {
                            hasControls: false
                            })
                        })
                        componentArray[0].object[objectIndex].object.on('mousedown', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                        componentArray[0].object[objectIndex].object.on('mouseout', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })

                    }
                    else if (ui.mouseType == 5) {
                        componentArray[0].canvas.selection = false;
                        ui.moveViewBool = true;
                    }

                }
                if (event.button == 2) {
                    ui.mouseMiddleDown = true;
                }

            }); 
            

            componentArray[0].canvas.on('mouse:move', function(event){

                if (event.button == 1) {
                    if (ui.mouseType == 2) {

                        let objectIndex = componentArray[0].object.length - 1;
                        
                        if (!ui.isDown)
                            return;
                        let pointer = componentArray[0].canvas.getPointer(event.e);
                        
                        if(ui.origX>pointer.x)
                            componentArray[0].object[objectIndex].object.set({ left: parseInt(Math.abs(pointer.x)) });
                        
                        if(ui.origY>pointer.y)
                            componentArray[0].object[objectIndex].object.set({ top: parseInt(Math.abs(pointer.y)) });
                        
                        componentArray[0].object[objectIndex].object.set({ width: parseInt(Math.abs(ui.origX - pointer.x)) });
                        componentArray[0].object[objectIndex].object.set({ height: parseInt(Math.abs(ui.origY - pointer.y)) });
                        componentArray[0].canvas.renderAll();
                        currentObject.x = currentObject.object.left;
                        currentObject.y = currentObject.object.top;
                        currentObject.width = currentObject.object.width;
                        currentObject.height = currentObject.object.height;
                        ui.isMove = true;
                        componentArray[0].canvas.selection = false;
                    } 

                    else if (ui.mouseType == 3) {

                        var objectIndex = componentArray[0].object.length - 1;
                        
                        if (!ui.isDown) return;
                        var pointer = componentArray[0].canvas.getPointer(event.e);
                        
                        if(ui.origX>pointer.x){
                            
                            componentArray[0].object[objectIndex].object.set({ left: parseInt(Math.abs(pointer.x)) });
                        }
                        if(ui.origY>pointer.y){
                            
                            componentArray[0].object[objectIndex].object.set({ top: parseInt(Math.abs(pointer.y)) });
                        }
                        
                        
                        componentArray[0].object[objectIndex].object.set({ rx: parseInt(Math.abs(ui.origX - pointer.x)/2) });
                        
                        componentArray[0].object[objectIndex].object.set({ ry: parseInt(Math.abs(ui.origY - pointer.y)/2) });
                        componentArray[0].canvas.renderAll();
                        currentObject.x = currentObject.object.left;
                        currentObject.y = currentObject.object.top;
                        currentObject.width = currentObject.object.width;
                        currentObject.height = currentObject.object.height;
                        ui.isMove = true;
                        componentArray[0].canvas.selection = false;
                    }

                    else if (ui.mouseType == 5 && ui.moveViewBool) {
                        let delta = new fabric.Point(event.e.movementX, event.e.movementY);
                        componentArray[0].canvas.relativePan(delta);
                    }
                }

                if (ui.mouseMiddleDown) {
                    let delta = new fabric.Point(event.e.movementX, event.e.movementY);
                    componentArray[0].canvas.relativePan(delta);
                }
            });

            componentArray[0].canvas.on('mouse:up', function(event){
                
                if (event.button == 1) {
                    if (ui.mouseType == 1 && ui.isScale) {
                        ui.isScale = false;
                        let activeObject = componentArray[0].canvas.getActiveObject();
                        activeObject.scaleX = 1;
                        activeObject.scaleY = 1;
                        activeObject.width = currentObject.width;
                        activeObject.height = currentObject.height;
                        componentArray[0].canvas.renderAll();
                    }
                    else if (ui.mouseType == 2) {
                        
                        if(ui.isMove == false) {
                            currentObject.object.set('width', 100);
                            currentObject.object.set('height', 100);
                            currentObject.x = currentObject.object.left;
                            currentObject.y = currentObject.object.top;
                            currentObject.width = currentObject.object.width;
                            currentObject.height = currentObject.object.height;
                        }
                        componentArray[0].canvas.selection = true;
                        ui.isDown = false;
                        ui.isMove = false;
                        componentArray[0].canvas.renderAll();
                        ui.mouseType = 1; 
                        componentArray.forEach((element) => {
                            element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                            element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
                        });
                        
                        ui.currentComponentObjectArray = componentArray[0].object;
                        currentObject.tagType = 'rect';

                        componentArray[0].canvas.getObjects().forEach(function(element) {
                            if(element.id === currentObject.id) {
                                componentArray[0].canvas.setActiveObject(element);
                                componentArray[0].canvas.renderAll();
                                currentObject.id = element.id;
                                currentObject.x = element.left;
                                currentObject.y = element.top;
                                currentObject.width = element.width;
                                currentObject.height = element.height;
                            }
                        });

                    }

                    else if (ui.mouseType == 3) {
                        
                        if(ui.isMove == false) {
                            currentObject.object.set('width', 100);
                            currentObject.object.set('height', 100);
                            currentObject.x = currentObject.object.left;
                            currentObject.y = currentObject.object.top;
                            currentObject.width = currentObject.object.width;
                            currentObject.height = currentObject.object.height;
                        }
                        componentArray[0].canvas.selection = true;
                        ui.isDown = false;
                        ui.isMove = false;
                        componentArray[0].canvas.renderAll();
                        ui.mouseType = 1; 
                        componentArray.forEach((element) => {
                            element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                            element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
                        });

                        ui.currentComponentObjectArray = componentArray[0].object;
                        currentObject.tagType = 'ellipse';



                        componentArray[0].canvas.getObjects().forEach(function(element) {
                            if(element.id === currentObject.id) {
                                componentArray[0].canvas.setActiveObject(element);
                                componentArray[0].canvas.renderAll();
                                currentObject.id = element.id;
                                currentObject.x = element.left;
                                currentObject.y = element.top;
                                currentObject.width = element.width;
                                currentObject.height = element.height;
                            }
                        });
                        
                    }

                    else if (ui.mouseType == 5) {
                        componentArray[0].canvas.selection = true;
                        ui.moveViewBool = false;
                    }
                        
                }

                if (event.button == 2) {
                    ui.mouseMiddleDown = false;
                }
            });


            pageArray[0].canvas.on('object:moving', function(event){
                if (event.target.id != '////defaultBox///' && event.target.id != '///defaultText///') {
                    let key = event.which || event.keyCode;
                    let activeObject = pageArray[0].canvas.getActiveObject();
                    ui.objectType = 'componentImage';
                    currentObject.object = activeObject;
                    currentObject.x = parseInt(currentObject.object.left);
                    currentObject.y = parseInt(currentObject.object.top);
                    activeObject.set({
                        top: currentObject.y,
                        left: currentObject.x,
                    });
                    let index = returnIndex2(pageArray[0].selectComponent, activeObject.id);
                    pageArray[0].selectComponent[index].x = currentObject.x;
                    pageArray[0].selectComponent[index].y = currentObject.y;
                }
            });


            componentArray[0].canvas.on('object:moving', function(event){
                if (event.target.id != '////defaultBox///' && event.target.id != '///defaultText///') {
                    let activeObject = componentArray[0].canvas.getActiveObject();
                    if (activeObject.type == 'rect')
                        ui.objectType = 'rect';
                    if (activeObject.type == 'ellipse')
                        ui.objectType = 'ellipse';
                    else if (activeObject.type == 'i-text')
                        ui.objectType = 'i-text';
                    
                    currentObject.object = activeObject;
                    currentObject.x = parseInt(currentObject.object.left);
                    currentObject.y = parseInt(currentObject.object.top);
                    activeObject.set({
                        top: currentObject.y,
                        left: currentObject.x,
                    });

                    let index = returnIndex(componentArray[0].object, activeObject.id);
                    //componentArray[0].object[index].object = activeObject;
                }
            });

            


            componentArray[0].canvas.on('object:scaling', function(event){
                if (event.target.id != '///defaultBox///' && event.target.id != '///defaultText///') {
                    ui.isScale = true;
                    let activeObject = componentArray[0].canvas.getActiveObject();
                    if (activeObject.type == 'rect')
                        ui.objectType = 'rect';
                    if (activeObject.type == 'ellipse')
                        ui.objectType = 'ellipse';
                    else if (activeObject.type == 'i-text')
                        ui.objectType = 'i-text';
                    
                        
                    currentObject.width = parseInt(activeObject.getScaledWidth());
                    currentObject.height = parseInt(activeObject.getScaledHeight());
                    activeObject.set({
                        width: currentObject.width,
                        height: currentObject.height,
                        scaleX: 1,
                        scaleY: 1,
                        left: parseInt(currentObject.x),
                        top: parseInt(currentObject.y),
                    })
                    componentArray[0].canvas.renderAll()
                }

            });
            
            function resetCurrentObject() {
                currentObject = new CurrentObjectClass();
            }
        }


        function setCanvasZoom() {
            
            let zoomLeft1 = (pageArray[0].canvas.width - pageArray[0].defaultObject.box.width * pageArray[0].zoom) / 2;
            let zoomTop1 = (pageArray[0].canvas.height - pageArray[0].defaultObject.box.height * pageArray[0].zoom) / 2;

            pageArray[0].canvas.setViewportTransform([
                pageArray[0].zoom,
                0,
                0,
                pageArray[0].zoom,
                zoomLeft1,
                zoomTop1,
            ]);

            //pageArray[0].zoomLeft = zoomLeft1;
            //pageArray[0].zoomTop = zoomTop1;

            let zoomLeft2 = (componentArray[0].canvas.width - componentArray[0].defaultObject.box.width * componentArray[0].zoom) / 2;
            let zoomTop2 = (componentArray[0].canvas.height - componentArray[0].defaultObject.box.height * componentArray[0].zoom) / 2;

            componentArray[0].canvas.setViewportTransform([
                componentArray[0].zoom,
                0,
                0,
                componentArray[0].zoom,
                zoomLeft2,
                zoomTop2,
            ]);

            //componentArray[0].zoomLeft = zoomLeft2;
            //componentArray[0].zoomTop = zoomTop2;


            pageArray[0].canvas.on('mouse:wheel', function(opt) {
                if (opt.e.ctrlKey) {
                    var delta = opt.e.deltaY;
                    var zoom = pageArray[0].canvas.getZoom();
                    zoom *= 0.999 ** delta;
                    if (zoom > 20) zoom = 20;
                    if (zoom < 0.01) zoom = 0.01;
                    pageArray[0].canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                    opt.e.preventDefault();
                    opt.e.stopPropagation();
                    ui.currentZoom = roundTwo(pageArray[0].canvas.getZoom());
                    pageArray[0].canvas.renderAll();

                    pageArray[0].defaultObject.title.top = -2000 * 1/roundTwo(pageArray[0].canvas.getZoom());
                    pageArray[0].defaultObject.title.fontSize = 1000 * 1/roundTwo(pageArray[0].canvas.getZoom());
                }
            }); 

            componentArray[0].canvas.on('mouse:wheel', function(opt) {
                if (opt.e.ctrlKey) {
                    var delta = opt.e.deltaY;
                    var zoom = componentArray[0].canvas.getZoom();
                    zoom *= 0.999 ** delta;
                    if (zoom > 20) zoom = 20;
                    if (zoom < 0.01) zoom = 0.01;
                    componentArray[0].canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                    opt.e.preventDefault();
                    opt.e.stopPropagation();
                    ui.currentZoom = roundTwo(componentArray[0].canvas.getZoom());

                    componentArray[0].defaultObject.title.top = -2000 * 1/roundTwo(componentArray[0].canvas.getZoom());
                    componentArray[0].defaultObject.title.fontSize = 1000 * 1/roundTwo(componentArray[0].canvas.getZoom());
                } 
            });

            ui.currentZoom = roundTwo(pageArray[0].canvas.getZoom());

            pageArray[0].canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
            componentArray[0].canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;

        }

        setDefaultPage();
        
        document.getElementById('layer-section-box').addEventListener("wheel", (event) => {
                if (event.ctrlKey) {
                    event.preventDefault(); 
                }
            }, true
        );

        document.getElementById('property-section-box').addEventListener("wheel", (event) => {
                if (event.ctrlKey) {
                    event.preventDefault(); 
                }
            }, true
        );

        document.getElementById('tool-section-box').addEventListener("wheel", (event) => {
                if (event.ctrlKey) {
                    event.preventDefault(); 
                }
            }, true
        );
                
        setCanvasZoom(); 

        // 세이브파일 있음
        if ($loadArray != null) {
            saveFile = $loadArray;
            projectInfo.createDate = saveFile.createDate;
            projectInfo.projectName = saveFile.projectName;
            loadSaveFile($loadArray);
        }
        // 새로만들기
        else { 
            projectInfo.projectName = 'Project' + (params.id*1+1);
            projectInfo.createDate = new Date();
        }

        
        


    });


































    function setCanvasZoom(type, index) {

        if (type=='page'){
            let zoomLeft1 = (pageArray[index].canvas.width - pageArray[index].defaultObject.box.width * pageArray[index].zoom) / 2;
            let zoomTop1 = (pageArray[index].canvas.height - pageArray[index].defaultObject.box.height * pageArray[index].zoom) / 2;

            pageArray[index].canvas.setViewportTransform([
                pageArray[index].zoom,
                0,
                0,
                pageArray[index].zoom,
                zoomLeft1,
                zoomTop1,
            ]);

            pageArray[index].canvas.on('mouse:wheel', function(opt) {
                if (opt.e.ctrlKey) {
                    var delta = opt.e.deltaY;
                    var zoom = pageArray[index].canvas.getZoom();
                    zoom *= 0.999 ** delta;
                    if (zoom > 20) zoom = 20;
                    if (zoom < 0.01) zoom = 0.01;
                    pageArray[index].canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                    opt.e.preventDefault();
                    opt.e.stopPropagation();
                    ui.currentZoom = roundTwo(pageArray[index].canvas.getZoom());
                    pageArray[index].canvas.renderAll();
                    pageArray[index].defaultObject.title.top = -2000 * 1/roundTwo(pageArray[index].canvas.getZoom());
                    pageArray[index].defaultObject.title.fontSize = 1000 * 1/roundTwo(pageArray[index].canvas.getZoom());
                }
            });

            pageArray[index].canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;

        }
        
        else if (type=='component') {

            let zoomLeft2 = (componentArray[index].canvas.width - componentArray[index].defaultObject.box.width * componentArray[index].zoom) / 2;
            let zoomTop2 = (componentArray[index].canvas.height - componentArray[index].defaultObject.box.height * componentArray[index].zoom) / 2;

            componentArray[index].canvas.setViewportTransform([
                componentArray[index].zoom,
                0,
                0,
                componentArray[index].zoom,
                zoomLeft2,
                zoomTop2,
            ]);

            componentArray[index].canvas.on('mouse:wheel', function(opt) {
                if (opt.e.ctrlKey) {
                    var delta = opt.e.deltaY;
                    var zoom = componentArray[index].canvas.getZoom();
                    zoom *= 0.999 ** delta;
                    if (zoom > 20) zoom = 20;
                    if (zoom < 0.01) zoom = 0.01;
                    componentArray[index].canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                    opt.e.preventDefault();
                    opt.e.stopPropagation();
                    ui.currentZoom = roundTwo(componentArray[index].canvas.getZoom());
                    componentArray[index].defaultObject.title.top = -2000 * 1/roundTwo(componentArray[index].canvas.getZoom());
                    componentArray[index].defaultObject.title.fontSize = 1000 * 1/roundTwo(componentArray[index].canvas.getZoom());
                }
            });

            componentArray[index].canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
        }

        ui.currentZoom = 60;
    }



    // 페이지, 컴포넌트 추가
    function addPage(type, index) {

        if (type == 'page') {

            let length
            if (index == null) 
                length = pageArray.length;
            else
                length = index;

            
            
            let canvasWrapper = document.createElement('div');
            canvasWrapper.id = 'canvas-page-' + length + '-wrapper';
            document.getElementById('canvas-section-box').appendChild(canvasWrapper);

            let canvas = document.createElement('canvas');
            canvas.id = 'canvas-page-' + length;
            document.getElementById('canvas-page-' + length + '-wrapper').appendChild(canvas);
            
            pageArray[length] = new PageClass(length, '/Page' + length, new fabric.Canvas('canvas-page-' + length, {
                    objectCaching:false,
                    imageSmoothingEnabled: false,
                    fireMiddleClick: true,
                }),
                'canvas-page-' + length,
                'canvas-page-' + length + '-wrapper',
            );

            pageArray[length].canvas.setWidth(innerWidth - 400);
            pageArray[length].canvas.setHeight(innerHeight - 90);
            pageArray[length].defaultObject.box = new fabric.Rect({
                id: '///defaultBox///',
                left: 0,
                top: 0,
                strokeWidth: 0,
                fill: "#ffffff",
                stroke: "#ffffff",
                width: 1920,
                height: 1080,
            })
            pageArray[length].defaultObject.title = new fabric.Textbox('/Page' + length, {
                fontFamily: 'Nunito',
                width: 200,
                top: -40,
                fontSize: 20,
                fontWeight: '400',
                fill: '#404040',
            })
            pageArray[length].defaultObject.box.selectable = true;
            pageArray[length].defaultObject.box.hasControls = true;
            pageArray[length].defaultObject.box.lockMovementX = true;
            pageArray[length].defaultObject.box.lockMovementY = true;
            pageArray[length].defaultObject.box.setControlsVisibility({
                mt: false,
                mb: true,
                ml: false,
                mr: false,
                bl: false,
                br: false,
                tr: false,
                tl: false,
                mtr: false,
            });
            
            pageArray[length].defaultObject.title.selectable = false;
            pageArray[length].defaultObject.title.hasControls = false;
            pageArray[length].canvas.preserveObjectStacking = true;
            pageArray[length].canvas.add(pageArray[length].defaultObject.box);
            pageArray[length].canvas.add(pageArray[length].defaultObject.title);
        
        
            pageArray.forEach(element => {
                document.getElementById(element.canvasWrapperId).style.display = 'none';
            });
            componentArray.forEach(element => {
                document.getElementById(element.canvasWrapperId).style.display = 'none';
            });

            document.getElementById(pageArray[length].canvasWrapperId).style.display = 'block';
            
    
            let zoomLeft = (pageArray[length].canvas.width - pageArray[length].defaultObject.box.width * pageArray[length].zoom) / 2;
            let zoomTop = (pageArray[length].canvas.height - pageArray[length].defaultObject.box.height * pageArray[length].zoom) / 2;

            pageArray[length].canvas.setViewportTransform([
                pageArray[length].zoom,
                0,
                0,
                pageArray[length].zoom,
                zoomLeft,
                zoomTop,
            ]);

            pageArray[length].zoomLeft = zoomLeft;
            pageArray[length].zoomTop = zoomTop;

            pageArray[length].canvas.on('mouse:wheel', function(opt) {
                if (opt.e.ctrlKey) {
                    var delta = opt.e.deltaY;
                    var zoom = pageArray[length].canvas.getZoom();
                    zoom *= 0.999 ** delta;
                    if (zoom > 20) zoom = 20;
                    if (zoom < 0.01) zoom = 0.01;
                    pageArray[length].canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                    opt.e.preventDefault();
                    opt.e.stopPropagation();
                    ui.currentZoom = roundTwo(pageArray[length].canvas.getZoom());
                    pageArray[length].canvas.renderAll();

                    pageArray[length].defaultObject.title.top = -2000 * 1/roundTwo(pageArray[length].canvas.getZoom());
                    pageArray[length].defaultObject.title.fontSize = 1000 * 1/roundTwo(pageArray[length].canvas.getZoom());
                }
            });

            
            pageArray[length].canvas.on('object:moving', function(event){
                if (event.target.id != '////defaultBox///' && event.target.id != '///defaultText///') {
                    let activeObject = pageArray[length].canvas.getActiveObject();
                    ui.objectType = 'componentImage';


                    currentObject.object = activeObject;
                    currentObject.x = parseInt(currentObject.object.left);
                    currentObject.y = parseInt(currentObject.object.top);
                    activeObject.set({
                        top: currentObject.y,
                        left: currentObject.x,
                    });

                    let index = returnIndex2(pageArray[length].selectComponent, activeObject.id);
                    pageArray[length].selectComponent[index].x = currentObject.x;
                    pageArray[length].selectComponent[index].y = currentObject.y;
                }
            });

            ui.currentZoom = roundTwo(pageArray[length].canvas.getZoom());
            ui.pageIndex = length;

            pageArray[length].canvas.on('mouse:down', function(event) {
                if (event.button == 1) {
                    if (ui.mouseType == 1) {
                        console.log(event.target)
                        if (event.target==null) {
                            ui.objectType = 'page';
                        }
                        else if (event.target.id != '///defaultBox///' && event.target.id != '///defaultText///') {
                            ui.objectType = 'componentImage'
                            let activeObject = pageArray[length].canvas.getActiveObject();
                            currentObject.object = activeObject;
                            currentObject.x = activeObject.left;
                            currentObject.y = activeObject.top;
                            currentObject.id = activeObject.id;
                        }
                        else {
                            ui.objectType = 'page';
                        }

                        console.log(ui.objectType)

                        pageArray[length].selectComponent.forEach((element, index2) => {
                            if (element.componentId != '//deleted//') 
                                ui.currentSelect[index2] = String(element.componentIndex);
                        });

                        pageArray[ui.pageIndex].canvas.remove(this)
                    }
                }

                if (event.button == 2) {
                    ui.mouseMiddleDown = true;
                }

            });

            pageArray[length].canvas.on('mouse:move', function(event) {
                if (ui.mouseMiddleDown) {
                    let delta = new fabric.Point(event.e.movementX, event.e.movementY);
                    pageArray[length].canvas.relativePan(delta);
                }

            }); 

            pageArray[length].canvas.on('mouse:up', function(event) {
                if (event.button == 2) {
                    ui.mouseMiddleDown = false;
                }
            }); 

            ui.currentSelect = null;
            ui.currentSelect = Array(0);

            ui.currentPageMode = 'page';
            ui.objectType = 'page';

            setCanvasZoom('page', length);

            ui.pageOrComponent = 'page';
            ui.pageIndex = length;
            ui.currentPageMode = 'page';

            pageArray.forEach(element => {
                document.getElementById(element.canvasWrapperId).style.display = 'none';
            });
            componentArray.forEach(element => {
                document.getElementById(element.canvasWrapperId).style.display = 'none';
            });


            componentArray.forEach((element, index) => {
                loadImage(element.defaultObject.box.width, element.defaultObject.box.height, index);
            });
            
            
            ui.currentZoom = roundTwo(pageArray[ui.pageIndex].canvas.getZoom());

            currentObject.id = pageArray[ui.pageIndex].path;

            document.getElementById('canvas-page-' + ui.pageIndex + '-wrapper').style.display = 'block';
            
            ui.objectType = 'page';

            
            ui.currentSelect = null;
            ui.currentSelect = Array(0); 

            pageArray[ui.pageIndex].selectComponent.forEach((element, index) => {
                if (element.componentId != '//deleted//')
                    ui.currentSelect[index] = String(element.componentIndex);
            });

            CustomSelectComponentChild.refresh(ui.currentSelect);

            pageArray.forEach((element) => {
                element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
            });
            componentArray.forEach((element) => {
                element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
            });

        }

        else if (type == 'component') {

            let length;
            if (index == null) 
                length = componentArray.length;
            else
                length = index;

            componentArray.forEach(element => {
                element.canvas.discardActiveObject().renderAll();
            });
            
            let canvasWrapper = document.createElement('div');
            canvasWrapper.id = 'canvas-component-' + length + '-wrapper';
            document.getElementById('canvas-section-box').appendChild(canvasWrapper);

            let canvas = document.createElement('canvas');
            canvas.id = 'canvas-component-' + length;
            document.getElementById('canvas-component-' + length + '-wrapper').appendChild(canvas);
            
            componentArray[length] = new ComponentClass(length, 'Component' + length, new fabric.Canvas('canvas-component-' + length, {
                    objectCaching:false,
                    imageSmoothingEnabled: false,
                    fireMiddleClick: true,
                }),
                'canvas-component-' + length,
                'canvas-component-' + length + '-wrapper',
            );

            componentArray[length].canvas.setWidth(innerWidth - 400);
            componentArray[length].canvas.setHeight(innerHeight - 90);
            componentArray[length].canvas.preserveObjectStacking = true;
            componentArray[length].defaultObject.box = new fabric.Rect({
                id: '///defaultBox///',
                left: 0,
                top: 0,
                strokeWidth: 0,
                fill: "#ffffff",
                stroke: "#ffffff",
                width: 1920,
                height: 1080,
            })
            componentArray[length].defaultObject.title = new fabric.Textbox('Component' + length, {
                id: '///defaultText///',
                fontFamily: 'Nunito',
                width: 200,
                top: -40,
                fontSize: 20,
                fontWeight: '400',
                fill: '#404040',
            })
            componentArray[length].defaultObject.box.selectable = false;
            componentArray[length].defaultObject.box.hasControls = false;
            componentArray[length].defaultObject.title.selectable = false;
            componentArray[length].defaultObject.title.hasControls = false;

            componentArray[length].canvas.add(componentArray[length].defaultObject.box);
            componentArray[length].canvas.add(componentArray[length].defaultObject.title);
        
            pageArray.forEach(element => {
                document.getElementById(element.canvasWrapperId).style.display = 'none';
            });
            componentArray.forEach(element => {
                document.getElementById(element.canvasWrapperId).style.display = 'none';
            });

            document.getElementById(componentArray[length].canvasWrapperId).style.display = 'block';
    
            let zoomLeft = (componentArray[length].canvas.width - componentArray[length].defaultObject.box.width * componentArray[length].zoom) / 2;
            let zoomTop = (componentArray[length].canvas.height - componentArray[length].defaultObject.box.height * componentArray[length].zoom) / 2;

            componentArray[length].canvas.setViewportTransform([
                componentArray[length].zoom,
                0,
                0,
                componentArray[length].zoom,
                zoomLeft,
                zoomTop,
            ]);

            componentArray[length].zoomLeft = zoomLeft;
            componentArray[length].zoomTop = zoomTop;

            componentArray[length].canvas.on('mouse:wheel', function(opt) {
                if (opt.e.ctrlKey) {
                    var delta = opt.e.deltaY;
                    var zoom = componentArray[length].canvas.getZoom();
                    zoom *= 0.999 ** delta;
                    if (zoom > 20) zoom = 20;
                    if (zoom < 0.01) zoom = 0.01;
                    componentArray[length].canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                    opt.e.preventDefault();
                    opt.e.stopPropagation();
                    ui.currentZoom = roundTwo(componentArray[length].canvas.getZoom());
                    componentArray[length].defaultObject.title.top = -2000 * 1/roundTwo(componentArray[length].canvas.getZoom());
                    componentArray[length].defaultObject.title.fontSize = 1000 * 1/roundTwo(componentArray[length].canvas.getZoom());
                }
            });

            ui.currentZoom = roundTwo(componentArray[length].canvas.getZoom());

            componentArray[length].canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
            componentArray[length].canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;

            ui.componentIndex = length;
            ui.currentPageMode = 'component';


            // 키보드 이벤트
            fabric.util.addListener(document.body, 'keydown', function(event) {
                
                let key = event.which || event.keyCode;

                if(event.shiftKey && key === 37)
                    moveSelected(1, 10);
                else if(event.shiftKey && key === 38)
                    moveSelected(2, 10);
                else if(event.shiftKey && key === 39)
                    moveSelected(3, 10);
                else if(event.shiftKey && key === 40)
                    moveSelected(4, 10);
                else if(key === 37)
                    moveSelected(1, 1);
                else if(key === 38)
                    moveSelected(2, 1);
                else if(key === 39)
                    moveSelected(3, 1);
                else if(key === 40)
                    moveSelected(4, 1);
                else if(key === 46)
                    deleteObject();
            });

            function moveSelected(direction, value) {

                let activeObject = componentArray[length].canvas.getActiveObject();

                if (activeObject) {
                    switch (direction) {
                        case 1:
                            activeObject.set('left', activeObject.left - value);
                            break;
                        case 2:
                            activeObject.set('top', activeObject.top - value);
                            break;
                        case 3:
                            activeObject.set('left', activeObject.left + value);
                            break;
                        case 4:
                            activeObject.set('top', activeObject.top + value);
                            break;
                    }
                    activeObject.setCoords();
                    componentArray[length].canvas.renderAll();
                    currentObject.x = activeObject.left;
                    currentObject.y = activeObject.top;
                }  else {
                    
                }

            }

            function deleteObject() {
                if (ui.componentIndex != 0) {
                    let activeObject = componentArray[ui.componentIndex].canvas.getActiveObject();
                    if (activeObject.type == "rect" || activeObject.type == "ellipse") {
                        componentArray[ui.componentIndex].object.forEach(function(element) {
                            if(element.object.id === activeObject.id) {
                                componentArray[ui.componentIndex].object[element.index].object.id = '//deleted//';
                            }
                        })
                        componentArray[ui.componentIndex].canvas.remove(activeObject);
                        ui.currentComponentObjectArray = componentArray[0].object;
                    }
                    else if (activeObject.type == "i-text") {
                        if (!activeObject.isEditing){
                            componentArray[ui.componentIndex].object.forEach(function(element) {
                                if(element.object.id === activeObject.id) {
                                    componentArray[ui.componentIndex].object[element.index].object.id = '//deleted//';
                                }
                            })

                            componentArray[ui.componentIndex].canvas.remove(activeObject);
                            ui.currentComponentObjectArray = componentArray[ui.componentIndex].object;
                        }
                    }
                }
            }
            
            componentArray[length].canvas.on('mouse:down', function(event) {
                
                if (event.button == 1) {
                
                    if (ui.mouseType == 1) {
                        if (event.target==null) {
                            ui.objectType = 'component';
                            currentComponent.width = componentArray[length].defaultObject.box.width;
                            currentComponent.height = componentArray[length].defaultObject.box.height;
                            currentComponent.css = componentArray[length].css;
                        }
                        else if (event.target.id != '///defaultBox///' && event.target.id != '///defaultText///') {
                            let activeObject = componentArray[length].canvas.getActiveObject();
                            currentObject.id = activeObject.id;
                            currentObject.x = activeObject.left;
                            currentObject.y = activeObject.top;
                            currentObject.width = activeObject.width;
                            currentObject.height = activeObject.height;
                            currentObject.color = activeObject.fill.substr(1); 

                            componentArray[length].object.forEach(element => {
                                if (element.object.id == currentObject.id) {
                                    currentObject.Event.when = element.Event.when;
                                    currentObject.Event.do = element.Event.do;
                                    currentObject.Event.detail = element.Event.detail;
                                }
                            });
                            

                            if (activeObject.type == 'rect') {
                                ui.objectType = 'rect';
                                currentObject.stroke = activeObject.stroke.substr(1);
                                currentObject.strokeWidth = activeObject.strokeWidth;
                            }
                            else if (activeObject.type == 'ellipse') {
                                ui.objectType = 'ellipse';
                                currentObject.stroke = activeObject.stroke.substr(1);
                                currentObject.strokeWidth = activeObject.strokeWidth;
                            }  
                            else if (activeObject.type == 'i-text') {
                                ui.objectType = 'i-text';
                                currentObject.fontSize = activeObject.fontSize;
                                currentObject.lineHeight = activeObject.lineHeight;
                            }
                            currentObject.activeObject = activeObject;
                            
                        }
                        else {
                            ui.objectType = 'component';
                            currentComponent.width = componentArray[length].defaultObject.box.width;
                            currentComponent.height = componentArray[length].defaultObject.box.height;
                            currentComponent.css = componentArray[length].css;
                        }
                        ui.propertyOrEvent = 'property';
                    }
                    else if (ui.mouseType == 2) {

                        ui.isDown = true;
                        var pointer = componentArray[length].canvas.getPointer(event.e);
                        ui.origX = parseInt(pointer.x);
                        ui.origY = parseInt(pointer.y);
                        var objectIndex = componentArray[length].object.length;

                        componentArray[length].object[objectIndex] = new ObjectClass(
                            new fabric.Rect({
                                id: 'Object' + objectIndex,
                                left: ui.origX,
                                top: ui.origY,
                                originX: 'left',
                                originY: 'top',
                                width: pointer.x-ui.origX,
                                height: pointer.y-ui.origY,
                                angle: 0,
                                fill: '#C4C4C4',
                                stroke: '#ffffff',
                                strokeWidth: 0,
                                transparentCorners: false,
                            }),
                            objectIndex,
                            length,
                            'rect',
                        )
                        componentArray[length].canvas.add(componentArray[length].object[objectIndex].object);
                        currentObject.object = componentArray[length].object[objectIndex].object;
                        currentObject.id = currentObject.object.id;
                        currentObject.rotate = currentObject.object.angle;
                        currentObject.color = currentObject.object.fill.substr(1);  
                        currentObject.stroke = currentObject.object.stroke.substr(1);
                        currentObject.strokeWidth = currentObject.object.strokeWidth;
                        currentObject.tagType = 'rect';
                        currentObject.Event.when = null;
                        currentObject.Event.do = null;
                        currentObject.Event.detail = null;
                        fabric.Object.prototype.selectable = true;
                        ui.currentComponentObjectArray = componentArray[length].object;
                        ui.objectType = 'rect';
                        currentObject.activeObject = currentObject.object;

                        componentArray[length].object[objectIndex].object.on('mouseover', function() {
                            this._renderControls(this.canvas.contextTop, {
                            hasControls: false
                            })
                        })
                        componentArray[length].object[objectIndex].object.on('mousedown', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                        componentArray[length].object[objectIndex].object.on('mouseout', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                    }

                    else if (ui.mouseType == 3) {

                        ui.isDown = true;
                        var pointer = componentArray[length].canvas.getPointer(event.e);
                        var objectIndex = componentArray[length].object.length;
                        ui.origX = parseInt(pointer.x);
                        ui.origY = parseInt(pointer.y);

                        componentArray[length].object[objectIndex] = new ObjectClass(
                            new fabric.Ellipse({
                                id: 'Object' + objectIndex,
                                left: ui.origX,
                                top: ui.origY,
                                originX: 'left',
                                originY: 'top',
                                rx: pointer.x-ui.origX,
                                ry: pointer.y-ui.origY,
                                angle: 0,
                                fill: '#C4C4C4',
                                stroke: '#ffffff',
                                strokeWidth: 0,
                                transparentCorners: false,

                            }),
                            objectIndex,
                            length,
                            'ellipse',
                        )
                        componentArray[length].canvas.add(componentArray[length].object[objectIndex].object);
                        currentObject.object = componentArray[length].object[objectIndex].object;
                        currentObject.id = currentObject.object.id;
                        currentObject.rotate = currentObject.object.angle;
                        currentObject.color = currentObject.object.fill.substr(1);  
                        currentObject.stroke = currentObject.object.stroke.substr(1);
                        currentObject.strokeWidth = currentObject.object.strokeWidth;
                        fabric.Object.prototype.selectable = true;
                        currentObject.Event.when = null;
                        currentObject.Event.do = null;
                        currentObject.Event.detail = null;
                        ui.currentComponentObjectArray = componentArray[length].object;
                        ui.objectType = 'ellipse';
                        currentObject.activeObject = currentObject.object;

                        componentArray[length].object[objectIndex].object.on('mouseover', function() {
                            this._renderControls(this.canvas.contextTop, {
                            hasControls: false
                            })
                        })
                        componentArray[length].object[objectIndex].object.on('mousedown', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                        componentArray[length].object[objectIndex].object.on('mouseout', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                    } 

                    else if (ui.mouseType == 4) {
                        
                        var pointer = componentArray[length].canvas.getPointer(event.e);
                        var objectIndex = componentArray[length].object.length;
                        ui.origX = parseInt(pointer.x);
                        ui.origY = parseInt(pointer.y);
                        
                        componentArray[length].object[objectIndex] = new ObjectClass(
                            new fabric.IText('', {
                                id: 'Object' + objectIndex,
                                left: ui.origX,
                                top: ui.origY,
                                originX: 'left',
                                originY: 'top',
                                width: 20,
                                editable: true,
                                hasControls: false,
                                fontSize: 20,
                                fill: '#000000',
                                fontFamily: 'Nunito',
                                fontWeight: 200,
                            }),
                            objectIndex,
                            length,
                            'i-text',
                        )
                        componentArray[length].canvas.add(componentArray[length].object[objectIndex].object);
                        currentObject.object = componentArray[length].object[objectIndex].object;
                        currentObject.id = currentObject.object.id;
                        fabric.Object.prototype.selectable = true;
                        componentArray[length].canvas.setActiveObject(componentArray[length].object[objectIndex].object);
                        componentArray[length].object[objectIndex].object.enterEditing();
                        componentArray[length].canvas.renderAll();
                        ui.currentComponentObjectArray = componentArray[length].object;
                        ui.mouseType = 1;
                        ui.objectType = 'i-text';
                        currentObject.tagType = 'i-text';
                        currentObject.x = componentArray[length].object[objectIndex].object.left;
                        currentObject.y = componentArray[length].object[objectIndex].object.top;
                        currentObject.fontSize = componentArray[length].object[objectIndex].object.fontSize;
                        currentObject.lineHeight = componentArray[length].object[objectIndex].object.lineHeight;
                        currentObject.color = currentObject.object.fill.substr(1);
                        currentObject.Event.when = null;
                        currentObject.Event.do = null;
                        currentObject.Event.detail = null;
                        componentArray.forEach((element) => {
                            element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                            element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
                        });
                        currentObject.activeObject = currentObject.object;

                        componentArray[length].object[objectIndex].object.on('mouseover', function() {
                            this._renderControls(this.canvas.contextTop, {
                            hasControls: false
                            })
                        })
                        componentArray[length].object[objectIndex].object.on('mousedown', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                        componentArray[length].object[objectIndex].object.on('mouseout', function() {
                            this.canvas.clearContext(this.canvas.contextTop);
                        })
                    }
                    else if (ui.mouseType == 5) {
                        componentArray[length].canvas.selection = false;
                        ui.moveViewBool = true;
                    }

                }
                if (event.button == 2) {
                    ui.mouseMiddleDown = true;
                }

            }); 

            componentArray[length].canvas.on('mouse:move', function(event){

                if (event.button == 1) {
                    if (ui.mouseType == 2) {

                        var objectIndex = componentArray[length].object.length - 1;
                        
                        if (!ui.isDown) 
                            return;
                        var pointer = componentArray[length].canvas.getPointer(event.e);
                        
                        if(ui.origX>pointer.x)
                            componentArray[length].object[objectIndex].object.set({ left: parseInt(Math.abs(pointer.x)) });
                        
                        if(ui.origY>pointer.y)
                            componentArray[length].object[objectIndex].object.set({ top: parseInt(Math.abs(pointer.y)) });
                        
                        componentArray[length].object[objectIndex].object.set({ width: parseInt(Math.abs(Math.floor(ui.origX - pointer.x))) });
                        componentArray[length].object[objectIndex].object.set({ height: parseInt(Math.abs(Math.floor(ui.origY - pointer.y))) });
                        componentArray[length].canvas.renderAll();
                        currentObject.x = currentObject.object.left;
                        currentObject.y = currentObject.object.top;
                        currentObject.width = currentObject.object.width;
                        currentObject.height = currentObject.object.height;
                        ui.isMove = true;
                        componentArray[length].canvas.selection = false;
                    }

                    else if (ui.mouseType == 3) {

                        var objectIndex = componentArray[length].object.length - 1;
                        
                        if (!ui.isDown) return;
                        var pointer = componentArray[length].canvas.getPointer(event.e);
                        
                        if(ui.origX>pointer.x){
                            
                            componentArray[length].object[objectIndex].object.set({ left: parseInt(Math.abs(pointer.x)) });
                        }
                        if(ui.origY>pointer.y){
                            
                            componentArray[length].object[objectIndex].object.set({ top: parseInt(Math.abs(pointer.y)) });
                        }
                        
                        
                        componentArray[length].object[objectIndex].object.set({ rx: parseInt(Math.abs(ui.origX - pointer.x)/2) });
                        
                        componentArray[length].object[objectIndex].object.set({ ry: parseInt(Math.abs(ui.origY - pointer.y)/2) });
                        componentArray[length].canvas.renderAll();
                        currentObject.x = currentObject.object.left;
                        currentObject.y = currentObject.object.top;
                        currentObject.width = currentObject.object.width;
                        currentObject.height = currentObject.object.height;
                        ui.isMove = true;
                        componentArray[length].canvas.selection = false;
                    }

                    else if (ui.mouseType == 5 && ui.moveViewBool) {
                        let delta = new fabric.Point(event.e.movementX, event.e.movementY);
                        componentArray[length].canvas.relativePan(delta);
                    }
                }

                if (ui.mouseMiddleDown) {
                    let delta = new fabric.Point(event.e.movementX, event.e.movementY);
                    componentArray[length].canvas.relativePan(delta);
                }
            });

            componentArray[length].canvas.on('mouse:up', function(event){

                if (event.button == 1) {

                    if (ui.mouseType == 1 && ui.isScale) {
                        ui.isScale = false;
                        let activeObject = componentArray[length].canvas.getActiveObject();
                        activeObject.scaleX = 1;
                        activeObject.scaleY = 1;
                        activeObject.width = currentObject.width;
                        activeObject.height = currentObject.height;
                        componentArray[length].canvas.renderAll();
                    }
                
                    if (ui.mouseType == 2) {
                        
                        if(ui.isMove == false) {
                            currentObject.object.set('width', 100);
                            currentObject.object.set('height', 100);
                            currentObject.x = currentObject.object.left;
                            currentObject.y = currentObject.object.top;
                            currentObject.width = currentObject.object.width;
                            currentObject.height = currentObject.object.height;
                        }
                        componentArray[length].canvas.selection = true;
                        ui.isDown = false;
                        ui.isMove = false;
                        componentArray[length].canvas.renderAll();
                        ui.mouseType = 1; 
                        componentArray.forEach((element) => {
                            element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                            element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
                        });

                        ui.currentComponentObjectArray = componentArray[length].object;
                        currentObject.tagType = 'rect';

                        componentArray[length].canvas.getObjects().forEach(function(element) {
                            if(element.id === currentObject.id) {
                                componentArray[length].canvas.setActiveObject(element);
                                componentArray[length].canvas.renderAll();
                                currentObject.id = element.id;
                                currentObject.x = element.left;
                                currentObject.y = element.top;
                                currentObject.width = element.width;
                                currentObject.height = element.height;
                            }
                        });
                    }

                    if (ui.mouseType == 3) {
                        
                        if(ui.isMove == false) {
                            currentObject.object.set('width', 100);
                            currentObject.object.set('height', 100);
                            currentObject.x = currentObject.object.left;
                            currentObject.y = currentObject.object.top;
                            currentObject.width = currentObject.object.width;
                            currentObject.height = currentObject.object.height;
                        }
                        componentArray[length].canvas.selection = true;
                        ui.isDown = false;
                        ui.isMove = false;
                        componentArray[length].canvas.renderAll();
                        ui.mouseType = 1; 
                        componentArray.forEach((element) => {
                            element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                            element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
                        });

                        ui.currentComponentObjectArray = componentArray[length].object;
                        currentObject.tagType = 'ellipse';

                        componentArray[length].canvas.getObjects().forEach(function(element) {
                            if(element.id === currentObject.id) {
                                componentArray[length].canvas.setActiveObject(element);
                                componentArray[length].canvas.renderAll();
                                currentObject.id = element.id;
                                currentObject.x = element.left;
                                currentObject.y = element.top;
                                currentObject.width = element.width;
                                currentObject.height = element.height;
                            }
                        });
                        
                    }

                    else if (ui.mouseType == 5) {
                        componentArray[length].canvas.selection = true;
                        ui.moveViewBool = false;
                    }
                        
                }

                if (event.button == 2) {
                    ui.mouseMiddleDown = false;
                }
            });




            componentArray[length].canvas.on('object:moving', function(event){
                if (event.target.id != '///defaultBox///' && event.target.id != '///defaultTitle///') {
                    let activeObject = componentArray[length].canvas.getActiveObject();
                    if (activeObject.type == 'rect')
                        ui.objectType = 'rect';
                    if (activeObject.type == 'ellipse')
                        ui.objectType = 'ellipse';
                    else if (activeObject.type == 'i-text')
                        ui.objectType = 'i-text';
                    
                    currentObject.object = activeObject;
                    currentObject.x = parseInt(currentObject.object.left);
                    currentObject.y = parseInt(currentObject.object.top);
                    currentObject.object.set({
                        top: currentObject.y,
                        left: currentObject.x,
                    });                    
                }
            });

            componentArray[length].canvas.on('object:scaling', function(event){
                if (event.target.id != '///defaultBox///' && event.target.id != '///defaultTitle///') {
                    ui.isScale = true;
                    let activeObject = componentArray[length].canvas.getActiveObject();
                    if (activeObject.type == 'rect')
                        ui.objectType = 'rect';
                    if (activeObject.type == 'ellipse')
                        ui.objectType = 'ellipse';
                    else if (activeObject.type == 'i-text')
                        ui.objectType = 'i-text';
                    currentObject.width = parseInt(activeObject.getScaledWidth());
                    currentObject.height = parseInt(activeObject.getScaledHeight());
                    activeObject.set({
                        width: currentObject.width,
                        height: currentObject.height,
                        scaleX: 1,
                        scaleY: 1,
                        left: parseInt(currentObject.x),
                        top: parseInt(currentObject.y),
                    })
                    componentArray[length].canvas.renderAll()
                }
            });

            setCanvasZoom('component', length);
        }
        
    }

    function resetCurrentObject() {
        currentObject = new CurrentObjectClass();
    }

    function roundTwo(num) {
        let m = Number((Math.abs(num) * 100).toPrecision(15));
        let returnNum = Math.round(m) / 100 * Math.sign(num) * 100;
        
        returnNum = returnNum.toFixed(0);
        return returnNum;
    }

    function returnIndex(array, id) {
        let index;
        array.forEach((element, i) => {
            if(element.object.id == id)
                index = element.index;
        });
        return index;
    }

    function returnIndex2(array, id) {
        let index;
        array.forEach((element, i) => { 
            
            if(element.componentIndex == id)
                index = i;
        });
        return index;
    }

    function loadImage(width, height, index) {
        let tempCanvas = componentArray[index].canvas;
        tempCanvas.discardActiveObject();

        var sel = new fabric.ActiveSelection(tempCanvas.getObjects(), {
            canvas: tempCanvas,
        });

        tempCanvas.setActiveObject(sel);
        tempCanvas.viewportTransform = [1, 0, 0, 1, 0, 0];
        tempCanvas.requestRenderAll();
        
        try {

            let activeGroup = tempCanvas.getActiveObject()

            let url = activeGroup.canvas.toDataURL({
                format: 'png', 
                width: width,
                height: height,
            })

            componentArray.forEach(element => {
                let zoomLeft2 = (element.canvas.width - element.defaultObject.box.width * element.zoom) / 2;
                let zoomTop2 = (element.canvas.height - element.defaultObject.box.height * element.zoom) / 2;
                element.canvas.setViewportTransform([
                    element.zoom,
                    0,
                    0,
                    element.zoom,
                    zoomLeft2,
                    zoomTop2,
                ]);
            });

            componentArray[index].componentProperty.imageSrc = url;
            componentArray[index].componentProperty.width = width;
            componentArray[index].componentProperty.height = height;

        } catch (error) {
        }

        componentArray.forEach(element => {
            try {
                element.canvas.discardActiveObject();
                element.canvas.renderAll();
            } catch (error) {
                
            }
        });
    }


    function deleteComponentImage(deleteComponentId, ) {

        console.log(deleteComponentId)

        pageArray[ui.pageIndex].selectComponent.forEach(element => {
            if (element.componentIndex == deleteComponentId) {
                returnObj(deleteComponentId);
                let activeObject = pageArray[ui.pageIndex].canvas.getActiveObject();
                pageArray[ui.pageIndex].canvas.remove(activeObject);
                pageArray[ui.pageIndex].canvas.renderAll();

                element.componentId = '//deleted//';
                //pageArray[ui.pageIndex].selectComponent = null;
                //pageArray[ui.pageIndex].selectComponent = Array(0);
                ui.currentSelect = null;
                ui.currentSelect = Array(0);
            }
                
        });

        function returnObj(name) {
            pageArray[ui.pageIndex].canvas.getObjects().forEach(function(element) {
                if(element.id == name) {
                    pageArray[ui.pageIndex].canvas.setActiveObject(element);          
                    pageArray[ui.pageIndex].canvas.renderAll();    
                }
            })
        }


    }

    function createComponentImage(data, pageI) {
        
        if (pageI == null)
            pageI = ui.pageIndex;

        var pugImg = new Image();
        pugImg.onload = function (img) {   
                      
            var img = new fabric.Image(pugImg, {
                id: data.componentIndex,
                width: data.width,
                height: data.height,
                left: data.x,
                top: data.y,
                originX: 'left',
                originY: 'top',
            });
            
            img.setControlsVisibility({
                mt: false,
                mb: false,
                ml: false,
                mr: false,
                bl: false,
                br: false,
                tr: false,
                tl: false,
                mtr: false,
            });
            pageArray[pageI].canvas.add(img);
            
        };

        pugImg.src = data.componentImage;


    }




    function setZoomDefault() {
        
        if (ui.currentPageMode == 'page') {

            let zoomLeft = (pageArray[ui.pageIndex].canvas.width - pageArray[ui.pageIndex].defaultObject.box.width * 0.6) / 2;
            let zoomTop = (pageArray[ui.pageIndex].canvas.height - pageArray[ui.pageIndex].defaultObject.box.height * 0.6) / 2;

            pageArray[ui.pageIndex].canvas.setViewportTransform([
                0.6,
                0,
                0,
                0.6,
                zoomLeft,
                zoomTop,
            ]);

            pageArray[ui.pageIndex].defaultObject.title.top = -2000 * 1/roundTwo(pageArray[ui.pageIndex].canvas.getZoom());
            pageArray[ui.pageIndex].defaultObject.title.fontSize = 1000 * 1/roundTwo(pageArray[ui.pageIndex].canvas.getZoom());

            ui.currentZoom = 60;
        }

        else if (ui.currentPageMode == 'component') {

            let zoomLeft = (componentArray[ui.componentIndex].canvas.width - componentArray[ui.componentIndex].defaultObject.box.width * 0.6) / 2;
            let zoomTop = (componentArray[ui.componentIndex].canvas.height - componentArray[ui.componentIndex].defaultObject.box.height * 0.6) / 2;

            
            componentArray[ui.componentIndex].canvas.setViewportTransform([
                0.6,
                0,
                0,
                0.6,
                zoomLeft,
                zoomTop,
            ]);

            componentArray[ui.componentIndex].defaultObject.title.top = -2000 * 1/roundTwo(componentArray[ui.componentIndex].canvas.getZoom());
            componentArray[ui.componentIndex].defaultObject.title.fontSize = 1000 * 1/roundTwo(componentArray[ui.componentIndex].canvas.getZoom());

            ui.currentZoom = 60;
        }
    }


    function alignObject(type) {
        let activeObject = componentArray[ui.componentIndex].canvas.getActiveObject();

        switch (type) {
            case 'top':
                activeObject.set('top', 0)
                currentObject.y = 0;
                break;
            case 'bottom':
                activeObject.set('top', componentArray[ui.componentIndex].defaultObject.box.height - activeObject.height)
                currentObject.y = activeObject.top;
                break;
            case 'left':
                activeObject.set('left', 0)
                currentObject.x = 0;
                break;
            case 'right':
                activeObject.set('left', componentArray[ui.componentIndex].defaultObject.box.width - activeObject.width)
                currentObject.x = activeObject.left;
                break;
            case 'horizontal-center':
                let centerX = componentArray[ui.componentIndex].defaultObject.box.width / 2;
                centerX = parseInt(centerX);
                activeObject.set('left', centerX - parseInt(activeObject.width / 2));
                currentObject.x = activeObject.left;
                break;
            case 'vertical-center':
                let centerY = componentArray[ui.componentIndex].defaultObject.box.height / 2;
                centerY = parseInt(centerY);
                activeObject.set('top', centerY - parseInt(activeObject.height / 2));
                currentObject.y = activeObject.top;
                break;
            case 'down':
                //activeObject.sendBackwards();
                break;
            case 'up':
                activeObject.bringForward();
                break;
            default:
                break;
        }
        componentArray[ui.componentIndex].canvas.renderAll();
    }


    function alignComponentImage(type) {
        let activeObject = pageArray[ui.pageIndex].canvas.getActiveObject();
        let index = returnIndex2(pageArray[ui.pageIndex].selectComponent, activeObject.id);
        ui.objectType = 'componentImage';
        currentObject.object = activeObject;

        switch (type) {
            case 'top':
                currentObject.y = 0;
                activeObject.set({
                    top: 0,
                });
                pageArray[ui.pageIndex].selectComponent[index].y = currentObject.y;
                break;
            case 'bottom':
                activeObject.set({
                    top: pageArray[ui.pageIndex].defaultObject.box.height - activeObject.height,
                });
                currentObject.y = activeObject.top;
                pageArray[ui.pageIndex].selectComponent[index].y = currentObject.y;
                break;
            case 'left':
                currentObject.x = 0;
                activeObject.set({
                    left: 0,
                });
                pageArray[ui.pageIndex].selectComponent[index].x = currentObject.x;
                break;
            case 'right':
                activeObject.set({
                    left: pageArray[ui.pageIndex].defaultObject.box.width - activeObject.width,
                });
                currentObject.x = activeObject.left;
                pageArray[ui.pageIndex].selectComponent[index].x = currentObject.x;
                break;
            case 'horizontal-center':
                let centerX = pageArray[ui.pageIndex].defaultObject.box.width / 2;
                centerX = parseInt(centerX);
                activeObject.set('left', centerX - parseInt(activeObject.width / 2));
                currentObject.x = activeObject.left;                
                break;
            case 'vertical-center':
                let centerY = pageArray[ui.pageIndex].defaultObject.box.height / 2;
                centerY = parseInt(centerY);
                activeObject.set('top', centerY - parseInt(activeObject.height / 2));
                currentObject.y = activeObject.top;
                break;
            default:
                break;
        }
        pageArray[ui.pageIndex].canvas.renderAll();
    }























    












    async function uploadsaveFile() {
        let docData = {
            projectName: projectInfo.projectName,
            createDate: projectInfo.createDate,
            editedDate: new Date(),
            componentArray: [],
            pageArray: [],
            imageSrc: componentArray[0].componentProperty.imageSrc,
        }

        componentArray.forEach((element, index) => {

            loadImage(element.defaultObject.box.width, element.defaultObject.box.height, index);

            let objectArray = element.object.map(function(element2) {
                if (element2.object.type == "rect" || element2.object.type == "ellipse"){
                    return {
                        "index": element2.index,
                        "componentIndex": element2.componentIndex,
                        "tagType": element2.tagType,
                        "x": element2.object.left,
                        "y": element2.object.top,
                        "width": element2.object.width,
                        "height": element2.object.height,
                        "id": element2.object.id,
                        "color": element2.object.fill.substr(1),
                        "stroke": element2.object.stroke.substr(1),
                        "strokeWidth": element2.object.strokeWidth,
                        "when": element2.Event.when,
                        "do": element2.Event.do,
                        "detail": element2.Event.detail,
                    }
                }
                else if (element2.object.type == "i-text"){
                    return {
                        "index": element2.index,
                        "componentIndex": element2.componentIndex,
                        "tagType": element2.tagType,
                        "x": element2.object.left,
                        "y": element2.object.top,
                        "id": element2.object.id,
                        "color": element2.object.fill.substr(1),
                        "fontSize": element2.object.fontSize,
                        "lineHeight": element2.object.lineHeight,
                        "text": element2.object.text,
                        "when": element2.Event.when,
                        "do": element2.Event.do,
                        "detail": element2.Event.detail,
                    }
                }
            });	

            docData.componentArray.push({
                index: element.index,
                path: element.path,
                //canvas: JSON.stringify(element.canvas),
                //canvasData: JSON.stringify(element.canvas.toObject(['id'])),
                zoom: element.zoom,
                canvasId: element.canvasId,
                width: element.defaultObject.box.width,
                height: element.defaultObject.box.height,
                canvasWrapperId: element.canvasWrapperId,
                componentProperty: {
                    "width": element.componentProperty.width,
                    "height": element.componentProperty.height,
                    "imageSrc": element.componentProperty.imageSrc,
                },
                object: objectArray,
            }); 
        });

        pageArray.forEach((element, index) => {

            let selectComponent = element.selectComponent.map(function(element2) {
                return {
                    "componentId": element2.componentId,
                    "componentIndex": element2.componentIndex,
                    "componentImage": element2.componentImage,
                    "width": element2.width,
                    "height": element2.height,
                    "x": element2.x,
                    "y": element2.y,
                }
            });	

            docData.pageArray.push({
                index: element.index,
                path: element.path,
                zoom: element.zoom,
                canvasId: element.canvasId,
                width: element.defaultObject.box.width,
                height: element.defaultObject.box.height,
                canvasWrapperId: element.canvasWrapperId,
                selectComponent: selectComponent,
            })
        })


        await setDoc(doc($firebaseDB, $userUID, projectInfo.projectName), docData).then(function() {
            ui.changeText = 'Done';
            setTimeout(function() {
                ui.changeText = 'Save';
            }, 2000);
        });
    }


    async function loadSaveFile(saveFileArray) {
        
        saveFileArray.componentArray.forEach((element, i)=>{
            if (i == 0) {
                // 0페이지
                componentArray[0].path = element.path;
                componentArray[0].defaultObject.title.text = element.path;
                //componentArray[0].canvas.loadFromJSON(element.canvasData, function() {
                //    componentArray[0].canvas.renderAll();
                //});  
                componentArray[0].componentProperty.width = element.componentProperty.width;
                componentArray[0].componentProperty.height = element.componentProperty.height;
                componentArray[0].componentProperty.imageSrc = element.componentProperty.imageSrc;

                element.object.forEach((obj, i2) => {
                    if (obj.id != '//deleted//') {
                        if (obj.tagType == "rect") {
                            componentArray[0].object[i2] = new ObjectClass(
                                new fabric.Rect({
                                    id: obj.id,
                                    left: obj.x,
                                    top: obj.y,
                                    originX: 'left',
                                    originY: 'top',
                                    width: obj.width,
                                    height: obj.height,
                                    angle: 0,
                                    fill: '#' + obj.color,
                                    stroke: '#' + obj.stroke,
                                    strokeWidth: obj.strokeWidth,
                                    transparentCorners: false,
                                }),
                                obj.index,
                                obj.componentIndex,
                                obj.tagType,
                            )
                        }
                        else if (obj.tagType == "ellipse") {
                            componentArray[0].object[i2] = new ObjectClass(
                                new fabric.Rect({
                                    id: obj.id,
                                    left: obj.x,
                                    top: obj.y,
                                    originX: 'left',
                                    originY: 'top',
                                    rx: obj.width,
                                    ry: obj.height,
                                    angle: 0,
                                    fill: '#' + obj.color,
                                    stroke: '#' + obj.stroke,
                                    strokeWidth: obj.strokeWidth,
                                    transparentCorners: false,
                                }),
                                obj.index,
                                obj.componentIndex,
                                obj.tagType,
                            )
                        }
                        else if (obj.tagType == "i-text") {
                            componentArray[0].object[i2] = new ObjectClass(
                                new fabric.IText(obj.text, {
                                    id: obj.id,
                                    left: obj.x,
                                    top: obj.y,
                                    originX: 'left',
                                    originY: 'top',
                                    editable: true,
                                    hasControls: false,
                                    fontSize: obj.fontSize,
                                    lineHeight: obj.lineHeight,
                                    fill: '#' + obj.color,
                                    fontFamily: 'Nunito',
                                    fontWeight: 200,
                                }),
                                obj.index,
                                obj.componentIndex,
                                obj.tagType,
                            )
                        }

                        componentArray[0].canvas.add(componentArray[0].object[i2].object);

                        if (obj.when != null) {
                            componentArray[0].object[i2].Event.when = obj.when;
                            componentArray[0].object[i2].Event.do = obj.do;
                            componentArray[0].object[i2].Event.detail = obj.detail;
                        }
                    }
                });


                let tempObj = componentArray[0].canvas.getObjects();
                let boxObj, titleObj;
                tempObj.forEach((tempO)=>{
                    if (tempO.id == '///defaultBox///')
                        boxObj = tempO;
                    else if (tempO.id == '///defaultText///')
                        titleObj = tempO
                })
                componentArray[0].canvas.remove(boxObj, titleObj);

                componentArray[0].defaultObject.box = new fabric.Rect({
                    id: '///defaultBox///',
                    left: 0,
                    top: 0,
                    strokeWidth: 0,
                    fill: "#ffffff",
                    stroke: "#ffffff",
                    width: element.width,
                    height: element.height,
                })
                componentArray[0].defaultObject.title = new fabric.Textbox(element.path, {
                    id: '///defaultText///',
                    fontFamily: 'Nunito',
                    width: 200,
                    top: -40,
                    fontSize: 20,
                    fontWeight: '400',
                    fill: '#404040',
                })
                componentArray[0].defaultObject.box.selectable = false;
                componentArray[0].defaultObject.box.hasControls = false;
                componentArray[0].defaultObject.title.selectable = false;
                componentArray[0].defaultObject.title.hasControls = false;

                componentArray[0].canvas.add(componentArray[0].defaultObject.box);
                componentArray[0].canvas.add(componentArray[0].defaultObject.title);
                
                componentArray[0].canvas.moveTo(componentArray[0].defaultObject.box, -1000);
                componentArray[0].defaultObject.box.moveTo(-1000);

            }
            else {
                addPage('component', i)
                componentArray[i].path = element.path;
                componentArray[i].defaultObject.title.text = element.path;
                //componentArray[i].canvas.loadFromJSON(element.canvasData, function() {
                //    componentArray[i].canvas.renderAll();
                //});  
                componentArray[i].componentProperty.width = element.componentProperty.width;
                componentArray[i].componentProperty.height = element.componentProperty.height;
                componentArray[i].componentProperty.imageSrc = element.componentProperty.imageSrc;

                element.object.forEach((obj, i2) => {
                    if (obj.id != '//deleted//') {
                        if (obj.tagType == "rect") {
                            componentArray[i].object[i2] = new ObjectClass(
                                new fabric.Rect({
                                    id: obj.id,
                                    left: obj.x,
                                    top: obj.y,
                                    originX: 'left',
                                    originY: 'top',
                                    width: obj.width,
                                    height: obj.height,
                                    angle: 0,
                                    fill: '#' + obj.color,
                                    stroke: '#' + obj.stroke,
                                    strokeWidth: obj.strokeWidth,
                                    transparentCorners: false,
                                }),
                                obj.index,
                                obj.componentIndex,
                                obj.tagType,
                            )
                        }
                        else if (obj.tagType == "ellipse") {
                            componentArray[i].object[i2] = new ObjectClass(
                                new fabric.Rect({
                                    id: obj.id,
                                    left: obj.x,
                                    top: obj.y,
                                    originX: 'left',
                                    originY: 'top',
                                    rx: obj.width,
                                    ry: obj.height,
                                    angle: 0,
                                    fill: '#' + obj.color,
                                    stroke: '#' + obj.stroke,
                                    strokeWidth: obj.strokeWidth,
                                    transparentCorners: false,
                                }),
                                obj.index,
                                obj.componentIndex,
                                obj.tagType,
                            )
                        }
                        else if (obj.tagType == "i-text") {
                            componentArray[i].object[i2] = new ObjectClass(
                                new fabric.IText(obj.text, {
                                    id: obj.id,
                                    left: obj.x,
                                    top: obj.y,
                                    originX: 'left',
                                    originY: 'top',
                                    editable: true,
                                    hasControls: false,
                                    fontSize: obj.fontSize,
                                    lineHeight: obj.lineHeight,
                                    fill: '#' + obj.color,
                                    fontFamily: 'Nunito',
                                    fontWeight: 200,
                                }),
                                obj.index,
                                obj.componentIndex,
                                obj.tagType,
                            )
                        }

                        componentArray[i].canvas.add(componentArray[i].object[i2].object);

                        if (obj.when != null) {
                            componentArray[i].object[i2].Event.when = obj.when;
                            componentArray[i].object[i2].Event.do = obj.do;
                            componentArray[i].object[i2].Event.detail = obj.detail;
                        }
                    }
                });


                let tempObj = componentArray[i].canvas.getObjects();
                let boxObj, titleObj;
                tempObj.forEach((tempO)=>{
                    if (tempO.id == '///defaultBox///')
                        boxObj = tempO;
                    else if (tempO.id == '///defaultText///')
                        titleObj = tempO
                })
                componentArray[i].canvas.remove(boxObj, titleObj);

                componentArray[i].defaultObject.box = new fabric.Rect({
                    id: '///defaultBox///',
                    left: 0,
                    top: 0,
                    strokeWidth: 0,
                    fill: "#ffffff",
                    stroke: "#ffffff",
                    width: element.width,
                    height: element.height,
                })
                componentArray[i].defaultObject.title = new fabric.Textbox(element.path, {
                    id: '///defaultText///',
                    fontFamily: 'Nunito',
                    width: 200,
                    top: -40,
                    fontSize: 20,
                    fontWeight: '400',
                    fill: '#404040',
                })
                componentArray[i].defaultObject.box.selectable = false;
                componentArray[i].defaultObject.box.hasControls = false;
                componentArray[i].defaultObject.title.selectable = false;
                componentArray[i].defaultObject.title.hasControls = false;

                componentArray[i].canvas.add(componentArray[i].defaultObject.box);
                componentArray[i].canvas.add(componentArray[i].defaultObject.title);
                
                componentArray[i].canvas.moveTo(componentArray[i].defaultObject.box, -1000);
                componentArray[i].defaultObject.box.moveTo(-1000);
            }
        })

        saveFileArray.pageArray.forEach((element, i) => {
            if (i == 0) {
                pageArray[0].canvasId = element.canvasId;
                pageArray[0].canvasWrapperId = element.canvasWrapperId;
                pageArray[0].index = element.index;
                pageArray[0].path = element.path;
                pageArray[0].zoom = element.zoom;

                
                if (element.selectComponent.length > 0) {
                    element.selectComponent.forEach((element2, i2) => {
                        if (element2.componentId != '//deleted//') {
                            pageArray[0].selectComponent[i2] = new SaveFileClass(element2.componentId, element2.componentImage, element2.componentIndex,
                                element2.width, element2.height, element2.x, element2.y
                            );
                        }
                    });
                }

                ui.currentSelect = null;
                ui.currentSelect = Array(0);

                pageArray[0].selectComponent.forEach((element, index2) => {
                    if (element.componentId != '//deleted//') {
                        ui.currentSelect[index2] = String(element.componentIndex);
                        createComponentImage(element, 0)
                    }
                });
            }

            else {
                addPage('page', i)
                pageArray[i].canvasId = element.canvasId;
                pageArray[i].canvasWrapperId = element.canvasWrapperId;
                pageArray[i].index = element.index;
                pageArray[i].path = element.path;
                pageArray[i].zoom = element.zoom;

                if (element.selectComponent.length > 0) {
                    element.selectComponent.forEach((element2, i2) => {
                        pageArray[i].selectComponent[i2] = class {};
                        pageArray[i].selectComponent[i2].componentId = element2.componentId;
                        pageArray[i].selectComponent[i2].componentImage = element2.componentImage;
                        pageArray[i].selectComponent[i2].componentIndex = element2.componentIndex;
                        pageArray[i].selectComponent[i2].height = element2.height;
                        pageArray[i].selectComponent[i2].width = element2.width;
                        pageArray[i].selectComponent[i2].x = element2.x;
                        pageArray[i].selectComponent[i2].y = element2.y;
                    });
                }

                ui.currentSelect = null;
                ui.currentSelect = Array(0);

                pageArray[i].selectComponent.forEach((element, index2) => {
                    if (element.componentId != '//deleted//') {
                        ui.currentSelect[index2] = String(element.componentIndex);
                        createComponentImage(element, i)
                    }
                });
            }
        })

        






        


        pageArray.forEach(element => {
            document.getElementById(element.canvasWrapperId).style.display = 'none';
        });
        componentArray.forEach(element => {
            document.getElementById(element.canvasWrapperId).style.display = 'none';
        });

        document.getElementById('canvas-page-0-wrapper').style.display = 'block';

        pageArray[0].selectComponent.forEach((element, index2) => {
            if (element.componentId != '//deleted//') 
                ui.currentSelect[index2] = String(element.componentIndex);
        });

        CustomSelectComponentChild.refresh(ui.currentSelect);        
        ui.currentPageMode = 'page';
        ui.objectType = 'page';
        ui.pageIndex = 0;
    }
    















    //코드 생성 부분
    var filesIndex = 0;
    var fileNames = [];
    var fileContents = [];
    var preFileNames = [];
    var preFileContents = [];
    
    function createComponentFile() {
        componentArray.forEach(comp => {
            fileContents[filesIndex] = '';
            if(comp.path != '//deleted//') {
                fileContents[filesIndex] += '<'+'script>\n';
                fileContents[filesIndex] += '\timport { push } from "svelte-spa-router";\n'
                fileContents[filesIndex] += '<'+'/script>\n';
                fileContents[filesIndex] += '<'+'main>\n';
                comp.object.forEach(obj => {
                    if(obj.object.id != '//deleted//'){
                        fileContents[filesIndex] += '\t<' + 'div ';
                        fileContents[filesIndex] += 'id="'+obj.object.id+'"';
                        if(obj.Event.when != null){
                            if(obj.Event.when == "Click"){
                                if(obj.Event.do == "Move Page"){
                                    fileContents[filesIndex] += ' on:click={() => { push("'+obj.Event.detail+'") }}';
                                } else {
                                    fileContents[filesIndex] += ' on:click={() => { alert("'+obj.Event.detail+'") }}';
                                }
                            } else {
                                if(obj.Event.do == "Move Page"){
                                    fileContents[filesIndex] += ' on:mouseenter={() => { push("'+obj.Event.detail+'") }}';
                                } else {
                                    fileContents[filesIndex] += ' on:mouseenter={() => { alert("'+obj.Event.detail+'") }}';
                                }
                            }
                        }
                        fileContents[filesIndex] += '>';
                        if(obj.tagType == 'i-text') {
                            obj.object.text = obj.object.text.replace(/,/g, "ST47-B2F5");
                            obj.object.text = obj.object.text.replace(/\n/g, "<br>");
                            obj.object.text = obj.object.text.replace(/ /g, "&nbsp;");
                            fileContents[filesIndex] += obj.object.text;
                            obj.object.text = obj.object.text.replace(/ST47-B2F5/g, ",");
                            obj.object.text = obj.object.text.replace(/<br>/g, "\n");
                            obj.object.text = obj.object.text.replace(/&nbsp;/g, " ");
                        }
                        fileContents[filesIndex] += '<' + '/div' + '>\n';
                    }
                });
                fileContents[filesIndex] += '<'+'/main>\n';
                
                fileContents[filesIndex] += '\n<' + 'style>\n';
                comp.object.forEach(obj => {
                    if(obj.object.id != '//deleted//'){
                        fileContents[filesIndex] += "\t#" + obj.object.id + " {\n";
                        //넓이, 높이, 위치 좌표
                        fileContents[filesIndex] += '\t\tposition: absolute;\n';
                        if(obj.tagType == 'i-text'){
                            fileContents[filesIndex] += '\t\twidth: '+Math.ceil(obj.object.width+10)+'px;\n';
                        } else {
                            fileContents[filesIndex] += '\t\twidth: '+Math.ceil(obj.object.width)+'px;\n';
                        }
                        fileContents[filesIndex] += '\t\theight: '+Math.ceil(obj.object.height)+'px;\n';
                        
                        console.log(obj.object.left);
                        fileContents[filesIndex] += '\t\tleft: '+Math.ceil(obj.object.left)+'px;\n';
                        fileContents[filesIndex] += '\t\ttop: '+Math.ceil(obj.object.top)+'px;\n';
                        //배경색
                        if(obj.tagType == 'i-text'){
                            fileContents[filesIndex] += '\t\tcolor: '+obj.object.fill+';\n';
                        } else {
                            fileContents[filesIndex] += '\t\tbackground-color: '+obj.object.fill+';\n';
                        }
                        //테두리
                        if(obj.object.stroke != null && obj.object.strokeWidth != null){
                            fileContents[filesIndex] += '\t\tborder: '+obj.object.strokeWidth+'px solid '+obj.object.stroke.toUpperCase()+';\n';
                        }
                        
                        //폰트
                        if(obj.tagType == 'i-text'){
                            fileContents[filesIndex] += '\t\tfont-size: '+obj.object.fontSize+'px;\n';
                            fileContents[filesIndex] += '\t\tline-height: '+obj.object.lineHeight+';\n';
                        } else if(obj.tagType == 'ellipse'){
                            fileContents[filesIndex] += '\t\tborder-radius: 50%;\n';
                        }
                        fileContents[filesIndex] += '\t}\n';
                    }
                });
                if(comp.css != null) {
                    comp.css = comp.css.replace(/,/g, "ST47-B2F5");
                    fileContents[filesIndex] += comp.css;
                    comp.css = comp.css.replace(/ST47-B2F5/g, ",");
                }
                fileContents[filesIndex] += '\n<'+'/style>\n';
                fileNames[filesIndex] = "component/"+ comp.path + ".svelte";
                filesIndex+=1;
            }
        });
    }
    function createPageFile() {
        pageArray.forEach(page =>{
            fileContents[filesIndex] = '';
            if(page.path != '//deleted//'){
                fileContents[filesIndex] += '<'+'script>\n';
                page.selectComponent.forEach(sel => {
                    if(sel.componentId != '//deleted//'){
                        fileContents[filesIndex] += "\timport "+sel.componentId+" from './component/"+sel.componentId+".svelte'\n";
                    }
                });
                fileContents[filesIndex] += '</'+'script>\n';
                fileContents[filesIndex] += '<'+'main>\n';
                page.selectComponent.forEach(sel => {
                    if(sel.componentId != '//deleted//'){
                        fileContents[filesIndex] += '\t<'+'div id="'+sel.componentId+'">\n';
                        fileContents[filesIndex] += '\t\t<'+sel.componentId+'></'+sel.componentId+'>\n';
                        fileContents[filesIndex] += '\t</'+'div>\n';
                    }
                });
                fileContents[filesIndex] += '</'+'main>\n';
                fileContents[filesIndex] += '<'+'style>\n';
                page.selectComponent.forEach(sel => {
                    if(sel.componentId != '//deleted//'){
                        fileContents[filesIndex] += "\t#" + sel.componentId + " {\n";
                        fileContents[filesIndex] += '\t\tposition: absolute;\n';
                        fileContents[filesIndex] += '\t\twidth: '+sel.width+'px;\n';
                        fileContents[filesIndex] += '\t\theight: '+sel.height+'px;\n';
                        fileContents[filesIndex] += '\t\ttop: '+sel.y+'px;\n';
                        fileContents[filesIndex] += '\t\tleft: '+sel.x+'px;\n';
                        fileContents[filesIndex] += '\t}\n';
                    }
                });
                fileContents[filesIndex] += '</'+'style>\n';
                if(page.path == '/') {
                    fileNames[filesIndex] = "Root.svelte";
                } else {
                    fileNames[filesIndex] = page.path.substr(1) + ".svelte";
                }
                filesIndex+=1;
            }
        });
    }
    function createRoutesFile() {
        //routes.js
        fileContents[filesIndex] = "";
        pageArray.forEach(page => {
            if(page.path != "//deleted//") {
                if(page.path == '/'){
                    fileContents[filesIndex] += "import Root from './Root.svelte'\n";
                } else {
                    fileContents[filesIndex] += "import "+page.path.substr(1)+" from './"+page.path.substr(1)+".svelte'\n";
                }
            }
        });
        
        fileContents[filesIndex] += "\nconst routes = {\n";
        pageArray.forEach(page => {
            if(page.path != "//deleted//") {
                if(page.path == '/'){
                    fileContents[filesIndex] += "\t'/': RootST47-B2F5\n";
                } else {
                    fileContents[filesIndex] += "\t'"+page.path+"': "+page.path.substr(1)+"ST47-B2F5\n";
                }
            }
        }); 
        fileContents[filesIndex] += "}\n\nexport default routes";
        fileNames[filesIndex] = "routes.js";
        filesIndex += 1;
    }
    function checkUpdatedData() {
        if(fileNames.length != preFileNames.length) return 1;
        if(fileContents.length != preFileContents.length) return 1;
        for(var i=0;i<fileNames.length;i++){
            if(fileNames[i]!=preFileNames[i]) return 1;
        }
        for(var i=0;i<fileContents.length;i++){
            if(fileContents[i]!=preFileContents[i]) return 1;
        }
        return 0;
    }
    function requestData(isUpdated, todo) {
        // todo : 'downloadSvelte', 'downloadCompiled', 'showDemoPage'
        var userName = $userUID;
        var projectName = projectInfo.projectName;
        if(isUpdated == 0){
            const form1 = document.createElement('form');
            form1.method = "post";
            form1.action = "http://118.67.133.164:8080/" + todo;
            document.body.appendChild(form1);
            const formField0 = document.createElement('input');
            formField0.type = 'hidden';
            formField0.name = 'userName';
            formField0.value = userName;
            form1.appendChild(formField0);
            const formField1 = document.createElement('input');
            formField1.type = 'hidden';
            formField1.name = 'projectName';
            formField1.value = projectName;
            form1.appendChild(formField1);
            if(todo == 'showDemoPage'){
                var newWin = window.open("about:blank", "DemoPage");
                form1.target = "DemoPage";
            } else {
                var newWin = window.open("about:blank", "Download");
                form1.target = "Download";
            }
            form1.submit();
        } else {
            const form2 = document.createElement('form');
            form2.method = "post";
            form2.action = "http://118.67.133.164:8080/compile";
            document.body.appendChild(form2);
            const formField0 = document.createElement('input');
            formField0.type = 'hidden';
            formField0.name = 'userName';
            formField0.value = userName;
            form2.appendChild(formField0);
            const formField1 = document.createElement('input');
            formField1.type = 'hidden';
            formField1.name = 'projectName';
            formField1.value = projectName;
            form2.appendChild(formField1);
            const formField2 = document.createElement('input');
            formField2.type = 'hidden';
            formField2.name = 'count';
            formField2.value = filesIndex;
            form2.appendChild(formField2);
            const formField3 = document.createElement('input');
            formField3.type = 'hidden';
            formField3.name = 'fileName';
            formField3.value = fileNames;
            form2.appendChild(formField3);
            const formField4 = document.createElement('input');
            formField4.type = 'hidden';
            formField4.name = 'contents';
            formField4.value = fileContents;
            form2.appendChild(formField4);
            const formField5 = document.createElement('input');
            formField5.type = 'hidden';
            formField5.name = 'todo';
            formField5.value = todo;
            form2.appendChild(formField5);
            if(todo == 'showDemoPage'){
                var newWin = window.open("about:blank", "DemoPage");
                form2.target = "DemoPage";
            } else {
                var newWin = window.open("about:blank", "Download");
                form2.target = "Download";
            }
            form2.submit();
        }
    }






    

</script>



<svelte:window bind:innerWidth bind:innerHeight />


<main>
    <!-- 툴 -->
    <div id="tool-section-box"  class="flex-row flex-space-between" style:width={innerWidth+'px'} style:height={$toolSectionHeight+'px'}>

        <CustomTool1 mouseType={ui.mouseType} currentPageMode={ui.currentPageMode} theme={theme} on:message={(event)=>{
            ui.mouseType = event.detail.data;
        }}/>
        
        <CustomTool2 zoom={ui.currentZoom} currentPageMode={ui.currentPageMode}
        changeText={ui.changeText}
        on:setZoomDefault={()=>{
            setZoomDefault();
        }}
        on:showDemoPage={()=>{
            createComponentFile();
            createPageFile();
            createRoutesFile();
            if(preFileContents.length == 0){
                requestData(1, "showDemoPage");
            } else {
              requestData(checkUpdatedData(), "showDemoPage");
              preFileContents = [];
              preFileNames = [];
            }
            preFileContents = fileContents.slice();
            preFileNames = fileNames.slice();
            fileContents = [];
            fileNames = [];
            filesIndex = 0;
        }}

        on:saveFile={()=>{
            uploadsaveFile();
        }}

        on:exportFileAsSvelte={()=>{
            
            createComponentFile();
            createPageFile();
            createRoutesFile();
            if(preFileContents.length == 0){
                requestData(1, "downloadSvelte");
            } else {
              requestData(checkUpdatedData(), "downloadSvelte");
              preFileContents = [];
              preFileNames = [];
            }
            preFileContents = fileContents.slice();
            preFileNames = fileNames.slice();
            fileContents = [];
            fileNames = [];
            filesIndex = 0;
        }}

        on:exportFileAsBuild={()=>{
            createComponentFile();
            createPageFile();
            createRoutesFile();
            if(preFileContents.length == 0){
                requestData(1, "downloadCompiled");
            } else {
              requestData(checkUpdatedData(), "downloadCompiled");
              preFileContents = [];
              preFileNames = [];
            }
            preFileContents = fileContents.slice();
            preFileNames = fileNames.slice();
            fileContents = [];
            fileNames = [];
            filesIndex = 0;
        }}


        
        ></CustomTool2>

    </div>
    <!-- 툴 -->

    <div class="flex-row flex-space-between">
        <!-- 레이어 -->
        <div id="layer-section-box">
            <CustomLayer pageOrComponent={ui.pageOrComponent} {pageArray} {componentArray} pageIndex={ui.pageIndex} 
            componentIndex={ui.componentIndex} currentPageMode={ui.currentPageMode} 
            currentComponentObjectArray={ui.currentComponentObjectArray} 
            on:selectPageOrComponent={(event)=>{
                ui.pageOrComponent = event.detail.pageOrComponent;
            }}            
            on:createPage={(event)=>{
                if (event.detail.pageOrComponent == 'page') {
                    ui.pageOrComponent = event.detail.pageOrComponent;
                    
                    addPage('page');
                    

                }
                else if (event.detail.pageOrComponent == 'component') {
                    ui.pageOrComponent = event.detail.pageOrComponent;
                    ui.currentComponentObjectArray = new Array(0);
                    ui.componentIndex = event.detail.componentIndex;
                    ui.objectType = 'component';
                    addPage('component');
                    currentComponent.width = componentArray[ui.componentIndex].defaultObject.box.width;
                    currentComponent.height = componentArray[ui.componentIndex].defaultObject.box.height;
                    currentComponent.css = componentArray[ui.componentIndex].css;
                }
                
            }}
            on:changePageComponent={(event)=>{

                if (event.detail.pageOrComponent == 'page') {
                    
                    ui.pageOrComponent = event.detail.pageOrComponent;
                    ui.pageIndex = event.detail.pageIndex;
                    ui.currentPageMode = 'page';

                    pageArray.forEach(element => {
                        document.getElementById(element.canvasWrapperId).style.display = 'none';
                    });
                    componentArray.forEach(element => {
                        document.getElementById(element.canvasWrapperId).style.display = 'none';
                    });

                    componentArray.forEach((element, index) => {
                        loadImage(element.defaultObject.box.width, element.defaultObject.box.height, index);
                    });
                    
                    ui.currentZoom = roundTwo(pageArray[ui.pageIndex].canvas.getZoom());

                    currentObject.id = pageArray[ui.pageIndex].path;

                    document.getElementById('canvas-page-' + ui.pageIndex + '-wrapper').style.display = 'block';
                    
                    ui.objectType = 'page';

                    ui.currentSelect = null;
                    ui.currentSelect = Array(0); 

                    pageArray[ui.pageIndex].selectComponent.forEach((element, index) => {
                        if (element.componentId != '//deleted//')
                            ui.currentSelect[index] = String(element.componentIndex);
                    });

                    pageArray.forEach((element) => {
                        element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                        element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
                    });
                    componentArray.forEach((element) => {
                        element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                        element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
                    });
                    
                    try {
                        CustomSelectComponentChild.refresh(ui.currentSelect);
                    } catch (error) {
                        
                    }

                    //pageArray[ui.pageIndex].canvas.getObjects().forEach(function(element) {
//
                    //    if(element.id === event.detail.objId) {
//
                    //    }
//
                    //});

                    
                }
                else if (event.detail.pageOrComponent == 'component') {

                    ui.pageOrComponent = event.detail.pageOrComponent;
                    ui.componentIndex = event.detail.componentIndex;
                    ui.currentPageMode = 'component';
                    ui.mouseType = event.detail.mouseType;
                    componentArray.forEach(element => {
                        try {
                            element.canvas.discardActiveObject();
                            element.canvas.renderAll();
                        } catch (error) {
                            
                        }
                    });
                    pageArray.forEach(element => {
                        document.getElementById(element.canvasWrapperId).style.display = 'none';
                    });
                    componentArray.forEach(element => {
                        document.getElementById(element.canvasWrapperId).style.display = 'none';
                    });
                
                    ui.currentZoom = roundTwo(componentArray[ui.componentIndex].canvas.getZoom());
                    
                    currentObject.id = componentArray[ui.componentIndex].path;

                    document.getElementById('canvas-component-' + ui.componentIndex + '-wrapper').style.display = 'block';

                    //currentComponentId = 'canvas-component-' + ui.componentIndex;
                
                    ui.objectType = 'component';
                    currentComponent.width = componentArray[ui.componentIndex].defaultObject.box.width;
                    currentComponent.height = componentArray[ui.componentIndex].defaultObject.box.height;
                    currentComponent.css = componentArray[ui.componentIndex].css;

                    ui.currentComponentObjectArray = componentArray[ui.componentIndex].object;
                
                    pageArray.forEach((element) => {
                        element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                        element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
                    });
                    componentArray.forEach((element) => {
                        element.canvas.defaultCursor = `url("../icon/Cursor1.png"), auto`;
                        element.canvas.hoverCursor = `url("../icon/Cursor1.png"), auto`;
                    });
                }
            }}
            on:pageButtonBlur={(event)=>{
                if (event.detail.pageOrComponent == 'page') {
                    pageArray = event.detail.pageArray;
                }
                else if (event.detail.pageOrComponent == 'component') {
                    componentArray = event.detail.componentArray;
                }
            }}
            on:pageButtonEnter={(event)=>{
                if (event.detail.pageOrComponent == 'page') {
                    console.log(event.detail.pageArrayIndex)
                    console.log(event.detail.componentPagePath)
                    pageArray = event.detail.pageArray;
                    pageArray[event.detail.pageArrayIndex].defaultObject.title.text = event.detail.componentPagePath;
                    pageArray[event.detail.pageArrayIndex].canvas.renderAll();
                }
                else if (event.detail.pageOrComponent == 'component') {
                    componentArray = event.detail.componentArray;
                    componentArray[event.detail.componentArrayIndex].defaultObject.title.text = event.detail.componentArrayPath;
                    componentArray[event.detail.componentArrayIndex].canvas.renderAll();
                }
            }}
            on:deletePage={(event)=>{
                if (event.detail.pageOrComponent == 'page') {
                    pageArray = event.detail.pageArray;
                    ui.pageIndex = event.detail.pageIndex;
                }
                else if (event.detail.pageOrComponent == 'component') {
                    componentArray = event.detail.componentArray;
                    ui.componentIndex = event.detail.componentIndex;
                }
            }}
            on:clickActiveObject={(event)=>{
                
                componentArray[ui.componentIndex].canvas.getObjects().forEach(function(element) {
                    
                    if(element.id === event.detail.objId) {
                        
                        componentArray[ui.componentIndex].canvas.setActiveObject(element);
                        componentArray[ui.componentIndex].canvas.renderAll();

                        if (element.type == 'rect') {
                            ui.objectType = 'rect';
                        }

                        if (element.type == 'ellipse') {
                            ui.objectType = 'ellipse';
                        }
                        
                        else if (element.type == 'i-text'){
                            ui.objectType = 'i-text';
                            currentObject.fontSize = element.fontSize;
                            currentObject.lineHeight = element.lineHeight;
                        }
                        currentObject.id = element.id;
                        currentObject.x = element.left;
                        currentObject.y = element.top;
                        currentObject.width = element.width;
                        currentObject.height = element.height;
                    }
                })
                

            }}
            />
        </div>
        <!-- 레이어 -->

        <!-- 캔버스 -->
        <div id="canvas-section-box" style:width={innerWidth-400+'px'}>
            <div id="canvas-page-0-wrapper">
                <canvas id="canvas-page-0"></canvas>
            </div>
            <div id="canvas-component-0-wrapper">
                <canvas id="canvas-component-0"></canvas>
            </div>
        </div>
        <!-- 캔버스 -->

        <!-- 속성 -->
        


        <div id="property-section-box">
            {#if ui.currentPageMode == "component" || ui.objectType == 'componentImage'}
                <CustomProperty bind:this={CustomPropertyChild} type={ui.objectType} currentObject={currentObject} currentComponent={currentComponent}
                {componentArray}  currentSelect={ui.currentSelect} currentPageMode={ui.currentPageMode} propertyOrEvent={ui.propertyOrEvent}
                {pageArray}
                on:eventWhen={(event)=>{
                    currentObject.Event.when = event.detail.data;
                    componentArray[ui.componentIndex].object.forEach(element => {
                        
                        if (element.object.id == currentObject.id) {
                            element.Event.when = event.detail.data;
                        }
                    });
                }}

                on:eventDo={(event)=>{
                    currentObject.Event.do = event.detail.data;
                    componentArray[ui.componentIndex].object.forEach(element => {
                        
                        if (element.object.id == currentObject.id) {
                            element.Event.do = event.detail.data;
                        }
                    });
                }}

                on:eventDetail={(event)=>{
                    currentObject.Event.detail = event.detail.data;
                    componentArray[ui.componentIndex].object.forEach(element => {
                        
                        if (element.object.id == currentObject.id) {
                            element.Event.detail = event.detail.data;
                        }
                    });
                }}

                on:eventReset={()=>{
                    currentObject.Event.when = null;
                    currentObject.Event.do = null;
                    currentObject.Event.detail = null;
                    componentArray[ui.componentIndex].object.forEach(element => {
                        
                        if (element.object.id == currentObject.id) {
                            element.Event.when = null;
                            element.Event.do = null;
                            element.Event.detail = null;
                        }
                    });
                }}


                on:editComponentImageProperty={(event)=>{
                    let activeObject = pageArray[ui.pageIndex].canvas.getActiveObject();
                    if (event.detail.x != undefined && event.detail.y != undefined) {
                        currentObject.x = event.detail.x;
                        currentObject.y = event.detail.y;
                        activeObject.left = currentObject.x;
                        activeObject.top = currentObject.y;
                        
                        pageArray[ui.pageIndex].selectComponent.forEach((element, index) => {
                            if (element.componentIndex == activeObject.id) {
                                element.x = currentObject.x;
                                element.y = currentObject.y;
                            }
                        })
                        pageArray[ui.pageIndex].canvas.renderAll()
                    }
                }}

                on:alignObject={(event)=>{
                    alignObject(event.detail.type)
                }}

                on:alignComponentImage={(event)=>{
                    alignComponentImage(event.detail.type)
                }}

                

                on:editObjectProperty={(event)=>{

                    let activeObject = componentArray[ui.componentIndex].canvas.getActiveObject();
                    
                    if (event.detail.id != undefined) {
                        currentObject.id = event.detail.id;
                        currentObject.activeObject.set('id', currentObject.id)
                    }
                    if (event.detail.x != undefined && event.detail.y != undefined) {
                        currentObject.x = event.detail.x;
                        currentObject.y = event.detail.y;
                        activeObject.set('left', currentObject.x)
                        activeObject.set('top', currentObject.y)
                    }
                    if (event.detail.width != undefined && event.detail.height != undefined) {
                        currentObject.width = event.detail.width;
                        currentObject.height = event.detail.height;
                        activeObject.set('width', currentObject.width)
                        activeObject.set('height', currentObject.height)
                    }
                    if (event.detail.color != undefined) {
                        currentObject.color = event.detail.color;
                        activeObject.set('fill', '#' + currentObject.color)
                    }
                    if (event.detail.stroke != undefined && event.detail.strokeWidth != undefined) {
                        currentObject.stroke = event.detail.stroke;
                        currentObject.strokeWidth = event.detail.strokeWidth;
                        activeObject.set('stroke', '#' +  currentObject.stroke)
                        activeObject.set('strokeWidth', currentObject.strokeWidth)
                    }

                    if (event.detail.fontSize != undefined) {
                        currentObject.fontSize = event.detail.fontSize;
                        activeObject.set('fontSize', currentObject.fontSize)
                    }

                    if (event.detail.lineHeight != undefined) {
                        currentObject.lineHeight = event.detail.lineHeight;
                        activeObject.set('lineHeight', currentObject.lineHeight)
                    }

                    

                    componentArray[ui.componentIndex].canvas.renderAll()
                    ui.currentComponentObjectArray = componentArray[ui.componentIndex].object;
                    
                }}

                on:editComponentProperty={(event)=>{
                    if (event.detail.width != undefined) {
                        currentComponent.width = event.detail.width*1;
                        componentArray[ui.componentIndex].defaultObject.box.set('width', currentComponent.width)
                    }

                    if (event.detail.height != undefined) {
                        currentComponent.height = event.detail.height*1;
                        componentArray[ui.componentIndex].defaultObject.box.set('height', currentComponent.height)
                    }

                    if (event.detail.css != undefined) {
                        currentComponent.css = event.detail.css;
                        componentArray[ui.componentIndex].css = currentComponent.css;
                    }

                    componentArray[ui.componentIndex].canvas.renderAll()
                    
                }}
                
                ></CustomProperty>

                <!--
                {#if ui.currentPageMode == "component"}

                <CustomSelectComponent bind:this={CustomSelectComponentChild} mode={'hide'} type={ui.objectType} componentArray={componentArray} 
                ></CustomSelectComponent>
                {:else if ui.objectType != 'componentImage'}
                <CustomSelectComponent bind:this={CustomSelectComponentChild} mode={'hide'} type={ui.objectType} componentArray={componentArray} 
                ></CustomSelectComponent>
                {/if}
                -->

            {:else if ui.currentPageMode == "page" && ui.objectType != 'componentImage'}
                <CustomSelectComponent bind:this={CustomSelectComponentChild} mode={'show'} type={ui.objectType} componentArray={componentArray}
                    currentSelect={ui.currentSelect}
                    on:selectComponent1={(event)=>{
                        let length = pageArray[ui.pageIndex].selectComponent.length
                        pageArray[ui.pageIndex].selectComponent[length] = event.detail.data
                        createComponentImage(event.detail.data);
                    }}
                    on:deselectComponent1={(event)=>{
                        deleteComponentImage(event.detail.data, event.detail.componentIndex, event.detail.list)
                    }}
                
                ></CustomSelectComponent>

            {/if}

            
            
        </div>
        <!-- 속성 -->

    </div>
    
    
</main>



<style>

    .flex-row {
        display: flex;
        flex-direction: row;
    }

    .flex-space-between {
        justify-content: space-between;
    }

    #canvas-section-box {
        background-color: #c4c4c4;
    }

    #layer-section-box {
        width: 200px;
    }

    #property-section-box {
        width: 200px;
    }



</style>

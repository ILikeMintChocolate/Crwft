<script>
    import { push } from 'svelte-spa-router'

    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { initializeApp } from "firebase/app";
    import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where } from "firebase/firestore";
    import { onMount } from 'svelte';

    import { loadArray } from './store.js';
    import { userUID } from './store.js';
    import { firebaseDB } from './store.js';
    import { firebaseApp } from './store.js';

    $loadArray = null;


    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    let userEmail;
    let userThumbnail;

    const firebaseConfig = {
        apiKey: "AIzaSyDEZQSqcTsgGP1h39f1KY_jYa9vvlnVcKs",
        authDomain: "crwft-db1eb.firebaseapp.com",
        projectId: "crwft-db1eb",
        storageBucket: "crwft-db1eb.appspot.com",
        messagingSenderId: "301560353293",
        appId: "1:301560353293:web:2ce6281a58c7ee3d12fb44",
    };

    $firebaseApp = initializeApp(firebaseConfig);
    $firebaseDB = getFirestore($firebaseApp);
    

    let fileArray = []

    const getUserUID = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        $userUID = user.uid
        userEmail = user.email;
        userThumbnail = user.photoURL;
        return user.uid;
    };

    const normalizeData = (tempArray1) => {
        for (let i = 0; i < tempArray1.length; i++) {
            let date1 = new Date(tempArray1[i].createDate['seconds'] * 1000);
            tempArray1[i].createDate = `${date1.getFullYear()}/${date1.getMonth()+1}/${date1.getDate()} ${date1.getHours()}:${date1.getMinutes()}`;
            let date2 = new Date(tempArray1[i].editedDate['seconds'] * 1000);
            tempArray1[i].editedDate = `${date2.getFullYear()}/${date2.getMonth()+1}/${date2.getDate()} ${date2.getHours()}:${date2.getMinutes()}`;
        }
        return tempArray1;
    }

    async function getOrdersByUser() {
        const tempUserUID = getUserUID();
        //const tempUserUID = 'Kolhg56pseZMgMPrq1Ou6E6O1HE2';
        const querySnapshot = await getDocs(collection($firebaseDB, tempUserUID));

        let tempArray1 = [];
        querySnapshot.forEach((doc) => {
            if (doc.data()) {
                tempArray1.push(doc.data());
            }
        });

        let tempArray2 = await normalizeData(tempArray1);


        return tempArray2;
    }

    onMount(async () => {
        fileArray = await getOrdersByUser();
    }, []);


    let hoverBool = false;

    function enterButtonHover() {
        hoverBool = true;
    }

    function enterButtonLeave() {
        hoverBool = false;
    }

    let buttonWrapper;
    let enterButton;

    function clickCreateFileButton() {
        push(`/editor/${fileArray.length}`)
    }
    


</script>


<svelte:window bind:innerWidth bind:innerHeight />


<main style="width: {innerWidth}px; height: {innerHeight}px; ">
    <div id="user-section" style="width: {innerWidth}px;">
        <div class="center-row"  style="width: 50px; height:50px">
            <div class="center-column"  style="width: 36px; height:50px">
                <div id="user-thumbnail-wrapper">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img id="user-thumbnail" src={userThumbnail}>
                </div>
            </div>
        </div>

        <div class="center-row"  style="width: 200px; height:50px">
            <div class="center-column"  style="width: 200px; height:50px">
                <div id="user-email">{userEmail}</div>
            </div>
        </div>
        
        
    </div>
    <div id="home-section-box" style="width: {innerWidth}px;">
        <div id="home-section" style="height: {innerHeight-50}px">
        
            <div id="page-title">내 활동</div>

            <div id="button-wrapper" bind:this={buttonWrapper}>
                <button id="create-file-button" on:click={clickCreateFileButton}>
                    <div class="page-icon-1">
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="11" width="6" height="1" fill="#FFFCEF"/>
                            <rect x="3" y="9" width="6" height="1" fill="#FFFCEF"/>
                            <rect x="3" y="7" width="6" height="1" fill="#FFFCEF"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H8V1H1V15H11V4H12V16H0V0Z" fill="#FFFCEF"/>
                            <rect x="7" y="1" width="1" height="3" fill="#FFFCEF"/>
                            <rect x="7" y="5" width="1" height="4" transform="rotate(-90 7 5)" fill="#FFFCEF"/>
                            <rect x="8.00854" y="0.0206299" width="5.63619" height="1.19861" transform="rotate(45 8.00854 0.0206299)" fill="#FFFCEF"/>
                        </svg>
                    </div>
                    <div id="button-title">
                        새 작업
                    </div>
                    <div class="plus-icon">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="4" width="9" height="1" fill="#FFFCEF"/>
                            <rect x="4" y="9" width="9" height="1" transform="rotate(-90 4 9)" fill="#FFFCEF"/>
                        </svg>
                    </div>
                </button>


                <div id="enter-share-button-wrapper">
                    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                    <button id="enter-share-button" on:mouseover={enterButtonHover} on:mouseleave={enterButtonLeave}>
                        {#if hoverBool==false}
                        <div id="before-hover">
                            <div class="center-column">                            
                                <div id="enter-button-title" style="width: 180px;" bind:this={enterButton}>
                                    <div>
                                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0L12 8L0 16V0Z" fill="#4DB15D"/>
                                        </svg>
                                    </div>
                                    <div style="margin-top: -2px;">공유 작업 보기</div>
                                </div>
                            </div>
                        </div>
                        {:else}
                        <div id="after-hover" style="height: 50px;">
                            <div class="center-column"  style="height: 50px;">
                                <div class="center-row">
                               
                                    <input class="input" id="roomCode" type="text" value="" required placeholder="참여코드">
                                    <input class="input" id="userName" type="text" value="" required placeholder="이름">
                                
                                    <button id="enter-button" on:click={()=>{
                                        push(`/demo/code=${document.getElementById("roomCode").value},name=${document.getElementById("userName").value}`)
                                    }}>
                                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0L12 8L0 16V0Z" fill="#4DB15D"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/if}
                    </button>
                </div>

            </div>



















            <div id="file-array" class="grid-container scroll-style" >
                {#each fileArray as file}
                    {#if file.projectName != undefined}
                    
                        <div class="grid-item" on:click={(event) => {
                            let target = event.path[0]
                            fileArray.forEach((element) => {

                                let tempProjectName;
                                
                                if (event.target.parentNode.classList.contains('grid-item'))
                                    tempProjectName = event.target.parentNode.childNodes[2].childNodes[2].innerText
                            
                                else if (event.target.parentNode.classList.contains('info-wrapper'))
                                    tempProjectName = event.target.parentNode.childNodes[2].innerText

                                if (element.projectName == tempProjectName)
                                    $loadArray = element
                                    
                            });
                            
                            push(`/editor/${$loadArray.projectName}`)
                        }}>
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <img class="image-class" src={file.imageSrc}>
                            <div class="flex-row info-wrapper">
                                <div class="page-icon-2">
                                </div>
                                <div class="file-title">
                                    {file.projectName}
                                </div>
                                <div class="file-date">
                                    {file.editedDate}
                                </div>
                            </div>
                        </div>
                        
                    {:else}
                        <div>새로운 작업을 시작해보세요!</div>
                    {/if}

                {/each}
                
            </div>
        </div>
    </div>
    
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

    
    main {
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        flex-direction: column;
        overflow:hidden;
    }

    .center-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .center-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #user-section {
        height: 50px;
        display: flex;
        justify-content: right;
        flex-direction: row;
    }

    #user-email {
        color: #8E8E8E;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 400;
        font-size: 12px;
        margin-left: 16px;
    }

    #home-section {
        width: 920px;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
    }

    #home-section-box {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    #page-title {
        color: #282828;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
        font-size: 36px;
    }

    #create-file-button {
        width: 180px;
        height: 50px;
        background-color: #18A0FB;
        border: 0;
        border-radius: 8px;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
    }

    #create-file-button:focus {
        border: 0;
    }

    #button-title {
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 200;
        font-size: 18px;
        color: #ffffff;
        margin-top: 5px;
    }

    .page-icon-1 {
        width: 12px;
        height: 16px;
        margin-top: 10px;
    }

    .page-icon-2 {
        width: 12px;
        height: 16px;
        margin-top: 18px;
    }

    .plus-icon {
        width: 9px;
        height: 9px;
        margin-top: 6px;
    }

    #file-array {
        width: 900px;
        height: 700px;
    }


    .scroll-style {
        overflow: scroll;
        overflow-x: hidden;
    }

    .scroll-style::-webkit-scrollbar {
        width: 4px;
    }

    .scroll-style:hover::-webkit-scrollbar {
        width: 4px;
    }

    .scroll-style::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .scroll-style::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: #C4C4C4;
    }

    .scroll-style::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }

    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .grid-item {
        width: 180px;
        height: 220px;
        border: 1px solid #E5E5E5;
        margin-bottom: 17px;
        display: flex;
        flex-direction: column;
    }

    .image-class {
        width: 180px;
        height: 170px;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .file-title {
        color: #404040;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 400;
        font-size: 14px;
        margin-top: 15px;
    }

    .file-date {
        color: #949494;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 400;
        font-size: 10px;
        margin-top: 18px;
    }

    #user-thumbnail-wrapper {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        overflow: hidden;
    }

    #user-thumbnail {
        width: 32px;
        height: 32px;
    }

    #button-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 525px;
        height: 50px;
    }



    #enter-share-button {
        border: 1px solid #4DB15D;
        width: 180px;
        height: 50px;
        border-radius: 8px;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        background-color: #ffffff;
        margin: 0;
        padding: 0;
        
    }

    #enter-share-button:hover {
        animation-name: scaleButton;
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-play-state: running;
    }

    @keyframes scaleButton {
        from {
          width: 180px;
          height: 50px;
        }
        to {
          width: 250px;
          height: 50px;
        }
    }


    #enter-button-title {
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 200;
        font-size: 18px;
        color: #383838;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        
    }

    #enter-share-button-wrapper {
        width: 300px;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: left;
    }
    
    #before-hover {
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        width: 180px;
        height: 50px;
    }

    #roomCode {
        width: 80px;
        height: 30px;
        border: 0;
        background-color: transparent;
    }

    
    #userName {
        width: 80px;
        height: 30px;
        border: 0;
        background-color: transparent;
    }

    .input {
        margin-top: 8px;
    }

    .input:focus {
        border: 0;
        outline: 0; 
    }

    #enter-button {
        border: 0;
        background-color: transparent;
        margin-top: 8px;
    }

    #enter-button:focus {
        background-color: transparent;
        border: 0;
    }

    
</style>

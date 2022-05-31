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
    const auth = getAuth();
    

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
            let date = new Date(tempArray1[i].changeDate['seconds'] * 1000);
            tempArray1[i].changeDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        }
        return tempArray1;
    }

    async function getOrdersByUser() {
        const tempUserUID = getUserUID();
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



    
    
    





    

    function clickFile() {
        alert('파일 불러오기')
    }

    
    
    

    console.log(fileArray.length)
    

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
        
            <div id="page-title">My Workspace</div>

            <button id="create-file-button" on:click={()=>{
                push(`/editor/${fileArray.length}`)
            }}>
                <div class="page-icon-1">
                </div>
                <div id="button-title">
                    New File
                </div>
                <div class="plus-icon">
                </div>
                
            </button>

            <div id="file-array" class="grid-container scroll-style" >
                {#each fileArray as file}
                    {#if file.projectName != undefined}
                    
                        <div class="grid-item" on:click={(event) => {
                            let target = event.path[0]
                            fileArray.forEach((element) => {
                                if (element.projectName == target.childNodes[0].childNodes[2].innerHTML)
                                    $loadArray = element
                            });
                            console.log($loadArray)
                            
                            push(`/editor/${$loadArray.projectName}`)
                        }}>
                            <!--<img class="image-class" src={file.image}>-->
                            <div class="flex-row">
                                <div class="page-icon-2">
                                </div>
                                <div class="file-title">
                                    {file.projectName}
                                </div>
                                <div class="file-date">
                                    {file.changeDate}
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
        font-weight: 700;
        font-size: 18px;
        color: #ffffff;
        margin-top: 5px;
    }

    .page-icon-1 {
        width: 12px;
        height: 16px;
        background-image: url('../icon/pageIcon.png');
        margin-top: 10px;
    }

    .page-icon-2 {
        width: 12px;
        height: 16px;
        background-image: url('../icon/pageIcon2.png');
        margin-top: 18px;
    }

    .plus-icon {
        width: 9px;
        height: 9px;
        /*background-image: url('../icon/plusIcon.png');*/
        margin-top: 14px;
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

    
</style>

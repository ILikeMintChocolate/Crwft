<script>
    import { push } from 'svelte-spa-router'
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { initializeApp } from "firebase/app";
    
    const firebaseConfig = {
        apiKey: "AIzaSyDEZQSqcTsgGP1h39f1KY_jYa9vvlnVcKs",
        authDomain: "crwft-db1eb.firebaseapp.com",
        projectId: "crwft-db1eb",
        storageBucket: "crwft-db1eb.appspot.com",
        messagingSenderId: "301560353293",
        appId: "1:301560353293:web:2ce6281a58c7ee3d12fb44",
    };
    const firebaseApp = initializeApp(firebaseConfig);

    
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    function clickLoginButton() {
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            push('/home')
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }









</script>


<svelte:window bind:innerWidth bind:innerHeight />


<main style="width: {innerWidth}px; height: {innerHeight}px">
    <div class="center-row">
        <div class="center-column">
            <div id="login-section">
                <div style="margin-left: 70px;">
                    <h1>
                        Welcome !
                    </h1>
                    <h3>
                        Please Sign in to continue
                    </h3>
                
                </div>

                <div class="center-row" style="width: 340px;">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img id="google-auth-normal-button" src="/resource/btn_google_signin_light_normal_web.png" class="center-column" on:click={clickLoginButton}>
                </div>

            </div>
        </div>
    </div>


</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

    main {
        background: rgba(24, 160, 251, 0.05);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }

    #login-section {
        width: 340px;
        height: 600px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    h1 {
        color: #282828;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
        font-size: 30px;
    }

    h3 {
        color: #8E8E8E;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 400;
        font-size: 16px;
        margin-top: -10px;
    }

    #google-auth-normal-button {
        width: 191px;
        height: 46px;
        cursor: pointer;

        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        -webkit-user-drag: none;
    }

    .center-row {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    .center-column {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    #background-image {
        position: absolute;
        width: 1355px;
        height: 738px;
        left: 300px;
        top: 302px;
    }

    #background-image-wrapper {
        position: absolute;
        width: 1355px;
        height: 738px;
        left: 300px;
        top: 302px;
        background-color: antiquewhite;
    }
</style>



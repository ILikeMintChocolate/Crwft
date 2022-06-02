<script>
    let splitString1 = window.location.href.split('code=');
    let splitString2 = splitString1[1].split(',name=');

    let roomCode = splitString2[0]
    let userName = splitString2[1]

    console.log(roomCode)
    console.log(userName)
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<main>

    <!-- svelte-ignore a11y-missing-attribute -->
    <iframe src={"https://crwftwebrtc.loca.lt/enter?code="+roomCode+"&name="+userName} style="width: 100%; height:99vh" allow="display-capture; autoplay;"></iframe>
</main>


<style>

    main {
        overflow: hidden; 
        
    }

    iframe {
        border: 0;
    }
    
</style>

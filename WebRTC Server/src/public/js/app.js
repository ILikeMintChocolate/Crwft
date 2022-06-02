if (window.location.href == "http://localhost:8000/creator") {
    const socket = io();
    
    let myStream;

    let roomName = "";
    let nickname = "";
    let myPeerConnection;
    let peopleInRoom = 1;

    var pcObj = {};

    let creator = false;

    let isSharing = false;

    const roomCode = document.getElementById("roomCode");

    async function getMedia() {
        try {
            myStream = await navigator.mediaDevices.getDisplayMedia({
                preferCurrentTab: true,
            });

            if (!creator) {
                myStream.getTracks().forEach((track) => track.stop());
            }

            writeChat("공유를 시작하였습니다.", NOTICE_CN);
        } catch (error) {
            console.log(error);
        }
    }


    async function initCall() {
        await getMedia();
    }

    const shareScreen = document.getElementById("shareScreen");


    function handleCreateRoomClick() {
        let code = Math.random().toString(36).substr(2, 11);
        roomName = code;
    }

    async function handleCreateRoomSubmit(event) {
        creator = true;

        event.preventDefault();

        if (socket.disconnected) {
            socket.connect();
        }

        nickname = "디자이너";
        socket.emit("create_room", roomName, nickname);
        
    }

    if (shareScreen) {
        shareScreen.addEventListener("click", handleCreateRoomSubmit);
    }


    const chatForm = document.querySelector("#chatForm");
    const chatBox = document.querySelector("#chatBox");

    const MYCHAT_CN = "myChat";
    const NOTICE_CN = "noticeChat";
    const SOMEONE_CN = "someoneChat";

    chatForm.addEventListener("submit", handleChatSubmit);

    function handleChatSubmit(event) {
        event.preventDefault();
        const chatInput = chatForm.querySelector("input");
        const message = chatInput.value;
        console.log(chatInput.value);
        if (chatInput.value != "") {
            chatInput.value = "";
            socket.emit("chat", `${nickname}: ${message}`, roomName);
            writeChat(`${message}`, MYCHAT_CN);
        }
    }

    function writeChat(message, className = null) {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const span = document.createElement("span");
        span.innerText = message;
        div.classList.add("myChatDiv");
        span.classList.add("myChatSpan");
        div.appendChild(span);
        li.appendChild(div);
        li.classList.add(className);
        chatBox.prepend(li);
    }



    function clearAllChat() {
        const chatArr = chatBox.querySelectorAll("li");
        chatArr.forEach((chat) => chatBox.removeChild(chat));
    }


    socket.on("reject_join", () => {
        roomName = "";
        nickname = "";
    });

    socket.on("room_notExists", () => {
        roomName = "";
        nickname = "";
    });

    socket.on("same_RoomName", () => {
        roomName = "";
        nickname = "";
    });

    socket.on("no_nickName", () => {
        nickname = "";
    });

    socket.on("accept_join", async (userObjArr) => {
        await initCall();
        roomCode.innerText = '참여코드: ' + roomName;
        const length = userObjArr.length;
        if (length === 1) {
            return;
        }

        for (let i = 0; i < length - 1; ++i) {
            try {
                console.log("1");
                const newPC = createConnection(
                    userObjArr[i].socketId,
                    userObjArr[i].nickname
                );
                console.log(myPeerConnection);
                console.log("2");
                const offer = await newPC.createOffer();
                console.log("3");
                await newPC.setLocalDescription(offer);
                console.log("4");
                socket.emit("offer", offer, userObjArr[i].socketId, nickname);
                console.log("5");
                writeChat(
                    `'${userObjArr[i].nickname} 입장하였습니다.'`,
                    NOTICE_CN
                );
                console.log("6");
            } catch (err) {
                console.error(err);
            }
        }
        writeChat("채팅에 입장하였습니다.", NOTICE_CN);
    });

    socket.on("offer", async (offer, remoteSocketId, remoteNickname) => {
        console.log("offer");
        try {
            const newPC = createConnection(remoteSocketId, remoteNickname);
            await newPC.setRemoteDescription(offer);
            const answer = await newPC.createAnswer();
            await newPC.setLocalDescription(answer);
            socket.emit("answer", answer, remoteSocketId);
            writeChat(`${remoteNickname} 님이 입장하였습니다.`, NOTICE_CN);
        } catch (err) {
            console.error(err);
        }
    });

    socket.on("answer", async (answer, remoteSocketId) => {
        await pcObj[remoteSocketId].setRemoteDescription(answer);
    });

    socket.on("ice", async (ice, remoteSocketId) => {
        await pcObj[remoteSocketId].addIceCandidate(ice);
    });

    socket.on("chat", (message) => {
        writeChat(message, SOMEONE_CN);
    });

    socket.on("leave_room", (leavedSocketId, nickname) => {
        writeChat(`${nickname} 님이 나갔습니다.`, NOTICE_CN);
        --peopleInRoom;
    });

    function createConnection(remoteSocketId, remoteNickname) {
        myPeerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302",
                        "stun:stun3.l.google.com:19302",
                        "stun:stun4.l.google.com:19302",
                    ],
                },
            ],
        });

        myPeerConnection.addEventListener("icecandidate", (event) => {
            handleIce(event, remoteSocketId);
        });

        myPeerConnection.addEventListener("addstream", (event) => {
            handleAddStream(event, remoteSocketId, remoteNickname);
        });

        myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));

        pcObj[remoteSocketId] = myPeerConnection;

        ++peopleInRoom;
        return myPeerConnection;
    }

    function handleIce(event, remoteSocketId) {
        if (event.candidate) {
            socket.emit("ice", event.candidate, remoteSocketId);
        }
    }

    let onlyOnce = false;

    function handleAddStream(event, remoteSocketId, remoteNickname) {
        if (onlyOnce == false) {
            creatorStream = event.stream;
            onlyOnce = true;
        }
    }


    async function addLocalStreamToPeerConnection(localStream) {
        localStream
            .getTracks()
            .forEach((track) => myPeerConnection.addTrack(track, localStream));
    }

    handleCreateRoomClick();
} 














else {
    //console.log(window.location.href);
    

    let params = new URL(document.location).searchParams;
    let urlCode = params.get("code");
    let urlName = params.get("name");

    



    const socket = io();
    const myID = document.querySelector("#myID");
    const myFace = document.querySelector("#myFace");
    const call = document.querySelector("#call");

    const HIDDEN_CN = "hidden";

    let myStream;

    let roomName = "";
    let nickname = "";
    let peopleInRoom = 1;
    let peerC;
    let myPeerConnection;

    var pcObj = {};

    let creator = false;
    let creatorStream;

    async function getMedia(deviceId) {
        try {
            myStream = await navigator.mediaDevices.getDisplayMedia();

            if (creator) {
                myFace.srcObject = myStream;
                myFace.muted = true;
                myID.innerText = myStream.id;
            }

            if (!creator) {
                myStream.getTracks().forEach((track) => track.stop());
            }

        } catch (error) {
            console.log(error);
        }
    }



    async function initCall() {
        await getMedia();
    }


    function handleJoinRoomBtnSubmit(event) {
        // join room 눌렀을떄

        if (socket.disconnected) {
            socket.connect();
        }
        roomName = urlCode;
        nickname = urlName;
        socket.emit("join_room", roomName, nickname);
    }




   

    const chatForm = document.querySelector("#chatForm");
    const chatBox = document.querySelector("#chatBox");

    const MYCHAT_CN = "myChat";
    const NOTICE_CN = "noticeChat";
    const SOMEONE_CN = "someoneChat";

    chatForm.addEventListener("submit", handleChatSubmit);

    function handleChatSubmit(event) {
        event.preventDefault();
        const chatInput = chatForm.querySelector("input");
        const message = chatInput.value;
        if (chatInput.value != "") {
            chatInput.value = "";
            socket.emit("chat", `${nickname}: ${message}`, roomName);
            writeChat(`${message}`, MYCHAT_CN);
        }
    }

    function writeChat(message, className = null) {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const span = document.createElement("span");
        span.innerText = message;
        div.classList.add("myChatDiv");
        span.classList.add("myChatSpan");
        div.appendChild(span);
        li.appendChild(div);
        li.classList.add(className);
        chatBox.prepend(li);
    }





    function removeVideo(leavedSocketId) {
        const streams = document.querySelector("#streams");
        const streamArr = streams.querySelectorAll("div");
        streamArr.forEach((streamElement) => {
            if (streamElement.id === leavedSocketId) {
                streams.removeChild(streamElement);
            }
        });
    }

    function clearAllVideos() {
        const streams = document.querySelector("#streams");
        const streamArr = streams.querySelectorAll("div");
        streamArr.forEach((streamElement) => {
            if (streamElement.id != "myStream") {
                streams.removeChild(streamElement);
            }
        });
    }

    function clearAllChat() {
        const chatArr = chatBox.querySelectorAll("li");
        chatArr.forEach((chat) => chatBox.removeChild(chat));
    }

    socket.on("reject_join", () => {
        roomName = "";
        nickname = "";
    });

    socket.on("room_notExists", () => {
        roomName = "";
        nickname = "";
    });

    socket.on("same_RoomName", () => {
        roomName = "";
        nickname = "";
    });

    socket.on("no_nickName", () => {
        nickname = "";
    });

    socket.on("accept_join", async (userObjArr) => {
        await initCall();
        const length = userObjArr.length;
        if (length === 1) {
            return;
        }

        for (let i = 0; i < length - 1; ++i) {
            try {
                const newPC = createConnection(
                    userObjArr[i].socketId,
                    userObjArr[i].nickname
                );
                const offer = await newPC.createOffer();
                await newPC.setLocalDescription(offer);
                socket.emit("offer", offer, userObjArr[i].socketId, nickname);
                //writeChat(`' ${userObjArr[i].nickname} '`, NOTICE_CN);
            } catch (err) {
                console.error(err);
            }
        }
        writeChat("채팅에 입장하였습니다.", NOTICE_CN);
    });

    socket.on("offer", async (offer, remoteSocketId, remoteNickname) => {
        console.log("offer");
        try {
            const newPC = createConnection(remoteSocketId, remoteNickname);
            await newPC.setRemoteDescription(offer);
            const answer = await newPC.createAnswer();
            await newPC.setLocalDescription(answer);
            socket.emit("answer", answer, remoteSocketId);
            writeChat(`${remoteNickname} 님이 입장하였습니다.`, NOTICE_CN);
        } catch (err) {
            console.error(err);
        }
    });

    socket.on("answer", async (answer, remoteSocketId) => {
        await pcObj[remoteSocketId].setRemoteDescription(answer);
    });

    socket.on("ice", async (ice, remoteSocketId) => {
        await pcObj[remoteSocketId].addIceCandidate(ice);
    });

    socket.on("chat", (message) => {
        writeChat(message, SOMEONE_CN);
    });

    socket.on("leave_room", (leavedSocketId, nickname) => {
        removeVideo(leavedSocketId);
        writeChat(`${nickname} 님이 나갔습니다.`, NOTICE_CN);
        --peopleInRoom;
        sortStreams();
    });

    // RTC code

    function createConnection(remoteSocketId, remoteNickname) {
        myPeerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302",
                        "stun:stun3.l.google.com:19302",
                        "stun:stun4.l.google.com:19302",
                    ],
                },
            ],
        });

        myPeerConnection.addEventListener("icecandidate", (event) => {
            handleIce(event, remoteSocketId);
        });

        myPeerConnection.addEventListener("addstream", (event) => {
            handleAddStream(event, remoteSocketId, remoteNickname);
        });

        myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));

        pcObj[remoteSocketId] = myPeerConnection;

        ++peopleInRoom;
        sortStreams();
        return myPeerConnection;
    }

    function handleIce(event, remoteSocketId) {
        if (event.candidate) {
            socket.emit("ice", event.candidate, remoteSocketId);
        }
    }

    let onlyOnce = false;

    function handleAddStream(event, remoteSocketId, remoteNickname) {
        if (onlyOnce == false) {
            creatorStream = event.stream;
            onlyOnce = true;
        }

        if (!creator) myFace.srcObject = creatorStream;
        myFace.muted = true;
    }

    function sortStreams() {
        const streams = document.querySelector("#streams");
        const streamArr = streams.querySelectorAll("div");
        streamArr.forEach(
            (stream) => (stream.className = `people${peopleInRoom}`)
        );
    }

    async function addLocalStreamToPeerConnection(localStream) {
        localStream
            .getTracks()
            .forEach((track) => myPeerConnection.addTrack(track, localStream));
    }



    handleJoinRoomBtnSubmit();


}
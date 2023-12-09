const offerEl = document.querySelector("#addSDP");
const generateSDP = document.querySelector("#generateSDP");
const sdpText = document.querySelector("#sdpText");
const acceptOffer = document.querySelector("#accept-offer");
const message = document.querySelector("#message");
const send = document.querySelector("#send");


let localPeer = null;
let remotePeer = null;
let dataChannel = null;

let offer = "";

generateSDP.addEventListener("click", (e) => {
  localPeer = new RTCPeerConnection();
  dataChannel = localPeer.createDataChannel('chanel');
  if (dataChannel) {
    dataChannel.onmessage = e => {
      console.log("just got data : ", e.data);
    }
    dataChannel.onopen = e => {
      console.log("connection opened !!!");
    }
  }

  if (localPeer) {
    localPeer.onicecandidate = e => {
      console.log("new ice candidate printing sdp", JSON.stringify(localPeer.localDescription));
      sdpText.innerHTML = JSON.stringify(localPeer.localDescription);
    }
  }
  localPeer.createOffer().then(o => { localPeer.setLocalDescription(o); }).then(console.log('set successfully'));
});

acceptOffer.addEventListener("click", (e) => {
  if (offerEl.value) {
    offer = JSON.parse(offerEl.value);
    if (offer.type == "offer") {
      remotePeer = new RTCPeerConnection();
      remotePeer.onicecandidate = e => {
        console.log("new ice candidate printing sdp", JSON.stringify(remotePeer.localDescription));
        sdpText.innerHTML = JSON.stringify(remotePeer.localDescription);
      }
      remotePeer.ondatachannel = (e) => {
        remotePeer.dataChannel = e.channel;
        remotePeer.dataChannel.onmessage = e => console.log("new message from client : ", e.data);
        remotePeer.dataChannel.onopen = e => console.log("Coonection opened !!!");
        // clear all the 
      }
      remotePeer.setRemoteDescription(offer).then(a => console.log("offer set !!"));
      remotePeer.createAnswer().then(a => remotePeer.setLocalDescription(a)).then(console.log("answer created"));
    }else{
      if(localPeer){
        localPeer.setRemoteDescription(offer)
      }
    }

  }
});

send.addEventListener("click",e=>{
  let messages = message.value;
  if(dataChannel){
    dataChannel.send(messages)
  }
  if(remotePeer?.dataChannel){
    remotePeer.dataChannel.send(messages)
  }
})


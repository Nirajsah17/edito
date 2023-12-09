import { useEffect, useState } from "react";

let ws = null;
let uid = null;
let localPeer = null;
let remotePeer = null
let dataChannel = null;

function Footer({ }) {

  const [remotePeerIn, setRemotePeerIn] = useState('');
  const [offerStatus, setofferStatus] = useState({});
  const [offerLst, setOfferLst] = useState([]);
  const [answerLst, setAnswerLst] = useState([]);
  const [msg, setMsg] = useState("");

  const msgBox = (e) => {
    setMsg(e.target.value);
  };

  const sendMsg = () => {
    if (dataChannel) {
      dataChannel.send(msg);
    }
    if (remotePeer?.dataChannel) {
      remotePeer.dataChannel.send(msg)
    }
  }

  useEffect(() => {
    if (offerLst.length == 1) {
      const offer = offerLst[0]
      ws.send(JSON.stringify(offer))
    }
  }, [offerLst])

  useEffect(() => {
    if (answerLst.length == 1) {
      const answer = answerLst[0]
      ws.send(JSON.stringify(answer))
    }
  }, [answerLst])

  const inputHandler = (e) => {
    setRemotePeerIn(e.target.value);
  }

  const respondAnswer = () => {
    console.log("sending answer......");
    remotePeer = new RTCPeerConnection();
    remotePeer.onicecandidate = e => {
      console.log("new ice candidate printing sdp", JSON.stringify(remotePeer.localDescription));
      const answer = {
        type: 'answer',
        remotePeer: offerStatus.localPeer,
        localPeer: uid,
        sdp: JSON.stringify(remotePeer.localDescription)
      }
      // ws.send(JSON.stringify(answer));
      setAnswerLst([...answerLst, answer])
    }
    remotePeer.ondatachannel = (e) => {
      remotePeer.dataChannel = e.channel;
      remotePeer.dataChannel.onmessage = e => console.log("new message from client : ", e.data);
      remotePeer.dataChannel.onopen = e => {
        console.log("ready to chat")
        // setofferStatus([]);
      };
      // clear all the 
    }
    remotePeer.setRemoteDescription(JSON.parse(offerStatus.sdp)).then(a => console.log("offer set !!"));
    remotePeer.createAnswer().then(a => remotePeer.setLocalDescription(a)).then(console.log("answer created"));
  }

  useEffect(() => {
    try {
      ws = new WebSocket("ws://localhost:7000");
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("msg", message);
        const key = message.key;
        switch (key) {
          case 'user':
            uid = message.user;
            console.log(uid);
            break;
          case 'offer':
            setofferStatus(message);
            console.log(message.localPeer, "wants to connect");
            break;
          case 'answer':
            if (localPeer) {
              if (!localPeer.remoteDescription) {
                try {
                  const answer = JSON.parse(message.sdp);
                  const _answer = new RTCSessionDescription(answer);
                  console.log({ answer, _answer });
                  localPeer.setRemoteDescription(_answer);
                } catch (err) {
                  console.log(err);
                }

              }
              // if (remotePeer) {
              //   remotePeer.setLocalDescription(JSON.parse(message.sdp))
              // }
            }
            break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const connect = () => {
    localPeer = new RTCPeerConnection();
    dataChannel = localPeer.createDataChannel('channel');
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
        const offer = {
          type: 'offer',
          localPeer: uid,
          remotePeer: remotePeerIn,
          sdp: JSON.stringify(localPeer.localDescription)
        }
        // ws.send(JSON.stringify(offer))
        setOfferLst([...offerLst, offer])
      }
    }
    localPeer.createOffer().then(o => { localPeer.setLocalDescription(o); }).then(console.log('set successfully'));
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div>
          <input onChange={inputHandler} value={remotePeerIn} type="text" placeholder="type user id here... " />
          <button onClick={connect}>connect</button>
        </div>
        <div className="flex flex-row">
          {Object.keys(offerStatus).length ?
            <>
              <div className="p-2">{offerStatus.localPeer}</div>
              <div className=""><button onClick={respondAnswer} className="p-2 bg-purple-600 text-white">connect ?</button></div>
              <input type="text" onChange={msgBox} value={msg} placeholder="chat" />
              <button onClick={sendMsg}>send</button>
            </>
            : ''}
        </div>
        <div className="pr-8">
          <button className="w-20 rounded-md bg-purple-500 text-white border border-purple-500 p-1 hover:bg-purple-700 hover:text-white">save</button>
        </div>
      </div>
    </>
  )
}
export default Footer;
export { Footer }
let localStream: MediaStream | null = null;
let pc1: RTCPeerConnection | null = null;
let pc2: RTCPeerConnection | null = null;

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1,
};

export async function start(): Promise<MediaStream | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log("Received local stream");
    localStream = stream;
    return stream;
  } catch (e) {
    console.error(`getUserMedia() error: ${e}`);
    return null;
  }
}

export async function call(remoteVideo: HTMLVideoElement) {
  console.log("Starting call");
  const videoTracks = localStream!.getVideoTracks();
  const audioTracks = localStream!.getAudioTracks();
  if (videoTracks.length > 0) {
    console.log(`Using video device: ${videoTracks[0].label}`);
  }
  if (audioTracks.length > 0) {
    console.log(`Using audio device: ${audioTracks[0].label}`);
  }
  const configuration = {};
  pc1 = new RTCPeerConnection(configuration);
  pc1.addEventListener("icecandidate", (e) => onIceCandidate(pc1!, e));
  pc2 = new RTCPeerConnection(configuration);
  pc2.addEventListener("icecandidate", (e) => onIceCandidate(pc2!, e));
  pc1.addEventListener("iceconnectionstatechange", (e) =>
    onIceStateChange(pc1!, e),
  );
  pc2.addEventListener("iceconnectionstatechange", (e) =>
    onIceStateChange(pc2!, e),
  );
  pc2.addEventListener("track", (e) => {
    if (remoteVideo.srcObject !== e.streams[0]) {
      remoteVideo.srcObject = e.streams[0];
      console.log("pc2 received remote stream");
    }
  });

  localStream!
    .getTracks()
    .forEach((track) => pc1!.addTrack(track, localStream!));
  try {
    console.log("pc1 createOffer start");
    const offer = await pc1!.createOffer(offerOptions);
    await onCreateOfferSuccess(offer);
  } catch (e) {
    onCreateSessionDescriptionError(e as Error);
  }
}

function onCreateSessionDescriptionError(error: Error) {
  console.log(`Failed to create session description: ${error.toString()}`);
}

async function onCreateOfferSuccess(desc: RTCSessionDescriptionInit) {
  console.log(`Offer from pc1\n${desc.sdp}`);
  console.log("pc1 setLocalDescription start");
  try {
    await pc1!.setLocalDescription(desc);
    onSetLocalSuccess(pc1!);
  } catch (e) {
    onSetSessionDescriptionError();
  }

  console.log("pc2 setRemoteDescription start");
  try {
    await pc2!.setRemoteDescription(desc);
    onSetRemoteSuccess(pc2!);
  } catch (e) {
    onSetSessionDescriptionError();
  }

  console.log("pc2 createAnswer start");
  try {
    const answer = await pc2!.createAnswer();
    await onCreateAnswerSuccess(answer);
  } catch (e) {
    onCreateSessionDescriptionError(e as Error);
  }
}

function onSetLocalSuccess(pc: RTCPeerConnection) {
  console.log(`${getName(pc)} setLocalDescription complete`);
}

function onSetRemoteSuccess(pc: RTCPeerConnection) {
  console.log(`${getName(pc)} setRemoteDescription complete`);
}

function onSetSessionDescriptionError() {
  console.log("Failed to set session description");
}

function getName(pc: RTCPeerConnection) {
  return pc === pc1 ? "pc1" : "pc2";
}

function getOtherPc(pc: RTCPeerConnection) {
  return pc === pc1 ? pc2 : pc1;
}

async function onCreateAnswerSuccess(desc: RTCSessionDescriptionInit) {
  console.log(`Answer from pc2:\n${desc.sdp}`);
  console.log("pc2 setLocalDescription start");
  try {
    await pc2!.setLocalDescription(desc);
    onSetLocalSuccess(pc2!);
  } catch (e) {
    onSetSessionDescriptionError();
  }
  console.log("pc1 setRemoteDescription start");
  try {
    await pc1!.setRemoteDescription(desc);
    onSetRemoteSuccess(pc1!);
  } catch (e) {
    onSetSessionDescriptionError();
  }
}

async function onIceCandidate(
  pc: RTCPeerConnection,
  event: RTCPeerConnectionIceEvent,
) {
  try {
    await getOtherPc(pc)!.addIceCandidate(event.candidate!);
    onAddIceCandidateSuccess(pc);
  } catch (e) {
    onAddIceCandidateError(pc, e as Error);
  }
  console.log(
    `${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : "(null)"}`,
  );
}

function onAddIceCandidateSuccess(pc: RTCPeerConnection) {
  console.log(`${getName(pc)} addIceCandidate success`);
}

function onAddIceCandidateError(pc: RTCPeerConnection, error: Error) {
  console.log(
    `${getName(pc)} failed to add ICE Candidate: ${error.toString()}`,
  );
}

function onIceStateChange(pc: RTCPeerConnection, event: Event) {
  if (pc) {
    console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
    console.log("ICE state change event: ", event);
  }
}

export function hangup() {
  console.log("Ending call");
  pc1?.close();
  pc2?.close();
  pc1 = null;
  pc2 = null;
}

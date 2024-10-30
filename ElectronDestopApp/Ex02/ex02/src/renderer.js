// remote = IPC inter-process communication
const {desktopCapturer,remote, dialog} = require("electron")
const {Menu} = remote
const { writeFile } = require("original-fs")

const videoElement = document.querySelector("video")
const startBtn = document.getElementById("startBtn")
const stopBtn = document.getElementById("stopBtn")
const videoSelectBtn = document.getElementById("videoselectBtn")
videoSelectBtn.onclick = getVideoSources


async function getVideoSources(){
    const inputSoursces = await desktopCapturer.getSources({
            types:['window','screen']
        })
    const videoOptionMenu = Menu.buildFromTemplate(
        inputSoursces.map(source=>{
        return{
            lable: source.name,
            click:()=> selectSource(source)
        }
    }));
    console.log(inputSoursces)
    videoOptionMenu.popup();
}

let mediaRecorder
const recordedChunk = []

async function selectSource(source){
    videoSelectBtn.innerText = source.name;

    const constrains = {
        audio : false,
        video:{
            mandatory:{
                chromeMediaSource: "desktop",
                chromeMediaSourceId: source.id
            }
        }
    }
    const stream = await navigator.mediaDevices.getUserMedia(constrains)

videoElement.srcObject=stream;
videoElement.play()

const options = { mimeType: 'video/webm; codecs=vp9' };
mediaRecorder = new MediaRecorder (stream, options);
// Register Event Handlers
mediaRecorder.ondataavailable = handleDataAvailable;
mediaRecorder.onstop = handleStop

function handleDataAvailable(e){
    console.log('Video Data Available')
    recordedChunk.push(e.data);
}

async function handleStop(e){
    const blob = new Blob(recordedChunk,{
        type: "video/webm;codecs=vp9"
    })
    const buffer = Buffer.from(await blob.arrayBuffer())
    const {filePath} = await dialog.showSaveDialog({
        buttonLabel: "Save Video",
        defaultPath: `vid-${Date.now()}.webm`
    })
    console.log(filePath)
    writeFile(filePath, buffer,()=>{console.log('video saved successfully!')})
}
}



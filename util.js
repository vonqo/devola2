// ============================================================== //
function transitionEffect(newScene) {
    const canvas = document.getElementById("container");
    const transition = document.getElementById("transition");

    transition.classList.add("fadeOut");

    setTimeout(() => {
        canvas.innerHTML = '';
        if(buffer !== undefined) {
            buffer.remove();
        }

        buffer = new p5(newScene, "container");
    }, 500);

    setTimeout(() => {
        transition.classList.remove("fadeOut");
        transition.classList.add("fadeIn");
    }, 500);

    setTimeout(() => {
        transition.classList.remove("fadeIn");
    }, 1000);
}

// ============================================================== //
function filterSetOpacity(opacity, isNegative) {
    const filterDelta = 0.025;
    let value = opacity + (filterDelta * (isNegative ? -1 : 1));

    console.log(value);

    if(value > 1) {
        value = 1;
    } else if(value < 0) {
        value = 0;
    }

    document.getElementById("filter").style.opacity = String(value); 
    return value;
}

// ============================================================== //
const getAudioInput = async () => {
    const micDeviceId = localStorage.getItem("micDeviceId");
    let devices = await navigator.mediaDevices.enumerateDevices();
    
    // let inputs = document.getElementById("audioInput");
    // inputs.innerHTML = '';

    devices.forEach((deviceInfo, index) => {
      if(deviceInfo.kind === 'audioinput') {
        let isCheck = micDeviceId === deviceInfo.deviceId;
        inputs.innerHTML += ("<div><input "+ (isCheck ? "checked" : "") +" type=\"radio\" id=\"input_"+ deviceInfo.deviceId +"\" name=\"auInput\" value=\""+ deviceInfo.deviceId +"\"><label for=\"input_"+ deviceInfo.deviceId +"\">"+ deviceInfo.label +" ("+deviceInfo.deviceId+")</label></div>");
      }
    });
}

// ============================================================== //
const getActiveScenes = (visualData) => {
    // var storedNames = JSON.parse(localStorage.getItem("names"));
}

// ============================================================== //
const getInactiveScenes = (visualData) => {

}
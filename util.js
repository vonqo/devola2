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
const addActiveScene = (id, key) => {
    let storedScenes = JSON.parse(localStorage.getItem("active_scenes"));
    if(storedScenes === undefined || storedScenes === null) {
        localStorage.setItem("active_scenes", JSON.stringify([{"id": id, "key": key}]));
    } else {
        const idx = storedScenes.findIndex((item) => item.id === id);
        console.log(idx);

        if(idx === -1) {
            storedScenes.push({"id": id, "key": key});
        } else {
            storedScenes[idx].key = key;
            console.log(storedScenes);
        }

        localStorage.setItem("active_scenes", JSON.stringify(storedScenes));
    }
}

// ============================================================== //
const removeActiveScene = (id) => {
    var storedScenes = JSON.parse(localStorage.getItem("active_scenes"));
    if(storedScenes === undefined || storedScenes === null || storedScenes.length === 0) return;

    const removed = storedScenes.filter((item) => item.id !== id);
    localStorage.setItem("active_scenes", JSON.stringify(removed));
}

// ============================================================== //
const getActiveScenes = (visualData) => {
    var storedScenes = JSON.parse(localStorage.getItem("active_scenes"));
    if(storedScenes === undefined || storedScenes === null || storedScenes.length === 0) return [];
    
    let list = [];
    visualData.scenes.forEach((item) => {
        const visual = storedScenes.find((element) => element.id === item.id);
        if(visual != undefined) {
            list.push({"id": item.id, "name": item.name, "key": visual.key, "path": visual.path});
        }
    });
    return list;
}

// ============================================================== //
const getInactiveScene = (visualData) => {
    var storedScenes = JSON.parse(localStorage.getItem("active_scenes"));
    if(storedScenes === undefined || storedScenes === null || storedScenes.length === 0) {
        let list = [];
        visualData.scenes.forEach((item) => list.push({"id": item.id, "name": item.name}));
        return list;
    };

    let list = [];
    visualData.scenes.forEach((item) => {
        const visual = storedScenes.find((element) => element.id === item.id);
        if(visual == undefined) {
            list.push({"id": item.id, "name": item.name});
        }
    });
    return list;
}

// ============================================================== //
const saveOverlayId = (id) => {
    localStorage.setItem("selected_overlay", id);
}

const getSelectedOverlayId = () => {
    return localStorage.getItem("selected_overlay");
}

const saveTransitionId = (id) => {
    localStorage.setItem("selected_transition", id);
}

const getSelectedTransitionId = () => {
    return localStorage.getItem("selected_transition");
}

const saveAudioSourceId = (id) => {
    localStorage.setItem("audio_source", id);
}

const getAudioSourceId = () => {
    return localStorage.getItem("audio_source");
}

const getResoWidth = () => {
    return localStorage.getItem("reso_width");
}

const saveResoWidth = (value) => {
    localStorage.setItem("reso_width", value);
}

const getResoHeight = () => {
    return localStorage.getItem("reso_height");
}

const saveResoHeight = (value) => {
    localStorage.setItem("reso_height", value);
}
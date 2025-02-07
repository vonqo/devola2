// ============================================================== //
function transitionEffect(newScene) {
    const canvas = document.getElementById("container");
    const transition = document.getElementById("transition");

    let code = getSelectedTransitionCode();
    let duration = getSelectedTransitionDuration();

    if(code === undefined || code === null || code.length === 0) {
        code = "fade"; // Default transition
    }

    if(duration === undefined || duration === null || duration.length === 0) {
        duration = 1000; // Default duration
    } else {
        duration = Number(duration);
    }

    if(code === "fade") {
        transition.classList.add("fadeOut");
        setTimeout(() => {
            transition.classList.remove("fadeOut");
            transition.classList.add("fadeIn");
        }, duration/2);

        setTimeout(() => {
            transition.classList.remove("fadeIn");
        }, duration);
    }

    if(duration > 0) {
        setTimeout(() => {
            canvas.innerHTML = '';
            if(buffer !== undefined) { buffer.remove(); }
            buffer = new p5(newScene, "container");
        }, duration/2);
    } else {
        canvas.innerHTML = '';
        if(buffer !== undefined) { buffer.remove(); }
        buffer = new p5(newScene, "container");
    }

}

// ============================================================== //
function filterSetOpacity(opacity, isNegative) {
    const filterDelta = 0.025;
    let value = opacity + (filterDelta * (isNegative ? -1 : 1));

    if(value > 1) {
        value = 1;
    } else if(value < 0) {
        value = 0;
    }

    document.getElementById("filter").style.opacity = String(value); 
    return value;
}

// ============================================================== //
const getAudioSources = async () => {
    let devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((deviceInfo) => deviceInfo.kind === 'audioinput');
}

// ============================================================== //
const getVideoSources = async () => {
    let devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((deviceInfo) => deviceInfo.kind === 'videoinput');
}

// ============================================================== //
const addActiveScene = (variable, key, layout) => {
    let storedScenes = JSON.parse(localStorage.getItem("active_scenes"));
    if(storedScenes === undefined || storedScenes === null) {
        localStorage.setItem("active_scenes", JSON.stringify([{"variable": variable, "key": key, "layout": layout}]));
    } else {
        const idx = storedScenes.findIndex((item) => item.variable === variable);

        if(idx === -1) {
            storedScenes.push({"variable": variable, "key": key, "layout": layout});
        } else {
            storedScenes[idx].key = key;
            storedScenes[idx].layout = layout;
        }
        
        localStorage.setItem("active_scenes", JSON.stringify(storedScenes));
    }
}

// ============================================================== //
const removeActiveScene = (variable) => {
    let storedScenes = JSON.parse(localStorage.getItem("active_scenes"));
    if(storedScenes === undefined || storedScenes === null || storedScenes.length === 0) return;

    const removed = storedScenes.filter((item) => item.variable !== variable);
    localStorage.setItem("active_scenes", JSON.stringify(removed));
}

// ============================================================== //
const getActiveScenes = () => {
    let scenes = getConfigData().scenes;
    let storedScenes = JSON.parse(localStorage.getItem("active_scenes"));

    if(storedScenes === undefined || storedScenes === null || storedScenes.length === 0) return [];
    
    let list = [];
    scenes.forEach((item) => {
        const visual = storedScenes.find((element) => element.variable === item.variable);
        if(visual !== undefined) {
            list.push({
                "name": item.name,
                "layout": visual.layout,
                "key": visual.key,
                "path": item.path,
                "variable": item.variable
            });
        }
    });
    return list;
}

// ============================================================== //
const getInactiveScene = () => {
    let scenes = getConfigData().scenes;
    let storedScenes = JSON.parse(localStorage.getItem("active_scenes"));

    if(storedScenes === undefined || storedScenes === null || storedScenes.length === 0) {
        let list = [];
        scenes.forEach((item) => list.push({"id": item.id, "name": item.name}));
        return list;
    }

    let list = [];
    scenes.forEach((item) => {
        const visual = storedScenes.find((element) => element.id === item.id);
        if(visual === undefined) {
            list.push({"id": item.id, "name": item.name});
        }
    });
    return list;
}

// ============================================================== //
const validateConfig = () => {
    const visuals = getActiveScenes();
    const overlayId = getSelectedOverlayCode();
    const transitionId = getSelectedTransitionCode();
    const cameraId = getCameraSourceId();
    const width = getResoWidth();
    const height = getResoHeight();

    return visuals !== undefined && visuals.length >= 1
        && overlayId !== undefined && transitionId !== undefined
        && width !== undefined && width > 0 && height !== undefined && height > 0;
}

// ============================================================== //
const getConfigData = () => JSON.parse(sessionStorage.getItem("data"));

// <-- Overlay -->
const saveOverlayCode = (code) => localStorage.setItem("selected_overlay", code);
const getSelectedOverlayCode = () => localStorage.getItem("selected_overlay");

const saveOverlayPath = (path) => localStorage.setItem("overlay_path", path);
const getSelectedOverlayPath = () => localStorage.getItem("overlay_path");

// <-- Transition -->
const saveTransitionCode = (code) => localStorage.setItem("selected_transition", code);
const getSelectedTransitionCode = () => localStorage.getItem("selected_transition");

const saveTransitionDuration = (duration) => localStorage.setItem("transition_duration", duration);
const getSelectedTransitionDuration = () => localStorage.getItem("transition_duration");

// <-- Audio Source -->
const saveAudioSourceId = (id) => localStorage.setItem("audio_source", id);
const getAudioSourceId = () => localStorage.getItem("audio_source");

// <-- Camera Source -->
const saveCameraSourceId = (id) => localStorage.setItem("camera_source", id);
const getCameraSourceId = () => localStorage.getItem("camera_source");

// <-- Resolution -->
const getResoWidth = () => localStorage.getItem("reso_width");
const saveResoWidth = (value) => localStorage.setItem("reso_width", value);

const getResoHeight = () => localStorage.getItem("reso_height");
const saveResoHeight = (value) => localStorage.setItem("reso_height", value);

// <-- Offset -->
const getOffsetTop = () => localStorage.getItem("offset_top");
const saveOffsetTop = (value) => localStorage.setItem("offset_top", value);

const getOffsetLeft = () => localStorage.getItem("offset_left");
const saveOffsetLeft = (value) => localStorage.setItem("offset_left", value);
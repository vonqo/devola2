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
    }, 200);

    setTimeout(() => {
        transition.classList.remove("fadeOut");
        transition.classList.add("fadeIn");
    }, 400);

    setTimeout(() => {
        transition.classList.remove("fadeIn");
    }, 600);
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
    if(micDeviceId !== undefined || micDeviceId !== null) {
        let constraints = {
        audio : { 
            deviceId: micDeviceId
        }
        }
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        // console.log("stream test: ", stream);
        // this.handleSuccess(stream)
        });
    }
}
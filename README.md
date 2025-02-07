# devola2

[![Shitcoded][ulaanbaatar-badge]][ub-wiki]
[![made with - electron](https://img.shields.io/static/v1?label=made+with&message=electron&color=%239feaf9&logo=electron&logoColor=%239feaf9)](https://)

Devola2 is an open source real-time audio visualizer app. Specifically designed for live-music performance of [B.L.M.D](https://linktr.ee/theblmd) and [Even Tide](https://www.youtube.com/@eventide6813). 

## Showcase
<img height="" src="https://github.com/vonqo/devola2/blob/main/assets/image/screen1.jpg" />

<img height="" src="https://github.com/vonqo/devola2/blob/main/assets/image/carpets.png" />

## Plugable visual script
Thanks to blasphemous javascript, specially fucking **eval()** function.


Create a new directory and script inside the scenes directory. Example: ```src/scenes/new_dir/your_script.js```


Inside your script you will create [p5js instance](https://p5js.org/reference/#/p5/p5) like this.
```javascript
const variable_name = function(sketch) {
    let ww;
    let hh;

    sketch.preload = function() {
        ww = localStorage.getItem('reso_width'); // <-- Get width from conf
        hh = localStorage.getItem('reso_height'); // <-- Get height from conf
        ...
    }

    sketch.setup = function() {
        // localStorage stores object as string, so you have to parse it to number
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        ...
    }

    sketch.draw = function() { ... }
}
```

Then register your visual in ```data.json```. **id** should not be duplicated.
```javascript
const VISUAL_DATA = {
    "scenes": [
        ...
        {
            "id": "41",
            "name": "hello_visual",
            "path": "new_dir/your_script.js",
            "variable": "variable_name",
        },
    ],
    ...
}
```

Finally run the project. Then you'll see your script on visuals section. Rest of the process do not require changes in source code, so fire up the configuration and blast the screen!

## Running & Packaging
To Run:
```
yarn start / npm start
```

To package:
```
npx electron-packager . --icon=./d2logo.icns --overwrite
```

more about packaging [electron-packager](https://github.com/electron/packager)

## License
Enkh-Amar. G (vonqo). Released under the [Mozilla Public License Version 2.0](LICENSE)

[blmd-link]: https://linktr.ee/theblmd
[eventide-link]: https://www.youtube.com/@eventide6813
[ulaanbaatar-badge]: https://img.shields.io/badge/shitcoded%20in-%F0%9F%87%B2%F0%9F%87%B3ulaanbaatar-brightgreen.svg
[ub-wiki]: https://en.wikipedia.org/wiki/Ulaanbaatar

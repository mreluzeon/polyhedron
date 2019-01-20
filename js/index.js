var audio = document.createElement("audio");
audio.crossOrigin = "anonymous";
audio.src = "https://api.soundcloud.com/tracks/158520744/stream?client_id=56c4f3443da0d6ce6dcb60ba341c4e8d";
analyser = getAudioAnalyser(audio);

var button = '';
var z = 0;
var vel = 0;
var camvel = 0.001;
var doors = [];
var codeToType = getRandomCode(0);
var codeTyped = [];

document.querySelector("#codeToType").innerText = codeToType.join('');
document.querySelector("#codeTyped").innerText = codeTyped.join('');

var loader = new THREE.FontLoader();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function drawSquare(z) {
    let linegeo = new THREE.Geometry();
    linegeo.vertices.push(new THREE.Vector3(1, 1, z));
    linegeo.vertices.push(new THREE.Vector3(1, -1, z));
    linegeo.vertices.push(new THREE.Vector3(-1, -1, z));
    linegeo.vertices.push(new THREE.Vector3(-1, 1, z));
    linegeo.vertices.push(new THREE.Vector3(1, 1, z));
    let linemat = new THREE.LineBasicMaterial({color: 0xff00ff, linewidth: 1});
    let line = new THREE.Line(linegeo, linemat);
    scene.add(line);

    let hue = getRandomHue();

    let lines = [[1, 1, -1, 1], [-1, 1, -1, -1], [-1, -1, 1, -1], [1, -1, 1, 1]].map((e, i) => {
        let lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z));
        lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z+5));
        lineGeometry.vertices.push(new THREE.Vector3(e[2], e[3], z));
        lineGeometry.vertices.push(new THREE.Vector3(e[2], e[3], z+5));
        let lineMaterial = new THREE.MeshBasicMaterial({color: (new THREE.Color(`hsl(${hue}, 100%, 100%)`))});
        let line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        return line;
    });

    let doorUpGeometry = new THREE.BoxGeometry(2, 1, 0.01);
    let doorUpMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff});
    let doorUp = new THREE.Mesh(doorUpGeometry, doorUpMaterial);
    doorUp.position.y = 0.5;
    doorUp.position.z = z;
    scene.add(doorUp);

    let doorLineGeometry = new THREE.Geometry();
    doorLineGeometry.vertices.push(new THREE.Vector3(1, 0, z+0.01));
    doorLineGeometry.vertices.push(new THREE.Vector3(-1, 0, z+0.01));
    let doorLineMesh = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 1});
    let doorLine = new THREE.Line(doorLineGeometry, doorLineMesh);
    scene.add(doorLine);

    let doorDownGeometry = new THREE.BoxGeometry(2, 1, 0.01);
    let doorDownMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff});
    let doorDown = new THREE.Mesh(doorDownGeometry, doorDownMaterial);
    doorDown.position.y = -0.5;
    doorDown.position.z = z;
    scene.add(doorDown);

    doors.push([doorUp, doorDown, doorLine, 0, lines, hue, line]);
    return 0;
}

document.onkeydown = (e) => {
    button = e.key;
};

document.onkeyup = (e) => {
    button = '';
};

var animate = function () {

    if (button === '-') {
        camera.position.z -= 0.04;
    } else if (button === 's') {
        camera.position.z += 0.04;
    } else if (button === 'lajfl') {
        camera.position.x -= 0.04;
    } else if (button === 'asdasf') {
        camera.position.x += 0.04;
    } else if (button === '/') {
        doors[0][3] = 0.1;
        doors[0][2].visible = false;
        button = '';
    } else if (codeToType[0] === REAL_BUTTON[button]) {
        codeTyped.push(codeToType.shift());
        console.log(code);
        button = '';
        if (code.length === 0) {
            doors[0][3] = 0.1;
            doors[0][2].visible = false;
            codeToType = getRandomCode(-z/5);
            codeTyped = [];
        }
        document.querySelector("#codeToType").innerText = codeToType.join('');
        document.querySelector("#codeTyped").innerText = codeTyped.join('');
    }

    doors = doors.filter((e, i) => {
        e[0].position.y += e[3];
        e[1].position.y -= e[3];
        if(e[0].position.y > 1.30){
            console.log(doors);
            scene.remove(scene.getObjectById(doors[0][0].id));
            scene.remove(scene.getObjectById(doors[0][1].id));
            scene.remove(scene.getObjectById(doors[0][2].id));
            scene.remove(scene.getObjectById(doors[0][4][0].id));
            scene.remove(scene.getObjectById(doors[0][4][1].id));
            scene.remove(scene.getObjectById(doors[0][4][2].id));
            scene.remove(scene.getObjectById(doors[0][4][3].id));
            return false;
        }
        e[0].material.color = new THREE.Color(`hsl(${e[5]}, 100%, ${Math.floor(getBeatValue(analyser) * .8)}%)`);
        e[1].material.color = new THREE.Color(`hsl(${e[5]}, 100%, ${Math.floor(getBeatValue(analyser) * .8)}%)`);
        e[2].material.color = new THREE.Color(`hsl(${e[5]}, 100%, ${Math.floor(getBeatValue(analyser) * .8)}%)`);
        e[4][0].material.color = new THREE.Color(`hsl(${e[5]}, 100%, ${Math.floor(getBeatValue(analyser) * .8)}%)`);
        e[4][1].material.color = new THREE.Color(`hsl(${e[5]}, 100%, ${Math.floor(getBeatValue(analyser) * .8)}%)`);
        e[4][2].material.color = new THREE.Color(`hsl(${e[5]}, 100%, ${Math.floor(getBeatValue(analyser) * .8)}%)`);
        e[4][3].material.color = new THREE.Color(`hsl(${e[5]}, 100%, ${Math.floor(getBeatValue(analyser) * .8)}%)`);
        e[6].material.color = new THREE.Color(`hsl(${e[5]}, 100%, ${Math.floor(getBeatValue(analyser) * .8)}%)`);
        return true;
    });

    if(doors.length < 2) {
        z -= 5;
        document.querySelector("#score").innerText = "score: " + ((-z/5)-1 + "");
        drawSquare(z);
    }

    camera.position.z -= camvel;

    camvel = (-z / 5) * 0.005;

    if (camera.position.z-0.1 <= doors[0][0].position.z && doors[0][0].position.y == 0.5) {
        // document.querySelector("body").removeChild(document.querySelector("body").children[4]);
        document.querySelector("#gameover").style.visibility = "visible";
        audio.pause();
        return;
    }

    if (doors[0][0].position.z - 1> camera.position.z) {
        scene.remove(scene.getObjectById(doors[0][0].id));
        scene.remove(scene.getObjectById(doors[0][1].id));
        scene.remove(scene.getObjectById(doors[0][2].id));
        scene.remove(scene.getObjectById(doors[0][0].id));
    }

    renderer.render( scene, camera );
    requestAnimationFrame( animate );
};

//audio.play().catch(() => audio.play());
audio.oncanplay = () => {
    audio.play();
    animate();
};

var text;
var button = '';
var z = 0;
var vel = 0;
var camvel = 0.01;
var doors = [];
var code = "poiui".split('');

var loader = new THREE.FontLoader();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function drawSquare(z){
    let linegeo = new THREE.Geometry();
    linegeo.vertices.push(new THREE.Vector3(1, 1, z));
    linegeo.vertices.push(new THREE.Vector3(1, -1, z));
    linegeo.vertices.push(new THREE.Vector3(-1, -1, z));
    linegeo.vertices.push(new THREE.Vector3(-1, 1, z));
    linegeo.vertices.push(new THREE.Vector3(1, 1, z));
    let linemat = new THREE.LineBasicMaterial({color: 0xff00ff, linewidth: 1});
    let line = new THREE.Line(linegeo, linemat);
    scene.add(line);
    let lines = [[1, 1], [-1, 1], [-1, -1], [1, -1]].map((e, i) => {
        let lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z));
        lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z+5));
        let lineMaterial = new THREE.LineBasicMaterial({color: 0xff00ff, linewidth: 1});
        let line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
    });

    let doorUpGeometry = new THREE.BoxGeometry(2, 1, 0.01);
    let doorUpMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide});
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
    let doorDownMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide});
    let doorDown = new THREE.Mesh(doorDownGeometry, doorDownMaterial);
    doorDown.position.y = -0.5;
    doorDown.position.z = z;
    scene.add(doorDown);

    doors.push([doorUp, doorDown, doorLine, 0]);
    return 0;
}

document.onkeydown = (e) => {
    button = e.key;
};

document.onkeyup = (e) => {
    button = '';
};

var animate = function () {

    if (button === 'w') {
        camera.position.z -= 0.04;
    } else if (button === 's') {
        camera.position.z += 0.04;
    } else if (button === 'a') {
        camera.position.x -= 0.04;
    } else if (button === 'd') {
        camera.position.x += 0.04;
    } else if (button === 'z') {
        doors[0][3] = 0.1;
        doors[0][2].visible = false;
        button = '';
    } else if (code[0] === button){
        code.shift();
        console.log(code);
        button = '';
        if (code.length === 0) {
            doors[0][3] = 0.1;
            doors[0][2].visible = false;
            code = ['p', 'o', 'i', 'u', 'i'];
        }
    }

    doors = doors.filter((e, i) => {
        e[0].position.y += e[3];
        e[1].position.y -= e[3];
        if(e[0].position.y > 1.30){
            console.log(doors);
            return false;
        }
        return true;
    });

    if(doors.length < 2) {
        z -= 5;
        document.querySelector("#score").innerText = (-z/5)-2;
        drawSquare(z);
    }

    camera.position.z -= camvel;

    camvel = (-z / 5) * 0.005;

    if (camera.position.z-0.1 <= doors[0][0].position.z && doors[0][0].position.y == 0.5) {
        // document.querySelector("body").removeChild(document.querySelector("body").children[4]);
        document.querySelector("#gameover").style.visibility = "visible";
        return;
    }

		renderer.render( scene, camera );
		requestAnimationFrame( animate );
};
animate();

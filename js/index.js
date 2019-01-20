var text;
var button = '';
var z = 0;
var vel = 0;
var doors = [];

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

    let doorDownGeometry = new THREE.BoxGeometry(2, 1, 0.01);
    let doorDownMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide});
    let doorDown = new THREE.Mesh(doorDownGeometry, doorDownMaterial);
    doorDown.position.y = -0.5;
    doorDown.position.z = z;
    scene.add(doorDown);

    doors.push([doorUp, doorDown, 0]);
    return 0;
}

// var linegeo = new THREE.Geometry();
// linegeo.vertices.push(new THREE.Vector3(1, 1, z));
// linegeo.vertices.push(new THREE.Vector3(1, -1, z));
// linegeo.vertices.push(new THREE.Vector3(-1, -1, z));
// linegeo.vertices.push(new THREE.Vector3(-1, 1, z));
// linegeo.vertices.push(new THREE.Vector3(1, 1, z));
// var linemat = new THREE.LineBasicMaterial({color: 0xff00ff, linewidth: 1});
// var line = new THREE.Line(linegeo, linemat);
// scene.add(line);

// var doorUpGeometry = new THREE.PlaneGeometry(1, 1, 1);
// var doorUpMaterial = new THREE.MeshBasicMaterial( {color: 0xff00ff, side: THREE.DoubleSide} );
// var doorUp = new THREE.Mesh( doorUpGeometry, doorUpMaterial );
// doorUp.position.z = 0;
// scene.add(doorUp);

// var doorUpGeometry = new THREE.BoxGeometry(2, 1, 0.01);
// var doorUpMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide});
// var doorUp = new THREE.Mesh(doorUpGeometry, doorUpMaterial);
// doorUp.position.y = 0.5;
// scene.add(doorUp);

// var doorDownGeometry = new THREE.BoxGeometry(2, 1, 0.01);
// var doorDownMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide});
// var doorDown = new THREE.Mesh(doorDownGeometry, doorDownMaterial);
// doorDown.position.y = -0.5;
// scene.add(doorDown);

// var lines1 = [[1, 1], [-1, 1], [-1, -1], [1, -1]].map((e, i) => {
//     let lineGeometry = new THREE.Geometry();
//     lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z));
//     lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z+5));
//     let lineMaterial = new THREE.LineBasicMaterial({color: 0xff00ff, linewidth: 1});
//     let line = new THREE.Line(lineGeometry, lineMaterial);
//     scene.add(line);
// });

// var linegeo2 = new THREE.Geometry();
// linegeo2.vertices.push(new THREE.Vector3(1, 1, z-5));
// linegeo2.vertices.push(new THREE.Vector3(1, -1, z-5));
// linegeo2.vertices.push(new THREE.Vector3(-1, -1, z-5));
// linegeo2.vertices.push(new THREE.Vector3(-1, 1, z-5));
// linegeo2.vertices.push(new THREE.Vector3(1, 1, z-5));
// var linemat2 = new THREE.LineBasicMaterial({color: 0xfa8310, linewidth: 1});
// var line2 = new THREE.Line(linegeo2, linemat2);
// scene.add(line2);

// var lines2 = [[1, 1], [-1, 1], [-1, -1], [1, -1]].map((e, i) => {
//     let lineGeometry = new THREE.Geometry();
//     lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z-5));
//     lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z));
//     let lineMaterial = new THREE.LineBasicMaterial({color: 0xfa8310, linewidth: 1});
//     let line = new THREE.Line(lineGeometry, lineMaterial);
//     scene.add(line);
// });

camera.position.z = 5;
document.onkeydown = (e) => {
    button = e.key;
};

document.onkeyup = (e) => {
    button = '';
};

var animate = function () {

    // z -= 0.001;

    // camera.position.z -= 0.01;

    if (button === 'w') {
        camera.position.z -= 0.04;
    } else if (button === 's') {
        camera.position.z += 0.04;
    } else if (button === 'a') {
        camera.position.x -= 0.04;
    } else if (button === 'd') {
        camera.position.x += 0.04;
    } else if (button === 'z') {
        doors.pop();
        doors[0][2] = 0.01;
    }

    // doors.forEach((e, i) => {
    //     e[0].position.y += e[2];
    //     e[1].position.y -= e[2];
    //     if(e[0].position.y > 2){
    //         e[0]
    //     }
    // });

    //camera.position.z -= 0.01;

    // if (camera.position.z-0.1 <= doorUp.position.z) {
    //     return;
    // }

		renderer.render( scene, camera );
		requestAnimationFrame( animate );
};
animate();

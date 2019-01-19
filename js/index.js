var text;
var button = '';
var z = 0;

var loader = new THREE.FontLoader();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var linegeo = new THREE.Geometry();
linegeo.vertices.push(new THREE.Vector3(1, 1, z));
linegeo.vertices.push(new THREE.Vector3(1, -1, z));
linegeo.vertices.push(new THREE.Vector3(-1, -1, z));
linegeo.vertices.push(new THREE.Vector3(-1, 1, z));
linegeo.vertices.push(new THREE.Vector3(1, 1, z));
var linemat = new THREE.LineBasicMaterial({color: 0xff00ff, linewidth: 1});
var line = new THREE.Line(linegeo, linemat);
scene.add(line);

var lines1 = [[1, 1], [-1, 1], [-1, -1], [1, -1]].map((e, i) => {
    let lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z));
    lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z+5));
    let lineMaterial = new THREE.LineBasicMaterial({color: 0xff00ff, linewidth: 1});
    let line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
});

var linegeo2 = new THREE.Geometry();
linegeo2.vertices.push(new THREE.Vector3(1, 1, z-5));
linegeo2.vertices.push(new THREE.Vector3(1, -1, z-5));
linegeo2.vertices.push(new THREE.Vector3(-1, -1, z-5));
linegeo2.vertices.push(new THREE.Vector3(-1, 1, z-5));
linegeo2.vertices.push(new THREE.Vector3(1, 1, z-5));
var linemat2 = new THREE.LineBasicMaterial({color: 0xfa8310, linewidth: 1});
var line2 = new THREE.Line(linegeo2, linemat2);
scene.add(line2);

var lines2 = [[1, 1], [-1, 1], [-1, -1], [1, -1]].map((e, i) => {
    let lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z-5));
    lineGeometry.vertices.push(new THREE.Vector3(e[0], e[1], z));
    let lineMaterial = new THREE.LineBasicMaterial({color: 0xfa8310, linewidth: 1});
    let line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
});

camera.position.z = 5;
document.onkeydown = (e) => {
    button = e.key;
};

document.onkeyup = (e) => {
    button = '';
};

var animate = function () {
		requestAnimationFrame( animate );

    // z -= 0.001;

    // camera.position.z -= 0.01;

    if (button === 'w') {
        camera.position.z -= 0.04;
    } else if (button === 's') {
        camera.position.z += 0.04;
    }

    camera.position.z -= 0.01;

		renderer.render( scene, camera );
};
animate();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 0, 100 );
controls.minDistance = 2;
controls.maxDistance = 20;
controls.maxPolarAngle = 10;
controls.update();

scene.add(cube);

camera.position.z = 5;

let axis = [0, 0];
var keyMap = [];

document.onkeydown = function (e) {
	var keyCode = e.keyCode;
	keyMap[keyCode] = true;
	executeKeys();
}

function executeKeys() {
	// Movimento WASD 
	if (keyMap[38] === true) { // Tecla W
		if (axis[1] < 1) {
			axis[1] += 1;
		keyMap[38] = false;
		return;
		}
	}
	if (keyMap[37] === true) { // Tecla A
		if (axis[0] > -1) {
			axis[0] -= 1;
		keyMap[37] = false;
		return;
		}
	}
	if (keyMap[40] === true) { // Tecla S
		if (axis[1] > -1) {
			axis[1] -= 1;
		keyMap[40] = false;
		return;
		}
	}
	if (keyMap[39] === true) { // Tecla D
		if (axis[0] < 1) {
			axis[0] += 1;
		keyMap[39] = false;
		return;
		}
	}
}

setInterval(() => {
	if (axis[1] != 0) {
		if (cube.position.y >=  3 && axis[1] == 1 || cube.position.y <= -3 && axis[1] == -1) {
			axis[1] = 0;
		} else {
			cube.position.y += axis[1];
		}
	}
	if (axis[0] != 0) {
		if (cube.position.x >=  6 && axis[0] == 1 || cube.position.x <= -6 && axis[0] == -1) {
			axis[0] = 0;
		} else {
			cube.position.x += axis[0];
		}
	}
}, 250)


function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}

animate();
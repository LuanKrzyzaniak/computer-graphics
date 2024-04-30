import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './modules/threex.keyboardstate';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// OrbitControls
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 20, 100 );
controls.minDistance = 2;
controls.maxDistance = 20;
controls.maxPolarAngle = 10;
controls.update();

// KeyboardState

var keyboard = THREEx.KeyboardState();
var axis = [0,0];

// Objects and meshes
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Placement
camera.position.z = 5;

function movement(){
	if (keyboard.pressed('A') == true) {
		if (axis[1] != -1) axis[1] = -1;
		else axis[1] = 0;
	}
	cube.postiionX += axis[0];
	cube.postiionY += axis[1];
	return;
}

//

function animate() {
	requestAnimationFrame( animate );

	controls.update();
	movement();

	renderer.render( scene, camera );
}

animate();
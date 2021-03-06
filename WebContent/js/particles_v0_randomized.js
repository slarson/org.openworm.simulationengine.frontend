/**
 * @fileoverview Initial implementation of particles in WebGL.
 * Particles move about randomly and the viewer can do basic pan and nav.
 *
 * @author s.khayrulin@openworm.org (Sergey Khayrulin)
 */

// Note use of anonymous function wrapper for basic namespacing, for now.

(function() {
  // the main three.js components
  var camera, scene, renderer;

  var HEIGHT;
  var WIDTH;

  var CAMERA_NEAR = 1;
  var CAMERA_FAR = 4000;

  // Reservoir bounds.
  var XMIN = 0;
  var XMAX = 100;
  var YMIN = 0;
  var YMAX = 40;
  var ZMIN = 0;
  var ZMAX = 40;

  var PARTICLE_COUNT = 32 * 32;

  // Whether the animation is playing.
  var show = false;

  // Track mouse state.
  var isMouseDown = false;
  var onMouseDownPosition = new THREE.Vector2();

  // Camera-related params.
  var radius = 100;
  var theta = 45;
  var onMouseDownTheta = 45;
  var phi = 60;
  var onMouseDownPhi = 60;
  var	mouse3D;

  // An array to store our particles in.
  particles = [];
  iteration = 0;

  $(document).ready(function() {
    init();
  });


  function init() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    // Camera params:
    // field of view, aspect ratio for render output, near and far clipping plane.
    camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT, 1, 4000);

    // Start the camera back a bit so we can see stuff!
    // default position is 0,0,0.
    camera.position.z = 100;

    //camera.target.position.y = 200;
    //camera.position.y = 100;
    //camera.rotation.z = 10 * Math.PI / 180

    // The scene contains all the 3D object data.
    scene = new THREE.Scene();

    // The camera must be added to the scene.
    scene.add(camera);

    // and the CanvasRenderer figures out what the
    // stuff in the scene looks like and draws it!
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    // the renderer's canvas domElement is added to the body
    document.body.appendChild(renderer.domElement);

    makeParticles();
    // createReservoirFromLines();
    createReservoirFromCubeGeometry();

    // add the mouse move listener
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    renderer.domElement.addEventListener('mousedown', onMouseClick, false);
    renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false );
    renderer.domElement.addEventListener('mousewheel', onDocumentMouseWheel, false);

    // render 30 times a second (should also look at requestAnimationFrame)
    setInterval(update, 1000 / 15);
  }


  /**
   * The main update function, called 30 times a second.
   */
  function update() {
    /*$.post("url", {'iteration':iteration}, function(newPosition){
      updateParticles(newPosition);
    },"text");*/
    updateParticles(null);
    // and render the scene from the perspective of the camera
    render();
    iteration++;
  }


  function render() {
    renderer.render(scene, camera);
  }


  // creates a random field of Particle objects
  function createReservoirFromLines() {
    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
    });
    var v1 = new THREE.Vector3( -XMAX/2, -YMAX/2, -ZMAX/2);
    var v2 = new THREE.Vector3(XMAX/2, -YMAX/2, -ZMAX/2);
    var v3 = new THREE.Vector3( XMAX/2, YMAX/2, -ZMAX/2);
    var v4 = new THREE.Vector3(-XMAX/2,  YMAX/2, -ZMAX/2)
    var v5 = new THREE.Vector3(-XMAX/2, -YMAX/2,  ZMAX/2);
    var v6 = new THREE.Vector3(XMAX/2, -YMAX/2,  ZMAX/2);
    var v7 = new THREE.Vector3(XMAX/2,  YMAX/2,  ZMAX/2);
    var v8 = new THREE.Vector3(-XMAX/2,  YMAX/2,  ZMAX/2)
    var geometry1 = new THREE.Geometry();
    var geometry2 = new THREE.Geometry();
    var geometry3 = new THREE.Geometry();
    var geometry4 = new THREE.Geometry();
    var geometry5 = new THREE.Geometry();
    var geometry6 = new THREE.Geometry();
    var geometry7 = new THREE.Geometry();
    var geometry8 = new THREE.Geometry();
    var geometry9 = new THREE.Geometry();
    var geometry10 = new THREE.Geometry();
    var geometry11 = new THREE.Geometry();
    var geometry12 = new THREE.Geometry();
    geometry1.vertices.push(v1);
    geometry1.vertices.push(v2);
    var line1 = new THREE.Line(geometry1, material);
    geometry2.vertices.push(v2);
    geometry2.vertices.push(v3);
    var line2 = new THREE.Line(geometry2, material);
    geometry3.vertices.push(v3);
    geometry3.vertices.push(v4);
    var line3 = new THREE.Line(geometry3, material);
    geometry4.vertices.push(v4);
    geometry4.vertices.push(v1);
    var line4 = new THREE.Line(geometry4, material);
    geometry5.vertices.push(v1);
    geometry5.vertices.push(v5);
    var line5 = new THREE.Line(geometry5, material);
    geometry6.vertices.push(v2);
    geometry6.vertices.push(v6);
    var line6 = new THREE.Line(geometry6, material);
    geometry7.vertices.push(v3);
    geometry7.vertices.push(v7);
    var line7 = new THREE.Line(geometry7, material);
    geometry8.vertices.push(v4);
    geometry8.vertices.push(v8);
    var line8 = new THREE.Line(geometry8, material);
    geometry9.vertices.push(v5);
    geometry9.vertices.push(v6);
    var line9 = new THREE.Line(geometry9, material);
    geometry10.vertices.push(v6);
    geometry10.vertices.push(v7);
    var line10 = new THREE.Line(geometry10, material);
    geometry11.vertices.push(v7);
    geometry11.vertices.push(v8);
    var line11 = new THREE.Line(geometry11, material);
    geometry12.vertices.push(v8);
    geometry12.vertices.push(v5);
    var line12 = new THREE.Line(geometry12, material);
    scene.add(line1);
    scene.add(line2);
    scene.add(line3);
    scene.add(line4);
    scene.add(line5);
    scene.add(line6);
    scene.add(line7);
    scene.add(line8);
    scene.add(line9);
    scene.add(line10);
    scene.add(line11);
    scene.add(line12);

    render();
  }


  function createReservoirFromCubeGeometry() {
    var cubeWidth = XMAX - XMIN;
    var cubeDepth = YMAX - YMIN;
    var cubeHeight = ZMAX - ZMIN;
    var geometry = new THREE.CubeGeometry(cubeWidth, cubeDepth, cubeHeight);
    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    var mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh);

    render();
  }


  function makeParticles() {

    var particle, material;

    // we're gonna move from z position -1000 (far away)
    // to 1000 (where the camera is) and add a random particle at every pos.
    var r = 0;
    var x,y,z
    material = new THREE.ParticleCanvasMaterial({
        color : 0xffffff,
        program : particleRender
      });
    var sc = 0.04;
  /**/var p=0;
    for( var i = 0; (i < 16)&&(p<PARTICLE_COUNT); i++ )
      for( var j = 0; (j < 16)&&(p<PARTICLE_COUNT); j++ )
        for( var k = 0; (k < 16)&&(p<PARTICLE_COUNT); k++ )
        {
          particle = new THREE.Particle(material);
          var x, y, z;
          var r = 2.076;//2.47;
          x = (r * i -XMAX/2)*1;
          y = (r * j -YMAX/2)*1;
          z = (r * k - ZMAX/2)*1;

          particle.position.x = x;
          particle.position.y = y;
          particle.position.z = z;
          particle.scale.x = particle.scale.y = 0.3;
          scene.add(particle);
          particles.push(particle);
          p++;
        }/**/
  }


  function scale(min, max, x){
    return min+x *(max-min);
  }


  /**
   * There isn't a built in circle particle renderer
   * so we have to define our own.
   */
  function particleRender(context) {

    // we get passed a reference to the canvas context
    context.beginPath();

    // and we just have to draw our shape at 0,0 - in this
    // case an arc from 0 to 2Pi radians or 360? - a full circle!
    context.arc(0, 0, 1, 0, Math.PI * 2, true);
    context.fill();
  };


  /**
   * Moves all the particles dependent on mouse position.
   */
  function updateParticles(data) {

    // iterate through every particle
    if(show)
      for ( var i = 0; i < particles.length; i++) {

        particle = particles[i];

        x = (scale(XMIN, (XMAX), Math.random()) -XMAX/2)*1;
        y = (scale(YMIN, (YMAX), Math.random()) -YMAX/2)*1;
        z = (scale(ZMIN, (ZMAX), Math.random()) - ZMAX/2)*1;

        particle.position.x = x;
        particle.position.y = y;
        particle.position.z = z;
      }
  }


  /**
   * Called when the mouse moves.
   */
  function onMouseMove(event) {
    // store the mouseX and mouseY position 
    event.preventDefault();

    if ( isMouseDown ) {
      theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 )
          + onMouseDownTheta;
      phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 )
          + onMouseDownPhi;

      phi = Math.min( 180, Math.max( 0, phi ) );

      camera.position.x = radius * Math.sin( theta * Math.PI / 360 )
                * Math.cos( phi * Math.PI / 360 );
      camera.position.y = radius * Math.sin( phi * Math.PI / 360 );
      camera.position.z = radius * Math.cos( theta * Math.PI / 360 )
                * Math.cos( phi * Math.PI / 360 );
      camera.lookAt( scene.position );
    }
    render();
  }


  function onMouseClick(event) {
    event.preventDefault();

    if(event.button == 0){
      isMouseDown = true;
      onMouseDownTheta = theta;
      onMouseDownPhi = phi;
      onMouseDownPosition.x = event.clientX;
      onMouseDownPosition.y = event.clientY;
    }

    if(event.button == 2) {
      show = !show;
    }
  }


  function onDocumentMouseWheel( event ) {
    if(event.wheelDeltaY>0) {
      radius += 10; //event.wheelDeltaY;
    } else {
      radius -= 10;
    }

    camera.position.x = radius * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
    camera.position.y = radius * Math.sin( phi * Math.PI / 360 );
    camera.position.z = radius * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
    camera.updateMatrix();

    render();
  }


  function onDocumentMouseUp(event) {
    event.preventDefault();
    isMouseDown = false;
    onMouseDownPosition.x = event.clientX - onMouseDownPosition.x;
    onMouseDownPosition.y = event.clientY - onMouseDownPosition.y;
  }
}());

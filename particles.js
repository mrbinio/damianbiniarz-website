// === THREE.JS PARTICLE SCENE (like dala's brain/tree) ===
(function() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  var canvas = renderer.domElement;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '0';
  canvas.style.pointerEvents = 'none';
  document.body.prepend(canvas);

  // Fade out particles on scroll
  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    var vh = window.innerHeight;
    // Move particles left/right based on scroll
    var offset = Math.sin(scrollY * 0.002) * 2.5;
    particles.position.x = offset;
    // Keep visible but shift out of text area
    canvas.style.opacity = Math.max(0.3, 1 - scrollY / (vh * 2));
  });

  camera.position.z = 4;

  // On mobile, push particles to the side

  // Create particles in a sphere/shield shape
  var count = 3000;
  var geometry = new THREE.BufferGeometry();
  var positions = new Float32Array(count * 3);
  var colors = new Float32Array(count * 3);
  var sizes = new Float32Array(count);
  var origPositions = new Float32Array(count * 3);

  for (var i = 0; i < count; i++) {
    // Sphere distribution
    var phi = Math.acos(2 * Math.random() - 1);
    var theta = Math.random() * Math.PI * 2;
    var r = 1.8 + Math.random() * 0.3;
    
    var x = r * Math.sin(phi) * Math.cos(theta);
    var y = r * Math.sin(phi) * Math.sin(theta);
    var z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    origPositions[i * 3] = x;
    origPositions[i * 3 + 1] = y;
    origPositions[i * 3 + 2] = z;

    // Colors: purple to green gradient
    var t = Math.random();
    colors[i * 3] = 0.49 * (1 - t) + 0.0 * t;     // R
    colors[i * 3 + 1] = 0.36 * (1 - t) + 0.9 * t;  // G
    colors[i * 3 + 2] = 0.99 * (1 - t) + 0.63 * t;  // B

    sizes[i] = Math.random() * 3 + 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  var material = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  var particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // On mobile, push particles to the side and make smaller
  var isMobile = window.innerWidth < 768;
  if (isMobile) {
    camera.position.z = 5.5;
    particles.position.x = 1.2;
    particles.position.y = -0.8;
  }

  // Mouse tracking
  var mouse = { x: 0, y: 0 };
  var targetRotation = { x: 0, y: 0 };

  document.addEventListener('mousemove', function(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  var time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    // Smooth rotation following mouse
    targetRotation.x += (mouse.y * 0.5 - targetRotation.x) * 0.02;
    targetRotation.y += (mouse.x * 0.5 - targetRotation.y) * 0.02;

    particles.rotation.x = targetRotation.x + time * 0.1;
    particles.rotation.y = targetRotation.y + time * 0.15;

    // Distort particles based on mouse proximity
    var pos = geometry.attributes.position.array;
    for (var i = 0; i < count; i++) {
      var ix = i * 3;
      var ox = origPositions[ix];
      var oy = origPositions[ix + 1];
      var oz = origPositions[ix + 2];

      // Gentle wave distortion
      pos[ix] = ox + Math.sin(time * 2 + oy * 3) * 0.03;
      pos[ix + 1] = oy + Math.cos(time * 2 + ox * 3) * 0.03;
      pos[ix + 2] = oz + Math.sin(time * 1.5 + ox * 2) * 0.03;

      // Mouse repulsion
      var dx = mouse.x * 2 - ox;
      var dy = mouse.y * 2 - oy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.5) {
        var force = (1.5 - dist) * 0.15;
        pos[ix] += dx * force;
        pos[ix + 1] += dy * force;
      }
    }
    geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

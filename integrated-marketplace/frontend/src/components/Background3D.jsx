import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070314, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 45;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL not supported, falling back to CSS 3D ambience', e);
      return;
    }

    // 2. Lights with Neon Colors (Electric Blue, Cyan, Magenta, Violet)
    const ambientLight = new THREE.AmbientLight(0x1a0b36, 1.8);
    scene.add(ambientLight);

    const lightCyan = new THREE.PointLight(0x00f5d4, 3, 120);
    lightCyan.position.set(-25, 20, 15);
    scene.add(lightCyan);

    const lightMagenta = new THREE.PointLight(0xff007f, 3.5, 120);
    lightMagenta.position.set(25, -20, 20);
    scene.add(lightMagenta);

    const lightBlue = new THREE.PointLight(0x0070f3, 2.5, 100);
    lightBlue.position.set(0, 30, -10);
    scene.add(lightBlue);

    // 3. Floating 3D Geometric Objects & Spheres
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // Glassy / Glossy Materials
    const cyanMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0x005544,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85
    });

    const magentaMaterial = new THREE.MeshStandardMaterial({
      color: 0xff007f,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x55002a,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.85
    });

    const purpleMaterial = new THREE.MeshStandardMaterial({
      color: 0x7928ca,
      roughness: 0.25,
      metalness: 0.75,
      emissive: 0x2e0854,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.9
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

    // Mesh 1: Large Floating Central/Left Sphere
    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(6, 32, 32), cyanMaterial);
    sphere1.position.set(-28, 12, -10);
    objectsGroup.add(sphere1);

    // Mesh 2: Floating Magenta Sphere (Right)
    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(7.5, 32, 32), magentaMaterial);
    sphere2.position.set(30, -14, -15);
    objectsGroup.add(sphere2);

    // Mesh 3: Floating Deep Violet Sphere (Center Deep)
    const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(4.5, 32, 32), purpleMaterial);
    sphere3.position.set(15, 22, -25);
    objectsGroup.add(sphere3);

    // Mesh 4: 3D Torus Knot (Futuristic geometric tech relic)
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(5, 1.4, 100, 16),
      purpleMaterial
    );
    torusKnot.position.set(-22, -18, -12);
    objectsGroup.add(torusKnot);

    // Mesh 5: Wireframe Icosahedron (Geometric Floating Hologram)
    const icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(7, 1),
      wireframeMaterial
    );
    icosahedron.position.set(24, 16, -18);
    objectsGroup.add(icosahedron);

    // Mesh 6: Floating Octahedron
    const octahedron = new THREE.Mesh(
      new THREE.OctahedronGeometry(4),
      new THREE.MeshStandardMaterial({
        color: 0x00b4d8,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      })
    );
    octahedron.position.set(-8, 25, -20);
    objectsGroup.add(octahedron);

    // 4. Glowing 3D Particle Starfield
    const particleCount = 450;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x00f5d4), // Cyan
      new THREE.Color(0xff007f), // Magenta
      new THREE.Color(0x7928ca), // Violet
      new THREE.Color(0x0070f3), // Electric Blue
      new THREE.Color(0xffffff)  // White star
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 10;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Mouse Interaction & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Window Resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // 6. Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax with lerp
      targetX = mouseX * 6;
      targetY = -mouseY * 4;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Rotate individual 3D objects
      sphere1.rotation.y = elapsedTime * 0.3;
      sphere1.position.y = 12 + Math.sin(elapsedTime * 0.8) * 2.5;

      sphere2.rotation.x = elapsedTime * 0.2;
      sphere2.rotation.y = elapsedTime * 0.25;
      sphere2.position.y = -14 + Math.cos(elapsedTime * 0.7) * 3;

      sphere3.position.y = 22 + Math.sin(elapsedTime * 0.5 + 1) * 2;

      torusKnot.rotation.x = elapsedTime * 0.35;
      torusKnot.rotation.y = elapsedTime * 0.45;
      torusKnot.position.y = -18 + Math.sin(elapsedTime * 0.6) * 2;

      icosahedron.rotation.x = elapsedTime * 0.25;
      icosahedron.rotation.y = elapsedTime * 0.3;
      icosahedron.position.y = 16 + Math.cos(elapsedTime * 0.5) * 2.5;

      octahedron.rotation.x = elapsedTime * 0.4;
      octahedron.rotation.z = elapsedTime * 0.3;

      // Orbit glowing neon point lights
      lightCyan.position.x = -25 + Math.sin(elapsedTime * 0.6) * 10;
      lightCyan.position.y = 20 + Math.cos(elapsedTime * 0.5) * 8;

      lightMagenta.position.x = 25 + Math.cos(elapsedTime * 0.5) * 10;
      lightMagenta.position.y = -20 + Math.sin(elapsedTime * 0.6) * 8;

      // Subtle particle rotation
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationFrameId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="three-canvas-container" />
      {/* Dynamic Ambient Blur Glows Behind the Content */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />
      <div className="ambient-glow-3" />
    </>
  );
};

export default Background3D;

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CircuitField — interactive 3D particle/node background.
 *
 * Drop this anywhere near the root of your layout (e.g. app/layout.tsx),
 * rendered once, before your page content:
 *
 *   <CircuitField />
 *   <main>{children}</main>
 *
 * It renders a fixed full-screen canvas behind everything (z-index -1),
 * so it needs no wrapping container. Colors below are matched to
 * tailwind.config.ts: red.DEFAULT (#e13a4b) and cream (#f2ede2).
 *
 * Install once: npm install three
 * Optional (for prop types): npm install -D @types/three
 */

const NODE_COLOR = { r: 0.882, g: 0.227, b: 0.294 }; // red.DEFAULT #e13a4b — resting node color
const NEAR_COLOR = { r: 0.949, g: 0.929, b: 0.886 }; // cream #f2ede2 — nearest-to-cursor highlight
const LINK_COLOR = 0xe13a4b; // red.DEFAULT

const COUNT = 180;
const SPREAD = { x: 40, y: 24, z: 40 };
const LINK_DIST = 6.5;
const MAX_LINKS = COUNT * 6;
const RELINK_EVERY_N_FRAMES = 20;

export default function CircuitField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = 30;

    const group = new THREE.Group();
    scene.add(group);

    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD.x;
      const y = (Math.random() - 0.5) * SPREAD.y;
      const z = (Math.random() - 0.5) * SPREAD.z;
      positions[i * 3] = basePositions[i * 3] = x;
      positions[i * 3 + 1] = basePositions[i * 3 + 1] = y;
      positions[i * 3 + 2] = basePositions[i * 3 + 2] = z;
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      colors[i * 3] = NODE_COLOR.r;
      colors[i * 3 + 1] = NODE_COLOR.g;
      colors[i * 3 + 2] = NODE_COLOR.b;
    }
    pointGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(pointGeo, pointMat);
    group.add(points);

    const linePositions = new Float32Array(MAX_LINKS * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeo.setDrawRange(0, 0);
    const lineMat = new THREE.LineBasicMaterial({
      color: LINK_COLOR,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    let links: number[] = [];
    function rebuildLinks() {
      links = [];
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < LINK_DIST * LINK_DIST) {
            links.push(i, j);
            if (links.length / 2 >= MAX_LINKS) return;
          }
        }
      }
    }
    rebuildLinks();

    function writeLines() {
      const arr = lineGeo.attributes.position.array as Float32Array;
      const n = links.length / 2;
      for (let k = 0; k < n; k++) {
        const i = links[k * 2];
        const j = links[k * 2 + 1];
        arr[k * 6] = positions[i * 3];
        arr[k * 6 + 1] = positions[i * 3 + 1];
        arr[k * 6 + 2] = positions[i * 3 + 2];
        arr[k * 6 + 3] = positions[j * 3];
        arr[k * 6 + 4] = positions[j * 3 + 1];
        arr[k * 6 + 5] = positions[j * 3 + 2];
      }
      lineGeo.setDrawRange(0, n * 2);
      lineGeo.attributes.position.needsUpdate = true;
    }
    writeLines();

    const mouse = { x: 0, y: 0 };
    const targetRot = { x: 0, y: 0 };
    function onMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRot.y = mouse.x * 0.25;
      targetRot.x = mouse.y * 0.15;
    }
    window.addEventListener("mousemove", onMouseMove);

    let scrollFrac = 0;
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollFrac = max > 0 ? window.scrollY / max : 0;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    let frame = 0;
    let nearest = -1;
    let rafId = 0;

    function animate() {
      frame++;

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        for (let a = 0; a < 3; a++) {
          const idx = i * 3 + a;
          const spreadVal = a === 0 ? SPREAD.x : a === 1 ? SPREAD.y : SPREAD.z;
          if (Math.abs(positions[idx] - basePositions[idx]) > 1.2)
            velocities[idx] *= -1;
          if (positions[idx] > spreadVal / 2 || positions[idx] < -spreadVal / 2)
            velocities[idx] *= -1;
        }
      }

      const mx = mouse.x * 20;
      const my = mouse.y * 12;
      let bestD = Infinity;
      for (let i = 0; i < COUNT; i++) {
        const dx = positions[i * 3] - mx;
        const dy = positions[i * 3 + 1] - my;
        const d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          nearest = i;
        }
      }

      for (let i = 0; i < COUNT; i++) {
        const isNear = i === nearest;
        colors[i * 3] = isNear ? NEAR_COLOR.r : NODE_COLOR.r;
        colors[i * 3 + 1] = isNear ? NEAR_COLOR.g : NODE_COLOR.g;
        colors[i * 3 + 2] = isNear ? NEAR_COLOR.b : NODE_COLOR.b;
      }
      pointGeo.attributes.color.needsUpdate = true;
      pointGeo.attributes.position.needsUpdate = true;

      if (frame % RELINK_EVERY_N_FRAMES === 0) rebuildLinks();
      writeLines();

      if (!prefersReducedMotion) {
        group.rotation.y += 0.0009 + scrollFrac * 0.0025;
        group.rotation.x = Math.sin(scrollFrac * Math.PI) * 0.08;
        camera.rotation.x += (targetRot.x - camera.rotation.x) * 0.04;
        camera.rotation.y += (targetRot.y - camera.rotation.y) * 0.04;
      }
      camera.position.z = 30 - scrollFrac * 14;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      pointGeo.dispose();
      lineGeo.dispose();
      pointMat.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}

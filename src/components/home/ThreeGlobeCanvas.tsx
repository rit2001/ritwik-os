"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import type { SignalLocationId } from "@/components/signal/SignalProvider";
import { professionalSignals } from "@/data/professional-signals";

type GlobeCanvasProps = {
  activeLocation: SignalLocationId | null;
  onHover: (id: SignalLocationId | null) => void;
  onSelect: (id: SignalLocationId) => void;
};

function pointFromCoordinates(
  latitude: number,
  longitude: number,
  radius: number,
) {
  const phi = THREE.MathUtils.degToRad(90 - latitude);
  const theta = THREE.MathUtils.degToRad(longitude + 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export default function ThreeGlobeCanvas({
  activeLocation,
  onHover,
  onSelect,
}: Readonly<GlobeCanvasProps>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeLocation);
  const callbacksRef = useRef({ onHover, onSelect });

  useEffect(() => {
    activeRef.current = activeLocation;
    hostRef.current?.dispatchEvent(new Event("signalchange"));
  }, [activeLocation]);

  useEffect(() => {
    callbacksRef.current = { onHover, onSelect };
  }, [onHover, onSelect]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 5.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.innerWidth >= 768,
        powerPreference: "high-performance",
      });
    } catch {
      host.dataset.webgl = "unavailable";
      return;
    }

    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.className = "h-full w-full touch-none";
    host.append(renderer.domElement);

    const globe = new THREE.Group();
    globe.rotation.y = -0.72;
    globe.rotation.x = -0.08;
    scene.add(globe);

    const sphereGeometry = new THREE.SphereGeometry(1.62, 48, 32);
    const sphere = new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshBasicMaterial({
        color: 0x183955,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
      }),
    );
    globe.add(sphere);

    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.64, 48, 32),
      new THREE.MeshBasicMaterial({
        color: 0x0a3159,
        transparent: true,
        opacity: 0.22,
        side: THREE.FrontSide,
      }),
    );
    globe.add(shell);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.76, 48, 32),
      new THREE.MeshBasicMaterial({
        color: 0x2f7fff,
        transparent: true,
        opacity: 0.075,
        side: THREE.BackSide,
      }),
    );
    globe.add(atmosphere);

    const markerGeometry = new THREE.SphereGeometry(0.055, 16, 12);
    const markerMeshes: THREE.Mesh[] = [];
    const markerById = new Map<SignalLocationId, THREE.Mesh>();
    const publicSignals = professionalSignals.filter(
      (signal) => signal.visibility === "public",
    );

    for (const signal of publicSignals) {
      const marker = new THREE.Mesh(
        markerGeometry,
        new THREE.MeshBasicMaterial({ color: 0x66a8ff }),
      );
      marker.position.copy(
        pointFromCoordinates(signal.latitude, signal.longitude, 1.68),
      );
      marker.userData.signalId = signal.id;
      markerMeshes.push(marker);
      markerById.set(signal.id, marker);
      globe.add(marker);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.075, 0.105, 28),
        new THREE.MeshBasicMaterial({
          color: signal.id === "kolkata" ? 0x5ee7f7 : 0x2f7fff,
          transparent: true,
          opacity: 0.56,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      halo.position.copy(marker.position).multiplyScalar(1.006);
      halo.lookAt(new THREE.Vector3(0, 0, 0));
      halo.userData.signalId = signal.id;
      globe.add(halo);
    }

    const anchor = publicSignals.find((signal) => signal.id === "kolkata");
    if (anchor) {
      const start = pointFromCoordinates(
        anchor.latitude,
        anchor.longitude,
        1.69,
      );
      for (const signal of publicSignals.filter(
        (item) => item.id !== "kolkata" && item.id !== "usa",
      )) {
        const end = pointFromCoordinates(
          signal.latitude,
          signal.longitude,
          1.69,
        );
        const midpoint = start
          .clone()
          .add(end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(2.15);
        const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
        const geometry = new THREE.BufferGeometry().setFromPoints(
          curve.getPoints(56),
        );
        const line = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({
            color: 0x5ee7f7,
            transparent: true,
            opacity: 0.42,
          }),
        );
        globe.add(line);
      }
    }

    const starPositions: number[] = [];
    for (let index = 0; index < 120; index += 1) {
      const angle = index * 2.399963;
      const radius = 3.4 + (index % 13) * 0.12;
      starPositions.push(
        Math.cos(angle) * radius,
        ((index * 37) % 100) / 25 - 2,
        Math.sin(angle) * radius - 1.5,
      );
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3),
    );
    scene.add(
      new THREE.Points(
        starsGeometry,
        new THREE.PointsMaterial({
          color: 0x5d7894,
          size: 0.012,
          transparent: true,
          opacity: 0.65,
        }),
      ),
    );

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let frameId = 0;
    let isVisible = true;
    let isDocumentVisible = document.visibilityState === "visible";
    let dragging = false;
    let moved = false;
    let lastX = 0;
    let lastY = 0;
    let pauseUntil = 0;
    let hoveredId: SignalLocationId | null = null;

    const updateSize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const renderFrame = (time = performance.now()) => {
      frameId = 0;
      if (!isVisible || !isDocumentVisible) return;

      const reduce = reducedMotionQuery.matches;
      if (!reduce && !dragging && time > pauseUntil) {
        globe.rotation.y += 0.00075;
      }

      markerById.forEach((marker, id) => {
        const selected = id === activeRef.current || id === hoveredId;
        const pulse = reduce
          ? 1
          : 1 + Math.sin(time * 0.003 + marker.id) * 0.08;
        marker.scale.setScalar((selected ? 1.55 : 1) * pulse);
        (marker.material as THREE.MeshBasicMaterial).color.setHex(
          selected ? 0x5ee7f7 : id === "usa" ? 0xf2b95f : 0x66a8ff,
        );
      });

      renderer.render(scene, camera);
      if (!reduce || dragging) frameId = requestAnimationFrame(renderFrame);
    };

    const schedule = () => {
      if (!frameId && isVisible && isDocumentVisible) {
        frameId = requestAnimationFrame(renderFrame);
      }
    };

    const pick = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(markerMeshes, false)[0];
      const next = (hit?.object.userData.signalId ??
        null) as SignalLocationId | null;
      if (next !== hoveredId) {
        hoveredId = next;
        callbacksRef.current.onHover(next);
        renderer.domElement.style.cursor = next
          ? "pointer"
          : dragging
            ? "grabbing"
            : "grab";
      }
      schedule();
      return next;
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      moved = false;
      lastX = event.clientX;
      lastY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
      renderer.domElement.style.cursor = "grabbing";
      pauseUntil = performance.now() + 3200;
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (dragging) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
        globe.rotation.y += dx * 0.006;
        globe.rotation.x = THREE.MathUtils.clamp(
          globe.rotation.x + dy * 0.003,
          -0.65,
          0.65,
        );
        lastX = event.clientX;
        lastY = event.clientY;
        schedule();
      } else {
        pick(event);
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      const picked = pick(event);
      if (!moved && picked) callbacksRef.current.onSelect(picked);
      dragging = false;
      pauseUntil = performance.now() + 3200;
      renderer.domElement.releasePointerCapture(event.pointerId);
      renderer.domElement.style.cursor = picked ? "pointer" : "grab";
      schedule();
    };

    const onPointerLeave = () => {
      if (!dragging && hoveredId) {
        hoveredId = null;
        callbacksRef.current.onHover(null);
        schedule();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
      schedule();
    });
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible) schedule();
        else if (frameId) {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(host);

    const onVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
      if (isDocumentVisible) schedule();
      else if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const onReducedMotionChange = () => schedule();
    document.addEventListener("visibilitychange", onVisibilityChange);
    host.addEventListener("signalchange", schedule);
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    updateSize();
    schedule();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      host.removeEventListener("signalchange", schedule);
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      sphereGeometry.dispose();
      markerGeometry.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      starsGeometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="absolute inset-0" ref={hostRef} />;
}

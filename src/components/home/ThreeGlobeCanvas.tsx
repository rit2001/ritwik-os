"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import type { SignalLocationId } from "@/components/signal/SignalProvider";
import { professionalSignals } from "@/data/professional-signals";

type GlobeCanvasProps = {
  activeLocation: SignalLocationId | null;
  onHover: (id: SignalLocationId | null) => void;
  onSelect: (id: SignalLocationId) => void;
  rotationPaused?: boolean;
};

type MarkerScreenPosition = {
  id: SignalLocationId;
  x: number;
  y: number;
  front: boolean;
};

const publicSignals = professionalSignals.filter(
  (signal) => signal.visibility === "public",
);

const initialMarkerPositions: MarkerScreenPosition[] = [
  { id: "kolkata", x: 58, y: 40, front: true },
  { id: "bengaluru", x: 51, y: 57, front: true },
  { id: "pune", x: 46, y: 49, front: true },
  { id: "toronto", x: 31, y: 34, front: true },
  { id: "usa", x: 25, y: 49, front: true },
];

const labelOffsets: Record<SignalLocationId, string> = {
  kolkata: "translate-x-8 -translate-y-14 sm:translate-x-16 sm:-translate-y-14",
  bengaluru:
    "-translate-x-12 translate-y-12 sm:-translate-x-24 sm:translate-y-14",
  pune: "-translate-x-12 -translate-y-8 sm:-translate-x-24 sm:-translate-y-8",
  toronto: "translate-x-8 -translate-y-12 sm:translate-x-14 sm:-translate-y-14",
  usa: "translate-x-8 translate-y-10 sm:translate-x-14 sm:translate-y-14",
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
  rotationPaused = false,
}: Readonly<GlobeCanvasProps>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeLocation);
  const callbacksRef = useRef({ onHover, onSelect });
  const interactionPausedRef = useRef(false);
  const rotationPausedRef = useRef(rotationPaused);
  const pauseUntilRef = useRef(0);
  const [markerPositions, setMarkerPositions] = useState(
    initialMarkerPositions,
  );

  useEffect(() => {
    activeRef.current = activeLocation;
    hostRef.current?.dispatchEvent(new Event("signalchange"));
  }, [activeLocation]);

  useEffect(() => {
    callbacksRef.current = { onHover, onSelect };
  }, [onHover, onSelect]);

  useEffect(() => {
    rotationPausedRef.current = rotationPaused;
    interactionPausedRef.current = rotationPaused;
    hostRef.current?.dispatchEvent(new Event("signalchange"));
  }, [rotationPaused]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.05, 5.8);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.className = "h-full w-full touch-none";
    host.append(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0x6ca9ff, 0x02040a, 1.2));
    const keyLight = new THREE.PointLight(0x77c8ff, 18, 12);
    keyLight.position.set(-3, 3, 4);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x2f7fff, 14, 10);
    rimLight.position.set(3, -1, -2);
    scene.add(rimLight);

    const globe = new THREE.Group();
    globe.rotation.y = -0.36;
    globe.rotation.x = -0.08;
    scene.add(globe);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.58, 72, 48),
      new THREE.MeshPhongMaterial({
        color: 0x071a2d,
        emissive: 0x061528,
        emissiveIntensity: 0.8,
        shininess: 42,
        specular: 0x3c92e8,
        transparent: true,
        opacity: 0.98,
      }),
    );
    globe.add(sphere);

    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(1.592, 32, 20),
      new THREE.MeshBasicMaterial({
        color: 0x66a8ff,
        transparent: true,
        opacity: 0.075,
        wireframe: true,
        depthWrite: false,
      }),
    );
    globe.add(grid);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.74, 64, 42),
      new THREE.MeshBasicMaterial({
        color: 0x2f7fff,
        transparent: true,
        opacity: 0.11,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    );
    globe.add(atmosphere);

    const markerGeometry = new THREE.SphereGeometry(0.05, 18, 14);
    const markerMeshes: THREE.Mesh[] = [];
    const markerById = new Map<SignalLocationId, THREE.Mesh>();
    const haloById = new Map<SignalLocationId, THREE.Mesh>();

    for (const signal of publicSignals) {
      const id = signal.id as SignalLocationId;
      const marker = new THREE.Mesh(
        markerGeometry,
        new THREE.MeshBasicMaterial({ color: 0x66a8ff }),
      );
      marker.position.copy(
        pointFromCoordinates(signal.latitude, signal.longitude, 1.635),
      );
      marker.userData.signalId = id;
      markerMeshes.push(marker);
      markerById.set(id, marker);
      globe.add(marker);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.072, 0.1, 32),
        new THREE.MeshBasicMaterial({
          color: id === "usa" ? 0xf2b95f : 0x5ee7f7,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      halo.position.copy(marker.position).multiplyScalar(1.006);
      halo.lookAt(new THREE.Vector3(0, 0, 0));
      halo.userData.signalId = id;
      haloById.set(id, halo);
      globe.add(halo);
    }

    type ArcRecord = {
      targetId: SignalLocationId;
      curve: THREE.QuadraticBezierCurve3;
      line: THREE.Line;
      traveler: THREE.Mesh;
      phase: number;
    };
    const arcs: ArcRecord[] = [];
    const anchor = publicSignals.find((signal) => signal.id === "kolkata");
    if (anchor) {
      const start = pointFromCoordinates(
        anchor.latitude,
        anchor.longitude,
        1.65,
      );
      publicSignals
        .filter((signal) => signal.id !== "kolkata")
        .forEach((signal, index) => {
          const targetId = signal.id as SignalLocationId;
          const end = pointFromCoordinates(
            signal.latitude,
            signal.longitude,
            1.65,
          );
          const midpointDirection = start.clone().add(end);
          if (midpointDirection.lengthSq() < 0.08) {
            midpointDirection.set(0, 1, 0.25);
          }
          const midpoint = midpointDirection.normalize().multiplyScalar(2.05);
          midpoint.y += 0.12 + index * 0.035;
          const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(curve.getPoints(72)),
            new THREE.LineBasicMaterial({
              color: targetId === "usa" ? 0xf2b95f : 0x5ee7f7,
              transparent: true,
              opacity: 0.28,
              depthWrite: false,
            }),
          );
          const traveler = new THREE.Mesh(
            new THREE.SphereGeometry(0.026, 10, 8),
            new THREE.MeshBasicMaterial({
              color: targetId === "usa" ? 0xf2b95f : 0xa8f5ff,
              transparent: true,
              opacity: 0.95,
              depthWrite: false,
            }),
          );
          globe.add(line, traveler);
          arcs.push({
            targetId,
            curve,
            line,
            traveler,
            phase: index / Math.max(publicSignals.length - 1, 1),
          });
        });
    }

    const starPositions: number[] = [];
    for (let index = 0; index < 92; index += 1) {
      const angle = index * 2.399963;
      const radius = 3.1 + (index % 11) * 0.14;
      starPositions.push(
        Math.cos(angle) * radius,
        ((index * 37) % 100) / 27 - 1.85,
        Math.sin(angle) * radius - 1.4,
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
          color: 0x7395b8,
          size: 0.014,
          transparent: true,
          opacity: 0.58,
        }),
      ),
    );

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const projected = new THREE.Vector3();
    const worldPosition = new THREE.Vector3();
    let frameId = 0;
    let isVisible = true;
    let isDocumentVisible = document.visibilityState === "visible";
    let dragging = false;
    let moved = false;
    let lastX = 0;
    let lastY = 0;
    let hoveredId: SignalLocationId | null = null;
    let lastProjection = 0;

    const updateSize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const projectLabels = (time: number) => {
      if (time - lastProjection < 80) return;
      lastProjection = time;
      globe.updateMatrixWorld(true);
      setMarkerPositions(
        publicSignals.map((signal) => {
          const id = signal.id as SignalLocationId;
          markerById.get(id)?.getWorldPosition(worldPosition);
          projected.copy(worldPosition).project(camera);
          return {
            id,
            x: THREE.MathUtils.clamp((projected.x * 0.5 + 0.5) * 100, 7, 93),
            y: THREE.MathUtils.clamp((-projected.y * 0.5 + 0.5) * 100, 8, 92),
            front: worldPosition.z > -0.72,
          };
        }),
      );
    };

    const renderFrame = (time = performance.now()) => {
      frameId = 0;
      if (!isVisible || !isDocumentVisible) return;

      const reduce = reducedMotionQuery.matches;
      const active = activeRef.current;
      if (
        !reduce &&
        !dragging &&
        !interactionPausedRef.current &&
        time > pauseUntilRef.current
      ) {
        globe.rotation.y += 0.00038;
      }

      markerById.forEach((marker, id) => {
        const selected = id === active || id === hoveredId;
        const unrelated = Boolean((active || hoveredId) && !selected);
        const pulse = reduce
          ? 0
          : Math.max(0, Math.sin(time * 0.00145 + marker.id * 1.7)) ** 10;
        marker.scale.setScalar((selected ? 1.55 : 1) + pulse * 0.35);
        const material = marker.material as THREE.MeshBasicMaterial;
        material.color.setHex(
          selected ? 0xd6fbff : id === "usa" ? 0xf2b95f : 0x66a8ff,
        );
        material.opacity = unrelated ? 0.38 : 1;
        material.transparent = unrelated;

        const halo = haloById.get(id);
        if (halo) {
          halo.scale.setScalar((selected ? 1.55 : 1) + pulse * 1.7);
          (halo.material as THREE.MeshBasicMaterial).opacity = unrelated
            ? 0.12
            : selected
              ? 0.9
              : 0.32 + pulse * 0.42;
        }
      });

      arcs.forEach((arc) => {
        const selected = active === arc.targetId || hoveredId === arc.targetId;
        const unrelated = Boolean((active || hoveredId) && !selected);
        (arc.line.material as THREE.LineBasicMaterial).opacity = unrelated
          ? 0.07
          : selected
            ? 0.75
            : 0.25;
        if (!reduce) {
          arc.traveler.visible = true;
          arc.traveler.position.copy(
            arc.curve.getPoint((time * 0.000095 + arc.phase) % 1),
          );
          (arc.traveler.material as THREE.MeshBasicMaterial).opacity = unrelated
            ? 0.08
            : selected
              ? 1
              : 0.72;
        } else {
          arc.traveler.visible = false;
        }
      });

      projectLabels(time);
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
        interactionPausedRef.current =
          Boolean(next) || rotationPausedRef.current;
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
      pauseUntilRef.current = performance.now() + 1100;
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (dragging) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
        globe.rotation.y += dx * 0.005;
        globe.rotation.x = THREE.MathUtils.clamp(
          globe.rotation.x + dy * 0.0025,
          -0.5,
          0.5,
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
      pauseUntilRef.current = performance.now() + 1100;
      renderer.domElement.releasePointerCapture(event.pointerId);
      renderer.domElement.style.cursor = picked ? "pointer" : "grab";
      schedule();
    };

    const onPointerLeave = () => {
      if (!dragging && hoveredId) {
        hoveredId = null;
        callbacksRef.current.onHover(null);
        interactionPausedRef.current = rotationPausedRef.current;
        pauseUntilRef.current = performance.now() + 900;
        schedule();
      }
    };

    const onInteractionChange = () => schedule();
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
    host.addEventListener("signalchange", onInteractionChange);
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
      host.removeEventListener("signalchange", onInteractionChange);
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Points
        ) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const pauseForLabel = (id: SignalLocationId) => {
    interactionPausedRef.current = true;
    onHover(id);
    hostRef.current?.dispatchEvent(new Event("signalchange"));
  };

  const releaseLabel = () => {
    interactionPausedRef.current = rotationPaused;
    pauseUntilRef.current = performance.now() + 900;
    onHover(null);
    hostRef.current?.dispatchEvent(new Event("signalchange"));
  };

  return (
    <>
      <div className="absolute inset-0" ref={hostRef} />
      <div className="pointer-events-none absolute inset-0 z-10">
        {publicSignals.map((signal) => {
          const id = signal.id as SignalLocationId;
          const position =
            markerPositions.find((marker) => marker.id === id) ??
            initialMarkerPositions[0];
          const selected = activeLocation === id;

          return (
            <button
              className={`pointer-events-auto absolute z-20 max-w-[8.5rem] -translate-x-1/2 -translate-y-1/2 text-left transition-[opacity,filter] duration-[var(--duration-base)] sm:max-w-[12rem] ${labelOffsets[id]} ${
                selected
                  ? "opacity-100"
                  : position.front
                    ? "opacity-85 hover:opacity-100 focus-visible:opacity-100"
                    : "opacity-35 hover:opacity-100 focus-visible:opacity-100"
              }`}
              key={signal.id}
              onBlur={releaseLabel}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(id);
              }}
              onFocus={() => pauseForLabel(id)}
              onMouseEnter={() => pauseForLabel(id)}
              onMouseLeave={releaseLabel}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              type="button"
              aria-label={`${signal.label}, ${signal.country}. ${signal.detail}`}
              aria-pressed={selected}
            >
              <span
                className={`relative block border-l px-2 py-1.5 backdrop-blur-sm sm:px-3 sm:py-2 ${
                  selected
                    ? "border-signal-cyan bg-[rgb(4_10_18_/_0.9)] shadow-[0_0_30px_rgb(47_127_255_/_0.24)]"
                    : "border-border-strong bg-[rgb(4_10_18_/_0.72)]"
                }`}
              >
                <span className="block font-mono text-[0.58rem] font-semibold tracking-[0.1em] text-foreground uppercase sm:text-[0.67rem]">
                  {signal.label}
                </span>
                <span className="mt-0.5 hidden font-mono text-[0.56rem] tracking-[0.08em] text-signal-cyan uppercase sm:block">
                  {signal.country}
                </span>
                <span className="mt-1 hidden text-[0.62rem] leading-4 text-foreground-muted sm:block">
                  {signal.detail}
                </span>
                {selected ? (
                  <span
                    className="signal-ripple absolute top-1/2 -left-[0.28rem] h-2 w-2 -translate-y-1/2 rounded-full border border-signal-cyan"
                    aria-hidden="true"
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

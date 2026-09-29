"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import type { SignalLocationId } from "@/components/signal/SignalProvider";
import { professionalSignals } from "@/data/professional-signals";

type GlobeCanvasProps = {
  activeLocation: SignalLocationId | null;
  onExplore: () => void;
  onHover: (id: SignalLocationId | null) => void;
  onSelect: (id: SignalLocationId) => void;
  rotationPaused?: boolean;
};

type MarkerScreenPosition = {
  id: SignalLocationId;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  front: boolean;
  labelVisible: boolean;
};

const publicSignals = professionalSignals.filter(
  (signal) => signal.visibility === "public",
);

const initialMarkerPositions: MarkerScreenPosition[] = [
  {
    id: "kolkata",
    x: 58,
    y: 42,
    labelX: 70,
    labelY: 33,
    front: true,
    labelVisible: true,
  },
  {
    id: "bengaluru",
    x: 52,
    y: 56,
    labelX: 66,
    labelY: 64,
    front: true,
    labelVisible: true,
  },
  {
    id: "pune",
    x: 47,
    y: 51,
    labelX: 33,
    labelY: 48,
    front: true,
    labelVisible: false,
  },
  {
    id: "toronto",
    x: 32,
    y: 37,
    labelX: 20,
    labelY: 29,
    front: true,
    labelVisible: true,
  },
  {
    id: "usa",
    x: 27,
    y: 50,
    labelX: 18,
    labelY: 58,
    front: true,
    labelVisible: true,
  },
];

const markerPriority: readonly SignalLocationId[] = [
  "kolkata",
  "toronto",
  "usa",
  "bengaluru",
  "pune",
];

const markerPhase: Record<SignalLocationId, number> = {
  kolkata: 0,
  bengaluru: 1.4,
  pune: 2.7,
  toronto: 4,
  usa: 5.3,
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

function createGreatCircle(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
) {
  const startDirection = start.clone().normalize();
  const endDirection = end.clone().normalize();
  const points = Array.from({ length: 65 }, (_, index) => {
    const progress = index / 64;
    const direction = startDirection
      .clone()
      .lerp(endDirection, progress)
      .normalize();
    const altitude = Math.sin(Math.PI * progress) * 0.34;
    return direction.multiplyScalar(radius + altitude);
  });
  return new THREE.CatmullRomCurve3(points, false, "centripetal");
}

function placeCollisionAwareLabels(
  raw: readonly Omit<
    MarkerScreenPosition,
    "labelX" | "labelY" | "labelVisible"
  >[],
  width: number,
  height: number,
  activeId: SignalLocationId | null,
) {
  const occupied: Array<{
    left: number;
    right: number;
    top: number;
    bottom: number;
  }> = [];
  const labelWidth = width < 480 ? 70 : 92;
  const labelHeight = width < 480 ? 28 : 34;
  const preferred: Record<SignalLocationId, readonly [number, number][]> = {
    kolkata: [
      [58, -28],
      [54, 28],
      [-72, -30],
    ],
    bengaluru: [
      [54, 30],
      [-78, 30],
      [60, -28],
    ],
    pune: [
      [-78, -18],
      [-76, 28],
      [54, -34],
    ],
    toronto: [
      [-78, -28],
      [52, -32],
      [-76, 28],
    ],
    usa: [
      [-72, 30],
      [54, 30],
      [-76, -28],
    ],
  };

  const ordered = [...raw].sort((left, right) => {
    if (left.id === activeId) return -1;
    if (right.id === activeId) return 1;
    return markerPriority.indexOf(left.id) - markerPriority.indexOf(right.id);
  });
  const placedById = new Map<SignalLocationId, MarkerScreenPosition>();

  ordered.forEach((marker) => {
    if (!marker.front) {
      placedById.set(marker.id, {
        ...marker,
        labelX: marker.x,
        labelY: marker.y,
        labelVisible: false,
      });
      return;
    }

    const markerX = (marker.x / 100) * width;
    const markerY = (marker.y / 100) * height;
    const choices = [
      ...preferred[marker.id],
      [54, 0] as const,
      [-76, 0] as const,
      [0, -42] as const,
      [0, 42] as const,
    ];
    let placed = choices[0];
    let labelVisible = false;

    for (const choice of choices) {
      const centerX = THREE.MathUtils.clamp(
        markerX + choice[0],
        labelWidth / 2 + 6,
        width - labelWidth / 2 - 6,
      );
      const centerY = THREE.MathUtils.clamp(
        markerY + choice[1],
        labelHeight / 2 + 10,
        height - labelHeight / 2 - 10,
      );
      const box = {
        left: centerX - labelWidth / 2,
        right: centerX + labelWidth / 2,
        top: centerY - labelHeight / 2,
        bottom: centerY + labelHeight / 2,
      };
      const collides = occupied.some(
        (other) =>
          box.left < other.right + 5 &&
          box.right > other.left - 5 &&
          box.top < other.bottom + 4 &&
          box.bottom > other.top - 4,
      );
      if (!collides) {
        placed = choice;
        occupied.push(box);
        labelVisible = true;
        break;
      }
    }

    const labelX = THREE.MathUtils.clamp(
      ((markerX + placed[0]) / width) * 100,
      7,
      93,
    );
    const labelY = THREE.MathUtils.clamp(
      ((markerY + placed[1]) / height) * 100,
      7,
      93,
    );
    placedById.set(marker.id, {
      ...marker,
      labelX,
      labelY,
      labelVisible,
    });
  });

  return raw.map(
    (marker) => placedById.get(marker.id) ?? initialMarkerPositions[0],
  );
}

export default function ThreeGlobeCanvas({
  activeLocation,
  onExplore,
  onHover,
  onSelect,
  rotationPaused = false,
}: Readonly<GlobeCanvasProps>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeLocation);
  const callbacksRef = useRef({ onExplore, onHover, onSelect });
  const interactionPausedRef = useRef(false);
  const rotationPausedRef = useRef(rotationPaused);
  const pauseUntilRef = useRef(0);
  const activeChangedAtRef = useRef(0);
  const [markerPositions, setMarkerPositions] = useState(
    initialMarkerPositions,
  );

  useEffect(() => {
    activeRef.current = activeLocation;
    activeChangedAtRef.current = performance.now();
    hostRef.current?.dispatchEvent(new Event("signalchange"));
  }, [activeLocation]);

  useEffect(() => {
    callbacksRef.current = { onExplore, onHover, onSelect };
  }, [onExplore, onHover, onSelect]);

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
    camera.position.set(0, 0.04, 5.8);

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
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 640 ? 1.15 : 1.6),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.className = "h-full w-full touch-none";
    host.append(renderer.domElement);

    const globe = new THREE.Group();
    globe.rotation.y = -0.36;
    globe.rotation.x = -0.08;
    scene.add(globe);

    const earthGeometry = new THREE.SphereGeometry(1.58, 72, 48);
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        dayMap: { value: null },
        nightMap: { value: null },
        sunDirection: {
          value: new THREE.Vector3(-3.7, 2.4, 4.6).normalize(),
        },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        varying vec3 vViewDirection;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vUv = uv;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          vViewDirection = normalize(cameraPosition - worldPosition.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D dayMap;
        uniform sampler2D nightMap;
        uniform vec3 sunDirection;
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        varying vec3 vViewDirection;
        void main() {
          vec3 normal = normalize(vWorldNormal);
          float lightDot = dot(normal, normalize(sunDirection));
          float dayFactor = smoothstep(-0.18, 0.34, lightDot);
          float twilight = 1.0 - smoothstep(0.02, 0.38, abs(lightDot));
          vec3 daySample = texture2D(dayMap, vUv).rgb;
          vec3 nightSample = texture2D(nightMap, vUv).rgb;
          float dayLuma = dot(daySample, vec3(0.2126, 0.7152, 0.0722));
          float nightLuma = dot(nightSample, vec3(0.2126, 0.7152, 0.0722));
          float oceanMask = smoothstep(
            0.015,
            0.16,
            daySample.b - max(daySample.r, daySample.g * 0.86)
          );
          vec3 restrainedDay = pow(daySample, vec3(1.1)) * vec3(0.42, 0.44, 0.49);
          vec3 nightOcean = daySample * vec3(0.12, 0.17, 0.26) + vec3(0.012, 0.028, 0.058);
          vec3 nightLand = daySample * vec3(0.22, 0.2, 0.18) + vec3(0.035, 0.044, 0.044);
          vec3 darkEarth = mix(nightLand, nightOcean, oceanMask);
          float cityMask = smoothstep(0.12, 0.72, nightLuma);
          vec3 cityLights = vec3(1.0, 0.66, 0.27) * cityMask * (0.55 + nightLuma * 1.05);
          vec3 color = mix(darkEarth + cityLights, restrainedDay, dayFactor);
          float oppositeFill = smoothstep(-0.9, 0.28, dot(normal, normalize(vec3(0.55, -0.12, -0.82))));
          color += vec3(0.026, 0.068, 0.115) * (0.34 + oppositeFill * 0.66) * (1.0 - dayFactor);
          color += vec3(0.025, 0.14, 0.22) * twilight * 0.34;
          float oceanSpecular = pow(
            max(dot(reflect(-normalize(sunDirection), normal), vViewDirection), 0.0),
            34.0
          ) * oceanMask * dayFactor;
          color += vec3(0.18, 0.34, 0.48) * oceanSpecular * 0.22;
          color += vec3(dayLuma * 0.018) * (1.0 - dayFactor);
          float surfaceFresnel = pow(1.0 - max(dot(normal, vViewDirection), 0.0), 4.0);
          float litLimb = surfaceFresnel * smoothstep(-0.3, 0.62, lightDot);
          color += vec3(0.04, 0.28, 0.38) * surfaceFresnel * 0.38;
          color += vec3(0.05, 0.18, 0.26) * litLimb * 0.28;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    globe.add(earth);

    let earthTexture: THREE.Texture | null = null;
    let nightTexture: THREE.Texture | null = null;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/images/earth/blue-marble-land-ocean-ice-2048.jpg",
      (texture) => {
        earthTexture = texture;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(
          8,
          renderer.capabilities.getMaxAnisotropy(),
        );
        texture.wrapS = THREE.RepeatWrapping;
        earthMaterial.uniforms.dayMap.value = texture;
        earthMaterial.needsUpdate = true;
        schedule();
      },
    );
    textureLoader.load("/images/earth/earth-at-night-2048.png", (texture) => {
      nightTexture = texture;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        8,
        renderer.capabilities.getMaxAnisotropy(),
      );
      texture.wrapS = THREE.RepeatWrapping;
      earthMaterial.uniforms.nightMap.value = texture;
      earthMaterial.needsUpdate = true;
      schedule();
    });

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.665, 64, 42),
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-modelViewPosition.xyz);
            gl_Position = projectionMatrix * modelViewPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float rim = pow(1.0 - max(dot(vNormal, vView), 0.0), 4.8);
            float edge = smoothstep(0.18, 0.92, rim);
            gl_FragColor = vec4(0.16, 0.7, 0.96, edge * 0.5);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.FrontSide,
        transparent: true,
      }),
    );
    globe.add(atmosphere);

    const markerGeometry = new THREE.SphereGeometry(0.052, 18, 14);
    const markerMeshes: THREE.Mesh[] = [];
    const markerById = new Map<SignalLocationId, THREE.Mesh>();
    const haloById = new Map<SignalLocationId, THREE.Mesh>();
    const sparkById = new Map<SignalLocationId, THREE.Mesh>();

    for (const signal of publicSignals) {
      const id = signal.id as SignalLocationId;
      const marker = new THREE.Mesh(
        markerGeometry,
        new THREE.MeshBasicMaterial({ color: 0x80dfff }),
      );
      marker.position.copy(
        pointFromCoordinates(signal.latitude, signal.longitude, 1.625),
      );
      marker.userData.signalId = id;
      markerMeshes.push(marker);
      markerById.set(id, marker);
      globe.add(marker);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.07, 0.098, 32),
        new THREE.MeshBasicMaterial({
          color: id === "usa" ? 0xf2b95f : 0x5ee7f7,
          depthWrite: false,
          opacity: 0.34,
          side: THREE.DoubleSide,
          transparent: true,
        }),
      );
      halo.position.copy(marker.position).multiplyScalar(1.007);
      halo.lookAt(new THREE.Vector3(0, 0, 0));
      haloById.set(id, halo);
      globe.add(halo);

      const spark = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 10, 8),
        new THREE.MeshBasicMaterial({
          color: id === "usa" ? 0xffd895 : 0xc8fbff,
          depthWrite: false,
          opacity: 0,
          transparent: true,
        }),
      );
      spark.position.copy(marker.position).multiplyScalar(1.018);
      sparkById.set(id, spark);
      globe.add(spark);
    }

    type ArcRecord = {
      targetId: SignalLocationId;
      curve: THREE.CatmullRomCurve3;
      line: THREE.Line;
      photon: THREE.Mesh;
      arrival: THREE.Mesh;
    };
    const arcs: ArcRecord[] = [];
    const anchor = publicSignals.find((signal) => signal.id === "kolkata");
    if (anchor) {
      const start = pointFromCoordinates(
        anchor.latitude,
        anchor.longitude,
        1.63,
      );
      publicSignals
        .filter((signal) => signal.id !== "kolkata")
        .forEach((signal) => {
          const targetId = signal.id as SignalLocationId;
          const end = pointFromCoordinates(
            signal.latitude,
            signal.longitude,
            1.63,
          );
          const curve = createGreatCircle(start, end, 1.65);
          const color = targetId === "usa" ? 0xf2b95f : 0x5ee7f7;
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(curve.getPoints(88)),
            new THREE.LineBasicMaterial({
              color,
              depthWrite: false,
              opacity: 0.17,
              transparent: true,
            }),
          );
          const photon = new THREE.Mesh(
            new THREE.SphereGeometry(0.036, 12, 8),
            new THREE.MeshBasicMaterial({
              color,
              depthWrite: false,
              opacity: 0,
              transparent: true,
            }),
          );
          const arrival = new THREE.Mesh(
            new THREE.RingGeometry(0.065, 0.085, 24),
            new THREE.MeshBasicMaterial({
              color,
              depthWrite: false,
              opacity: 0,
              side: THREE.DoubleSide,
              transparent: true,
            }),
          );
          arrival.position.copy(end).multiplyScalar(1.006);
          arrival.lookAt(new THREE.Vector3(0, 0, 0));
          globe.add(line, photon, arrival);
          arcs.push({ targetId, curve, line, photon, arrival });
        });
    }

    const starPositions: number[] = [];
    for (let index = 0; index < 78; index += 1) {
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
          color: 0x7798b9,
          opacity: 0.5,
          size: 0.013,
          transparent: true,
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
    let exploredByDrag = false;
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
      if (time - lastProjection < 90) return;
      lastProjection = time;
      globe.updateMatrixWorld(true);
      const raw = publicSignals.map((signal) => {
        const id = signal.id as SignalLocationId;
        markerById.get(id)?.getWorldPosition(worldPosition);
        projected.copy(worldPosition).project(camera);
        return {
          id,
          x: THREE.MathUtils.clamp((projected.x * 0.5 + 0.5) * 100, 4, 96),
          y: THREE.MathUtils.clamp((-projected.y * 0.5 + 0.5) * 100, 5, 95),
          front: worldPosition.z > 0.02,
        };
      });
      setMarkerPositions(
        placeCollisionAwareLabels(
          raw,
          host.clientWidth,
          host.clientHeight,
          activeRef.current,
        ),
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
        globe.rotation.y += 0.00034;
      }

      markerById.forEach((marker, id) => {
        const selected = id === active || id === hoveredId;
        const unrelated = Boolean((active || hoveredId) && !selected);
        const phase = markerPhase[id];
        const breath = reduce
          ? 0
          : Math.max(0, Math.sin(time * 0.00072 + phase)) * 0.13;
        marker.scale.setScalar((selected ? 1.55 : 1.05) + breath);
        const material = marker.material as THREE.MeshBasicMaterial;
        material.color.setHex(
          selected ? 0xe6fdff : id === "usa" ? 0xf2b95f : 0x80dfff,
        );
        material.opacity = unrelated ? 0.34 : 1;
        material.transparent = unrelated;

        const halo = haloById.get(id);
        if (halo) {
          const activationAge = time - activeChangedAtRef.current;
          const activationRipple =
            selected && activationAge < 900 && !reduce
              ? Math.sin((activationAge / 900) * Math.PI)
              : 0;
          const occasional = reduce
            ? 0
            : Math.max(0, Math.sin(time * 0.00046 + phase)) ** 24;
          halo.scale.setScalar(
            (selected ? 1.35 : 1) + activationRipple * 1.3 + occasional * 0.7,
          );
          (halo.material as THREE.MeshBasicMaterial).opacity = unrelated
            ? 0.06
            : selected
              ? 0.72 * (1 - activationRipple * 0.55)
              : 0.28 + occasional * 0.42;
        }

        const spark = sparkById.get(id);
        if (spark) {
          const sparkStrength = reduce
            ? 0
            : Math.max(0, Math.sin(time * 0.00039 + phase + 0.7)) ** 42;
          spark.scale.setScalar(1 + sparkStrength * 1.8);
          (spark.material as THREE.MeshBasicMaterial).opacity = unrelated
            ? 0
            : sparkStrength * 0.92;
        }
      });

      const selectedArcIndex = arcs.findIndex(
        (arc) => active === arc.targetId || hoveredId === arc.targetId,
      );
      const hasFocusedNode = Boolean(active || hoveredId);
      const idleSegment = 6200;
      const cycleIndex =
        Math.floor(time / idleSegment) % Math.max(arcs.length, 1);
      const idleProgress = (time % idleSegment) / idleSegment;
      arcs.forEach((arc, index) => {
        const dominant =
          selectedArcIndex >= 0
            ? index === selectedArcIndex
            : !hasFocusedNode && index === cycleIndex;
        const lineMaterial = arc.line.material as THREE.LineBasicMaterial;
        lineMaterial.opacity = dominant ? 0.78 : hasFocusedNode ? 0.07 : 0.19;

        if (!reduce && dominant) {
          const selectedProgress = THREE.MathUtils.clamp(
            (time - activeChangedAtRef.current) / 1450,
            0,
            1,
          );
          const routeLengthFactor = THREE.MathUtils.clamp(
            arc.curve.getLength() / 4.3,
            0.78,
            1.25,
          );
          const progress =
            selectedArcIndex >= 0
              ? selectedProgress
              : Math.min(1, idleProgress / (0.56 * routeLengthFactor));
          const traveling =
            selectedArcIndex >= 0 ? progress < 1 : idleProgress < 0.68;
          arc.photon.visible = true;
          arc.photon.position.copy(arc.curve.getPoint(progress));
          (arc.photon.material as THREE.MeshBasicMaterial).opacity = traveling
            ? Math.sin(progress * Math.PI) * 0.95
            : 0;
          const arrivalStrength = Math.max(0, (progress - 0.88) / 0.12);
          arc.arrival.scale.setScalar(1 + arrivalStrength * 1.8);
          (arc.arrival.material as THREE.MeshBasicMaterial).opacity =
            Math.sin(arrivalStrength * Math.PI) * 0.78;
        } else {
          arc.photon.visible = false;
          (arc.arrival.material as THREE.MeshBasicMaterial).opacity = 0;
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
        if (next) callbacksRef.current.onExplore();
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
      pauseUntilRef.current = performance.now() + 1000;
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (dragging) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        if (Math.abs(dx) + Math.abs(dy) > 2) {
          moved = true;
          if (!exploredByDrag) {
            exploredByDrag = true;
            callbacksRef.current.onExplore();
          }
        }
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
      pauseUntilRef.current = performance.now() + 1000;
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
      earthTexture?.dispose();
      nightTexture?.dispose();
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
    onExplore();
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
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {markerPositions.map((position) =>
          position.front && position.labelVisible ? (
            <line
              key={position.id}
              stroke="rgb(94 231 247 / 0.35)"
              strokeWidth="0.18"
              x1={position.x}
              x2={position.labelX}
              y1={position.y}
              y2={position.labelY}
            />
          ) : null,
        )}
      </svg>
      <div className="pointer-events-none absolute inset-0 z-20">
        {publicSignals.map((signal) => {
          const id = signal.id as SignalLocationId;
          const position =
            markerPositions.find((marker) => marker.id === id) ??
            initialMarkerPositions[0];
          const selected = activeLocation === id;
          const labelVisible = position.front && position.labelVisible;

          return (
            <button
              className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-[opacity,filter] duration-[var(--duration-base)] ${
                labelVisible
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              key={signal.id}
              onBlur={releaseLabel}
              onClick={(event) => {
                event.stopPropagation();
                onExplore();
                onSelect(id);
              }}
              onFocus={() => pauseForLabel(id)}
              onMouseEnter={() => pauseForLabel(id)}
              onMouseLeave={releaseLabel}
              style={{
                left: `${position.labelX}%`,
                top: `${position.labelY}%`,
              }}
              tabIndex={labelVisible ? 0 : -1}
              type="button"
              aria-label={`${signal.label}, ${signal.country}. ${signal.detail}`}
              aria-pressed={selected}
            >
              <span className="block whitespace-nowrap px-1.5 py-1 text-left [text-shadow:0_1px_8px_rgb(0_0_0_/_0.95)]">
                <span className="block font-mono text-[0.56rem] font-semibold tracking-[0.09em] text-foreground uppercase sm:text-[0.64rem]">
                  {signal.label}
                </span>
                <span
                  className={`mt-0.5 block h-px origin-left bg-signal-cyan transition-transform ${selected ? "scale-x-100" : "scale-x-45"}`}
                  aria-hidden="true"
                />
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

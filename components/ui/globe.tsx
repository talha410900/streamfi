"use client"

import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

const DEFAULT_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config: userConfig,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)
  const phiRef = useRef(0)
  const sizeRef = useRef(400)
  const pointerInteracting = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const base = { ...DEFAULT_CONFIG, ...userConfig } as COBEOptions

    let destroyed = false

    const startLoop = () => {
      const tick = () => {
        if (destroyed || !globeRef.current) return
        if (!pointerInteracting.current) phiRef.current += 0.004
        const w = sizeRef.current
        globeRef.current.update({
          phi: phiRef.current + rs.get(),
          width: w,
          height: w,
        })
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const mountGlobe = (cssWidth: number) => {
      if (cssWidth < 64) return
      const w = Math.round(cssWidth * 2)
      sizeRef.current = w

      if (globeRef.current) {
        globeRef.current.destroy()
        globeRef.current = null
      }

      globeRef.current = createGlobe(canvas, {
        ...base,
        width: w,
        height: w,
      })
      globeRef.current.update({
        phi: phiRef.current + rs.get(),
        width: w,
        height: w,
      })
      canvas.style.opacity = "1"
      cancelAnimationFrame(rafRef.current)
      startLoop()
    }

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect
      if (!cr || destroyed) return
      mountGlobe(cr.width)
    })

    ro.observe(container)
    mountGlobe(container.getBoundingClientRect().width)

    return () => {
      destroyed = true
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      globeRef.current?.destroy()
      globeRef.current = null
    }
  }, [rs, userConfig])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto aspect-square w-full max-w-full min-h-55 min-w-55",
        className
      )}
    >
      <canvas
        className="block size-full opacity-0 transition-opacity duration-500"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}

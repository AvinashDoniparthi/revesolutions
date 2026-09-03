// Coverflow Carousel — Originkit
// Using component defaults.

import * as React from "react"
import { useCallback, useEffect, useMemo, useRef } from "react"
const RenderTarget = {
    current: () => "preview",
    canvas: "canvas",
    export: "export",
    thumbnail: "thumbnail",
    preview: "preview",
}
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
    type MotionValue,
} from "framer-motion"

/**
 * CoverflowCarousel — a flat-slat "cover flow" gallery.
 *
 * The active item is a big landscape card centered in the stage; every other
 * item is a thin flat slat of a fixed size. Each card is positioned by its
 * wrapped relative offset from the active index, so stepping is always a
 * single-slat move and the loop is seamless. A windowed set is rendered;
 * cards animate in from one edge as they animate out the other.
 */

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type CoverflowImage = {
    src?: any
    srcUrl?: string
    alt?: string
}

export type CoverflowProps = {
    images?: CoverflowImage[]
    activeWidth?: number
    activeHeight?: number
    restWidth?: number
    restHeight?: number
    gap?: number
    radius?: number
    showArrows?: boolean
    arrowColor?: string
    arrowBackground?: string
    arrowSize?: number
    arrowPosition?: number
    autoplay?: boolean
    autoplayDirection?: "leftToRight" | "rightToLeft"
    pauseOnHover?: boolean
    paused?: boolean
    onActiveIndexChange?: (index: number) => void
    onImageClick?: (index: number) => void
    transition?: any
    style?: React.CSSProperties
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const DEFAULT_IMAGES: CoverflowImage[] = [
    {
        srcUrl: "/showcase/kts-properties.png",
        alt: "KTS Properties — Handcrafted Real Estate Platform",
    },
    {
        srcUrl: "/showcase/tracezero-landing.png",
        alt: "TraceZero — Digital Exposure & OSINT Platform",
    },
    {
        srcUrl: "/showcase/tracezero-report.png",
        alt: "TraceZero — Threat Intelligence & Exposure Assessment",
    },
    {
        srcUrl: "/showcase/smartscan-command.png",
        alt: "Smart Scan — AI-Driven Spectrum Intelligence Command Center",
    },
    {
        srcUrl: "/showcase/smartscan-telemetry.png",
        alt: "Smart Scan — Real-Time RF Spectrum Operations Dashboard",
    },
    {
        srcUrl: "/showcase/aevum-dashboard.png",
        alt: "Aevum Health — Personal Health Intelligence & Medical Records Hub",
    },
    {
        srcUrl: "/showcase/aevum-trends.png",
        alt: "Aevum Clinical — Biometric Timeline & Diagnostic Trends Platform",
    },
]

const GRADIENT_FALLBACKS = [
    "linear-gradient(150deg, #FFFFFF 0%, #F1F7FE 100%)",
    "linear-gradient(150deg, #FFFFFF 0%, #EEF5FD 100%)",
    "linear-gradient(150deg, #FFFFFF 0%, #F4F8FE 100%)",
    "linear-gradient(150deg, #FFFFFF 0%, #EFF6FD 100%)",
    "linear-gradient(150deg, #FFFFFF 0%, #F2F8FE 100%)",
    "linear-gradient(150deg, #FFFFFF 0%, #EDF4FC 100%)",
]

const RENDER_RANGE = 6 // max slats each side

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function resolveImageSrc(input: any): string {
    if (!input) return ""
    if (typeof input === "string") return input
    if (typeof input === "object" && input.src) return input.src
    return ""
}

function resolveImageSrcSet(input: any): string | undefined {
    if (input && typeof input === "object" && input.srcSet) return input.srcSet
    return undefined
}

function resolveItemSrc(item: CoverflowImage | undefined): string {
    const override = item?.srcUrl && item.srcUrl.trim()
    if (override) return override
    return resolveImageSrc(item?.src)
}

type Sizing = {
    restWidth: number
    restHeight: number
    activeWidth: number
    activeHeight: number
}

// Card `index`'s signed distance from centre at carousel position `pos`,
// wrapped into (-count/2, count/2].
function relOf(index: number, pos: number, count: number): number {
    let rel = (((index - pos) % count) + count) % count
    if (rel > count / 2) rel -= count
    return rel
}

// Horizontal offset (px) from centre for a given signed distance `rel`.
function xForRel(rel: number, s: Sizing, gap: number): number {
    const ar = Math.abs(rel)
    const c1 = s.activeWidth / 2 + gap + s.restWidth / 2
    const pitch = s.restWidth + gap
    const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch
    return (rel < 0 ? -1 : 1) * mag
}

// 0 at centre (fully active size) → 1 once a full slot away (rest/slat size).
function blendForRel(rel: number): number {
    return Math.min(Math.abs(rel), 1)
}

// -----------------------------------------------------------------------------
// Card
// -----------------------------------------------------------------------------

function Card({
    item,
    index,
    pos,
    count,
    R,
    sizing,
    gap,
    radius,
    gradient,
    onSelect,
}: {
    item: CoverflowImage | undefined
    index: number
    pos: MotionValue<number>
    count: number
    R: number
    sizing: Sizing
    gap: number
    radius: number
    gradient: string
    onSelect: ((index: number) => void) | undefined
}) {
    const src = resolveItemSrc(item)
    const srcSet = resolveImageSrcSet(item?.src)

    const x = useTransform(pos, (p: number) =>
        xForRel(relOf(index, p, count), sizing, gap)
    )
    const opacity = useTransform(pos, (p: number) => {
        const ar = Math.abs(relOf(index, p, count))
        return ar <= R ? 1 : ar >= R + 1 ? 0 : 1 - (ar - R)
    })
    const zIndex = useTransform(pos, (p: number) =>
        Math.round(1000 - Math.abs(relOf(index, p, count)) * 100)
    )
    const width = useTransform(pos, (p: number) => {
        const a = blendForRel(relOf(index, p, count))
        return sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a
    })
    const height = useTransform(pos, (p: number) => {
        const a = blendForRel(relOf(index, p, count))
        return (
            sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a
        )
    })
    const borderRadius = useTransform(pos, (p: number) => {
        const a = blendForRel(relOf(index, p, count))
        const w =
            sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a
        const h =
            sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a
        return (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(w, h) / 2)
    })
    const boxShadow = useTransform(pos, (p: number) =>
        Math.abs(relOf(index, p, count)) < 0.5
            ? "0 24px 70px rgba(0, 102, 214, 0.22), 0 8px 24px rgba(0,0,0,0.2), inset 0 0 0 1.5px rgba(0, 102, 214, 0.35)"
            : "0 14px 40px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0, 102, 214, 0.12)"
    )

    return (
        <motion.div
            onClick={onSelect ? () => onSelect(index) : undefined}
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                x,
                zIndex,
                opacity,
                cursor: onSelect ? "pointer" : "default",
            }}
        >
            <motion.div
                style={{
                    x: "-50%",
                    y: "-50%",
                    width,
                    height,
                    borderRadius,
                    overflow: "hidden",
                    background: gradient,
                    boxShadow,
                }}
            >
                {src ? (
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                        <img
                            src={src}
                            srcSet={srcSet}
                            alt={item?.alt || ""}
                            loading="lazy"
                            decoding="async"
                            width={1024}
                            height={576}
                            draggable={false}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                                display: "block",
                                pointerEvents: "none",
                                userSelect: "none",
                            }}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "16px",
                            textAlign: "center",
                            background: "linear-gradient(150deg, #FFFFFF 0%, #F3F8FE 100%)",
                            border: "1.5px dashed #CBDFF8",
                            borderRadius: "inherit",
                            boxSizing: "border-box",
                        }}
                    >
                        <div
                            style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "12px",
                                background: "#E5F1FF",
                                border: "1px solid #BFDBFE",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#0066D6",
                                boxShadow: "0 2px 6px rgba(0, 102, 214, 0.08)",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                                <line x1="3" x2="21" y1="9" y2="9"/>
                                <line x1="9" x2="9" y1="21" y2="9"/>
                            </svg>
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#0C172B", letterSpacing: "-0.01em" }}>
                            Upcoming Showcase
                        </span>
                        <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#0066D6", background: "#E5F1FF", padding: "2px 8px", borderRadius: "9999px", border: "1px solid #BFDBFE", fontWeight: 600 }}>
                            Slot Reserved
                        </span>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

// -----------------------------------------------------------------------------
// ArrowButton
// -----------------------------------------------------------------------------

function ArrowButton({
    side,
    onClick,
    color,
    background,
    size,
    position,
}: {
    side: "left" | "right"
    onClick: () => void
    color: string
    background: string
    size: number
    position: number
}) {
    const isLeft = side === "left"
    const p = Math.max(0, Math.min(100, position))
    const inset = `calc((50% - ${size}px) * ${(100 - p) / 100})`
    return (
        <button
            type="button"
            aria-label={isLeft ? "Previous" : "Next"}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
                e.stopPropagation()
                onClick()
            }}
            style={{
                position: "absolute",
                top: "50%",
                [isLeft ? "left" : "right"]: inset,
                transform: "translateY(-50%)",
                width: size,
                height: size,
                borderRadius: "50%",
                border: "1px solid #BFDBFE",
                background,
                color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
                zIndex: 2000,
                boxShadow: "0 6px 18px rgba(0, 102, 214, 0.15), 0 2px 6px rgba(0,0,0,0.06)",
                WebkitTapHighlightColor: "transparent",
            }}
        >
            <svg
                width={size * 0.4}
                height={size * 0.4}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pointerEvents: "none" }}
            >
                {isLeft ? (
                    <polyline points="15 18 9 12 15 6" />
                ) : (
                    <polyline points="9 18 15 12 9 6" />
                )}
            </svg>
        </button>
    )
}

// -----------------------------------------------------------------------------
// Component Defaults
// -----------------------------------------------------------------------------

const COMPONENT_DEFAULTS = {
    images: DEFAULT_IMAGES,
    activeWidth: 600,
    activeHeight: 400,
    restWidth: 200,
    restHeight: 270,
    gap: 30,
    radius: 2,
    showArrows: true,
    arrowColor: "#000000",
    arrowBackground: "#FFFFFF",
    arrowSize: 56,
    arrowPosition: 95,
    autoplay: false,
    autoplayDirection: "rightToLeft" as const,
    pauseOnHover: false,
    paused: false,
    onActiveIndexChange: undefined as ((index: number) => void) | undefined,
    onImageClick: undefined as ((index: number) => void) | undefined,
    transition: {
        type: "tween",
        duration: 0.3,
        delay: 1,
        ease: "easeInOut",
    },
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function CoverflowCarousel(props: CoverflowProps) {
    const mergedProps = { ...COMPONENT_DEFAULTS, ...props }
    const {
        images: rawImages,
        activeWidth,
        activeHeight,
        restWidth,
        restHeight,
        gap,
        radius,
        showArrows,
        arrowColor,
        arrowBackground,
        arrowSize,
        arrowPosition,
        autoplay,
        autoplayDirection,
        pauseOnHover,
        paused,
        onActiveIndexChange,
        onImageClick,
        transition: transitionProp,
        style,
    } = mergedProps

    const renderTarget = RenderTarget.current()
    const isStatic =
        renderTarget === RenderTarget.export ||
        renderTarget === RenderTarget.thumbnail
    const prefersReducedMotion = useReducedMotion()

    const images = useMemo(
        () =>
            Array.isArray(rawImages) && rawImages.length > 0
                ? rawImages
                : DEFAULT_IMAGES,
        [rawImages]
    )
    const count = Math.max(1, images.length)

    const sizing: Sizing = useMemo(
        () => ({ restWidth, restHeight, activeWidth, activeHeight }),
        [restWidth, restHeight, activeWidth, activeHeight]
    )

    const moveDur =
        typeof transitionProp?.duration === "number"
            ? transitionProp.duration
            : 0.5
    const dwell =
        typeof transitionProp?.delay === "number"
            ? Math.max(0, transitionProp.delay)
            : 1.2

    const R = Math.max(1, Math.min(RENDER_RANGE, Math.floor(count / 2) - 1))

    const isHoveredRef = useRef(false)

    const pos = useMotionValue(0)
    const targetRef = useRef(0)
    const rafRef = useRef<number | null>(null)
    const lastTRef = useRef<number | null>(null)
    const autoplayingRef = useRef(false)
    const dirRef = useRef(1)
    const dwellAccRef = useRef(0)
    const moveDurRef = useRef(moveDur)
    const dwellRef = useRef(dwell)
    const reducedRef = useRef(prefersReducedMotion)

    useEffect(() => {
        moveDurRef.current = moveDur
        dwellRef.current = dwell
        reducedRef.current = prefersReducedMotion
    }, [moveDur, dwell, prefersReducedMotion])

    const tickRef = useRef<((t: number) => void) | null>(null)

    const tick = useCallback(
        (t: number) => {
            const last = lastTRef.current ?? t
            const dt = Math.min((t - last) / 1000, 1 / 30)
            lastTRef.current = t

            const cur = pos.get()
            const diff = targetRef.current - cur
            const dur = Math.max(0.08, moveDurRef.current)
            const step = (1 / dur) * dt
            const arriving = reducedRef.current || Math.abs(diff) <= step

            if (arriving) {
                pos.set(targetRef.current)
                if (autoplayingRef.current) {
                    dwellAccRef.current += dt
                    if (dwellAccRef.current >= Math.max(0, dwellRef.current)) {
                        dwellAccRef.current = 0
                        targetRef.current += dirRef.current
                    }
                    if (tickRef.current) {
                        rafRef.current = requestAnimationFrame(tickRef.current)
                    }
                    return
                }
                rafRef.current = null
                lastTRef.current = null
                return
            }

            pos.set(cur + Math.sign(diff) * step)
            if (tickRef.current) {
                rafRef.current = requestAnimationFrame(tickRef.current)
            }
        },
        [pos]
    )

    useEffect(() => {
        tickRef.current = tick
    }, [tick])

    const ensureRunning = useCallback(() => {
        if (rafRef.current == null) {
            lastTRef.current = null
            rafRef.current = requestAnimationFrame(tick)
        }
    }, [tick])

    const goNext = useCallback(() => {
        targetRef.current += 1
        ensureRunning()
    }, [ensureRunning])

    const goPrev = useCallback(() => {
        targetRef.current -= 1
        ensureRunning()
    }, [ensureRunning])

    const goTo = useCallback(
        (index: number) => {
            const cur = targetRef.current
            let d = index - cur
            d = ((d % count) + count) % count
            if (d > count / 2) d -= count
            targetRef.current = cur + d
            ensureRunning()
        },
        [ensureRunning, count]
    )

    useEffect(() => {
        return () => {
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
    }, [])

    // Report which card is centred. Derived from `pos` rather than tracked as
    // state so the animation loop stays allocation-free; the caller only hears
    // about whole-index changes.
    const lastIdxRef = useRef(-1)
    useEffect(() => {
        if (!onActiveIndexChange) return
        const report = (p: number) => {
            const idx = ((Math.round(p) % count) + count) % count
            if (idx === lastIdxRef.current) return
            lastIdxRef.current = idx
            onActiveIndexChange(idx)
        }
        report(pos.get())
        return pos.on("change", report)
    }, [pos, count, onActiveIndexChange])

    useEffect(() => {
        const on = !isStatic && autoplay && count > 1
        autoplayingRef.current = on
        if (on) {
            dirRef.current = autoplayDirection === "leftToRight" ? -1 : 1
            dwellAccRef.current = 0
            ensureRunning()
        }
        return () => {
            autoplayingRef.current = false
        }
    }, [isStatic, autoplay, autoplayDirection, count, ensureRunning])

    const canPause = !isStatic && autoplay && count > 1

    const suspendAutoplay = useCallback(() => {
        if (!canPause) return
        autoplayingRef.current = false
    }, [canPause])

    const resumeAutoplay = useCallback(() => {
        if (!canPause) return
        autoplayingRef.current = true
        dwellAccRef.current = 0
        ensureRunning()
    }, [canPause, ensureRunning])

    // Hover/focus pause is opt-in; `paused` is driven by the caller (e.g. while
    // a lightbox is open) and always applies.
    const onHoverBoundary = useCallback(
        (entering: boolean) => {
            isHoveredRef.current = entering
            if (!pauseOnHover || paused) return
            if (entering) suspendAutoplay()
            else resumeAutoplay()
        },
        [pauseOnHover, paused, suspendAutoplay, resumeAutoplay]
    )

    useEffect(() => {
        if (paused) suspendAutoplay()
        else if (!(pauseOnHover && isHoveredRef.current)) resumeAutoplay()
    }, [paused, pauseOnHover, suspendAutoplay, resumeAutoplay])
    useEffect(() => {
        if (isStatic || autoplay) return
        const onKey = (e: KeyboardEvent) => {
            if (!isHoveredRef.current) return
            if (e.key === "ArrowLeft") {
                e.preventDefault()
                goPrev()
            } else if (e.key === "ArrowRight") {
                e.preventDefault()
                goNext()
            }
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [isStatic, autoplay, goPrev, goNext])

    const containerStyle: React.CSSProperties = {
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        // no min-width: the stage is already 100% of its parent, so a floor here
        // could only push the element wider than the column it sits in and clip
        // the active screenshot on a narrow phone. the min-height matches the
        // shortest stage the caller renders (h-[240px] on mobile).
        minHeight: 180,
        overflow: "hidden",
        userSelect: "none",
        touchAction: isStatic ? undefined : "pan-y",
        outline: "none",
    }

    const handleCardSelect = useCallback(
        (index: number) => {
            if (Math.abs(relOf(index, pos.get(), count)) < 0.5) {
                onImageClick?.(index)
                return
            }
            goTo(index)
        },
        [pos, count, onImageClick, goTo]
    )
    const cards = images.map((img, i) => (
        <Card
            key={i}
            item={img}
            index={i}
            pos={pos}
            count={count}
            R={R}
            sizing={sizing}
            gap={gap}
            radius={radius}
            gradient={GRADIENT_FALLBACKS[i % GRADIENT_FALLBACKS.length]}
            onSelect={isStatic ? undefined : handleCardSelect}
        />
    ))

    const arrows = showArrows && count > 1 && (
        <>
            <ArrowButton
                side="left"
                onClick={isStatic ? () => {} : goPrev}
                color={arrowColor}
                background={arrowBackground}
                size={arrowSize}
                position={arrowPosition}
            />
            <ArrowButton
                side="right"
                onClick={isStatic ? () => {} : goNext}
                color={arrowColor}
                background={arrowBackground}
                size={arrowSize}
                position={arrowPosition}
            />
        </>
    )

    return (
        <div
            tabIndex={0}
            onMouseEnter={() => onHoverBoundary(true)}
            onMouseLeave={() => onHoverBoundary(false)}
            onFocus={() => onHoverBoundary(true)}
            onBlur={() => onHoverBoundary(false)}
            style={containerStyle}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    isolation: "isolate",
                    zIndex: 0,
                }}
            >
                {cards}
            </div>
            {arrows}
        </div>
    )
}

export default CoverflowCarousel;

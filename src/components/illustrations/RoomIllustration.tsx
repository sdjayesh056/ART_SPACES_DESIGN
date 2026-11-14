import React from "react";

import type { IllustrationProps } from "@/types/content";

import { Box, G500, G600, G700, G800, G900, GOLD, GOLD_DEEP, GOLD_LIGHT, p, poly, pt } from "./iso";
import { MATERIAL as M } from "./palette";

/**
 * A furnished living room in isometric cutaway: timber floor, picture wall,
 * curtained window with daylight falling across the rug, sofa, armchair,
 * console, pendants and planting. Filled and shaded rather than outlined —
 * this is the site's hero-grade drawing.
 */
export function RoomIllustration({ title, className = "" }: IllustrationProps) {
    const [lampX, lampY] = pt(0.55, 0.65, 2.75);
    const [plantX, plantY] = pt(0.75, 5.35, 1.55);
    const [vaseX, vaseY] = pt(2.3, 0.4, 1.05);
    const pendants = [pt(2.5, 3.1, 3.05), pt(3.1, 3.5, 2.7), pt(3.6, 2.9, 3.2)];

    return (
        <svg
            viewBox="0 0 640 540"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-auto w-full ${className}`}
            role={title ? "img" : undefined}
            aria-hidden={title ? undefined : true}
        >
            {title && <title>{title}</title>}

            {/* Shell */}
            <polygon points={poly([0, 0], [6, 0], [6, 6], [0, 6])} fill={M.floor} />
            {Array.from({ length: 11 }, (_, index) => (index + 1) * 0.5).map((y) => (
                <line key={y} x1={pt(0, y)[0]} y1={pt(0, y)[1]} x2={pt(6, y)[0]} y2={pt(6, y)[1]} stroke={M.floorLine} strokeWidth={1} opacity={0.4} />
            ))}
            <polygon points={poly([0, 0], [0, 6], [0, 6, 4.2], [0, 0, 4.2])} fill={M.wall} />
            <polygon points={poly([0, 0], [6, 0], [6, 0, 4.2], [0, 0, 4.2])} fill={M.wallShade} />
            <polygon points={poly([0, 0], [0, 6], [0, 6, 0.22], [0, 0, 0.22])} fill={M.cream} />
            <polygon points={poly([0, 0], [6, 0], [6, 0, 0.22], [0, 0, 0.22])} fill={M.creamShade} />

            {/* Window, curtains and the daylight it throws */}
            <polygon points={poly([1.6, 0, 1.05], [4.6, 0, 1.05], [4.6, 0, 3.55], [1.6, 0, 3.55])} fill={M.sky} stroke={M.wood} strokeWidth={5} strokeLinejoin="round" />
            <polygon points={poly([1.6, 0, 2.2], [3.1, 0, 2.2], [3.1, 0, 3.55], [1.6, 0, 3.55])} fill={M.skyLight} opacity={0.7} />
            <path d={`M${p(3.1, 0, 1.05)}L${p(3.1, 0, 3.55)}M${p(1.6, 0, 2.3)}L${p(4.6, 0, 2.3)}`} stroke={M.wood} strokeWidth={3} />
            {[[0.95, 1.6], [4.6, 5.25]].map(([from, to]) => (
                <g key={from}>
                    <polygon points={poly([from, 0, 0.3], [to, 0, 0.3], [to, 0, 3.85], [from, 0, 3.85])} fill={G700} />
                    {[0.2, 0.4].map((offset) => (
                        <path key={offset} d={`M${p(from + offset, 0, 0.3)}L${p(from + offset, 0, 3.85)}`} stroke={G900} strokeWidth={1.5} opacity={0.5} />
                    ))}
                </g>
            ))}
            <path d={`M${p(0.8, 0, 3.9)}L${p(5.4, 0, 3.9)}`} stroke={GOLD_DEEP} strokeWidth={4} strokeLinecap="round" />
            <polygon points={poly([1.6, 0], [4.6, 0], [5.9, 3.4], [2.9, 3.4])} fill="white" opacity={0.3} />

            {/* Picture wall and shelf */}
            <polygon points={poly([0, 1.3, 2.25], [0, 2.5, 2.25], [0, 2.5, 3.5], [0, 1.3, 3.5])} fill="white" stroke={M.woodDark} strokeWidth={4} />
            <circle cx={pt(0, 1.9, 2.85)[0]} cy={pt(0, 1.9, 2.85)[1]} r={15} fill={GOLD} />
            <polygon points={poly([0, 2.9, 2.0], [0, 4.4, 2.0], [0, 4.4, 3.6], [0, 2.9, 3.6])} fill={M.cream} stroke={M.woodDark} strokeWidth={4} />
            <polygon points={poly([0, 3.1, 2.15], [0, 4.2, 2.15], [0, 4.2, 2.9])} fill={G700} />
            <polygon points={poly([0, 3.1, 2.15], [0, 3.7, 2.15], [0, 3.1, 3.3])} fill={GOLD_LIGHT} />
            <Box x={0} y={4.75} z={2.5} w={0.4} d={1} h={0.08} top={M.woodLight} left={M.wood} right={M.woodDark} />
            <Box x={0.08} y={4.9} z={2.58} w={0.2} d={0.12} h={0.42} top={G600} left={G700} right={G800} />
            <Box x={0.08} y={5.06} z={2.58} w={0.2} d={0.1} h={0.34} top={GOLD_LIGHT} left={GOLD} right={GOLD_DEEP} />

            {/* Rug */}
            <polygon points={poly([1.3, 1.5], [5, 1.5], [5, 5.1], [1.3, 5.1])} fill={M.rug} />
            <polygon points={poly([1.6, 1.8], [4.7, 1.8], [4.7, 4.8], [1.6, 4.8])} fill="none" stroke={GOLD} strokeWidth={2} />
            <polygon points={poly([1.9, 2.1], [4.4, 2.1], [4.4, 4.5], [1.9, 4.5])} fill="none" stroke={G700} strokeWidth={1} opacity={0.5} />

            {/* Floor lamp in the back corner */}
            <ellipse cx={lampX} cy={lampY + 8} rx={38} ry={32} fill={GOLD_LIGHT} opacity={0.28} />
            <path d={`M${p(0.55, 0.65)}L${p(0.55, 0.65, 2.5)}`} stroke={M.woodDark} strokeWidth={3} />
            <path d={`M${lampX - 22} ${lampY + 16}L${lampX - 13} ${lampY - 16}H${lampX + 13}L${lampX + 22} ${lampY + 16}Z`} fill={M.cream} stroke={GOLD_DEEP} strokeWidth={1.5} />

            {/* Console under the window */}
            <Box x={1.9} y={0.12} w={2.5} d={0.55} h={0.8} top={M.woodLight} left={M.wood} right={M.woodDark} />
            <path d={`M${p(2.75, 0.67, 0.08)}L${p(2.75, 0.67, 0.74)}M${p(3.6, 0.67, 0.08)}L${p(3.6, 0.67, 0.74)}`} stroke={M.woodDark} strokeWidth={1.5} />
            <ellipse cx={vaseX} cy={vaseY} rx={9} ry={15} fill={M.clay} />
            <path d={`M${vaseX} ${vaseY - 12}q-14 -22 -4 -40M${vaseX} ${vaseY - 12}q10 -20 16 -34`} stroke={G700} strokeWidth={2.5} fill="none" strokeLinecap="round" />
            <Box x={3.5} y={0.25} z={0.8} w={0.6} d={0.3} h={0.1} top={GOLD_LIGHT} left={GOLD} right={GOLD_DEEP} />

            {/* Sofa along the picture wall */}
            <polygon points={poly([0.2, 1.1], [1.8, 1.1], [1.8, 4.9], [0.2, 4.9])} fill={M.shadow} opacity={0.12} transform="translate(10 8)" />
            <Box x={0.12} y={1.05} w={1.45} d={0.3} h={1.05} top={G700} left={G800} right={G900} />
            <Box x={0.12} y={1.35} w={0.36} d={3.2} h={1.6} top={G700} left={G800} right={G900} />
            <Box x={0.48} y={1.35} w={1.09} d={3.2} h={0.72} top={G600} left={G700} right={G800} />
            <path d={`M${p(0.48, 2.42, 0.72)}L${p(1.57, 2.42, 0.72)}M${p(0.48, 3.48, 0.72)}L${p(1.57, 3.48, 0.72)}`} stroke={G800} strokeWidth={1.5} />
            <Box x={0.48} y={1.55} z={0.72} w={0.24} d={0.8} h={0.62} top={M.cream} left={M.creamShade} right={M.creamShade} />
            <Box x={0.48} y={3.55} z={0.72} w={0.24} d={0.8} h={0.62} top={GOLD_LIGHT} left={GOLD} right={GOLD} />
            <Box x={0.12} y={4.55} w={1.45} d={0.3} h={1.05} top={G700} left={G800} right={G900} />

            {/* Coffee table */}
            <polygon points={poly([2.5, 2.5], [3.9, 2.5], [3.9, 4.1], [2.5, 4.1])} fill={M.shadow} opacity={0.14} transform="translate(8 10)" />
            <path d={`M${p(2.6, 4, 0)}L${p(2.6, 4, 0.5)}M${p(3.8, 4, 0)}L${p(3.8, 4, 0.5)}M${p(3.8, 2.6, 0)}L${p(3.8, 2.6, 0.5)}`} stroke={M.woodDark} strokeWidth={4} strokeLinecap="round" />
            <Box x={2.5} y={2.5} z={0.5} w={1.4} d={1.6} h={0.1} top={M.woodLight} left={M.wood} right={M.woodDark} />
            <Box x={2.8} y={2.9} z={0.6} w={0.55} d={0.4} h={0.08} top={M.cream} left={M.creamShade} right={M.creamShade} />
            <Box x={3.3} y={3.5} z={0.6} w={0.22} d={0.22} h={0.3} top={G600} left={G700} right={G800} />

            {/* Armchair */}
            <polygon points={poly([4, 4.1], [5.1, 4.1], [5.1, 5.2], [4, 5.2])} fill={M.shadow} opacity={0.14} transform="translate(8 10)" />
            <Box x={4} y={4.15} w={0.95} d={1} h={0.6} top={M.cream} left={M.creamShade} right={M.creamShade} />
            <Box x={4.95} y={4.15} w={0.25} d={1} h={1.3} top={M.woodLight} left={M.wood} right={M.woodDark} />

            {/* Planter */}
            <Box x={0.5} y={5.1} w={0.5} d={0.5} h={0.7} top={M.clay} left={M.clay} right={M.clayShade} />
            {[-58, -24, 8, 40, 72].map((angle, index) => (
                <ellipse
                    key={angle}
                    cx={plantX}
                    cy={plantY - 30}
                    rx={11}
                    ry={40}
                    fill={index % 2 ? G500 : G600}
                    transform={`rotate(${angle} ${plantX} ${plantY + 8})`}
                />
            ))}

            {/* Pendant cluster */}
            {pendants.map(([x, y], index) => (
                <g key={x}>
                    <line x1={x} y1={0} x2={x} y2={y} stroke={M.woodDark} strokeWidth={1.5} />
                    <circle cx={x} cy={y} r={26} fill={GOLD_LIGHT} opacity={0.22} />
                    <circle cx={x} cy={y} r={index === 1 ? 13 : 10} fill={GOLD} />
                    <circle cx={x - 3} cy={y - 3} r={3} fill="white" opacity={0.7} />
                </g>
            ))}
        </svg>
    );
}

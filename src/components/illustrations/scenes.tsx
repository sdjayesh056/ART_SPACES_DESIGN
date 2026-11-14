import React from "react";

import type { IllustrationProps } from "@/types/content";

import { Box, BRASS, CREAM, Daylight, DEEP, G700, G900, GOLD, GOLD_DEEP, GOLD_LIGHT, GREEN, p, Pendant, Plant, poly, pt, Scene, Shadow, Shell, WOOD } from "./iso";
import { MATERIAL as M } from "./palette";

/** A desk for two, with screens and chairs. */
function Workstation({ x, y }: { x: number; y: number }) {
    return (
        <g>
            <Shadow x={x} y={y} w={1.7} d={0.8} />
            <path d={`M${p(x + 0.1, y + 0.75)}L${p(x + 0.1, y + 0.75, 0.7)}M${p(x + 1.6, y + 0.75)}L${p(x + 1.6, y + 0.75, 0.7)}M${p(x + 1.6, y + 0.05)}L${p(x + 1.6, y + 0.05, 0.7)}`} stroke={M.woodDark} strokeWidth={3} strokeLinecap="round" />
            <Box x={x} y={y} z={0.7} w={1.7} d={0.8} h={0.08} {...WOOD} />
            {[0.2, 1.05].map((offset) => (
                <g key={offset}>
                    <Box x={x + offset} y={y + 0.12} z={0.78} w={0.5} d={0.06} h={0.36} top={G900} left={G900} right={G700} />
                    <Box x={x + offset} y={y + 0.95} w={0.45} d={0.45} h={0.5} {...GREEN} />
                </g>
            ))}
        </g>
    );
}

/** Open-plan workplace: desks under a linear light, a glazed meeting room, a soft corner. */
export function OfficeScene(props: IllustrationProps) {
    return (
        <Scene {...props}>
            <Shell floor={M.concrete} line={M.concreteLine} boards={false} />
            <Daylight from={0.8} to={5.4} />

            {/* Acoustic panels and a board on the left wall */}
            {[1.2, 2.1, 3.0].map((y, index) => (
                <polygon key={y} points={poly([0, y, 1.4], [0, y + 0.8, 1.4], [0, y + 0.8, 3.4], [0, y, 3.4])} fill={index === 1 ? GOLD_LIGHT : G700} opacity={0.9} />
            ))}
            <polygon points={poly([0, 4.2, 1.6], [0, 5.6, 1.6], [0, 5.6, 3.1], [0, 4.2, 3.1])} fill="white" stroke={M.woodDark} strokeWidth={3} />
            <path d={`M${p(0, 4.5, 2.7)}L${p(0, 5.3, 2.7)}M${p(0, 4.5, 2.4)}L${p(0, 5.0, 2.4)}`} stroke={G700} strokeWidth={2.5} strokeLinecap="round" />

            {/* Glazed meeting room in the back corner */}
            <polygon points={poly([0, 0], [1.9, 0], [1.9, 1.9], [0, 1.9])} fill={M.rug} />
            <Box x={0.6} y={0.6} z={0.6} w={0.8} d={0.8} h={0.08} {...WOOD} />
            <polygon points={poly([1.9, 0, 0], [1.9, 1.9, 0], [1.9, 1.9, 3], [1.9, 0, 3])} fill={M.skyLight} opacity={0.45} stroke={G900} strokeWidth={2} />
            <polygon points={poly([0, 1.9, 0], [1.9, 1.9, 0], [1.9, 1.9, 3], [0, 1.9, 3])} fill={M.skyLight} opacity={0.35} stroke={G900} strokeWidth={2} />

            <Workstation x={2.6} y={1.2} />
            <Workstation x={2.6} y={3.1} />

            {/* Soft corner */}
            <polygon points={poly([0.3, 3.9], [2, 3.9], [2, 5.7], [0.3, 5.7])} fill={M.rug} />
            <Box x={0.15} y={4.1} w={0.35} d={1.5} h={1.2} {...DEEP} />
            <Box x={0.5} y={4.1} w={0.8} d={1.5} h={0.6} {...GREEN} />
            <Box x={1.5} y={4.6} z={0.4} w={0.45} d={0.45} h={0.06} {...BRASS} />
            <Plant x={5.1} y={4.9} />

            {/* Linear light over the desks */}
            <path d={`M${p(3.4, 1.2, 4.6)}L${p(3.4, 1.2, 3.05)}M${p(3.4, 3.8, 4.6)}L${p(3.4, 3.8, 3.05)}`} stroke={M.woodDark} strokeWidth={1.5} />
            <Box x={3.3} y={1} z={2.95} w={0.2} d={3} h={0.1} {...BRASS} />
            <polygon points={poly([2.5, 1], [4.3, 1], [4.3, 4], [2.5, 4])} fill={GOLD_LIGHT} opacity={0.14} />
        </Scene>
    );
}

/** Hotel suite: upholstered headboard wall, king bed, bench, lounge chair by the window. */
export function SuiteScene(props: IllustrationProps) {
    const lamps = [pt(0.45, 1.25, 1.35), pt(0.45, 4.45, 1.35)];

    return (
        <Scene {...props}>
            <Shell />
            <Daylight from={2.2} to={5.2} />
            {[[1.6, 2.2], [5.2, 5.8]].map(([from, to]) => (
                <polygon key={from} points={poly([from, 0, 0.3], [to, 0, 0.3], [to, 0, 3.85], [from, 0, 3.85])} fill={G700} />
            ))}

            {/* Headboard wall */}
            <polygon points={poly([0, 0.9, 0.22], [0, 4.9, 0.22], [0, 4.9, 3], [0, 0.9, 3])} fill={M.wood} />
            {[1.7, 2.5, 3.3, 4.1].map((y) => (
                <path key={y} d={`M${p(0, y, 0.22)}L${p(0, y, 3)}`} stroke={M.woodDark} strokeWidth={1.5} />
            ))}
            <polygon points={poly([1.2, 1.2], [5, 1.2], [5, 5.4], [1.2, 5.4])} fill={M.rug} />

            {/* Bed */}
            <Shadow x={0.2} y={1.7} w={2.9} d={2.4} />
            <Box x={0.15} y={1.7} w={0.25} d={2.4} h={1.7} {...DEEP} />
            <Box x={0.4} y={1.7} w={2.7} d={2.4} h={0.45} {...WOOD} />
            <Box x={0.4} y={1.75} z={0.45} w={2.65} d={2.3} h={0.32} top="white" left={M.cream} right={M.creamShade} />
            <Box x={0.5} y={1.9} z={0.77} w={0.5} d={0.9} h={0.2} {...CREAM} />
            <Box x={0.5} y={2.95} z={0.77} w={0.5} d={0.9} h={0.2} {...CREAM} />
            <Box x={2} y={1.75} z={0.77} w={1.05} d={2.3} h={0.06} {...GREEN} />

            {/* Side tables and lamps */}
            {[1.05, 4.25].map((y, index) => (
                <g key={y}>
                    <Box x={0.2} y={y} w={0.5} d={0.5} h={0.7} {...WOOD} />
                    <circle cx={lamps[index][0]} cy={lamps[index][1]} r={30} fill={GOLD_LIGHT} opacity={0.25} />
                    <circle cx={lamps[index][0]} cy={lamps[index][1]} r={11} fill={GOLD} />
                </g>
            ))}

            <Box x={3.4} y={2.1} w={0.5} d={1.6} h={0.5} {...BRASS} />
            <Shadow x={4.3} y={4.2} w={1} d={1} />
            <Box x={4.3} y={4.25} w={0.9} d={0.95} h={0.55} {...CREAM} />
            <Box x={5.2} y={4.25} w={0.22} d={0.95} h={1.2} {...WOOD} />
            <Plant x={5.2} y={0.4} h={0.6} />
            <Pendant x={3.6} y={4.6} z={3} r={12} />
        </Scene>
    );
}

/** Boutique store: shelving wall, display tables, a clothes rail and the cash desk. */
export function StoreScene(props: IllustrationProps) {
    const [mx, my] = pt(5.1, 1.2, 1.9);

    return (
        <Scene {...props}>
            <Shell floor={M.concrete} line={M.concreteLine} boards={false} />
            <Daylight from={2.4} to={5.4} sill={0.5} head={3.6} />

            {/* Shelving wall */}
            <polygon points={poly([0, 0.6, 0.22], [0, 5.4, 0.22], [0, 5.4, 3.6], [0, 0.6, 3.6])} fill={M.woodLight} />
            {[1.1, 2, 2.9].map((z) => (
                <g key={z}>
                    <Box x={0} y={0.6} z={z} w={0.45} d={4.8} h={0.08} {...WOOD} />
                    {[0.9, 1.8, 2.7, 3.6, 4.5].map((y, index) => (
                        <Box key={y} x={0.08} y={y} z={z + 0.08} w={0.28} d={0.5} h={0.3 + (index % 2) * 0.18} {...((index + Math.round(z)) % 3 === 0 ? BRASS : (index + Math.round(z)) % 3 === 1 ? GREEN : CREAM)} />
                    ))}
                </g>
            ))}

            <polygon points={poly([1.4, 1.4], [5, 1.4], [5, 5.2], [1.4, 5.2])} fill={M.rug} />

            {/* Cash desk */}
            <Box x={1.2} y={0.2} w={1.6} d={0.6} h={1} {...DEEP} />
            <Box x={1.15} y={0.15} z={1} w={1.7} d={0.7} h={0.08} {...BRASS} />

            {/* Display tables */}
            {[[2, 2], [2.4, 3.9]].map(([x, y]) => (
                <g key={y}>
                    <Shadow x={x} y={y} w={1.5} d={1} />
                    <Box x={x} y={y} w={1.5} d={1} h={0.75} {...WOOD} />
                    <Box x={x + 0.15} y={y + 0.15} z={0.75} w={0.4} d={0.5} h={0.14} {...CREAM} />
                    <Box x={x + 0.7} y={y + 0.25} z={0.75} w={0.3} d={0.3} h={0.36} {...GREEN} />
                    <Box x={x + 1.1} y={y + 0.5} z={0.75} w={0.3} d={0.36} h={0.1} {...BRASS} />
                </g>
            ))}

            {/* Clothes rail */}
            <path d={`M${p(4.4, 2.2)}L${p(4.4, 2.2, 1.9)}L${p(4.4, 4.4, 1.9)}L${p(4.4, 4.4)}`} stroke={GOLD_DEEP} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {[2.5, 2.9, 3.3, 3.7, 4.1].map((y, index) => (
                <polygon key={y} points={poly([4.15, y, 0.7], [4.65, y, 0.7], [4.65, y, 1.8], [4.15, y, 1.8])} fill={index % 2 ? G700 : index % 3 ? M.cream : GOLD} />
            ))}

            {/* Mannequin in the window */}
            <path d={`M${p(5.1, 1.2)}L${p(5.1, 1.2, 1.3)}`} stroke={M.woodDark} strokeWidth={3} />
            <ellipse cx={mx} cy={my + 12} rx={15} ry={30} fill={M.cream} />
            <circle cx={mx} cy={my - 28} r={9} fill={M.creamShade} />

            <Plant x={0.6} y={5.3} h={0.5} />
            {[2.2, 3.4, 4.6].map((x) => (
                <Pendant key={x} x={x} y={3.2} z={3.5} r={7} />
            ))}
        </Scene>
    );
}

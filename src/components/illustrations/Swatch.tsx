import React from "react";

export type SwatchKind = "grain" | "vein" | "weave" | "sheen" | "chip" | "speckle";

type SwatchProps = {
    kind: SwatchKind;
    /** The material's own colours. They are content, supplied from src/data. */
    base: string;
    line: string;
    className?: string;
};

/* Fixed coordinates, so server and client render the same sample. */
const CHIPS = [[14, 18], [52, 10], [92, 22], [30, 48], [74, 44], [108, 60], [12, 78], [48, 82], [86, 88], [26, 108], [66, 110], [104, 104], [58, 60], [8, 44]];

/**
 * A material sample drawn as a texture: timber grain, stone veining, woven
 * cloth, brushed metal, terrazzo chips or cast concrete. Always decorative —
 * the material's name is rendered as text beside it.
 */
export function Swatch({ kind, base, line, className = "" }: SwatchProps) {
    return (
        <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
            <rect width={120} height={120} fill={base} />
            <g stroke={line} fill="none" strokeWidth={1} strokeLinecap="round">
                {kind === "grain" && (
                    <g opacity={0.5}>
                        {Array.from({ length: 11 }, (_, index) => (
                            <path key={index} d={`M0 ${6 + index * 11}q30 ${index % 2 ? 7 : -7} 60 0t60 0`} />
                        ))}
                        <ellipse cx={78} cy={64} rx={13} ry={5} />
                        <ellipse cx={78} cy={64} rx={6} ry={2} />
                    </g>
                )}
                {kind === "vein" && (
                    <g opacity={0.55}>
                        <path d="M-4 30l28 14l18 -12l30 30l24 -8l30 20" strokeWidth={1.6} />
                        <path d="M10 120l20 -34l26 6l16 -30M72 62l10 30l24 6l14 22" />
                        <path d="M40 0l10 24l-8 8M96 0l-6 30" opacity={0.6} />
                    </g>
                )}
                {kind === "weave" && (
                    <g opacity={0.35}>
                        {Array.from({ length: 20 }, (_, index) => (
                            <path key={index} d={`M${index * 6 + 3} 0V120M0 ${index * 6 + 3}H120`} />
                        ))}
                    </g>
                )}
                {kind === "sheen" && (
                    <g opacity={0.45}>
                        {Array.from({ length: 12 }, (_, index) => (
                            <circle key={index} cx={36} cy={34} r={8 + index * 11} />
                        ))}
                    </g>
                )}
                {kind === "chip" &&
                    CHIPS.map(([x, y], index) => (
                        <path
                            key={`${x}-${y}`}
                            d={`M${x} ${y}l9 -5l8 6l-4 9l-11 2z`}
                            fill={line}
                            stroke="none"
                            opacity={0.25 + (index % 4) * 0.18}
                            transform={`rotate(${index * 47} ${x} ${y})`}
                        />
                    ))}
                {kind === "speckle" &&
                    Array.from({ length: 46 }, (_, index) => (
                        <circle
                            key={index}
                            cx={(index * 37) % 120}
                            cy={(index * 53) % 120}
                            r={0.8 + (index % 3) * 0.7}
                            fill={line}
                            stroke="none"
                            opacity={0.35}
                        />
                    ))}
            </g>
        </svg>
    );
}

import React from "react";
import Link from "next/link";

import { SHEET_LABEL, two } from "@/components/home/sheet";
import { FOOTER_ROOMS, PRIMARY_CTA } from "@/data/navigation";
import type { FooterRoomId } from "@/types/navigation";

import { FURNITURE_SHADOW, TONE as T, TREE_SHADOW } from "./tones";

/*
 * The site drawn as a house in plan. The mega menu shows the same house in
 * elevation; here each room is one section of the site and the front door is
 * the free consultation.
 *
 * The drawing repeats the schedule beside it for the eye, so it is hidden from
 * assistive technology and its links are out of the tab order. A sighted
 * visitor can still walk into any room by clicking it.
 *
 * Every part of a room carries data-room and reads --lit (1 lit, 0 dark) from
 * the rule in globals.css; these are the few ways a part responds to it.
 */
const LIGHT_ON = "opacity-[var(--lit)] transition-opacity duration-700 ease-brand";
const LIGHT_OFF = "opacity-[calc((1_-_var(--lit))*0.96)] mix-blend-multiply transition-opacity duration-700 ease-brand";
const HALO = "opacity-[calc(var(--lit)*0.42)] transition-opacity duration-700 ease-brand";
const PORCH = "opacity-[calc(0.55_+_var(--lit)*0.45)] transition-opacity duration-700 ease-brand";
const GLASS = "[fill:color-mix(in_srgb,var(--color-accent-300)_calc(var(--lit)*100%),var(--color-brand-950))] transition-[fill] duration-700 ease-brand";
/** White on a dark room, deep green once the floor under it is lit. */
const TAG_INK = "text-[color:color-mix(in_srgb,var(--color-brand-950)_calc(var(--lit)*100%),var(--color-ink-inverse))] transition-colors duration-500";
const TAG_NUMBER = "text-[color:color-mix(in_srgb,var(--color-accent-on-brand)_calc(var(--lit)*100%),var(--color-ink-inverse))] transition-colors duration-500";

type PlanRoomId = FooterRoomId | "door";
type Box = { x: number; y: number; w: number; h: number };

/** Where each room's label sits over the drawing, as a share of its width and height. */
const TAG_AT: Record<FooterRoomId, { left: string; top: string }> = {
    spaces: { left: "3.3%", top: "4.8%" },
    consultation: { left: "3.3%", top: "48.8%" },
    portfolio: { left: "42.5%", top: "4.8%" },
    studio: { left: "61.9%", top: "33.4%" },
};

const HREF = Object.fromEntries(FOOTER_ROOMS.map((room) => [room.id, room.href])) as Record<FooterRoomId, string>;

/** A room: its floor and furniture, then the evening over it and the light that lifts it. */
function Room({ id, href, box, floor, children }: { id: PlanRoomId; href: string; box: Box; floor: string; children: React.ReactNode }) {
    const { x, y, w, h } = box;

    return (
        <Link href={href} data-room={id} tabIndex={-1} prefetch={false}>
            <rect x={x} y={y} width={w} height={h} fill={floor} />
            <g style={{ filter: FURNITURE_SHADOW }}>{children}</g>
            {/* The shadow the top and left walls throw onto the floor. */}
            <path d={`M${x} ${y}H${x + w}V${y + 7}H${x + 7}V${y + h}H${x}Z`} fill={T.shadow} opacity={0.16} />
            <rect x={x} y={y} width={w} height={h} fill={T.dusk} className={LIGHT_OFF} />
            <rect x={x} y={y} width={w} height={h} fill="url(#plan-glow)" className={LIGHT_ON} />
        </Link>
    );
}

function Plant({ cx, cy, r }: { cx: number; cy: number; r: number }) {
    return (
        <>
            <circle cx={cx} cy={cy} r={r} fill={T.green700} />
            <circle cx={cx - r * 0.36} cy={cy - r * 0.38} r={r * 0.54} fill={T.green500} />
            <circle cx={cx + r * 0.45} cy={cy + r * 0.45} r={r * 0.44} fill={T.green600} />
        </>
    );
}

function Spill({ id, points, fill }: { id: PlanRoomId; points: string; fill: string }) {
    return <polygon data-room={id} points={points} fill={fill} className={`pointer-events-none ${LIGHT_ON}`} />;
}

export function SitePlan() {
    return (
        <div className="relative">
            <svg viewBox="40 30 720 518" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="h-auto w-full overflow-visible">
                <defs>
                    <pattern id="plan-planks" x={52} y={42} width={137} height={22} patternUnits="userSpaceOnUse">
                        <rect width={137} height={22} fill={T.floor} />
                        <path d="M0 .5H137M0 11.5H137M41 0V11M109 11V22" fill="none" stroke={T.floorLine} strokeWidth={1} opacity={0.55} />
                    </pattern>
                    <pattern id="plan-boards" x={474} y={190} width={27.4} height={84} patternUnits="userSpaceOnUse">
                        <rect width={27.4} height={84} fill={T.woodLight} />
                        <path d="M.5 0V84M14.2 0V84M0 30H14M14 66H27.4" fill="none" stroke={T.wood} strokeWidth={1} opacity={0.45} />
                    </pattern>
                    <pattern id="plan-tiles" x={334} y={190} width={33} height={33} patternUnits="userSpaceOnUse">
                        <rect width={33} height={33} fill={T.cream} />
                        <rect width={16.5} height={16.5} fill={T.creamShade} />
                        <rect x={16.5} y={16.5} width={16.5} height={16.5} fill={T.creamShade} />
                    </pattern>
                    <pattern id="plan-slabs" x={334} y={42} width={69} height={70} patternUnits="userSpaceOnUse">
                        <rect width={69} height={70} fill={T.concrete} />
                        <path d="M.5 0V70M0 .5H69" fill="none" stroke={T.concreteLine} strokeWidth={1} opacity={0.7} />
                    </pattern>
                    <radialGradient id="plan-glow" cx={0.5} cy={0.5} r={0.62}>
                        <stop offset={0} style={{ stopColor: T.goldLight, stopOpacity: 0.5 }} />
                        <stop offset={0.6} style={{ stopColor: T.gold, stopOpacity: 0.16 }} />
                        <stop offset={1} style={{ stopColor: T.goldDeep, stopOpacity: 0 }} />
                    </radialGradient>
                    {/* Light through a doorway: strongest at the opening, gone a stride into the hall. */}
                    <linearGradient id="plan-spill-east" x1={0} x2={1} y1={0} y2={0}>
                        <stop offset={0} style={{ stopColor: T.goldLight, stopOpacity: 0.72 }} />
                        <stop offset={1} style={{ stopColor: T.gold, stopOpacity: 0 }} />
                    </linearGradient>
                    <linearGradient id="plan-spill-west" x1={1} x2={0} y1={0} y2={0}>
                        <stop offset={0} style={{ stopColor: T.goldLight, stopOpacity: 0.72 }} />
                        <stop offset={1} style={{ stopColor: T.gold, stopOpacity: 0 }} />
                    </linearGradient>
                    <linearGradient id="plan-spill-south" x1={0} x2={0} y1={0} y2={1}>
                        <stop offset={0} style={{ stopColor: T.goldLight, stopOpacity: 0.72 }} />
                        <stop offset={1} style={{ stopColor: T.gold, stopOpacity: 0 }} />
                    </linearGradient>
                    <filter id="plan-blur" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation={20} />
                    </filter>
                </defs>

                {/* The house's own shadow on the ground, then the light a lit room throws out into the evening. */}
                <g filter="url(#plan-blur)" className="pointer-events-none">
                    <rect x={46} y={52} width={708} height={416} fill={T.scrim} opacity={0.55} />
                    <rect data-room="spaces" x={38} y={28} width={300} height={246} fill={T.goldDeep} className={HALO} />
                    <rect data-room="consultation" x={38} y={258} width={300} height={200} fill={T.goldDeep} className={HALO} />
                    <rect data-room="portfolio" x={322} y={28} width={440} height={166} fill={T.goldDeep} className={HALO} />
                    <rect data-room="studio" x={462} y={178} width={300} height={280} fill={T.goldDeep} className={HALO} />
                    <rect data-room="door" x={322} y={330} width={156} height={170} fill={T.goldDeep} className={HALO} />
                </g>

                {/* The front garden: lawn, trees, the path to the door and the north point. */}
                <g className="pointer-events-none">
                    <rect x={40} y={466} width={316} height={82} rx={3} fill={T.lawn} />
                    <rect x={444} y={466} width={316} height={82} rx={3} fill={T.lawn} />
                    <g style={{ filter: TREE_SHADOW }}>
                        {[[80, 514, 34], [214, 522, 22], [314, 504, 14], [494, 524, 16], [602, 510, 28]].map(([cx, cy, r]) => (
                            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={T.green900} />
                        ))}
                        {[[68, 490, 16], [122, 532, 19], [242, 506, 12], [636, 530, 16], [574, 532, 11]].map(([cx, cy, r]) => (
                            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={T.canopy} />
                        ))}
                    </g>
                    {[463, 491, 519].map((y) => (
                        <rect key={y} x={372} y={y} width={56} height={20} rx={2} fill={T.stone} />
                    ))}
                    <polygon data-room="door" points="372,456 428,456 462,548 338,548" fill="url(#plan-spill-south)" className={PORCH} />
                    <g transform="translate(728 506)">
                        <circle r={19} fill="none" stroke={T.ring} strokeWidth={1} />
                        <path d="M0-27 7.5 7 0 2-7.5 7Z" fill={T.gold} />
                        <text x={0} y={-33} textAnchor="middle" fontSize={11} letterSpacing="0.1em" fill={T.note} className="font-mono max-md:hidden">
                            N
                        </text>
                    </g>
                </g>

                {/* Timber thresholds under the door openings. */}
                <g fill={T.sill} className="pointer-events-none">
                    <rect x={326} y={200} width={8} height={50} />
                    <rect x={326} y={300} width={8} height={44} />
                    <rect x={372} y={182} width={56} height={8} />
                    <rect x={466} y={290} width={8} height={44} />
                    <rect x={372} y={444} width={56} height={12} />
                </g>

                {/* 01 Spaces: the living room. */}
                <Room id="spaces" href={HREF.spaces} box={{ x: 52, y: 42, w: 274, h: 220 }} floor="url(#plan-planks)">
                    <rect x={90} y={108} width={172} height={110} rx={3} fill={T.rug} />
                    <rect x={97} y={115} width={158} height={96} rx={1} fill="none" stroke={T.green600} strokeWidth={1.5} />
                    <rect x={100} y={204} width={152} height={48} rx={10} fill={T.green800} />
                    {[112, 156, 200].map((x) => (
                        <rect key={x} x={x} y={207} width={40} height={31} rx={5} fill={T.green600} />
                    ))}
                    <rect x={116} y={211} width={15} height={15} rx={3} fill={T.gold} transform="rotate(-12 123 218)" />
                    <rect x={221} y={211} width={15} height={15} rx={3} fill={T.cream} transform="rotate(10 228 218)" />
                    <rect x={144} y={146} width={64} height={36} rx={5} fill={T.wood} />
                    <rect x={153} y={154} width={20} height={13} rx={1.5} fill={T.gold} />
                    <circle cx={192} cy={165} r={6.5} fill={T.cream} />
                    <g transform="rotate(-10 126 114)">
                        <rect x={107} y={96} width={38} height={36} rx={9} fill={T.cream} />
                        <rect x={107} y={96} width={38} height={11} rx={5.5} fill={T.creamShade} />
                    </g>
                    <g transform="rotate(10 226 114)">
                        <rect x={207} y={96} width={38} height={36} rx={9} fill={T.cream} />
                        <rect x={207} y={96} width={38} height={11} rx={5.5} fill={T.creamShade} />
                    </g>
                    <circle cx={176} cy={106} r={10} fill={T.woodDark} />
                    <circle cx={176} cy={106} r={4.5} fill={T.goldLight} />
                    <rect x={302} y={58} width={18} height={108} rx={2} fill={T.woodDark} />
                    <circle cx={311} cy={74} r={5} fill={T.gold} />
                    <rect x={306} y={118} width={10} height={28} rx={1} fill={T.cream} />
                    <Plant cx={76} cy={238} r={15} />
                    <circle cx={274} cy={236} r={11} fill={T.goldLight} opacity={0.45} />
                    <circle cx={274} cy={236} r={6} fill={T.gold} />
                </Room>

                {/* 02 Consultation: the meeting room. */}
                <Room id="consultation" href={HREF.consultation} box={{ x: 52, y: 270, w: 274, h: 174 }} floor={T.cream}>
                    <circle cx={164} cy={374} r={62} fill={T.sage} />
                    {[30, 90, 150, 210, 270, 330].map((turn) => (
                        <g key={turn} transform={`rotate(${turn} 164 374)`}>
                            <rect x={152} y={310} width={24} height={22} rx={7} fill={T.wall} />
                            <rect x={151} y={306} width={26} height={8} rx={4} fill={T.woodLight} />
                        </g>
                    ))}
                    <circle cx={164} cy={374} r={36} fill={T.wood} />
                    <rect x={144} y={358} width={26} height={18} rx={1} fill={T.paper} transform="rotate(-14 157 367)" />
                    <rect x={171} y={366} width={9} height={9} rx={1.5} fill={T.gold} />
                    <rect x={182} y={373} width={9} height={9} rx={1.5} fill={T.green600} />
                    <rect x={171} y={380} width={9} height={9} rx={1.5} fill={T.clay} />
                    <rect x={228} y={276} width={90} height={16} rx={2} fill={T.woodDark} />
                    <circle cx={242} cy={284} r={5} fill={T.gold} />
                    <rect x={272} y={279} width={30} height={10} rx={1} fill={T.cream} />
                    <Plant cx={304} cy={422} r={14} />
                </Room>

                {/* 03 Portfolio: the gallery. Work on the walls, three pieces on plinths, a bench to look from. */}
                <Room id="portfolio" href={HREF.portfolio} box={{ x: 334, y: 42, w: 414, h: 140 }} floor="url(#plan-slabs)">
                    {[[486, 43, 62], [562, 43, 34], [446, 176, 60], [524, 176, 86], [628, 176, 40], [686, 176, 46]].map(([x, y, width]) => (
                        <rect key={`${x}-${y}`} x={x} y={y} width={width} height={5} fill={T.goldDeep} />
                    ))}
                    <rect x={335} y={100} width={5} height={58} fill={T.goldDeep} />
                    {[374, 434, 494].map((x) => (
                        <rect key={x} x={x} y={100} width={28} height={28} rx={2} fill={T.wall} />
                    ))}
                    <circle cx={388} cy={114} r={8} fill={T.clay} />
                    <rect x={441} y={107} width={14} height={14} fill={T.gold} transform="rotate(45 448 114)" />
                    <circle cx={508} cy={114} r={8.5} fill={T.green700} />
                    <circle cx={508} cy={114} r={3.5} fill={T.green500} />
                    <rect x={566} y={102} width={124} height={26} rx={6} fill={T.wood} />
                    <path d="M597 103V127M628 103V127M659 103V127" fill="none" stroke={T.woodDark} strokeWidth={1.2} opacity={0.6} />
                    <Plant cx={724} cy={66} r={14} />
                </Room>

                {/* The hall behind the front door: the free consultation. */}
                <Room id="door" href={PRIMARY_CTA.href} box={{ x: 334, y: 190, w: 132, h: 254 }} floor="url(#plan-tiles)">
                    <rect x={381} y={222} width={38} height={148} rx={2} fill={T.sage} />
                    <rect x={386.5} y={227.5} width={27} height={137} fill="none" stroke={T.gold} strokeWidth={1.5} />
                    <rect x={447} y={204} width={13} height={72} rx={2} fill={T.woodDark} />
                    <circle cx={453.5} cy={220} r={4.5} fill={T.gold} />
                    <circle cx={453.5} cy={258} r={5} fill={T.green600} />
                    <rect x={340} y={362} width={14} height={62} rx={3} fill={T.wood} />
                    <rect x={342} y={368} width={10} height={22} rx={2} fill={T.cream} />
                    <Plant cx={448} cy={424} r={12} />
                </Room>

                {/* 04 Studio: the workroom. A table with a drawing and samples on it, the material shelf behind. */}
                <Room id="studio" href={HREF.studio} box={{ x: 474, y: 190, w: 274, h: 254 }} floor="url(#plan-boards)">
                    <rect x={612} y={196} width={130} height={17} rx={2} fill={T.woodDark} />
                    {[T.wall, T.creamShade, T.woodLight, T.clay, T.gold, T.green600, T.concrete].map((fill, index) => (
                        <rect key={fill} x={618 + index * 17.5} y={199.5} width={12} height={10} rx={1} fill={fill} />
                    ))}
                    {[248, 356].flatMap((cy) => [566, 614, 662].map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={10} fill={T.wall} />))}
                    <rect x={536} y={262} width={156} height={80} rx={4} fill={T.wall} />
                    <g transform="rotate(-5 581 297)">
                        <rect x={549} y={273} width={64} height={46} fill={T.paper} />
                        <path d="M556 280h28v18h-28zM584 289h22v23h-38v-14" fill="none" stroke={T.green700} strokeWidth={1} />
                    </g>
                    <rect x={624} y={275} width={58} height={6} rx={1} fill={T.gold} transform="rotate(8 653 278)" />
                    {[T.concrete, T.creamShade, T.woodLight, T.goldDeep, T.green800].map((fill, index) => (
                        <circle key={fill} cx={630 + index * 11} cy={318} r={8} fill={fill} />
                    ))}
                    <rect x={722} y={246} width={20} height={124} rx={2} fill={T.wood} />
                    <rect x={728} y={262} width={9} height={26} rx={1} fill={T.green950} />
                    <rect x={728} y={324} width={9} height={26} rx={1} fill={T.green950} />
                    <circle cx={706} cy={275} r={9} fill={T.cream} />
                    <circle cx={706} cy={337} r={9} fill={T.cream} />
                    <rect x={486} y={402} width={32} height={32} rx={4} fill={T.woodDark} />
                    <circle cx={495.5} cy={411.5} r={5} fill={T.paper} />
                    <circle cx={508.5} cy={411.5} r={5} fill={T.paper} />
                    <circle cx={495.5} cy={424.5} r={5} fill={T.paper} />
                    <circle cx={508.5} cy={424.5} r={5} fill={T.goldLight} />
                    <Plant cx={728} cy={424} r={13} />
                </Room>

                {/* The light each lit room throws across its threshold into the hall. */}
                <Spill id="spaces" points="334,201 334,249 404,284 404,196" fill="url(#plan-spill-east)" />
                <Spill id="consultation" points="334,301 334,343 404,376 404,276" fill="url(#plan-spill-east)" />
                <Spill id="portfolio" points="373,190 427,190 456,268 344,268" fill="url(#plan-spill-south)" />
                <Spill id="studio" points="466,291 466,333 398,366 398,264" fill="url(#plan-spill-west)" />

                {/* The walls, cut and filled solid. */}
                <g fill={T.poche} className="pointer-events-none">
                    <rect x={40} y={30} width={720} height={12} />
                    <rect x={40} y={444} width={332} height={12} />
                    <rect x={428} y={444} width={332} height={12} />
                    <rect x={40} y={30} width={12} height={426} />
                    <rect x={748} y={30} width={12} height={426} />
                    <rect x={326} y={42} width={8} height={158} />
                    <rect x={326} y={250} width={8} height={50} />
                    <rect x={326} y={344} width={8} height={100} />
                    <rect x={52} y={262} width={274} height={8} />
                    <rect x={334} y={182} width={38} height={8} />
                    <rect x={428} y={182} width={320} height={8} />
                    <rect x={466} y={190} width={8} height={100} />
                    <rect x={466} y={334} width={8} height={110} />
                </g>

                {/* Windows: glass set in the thickness of the wall, dark until the room behind is lit. */}
                <g className="pointer-events-none">
                    <rect data-room="spaces" x={96} y={33.5} width={120} height={5} className={GLASS} />
                    <rect data-room="spaces" x={43.5} y={84} width={5} height={120} className={GLASS} />
                    <rect data-room="consultation" x={43.5} y={310} width={5} height={100} className={GLASS} />
                    <rect data-room="consultation" x={110} y={447.5} width={140} height={5} className={GLASS} />
                    <rect data-room="portfolio" x={610} y={33.5} width={100} height={5} className={GLASS} />
                    <rect data-room="portfolio" x={751.5} y={76} width={5} height={72} className={GLASS} />
                    <rect data-room="studio" x={751.5} y={230} width={5} height={170} className={GLASS} />
                    <rect data-room="studio" x={540} y={447.5} width={150} height={5} className={GLASS} />
                </g>

                {/* Door leaves and their swings. The front door is the gold one. */}
                <g className="pointer-events-none" fill="none" strokeLinecap="round">
                    <path d="M326 344H282A44 44 0 0 1 326 300Z" fill={T.sweep} />
                    <path d="M282 344A44 44 0 0 1 326 300" stroke={T.swing} strokeWidth={1} strokeDasharray="2 3" />
                    <path d="M325 344H283" stroke={T.poche} strokeWidth={3} />
                    <path d="M474 290H518A44 44 0 0 1 474 334Z" fill={T.sweep} />
                    <path d="M518 290A44 44 0 0 1 474 334" stroke={T.swing} strokeWidth={1} strokeDasharray="2 3" />
                    <path d="M475 290H517" stroke={T.poche} strokeWidth={3} />
                    <path d="M372 444V388A56 56 0 0 1 428 444Z" fill={T.frontSweep} />
                    <path d="M372 388A56 56 0 0 1 428 444" stroke={T.gold} strokeWidth={1.25} strokeDasharray="2 3" />
                    <path d="M372 443V390" stroke={T.gold} strokeWidth={4} />
                </g>
            </svg>

            {/* Room labels: HTML over the drawing, so the type keeps its size as the plan shrinks. */}
            <ol aria-hidden="true" className={`${SHEET_LABEL} pointer-events-none absolute inset-0 list-none p-0`}>
                {FOOTER_ROOMS.map((room, index) => (
                    <li key={room.id} data-room={room.id} style={TAG_AT[room.id]} className={`absolute flex items-center gap-2 ${TAG_INK}`}>
                        <span className={`grid h-6 w-6 place-items-center rounded-full border border-white/45 bg-brand-950 text-[10px] tracking-[0.04em] sm:h-[1.625rem] sm:w-[1.625rem] ${TAG_NUMBER}`}>
                            {two(index + 1)}
                        </span>
                        <span className="max-sm:hidden">{room.heading}</span>
                    </li>
                ))}
                <li className="absolute left-[56%] top-[84.6%] flex items-center gap-3 text-accent-on-brand max-md:hidden">
                    <span className="h-px w-7 bg-current" />
                    Front door
                </li>
            </ol>
        </div>
    );
}

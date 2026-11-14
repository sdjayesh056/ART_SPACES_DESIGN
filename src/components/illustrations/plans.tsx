import React from "react";

import type { IllustrationProps } from "@/types/content";

import { Dim, Door, GOLD, GOLD_SOFT, GROUND, Label, PAPER, RULE, Sheet, SOFT, TINT } from "./frame";

/** A window in a cut wall: the wall line breaks and a thin double line spans the opening. */
function Glazing({ x, y, length, vertical = false }: { x: number; y: number; length: number; vertical?: boolean }) {
    return vertical ? (
        <rect x={x - 3} y={y} width={6} height={length} fill={PAPER} strokeWidth={1} />
    ) : (
        <rect x={x} y={y - 3} width={length} height={6} fill={PAPER} strokeWidth={1} />
    );
}

function Bed({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
    return (
        <g>
            <rect x={x} y={y} width={w} height={h} rx={4} fill={PAPER} />
            <rect x={x + 6} y={y + 6} width={w / 2 - 9} height={14} rx={3} strokeWidth={1} />
            <rect x={x + w / 2 + 3} y={y + 6} width={w / 2 - 9} height={14} rx={3} strokeWidth={1} />
            <path d={`M${x} ${y + 28}H${x + w}`} strokeWidth={1} />
        </g>
    );
}

/** Annotated two-bedroom apartment plan — the residential and space-planning anchor. */
export function FloorPlan(props: IllustrationProps) {
    return (
        <Sheet {...props}>
            <rect x={40} y={40} width={380} height={250} fill={PAPER} stroke="none" />
            <rect x={40} y={40} width={210} height={150} fill={SOFT} stroke="none" />
            <rect x={40} y={190} width={160} height={100} fill={GOLD_SOFT} stroke="none" opacity={0.6} />
            <rect x={270} y={190} width={150} height={100} fill={GOLD_SOFT} stroke="none" opacity={0.6} />

            {/* Cut walls */}
            <g strokeWidth={3}>
                <rect x={40} y={40} width={380} height={250} />
                <path d="M250 40V120M250 160V190M40 190H90M125 190H215M250 190H300M335 190H420M200 190V290M270 190V290" />
            </g>
            <Glazing x={80} y={40} length={110} />
            <Glazing x={290} y={40} length={90} />
            <Glazing x={40} y={220} length={46} vertical />
            <Glazing x={420} y={215} length={50} vertical />
            <Door x={92} y={190} rotate={0} />
            <Door x={302} y={190} rotate={0} />
            <Door x={250} y={158} rotate={180} size={34} />
            <Door x={218} y={190} rotate={90} size={26} />

            {/* Living */}
            <rect x={56} y={58} width={96} height={34} rx={8} fill={PAPER} />
            <rect x={80} y={106} width={48} height={24} rx={4} strokeWidth={1} />
            <circle cx={200} cy={140} r={20} fill={PAPER} />
            {[[200, 112], [228, 140], [200, 168], [172, 140]].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={6} strokeWidth={1} />
            ))}

            {/* Kitchen */}
            <path d="M262 52H408V168H384V76H262Z" fill={PAPER} />
            <circle cx={300} cy={64} r={5} strokeWidth={1} />
            <circle cx={318} cy={64} r={5} strokeWidth={1} />
            <rect x={388} y={110} width={16} height={28} rx={3} strokeWidth={1} />

            {/* Bedrooms and bath */}
            <Bed x={58} y={208} w={76} h={66} />
            <rect x={148} y={236} width={40} height={14} strokeWidth={1} fill={PAPER} />
            <Bed x={328} y={208} w={76} h={66} />
            <rect x={208} y={236} width={54} height={26} rx={12} fill={PAPER} />
            <circle cx={222} cy={212} r={7} strokeWidth={1} />

            <Label x={104} y={152} strong>LIVING</Label>
            <Label x={325} y={128} strong>KITCHEN</Label>
            <Label x={96} y={286} >BED 01</Label>
            <Label x={366} y={286}>BED 02</Label>
            <Label x={235} y={282}>BATH</Label>

            <Dim from={40} to={420} at={312} label="11 400" />
            <Dim from={40} to={290} at={440} label="7 500" vertical />

            <g transform="translate(24 318)">
                <circle r={11} strokeWidth={1} />
                <path d="M0 7V-7M-4 -2L0 -7L4 -2" stroke={GOLD} />
            </g>
        </Sheet>
    );
}

/** Retail plan with the customer loop drawn over it. */
export function RetailPlan(props: IllustrationProps) {
    return (
        <Sheet {...props}>
            <rect x={40} y={40} width={400} height={250} fill={PAPER} stroke="none" />
            <g strokeWidth={3}>
                <path d="M200 290H40V40H440V290H280" />
                <path d="M40 100H170M90 40V100M130 40V100" strokeWidth={1.5} />
            </g>
            <Door x={200} y={290} rotate={-90} size={36} />
            <path transform="translate(280 290) rotate(180)" d="M0 0V36M0 36A36 36 0 0 1 36 0" strokeWidth={1} />

            {/* Window displays */}
            <rect x={54} y={262} width={130} height={20} fill={GOLD_SOFT} />
            <rect x={296} y={262} width={130} height={20} fill={GOLD_SOFT} />
            <Glazing x={54} y={290} length={130} />
            <Glazing x={296} y={290} length={130} />

            {/* Wall bays, gondolas and the cash desk */}
            <rect x={48} y={120} width={12} height={120} fill={TINT} strokeWidth={1} />
            <rect x={420} y={110} width={12} height={130} fill={TINT} strokeWidth={1} />
            {[150, 222, 294].map((x) => (
                <rect key={x} x={x} y={150} width={36} height={66} rx={8} fill={SOFT} />
            ))}
            <rect x={330} y={52} width={96} height={30} rx={6} fill={PAPER} />
            <rect x={196} y={52} width={96} height={16} fill={TINT} strokeWidth={1} />

            {/* Circulation loop */}
            <path
                d="M240 286C240 244 104 262 100 186C96 122 186 112 240 118C300 124 384 116 380 190C376 256 240 246 240 286"
                stroke={GOLD}
                strokeDasharray="2 7"
                strokeWidth={2.5}
            />
            <path d="M100 196L95 184L107 186Z" fill={GOLD} stroke={GOLD} />
            <path d="M380 180L385 192L373 190Z" fill={GOLD} stroke={GOLD} />

            <Label x={110} y={76}>FITTING</Label>
            <Label x={378} y={71} strong>CASH</Label>
            <Label x={244} y={64}>FEATURE WALL</Label>
            <Label x={119} y={276}>DISPLAY</Label>
            <Label x={361} y={276}>DISPLAY</Label>
            <Label x={240} y={312} strong>ENTRANCE</Label>
            <Dim from={40} to={440} at={326} label="CUSTOMER LOOP · 38 M" />
        </Sheet>
    );
}

function Desk({ x, y }: { x: number; y: number }) {
    return (
        <g>
            <rect x={x} y={y} width={44} height={16} fill={PAPER} />
            <circle cx={x + 11} cy={y - 7} r={4.5} strokeWidth={1} />
            <circle cx={x + 33} cy={y - 7} r={4.5} strokeWidth={1} />
            <circle cx={x + 11} cy={y + 23} r={4.5} strokeWidth={1} />
            <circle cx={x + 33} cy={y + 23} r={4.5} strokeWidth={1} />
        </g>
    );
}

/** Workplace zoning: focus, meet, collaborate and café read as four tinted zones. */
export function WorkplacePlan(props: IllustrationProps) {
    return (
        <Sheet {...props}>
            <rect x={40} y={40} width={190} height={160} fill={SOFT} stroke="none" />
            <rect x={230} y={40} width={210} height={100} fill={PAPER} stroke="none" />
            <rect x={230} y={140} width={210} height={150} fill={GOLD_SOFT} stroke="none" opacity={0.7} />
            <rect x={40} y={200} width={190} height={90} fill={GROUND} stroke="none" />

            <g strokeWidth={3}>
                <rect x={40} y={40} width={400} height={250} />
                <path d="M230 40V140M335 40V140M230 140H262M296 140H366M400 140H440" />
            </g>
            <path d="M40 200H230M230 140V290" stroke={RULE} strokeDasharray="4 5" strokeWidth={1} />
            <Glazing x={70} y={40} length={130} />
            <Glazing x={440} y={170} length={90} vertical />
            <Door x={264} y={140} size={30} />
            <Door x={368} y={140} size={30} />

            {[[62, 72], [150, 72], [62, 138], [150, 138]].map(([x, y]) => (
                <Desk key={`${x}-${y}`} x={x} y={y} />
            ))}

            {/* Meeting rooms */}
            <rect x={252} y={66} width={62} height={30} rx={14} fill={SOFT} />
            <rect x={357} y={66} width={62} height={30} rx={14} fill={SOFT} />

            {/* Collaboration */}
            {[[290, 200], [380, 240]].map(([cx, cy]) => (
                <g key={`${cx}-${cy}`}>
                    <circle cx={cx} cy={cy} r={17} fill={PAPER} />
                    {[0, 90, 180, 270].map((angle) => (
                        <circle
                            key={angle}
                            cx={cx + 26 * Math.cos((angle * Math.PI) / 180)}
                            cy={cy + 26 * Math.sin((angle * Math.PI) / 180)}
                            r={5}
                            strokeWidth={1}
                        />
                    ))}
                </g>
            ))}
            <rect x={250} y={252} width={70} height={22} rx={8} fill={PAPER} />

            {/* Café */}
            <rect x={56} y={256} width={120} height={18} rx={4} fill={PAPER} />
            {[70, 100, 130, 160].map((cx) => (
                <circle key={cx} cx={cx} cy={240} r={5} strokeWidth={1} />
            ))}

            <Label x={135} y={122} strong>FOCUS</Label>
            <Label x={283} y={122} strong>MEET</Label>
            <Label x={388} y={122} strong>MEET</Label>
            <Label x={380} y={176} strong>COLLABORATE</Label>
            <Label x={196} y={222} strong>CAFÉ</Label>
            <Dim from={40} to={440} at={312} label="24 WORKPOINTS · 1 : 9 M²" />
        </Sheet>
    );
}

/** Hotel suite plan: arrival, bath, sleep and lounge in one legible sequence. */
export function HotelSuitePlan(props: IllustrationProps) {
    return (
        <Sheet {...props}>
            <rect x={40} y={60} width={390} height={220} fill={PAPER} stroke="none" />
            <rect x={40} y={60} width={130} height={120} fill={SOFT} stroke="none" />
            <rect x={320} y={60} width={110} height={220} fill={GOLD_SOFT} stroke="none" opacity={0.6} />

            <g strokeWidth={3}>
                <path d="M40 240V60H430V280H76" />
                <path d="M40 180H112M146 180H170V60M320 60V110M320 230V280" />
            </g>
            <Door x={76} y={280} rotate={180} size={34} />
            <Door x={114} y={180} size={30} />
            <Glazing x={430} y={100} length={140} vertical />
            <path d="M430 80H462V260H430" strokeDasharray="5 5" strokeWidth={1} />

            {/* Bath */}
            <rect x={52} y={72} width={34} height={72} rx={15} fill={PAPER} />
            <rect x={104} y={72} width={54} height={20} fill={PAPER} />
            <circle cx={118} cy={82} r={5} strokeWidth={1} />
            <circle cx={144} cy={82} r={5} strokeWidth={1} />
            <circle cx={146} cy={150} r={8} strokeWidth={1} />

            {/* Wardrobe and luggage bench */}
            <rect x={52} y={196} width={18} height={40} fill={TINT} strokeWidth={1} />
            <rect x={120} y={252} width={44} height={16} rx={3} strokeWidth={1} />

            {/* Sleep */}
            <rect x={196} y={72} width={100} height={96} rx={5} fill={PAPER} />
            <rect x={204} y={80} width={40} height={18} rx={4} strokeWidth={1} />
            <rect x={248} y={80} width={40} height={18} rx={4} strokeWidth={1} />
            <path d="M196 112H296" strokeWidth={1} />
            <rect x={176} y={76} width={14} height={18} strokeWidth={1} />
            <rect x={302} y={76} width={14} height={18} strokeWidth={1} />
            <rect x={216} y={258} width={60} height={12} fill={TINT} strokeWidth={1} />

            {/* Lounge */}
            <rect x={388} y={104} width={28} height={76} rx={8} fill={PAPER} />
            <circle cx={356} cy={142} r={14} fill={PAPER} />
            <rect x={340} y={204} width={26} height={26} rx={8} strokeWidth={1} />
            <rect x={384} y={220} width={30} height={40} fill={PAPER} strokeWidth={1} />

            <Label x={105} y={168} strong>BATH</Label>
            <Label x={246} y={196} strong>SLEEP</Label>
            <Label x={374} y={84} strong>LOUNGE</Label>
            <Label x={90} y={260}>ENTRY</Label>
            <Label x={447} y={170} rotate={90}>BALCONY</Label>
            <Dim from={40} to={430} at={304} label="SUITE · 46 M²" />
            <path d="M92 262C150 232 170 214 232 214" stroke={GOLD} strokeDasharray="2 6" strokeWidth={2} />
            <circle cx={232} cy={214} r={3} fill={GOLD} stroke="none" />
        </Sheet>
    );
}

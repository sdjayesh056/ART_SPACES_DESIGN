import React from "react";

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
    /** Wider track for grids that need the extra room. */
    size?: "default" | "wide";
};

/**
 * Horizontal track: max width and gutters, in one place.
 *
 * The six sections previously gave six different answers — max-w-7xl with
 * px-4 sm:px-6 lg:px-8, section-container, max-w-6xl, and one that nested a
 * second container inside the first. Never write `max-w-7xl mx-auto px-...`
 * inline again.
 */
export function Container({ children, className = "", size = "default" }: ContainerProps) {
    const width = size === "wide" ? "max-w-[88rem]" : "max-w-7xl";

    return (
        <div className={`${width} mx-auto w-full px-6 sm:px-8 ${className}`}>{children}</div>
    );
}

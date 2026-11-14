import { menuData } from "./navigation";

/**
 * The site's stock photography, DERIVED from the navigation module so each
 * image URL lives in exactly one place. Only these twelve remote images and
 * the three files in /public exist — do not add URLs here; use an illustration
 * where another visual is needed.
 *
 * ⚠️ PLACEHOLDER — every image is stock and is replaced by the studio's own
 * photography. Alt text is therefore deliberately generic.
 */
const ENTRIES = Object.values(menuData).flatMap((section) => section.items);

export type PhotoId =
    | "residential"
    | "commercial"
    | "hospitality"
    | "retail"
    | "process"
    | "virtual-tours"
    | "booking"
    | "team"
    | "recent"
    | "awards"
    | "styles"
    | "testimonials";

export function photo(id: PhotoId): string {
    const entry = ENTRIES.find((item) => item.id === id);
    if (!entry) throw new Error(`No navigation image with id "${id}"`);
    return entry.image;
}

export const HERO_PHOTO = "/Logos/Home_Right_Visuals.png";

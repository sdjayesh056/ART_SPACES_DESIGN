import { useSyncExternalStore } from "react";

/**
 * Carries the room a visitor designed in the studio to the enquiry form, so
 * they do not have to describe it again. It lives in sessionStorage: it never
 * reaches the URL or the server until the visitor sends the form themselves,
 * and it is gone when the tab closes.
 */
const KEY = "artspaces:room-brief";

const subscribe = () => () => {};

export function saveRoomBrief(brief: string) {
    try {
        window.sessionStorage.setItem(KEY, brief);
    } catch {
        /* Storage is blocked (private mode, strict settings). The form simply starts empty. */
    }
}

function readRoomBrief(): string {
    try {
        return window.sessionStorage.getItem(KEY) ?? "";
    } catch {
        return "";
    }
}

/** The saved brief, or an empty string. Empty on the server and during hydration. */
export function useRoomBrief(): string {
    return useSyncExternalStore(subscribe, readRoomBrief, () => "");
}

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/*
  Colour guardrails.

  The palette drifted badly once: 28 hardcoded hexes from six unrelated
  families (pink, violet, fuchsia, cyan, teal, orange) across three sections,
  plus a brand gradient hand-rolled four times and wrong at both endpoints in
  every copy. All of it is now expressed as tokens from the @theme block in
  src/app/globals.css. These rules keep it that way.

  Scoped to components: src/data and src/lib legitimately carry colour values
  (the accent rotation references tokens; the lead notification email is
  standalone HTML that cannot use utilities).
*/
const OFF_BRAND_FAMILIES =
  "emerald|amber|violet|pink|fuchsia|cyan|indigo|purple|rose|teal|orange|lime|sky|blue|green|yellow|red";

const UTILITY_PREFIXES =
  "bg|text|border|from|to|via|ring|fill|stroke|shadow|decoration|outline|accent|caret|divide|placeholder";

// Single backslash escapes only: these strings are handed to esquery, which
// parses what sits between the slashes as the regex. Double-escaping here
// silently produces a pattern that matches nothing.
const offBrandPattern = `\\b(${UTILITY_PREFIXES})-(${OFF_BRAND_FAMILIES})-[0-9]{2,3}\\b`;
const rawHexPattern = "#[0-9a-fA-F]{3,8}\\b";

const OFF_BRAND_MESSAGE =
  "Off-brand colour family. Use the @theme tokens instead: brand-*, accent-*, accent-on-brand, surface*, ink*, line*. Add a token to globals.css if one is genuinely missing.";

const RAW_HEX_MESSAGE =
  "Raw hex in a component. Use an @theme token (brand-*, accent-*, ink*, surface*) or reference one with var(--color-*).";

const colourRules = [
  { selector: `Literal[value=/${offBrandPattern}/]`, message: OFF_BRAND_MESSAGE },
  { selector: `TemplateElement[value.raw=/${offBrandPattern}/]`, message: OFF_BRAND_MESSAGE },
  { selector: `Literal[value=/${rawHexPattern}/]`, message: RAW_HEX_MESSAGE },
  { selector: `TemplateElement[value.raw=/${rawHexPattern}/]`, message: RAW_HEX_MESSAGE },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ["src/components/**/*.tsx", "src/app/**/*.tsx"],
    rules: {
      "no-restricted-syntax": ["error", ...colourRules],
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

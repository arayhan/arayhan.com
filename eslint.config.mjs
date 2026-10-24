import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const APP = { group: ["@/app/*", "@/app"], message: "app/ composes; nothing composes app/. Move the shared piece down." };
const SERVER = { group: ["@/server/*"], message: "server-only. Reachable from route handlers and server components, not from a client module." };
const SIBLING = "Modules never import each other. Put the shared vocabulary in domain/.";

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  {
    // Module root files: here "../" is always a sibling module.
    files: ["src/modules/*/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [APP, SERVER, { group: ["@/modules/*"], message: SIBLING }, { regex: "^\\.\\./(?!\\.\\./)", message: SIBLING }],
      }],
    },
  },
  {
    // Nested files: "../" is this module's own root, "../../" lands in a sibling.
    files: ["src/modules/*/*/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [APP, SERVER, { group: ["@/modules/*"], message: SIBLING }, { regex: "^\\.\\./\\.\\./(?!\\.\\./)", message: SIBLING }],
      }],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/modules/**", "src/app/**", "src/domain/**", "src/server/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [APP, SERVER, { group: ["@/modules/*"], message: "Nothing below modules/ imports a module. Move the shared piece down into domain/." }],
      }],
    },
  },
  {
    files: ["src/domain/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{ group: ["@/modules/*", "@/app/*", "@/app", "@/server/*", "@/components/*"], message: "domain/ is the bottom of the import graph. It must not import upward." }],
      }],
    },
  },
];

export default config;

// Opt-in React surface — import from "<pkg>/react".
// Re-export the full core so /react remains a drop-in for the old single barrel.
export * from "./index";

// React provider, contexts, hooks
export { OpenSecretProvider, OpenSecretContext } from "./main";
export { OpenSecretDeveloper, OpenSecretDeveloperContext } from "./developer";
export { useOpenSecret } from "./context";
export { useOpenSecretDeveloper } from "./developerContext";

// React-surface types
export type { OpenSecretAuthState, OpenSecretContextType } from "./main";
export type {
  OpenSecretDeveloperAuthState,
  OpenSecretDeveloperContextType,
  DeveloperRole,
  OrganizationDetails,
  ProjectDetails,
  ProjectSettings
} from "./developer";

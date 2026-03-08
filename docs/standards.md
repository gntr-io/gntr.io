# Code Standards

**Dependencies:** Keep them minimal. Avoid adding packages if the feature can be done with existing tools or native APIs.

**TypeScript:** Strict mode is enabled. Avoid `any`.

**Units:** Use `rem` for sizing and spacing. `px` only for borders, box shadows, and media query breakpoints.

**Styles:** Use SCSS variables from `src/styles/_variables.scss` for all colors. Use mixins from `_mixins.scss` for breakpoints.

**Components:** Keep logic in frontmatter, styles scoped with `<style lang="scss">`, and client scripts minimal.

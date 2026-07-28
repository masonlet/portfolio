export const SECTIONS  = ["about", "skills"] as const;
export type SectionKey = typeof SECTIONS[number];

type Content = Partial<Record<SectionKey, string>>;
export const content: Content = {
  about:
    `Welcome to my portfolio. I'm a software developer currently working in TypeScript, C++, and Rust.<br><br>
     I build small, composable libraries and wire them into ecosystems:
     a Rust CLI for multi-repo development shipped on Homebrew, npm, and PyPI;
     an SVG language chart API embedded in GitHub READMEs;
     a modular contact form backend;
     a 2D web engine powering my browser games;
     and a C++/OpenGL engine behind personal labs and experiments.<br><br>
     I'm finishing my Computer Programming & Analysis diploma and looking for
     co-op or junior developer roles.
    `
};

export function isSection(value: unknown): value is SectionKey {
  return typeof value === "string" && (SECTIONS as readonly string[]).includes(value);
}

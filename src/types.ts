export interface Project {
  id: string;
  title: string;
  location: string;
  material: string;
  year: string;
  description: string;
  image: string;
  width: number; // Desktop display width in px
  height: number; // Desktop display height in px
  x: number; // Center-relative X offset in px
  y: number; // Center-relative Y offset in px
  zIndex: number; // Layering depth relative to central text (e.g. behind or front)
}

export type ViewTab = 'PROJECTS' | 'PROFILE' | 'CONTACT';

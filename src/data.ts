import { Project } from "./types";
import stoneLivingRoom from "./assets/images/stone_living_room_1781791193827.jpg";
import bathroomBasin from "./assets/images/bathroom_basin_1781791213361.jpg";
import stoneWalkway from "./assets/images/stone_walkway_1781791230903.jpg";
import archedBathroom from "./assets/images/arched_bathroom_1781791249067.jpg";
import modernKitchen from "./assets/images/modern_kitchen_1781791265906.jpg";
import stoneFireplace from "./assets/images/stone_fireplace_1781794685294.jpg";
import emeraldKitchen from "./assets/images/emerald_kitchen_1781794701125.jpg";
import limestonePool from "./assets/images/limestone_pool_1781794714181.jpg";
import terrazzoVanity from "./assets/images/terrazzo_vanity_1781794727966.jpg";

export const PROJECTS: Project[] = [
  {
    id: "lounge-stone-masonry",
    title: "Lounge Stone Masonry",
    location: "Fitzroy Residence",
    material: "Split-face Sandstone & Granite",
    year: "2025",
    description:
      "Custom-chiselled organic sandstone walling integrated into a modern residential lounge, matched with slate flooring and custom walnut carpentry to produce a warm, textured interior sanctuary.",
    image: stoneLivingRoom,
    width: 380,
    height: 290,
    x: -810,
    y: -100,
    zIndex: 10,
  },
  {
    id: "vertical-finger-basin",
    title: "Vertical Finger Basin",
    location: "Albert Park Bath",
    material: "Dusty Silt Ceramic & Engineered Quartz",
    year: "2026",
    description:
      "Chic vertically aligned sage finger-tiles creating dynamic light ripples behind a floating solid-surface white basin sink, anchored beside a masterfully exposed brick accent column.",
    image: bathroomBasin,
    width: 350,
    height: 260,
    x: -120,
    y: 370,
    zIndex: 30,
  },
  {
    id: "linear-paved-walkway",
    title: "Linear Paved Walkway",
    location: "Toorak Courtyard",
    material: "Honed Bluestone & Granite Paving",
    year: "2025",
    description:
      "A striking outdoor transitional path featuring custom rectilinear bluestone tiles, precision-cut and laid in a minimal staggered bond pattern, bordered by tailored garden beds.",
    image: stoneWalkway,
    width: 320,
    height: 420,
    x: 720,
    y: 90,
    zIndex: 25,
  },
  {
    id: "arched-sandstone-sanctuary",
    title: "Arched Sandstone Sanctuary",
    location: "Brighton Oasis Bath",
    material: "Honed Roman Travertine & Microcrest Stone",
    year: "2026",
    description:
      "A private bathing sanctuary highlighting custom polished travertine surfaces, set against massive metal-framed arched windows and bespoke limestone-integrated bath blocks.",
    image: archedBathroom,
    width: 400,
    height: 290,
    x: -420,
    y: -290,
    zIndex: 15,
  },
  {
    id: "gourmet-fluted-backsplash",
    title: "Gourmet Fluted Backsplash",
    location: "South Yarra Kitchen",
    material: "Ribbed Grey Tile & Monolithic Quartzite",
    year: "2026",
    description:
      "A majestic culinary space balancing fine-grooved ceramic tiling with a monolithic light-veined quartzite island, custom oak fronts, and sleek integrated luxury appliances.",
    image: modernKitchen,
    width: 440,
    height: 310,
    x: 100,
    y: -350,
    zIndex: 30,
  },
  {
    id: "travertine-fireplace",
    title: "Travertine Hearth Fireplace",
    location: "Kew Mansion House",
    material: "Monolithic Travertine Slab & Granite",
    year: "2025",
    description:
      "A custom, floor-to-ceiling fireplace fireplace breast crafted from a single flitch of silver-grey honed travertine, showcasing complex mineral layers dancing beneath the flames.",
    image: stoneFireplace,
    width: 380,
    height: 280,
    x: -440,
    y: 20,
    zIndex: 12,
  },
  {
    id: "emerald-quartzite-kitchen",
    title: "Emerald Quartzite Kitchen",
    location: "Hawthorn Estate",
    material: "Green Emerald Quartzite & Pure Brass",
    year: "2026",
    description:
      "Bespoke culinary island featuring hand-selected Brazilian emerald quartzite stone slabs, book-matched along the continuous mitered waterfall edge.",
    image: emeraldKitchen,
    width: 320,
    height: 400,
    x: 310,
    y: 380,
    zIndex: 22,
  },
  {
    id: "limestone-pool-coping",
    title: "Limestone Oasis Decking",
    location: "Sorento Beach Villa",
    material: "Sandblasted Mediterranean Limestone",
    year: "2025",
    description:
      "Clean-cut limestone deck tiling that stays cool under the intense midday sun, surrounding a bespoke luxury swimming pool with custom overflow stone drainage slots.",
    image: limestonePool,
    width: 420,
    height: 300,
    x: 580,
    y: -300,
    zIndex: 28,
  },
  {
    id: "terrazzo-vanity-wall",
    title: "Terrazzo Floating Basin",
    location: "Richmond Loft",
    material: "Coarse Italian Terrazzo & Oak Veneer",
    year: "2026",
    description:
      "Coarse-grain neutral terrazzo panel walling paired with custom-crafted wood block vanities and sophisticated textured matte premium faucets.",
    image: terrazzoVanity,
    width: 320,
    height: 400,
    x: -780,
    y: 310,
    zIndex: 18,
  },
];

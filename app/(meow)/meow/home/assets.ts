/**
 * /meow 섞기·튀어나오기에 쓰는 배경과 액자 — MYOHAE/assets 의 실제 파일과 frame_geometry.json 에서 뽑았다.
 * 등급: free = 무료 · sub = 구독(premium 폴더) · pack = 팩(packs 폴더, 따로 구매).
 * 그림은 public/meow/v2/bw_<key>.webp · fr_<key>.webp.
 */
export type Tier = 'free' | 'sub' | 'pack';
export type Box = { x: number; y: number; w: number; h: number };
export type FrameDef = { tier: Tier; w: number; h: number; bbox: Box; slot: Box };

export const WALLS: Record<string, Tier> = {
  'spotty-petal_candy_s2': 'sub',
  'spotty-petal_dusk_s5': 'sub',
  'spotty-petal_forest_s6': 'sub',
  'spotty-petal_ocean_s8': 'sub',
  'spotty-brush_cream_s4': 'sub',
  'spotty-brush_dusk_s5': 'sub',
  'note-collage_cream_s1': 'sub',
  'note-collage_cream_s11': 'sub',
  'note-sheet_citrus_s1': 'sub',
  'grunge-plate_plum_s11': 'sub',
  'grunge-plate_candy_s7': 'sub',
  'grunge-plate_ocean_s12': 'sub',
  'abstract-slabs_forest_s6': 'sub',
  'abstract-slabs_autumn_s3': 'sub',
  'floral-deco_dusk_s4': 'pack',
  'floral-deco_citrus_s2': 'pack',
  'floral-leaf_ocean_s9': 'free',
  'spotty-dots_candy_s2': 'free',
  'abstract-waves_autumn_s2': 'free',
  'floral-spiral_plum_s6': 'free',
};

export const FRAMES: Record<string, FrameDef> = {
  'polaroid_cream_s4': { tier: 'free', w: 1275, h: 1500, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.0847, y: 0.0667, w: 0.8306, h: 0.7167 } },
  'retro-border_kraft_s6': { tier: 'free', w: 1500, h: 1080, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.036, y: 0.05, w: 0.928, h: 0.8815 } },
  'vintage-film-01': { tier: 'free', w: 785, h: 1500, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.0382, y: 0.058, w: 0.921, h: 0.9227 } },
  'instax_solid_s1': { tier: 'sub', w: 945, h: 1500, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.0635, y: 0.0533, w: 0.873, h: 0.752 } },
  'instax_solid_s3': { tier: 'sub', w: 945, h: 1500, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.0571, y: 0.0467, w: 0.8857, h: 0.7333 } },
  'instax_solid_s5': { tier: 'sub', w: 945, h: 1500, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.0677, y: 0.052, w: 0.8646, h: 0.7393 } },
  'instax_solid_s10': { tier: 'sub', w: 945, h: 1500, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.0698, y: 0.0467, w: 0.8603, h: 0.7327 } },
  'instax_01': { tier: 'sub', w: 1240, h: 1500, bbox: { x: 0.0476, y: 0.06, w: 0.9081, h: 0.888 }, slot: { x: 0.1129, y: 0.1387, w: 0.7815, h: 0.6467 } },
  'instax_15': { tier: 'sub', w: 1256, h: 1500, bbox: { x: 0.0486, y: 0.04, w: 0.91, h: 0.926 }, slot: { x: 0.1075, y: 0.0933, w: 0.793, h: 0.6813 } },
  'instax_12': { tier: 'sub', w: 1274, h: 1500, bbox: { x: 0.0542, y: 0.0407, w: 0.9458, h: 0.926 }, slot: { x: 0.1083, y: 0.0947, w: 0.7841, h: 0.6807 } },
  'polaroid-aged_kraft_s6': { tier: 'sub', w: 1275, h: 1500, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.0816, y: 0.066, w: 0.8369, h: 0.7393 } },
  'polaroid-aged_blush_s2': { tier: 'sub', w: 1275, h: 1500, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.0761, y: 0.0647, w: 0.8478, h: 0.722 } },
  'distressed_aged_s1': { tier: 'sub', w: 1500, h: 1080, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.0927, y: 0.0954, w: 0.8593, h: 0.8537 } },
  'distressed_aged_s5': { tier: 'sub', w: 1500, h: 1080, bbox: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 }, slot: { x: 0.086, y: 0.0324, w: 0.8407, h: 0.9167 } },
  'film-16mm_kraft_s6': { tier: 'pack', w: 840, h: 1500, bbox: { x: 0.0012, y: 0.0007, w: 0.9976, h: 0.9987 }, slot: { x: 0.1607, y: 0.038, w: 0.6786, h: 0.912 } },
};

/** 튀어나오기 갤러리(gal_01~08) — scripts/build_deco_templates.render 로 그린 것. 배경·액자 등급 */
export const GALLERY: { wall: Tier; frame: Tier }[] = [
  { wall: 'sub', frame: 'sub' },
  { wall: 'sub', frame: 'sub' },
  { wall: 'sub', frame: 'sub' },
  { wall: 'pack', frame: 'sub' },
  { wall: 'sub', frame: 'sub' },
  { wall: 'sub', frame: 'sub' },
  { wall: 'sub', frame: 'sub' },
  { wall: 'sub', frame: 'sub' },
];

/**
 * 묘해 1.1 템플릿 12종 — MYOHAE/assets/deco_templates.json 의 key · tier · label 을 옮겼다.
 * 썸네일은 public/meow/v2/tpl_<key>.webp (앱의 assets/templates/ 를 줄인 것).
 * 언어: zh = 简体(zh-Hans), yue = 繁體(zh-Hant).
 */
import type { Lang } from '../i18n';

export type Tpl = { key: string; tier: 'free' | 'premium'; label: Record<Lang, string> };

export const TEMPLATES: Tpl[] = [
  {
    "key": "polaroid_blush_candy",
    "tier": "free",
    "label": {
      "ko": "블러시 폴라로이드",
      "en": "Blush Polaroid",
      "ja": "ブラッシュ・ポラロイド",
      "zh": "腮红拍立得",
      "yue": "腮紅拍立得"
    }
  },
  {
    "key": "polaroid_mint_dots",
    "tier": "premium",
    "label": {
      "ko": "민트 폴라로이드",
      "en": "Mint Polaroid",
      "ja": "ミント・ポラロイド",
      "zh": "薄荷拍立得",
      "yue": "薄荷拍立得"
    }
  },
  {
    "key": "polaroid_classic_leaf",
    "tier": "premium",
    "label": {
      "ko": "클래식 폴라로이드",
      "en": "Classic Polaroid",
      "ja": "クラシック・ポラロイド",
      "zh": "经典拍立得",
      "yue": "經典拍立得"
    }
  },
  {
    "key": "film_strip_dusk",
    "tier": "free",
    "label": {
      "ko": "필름 한 컷",
      "en": "Single Frame Film",
      "ja": "フィルム1コマ",
      "zh": "单格胶片",
      "yue": "單格膠片"
    }
  },
  {
    "key": "film_strip_terracotta",
    "tier": "premium",
    "label": {
      "ko": "노을빛 필름",
      "en": "Sunset Film",
      "ja": "夕焼けフィルム",
      "zh": "晚霞胶片",
      "yue": "晚霞膠片"
    }
  },
  {
    "key": "vintage_retro_kraft",
    "tier": "free",
    "label": {
      "ko": "레트로 엽서",
      "en": "Retro Postcard",
      "ja": "レトロ絵はがき",
      "zh": "复古明信片",
      "yue": "復古明信片"
    }
  },
  {
    "key": "vintage_aged_note",
    "tier": "premium",
    "label": {
      "ko": "오래된 메모",
      "en": "Aged Note",
      "ja": "古びたメモ",
      "zh": "旧便签",
      "yue": "舊便箋"
    }
  },
  {
    "key": "vintage_distressed_grunge",
    "tier": "premium",
    "label": {
      "ko": "그런지 빈티지",
      "en": "Grunge Vintage",
      "ja": "グランジ・ヴィンテージ",
      "zh": "做旧复古",
      "yue": "做舊復古"
    }
  },
  {
    "key": "instax_petal_candy",
    "tier": "premium",
    "label": {
      "ko": "꽃잎 인스탁스",
      "en": "Petal Instax",
      "ja": "花びらインスタックス",
      "zh": "花瓣拍立得",
      "yue": "花瓣拍立得"
    }
  },
  {
    "key": "instax_brush_dusk",
    "tier": "premium",
    "label": {
      "ko": "붓터치 인스탁스",
      "en": "Brush Instax",
      "ja": "ブラシ・インスタックス",
      "zh": "笔触拍立得",
      "yue": "筆觸拍立得"
    }
  },
  {
    "key": "popout_polaroid_plum",
    "tier": "free",
    "label": {
      "ko": "튀어나온 폴라로이드",
      "en": "Pop-out Polaroid",
      "ja": "飛び出すポラロイド",
      "zh": "跃出拍立得",
      "yue": "躍出拍立得"
    }
  },
  {
    "key": "popout_film_terracotta",
    "tier": "premium",
    "label": {
      "ko": "튀어나온 필름",
      "en": "Pop-out Film",
      "ja": "飛び出すフィルム",
      "zh": "跃出胶片",
      "yue": "躍出膠片"
    }
  }
];

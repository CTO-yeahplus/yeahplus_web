import type { Metadata } from 'next';
import { Heart } from '../components/icons';

export const metadata: Metadata = {
  title: '피드 — MYOHAE (묘해)',
  description: '지금 묘해에 올라오고 있는 우리 냥이 작품들',
};

// 60초마다 서버에서 최신 피드를 다시 불러옵니다(near-live).
export const revalidate = 60;

interface FeedPost {
  id: string;
  image_url: string;
  caption: string | null;
  likes_count: number | null;
}

async function getFeed(): Promise<FeedPost[]> {
  // 서버 컴포넌트에서만 사용하므로 NEXT_PUBLIC_ 접두사 없이 서버 전용 변수로 둔다.
  // (브라우저에 키가 노출되지 않음 · MYOHAE prefix 로 다른 제품과 충돌 방지)
  const url = process.env.MYOHAE_SUPABASE_URL;
  const key = process.env.MYOHAE_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const endpoint =
    `${url}/rest/v1/posts` +
    `?select=id,image_url,caption,likes_count,created_at` +
    `&is_active=eq.true&order=created_at.desc&limit=30`;

  try {
    const res = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const rows = (await res.json()) as FeedPost[];
    return Array.isArray(rows) ? rows.filter((r) => !!r.image_url) : [];
  } catch {
    return [];
  }
}

export default async function FeedPage() {
  const posts = await getFeed();

  return (
    <section className="feed">
      <div className="feed-head">
        <h1>지금 올라온 피드</h1>
      </div>
      <p className="sub">전 세계 집사들이 만든 우리 냥이 작품이 실시간으로 올라와요.</p>

      {posts.length === 0 ? (
        <div className="feed-empty">
          아직 표시할 게시물이 없어요. 잠시 후 다시 확인해 주세요.
        </div>
      ) : (
        <div className="feed-grid">
          {posts.map((p) => (
            <figure className="feed-item" key={p.id}>
              {/* 원격 이미지 — next/image 최적화 대신 단순 img (unoptimized) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image_url} alt={p.caption ?? '묘해 작품'} loading="lazy" />
              {(p.caption || (p.likes_count ?? 0) > 0) && (
                <figcaption className="feed-meta">
                  {p.caption ? <span className="feed-cap">{p.caption}</span> : <span className="feed-cap" />}
                  {(p.likes_count ?? 0) > 0 && (
                    <span className="feed-likes">
                      <Heart size={14} />
                      {p.likes_count}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}

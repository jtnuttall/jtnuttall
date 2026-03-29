import { ImageResponse } from 'next/og';

export const alt = 'Jeremy Nuttall — Principal Software Engineer & Tech Lead';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const params = family.replace(/ /g, '+') + ':wght@' + String(weight);
  const css = await fetch('https://fonts.googleapis.com/css2?family=' + params, {
    headers: {
      // Satori supports TTF but not WOFF2; an older UA gets TTF from Google Fonts
      'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
    },
  }).then((res) => res.text());

  const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error('Could not resolve font URL for ' + family);

  return fetch(fontUrl).then((res) => res.arrayBuffer());
}

export default async function Image() {
  const [spaceMonoRegular, spaceMonoBold] = await Promise.all([
    loadGoogleFont('Space Mono', 400),
    loadGoogleFont('Space Mono', 700),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        width: '100%',
        height: '100%',
        backgroundColor: '#1c1c1c',
        color: '#e5e2dd',
        fontFamily: 'SpaceMono',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Jeremy Nuttall
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#c4a055',
            marginTop: 20,
            letterSpacing: '0.05em',
          }}
        >
          Principal Software Engineer × Tech Lead
        </div>
        <div
          style={{
            fontSize: 18,
            marginTop: 32,
            color: 'rgba(229, 226, 221, 0.45)',
            letterSpacing: '0.02em',
          }}
        >
          jeremy-nuttall.com
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'SpaceMono', data: spaceMonoRegular, weight: 400 as const, style: 'normal' as const },
        { name: 'SpaceMono', data: spaceMonoBold, weight: 700 as const, style: 'normal' as const },
      ],
    },
  );
}

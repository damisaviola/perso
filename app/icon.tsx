import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 22,
          background: '#FFD60A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#111111',
          fontWeight: 900,
          border: '3px solid #111111',
          boxSizing: 'border-box',
          paddingBottom: '2px', // Slight optical adjustment for "d."
          paddingRight: '2px',
        }}
      >
        d.
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}

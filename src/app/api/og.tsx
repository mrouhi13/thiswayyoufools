import Content from '@/app/components/og-content'
import BackgroundCanvas from '@/app/components/og-image-background'
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'


export const config = {
  runtime: 'edge'
}

const fetchFont = fetch(new URL('../../../public/fonts/JetBrainsMono-Regular.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer()
)

export default async function handler(request: NextRequest) {
  const fontData = await fetchFont
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title')
  const author = searchParams.get('author')

  try {
    return new ImageResponse(
      (
        <BackgroundCanvas>
          <Content
            title={title ? title : 'Blog'}
            author={author ? author : 'Majid Rouhi'}
          />
        </BackgroundCanvas>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'JetBrainsMono',
            data: fontData,
            style: 'normal'
          }
        ]
      }
    )
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}

import React from 'react'
import Logo from '@/components/logo'


type Props = {
  title: string
  author: string
}

export default function Content({ title, author }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          marginTop: '80px',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Logo/>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '48px',
            marginRight: '100px'
          }}
        >
          <span
            style={{
              fontSize: '56px',
              color: '#000',
              paddingTop: '32px',
              fontWeight: 700
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: '28px',
              color: '#374151',
              fontWeight: 500,
              marginTop: '20px'
            }}
          >
            by {author}
          </span>
        </div>
      </div>
      <div
        style={{

          position: 'absolute',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      <span
        style={{
          width: 24,
          height: 24,
          background: 'black'
        }}
      />
        <span
          style={{
            fontSize: '18px',
            color: '#374151',
            fontWeight: 500,
            marginLeft: '10px'
          }}
        >
        {process.env.NEXT_PUBLIC_WEBSITE_URL}
      </span>
      </div>
    </div>
  )
}

const Logo = () => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="h-8 w-8"
      viewBox="0 0 192 192"
      fill="currentColor"
    >
      <g
        transform="translate(0,192) scale(0.1,-0.1)"
      >
        <title>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</title>
        <path d="M542 1660 c-149 -40 -273 -126 -371 -259 -103 -139 -179 -349 -167 -463 13 -126 85 -220 214 -281 57 -27 81 -32 164 -35 128 -6 142 0 92 37 -98 70 -153 161 -154 249 0 117 81 183 225 185 105 1 169 -43 197 -136 34 -112 7 -346 -68 -595 -19 -62 -33 -116 -30 -120 2 -4 290 -6 640 -4 l636 2 0 43 c0 83 -31 288 -60 404 -88 340 -305 676 -530 822 -73 47 -230 115 -327 142 -115 32 -358 37 -461 9z"/>
      </g>
    </svg>
  )
}

export default Logo

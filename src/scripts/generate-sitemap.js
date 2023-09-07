const fs = require('fs')
const globby = require('globby')

function addPage (page) {
  const path = page.replace('pages', '').replace('.tsx', '')
  const route = path === '/index' ? '' : path

  return `  <url>
    <loc>${`${process.env.WEBSITE_URL}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`
}

async function generateSitemap () {
  const pages = await globby([
    'pages/**/*{.tsx}',
    '!pages/_*.tsx',
    '!pages/api'
  ])
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                       ${pages.map(addPage).join('\n')}
                   </urlset>`

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()

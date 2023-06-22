import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html
        lang="en"
        dir="ltr"
        className="leading-tight"
      >
        <Head/>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

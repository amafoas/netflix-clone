import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='A clone of the Netflix homepage, built with React, Next.js, Tailwind CSS, and TypeScript.'
        />
        <meta name='author' content='Joel Sotelo' />

        <meta property='og:title' content='Netflix clone' />
        <meta
          property='og:description'
          content='A clone of the Netflix homepage, built with React, Next.js, Tailwind CSS, and TypeScript.'
        />
        <meta
          property='og:image'
          content='https://raw.githubusercontent.com/amafoas/netflix-clone/main/public/og_image.jpg'
        />
        <meta property='og:type' content='website' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

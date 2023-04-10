import Head from 'next/head';

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>MODERN VRANK</title>
      <meta name='og:title' content='modern-vrank' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <meta name='modern-vrank:site' content='@ccrsxx' />
      <meta name='modern-vrank:card' content='summary_large_image' />
    </Head>
  );
}

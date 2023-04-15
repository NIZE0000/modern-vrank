import Error from 'next/error';
import { SEO } from '@/components/common/seo';

export default function NotFound(): JSX.Element {

  const isDarkMode = true;

  return (
    <>
      <SEO
        title='Page not found / MODERN VRANK'
        description='Sorry we couldn’t find the page you were looking for.'
        image='/404.png'
      />
      <Error statusCode={404} withDarkMode={isDarkMode} />
    </>
  );
}

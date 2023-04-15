// import { CustomIcon } from '@components/ui/custom-icon';
import { SEO } from './seo';


export function Placeholder(): JSX.Element {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <SEO
        title='MODERN VRANK'
        description='Modern App for Vtuber ranking.'
        image='/home.png'
      />
      <i>
        {/* <CustomIcon
          className='h-20 w-20 text-[#1DA1F2]'
          iconName='ModernVrankIcon'
        /> */}
      </i>
    </main>
  );
}

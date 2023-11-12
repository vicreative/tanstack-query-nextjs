'use client';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';
import Button from '@components/UI/Forms/Button';

const Banner = () => {
  return (
    <div className='mx-auto max-w-7xl pt-20 sm:pb-24 px-6'>
      <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1'>
        <div className='col-span-6 flex flex-col justify-center'>
          <Fade
            direction={'up'}
            delay={400}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <h1 className='text-4xl lg:text-7xl font-normal mb-5 text-gray-800 md:4px lg:text-start text-center'>
              Let&apos;s cook <br />{' '}
              <b className='font-semibold'>something delicious</b>
            </h1>
          </Fade>
          <Fade
            direction={'up'}
            delay={800}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <p className='text-grey lg:text-lg font-normal mb-10 lg:text-start text-center'>
              Your Culinary Destination for Endless Inspiration
            </p>
          </Fade>
          <Fade
            direction={'up'}
            delay={1000}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <div className='flex flex-col md:flex-row align-middle justify-center lg:justify-start gap-x-6 gap-y-5'>
              <Link href='/recipes'>
                <Button colorScheme='primary' size='4xl'>
                  Lets cook
                </Button>
              </Link>
              <Link href='/recipes'>
                <Button colorScheme='primary' variant='outline' size='4xl'>
                  Explore now
                </Button>
              </Link>
            </div>
          </Fade>
        </div>

        <div className='col-span-6 flex justify-center relative pt-10 lg:pt-0'>
          <div className='flex bg-white p-2 gap-5 items-center bottom-10 left-10 rounded-xl absolute'>
            <Image
              priority
              src={'/images/Banner/pizza.svg'}
              alt='pizza-image'
              width={68}
              height={68}
            />
            <p className='text-lg font-normal'>
              More than 5000+ <br /> recipes.
            </p>
          </div>
          <Image
            src='/images/Banner/banner-image.png'
            alt='nothing'
            width={1000}
            height={805}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;

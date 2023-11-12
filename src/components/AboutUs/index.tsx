'use client';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';

const AboutUs = () => {
  return (
    <div className='mx-auto max-w-7xl lg:pt-20 sm:pb-24 px-6'>
      <div className='grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5'>
        <div className='col-span-6 flex flex-col justify-center'>
          <Fade
            direction={'up'}
            delay={400}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <h2 className='text-primary-500 text-lg font-normal mb-3 ls-51 uppercase text-start'>
              About Us
            </h2>
          </Fade>
          <Fade
            direction={'up'}
            delay={800}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <h3 className='text-3xl lg:text-5xl font-semibold text-black text-start'>
              Cooking Together: Exploring Culinary Adventures
            </h3>
          </Fade>
          <Fade
            direction={'up'}
            delay={1000}
            cascade
            damping={1e-1}
            triggerOnce={true}
          >
            <p className='text-grey md:text-lg font-normal mb-10 text-start mt-2'>
              Welcome to RecipesHive, where a passion for food and a love for
              sharing culinary adventures come together. We are a team of
              dedicated food enthusiasts passionate about sharing the joy of
              cooking. We&apos;re committed to providing a wide range of
              delicious, easy-to-follow recipes and fostering a vibrant
              community of food lovers who connect, share, and celebrate their
              love for food. At RecipesHive, we believe that cooking is an art,
              a science, and above all, an expression of love.{' '}
            </p>
            <p className='text-grey md:text-lg font-normal mb-10 text-start mt-1'>
              Whether you&apos;re a seasoned chef or a kitchen novice,
              we&apos;re here to make your culinary journey enjoyable and
              rewarding.
            </p>
          </Fade>
        </div>

        <div className='col-span-6 flex justify-start'>
          <Image
            priority
            src='/images/AboutUs/cook.png'
            alt='nothing'
            width={636}
            height={808}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

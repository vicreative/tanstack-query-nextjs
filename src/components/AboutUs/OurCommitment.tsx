'use client';
import Image from 'next/image';
import React from 'react';
import { Fade } from 'react-awesome-reveal';

const OurCommitment = () => {
  return (
    <div className='relative mx-auto max-w-7xl lg:pb-80 px-6'>
      <div className='absolute right-0 top-44 bottom-[-18%] hidden lg:block'>
        <Image
          src={'/images/AboutUs/mushroom.png'}
          alt='mushroom-image'
          width={300}
          height={300}
        />
      </div>

      <div className='flex flex-col justify-center items-center text-center mb-14'>
        <Fade
          direction={'up'}
          delay={400}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <h3 className='text-3xl lg:text-5xl font-semibold text-gray-800'>
            Our Commitment
          </h3>
        </Fade>
        <Fade
          direction={'up'}
          delay={800}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <p className='text-center text-grey md:text-lg font-normal mb-10 mt-2 max-w-4xl'>
            RecipesHive is committed to making your cooking journey delightful,
            educational, and successful. We&apos;re dedicated to providing you
            with the best recipes, cooking tips, and resources. We&apos;re also
            committed to ensuring your experience on our website is secure and
            enjoyable. Whether you&apos;re looking for weeknight dinner ideas,
            special occasion recipes, or just a little kitchen inspiration,
            RecipesHive is your trusted companion. Join us on this flavorful
            journey, and together, we&apos;ll create culinary masterpieces,
            unforgettable memories, and a vibrant food-loving community.
          </p>
        </Fade>
      </div>
    </div>
  );
};

export default OurCommitment;

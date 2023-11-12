'use client';
import Image from 'next/image';
import React from 'react';
import { Fade } from 'react-awesome-reveal';

interface cardDataType {
  imgSrc: string;
  heading: string;
  subheading: string;
  link: string;
}

const cardData: cardDataType[] = [
  {
    imgSrc: '/images/Features/featureOne.svg',
    heading: 'Variety',
    subheading:
      'Our extensive recipe collection covers everything from comforting classics to exotic dishes, and we cater to various dietary preferences.',
    link: 'Learn more',
  },
  {
    imgSrc: '/images/Features/featureTwo.svg',
    heading: 'Expertise',
    subheading:
      'We are passionate about creating recipes that are not only delicious but also easy to follow, with detailed step-by-step instructions.',
    link: 'Learn more',
  },
  {
    imgSrc: '/images/Features/featureThree.svg',
    heading: 'Community',
    subheading: `We're a community of food lovers where our forums and social media channels foster connections among passionate individuals.`,
    link: 'Learn more',
  },
];

const OurStory = () => {
  return (
    <div className='mx-auto max-w-6xl pb-40 px-6'>
      <div className='text-center mb-14'>
        <Fade
          direction={'up'}
          delay={400}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <h3 className='text-3xl lg:text-5xl font-semibold text-gray-800'>
            Our Story
          </h3>
        </Fade>
        <Fade
          direction={'up'}
          delay={800}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <p className='text-center text-grey md:text-lg font-normal mb-10 mt-2'>
            Our journey started with a shared love for food and a dream of
            creating a space where anyone, regardless of their skill level,
            could find the guidance and inspiration they needed to create
            delicious meals. We&apos;ve scoured the globe to bring you a vast
            collection of recipes, each handpicked and tested to ensure your
            success in the kitchen. What makes RecipesHive unique is our
            commitment to quality and our focus on community. We don&apos;t just
            offer recipes; we offer experiences. Here&apos;s what sets us apart:
          </p>
        </Fade>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-5 mt-36'>
        <Fade
          direction={'up'}
          delay={1000}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          {cardData.map((items, i) => (
            <div className='card-b p-8 relative rounded-3xl' key={i}>
              <div className='rounded-full flex justify-center absolute top-[-50%] sm:top-[-40%] md:top-[-55%] lg:top-[-45%] left-[0%] right-[0%]'>
                <Image
                  src={items.imgSrc}
                  alt={items.imgSrc}
                  width={300}
                  height={10}
                />
              </div>
              <h3 className='text-2xl text-black font-semibold text-center mt-16'>
                {items.heading}
              </h3>
              <p className='text-lg font-normal text-black text-center text-opacity-50 mt-2'>
                {items.subheading}
              </p>
            </div>
          ))}
        </Fade>
      </div>
    </div>
  );
};

export default OurStory;

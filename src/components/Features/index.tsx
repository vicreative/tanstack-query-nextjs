'use client';
import Image from 'next/image';
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
    heading: 'Recipes Galore',
    subheading:
      'Browse our extensive collection of carefully curated recipes, handcrafted with passion and precision.',
    link: 'Learn more',
  },
  {
    imgSrc: '/images/Features/featureTwo.svg',
    heading: 'Delicious Variety',
    subheading:
      'From international cuisines to dietary preferences, find recipes to suit every taste and occasion.',
    link: 'Learn more',
  },
  {
    imgSrc: '/images/Features/featureFour.svg',
    heading: 'Cooking Tips',
    subheading:
      'Enhance your culinary skills with pro tips, techniques, and step-by-step instructions.',
    link: 'Learn more',
  },
  {
    imgSrc: '/images/Features/featureThree.svg',
    heading: 'Community Engagement',
    subheading:
      'Join our food community, share your creations, connect with fellow enthusiasts.',
    link: 'Learn more',
  },
];

const Features = () => {
  return (
    <div className='mx-auto max-w-7xl py-40 px-6'>
      <div className='text-center mb-14'>
        <Fade
          direction={'up'}
          delay={400}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <h3 className='text-primary-500 text-lg font-normal mb-3 ls-51 uppercase'>
            Features
          </h3>
        </Fade>
        <Fade
          direction={'up'}
          delay={800}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <p className='text-3xl lg:text-5xl font-semibold text-gray-800'>
            What We Offer
          </p>
        </Fade>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-32 gap-x-5 mt-32'>
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

export default Features;

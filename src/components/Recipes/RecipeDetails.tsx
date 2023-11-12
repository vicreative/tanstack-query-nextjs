'use client';
import Counter from '@components/Counter';
import recipeDetails from '@constants/recipeDetails';
import removeSubstringAndTrailingText from '@utils/removeSubstringAndTrailingText';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { BsAlarm, BsBookmarkPlus } from 'react-icons/bs';
import { BiDish } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { MdOutlineBubbleChart } from 'react-icons/md';
import { RWebShare } from 'react-web-share';
import { Fade } from 'react-awesome-reveal';
import Slider from 'react-slick';
import { autoCapitalizeFirstLetter } from '@utils/autoCapitalizeFirstLetter';
import decimalToFraction from '@utils/decimalToFraction';
import Button from '@components/UI/Forms/Button';
import ButtonGroup from '@components/UI/Forms/ButtonGroup';
import Link from 'next/link';
import { useSimilarRecipe } from '@hooks/queries/useRecipes';
import { useRecipeDetails } from '@hooks/queries/useRecipes';
import useParams from '@hooks/useParams';
import RecipeList from './RecipeList';
import relatedRecipes from '@constants/relatedRecipes';
import Loader from '@components/Loader';
import { ButtonGroupList, InstructionSteps, Recipe, TabList } from '@types';
import minutesToHoursAndMinutes from '@utils/minutesToHoursAndMinutes';
import { useSaveRecipe } from '@hooks/mutations/useRecipes';
import { useUser } from '@hooks/context/useUser';

const tabList: TabList[] = [
  { id: 0, name: 'Ingredients' },
  { id: 1, name: 'Instructions' },
];

const buttonGroupList: ButtonGroupList[] = [
  { id: 'metric', name: 'metric' },
  { id: 'us', name: 'us' },
];

const ingredients = (ingredients: Recipe['extendedIngredients']) => {
  const ingredientList = ingredients || [];
  return ingredientList.filter(
    (item, index) => index === ingredientList.findIndex((i) => i.id === item.id)
  );
};

const RecipeDetails = () => {
  const params = useParams();
  const id = params.id;
  const sliderRef = useRef<Slider | null>(null);
  const {
    state: { user },
  } = useUser();

  const { saveRecipe, saveRecipeState } = useSaveRecipe(user ? user.uid : '');

  const { isLoading, data }: { isLoading: boolean; data: any } =
    useRecipeDetails(id, {
      // enabled: false, // TODO: remove this very important
      initialData: recipeDetails,
      enabled: id ? true : false, // TODO: use this very important
    });

  const { data: similarRecipes } = useSimilarRecipe(id, 4, {
    // enabled: false, // TODO: remove this very important
    initialData: relatedRecipes,
    enabled: id ? true : false, // TODO: use this very important
  });

  const [state, setState] = useState({
    activeTab: 0,
    measure: 'metric',
    servings: data?.servings || 1,
    activeIndex: 0,
    isOpen: true,
  });

  const instructionsStep: InstructionSteps[] =
    data.analyzedInstructions[0].steps;

  const similarRecipeList: Recipe[] = similarRecipes || [];

  const mappedRelatedRecipes = similarRecipeList.map((recipe) => ({
    ...recipe,
    image: `https://spoonacular.com/recipeImages/${recipe.id}-312x231.${recipe.imageType}`,
  }));

  const handleSaveRecipe = () => {
    saveRecipe({ ...data, addedAt: new Date().toISOString() });
  };

  return (
    <div className='mx-auto max-w-4xl pt-6 md:pt-20 pb-40 px-6'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section>
            <Fade
              direction={'up'}
              delay={400}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <h2 className='text-3xl md:text-4xl font-normal pb-2 max-w-xl'>
                {data.title}
              </h2>
              <div className='flex items-center gap-2 pb-6 md:pb-8'>
                <p className='text-xl text-gray-600'>{`${data.aggregateLikes} Likes`}</p>
                <FaHeart className='h-5 w-5 text-error-500' />
              </div>
              <Image
                src={data.image}
                alt={data.title}
                width={1000}
                height={400}
                className='w-full rounded-3xl h-48 md:h-80 object-cover'
              />
            </Fade>
          </section>

          <section>
            <Fade
              direction={'up'}
              delay={800}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <div className='flex justify-between items-center py-6'>
                <div>
                  <p className='opacity-50 text-black text-sm'>Source</p>
                  <Link
                    target='_blank'
                    href={data.sourceUrl}
                    className='text-base font-medium'
                  >
                    {data.sourceName}
                  </Link>
                </div>
                <div className='flex gap-2'>
                  <Button
                    variant='accent'
                    isIcon
                    colorScheme='secondary'
                    onClick={handleSaveRecipe}
                    disabled={saveRecipeState.isPending}
                  >
                    <BsBookmarkPlus strokeWidth={0.2} />
                  </Button>
                  <RWebShare
                    data={{
                      title: data.title,
                      text: `Check out this recipe i found on Recipeshive:`,
                    }}
                    onClick={() => {}}
                  >
                    <Button variant='accent' colorScheme='secondary'>
                      <FiShare />
                    </Button>
                  </RWebShare>
                </div>
              </div>
              <p
                className='text-base text-gray-600 font-normal'
                dangerouslySetInnerHTML={{
                  __html: removeSubstringAndTrailingText(
                    data.summary,
                    'minutes</b>.'
                  ),
                }}
              ></p>
            </Fade>
          </section>

          <section>
            <Fade
              direction={'up'}
              delay={1200}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <div className='border-y border-black my-6'>
                <div className='grid grid-cols-3 divide-x divide-black py-3'>
                  {/* Ingredients */}
                  <div className='flex items-center gap-2 md:gap-3 pl-3'>
                    <BsAlarm className='text-lg text-black text-opacity-50' />
                    <div>
                      <p className='text-sm text-black text-opacity-50 pb-1'>
                        Ingredients
                      </p>
                      <p className='text-base text-gray-800'>
                        {`${data.extendedIngredients?.length} items`}
                      </p>
                    </div>
                  </div>
                  {/* Time */}
                  <div className='flex items-center gap-2 md:gap-3 pl-3'>
                    <MdOutlineBubbleChart className='text-lg text-black text-opacity-50' />
                    <div>
                      <p className='text-sm text-black text-opacity-50 pb-1'>
                        Time
                      </p>
                      <p className='text-base text-gray-800'>
                        {minutesToHoursAndMinutes(data.readyInMinutes)}
                      </p>
                    </div>
                  </div>
                  {/* Servings */}
                  <div className='flex items-center gap-2 md:gap-3 pl-3'>
                    <BiDish className='text-lg text-black text-opacity-50' />
                    <div>
                      <p className='text-sm text-black text-opacity-50 pb-1'>
                        Servings
                      </p>
                      <Counter
                        value={state.servings}
                        onIncrement={() =>
                          setState({ ...state, servings: state.servings + 1 })
                        }
                        onDecrement={() =>
                          setState({ ...state, servings: state.servings - 1 })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </section>

          <section>
            <Fade
              direction={'up'}
              delay={1600}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <div className='bg-primary-50 rounded-3xl py-6'>
                <div className='grid grid-cols-12 divide-x divide-black border-black border-b px-6'>
                  {tabList.map((tab, index) => (
                    <div
                      key={tab.id}
                      className={
                        state.activeTab === index ? 'col-span-8' : 'col-span-4'
                      }
                    >
                      <button
                        className={`${
                          state.activeTab === index
                            ? 'text-2xl font-medium'
                            : 'text-base font-normal'
                        } flex items-end w-full h-full text-left py-2 px-3 md:px-5`}
                        onClick={() => sliderRef.current?.slickGoTo(index)}
                      >
                        {tab.name}
                      </button>
                    </div>
                  ))}
                </div>

                <Slider
                  ref={sliderRef}
                  dots={false}
                  arrows={false}
                  autoplay={false}
                  infinite={false}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  cssEase={'linear'}
                  afterChange={(index: number) =>
                    setState({ ...state, activeTab: index })
                  }
                >
                  {/* Ingredients */}
                  <div className='pt-2 w-full !flex flex-col items-center px-6'>
                    <p className='text-sm text-gray-600 text-center max-w-240 md:max-w-full pb-4'>
                      To see the instructions of this recipe swipe left or tap
                      on instructions
                    </p>

                    <ButtonGroup
                      buttons={buttonGroupList}
                      size='md'
                      selectedId={state.measure}
                      onClick={(id) => setState({ ...state, measure: id })}
                    />

                    <div className='flex flex-col w-full divide-y divide-primary-100'>
                      {ingredients(data.extendedIngredients).map(
                        (ingredient) => {
                          const quantity =
                            state.measure === 'metric'
                              ? (ingredient.measures.metric.amount /
                                  data.servings) *
                                state.servings
                              : (ingredient.measures.us.amount /
                                  data.servings) *
                                state.servings;

                          const amount = quantity.toString().includes('.')
                            ? Number(quantity)
                            : quantity;

                          return (
                            <div
                              key={ingredient.id}
                              className='w-full flex justify-between items-center gap-4'
                            >
                              <div className='flex items-center gap-3 py-3'>
                                <Image
                                  width={100}
                                  height={100}
                                  className='w-8 h-8 rounded-full'
                                  alt={ingredient.name}
                                  src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                                />
                                <p className='text-base'>
                                  {autoCapitalizeFirstLetter(ingredient.name)}
                                </p>
                              </div>

                              <div className='flex gap-1'>
                                <p
                                  className='text-base'
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      state.measure === 'metric'
                                        ? amount
                                        : decimalToFraction(amount),
                                  }}
                                ></p>
                                <p className='text-base'>
                                  {state.measure === 'metric'
                                    ? ingredient.measures.metric.unitShort
                                    : ingredient.measures.us.unitShort}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className='pt-2 w-full !flex flex-col items-center px-6'>
                    <p className='text-sm text-gray-600 text-center max-w-240 md:max-w-full pb-4'>
                      To see the ingredients of this recipe swipe right or tap
                      on ingredients
                    </p>

                    <div className='flex flex-col w-full divide-y divide-primary-100'>
                      {instructionsStep.map((step, index) => (
                        <div key={step.number}>
                          <button
                            className='text-lg w-full py-3 text-left font-medium'
                            onClick={() =>
                              setState({
                                ...state,
                                activeIndex: index,
                                isOpen:
                                  state.activeIndex === index
                                    ? !state.isOpen
                                    : true,
                              })
                            }
                          >{`Step ${step.number}`}</button>
                          {state.activeIndex === index && state.isOpen && (
                            <div className='pt-1 pb-4'>
                              <p className='text-base text-gray-700'>
                                {step.step}
                              </p>
                              <div className='flex flex-wrap gap-4 pt-4'>
                                {ingredients(step.ingredients).map(
                                  (ingredient) => (
                                    <div key={ingredient.id} className='w-20'>
                                      <Image
                                        width={100}
                                        height={100}
                                        className='w-full h-20 rounded-md'
                                        alt={ingredient.name}
                                        src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                                      />
                                      <p className='text-base text-gray-900 pt-2 object-cover'>
                                        {autoCapitalizeFirstLetter(
                                          ingredient.name
                                        )}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Slider>
              </div>
            </Fade>
          </section>

          {mappedRelatedRecipes?.length && (
            <section>
              <Fade
                direction={'up'}
                delay={2000}
                cascade
                damping={1e-1}
                triggerOnce={true}
              >
                <p className='pt-16 text-2xl md:text-3xl pb-4 md:pb-6'>
                  Related Recipes
                </p>
                <RecipeList
                  showOnlyTitle
                  recipes={{ results: mappedRelatedRecipes }}
                />
              </Fade>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeDetails;

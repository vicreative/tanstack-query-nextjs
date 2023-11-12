import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import Button from './UI/Forms/Button';

type CounterProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const Counter = ({
  value,
  onIncrement = () => {},
  onDecrement = () => {},
}: CounterProps) => {
  return (
    <div className='flex items-center gap-2'>
      <Button
        isIcon
        size='xs'
        variant='outline'
        colorScheme='secondary'
        disabled={value <= 1}
        onClick={onDecrement}
      >
        <FiMinus className='text-sm' />
      </Button>
      <p className='text-base text-gray-800'>{value}</p>
      <Button
        isIcon
        size='xs'
        variant='accent'
        colorScheme='secondary'
        onClick={onIncrement}
      >
        <FiPlus className='text-sm' />
      </Button>
    </div>
  );
};

export default Counter;

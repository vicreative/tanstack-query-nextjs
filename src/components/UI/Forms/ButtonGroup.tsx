import React from 'react';
import Button from './Button';

type Buttons = {
  id: string;
  name: string;
  // Add any other properties of your button object here.
};

type ButtonGroupProps = {
  buttons?: Buttons[];
  selectedId: string;
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  onClick: (id: string) => void;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  selectedId,
  buttons = [],
  size = 'sm',
  onClick = () => {},
  ...rest
}) => {
  return (
    <span className='isolate inline-flex rounded-md bg-white'>
      {buttons.map((button, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index == buttons.length - 1;

        return (
          <Button
            key={index}
            type='button'
            variant={selectedId === button.id ? 'filled' : 'naked'}
            colorScheme='chimney'
            rounded={false}
            size={size}
            onClick={() => onClick(button.id)}
            className={`${
              isFirstItem
                ? `!rounded-l-md !rounded-r-none ${
                    buttons.length <= 2 ? '!border-r !border-white' : ''
                  }`
                : isLastItem
                ? `!rounded-r-md !rounded-l-none ${
                    buttons.length <= 2
                      ? '!border-none'
                      : '!border-l !border-white'
                  }`
                : '!rounded-none !border-l !border-white'
            }`}
            {...rest}
          >
            {button.name}
          </Button>
        );
      })}
    </span>
  );
};

export default ButtonGroup;

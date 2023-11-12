export const resolveSizes = (
  size: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
  isIcon: boolean
) => {
  switch (size) {
    case 'xs':
      return `${isIcon ? 'p-1' : 'px-2 py-1'} text-xs`;
    case 'sm':
      return `${isIcon ? 'p-1' : 'px-2 py-1'} text-sm`;
    case 'base':
      return `${isIcon ? 'p-1.5' : 'px-2.5 py-1.5'} text-base`;
    case 'md':
      return `${isIcon ? 'p-2.5' : 'px-3 py-2'} text-base`;
    case 'lg':
      return `${isIcon ? 'p-2.5' : 'px-3 py-2 md:py-2.5'} text-base md:text-lg`;
    case 'xl':
      return `${
        isIcon ? 'p-3' : 'px-3 py-2 md:px-4 md:py-3'
      } text-base md:text-lg`;
    case '2xl':
      return `${
        isIcon ? 'p-3' : 'px-3 py-2 md:px-4 md:py-3'
      } text-base md:text-lg`;
    case '3xl':
      return `${
        isIcon ? 'p-4' : 'px-4 py-3 md:px-5 md:py-4'
      } text-lg md:text-xl`;
    case '4xl':
      return `${
        isIcon ? 'p-4' : 'px-4 py-3 md:px-6 md:py-5'
      } text-lg md:text-xl`;
    default:
      return '';
  }
};

export const resolveButtonVariants = (
  variant: 'filled' | 'outline' | 'accent' | 'naked' | 'link',
  colorScheme: 'primary' | 'secondary' | 'chimney' | 'black'
) => {
  const filledColorVariants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    chimney: 'bg-chimney-500 hover:bg-chimney-600 text-white',
    black: 'bg-gray-900 hover:bg-black text-white',
  };

  const outlineColorVariants = {
    primary: 'text-primary-500 border border-primary-500 hover:bg-primary-25',
    secondary:
      'text-secondary-500 border border-secondary-500 hover:bg-secondary-25',
    chimney: 'text-chimney-500 border border-chimney-500 hover:bg-chimney-25',
    black: 'text-gray-900 border border-gray-900 hover:bg-gray-25',
  };

  const accentColorVariants = {
    primary: 'bg-primary-50 hover:bg-primary-100 text-primary-500',
    secondary: 'bg-secondary-50 hover:bg-secondary-100 text-black',
    chimney: 'bg-chimney-50 hover:bg-chimney-100 text-chimney-500',
    black: 'bg-gray-50 hover:bg-gray-100 text-gray-500',
  };

  const nakedColorVariants = {
    primary: 'text-primary-500 hover:text-primary-600',
    secondary: 'text-secondary-500 hover:text-secondary-600',
    chimney: 'text-chimney-500 hover:text-chimney-600',
    black: 'text-gray-900 hover:text-black',
  };

  const linkColorVariants = {
    primary:
      'text-primary-500 hover:text-primary-600 underline decoration-solid',
    secondary:
      'text-secondary-500 hover:text-secondary-600 underline decoration-solid',
    chimney:
      'text-chimney-500 hover:text-chimney-600 underline decoration-solid',
    black: 'text-gray-900 hover:text-black underline decoration-solid',
  };

  switch (variant) {
    case 'filled':
      return filledColorVariants[colorScheme];
    case 'outline':
      return outlineColorVariants[colorScheme];
    case 'accent':
      return accentColorVariants[colorScheme];
    case 'naked':
      return nakedColorVariants[colorScheme];
    case 'link':
      return linkColorVariants[colorScheme];
    default:
      return '';
  }
};

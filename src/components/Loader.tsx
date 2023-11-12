import styles from '@styles/loader.module.css';

const Loader = () => {
  return (
    <div className='flex flex-col w-full h-full min-h-360 justify-center items-center'>
      <span className={styles.loader}></span>
      <p className='text-xl pt-4'>Loading...</p>
    </div>
  );
};

export default Loader;

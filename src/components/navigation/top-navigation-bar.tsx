'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { SearchDialog } from '../search/search-dialog';

interface TopNavigationBarProps {
  activeTab: 'lost' | 'found';
  setActiveTab: (tab: 'lost' | 'found') => void;
}

interface TabsProps {
  label: string;
  tab: 'lost' | 'found';
  activeTab: 'lost' | 'found';
  setActiveTab: (tab: 'lost' | 'found') => void;
}

export const TopNavigationBar = ({
  activeTab,
  setActiveTab,
}: TopNavigationBarProps) => {
  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <nav className='flex h-16 w-full max-w-xl justify-between bg-white px-6 pt-2 shadow-md'>
      <div className='mb-2 flex cursor-pointer items-center'>
        <Image
          src='/images/navigation/paw-2.svg'
          alt='logo'
          width={100}
          height={100}
          className='h-auto w-full max-w-12'
        />
      </div>
      <div className='flex w-full justify-center gap-10'>
        <Tabs
          label='LOST'
          tab='lost'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tabs
          label='FOUND'
          tab='found'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className='flex items-center'>
        <SearchDialog onSubmit={onSubmit} />
      </div>
    </nav>
  );
};

const Tabs = ({ label, tab, activeTab, setActiveTab }: TabsProps) => {
  return (
    <motion.div
      animate={{
        borderBottomWidth: activeTab === tab ? 4 : 0,
      }}
      transition={{
        type: 'tween',
        duration: 0.1,
        stiffness: 200,
        damping: 25,
      }}
      className={`border-primary-bg flex h-full w-20 cursor-pointer items-center justify-center border-b-0 border-solid`}
      style={{ borderBottomColor: 'var(--interface-primary-bg)' }}
      onClick={() => setActiveTab(tab)}
    >
      <span
        className={`text-center text-lg font-bold transition-colors duration-300 ${activeTab === tab ? 'text-interface-primary' : 'text-secondary-text'}`}
      >
        {label}
      </span>
    </motion.div>
  );
};

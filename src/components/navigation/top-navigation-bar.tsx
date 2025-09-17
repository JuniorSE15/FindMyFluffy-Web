'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { Search } from 'lucide-react';

interface TopNavigationBarProps {
  activeTab: 'lost' | 'found';
  setActiveTab: (tab: 'lost' | 'found') => void;
}

export const TopNavigationBar = ({
  activeTab,
  setActiveTab,
}: TopNavigationBarProps) => {
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
      <SearchDialog />
    </nav>
  );
};

const SearchDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex cursor-pointer items-center'>
          <Search className='size-6' />
        </div>
      </DialogTrigger>
      <DialogContent className='max-w-[400px]'>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Search for a lost or found pet.</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='col-span-1 grid gap-3 sm:col-span-2'>
            <Label htmlFor='search'>Search</Label>
            <Input id='search' name='search' placeholder='search...' />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='location'>Location</Label>
            <Input id='location' name='location' placeholder='location...' />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='type'>Type</Label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='dog'>Dog</SelectItem>
                <SelectItem value='cat'>Cat</SelectItem>
                <SelectItem value='other'>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='submit'
              className='bg-interface-primary w-full rounded-full'
            >
              Search
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Tabs = ({
  label,
  tab,
  activeTab,
  setActiveTab,
}: {
  label: string;
  tab: 'lost' | 'found';
  activeTab: 'lost' | 'found';
  setActiveTab: (tab: 'lost' | 'found') => void;
}) => {
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

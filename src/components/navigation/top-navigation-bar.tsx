'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useState } from 'react';
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

export const TopNavigationBar = () => {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  return (
    <nav className='flex h-16 justify-between px-6 pt-2 shadow-md'>
      <div className='mb-2 flex cursor-pointer items-center'>
        <Image
          src='/images/navigation/paw-2.svg'
          alt='logo'
          width={100}
          height={100}
          className='h-auto w-full max-w-12'
        />
      </div>
      <div className='flex gap-10'>
        <motion.div
          animate={{
            borderBottomWidth: activeTab === 'lost' ? 4 : 0,
          }}
          transition={{
            type: 'tween',
            duration: 0.1,
            stiffness: 200,
            damping: 25,
          }}
          className={`border-primary-bg flex h-full w-20 cursor-pointer items-center justify-center border-b-0 border-solid`}
          style={{ borderBottomColor: 'var(--interface-primary-bg)' }}
          onClick={() => setActiveTab('lost')}
        >
          <span
            className={`text-center text-lg font-bold transition-colors duration-300 ${activeTab === 'lost' ? 'text-primary-bg' : 'text-secondary-text'}`}
          >
            LOST
          </span>
        </motion.div>
        <motion.div
          animate={{
            borderBottomWidth: activeTab === 'found' ? 4 : 0,
          }}
          transition={{
            type: 'tween',
            duration: 0.1,
            stiffness: 200,
            damping: 25,
          }}
          className={`border-primary-bg flex h-full w-20 cursor-pointer items-center justify-center border-b-0 border-solid`}
          style={{ borderBottomColor: 'var(--interface-primary-bg)' }}
          onClick={() => setActiveTab('found')}
        >
          <span
            className={`text-center text-lg font-bold transition-colors duration-300 ${activeTab === 'found' ? 'text-primary-bg' : 'text-secondary-text'}`}
          >
            FOUND
          </span>
        </motion.div>
      </div>
      <div className='mb-2 flex cursor-pointer items-center'>
        <Dialog>
          <DialogTrigger>
            <Search className='size-6' />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search</DialogTitle>
              <DialogDescription>
                Search for a lost or found pet.
              </DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-2 grid gap-3'>
                <Label htmlFor='search'>Search</Label>
                <Input id='search' name='search' placeholder='search...' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  name='location'
                  placeholder='location...'
                />
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
                  className='bg-primary-bg w-full rounded-full'
                >
                  Search
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

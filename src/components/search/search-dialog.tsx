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

interface SearchDialogProps {
  onSubmit: () => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ onSubmit }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Search className='text-primary-text size-6' />
        </Button>
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
              className='bg-primary-bg w-full rounded-full'
              onClick={onSubmit}
            >
              Search
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

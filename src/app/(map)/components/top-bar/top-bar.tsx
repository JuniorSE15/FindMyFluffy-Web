import { SearchDialog } from '@/components/search/search-diaglog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { FilterIcon } from 'lucide-react';

export const TopBar = () => {
  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <div className='flex h-16 w-full max-w-xl items-center justify-start gap-2 bg-white px-6 py-2 shadow-md'>
      <SearchDialog onSubmit={onSubmit} />
      <div>
        <Select>
          <SelectTrigger className='w-full'>
            <FilterIcon size={16} />
            <SelectValue placeholder='Filter' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='lost'>Lost</SelectItem>
            <SelectItem value='found'>Found</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

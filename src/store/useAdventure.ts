import { Adventure, adventures } from '@/services/api/adventures';
import { create } from 'zustand';

interface AdventureStore {
  adventures: Adventure[];
  searchedAdventures: string;
  setAdventures: (adventures: Adventure[]) => void;
  setSearchedAdventures: (searchParams: string) => void;
}

const useAdventures = create<AdventureStore>((set) => {
  const initializeAdventures = async () => {
    const fetchedAdventures = await adventures.getAdventures();
    set({ adventures: fetchedAdventures, searchedAdventures: '' });
  };

  // Initialize adventures when the store is created
  initializeAdventures();

  return {
    adventures: [],
    searchedAdventures: '',
    setAdventures: (adventures: Adventure[]) => set({ adventures }),
    setSearchedAdventures: (searchParams: string) =>
      set({ searchedAdventures: searchParams }),
  };
});

export default useAdventures;

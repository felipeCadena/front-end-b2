import { Adventure, adventures } from "@/services/api/adventures";
import { create } from "zustand";

interface AdventureStore {
  adventures: Adventure[];
  setAdventures: (adventures: Adventure[]) => void;
}

const useAdventures = create<AdventureStore>((set, get) => {
  const initializeAdventures = async () => {
    const fetchedAdventures = await adventures.getAdventures();
    set({ adventures: fetchedAdventures.data });
  };

  // Initialize adventures when the store is created
  initializeAdventures();

  return {
    adventures: [],
    setAdventures: (adventures: Adventure[]) => set({ adventures }),
  };
});

export default useAdventures;

import { create } from 'zustand';

const currentLocation = create((set) => ({
  lat: null,
  lon: null,
  setLocation: (data) => set((state) => ({ lat: data.lat, lon: data.lon })),
}));

export default currentLocation;

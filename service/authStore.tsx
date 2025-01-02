
import {create} from 'zustand';
import {persist, createJSONStorage} from "zustand/middleware";
import { mkvStorage } from './storage';

interface authState{
    user: Record<string, any> | null;
    setUser:(user:any) => void;
    logout:()=>void;
    deviceToken:boolean;
    setDeviceTokenStatus:(value:boolean) => void;
}


export const useAuthStore = create<authState>(
    persist(
      (set,get) => ({
      user:null,
      deviceTokenAdded: false,
      setUser:(data) => set({user:data}),
      logout:() => set({user:null,deviceTokenAdded:false}),
      setDeviceTokenStatus:() => set({user:null,deviceTokenAdded:value}),
      }),
      {
        name:'auth-storage',
        storage: createJSONStorage(() => mkvStorage)
      },
    )
)
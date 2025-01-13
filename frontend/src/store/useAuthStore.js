// to maintian the all  the initial and furtther states 

import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
export const useAuthStore=create((set)=>({

    authUser:null,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    //hitting the check auth api in the backend 
  // Temporarily modify your checkAuth to test connection
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  }


}))
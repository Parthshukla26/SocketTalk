// to maintian the all  the initial and furtther states 
import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from "react-hot-toast";

export const useAuthStore=create((set)=>({

    authUser:null,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],

    //hitting the check auth api in the backend 
  // Temporarily modify your checkAuth to test connection
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      //user is authenticated 
      set({ authUser: res.data });

    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  //data after submitting the form since signup is called in defalut submit function in signupcomponent
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      //sending req to backend api
      const res = await axiosInstance.post("/auth/signup", data);
      //auth the user 
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false }); //for the create account button state
    }
  },
  //
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      //user is authentucated 
      set({ authUser: res.data });
      toast.success("Logged in successfully");

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  //logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      //user is set as null after logout
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  //updating the profile image
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  }

}))
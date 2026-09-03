import { create } from "zustand";

export const store = create((update) => {
    return{
        user: null,
        isLogin: null,

       globalLogin: (userData) => {
      update({
        user: userData,
        isLogin: true
    })
   },

        globalLogout: () => {
            update({
                user: null,
                isLogin: false
            })
        }
    }
})
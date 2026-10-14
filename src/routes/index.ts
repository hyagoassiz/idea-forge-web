export const routes = {
  protected: {
    dashboard: "/dashboard",
    boards: {
      list: "/boards",
      new: "/boards/new",
      edit: (idBoard: number) => `/boards/${idBoard}/edit`,
      view: (idBoard: number) => `/boards/${idBoard}`,
    },
  },

  public: {
    login: "/login",
    register: "/register",
    resetPassword: "reset-password",

    verifyEmail: {
      sent: (email: string) =>
        `/verify-email/sent?email=${encodeURIComponent(email)}`,
    },
  },
} as const;

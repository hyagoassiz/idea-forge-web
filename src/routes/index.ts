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
      sent: (email: string, token: string) =>
        `/verify-email/sent?email=${encodeURIComponent(email)}&token=${token}`,
      verify: (token: string) => `/verify-email?token=${token}`,
    },
  },
} as const;

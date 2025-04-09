import { create } from "zustand";
import { client } from "../lib/apolloClient";
import {
  ACTIVATE_USER,
  APPLY_VACANCY,
  FORGOT_PASSWORD_USER,
  GET_HARD_SKILL_TESTS,
  GET_LOGGED_IN_USER,
  LOGIN_USER,
  REGISTER_USER,
  RESET_PASSWORD_USER,
  RESOLVE_HARD_SKILL_TESTS,
  UPDATE_USER_PROFILE_MUTATION,
} from "../queries/UserQueries";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const UserStore = create((set) => ({
  user: null,
  testItems: [],

  async signupUser(data) {
    try {
      const res = await client.mutate({
        mutation: REGISTER_USER,
        variables: {
          registerDto: {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            position: data.position,
          },
        },
      });

      if (res.data?.registerUser) {
        toast.success("Please check your email to activate your account");
        window.localStorage.setItem(
          "activation_token",
          res.data?.registerUser?.activation_token
        );
        data.navigate("/verifyUser");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message);
    }
  },

  async verifyUser(activationCode, navigate) {
    const activation_token = window.localStorage.getItem("activation_token");
    try {
      const res = await client.mutate({
        mutation: ACTIVATE_USER,
        variables: {
          activationDto: {
            activationCode: activationCode,
            activationToken: activation_token,
          },
        },
      });

      if (res.data?.activateUser) {
        toast.success("Your accoount successfully activated");
        set({ user: res.data.activateUser.user });
        navigate("/loginUser");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error("Error during verifying:", error);
      toast.error(error.message);
    }
  },

  async loginUser(data, navigate) {
    try {
      const res = await client.mutate({
        mutation: LOGIN_USER,
        variables: {
          loginDto: {
            email: data.email,
            password: data.password,
          },
        },
      });

      if (res.data?.login) {
        toast.success("Successfully logged in");
        Cookies.set("userAccessToken", res.data?.login?.accessToken);
        Cookies.set("userRefreshToken", res.data?.login?.refreshToken);
        navigate("/");
        window.location.reload();
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.message);
    }
  },

  async getLoggedInUser() {
    const accessToken = Cookies.get("userAccessToken");
    if (accessToken) {
      const res = await client.query({
        query: GET_LOGGED_IN_USER,
        context: {
          headers: {
            accessToken: `${Cookies.get("userAccessToken")}`,
            refreshToken: `${Cookies.get("userRefreshToken")}`,
          },
        },
      });
      if (res.data?.getLoggedInUser?.user) {
        set({ user: res.data?.getLoggedInUser?.user });
      }
    }
  },

  async logout() {
    Cookies.remove("userAccessToken");
    Cookies.remove("userRefreshToken");
    toast.success("Logged out successfully");
    window.location.reload();
  },

  async forgotPassword(email) {
    const res = await client.mutate({
      mutation: FORGOT_PASSWORD_USER,
      variables: { email },
    });

    if (res.data?.forgotPassword) {
      toast.success(res.data?.forgotPassword.message);
    } else {
      toast.error("Error during sending your email");
    }
  },

  async resetPasswordUser(password, activation_token, navigate) {
    const variables = {
      resetPasswordDto: {
        password,
        activationToken: activation_token,
      },
    };

    const res = await client.mutate({
      mutation: RESET_PASSWORD_USER,
      variables: variables,
    });
    if (res.data?.resetPassword) {
      toast.success("Your password successfully reseted");
      navigate("/loginUser");
    } else {
      toast.error("Error during resetting password");
    }
  },

  async updateProfile(data) {
    const variables = {
      updateProfileDto: {
        fullName: data.fullName,
        position: data.position,
        about: data.about,
        location: data.location,
        experience: data.experience,
      },
    };

    const res = await client.mutate({
      mutation: UPDATE_USER_PROFILE_MUTATION,
      variables: variables,
      context: {
        headers: {
          accessToken: `${Cookies.get("userAccessToken")}`,
          refreshToken: `${Cookies.get("userRefreshToken")}`,
        },
      },
    });

    if (res.data?.updateProfile) {
      toast.success("Your profile successfully updated");
    } else {
      toast.error("Error during updating your account");
    }
  },

  async applyVacancy(vacancyId) {
    const res = await client.mutate({
      mutation: APPLY_VACANCY,
      variables: {
        vacancyId,
      },
      context: {
        headers: {
          accessToken: `${Cookies.get("userAccessToken")}`,
          refreshToken: `${Cookies.get("userRefreshToken")}`,
        },
      },
    });
    console.log(res);

    if (
      res.data?.applyVacancy?.message ===
      "Iltimos emailingizga qarang ,  emailingizga keyingi bosqich uchun xabar yuborildi "
    ) {
      toast.success(
        "Iltimos emailingizga qarang ,  emailingizga keyingi bosqich uchun xabar yuborildi "
      );
    } else {
      toast.error(res.data?.applyVacancy?.message);
    }
  },

  async getHardSkillTests(data) {
    const res = await client.query({
      query: GET_HARD_SKILL_TESTS,
      variables: {
        vacancyId: data.vacancyId,
        hardSkillToken: data.hardSkillToken,
      },
    });
    if (res.data?.getHardSkillTests) {
      set({ testItems: res.data?.getHardSkillTests?.testItems });
    } else {
      toast.error("Error during getting hard skill tests");
    }
  },

  async resolveHardSkillTests(data) {
    const accessToken = Cookies.get("userAccessToken");
    const refreshToken = Cookies.get("userRefreshToken");

    try {
      const res = await client.mutate({
        mutation: RESOLVE_HARD_SKILL_TESTS,
        variables: {
          vacancyId: data.vacancyId,
          answersFromUser: data.answers,
        },
        context: {
          headers: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        },
      });

      if (res.data?.resolveHardSkilltests) {
        toast.success(res.data?.resolveHardSkilltests?.message);
      } else {
        toast.error("Error during resolve hard skill tests");
      }
    } catch (error) {
      console.error("Mutation error:", {
        error,
      });
      throw error;
    }
  },
}));

export default UserStore;

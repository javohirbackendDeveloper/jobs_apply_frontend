import { create } from "zustand";
import { client } from "../lib/apolloClient";
import {
  ACTIVATE_COMPANY,
  FORGOT_PASSWORD_MUTATION,
  GET_LOGGED_COMPANY,
  LOGIN_COMPANY,
  REGISTER_COMPANY,
  RESET_PASSWORD_MUTATION,
} from "../queries/CompanyQueries";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const companyStore = create((set, get) => ({
  company: null,
  async signupCompany(data, navigate) {
    const variables = {
      registerCompanyDto: data,
    };
    try {
      const res = await client.mutate({
        mutation: REGISTER_COMPANY,
        variables,
      });

      if (res.data?.registerCompany) {
        toast.success("Please check your email to activate your account");
        window.localStorage.setItem(
          "activationToken",
          res.data?.registerCompany?.activationToken
        );
        navigate("/verifyCompany");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message);
    }
  },

  async verifyCompany(activationCode, navigate) {
    const activation_token = window.localStorage.getItem("activationToken");
    try {
      const res = await client.mutate({
        mutation: ACTIVATE_COMPANY,
        variables: {
          activationCompanyDto: {
            activationCode,
            activationToken: activation_token,
          },
        },
      });
      console.log({ res });

      if (res.data?.activateCompany) {
        toast.success("Your accoount successfully activated");
        set({ company: res.data.activateCompany.company });
        navigate("/loginCompany");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error("Error during verifying:", error);
      toast.error(error.message);
    }
  },

  async loginCompany(data, navigate) {
    try {
      const variables = {
        loginCompanyDto: {
          ...data,
        },
      };
      const res = await client.mutate({
        mutation: LOGIN_COMPANY,
        variables,
      });

      if (res.data?.loginCompany) {
        toast.success("Successfully logged in");
        Cookies.set("companyAccessToken", res.data?.loginCompany?.accessToken);
        Cookies.set(
          "companyRefreshToken",
          res.data?.loginCompany?.refreshToken
        );
        navigate("/");
        window.location.reload();
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log("error during login compmany", error);
      toast.error(error.message);
    }
  },

  async getLoggedCompany() {
    const accessToken = Cookies.get("companyAccessToken");
    if (accessToken) {
      const res = await client.query({
        query: GET_LOGGED_COMPANY,
        context: {
          headers: {
            accessToken: `${Cookies.get("companyAccessToken")}`,
            refreshToken: `${Cookies.get("companyRefreshToken")}`,
          },
        },
      });

      if (res.data?.getLoggedCompany?.company) {
        set({ company: res.data?.getLoggedCompany?.company });
      }
    }
  },

  async logoutCompany() {
    Cookies.remove("companyAccessToken");
    Cookies.remove("companyRefreshToken");
    toast.success("Logged out successfully");
    window.location.reload();
  },

  async forgotPasswordCompany(email) {
    const res = await client.mutate({
      mutation: FORGOT_PASSWORD_MUTATION,
      variables: { email },
    });

    if (res.data?.forgotPasswordCompany) {
      toast.success(res.data?.forgotPasswordCompany.message);
    } else {
      toast.error("Error during sending your email");
    }
  },

  async resetPasswordCompany(password, activation_token, navigate) {
    const variables = {
      resetPasswordDto: {
        password,
        activationToken: activation_token,
      },
    };

    const res = await client.mutate({
      mutation: RESET_PASSWORD_MUTATION,
      variables: variables,
    });

    if (res.data?.resetCompanyPassword) {
      toast.success("Your password successfully reseted");
      navigate("/loginCompany");
    } else {
      toast.error("Error during resetting password");
    }
  },
}));

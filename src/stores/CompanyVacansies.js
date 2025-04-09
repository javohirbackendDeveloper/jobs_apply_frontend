import { create } from "zustand";
import { client } from "../lib/apolloClient";
import {
  CREATE_VACANCY_MUTATION,
  GET_ONE_VACANCY,
  GET_PASSED_TO_HARD_SKILLS,
  GET_PASSED_TO_SOFT_SKILLS,
  GET_SUBMITTED_CANDIDATES,
  GET_VACANCIES,
  GET_VACANCIES_BY_POSITION,
  GET_VACANCIES_FOR_USERS,
} from "../queries/CompanyQueries";
import { companyStore } from "./CompanyStore";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const CompanyVacancyStore = create((set, get) => ({
  vacansies: [],
  allVacansies: [],
  oneVacancy: null,
  oneCompany: null,
  submitted_candidates: [],
  passedToHardSkills: [],
  passedToSoftSkills: [],

  async getCompanyVacansies(company) {
    if (!company || !company.id) {
      console.error("Kompaniya mavjud emas.");
      return;
    }

    const res = await client.query({
      query: GET_VACANCIES,
      variables: {
        companyId: company.id,
      },
    });

    if (res.data?.getVacansies?.vacansies) {
      set({ vacansies: res.data?.getVacansies?.vacansies });
    }
  },

  async createVacancy(data, navigate) {
    const accessToken = Cookies.get("companyAccessToken");

    const res = await client.mutate({
      mutation: CREATE_VACANCY_MUTATION,
      variables: {
        createVacancyDto: {
          ...data,
        },
      },
      context: {
        headers: {
          accessToken,
          refreshToken: `${Cookies.get("companyRefreshToken")}`,
        },
      },
    });
    if (res.data?.createVacancy) {
      toast.success(res.data?.createVacancy.message);
      navigate("/companyVacansies");
    } else {
      toast.error("error during create vacancy");
    }
  },

  async getAllVacansiesForUsers() {
    const res = await client.query({
      query: GET_VACANCIES_FOR_USERS,
    });
    if (res.data?.getVacansiesForUsers?.vacansies) {
      set({ allVacansies: res.data?.getVacansiesForUsers?.vacansies });
    }
  },

  async searchVacancyByPosition(position) {
    const res = await client.query({
      query: GET_VACANCIES_BY_POSITION,
      variables: {
        position,
      },
    });
    console.log({ res });

    if (res.data?.getVacansiesByPosition) {
      set({ allVacansies: res.data?.getVacansiesByPosition.vacansies });
    }
  },

  async getOneVacansy(vacancyId) {
    const res = await client.query({
      query: GET_ONE_VACANCY,
      variables: {
        vacancy_id: vacancyId,
      },
    });

    if (res.data?.getOneVacancy?.vacancy) {
      set({ oneVacancy: res.data?.getOneVacancy?.vacancy });
    }
    if (res.data?.getOneVacancy?.company) {
      set({ oneCompany: res.data?.getOneVacancy?.company });
    }
  },

  // GET APPLIED CANDIDATES

  async getSubmittedCandidates(vacancyId) {
    const res = await client.query({
      query: GET_SUBMITTED_CANDIDATES,
      variables: {
        vacancyId,
      },
    });

    if (res.data?.getSubmittedCandidates?.candidates) {
      set({
        submitted_candidates: res.data?.getSubmittedCandidates?.candidates,
      });
    }
  },

  async getPassedToHardSkills(vacancyId) {
    const res = await client.query({
      query: GET_PASSED_TO_HARD_SKILLS,
      variables: {
        vacancyId,
      },
    });

    if (res.data?.getPassedToHardSkills?.candidates) {
      set({
        passedToHardSkills: res.data?.getPassedToHardSkills?.candidates,
      });
    }
  },

  async getPassedToSoftSkills(vacancyId) {
    const res = await client.query({
      query: GET_PASSED_TO_SOFT_SKILLS,
      variables: {
        vacancyId,
      },
    });

    console.log({ res });

    if (res.data?.getPassedToSoftSkills?.candidates) {
      set({
        passedToSoftSkills: res.data?.getPassedToSoftSkills?.candidates,
      });
    }
  },
}));

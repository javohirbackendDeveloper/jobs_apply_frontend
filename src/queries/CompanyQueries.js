import { gql } from "@apollo/client";

export const LOGIN_COMPANY = gql`
  mutation LoginCompany($loginCompanyDto: LoginCompanyDto!) {
    loginCompany(loginCompanyDto: $loginCompanyDto) {
      accessToken
      refreshToken
    }
  }
`;

export const REGISTER_COMPANY = gql`
  mutation registerCompany($registerCompanyDto: RegisterCompanyDto!) {
    registerCompany(registerCompanyDto: $registerCompanyDto) {
      activationToken
    }
  }
`;

export const ACTIVATE_COMPANY = gql`
  mutation activateCompany($activationCompanyDto: ActivationCompanyDto!) {
    activateCompany(activationCompanyDto: $activationCompanyDto) {
      company {
        id
        email
        phone_number
        location
        company_name
        organized_year
        workers_number
        company_logo
        role
      }
    }
  }
`;

export const GET_LOGGED_COMPANY = gql`
  query {
    getLoggedCompany {
      company {
        id
        email
        phone_number
        location
        company_name
        organized_year
        workers_number
        company_logo
        role
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPasswordCompany($email: String!) {
    forgotPasswordCompany(forgotPasswordDto: { email: $email }) {
      message
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetCompanyPassword($resetPasswordDto: ResetPasswordDto!) {
    resetCompanyPassword(resetPasswordDto: $resetPasswordDto) {
      company {
        id
        email
        phone_number
        location
        company_name
        organized_year
        workers_number
        company_logo
        role
      }
    }
  }
`;

export const GET_VACANCIES = gql`
  query getVacansies($companyId: String!) {
    getVacansies(company_id: $companyId) {
      vacansies {
        position
        id
        company_id
        level
        hard_requirements
        soft_requirements
        work_start_hour
        work_end_hour
        description
        language_requirements
      }
    }
  }
`;

export const CREATE_VACANCY_MUTATION = gql`
  mutation CreateVacancy($createVacancyDto: CreateVacancyDto!) {
    createVacancy(createVacancyDto: $createVacancyDto) {
      message
    }
  }
`;
export const ADD_HARD_SKILL_TESTS_MUTATION = gql`
  mutation AddHardSkillTests($tests: AddHardSkillTestsDto!) {
    addHardSkillTests(tests: $tests) {
      message
    }
  }
`;

export const GET_VACANCIES_FOR_USERS = gql`
  query getVacansiesForUsers {
    getVacansiesForUsers {
      vacansies {
        position
        id
        company_id
        level
        hard_requirements
        soft_requirements
        work_start_hour
        work_end_hour
        description
        language_requirements
        createdAt
      }
    }
  }
`;

export const GET_VACANCIES_BY_POSITION = gql`
  query getVacansiesByPosition($position: String!) {
    getVacansiesByPosition(position: $position) {
      vacansies {
        position
        id
        company_id
        level
        hard_requirements
        soft_requirements
        work_start_hour
        work_end_hour
        description
        language_requirements
        createdAt
      }
    }
  }
`;

export const GET_ONE_VACANCY = gql`
  query getOneVacancy($vacancy_id: String!) {
    getOneVacancy(vacancy_id: $vacancy_id) {
      vacancy {
        position
        id
        company_id
        level
        hard_requirements
        soft_requirements
        work_start_hour
        work_end_hour
        description
        language_requirements
        createdAt
      }
      company {
        company_name
        company_logo
        company_description
        phone_number
        location
        workers_number
        organized_year
      }
    }
  }
`;

export const GET_SUBMITTED_CANDIDATES = gql`
  query getSubmittedCandidates($vacancyId: String!) {
    getSubmittedCandidates(vacancyId: $vacancyId) {
      candidates {
        fullName
        email
        id
        level
        profile_img
        skills
        position
      }
    }
  }
`;

export const GET_PASSED_TO_HARD_SKILLS = gql`
  query getPassedToHardSkills($vacancyId: String!) {
    getPassedToHardSkills(vacancyId: $vacancyId) {
      candidates {
        fullName
        email
        id
        level
        profile_img
        skills
        position
      }
    }
  }
`;

export const GET_PASSED_TO_SOFT_SKILLS = gql`
  query getPassedToSoftSkills($vacancyId: String!) {
    getPassedToSoftSkills(vacancyId: $vacancyId) {
      candidates {
        fullName
        email
        id
        level
        profile_img
        skills
        position
      }
    }
  }
`;

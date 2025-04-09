import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($registerDto: RegisterDto!) {
    registerUser(registerDto: $registerDto) {
      activation_token
    }
  }
`;

export const ACTIVATE_USER = gql`
  mutation ActivateUser($activationDto: ActivationDto!) {
    activateUser(activationDto: $activationDto) {
      user {
        fullName
        email
        id
        level
        profile_img
        skills
        position
        experience
        submitted_vacancies
        education
        certificates
        projects
        languages
        social_medias
        createdAt
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($loginDto: LoginDto!) {
    login(loginDto: $loginDto) {
      accessToken
      refreshToken
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query {
    getLoggedInUser {
      user {
        fullName
        email
        id
        level
        profile_img
        skills
        position
        experience
        submitted_vacancies
        education
        certificates
        projects
        createdAt
      }
    }
  }
`;

export const FORGOT_PASSWORD_USER = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(forgotPasswordDto: { email: $email }) {
      message
    }
  }
`;

export const RESET_PASSWORD_USER = gql`
  mutation resetPassword($resetPasswordDto: ResetPasswordDto!) {
    resetPassword(resetPasswordDto: $resetPasswordDto) {
      user {
        fullName
      }
    }
  }
`;

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation updateProfile($updateProfileDto: UpdateProfileDto!) {
    updateProfile(updateProfileDto: $updateProfileDto) {
      user {
        fullName
      }
    }
  }
`;

export const APPLY_VACANCY = gql`
  mutation applyVacancy($vacancyId: String!) {
    applyVacancy(vacancyId: $vacancyId) {
      message
    }
  }
`;

export const GET_HARD_SKILL_TESTS = gql`
  query getHardSkillTests($vacancyId: String!, $hardSkillToken: String!) {
    getHardSkillTests(vacancyId: $vacancyId, hardSkillToken: $hardSkillToken) {
      testItems {
        question
        options
        id
      }
    }
  }
`;

export const RESOLVE_HARD_SKILL_TESTS = gql`
  mutation ResolveHardSkillTests(
    $answersFromUser: [Float!]!
    $vacancyId: String!
  ) {
    resolveHardSkilltests(
      answersFromUser: $answersFromUser
      vacancyId: $vacancyId
    ) {
      message
    }
  }
`;

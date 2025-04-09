import { gql } from "@apollo/client";

export const GET_COMPANY_CHATS = gql`
  query GetCompanyChats($currentPersonId: String!) {
    getCompanyChats(currentPersonId: $currentPersonId) {
      companyChats {
        receiverId
        senderId
        person {
          fullName
          profile_img
        }
      }
    }
  }
`;

export const SEND_MESSAGE_AS_COMPANY = gql`
  mutation SendMessageAsCompany($sendMessageDto: SendMessageDto!) {
    sendMessageAsCompany(sendMessageDto: $sendMessageDto) {
      message
    }
  }
`;

export const GET_SELECTED = gql`
  query GetSelected($selectedId: String!) {
    getSelected(selectedId: $selectedId) {
      selected {
        position
        fullName
        profile_img
      }
    }
  }
`;

export const GET_CHAT_MESSAGES = gql`
  query GetChatMessages($senderId: String!, $receiverId: String!) {
    getChatMessages(senderId: $senderId, receiverId: $receiverId) {
      companyChats {
        senderId
        messageText
        receiverId
        id
        createdAt
        updatedAt
      }
    }
  }
`;

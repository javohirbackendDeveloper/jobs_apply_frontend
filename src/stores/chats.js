import { create } from "zustand";
import { client } from "../lib/apolloClient";
import {
  GET_CHAT_MESSAGES,
  GET_COMPANY_CHATS,
  GET_SELECTED,
  SEND_MESSAGE_AS_COMPANY,
} from "../queries/chatQueries";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const ChatsStore = create((set, get) => ({
  contacts: [],
  messages: [],

  async getContacts(currentPersonId) {
    const res = await client.query({
      query: GET_COMPANY_CHATS,
      variables: {
        currentPersonId,
      },
    });

    if (res.data?.getCompanyChats?.companyChats) {
      set({ contacts: res.data?.getCompanyChats?.companyChats });
    }
  },

  async sendMessageAsCompany(data) {
    console.log({ data });

    const res = await client.mutate({
      mutation: SEND_MESSAGE_AS_COMPANY,
      variables: {
        sendMessageDto: {
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.messageText,
        },
      },
    });

    if (res.data?.sendMessageAsCompany) {
      data.navigate("/chats");
    } else {
      toast.error("Error during send a message");
    }
  },

  // async getSelected(selectedId) {
  //   const res = await client.query({
  //     query: GET_SELECTED,
  //     variables: {
  //       selectedId,
  //     },
  //   });

  //   console.log({ res });

  //   // if (res.data?.getCompanyChats?.companyChats) {
  //   //   set({ contacts: res.data?.getCompanyChats?.companyChats });
  //   // }
  // },

  async getChatMessages(senderId, receiverId) {
    const res = await client.query({
      query: GET_CHAT_MESSAGES,
      variables: {
        senderId,
        receiverId,
      },
    });

    if (res.data?.getChatMessages?.companyChats) {
      set({ messages: res.data?.getChatMessages?.companyChats });
    }
  },
}));


import axios from "axios";

const API_BASE_URL = 'https://localhost:7190/api/Message';
const BASE_URL_PHOTOS = 'https://localhost:7190/';


export const messageService = {
  async getMessages(pageNo, itemsNo, loggedInUser) {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages?page=${pageNo}&items=${itemsNo}&userId=${loggedInUser}`);

      const { messages, totalCount } = response.data;

      const formattedMessages = messages.map(item => ({
        id: item.id,
        user: item.user,
        author: item.user ? item.user.firstName + ' ' + item.user.lastName : 'Unknown Author',
        messageText: item.messageText,
        imagePath: `${BASE_URL_PHOTOS}${item.imagePath}`,
        datePublished: item.datePublished
      }));

      return { messages: formattedMessages, totalCount };
    } catch (error) {
      throw new Error('Error in getting all messages');
    }
  },

  async getOwnMessages(pageNo, itemsNo, loggedInUser) {
    try {
      const response = await axios.get(`${API_BASE_URL}/own-messages?page=${pageNo}&items=${itemsNo}&userId=${loggedInUser}`);

      const { messages, totalCount } = response.data;

      const formattedMessages = messages.map(item => ({
        id: item.id,
        user: item.user,
        author: item.user ? item.user.firstName + ' ' + item.user.lastName : 'Unknown Author',
        messageText: item.messageText,
        imagePath: `${BASE_URL_PHOTOS}${item.imagePath}`,
        datePublished: item.datePublished
      }));

      return { messages: formattedMessages, totalCount };
    } catch (error) {
      throw new Error('Error in getting messages for userId', userId);
    }
  },

  async createMessage(userId, formData)
  {
      axios.post(`${API_BASE_URL}?userId=${userId}`, formData);    
  },

  async getImage() {
    try {
      const response = await axios.get(`${API_BASE_URL}/image`);      
      return response.data;
    } catch (error) {
      throw new Error('Error in getting all messages');
    }
  },

}

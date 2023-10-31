import axios from "axios";

const API_BASE_URL = 'https://localhost:7190/api/friend'; //Account/users?startingLetters=neaga&userId=1

export const friendService = {
  async getFriends(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}?Id=${userId}`);
      return response.data.map(item => ({
        id: item.id,
        name: item.firstName + ' ' + item.lastName
      }));
    } catch (error) {
      throw new Error('Error in getting the users');
    }
  },

  async userIsFriend(userId, friendId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/isFriend/${userId}/${friendId}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async addFriend(userId, friendId)
  {
    const response = await axios.post(`${API_BASE_URL}/addFriend/${userId}/${friendId}`);
    return response;
  },

  async removeFriend(userId, friendId)
  {
    const response = await axios.post(`${API_BASE_URL}/removeFriend/${userId}/${friendId}`);
    return response;
  }
}
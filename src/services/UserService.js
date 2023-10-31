import axios from "axios";

const API_BASE_URL = 'https://localhost:7190/api/account/users'; //Account/users?startingLetters=neaga&userId=1

export default {
  async getUsers(searchName, userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}?startingLetters=${searchName}&userId=${userId}`);
      return response.data.map(item => ({
        id: item.id,
        name: item.firstName + ' ' + item.lastName
      }));
    } catch (error) {
      throw new Error('Error in getting the users');
    }
  }
}
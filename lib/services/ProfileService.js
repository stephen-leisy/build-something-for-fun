const Profile = require('../models/Profile');
const getSimpsonsStuff = require('../utils/simpsons');

module.exports = class ProfileService {
  static async create({ name }) {
    const data = await getSimpsonsStuff();
    const quote = data.quote;
    const character = data.character;

    const userProfile = await Profile.insert({
      name,
      quote,
      character,
    });
    return userProfile;
  }

  static async getAllUsers() {
    const allUsers = await Profile.getUsers();
    return allUsers;
  }

  static async getOneUser(id) {
    const aUser = await Profile.getUser(id);
    return aUser;
  }

  static async changeOneUser(id, name) {
    const changedUser = await Profile.changeUser(id, name);
    return changedUser;
  }

  static async deleteAUser(id) {
    const deleteUser = await Profile.deletedUser(id);
    return deleteUser;
  }
};

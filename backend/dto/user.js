class UserDto {
  email;
  id;
  isVerified;

  constructor(user) {
    this.email = user.email
    this.id = user._id
    this.isVerified = user.isVerified
  }
}

module.exports = UserDto
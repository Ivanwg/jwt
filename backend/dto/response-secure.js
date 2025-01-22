class ResponseSecureDto {
  user;
  access;
  refreshToken;

  constructor(userData) {
    this.user = userData.user
    this.accessToken = userData.accessToken
    this.refreshToken = userData.refreshToken
  }

  getSecure() {
    return { user: this.user, accessToken: this.accessToken }
  }
}

module.exports = ResponseSecureDto
export class AuthServiceMock {
  async signIn(user: any): Promise<any> {
    return {
      token: Buffer.from(JSON.stringify({ emailId: user.emailId, id: user._id })).toString('base64'),
      tokenType: 'Bearer',
    };
  }
}

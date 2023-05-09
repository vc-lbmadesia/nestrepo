export class JwtServiceMock {
  signAsync(data) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }
}

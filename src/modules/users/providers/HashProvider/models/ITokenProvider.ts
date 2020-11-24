export interface ITokenProvider {
  generateToken(subject: string): string;
}

export default abstract class AccessToken {

  abstract generate(payload: any): any;
  abstract decode(token: string): any;
}

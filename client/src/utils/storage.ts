/**
 * LocalStorage wrap class
 *
 * @export
 * @class TokenStorage
 */
export default class TokenStorage {
  private static readonly LOCAL_STORAGE_TOKEN = 'token';

  /**
   * if return true means the user already login
   * if return false means the user doesn't login
   *
   * @static
   * @returns  {boolean}
   * @memberof TokenStorage
   */
  public static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * When user login success,storeToken will
   * save the token to LocalStorage
   *
   * @static
   * @param {string} token
   * @memberof TokenStorage
   */
  public static storeToken(token: string): void {
    localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
  }

  /**
   * get token from LocalStorage
   *
   * @static
   * @returns  {(string | null)}
   * @memberof TokenStorage
   */
  public static getToken(): string | null {
    return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
  }

  /**
   * Remove the token from localStorage
   *
   * @static
   * @memberof TokenStorage
   */
  public static clear(): void {
    localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
  }
}

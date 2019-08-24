
/**
 * username = loginName from db
 * act = access token from db
 */
export interface Payload {
  username: string;
  act: string;
  iat?: number;
  expiresIn?: string;
  role?: string;
}

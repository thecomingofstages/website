import { SignJWT, importPKCS8 } from "jose";
import ky from "ky";

// Simplify binding the env var to a typed object
export interface GoogleKey {
  private_key: string;
  client_email: string;
}

// Modifed from https://github.com/Schachte/cloudflare-google-auth to support multiple runtimes.
//
// GoogleOAuth encapsulates the logic required to retrieve an access token
// for the OAuth flow.
export default class GoogleAuth {
  constructor(
    public googleKey: GoogleKey,
    public scopes: string[]
  ) {}

  public async getGoogleAuthToken(): Promise<string | undefined> {
    const { client_email: user, private_key: key } = this.googleKey;

    try {
      const privateKey = await importPKCS8(key, "RS256");

      const signedJwt = await new SignJWT({
        scope: this.formatScopes(this.scopes),
      })
        .setProtectedHeader({ alg: "RS256" })
        .setIssuer(user)
        .setIssuedAt()
        .setExpirationTime("1h")
        .setAudience("https://oauth2.googleapis.com/token")
        .sign(privateKey);

      const response = await ky.post("https://oauth2.googleapis.com/token", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
          Host: "oauth2.googleapis.com",
        },
        searchParams: {
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: signedJwt,
        },
      });

      const resp = await response.json<{ access_token: string }>();
      return resp.access_token;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  // formatScopes will create a scopes string that is formatted for the Google API
  private formatScopes(scopes: string[]): string {
    return scopes.join(" ");
  }
}

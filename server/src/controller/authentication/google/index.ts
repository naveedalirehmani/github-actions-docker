import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

class GoogleOAuthHelper {
  async getOAuthTokens({ code }: { code: string }): Promise<any> {
    const url = 'https://oauth2.googleapis.com/token';

    const values = {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.OAUTH_GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    };

    const qs = new URLSearchParams(values);

    try {
      const response: AxiosResponse = await axios.post(url, qs.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error.response.data.error);
      console.error(error, 'Failed to fetch Google OAuth Tokens');
      throw new Error(error.message);
    }
  }

  async getGoogleUser({ id_token, access_token }: { id_token: string; access_token: string }): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error, 'Error fetching Google user');
      throw new Error(error.message);
    }
  }
}

const GoogleoAuthHelperClass = new GoogleOAuthHelper();

async function oAuthHandler(request: Request, response: Response): Promise<void> {
  const code: string = request.query.code as string;
  console.log({ code });

  try {
    const { id_token, access_token } = await GoogleoAuthHelperClass.getOAuthTokens({ code });
    console.log({ id_token, access_token });

    const googleUser = await GoogleoAuthHelperClass.getGoogleUser({
      id_token,
      access_token,
    });
    console.log({ googleUser });

    if (!googleUser.verified_email) {
      return response.status(403).send('Google account is not verified');
    }

    //! create a jwt accesstoken, refresh token and user session here. after this.

    //! before this.
    
    response.status(200).send('completed');
  } catch (error) {
    console.error(error, 'Failed to authorize Google user');
  }
}

async function loginHandler(request: Request, response: Response): Promise<void> {
  console.log('loginrequest');
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri: process.env.OAUTH_GOOGLE_REDIRECT_URI,
    client_id: process.env.CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  console.log({ qs });
  const consentScreenURI = `${rootUrl}?${qs.toString()}`;

  response.redirect(consentScreenURI);
}

export = {
  oAuthHandler,
  loginHandler,
};

import { Controller, Get, Query, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

@Controller('auth')
export class AuthController {
  private readonly clientId;
  private readonly clientSecret;
  private readonly redirectUri;
  private readonly state;
  private readonly scope;

  constructor() {
    this.clientId = process.env.CLIENT_ID;
    this.clientSecret = process.env.CLIENT_SECRET;
    this.redirectUri = process.env.REDIRECT_URI;
    this.state = process.env.STATE;
    this.scope = process.env.SCOPE;
  }

  @Get('/login')
  login(@Res() res: Response) {
    const spotifyApi = new SpotifyWebApi({
      redirectUri: this.redirectUri,
      clientId: this.clientId,
    });

    const authorizeURL = spotifyApi.createAuthorizeURL(this.scope, this.state);

    res.redirect(authorizeURL);
  }

  @Get('/callback')
  async callback(
    @Session() session: Record<string, any>,
    @Query('code') code: string,
  ) {
    const credentials = {
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      redirectUri: this.redirectUri,
    };

    const spotifyApi = new SpotifyWebApi(credentials);

    const responseToken = await spotifyApi.authorizationCodeGrant(code);

    if (responseToken.statusCode !== 200) {
      return {
        status: 'error',
        message: 'Error in responseToken',
      };
    }

    session.accessToken = responseToken.body.access_token;

    return {
      status: 'success',
      message: 'Successfully authenticated',
    };
  }

  @Get('/logout')
  logout(@Session() session: Record<string, any>) {
    session.destroy();

    return {
      status: 'success',
      message: 'Successfully logged out',
    };
  }
}

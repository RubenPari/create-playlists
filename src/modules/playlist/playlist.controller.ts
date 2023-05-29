import { Controller, Post, Query, Res, Session } from '@nestjs/common';
import SpotifyWebApi from 'spotify-web-api-node';
import { LibraryLib } from '../../lib/spotify/libraryLib';
import * as process from 'process';
import { UtilsLib } from '../../lib/spotify/utilsLib';
import { Response } from 'express';
import { PlaylistService } from '../../playlist/playlist.service';

@Controller('playlist')
export class PlaylistController {
  private readonly credentials;

  constructor(private playlistService: PlaylistService) {
    this.credentials = {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    };
  }

  /**
   * @description Create (overwrite
   * if not empty) a hip hop playlist
   * @param session
   * @param secondary - if true then
   * create with hip-hop artist NOT
   * following
   * @param res
   */
  @Post('/create/hip-hop')
  async createHipHopPlaylist(
    @Session() session: Record<string, any>,
    @Query('secondary') secondary: string,
    @Res() res: Response,
  ) {
    const client = new SpotifyWebApi(this.credentials);

    client.setAccessToken(session.accessToken);

    const libraryLib = new LibraryLib(client);

    const allTracks = await libraryLib.getSavedTracks();

    for (let i = 0; i < allTracks.length; i++) {
      // check if artist is in hip hop list
      if (
        this.playlistService.hipHopArtists.includes(
          allTracks[i].track.artists[0].id,
        ) == true
      ) {
        // get all tracks of artist and add to playlist
        const tracksArtist = await libraryLib.getSavedTracksByArtist(
          allTracks[i].track.artists[0].id,
        );

        // convert array of objects to array of ids
        const utilsLib = new UtilsLib(client);
        const tracksIdArtist = utilsLib.convertArrayObjectsToIds(tracksArtist);

        // add tracks to playlist
        const added = await libraryLib.addTracksToPlaylist(
          process.env.PLAYLIST_ID_HIP_HOP,
          tracksIdArtist,
        );

        if (!added) {
          res.status(500).send('Error adding tracks to playlist');
        }
      }
    }
    res.status(200).send('Hip hop playlist created');
  }

  @Post('/create/edm')
  async createEDMPlaylist(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    const client = new SpotifyWebApi(this.credentials);

    client.setAccessToken(session.accessToken);

    const libraryLib = new LibraryLib(client);

    const allTracks = await libraryLib.getSavedTracks();

    for (let i = 0; i < allTracks.length; i++) {
      // check if artist is in edm list
      if (
        this.playlistService.edmArtists.includes(
          allTracks[i].track.artists[0].id,
        ) == true
      ) {
        // get all tracks of artist and add to playlist
        const tracksArtist = await libraryLib.getSavedTracksByArtist(
          allTracks[i].track.artists[0].id,
        );

        // convert array of objects to array of ids
        const utilsLib = new UtilsLib(client);
        const tracksIdArtist = utilsLib.convertArrayObjectsToIds(tracksArtist);

        // add tracks to playlist
        const added = await libraryLib.addTracksToPlaylist(
          process.env.PLAYLIST_ID_EDM,
          tracksIdArtist,
        );

        if (!added) {
          res.status(500).send('Error adding tracks to playlist');
        }
      }
    }
    res.status(200).send('EDM playlist created');
  }
}

import SpotifyWebApi from 'spotify-web-api-node';

export class PlaylistLib {
  private client: SpotifyWebApi;

  constructor(client: SpotifyWebApi) {
    this.client = client;
  }

  /**
   * Get all tracks from a playlist
   */
  async getPlaylistTracks(playlistId: string) {
    const tracks: SpotifyApi.PlaylistTrackObject[] = [];
    let snapshotId: string;

    const limit = 50;
    let offset = 0;

    while (true) {
      const playlistTracks = await this.client.getPlaylistTracks(playlistId, {
        limit,
        offset,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      snapshotId = playlistTracks.body.snapshot_id;

      tracks.push(...playlistTracks.body.items);

      if (playlistTracks.body.next) {
        offset += limit;
      } else {
        break;
      }
    }

    return {
      tracks: tracks,
      snapshotId: snapshotId,
    };
  }

  /**
   * Delete all tracks from a playlist
   */
  async deleteAllTracksFromPlaylist(playlistId: string) {
    const { tracks, snapshotId } = await this.getPlaylistTracks(playlistId);

    const uris = tracks.map((track) => track.track.uri);

    const limit = 100;
    let offset = 0;

    while (true) {
      const deleteTracks = await this.client.removeTracksFromPlaylistByPosition(
        playlistId,
        uris.slice(offset, offset + limit).map(Number), // split array into chunks of 100 (from string to number)
        snapshotId,
      );

      if (deleteTracks.body.snapshot_id) {
        offset += limit;
      } else {
        break;
      }
    }

    return true;
  }
}

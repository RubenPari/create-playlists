import SpotifyWebApi from 'spotify-web-api-node';

export class LibraryLib {
  private client: SpotifyWebApi;

  constructor(client: SpotifyWebApi) {
    this.client = client;
  }

  /**
   * Get all user saved tracks
   */
  public async getSavedTracks() {
    const allTracks: SpotifyApi.SavedTrackObject[] = [];
    let offset = 0;
    const limit = 50;

    while (true) {
      const { body } = await this.client.getMySavedTracks({
        limit,
        offset,
      });

      if (body.items.length === 0) {
        break;
      }

      allTracks.push(...body.items);

      offset += limit;
    }

    return allTracks;
  }

  /**
   * Get all user saved tracks
   * of a specific artist
   */
  public async getSavedTracksByArtist(artistId: string) {
    const allTracks: SpotifyApi.SavedTrackObject[] = [];
    let offset = 0;
    const limit = 50;

    while (true) {
      const { body } = await this.client.getMySavedTracks({
        limit,
        offset,
      });

      if (body.items.length === 0) {
        break;
      }

      for (let i = 0; i < body.items.length; i++) {
        if (body.items[i].track.artists[0].id === artistId) {
          allTracks.push(body.items[i]);
        }
      }

      offset += limit;
    }

    return allTracks;
  }

  /**
   * Add tracks to a playlist
   */
  public async addTracksToPlaylist(
    playlistId: string,
    tracks: string[],
  ): Promise<boolean> {
    // call api method n times (for each call 100 tracks)
    const limit = 100;

    for (let i = 0; i < tracks.length; i += limit) {
      const added = await this.client.addTracksToPlaylist(
        playlistId,
        tracks.slice(i, i + limit),
      );

      if (added.body.snapshot_id === undefined) {
        return false;
      }
    }

    return true;
  }
}

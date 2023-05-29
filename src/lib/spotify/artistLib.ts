import SpotifyWebApi from 'spotify-web-api-node';

export class ArtistLib {
  private client: SpotifyWebApi;

  constructor(client: SpotifyWebApi) {
    this.client = client;
  }

  /**
   * Check if artist is a rapper
   */
  async checkIfIsRapper(artistId: string): Promise<boolean> {
    const artist = await this.client.getArtist(artistId);

    const genres = artist.body.genres;

    return genres.includes('rap') || genres.includes('hip hop');
  }
}

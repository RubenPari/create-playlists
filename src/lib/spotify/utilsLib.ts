import SpotifyWebApi from 'spotify-web-api-node';

export class UtilsLib {
  private client: SpotifyWebApi;

  constructor(client: SpotifyWebApi) {
    this.client = client;
  }

  /**
   * Convert an array of objects
   * (track, album, artist, etc.)
   * to an array of strings IDs
   */
  public convertArrayObjectsToIds(arrayObjects: any[]) {
    const arrayIds: string[] = [];

    for (let i = 0; i < arrayObjects.length; i++) {
      arrayIds.push(arrayObjects[i].id);
    }

    return arrayIds;
  }
}

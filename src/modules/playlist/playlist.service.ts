import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaylistService {
  public readonly hipHopArtists = [
    '4O15NlyKLIASxsJ0PrXPfz',
    '1Xyo4u8uXC1ZmMpatF05PJ',
    '1vyhD5VmyZ7KMfW5gqLgo5',
    '1uNFoZAHBGtllmzznpCI3s',
  ];

  public readonly edmArtists = [
    '1vCWHaC5f2uS3yhpwWbIA6',
    '1uNFoZAHBGtllmzznpCI3s',
    '1Xyo4u8uXC1ZmMpatF05PJ',
    '4O15NlyKLIASxsJ0PrXPfz',
  ];
}

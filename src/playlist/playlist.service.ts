import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaylistService {
  public hipHopArtists = [
    '06HL4z0CvFAxyc27GXpf02',
    '1Xyo4u8uXC1ZmMpatF05PJ',
    '1vyhD5VmyZ7KMfW5gqLgo5',
    '1uNFoZAHBGtllmzznpCI3s',
  ];

  public edmArtists = [
    '1uNFoZAHBGtllmzznpCI3s',
    '1Xyo4u8uXC1ZmMpatF05PJ',
    '06HL4z0CvFAxyc27GXpf02',
    '1vyhD5VmyZ7KMfW5gqLgo5',
  ];
}

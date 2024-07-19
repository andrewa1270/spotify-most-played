export type Token = {
  access_token : string,
  expires_in: Number,
  refresh_token: string,
  scope: string,
  token_type: string
  start_time: Date
}

export type TopTracksEndpoint = {
  href: string,
  items: TrackMetaData[] | any[],
  limit: number,
  next: string | null,
  offset: number,
  previous: string | null,
  total: number
}

export type TrackMetaData = {
  /**
   * TODO
   */
} 

export type HeaderOptions = 'pie'| 'lastMonth' | 'lastSixMonths' | 'lastYear' | 'home'

export interface TrackInfo {
  items:    TrackMetadata[];
  total:    number;
  limit:    number;
  offset:   number;
  href:     string;
  next:     string;
  previous: null;
}

export interface TrackMetadata {
  album:             Album;
  artists:           ArtistInfo[];
  available_markets: string[];
  disc_number:       number;
  duration_ms:       number;
  explicit:          boolean;
  external_ids:      ExternalIDS;
  external_urls:     ExternalUrls;
  href:              string;
  id:                string;
  is_local:          boolean;
  name:              string;
  popularity:        number;
  preview_url:       string;
  track_number:      number;
  type:              ItemType;
  uri:               string;
}

export interface Album {
  album_type:             AlbumType;
  artists:                ArtistInfo[];
  available_markets:      string[];
  external_urls:          ExternalUrls;
  href:                   string;
  id:                     string;
  images:                 Image[];
  name:                   string;
  release_date:           Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks:           number;
  type:                   AlbumTypeEnum;
  uri:                    string;
}

export enum AlbumType {
  Album = "ALBUM",
  Ep = "EP",
  Single = "SINGLE",
}

export interface ArtistInfo {
  external_urls: ExternalUrls;
  href:          string;
  id:            string;
  name:          string;
  type:          ArtistType;
  uri:           string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = "artist",
}

export interface Image {
  height: number;
  url:    string;
  width:  number;
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export enum AlbumTypeEnum {
  Album = "album",
}

export interface ExternalIDS {
  isrc: string;
}

export enum ItemType {
  Track = "track",
}

export type DataPoint = {
  y: number;
  name: string;
}
export interface ArtistInfo {
  items:    ArtistMetadata[];
  total:    number;
  limit:    number;
  offset:   number;
  href:     string;
  next:     string;
  previous: null;
}

export interface ArtistMetadata {
  external_urls: ExternalUrls;
  followers:     Followers;
  genres:        string[];
  href:          string;
  id:            string;
  images:        Image[];
  name:          string;
  popularity:    number;
  type:          Type;
  uri:           string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href:  null;
  total: number;
}

export interface Image {
  height: number;
  url:    string;
  width:  number;
}

export enum Type {
  Artist = "artist",
}

export type GenreWeighting = {
  name: string;
  count: number;
}
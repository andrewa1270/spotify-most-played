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
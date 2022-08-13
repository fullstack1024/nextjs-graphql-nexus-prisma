export interface getFeedQuery_feedings {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author: {
    id: number;
    name: string;
    __typename: 'User'
  }
  __typename: 'Post'
}

export interface getFeedQuery {
  feed: getFeedQuery_feedings[]
}

export type Profile = {
  name: string;
  email: string;
  banner?: string;
  avatar?: string;
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
};

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media: string | null;
  created: Date;
  count: { comments: number; reactions: number };
}

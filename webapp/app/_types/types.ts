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
//
// export interface Post {
//   id: number;
//   title: string;
//   body: string;
//   tags: string[];
//   media: string | null;
//   created: Date;
//   count: { comments: number; reactions: number };
// }

export type Post = {
  title: string;
  body: string;
  tags: string[];
  media: string | null;
  reactions: any[]; // You can define a type for reactions if needed
  comments: any[]; // You can define a type for comments if needed
  created: string; // Assuming it's a date string in ISO format
  updated: string; // Assuming it's a date string in ISO format
  id: number;
  author: {
    name: string;
    email: string;
    avatar: string | null;
    banner: string | null;
  };
  _count: {
    comments: number;
    reactions: number;
  };
};

import { omit } from "next/dist/shared/lib/router/utils/omit";

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

export interface ProfilePost {
  title: string;
  body: string;
  tags: string[];
  media: string;
  created: string;
  updated: string;
  id: number;
  _count: {
    comments: number;
    reactions: number;
  };
}

export interface EditableProfilePost {
  title: string;
  body: string;
  tags: string[];
  updated: string;
}

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

export interface BodyPost {
  title: string;
  body: string;
  tags: string[];
  media: string;
}

export interface UserProfile {
  name: string;
  email: string;
  banner: string | null;
  avatar: string | null;
  followers: Follower[];
  following: Following[];
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}

interface Follower {
  name: string;
  avatar: string | null;
}

interface Following {
  name: string;
  avatar: string | null;
}

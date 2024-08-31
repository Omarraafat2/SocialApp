
export interface User {
    _id: string;
    name: string;
    photo?: string;
  }
  
  export interface Comment {
    _id: string;
    content: string;
    commentCreator: User;
  }
  
  export interface Post {
    _id: string;
    body: string;
    image?: string;
    createdAt: string;
    user: User;
    comments: Comment[];
  }
  
  export interface PostProfile {
    id: number;
    content: string;
    timestamp: string;
  }
  export interface UserPostsQueryArgs {
  id: string;
  limit?: number;
}

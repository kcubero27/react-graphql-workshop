import { Post } from "../../domains/post";

export interface Variables {
    title: string;
    description: string;
    imageUls: string;
}

export interface Data {
    createPost: Post;
}

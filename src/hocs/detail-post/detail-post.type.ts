import { Post } from "../../domains/post";

export interface Variables {
    id: string;
}

export interface Data {
    post: Post;
}

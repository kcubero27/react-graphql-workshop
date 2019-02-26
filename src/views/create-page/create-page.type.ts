export interface State {
    title: string;
    description: string;
    imageUrl: string;
}

export type KeyState = Pick<State, "title" | "description" | "imageUrl">;

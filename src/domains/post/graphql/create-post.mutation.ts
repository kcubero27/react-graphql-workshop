import gql from "graphql-tag";

export const CREATE_POST_MUTATION = gql`
    mutation createPost($description: String!, $title: String!, $imageUrl: String!) {
        createPost(description: $description, title: $title, imageUrl: $imageUrl) {
            id
            title
            description
            imageUrl
            createdAt
            updatedAt
        }
    }
`;

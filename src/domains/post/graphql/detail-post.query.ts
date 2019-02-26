import gql from "graphql-tag";

export const DETAIL_POST_QUERY = gql`
    query PostQuery($id: ID!) {
        post: Post(id: $id) {
            id
            title
            description
            imageUrl
            createdAt
            updatedAt
        }
    }
`;

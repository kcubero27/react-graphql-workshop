import gql from "graphql-tag";

export const ALL_POSTS_QUERY = gql`
    query allPosts {
        allPosts(orderBy: createdAt_DESC) {
            id
            title
            description
            imageUrl
            createdAt
            updatedAt
        }
    }
`;

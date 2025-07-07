export interface Tag {
    id: string;
    name: string;
}

export interface Author {
    name: string;
    image: string;
}

export interface Post {
    id: string;
    title: string;
    image: string;
    description: string;
    slug: string;
    authorId: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
    published: boolean;
    author: Author;
    tags: Tag[];
}

export interface PostsResponse {
    posts: Post[];
    pagination: {
        page: number;
        limit: number;
        totalPages: number;
        totalPosts: number;
        nextPage: number;
        prevPage: number | null;
};
}

export interface Gossip {
    id: string;
    content: {
        title: string;
        created: string;
        description: string;
    }
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    author: Author;
}

export interface GossipsResponse {
    contents: Gossip[];
    pagination: {
        page: number;
        limit: number;
        totalPages: number;
        totalContents: number;
        nextPage: number | null;
        prevPage: number | null;
    };
}



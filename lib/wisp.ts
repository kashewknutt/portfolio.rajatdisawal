import {
  buildWispClient,
  GetPostsResult,
  GetPostResult,
} from "@wisp-cms/client";

export const wisp = buildWispClient({
    baseUrl: "http://localhost:3000",
    blogId: "cm6ycbjdr0000bxdsztqwk1zh",
});

export type { GetPostsResult, GetPostResult };

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = () => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read mardown file as a string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // use gray-matter to parse the post metatdata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return { id, ...matterResult.data };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
};

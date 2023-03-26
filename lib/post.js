import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const files = path.join(process.cwd(), "public", "files");


function getDirectory(str="blog"){
  const postsDirectory=path.join(process.cwd(), "posts",str)
  return  postsDirectory
}

export function getTextData() {
  const fileNames = fs.readdirSync(files);
  const textData = fileNames.map((fileName) => {
    const fullPath = path.join(files, fileName);
    const eachData = fs.readFileSync(fullPath, "utf8");
    return eachData;
  });
  const data = textData[0].split(/\d+\.\s/).filter(Boolean);
  return data;
}

export function getSortedPostsData(str) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(getDirectory(str));
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(getDirectory(str), fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
//从filesystem获取数据
export function getAllPostIds(str) {
  const fileNames = fs.readdirSync(getDirectory(str));

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  /*当动态路径为多层时:a/b/c且static的path为params.id will be like ['a', 'b', 'c']
  return [
  {
    params: {
      Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c'],
    },
  },
  ...
];
  */
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
//从外部endpoint获取数据
// export async function getAllPostIds() {
//     // Instead of the file system,
//     // fetch post data from an external API endpoint
//     const res = await fetch('..');
//     const posts = await res.json();
//     return posts.map((post) => {
//       return {
//         params: {
//           id: post.id,
//         },
//       };
//     });
//   }
export async function getPostData(id,str) {
  
  const fullPath = path.join(getDirectory(str), `${id}.md`);
  
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

// app/page.tsx
import Link from "next/link";

export default async function Home() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json());

  return (
    <main style={{ padding: "20px" }}>
      <h1>Welcome to AWS Amplify + Next.js (App Router)</h1>
      <ul>
        {posts.slice(0, 10).map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

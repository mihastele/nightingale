import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api';

export default function BlogList() {
    const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest('/blog')
      .then((data) => setPosts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
            {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Blog</h1>
            <Link to="/blog/new" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">New Post</Link>
          </div>

          <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-6">
            <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Published on {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-700">
              {post.excerpt}
            </p>
            <div className="mt-3">
              <Link 
                to={`/blog/${post.id}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
              </div>
      </>
      )}
    </div>
  );
}

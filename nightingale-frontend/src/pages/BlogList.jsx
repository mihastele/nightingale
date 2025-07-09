export default function BlogList() {
  // This would normally come from an API
  const posts = [
    { id: 1, title: 'My First Blog Post', excerpt: 'This is a preview of my first blog post...', date: '2023-07-09' },
    { id: 2, title: 'Another Blog Post', excerpt: 'Here\'s another interesting post...', date: '2023-07-08' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <a href="/blog/new" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">New Post</a>
      </div>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-6">
            <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Published on {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-700">
              {post.excerpt}
            </p>
            <div className="mt-3">
              <a 
                href={`/blog/${post.id}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

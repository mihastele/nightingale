import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiRequest } from '../api';
import BlogBuilder from '../components/BlogBuilder';

export default function BlogEdit() {
    const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [title, setTitle] = useState('');
  const [layout, setLayout] = useState([]);

  // Fetch existing blog post when editing
  useEffect(() => {
    if (!isNew) {
      apiRequest(`/blog/${id}`)
        .then((data) => {
          setTitle(data.title);
          try {
            const parsed = JSON.parse(data.content);
            setLayout(parsed);
          } catch {
            setLayout([]);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [id, isNew]);

  async function handleSubmit() {
    const payload = {
      title,
      content: JSON.stringify(layout),
      // TODO: replace this placeholder with the authenticated user's ID once auth context is wired in
      author_id: '00000000-0000-0000-0000-000000000000',
    };

    try {
      if (isNew) {
        await apiRequest('/blog', 'POST', payload);
      } else {
        await apiRequest(`/blog/${id}`, 'PUT', payload);
      }
      navigate('/blog');
    } catch (err) {
      alert('Failed to save post');
      console.error(err);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
            <h1 className="text-3xl font-bold">
        {isNew ? 'New Blog Post' : 'Edit Post'}
      </h1>

      <div className="space-y-4">
                <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
          />
        </div>

        {/* Blog Builder Component */}
        <BlogBuilder value={layout} onChange={setLayout} />
        
                <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isNew ? 'Publish' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useParams } from 'react-router-dom';

export default function BlogEdit() {
  const { id } = useParams();
  const isNew = id === 'new';
  
  // This would normally come from an API
  const post = isNew 
    ? { title: '', content: '' }
    : { 
        id: 1, 
        title: 'My First Blog Post', 
        content: 'This is the full content of the blog post...',
        date: '2023-07-09'
      };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        {isNew ? 'New Blog Post' : 'Edit Post'}
      </h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            defaultValue={post.title}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter post title"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            rows={12}
            defaultValue={post.content}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your post content here..."
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {isNew ? 'Publish' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}

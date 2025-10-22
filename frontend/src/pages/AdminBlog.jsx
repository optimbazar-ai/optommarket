import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Eye, EyeOff, Sparkles, Loader2 } from 'lucide-react'
import { adminAPI } from '../services/api'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [error, setError] = useState('')
  const [generating, setGenerating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    category: 'General',
    tags: '',
    metaDescription: ''
  })

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    try {
      const response = await adminAPI.getBlogPosts()
      setBlogs(response.data)
    } catch (err) {
      console.error('Error loading blogs:', err)
      setError('Blog postlarni yuklashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (value) => {
    setFormData(prev => ({ ...prev, content: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      }

      if (editingBlog) {
        await adminAPI.updateBlogPost(editingBlog._id, data)
      } else {
        await adminAPI.createBlogPost(data)
      }
      
      await loadBlogs()
      closeModal()
    } catch (err) {
      console.error('Error saving blog:', err)
      setError(err.message || 'Blog postni saqlashda xatolik')
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      image: blog.image || '',
      category: blog.category || 'General',
      tags: blog.tags?.join(', ') || '',
      metaDescription: blog.metaDescription || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Blog postni o\'chirishni tasdiqlaysizmi?')) return

    try {
      await adminAPI.deleteBlogPost(id)
      await loadBlogs()
    } catch (err) {
      console.error('Error deleting blog:', err)
      alert('Blog postni o\'chirishda xatolik')
    }
  }

  const togglePublish = async (blog) => {
    try {
      await adminAPI.publishBlogPost(blog._id, !blog.published)
      await loadBlogs()
    } catch (err) {
      console.error('Error toggling publish:', err)
      alert('Statusni o\'zgartirishda xatolik')
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingBlog(null)
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      image: '',
      category: 'General',
      tags: '',
      metaDescription: ''
    })
    setError('')
  }

  const handleGenerateAI = async () => {
    if (!confirm('AI tomonidan 5 ta blog post yaratiladi va avtomatik nashr qilinadi. Davom etasizmi?')) return

    setGenerating(true)
    setError('')

    try {
      const response = await adminAPI.generateBlogPosts()
      alert(`✅ ${response.data.length} ta blog post muvaffaqiyatli yaratildi va nashr qilindi!`)
      await loadBlogs()
    } catch (err) {
      console.error('Error generating blogs:', err)
      setError(err.response?.data?.message || 'AI blog generation xatolik')
      alert('❌ AI blog generation xatolik: ' + (err.response?.data?.message || err.message))
    } finally {
      setGenerating(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('uz-UZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Blog Postlar</h1>
        <div className="flex gap-3">
          <button
            onClick={handleGenerateAI}
            disabled={generating}
            className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 flex items-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                AI yaratmoqda...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                AI Blog Yaratish
              </>
            )}
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Yangi Post
          </button>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Post</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kategoriya</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ko'rishlar</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Holat</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sana</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {blog.image && (
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{blog.title}</p>
                        {blog.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-1">{blog.excerpt}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{blog.category}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{blog.views || 0}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => togglePublish(blog)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        blog.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {blog.published ? (
                        <>
                          <Eye className="w-3 h-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Blog postlar yo'q</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full my-8">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">
                {editingBlog ? 'Blog Postni tahrirlash' : 'Yangi Blog Post'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sarlavha *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qisqacha mazmun
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="input"
                  rows="2"
                  maxLength="200"
                  placeholder="200 belgigacha"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matn *
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'color': [] }, { 'background': [] }],
                      ['link', 'image'],
                      ['clean']
                    ]
                  }}
                  className="bg-white"
                  style={{ height: '300px', marginBottom: '50px' }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategoriya
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rasm URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teglar (vergul bilan ajratilgan)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="input"
                  placeholder="texnologiya, biznes, marketing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description (SEO)
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  className="input"
                  rows="2"
                  maxLength="160"
                  placeholder="160 belgigacha"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" className="btn btn-primary flex-1">
                  {editingBlog ? 'Saqlash' : 'Yaratish'}
                </button>
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBlog

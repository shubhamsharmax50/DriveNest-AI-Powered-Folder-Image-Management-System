import { useState, useEffect, useRef } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Folder as FolderIcon, Image as ImageIcon, Sparkles, Upload, Plus, LogOut, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [parentFolderId, setParentFolderId] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: null, name: 'My Drive' }]);
  
  const [aiPrompt, setAiPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const fetchData = async (folderId = null) => {
    try {
      const folderRes = await api.get(`/folders?parentFolderId=${folderId || ''}`);
      const imgRes = await api.get(`/images?folderId=${folderId || ''}`);
      setFolders(folderRes.data);
      setImages(imgRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(parentFolderId);
  }, [parentFolderId]);

  const handleCreateFolder = async () => {
    const name = window.prompt("Folder Name:");
    if (!name) return;
    try {
      await api.post('/folders', { name, parentFolderId });
      fetchData(parentFolderId);
    } catch (err) { console.error(err); }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    if (parentFolderId) formData.append('folderId', parentFolderId);

    setLoading(true);
    try {
      await api.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchData(parentFolderId);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const navigateToFolder = (folder) => {
    setParentFolderId(folder._id);
    setBreadcrumbs([...breadcrumbs, { id: folder._id, name: folder.name }]);
  };

  const navigateToBreadcrumb = (crumb, idx) => {
    setParentFolderId(crumb.id);
    setBreadcrumbs(breadcrumbs.slice(0, idx + 1));
  };

  const handleAiAction = async (e) => {
    e.preventDefault();
    if (!aiPrompt) return;
    setLoading(true);
    try {
      const { data } = await api.post('/ai/prompt', { prompt: aiPrompt });
      alert(data.msg || 'AI Action Completed');
      fetchData(parentFolderId);
      setAiPrompt('');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col p-4">
        <h1 className="text-2xl font-bold tracking-tight mb-8">Drive<span className="text-blue-500">Nest</span></h1>
        
        <button onClick={handleCreateFolder} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded text-sm font-semibold transition-colors mb-4">
          <Plus size={18} /> New Folder
        </button>
        
        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 border border-gray-600 hover:bg-gray-700 px-4 py-2.5 rounded text-sm font-semibold transition-colors mb-8">
          <Upload size={18} /> Upload Image
        </button>
        <input type="file" ref={fileInputRef} onChange={handleUploadImage} className="hidden" accept="image/*" />

        <div className="mt-auto">
           <form onSubmit={handleAiAction} className="relative mb-4">
             <input type="text" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Ask AI (e.g. Create folder x)" className="w-full bg-gray-900 border border-gray-700 p-3 pr-10 rounded text-sm focus:outline-none focus:border-blue-500" />
             <button type="submit" disabled={loading} className="absolute right-2 top-2.5 text-blue-500 hover:text-blue-400">
               <Sparkles size={18} className={loading ? "animate-pulse" : ""} />
             </button>
           </form>
           <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white w-full text-sm">
             <LogOut size={16} /> Logout ({user.name})
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Breadcrumbs */}
        <div className="h-16 border-b border-gray-800 flex items-center px-6">
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center text-gray-300">
              {idx > 0 && <ChevronRight size={16} className="mx-2 text-gray-600" />}
              <span onClick={() => navigateToBreadcrumb(crumb, idx)} className="cursor-pointer hover:text-blue-400 transition-colors font-medium">
                {crumb.name}
              </span>
            </span>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 bg-gray-900">
          {folders.length === 0 && images.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FolderIcon size={48} className="mb-4 opacity-50" />
              <p>This folder is empty</p>
            </div>
          )}

          {/* Folders */}
          {folders.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Folders</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {folders.map(folder => (
                  <div key={folder._id} onDoubleClick={() => navigateToFolder(folder)} className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors group">
                    <FolderIcon className="text-blue-500" size={24} />
                    <span className="font-medium truncate group-hover:text-blue-400">{folder.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Images */}
          {images.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {images.map(img => (
                  <div key={img._id} className="relative group rounded-lg overflow-hidden border border-gray-800 bg-gray-800 aspect-square">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                       <span className="text-xs truncate text-white">{img.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react'
import {
  UploadCloud,
  Search,
  Filter,
  Copy,
  Check,
  Trash2,
  X,
  Play,
  Film,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react'
import { adminStorage, type MediaItem } from '@services/adminStorage.ts'

export function AdminMediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMediaItems(adminStorage.getMediaItems())
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path)
    setCopied(true)
    showToast(`Copied path: ${path}`)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Remove "${title}" from Media Library?`)) {
      adminStorage.deleteMediaItem(id)
      setMediaItems(adminStorage.getMediaItems())
      if (selectedMedia?.id === id) setSelectedMedia(null)
      showToast(`Removed "${title}".`)
    }
  }

  // Handle local file uploads (supports images and videos)
  const handleProcessFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      const isVideo = file.type.startsWith('video/')
      const isImage = file.type.startsWith('image/')

      if (!isVideo && !isImage) {
        showToast(`Unsupported file type: ${file.name}`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        const sizeFormatted =
          file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${Math.round(file.size / 1024)} KB`

        const newItem: MediaItem = {
          id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          url: dataUrl,
          type: isVideo ? 'video' : 'image',
          format: file.type || (isVideo ? 'video/mp4' : 'image/jpeg'),
          size: sizeFormatted,
          uploadedAt: new Date().toISOString().slice(0, 10),
          dimensions: isVideo ? '1080 × 1920' : 'High Resolution',
          alt: file.name,
        }

        adminStorage.addMediaItem(newItem)
        setMediaItems(adminStorage.getMediaItems())
        showToast(`Uploaded "${file.name}" to Media Library!`)
      }

      reader.readAsDataURL(file)
    })
  }

  const filteredMedia = mediaItems.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <div className="space-y-6 max-w-7xl">
      {/* ── Top Bar ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E31] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading text-xs font-bold text-accent uppercase tracking-wider">
              WordPress-Style Media System
            </span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-text-primary">
            Media Library ({mediaItems.length})
          </h2>
          <p className="font-body text-xs text-text-secondary mt-0.5">
            Upload new video reels and visual graphics, inspect asset dimensions, or copy paths for portfolio projects.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleProcessFiles(e.target.files)}
            multiple
            accept="image/*,video/mp4"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 bg-accent text-background px-4 py-2 font-body text-xs font-semibold hover:bg-accent/90 transition-colors shadow-sm"
          >
            <UploadCloud size={15} />
            <span>Upload New Media</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-accent/15 border border-accent text-accent font-body text-xs flex items-center gap-2">
          <CheckCircle2 size={14} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Drag & Drop Upload Zone ────────────────────────────────────────── */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleProcessFiles(e.dataTransfer.files)
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`p-8 border-2 border-dashed transition-all duration-200 cursor-pointer text-center ${
          isDragging
            ? 'border-accent bg-accent/10'
            : 'border-[#2A2E31] bg-[#16181A] hover:border-text-secondary'
        }`}
      >
        <div className="w-12 h-12 mx-auto mb-3 border border-[#2E3337] bg-[#111315] flex items-center justify-center text-accent">
          <UploadCloud size={20} />
        </div>
        <h4 className="font-heading text-sm font-bold text-text-primary">
          Drop video or image files here to upload
        </h4>
        <p className="mt-1 font-body text-xs text-text-secondary">
          Supports MP4 commercial reels, WebP, JPG, and PNG graphics. Maximum recommended file size: 50MB.
        </p>
      </div>

      {/* ── Filter Bar & Search ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 border border-[#2A2E31] bg-[#16181A]">
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-text-secondary" />
          <div className="flex gap-1">
            {(['all', 'image', 'video'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 font-body text-xs uppercase tracking-wider transition-colors ${
                  filterType === t
                    ? 'bg-accent text-background font-semibold'
                    : 'bg-[#111315] text-text-secondary hover:text-text-primary border border-[#2A2E31]'
                }`}
              >
                {t === 'all' ? 'All Media' : t === 'image' ? 'Images' : 'Videos'}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-w-[220px]">
          <Search size={14} className="absolute left-3 top-2.5 text-text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media by title..."
            className="w-full bg-[#111315] border border-[#2A2E31] pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* ── Media Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            className="border border-[#2A2E31] bg-[#16181A] hover:border-accent/60 transition-all cursor-pointer group flex flex-col justify-between overflow-hidden"
          >
            {/* Preview Box */}
            <div className="relative aspect-square bg-[#111315] overflow-hidden flex items-center justify-center">
              {item.type === 'video' ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#181B1D] text-text-secondary group-hover:text-accent transition-colors relative">
                  <Film size={28} />
                  <span className="mt-2 text-[10px] font-heading font-bold uppercase tracking-wider">
                    Video (MP4)
                  </span>
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center text-accent">
                    <Play size={10} />
                  </div>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              )}
            </div>

            {/* Title & Metadata */}
            <div className="p-3 border-t border-[#202326]">
              <h5 className="font-heading text-xs font-bold text-text-primary truncate group-hover:text-accent transition-colors">
                {item.title}
              </h5>
              <div className="flex items-center justify-between text-[10px] text-text-secondary mt-1">
                <span>{item.format}</span>
                <span>{item.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Media Inspector Modal ──────────────────────────────────────────── */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 bg-background/85 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-2xl bg-[#16181A] border border-[#2A2E31] shadow-2xl flex flex-col overflow-hidden z-10">
            {/* Header */}
            <div className="p-5 border-b border-[#2A2E31] bg-[#121415] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedMedia.type === 'video' ? (
                  <Film size={16} className="text-accent" />
                ) : (
                  <ImageIcon size={16} className="text-accent" />
                )}
                <h3 className="font-heading text-sm font-bold text-text-primary truncate max-w-md">
                  {selectedMedia.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMedia(null)}
                className="w-7 h-7 border border-[#2A2E31] flex items-center justify-center text-text-secondary hover:text-text-primary"
              >
                <X size={15} />
              </button>
            </div>

            {/* Preview & Details Body */}
            <div className="p-6 space-y-5">
              {/* Media Preview Box */}
              <div className="bg-[#111315] border border-[#2A2E31] p-2 flex items-center justify-center max-h-72 overflow-hidden">
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    className="max-h-64 object-contain"
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    className="max-h-64 object-contain"
                  />
                )}
              </div>

              {/* File Metadata Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#111315] p-4 border border-[#262A2E]">
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">
                    File Type
                  </span>
                  <span className="font-semibold text-text-primary mt-0.5 block">
                    {selectedMedia.format}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">
                    File Size
                  </span>
                  <span className="font-semibold text-text-primary mt-0.5 block">
                    {selectedMedia.size}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">
                    Dimensions
                  </span>
                  <span className="font-semibold text-text-primary mt-0.5 block">
                    {selectedMedia.dimensions || 'Standard'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">
                    Upload Date
                  </span>
                  <span className="font-semibold text-text-primary mt-0.5 block">
                    {selectedMedia.uploadedAt}
                  </span>
                </div>
              </div>

              {/* Media URL / Path with Copy Button */}
              <div>
                <label className="text-[11px] text-text-secondary uppercase tracking-wider block mb-1">
                  Media Path (Copy to Project or Article)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedMedia.url}
                    className="flex-1 bg-[#111315] border border-[#262A2E] px-3 py-2 text-xs text-text-primary font-mono focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopyPath(selectedMedia.url)}
                    className="inline-flex items-center gap-1.5 bg-accent text-background px-4 py-2 text-xs font-semibold hover:bg-accent/90 transition-colors shrink-0"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy Path'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#2A2E31] bg-[#121415] flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedMedia.id, selectedMedia.title)}
                className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline"
              >
                <Trash2 size={13} />
                <span>Delete Asset</span>
              </button>

              <button
                onClick={() => setSelectedMedia(null)}
                className="px-4 py-1.5 bg-[#1F2326] border border-[#2E3337] text-xs text-text-secondary hover:text-text-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Upload, Eye, EyeOff, LogOut, AlertCircle, Compress } from "lucide-react"
import Image from "next/image"
import { Event } from "@/types/event"
import { compressImages, formatFileSize, getTotalFileSize } from "@/lib/imageCompression"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    attendees: 0,
  })
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Check if user is already authenticated
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken')
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch events when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents()
    }
  }, [isAuthenticated])

  const handleLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setToken(data.token)
        localStorage.setItem('adminToken', data.token)
        setIsAuthenticated(true)
        setEmail("")
        setPassword("")
        fetchEvents()
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
    setEvents([])
  }

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      
      if (data.success) {
        setEvents(data.data)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    setError("")
    
    try {
      // Convert FileList to Array
      const fileArray = Array.from(files)
      
      // Show compression info
      const originalSize = getTotalFileSize(fileArray)
      console.log(`Original total size: ${formatFileSize(originalSize)}`)
      
      // Compress images before upload with more aggressive settings
      const compressedFiles = await compressImages(fileArray, {
        maxWidth: 1200,
        maxHeight: 800,
        quality: 0.6,
        maxFileSize: 2 * 1024 * 1024 // 2MB per file
      })
      
      // Check if any files are still too large after compression
      const oversizedFiles = compressedFiles.filter(file => file.size > 5 * 1024 * 1024)
      if (oversizedFiles.length > 0) {
        setError(`Some images are still too large after compression: ${oversizedFiles.map(f => f.name).join(', ')}. Please try with fewer images or smaller files.`)
        return
      }
      
      const compressedSize = getTotalFileSize(compressedFiles)
      console.log(`Compressed total size: ${formatFileSize(compressedSize)}`)
      
      // Show compression results
      if (originalSize > compressedSize) {
        const saved = ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
        console.log(`Saved ${saved}% in file size`)
      }
      
      const formData = new FormData()
      compressedFiles.forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error('Failed to parse response:', parseError)
        if (response.status === 413) {
          setError('Files are too large even after compression. Please try with fewer or smaller images.')
        } else {
          setError('Upload failed. Please try again.')
        }
        return
      }

      if (data.success) {
        setUploadedImages(prev => [...prev, ...data.data])
        setError("") // Clear any previous errors
      } else {
        setError(data.message || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError('Upload failed. Please try again.')
      }
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location) {
      setError('All fields are required')
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const eventData = {
        ...newEvent,
        images: uploadedImages,
      }

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      })

      const data = await response.json()

      if (data.success) {
        setNewEvent({
          title: "",
          description: "",
          date: "",
          location: "",
          attendees: 0,
        })
        setUploadedImages([])
        fetchEvents()
      } else {
        setError(data.message || 'Failed to create event')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        fetchEvents()
      } else {
        setError(data.message || 'Failed to delete event')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={handleLogin} 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md mb-6">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-600">{error}</span>
          </div>
        )}

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">Manage Events</TabsTrigger>
            <TabsTrigger value="add-event">Add New Event</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Events ({events.length})</CardTitle>
                <CardDescription>Manage your existing events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No events found. Create your first event!</p>
                  ) : (
                    events.map((event) => (
                      <div key={event._id} className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{event.description}</p>
                          <div className="text-sm text-gray-500">
                            <span>
                              {formatDate(event.date)} • {event.location} • {event.attendees} attendees
                            </span>
                          </div>
                          {event.images && event.images.length > 0 && (
                            <div className="mt-2 text-xs text-gray-400">
                              {event.images.length} image(s)
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleDeleteEvent(event._id!)} 
                            size="sm" 
                            variant="destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-event">
            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
                <CardDescription>Create a new event for the IEEE ISIMM Student Branch</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Enter event description"
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Enter event location"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attendees">Number of Attendees</Label>
                  <Input
                    id="attendees"
                    type="number"
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent({ ...newEvent, attendees: Number.parseInt(e.target.value) || 0 })}
                    placeholder="Enter number of attendees"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Event Images</Label>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={image}
                          alt={`Event image ${index + 1}`}
                          width={200}
                          height={150}
                          className="w-full h-24 object-cover rounded"
                        />
                        <Button
                          onClick={() => removeImage(index)}
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="flex-1"
                      disabled={isUploading}
                    />
                    {isUploading ? (
                      <Compress className="h-5 w-5 text-blue-500 animate-pulse" />
                    ) : (
                      <Upload className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  
                  {isUploading && (
                    <div className="space-y-2">
                      <p className="text-sm text-blue-600 flex items-center">
                        <Compress className="h-4 w-4 mr-2" />
                        Compressing and uploading images...
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">
                      Upload multiple images for your event gallery (optional)
                    </p>
                    <p className="text-xs text-gray-400">
                      Images will be automatically compressed to 1200x800px with 60% quality for optimal upload
                    </p>
                    <p className="text-xs text-orange-500">
                      💡 Tip: For best results, upload 5-10 images at a time
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddEvent} 
                  className="w-full bg-sky-500 hover:bg-sky-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Event...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

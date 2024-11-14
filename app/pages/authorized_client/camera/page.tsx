"user client"

import React from 'react';
import { useEffect } from 'react';

import {Camera, X, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSession } from "next-auth/react"
import { useUserStore, convertDynamoDBToRegular } from '@/store/userStore';
import openai from '@/lib/openai';

export default function Camera_tab() {
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
    const [activeTab, setActiveTab] = React.useState('camera');
    const { data: session } = useSession() 
    const { userData, setUserData } = useUserStore();
    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
        }
      };
    
      const clearImage = () => {
        if (selectedImage) {
          URL.revokeObjectURL(selectedImage);
        }
        setSelectedImage(null);
    };
    const renderContent = () => {
        switch (activeTab) {
          case 'camera':
            return (
              <div className="flex flex-col items-center min-h-[calc(100vh-160px)]">
                {selectedImage ? (
                  <div className="w-full max-w-md space-y-4">
                    {/* Image Preview */}
                    <div className="relative">
                      <img 
                        src={selectedImage} 
                        alt="Selected meal" 
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                      <button
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                      >
                        <X size={24} className="text-gray-600" />
                      </button>
                    </div>
                    
                    {/* Analysis Button */}
                    <Button 
                      className="w-full"
                      onClick={() => {
                        // Add your image analysis logic here
                        console.log("Analyzing image...");
                      }}
                    >
                      Analyze Meal
                    </Button>
                    
                    {/* New Photo Button */}
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={clearImage}
                    >
                      Take New Photo
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-6 p-4">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                      <Camera size={48} className="text-gray-400" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-medium">Track Your Meal</h3>
                      <p className="text-gray-500">Take a photo or select an image of your meal to get instant nutritional insights</p>
                    </div>
                    
                    {/* Camera Input */}
                    <input 
                      type="file" 
                      accept="image/*"
                      capture="environment"
                      className="hidden" 
                      id="camera-upload"
                      onChange={handleImageSelect}
                    />
                    <label 
                      htmlFor="camera-upload" 
                      className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
                    >
                      <Camera size={20} />
                      Take Photo
                    </label>
    
                    {/* Photo Select Input */}
                    <div className="relative w-full max-w-xs">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        id="file-upload"
                        onChange={handleImageSelect}
                      />
                      <label 
                        htmlFor="file-upload" 
                        className="flex items-center justify-center gap-2 w-full bg-white text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                      >
                        <Upload size={20} />
                        Select from Gallery
                      </label>
                    </div>
    
                    <p className="text-sm text-gray-400 text-center">
                      Supported formats: JPG, PNG
                    </p>
                  </div>
                )}
              </div>
            );
        
          default:
            return null;
        }
      };
    return (
        <div>
            {renderContent()}
        </div>
    );
}
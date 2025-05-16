import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';

type ImagePickerProps = {
  onImageSelected: (file: File) => void;
};

export function ImagePicker({ onImageSelected }: ImagePickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  const handleSelectPreset = async (imagePath: string, index: number) => {
    try {
      // Fetch the image file
      const response = await fetch(imagePath);

      if (!response.ok) {
        throw new Error(`Failed to load image: ${response.status} ${response.statusText}`);
      }

      // Get the image data as a blob
      const imageBlob = await response.blob();

      // Create a File object from the blob
      const file = new File([imageBlob], `demo-${index + 1}.jpg`, { type: 'image/jpeg' });

      // Call the callback with the file
      onImageSelected(file);
    } catch (error) {
      console.error('Error selecting preset image:', error);
    }
  };

  const handleCameraCapture = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setShowCamera(true);
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(mediaStream => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
        });
    } else {
      alert('Camera access is not supported in your browser');
    }
  };

  const handleTakePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx && videoRef.current) {
      // Apply mirroring transformation to the canvas context
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);

      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
          onImageSelected(file);
          stopCamera();
        }
      }, 'image/jpeg');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('border-primary');
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('border-primary');
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('border-primary');

      if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
        onImageSelected(e.dataTransfer.files[0]);
      }
    };

    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    return () => {
      dropZone.removeEventListener('dragover', handleDragOver);
      dropZone.removeEventListener('dragleave', handleDragLeave);
      dropZone.removeEventListener('drop', handleDrop);

      // Clean up camera stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onImageSelected, stream]);

  // Hidden file input, independent of other UI
  const fileInput = (
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileChange}
      className="hidden"
      accept="image/*"
    />
  );

  // Camera View
  if (showCamera) {
    return (
      <div className="relative">
        {fileInput}
        <video
          ref={videoRef}
          autoPlay
          className="aspect-square w-full scale-x-[-1] transform rounded-lg object-cover"
          playsInline
        />
        <div className="mt-4 flex justify-center gap-4">
          <Button onClick={handleTakePhoto} className="bg-primary rounded px-4 py-2 text-white">
            Take Photo
          </Button>
          <Button
            variant="outline"
            onClick={stopCamera}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // Drop Zone View (when camera is not active)
  return (
    <>
      {fileInput}
      <div className="flex flex-col gap-4">
        {/* Camera trigger area */}
        <div
          ref={dropZoneRef}
          onClick={handleCameraCapture}
          className="hover:border-primary mx-auto flex h-[268px] w-[268px] cursor-pointer flex-col items-center justify-center rounded-lg bg-[#E4E5E6] p-8 text-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-[28px] w-[28px] text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">Take a selfie</p>
          <p className="mt-1 text-xs text-gray-500">or drop an image file here</p>
        </div>

        {/* <div className="text-center">
          <Button
            type="button"
            variant="link"
            onClick={handleFileSelection}
            className="text-primary h-auto p-0 text-sm hover:underline"
          >
            or select from device
          </Button>
        </div> */}

        <div className="flex flex-col gap-2">
          <p className="text-center text-sm font-normal text-[#666E7A]">Or, choose from below</p>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={`preset-${index}`}
                onClick={() => handleSelectPreset(`/images/examples/${index + 1}.jpeg`, index)}
                className="h-18 w-18 cursor-pointer rounded-xl"
              >
                <img
                  src={`/images/examples/${index + 1}.jpeg`}
                  alt=""
                  className="h-full w-full rounded-xl object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

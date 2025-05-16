type ImagePreviewProps = {
  imageUrl: string | null;
  onClear: () => void;
};

export function ImagePreview({ imageUrl, onClear }: ImagePreviewProps) {
  return (
    <div className="relative flex items-center justify-center">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Preview"
            className="max-h-full max-w-full rounded-lg object-contain"
          />
          <button
            onClick={onClear}
            className="bg-opacity-70 hover:bg-opacity-100 absolute -top-2 -right-2 cursor-pointer rounded-full bg-gray-800 p-1 text-white"
            aria-label="Clear image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          </button>
        </>
      ) : (
        <div className="text-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-1">Image preview will appear here</p>
        </div>
      )}
    </div>
  );
}

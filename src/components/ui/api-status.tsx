
import { Loader2, AlertCircle } from "lucide-react";

export function ApiLoading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-brand-blue mb-2" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

export function ApiError({ message = "Something went wrong", retry }: { message?: string; retry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-center max-w-md">
        <AlertCircle className="h-6 w-6 mx-auto mb-2" />
        <p className="font-medium mb-1">Error</p>
        <p className="text-sm">{message}</p>
      </div>
      
      {retry && (
        <button 
          onClick={retry}
          className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function ApiEmpty({ message = "No data found" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-gray-50 p-6 rounded-lg text-center max-w-md">
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
}

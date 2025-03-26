
import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading = ({ message = "Loading...", fullScreen = false }: LoadingProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="h-10 w-10 animate-spin text-brand-blue mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;

import React from "react";

const LoadingPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-500 h-screen w-screen flex items-center justify-center">
      <div className="animate-pulse rounded-full h-20 w-20 border-4 border-blue-100"></div>
    </div>
  );
};

export default LoadingPage;
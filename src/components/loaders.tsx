import React from "react";

export const DottedLoader: React.FC = () => (
  <span className="inline-block" aria-label="Loading" role="status">
    <span className="animate-bounce [animation-delay:0s] inline-block w-2 h-2 bg-gray-400 rounded-full mx-0.5"></span>
    <span className="animate-bounce [animation-delay:0.15s] inline-block w-2 h-2 bg-gray-400 rounded-full mx-0.5"></span>
    <span className="animate-bounce [animation-delay:0.3s] inline-block w-2 h-2 bg-gray-400 rounded-full mx-0.5"></span>
  </span>
);

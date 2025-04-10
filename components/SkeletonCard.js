// components/SkeletonCard.jsx
export default function SkeletonCard() {
    return (
      <div className="w-[300px] h-[200px] bg-gray-200 animate-pulse rounded-lg p-4">
        <div className="w-full h-4 bg-gray-300 rounded mb-4"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
      </div>
    );
  }
  
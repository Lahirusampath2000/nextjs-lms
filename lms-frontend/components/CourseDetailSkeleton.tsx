export default function CourseDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="h-14 bg-gray-50 border-b border-gray-100" />
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 flex flex-col gap-5">
          <div className="aspect-video bg-gray-100 rounded-2xl" />
          <div className="h-5 w-28 bg-gray-100 rounded-full" />
          <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
          <div className="flex flex-col gap-2">
            <div className="h-3.5 w-full bg-gray-100 rounded-full" />
            <div className="h-3.5 w-5/6 bg-gray-100 rounded-full" />
            <div className="h-3.5 w-4/6 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-2xl h-96" />
        </div>
      </div>
    </div>
  );
}
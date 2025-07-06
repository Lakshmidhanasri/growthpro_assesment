export default function BusinessCard({ data, onRegenerate }) {
  return (
    <div className="w-full max-w-md bg-white p-6 mt-6 rounded shadow text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{data.headline}</h2>
      <p className="text-gray-600 mb-1">Google Rating: {data.rating} ★</p>
      <p className="text-gray-600 mb-4">Reviews: {data.reviews}</p>
      <button
        onClick={onRegenerate}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Regenerate SEO Headline
      </button>
    </div>
  );
}

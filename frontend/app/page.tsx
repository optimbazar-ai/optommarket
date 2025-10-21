export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          OPTOMMARKET
        </h1>
        <p className="text-2xl text-gray-700 mb-8">
          AI Chatbot bilan Optom Do&apos;kon
        </p>
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl">
          <p className="text-lg text-gray-600 mb-4">
            Loyiha muvaffaqiyatli o&apos;rnatildi! ✅
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Frontend</h3>
              <p className="text-sm text-blue-700">Next.js + TypeScript + Tailwind CSS</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Backend</h3>
              <p className="text-sm text-green-700">Express + PostgreSQL</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

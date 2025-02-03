function Home() {
  return (
    <div className="md:max-w-2xl lg:max-w-4xl mx-auto space-y-3">
      
      <div className="space-y-3 p-5 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h1 className="font-semibold text-lg text-orange-500">How to make Ice-cream? </h1>
          <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente id, asperiores molestias placeat optio aliquid doloribus libero, amet voluptatibus dolore fuga maxime eius eum sed illo officiis a enim eaque.</p>
          <div className="flex justify-content-center align-items-center space-x-2">
            <p className="">Ingredients - </p>
            <div className="space-x-2">
              <span className="font-semibold text-sm py-1 px-2 rounded-xl bg-teal-500 text-white">Cream</span>
              <span className="font-semibold text-sm py-1 px-2 rounded-xl bg-teal-500 text-white">Milk</span>
              <span className="font-semibold text-sm py-1 px-2 rounded-xl bg-teal-500 text-white">Sugar</span>
            </div>
          </div>
          <p className="text-gray-700">Published at - 30.11.2026</p>
      </div>

    </div>
  )
}

export default Home

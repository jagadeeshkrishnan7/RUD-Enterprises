import Modal from './Modal'

function AboutModal({ isOpen, onClose, about }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="About Us" maxWidth="max-w-5xl">
      <div className="space-y-8 px-6 py-6 sm:px-8">
        <h3 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">{about.header}</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {about.images.map((image, index) => (
            <div key={`${image}-${index}`} className="overflow-hidden rounded-xl">
              <img
                src={image}
                alt={`About fabrication ${index + 1}`}
                className="h-64 w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <p className="pb-4 text-base leading-relaxed text-slate-700 sm:text-lg">{about.description}</p>
      </div>
    </Modal>
  )
}

export default AboutModal

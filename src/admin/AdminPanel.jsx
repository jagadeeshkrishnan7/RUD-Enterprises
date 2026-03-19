import { useEffect, useState } from 'react'
import { fileToBase64 } from '../utils/image'
import { resetSiteData } from '../utils/storage'

const cardClass =
  'rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'

const clone = (value) => JSON.parse(JSON.stringify(value))

function AdminPanel({ siteData, onSaveSiteData }) {
  const [draft, setDraft] = useState(() => clone(siteData))
  const [saveNotice, setSaveNotice] = useState('')

  useEffect(() => {
    setDraft(clone(siteData))
  }, [siteData])

  useEffect(() => {
    if (!saveNotice) return undefined
    const timer = window.setTimeout(() => setSaveNotice(''), 2500)
    return () => window.clearTimeout(timer)
  }, [saveNotice])

  const saveAll = () => {
    onSaveSiteData(draft)
    setSaveNotice('Saved changes successfully.')
  }

  const publishChanges = () => {
    const versioned = { ...draft, _version: Date.now() }
    onSaveSiteData(versioned)
    const json = JSON.stringify(versioned, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'site-config.json'
    a.click()
    URL.revokeObjectURL(url)
    setSaveNotice('Config downloaded! Replace public/site-config.json, commit and push to deploy to all visitors.')
  }

  const restoreDefaults = () => {
    const defaults = resetSiteData()
    onSaveSiteData(defaults)
    setSaveNotice('Reset to default content.')
  }

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const base64 = await fileToBase64(file)
    setDraft((prev) => ({ ...prev, logo: base64 }))
  }

  const updateHomeSection = (id, field, value) => {
    setDraft((prev) => ({
      ...prev,
      homeSections: prev.homeSections.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }))
  }

  const uploadHomeSectionImage = async (id, event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const base64 = await fileToBase64(file)
    updateHomeSection(id, 'image', base64)
  }

  const addHomeSection = () => {
    setDraft((prev) => ({
      ...prev,
      homeSections: [
        ...prev.homeSections,
        {
          id: crypto.randomUUID(),
          title: 'New Capability',
          description: 'Add long corporate description here.',
          image: prev.hero.image,
        },
      ],
    }))
  }

  const deleteHomeSection = (id) => {
    setDraft((prev) => ({
      ...prev,
      homeSections: prev.homeSections.filter((item) => item.id !== id),
    }))
  }

  const addAboutImage = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const base64 = await fileToBase64(file)
    setDraft((prev) => ({
      ...prev,
      about: { ...prev.about, images: [...prev.about.images, base64] },
    }))
  }

  const deleteAboutImage = (index) => {
    setDraft((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        images: prev.about.images.filter((_, idx) => idx !== index),
      },
    }))
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Website Admin Panel</h1>
              <p className="mt-2 text-sm text-slate-600">Manage all website content and theme settings from this page.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveAll}
                className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Save All Changes
              </button>
              <button
                type="button"
                onClick={publishChanges}
                className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Publish Changes
              </button>
              <button
                type="button"
                onClick={restoreDefaults}
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Reset Defaults
              </button>
            </div>
          </div>
          {saveNotice ? (
            <p className="mt-3 text-sm font-semibold text-emerald-700">{saveNotice}</p>
          ) : null}
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <strong>How to publish to all visitors:</strong> Click <em>Publish Changes</em> → it downloads <code>site-config.json</code> → replace <code>public/site-config.json</code> in your repo → commit &amp; push → Render redeploys → every new visitor sees your updated content.
          </div>
        </div>

        <div className="grid gap-6">
          <section className={cardClass}>
            <h2 className="text-2xl font-bold text-slate-900">Company Brand</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Company Name</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.companyName}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, companyName: event.target.value }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Upload Logo</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} />
                <img src={draft.logo} alt="Logo preview" className="mt-3 h-16 w-16 rounded-lg border border-slate-300 object-cover" />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-2xl font-bold text-slate-900">Hero Section</h2>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Hero Heading</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.hero.heading}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, heading: event.target.value },
                    }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Hero Subheading</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.hero.subheading}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, subheading: event.target.value },
                    }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Hero Background Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (event) => {
                    const file = event.target.files?.[0]
                    if (!file) return
                    const base64 = await fileToBase64(file)
                    setDraft((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, image: base64 },
                    }))
                  }}
                />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-2xl font-bold text-slate-900">Contact Form Content</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Contact Header</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.contact.header}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, header: event.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Recipient Email ID</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.contact.recipientEmail}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, recipientEmail: event.target.value },
                    }))
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Contact Description</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.contact.description}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, description: event.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-2xl font-bold text-slate-900">Footer Contact Info</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Address</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.footer.address}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, address: event.target.value },
                    }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email 1</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.footer.emails[0]}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        emails: [event.target.value, prev.footer.emails[1]],
                      },
                    }))
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email 2</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.footer.emails[1]}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        emails: [prev.footer.emails[0], event.target.value],
                      },
                    }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Phone 1</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.footer.phones[0]}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        phones: [event.target.value, prev.footer.phones[1]],
                      },
                    }))
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Phone 2</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.footer.phones[1]}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        phones: [prev.footer.phones[0], event.target.value],
                      },
                    }))
                  }
                />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-900">Home Page Dynamic Sections</h2>
              <button
                type="button"
                onClick={addHomeSection}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Add Section
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {draft.homeSections.map((section, index) => (
                <div key={section.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-700">Section {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => deleteHomeSection(section.id)}
                      className="rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="mt-3 grid gap-3">
                    <input
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                      value={section.title}
                      onChange={(event) =>
                        updateHomeSection(section.id, 'title', event.target.value)
                      }
                      placeholder="Section title"
                    />
                    <textarea
                      rows={4}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                      value={section.description}
                      onChange={(event) =>
                        updateHomeSection(section.id, 'description', event.target.value)
                      }
                      placeholder="Section description"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => uploadHomeSectionImage(section.id, event)}
                    />
                    <img src={section.image} alt={section.title} className="h-32 w-full rounded-lg object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-2xl font-bold text-slate-900">About Us Content</h2>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">About Header</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.about.header}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      about: { ...prev.about, header: event.target.value },
                    }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">About Description</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand"
                  value={draft.about.description}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      about: { ...prev.about, description: event.target.value },
                    }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Add About Image</label>
                <input type="file" accept="image/*" onChange={addAboutImage} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {draft.about.images.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative overflow-hidden rounded-xl border border-slate-200">
                    <img src={image} alt={`About ${index + 1}`} className="h-32 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => deleteAboutImage(index)}
                      className="absolute right-2 top-2 rounded-full bg-slate-900 px-2 py-1 text-xs font-semibold text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-2xl font-bold text-slate-900">Theme Customization</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Background Color</label>
                <input
                  type="color"
                  className="h-11 w-full cursor-pointer rounded-lg border border-slate-300"
                  value={draft.theme.backgroundColor}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      theme: { ...prev.theme, backgroundColor: event.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Primary Color</label>
                <input
                  type="color"
                  className="h-11 w-full cursor-pointer rounded-lg border border-slate-300"
                  value={draft.theme.primaryColor}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      theme: { ...prev.theme, primaryColor: event.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel

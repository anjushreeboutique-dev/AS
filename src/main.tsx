import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './styles.css'

type Collection = {
  name: string
  category: string
  image: string
  blurb: string
  tone: string
}

type Service = {
  title: string
  body: string
}

const BRAND = {
  name: 'ANJUSHREE',
  tagline: 'Inspired By Tradition, Designed For You.',
  description:
    'A fashion and custom-stitching studio for designer wear, traditional silhouettes and thoughtfully tailored occasions.',
  phone: '9810388665',
  whatsapp: '919810388665',
  address: 'Shop No. 5, 3A, Rajpur Khurd Ext. Colony, New Delhi-110068',
  instagram: '@anjushree.boutique',
}

const collections: Collection[] = [
  {
    name: 'Designer Lehengas',
    category: 'Bridal & Festive',
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85',
    blurb: 'Statement silhouettes with considered proportion, movement and detail.',
    tone: 'heritage',
  },
  {
    name: 'Sarees & Blouses',
    category: 'Signature Dressing',
    image:
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1400&q=85',
    blurb: 'The drape, blouse and finish are treated as one complete look.',
    tone: 'silk',
  },
  {
    name: 'Anarkalis & Suits',
    category: 'Occasion & Everyday',
    image:
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1400&q=85',
    blurb: 'Graceful Indian silhouettes made personal through fit and fabric.',
    tone: 'soft',
  },
  {
    name: 'Contemporary Gowns',
    category: 'Modern Indian',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85',
    blurb: 'Modern lines with an Indian point of view for receptions and evenings.',
    tone: 'evening',
  },
  {
    name: 'Indo-Western',
    category: 'Modern Indian',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85',
    blurb: 'Tailored separates and fusion dressing that still feel unmistakably Indian.',
    tone: 'modern',
  },
  {
    name: 'Menswear',
    category: 'Sherwani & Kurta',
    image:
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1400&q=85',
    blurb: 'Cleanly tailored festive dressing with detail kept intentional.',
    tone: 'menswear',
  },
]

const services: Service[] = [
  {
    title: 'Custom Stitching',
    body: 'Measurements, proportions and finishing are considered for the individual garment rather than a generic size.',
  },
  {
    title: 'Personalized Fittings & Styling',
    body: 'A one-to-one approach to silhouette, comfort, drape, colour and the occasion you are dressing for.',
  },
  {
    title: 'Custom Designs',
    body: 'Bring an idea, reference, sketch or simply a feeling. We shape it into a considered wearable design.',
  },
  {
    title: 'Alterations & Restyling',
    body: 'Existing favourites can be refined, rebalanced or adapted with care for fabric and original detailing.',
  },
  {
    title: 'Premium Fabric Guidance',
    body: 'A curated approach to fabrics and finishes, with practical guidance on fall, comfort and wear.',
  },
]

const process = [
  ['01', 'Consultation', 'We understand the occasion, your preferences, fit priorities and the look you have in mind.'],
  ['02', 'Design', 'Silhouette, fabric, neckline, sleeve, surface detail and finishing are brought together.'],
  ['03', 'Measurement', 'Your measurements are taken with attention to proportion, posture and intended fall.'],
  ['04', 'Craft', 'The garment moves through cutting, construction and finishing with the design kept central.'],
  ['05', 'Fitting', 'The fit and fall are reviewed so the finished piece feels natural to wear.'],
  ['06', 'Handover', 'Your finished outfit is pressed, checked and prepared for its occasion.'],
] as const

const nav = [
  ['Home', '/'],
  ['Collections', '/collections'],
  ['Custom Stitching', '/custom-stitching'],
  ['Services', '/services'],
  ['Our Story', '/about'],
  ['Contact', '/contact'],
] as const

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return (
    <BrowserRouter basename={base || undefined}>
      <SiteShell />
    </BrowserRouter>
  )
}

function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
    document.title = `${pageTitle(location.pathname)} | ANJUSHREE`
  }, [location.pathname])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="site">
      <div className="atelier-bar">
        <p>ANJUSHREE · INDIAN ETHNIC FASHION & CUSTOM STITCHING</p>
        <a href={`tel:+91${BRAND.phone}`}>+91 {BRAND.phone}</a>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <NavLink className="wordmark" to="/" aria-label="ANJUSHREE home">
            <span className="mark" aria-hidden="true">
              AS
            </span>
            <span>
              <strong>{BRAND.name}</strong>
              <small>ATELIER</small>
            </span>
          </NavLink>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map(([label, path]) => (
              <NavLink key={path} to={path} className={({ isActive }) => (isActive ? 'active' : '')} end={path === '/'}>
                {label}
              </NavLink>
            ))}
          </nav>
          <a className="header-cta" href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hello ANJUSHREE, I would like to enquire about a custom outfit.')}`} target="_blank" rel="noreferrer">
            <span>Enquire</span>
            <span aria-hidden="true">↗</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
        <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
          {nav.map(([label, path]) => (
            <NavLink key={path} to={path} className={({ isActive }) => (isActive ? 'active' : '')} end={path === '/'}>
              {label}
            </NavLink>
          ))}
          <a className="mobile-quick" href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer">
            WhatsApp the Atelier ↗
          </a>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/custom-stitching" element={<CustomStitching />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function pageTitle(path: string) {
  const found = nav.find(([, route]) => route === path)
  return found?.[0] ?? 'ANJUSHREE'
}

function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`brand-mark ${small ? 'small' : ''}`} aria-hidden="true">
      <span>AS</span>
      <i />
    </div>
  )
}

function SectionHeading({ eyebrow, title, copy, align = 'left' }: { eyebrow: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return (
    <div className={`section-heading ${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}

function Image({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" />
}

function Home() {
  return (
    <>
      <section className="hero hero-home">
        <div className="hero-image">
          <Image src={collections[0].image} alt="Festive Indian silk fashion in a warm studio setting" />
        </div>
        <div className="hero-wash" />
        <div className="hero-content page-container">
          <span className="eyebrow light">ANJUSHREE ATELIER · NEW DELHI</span>
          <h1>
            Inspired By
            <em>Tradition.</em>
            <span>Designed For You.</span>
          </h1>
          <p>{BRAND.description}</p>
          <div className="hero-actions">
            <NavLink className="button button-light" to="/collections">Explore Collections</NavLink>
            <NavLink className="button button-quiet" to="/contact">Book an Appointment</NavLink>
          </div>
        </div>
        <div className="hero-corner-note" aria-hidden="true">01 / 06</div>
      </section>

      <section className="statement section-pad">
        <div className="page-container statement-grid">
          <BrandMark />
          <div>
            <span className="eyebrow">THE ANJUSHREE APPROACH</span>
            <p className="statement-copy">Traditional Indian dressing, interpreted with contemporary restraint — then made personal through fit, fabric and finishing.</p>
          </div>
          <div className="statement-side">
            <p>Designer wear · Custom stitching · Personalized styling</p>
          </div>
        </div>
      </section>

      <section className="collections-preview section-pad section-sand">
        <div className="page-container">
          <SectionHeading eyebrow="The Collections" title="A wardrobe shaped around the occasion." copy="From statement festive silhouettes to everyday Indian dressing, each category leaves room for your own point of view." />
          <div className="collection-grid">
            {collections.slice(0, 4).map((item, index) => <CollectionCard key={item.name} item={item} index={index} />)}
          </div>
          <div className="section-link-row">
            <NavLink className="text-link" to="/collections">View the complete collection <span>→</span></NavLink>
          </div>
        </div>
      </section>

      <section className="atelier-story section-pad">
        <div className="page-container split-feature">
          <div className="feature-image tall-image">
            <Image src={collections[2].image} alt="Elegant Indian outfit displayed as part of the ANJUSHREE collection" />
            <span className="image-caption">Crafted with intention</span>
          </div>
          <div className="feature-copy">
            <span className="eyebrow">Made Around You</span>
            <h2>Good tailoring is felt before it is seen.</h2>
            <p>We believe the most elegant outfit is one that sits naturally on you. Our work begins with understanding your proportions, preferences and occasion, then refining the garment through thoughtful construction.</p>
            <p>That is where traditional craft meets a contemporary eye: enough detail to feel special, never so much that the wearer disappears.</p>
            <NavLink className="text-link" to="/custom-stitching">Discover custom stitching <span>→</span></NavLink>
          </div>
        </div>
      </section>

      <section className="service-band section-pad section-olive">
        <div className="page-container service-band-grid">
          <div>
            <span className="eyebrow light">The Atelier Services</span>
            <h2>From the first idea to the final fitting.</h2>
          </div>
          <div className="mini-service-grid">
            {services.slice(0, 4).map((service, index) => (
              <div className="mini-service" key={service.title}>
                <span>0{index + 1}</span>
                <h3>{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process section-pad">
        <div className="page-container">
          <SectionHeading eyebrow="The Process" title="A considered path from idea to outfit." copy="The experience stays personal throughout — because the making is part of the finished piece." align="center" />
          <div className="process-grid">
            {process.map(([step, title, body]) => (
              <article className="process-card" key={step}>
                <span className="process-no">{step}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="page-container closing-cta-inner">
          <BrandMark small />
          <span className="eyebrow">LET'S CREATE SOMETHING BEAUTIFUL TOGETHER.</span>
          <h2>Your next occasion deserves a piece that feels like yours.</h2>
          <NavLink className="button button-dark" to="/contact">Start an Enquiry</NavLink>
        </div>
      </section>
    </>
  )
}

function CollectionCard({ item, index }: { item: Collection; index: number }) {
  return (
    <article className={`collection-card card-${index + 1}`}>
      <div className="card-image"><Image src={item.image} alt={item.name} /></div>
      <div className="card-copy">
        <span>{item.category}</span>
        <h3>{item.name}</h3>
        <p>{item.blurb}</p>
      </div>
    </article>
  )
}

function PageHero({ eyebrow, title, copy, image }: { eyebrow: string; title: string; copy: string; image: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero-image"><Image src={image} alt="ANJUSHREE Indian fashion" /></div>
      <div className="page-hero-overlay" />
      <div className="page-container page-hero-content">
        <span className="eyebrow light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  )
}

function Collections() {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Bridal & Festive', 'Signature Dressing', 'Occasion & Everyday', 'Modern Indian', 'Sherwani & Kurta']
  const visible = filter === 'All' ? collections : collections.filter((item) => item.category === filter)
  return (
    <>
      <PageHero eyebrow="ANJUSHREE · COLLECTIONS" title="The Collection" copy="Indian silhouettes, contemporary proportion and space for personalization." image={collections[3].image} />
      <section className="section-pad">
        <div className="page-container">
          <div className="filter-row" role="group" aria-label="Filter collection categories">
            {categories.map((category) => (
              <button key={category} className={filter === category ? 'filter-active' : ''} onClick={() => setFilter(category)} type="button">
                {category}
              </button>
            ))}
          </div>
          <div className="collection-grid collection-grid-full">
            {visible.map((item, index) => <CollectionCard key={item.name} item={item} index={index} />)}
          </div>
        </div>
      </section>
    </>
  )
}

function CustomStitching() {
  return (
    <>
      <PageHero eyebrow="ANJUSHREE · CUSTOM STITCHING" title="Designed around you." copy="A made-for-you approach to Indian dressing, where silhouette, fit and finishing are developed together." image={collections[4].image} />
      <section className="section-pad">
        <div className="page-container two-col-copy">
          <div>
            <span className="eyebrow">Why Custom</span>
            <h2>Because a beautiful design should also feel completely yours.</h2>
          </div>
          <div>
            <p>We work with your measurements, your comfort and the way you actually move. Every decision — from neckline depth to sleeve proportion and finishing — is made with the complete garment in mind.</p>
            <p>Custom does not have to mean complicated. It can simply mean considered.</p>
          </div>
        </div>
      </section>
      <section className="section-pad section-sand">
        <div className="page-container">
          <SectionHeading eyebrow="What We Can Create" title="A wardrobe of Indian silhouettes, made personal." />
          <div className="service-list">
            {['Designer lehengas', 'Anarkalis & salwar suits', 'Saree blouses', 'Contemporary gowns', 'Indo-western sets', 'Sherwani & kurta-pajama'].map((item, index) => (
              <div className="service-list-item" key={item}><span>0{index + 1}</span><h3>{item}</h3><span aria-hidden="true">↗</span></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="page-container split-feature reverse-on-mobile">
          <div className="feature-copy">
            <span className="eyebrow">Personalized Styling</span>
            <h2>Bring the reference. Keep your identity.</h2>
            <p>Reference images can be a starting point, but the final piece is shaped around you — the balance of the silhouette, the finish you like and the occasion it needs to serve.</p>
            <NavLink className="text-link" to="/contact">Discuss your outfit <span>→</span></NavLink>
          </div>
          <div className="feature-image tall-image"><Image src={collections[1].image} alt="Indian saree styling detail" /></div>
        </div>
      </section>
    </>
  )
}

function Services() {
  return (
    <>
      <PageHero eyebrow="ANJUSHREE · SERVICES" title="The Atelier Services" copy="A personal fashion service built around custom design, thoughtful tailoring and occasion-led styling." image={collections[5].image} />
      <section className="section-pad">
        <div className="page-container">
          <div className="services-detail-grid">
            {services.map((service, index) => (
              <article className="service-detail" key={service.title}>
                <span className="service-number">0{index + 1}</span>
                <h2>{service.title}</h2>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad section-rose">
        <div className="page-container two-col-copy">
          <div><span className="eyebrow">Our Philosophy</span><h2>Luxury can be quiet.</h2></div>
          <div><p>For ANJUSHREE, luxury is not about excess. It is the freedom to have your outfit fit properly, feel comfortable and reflect your own sense of style.</p><p>That means clear conversations, intentional design choices and care in the details that are easiest to miss.</p></div>
        </div>
      </section>
    </>
  )
}

function About() {
  return (
    <>
      <PageHero eyebrow="ANJUSHREE · OUR STORY" title="Tradition, with a contemporary eye." copy="A boutique approach to Indian fashion built around craftsmanship, confidence, grace and individuality." image={collections[0].image} />
      <section className="section-pad">
        <div className="page-container story-grid">
          <div className="story-lead"><span className="eyebrow">The Story</span><h2>Indian dressing has never stood still. Neither should we.</h2></div>
          <div className="story-copy"><p>ANJUSHREE was shaped around a simple belief: traditional clothing can feel deeply rooted and distinctly modern at the same time.</p><p>We bring together the beauty of Indian silhouettes with the practical, personal details that make a garment yours — fit, movement, fabric, proportion and finish.</p><p>At the centre is the relationship between the wearer and the maker. The aim is not simply to produce an outfit, but to help create something that feels confident, graceful and individual.</p></div>
        </div>
      </section>
      <section className="section-pad section-sand">
        <div className="page-container values-grid">
          {['Craftsmanship', 'Contemporary Elegance', 'Personal Attention', 'Individuality'].map((value, index) => (
            <article key={value}><span>0{index + 1}</span><h3>{value}</h3><p>{['Care in construction and finishing.', 'Modern restraint without losing the Indian soul.', 'A service shaped around the person, not a template.', 'Your outfit should reflect you, not a trend alone.'][index]}</p></article>
          ))}
        </div>
      </section>
      <section className="section-pad">
        <div className="page-container quote-block">
          <span className="eyebrow">ANJUSHREE</span>
          <blockquote>“Timeless Designs. Impeccable Craftsmanship. Made For You.”</blockquote>
        </div>
      </section>
    </>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = [
      'Hello ANJUSHREE, I would like to make an enquiry.',
      `Name: ${data.get('name') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Occasion: ${data.get('occasion') || ''}`,
      `Outfit: ${data.get('outfit') || ''}`,
      `Message: ${data.get('message') || ''}`,
    ].join('\n')
    setSent(true)
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <PageHero eyebrow="ANJUSHREE · CONTACT" title="Let's talk about your outfit." copy="Share a few details and we will continue the conversation on WhatsApp or by phone." image={collections[2].image} />
      <section className="section-pad">
        <div className="page-container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">The Atelier</span>
            <h2>Visit, call or message.</h2>
            <p>{BRAND.address}</p>
            <div className="contact-links">
              <a href={`tel:+91${BRAND.phone}`}>+91 {BRAND.phone}</a>
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
              <a href={`https://www.instagram.com/${BRAND.instagram.replace('@', '')}/`} target="_blank" rel="noreferrer">{BRAND.instagram}</a>
            </div>
            <div className="contact-note">For appointments, WhatsApp is the quickest way to share references and discuss requirements.</div>
          </div>
          <form className="enquiry-form" onSubmit={submit}>
            <label>Name<input name="name" required placeholder="Your name" /></label>
            <label>Phone<input name="phone" required inputMode="tel" placeholder="Your phone number" /></label>
            <div className="form-row">
              <label>Occasion<input name="occasion" placeholder="Wedding, festive, reception…" /></label>
              <label>Outfit<input name="outfit" placeholder="Lehenga, blouse, saree, gown…" /></label>
            </div>
            <label>Tell us a little more<textarea name="message" rows={5} placeholder="What would you like to create or alter?" /></label>
            <button className="button button-dark" type="submit">Continue on WhatsApp ↗</button>
            {sent ? <p className="form-success" role="status">Your enquiry is ready in WhatsApp. If it did not open, please use the WhatsApp link above.</p> : <p className="form-footnote">This form does not store your enquiry on the website; it prepares a message for WhatsApp.</p>}
          </form>
        </div>
      </section>
    </>
  )
}

function NotFound() {
  return (
    <section className="not-found section-pad"><div className="page-container"><span className="eyebrow">404</span><h1>That page has moved.</h1><NavLink className="button button-dark" to="/">Return home</NavLink></div></section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-grid">
        <div>
          <div className="footer-brand"><BrandMark small /><div><strong>{BRAND.name}</strong><span>Inspired By Tradition, Designed For You.</span></div></div>
          <p className="footer-description">Indian ethnic fashion and custom stitching, made personal through thoughtful design and fit.</p>
        </div>
        <div className="footer-links"><span className="eyebrow">Explore</span>{nav.slice(1).map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}</div>
        <div className="footer-contact"><span className="eyebrow">Atelier</span><p>{BRAND.address}</p><a href={`tel:+91${BRAND.phone}`}>+91 {BRAND.phone}</a><a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
      </div>
      <div className="page-container footer-bottom"><span>© {new Date().getFullYear()} ANJUSHREE. All rights reserved.</span><span>Designed with intention.</span></div>
    </footer>
  )
}

export default App

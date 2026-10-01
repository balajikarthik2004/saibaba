import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { BasketBar, Footer, Header, Toaster } from './components/Shell'
import { Diya, Mandala } from './components/Sacred'
import Home from './pages/Home'

/* Route-level code splitting — the home page ships in the first chunk,
   everything else loads on navigation. */
const Temples = lazy(() => import('./pages/Temples'))
const TempleDetail = lazy(() => import('./pages/TempleDetail'))
const Aarti = lazy(() => import('./pages/Aarti'))
const Sevas = lazy(() => import('./pages/Sevas'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Events = lazy(() => import('./pages/Events'))
const EventDetail = lazy(() => import('./pages/EventDetail'))
const Darshan = lazy(() => import('./pages/Darshan'))
const Satcharitra = lazy(() => import('./pages/Satcharitra'))
const Teachings = lazy(() => import('./pages/Teachings'))
const Annadanam = lazy(() => import('./pages/Annadanam'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Experiences = lazy(() => import('./pages/Experiences'))
const Volunteer = lazy(() => import('./pages/Volunteer'))
const Donate = lazy(() => import('./pages/Donate'))
const Account = lazy(() => import('./pages/Account'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function PageLoader() {
  return (
    <div className="relative grid min-h-[70vh] place-items-center">
      <Mandala className="pointer-events-none absolute size-[420px] opacity-[0.14] animate-slow-spin" />
      <div className="relative text-center">
        <Diya size={34} className="mx-auto" />
        <p className="mt-4 font-deva text-[14px] text-gold">ॐ साईं राम</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/temples" element={<Temples />} />
            <Route path="/temples/:id" element={<TempleDetail />} />
            <Route path="/aarti" element={<Aarti />} />
            <Route path="/sevas" element={<Sevas />} />
            <Route path="/sevas/checkout" element={<Checkout />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/darshan" element={<Darshan />} />
            <Route path="/satcharitra" element={<Satcharitra />} />
            <Route path="/teachings" element={<Teachings />} />
            <Route path="/annadanam" element={<Annadanam />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster />
      <BasketBar />
    </div>
  )
}

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navigation Header */}
      <header className="bg-blue-950 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold tracking-wider">SAVIO COLLEGE</span>
          </div>
          <nav className="hidden md:flex space-x-8 font-medium">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <Link href="/about" className="hover:text-amber-400 transition">About Us</Link>
            <Link href="/news" className="hover:text-amber-400 transition">News & Events</Link>
            <Link href="/contact" className="hover:text-amber-400 transition">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link 
              href="/sign-in" 
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 px-4 py-2 rounded-md font-semibold transition text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-r from-blue-950 to-blue-900 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Welcome to Savio College
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Nurturing excellence, character, and lifelong learning through a modern digital landscape.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/about" 
              className="bg-white text-blue-950 px-6 py-3 rounded-md font-semibold hover:bg-slate-100 transition"
            >
              Learn More
            </Link>
            <Link 
              href="/contact" 
              className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-blue-950 mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            To provide a holistic education that empowers students to achieve academic excellence, 
            develop strong moral values, and become responsible global citizens.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-blue-950 mb-4">Our Vision</h2>
          <p className="text-slate-600 leading-relaxed">
            To be a leading center of educational innovation and character development, recognized 
            for cultivating future leaders.
          </p>
        </div>
      </section>

      {/* Footer Element */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center text-sm">
        <p>© {new Date().getFullYear()} Savio College. All rights reserved.</p>
      </footer>
    </div>
  );
}
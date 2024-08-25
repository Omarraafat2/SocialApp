import React from 'react'
import Link from 'next/link'
export default function Foter() {
    return <>
        
        <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-between">
      {/* Info Column */}
      <div className="w-full md:w-1/4 mb-8">
        <h4 className="text-lg font-semibold mb-4 border-b-2 border-transparent transition-colors duration-300 hover:border-cyan-400">Info</h4>
        <ul className="list-none p-0">
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">About Us</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Compressions</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Customers</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Service</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Collection</Link>
          </li>
        </ul>
      </div>

      {/* Explore Column */}
      <div className="w-full md:w-1/4 mb-8">
        <h4 className="text-lg font-semibold mb-4 border-b-2 border-transparent transition-colors duration-300 hover:border-cyan-400">Explore</h4>
        <ul className="list-none p-0">
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Free Designs</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Latest Designs</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Themes</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Popular Designs</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Art Skills</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">New Uploads</Link>
          </li>
        </ul>
      </div>

      {/* Legal Column */}
      <div className="w-full md:w-1/4 mb-8">
        <h4 className="text-lg font-semibold mb-4 border-b-2 border-transparent transition-colors duration-300 hover:border-cyan-400">Legal</h4>
        <ul className="list-none p-0">
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Customer Agreement</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Privacy Policy</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">GDPR</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Security</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Testimonials</Link>
          </li>
          <li className="mb-2 text-sm cursor-pointer transition-colors duration-300 hover:text-cyan-400">
            <Link href="#">Media Kit</Link>
          </li>
        </ul>
      </div>

      {/* Newsletter Column */}
      <div className="w-full md:w-1/4 mb-8">
        <h4 className="text-lg font-semibold mb-4 border-b-2 border-transparent transition-colors duration-300 hover:border-cyan-400">Newsletter</h4>
        <p className="text-sm leading-relaxed">
          Subscribe to our newsletter for a weekly dose
          of news, updates, helpful tips, and
          exclusive offers.
        </p>
      </div>
    </div>
  </div>
</footer>


  </>
}

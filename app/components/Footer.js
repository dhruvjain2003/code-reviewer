import Link from 'next/link';
import { Github, Shield, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">AI Code Reviewer</h3>
            <p className="mb-4 text-slate-400 text-sm leading-relaxed">
              Get instant, intelligent feedback on your code. Catch bugs, optimize performance,
              and learn best practices — all in seconds.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="GitHub" className="text-slate-400 hover:text-white transition-colors duration-200">
                <Github size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-white transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-slate-400 hover:text-white transition-colors duration-200">Features</Link></li>
              <li><Link href="/pricing" className="text-slate-400 hover:text-white transition-colors duration-200">Pricing</Link></li>
              <li><Link href="/integrations" className="text-slate-400 hover:text-white transition-colors duration-200">Integrations</Link></li>
              <li><Link href="/changelog" className="text-slate-400 hover:text-white transition-colors duration-200">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors duration-200">About us</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-white transition-colors duration-200">Blog</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-white transition-colors duration-200">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-slate-400 hover:text-white transition-colors duration-200">Help Center</Link></li>
              <li><Link href="/docs" className="text-slate-400 hover:text-white transition-colors duration-200">Documentation</Link></li>
              <li><Link href="/status" className="text-slate-400 hover:text-white transition-colors duration-200">System Status</Link></li>
              <li>
                <a href="mailto:support@aicodereviewr.com" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <Mail size={16} />
                  <span>support@aicodereviewr.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} AI Code Reviewer. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-white transition-colors duration-200">Terms of Service</Link>
            <div className="flex items-center gap-2 text-slate-500">
              <Shield size={16} />
              <span>SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
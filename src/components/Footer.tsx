import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-sm sm:flex-row sm:justify-between sm:gap-0">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <Link
              to="/privacy"
              className="transition-colors hover:text-gray-900"
            >
              プライバシーポリシー
            </Link>
            <Link to="/terms" className="transition-colors hover:text-gray-900">
              利用規約
            </Link>
          </div>

          <div className="order-first flex items-center gap-1 text-gray-500 sm:order-none">
            Made with <Heart className="h-4 w-4 text-pink-500" /> by Takusa
          </div>

          <div className="text-gray-400">
            © {new Date().getFullYear()} Takusa. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

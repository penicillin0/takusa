import { Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function Footer() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  const handleDeleteAccount = async () => {
    if (!confirm('本当にアカウントを削除しますか？この操作は取り消せません。')) {
      return;
    }

    try {
      const { error } = await supabase.auth.admin.deleteUser(
        (await supabase.auth.getUser()).data.user?.id ?? ''
      );
      if (error) throw error;
      await supabase.auth.signOut();
    } catch (e) {
      alert('アカウントの削除に失敗しました');
    }
  };

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-0 sm:justify-between text-sm">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              to="/privacy"
              className="hover:text-gray-900 transition-colors"
            >
              プライバシーポリシー
            </Link>
            <Link
              to="/terms"
              className="hover:text-gray-900 transition-colors"
            >
              利用規約
            </Link>
            {!isLoginPage && (
              <button
                onClick={handleDeleteAccount}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                アカウントを削除
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 text-gray-500 order-first sm:order-none">
            Made with <Heart className="w-4 h-4 text-pink-500" /> by Takusa
          </div>

          <div className="text-gray-400">
            © {new Date().getFullYear()} Takusa. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
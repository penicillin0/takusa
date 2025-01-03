import { Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function Footer() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  const handleDeleteAccount = async () => {
    if (
      !confirm('本当にアカウントを削除しますか？この操作は取り消せません。')
    ) {
      return;
    }

    try {
      const { error } = await supabase.auth.admin.deleteUser(
        (await supabase.auth.getUser()).data.user?.id ?? ''
      );
      if (error) throw error;
      await supabase.auth.signOut();
    } catch {
      alert('アカウントの削除に失敗しました');
    }
  };

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
            {!isLoginPage && (
              <button
                onClick={handleDeleteAccount}
                className="text-gray-400 transition-colors hover:text-red-500"
              >
                アカウントを削除
              </button>
            )}
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

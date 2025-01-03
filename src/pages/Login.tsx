import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Sprout } from 'lucide-react';
import { Footer } from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <div className="mb-8 flex flex-col items-center gap-2">
            <p className="text-4xl">🌿</p>
            <h1 className="text-3xl font-bold text-gray-900">Takusa</h1>
            <p className="text-sm text-gray-600">
              草を生やす、習慣を育てる、未来を育てる
            </p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#6366F1',
                    brandAccent: '#EC4899',
                  },
                },
              },
            }}
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'メールアドレス',
                  password_label: 'パスワード',
                  button_label: 'ログイン',
                },
                sign_up: {
                  email_label: 'メールアドレス',
                  password_label: 'パスワード',
                  button_label: '新規登録',
                },
              },
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

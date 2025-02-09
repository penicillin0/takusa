import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Footer } from '../components/Footer';
import { supabase } from '../lib/supabase';

const Login = () => {
  const from = new URL(window.location.href).searchParams.get('from');
  const isFromWebView = from === 'webview';

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
                  fontSizes: {
                    baseButtonSize: '14px',
                  },
                  borderWidths: {
                    buttonBorderWidth: '0px',
                  },
                  radii: {
                    borderRadiusButton: '12px',
                    inputBorderRadius: '12px',
                  },
                },
              },
            }}
            // MEMO: WebView での動作を考慮して Google ログインを無効化
            // TODO: WebView での Google ログインを有効化する
            providers={isFromWebView ? [] : []}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'メールアドレス',
                  password_label: 'パスワード',
                  button_label: 'ログイン',
                  link_text: 'ログインはこちら！',
                  email_input_placeholder: 'example@example.com',
                },
                sign_up: {
                  email_label: 'メールアドレス',
                  password_label: 'パスワード',
                  button_label: '新規登録',
                  link_text: 'アカウントをお持ちでないですか？',
                  email_input_placeholder: 'example@example.com',
                  confirmation_text:
                    '確認メールを送信しました！メールを確認し、確認リンクをクリックしてください。',
                },
                forgotten_password: {
                  email_label: 'メールアドレス',
                  link_text: 'パスワードを忘れましたか？',
                  button_label: 'リセット',
                  email_input_placeholder: 'example@example.com',
                  confirmation_text:
                    'パスワードリセットメールを送信しました！メールを確認してください。',
                },
              },
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

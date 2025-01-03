import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Sprout,
  Calendar,
  BarChart2,
  Shield,
  ArrowRight,
  CheckCircle,
  Users,
  Star,
} from 'lucide-react';
import { Footer } from '../components/Footer';

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'シンプルな記録',
    description: '毎日の達成をワンタップで記録。複雑な操作は必要ありません。',
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: '視覚的な進捗',
    description: '月間・年間の進捗をカレンダーやヒートマップで確認できます。',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: '安全なデータ管理',
    description: 'データは安全に保管され、いつでもアクセスできます。',
  },
];

const testimonials = [
  {
    name: '田中さん',
    role: '会社員',
    content: '毎日の運動習慣が定着し、健康的な生活を送れるようになりました。',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
  },
  {
    name: '佐藤さん',
    role: 'フリーランス',
    content: '読書の習慣化に成功。知識が増え、仕事にも良い影響が出ています。',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: '山田さん',
    role: '学生',
    content: '毎日の学習記録をつけることで、モチベーションが維持できています。',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stats = [
  { icon: <Users />, value: '10,000+', label: 'ユーザー' },
  { icon: <CheckCircle />, value: '100万+', label: '達成記録' },
  { icon: <Star />, value: '4.8', label: '平均評価' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80">
      <Helmet>
        <title>Takusa - 習慣を育てるトラッキングアプリ</title>
        <meta
          name="description"
          content="Takusaは、日々の習慣を楽しく継続できるトラッキングアプリです。シンプルな操作で習慣を記録し、視覚的に進捗を確認できます。"
        />
        <meta
          name="keywords"
          content="習慣化,トラッキング,目標達成,自己管理,生活改善"
        />
        <meta
          property="og:title"
          content="Takusa - 習慣を育てるトラッキングアプリ"
        />
        <meta
          property="og:description"
          content="Takusaは、日々の習慣を楽しく継続できるトラッキングアプリです。シンプルな操作で習慣を記録し、視覚的に進捗を確認できます。"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=1200&h=630&fit=crop"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://takusa.app" />
      </Helmet>

      <header className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold text-gray-900">Takusa</span>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              ログイン
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=2070&q=80)] bg-cover bg-center bg-no-repeat opacity-5" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <div className="mb-6 flex justify-center lg:justify-start">
                  <Sprout className="h-16 w-16 text-indigo-600" />
                </div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  草を生やす、
                  <br />
                  習慣を育てる、
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                    未来を育てる
                  </span>
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
                  Takusaは、あなたの小さな一歩を
                  <br className="sm:hidden" />
                  大きな成長へと変えるお手伝いをします
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-opacity hover:opacity-90 hover:shadow-xl"
                >
                  無料で始める
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-pink-500/10 blur-xl" />
                <img
                  src="/assets/hero.png"
                  alt="Takusaアプリのスクリーンショット"
                  className="relative h-auto w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section、今のところはコメントアウト */}
        {/* <section className="py-12 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Features Section */}
        <section className="bg-white/80 py-20 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              シンプルで使いやすい
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-8 text-center transition-shadow hover:shadow-lg"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calendar Explanation Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                    なぜカレンダー表示が
                    <br />
                    <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                      効果的なのか？
                    </span>
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          視覚的な変化がモチベーションに
                        </h3>
                        <p className="leading-relaxed text-gray-600">
                          人は「視覚的な変化」に対して強い感情を持ちます。カレンダーが色づくことで、目に見える形で自分の成長を実感できます。
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                        <BarChart2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          空白を埋めたい心理
                        </h3>
                        <p className="leading-relaxed text-gray-600">
                          「空白を埋めたい」という心理効果が働くため、1日でも習慣を欠かすことが惜しくなり、自然と続けたくなるのです。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative lg:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-pink-500/5" />
                  <img
                    src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&h=600&q=80"
                    alt="カレンダーと手帳"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              ユーザーの声
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="leading-relaxed text-gray-600">
                    {testimonial.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white/80 py-20 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              あなたの習慣づけを始めましょう
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              1日1つの小さな積み重ねが、大きな変化を生み出します
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-opacity hover:opacity-90 hover:shadow-xl"
            >
              無料で始める
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

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
    icon: <Calendar className="w-6 h-6" />,
    title: 'シンプルな記録',
    description: '毎日の達成をワンタップで記録。複雑な操作は必要ありません。',
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: '視覚的な進捗',
    description: '月間・年間の進捗をカレンダーやヒートマップで確認できます。',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: '安全なデータ管理',
    description: 'データは安全に保管され、いつでもアクセスできます。',
  },
];

const testimonials = [
  {
    name: '田中さん',
    role: '会社員',
    content: '毎日の運動習慣が定着し、健康的な生活を送れるようになりました。',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
  },
  {
    name: '佐藤さん',
    role: 'フリーランス',
    content: '読書の習慣化に成功。知識が増え、仕事にも良い影響が出ています。',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: '山田さん',
    role: '学生',
    content: '毎日の学習記録をつけることで、モチベーションが維持できています。',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  },
];

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
        <meta name="description" content="Takusaは、日々の習慣を楽しく継続できるトラッキングアプリです。シンプルな操作で習慣を記録し、視覚的に進捗を確認できます。" />
        <meta name="keywords" content="習慣化,トラッキング,目標達成,自己管理,生活改善" />
        <meta property="og:title" content="Takusa - 習慣を育てるトラッキングアプリ" />
        <meta property="og:description" content="Takusaは、日々の習慣を楽しく継続できるトラッキングアプリです。シンプルな操作で習慣を記録し、視覚的に進捗を確認できます。" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=1200&h=630&fit=crop" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://takusa.app" />
      </Helmet>

      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold text-gray-900">Takusa</span>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              ログイン
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=2070&q=80)] bg-cover bg-center bg-no-repeat opacity-5" />
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-6">
                  <Sprout className="w-16 h-16 text-indigo-600" />
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                  草を生やす、<br />
                  習慣を育てる、<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                    未来を育てる
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                  Takusaは、あなたの小さな一歩を
                  <br className="sm:hidden" />
                  大きな成長へと変えるお手伝いをします
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-pink-600 rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
                >
                  無料で始める
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-2xl blur-xl" />
                <img
                  src="/assets/hero.png"
                  alt="Takusaアプリのスクリーンショット"
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
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
        <section className="py-20 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              シンプルで使いやすい
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calendar Explanation Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                    なぜカレンダー表示が
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                      効果的なのか？
                    </span>
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">視覚的な変化がモチベーションに</h3>
                        <p className="text-gray-600 leading-relaxed">
                          人は「視覚的な変化」に対して強い感情を持ちます。カレンダーが色づくことで、目に見える形で自分の成長を実感できます。
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                        <BarChart2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">空白を埋めたい心理</h3>
                        <p className="text-gray-600 leading-relaxed">
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
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              ユーザーの声
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              あなたの習慣づけを始めましょう
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              1日1つの小さな積み重ねが、大きな変化を生み出します
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-pink-600 rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
            >
              無料で始める
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
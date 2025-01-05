import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

export default function Settings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>戻る</span>
            </button>
          </div>

          <h1 className="mb-8 text-xl font-bold text-gray-900">設定</h1>

          <div className="space-y-6">
            {/* 週の開始日設定 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                週の開始日
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateSettings({ weekStartsOnMonday: false })}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    !settings.weekStartsOnMonday
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  日曜日
                </button>
                <button
                  onClick={() => updateSettings({ weekStartsOnMonday: true })}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    settings.weekStartsOnMonday
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  月曜日
                </button>
              </div>
            </div>

            {/* 達成日数の表示設定 */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  達成日数の表示
                </div>
                <p className="text-xs text-gray-600">
                  習慣カードに達成日数を表示します
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.showAchievementCount}
                  onChange={(e) =>
                    updateSettings({ showAchievementCount: e.target.checked })
                  }
                  className="peer sr-only"
                />
                <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-200 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

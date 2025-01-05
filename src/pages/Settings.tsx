import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useState } from 'react';
import type { Settings } from '../types/settings';

export default function Settings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState<Settings>(settings);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(localSettings);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('設定の保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(localSettings);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">戻る</span>
            </button>

            <button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:bg-gray-300"
            >
              <Save className="h-4 w-4" />
              {saving ? '保存中...' : '保存'}
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
                  onClick={() =>
                    setLocalSettings({
                      ...localSettings,
                      weekStartsOnMonday: false,
                    })
                  }
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    !localSettings.weekStartsOnMonday
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  日曜日
                </button>
                <button
                  onClick={() =>
                    setLocalSettings({
                      ...localSettings,
                      weekStartsOnMonday: true,
                    })
                  }
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    localSettings.weekStartsOnMonday
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
                  checked={localSettings.showAchievementCount}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      showAchievementCount: e.target.checked,
                    })
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

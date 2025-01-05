import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useState } from 'react';
import type { Settings } from '../types/settings';
import { Calendar, CalendarRange } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState<Settings>(settings);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await updateSettings(localSettings);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveError('設定の保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(localSettings);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">戻る</span>
            </button>

            <button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                hasChanges && !saving
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Save className="h-4 w-4" />
              {saving ? '保存中...' : '保存'}
            </button>
          </div>

          <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
            設定
          </h1>

          {saveError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {saveError}
            </div>
          )}

          <div className="space-y-8">
            {/* 週の開始日設定 */}
            <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-base font-medium text-gray-900">
                  週の開始日
                </div>
              </div>
              <p className="text-sm text-gray-600">
                カレンダーの週の始まりを設定します。習慣の記録をより自然な形で管理できます。
              </p>
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
            <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-base font-medium text-gray-900">
                  達成日数の表示
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
                  <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-200 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
                </label>
              </div>
              <p className="text-sm text-gray-600">
                習慣カードに達成日数を表示します。各習慣の継続日数を一目で確認できます。
              </p>
            </div>

            {/* デフォルトの表示モード設定 */}
            <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-base font-medium text-gray-900">
                  デフォルトの表示モード
                </div>
              </div>
              <p className="text-sm text-gray-600">
                ダッシュボードを開いた時の表示モードを設定します。月単位または年単位で習慣の進捗を確認できます。
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setLocalSettings({
                      ...localSettings,
                      defaultViewMode: 'month',
                    })
                  }
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    localSettings.defaultViewMode === 'month'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  月表示
                </button>
                <button
                  onClick={() =>
                    setLocalSettings({
                      ...localSettings,
                      defaultViewMode: 'year',
                    })
                  }
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    localSettings.defaultViewMode === 'year'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <CalendarRange className="h-4 w-4" />
                  年表示
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

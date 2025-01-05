import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useState } from 'react';
import type { Settings } from '../types/settings';
import { Calendar, CalendarRange } from 'lucide-react';
import { ViewMode } from '../types/view';

type SettingsCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const SettingsCard = ({ title, description, children }: SettingsCardProps) => {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <div className="text-base font-medium text-gray-900">{title}</div>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      {children}
    </div>
  );
};

type ToggleButtonProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const ToggleButton = ({ checked, onChange }: ToggleButtonProps) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-200 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </label>
  );
};

type ButtonGroupProps = {
  options: { value: string; label: string; icon?: JSX.Element }[];
  value: string;
  onChange: (value: string) => void;
};

function ButtonGroup({ options, value, onChange }: ButtonGroupProps) {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            value === option.value
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}

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
            <SettingsCard
              title="週の開始日"
              description="カレンダーの週の始まりを設定します。習慣の記録をより自然な形で管理できます。"
            >
              <ButtonGroup
                options={[
                  { value: 'sunday', label: '日曜日' },
                  { value: 'monday', label: '月曜日' },
                ]}
                value={localSettings.weekStartsOnMonday ? 'monday' : 'sunday'}
                onChange={(value) =>
                  setLocalSettings({
                    ...localSettings,
                    weekStartsOnMonday: value === 'monday',
                  })
                }
              />
            </SettingsCard>

            <SettingsCard
              title="達成日数の表示"
              description="習慣カードに達成日数を表示します。各習慣の継続日数を一目で確認できます。"
            >
              <div className="flex items-center justify-end">
                <ToggleButton
                  checked={localSettings.showAchievementCount}
                  onChange={(checked) =>
                    setLocalSettings({
                      ...localSettings,
                      showAchievementCount: checked,
                    })
                  }
                />
              </div>
            </SettingsCard>

            <SettingsCard
              title="デフォルトの表示モード"
              description="ダッシュボードを開いた時の表示モードを設定します。月単位または年単位で習慣の進捗を確認できます。"
            >
              <ButtonGroup
                options={[
                  {
                    value: 'month',
                    label: '月表示',
                    icon: <Calendar className="h-4 w-4" />,
                  },
                  {
                    value: 'year',
                    label: '年表示',
                    icon: <CalendarRange className="h-4 w-4" />,
                  },
                ]}
                value={localSettings.defaultViewMode}
                onChange={(value) =>
                  setLocalSettings({
                    ...localSettings,
                    defaultViewMode: value as ViewMode,
                  })
                }
              />
            </SettingsCard>
          </div>
        </div>
      </div>
    </div>
  );
}

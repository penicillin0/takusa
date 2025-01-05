import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';
import { type Settings, DEFAULT_SETTINGS } from '../types/settings';
import { ViewMode } from '../types/view';

type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const loadSettings = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setSettings({
          weekStartsOnMonday: data.week_starts_on_monday,
          showAchievementCount: data.show_achievement_count,
          defaultViewMode: data.default_view_mode as ViewMode,
        });
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    // まず既存の設定を確認
    const { data: existingSettings } = await supabase
      .from('user_settings')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (existingSettings) {
      // 既存の設定がある場合は更新
      await supabase
        .from('user_settings')
        .update({
          week_starts_on_monday: updatedSettings.weekStartsOnMonday,
          show_achievement_count: updatedSettings.showAchievementCount,
          default_view_mode: updatedSettings.defaultViewMode,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    } else {
      // 設定が存在しない場合は新規作成
      await supabase.from('user_settings').insert({
        user_id: user.id,
        week_starts_on_monday: updatedSettings.weekStartsOnMonday,
        show_achievement_count: updatedSettings.showAchievementCount,
        default_view_mode: updatedSettings.defaultViewMode,
      });
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

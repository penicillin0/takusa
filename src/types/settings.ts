import { ViewMode } from './view';

export type Settings = {
  weekStartsOnMonday: boolean;
  showAchievementCount: boolean;
  defaultViewMode: ViewMode;
};

export const DEFAULT_SETTINGS: Settings = {
  weekStartsOnMonday: false,
  showAchievementCount: true,
  defaultViewMode: 'month',
};

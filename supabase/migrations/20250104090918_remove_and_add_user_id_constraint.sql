-- 外部キー制約を削除
ALTER TABLE habits DROP CONSTRAINT habits_user_id_fkey;

-- 新たな外部キー制約を追加（ON DELETE CASCADE付き）
ALTER TABLE habits
ADD CONSTRAINT habits_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE;

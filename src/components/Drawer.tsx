import {
  X,
  Mail,
  Shield,
  FileText,
  LogOut,
  ChevronRight,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type MenuItem = {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
};

export function Drawer({ isOpen, onClose }: Props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
    onClose();
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        '⚠️ 警告: アカウントを削除すると、全てのデータが完全に削除され、この操作は取り消せません。\n\n本当にアカウントを削除しますか？'
      )
    ) {
      return;
    }

    try {
      const id = (await supabase.auth.getUser()).data.user?.id;

      if (!id) {
        alert('アカウントの削除に失敗しました');
        return;
      }

      const { error } = await supabase.functions.invoke('delete-own', {
        body: { id },
      });
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('アカウントの削除に失敗しました');
    }
  };

  const menuItems: MenuItem[] = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'お問い合わせ',
      onClick: () => {
        window.location.href = 'mailto:contact@takusa.app';
        onClose();
      },
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: 'プライバシーポリシー',
      onClick: () => {
        window.location.href = '/privacy';
        onClose();
      },
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: '利用規約',
      onClick: () => {
        window.location.href = '/terms';
        onClose();
      },
    },
    {
      icon: <LogOut className="h-5 w-5" />,
      label: 'ログアウト',
      onClick: handleLogout,
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity ${
          isOpen ? 'bg-opacity-50' : 'pointer-events-none bg-opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="float-end flex h-16 items-center px-4">
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-3">
          <nav className="space-y-0.5">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="group flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-gray-600 transition-all hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-gray-900"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 text-gray-500 transition-colors group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-sm">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-600" />
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 w-full space-y-3 border-t bg-gray-50/50 p-3">
          <button
            onClick={handleDeleteAccount}
            className="group flex w-full items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-red-600 transition-colors hover:bg-red-100"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-100 text-red-600 transition-colors group-hover:bg-red-200">
                <Trash2 className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">アカウントを削除</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <div className="text-center text-xs text-gray-500">Takusa v0.0.1</div>
        </div>
      </div>
    </>
  );
}

import { X, Mail, Shield, FileText, LogOut } from 'lucide-react';
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
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onClose();
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
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-56 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center float-end px-4">
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-2">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-3 text-gray-700 transition-colors hover:bg-gray-100"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

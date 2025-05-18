import React from 'react';
import { 
  Home, 
  FileText, 
  Map, 
  BarChart4, 
  MessageSquare, 
  User, 
  Settings, 
  HelpCircle,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  roles?: Array<'user' | 'admin' | 'police'>;
  badge?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();
  const role = user?.role || 'user';

  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      icon: <Home size={20} />,
      path: '/dashboard',
    },
    {
      title: 'Report Crime',
      icon: <AlertTriangle size={20} />,
      path: '/report',
    },
    {
      title: 'My Reports',
      icon: <FileText size={20} />,
      path: '/my-reports',
      badge: 3,
    },
    {
      title: 'Crime Map',
      icon: <Map size={20} />,
      path: '/map',
    },
    {
      title: 'Analytics',
      icon: <BarChart4 size={20} />,
      path: '/analytics',
      roles: ['admin', 'police'],
    },
    {
      title: 'Chat Assistant',
      icon: <MessageSquare size={20} />,
      path: '/chat',
    },
    {
      title: 'User Management',
      icon: <User size={20} />,
      path: '/users',
      roles: ['admin'],
    },
    {
      title: 'Settings',
      icon: <Settings size={20} />,
      path: '/settings',
    },
    {
      title: 'Help & Support',
      icon: <HelpCircle size={20} />,
      path: '/help',
    },
  ];

  const filteredItems = sidebarItems.filter(
    item => !item.roles || item.roles.includes(role)
  );

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-20 flex flex-col w-64 pt-16 bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {filteredItems.map((item) => (
            <a
              key={item.title}
              href={item.path}
              className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-800 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-500 transition-all duration-200"
            >
              <div className="text-gray-500 dark:text-gray-400">{item.icon}</div>
              <span className="ml-3">{item.title}</span>
              {item.badge && (
                <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={16} className="ml-auto text-gray-400" />
            </a>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center">
              {user?.name?.charAt(0).toUpperCase() || 'G'}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {user?.name || 'Guest'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {user?.role || 'Not logged in'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
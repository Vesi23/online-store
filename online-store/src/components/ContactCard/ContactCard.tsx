import React from 'react';

type ContactCardProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  bgClass?: string;
};

const ContactCard: React.FC<ContactCardProps> = ({ title, icon, children, bgClass = 'bg-gradient-to-br from-blue-500 to-purple-600' }) => {
  return (
    <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 hover:bg-white/80 transition-all duration-300 shadow-lg overflow-hidden">
      <div className="md:flex md:items-start md:space-x-6">
        {/* Header: icon + mobile title (icon left, title next) */}
        <div className="flex items-center md:block mb-4 md:mb-0">
          <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${bgClass}`}> 
            {icon}
          </div>
          <h4 className="ml-3 text-base font-bold text-gray-800 block md:hidden">{title}</h4>
        </div>

        {/* Content: desktop title (shown on md+) + body */}
        <div className="text-left max-w-full">
          <h4 className="hidden md:block text-lg font-bold text-gray-800 mb-2">{title}</h4>
          <div className="text-gray-700 text-sm md:text-base break-words break-all whitespace-normal leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

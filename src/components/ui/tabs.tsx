import React, { useState } from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  activeTab: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

interface TabsListProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsList) {
          return React.cloneElement(child as React.ReactElement<TabsListProps>, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ activeTab, setActiveTab, children }) => (
  <div className="flex space-x-4">
    {React.Children.map(children, (child) => {
      if (React.isValidElement<TabsTriggerProps>(child) && child.type === TabsTrigger) {
        return React.cloneElement(child as React.ReactElement<TabsTriggerProps>, { activeTab, setActiveTab });
      }
      return child;
    })}
  </div>
);

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, activeTab, setActiveTab, children }) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`py-2 px-4 ${activeTab === value ? 'border-b-2 border-blue-500' : ''}`}
  >
    {children}
  </button>
);

export const TabsContent: React.FC<TabsContentProps> = ({ value, activeTab, children }) => {
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};
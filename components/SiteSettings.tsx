
import React, { useState, useEffect } from 'react';
import { SiteSettings as SiteSettingsType } from '../hooks/useSiteSettings';

interface SiteSettingsProps {
  currentSettings: SiteSettingsType;
  onSave: (settings: SiteSettingsType) => void;
}

const SettingRow: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-white/5 last:border-0">
        <div className="mb-4 sm:mb-0">
            <h3 className="text-base font-bold text-white">{title}</h3>
            <p className="text-xs text-gray-500 mt-1 pr-4 leading-relaxed">{description}</p>
        </div>
        <div className="sm:col-span-2">
            {children}
        </div>
    </div>
);

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; name: string }> = ({ checked, onChange, name }) => (
    <label htmlFor={name} className="relative inline-flex items-center cursor-pointer group">
        <input type="checkbox" id={name} name={name} className="sr-only peer" checked={checked} onChange={e => onChange(e.target.checked)} />
        <div className="w-14 h-8 bg-gray-700/50 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-purple peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-purple shadow-inner transition-colors"></div>
    </label>
);


const SiteSettings: React.FC<SiteSettingsProps> = ({ currentSettings, onSave }) => {
    const [settings, setSettings] = useState<SiteSettingsType>(currentSettings);
    
    useEffect(() => {
        setSettings(currentSettings);
    }, [currentSettings]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({...prev, [name]: value}));
    };
    
    const handleLocalizedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [field, lang] = name.split('.');
        setSettings(prev => ({
            ...prev,
            [field]: {
                ...(prev[field as keyof SiteSettingsType] as object),
                [lang]: value,
            }
        }));
    };


    const handleToggle = (name: keyof SiteSettingsType, checked: boolean) => {
         setSettings(prev => ({ ...prev, [name]: checked }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(settings);
    };

    const themes = [
        { name: 'purple', bg: 'bg-purple-600', ring: 'ring-purple-500' },
        { name: 'blue', bg: 'bg-blue-600', ring: 'ring-blue-500' },
        { name: 'green', bg: 'bg-green-600', ring: 'ring-green-500' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
                <div>
                     <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
                     <p className="text-brand-gray mt-1">Configure global site preferences.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* General Settings */}
                <div className="bg-[#1a102e]/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/5 shadow-xl">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                        <span className="material-symbols-outlined text-brand-purple text-2xl">tune</span>
                        <h2 className="text-xl font-bold text-white">General Information</h2>
                    </div>
                    
                    <SettingRow title="Site Name" description="This name appears in the header, footer, and browser tab.">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Turkish (TR)</label>
                                <input type="text" name="siteName.tr" value={settings.siteName.tr} onChange={handleLocalizedChange} className="w-full bg-[#0f0720]/50 rounded-xl p-3 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">English (EN)</label>
                                <input type="text" name="siteName.en" value={settings.siteName.en} onChange={handleLocalizedChange} className="w-full bg-[#0f0720]/50 rounded-xl p-3 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all" />
                            </div>
                         </div>
                    </SettingRow>
                    <SettingRow title="Site Slogan" description="A short tagline that appears under the site name in the header.">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Turkish (TR)</label>
                                <input type="text" name="siteSlogan.tr" value={settings.siteSlogan.tr} onChange={handleLocalizedChange} className="w-full bg-[#0f0720]/50 rounded-xl p-3 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">English (EN)</label>
                                <input type="text" name="siteSlogan.en" value={settings.siteSlogan.en} onChange={handleLocalizedChange} className="w-full bg-[#0f0720]/50 rounded-xl p-3 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all" />
                            </div>
                        </div>
                    </SettingRow>
                    <SettingRow title="Contact Email" description="The email address for user support and contact inquiries.">
                        <input type="email" name="contactEmail" id="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full md:w-2/3 bg-[#0f0720]/50 rounded-xl p-3 border border-white/10 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple text-white transition-all" />
                    </SettingRow>
                </div>

                {/* Appearance */}
                <div className="bg-[#1a102e]/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/5 shadow-xl">
                     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                        <span className="material-symbols-outlined text-brand-light-purple text-2xl">palette</span>
                        <h2 className="text-xl font-bold text-white">Appearance & Features</h2>
                    </div>
                    
                    <SettingRow title="Theme Color" description="Changes the primary accent color across the site.">
                        <fieldset>
                            <div className="flex items-center space-x-4 bg-[#0f0720]/50 p-3 rounded-xl inline-flex border border-white/5">
                                {themes.map(theme => (
                                    <label key={theme.name} className="relative cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="themeColor"
                                            value={theme.name}
                                            checked={settings.themeColor === theme.name}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <div className={`w-10 h-10 rounded-full ${theme.bg} shadow-lg transition-transform transform group-hover:scale-110 flex items-center justify-center`}>
                                            {settings.themeColor === theme.name && <span className="material-symbols-outlined text-white text-lg">check</span>}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </SettingRow>
                    <SettingRow title="Show Featured Section" description="Enable or disable the large hero carousel on the homepage.">
                        <ToggleSwitch name="showFeaturedSection" checked={settings.showFeaturedSection} onChange={(checked) => handleToggle('showFeaturedSection', checked)} />
                    </SettingRow>
                </div>

                {/* Advanced */}
                <div className="bg-[#1a102e]/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/5 shadow-xl">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                        <span className="material-symbols-outlined text-red-400 text-2xl">security</span>
                        <h2 className="text-xl font-bold text-white">Advanced Controls</h2>
                    </div>
                    <SettingRow title="Maintenance Mode" description="When enabled, only logged-in admins can view the site. All other visitors will see a maintenance page.">
                         <div className="flex items-center gap-4">
                            <ToggleSwitch name="maintenanceMode" checked={settings.maintenanceMode} onChange={(checked) => handleToggle('maintenanceMode', checked)} />
                            {settings.maintenanceMode && <span className="text-xs font-bold text-yellow-400 animate-pulse uppercase tracking-widest">Active</span>}
                        </div>
                    </SettingRow>
                </div>

                <div className="fixed bottom-6 right-6 z-20">
                     <button type="submit" className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-brand-purple/50 flex items-center gap-2 transform hover:scale-105">
                        <span className="material-symbols-outlined">save</span>
                        Save All Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SiteSettings;

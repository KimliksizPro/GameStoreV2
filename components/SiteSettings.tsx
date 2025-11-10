
import React, { useState, useEffect } from 'react';
import { SiteSettings as SiteSettingsType } from '../hooks/useSiteSettings';

interface SiteSettingsProps {
  currentSettings: SiteSettingsType;
  onSave: (settings: SiteSettingsType) => void;
}

const SettingRow: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
        <div className="text-sm font-medium text-white">{title}</div>
        <div className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <div className="flex-grow">
                {children}
                <p className="text-xs text-brand-gray mt-2">{description}</p>
            </div>
        </div>
    </div>
);

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; name: string }> = ({ checked, onChange, name }) => (
    <label htmlFor={name} className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" id={name} name={name} className="sr-only peer" checked={checked} onChange={e => onChange(e.target.checked)} />
        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-purple peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-purple"></div>
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
        <div className="animate-fadeIn">
            <h1 className="text-4xl font-bold mb-8">Site Settings</h1>
            <form onSubmit={handleSubmit}>
                <div className="bg-brand-dark p-6 sm:p-8 rounded-lg border border-gray-800">
                    <h2 className="text-xl font-bold border-b border-gray-700 pb-4 mb-4">General</h2>
                    <div className="divide-y divide-gray-800">
                        <SettingRow title="Site Name" description="This name appears in the header, footer, and browser tab.">
                             <input type="text" name="siteName" id="siteName" value={settings.siteName} onChange={handleChange} className="w-full md:w-1/2 bg-brand-light-gray/20 rounded-md p-2 border border-gray-700 focus:ring-brand-purple focus:border-brand-purple"/>
                        </SettingRow>
                        <SettingRow title="Site Slogan" description="A short tagline that appears under the site name in the header.">
                             <input type="text" name="siteSlogan" id="siteSlogan" value={settings.siteSlogan} onChange={handleChange} className="w-full md:w-1/2 bg-brand-light-gray/20 rounded-md p-2 border border-gray-700 focus:ring-brand-purple focus:border-brand-purple"/>
                        </SettingRow>
                        <SettingRow title="Contact Email" description="The email address for user support and contact inquiries.">
                            <input type="email" name="contactEmail" id="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full md:w-1/2 bg-brand-light-gray/20 rounded-md p-2 border border-gray-700 focus:ring-brand-purple focus:border-brand-purple"/>
                        </SettingRow>
                    </div>
                </div>

                <div className="bg-brand-dark p-6 sm:p-8 rounded-lg border border-gray-800 mt-8">
                     <h2 className="text-xl font-bold border-b border-gray-700 pb-4 mb-4">Appearance & Features</h2>
                     <div className="divide-y divide-gray-800">
                        <SettingRow title="Theme Color" description="Changes the primary accent color across the site.">
                            <fieldset>
                                <div className="flex items-center space-x-4">
                                    {themes.map(theme => (
                                        <label key={theme.name} className="flex items-center gap-2 cursor-pointer capitalize">
                                            <input
                                                type="radio"
                                                name="themeColor"
                                                value={theme.name}
                                                checked={settings.themeColor === theme.name}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <span className={`h-8 w-8 rounded-full ${theme.bg} flex items-center justify-center transition-all ${settings.themeColor === theme.name ? `ring-2 ring-offset-2 ring-offset-brand-dark ${theme.ring}` : ''}`}></span>
                                            {theme.name}
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        </SettingRow>
                        <SettingRow title="Show Featured Section" description="Enable or disable the large hero carousel on the homepage.">
                            <ToggleSwitch name="showFeaturedSection" checked={settings.showFeaturedSection} onChange={(checked) => handleToggle('showFeaturedSection', checked)} />
                        </SettingRow>
                    </div>
                </div>

                <div className="bg-brand-dark p-6 sm:p-8 rounded-lg border border-gray-800 mt-8">
                    <h2 className="text-xl font-bold border-b border-gray-700 pb-4 mb-4 text-yellow-400">Advanced</h2>
                    <div className="divide-y divide-gray-800">
                        <SettingRow title="Maintenance Mode" description="When enabled, only logged-in admins can view the site. All other visitors will see a maintenance page.">
                            <ToggleSwitch name="maintenanceMode" checked={settings.maintenanceMode} onChange={(checked) => handleToggle('maintenanceMode', checked)} />
                        </SettingRow>
                    </div>
                </div>

                <div className="mt-8">
                     <button type="submit" className="bg-brand-purple hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/50">
                        Save All Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SiteSettings;
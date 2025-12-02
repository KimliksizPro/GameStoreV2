import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Logo = ({ siteName }: { siteName: string }) => (
    <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-purple">
                <path d="M4 4H12V12H4V4Z" fill="currentColor"/>
                <path d="M12 12H20V20H12V12Z" fill="currentColor"/>
            </svg>
        </div>
        <span className="font-bold text-lg">{siteName}</span>
    </div>
);

const SocialIcon: React.FC<{href: string, children: React.ReactNode}> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-brand-purple hover:scale-110 transition-all duration-300">
        {children}
    </a>
);

const Footer: React.FC<{ siteName: string, contactEmail: string }> = ({ siteName, contactEmail }) => {
    const { t } = useTranslation();
    return (
        <footer className="relative mt-32 border-t border-white/5 bg-[#0a0515]">
             {/* Glow effect at the top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <Logo siteName={siteName} />
                        <p className="text-sm text-gray-500 max-w-xs text-center md:text-left">
                            The ultimate destination for downloading and discovering your next favorite game.
                        </p>
                    </div>
                    
                    <div className="flex gap-4">
                        <SocialIcon href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></SocialIcon>
                        <SocialIcon href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-2.484-2.208-2.484 2.208-2.58 2.28v-21.528c0-1.368 1.104-2.472 2.46-2.472h7.668zM6.18 8.124h4.512v4.032H6.18V8.124zm8.136 0h4.512v4.032h-4.512V8.124z"></path></svg></SocialIcon>
                        <SocialIcon href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg></SocialIcon>
                    </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400 font-medium mb-8">
                    <a href="#" className="hover:text-brand-purple transition-colors">{t('footer.about')}</a>
                    <a href="#" className="hover:text-brand-purple transition-colors">{t('footer.privacy')}</a>
                    <a href="#" className="hover:text-brand-purple transition-colors">{t('footer.terms')}</a>
                    {contactEmail && <a href={`mailto:${contactEmail}`} className="hover:text-brand-purple transition-colors">{t('footer.contact')}</a>}
                </div>

                <div className="pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-600 text-xs">{t('footer.copyright', { siteName })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
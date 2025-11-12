
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Logo = ({ siteName }: { siteName: string }) => (
    <div className="flex items-center gap-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H12V12H4V4Z" fill="currentColor" className="text-brand-light-purple"/>
            <path d="M12 12H20V20H12V12Z" fill="currentColor" className="text-brand-purple"/>
        </svg>
        <span className="font-bold text-xl">{siteName}</span>
    </div>
);

const SocialIcon: React.FC<{href: string, children: React.ReactNode}> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-white transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC<{ siteName: string, contactEmail: string }> = ({ siteName, contactEmail }) => {
    const { t } = useTranslation();
    return (
        <footer className="bg-brand-dark mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                            <Logo siteName={siteName} />
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-brand-gray">
                                <a href="#" className="hover:text-white transition-colors duration-300">{t('footer.about')}</a>
                                <a href="#" className="hover:text-white transition-colors duration-300">{t('footer.privacy')}</a>
                                <a href="#" className="hover:text-white transition-colors duration-300">{t('footer.terms')}</a>
                                {contactEmail && <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors duration-300">{t('footer.contact')}</a>}
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <SocialIcon href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></SocialIcon>
                            <SocialIcon href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-2.484-2.208-2.484 2.208-2.58 2.28v-21.528c0-1.368 1.104-2.472 2.46-2.472h7.668zM6.18 8.124h4.512v4.032H6.18V8.124zm8.136 0h4.512v4.032h-4.512V8.124z"></path></svg></SocialIcon>
                            <SocialIcon href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg></SocialIcon>
                        </div>
                    </div>
                     <p className="text-brand-gray text-sm text-center mt-8 pt-8 border-t border-gray-800">{t('footer.copyright', { siteName })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
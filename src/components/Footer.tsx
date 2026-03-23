export default function Footer() {
  const socialLinks = [
    {
      name: 'X (Twitter)',
      href: 'https://twitter.com/kwetuplace',
      icon: 'fa-x-twitter',
      color: 'hover:text-gray-300'
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/kwetu_grill',
      icon: 'fa-instagram',
      color: 'hover:text-pink-400'
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@kwetu_grill',
      icon: 'fa-tiktok',
      color: 'hover:text-gray-300'
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/254123456789',
      icon: 'fa-whatsapp',
      color: 'hover:text-green-400'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Kwetu Place</h3>
          <p className="text-gray-400 mb-8">
            Experience luxury and comfort at its finest. Your home away from home.
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                aria-label={social.name}
              >
                <i className={`fab ${social.icon} text-2xl`}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Kwetu Place. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

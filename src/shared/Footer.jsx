import { Link } from "react-router-dom";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { FiGithub, FiTwitter, FiLinkedin, FiYoutube } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { label: "Browse Courses", to: "/allclass" },
      { label: "Become an Instructor", to: "/teach" },
      { label: "Pricing", to: "/allclass" },
      { label: "Success Stories", to: "/" },
    ],
    Resources: [
      { label: "Help Center", to: "/" },
      { label: "Blog", to: "/" },
      { label: "Community", to: "/" },
      { label: "Documentation", to: "/" },
    ],
    Company: [
      { label: "About Us", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Contact", to: "/" },
      { label: "Press Kit", to: "/" },
    ],
    Legal: [
      { label: "Privacy Policy", to: "/" },
      { label: "Terms of Service", to: "/" },
      { label: "Cookie Policy", to: "/" },
      { label: "GDPR", to: "/" },
    ],
  };

  const socials = [
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiGithub, href: "https://github.com/gazimaksudur2", label: "GitHub" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiYoutube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-surface-900 text-surface-300">
      <div className="section-container section-padding">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <HiOutlineAcademicCap className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-white">
                Elevate<span className="text-brand-400">Ex</span>
              </span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed max-w-xs mb-6">
              Empowering learners worldwide with expert-led courses, hands-on projects, and a vibrant community of educators and students.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-800 text-surface-400 hover:bg-brand-600 hover:text-white transition-all duration-200"
                >
                  <s.icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-surface-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-surface-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-surface-500">
            &copy; {year} ElevateEx. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-surface-500 hover:text-surface-300 transition-colors">Privacy</Link>
            <Link to="/" className="text-sm text-surface-500 hover:text-surface-300 transition-colors">Terms</Link>
            <Link to="/" className="text-sm text-surface-500 hover:text-surface-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

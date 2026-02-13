const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content mt-10">
      <aside className="space-y-2">
        <h2 className="text-xl font-bold text-primary">ScholarStream</h2>
        <p>
          © {new Date().getFullYear()} ScholarStream — All rights reserved.
        </p>

        <div className="flex gap-4 text-sm opacity-70">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </aside>
    </footer>
  );
};

export default Footer;

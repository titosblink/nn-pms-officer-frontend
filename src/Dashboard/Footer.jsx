// src/Dashboard/Footer.jsx
export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1280px] px-6 py-3.5 text-sm">
      <div className="flex items-center justify-between gap-3 max-lg:flex-col">
        <p className="text-base-content text-center">
          &copy;2025{" "}
          <a href="https://flyonui.com/" className="text-primary">
            Nigerian Navy
          </a>
        </p>
        <div className="flex items-center gap-4 justify-center max-sm:flex-col">
          <a
            href="#"
            className="link link-primary link-animated font-normal"
            aria-label="More Templates"
            target="_blank"
          >
            Designed by OC Aluu
          </a>
        </div>
      </div>
    </footer>
  );
}

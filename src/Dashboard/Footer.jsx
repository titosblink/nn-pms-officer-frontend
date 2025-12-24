import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1280px] px-6 py-3.5 text-sm">
      <div className="flex items-center justify-between gap-3 max-lg:flex-col">
        <p className="text-base-content text-center">
          ©2025
          <Link href="#" className="text-primary"> Nigerian Navy</Link>
        </p>
        <div className="justify-enter flex items-center gap-4 max-sm:flex-col">
          <Link href="#" className="link link-primary link-animated font-normal" aria-label="More Templates" target="_blank">Designed by OC Aluu</Link>
        </div>
      </div>
    </footer>
  );
}

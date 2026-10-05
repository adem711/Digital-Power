import { SITE } from "@/lib/content";
import { buttonClass } from "./button";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/** Sticky call / WhatsApp bar, mobile only. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 glass-blur border-t border-white/10 bg-night/90 p-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={SITE.phone.href} className={buttonClass("primary", "!min-h-12")}>
          <PhoneIcon /> Appeler
        </a>
        <a
          href={SITE.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass("blue", "!min-h-12")}
        >
          <WhatsAppIcon /> WhatsApp
        </a>
      </div>
    </div>
  );
}

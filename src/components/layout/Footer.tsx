export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 relative overflow-hidden z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[var(--color-blood-red)] rounded-sm transform rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-sm transform -rotate-45"></div>
              </div>
              <span className="font-bebas text-3xl tracking-widest text-glow">APEX</span>
            </div>
            <p className="font-sans text-gray-500 text-sm max-w-sm">
              The premier training protocol for those who demand absolute physical dominance. Forged in discipline, built in darkness.
            </p>
          </div>
          
          <div>
            <h4 className="font-sans text-white font-bold tracking-widest uppercase text-sm mb-6">Headquarters</h4>
            <ul className="space-y-4 font-sans text-gray-500 text-sm">
              <li className="hover:text-[var(--color-crimson-glow)] cursor-pointer transition-colors">Programs</li>
              <li className="hover:text-[var(--color-crimson-glow)] cursor-pointer transition-colors">AI Tracking</li>
              <li className="hover:text-[var(--color-crimson-glow)] cursor-pointer transition-colors">Nutrition</li>
              <li className="hover:text-[var(--color-crimson-glow)] cursor-pointer transition-colors">The League</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans text-white font-bold tracking-widest uppercase text-sm mb-6">Support</h4>
            <ul className="space-y-4 font-sans text-gray-500 text-sm">
              <li className="hover:text-[var(--color-crimson-glow)] cursor-pointer transition-colors">FAQ</li>
              <li className="hover:text-[var(--color-crimson-glow)] cursor-pointer transition-colors">Contact</li>
              <li className="hover:text-[var(--color-crimson-glow)] cursor-pointer transition-colors">Terms of Protocol</li>
              <li className="hover:text-[var(--color-crimson-glow)] cursor-pointer transition-colors">Privacy</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-gray-600 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} APEX Protocol. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-gray-600">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 border border-gray-800 rounded-sm hover:border-[var(--color-blood-red)] hover:text-[var(--color-crimson-glow)] flex items-center justify-center cursor-pointer transition-all">
              <span className="text-xs">IG</span>
            </div>
            <div className="w-8 h-8 border border-gray-800 rounded-sm hover:border-[var(--color-blood-red)] hover:text-[var(--color-crimson-glow)] flex items-center justify-center cursor-pointer transition-all">
              <span className="text-xs">X</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

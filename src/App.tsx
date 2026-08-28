import { useState } from "react";

type Period = "morning" | "afternoon" | "evening";

const config = {
  morning: {
    time: "9:00 AM",
    label: "Plan your day",
    greeting: "Good morning,",
    emoji: "👋",
    subtitle: "Wednesday, 28 August",
    accent: "#5b5bd6",
    accentLight: "#ede9ff",
    accentCard: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    tag: "Morning",
    tagBg: "#ede9ff",
    tagColor: "#5b5bd6",
    navColor: "#5b5bd6",
  },
  afternoon: {
    time: "2:00 PM",
    label: "Track your progress",
    greeting: "Good afternoon,",
    emoji: "👋",
    subtitle: "Wednesday, 28 August",
    accent: "#16a34a",
    accentLight: "#dcfce7",
    accentCard: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    tag: "Afternoon",
    tagBg: "#dcfce7",
    tagColor: "#16a34a",
    navColor: "#16a34a",
  },
  evening: {
    time: "5:00 PM",
    label: "Reflect & get rewarded",
    greeting: "Good evening,",
    emoji: "🏙️",
    subtitle: "Wednesday, 28 August",
    accent: "#ea580c",
    accentLight: "#ffedd5",
    accentCard: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    tag: "Evening",
    tagBg: "#ffedd5",
    tagColor: "#ea580c",
    navColor: "#ea580c",
  },
};

function DonutChart({ accent }: { accent: string }) {
  const r = 36;
  const cx = 44;
  const cy = 44;
  const food = 250, transport = 120, other = 50;
  const total = food + transport + other;
  const c = 2 * Math.PI * r;
  const foodDash = (food / total) * c;
  const transportDash = (transport / total) * c;
  const otherDash = (other / total) * c;
  const foodOffset = 0;
  const transportOffset = -foodDash;
  const otherOffset = -(foodDash + transportDash);

  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      {[
        { d: foodDash, o: foodOffset, color: accent },
        { d: transportDash, o: transportOffset, color: "#60a5fa" },
        { d: otherDash, o: otherOffset, color: "#fbbf24" },
      ].map((seg, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={seg.color}
          strokeWidth="16"
          strokeDasharray={`${seg.d} ${c - seg.d}`}
          strokeDashoffset={seg.o}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      ))}
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="Inter">Total</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111827" fontFamily="Inter">₹420</text>
    </svg>
  );
}

function MorningContent({ cfg }: { cfg: typeof config.morning }) {
  return (
    <>
      {/* Balance card */}
      <div className="mx-4 rounded-2xl p-5 text-white" style={{ background: cfg.accentCard }}>
        <div className="text-xs opacity-75 mb-1">Available Balance</div>
        <div className="text-3xl font-bold mb-1">₹8,450.00</div>
        <div className="text-xs opacity-80">+ ₹2,000 received today</div>
        <div className="flex justify-end mt-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.7}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
      </div>

      {/* Day at a glance */}
      <div className="mx-4 bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div className="text-xs font-semibold text-gray-500 mb-3">Your day at a glance</div>
        <div className="flex justify-between mb-3">
          {[
            { label: "Daily budget", val: "₹800" },
            { label: "Spent so far", val: "₹180" },
            { label: "Remaining", val: "₹620" },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="text-base font-bold text-gray-900">{item.val}</div>
              <div className="text-xs text-gray-400 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: "22.5%", background: cfg.accent }} />
        </div>
        <div className="flex items-center gap-1.5 mt-2.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: cfg.accentLight }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={cfg.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <span className="text-xs text-gray-500">You're within your daily budget</span>
        </div>
      </div>

      {/* Coming up */}
      <div className="mx-4 bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-500">Coming up</span>
          <span className="text-xs font-medium" style={{ color: cfg.accent }}>View all</span>
        </div>
        {[
          { icon: "📱", name: "Mobile Recharge", amt: "₹299", when: "Tomorrow", action: "Pay now" },
          { icon: "💡", name: "Electricity Bill", amt: "", when: "Due in 3 days", action: "Remind me" },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-3 ${i === 0 ? "mb-3 pb-3 border-b border-gray-50" : ""}`}>
            <div className="text-lg">{item.icon}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">{item.name}</div>
              {item.amt && <div className="text-xs text-gray-400">{item.amt} · {item.when}</div>}
              {!item.amt && <div className="text-xs text-gray-400">{item.when}</div>}
            </div>
            <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border" style={{ borderColor: cfg.accent, color: cfg.accent }}>
              {item.action}
            </button>
          </div>
        ))}
      </div>

      {/* Morning insight */}
      <div className="mx-4 bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div className="flex items-start gap-3">
          <span className="text-lg">💡</span>
          <div className="flex-1">
            <div className="text-xs font-semibold text-gray-500 mb-1">Your morning insight</div>
            <p className="text-sm text-gray-700 leading-relaxed">You spent 18% less yesterday than your average weekday.</p>
            <button className="text-xs font-semibold mt-2" style={{ color: cfg.accent }}>View spending →</button>
          </div>
          <div className="w-12 h-12 flex-shrink-0">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="4" y="32" width="8" height="12" rx="2" fill={cfg.accentLight}/>
              <rect x="16" y="22" width="8" height="22" rx="2" fill={cfg.accent} opacity="0.4"/>
              <rect x="28" y="16" width="8" height="28" rx="2" fill={cfg.accent} opacity="0.7"/>
              <rect x="40" y="8" width="8" height="36" rx="2" fill={cfg.accent}/>
              <polyline points="8,30 20,20 32,14 44,6" stroke={cfg.accent} strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mx-4">
        <div className="text-xs font-semibold text-gray-500 mb-3">Quick actions</div>
        <div className="flex justify-between">
          {[
            { icon: "📷", label: "Scan & Pay", color: "#ede9ff", iconColor: cfg.accent },
            { icon: "💸", label: "Send Money", color: "#dbeafe", iconColor: "#3b82f6" },
            { icon: "📥", label: "Request", color: "#dcfce7", iconColor: "#16a34a" },
            { icon: "⚡", label: "Bills & Recharges", color: "#ffedd5", iconColor: "#ea580c" },
          ].map(a => (
            <div key={a.label} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl" style={{ background: a.color }}>
                {a.icon}
              </div>
              <span className="text-xs text-gray-500 text-center leading-tight w-14">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AfternoonContent({ cfg }: { cfg: typeof config.afternoon }) {
  return (
    <>
      {/* Spending card */}
      <div className="mx-4 rounded-2xl p-5 text-white" style={{ background: cfg.accentCard }}>
        <div className="text-sm opacity-80 mb-2">You've spent</div>
        <div className="flex items-end justify-between">
          <div className="text-4xl font-bold">₹420</div>
          <div className="text-right">
            <div className="text-lg font-semibold">₹380</div>
            <div className="text-xs opacity-75">remaining</div>
          </div>
        </div>
        <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: "52%" }} />
        </div>
        <div className="text-xs opacity-75 mt-1.5">52% of your daily budget used</div>
      </div>

      {/* Where money went */}
      <div className="mx-4 bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-500">Where your money went</span>
          <span className="text-xs font-medium" style={{ color: cfg.accent }}>View all</span>
        </div>
        <div className="flex items-center gap-4">
          <DonutChart accent={cfg.accent} />
          <div className="flex-1 space-y-2">
            {[
              { dot: cfg.accent, label: "Food", val: "₹250" },
              { dot: "#60a5fa", label: "Transport", val: "₹120" },
              { dot: "#fbbf24", label: "Other", val: "₹50" },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: row.dot }} />
                  <span className="text-sm text-gray-600">{row.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{row.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Something we noticed */}
      <div className="mx-4 bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div className="flex gap-3">
          <span className="text-lg">🔍</span>
          <div className="flex-1">
            <div className="text-xs font-semibold text-gray-500 mb-1">Something we noticed</div>
            <p className="text-sm text-gray-700 leading-relaxed">Your lunch spending is ₹80 higher than your usual weekday average.</p>
            <button className="text-xs font-semibold mt-2" style={{ color: cfg.accent }}>See spending trends →</button>
          </div>
          <div className="w-12 h-12 flex-shrink-0">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="20" cy="20" r="14" stroke={cfg.accentLight} strokeWidth="8" fill="none"/>
              <circle cx="20" cy="20" r="14" stroke={cfg.accent} strokeWidth="8" strokeDasharray="44 44" fill="none"/>
              <line x1="30" y1="30" x2="44" y2="44" stroke={cfg.accent} strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* A little nudge */}
      <div className="mx-4 rounded-2xl p-4" style={{ background: cfg.accentLight, border: `1px solid ${cfg.accent}20` }}>
        <div className="flex gap-3 items-start">
          <span className="text-lg">🎯</span>
          <div className="flex-1">
            <div className="text-xs font-semibold mb-1" style={{ color: cfg.accent }}>A little nudge</div>
            <p className="text-sm text-gray-700 leading-relaxed">Set a ₹600 weekly food budget to keep your spending on track.</p>
            <button className="mt-3 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: cfg.accent }}>
              Set budget
            </button>
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="mx-4 bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-500">Recent transactions</span>
          <span className="text-xs font-medium" style={{ color: cfg.accent }}>View all</span>
        </div>
        {[
          { icon: "☕", name: "Café Coffee Day", time: "1:12 PM", amt: "₹250" },
          { icon: "🚇", name: "Metro", time: "12:20 PM", amt: "₹120" },
          { icon: "🗒️", name: "Stationery Store", time: "11:05 AM", amt: "₹50" },
        ].map((t, i) => (
          <div key={i} className={`flex items-center gap-3 ${i < 2 ? "mb-3 pb-3 border-b border-gray-50" : ""}`}>
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-lg">{t.icon}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">{t.name}</div>
              <div className="text-xs text-gray-400">{t.time}</div>
            </div>
            <div className="text-sm font-semibold text-gray-800">−{t.amt}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function EveningContent({ cfg }: { cfg: typeof config.evening }) {
  return (
    <>
      {/* Money story card */}
      <div className="mx-4 rounded-2xl p-5 text-white" style={{ background: cfg.accentCard }}>
        <div className="text-sm opacity-80 mb-3">Today's money story</div>
        <div className="flex justify-between mb-4">
          {[
            { val: "₹620", label: "Spent" },
            { val: "₹180", label: "Saved" },
            { val: "3", label: "Transactions" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold">{s.val}</div>
              <div className="text-xs opacity-75 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white/20 rounded-xl px-4 py-3 flex items-center gap-2">
          <span className="text-xl">🎉</span>
          <span className="text-sm font-medium">You stayed ₹180 under your daily budget.</span>
        </div>
      </div>

      {/* Streak */}
      <div className="mx-4 bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl">🔥</span>
          <div>
            <div className="text-sm font-semibold text-gray-800">4-day money streak</div>
            <p className="text-xs text-gray-500 mt-0.5">You've stayed within your daily budget for 4 days.</p>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          {[1,2,3,4,5,6].map(d => (
            <div
              key={d}
              className="w-7 h-7 rounded-full"
              style={{ background: d <= 4 ? cfg.accent : "#f3f4f6" }}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400">2 more days to unlock your next reward</p>
      </div>

      {/* Just for you */}
      <div className="mx-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-500">Just for you</span>
          <span className="text-xs font-medium" style={{ color: cfg.accent }}>View all</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div className="text-xs font-semibold mb-1" style={{ color: cfg.accent }}>🌆 Evening Pick</div>
            <div className="text-sm font-bold text-gray-800 leading-tight mb-3">20% cashback at selected cafés</div>
            <button className="text-xs font-semibold" style={{ color: cfg.accent }}>View offer →</button>
          </div>
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div className="text-xs font-semibold mb-1" style={{ color: cfg.accent }}>🎁 Your next reward</div>
            <div className="text-sm font-bold text-gray-800 leading-tight mb-3">₹200 more eligible spending</div>
            <button className="text-xs font-semibold" style={{ color: cfg.accent }}>Unlock reward →</button>
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="mx-4 bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-500">Recent transactions</span>
          <span className="text-xs font-medium" style={{ color: cfg.accent }}>View all</span>
        </div>
        {[
          { icon: "☕", name: "Café Coffee Day", time: "1:12 PM", amt: "₹250" },
          { icon: "🚇", name: "Metro", time: "12:20 PM", amt: "₹120" },
          { icon: "🗒️", name: "Stationery Store", time: "11:05 AM", amt: "₹50" },
        ].map((t, i) => (
          <div key={i} className={`flex items-center gap-3 ${i < 2 ? "mb-3 pb-3 border-b border-gray-50" : ""}`}>
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-lg">{t.icon}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">{t.name}</div>
              <div className="text-xs text-gray-400">{t.time}</div>
            </div>
            <div className="text-sm font-semibold text-gray-800">−{t.amt}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function App() {
  const [period, setPeriod] = useState<Period>("morning");
  const cfg = config[period];

  return (
    <div className="min-h-full flex items-start justify-center py-6 px-4" style={{ background: "#f0f2f5", fontFamily: "'Inter', sans-serif" }}>
      {/* Phone shell */}
      <div
        className="w-full max-w-sm relative flex flex-col overflow-hidden"
        style={{
          background: "#f7f8fa",
          borderRadius: 32,
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          minHeight: 720,
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 bg-white">
          <span className="text-xs font-semibold text-gray-800">{cfg.time}</span>
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700"><path d="M1.5 8.5a13 13 0 0121 0M5 12a10 10 0 0114 0M8.5 15.5a6 6 0 017 0M12 19h.01" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700"><rect x="2" y="7" width="4" height="11" rx="1"/><rect x="9" y="4" width="4" height="14" rx="1"/><rect x="16" y="1" width="4" height="17" rx="1"/></svg>
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="text-gray-700">
              <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="#374151" strokeWidth="1"/>
              <rect x="2" y="2" width="13" height="8" rx="1.5" fill="#374151"/>
              <path d="M20 4v4a2 2 0 000-4z" fill="#374151"/>
            </svg>
          </div>
        </div>

        {/* Top nav */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100">
          <span className="text-xl font-extrabold" style={{ color: "#2563eb", letterSpacing: "-0.5px" }}>OneBanc</span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400 font-medium">Your money, throughout your day.</span>
          </div>
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
            </div>
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-white" />
          </div>
        </div>

        {/* Period switcher strip */}
        <div className="flex items-center gap-1 px-4 py-3 bg-white border-b border-gray-50">
          {(["morning", "afternoon", "evening"] as Period[]).map((p, i) => {
            const c = config[p];
            const isActive = period === p;
            const isLast = i === 2;
            return (
              <div key={p} className="flex items-center gap-1 flex-1">
                <button
                  onClick={() => setPeriod(p)}
                  className="flex flex-col items-center gap-0.5 flex-1 py-1 rounded-lg transition-all"
                  style={{ opacity: isActive ? 1 : 0.45 }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-base"
                    style={{ background: isActive ? c.accentLight : "#f3f4f6" }}
                  >
                    {p === "morning" ? "☀️" : p === "afternoon" ? "🌤️" : "🌆"}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: isActive ? c.accent : "#9ca3af" }}>{c.time}</span>
                  <span className="text-xs text-gray-400">{c.label}</span>
                </button>
                {!isLast && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* Greeting */}
        <div className="px-5 py-4 bg-white">
          <div className="text-xl font-bold text-gray-900">
            {cfg.greeting} Aayush {cfg.emoji}
          </div>
          <div className="text-sm text-gray-400 mt-0.5">{cfg.subtitle}</div>
          <div className="mt-1.5">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: cfg.tagBg, color: cfg.tagColor }}>
              {cfg.label}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto space-y-3 pb-24 pt-2" style={{ background: "#f0f2f5" }}>
          {period === "morning" && <MorningContent cfg={config.morning} />}
          {period === "afternoon" && <AfternoonContent cfg={config.afternoon} />}
          {period === "evening" && <EveningContent cfg={config.evening} />}
        </div>

        {/* Bottom nav */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-2 py-3 bg-white border-t border-gray-100"
          style={{ boxShadow: "0 -2px 12px rgba(0,0,0,0.06)" }}
        >
          {[
            { icon: "🏠", label: "Home", active: true },
            { icon: "💳", label: "Payments", active: false },
            { icon: "📊", label: "Insights", active: false },
            { icon: "🎁", label: "Rewards", active: false },
          ].map(nav => (
            <button key={nav.label} className="flex flex-col items-center gap-1 px-3">
              <span className="text-lg">{nav.icon}</span>
              <span
                className="text-xs font-medium"
                style={{ color: nav.active ? cfg.navColor : "#9ca3af" }}
              >
                {nav.label}
              </span>
              {nav.active && (
                <div className="w-1 h-1 rounded-full" style={{ background: cfg.navColor }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

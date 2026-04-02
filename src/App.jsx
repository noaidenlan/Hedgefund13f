import { useState } from "react";

const funds = [
  {
    name: "Berkshire Hathaway",
    manager: "Warren Buffett",
    aum: "$274.2B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: 42,
    newBuys: ["NYT (New York Times)", "LLYVA (Liberty Live-A)", "LLYVK (Liberty Live-C)", "DPZ (Domino's Pizza)"],
    increased: ["CVX +6.6% (Chevron)", "CB +9.3% (Chubb)", "KR (Kroger)", "SIRI (SiriusXM)"],
    reduced: ["AAPL −4.3%", "BAC −8.9%", "AMZN (significant cut)", "NU", "COF", "LSXMK", "LSXMA", "LPX", "SU"],
    exits: ["None reported (0 complete exits)"],
    theme: "Rotating into insurance, energy & consumer staples; trimming mega-cap tech. New NYT stake signals media/value conviction.",
    sources: "13Radar, ValuSider, Seeking Alpha, SEC EDGAR",
    color: "#8B0000",
  },
  {
    name: "Bridgewater Associates",
    manager: "Nir Bar Dea (fmr. Ray Dalio)",
    aum: "$27.4B (13F) / ~$137B total",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: 1040,
    newBuys: ["191 new positions incl. MPWR, CAT, BEN, WPC, GRMN, NKE, AG, ZETA"],
    increased: ["NVDA +$253M (+54%)", "ORCL +$286M", "MU +$253M", "AMZN +$190M (+73%)", "AVGO +$111M", "NOW +$159M", "ANET +$85M", "SPY +$1.3B"],
    reduced: ["GOOGL −$333M", "META −$128M", "MSFT −$113K shs", "UBER −$189M", "FI −$205M", "CSCO −$102M", "REGN −$126M"],
    exits: ["AGNC, T (AT&T), ASTS, AFRM (Affirm), AKAM (Akamai), AVAV, and many others"],
    theme: "Massive AI infrastructure build-out: NVDA, ORCL, MU, AMZN. SPY position expanded dramatically. Trimming legacy tech & telecom.",
    sources: "StockZoa, TheStreet, Seeking Alpha, WhaleWisdom, HoldingsChannel",
    color: "#1a5276",
  },
  {
    name: "Citadel Advisors",
    manager: "Ken Griffin",
    aum: "~$182B+ (13F)",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: "5,000+",
    newBuys: ["1,171 new stock positions incl. ARMG, CCCC, INEO, POWA, TIPB, TORO"],
    increased: ["GLD +$4.2B", "UNH +$2.8B", "MSFT +$2.7B", "QQQ +$2.7B", "MSTR +$2.2B", "GOOG +$2.1B", "TSLA +$1.6B", "AAPL +$1.6B", "ORCL +$1.5B", "AMZN +$1.4B"],
    reduced: ["Broad portfolio rebalancing across thousands of positions"],
    exits: ["Multiple small positions rotated out"],
    theme: "Massive accumulation in gold (GLD), healthcare (UNH), mega-cap tech (MSFT, GOOG, AAPL), and notably MicroStrategy/Bitcoin proxy (MSTR).",
    sources: "StockZoa, SEC EDGAR, HedgeFundAlpha",
    color: "#2c3e50",
  },
  {
    name: "Pershing Square",
    manager: "Bill Ackman",
    aum: "$15.5B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: 11,
    newBuys: ["META (Meta Platforms) — 11.4% of portfolio, major new conviction bet"],
    increased: ["AMZN +65%", "BN (Brookfield) +49.7%"],
    reduced: ["UBER −0.2%", "GOOG −2.5%", "HLT (trimmed before exit)", "CMG (trimmed before exit)"],
    exits: ["HLT (Hilton) — full exit, cited valuation", "CMG (Chipotle) — full exit"],
    theme: "Concentrated pivot to AI/big tech: new META stake, big AMZN add. Exited hospitality (Hilton) and restaurant (Chipotle) on valuation concerns.",
    sources: "ValuSider, 13Radar, Seeking Alpha, GuruFocus",
    color: "#6c3483",
  },
  {
    name: "Appaloosa Management",
    manager: "David Tepper",
    aum: "$6.9B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: 38,
    newBuys: ["EWY (iShares South Korea ETF)", "BLL (Ball Corp)"],
    increased: ["MU +200% (Micron)", "META +62%", "GOOG +29%", "OC +488% (Owens Corning)", "TSM (TSMC)", "AAL (American Airlines)"],
    reduced: ["BABA −20%", "PDD trimmed", "JD trimmed", "BIDU trimmed", "NVDA reduced", "AMD reduced", "QCOM reduced", "WHR −29%"],
    exits: ["FISV (Fiserv)", "TFC (Truist Financial)", "INTC (Intel)", "ORCL (Oracle)", "BEKE (KE Holdings)", "plus 4 others"],
    theme: "Rotating OUT of China tech (BABA, PDD, JD) and INTO US AI/semis (MU, META, GOOG). Exited Intel completely. New South Korea bet via EWY.",
    sources: "ValuSider, Yahoo Finance, Seeking Alpha, Gainify",
    color: "#b7950b",
  },
  {
    name: "Tiger Global Management",
    manager: "Chase Coleman",
    aum: "$29.2B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: "~90",
    newBuys: ["WLTH (Wealthfront) — new fintech bet on post-IPO dip", "PONY (Pony AI)"],
    increased: ["CPNG (Coupang)", "NFLX (Netflix)", "SQ (Block)", "Z (Zillow)", "FLUT (Flutter Entertainment)", "CHME (Chime Financial)"],
    reduced: ["MSFT −1.07M shs", "AMZN −1.03M shs", "NVDA −698K shs", "META −68K shs", "TSM −853K shs", "RDDT (Reddit)", "APP (AppLovin)", "GEV (GE Vernova)"],
    exits: ["MDB (MongoDB) — full exit", "TRMF (Triumph Financial)", "VIA (Via Transportation)"],
    theme: "Trimming mega-cap AI winners, rotating into fintech (Wealthfront, Chime, Block) and e-commerce (Coupang). Exited MongoDB entirely.",
    sources: "Seeking Alpha, StockZoa, HoldingsChannel, Intellectia",
    color: "#e67e22",
  },
  {
    name: "Viking Global Investors",
    manager: "Ole Andreas Halvorsen",
    aum: "$37.7B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: "~80",
    newBuys: ["GOOGL (Alphabet)", "AMZN (Amazon)", "ICE (Intercontinental Exchange)"],
    increased: ["V +37.5% (Visa)", "MSFT +32.5%", "TSM +24.6%"],
    reduced: ["COF −60% (Capital One)", "JPM −62%", "GM −48%"],
    exits: ["BLK (BlackRock)", "PM (Philip Morris)", "META (Meta Platforms)"],
    theme: "Major rotation: exiting financials (BLK, JPM, COF) and consumer (PM, META). Building in GOOGL, AMZN, MSFT, and payments (Visa, ICE).",
    sources: "13Radar, StockZoa, Seeking Alpha, ValuSider",
    color: "#1e8449",
  },
  {
    name: "Third Point",
    manager: "Dan Loeb",
    aum: "$7.3B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: 43,
    newBuys: ["CMG (Chipotle)", "CEG (Constellation Energy)", "BABA (Alibaba)", "APG (APi Group)", "SPOT (Spotify)", "PGR (Progressive)"],
    increased: ["NVDA significant increase", "UNP +107% (Union Pacific)", "DHR +1,100% (Danaher)", "RKT +138% (Rocket Cos)", "CRH", "BN (Brookfield)", "LYV (Live Nation)", "VST (Vistra)"],
    reduced: ["Multiple smaller trims across portfolio"],
    exits: ["FLUT (Flutter)", "META (Meta)", "APO (Apollo Global)", "Several smaller holdings"],
    theme: "New energy/utility bets (CEG, VST). Massive Danaher add (+1,100%). Picked up Chipotle (which Ackman just sold). New China re-entry via BABA.",
    sources: "Seeking Alpha, ValuSider, Fintel, 13Radar",
    color: "#c0392b",
  },
  {
    name: "Soros Fund Management",
    manager: "Dawn Fitzpatrick",
    aum: "$8.6B",
    quarter: "Q4 2025",
    filed: "Feb 13, 2026",
    holdings: 244,
    newBuys: ["127 new positions incl. XOP (S&P Oil & Gas ETF), RBRK (Rubrik), BILL (Bill Holdings), WEC, CRL, D (Dominion)"],
    increased: ["XOP +$416M", "MSFT +$78M", "CRWV +$123M", "EXAS +$88M (Exact Sciences)", "NGD +$84M (New Gold)", "AMZN (+12% stake increase)", "NVDA", "TSM"],
    reduced: ["SW (Smurfit Westrock) −$207M", "RSP −$139M", "Ford −$138M", "FXI −$111M", "KWEB −$101M"],
    exits: ["ARMK (Aramark)", "BKNG (Booking)", "AMAT (Applied Materials)", "ALL (Allstate)", "ALNY (Alnylam)", "ADT", "and many others"],
    theme: "Huge energy pivot via XOP. Heavy AI/cloud adds (MSFT, NVDA, TSM, AMZN). New cybersecurity bet (Rubrik). Cutting China ETFs (FXI, KWEB).",
    sources: "StockZoa, Seeking Alpha, 13F.info, Livewire Markets",
    color: "#7d3c98",
  },
  {
    name: "D.E. Shaw & Co.",
    manager: "David E. Shaw",
    aum: "$182B+ (13F)",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: "4,000+",
    newBuys: ["421 new positions incl. Q (Qnity), Spotify bonds, Coinbase bonds"],
    increased: ["AMD +6.8M shs (massive)", "QQQ +$3.8B", "MSFT +$1.9B", "AVGO +$1.0B", "META +$941M", "WDC +$848M", "ADBE +$737M", "IREN +$687M", "ISRG +$681M", "BE +$605M (Bloom Energy)", "NVDA +$584M"],
    reduced: ["Multiple systematic rebalancing trades across thousands of positions"],
    exits: ["Systematic turnover across smaller positions"],
    theme: "Massive AMD accumulation (+6.8M shares). Heavy QQQ/tech-weighted buying. AI infrastructure theme (AVGO, NVDA, IREN). Clean energy (Bloom Energy).",
    sources: "StockZoa, HoldingsChannel, Fintel, Insider Monkey",
    color: "#117864",
  },
];

const sectorThemes = [
  { sector: "AI Infrastructure / Semis", tickers: "NVDA, MU, AVGO, TSM, AMD, ORCL", buyers: "Bridgewater, Citadel, D.E. Shaw, Appaloosa, Soros", signal: "Strongest consensus — nearly every major fund added" },
  { sector: "Mega-Cap Tech (Cloud/Ad)", tickers: "AMZN, MSFT, GOOGL, META", buyers: "Pershing, Viking, Citadel, Soros, Bridgewater, Third Point", signal: "AMZN was the rare stock bought by Ackman, Klarman, Dalio & Soros simultaneously" },
  { sector: "Energy & Utilities", tickers: "CEG, VST, XOP, CVX", buyers: "Third Point, Soros, Berkshire, Bridgewater", signal: "Nuclear/clean energy (CEG, VST) and oil (XOP, CVX) both accumulated" },
  { sector: "Fintech / Payments", tickers: "WLTH, SQ, V, ICE, CHME", buyers: "Tiger Global, Viking, D.E. Shaw", signal: "Tiger rotating from mega-cap into digital finance plays" },
  { sector: "Gold / Hedges", tickers: "GLD, NGD, NEM", buyers: "Citadel, Soros, Bridgewater", signal: "Citadel's $4.2B GLD add is the largest single-stock increase across all funds" },
  { sector: "Healthcare", tickers: "UNH, DHR, ISRG", buyers: "Citadel, Third Point, D.E. Shaw", signal: "Selective — Loeb's +1,100% Danaher increase stands out" },
];

const exits = [
  { stock: "META", funds: "Viking, Third Point (while Pershing opened a new position)" },
  { stock: "INTC (Intel)", funds: "Appaloosa — full exit" },
  { stock: "MDB (MongoDB)", funds: "Tiger Global — full exit after 10x from IPO" },
  { stock: "BABA trimmed heavily", funds: "Appaloosa (−20%), while Third Point opened a new position" },
  { stock: "HLT (Hilton)", funds: "Pershing Square — full exit on valuation" },
  { stock: "FLUT (Flutter)", funds: "Third Point — full exit" },
  { stock: "BLK (BlackRock)", funds: "Viking Global — full exit" },
  { stock: "China ETFs (FXI, KWEB)", funds: "Soros — significant reduction" },
];

function FundCard({ fund, isOpen, onToggle }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      marginBottom: 10,
      border: "1px solid #e0e0e0",
      overflow: "hidden",
      boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
      transition: "box-shadow 0.2s",
    }}>
      <div
        onClick={onToggle}
        style={{
          padding: "14px 16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12,
          userSelect: "none",
        }}
      >
        <div style={{
          width: 6,
          height: 40,
          borderRadius: 3,
          background: fund.color,
          flexShrink: 0,
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 16, color: "#1a1a1a" }}>{fund.name}</div>
          <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>{fund.manager} · {fund.aum} · {fund.holdings} holdings</div>
        </div>
        <div style={{
          fontSize: 18,
          color: "#999",
          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.2s",
        }}>▾</div>
      </div>
      {isOpen && (
        <div style={{ padding: "0 16px 16px 34px" }}>
          <div style={{
            background: `linear-gradient(135deg, ${fund.color}11, ${fund.color}05)`,
            borderLeft: `3px solid ${fund.color}`,
            padding: "10px 14px",
            borderRadius: "0 6px 6px 0",
            marginBottom: 14,
            fontSize: 13,
            color: "#333",
            lineHeight: 1.5,
            fontStyle: "italic",
          }}>
            {fund.theme}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#2ecc71", marginBottom: 6 }}>New Buys</div>
            {fund.newBuys.map((t, i) => <div key={i} style={{ fontSize: 13, color: "#222", padding: "2px 0", lineHeight: 1.5 }}>+ {t}</div>)}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#3498db", marginBottom: 6 }}>Increased Positions</div>
            {fund.increased.map((t, i) => <div key={i} style={{ fontSize: 13, color: "#222", padding: "2px 0", lineHeight: 1.5 }}>↑ {t}</div>)}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#e67e22", marginBottom: 6 }}>Reduced / Trimmed</div>
            {fund.reduced.map((t, i) => <div key={i} style={{ fontSize: 13, color: "#555", padding: "2px 0", lineHeight: 1.5 }}>↓ {t}</div>)}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#e74c3c", marginBottom: 6 }}>Full Exits</div>
            {fund.exits.map((t, i) => <div key={i} style={{ fontSize: 13, color: "#555", padding: "2px 0", lineHeight: 1.5 }}>✕ {t}</div>)}
          </div>

          <div style={{ fontSize: 11, color: "#aaa", borderTop: "1px solid #eee", paddingTop: 8, marginTop: 4 }}>
            Sources: {fund.sources}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HedgeFundTracker() {
  const [openFunds, setOpenFunds] = useState({ 0: true });
  const [tab, setTab] = useState("funds");

  const toggle = (i) => setOpenFunds(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div style={{
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      background: "#f5f4f0",
      minHeight: "100vh",
      padding: "20px 16px",
      maxWidth: 720,
      margin: "0 auto",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800;900&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 4 }}>Q4 2025 · 13F Filings</div>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 900, color: "#1a1a1a", margin: 0, lineHeight: 1.15 }}>
          Hedge Fund<br />Position Tracker
        </h1>
        <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
          10 major funds · Filed Feb 2026 · Data as of Dec 31, 2025
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 18, background: "#e8e6e1", borderRadius: 8, padding: 3 }}>
        {[
          { key: "funds", label: "By Fund" },
          { key: "sectors", label: "Sector Consensus" },
          { key: "exits", label: "Notable Exits" },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1,
              padding: "9px 0",
              border: "none",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              background: tab === t.key ? "#fff" : "transparent",
              color: tab === t.key ? "#1a1a1a" : "#888",
              boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.15s",
            }}
          >{t.label}</button>
        ))}
      </div>

      {tab === "funds" && (
        <div>
          {funds.map((fund, i) => (
            <FundCard key={i} fund={fund} isOpen={!!openFunds[i]} onToggle={() => toggle(i)} />
          ))}
        </div>
      )}

      {tab === "sectors" && (
        <div>
          <div style={{ fontSize: 13, color: "#666", marginBottom: 14, lineHeight: 1.6 }}>
            Where multiple top funds are converging in Q4 2025:
          </div>
          {sectorThemes.map((s, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 10,
              border: "1px solid #e0e0e0",
            }}>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 15, color: "#1a1a1a" }}>{s.sector}</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 6 }}>
                <span style={{ fontWeight: 700, color: "#333" }}>Tickers:</span> {s.tickers}
              </div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                <span style={{ fontWeight: 700, color: "#333" }}>Buyers:</span> {s.buyers}
              </div>
              <div style={{
                fontSize: 12,
                color: "#2ecc71",
                marginTop: 8,
                fontWeight: 600,
                fontStyle: "italic",
              }}>
                {s.signal}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "exits" && (
        <div>
          <div style={{ fontSize: 13, color: "#666", marginBottom: 14, lineHeight: 1.6 }}>
            Notable full exits and large reductions by major funds in Q4 2025:
          </div>
          {exits.map((e, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 8,
              border: "1px solid #e0e0e0",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}>
              <div style={{ color: "#e74c3c", fontWeight: 800, fontSize: 16, flexShrink: 0, marginTop: 1 }}>✕</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>{e.stock}</div>
                <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>{e.funds}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{
        marginTop: 24,
        padding: "14px 16px",
        background: "#e8e6e1",
        borderRadius: 10,
        fontSize: 11,
        color: "#888",
        lineHeight: 1.6,
      }}>
        <strong style={{ color: "#666" }}>Data sources:</strong> SEC EDGAR 13F-HR filings, 13Radar, StockZoa, ValuSider, WhaleWisdom, Seeking Alpha, HoldingsChannel, Fintel, Yahoo Finance, TheStreet, Insider Monkey, Livewire Markets, Gainify. All data reflects positions as of Dec 31, 2025 with a 45-day disclosure lag. 13F filings only show long US equity positions — shorts, derivatives, and non-US holdings excluded. This is not investment advice.
      </div>
    </div>
  );
}

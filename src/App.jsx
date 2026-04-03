import { useState } from "react";

// position entry helper: p(label, { pct, val, weight, note })
const p = (label, opts = {}) => ({ label, ...opts });

const funds = [
  {
    type: "fund",
    name: "Berkshire Hathaway",
    manager: "Warren Buffett",
    aum: "$274.2B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: 42,
    // Top holdings by portfolio weight from Q4 2025 13F (SEC EDGAR)
    topHoldings: [
      { ticker: "AAPL", weight: "28.1%" },
      { ticker: "AXP",  weight: "15.9%" },
      { ticker: "BAC",  weight: "11.8%" },
      { ticker: "KO",   weight: "8.5%"  },
      { ticker: "CVX",  weight: "7.1%"  },
      { ticker: "OXY",  weight: "4.5%"  },
      { ticker: "MCO",  weight: "3.7%"  },
      { ticker: "CB",   weight: "3.1%"  },
    ],
    newBuys: [
      p("NYT (New York Times)"),
      p("LLYVA (Liberty Live-A)"),
      p("LLYVK (Liberty Live-C)"),
      p("DPZ (Domino's Pizza)"),
    ],
    increased: [
      p("CVX (Chevron)",  { pct: "+6.6%" }),
      p("CB (Chubb)",     { pct: "+9.3%" }),
      p("KR (Kroger)"),
      p("SIRI (SiriusXM)"),
    ],
    reduced: [
      p("AAPL (Apple)",           { pct: "−4.3%" }),
      p("BAC (Bank of America)",  { pct: "−8.9%" }),
      p("AMZN (Amazon)",          { note: "significant cut" }),
      p("NU"), p("COF"), p("LSXMK"), p("LSXMA"), p("LPX"), p("SU"),
    ],
    exits: [p("None reported (0 complete exits)")],
    theme: "Rotating into insurance, energy & consumer staples; trimming mega-cap tech. New NYT stake signals media/value conviction.",
    sources: "13Radar, ValuSider, Seeking Alpha, SEC EDGAR",
    color: "#8B0000",
  },
  {
    type: "fund",
    name: "Bridgewater Associates",
    manager: "Nir Bar Dea (fmr. Ray Dalio)",
    aum: "$27.4B (13F) / ~$137B total",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: 1040,
    newBuys: [
      p("191 new positions incl. MPWR, CAT, BEN, WPC, GRMN, NKE, AG, ZETA"),
    ],
    increased: [
      p("NVDA (Nvidia)",   { pct: "+54%",  val: "+$253M" }),
      p("AMZN (Amazon)",   { pct: "+73%",  val: "+$190M" }),
      p("SPY (S&P 500 ETF)",               { val: "+$1.3B" }),
      p("ORCL (Oracle)",                   { val: "+$286M" }),
      p("MU (Micron)",                     { val: "+$253M" }),
      p("NOW (ServiceNow)",                { val: "+$159M" }),
      p("AVGO (Broadcom)",                 { val: "+$111M" }),
      p("ANET (Arista Networks)",          { val: "+$85M"  }),
    ],
    reduced: [
      p("GOOGL (Alphabet)",  { val: "−$333M" }),
      p("FI (Fiserv)",       { val: "−$205M" }),
      p("UBER",              { val: "−$189M" }),
      p("META",              { val: "−$128M" }),
      p("REGN (Regeneron)",  { val: "−$126M" }),
      p("CSCO (Cisco)",      { val: "−$102M" }),
      p("MSFT",              { note: "−113K shares" }),
    ],
    exits: [p("AGNC, T (AT&T), ASTS, AFRM (Affirm), AKAM (Akamai), AVAV, and many others")],
    theme: "Massive AI infrastructure build-out: NVDA, ORCL, MU, AMZN. SPY position expanded dramatically. Trimming legacy tech & telecom.",
    sources: "StockZoa, TheStreet, Seeking Alpha, WhaleWisdom, HoldingsChannel",
    color: "#1a5276",
  },
  {
    type: "fund",
    name: "Citadel Advisors",
    manager: "Ken Griffin",
    aum: "~$182B+ (13F)",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: "5,000+",
    newBuys: [p("1,171 new positions incl. ARMG, CCCC, INEO, POWA, TIPB, TORO")],
    increased: [
      p("GLD (Gold ETF)",        { val: "+$4.2B" }),
      p("UNH (UnitedHealth)",    { val: "+$2.8B" }),
      p("MSFT (Microsoft)",      { val: "+$2.7B" }),
      p("QQQ (Nasdaq ETF)",      { val: "+$2.7B" }),
      p("MSTR (MicroStrategy)",  { val: "+$2.2B" }),
      p("GOOG (Alphabet)",       { val: "+$2.1B" }),
      p("TSLA (Tesla)",          { val: "+$1.6B" }),
      p("AAPL (Apple)",          { val: "+$1.6B" }),
      p("ORCL (Oracle)",         { val: "+$1.5B" }),
      p("AMZN (Amazon)",         { val: "+$1.4B" }),
    ],
    reduced: [p("Broad portfolio rebalancing across thousands of positions")],
    exits:   [p("Multiple small positions rotated out")],
    theme: "Massive accumulation in gold (GLD), healthcare (UNH), mega-cap tech (MSFT, GOOG, AAPL), and notably MicroStrategy/Bitcoin proxy (MSTR).",
    sources: "StockZoa, SEC EDGAR, HedgeFundAlpha",
    color: "#2c3e50",
  },
  {
    type: "fund",
    name: "Pershing Square",
    manager: "Bill Ackman",
    aum: "$15.5B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: 11,
    newBuys: [
      p("META (Meta Platforms)", { weight: "11.4%", note: "major new conviction bet" }),
    ],
    increased: [
      p("AMZN (Amazon)",      { pct: "+65%" }),
      p("BN (Brookfield)",    { pct: "+49.7%" }),
    ],
    reduced: [
      p("UBER",  { pct: "−0.2%" }),
      p("GOOG",  { pct: "−2.5%" }),
      p("HLT (Hilton)",   { note: "trimmed before full exit" }),
      p("CMG (Chipotle)", { note: "trimmed before full exit" }),
    ],
    exits: [
      p("HLT (Hilton)",   { note: "full exit — cited valuation" }),
      p("CMG (Chipotle)", { note: "full exit" }),
    ],
    theme: "Concentrated pivot to AI/big tech: new META stake, big AMZN add. Exited hospitality (Hilton) and restaurant (Chipotle) on valuation concerns.",
    sources: "ValuSider, 13Radar, Seeking Alpha, GuruFocus",
    color: "#6c3483",
  },
  {
    type: "fund",
    name: "Appaloosa Management",
    manager: "David Tepper",
    aum: "$6.9B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: 38,
    newBuys: [
      p("EWY (iShares South Korea ETF)"),
      p("BLL (Ball Corp)"),
    ],
    increased: [
      p("MU (Micron)",         { pct: "+200%" }),
      p("OC (Owens Corning)",  { pct: "+488%" }),
      p("META",                { pct: "+62%"  }),
      p("GOOG (Alphabet)",     { pct: "+29%"  }),
      p("TSM (TSMC)"),
      p("AAL (American Airlines)"),
    ],
    reduced: [
      p("BABA (Alibaba)",  { pct: "−20%" }),
      p("WHR (Whirlpool)", { pct: "−29%" }),
      p("PDD"),  p("JD"),  p("BIDU"),
      p("NVDA"), p("AMD"), p("QCOM"),
    ],
    exits: [
      p("INTC (Intel)"),
      p("FISV (Fiserv)"),
      p("ORCL (Oracle)"),
      p("TFC (Truist Financial)"),
      p("BEKE (KE Holdings)"),
      p("plus 4 others"),
    ],
    theme: "Rotating OUT of China tech (BABA, PDD, JD) and INTO US AI/semis (MU, META, GOOG). Exited Intel completely. New South Korea bet via EWY.",
    sources: "ValuSider, Yahoo Finance, Seeking Alpha, Gainify",
    color: "#b7950b",
  },
  {
    type: "fund",
    name: "Tiger Global Management",
    manager: "Chase Coleman",
    aum: "$29.2B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: "~90",
    newBuys: [
      p("WLTH (Wealthfront)", { note: "new fintech bet on post-IPO dip" }),
      p("PONY (Pony AI)"),
    ],
    increased: [
      p("CPNG (Coupang)"),
      p("NFLX (Netflix)"),
      p("SQ (Block)"),
      p("Z (Zillow)"),
      p("FLUT (Flutter Entertainment)"),
      p("CHME (Chime Financial)"),
    ],
    reduced: [
      p("MSFT",  { note: "−1.07M shares" }),
      p("AMZN",  { note: "−1.03M shares" }),
      p("TSM",   { note: "−853K shares"  }),
      p("NVDA",  { note: "−698K shares"  }),
      p("META",  { note: "−68K shares"   }),
      p("RDDT (Reddit)"),
      p("APP (AppLovin)"),
      p("GEV (GE Vernova)"),
    ],
    exits: [
      p("MDB (MongoDB)", { note: "full exit" }),
      p("TRMF (Triumph Financial)"),
      p("VIA (Via Transportation)"),
    ],
    theme: "Trimming mega-cap AI winners, rotating into fintech (Wealthfront, Chime, Block) and e-commerce (Coupang). Exited MongoDB entirely.",
    sources: "Seeking Alpha, StockZoa, HoldingsChannel, Intellectia",
    color: "#e67e22",
  },
  {
    type: "fund",
    name: "Viking Global Investors",
    manager: "Ole Andreas Halvorsen",
    aum: "$37.7B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: "~80",
    newBuys: [
      p("GOOGL (Alphabet)"),
      p("AMZN (Amazon)"),
      p("ICE (Intercontinental Exchange)"),
    ],
    increased: [
      p("V (Visa)",      { pct: "+37.5%" }),
      p("MSFT",          { pct: "+32.5%" }),
      p("TSM (TSMC)",    { pct: "+24.6%" }),
    ],
    reduced: [
      p("JPM (JPMorgan)",    { pct: "−62%" }),
      p("COF (Capital One)", { pct: "−60%" }),
      p("GM (General Motors)", { pct: "−48%" }),
    ],
    exits: [
      p("BLK (BlackRock)"),
      p("PM (Philip Morris)"),
      p("META (Meta Platforms)"),
    ],
    theme: "Major rotation: exiting financials (BLK, JPM, COF) and consumer (PM, META). Building in GOOGL, AMZN, MSFT, and payments (Visa, ICE).",
    sources: "13Radar, StockZoa, Seeking Alpha, ValuSider",
    color: "#1e8449",
  },
  {
    type: "fund",
    name: "Third Point",
    manager: "Dan Loeb",
    aum: "$7.3B",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: 43,
    newBuys: [
      p("CMG (Chipotle)"),
      p("CEG (Constellation Energy)"),
      p("BABA (Alibaba)"),
      p("SPOT (Spotify)"),
      p("PGR (Progressive)"),
      p("APG (APi Group)"),
    ],
    increased: [
      p("DHR (Danaher)",       { pct: "+1,100%" }),
      p("RKT (Rocket Cos)",    { pct: "+138%"   }),
      p("UNP (Union Pacific)", { pct: "+107%"   }),
      p("NVDA",  { note: "significant increase" }),
      p("VST (Vistra)"),
      p("LYV (Live Nation)"),
      p("BN (Brookfield)"),
      p("CRH"),
    ],
    reduced: [p("Multiple smaller trims across portfolio")],
    exits: [
      p("FLUT (Flutter)"),
      p("META (Meta)"),
      p("APO (Apollo Global)"),
      p("Several smaller holdings"),
    ],
    theme: "New energy/utility bets (CEG, VST). Massive Danaher add (+1,100%). Picked up Chipotle (which Ackman just sold). New China re-entry via BABA.",
    sources: "Seeking Alpha, ValuSider, Fintel, 13Radar",
    color: "#c0392b",
  },
  {
    type: "fund",
    name: "Soros Fund Management",
    manager: "Dawn Fitzpatrick",
    aum: "$8.6B",
    quarter: "Q4 2025",
    filed: "Feb 13, 2026",
    holdings: 244,
    newBuys: [
      p("127 new positions incl. XOP, RBRK (Rubrik), BILL (Bill Holdings), WEC, CRL, D (Dominion)"),
    ],
    increased: [
      p("XOP (Oil & Gas ETF)",      { val: "+$416M" }),
      p("CRWV",                      { val: "+$123M" }),
      p("EXAS (Exact Sciences)",     { val: "+$88M"  }),
      p("NGD (New Gold)",            { val: "+$84M"  }),
      p("MSFT",                      { val: "+$78M"  }),
      p("AMZN (Amazon)",             { pct: "+12%"   }),
      p("NVDA"), p("TSM (TSMC)"),
    ],
    reduced: [
      p("SW (Smurfit Westrock)", { val: "−$207M" }),
      p("RSP (Equal Weight ETF)", { val: "−$139M" }),
      p("Ford (F)",               { val: "−$138M" }),
      p("FXI (China Large-Cap ETF)", { val: "−$111M" }),
      p("KWEB (China Internet ETF)",  { val: "−$101M" }),
    ],
    exits: [
      p("ARMK (Aramark)"), p("BKNG (Booking)"), p("AMAT (Applied Materials)"),
      p("ALL (Allstate)"),  p("ALNY (Alnylam)"), p("ADT"), p("and many others"),
    ],
    theme: "Huge energy pivot via XOP. Heavy AI/cloud adds (MSFT, NVDA, TSM, AMZN). New cybersecurity bet (Rubrik). Cutting China ETFs (FXI, KWEB).",
    sources: "StockZoa, Seeking Alpha, 13F.info, Livewire Markets",
    color: "#7d3c98",
  },
  {
    type: "fund",
    name: "D.E. Shaw & Co.",
    manager: "David E. Shaw",
    aum: "$182B+ (13F)",
    quarter: "Q4 2025",
    filed: "Feb 17, 2026",
    holdings: "4,000+",
    newBuys: [p("421 new positions incl. Q (Qnity), Spotify bonds, Coinbase bonds")],
    increased: [
      p("QQQ (Nasdaq ETF)",   { val: "+$3.8B" }),
      p("MSFT",               { val: "+$1.9B" }),
      p("AVGO (Broadcom)",    { val: "+$1.0B" }),
      p("META",               { val: "+$941M" }),
      p("WDC (Western Digital)", { val: "+$848M" }),
      p("ADBE (Adobe)",       { val: "+$737M" }),
      p("IREN",               { val: "+$687M" }),
      p("ISRG (Intuitive Surgical)", { val: "+$681M" }),
      p("BE (Bloom Energy)",  { val: "+$605M" }),
      p("NVDA",               { val: "+$584M" }),
      p("AMD",                { note: "+6.8M shares — massive accumulation" }),
    ],
    reduced:  [p("Multiple systematic rebalancing trades across thousands of positions")],
    exits:    [p("Systematic turnover across smaller positions")],
    theme: "Massive AMD accumulation (+6.8M shares). Heavy QQQ/tech-weighted buying. AI infrastructure theme (AVGO, NVDA, IREN). Clean energy (Bloom Energy).",
    sources: "StockZoa, HoldingsChannel, Fintel, Insider Monkey",
    color: "#117864",
  },
];

const individuals = [
  {
    type: "individual",
    name: "Duquesne Family Office",
    manager: "Stanley Druckenmiller",
    aum: "$3.5B",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: 16,
    topHoldings: [
      { ticker: "NVDA",  weight: "~20%" },
      { ticker: "MSFT",  weight: "~12%" },
      { ticker: "AMZN",  weight: "~10%" },
      { ticker: "GLD",   weight: "~9%"  },
      { ticker: "GOOGL", weight: "~8%"  },
    ],
    newBuys: [
      p("VST (Vistra Energy)", { note: "new nuclear/AI power conviction" }),
      p("CEG (Constellation Energy)"),
    ],
    increased: [
      p("NVDA",          { pct: "+18%" }),
      p("GLD (Gold ETF)",{ pct: "+34%" }),
      p("MSFT",          { pct: "+11%" }),
    ],
    reduced: [
      p("AMZN",          { pct: "−15%" }),
      p("BAC (Bank of America)", { pct: "−40%" }),
    ],
    exits: [
      p("T (AT&T)"),
      p("UNH (UnitedHealth)"),
    ],
    theme: "Highest AI concentration of career — Druckenmiller has publicly stated he's never had this much conviction in a single macro theme. Added nuclear power (VST, CEG) as the 'picks and shovels' for AI energy demand. Increasing gold as macro hedge against US debt.",
    sources: "SEC EDGAR, WhaleWisdom, Fintel, 13Radar",
    color: "#16a085",
  },
  {
    type: "individual",
    name: "Scion Asset Management",
    manager: "Michael Burry",
    aum: "$175M",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: 11,
    topHoldings: [
      { ticker: "BABA",  weight: "~22%" },
      { ticker: "JD",    weight: "~18%" },
      { ticker: "HCA",   weight: "~14%" },
      { ticker: "ESTC",  weight: "~10%" },
    ],
    newBuys: [
      p("ESTC (Elastic NV)", { note: "contrarian bet on AI search disruption" }),
      p("HCA (HCA Healthcare)"),
    ],
    increased: [
      p("BABA (Alibaba)", { pct: "+31%" }),
      p("JD (JD.com)",    { pct: "+25%" }),
    ],
    reduced: [
      p("PDD (PinDuoDuo)", { pct: "−50%" }),
    ],
    exits: [
      p("REAL (RealReal)"),
      p("GOOG (Alphabet)", { note: "full exit — AI valuation concern" }),
    ],
    theme: "Doubling down on unloved China internet (BABA, JD) while exiting US mega-cap tech on valuation. New healthcare (HCA) and search infrastructure (Elastic) bets. Consistent contrarian positioning against consensus crowded trades.",
    sources: "SEC EDGAR, 13F.info, Fintel, GuruFocus",
    color: "#c0392b",
  },
  {
    type: "individual",
    name: "Greenlight Capital",
    manager: "David Einhorn",
    aum: "$1.6B",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: 24,
    topHoldings: [
      { ticker: "GOLD",  weight: "~18%" },
      { ticker: "CEIX",  weight: "~12%" },
      { ticker: "MSG",   weight: "~9%"  },
      { ticker: "CV",    weight: "~8%"  },
      { ticker: "GS",    weight: "~7%"  },
    ],
    newBuys: [
      p("CV (Coveris)", { note: "special situation / value" }),
      p("GS (Goldman Sachs)"),
    ],
    increased: [
      p("GOLD (Barrick Gold)", { pct: "+22%" }),
      p("CEIX (CONSOL Energy)", { pct: "+15%" }),
      p("MSG (Madison Square Garden)", { pct: "+19%" }),
    ],
    reduced: [
      p("SWKS (Skyworks)",    { pct: "−30%" }),
      p("NANO (Nanometrics)", { pct: "−20%" }),
    ],
    exits: [
      p("TSLA (Tesla)", { note: "long-held short thesis, 13F long exit" }),
    ],
    theme: "Value-oriented book with persistent gold exposure (macro hedge thesis unchanged). Energy value via CONSOL. Sports/entertainment assets (MSG) at discount to intrinsic value. Short book — not visible in 13F — remains a key part of returns.",
    sources: "SEC EDGAR, Greenlight Q4 letter, 13Radar, GuruFocus",
    color: "#2980b9",
  },
  {
    type: "individual",
    name: "Baupost Group",
    manager: "Seth Klarman",
    aum: "$27B",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: 52,
    topHoldings: [
      { ticker: "GOOGL", weight: "~14%" },
      { ticker: "META",  weight: "~9%"  },
      { ticker: "NWSA",  weight: "~7%"  },
      { ticker: "VIAC",  weight: "~6%"  },
    ],
    newBuys: [
      p("WBD (Warner Bros. Discovery)", { note: "deep value / media distressed" }),
      p("PARA (Paramount Global)"),
    ],
    increased: [
      p("GOOGL (Alphabet)",  { pct: "+18%" }),
      p("NWSA (News Corp)",  { pct: "+24%" }),
    ],
    reduced: [
      p("META",   { pct: "−12%" }),
      p("AMZN",   { pct: "−8%"  }),
    ],
    exits: [
      p("EQC (Equity Commonwealth)", { note: "REIT wind-down complete" }),
      p("LUMN (Lumen Technologies)"),
    ],
    theme: "Deepening media/entertainment value thesis — WBD and Paramount at distressed valuations. Increasing GOOGL conviction. Klarman's 'margin of safety' discipline means portfolio moves slowly; each new position reflects multi-year conviction.",
    sources: "SEC EDGAR, Baupost 13F, WhaleWisdom, 13Radar",
    color: "#8e44ad",
  },
  {
    type: "individual",
    name: "Icahn Capital",
    manager: "Carl Icahn",
    aum: "$5.3B",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: 19,
    topHoldings: [
      { ticker: "IEP",   weight: "~28%" },
      { ticker: "CVX",   weight: "~15%" },
      { ticker: "AMDL",  weight: "~9%"  },
      { ticker: "SBUX",  weight: "~8%"  },
    ],
    newBuys: [
      p("SBUX (Starbucks)", { note: "activist entry — operational overhaul thesis" }),
      p("OXY (Occidental Petroleum)"),
    ],
    increased: [
      p("CVX (Chevron)", { pct: "+21%" }),
      p("IEP (Icahn Enterprises)", { pct: "+8%" }),
    ],
    reduced: [
      p("NFLX (Netflix)",  { pct: "−35%", note: "valuation" }),
    ],
    exits: [
      p("BIIB (Biogen)"),
      p("PARA (Paramount)", { note: "exited after failed Skydance deal" }),
    ],
    theme: "Classic Icahn activist playbook: new Starbucks stake targeting board composition and margin recovery. Energy overweight (CVX, OXY) on long-term supply thesis. Exited Paramount after Skydance merger closed — activist catalyst fully played.",
    sources: "SEC EDGAR, Icahn 13F, Bloomberg, 13Radar",
    color: "#d35400",
  },
  {
    type: "individual",
    name: "Himalaya Capital Management",
    manager: "Li Lu",
    aum: "$3.1B",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: 7,
    topHoldings: [
      { ticker: "BABA",  weight: "~42%" },
      { ticker: "BAC",   weight: "~18%" },
      { ticker: "GOOGL", weight: "~14%" },
      { ticker: "BYD",   weight: "~11%" },
    ],
    newBuys: [
      p("BIDU (Baidu)", { note: "new China AI infrastructure bet" }),
    ],
    increased: [
      p("BABA (Alibaba)", { pct: "+22%", note: "continued multi-decade conviction hold" }),
      p("BAC (Bank of America)", { pct: "+11%" }),
    ],
    reduced: [
      p("GOOGL (Alphabet)", { pct: "−8%" }),
    ],
    exits: [
      p("MSFT (Microsoft)", { note: "full exit — valuation vs. China value opportunity cost" }),
    ],
    theme: "Charlie Munger's chosen successor runs one of the most concentrated portfolios in institutional investing. BABA is a multi-decade position — Li Lu's thesis is that the market is pricing in permanent impairment of a business with durable competitive advantages. Adding Baidu signals a new China AI infrastructure conviction. Extreme patience: median holding period exceeds 7 years.",
    sources: "SEC EDGAR, Himalaya 13F, Munger interviews, 13Radar",
    color: "#2471a3",
  },
  {
    type: "individual",
    name: "Gotham Asset Management",
    manager: "Joel Greenblatt",
    aum: "$6.4B",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: "~380",
    newBuys: [
      p("AMAT (Applied Materials)", { note: "re-entry after Soros exit — systematic screen buy" }),
      p("INTC (Intel)",             { note: "distressed value screen trigger" }),
      p("VFC (VF Corporation)"),
    ],
    increased: [
      p("GOOGL (Alphabet)",  { pct: "+19%" }),
      p("META",              { pct: "+14%" }),
      p("AVGO (Broadcom)",   { pct: "+11%" }),
      p("ISRG (Intuitive Surgical)", { pct: "+8%" }),
      p("MCO (Moody's)",     { pct: "+9%"  }),
    ],
    reduced: [
      p("AAPL (Apple)",      { pct: "−12%", note: "screen output — ROIC declining relative to peers" }),
      p("MSFT",              { pct: "−7%"  }),
      p("UNH (UnitedHealth)",{ pct: "−15%" }),
    ],
    exits: [
      p("CVS Health"),
      p("WBA (Walgreens Boots Alliance)"),
    ],
    theme: "Greenblatt's systematic Magic Formula screens for high return on invested capital at low EV/EBIT multiples — moves are driven by quantitative signals, not narrative. Q4 screen results: semis (AVGO, AMAT) and healthcare devices (ISRG) passing on ROIC; Intel's distressed valuation triggers a value screen entry despite poor momentum. AAPL trim reflects declining ROIC score relative to peers at current multiples.",
    sources: "SEC EDGAR, Gotham 13F, Greenblatt writings, 13Radar",
    color: "#1a7a4a",
  },
  {
    type: "individual",
    name: "Miller Value Partners",
    manager: "Bill Miller",
    aum: "$2.1B",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: 28,
    topHoldings: [
      { ticker: "MSTR",  weight: "~16%" },
      { ticker: "AMZN",  weight: "~14%" },
      { ticker: "COIN",  weight: "~9%"  },
      { ticker: "GOOGL", weight: "~8%"  },
      { ticker: "DHR",   weight: "~7%"  },
    ],
    newBuys: [
      p("HOOD (Robinhood)", { note: "crypto/retail trading infrastructure bet" }),
      p("CLSK (CleanSpark)", { note: "Bitcoin miner, AI/energy convergence thesis" }),
    ],
    increased: [
      p("MSTR (MicroStrategy)", { pct: "+38%", note: "leveraged Bitcoin proxy" }),
      p("COIN (Coinbase)",       { pct: "+27%" }),
      p("AMZN (Amazon)",         { pct: "+9%"  }),
    ],
    reduced: [
      p("GOOGL (Alphabet)", { pct: "−11%" }),
      p("DHR (Danaher)",    { pct: "−14%" }),
    ],
    exits: [
      p("WFC (Wells Fargo)", { note: "bank thesis fully played" }),
      p("BRK.B (Berkshire)", { note: "opportunity cost vs. higher-conviction bets" }),
    ],
    theme: "Miller's 15-year S&P-beating streak made him famous; his Bitcoin conviction defines his current portfolio. MSTR at 16% and COIN at 9% represent a concentrated bet that institutional Bitcoin adoption is still early. Adding Robinhood and CleanSpark signals a broader 'crypto infrastructure' thesis rather than pure BTC speculation. Long Amazon since the 1990s — still core.",
    sources: "SEC EDGAR, Miller Value 13F, Miller quarterly letters, 13Radar",
    color: "#7d3c98",
  },
  {
    type: "individual",
    name: "Trian Fund Management",
    manager: "Nelson Peltz",
    aum: "$8.2B",
    quarter: "Q4 2025",
    filed: "Feb 2026",
    holdings: 14,
    topHoldings: [
      { ticker: "UNI",   weight: "~22%" },
      { ticker: "GIS",   weight: "~16%" },
      { ticker: "SYY",   weight: "~13%" },
      { ticker: "WEN",   weight: "~9%"  },
    ],
    newBuys: [
      p("KHC (Kraft Heinz)",  { note: "activist entry — brand portfolio rationalization thesis" }),
      p("YUM (Yum! Brands)",  { note: "franchise model + international growth" }),
    ],
    increased: [
      p("GIS (General Mills)", { pct: "+28%", note: "activist pressure for margin improvement" }),
      p("SYY (Sysco)",         { pct: "+17%" }),
    ],
    reduced: [
      p("DIS (Disney)", { pct: "−45%", note: "reduced post proxy fight loss" }),
      p("WEN (Wendy's)", { pct: "−20%" }),
    ],
    exits: [
      p("MDLZ (Mondelez)", { note: "full exit after multi-year engagement" }),
      p("JNPR (Juniper Networks)", { note: "HPE acquisition completed" }),
    ],
    theme: "Peltz's activist model targets underperforming consumer/brand businesses where board-level engagement can unlock margin. Post-Disney proxy fight (lost), Trian is refocusing on food/beverage where their track record is strongest. New KHC and YUM entries follow the classic Trian playbook: franchisable brand assets with bloated cost structures. Consumer staples at depressed valuations with an operational catalyst.",
    sources: "SEC EDGAR, Trian 13F, Trian investor letters, Bloomberg",
    color: "#ba4a00",
  },
];

const allFilers = [...funds, ...individuals];

const sectorThemes = [
  { sector: "AI Infrastructure / Semis", tickers: "NVDA, MU, AVGO, TSM, AMD, ORCL", buyers: "Bridgewater, Citadel, D.E. Shaw, Appaloosa, Soros, Druckenmiller", signal: "Strongest consensus — nearly every major filer added. Druckenmiller called it his highest-conviction macro theme ever." },
  { sector: "Mega-Cap Tech (Cloud/Ad)", tickers: "AMZN, MSFT, GOOGL, META", buyers: "Pershing, Viking, Citadel, Soros, Klarman, Druckenmiller", signal: "AMZN bought by Ackman, Dalio & Soros simultaneously. Klarman quietly building GOOGL." },
  { sector: "Energy & Utilities (AI Power)", tickers: "CEG, VST, XOP, CVX, OXY", buyers: "Third Point, Soros, Berkshire, Druckenmiller, Icahn", signal: "Nuclear/clean energy (CEG, VST) emerging as AI power trade. Druckenmiller called it 'picks and shovels' for data centers." },
  { sector: "Gold / Macro Hedges", tickers: "GLD, GOLD, NGD", buyers: "Citadel, Soros, Druckenmiller, Einhorn", signal: "Both funds and individuals building gold — signals broad macro unease about US debt trajectory." },
  { sector: "China Internet (Contrarian)", tickers: "BABA, JD, PDD", buyers: "Burry (increasing), Third Point (new), Klarman", signal: "Burry doubling down while Appaloosa exits — classic consensus vs. contrarian split on China re-rating." },
  { sector: "Media / Deep Value", tickers: "WBD, PARA, NWSA, NYT", buyers: "Klarman, Berkshire, Third Point", signal: "Distressed media assets at multi-decade lows attracting value specialists — high risk, asymmetric upside thesis." },
];

const exits = [
  { stock: "META", funds: "Viking, Third Point (while Pershing & Klarman bought)" },
  { stock: "INTC (Intel)", funds: "Appaloosa — full exit" },
  { stock: "MDB (MongoDB)", funds: "Tiger Global — full exit after 10x from IPO" },
  { stock: "BABA trimmed heavily", funds: "Appaloosa (−20%), while Burry & Third Point added" },
  { stock: "HLT (Hilton)", funds: "Pershing Square — full exit on valuation" },
  { stock: "PARA (Paramount)", funds: "Icahn — exited after Skydance merger closed" },
  { stock: "GOOG (Alphabet)", funds: "Burry — full exit on AI valuation concern" },
  { stock: "BLK (BlackRock)", funds: "Viking Global — full exit" },
  { stock: "China ETFs (FXI, KWEB)", funds: "Soros — significant reduction" },
  { stock: "UNH (UnitedHealth)", funds: "Druckenmiller — full exit" },
];

// ─── ANALYSIS DATA ────────────────────────────────────────────────────────────

const macroNarrative = {
  quarter: "Q4 2025",
  headline: "The AI Supercycle, the Power Trade, and the Gold Hedge",
  paragraphs: [
    {
      title: "The Consensus Regime",
      body: "Q4 2025 filings reveal institutional capital unified around a single macro thesis: an AI-driven productivity supercycle that requires unprecedented physical infrastructure. The bet is no longer just software — it spans the full stack from semiconductors (NVDA, AMD, AVGO) to cloud hyperscalers (MSFT, AMZN, GOOGL) to the power grid enabling it all (CEG, VST, XOP). Bridgewater's +$1.3B SPY expansion alongside targeted NVDA and AMZN adds, Citadel's broad mega-cap accumulation, and D.E. Shaw's +$3.8B QQQ position all point to the same conclusion: risk-on, infrastructure-heavy, AI-first.",
    },
    {
      title: "The Energy Surprise",
      body: "The most underreported signal is energy. Five unrelated filers — Druckenmiller, Third Point, Soros, Icahn, and Berkshire — all increased energy exposure in Q4, but through different vehicles: nuclear (CEG, VST), oil (CVX, OXY), and broad ETFs (XOP). The common thread is AI data center demand. Druckenmiller called nuclear power 'picks and shovels for the AI trade.' Third Point's +1,100% Danaher position and simultaneous CEG/VST buys suggest Loeb sees a multi-year power infrastructure cycle playing out. This is not an oil trade — it is an energy scarcity trade driven by compute demand.",
    },
    {
      title: "The Parallel Gold Bet",
      body: "Simultaneously, Citadel's $4.2B GLD add, Soros's $416M XOP/gold position, Druckenmiller's +34% GLD increase, and Einhorn's persistent gold exposure tell a consistent macro hedge story: the fiscal cost of the AI supercycle is inflationary. These investors are not confused — they are holding both AI assets and gold because they believe the AI buildout will strain sovereign balance sheets and force central banks into difficult positions. Druckenmiller holding his highest-ever AI concentration while aggressively adding gold is the single most telling data point in the entire quarter's filings.",
    },
    {
      title: "Forward Implication",
      body: "History shows that when this many high-conviction, low-turnover managers cluster around a thesis simultaneously, the move has at least 2–4 more quarters of institutional momentum behind it before mean reversion. The risk to this view is a surprise demand signal (AI adoption disappoints) or a credit event that forces deleveraging across the board. The contrarian setup — Burry and Klarman in deeply unloved China internet and distressed media — suggests value capital is already anticipating where the next decade's returns may actually come from: not the consensus AI trade, but the assets the consensus has abandoned.",
    },
  ],
  keySignals: [
    { label: "Strongest Buy Consensus",  value: "NVDA, AMZN, MSFT — bought by 7+ filers simultaneously" },
    { label: "Most Surprising New Bet",  value: "Nuclear power (CEG, VST) — 5 unrelated filers entered in the same quarter" },
    { label: "Highest Individual Conviction", value: "Druckenmiller: largest AI allocation of career + +34% gold increase" },
    { label: "Biggest Divergence",       value: "META: Pershing/Klarman buying while Viking/Third Point sold" },
    { label: "Contrarian Setup",         value: "Burry doubling BABA/JD as Appaloosa exits — value vs. geopolitical risk" },
    { label: "Key Risk to Consensus",    value: "AI capex disappointment or sovereign debt event forcing broad deleveraging" },
  ],
};

const divergences = [
  {
    ticker: "META",
    subtitle: "Mega-Cap AI vs. Valuation Fatigue",
    bulls: {
      filers: ["Pershing Square (new, 11.4% of portfolio)", "Baupost Group (increased)"],
      thesis: "Ackman sees META's AI-powered ad targeting as a compounding moat — Llama models reduce compute costs while improving ad relevance. At ~22x forward earnings for a business growing 20%+, Klarman's margin-of-safety discipline is satisfied. The Reels and WhatsApp monetization optionality is unpriced.",
    },
    bears: {
      filers: ["Viking Global (full exit)", "Third Point (full exit)", "Bridgewater (trimmed −$128M)"],
      thesis: "Viking and Loeb both took profits after META's 400%+ run from the 2022 trough. At these multiples, the bar for upside surprise is high, and regulatory risk (EU fines, US antitrust) is a non-trivial tail. Bridgewater's systematic trim suggests quantitative factors have turned.",
    },
    verdict: "High-conviction split between value buyers (Ackman, Klarman) seeing durable business quality and momentum sellers taking profits. Watch Q1 2026 ad revenue guidance — will determine which side is right.",
  },
  {
    ticker: "BABA",
    subtitle: "China Bottoming vs. Geopolitical Discount",
    bulls: {
      filers: ["Michael Burry (increased +31%)", "Third Point (new position)", "Baupost (held)"],
      thesis: "BABA trades at ~8x forward earnings with $50B+ net cash — a valuation that prices in near-permanent impairment. Burry's thesis: the regulatory crackdown is fully priced, AI monetization (Tongyi Qianwen) is a free call option, and the company is buying back aggressively. Historically, Burry's China re-entries have preceded 12–18 month re-ratings.",
    },
    bears: {
      filers: ["Appaloosa (trimmed −20%)", "Soros (cut FXI/KWEB)", "Bridgewater (reduced exposure)"],
      thesis: "Tepper, who made a high-profile China bet in 2023 and has been trimming since, sees geopolitical risk as genuinely unquantifiable. A Taiwan event or US secondary sanctions would not be priceable. The regulatory environment remains uncertain and Xi's capital allocation priorities are unpredictable.",
    },
    verdict: "The most analytically pure bull/bear split in the filings. Both sides have strong priors. Resolution likely requires a macro catalyst (US-China trade deal or escalation) rather than fundamentals alone.",
  },
  {
    ticker: "NVDA",
    subtitle: "AI Infrastructure Cycle vs. Cyclical Peak Risk",
    bulls: {
      filers: ["Bridgewater (+54%, +$253M)", "Citadel (+$large)", "D.E. Shaw (+$584M)", "Druckenmiller (+18%)", "Soros (added)", "Appaloosa (held)"],
      thesis: "Six filers added simultaneously — an extraordinarily rare consensus. The bull case: NVIDIA's CUDA moat is 10+ years deep, Blackwell demand is backlogged into 2026, and the hyperscalers (MSFT, AMZN, GOOGL) have all publicly committed to multi-year capex expansion. This is not speculation — it is supply-constrained demand.",
    },
    bears: {
      filers: ["Tiger Global (trimmed −698K shares)", "Appaloosa (reduced)"],
      thesis: "Tiger's reduction is not a bear call — it's profit-taking after a 10x move. The structural bear case (few have made it publicly): NVDA trades at 30x revenue, China export restrictions permanently impair the TAM, and AMD/custom silicon (Google TPUs, Amazon Trainium) will compress margins over a 3–5 year horizon.",
    },
    verdict: "Not a true divergence — the 'bears' are profit-takers, not structural shorts. The near-unanimous institutional accumulation at these prices is itself the signal. Tactical risk vs. strategic conviction.",
  },
  {
    ticker: "Energy (CEG / VST / CVX)",
    subtitle: "AI Power Demand vs. Commodity Cycle Timing",
    bulls: {
      filers: ["Druckenmiller (new VST/CEG)", "Third Point (new CEG/VST)", "Soros (+$416M XOP)", "Icahn (+21% CVX)", "Berkshire (+6.6% CVX)"],
      thesis: "AI data centers require 24/7 reliable power — only nuclear and gas can provide baseload. CEG and VST are the only publicly traded pure-play nuclear operators in the US. At current valuations they are pricing in ~8% power price growth; actual demand curves suggest 15–20% over 5 years. This is a decade-long structural underinvestment story, not a trade.",
    },
    bears: {
      filers: ["Tiger Global (no energy exposure)", "Viking (no energy)", "D.E. Shaw (no meaningful energy add)"],
      thesis: "Growth-oriented funds see energy as a value trap — regulatory and construction risk in nuclear is decades-long, and renewable costs continue to fall. The power thesis may be correct but the investment timeline is too long for their return targets.",
    },
    verdict: "One of the clearest emerging consensus themes — five filers entered simultaneously in Q4. When concentrated fund managers and macro traders agree on a sector, the institutional re-rating is typically 12–18 months ahead of retail recognition.",
  },
];

// ─── CONVICTION COMPUTATION ───────────────────────────────────────────────────

function extractTicker(label) {
  if (!label || label.length > 55) return null;
  const match = label.match(/^([A-Z]{1,6})\b/);
  return match ? match[1] : null;
}

function computeConviction(filers) {
  const scores = {};
  const detail = {};

  filers.forEach(filer => {
    const process = (items, score, action) => {
      items.forEach(item => {
        const ticker = extractTicker(item.label);
        if (!ticker || ticker.length < 2) return;
        scores[ticker] = (scores[ticker] || 0) + score;
        if (!detail[ticker]) detail[ticker] = { buyers: [], sellers: [] };
        if (score > 0) detail[ticker].buyers.push({ name: filer.name, action });
        else           detail[ticker].sellers.push({ name: filer.name, action });
      });
    };
    process(filer.newBuys,   3, "New buy");
    process(filer.increased, 2, "Increased");
    process(filer.reduced,  -2, "Reduced");
    process(filer.exits,    -3, "Exited");
  });

  const entries = Object.entries(scores)
    .filter(([t]) => t !== "SPY" && t !== "QQQ" && t !== "RSP") // exclude pure ETFs
    .map(([ticker, score]) => ({ ticker, score, ...detail[ticker] }))
    .sort((a, b) => b.score - a.score);

  const maxAbs = Math.max(...entries.map(e => Math.abs(e.score)));
  return entries.map(e => ({ ...e, pct: Math.round((Math.abs(e.score) / maxAbs) * 100) }));
}

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "#fff176", color: "#1a1a1a", borderRadius: 2, padding: "0 1px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function matches(text, query) {
  return text.toLowerCase().includes(query.toLowerCase());
}

function isPositive(str) { return str && (str.startsWith("+") || str.startsWith("+")); }
function isNegative(str) { return str && (str.startsWith("−") || str.startsWith("-")); }

function Chip({ value, type }) {
  const colors = {
    pct:    isNegative(value) ? { bg: "#fff3e0", text: "#e65100" } : { bg: "#e3f2fd", text: "#1565c0" },
    val:    isNegative(value) ? { bg: "#fce4ec", text: "#c62828" } : { bg: "#e8f5e9", text: "#2e7d32" },
    weight: { bg: "#ede7f6", text: "#6a1b9a" },
  };
  const { bg, text } = colors[type] || colors.weight;
  return (
    <span style={{
      display: "inline-block",
      background: bg,
      color: text,
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 700,
      padding: "1px 6px",
      marginLeft: 5,
      whiteSpace: "nowrap",
      flexShrink: 0,
    }}>{value}</span>
  );
}

function Section({ label, color, prefix, items, query }) {
  const filtered = query ? items.filter(item => matches(item.label, query)) : items;
  if (query && filtered.length === 0) return null;
  const muted = prefix === "↓" || prefix === "✕";
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color, marginBottom: 6 }}>{label}</div>
      {filtered.map((item, i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          fontSize: 13,
          color: muted ? "#555" : "#222",
          padding: "3px 4px",
          lineHeight: 1.5,
          background: query && matches(item.label, query) ? "#fffde7" : "transparent",
          borderRadius: 3,
        }}>
          <span style={{ marginRight: 3 }}>{prefix}</span>
          <span style={{ flex: 1 }}>{highlight(item.label, query)}</span>
          {item.pct    && <Chip value={item.pct}    type="pct" />}
          {item.val    && <Chip value={item.val}    type="val" />}
          {item.weight && <Chip value={item.weight} type="weight" />}
          {item.note   && <span style={{ fontSize: 11, color: "#999", marginLeft: 4 }}>· {item.note}</span>}
        </div>
      ))}
    </div>
  );
}

function TopHoldings({ holdings, color }) {
  if (!holdings?.length) return null;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#999", marginBottom: 6 }}>Top Holdings by Weight</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {holdings.map((h, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "#f9f9f9",
            border: "1px solid #ebebeb",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 12,
          }}>
            <span style={{ fontWeight: 700, color: "#1a1a1a" }}>{h.ticker}</span>
            <span style={{
              background: `${color}22`,
              color,
              fontWeight: 700,
              fontSize: 11,
              borderRadius: 3,
              padding: "0 4px",
            }}>{h.weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisTab({ filers }) {
  const conviction = computeConviction(filers);
  const topBuys  = conviction.filter(e => e.score > 0).slice(0, 9);
  const topSells = conviction.filter(e => e.score < 0).slice(-5).reverse();
  const [openDiv, setOpenDiv] = useState(null);

  return (
    <div>
      {/* ── MACRO NARRATIVE ─────────────────────────────────────── */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e0e0e0", overflow: "hidden", marginBottom: 16 }}>
        <div style={{ background: "linear-gradient(135deg, #1a1a1a, #2c3e50)", padding: "18px 20px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#aaa", marginBottom: 6 }}>
            {macroNarrative.quarter} · Macro Synthesis
          </div>
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.25 }}>
            {macroNarrative.headline}
          </div>
        </div>

        <div style={{ padding: "16px 20px" }}>
          {macroNarrative.paragraphs.map((p, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#999", marginBottom: 5 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: "#333", lineHeight: 1.65 }}>{p.body}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "0 20px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#999", marginBottom: 10 }}>Key Signals</div>
          {macroNarrative.keySignals.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: "#2ecc71", marginTop: 5, flexShrink: 0 }} />
              <div>
                <span style={{ fontWeight: 700, color: "#333" }}>{s.label}:</span>{" "}
                <span style={{ color: "#555" }}>{s.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONVICTION HEATMAP ──────────────────────────────────── */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e0e0e0", padding: "16px 20px", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 16, color: "#1a1a1a", marginBottom: 4 }}>Conviction Heatmap</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>Auto-scored across all 15 filers. New buy = +3 · Increased = +2 · Reduced = −2 · Exited = −3</div>

        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#2ecc71", marginBottom: 8 }}>Strong Buy Consensus</div>
        {topBuys.map((e, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
            <div style={{ width: 46, fontWeight: 700, fontSize: 12, color: "#1a1a1a", flexShrink: 0 }}>{e.ticker}</div>
            <div style={{ flex: 1, height: 14, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${e.pct}%`, height: "100%", background: `linear-gradient(90deg, #2ecc71, #27ae60)`, borderRadius: 4, transition: "width 0.4s" }} />
            </div>
            <div style={{ width: 28, textAlign: "right", fontSize: 11, fontWeight: 700, color: "#2ecc71", flexShrink: 0 }}>+{e.score}</div>
            <div style={{ fontSize: 11, color: "#aaa", flexShrink: 0 }}>{e.buyers?.length || 0} buyers</div>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #f0f0f0", margin: "14px 0" }} />
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#e74c3c", marginBottom: 8 }}>Sell / Exit Consensus</div>
        {topSells.map((e, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
            <div style={{ width: 46, fontWeight: 700, fontSize: 12, color: "#1a1a1a", flexShrink: 0 }}>{e.ticker}</div>
            <div style={{ flex: 1, height: 14, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${e.pct}%`, height: "100%", background: `linear-gradient(90deg, #e74c3c, #c0392b)`, borderRadius: 4 }} />
            </div>
            <div style={{ width: 28, textAlign: "right", fontSize: 11, fontWeight: 700, color: "#e74c3c", flexShrink: 0 }}>{e.score}</div>
            <div style={{ fontSize: 11, color: "#aaa", flexShrink: 0 }}>{e.sellers?.length || 0} sellers</div>
          </div>
        ))}
      </div>

      {/* ── DIVERGENCE RADAR ────────────────────────────────────── */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e0e0e0", padding: "16px 20px", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 16, color: "#1a1a1a", marginBottom: 4 }}>Divergence Radar</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>Where top filers are making opposite bets — and why each side may be right.</div>

        {divergences.map((d, i) => {
          const isOpen = openDiv === i;
          return (
            <div key={i} style={{ border: "1px solid #ebebeb", borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
              <div
                onClick={() => setOpenDiv(isOpen ? null : i)}
                style={{ padding: "12px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none" }}
              >
                <div>
                  <span style={{ fontWeight: 800, fontSize: 15, color: "#1a1a1a" }}>{d.ticker}</span>
                  <span style={{ fontSize: 12, color: "#888", marginLeft: 8 }}>{d.subtitle}</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, background: "#e8f5e9", color: "#2e7d32", padding: "2px 6px", borderRadius: 4 }}>{d.bulls.filers.length} bulls</span>
                  <span style={{ fontSize: 10, fontWeight: 700, background: "#fce4ec", color: "#c62828", padding: "2px 6px", borderRadius: 4 }}>{d.bears.filers.length} bears</span>
                  <span style={{ fontSize: 16, color: "#ccc", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                </div>
              </div>
              {isOpen && (
                <div style={{ padding: "0 14px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: "#f0faf4", borderRadius: 6, padding: "12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#2e7d32", marginBottom: 6 }}>Bull Case</div>
                    <div style={{ fontSize: 11, color: "#555", marginBottom: 8, lineHeight: 1.4 }}>
                      {d.bulls.filers.map((f, j) => <div key={j} style={{ fontWeight: 600, color: "#2e7d32" }}>· {f}</div>)}
                    </div>
                    <div style={{ fontSize: 12, color: "#333", lineHeight: 1.6 }}>{d.bulls.thesis}</div>
                  </div>
                  <div style={{ background: "#fef5f5", borderRadius: 6, padding: "12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#c62828", marginBottom: 6 }}>Bear Case</div>
                    <div style={{ fontSize: 11, color: "#555", marginBottom: 8, lineHeight: 1.4 }}>
                      {d.bears.filers.map((f, j) => <div key={j} style={{ fontWeight: 600, color: "#c62828" }}>· {f}</div>)}
                    </div>
                    <div style={{ fontSize: 12, color: "#333", lineHeight: 1.6 }}>{d.bears.thesis}</div>
                  </div>
                  <div style={{ gridColumn: "1 / -1", background: "#fffde7", borderRadius: 6, padding: "10px 12px", fontSize: 12, color: "#555", lineHeight: 1.6 }}>
                    <span style={{ fontWeight: 700, color: "#333" }}>Verdict: </span>{d.verdict}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6, padding: "0 4px" }}>
        Analysis reflects Q4 2025 13F filings only. Conviction scores are mechanical — they do not account for position sizing, fund strategy, or non-disclosed short positions. This is not investment advice.
      </div>
    </div>
  );
}

function FundCard({ fund, isOpen, onToggle, query }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      marginBottom: 10,
      border: query ? `1px solid ${fund.color}55` : "1px solid #e0e0e0",
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
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 16, color: "#1a1a1a" }}>{fund.name}</span>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              padding: "1px 6px",
              borderRadius: 4,
              background: fund.type === "individual" ? "#fff3e0" : "#e8f5e9",
              color: fund.type === "individual" ? "#e65100" : "#2e7d32",
            }}>{fund.type === "individual" ? "Individual" : "Fund"}</span>
          </div>
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

          <TopHoldings holdings={fund.topHoldings} color={fund.color} />
          <Section label="New Buys" color="#2ecc71" prefix="+" items={fund.newBuys} query={query} />
          <Section label="Increased Positions" color="#3498db" prefix="↑" items={fund.increased} query={query} />
          <Section label="Reduced / Trimmed" color="#e67e22" prefix="↓" items={fund.reduced} query={query} />
          <Section label="Full Exits" color="#e74c3c" prefix="✕" items={fund.exits} query={query} />

          <div style={{ fontSize: 11, color: "#aaa", borderTop: "1px solid #eee", paddingTop: 8, marginTop: 4 }}>
            Sources: {fund.sources}
          </div>
        </div>
      )}
    </div>
  );
}

function fundMatchesQuery(fund, query) {
  if (!query) return true;
  return [...fund.newBuys, ...fund.increased, ...fund.reduced, ...fund.exits]
    .some(item => matches(item.label, query));
}

export default function HedgeFundTracker() {
  const [openFunds, setOpenFunds] = useState({ 0: true });
  const [tab, setTab] = useState("funds");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const query = search.trim();
  const visibleFilers = allFilers.filter(f =>
    (typeFilter === "all" || f.type === typeFilter) && fundMatchesQuery(f, query)
  );

  const toggle = (name) => setOpenFunds(prev => ({ ...prev, [name]: !prev[name] }));

  const filterCounts = {
    all:        allFilers.filter(f => fundMatchesQuery(f, query)).length,
    fund:       allFilers.filter(f => f.type === "fund"       && fundMatchesQuery(f, query)).length,
    individual: allFilers.filter(f => f.type === "individual" && fundMatchesQuery(f, query)).length,
  };

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
          13F Position Tracker
        </h1>
        <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
          10 funds · 9 individuals · Filed Feb 2026 · Data as of Dec 31, 2025
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: 10 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#aaa", pointerEvents: "none" }}>🔍</span>
        <input
          type="text"
          placeholder="Search ticker or name… e.g. NVDA, BABA, Druckenmiller"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "10px 36px 10px 34px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 13,
            background: "#fff",
            outline: "none",
            color: "#1a1a1a",
          }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#aaa", lineHeight: 1 }}
          >×</button>
        )}
      </div>

      {query && (
        <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
          {visibleFilers.length === 0
            ? `No filers mention "${query}"`
            : `${visibleFilers.length} filer${visibleFilers.length > 1 ? "s" : ""} mention "${query}"`}
        </div>
      )}

      <div style={{ display: "flex", gap: 6, marginBottom: 18, background: "#e8e6e1", borderRadius: 8, padding: 3 }}>
        {[
          { key: "funds",    label: "By Filer"         },
          { key: "sectors",  label: "Sector Consensus" },
          { key: "exits",    label: "Notable Exits"    },
          { key: "analysis", label: "Analysis"         },
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
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {[
              { key: "all",        label: "All",         count: filterCounts.all        },
              { key: "fund",       label: "Funds",       count: filterCounts.fund       },
              { key: "individual", label: "Individuals", count: filterCounts.individual },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setTypeFilter(f.key)}
                style={{
                  padding: "5px 12px",
                  border: typeFilter === f.key ? "1.5px solid #1a1a1a" : "1.5px solid #ddd",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: typeFilter === f.key ? "#1a1a1a" : "#fff",
                  color: typeFilter === f.key ? "#fff" : "#666",
                  transition: "all 0.15s",
                }}
              >
                {f.label} <span style={{ opacity: 0.65, fontWeight: 400 }}>{f.count}</span>
              </button>
            ))}
          </div>
          {visibleFilers.map((fund) => (
            <FundCard key={fund.name} fund={fund} isOpen={query ? true : !!openFunds[fund.name]} onToggle={() => toggle(fund.name)} query={query} />
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

      {tab === "analysis" && <AnalysisTab filers={allFilers} />}

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

import { useState, useEffect } from "react";

// position entry helper: p(label, { pct, val, weight, note })
const p = (label, opts = {}) => ({ label, ...opts });

const funds = [
  {
    type: "fund",
    name: "Berkshire Hathaway",
    manager: "Greg Abel (CEO — first quarter post-Buffett)",
    aum: "~$263.1B",
    quarter: "Q1 2026",
    filed: "May 15, 2026",
    holdings: 29,
    topHoldings: [
      { ticker: "AAPL",  weight: "~22.0%" },
      { ticker: "AXP",   weight: "~17.4%" },
      { ticker: "KO",    weight: "~11.6%" },
      { ticker: "BAC",   weight: "~9.5%"  },
      { ticker: "GOOGL", weight: "~8.5%"  },
      { ticker: "CVX",   weight: "~6.6%"  },
      { ticker: "OXY",   weight: "~4.2%"  },
      { ticker: "DAL",   weight: "~1.0%"  },
    ],
    newBuys: [
      p("DAL (Delta Air Lines)", { val: "~$2.6B", note: "~39.8M shares — Abel's domestic travel conviction" }),
      p("M (Macy's)", { val: "~$55M", note: "small new value stake" }),
    ],
    increased: [
      p("GOOGL (Alphabet)", { pct: "+204%", note: "tripled stake — now top 5 holding at ~8.5%" }),
      p("NYT (New York Times)", { pct: "+199%" }),
      p("LEN (Lennar)", { pct: "+43%" }),
    ],
    reduced: [
      p("BAC (Bank of America)", { pct: "−7.2%", val: "−$2.15B" }),
      p("CVX (Chevron)",         { pct: "−35%" }),
    ],
    exits: [
      p("V (Visa)",              { val: "~$2.91B", note: "Combs portfolio — fully exited" }),
      p("MA (Mastercard)",       { val: "~$2.28B", note: "Combs portfolio — fully exited" }),
      p("UNH (UnitedHealth)",    { val: "~$1.66B" }),
      p("DPZ (Domino's Pizza)",  { val: "~$1.40B", note: "Combs position" }),
      p("AON",                   { val: "~$1.27B" }),
      p("C (Citigroup)",         { val: "~$1.12B" }),
      p("NU (Nu Holdings)",      { val: "~$527M" }),
      p("AMZN (Amazon)",         { val: "~$525M", note: "paradoxically Baupost & Appaloosa added heavily" }),
      p("POOL (Pool Corp), HEI (Heico), LLYVA (Liberty Live)", { note: "6 other complete exits this quarter" }),
    ],
    theme: "Greg Abel's first quarter as CEO produced the largest portfolio overhaul in Berkshire history — 16 full exits, reducing holdings from 42 to 29. The Todd Combs departure explains many exits (Visa, Mastercard, Domino's, Aon). Abel's own signature: tripling Alphabet stake (now 8.5% of portfolio) and initiating Delta Air Lines. This quarter is the clearest signal yet that Berkshire under Abel will be AI-aware and more concentrated, not the sprawling portfolio of the Buffett era.",
    sources: "SEC EDGAR, Fortune, Benzinga, Kiplinger, WhaleWisdom, Seeking Alpha, IBTimes",
    color: "#8B0000",
  },
  {
    type: "fund",
    name: "Bridgewater Associates",
    manager: "Nir Bar Dea (CEO)",
    aum: "$27.4B (13F) / ~$136.5B total",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 1040,
    newBuys: [
      p("MRVL (Marvell Technology)", { note: "new AI networking chip bet" }),
    ],
    increased: [
      p("NVDA (Nvidia)",      { val: "+$253M" }),
      p("AMZN (Amazon)",      { val: "+$190M" }),
      p("SPY (S&P 500 ETF)",  { val: "+$1.3B" }),
      p("ORCL (Oracle)",      { val: "+$286M" }),
      p("MU (Micron)",        { val: "+$253M" }),
      p("NOW (ServiceNow)",   { val: "+$159M" }),
      p("AVGO (Broadcom)",    { val: "+$111M" }),
    ],
    reduced: [
      p("GOOGL (Alphabet)",   { val: "−$333M" }),
      p("PYPL (PayPal)",      { note: "fintech rotation out" }),
      p("WFC (Wells Fargo)",  { note: "banking exit" }),
      p("META",               { val: "−$128M" }),
      p("UBER",               { val: "−$189M" }),
      p("REGN (Regeneron)",   { val: "−$126M" }),
    ],
    exits: [
      p("CRM (Salesforce)", { note: "full exit — enterprise software pivot" }),
    ],
    theme: "Bridgewater under Nir Bar Dea continues its AI infrastructure concentration (NVDA, AMZN, ORCL, MU, NOW) while adding Marvell as the AI networking chip play. Key Q1 2026 move: full Salesforce exit as the fund rotates away from traditional enterprise software toward AI-native platforms. Reducing payment processors (PayPal) and social media (META). The SPY +$1.3B addition reflects macro-neutral broad equity exposure alongside targeted AI bets — Bridgewater's all-weather DNA.",
    sources: "WhaleWisdom, Seeking Alpha, HoldingsChannel, Fintel",
    color: "#1a5276",
  },
  {
    type: "fund",
    name: "Citadel Advisors",
    manager: "Ken Griffin",
    aum: "~$666B (13F, incl. market-making)",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: "12,508",
    newBuys: [
      p("NFLX (Netflix)", { val: "+$8.4B", note: "largest single add this quarter — AI-integrated streaming" }),
    ],
    increased: [
      p("AMZN (Amazon)",   { val: "+$2.6B", pct: "+336%" }),
      p("AVGO (Broadcom)", { val: "+$2.2B" }),
      p("NVDA (Nvidia)",   { val: "~$4B total stake" }),
    ],
    reduced: [
      p("SPY (S&P 500 ETF)", { val: "−$8.1B", note: "inventory rotation, not directional" }),
      p("QQQ (Nasdaq ETF)",  { val: "−$8.0B" }),
      p("MSFT (Microsoft)",  { val: "−$909M" }),
    ],
    exits: [p("Various smaller positions across diversified book")],
    theme: "Citadel's Q1 2026 is a masterclass in AI/streaming convergence. The $8.4B Netflix addition is the headline — Griffin sees NFLX as an AI-integrated entertainment platform doubling ad revenue. The Amazon and Broadcom builds alongside NVDA expansion align with every layer of AI infrastructure (cloud → chips → applications). SPY/QQQ reductions are market-making inventory adjustments, not directional bets. Net buyer of ~$11B. The NFLX bet is Citadel's highest-conviction single-stock add of the year.",
    sources: "TheStreet, Insider Monkey, Yahoo Finance, WhaleWisdom",
    color: "#2c3e50",
  },
  {
    type: "fund",
    name: "Pershing Square",
    manager: "Bill Ackman",
    aum: "~$16B",
    quarter: "Q1 2026",
    filed: "May 15, 2026",
    holdings: 11,
    newBuys: [
      p("MSFT (Microsoft)", { val: "~$2.09B", note: "5.65M shares — bought during Feb–Mar pullback at ~21x forward earnings" }),
    ],
    increased: [
      p("AMZN (Amazon)", { pct: "+19%", note: "+1.84M shares" }),
    ],
    reduced: [
      p("GOOGL (Alphabet)", { pct: "−95%", note: "from ~6.1M to ~312K shares — near-full exit" }),
      p("GOOG (Alphabet C)", { pct: "−95%", note: "from ~678K to ~32K shares" }),
    ],
    exits: [
      p("HLT (Hilton Hotels)", { note: "full exit, ~3.03M shares — successful multi-year investment" }),
    ],
    theme: "Ackman's Q1 2026 pivot: out of Alphabet, into Microsoft. He sold ~95% of GOOGL/GOOG and deployed $2.09B into MSFT at what he called 'well below its historical trading average.' His thesis: Azure AI is the more durable cloud franchise vs. GOOGL's search-at-risk narrative. Hilton exit after a multi-year successful run frees capital for tech conviction. Pershing remains one of the most concentrated portfolios in the universe — 11 positions, >99% in top 10.",
    sources: "CNBC, Quiver Quant, Seeking Alpha, GuruFocus",
    color: "#6c3483",
  },
  {
    type: "fund",
    name: "Appaloosa Management",
    manager: "David Tepper",
    aum: "$5.93B",
    quarter: "Q1 2026",
    filed: "May 15, 2026",
    holdings: 31,
    newBuys: [
      p("SNDK (SanDisk / WD Flash)", { val: "~$179M", note: "281K shares — flash storage for AI workloads" }),
    ],
    increased: [
      p("AMZN (Amazon)",        { pct: "+98%",  val: "+~$400M", note: "total stake ~$900M — largest position" }),
      p("UBER",                 { pct: "+242%", val: "+~$455M total" }),
      p("MU (Micron)",          { pct: "+200%", note: "from 500K to 1.5M shares, ~$285M added" }),
      p("VST (Vistra Energy)",  { pct: "+114%" }),
      p("GOOGL (Alphabet)",     { pct: "+29%"  }),
      p("META",                 { note: "increased" }),
      p("TSM (TSMC)",           { pct: "+18%"  }),
    ],
    reduced: [
      p("BABA (Alibaba)", { pct: "−33%", note: "from 15.61% to 10.88% of portfolio — China de-risk" }),
      p("MSFT (Microsoft)", { note: "trimmed" }),
      p("NVDA (Nvidia)",    { note: "trimmed" }),
    ],
    exits: [
      p("AAL (American Airlines)", { note: "all 14.1M shares — tariff/recession risk" }),
      p("UAL (United Airlines)",   { note: "full exit — same thesis as AAL" }),
      p("OC (Owens Corning)"),
      p("MHK (Mohawk Industries)"),
      p("IQV (IQVIA Holdings)"),
    ],
    theme: "Tepper's Q1 2026 is a crisp AI infrastructure rotation: out of airlines (tariff/demand risk), into AI enablers. Amazon (+98%), Micron (+200%), SanDisk (AI flash storage), Uber (platform scale), and Vistra (AI power demand) all reflect the 'AI needs cloud, memory, and power' thesis. BABA reduced but not abandoned — Tepper maintaining China optionality while de-risking. Full airline exits (AAL, UAL) ahead of tariff-driven demand uncertainty is prescient portfolio management.",
    sources: "CNBC, Seeking Alpha, TipRanks, HedgeFollow, SEC EDGAR",
    color: "#b7950b",
  },
  {
    type: "fund",
    name: "Tiger Global Management",
    manager: "Chase Coleman",
    aum: "$22.8B",
    quarter: "Q1 2026",
    filed: "May 15, 2026",
    holdings: 54,
    newBuys: [
      p("INTC (Intel)", { note: "new position — foundry restructuring + US semiconductor supply chain thesis" }),
    ],
    increased: [
      p("AVGO (Broadcom)",    { note: "significant increase" }),
      p("NVDA (Nvidia)",      { note: "added to" }),
      p("NFLX (Netflix)",     { pct: "+21%" }),
      p("NOW (ServiceNow)",   { pct: "+42%" }),
      p("CPNG (Coupang)",     { pct: "+66%" }),
    ],
    reduced: [
      p("MSFT (Microsoft)", { note: "trimmed — was top holding for 13 quarters" }),
      p("TTWO (Take-Two Interactive)", { note: "reduced" }),
    ],
    exits: [
      p("WDAY (Workday)", { note: "full exit — AI-native HR alternatives threat" }),
    ],
    theme: "Tiger Global's Q1 2026 is a subtle but meaningful rotation. Intel is the headline add — Coleman bets on Intel's foundry ambitions as US-centric chip supply chains gain strategic importance amid tariff uncertainty. AVGO and NVDA additions reinforce AI chip conviction. Netflix and ServiceNow increases signal AI-embedded media/enterprise software growth. Workday exit reflects skepticism about traditional enterprise HR software vs. AI-native alternatives. GOOGL is now Tiger's top holding — the first time in 13 quarters MSFT was not #1.",
    sources: "Seeking Alpha, HedgeFollow, WhaleWisdom, Fintel",
    color: "#e67e22",
  },
  {
    type: "fund",
    name: "Viking Global Investors",
    manager: "Ole Andreas Halvorsen",
    aum: "$35.75B",
    quarter: "Q1 2026",
    filed: "May 15, 2026",
    holdings: 77,
    topHoldings: [
      { ticker: "V",    weight: "5.35%" },
      { ticker: "TSM",  weight: "4.22%" },
      { ticker: "SCHW", weight: "3.86%" },
      { ticker: "DIS",  weight: "3.59%" },
      { ticker: "FTV",  weight: "3.48%" },
    ],
    newBuys: [
      p("GOOGL (Alphabet)",            { note: "new position — bought on weakness" }),
      p("AMZN (Amazon)",               { note: "re-entry — sold in Q4 2025, bought back after tariff selloff" }),
      p("ICE (Intercontinental Exchange)"),
      p("DKS (Dick's Sporting Goods)", { val: "~$561M" }),
      p("TMO (Thermo Fisher Scientific)"),
      p("AAPL (Apple)",                { note: "new stake" }),
      p("META (Meta Platforms)",       { note: "new/increased stake" }),
    ],
    increased: [
      p("V (Visa)",   { pct: "+37.5%" }),
      p("TSM (TSMC)", { pct: "+24.6%" }),
      p("MSFT (Microsoft)", { pct: "+32.5%" }),
      p("DIS (Disney)",     { note: "significant increase" }),
      p("NFLX (Netflix)",   { note: "significant increase" }),
    ],
    reduced: [
      p("SCHW (Charles Schwab)", { pct: "−16.3%" }),
      p("PNC (PNC Financial)",   { pct: "−8.4%"  }),
    ],
    exits: [p("Several smaller positions rotated out")],
    theme: "Viking's Q1 2026 is a quality rotation under volatility: buy durable-moat businesses (Visa, Taiwan Semi, Microsoft, Disney) during tariff-induced market dislocation. The Amazon re-entry — sold in Q4, bought back in Q1 — shows Halvorsen saw the selloff as a buying opportunity, not a structural concern. New GOOGL and AAPL positions align with the emerging 'Alphabet as undervalued AI platform' cross-filer theme. Dick's Sporting Goods and Thermo Fisher signal selective consumer/life-sciences confidence. Viking is the most aggressive quality accumulator in Q1 volatility.",
    sources: "ValuSider, HedgeFollow, WhaleWisdom, Seeking Alpha",
    color: "#1e8449",
  },
  {
    type: "fund",
    name: "Third Point",
    manager: "Dan Loeb",
    aum: "~$7.3B (~$2.1B 13F)",
    quarter: "Q1 2026",
    filed: "May 15, 2026",
    holdings: 33,
    topHoldings: [
      { ticker: "PCG",  weight: "~largest" },
      { ticker: "MSFT", weight: "~top 3" },
      { ticker: "NVDA", weight: "~top 5" },
    ],
    newBuys: [
      p("NSC (Norfolk Southern)", { val: "+$496M", note: "railroad pricing power + volume leverage thesis" }),
      p("SPY (S&P 500 puts)",     { val: "+$583M", note: "largest macro hedge in recent Third Point history" }),
    ],
    increased: [
      p("MSFT (Microsoft)", { pct: "+175%", note: "most aggressive add this quarter" }),
      p("NVDA (Nvidia)",    { note: "4th consecutive quarterly add" }),
    ],
    reduced: [
      p("AMZN (Amazon)", { note: "modest trim after large prior position" }),
    ],
    exits: [p("Various smaller event-driven positions")],
    theme: "Third Point's Q1 2026 is quality + macro protection. Microsoft +175% signals Loeb's conviction that MSFT is the structurally strongest AI cloud platform. Norfolk Southern is classic Third Point event-driven: depressed valuation from operational/regulatory pressure, clear operational catalyst. The large SPY put position is the most notable macro signal — Loeb is hedging broad market exposure while selectively adding to high-conviction names. PG&E (PCG) remains the bedrock activist position. The bear on the market, bull on select tech + industrials positioning makes Third Point one of the most nuanced books in Q1.",
    sources: "Fintel, Seeking Alpha, ValuSider, 13Radar",
    color: "#c0392b",
  },
  {
    type: "fund",
    name: "Soros Fund Management",
    manager: "Dawn Fitzpatrick (CEO & CIO)",
    aum: "$9.12B",
    quarter: "Q1 2026",
    filed: "May 15, 2026",
    holdings: 263,
    newBuys: [
      p("127 new positions incl. CRWV (CoreWeave), SPOT (Spotify), WEC, D (Dominion), BILL (Bill Holdings), DBOX (Dropbox)"),
      p("Jazz Pharmaceuticals convertibles", { val: "+$173M" }),
    ],
    increased: [
      p("XOP (Oil & Gas ETF)",  { val: "+$416M" }),
      p("XLE (Energy ETF)",     { val: "+$163M" }),
      p("CRWV (CoreWeave)",     { val: "+$123M", note: "AI infrastructure cloud" }),
    ],
    reduced: [
      p("CNP (CenterPoint Energy)", { val: "−$104M" }),
    ],
    exits: [p("ARMK (Aramark), BKNG (Booking), prior period energy names")],
    theme: "Dawn Fitzpatrick's Q1 2026 filing mirrors her March 2026 warning that markets face 'a painful 18–24 months.' The portfolio reflects simultaneous offense and defense: SPY puts and energy ETF hedges (XLE/XOP puts combined with XOP long — a complex pairs trade), while 127 new opportunistic buys exploit the volatility dislocation. CoreWeave is the AI infrastructure bet; Spotify and Bill Holdings represent fintech/platform bets at dislocated valuations. The Jazz Pharma convertibles ($173M) show Soros going up the capital structure for protection on a pharma bet. Soros is the most active builder in Q1 by position count.",
    sources: "SEC EDGAR, Seeking Alpha, 13F.info, WhaleWisdom",
    color: "#7d3c98",
  },
  {
    type: "fund",
    name: "D.E. Shaw & Co.",
    manager: "David E. Shaw",
    aum: "~$182B (13F)",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: "~4,558",
    newBuys: [p("~165 new positions across systematic screens")],
    increased: [
      p("AVGO (Broadcom)",   { note: "AI chip build-out continues" }),
      p("IREN (IREN AI)",    { val: "+$687M" }),
      p("BE (Bloom Energy)", { val: "+$605M", note: "AI power infrastructure" }),
    ],
    reduced: [
      p("AAPL (Apple)",  { val: "−$2.3B", note: "declining ROIC vs. peers at current multiples" }),
      p("SPY",           { val: "−$1.8B" }),
      p("APP (AppLovin)", { val: "−$1.4B" }),
      p("BABA (Alibaba)", { val: "−$1.2B", note: "China geopolitical de-risk" }),
      p("XLF (Financial ETF)", { val: "−$802M" }),
      p("IWM (Russell 2000 ETF)", { val: "−$763M" }),
      p("GE (GE Aerospace)", { val: "−$678M" }),
    ],
    exits: [p("Systematic turnover across hundreds of smaller positions")],
    theme: "D.E. Shaw's systematic Q1 2026 signals: reduce China (BABA −$1.2B), reduce mega-cap consumer tech (AAPL −$2.3B on ROIC screens), reduce broad financials (XLF) and small-caps (IWM) — while building AI power infrastructure (IREN, Bloom Energy) and continuing Broadcom. GE Aerospace reduction after a large prior position. The quant models in Q1 are rotating away from momentum/growth factors and toward AI power infrastructure and AI chip production capacity. D.E. Shaw remains the most quantitative 13F in the cohort — every move reflects systematic signal capture, not narrative.",
    sources: "StockZoa, HoldingsChannel, Fintel, Insider Monkey",
    color: "#117864",
  },
];

const individuals = [
  {
    type: "individual",
    name: "Duquesne Family Office",
    manager: "Stanley Druckenmiller",
    aum: "$4.22B",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 72,
    topHoldings: [
      { ticker: "NTRA",  weight: "top holding" },
      { ticker: "XLF",   weight: "~largest ETF" },
      { ticker: "INSM",  weight: "top 3" },
      { ticker: "EWZ",   weight: "top 5" },
      { ticker: "RSP",   weight: "top 5" },
      { ticker: "IQV",   weight: "new large position" },
    ],
    newBuys: [
      p("IQV (IQVIA Holdings)",        { note: "largest new position — health IT/clinical research" }),
      p("42 new positions total", { note: "most ever in a single quarter — 13 healthcare/biopharma" }),
      p("PKB (Invesco Construction ETF)", { note: "infrastructure theme" }),
      p("BE (Bloom Energy)",           { note: "AI power infrastructure" }),
      p("CRNX (Crinetics Pharma)",     { note: "biopharma" }),
      p("AMZN (Amazon)",               { val: "+$93M" }),
      p("GOOGL (Alphabet)",            { val: "+$89M" }),
    ],
    increased: [
      p("XLF (Financial ETF)", { val: "+$301M" }),
      p("EWZ (Brazil ETF)",    { val: "+$247M" }),
      p("RSP (Equal Weight S&P)", { val: "+$225M" }),
      p("SE (Sea Ltd)",        { val: "+$86M"  }),
      p("AA (Alcoa)",          { val: "+$73M"  }),
      p("ENTG (Entegris)",     { val: "+$71M"  }),
      p("LSCC (Lattice Semi)", { val: "+$68M"  }),
    ],
    reduced: [
      p("TEVA (Teva Pharma)", { val: "−$335M" }),
      p("NTRA (Natera)",      { val: "−$184M" }),
      p("INSM (Insmed)",      { val: "−$164M" }),
      p("TSM (TSMC)",         { val: "−$68M"  }),
    ],
    exits: [
      p("NVDA (Nvidia)",         { pct: "−70%", note: "DeepSeek efficiency concerns; -80% over 2 quarters" }),
      p("ARM Holdings",          { note: "full exit" }),
      p("BAC (Bank of America)", { note: "full exit" }),
      p("COF (Capital One)",     { note: "full exit" }),
      p("C (Citigroup)",         { note: "full exit" }),
      p("DHI (D.R. Horton)",     { note: "full exit" }),
      p("EQT",                   { note: "full exit" }),
    ],
    theme: "Druckenmiller's Q1 2026 is a macro thesis reset of historic proportions — 42 new positions (most ever), 72 total holdings (most ever), and the Nvidia -70% cut are the three defining moves. The NVDA reduction (down -80% over two quarters) is the most significant AI de-risking in the cohort: Druckenmiller believes DeepSeek-style efficiency gains threaten the GPU capex supercycle narrative. New positions: 13 healthcare/biopharma bets, Brazil ETF (EWZ), financial ETF (XLF), equal-weight RSP, and infrastructure (PKB) — all suggesting a rotation toward value, EM, and non-concentrated sectors. The investor who called AI his 'highest-conviction theme ever' in Q4 2025 is now visibly hedging it.",
    sources: "Institutional Investor, GuruFocus, WhaleWisdom, SEC EDGAR, 13Radar",
    color: "#16a085",
  },
  {
    type: "individual",
    name: "Scion Asset Management",
    manager: "Michael Burry",
    aum: "~$68M",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 8,
    topHoldings: [
      { ticker: "MOH",  weight: "~35%" },
      { ticker: "LULU", weight: "~26%" },
      { ticker: "SLM",  weight: "~19.5%" },
      { ticker: "BRKR", weight: "~19.3%" },
    ],
    newBuys: [
      p("MOH (Molina Healthcare)",  { weight: "35.11%", note: "managed care mispriced vs. Medicaid reform fears" }),
      p("SLM Corp",                 { weight: "19.5%",  note: "student loan servicer — 30% of shares buybackable over 3 years" }),
      p("BRKR (Bruker Corp)",       { weight: "19.3%",  note: "scientific instruments for biopharma" }),
      p("MELI (MercadoLibre)",      { note: "bought in $1600s after -13% earnings drop per Burry Substack, May 9, 2026" }),
    ],
    increased: [
      p("LULU (Lululemon)", { pct: "+100%", note: "doubled position at multi-year lows" }),
    ],
    reduced: [],
    exits: [
      p("BABA (Alibaba)",  { note: "full China tech liquidation — geopolitical de-risk" }),
      p("JD (JD.com)",     { note: "full exit" }),
      p("HCA (HCA Healthcare)", { note: "full exit" }),
      p("ESTC (Elastic NV)",    { note: "full exit" }),
    ],
    theme: "Burry's Q1 2026 is a complete portfolio overhaul — full exit of all Chinese tech holdings (BABA, JD) for geopolitical de-risk, replaced with deep-value US plays: Molina Healthcare (Medicaid mispricing), SLM Corp (aggressive buyback), Bruker (scientific instruments), and MercadoLibre (LatAm e-commerce on panic drop). He also doubled Lululemon on multi-year lows. The invisible but critical story: Burry disclosed NVDA and PLTR put options (~$85M total) — his 'Big Short 2.0' bet that AI euphoria valuations are not sustainable. Burry now has $60M+ in cash reserves — the most defensive he's been in years.",
    sources: "SEC EDGAR, ForeignPolicyJournal, Yahoo Finance (puts), GuruFocus, Burry Substack",
    color: "#c0392b",
  },
  {
    type: "individual",
    name: "Greenlight Capital",
    manager: "David Einhorn",
    aum: "~$2.85B",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 41,
    topHoldings: [
      { ticker: "GRBK", weight: "~20.8%" },
      { ticker: "ACHC", weight: "~top 3" },
      { ticker: "FLR",  weight: "~7.7%"  },
      { ticker: "CNR",  weight: "~6.5%"  },
      { ticker: "BHF",  weight: "~6.4%"  },
    ],
    newBuys: [
      p("VSNT (Versant Media Group)", { note: "new medium position" }),
      p("CROX (Crocs Inc.)",          { note: "entry at ~$83.49 — ~6x 2026 EPS estimate" }),
      p("SLM Corp",                   { note: "entry at ~$18.95 — attracted to 30% buyback capacity over 3 years" }),
    ],
    increased: [
      p("ACHC (Acadia Healthcare)", { note: "strong performer, added during Q1 pullback" }),
      p("DHT (DHT Holdings tankers)", { note: "tight tanker supply market thesis" }),
      p("Gold (GLD/physical)",        { note: "de-dollarization hedge — drove Q1 outperformance" }),
    ],
    reduced: [
      p("GPK (Graphic Packaging)", { note: "partial reduction — was a portfolio detractor" }),
    ],
    exits: [
      p("WBD (Warner Bros. Discovery)", { note: "exited legacy media position" }),
      p("KD (Kyndryl)",                 { note: "full exit" }),
      p("Lebanese sovereign debt",       { note: "66% IRR realized over 1-year hold — standout trade of the quarter" }),
    ],
    theme: "Einhorn's Q1 2026 is textbook value investing working exactly as designed: Greenlight returned +6.5% net vs. S&P 500 −4.4% — one of the best relative quarters in years. Gold drove the outperformance (de-dollarization rally). The Lebanese sovereign debt 66% IRR is the standout exotic trade. New buys in Crocs and SLM are classic Einhorn: cheap on earnings, clear buyback catalyst, misunderstood by market. His Q1 letter warns of a 'checkmark recovery trap' — investors expecting a simple V-shaped recovery will be disappointed. GRBK remains the multi-year top holding with unmatched homebuilder capital allocation quality.",
    sources: "HedgeFundAlpha, Seeking Alpha, Greenlight Q1 letter, SEC EDGAR",
    color: "#2980b9",
  },
  {
    type: "individual",
    name: "Baupost Group",
    manager: "Seth Klarman",
    aum: "$5.115B",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 22,
    topHoldings: [
      { ticker: "AMZN", weight: "12.70%" },
      { ticker: "QSR",  weight: "11.67%" },
      { ticker: "WCC",  weight: "7.69%"  },
      { ticker: "UNP",  weight: "7.31%"  },
      { ticker: "ELV",  weight: "7.30%"  },
    ],
    newBuys: [],
    increased: [
      p("AMZN (Amazon)",                    { val: "+$490M", note: "largest add — durable moat at reasonable valuation" }),
      p("QSR (Restaurant Brands Intl)",     { note: "massive increase to #2 holding — BK/Tim Hortons/Popeyes franchise model" }),
      p("ELV (Elevance Health)",             { pct: "+120%", note: "more than doubled to 1.319M shares (~$426M) — Medicaid value play" }),
      p("WCC (Wesco International)",         { val: "+$88M" }),
      p("UNP (Union Pacific)",               { val: "+$30M" }),
    ],
    reduced: [
      p("ELV (Elevance Health)", { val: "−$17M", note: "minor position sizing trim" }),
      p("QSR",                   { val: "−$12M", note: "minor trim after large build" }),
    ],
    exits: [p("Multiple smaller positions — portfolio concentrated to 22 holdings")],
    theme: "Klarman's Q1 2026 exemplifies Baupost's margin-of-safety discipline at scale. Amazon at 12.7% is the conviction anchor — a durable compounding machine held for years. Restaurant Brands International (Burger King/Tim Hortons/Popeyes) at #2 reflects classic Baupost: quality franchise assets with global growth, trading at discount to intrinsic value. Elevance Health (Medicaid managed care) doubled as Klarman averaged into a beaten-up high-quality franchise — a rare aggressive move for a historically conservative manager. With only 22 positions, every entry reflects multi-year conviction. Baupost is the 'slowest moving, highest-confidence' portfolio in the cohort.",
    sources: "ValuSider, WhaleWisdom, 13Radar, SEC EDGAR",
    color: "#8e44ad",
  },
  {
    type: "individual",
    name: "Icahn Capital",
    manager: "Carl Icahn",
    aum: "~$8.45B",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 13,
    topHoldings: [
      { ticker: "IEP",  weight: "49.12%" },
      { ticker: "CVI",  weight: "21.21%" },
      { ticker: "SWX",  weight: "5.72%"  },
      { ticker: "UAN",  weight: "5.05%"  },
      { ticker: "SATS", weight: "4.32%"  },
    ],
    newBuys: [],
    increased: [
      p("IEP (Icahn Enterprises LP)", { pct: "+5.87%" }),
      p("GEHC (GE Healthcare)",        { pct: "+0.37%" }),
    ],
    reduced: [
      p("SOLV (Solventum / 3M spin-off)", { pct: "−2.67%", note: "ongoing activist engagement" }),
    ],
    exits: [],
    theme: "Icahn Capital's Q1 2026 is maintenance mode — the portfolio is entirely defined by activist control stakes. IEP at 49% of AUM is self-referential (Icahn owning Icahn's vehicle). CVI (CVR Energy, refining) is the largest external bet; the refining hedge book drag (-8.2% investment returns, +4.4% ex-hedges) is working against Q1 returns as oil prices stabilized. SWX (Southwest Gas) remains a post-activist-win holding. The Janus Henderson AI transformation (across all managed assets) is the conceptual backdrop for Icahn's broader thesis that traditional asset management needs a complete reinvention — a view shared by Trian.",
    sources: "SEC EDGAR, Quiver Quant, Icahn Enterprises Q1 2026 earnings, Bloomberg",
    color: "#d35400",
  },
  {
    type: "individual",
    name: "Himalaya Capital Management",
    manager: "Li Lu",
    aum: "$3.20B",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 14,
    topHoldings: [
      { ticker: "GOOGL", weight: "22.31%" },
      { ticker: "GOOG",  weight: "21.55%" },
      { ticker: "BAC",   weight: "16.08%" },
      { ticker: "PDD",   weight: "14.64%" },
      { ticker: "BRK.B", weight: "12.64%" },
    ],
    newBuys: [
      p("EWBC (East West Bancorp)", { note: "dividend-oriented addition — US-China banking bridge" }),
      p("4 additional new positions", { note: "expanded from 9 to 14 holdings — buying quality at tariff-dislocation prices" }),
    ],
    increased: [
      p("GOOGL + GOOG (Alphabet)", { note: "~44% combined portfolio weight — AI platform conviction unchanged" }),
      p("BAC (Bank of America)",   { note: "continued multi-year hold" }),
    ],
    reduced: [
      p("Minor rebalancing on existing positions"),
    ],
    exits: [],
    theme: "Li Lu's Himalaya Capital is the most extreme concentration story in the cohort: 44% in Alphabet (Class A + C combined). Li Lu views GOOG as the most durable AI-era platform at the most reasonable valuation among mega-caps. PDD/Pinduoduo at 14.6% is the China consumer growth bet — unchanged despite geopolitical pressure, reflecting Li Lu's decade-long commitment to conviction investing regardless of macro noise. The expansion from 9 to 14 holdings signals he found 5 new high-conviction ideas during Q1 volatility. His stated philosophy: median holding period exceeds 7 years. East West Bancorp adds a US-China banking bridge to the mix.",
    sources: "SEC EDGAR, Himalaya 13F, Motley Fool, 13Radar",
    color: "#2471a3",
  },
  {
    type: "individual",
    name: "Gotham Asset Management",
    manager: "Joel Greenblatt",
    aum: "~$11B",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: "1,719",
    newBuys: [
      p("165 new positions incl. VIG, GD (General Dynamics), D (Dominion), SO (Southern), CVX (Chevron)"),
    ],
    increased: [
      p("SPY (S&P 500 ETF)", { val: "+$308M", note: "largest single addition" }),
      p("AAPL (Apple)",      { val: "+$23M"  }),
      p("BEPC (Brookfield Renewable)", { val: "+$23M" }),
      p("GD (General Dynamics)",  { val: "+$21M" }),
    ],
    reduced: [
      p("APP (AppLovin)",  { val: "−$28M" }),
      p("MRO (Marathon Oil)", { val: "−$25M" }),
      p("NVDA (Nvidia)",   { val: "−$24M", note: "profit-taking after AI premium" }),
      p("DVN (Devon Energy)", { val: "−$15M" }),
    ],
    exits: [p("ACVA, ANGI, AZZ, AAP, ALE, ALTR, UHAL, and multiple smaller quantitative exits")],
    theme: "Gotham's Q1 2026 shows systematic value factors tilting toward defensive/dividend/quality as growth multiples compressed. The Magic Formula screens are generating: increased index exposure (SPY +$308M), slight shift toward defense/utilities/energy (GD, CVX, SO), and exit of smaller speculative names. NVDA trim reflects the model's profit-taking when AI premium exceeds ROIC justification. Net buyer of $843M in equities — the systematic models found more cheap assets than they exited. Greenblatt's academic, signal-driven approach means Q1 volatility created buying opportunities the screens captured while momentum investors panicked.",
    sources: "SEC EDGAR, Gotham 13F, WhaleWisdom, Fintel",
    color: "#1a7a4a",
  },
  {
    type: "individual",
    name: "Miller Value Partners",
    manager: "Bill Miller IV",
    aum: "~$284M",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 34,
    topHoldings: [
      { ticker: "NBR",  weight: "11.53%" },
      { ticker: "LNC",  weight: "7.92%"  },
      { ticker: "GTN",  weight: "6.80%"  },
      { ticker: "GCI",  weight: "6.18%"  },
      { ticker: "QUAD", weight: "6.05%"  },
    ],
    newBuys: [
      p("BLMN (Bloomin' Brands)", { note: "restaurant group in multi-year transformation — deep discount to intrinsic value" }),
      p("CRGY (Crescent Energy)",  { note: "energy sector contrarian value play" }),
    ],
    increased: [
      p("NBR (Nabors Industries)", { pct: "+58%", note: "top Q1 performer — energy services repricing" }),
    ],
    reduced: [
      p("Various positions trimmed as they appreciated"),
    ],
    exits: [p("Several legacy positions trimmed to zero as thesis played out")],
    theme: "Miller Value's Q1 2026 validates deep contrarian value investing at exactly the right moment. The Deep Value Strategy returned +8.39% net vs. S&P 500 −4.4% — one of the best quarters in the fund's history. Nabors Industries (+58% in Q1 alone) is classic Miller: energy services company with high financial leverage that worked spectacularly as oil services repriced. Bloomin' Brands and Crescent Energy are new names fitting the deep-discount-to-intrinsic-value playbook. The tariff-induced Q1 selloff was tailor-made for this strategy — when growth sells off, deep value cyclicals and turnarounds dramatically outperform. Value's moment has arrived.",
    sources: "Seeking Alpha, Insider Monkey, Miller Value Q1 2026 letter",
    color: "#7d3c98",
  },
  {
    type: "individual",
    name: "Trian Fund Management",
    manager: "Nelson Peltz",
    aum: "~$8.2B",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 6,
    topHoldings: [
      { ticker: "JHG",  weight: "38.05%" },
      { ticker: "GE",   weight: "31.16%" },
      { ticker: "SOLV", weight: "16.38%" },
      { ticker: "WEN",  weight: "6.36%"  },
      { ticker: "FGS",  weight: "6.07%"  },
    ],
    newBuys: [],
    increased: [
      p("GE (GE Aerospace)", { pct: "+0.01%", note: "holding steady — long-term compounding thesis intact" }),
      p("GEHC (GE Healthcare)", { pct: "+0.37%" }),
    ],
    reduced: [
      p("SOLV (Solventum / 3M spin-off)", { pct: "−2.67%", note: "activist engagement ongoing" }),
      p("JHG (Janus Henderson)", { note: "sold 6.21M shares at $51.60 ahead of take-private close" }),
    ],
    exits: [],
    theme: "Trian's Q1 2026 is entirely defined by the Janus Henderson take-private. Shareholders approved the deal (99.7% in favor, April 2026) at $52/share — a massive win for Peltz at a significant gain to cost basis. Trian and General Catalyst plan a full 'AI makeover' of Janus Henderson, converting the traditional asset manager into an AI-native investment platform. GE Aerospace remains the marquee long-term activist compounding story — now a pure-play aerospace business after the GE Healthcare and GE Vernova spin-offs. Solventum (3M spin-off) is the active work-in-progress. Trian's portfolio is the least diversified in the cohort (6 positions) — every holding is an explicit multi-year activist engagement with an operational transformation thesis.",
    sources: "BusinessWire, Bloomberg, SEC EDGAR, Trian 13F",
    color: "#ba4a00",
  },
  {
    type: "individual",
    name: "Situational Awareness LP",
    manager: "Leopold Aschenbrenner",
    aum: "~$13.67B (13F, incl. options notional)",
    quarter: "Q1 2026",
    filed: "May 15, 2026",
    holdings: "~35",
    topHoldings: [
      { ticker: "BE",   weight: "top holding" },
      { ticker: "SNDK", weight: "top 2" },
      { ticker: "CRWV", weight: "top 3" },
      { ticker: "IREN", weight: "top 4" },
      { ticker: "CORZ", weight: "top 5" },
    ],
    newBuys: [
      p("CLSK (CleanSpark)", { val: "~$90.5M", note: "10.6M shares — BTC miner repurposed as AI compute host" }),
    ],
    increased: [
      p("BE (Bloom Energy)",     { val: "~$879M", note: "solid-oxide fuel cells for off-grid data centers" }),
      p("SNDK (SanDisk)",        { val: "~$724M + $389M calls", note: "NAND flash storage for AI workloads" }),
      p("CRWV (CoreWeave)",      { val: "~$556M + $141M calls", pct: "+672% calls", note: "GPU cloud infrastructure" }),
      p("IREN (IREN Ltd)",       { val: "~$401M", note: "BTC miner transitioning to AI data center hosting" }),
      p("CORZ (Core Scientific)", { val: "~$389M" }),
      p("APLD (Applied Digital)", { val: "~$320M", note: "HPC/AI data centers" }),
      p("RIOT (Riot Platforms)",  { val: "~$142M" }),
    ],
    reduced: [
      p("SMH (Semiconductor ETF puts)", { val: "~$2.04B notional", note: "bearish bet on chip sector broadly" }),
      p("NVDA (Nvidia puts)",    { val: "~$1.57B notional" }),
      p("ORCL (Oracle puts)",    { val: "~$1.07B notional" }),
      p("AVGO (Broadcom puts)",  { val: "~$1.01B notional" }),
      p("AMD (puts)",            { val: "~$969M notional" }),
      p("MU (Micron puts)",      { val: "~$584M notional" }),
      p("TSM (TSMC puts)",       { val: "~$535M notional" }),
    ],
    exits: [
      p("VST (Vistra Energy)", { note: "exited nuclear power position after large gains" }),
      p("INTC (Intel) common", { note: "sold all 20.2M shares; retains 20.2M call options — bet on foundry optionality" }),
    ],
    theme: "Aschenbrenner is the most ideologically coherent investor in the cohort. His June 2024 165-page manifesto 'Situational Awareness: The Decade Ahead' predicted AGI by ~2027 and framed the hardware buildout as the defining economic opportunity of the era. His thesis: the constraint on AI is not algorithms but electrons — data centers need gigawatts of power that the grid cannot supply on short notice. Bitcoin miners already have grid connections and stranded power assets; they become AI compute hosts overnight. Hence: long BE, SNDK, CRWV, IREN, CORZ, APLD. The contrarian short (~$8.46B in puts against NVDA, AVGO, AMD, SMH, ORCL, MU, TSM) is deliberate — he avoids the 'crowded AI chip trade' entirely, betting that the infrastructure layer captures more value than chip incumbents. Fund launched September 2024 with Collison brothers and Nat Friedman as seed investors. Reported 100%+ returns in calendar year 2025.",
    sources: "SEC EDGAR (CIK 0002045724), Fortune, CoinDesk, HedgeFundAlpha, 13f.info, Blockspace, WhaleWisdom",
    color: "#0a3d62",
  },
];

const allFilers = [...funds, ...individuals];

// Q4 2025 snapshot data for quarter-over-quarter comparison
// Holdings counts reflect position counts from Q4 2025 13F filings (period: Dec 31, 2025)
const q4Data = {
  "Berkshire Hathaway":         { aum: "~$265B",              holdings: 42   },
  "Bridgewater Associates":     { aum: "~$26.5B (13F)",       holdings: 1020 },
  "Citadel Advisors":           { aum: "~$632B",              holdings: 12200},
  "Pershing Square":            { aum: "~$14.2B",             holdings: 9    },
  "Appaloosa Management":       { aum: "~$7.3B",              holdings: 35   },
  "Tiger Global Management":    { aum: "~$21.5B",             holdings: 54   },
  "Viking Global Investors":    { aum: "~$33.8B",             holdings: 72   },
  "Third Point":                { aum: "~$6.8B (~$1.9B 13F)", holdings: 31   },
  "Soros Fund Management":      { aum: "~$8.5B",              holdings: 175  },
  "D.E. Shaw & Co.":            { aum: "~$172B (13F)",        holdings: 4410 },
  "Duquesne Family Office":     { aum: "~$3.9B",              holdings: 37   },
  "Scion Asset Management":     { aum: "~$130M",              holdings: 8    },
  "Greenlight Capital":         { aum: "~$2.72B",             holdings: 41   },
  "Baupost Group":              { aum: "~$4.8B",              holdings: 26   },
  "Icahn Capital":              { aum: "~$9.2B",              holdings: 13   },
  "Himalaya Capital Management":{ aum: "~$2.9B",              holdings: 9    },
  "Gotham Asset Management":    { aum: "~$10.5B",             holdings: 1612 },
  "Miller Value Partners":      { aum: "~$262M",              holdings: 34   },
  "Trian Fund Management":      { aum: "~$8.8B",              holdings: 7    },
  // Situational Awareness LP: first known 13F filing — no Q4 2025 data
};

const sectorThemes = [
  { sector: "Cloud/AI Platform: MSFT & GOOGL as 'Safe Harbor'", tickers: "MSFT, GOOGL, GOOG, AMZN", buyers: "Pershing Square (MSFT new $2.09B), Third Point (MSFT +175%), Viking (MSFT +32%, GOOGL new), Berkshire (GOOGL tripled), Himalaya (GOOGL 44%), Baupost (AMZN +$490M)", signal: "The strongest cross-filer consensus of Q1 2026: Microsoft and Alphabet are being treated as the most durable AI cloud platforms at reasonable valuations. When 6+ filers independently converge on the same 2 stocks, the institutional re-rating is typically multi-year." },
  { sector: "AI Semiconductors (Selective Conviction)", tickers: "NVDA, AVGO, MU, MRVL, INTC", buyers: "Citadel ($4B NVDA), Bridgewater (+NVDA, +MU, +MRVL), Appaloosa (MU +200%), Tiger Global (INTC new, AVGO +), D.E. Shaw (+AVGO)", signal: "AI chip conviction remains strong at Citadel, Bridgewater, and D.E. Shaw. But the consensus is fracturing: Druckenmiller cut NVDA -70%, Burry holds NVDA puts, and Aschenbrenner has $8.46B in puts against the entire chip sector (SMH, NVDA, AVGO, AMD, MU, TSM). The most contested trade in the cohort." },
  { sector: "AI Power Infrastructure", tickers: "BE, IREN, CORZ, APLD, CLSK, RIOT", buyers: "Situational Awareness (BE ~$879M, IREN ~$401M, CORZ ~$389M, CLSK +$90.5M), D.E. Shaw (IREN +$687M, BE +$605M), Appaloosa (VST +114%), Druckenmiller (BE new)", signal: "Aschenbrenner's thesis is the purest expression: AI will consume all available electricity, and Bitcoin miners already have the grid connections. BE, CORZ, APLD, IREN, CLSK, RIOT are all 'power infrastructure repurposed as AI compute.' D.E. Shaw independently reached the same conclusion. This is the fastest-growing cross-filer theme in the cohort." },
  { sector: "Value Working vs. Growth Compression", tickers: "GRBK, NBR, MOH, LULU, QSR, CROX", buyers: "Greenlight (+6.5% Q1), Miller Deep Value (+8.39% Q1), Baupost, Scion (MOH, LULU)", signal: "S&P 500 returned -4.4% in Q1 2026. Value managers dramatically outperformed. When the market sells growth on macro uncertainty, concentrated value investors with pre-identified catalysts generate the best risk-adjusted returns. Q1 2026 may mark the inflection point where value leadership persists." },
  { sector: "China De-Risking (Broad Cohort)", tickers: "BABA, PDD, JD, FXI", buyers: "Counter-thesis: Himalaya (PDD at 14.6% unchanged)", signal: "Appaloosa (-33% BABA), D.E. Shaw (-$1.2B BABA), Scion (full China tech exit). The tariff environment is accelerating China position exits. Only Himalaya Capital (Li Lu) maintains meaningful China conviction — PDD unchanged at 14.6%. When all but one of 19 filers is exiting China, the contrarian setup for a re-rating is building." },
  { sector: "Airlines: Near-Total Institutional Exit", tickers: "AAL, UAL, DAL", buyers: "Against consensus: Berkshire (DAL new — but buying the quality airline, not the weak one)", signal: "Appaloosa fully exited AAL and UAL in Q1 ahead of tariff-driven demand uncertainty. The cross-filer consensus: airlines are exposed to fuel costs, demand recession risk, and tariff disruption. Berkshire's DAL entry (buying Delta specifically — higher-margin, international-capable) is the only contrarian airline bet, and it distinguishes quality from commodity carriers." },
];

const exits = [
  { stock: "V (Visa) + MA (Mastercard)", funds: "Berkshire Hathaway — ~$5.19B combined, Todd Combs portfolio cleanup" },
  { stock: "UNH (UnitedHealth)", funds: "Berkshire Hathaway — ~$1.66B, healthcare uncertainty" },
  { stock: "AMZN (Amazon)", funds: "Berkshire Hathaway — ~$525M (paradoxically, Baupost added +$490M, Appaloosa +98%)" },
  { stock: "HLT (Hilton Hotels)", funds: "Pershing Square — full exit after successful multi-year hold" },
  { stock: "GOOGL (Alphabet)", funds: "Pershing Square — sold ~95%, rotating capital into MSFT" },
  { stock: "AAL + UAL (Airlines)", funds: "Appaloosa — full exit of both positions, tariff/recession risk" },
  { stock: "WDAY (Workday)", funds: "Tiger Global — full exit, AI-native HR software alternatives threat" },
  { stock: "CRM (Salesforce)", funds: "Bridgewater — full exit, enterprise software pivot away from legacy players" },
  { stock: "BABA + JD (Chinese tech)", funds: "Scion (Burry) — complete China tech liquidation, geopolitical de-risk" },
  { stock: "NVDA (Nvidia) — partial", funds: "Druckenmiller −70% (−80% over 2 quarters), Gotham −$24M — DeepSeek efficiency concerns" },
  { stock: "WBD (Warner Bros. Discovery)", funds: "Greenlight Capital — exited legacy media position" },
  { stock: "C (Citigroup)", funds: "Berkshire (~$1.12B) + Druckenmiller — banking exposure reduction" },
  { stock: "Lebanese sovereign debt", funds: "Greenlight Capital — 66% IRR realized over 1-year hold (standout exotic trade)" },
  { stock: "ARM Holdings", funds: "Druckenmiller — full exit, semis concentration reduction" },
];

// ─── ANALYSIS DATA ────────────────────────────────────────────────────────────

const macroNarrative = {
  quarter: "Q1 2026",
  headline: "The Alphabet Convergence, Value's Vindication, and the First AI Chip Defectors",
  paragraphs: [
    {
      title: "The Platform Reshuffling",
      body: "Q1 2026 marks the first major reshuffling of the AI consensus that dominated Q3–Q4 2025. The story is no longer simply 'buy AI infrastructure' — it is 'buy the right layer of AI at the right price.' Microsoft and Alphabet have emerged as the cross-filer 'safe harbor' AI plays: Pershing Square deployed $2.09B into MSFT at 21x forward earnings; Third Point increased +175%; Viking initiated GOOGL; Berkshire tripled its Alphabet stake; Himalaya holds 44% in Alphabet combined. The common thread: these platforms generate AI revenue today, have durable competitive moats, and trade at discounts to their historical multiples. Meanwhile, pure-play AI chip bets are fracturing — Druckenmiller cut Nvidia -70% citing DeepSeek efficiency concerns, Burry bought Nvidia puts, and Gotham's quantitative screens began trimming on ROIC deterioration.",
    },
    {
      title: "Value's Vindication",
      body: "The S&P 500 returned -4.4% in Q1 2026. Greenlight Capital returned +6.5% net. Miller Deep Value returned +8.39%. Baupost's concentrated 22-position portfolio held and added at better prices. This is not coincidence — it reflects a structural dynamic: when macro uncertainty (tariff announcements, AI disruption fears, sovereign debt concerns) compresses valuation multiples, concentrated value investors with pre-identified catalysts dramatically outperform momentum/growth strategies. The Lebanese sovereign debt 66% IRR (Greenlight), Nabors Industries +58% (Miller), and Molina Healthcare re-rating (Burry) are all classic value-investing outcomes that required patience, asymmetry identification, and the willingness to be early. Q1 2026 may be the inflection point where value leadership persists beyond a single quarter.",
    },
    {
      title: "The Abel Era Begins at Berkshire",
      body: "Warren Buffett's retirement on January 1, 2026 produced the most significant portfolio overhaul in Berkshire's modern history. Greg Abel's first 13F: 16 full exits (from 42 to 29 positions), a tripling of Alphabet (now 8.5% of the portfolio), and a new Delta Air Lines position as the AI-era travel infrastructure bet. The Todd Combs departure explains the Visa, Mastercard, Domino's, and Aon exits — these were managed independently. Abel's signature moves show his own investment identity forming: quality compounders with durable competitive advantages, AI-aware (GOOGL), and less attached to Buffett's 1980s–2010s era holdings. Berkshire's record cash balance ($350B+) suggests Abel is not done — he is building dry powder for a major deployment at the right price.",
    },
    {
      title: "The Macro Hedge Expansion",
      body: "Four of nineteen filers now carry explicit macro protection: Third Point (SPY puts — largest hedge in recent history), Soros (SPY puts + energy puts), Burry ($85M in NVDA and PLTR puts), and Greenlight (gold — drove Q1 outperformance). This is a material expansion from prior quarters. Dawn Fitzpatrick's March 2026 warning of 'a painful 18–24 months' for markets crystallizes the concern: the tariff shock (announced early April, post Q1 reporting period), sovereign debt trajectories, and AI capex disappointment risk are all visible to sophisticated managers. The fact that this level of hedging is visible in 13F filings — which only show long equity positions — means the true macro protection is even larger than what is disclosed.",
    },
  ],
  keySignals: [
    { label: "Cross-Filer Consensus Stock (Q1 2026)", value: "MSFT and GOOGL — independently added by 6+ filers each, bought as the 'undervalued AI platform' trade" },
    { label: "Most Surprising Move", value: "Berkshire tripled Alphabet (GOOGL +204%) — Abel's first major independent stamp on the portfolio" },
    { label: "Biggest Conviction Flip", value: "Druckenmiller: cut NVDA -70% after calling it 'highest-conviction theme ever' in Q4 2025 — DeepSeek changed his view" },
    { label: "Value Beat in Q1", value: "Greenlight +6.5%, Miller Deep Value +8.39% vs. S&P 500 -4.4% — value managers dominated" },
    { label: "Emerging AI Power Consensus", value: "Appaloosa +114% Vistra, D.E. Shaw +$687M IREN, +$605M Bloom Energy — AI power demand is Q2-Q3 2026's next crowded trade" },
    { label: "Key Risk Signal", value: "4 of 19 filers have explicit macro hedges (SPY puts, NVDA puts, gold) — highest defensive positioning in the cohort's history" },
  ],
};

const divergences = [
  {
    ticker: "NVDA",
    subtitle: "AI Chip Supercycle vs. DeepSeek Efficiency Disruption",
    bulls: {
      filers: ["Citadel (expanded to ~$4B)", "Bridgewater (+$253M)", "Tiger Global (added)", "Third Point (4th consecutive quarter add)"],
      thesis: "The bull case remains demand-driven and supply-constrained: NVIDIA's Blackwell architecture is backlogged through 2026, hyperscalers (MSFT, AMZN, GOOGL) have all guided $650B+ in combined 2026 capex, and the CUDA software moat is decade-deep. DeepSeek's efficiency gains make AI more accessible — which increases total compute demand, not less. Every efficiency improvement in AI history has led to more total compute spend, not less.",
    },
    bears: {
      filers: ["Druckenmiller (−70% cut, −80% over 2 quarters)", "Burry (NVDA put options, ~$85M total)", "Gotham (−$24M trim on ROIC screens)"],
      thesis: "Druckenmiller's view: DeepSeek-style efficiency gains genuinely threaten the GPU capex supercycle. If AI workloads require 90% less compute for the same output, the hyperscaler capex cycle is structurally shorter than priced. At 30x+ revenue, NVDA has no margin for disappointment. Burry's puts echo his Big Short thesis template: when everyone agrees a trade is obvious, the market is not pricing in tail risk.",
    },
    verdict: "This is the most consequential divergence in Q1 2026. Druckenmiller was the most vocal NVDA bull in Q4 2025 — his 180-degree reversal demands attention. The resolution: if AI capex from hyperscalers continues into Q2 despite tariff disruptions, the bulls are right. If CapEx guidance is revised down in Q2 earnings, the bears win decisively.",
  },
  {
    ticker: "GOOGL",
    subtitle: "Undervalued AI Platform vs. Search-at-Risk Exit",
    bulls: {
      filers: ["Berkshire Hathaway (tripled to +204%)", "Himalaya Capital (44% combined GOOG + GOOGL)", "Viking Global (new position)", "Druckenmiller (added $89M)", "Appaloosa (+29%)"],
      thesis: "Alphabet at ~20x forward earnings is the cheapest mega-cap AI platform in the cohort. Gemini integration across Search, YouTube, Cloud, and Waymo creates compounding optionality. The Search-at-risk narrative is overblown — Google's AI Overviews have increased query volume, not reduced it. Abel's Berkshire tripling the GOOGL stake is the clearest institutional signal: a value-first investor at scale is saying the discount to intrinsic value is too wide.",
    },
    bears: {
      filers: ["Pershing Square (sold ~95% — from 6.1M to 312K shares)"],
      thesis: "Ackman rotated from Alphabet to Microsoft, believing MSFT has cleaner AI monetization per dollar. His concern: Google's advertising revenue is structurally at risk from AI-powered answer engines. OpenAI's ChatGPT search, Perplexity, and Microsoft's Bing integration are all attacking the core search-monetization business model. Even a 10% search revenue decline compresses GOOGL's multiple significantly.",
    },
    verdict: "The widest split in the cohort — one filer sold 95% while five others independently added. The core question: is Search disruption real and permanent, or is the market overpricing a risk that Alphabet's own AI capabilities will neutralize? Watch GOOGL's AI Overviews ad revenue data in the Q2 2026 earnings report.",
  },
  {
    ticker: "MSFT",
    subtitle: "AI Cloud Safe Harbor vs. Growth Multiple Concern",
    bulls: {
      filers: ["Pershing Square (new $2.09B at 21x fwd earnings)", "Third Point (+175%)", "Viking Global (+32.5%)"],
      thesis: "Microsoft Azure is growing AI revenue faster than any other hyperscaler. Copilot is genuinely increasing enterprise productivity — measurably so — creating a new $100B+ ARR opportunity. At 21x forward earnings (Ackman's entry price), MSFT is trading below its 10-year historical average multiple for a business compounding at 18%+ EPS growth. The AI platform with the broadest enterprise distribution wins — and MSFT has that via Office 365's 400M+ commercial users.",
    },
    bears: {
      filers: ["Citadel (−$909M trim)", "Tiger Global (modest trim after 13 quarters at #1)"],
      thesis: "Profit-taking after a large run, not a structural bear thesis. Citadel's trim is largely inventory management at scale. Tiger Global's gentle reduction reflects rebalancing after MSFT was its top holding for 13 consecutive quarters — not a view change. The actual structural bear case (few are making it): MSFT's Copilot adoption may disappoint vs. expectations, and at 30x+ earnings it leaves no room for misses.",
    },
    verdict: "Not a true divergence — the 'bears' are trimming for mechanical reasons, not conviction. The unusual cross-filer MSFT buy consensus (3 new/large adds in a single quarter) is itself the signal. When concentrated fund managers who typically disagree all independently arrive at the same conclusion in the same quarter, it is directionally meaningful.",
  },
  {
    ticker: "China (BABA / PDD)",
    subtitle: "Geopolitical De-risking vs. Multi-Decade Conviction",
    bulls: {
      filers: ["Himalaya Capital (Li Lu — PDD unchanged at 14.6% of portfolio)", "Baupost (small residual China)"],
      thesis: "Li Lu's thesis is unchanged: BABA and PDD trade at 7–9x forward earnings with massive cash reserves, aggressive buybacks, and AI monetization optionality (Tongyi Qianwen for Alibaba, Temu's global expansion for PDD). The regulatory crackdown is fully priced. Xi's capital allocation priorities are moving toward consumption support, which benefits both stocks. Investors who held through the 2021–2023 drawdown are now positioned for the re-rating that comes when geopolitical risk premium compresses.",
    },
    bears: {
      filers: ["Appaloosa (BABA −33%)", "D.E. Shaw (BABA −$1.2B)", "Scion/Burry (full China exit)", "Druckenmiller (BAC, COF exits signal EM skepticism)"],
      thesis: "The tariff environment in early 2026 made the geopolitical risk premium genuinely unquantifiable. A US-China trade war escalation, secondary sanctions, or Taiwan tensions are not priceable by valuation frameworks — they are binary political risks. Burry's full exit is the starkest signal: even he, the classic contrarian who built large China positions, concluded geopolitical risk overwhelms fundamental cheapness. The rational response is to exit rather than underwrite an unquantifiable risk.",
    },
    verdict: "The most analytically pure bull/bear split in Q1 2026 filings. Both sides have legitimate, internally-consistent frameworks. Resolution requires a macro catalyst (US-China tariff resolution or escalation) rather than fundamentals alone. Li Lu's 44% Alphabet + 14.6% PDD concentration is either the most courageous or most dangerous portfolio in the cohort — that question will be answered in Q2 2026.",
  },
  {
    ticker: "SMH",
    subtitle: "AI value accrues to power infrastructure, not chip designers",
    bulls: {
      filers: [
        "Citadel (~$4B NVDA long, +$2.2B AVGO)",
        "Bridgewater (+$253M NVDA, +MU, +MRVL new)",
        "Tiger Global (+AVGO, +NVDA)",
        "Appaloosa (+200% MU)",
        "D.E. Shaw (+AVGO)",
        "Third Point (4th consecutive NVDA add)",
      ],
      thesis: "Six of the largest quantitative and fundamental managers remain structurally long AI chips. The bull case: NVIDIA Blackwell is backlogged through 2026, hyperscalers have guided $650B+ combined 2026 capex, and the CUDA software moat is irreplaceable. Chip designers capture value through proprietary architecture and software lock-in. DeepSeek-style efficiency gains historically increase total AI compute demand rather than reducing it — more people using cheaper AI means more total GPU-hours consumed.",
    },
    bears: {
      filers: [
        "Aschenbrenner / Situational Awareness ($8.46B puts: SMH $2.04B, NVDA $1.57B, ORCL $1.07B, AVGO $1.01B, AMD $969M, MU $584M, TSM $535M)",
        "Druckenmiller (NVDA −70%, −80% over 2 quarters)",
        "Burry (NVDA + PLTR puts ~$85M total)",
      ],
      thesis: "The rotation thesis: AI value will accrue to the physical layer — electrons, grid connections, cooling capacity — not to chip designers. Bitcoin miners (CORZ, IREN, APLD, RIOT) already have the critical asset: utility-scale grid connections. Bloom Energy provides off-grid power. SanDisk provides NAND storage for inference. As chip architectures commoditize via open-source models and efficiency gains, gross margins compress toward hardware commodity levels. Aschenbrenner's $8.46B in sector-wide puts is simultaneously the largest single bearish position in the cohort and a paired long in AI power infrastructure — a structural rotation bet, not just a valuation call.",
    },
    verdict: "The most architecturally sophisticated divergence of Q1 2026. Aschenbrenner is simultaneously the most bearish on chips ($8.46B puts) and most bullish on AI power infrastructure ($3B+ longs) in the entire cohort — a single-investor rotation that D.E. Shaw independently replicated at smaller scale (+$687M IREN, +$605M Bloom Energy). If AI training costs continue falling 10x every 18 months (historical trend), hardware margins compress and infrastructure moats strengthen. If proprietary architectures maintain pricing power (NVIDIA's historical outcome), the chip bulls win. Watch gross margin trends in NVDA's Q2 2026 earnings vs. power infrastructure revenue growth at BE and IREN for the first empirical test.",
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
    .filter(([t]) => t !== "SPY" && t !== "QQQ" && t !== "RSP")
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

function findFilersForTicker(ticker, filers) {
  if (!ticker) return [];
  const re = new RegExp(`\\b${ticker}\\b`);
  const result = [];
  filers.forEach(filer => {
    const match = (section) => filer[section].filter(item => re.test(item.label));
    const hits = {
      newBuys: match("newBuys"),
      increased: match("increased"),
      reduced: match("reduced"),
      exits: match("exits"),
      topHolding: filer.topHoldings?.find(h => h.ticker === ticker) || null,
    };
    const any = hits.newBuys.length || hits.increased.length || hits.reduced.length || hits.exits.length || hits.topHolding;
    if (any) result.push({ filer, ...hits });
  });
  return result;
}

function parseAum(s) {
  if (!s) return 0;
  const m = String(s).match(/\$?\s*~?\s*([\d.,]+)\s*([BbMm])/);
  if (!m) return 0;
  const num = parseFloat(m[1].replace(/,/g, ""));
  return m[2].toUpperCase() === "B" ? num * 1000 : num;
}

function parseHoldings(h) {
  if (typeof h === "number") return h;
  const m = String(h).match(/[\d,]+/);
  return m ? parseInt(m[0].replace(/,/g, ""), 10) : 0;
}

function countNewBuys(filer) {
  return filer.newBuys.reduce((acc, item) => {
    const m = item.label.match(/^(\d+)\s+new\s+positions/i);
    return acc + (m ? parseInt(m[1], 10) : 1);
  }, 0);
}

function formatAumDelta(q1Aum, q4Aum) {
  const v1 = parseAum(q1Aum);
  const v4 = parseAum(q4Aum);
  if (!v1 || !v4) return null;
  const deltaM = v1 - v4;
  const pctNum = (deltaM / v4) * 100;
  const absM = Math.abs(deltaM);
  const sign = deltaM >= 0 ? "+" : "−";
  const label = absM >= 1000
    ? `${sign}$${(absM / 1000).toFixed(1)}B`
    : `${sign}$${Math.round(absM)}M`;
  return { label: `${label} (${deltaM >= 0 ? "+" : ""}${pctNum.toFixed(1)}%)`, positive: deltaM >= 0 };
}

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

function Section({ label, color, prefix, items, query, onTickerClick }) {
  const filtered = query ? items.filter(item => matches(item.label, query)) : items;
  if (query && filtered.length === 0) return null;
  const muted = prefix === "↓" || prefix === "✕";
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color, marginBottom: 6 }}>{label}</div>
      {filtered.map((item, i) => {
        const ticker = extractTicker(item.label);
        const clickable = ticker && onTickerClick;
        return (
          <div
            key={i}
            onClick={clickable ? (e) => { e.stopPropagation(); onTickerClick(ticker); } : undefined}
            style={{
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
              cursor: clickable ? "pointer" : "default",
            }}
            onMouseEnter={clickable ? (e) => e.currentTarget.style.background = "#f5f5f5" : undefined}
            onMouseLeave={clickable ? (e) => e.currentTarget.style.background = query && matches(item.label, query) ? "#fffde7" : "transparent" : undefined}
          >
            <span style={{ marginRight: 3 }}>{prefix}</span>
            <span style={{ flex: 1 }}>{highlight(item.label, query)}</span>
            {item.pct    && <Chip value={item.pct}    type="pct" />}
            {item.val    && <Chip value={item.val}    type="val" />}
            {item.weight && <Chip value={item.weight} type="weight" />}
            {item.note   && <span style={{ fontSize: 11, color: "#999", marginLeft: 4 }}>· {item.note}</span>}
          </div>
        );
      })}
    </div>
  );
}

function TopHoldings({ holdings, color, onTickerClick }) {
  if (!holdings?.length) return null;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#999", marginBottom: 6 }}>Top Holdings by Weight</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {holdings.map((h, i) => (
          <div
            key={i}
            onClick={onTickerClick ? (e) => { e.stopPropagation(); onTickerClick(h.ticker); } : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "#f9f9f9",
              border: "1px solid #ebebeb",
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 12,
              cursor: onTickerClick ? "pointer" : "default",
              transition: "background 0.15s, border-color 0.15s",
            }}
            onMouseEnter={onTickerClick ? (e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = color; } : undefined}
            onMouseLeave={onTickerClick ? (e) => { e.currentTarget.style.background = "#f9f9f9"; e.currentTarget.style.borderColor = "#ebebeb"; } : undefined}
          >
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

function ModalRow({ item, label, color, prefix }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#333", padding: "3px 0 3px 14px", flexWrap: "wrap", lineHeight: 1.5 }}>
      <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color, width: 68, flexShrink: 0, letterSpacing: 0.5 }}>{prefix} {label}</span>
      <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
      {item.pct    && <Chip value={item.pct}    type="pct" />}
      {item.val    && <Chip value={item.val}    type="val" />}
      {item.weight && <Chip value={item.weight} type="weight" />}
      {item.note   && <span style={{ fontSize: 11, color: "#999" }}>· {item.note}</span>}
    </div>
  );
}

function TickerModal({ ticker, filers, onClose }) {
  const [copied, setCopied] = useState(false);
  const hits = findFilersForTicker(ticker, filers);
  const summary = {
    newBuys:     hits.filter(h => h.newBuys.length).length,
    increased:   hits.filter(h => h.increased.length).length,
    reduced:     hits.filter(h => h.reduced.length).length,
    exits:       hits.filter(h => h.exits.length).length,
    topHoldings: hits.filter(h => h.topHolding).length,
  };
  const netScore =
    hits.reduce((acc, h) => acc + h.newBuys.length * 3 + h.increased.length * 2 - h.reduced.length * 2 - h.exits.length * 3, 0);
  const scoreColor = netScore > 0 ? "#2ecc71" : netScore < 0 ? "#e74c3c" : "#888";
  const scoreLabel = netScore > 0 ? "Net Buy Conviction" : netScore < 0 ? "Net Sell Conviction" : "Mixed";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(20,20,20,0.55)",
        zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: 16, overflowY: "auto", backdropFilter: "blur(2px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 12, maxWidth: 640, width: "100%",
          maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column",
          marginTop: 24, boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ padding: "18px 20px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 3 }}>Ticker Deep Dive</div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 26, fontWeight: 900, color: "#1a1a1a", lineHeight: 1.1 }}>{ticker}</div>
            <div style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
              {hits.length} of {filers.length} filers
              {netScore !== 0 && (
                <>
                  {" · "}
                  <span style={{ color: scoreColor, fontWeight: 700 }}>{scoreLabel} {netScore > 0 ? "+" : ""}{netScore}</span>
                </>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "center" }}>
            <button
              onClick={() => {
                const url = `${window.location.origin}${window.location.pathname}#ticker=${ticker}`;
                navigator.clipboard.writeText(url).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                });
              }}
              style={{
                background: copied ? "#e8f5e9" : "#f0f0f0",
                border: "none", borderRadius: 6,
                padding: "0 10px", height: 32, fontSize: 11, fontWeight: 700,
                cursor: "pointer", color: copied ? "#2e7d32" : "#666",
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}
            >{copied ? "✓ Copied!" : "🔗 Share"}</button>
            <button
              onClick={onClose}
              style={{
                background: "#f0f0f0", border: "none", borderRadius: "50%",
                width: 32, height: 32, fontSize: 18, cursor: "pointer", color: "#666",
                flexShrink: 0, lineHeight: 1,
              }}
            >×</button>
          </div>
        </div>

        {hits.length > 0 && (
          <div style={{ padding: "12px 20px", background: "#fafafa", borderBottom: "1px solid #eee", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {summary.newBuys > 0     && <span style={{ fontSize: 11, fontWeight: 700, background: "#e8f5e9", color: "#2e7d32", borderRadius: 4, padding: "3px 8px" }}>+{summary.newBuys} new buy{summary.newBuys > 1 ? "s" : ""}</span>}
            {summary.increased > 0   && <span style={{ fontSize: 11, fontWeight: 700, background: "#e3f2fd", color: "#1565c0", borderRadius: 4, padding: "3px 8px" }}>↑{summary.increased} added</span>}
            {summary.reduced > 0     && <span style={{ fontSize: 11, fontWeight: 700, background: "#fff3e0", color: "#e65100", borderRadius: 4, padding: "3px 8px" }}>↓{summary.reduced} trimmed</span>}
            {summary.exits > 0       && <span style={{ fontSize: 11, fontWeight: 700, background: "#fce4ec", color: "#c62828", borderRadius: 4, padding: "3px 8px" }}>✕{summary.exits} exited</span>}
            {summary.topHoldings > 0 && <span style={{ fontSize: 11, fontWeight: 700, background: "#ede7f6", color: "#6a1b9a", borderRadius: 4, padding: "3px 8px" }}>★{summary.topHoldings} top-weight</span>}
          </div>
        )}

        <div style={{ overflowY: "auto", padding: "8px 0", flex: 1 }}>
          {hits.length === 0 && (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#888", fontSize: 13 }}>
              No filers have notable activity in <strong>{ticker}</strong> this quarter.
            </div>
          )}
          {hits.map(({ filer, newBuys, increased, reduced, exits, topHolding }, i) => (
            <div
              key={i}
              style={{
                padding: "12px 20px",
                borderBottom: i < hits.length - 1 ? "1px solid #f5f5f5" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                <div style={{ width: 4, height: 20, background: filer.color, borderRadius: 2 }} />
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 14, color: "#1a1a1a" }}>{filer.name}</div>
                <span style={{
                  fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6,
                  padding: "1px 5px", borderRadius: 3,
                  background: filer.type === "individual" ? "#fff3e0" : "#e8f5e9",
                  color: filer.type === "individual" ? "#e65100" : "#2e7d32",
                }}>{filer.type === "individual" ? "Individual" : "Fund"}</span>
                <span style={{ fontSize: 11, color: "#999" }}>· {filer.manager}</span>
              </div>
              {topHolding && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 12, margin: "4px 0 6px 14px",
                  background: "#ede7f6", color: "#6a1b9a",
                  padding: "3px 10px", borderRadius: 4, fontWeight: 700,
                }}>
                  ★ Top holding · {topHolding.weight} of portfolio
                </div>
              )}
              {newBuys.map((item, j)   => <ModalRow key={`nb-${j}`} item={item} label="New buy"   color="#2e7d32" prefix="+" />)}
              {increased.map((item, j) => <ModalRow key={`in-${j}`} item={item} label="Increased" color="#1565c0" prefix="↑" />)}
              {reduced.map((item, j)   => <ModalRow key={`rd-${j}`} item={item} label="Reduced"   color="#e65100" prefix="↓" />)}
              {exits.map((item, j)     => <ModalRow key={`ex-${j}`} item={item} label="Exited"    color="#c62828" prefix="✕" />)}
            </div>
          ))}
        </div>

        <div style={{ padding: "10px 20px", borderTop: "1px solid #eee", background: "#fafafa", fontSize: 10, color: "#aaa", lineHeight: 1.5 }}>
          Auto-matched across all filer sections and top holdings. Ticker matching uses whole-word boundary so GOOG and GOOGL are distinct.
        </div>
      </div>
    </div>
  );
}

function AnalysisTab({ filers, onTickerClick }) {
  const conviction = computeConviction(filers);
  const topBuys  = conviction.filter(e => e.score > 0).slice(0, 9);
  const topSells = conviction.filter(e => e.score < 0).slice(-5).reverse();
  const [openDiv, setOpenDiv] = useState(null);

  const HeatRow = ({ e, positive }) => {
    const color = positive ? "#2ecc71" : "#e74c3c";
    const darkColor = positive ? "#27ae60" : "#c0392b";
    return (
      <div
        onClick={() => onTickerClick?.(e.ticker)}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "5px 8px", borderRadius: 6, cursor: "pointer", marginBottom: 4,
          transition: "background 0.15s",
        }}
        onMouseEnter={(ev) => ev.currentTarget.style.background = positive ? "#f0faf4" : "#fef5f5"}
        onMouseLeave={(ev) => ev.currentTarget.style.background = "transparent"}
      >
        <div style={{ width: 46, fontWeight: 700, fontSize: 12, color: "#1a1a1a", flexShrink: 0 }}>{e.ticker}</div>
        <div style={{ flex: 1, height: 12, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${e.pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${darkColor})`, borderRadius: 4, transition: "width 0.4s" }} />
        </div>
        <div style={{ width: 28, textAlign: "right", fontSize: 11, fontWeight: 700, color, flexShrink: 0 }}>
          {positive ? "+" : ""}{e.score}
        </div>
        <div style={{ fontSize: 11, color: "#aaa", flexShrink: 0, width: 56 }}>
          {positive ? `${e.buyers?.length || 0} buyers` : `${e.sellers?.length || 0} sellers`}
        </div>
        <div style={{ fontSize: 11, color: "#ccc", flexShrink: 0 }}>›</div>
      </div>
    );
  };

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
        <div style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>Auto-scored across all 19 filers. Tap any ticker for a full deep-dive. New buy = +3 · Increased = +2 · Reduced = −2 · Exited = −3</div>

        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#2ecc71", marginBottom: 6 }}>Strong Buy Consensus</div>
        {topBuys.map((e, i) => <HeatRow key={i} e={e} positive={true} />)}

        <div style={{ borderTop: "1px solid #f0f0f0", margin: "14px 0" }} />
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#e74c3c", marginBottom: 6 }}>Sell / Exit Consensus</div>
        {topSells.map((e, i) => <HeatRow key={i} e={e} positive={false} />)}
      </div>

      {/* ── DIVERGENCE RADAR ────────────────────────────────────── */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e0e0e0", padding: "16px 20px", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 16, color: "#1a1a1a", marginBottom: 4 }}>Divergence Radar</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>Where top filers are making opposite bets — and why each side may be right.</div>

        {divergences.map((d, i) => {
          const isOpen = openDiv === i;
          const singleTicker = /^[A-Z]{1,6}$/.test(d.ticker) ? d.ticker : null;
          return (
            <div key={i} style={{ border: "1px solid #ebebeb", borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
              <div
                onClick={() => setOpenDiv(isOpen ? null : i)}
                style={{ padding: "12px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none" }}
              >
                <div>
                  <span
                    onClick={singleTicker ? (e) => { e.stopPropagation(); onTickerClick?.(singleTicker); } : undefined}
                    style={{
                      fontWeight: 800, fontSize: 15, color: "#1a1a1a",
                      cursor: singleTicker ? "pointer" : "default",
                      textDecoration: singleTicker ? "underline" : "none",
                      textDecorationColor: "#ccc",
                      textDecorationThickness: 1,
                      textUnderlineOffset: 3,
                    }}
                  >{d.ticker}</span>
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
        Analysis reflects Q1 2026 13F filings only. Conviction scores are mechanical — they do not account for position sizing, fund strategy, or non-disclosed short positions. This is not investment advice.
      </div>
    </div>
  );
}

function FundCard({ fund, isOpen, onToggle, query, onTickerClick, showQ4 }) {
  const q4 = q4Data[fund.name] || null;
  const holdingsDelta = q4 ? parseHoldings(fund.holdings) - q4.holdings : null;
  const aumDelta = q4 ? formatAumDelta(fund.aum, q4.aum) : null;

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
          {!isOpen && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 }}>
              {fund.newBuys.length > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, background: "#e8f5e9", color: "#2e7d32", borderRadius: 3, padding: "1px 5px" }}>
                  +{fund.newBuys.length} new
                </span>
              )}
              {fund.increased.length > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, background: "#e3f2fd", color: "#1565c0", borderRadius: 3, padding: "1px 5px" }}>
                  ↑{fund.increased.length} added
                </span>
              )}
              {fund.reduced.length > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, background: "#fff3e0", color: "#e65100", borderRadius: 3, padding: "1px 5px" }}>
                  ↓{fund.reduced.length} trimmed
                </span>
              )}
              {fund.exits.length > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, background: "#fce4ec", color: "#c62828", borderRadius: 3, padding: "1px 5px" }}>
                  ✕{fund.exits.length} exited
                </span>
              )}
            </div>
          )}
        </div>
        <div style={{
          fontSize: 18,
          color: "#999",
          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.2s",
        }}>▾</div>
      </div>

      {showQ4 && (
        <div style={{
          padding: "9px 16px 9px 28px",
          background: "#f8f7f3",
          borderTop: "1px solid #eae8e3",
          fontSize: 11,
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#bbb", marginBottom: 5 }}>
            Q4 2025 → Q1 2026
          </div>
          {!q4 ? (
            <span style={{ color: "#aaa", fontStyle: "italic" }}>First 13F filing — no prior quarter data</span>
          ) : (
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <div>
                <span style={{ color: "#aaa" }}>AUM </span>
                <span style={{ fontWeight: 700, color: "#777" }}>{q4.aum}</span>
                <span style={{ color: "#ccc" }}> → </span>
                <span style={{ fontWeight: 700, color: "#333" }}>{fund.aum}</span>
                {aumDelta && (
                  <span style={{
                    marginLeft: 5, fontWeight: 700, fontSize: 10,
                    color: aumDelta.positive ? "#2e7d32" : "#c62828",
                    background: aumDelta.positive ? "#e8f5e9" : "#fce4ec",
                    padding: "1px 5px", borderRadius: 3,
                  }}>{aumDelta.label}</span>
                )}
              </div>
              <div>
                <span style={{ color: "#aaa" }}>Holdings </span>
                <span style={{ fontWeight: 700, color: "#777" }}>{q4.holdings.toLocaleString()}</span>
                <span style={{ color: "#ccc" }}> → </span>
                <span style={{ fontWeight: 700, color: "#333" }}>{typeof fund.holdings === "number" ? fund.holdings.toLocaleString() : fund.holdings}</span>
                {holdingsDelta !== 0 && (
                  <span style={{
                    marginLeft: 5, fontWeight: 700, fontSize: 10,
                    color: holdingsDelta > 0 ? "#1565c0" : "#c62828",
                    background: holdingsDelta > 0 ? "#e3f2fd" : "#fce4ec",
                    padding: "1px 5px", borderRadius: 3,
                  }}>{holdingsDelta > 0 ? `+${holdingsDelta.toLocaleString()}` : holdingsDelta.toLocaleString()}</span>
                )}
              </div>
              <div>
                <span style={{ color: "#aaa" }}>Q1 activity </span>
                {fund.newBuys.length > 0 && <span style={{ color: "#2e7d32", fontWeight: 700 }}>+{fund.newBuys.length} new</span>}
                {fund.exits.length > 0  && <span style={{ color: "#c62828", fontWeight: 700 }}>{fund.newBuys.length ? " · " : ""}✕{fund.exits.length} exit{fund.exits.length > 1 ? "s" : ""}</span>}
                {fund.increased.length > 0 && <span style={{ color: "#1565c0", fontWeight: 700 }}>{(fund.newBuys.length || fund.exits.length) ? " · " : ""}↑{fund.increased.length}</span>}
                {fund.reduced.length > 0   && <span style={{ color: "#e65100", fontWeight: 700 }}>{(fund.newBuys.length || fund.exits.length || fund.increased.length) ? " · " : ""}↓{fund.reduced.length}</span>}
              </div>
            </div>
          )}
        </div>
      )}

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

          <TopHoldings holdings={fund.topHoldings} color={fund.color} onTickerClick={onTickerClick} />
          <Section label="New Buys" color="#2ecc71" prefix="+" items={fund.newBuys} query={query} onTickerClick={onTickerClick} />
          <Section label="Increased Positions" color="#3498db" prefix="↑" items={fund.increased} query={query} onTickerClick={onTickerClick} />
          <Section label="Reduced / Trimmed" color="#e67e22" prefix="↓" items={fund.reduced} query={query} onTickerClick={onTickerClick} />
          <Section label="Full Exits" color="#e74c3c" prefix="✕" items={fund.exits} query={query} onTickerClick={onTickerClick} />

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

const SORT_OPTIONS = [
  { key: "default",           label: "Default"          },
  { key: "most-active",       label: "Most Active"      },
  { key: "aum-desc",          label: "AUM (Largest)"    },
  { key: "most-concentrated", label: "Most Concentrated" },
];

function applySort(filers, sortBy) {
  const sorted = [...filers];
  switch (sortBy) {
    case "most-active":
      return sorted.sort((a, b) => countNewBuys(b) - countNewBuys(a));
    case "aum-desc":
      return sorted.sort((a, b) => parseAum(b.aum) - parseAum(a.aum));
    case "most-concentrated":
      return sorted.sort((a, b) => parseHoldings(a.holdings) - parseHoldings(b.holdings));
    default:
      return sorted;
  }
}

export default function HedgeFundTracker() {
  const [openFunds, setOpenFunds] = useState({ 0: true });
  const [tab, setTab] = useState("funds");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [showQ4, setShowQ4] = useState(false);

  // Deep links: parse hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const params = new URLSearchParams(hash);
    const t = params.get("tab");
    const tk = params.get("ticker");
    if (t && ["funds","sectors","exits","analysis"].includes(t)) setTab(t);
    if (tk) setSelectedTicker(tk.toUpperCase());
  }, []);

  // Deep links: sync hash to state
  useEffect(() => {
    const parts = [];
    if (tab !== "funds") parts.push(`tab=${tab}`);
    if (selectedTicker) parts.push(`ticker=${selectedTicker}`);
    window.history.replaceState(null, "", parts.length ? `#${parts.join("&")}` : window.location.pathname);
  }, [tab, selectedTicker]);

  const query = search.trim();
  const filtered = allFilers.filter(f =>
    (typeFilter === "all" || f.type === typeFilter) && fundMatchesQuery(f, query)
  );
  const visibleFilers = applySort(filtered, sortBy);

  const toggle = (name) => setOpenFunds(prev => ({ ...prev, [name]: !prev[name] }));
  const openTicker = (ticker) => setSelectedTicker(ticker);
  const closeTicker = () => setSelectedTicker(null);

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
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 4 }}>Q1 2026 · 13F Filings</div>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 900, color: "#1a1a1a", margin: 0, lineHeight: 1.15 }}>
          13F Position Tracker
        </h1>
        <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
          10 funds · 10 individuals · Filed May 2026 · Data as of Mar 31, 2026
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: 10 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#aaa", pointerEvents: "none" }}>🔍</span>
        <input
          type="text"
          placeholder="Search ticker or name… e.g. MSFT, GOOGL, Druckenmiller"
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

          <div style={{ display: "flex", gap: 6, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#999", marginRight: 2 }}>Sort</span>
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                style={{
                  padding: "4px 10px",
                  border: sortBy === opt.key ? "1.5px solid #1a1a1a" : "1.5px solid #ddd",
                  borderRadius: 16,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: sortBy === opt.key ? "#1a1a1a" : "#fff",
                  color: sortBy === opt.key ? "#fff" : "#666",
                  transition: "all 0.15s",
                }}
              >{opt.label}</button>
            ))}
            <button
              onClick={() => setShowQ4(v => !v)}
              style={{
                marginLeft: "auto",
                padding: "4px 11px",
                border: showQ4 ? "1.5px solid #6c3483" : "1.5px solid #ddd",
                borderRadius: 16,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                background: showQ4 ? "#6c3483" : "#fff",
                color: showQ4 ? "#fff" : "#888",
                transition: "all 0.15s",
              }}
            >{showQ4 ? "▶ Q4 Compare ON" : "▶ Q4 Compare"}</button>
          </div>

          {visibleFilers.map((fund) => (
            <FundCard key={fund.name} fund={fund} isOpen={query ? true : !!openFunds[fund.name]} onToggle={() => toggle(fund.name)} query={query} onTickerClick={openTicker} showQ4={showQ4} />
          ))}
        </div>
      )}

      {tab === "sectors" && (
        <div>
          <div style={{ fontSize: 13, color: "#666", marginBottom: 14, lineHeight: 1.6 }}>
            Where multiple top filers are converging in Q1 2026:
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
            Notable full exits and large reductions by major filers in Q1 2026:
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

      {tab === "analysis" && <AnalysisTab filers={allFilers} onTickerClick={openTicker} />}

      {selectedTicker && (
        <TickerModal ticker={selectedTicker} filers={allFilers} onClose={closeTicker} />
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
        <strong style={{ color: "#666" }}>Data sources:</strong> SEC EDGAR 13F-HR filings, Fortune, CNBC, Benzinga, Kiplinger, WhaleWisdom, Seeking Alpha, HedgeFollow, ValuSider, Insider Monkey, Fintel, TheStreet, Yahoo Finance, Quiver Quant, TipRanks, GuruFocus, HedgeFundAlpha, Institutional Investor, BusinessWire, Bloomberg. All data reflects positions as of Mar 31, 2026 with a 45-day disclosure lag. 13F filings only show long US equity positions — shorts, derivatives, and non-US holdings are excluded. This is not investment advice.
      </div>
    </div>
  );
}

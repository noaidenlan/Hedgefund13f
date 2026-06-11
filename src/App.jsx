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
    aum: "$22.4B (13F) / ~$97B total",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 993,
    newBuys: [
      p("TSM (Taiwan Semiconductor)", { note: "new position — fresh stake in global chip supply conviction" }),
      p("GOOGL (Alphabet)",           { note: "new position — opened in Q1 2026" }),
      p("NUE (Nucor)",                { note: "new industrial/materials play" }),
    ],
    increased: [
      p("NVDA (Nvidia)",      { note: "significant increase" }),
      p("AVGO (Broadcom)",    { note: "significant increase — AI chip rotation" }),
      p("MU (Micron)",        { note: "significant increase" }),
      p("AMZN (Amazon)",      { note: "increased — moved to top 3 holdings" }),
      p("SPY (S&P 500 ETF)",  { note: "all-weather broad equity exposure" }),
    ],
    reduced: [
      p("AMD",                { note: "profit-taking" }),
      p("LRCX (Lam Research)",{ note: "reduced" }),
      p("BKNG (Booking)",     { note: "significantly reduced" }),
      p("MA (Mastercard)",    { note: "significantly reduced" }),
      p("PYPL (PayPal)",      { note: "near-complete exit" }),
      p("ADBE (Adobe)",       { note: "near-complete exit" }),
      p("EXPE (Expedia)",     { note: "significantly reduced" }),
    ],
    exits: [
      p("CRM (Salesforce)", { note: "full exit — rotating away from traditional enterprise software" }),
      p("WDAY (Workday)",   { note: "full exit — AI-native alternatives threat" }),
      p("NOW (ServiceNow)", { note: "full exit — enterprise software rotation" }),
    ],
    theme: "Bridgewater's Q1 2026 is a decisive chip-in, software-out rotation. New positions in TSM and Alphabet join meaningful adds in NVDA, AVGO, and MU — the full AI silicon stack. The triple software exit (Salesforce, Workday, ServiceNow) reflects a conviction that AI-native platforms will displace incumbent enterprise SaaS. PayPal and Adobe are near-completely exited. SPY remains the all-weather anchor. Under Nir Bar Dea, Bridgewater has shed its generalist mega-cap software exposure and concentrated into AI infrastructure chips and hyperscalers.",
    sources: "Seeking Alpha, KuCoin, Bitget, HedgeFundAlpha, HoldingsChannel",
    color: "#1a5276",
  },
  {
    type: "fund",
    name: "Citadel Advisors",
    manager: "Ken Griffin",
    aum: "$618B (13F, incl. market-making)",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: "12,857",
    newBuys: [
      p("AstraZeneca (AZN)",      { note: "new position — pharma/biotech diversification" }),
      p("iShares Silver Trust (SLV)", { note: "new position — precious metals macro hedge" }),
    ],
    increased: [
      p("MU (Micron)",   { note: "increased — AI memory demand" }),
      p("META",          { note: "increased — AI advertising platform" }),
      p("WBD (Warner Bros. Discovery)", { note: "increased — media consolidation thesis" }),
      p("AVGO (Broadcom)", { val: "+$2.2B" }),
    ],
    reduced: [
      p("NVDA (Nvidia)",    { note: "reduced — profit-taking after large prior stake" }),
      p("AMZN (Amazon)",    { note: "reduced" }),
      p("V (Visa)",         { note: "reduced" }),
      p("SPY (S&P 500 ETF)", { val: "−$8.1B", note: "inventory rotation, not directional" }),
      p("QQQ (Nasdaq ETF)", { val: "−$8.0B" }),
      p("MSFT (Microsoft)", { val: "−$909M" }),
    ],
    exits: [p("Various smaller positions across diversified book")],
    theme: "Citadel's Q1 2026 across 12,857 positions reflects a nuanced shift: NVDA and AMZN reduced after large prior stakes, AVGO increased +$2.2B as the preferred AI chip. MU, META, and WBD increased. New positions in AstraZeneca and iShares Silver Trust add pharma and precious-metals diversification. SPY/QQQ reductions are market-making inventory adjustments, not directional bets. At $618B in 13F holdings, Citadel remains the largest 13F filer in the cohort — every move represents a statistically significant signal at institutional scale.",
    sources: "TheStreet, Insider Monkey, Yahoo Finance, WhaleWisdom",
    color: "#2c3e50",
  },
  {
    type: "fund",
    name: "Pershing Square",
    manager: "Bill Ackman",
    aum: "$13.71B",
    quarter: "Q1 2026",
    filed: "May 15, 2026",
    holdings: 11,
    topHoldings: [
      { ticker: "BN",   weight: "17.62%" },
      { ticker: "AMZN", weight: "17.39%" },
      { ticker: "UBER", weight: "15.71%" },
      { ticker: "MSFT", weight: "15.26%" },
      { ticker: "QSR",  weight: "12.20%" },
    ],
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
      p("HLT (Hilton Hotels)",              { note: "full exit, ~3.03M shares — successful multi-year investment" }),
      p("CMG (Chipotle Mexican Grill)",      { note: "full exit" }),
      p("CP (Canadian Pacific Kansas City)", { note: "full exit" }),
    ],
    theme: "Ackman's Q1 2026 pivot: out of Alphabet (and Chipotle and Canadian Pacific), into Microsoft. He sold ~95% of GOOGL/GOOG and deployed $2.09B into MSFT at what he called 'well below its historical trading average.' His thesis: Azure AI is the more durable cloud franchise vs. GOOGL's search-at-risk narrative. Three full exits (HLT, CMG, CP) free capital for tech conviction bets. AUM at $13.71B. Pershing remains one of the most concentrated portfolios in the universe — 11 positions, top 5 holdings over 78% of the book.",
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
      p("MSFT (Microsoft)", { pct: "−82%", note: "major reduction — rotating away from legacy tech" }),
      p("NVDA (Nvidia)",    { note: "trimmed" }),
    ],
    exits: [
      p("AAL (American Airlines)", { note: "all 14.1M shares — tariff/recession risk" }),
      p("UAL (United Airlines)",   { note: "full exit — same thesis as AAL" }),
      p("DAL (Delta Air Lines)",   { note: "full exit — (same quarter Berkshire bought Delta)" }),
      p("OC (Owens Corning)"),
      p("MHK (Mohawk Industries)"),
      p("IQV (IQVIA Holdings)"),
    ],
    theme: "Tepper's Q1 2026 is a crisp AI infrastructure rotation: out of all airlines (AAL, UAL, DAL — full exits across the entire airline sector) and legacy tech (MSFT −82%), into AI enablers. Amazon (+98%), Micron (+200%), SanDisk (AI flash storage), Uber (platform scale), and Vistra (AI power demand) all reflect the 'AI needs cloud, memory, and power' thesis. Notably, Tepper fully exited Delta the same quarter Berkshire initiated it — a direct divergence of conviction between two legendary investors. BABA reduced but not abandoned — maintaining China optionality while de-risking.",
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
      p("AMAT (Applied Materials)", { pct: "+85.09%", val: "+$260M", note: "semiconductor equipment — wafer fab expansion" }),
    ],
    reduced: [
      p("MSFT (Microsoft)", { note: "trimmed — was top holding for 13 quarters" }),
      p("TTWO (Take-Two Interactive)", { note: "reduced" }),
    ],
    exits: [
      p("WDAY (Workday)",     { note: "full exit — AI-native HR alternatives threat" }),
      p("FLUT (Flutter Entertainment)", { note: "full exit" }),
      p("VEEV (Veeva Systems)", { note: "full exit" }),
      p("GRAB (Grab Holdings)", { note: "full exit — SE Asia super-app" }),
      p("ESTC (Elastic NV)",  { note: "full exit" }),
      p("HNGE (Hinge Health)", { note: "full exit" }),
      p("CRCL (Circle Internet)", { note: "full exit" }),
    ],
    theme: "Tiger Global's Q1 2026 combined meaningful exits with selective additions. Six full exits (Flutter, Veeva, Grab, Elastic, Hinge Health, Circle) show Coleman clearing out positions that don't fit the AI-era conviction framework. AMAT +85% (+$260M) is the surprise aggressive add — semiconductor equipment for the next wafer fab cycle. AVGO/NVDA additions reinforce AI chip conviction; Netflix and ServiceNow increases signal AI-embedded platforms. Workday exit reflects skepticism about traditional enterprise HR vs. AI-native alternatives. GOOGL is now Tiger's top holding — the first time in 13 quarters MSFT was not #1.",
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
      p("AON (Aon PLC)",               { val: "+$504M", note: "insurance brokerage — durable fee-based revenue" }),
      p("JCI (Johnson Controls)",      { val: "+$588M", note: "building automation / AI data center HVAC" }),
      p("DKNG (DraftKings)",           { val: "+$561M", note: "sports betting platform scaling revenue" }),
      p("BLK (BlackRock)",             { val: "+$495M", note: "asset management — AUM growth + ETF dominance" }),
      p("ICE (Intercontinental Exchange)"),
      p("DKS (Dick's Sporting Goods)", { val: "~$561M" }),
      p("TMO (Thermo Fisher Scientific)"),
      p("AAPL (Apple)",                { note: "new stake" }),
      p("META (Meta Platforms)",       { note: "new/increased stake" }),
    ],
    increased: [
      p("V (Visa)",              { pct: "+37.5%" }),
      p("TSM (TSMC)",            { pct: "+24.6%" }),
      p("MSFT (Microsoft)",      { pct: "+32.5%" }),
      p("PNC (PNC Financial)",   { pct: "+234.93%", note: "more than tripled position" }),
      p("DIS (Disney)",          { note: "significant increase" }),
      p("NFLX (Netflix)",        { note: "significant increase" }),
    ],
    reduced: [
      p("SCHW (Charles Schwab)", { pct: "−16.3%" }),
    ],
    exits: [
      p("NVDA (Nvidia)",  { note: "full exit" }),
      p("LLY (Eli Lilly)", { note: "full exit" }),
      p("QCOM (Qualcomm)", { note: "full exit" }),
      p("Several smaller positions rotated out"),
    ],
    theme: "Viking's Q1 2026 is a quality rotation under volatility: buy durable-moat businesses (Visa, Taiwan Semi, Microsoft, AON, BLK) during tariff-induced market dislocation. PNC more than tripled (+234.93%) in a single quarter — Halvorsen's biggest single position add by percentage. The Amazon re-entry, new GOOGL and AAPL positions align with the 'Alphabet/MSFT as undervalued AI platform' cross-filer theme. Full exits of NVDA, LLY, and QCOM — and new large bets on JCI (+$588M, data-center HVAC), DKNG (+$561M), and BLK (+$495M) — signal a rotation from pure AI chip plays toward durable compounders at dislocated prices. Viking is the most aggressive quality accumulator in Q1 volatility.",
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
      { ticker: "AMZN", weight: "19.40%" },
      { ticker: "TDS",  weight: "13.34%" },
      { ticker: "CRH",  weight: "9.59%"  },
      { ticker: "TPX",  weight: "8.06%"  },
      { ticker: "CRS",  weight: "5.87%"  },
    ],
    newBuys: [
      p("META (Meta Platforms)",  { note: "new position — AI advertising platform conviction" }),
      p("GOOGL (Alphabet)",       { note: "new position — AI platform at reasonable valuation" }),
      p("GLD (Gold ETF)",         { note: "macro hedge — de-dollarization thesis" }),
      p("HUT (Hut 8 Mining)",     { note: "Bitcoin miner / AI infrastructure play" }),
      p("TDG (TransDigm Group)",  { note: "aerospace parts compounder — high ROIC durable moat" }),
    ],
    increased: [
      p("AMZN (Amazon)", { note: "increased to 19.4% — largest position in fund" }),
    ],
    reduced: [
      p("NVDA (Nvidia)", { pct: "−94%", note: "near-full exit — DeepSeek efficiency concerns" }),
      p("UNP (Union Pacific)", { pct: "−94%" }),
      p("COF (Capital One)",   { pct: "−90%" }),
      p("NSC (Norfolk Southern)", { pct: "−90%" }),
      p("SN (SharkNinja)",     { pct: "−90%" }),
    ],
    exits: [
      p("MSFT (Microsoft)", { note: "full exit — rotated capital away from MSFT entirely" }),
      p("PCG (PG&E)",        { note: "full exit — ended multi-year activist engagement" }),
      p("BN (Brookfield Asset Mgmt)", { note: "full exit" }),
      p("BABA (Alibaba)",    { note: "full exit — China de-risk" }),
      p("CSGP (CoStar Group)", { note: "full exit" }),
      p("CASY (Casey's General Stores)", { note: "full exit" }),
      p("RKT (Rocket Companies)", { note: "full exit" }),
      p("LPLA (LPL Financial)", { note: "full exit" }),
      p("CMG (Chipotle Mexican Grill)", { note: "full exit" }),
      p("CEG (Constellation Energy)", { note: "full exit" }),
      p("VST (Vistra Energy)", { note: "full exit" }),
    ],
    theme: "Third Point's Q1 2026 is the most dramatic portfolio reset in Loeb's recent history — a de-grossing from ~$7.26B to ~$2.08B 13F exposure that signals a near-complete conviction overhaul. MSFT and PCG, previously flagship positions, are both fully exited. NVDA cut -94%. The new book is led by Amazon (19.4%), TDS (13.3%), and CRH (9.6%) — a mix of AI hyperscaler, telecom value, and building materials. New buys in META, GOOGL, GLD, HUT, and TransDigm reflect a pivot toward: AI advertising platforms, gold macro hedge, Bitcoin infrastructure, and aerospace compounders. The -0.6% Q1 return belies the radical repositioning underway.",
    sources: "Fintel, Seeking Alpha, ValuSider, 13Radar, HedgeFollow",
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
      p("NVDA (Nvidia)",        { pct: "+61%",   val: "~$187M total", note: "increased stake during AI volatility selloff" }),
      p("MSFT (Microsoft)",     { val: "+$78M",  note: "increased position" }),
    ],
    reduced: [
      p("FXI (China Large-Cap ETF)", { val: "−$111M", note: "China macro de-risk" }),
      p("KWEB (China Internet ETF)", { val: "−$101M", note: "China internet exposure reduction" }),
      p("CNP (CenterPoint Energy)",  { val: "−$104M" }),
    ],
    exits: [p("ARMK (Aramark), BKNG (Booking), prior period energy names")],
    theme: "Dawn Fitzpatrick's Q1 2026 filing mirrors her March 2026 warning that markets face 'a painful 18–24 months.' The portfolio reflects simultaneous offense and defense: SPY puts and energy ETF hedges (XLE/XOP puts combined with XOP long), while 127 new opportunistic buys exploit the volatility dislocation. NVDA increased +61% to ~$187M — buying the AI chip selloff. MSFT added $78M. Simultaneously, China exposure cut: FXI −$111M, KWEB −$101M — de-risking the geopolitical exposure. CoreWeave is the AI infrastructure bet; Spotify and Bill Holdings represent fintech/platform bets at dislocated valuations. The Jazz Pharma convertibles ($173M) show Soros going up the capital structure for protection on a pharma bet. Soros is the most active builder in Q1 by position count.",
    sources: "SEC EDGAR, Seeking Alpha, 13F.info, WhaleWisdom",
    color: "#7d3c98",
  },
  {
    type: "fund",
    name: "D.E. Shaw & Co.",
    manager: "David E. Shaw",
    aum: "$166.3B (13F)",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: "~4,558",
    newBuys: [p("~165 new positions across systematic screens")],
    increased: [
      p("AVGO (Broadcom)",   { note: "AI chip build-out continues" }),
      p("IREN (IREN AI)",    { val: "+$687M" }),
      p("BE (Bloom Energy)", { val: "+$605M", note: "AI power infrastructure" }),
      p("QQQ (Nasdaq ETF)",  { val: "+$3.8B", note: "systematic equity factor exposure" }),
      p("MSFT (Microsoft)",  { val: "+$1.9B" }),
      p("META",              { val: "+$941M" }),
      p("WDC (Western Digital)", { val: "+$848M", note: "flash/HDD storage for AI workloads" }),
      p("ADBE (Adobe)",      { val: "+$737M" }),
    ],
    reduced: [
      p("AAPL (Apple)",  { val: "−$2.3B", note: "declining ROIC vs. peers at current multiples" }),
      p("SPY",           { val: "−$1.8B" }),
      p("APP (AppLovin)", { val: "−$1.4B" }),
      p("BABA (Alibaba)", { val: "−$1.2B", note: "China geopolitical de-risk" }),
      p("XLF (Financial ETF)", { val: "−$802M" }),
      p("IWM (Russell 2000 ETF)", { val: "−$763M" }),
      p("GE (GE Aerospace)", { val: "−$678M" }),
      p("TMO (Thermo Fisher Scientific)", { val: "−$636M" }),
      p("MRK (Merck)",   { val: "−$501M" }),
    ],
    exits: [p("Systematic turnover across hundreds of smaller positions")],
    theme: "D.E. Shaw's systematic Q1 2026 signals: reduce China (BABA −$1.2B), reduce mega-cap consumer tech (AAPL −$2.3B on ROIC screens), reduce broad financials (XLF) and small-caps (IWM) — while building AI power infrastructure (IREN +$687M, BE +$605M), tech platforms (MSFT +$1.9B, META +$941M, ADBE +$737M), and storage (WDC +$848M). QQQ increased +$3.8B shows systematic equity factor loading remains high. TMO −$636M and MRK −$501M signal life-sciences factor rotation. AUM at $166.3B reflects Q1 2026 mark-to-market (down from ~$182B Q4 2025). D.E. Shaw remains the most quantitative 13F in the cohort — every move reflects systematic signal capture, not narrative.",
    sources: "StockZoa, HoldingsChannel, Fintel, Insider Monkey",
    color: "#117864",
  },
];

const individuals = [
  {
    type: "individual",
    name: "Duquesne Family Office",
    manager: "Stanley Druckenmiller",
    aum: "$3.39B",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 68,
    topHoldings: [
      { ticker: "NTRA", weight: "18.1%" },
      { ticker: "ETHB", weight: "8.7%"  },
      { ticker: "INSM", weight: "5.6%"  },
      { ticker: "TSM",  weight: "5.0%"  },
      { ticker: "IVZ",  weight: "4.7%"  },
    ],
    newBuys: [
      p("AVGO (Broadcom)",   { val: "$60.6M", note: "largest new position — AI chip conviction after NVDA exit" }),
      p("ARGT (Argentina ETF)", { val: "$36.2M", note: "Milei reform thesis — EM macro bet" }),
      p("CAI (Cactus Inc.)",    { val: "$33.9M", note: "oilfield equipment/services" }),
      p("RVMD (Revolution Medicines)", { val: "$30.7M", note: "oncology biotech" }),
      p("INTC (Intel)",         { val: "$18M",   note: "foundry recovery + US chip supply chain thesis" }),
      p("ARM Holdings",         { val: "$16M",   note: "re-entry — chip architecture royalties" }),
      p("SNDK (SanDisk)",       { note: "new position — AI flash storage" }),
      p("MU (Micron)",          { note: "new position — memory for AI workloads" }),
      p("STX (Seagate Technology)", { note: "new position — storage infrastructure" }),
      p("31 new positions total", { note: "broad diversification across healthcare, EM, and tech" }),
    ],
    increased: [
      p("NTRA (Natera)",     { note: "maintained top position — liquid biopsy conviction" }),
      p("INSM (Insmed)",     { note: "added — rare disease pulmonary" }),
      p("TSM (TSMC)",        { note: "added to semiconductor position" }),
    ],
    reduced: [
      p("AMZN (Amazon)", { pct: "−99%", note: "near-full liquidation — almost complete exit" }),
    ],
    exits: [
      p("GOOGL (Alphabet)",    { note: "full exit — sold entire position" }),
      p("EWZ (Brazil ETF)",    { note: "full exit" }),
      p("RSP (Equal Weight S&P)", { note: "full exit" }),
      p("NVDA (Nvidia)",       { note: "sold remaining shares — completed exit started Q4 2025" }),
    ],
    theme: "Druckenmiller's Q1 2026 is a genuine macro reset: AUM down to $3.39B from $4.22B, GOOGL fully exited, AMZN cut -99%, NVDA exit completed. The 31 new positions show broad diversification replacing the high-conviction tech concentration of prior quarters — AVGO replaces NVDA as his primary AI chip play ($60.6M), ARGT bets on Argentina's Milei reform, and healthcare names (RVMD, CRNX-related) fill the biotech sleeve. Top holdings now led by Natera (liquid biopsy, 18.1%), ETHB (8.7%), and Insmed (5.6%) — a far more biotech-heavy, macro-eclectic book than the NVDA/GOOGL/tech concentration of 2024–2025. The investor who called AI 'highest-conviction' has structurally repositioned away from AI mega-caps.",
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
      p("ADBE (Adobe)",             { note: "new position — bought in 'low $250s' after AI disruption selloff" }),
      p("PYPL (PayPal)",            { note: "new position — fintech value at depressed multiples" }),
    ],
    increased: [
      p("LULU (Lululemon)", { pct: "+100%", note: "doubled position at multi-year lows" }),
    ],
    reduced: [],
    exits: [
      p("BABA (Alibaba)",  { note: "full China tech liquidation — geopolitical de-risk" }),
      p("BIDU (Baidu)",    { note: "full exit — completed China tech de-risking" }),
      p("JD (JD.com)",     { note: "full exit" }),
      p("HCA (HCA Healthcare)", { note: "full exit" }),
      p("ESTC (Elastic NV)",    { note: "full exit" }),
      p("GME (GameStop)",       { note: "sold all shares May 5 — regulatory concern / meme-stock catalyst passed" }),
    ],
    theme: "Burry's Q1 2026 is a complete portfolio overhaul — full exit of all Chinese tech holdings (BABA, BIDU, JD) for geopolitical de-risk, replaced with deep-value US plays: Molina Healthcare (Medicaid mispricing), SLM Corp (aggressive buyback), Bruker (scientific instruments), MercadoLibre (LatAm e-commerce on panic drop), Adobe (bought in 'low $250s'), and PayPal. He doubled Lululemon on multi-year lows. GME sold May 5 — the meme-stock catalyst played out. The invisible but critical story: Burry disclosed NVDA and PLTR put options (~$85M total) — his 'Big Short 2.0' bet that AI euphoria valuations are not sustainable. Burry now has $60M+ in cash reserves — the most defensive he's been in years.",
    sources: "SEC EDGAR, ForeignPolicyJournal, Yahoo Finance (puts), GuruFocus, Burry Substack",
    color: "#c0392b",
  },
  {
    type: "individual",
    name: "Greenlight Capital",
    manager: "David Einhorn",
    aum: "~$3.19B",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 45,
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
      p("GPN (Global Payments)",        { note: "full exit — payments processor de-rated on fintech disruption" }),
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
    newBuys: [
      p("AON (Aon PLC)",                    { val: "$248.2M", note: "largest new buy — insurance brokerage with durable fee revenue" }),
      p("NCLH (Norwegian Cruise Line)",     { val: "$67.9M",  note: "travel recovery at discounted valuation" }),
      p("DNOW (NOW Inc.)",                  { val: "$43.2M",  note: "industrial distribution — energy/industrial supply" }),
      p("V (Visa)",                         { note: "new position — payments network moat" }),
      p("TFX (Teleflex)",                   { note: "new position — medical devices" }),
    ],
    increased: [
      p("AMZN (Amazon)", { pct: "+47.01%", val: "3.12M shares / ~$649M", note: "largest holding increase — durable cloud/commerce moat" }),
      p("QSR (Restaurant Brands Intl)",  { note: "massive increase to #2 holding — BK/Tim Hortons/Popeyes franchise model" }),
      p("ELV (Elevance Health)",          { pct: "+120%", note: "more than doubled to 1.319M shares (~$426M) — Medicaid value play" }),
      p("WCC (Wesco International)",      { val: "+$88M" }),
      p("UNP (Union Pacific)",            { val: "+$30M" }),
    ],
    reduced: [
      p("ELV (Elevance Health)", { val: "−$17M", note: "minor position sizing trim" }),
      p("QSR",                   { val: "−$12M", note: "minor trim after large build" }),
    ],
    exits: [
      p("CRH (CRH PLC)",         { note: "full exit — building materials position closed" }),
      p("DG (Dollar General)",   { note: "full exit" }),
      p("FIS (Fidelity Natl. Information Services)", { note: "full exit" }),
      p("FISV (Fiserv)",         { note: "full exit" }),
      p("Multiple smaller positions — portfolio concentrated to 22 holdings"),
    ],
    theme: "Klarman's Q1 2026 exemplifies Baupost's margin-of-safety discipline at scale. AON at $248.2M is the largest new buy — a classic Klarman franchise (durable fee-based insurance brokerage). Amazon at 12.7% is the conviction anchor, increased +47% to 3.12M shares (~$649M). Restaurant Brands International at #2 reflects quality franchise assets at a discount. Elevance Health doubled as Klarman averaged into a beaten-up managed-care franchise. Four full exits (CRH, Dollar General, FIS, FISV) and four new positions (AON, NCLH, DNOW, V, TFX) show quiet but active portfolio reshaping. With 22 positions, every entry reflects multi-year conviction. Baupost is the 'slowest moving, highest-confidence' portfolio in the cohort.",
    sources: "ValuSider, WhaleWisdom, 13Radar, SEC EDGAR",
    color: "#8e44ad",
  },
  {
    type: "individual",
    name: "Icahn Capital",
    manager: "Carl Icahn",
    aum: "~$8.55B",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 12,
    topHoldings: [
      { ticker: "IEP",  weight: "48.49%" },
      { ticker: "CVI",  weight: "28.01%" },
      { ticker: "UAN",  weight: "6.17%"  },
      { ticker: "CTRI", weight: "4.90%"  },
      { ticker: "IFF",  weight: "3.63%"  },
    ],
    newBuys: [],
    increased: [
      p("IEP (Icahn Enterprises LP)", { pct: "+5.87%" }),
    ],
    reduced: [
      p("SATS (EchoStar)",   { pct: "−58.1%", note: "significant reduction in satellite TV stake" }),
    ],
    exits: [
      p("SWX (Southwest Gas)", { note: "full exit — ended post-activist-win holding" }),
    ],
    theme: "Icahn Capital's Q1 2026 reduced holdings from 13 to 12 with the full exit of Southwest Gas (SWX) and a -58% cut to EchoStar (SATS). The portfolio is dominated by Icahn's control stakes: IEP at 48.5% (self-referential vehicle), CVI (CVR Energy, refining) at 28%, and UAN (nitrogen fertilizer) at 6.2%. Centuri Holdings (CTRI) and IFF round out the top 5. The refining hedge book drag (-8.2% investment returns, +4.4% ex-hedges) continues to work against returns as oil prices stabilized. Icahn is in activist-maintenance mode — defending existing positions rather than initiating new campaigns.",
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
      p("TME (Tencent Music Entertainment)", { val: "$61.2M", note: "China streaming platform — media moat" }),
      p("HRB (H&R Block)",          { val: "$51.6M", note: "tax services — AI-disruption resistant consumer franchise" }),
      p("MCO (Moody's Corp)",        { val: "$51.4M", note: "ratings duopoly — durable pricing power" }),
      p("SPGI (S&P Global)",         { val: "$51.2M", note: "data/ratings — same duopoly thesis as MCO" }),
    ],
    increased: [
      p("GOOGL + GOOG (Alphabet)", { note: "~44% combined portfolio weight — AI platform conviction unchanged" }),
      p("BAC (Bank of America)",   { note: "continued multi-year hold" }),
    ],
    reduced: [
      p("Minor rebalancing on existing positions"),
    ],
    exits: [],
    theme: "Li Lu's Himalaya Capital is the most extreme concentration story in the cohort: 44% in Alphabet (Class A + C combined). Li Lu views GOOG as the most durable AI-era platform at the most reasonable valuation among mega-caps. PDD/Pinduoduo at 14.6% is the China consumer growth bet — unchanged despite geopolitical pressure, reflecting Li Lu's decade-long commitment to conviction investing regardless of macro noise. The expansion from 9 to 14 holdings signals he found 5 new high-conviction ideas during Q1 volatility — notably EWBC (US-China banking bridge), TME (Tencent Music, $61.2M), HRB ($51.6M), MCO ($51.4M), and SPGI ($51.2M). The Moody's/S&P Global pair reflects Li Lu's view that data-and-ratings duopolies are the most durable, AI-resistant franchises in finance. His stated philosophy: median holding period exceeds 7 years.",
    sources: "SEC EDGAR, Himalaya 13F, Motley Fool, 13Radar",
    color: "#2471a3",
  },
  {
    type: "individual",
    name: "Gotham Asset Management",
    manager: "Joel Greenblatt",
    aum: "~$32.65B (13F)",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: "1,749",
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
    aum: "~$383M",
    quarter: "Q1 2026",
    filed: "May 2026",
    holdings: 55,
    topHoldings: [
      { ticker: "NBR",  weight: "11.53%" },
      { ticker: "LNC",  weight: "7.92%"  },
      { ticker: "GTN",  weight: "6.80%"  },
      { ticker: "GCI",  weight: "6.18%"  },
      { ticker: "QUAD", weight: "6.05%"  },
    ],
    newBuys: [],
    increased: [
      p("NBR (Nabors Industries)", { note: "maintained top position — energy services repricing thesis intact" }),
    ],
    reduced: [
      p("NBR (Nabors Industries)", { note: "reduced ~158K shares — partial profit-taking after strong run" }),
      p("Various positions trimmed as they appreciated"),
    ],
    exits: [p("Several legacy positions trimmed to zero as thesis played out")],
    theme: "Miller Value's Q1 2026 validates deep contrarian value investing at exactly the right moment. The Deep Value Strategy returned +8.39% net vs. S&P 500 −4.4% — one of the best quarters in the fund's history. Holdings expanded to 55 (from 34) and AUM grew to ~$383M reflecting strong performance and inflows. Nabors Industries remains the top holding at 11.5% — energy services company with high financial leverage that worked spectacularly as oil services repriced. The tariff-induced Q1 selloff was tailor-made for this strategy — when growth sells off, deep value cyclicals and turnarounds dramatically outperform.",
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
    holdings: 42,
    topHoldings: [
      { ticker: "BE",   weight: "top holding" },
      { ticker: "SNDK", weight: "top 2" },
      { ticker: "CRWV", weight: "top 3" },
      { ticker: "IREN", weight: "top 4" },
      { ticker: "CORZ", weight: "top 5" },
    ],
    newBuys: [
      p("SEI (Solaris Energy Infrastructure)", { val: "$62.5M", note: "modular power for data centers" }),
      p("TE (T1 Energy)",          { val: "$43.9M", note: "renewable energy for AI compute" }),
      p("BITF (Bitfarms)",         { note: "19.88M shares — BTC miner / AI compute infrastructure" }),
    ],
    increased: [
      p("CLSK (CleanSpark)",     { val: "~$90.5M", pct: "+649%", note: "from 1.64M to 12.28M shares — BTC miner repurposed as AI compute host" }),
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
      p("ASML (puts)",           { val: "~$494M notional", note: "bearish on European chip equipment" }),
      p("INFY (Infosys puts)",   { val: "~$6.76M notional" }),
      p("GLW (Corning puts)",    { note: "small put position" }),
    ],
    exits: [
      p("VST (Vistra Energy)", { note: "exited nuclear power position after large gains" }),
      p("INTC (Intel) common", { note: "sold all 20.2M shares; retains 20.2M call options — bet on foundry optionality" }),
    ],
    theme: "Aschenbrenner is the most ideologically coherent investor in the cohort. His June 2024 165-page manifesto 'Situational Awareness: The Decade Ahead' predicted AGI by ~2027 and framed the hardware buildout as the defining economic opportunity of the era. His thesis: the constraint on AI is not algorithms but electrons — data centers need gigawatts of power that the grid cannot supply on short notice. Bitcoin miners already have grid connections and stranded power assets; they become AI compute hosts overnight. Hence: long BE, SNDK, CRWV, IREN, CORZ, APLD. Q1 2026 adds: CLSK exploded from 1.64M to 12.28M shares (+649%), new positions in SEI (modular power), TE (T1 Energy), and BITF (Bitfarms, 19.88M shares). The contrarian short (~$8.46B in puts against NVDA, AVGO, AMD, SMH, ORCL, MU, TSM, ASML, INFY) is deliberate — he avoids the 'crowded AI chip trade' entirely, betting that the infrastructure layer captures more value than chip incumbents. Fund launched September 2024 with Collison brothers and Nat Friedman as seed investors. Reported 100%+ returns in calendar year 2025.",
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
  { sector: "Cloud/AI Platform: MSFT & GOOGL as 'Safe Harbor'", tickers: "MSFT, GOOGL, GOOG, AMZN", buyers: "Pershing Square (MSFT new $2.09B), Viking (MSFT +32%, GOOGL new), Berkshire (GOOGL tripled), Himalaya (GOOGL 44%), Baupost (AMZN +47%), D.E. Shaw (MSFT +$1.9B)", signal: "The strongest cross-filer consensus of Q1 2026: Microsoft and Alphabet are being treated as the most durable AI cloud platforms at reasonable valuations. When 6+ filers independently converge on the same 2 stocks, the institutional re-rating is typically multi-year." },
  { sector: "AI Semiconductors (Selective Conviction)", tickers: "NVDA, AVGO, MU, MRVL, INTC", buyers: "Bridgewater (+NVDA, +MU, +AVGO), Appaloosa (MU +200%), Tiger Global (INTC new, AVGO +, AMAT +85%), D.E. Shaw (+AVGO +$2.2B, MSFT +$1.9B), Druckenmiller (AVGO new $60.6M)", signal: "AI chip conviction at Bridgewater, D.E. Shaw, and Appaloosa. But the consensus is fracturing: Third Point cut NVDA -94%, Druckenmiller exited GOOGL/AMZN, Burry holds NVDA puts, and Aschenbrenner has $8.46B in puts against the entire chip sector (SMH, NVDA, AVGO, AMD, MU, TSM, ASML). The most contested trade in the cohort." },
  { sector: "AI Power Infrastructure", tickers: "BE, IREN, CORZ, APLD, CLSK, RIOT", buyers: "Situational Awareness (BE ~$879M, IREN ~$401M, CORZ ~$389M, CLSK +$90.5M), D.E. Shaw (IREN +$687M, BE +$605M), Appaloosa (VST +114%), Druckenmiller (BE new)", signal: "Aschenbrenner's thesis is the purest expression: AI will consume all available electricity, and Bitcoin miners already have the grid connections. BE, CORZ, APLD, IREN, CLSK, RIOT are all 'power infrastructure repurposed as AI compute.' D.E. Shaw independently reached the same conclusion. This is the fastest-growing cross-filer theme in the cohort." },
  { sector: "Value Working vs. Growth Compression", tickers: "GRBK, NBR, MOH, LULU, QSR, CROX", buyers: "Greenlight (+6.5% Q1), Miller Deep Value (+8.39% Q1), Baupost, Scion (MOH, LULU)", signal: "S&P 500 returned -4.4% in Q1 2026. Value managers dramatically outperformed. When the market sells growth on macro uncertainty, concentrated value investors with pre-identified catalysts generate the best risk-adjusted returns. Q1 2026 may mark the inflection point where value leadership persists." },
  { sector: "China De-Risking (Broad Cohort)", tickers: "BABA, PDD, JD, FXI", buyers: "Counter-thesis: Himalaya (PDD at 14.6% unchanged)", signal: "Appaloosa (-33% BABA), D.E. Shaw (-$1.2B BABA), Scion (full China tech exit). The tariff environment is accelerating China position exits. Only Himalaya Capital (Li Lu) maintains meaningful China conviction — PDD unchanged at 14.6%. When all but one of 20 filers is exiting China, the contrarian setup for a re-rating is building." },
  { sector: "Airlines: Near-Total Institutional Exit", tickers: "AAL, UAL, DAL", buyers: "Against consensus: Berkshire (DAL new — but buying the quality airline, not the weak one)", signal: "Appaloosa fully exited AAL and UAL in Q1 ahead of tariff-driven demand uncertainty. The cross-filer consensus: airlines are exposed to fuel costs, demand recession risk, and tariff disruption. Berkshire's DAL entry (buying Delta specifically — higher-margin, international-capable) is the only contrarian airline bet, and it distinguishes quality from commodity carriers." },
];

const exits = [
  { stock: "V (Visa) + MA (Mastercard)", funds: "Berkshire Hathaway — ~$5.19B combined, Todd Combs portfolio cleanup" },
  { stock: "UNH (UnitedHealth)", funds: "Berkshire Hathaway — ~$1.66B, healthcare uncertainty" },
  { stock: "AMZN (Amazon)", funds: "Berkshire Hathaway — ~$525M (paradoxically, Baupost added +$490M, Appaloosa +98%)" },
  { stock: "HLT (Hilton Hotels)", funds: "Pershing Square — full exit after successful multi-year hold" },
  { stock: "GOOGL (Alphabet)", funds: "Pershing Square — sold ~95%, rotating capital into MSFT" },
  { stock: "AAL + UAL + DAL (All Airlines)", funds: "Appaloosa — full exit of all three airline positions (same quarter Berkshire bought DAL)" },
  { stock: "WDAY (Workday)", funds: "Tiger Global + Bridgewater — full exits, AI-native HR software alternatives threat" },
  { stock: "CRM (Salesforce)", funds: "Bridgewater — full exit, enterprise software pivot away from legacy players" },
  { stock: "BABA + BIDU + JD (Chinese tech)", funds: "Scion (Burry) — complete China tech liquidation including Baidu, geopolitical de-risk" },
  { stock: "NVDA (Nvidia) — major cuts", funds: "Third Point −94%, Druckenmiller −completed exit, Gotham −$24M, Citadel reduced — DeepSeek efficiency concerns" },
  { stock: "MSFT (Microsoft) — exited/cut", funds: "Third Point full exit, Appaloosa −82%, Citadel −$909M — rotating away from legacy cloud at premium multiples" },
  { stock: "PCG (PG&E)", funds: "Third Point — full exit, ended multi-year activist engagement" },
  { stock: "SWX (Southwest Gas)", funds: "Icahn Capital — full exit of post-activist-win holding" },
  { stock: "WBD (Warner Bros. Discovery)", funds: "Greenlight Capital — exited legacy media position" },
  { stock: "C (Citigroup)", funds: "Berkshire (~$1.12B) + Druckenmiller — banking exposure reduction" },
  { stock: "Lebanese sovereign debt", funds: "Greenlight Capital — 66% IRR realized over 1-year hold (standout exotic trade)" },
  { stock: "GOOGL (Alphabet) — exited/cut", funds: "Pershing Square −95%, Druckenmiller full exit — paradoxically while Viking/Berkshire/Himalaya were buying" },
  { stock: "CMG + CP exits", funds: "Pershing Square — full exits of Chipotle and Canadian Pacific" },
];

// ─── ANALYSIS DATA ────────────────────────────────────────────────────────────

const macroNarrative = {
  quarter: "Q1 2026",
  headline: "The Alphabet Convergence, Value's Vindication, and the First AI Chip Defectors",
  paragraphs: [
    {
      title: "The Platform Reshuffling",
      body: "Q1 2026 marks the first major reshuffling of the AI consensus that dominated Q3–Q4 2025. The story is no longer simply 'buy AI infrastructure' — it is 'buy the right layer of AI at the right price.' Microsoft and Alphabet have emerged as the cross-filer 'safe harbor' AI plays: Pershing Square deployed $2.09B into MSFT at 21x forward earnings; Viking initiated GOOGL and added MSFT +32%; Berkshire tripled its Alphabet stake; Himalaya holds 44% in Alphabet combined; D.E. Shaw added MSFT +$1.9B. The common thread: these platforms generate AI revenue today, have durable competitive moats, and trade at discounts to their historical multiples. Meanwhile, pure-play AI chip bets are fracturing — Third Point cut Nvidia -94%, Druckenmiller fully exited GOOGL/AMZN, Burry bought Nvidia puts, and Gotham's quantitative screens began trimming on ROIC deterioration.",
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
      body: "Four of twenty filers now carry explicit macro protection disclosed in 13F: Soros (SPY puts + energy puts), Burry ($85M in NVDA and PLTR puts), Greenlight (gold — drove Q1 outperformance), and Aschenbrenner ($8.46B in chip-sector puts — by far the largest bearish book in the cohort). This is a material expansion from prior quarters. Dawn Fitzpatrick's March 2026 warning of 'a painful 18–24 months' for markets crystallizes the concern: the tariff shock (announced early April, post Q1 reporting period), sovereign debt trajectories, and AI capex disappointment risk are all visible to sophisticated managers. The fact that this level of hedging is visible in 13F filings — which only show long equity positions — means the true macro protection is even larger than what is disclosed.",
    },
  ],
  keySignals: [
    { label: "Cross-Filer Consensus Stock (Q1 2026)", value: "MSFT and GOOGL — independently added by 6+ filers each, bought as the 'undervalued AI platform' trade" },
    { label: "Most Surprising Move", value: "Berkshire tripled Alphabet (GOOGL +204%) — Abel's first major independent stamp on the portfolio" },
    { label: "Biggest Conviction Flip", value: "Druckenmiller: cut NVDA -70% after calling it 'highest-conviction theme ever' in Q4 2025 — DeepSeek changed his view" },
    { label: "Value Beat in Q1", value: "Greenlight +6.5%, Miller Deep Value +8.39% vs. S&P 500 -4.4% — value managers dominated" },
    { label: "Emerging AI Power Consensus", value: "Appaloosa +114% Vistra, D.E. Shaw +$687M IREN, +$605M Bloom Energy — AI power demand is Q2-Q3 2026's next crowded trade" },
    { label: "Key Risk Signal", value: "5 of 20 filers have explicit macro hedges (SPY puts, NVDA puts, chip-sector puts, gold) — highest defensive positioning in the cohort's history" },
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

function isNegative(str) { return str && (str.startsWith("−") || str.startsWith("-")); }

function findFilersForTicker(ticker, filers) {
  if (!ticker) return [];
  const escaped = ticker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\b${escaped}\\b`);
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
    const m = item.label.match(/^[~≈]?\s*(\d+)\s+new\s+positions/i);
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

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const T = {
  bg:        "#07090f",
  card:      "#0d1117",
  cardAlt:   "#111827",
  border:    "#1e2737",
  border2:   "#2d3748",
  t1:        "#e6edf3",
  t2:        "#8b949e",
  t3:        "#6e7681",
  buy:       "#3fb950",
  buyBg:     "#3fb95018",
  sell:      "#f85149",
  sellBg:    "#f8514918",
  trim:      "#d29922",
  trimBg:    "#d2992218",
  accent:    "#58a6ff",
  accentBg:  "#58a6ff18",
  purple:    "#bc8cff",
  purpleBg:  "#bc8cff18",
  gold:      "#e3b341",
};

function Chip({ value, type }) {
  const colors = {
    pct:    isNegative(value) ? { bg: T.trimBg,   text: T.trim   } : { bg: T.accentBg, text: T.accent  },
    val:    isNegative(value) ? { bg: T.sellBg,   text: T.sell   } : { bg: T.buyBg,    text: T.buy     },
    weight: { bg: T.purpleBg, text: T.purple },
  };
  const { bg, text } = colors[type] || colors.weight;
  return (
    <span style={{
      display: "inline-block", background: bg, color: text,
      borderRadius: 4, fontSize: 10, fontWeight: 700,
      padding: "2px 7px", marginLeft: 5, whiteSpace: "nowrap", flexShrink: 0,
      border: `1px solid ${text}30`, letterSpacing: 0.3,
    }}>{value}</span>
  );
}

function Section({ label, color, prefix, items, query, onTickerClick }) {
  if (!items || items.length === 0) return null;
  const itemMatches = (item) => matches(item.label, query) || (item.note && matches(item.note, query));
  const filtered = query ? items.filter(itemMatches) : items;
  if (query && filtered.length === 0) return null;
  const muted = prefix === "↓" || prefix === "✕";
  const pc = { "+": T.buy, "↑": T.accent, "↓": T.trim, "✕": T.sell }[prefix] || T.t3;
  const pcBg = { "+": T.buyBg, "↑": T.accentBg, "↓": T.trimBg, "✕": T.sellBg }[prefix] || T.border;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
        <span style={{ background: pcBg, color: pc, border: `1px solid ${pc}35`, borderRadius: 4, padding: "1px 7px", fontSize: 10, fontWeight: 700, letterSpacing: 0.3 }}>{prefix}</span>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: pc }}>{label}</span>
      </div>
      {filtered.map((item, i) => {
        const ticker = extractTicker(item.label);
        const clickable = ticker && onTickerClick;
        return (
          <div
            key={i}
            onClick={clickable ? (e) => { e.stopPropagation(); onTickerClick(ticker); } : undefined}
            style={{
              display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2,
              fontSize: 13, color: muted ? T.t3 : T.t2,
              padding: "4px 6px", lineHeight: 1.55,
              background: query && itemMatches(item) ? `${T.accent}12` : "transparent",
              borderRadius: 5, cursor: clickable ? "pointer" : "default",
              borderLeft: "2px solid transparent",
              transition: "background 0.12s, border-color 0.12s, color 0.12s",
            }}
            onMouseEnter={clickable ? (e) => { e.currentTarget.style.background = T.accentBg; e.currentTarget.style.borderLeftColor = T.accent; e.currentTarget.style.color = T.t1; } : undefined}
            onMouseLeave={clickable ? (e) => { e.currentTarget.style.background = query && itemMatches(item) ? `${T.accent}12` : "transparent"; e.currentTarget.style.borderLeftColor = "transparent"; e.currentTarget.style.color = muted ? T.t3 : T.t2; } : undefined}
          >
            <span style={{ flex: 1 }}>{highlight(item.label, query)}</span>
            {item.pct    && <Chip value={item.pct}    type="pct" />}
            {item.val    && <Chip value={item.val}    type="val" />}
            {item.weight && <Chip value={item.weight} type="weight" />}
            {item.note   && <span style={{ fontSize: 11, color: T.t3, marginLeft: 4 }}>· {item.note}</span>}
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
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: T.t3, marginBottom: 7 }}>Top Holdings by Weight</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {holdings.map((h, i) => (
          <div
            key={i}
            onClick={onTickerClick ? (e) => { e.stopPropagation(); onTickerClick(h.ticker); } : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: T.cardAlt,
              border: `1px solid ${T.border}`,
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 12,
              cursor: onTickerClick ? "pointer" : "default",
              transition: "background 0.15s, border-color 0.15s",
            }}
            onMouseEnter={onTickerClick ? (e) => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.borderColor = `${color}60`; } : undefined}
            onMouseLeave={onTickerClick ? (e) => { e.currentTarget.style.background = T.cardAlt; e.currentTarget.style.borderColor = T.border; } : undefined}
          >
            <span style={{ fontWeight: 700, color: T.t1 }}>{h.ticker}</span>
            <span style={{
              background: `${color}25`,
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
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.t2, padding: "3px 0 3px 14px", flexWrap: "wrap", lineHeight: 1.5 }}>
      <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color, width: 68, flexShrink: 0, letterSpacing: 0.5 }}>{prefix} {label}</span>
      <span style={{ flex: 1, minWidth: 0, color: T.t1 }}>{item.label}</span>
      {item.pct    && <Chip value={item.pct}    type="pct" />}
      {item.val    && <Chip value={item.val}    type="val" />}
      {item.weight && <Chip value={item.weight} type="weight" />}
      {item.note   && <span style={{ fontSize: 11, color: T.t3 }}>· {item.note}</span>}
    </div>
  );
}

function TickerModal({ ticker, filers, onClose }) {
  const [copied, setCopied] = useState(false);
  const hits = findFilersForTicker(ticker, filers);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const summary = {
    newBuys:     hits.filter(h => h.newBuys.length).length,
    increased:   hits.filter(h => h.increased.length).length,
    reduced:     hits.filter(h => h.reduced.length).length,
    exits:       hits.filter(h => h.exits.length).length,
    topHoldings: hits.filter(h => h.topHolding).length,
  };
  const netScore = hits.reduce((acc, h) => acc + h.newBuys.length * 3 + h.increased.length * 2 - h.reduced.length * 2 - h.exits.length * 3, 0);
  const scoreColor = netScore > 0 ? T.buy : netScore < 0 ? T.sell : T.t3;
  const scoreLabel = netScore > 0 ? "Net Buy" : netScore < 0 ? "Net Sell" : "Mixed";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
        zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: 16, overflowY: "auto", backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.card, borderRadius: 14, maxWidth: 640, width: "100%",
          maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column",
          marginTop: 24, border: `1px solid ${T.border}`,
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(88,166,255,0.08)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "18px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: T.t3, marginBottom: 4 }}>Ticker Deep Dive</div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 30, fontWeight: 900, color: T.accent, lineHeight: 1 }}>{ticker}</div>
            <div style={{ fontSize: 12, color: T.t2, marginTop: 5, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span>{hits.length} of {filers.length} filers</span>
              {netScore !== 0 && (
                <>
                  <span style={{ color: T.border2 }}>·</span>
                  <span style={{ color: scoreColor, fontWeight: 700, background: `${scoreColor}18`, padding: "1px 7px", borderRadius: 4, border: `1px solid ${scoreColor}30`, fontSize: 11 }}>
                    {scoreLabel} {netScore > 0 ? "+" : ""}{netScore}
                  </span>
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
                background: copied ? T.buyBg : T.cardAlt,
                border: `1px solid ${copied ? T.buy : T.border}`,
                borderRadius: 6, padding: "0 10px", height: 32, fontSize: 11, fontWeight: 700,
                cursor: "pointer", color: copied ? T.buy : T.t2,
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}
            >{copied ? "✓ Copied!" : "⎘ Share"}</button>
            <button
              onClick={onClose}
              style={{
                background: T.cardAlt, border: `1px solid ${T.border}`, borderRadius: "50%",
                width: 32, height: 32, fontSize: 18, cursor: "pointer", color: T.t2,
                flexShrink: 0, lineHeight: 1, transition: "border-color 0.15s",
              }}
            >×</button>
          </div>
        </div>

        {/* Summary pills */}
        {hits.length > 0 && (
          <div style={{ padding: "10px 20px", background: T.cardAlt, borderBottom: `1px solid ${T.border}`, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {summary.newBuys > 0     && <span style={{ fontSize: 11, fontWeight: 700, background: T.buyBg,    color: T.buy,    border: `1px solid ${T.buy}30`,    borderRadius: 4, padding: "3px 8px" }}>+{summary.newBuys} new buy{summary.newBuys > 1 ? "s" : ""}</span>}
            {summary.increased > 0   && <span style={{ fontSize: 11, fontWeight: 700, background: T.accentBg, color: T.accent, border: `1px solid ${T.accent}30`,  borderRadius: 4, padding: "3px 8px" }}>↑{summary.increased} added</span>}
            {summary.reduced > 0     && <span style={{ fontSize: 11, fontWeight: 700, background: T.trimBg,   color: T.trim,   border: `1px solid ${T.trim}30`,    borderRadius: 4, padding: "3px 8px" }}>↓{summary.reduced} trimmed</span>}
            {summary.exits > 0       && <span style={{ fontSize: 11, fontWeight: 700, background: T.sellBg,   color: T.sell,   border: `1px solid ${T.sell}30`,    borderRadius: 4, padding: "3px 8px" }}>✕{summary.exits} exited</span>}
            {summary.topHoldings > 0 && <span style={{ fontSize: 11, fontWeight: 700, background: T.purpleBg, color: T.purple, border: `1px solid ${T.purple}30`,  borderRadius: 4, padding: "3px 8px" }}>★{summary.topHoldings} top-weight</span>}
          </div>
        )}

        {/* Filer list */}
        <div style={{ overflowY: "auto", padding: "8px 0", flex: 1 }}>
          {hits.length === 0 && (
            <div style={{ padding: "48px 20px", textAlign: "center", color: T.t3, fontSize: 13 }}>
              No filers have notable activity in <strong style={{ color: T.t2 }}>{ticker}</strong> this quarter.
            </div>
          )}
          {hits.map(({ filer, newBuys, increased, reduced, exits, topHolding }, i) => (
            <div
              key={i}
              style={{
                padding: "12px 20px",
                borderBottom: i < hits.length - 1 ? `1px solid ${T.border}` : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                <div style={{ width: 4, height: 20, background: filer.color, borderRadius: 2, boxShadow: `0 0 8px ${filer.color}80` }} />
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 14, color: T.t1 }}>{filer.name}</div>
                <span style={{
                  fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6,
                  padding: "1px 5px", borderRadius: 3,
                  background: filer.type === "individual" ? T.trimBg : T.buyBg,
                  color: filer.type === "individual" ? T.trim : T.buy,
                  border: `1px solid ${filer.type === "individual" ? T.trim : T.buy}30`,
                }}>{filer.type === "individual" ? "Individual" : "Fund"}</span>
                <span style={{ fontSize: 11, color: T.t3 }}>· {filer.manager}</span>
              </div>
              {topHolding && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 12, margin: "4px 0 6px 14px",
                  background: T.purpleBg, color: T.purple,
                  padding: "3px 10px", borderRadius: 4, fontWeight: 700,
                  border: `1px solid ${T.purple}30`,
                }}>
                  ★ Top holding · {topHolding.weight} of portfolio
                </div>
              )}
              {newBuys.map((item, j)   => <ModalRow key={`nb-${j}`} item={item} label="New buy"   color={T.buy}    prefix="+" />)}
              {increased.map((item, j) => <ModalRow key={`in-${j}`} item={item} label="Increased" color={T.accent} prefix="↑" />)}
              {reduced.map((item, j)   => <ModalRow key={`rd-${j}`} item={item} label="Reduced"   color={T.trim}   prefix="↓" />)}
              {exits.map((item, j)     => <ModalRow key={`ex-${j}`} item={item} label="Exited"    color={T.sell}   prefix="✕" />)}
            </div>
          ))}
        </div>

        <div style={{ padding: "10px 20px", borderTop: `1px solid ${T.border}`, background: T.cardAlt, fontSize: 10, color: T.t3, lineHeight: 1.5 }}>
          Auto-matched across all filer sections and top holdings. Ticker matching uses whole-word boundary so GOOG and GOOGL are distinct.
        </div>
      </div>
    </div>
  );
}

function AnalysisTab({ filers, onTickerClick }) {
  const conviction = computeConviction(filers);
  const [showAllConviction, setShowAllConviction] = useState(false);
  const allBuys  = conviction.filter(e => e.score > 0);
  const allSells = conviction.filter(e => e.score < 0).reverse();
  const topBuys  = showAllConviction ? allBuys  : allBuys.slice(0, 9);
  const topSells = showAllConviction ? allSells : allSells.slice(0, 5);
  const [openDiv, setOpenDiv] = useState(null);

  const HeatRow = ({ e, positive }) => {
    const color = positive ? T.buy : T.sell;
    const glowColor = positive ? "#3fb95040" : "#f8514940";
    return (
      <div
        onClick={() => onTickerClick?.(e.ticker)}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "5px 8px", borderRadius: 6, cursor: "pointer", marginBottom: 4,
          transition: "background 0.15s",
        }}
        onMouseEnter={(ev) => ev.currentTarget.style.background = `${color}12`}
        onMouseLeave={(ev) => ev.currentTarget.style.background = "transparent"}
      >
        <div style={{ width: 46, fontWeight: 700, fontSize: 12, color: T.t1, flexShrink: 0 }}>{e.ticker}</div>
        <div style={{ flex: 1, height: 10, background: T.border, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${e.pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}aa)`, borderRadius: 4, transition: "width 0.4s", boxShadow: `0 0 6px ${glowColor}` }} />
        </div>
        <div style={{ width: 28, textAlign: "right", fontSize: 11, fontWeight: 700, color, flexShrink: 0 }}>
          {positive ? "+" : ""}{e.score}
        </div>
        <div style={{ fontSize: 11, color: T.t3, flexShrink: 0, width: 60, textAlign: "right" }}>
          {positive ? `${e.buyers?.length || 0} buyers` : `${e.sellers?.length || 0} sellers`}
        </div>
        <div style={{ fontSize: 11, color: T.border2, flexShrink: 0 }}>›</div>
      </div>
    );
  };

  return (
    <div>
      {/* ── MACRO NARRATIVE ─────────────────────────────────────── */}
      <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ background: "linear-gradient(135deg, #0d1830 0%, #111827 60%, #0d1117 100%)", padding: "20px 20px", borderBottom: `1px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 80% 50%, #58a6ff10, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: T.t3, marginBottom: 6, position: "relative" }}>
            {macroNarrative.quarter} · Macro Synthesis
          </div>
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, fontWeight: 900, color: T.t1, lineHeight: 1.25, position: "relative" }}>
            {macroNarrative.headline}
          </div>
        </div>

        <div style={{ padding: "16px 20px" }}>
          {macroNarrative.paragraphs.map((p, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: T.accent, marginBottom: 5 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: T.t2, lineHeight: 1.7 }}>{p.body}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "0 20px 16px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: T.t3, marginBottom: 10 }}>Key Signals</div>
          {macroNarrative.keySignals.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.buy, marginTop: 6, flexShrink: 0, boxShadow: `0 0 6px ${T.buy}` }} />
              <div>
                <span style={{ fontWeight: 700, color: T.t1 }}>{s.label}:</span>{" "}
                <span style={{ color: T.t2 }}>{s.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONVICTION HEATMAP ──────────────────────────────────── */}
      <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.border}`, padding: "16px 20px", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 17, color: T.t1, marginBottom: 4 }}>Conviction Heatmap</div>
        <div style={{ fontSize: 12, color: T.t3, marginBottom: 16 }}>Auto-scored across all {filers.length} filers. Tap any ticker for a full deep-dive. New buy = +3 · Increased = +2 · Reduced = −2 · Exited = −3</div>

        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: T.buy, marginBottom: 8 }}>Strong Buy Consensus</div>
        {topBuys.map((e, i) => <HeatRow key={i} e={e} positive={true} />)}

        <div style={{ borderTop: `1px solid ${T.border}`, margin: "14px 0" }} />
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: T.sell, marginBottom: 8 }}>Sell / Exit Consensus</div>
        {topSells.map((e, i) => <HeatRow key={i} e={e} positive={false} />)}

        {(allBuys.length > 9 || allSells.length > 5) && (
          <button
            onClick={() => setShowAllConviction(v => !v)}
            style={{
              marginTop: 12, width: "100%", padding: "9px 0",
              border: `1px dashed ${T.border2}`, borderRadius: 6, background: "transparent",
              fontSize: 12, fontWeight: 600, color: T.t3, cursor: "pointer",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = T.t1; e.currentTarget.style.borderColor = T.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = T.t3; e.currentTarget.style.borderColor = T.border2; }}
          >
            {showAllConviction
              ? "Show top tickers only"
              : `Show all ${allBuys.length + allSells.length} scored tickers`}
          </button>
        )}
      </div>

      {/* ── DIVERGENCE RADAR ────────────────────────────────────── */}
      <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.border}`, padding: "16px 20px", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 17, color: T.t1, marginBottom: 4 }}>Divergence Radar</div>
        <div style={{ fontSize: 12, color: T.t3, marginBottom: 14 }}>Where top filers are making opposite bets — and why each side may be right.</div>

        {divergences.map((d, i) => {
          const isOpen = openDiv === i;
          const singleTicker = /^[A-Z]{1,6}$/.test(d.ticker) ? d.ticker : null;
          return (
            <div key={i} style={{ border: `1px solid ${T.border}`, borderRadius: 8, marginBottom: 8, overflow: "hidden", transition: "border-color 0.15s" }}>
              <div
                onClick={() => setOpenDiv(isOpen ? null : i)}
                style={{ padding: "12px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none", background: isOpen ? T.cardAlt : "transparent", transition: "background 0.15s" }}
              >
                <div>
                  <span
                    onClick={singleTicker ? (e) => { e.stopPropagation(); onTickerClick?.(singleTicker); } : undefined}
                    style={{
                      fontWeight: 800, fontSize: 15, color: T.t1,
                      cursor: singleTicker ? "pointer" : "default",
                      textDecoration: singleTicker ? "underline" : "none",
                      textDecorationColor: T.border2,
                      textDecorationThickness: 1,
                      textUnderlineOffset: 3,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={singleTicker ? (e) => { e.currentTarget.style.color = T.accent; } : undefined}
                    onMouseLeave={singleTicker ? (e) => { e.currentTarget.style.color = T.t1; } : undefined}
                  >{d.ticker}</span>
                  <span style={{ fontSize: 12, color: T.t3, marginLeft: 8 }}>{d.subtitle}</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, background: T.buyBg, color: T.buy, border: `1px solid ${T.buy}30`, padding: "2px 7px", borderRadius: 4 }}>{d.bulls.filers.length} bulls</span>
                  <span style={{ fontSize: 10, fontWeight: 700, background: T.sellBg, color: T.sell, border: `1px solid ${T.sell}30`, padding: "2px 7px", borderRadius: 4 }}>{d.bears.filers.length} bears</span>
                  <span style={{ fontSize: 14, color: T.border2, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                </div>
              </div>
              {isOpen && (
                <div style={{ padding: "0 14px 14px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, borderTop: `1px solid ${T.border}` }}>
                  <div style={{ background: T.buyBg, borderRadius: 8, padding: "12px", border: `1px solid ${T.buy}20`, marginTop: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: T.buy, marginBottom: 6 }}>Bull Case</div>
                    <div style={{ marginBottom: 8, lineHeight: 1.4 }}>
                      {d.bulls.filers.map((f, j) => <div key={j} style={{ fontSize: 11, fontWeight: 600, color: T.buy }}>· {f}</div>)}
                    </div>
                    <div style={{ fontSize: 12, color: T.t2, lineHeight: 1.65 }}>{d.bulls.thesis}</div>
                  </div>
                  <div style={{ background: T.sellBg, borderRadius: 8, padding: "12px", border: `1px solid ${T.sell}20`, marginTop: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: T.sell, marginBottom: 6 }}>Bear Case</div>
                    <div style={{ marginBottom: 8, lineHeight: 1.4 }}>
                      {d.bears.filers.map((f, j) => <div key={j} style={{ fontSize: 11, fontWeight: 600, color: T.sell }}>· {f}</div>)}
                    </div>
                    <div style={{ fontSize: 12, color: T.t2, lineHeight: 1.65 }}>{d.bears.thesis}</div>
                  </div>
                  <div style={{ gridColumn: "1 / -1", background: `${T.gold}12`, borderRadius: 8, padding: "10px 12px", fontSize: 12, color: T.t2, lineHeight: 1.65, border: `1px solid ${T.gold}25`, marginTop: 0 }}>
                    <span style={{ fontWeight: 700, color: T.gold }}>Verdict: </span>{d.verdict}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 11, color: T.t3, lineHeight: 1.6, padding: "0 4px" }}>
        Analysis reflects Q1 2026 13F filings only. Conviction scores are mechanical — they do not account for position sizing, fund strategy, or non-disclosed short positions. This is not investment advice.
      </div>
    </div>
  );
}

function FundCard({ fund, isOpen, onToggle, query, onTickerClick, showQ4 }) {
  const q4 = q4Data[fund.name] || null;
  const holdingsDelta = q4 ? parseHoldings(fund.holdings) - q4.holdings : null;
  const aumDelta = q4 ? formatAumDelta(fund.aum, q4.aum) : null;
  const nameMatch = query && (matches(fund.name, query) || matches(fund.manager, query));
  const sectionQuery = nameMatch ? "" : query;

  return (
    <div style={{
      background: T.card,
      borderRadius: 12,
      marginBottom: 10,
      border: `1px solid ${query ? `${fund.color}40` : T.border}`,
      overflow: "hidden",
      boxShadow: isOpen ? `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px ${fund.color}20` : "0 2px 8px rgba(0,0,0,0.2)",
      transition: "box-shadow 0.2s, border-color 0.2s",
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
          background: isOpen ? `linear-gradient(135deg, ${fund.color}10, transparent)` : "transparent",
          transition: "background 0.2s",
        }}
      >
        <div style={{
          width: 4,
          height: 40,
          borderRadius: 2,
          background: fund.color,
          flexShrink: 0,
          boxShadow: isOpen ? `0 0 12px ${fund.color}80` : "none",
          transition: "box-shadow 0.2s",
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 16, color: T.t1 }}>{fund.name}</span>
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              padding: "1px 6px",
              borderRadius: 4,
              background: fund.type === "individual" ? T.trimBg : T.buyBg,
              color: fund.type === "individual" ? T.trim : T.buy,
              border: `1px solid ${fund.type === "individual" ? T.trim : T.buy}30`,
            }}>{fund.type === "individual" ? "Individual" : "Fund"}</span>
          </div>
          <div style={{ fontSize: 12, color: T.t3, marginTop: 2 }}>{fund.manager} · {fund.aum} · {fund.holdings} holdings</div>
          {!isOpen && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 }}>
              {fund.newBuys.length > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, background: T.buyBg, color: T.buy, border: `1px solid ${T.buy}30`, borderRadius: 3, padding: "1px 5px" }}>
                  +{fund.newBuys.length} new
                </span>
              )}
              {fund.increased.length > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, background: T.accentBg, color: T.accent, border: `1px solid ${T.accent}30`, borderRadius: 3, padding: "1px 5px" }}>
                  ↑{fund.increased.length} added
                </span>
              )}
              {fund.reduced.length > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, background: T.trimBg, color: T.trim, border: `1px solid ${T.trim}30`, borderRadius: 3, padding: "1px 5px" }}>
                  ↓{fund.reduced.length} trimmed
                </span>
              )}
              {fund.exits.length > 0 && (
                <span style={{ fontSize: 10, fontWeight: 700, background: T.sellBg, color: T.sell, border: `1px solid ${T.sell}30`, borderRadius: 3, padding: "1px 5px" }}>
                  ✕{fund.exits.length} exited
                </span>
              )}
            </div>
          )}
        </div>
        <div style={{
          fontSize: 16,
          color: T.t3,
          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.2s",
        }}>▾</div>
      </div>

      {showQ4 && (
        <div style={{
          padding: "9px 16px 9px 26px",
          background: T.cardAlt,
          borderTop: `1px solid ${T.border}`,
          fontSize: 11,
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: T.t3, marginBottom: 5 }}>
            Q4 2025 → Q1 2026
          </div>
          {!q4 ? (
            <span style={{ color: T.t3, fontStyle: "italic" }}>First 13F filing — no prior quarter data</span>
          ) : (
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <div>
                <span style={{ color: T.t3 }}>AUM </span>
                <span style={{ fontWeight: 700, color: T.t2 }}>{q4.aum}</span>
                <span style={{ color: T.border2 }}> → </span>
                <span style={{ fontWeight: 700, color: T.t1 }}>{fund.aum}</span>
                {aumDelta && (
                  <span style={{
                    marginLeft: 5, fontWeight: 700, fontSize: 10,
                    color: aumDelta.positive ? T.buy : T.sell,
                    background: aumDelta.positive ? T.buyBg : T.sellBg,
                    border: `1px solid ${aumDelta.positive ? T.buy : T.sell}30`,
                    padding: "1px 5px", borderRadius: 3,
                  }}>{aumDelta.label}</span>
                )}
              </div>
              <div>
                <span style={{ color: T.t3 }}>Holdings </span>
                <span style={{ fontWeight: 700, color: T.t2 }}>{q4.holdings.toLocaleString()}</span>
                <span style={{ color: T.border2 }}> → </span>
                <span style={{ fontWeight: 700, color: T.t1 }}>{typeof fund.holdings === "number" ? fund.holdings.toLocaleString() : fund.holdings}</span>
                {holdingsDelta !== 0 && (
                  <span style={{
                    marginLeft: 5, fontWeight: 700, fontSize: 10,
                    color: holdingsDelta > 0 ? T.accent : T.sell,
                    background: holdingsDelta > 0 ? T.accentBg : T.sellBg,
                    border: `1px solid ${holdingsDelta > 0 ? T.accent : T.sell}30`,
                    padding: "1px 5px", borderRadius: 3,
                  }}>{holdingsDelta > 0 ? `+${holdingsDelta.toLocaleString()}` : holdingsDelta.toLocaleString()}</span>
                )}
              </div>
              <div>
                <span style={{ color: T.t3 }}>Q1 activity </span>
                {fund.newBuys.length > 0 && <span style={{ color: T.buy, fontWeight: 700 }}>+{fund.newBuys.length} new</span>}
                {fund.exits.length > 0  && <span style={{ color: T.sell, fontWeight: 700 }}>{fund.newBuys.length ? " · " : ""}✕{fund.exits.length} exit{fund.exits.length > 1 ? "s" : ""}</span>}
                {fund.increased.length > 0 && <span style={{ color: T.accent, fontWeight: 700 }}>{(fund.newBuys.length || fund.exits.length) ? " · " : ""}↑{fund.increased.length}</span>}
                {fund.reduced.length > 0   && <span style={{ color: T.trim, fontWeight: 700 }}>{(fund.newBuys.length || fund.exits.length || fund.increased.length) ? " · " : ""}↓{fund.reduced.length}</span>}
              </div>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <div style={{ padding: "0 16px 16px 28px", borderTop: `1px solid ${fund.color}25` }}>
          <div style={{
            background: `${fund.color}0d`,
            borderLeft: `3px solid ${fund.color}`,
            padding: "10px 14px",
            borderRadius: "0 8px 8px 0",
            margin: "12px 0 14px",
            fontSize: 13,
            color: T.t2,
            lineHeight: 1.6,
            fontStyle: "italic",
          }}>
            {fund.theme}
          </div>

          <TopHoldings holdings={fund.topHoldings} color={fund.color} onTickerClick={onTickerClick} />
          <Section label="New Buys" color={T.buy} prefix="+" items={fund.newBuys} query={sectionQuery} onTickerClick={onTickerClick} />
          <Section label="Increased Positions" color={T.accent} prefix="↑" items={fund.increased} query={sectionQuery} onTickerClick={onTickerClick} />
          <Section label="Reduced / Trimmed" color={T.trim} prefix="↓" items={fund.reduced} query={sectionQuery} onTickerClick={onTickerClick} />
          <Section label="Full Exits" color={T.sell} prefix="✕" items={fund.exits} query={sectionQuery} onTickerClick={onTickerClick} />

          <div style={{ fontSize: 11, color: T.t3, borderTop: `1px solid ${T.border}`, paddingTop: 8, marginTop: 4 }}>
            Sources: {fund.sources}
          </div>
        </div>
      )}
    </div>
  );
}

function fundMatchesQuery(fund, query) {
  if (!query) return true;
  if (matches(fund.name, query) || matches(fund.manager, query)) return true;
  return [...fund.newBuys, ...fund.increased, ...fund.reduced, ...fund.exits]
    .some(item => matches(item.label, query) || (item.note && matches(item.note, query)));
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
  const [openFunds, setOpenFunds] = useState({ [allFilers[0].name]: true });
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
      background: T.bg,
      minHeight: "100vh",
      padding: "0 0 40px",
      maxWidth: 760,
      margin: "0 auto",
    }}>
      <style>{`
        body { background: ${T.bg}; margin: 0; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${T.card}; }
        ::-webkit-scrollbar-thumb { background: ${T.border2}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.t3}; }
        mark { background: ${T.accent}28; color: ${T.accent}; border-radius: 2px; padding: 0 1px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.35s ease both; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800;900&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(160deg, #0c1628 0%, #0d1117 55%, #07090f 100%)",
        padding: "36px 20px 28px",
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${T.border}`,
      }}>
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${T.border} 1px, transparent 1px), linear-gradient(90deg, ${T.border} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: 0.4,
        }} />
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, #58a6ff12, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: T.accentBg, border: `1px solid ${T.accent}35`,
            borderRadius: 20, padding: "4px 14px", marginBottom: 14,
            fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: T.accent,
          }}>
            Q1 2026 · 13F Filings
          </div>
          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 32, fontWeight: 900, color: T.t1, margin: "0 0 8px",
            lineHeight: 1.1, letterSpacing: -0.5,
          }}>
            13F Institutional Tracker
          </h1>
          <p style={{ fontSize: 13, color: T.t2, margin: "0 0 20px", lineHeight: 1.5 }}>
            SEC 13F filings from 20 elite hedge funds &amp; investors · Data as of Mar 31, 2026
          </p>

          {/* Stat pills */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {[
              { label: "20 Filers",          icon: "◈" },
              { label: "~$1.4T AUM tracked", icon: "◎" },
              { label: "Filed May 2026",      icon: "◷" },
              { label: "Long equity only",    icon: "⚑" },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 5,
                background: T.card, border: `1px solid ${T.border}`,
                borderRadius: 8, padding: "5px 11px",
                fontSize: 11, fontWeight: 600, color: T.t2,
              }}>
                <span style={{ color: T.accent, fontSize: 10 }}>{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>

      {/* ── SEARCH ────────────────────────────────────────────── */}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: T.t3, pointerEvents: "none" }}>⌕</span>
        <input
          type="text"
          placeholder="Search ticker or fund… e.g. NVDA, GOOGL, Druckenmiller"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "11px 36px 11px 34px",
            borderRadius: 10,
            border: `1px solid ${search ? T.accent : T.border}`,
            fontSize: 13,
            background: T.card,
            outline: "none",
            color: T.t1,
            transition: "border-color 0.2s",
          }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: T.t3, lineHeight: 1 }}
          >×</button>
        )}
      </div>

      {query && (
        <div style={{ fontSize: 12, color: T.t3, marginBottom: 8 }}>
          {visibleFilers.length === 0
            ? <span style={{ color: T.sell }}>No filers mention "{query}"</span>
            : <span><span style={{ color: T.accent, fontWeight: 700 }}>{visibleFilers.length}</span> filer{visibleFilers.length > 1 ? "s" : ""} mention "{query}"</span>}
        </div>
      )}

      {/* ── STICKY TAB BAR ────────────────────────────────────── */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: T.bg, padding: "8px 0 10px", marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 3, background: T.card, borderRadius: 10, padding: 3, border: `1px solid ${T.border}` }}>
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
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                background: tab === t.key ? T.accent : "transparent",
                color: tab === t.key ? "#fff" : T.t3,
                transition: "all 0.15s",
                letterSpacing: 0.2,
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {tab === "funds" && (
        <div className="fade-up">
          {/* Type filter + expand/collapse */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
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
                  border: `1px solid ${typeFilter === f.key ? T.accent : T.border}`,
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: typeFilter === f.key ? T.accent : "transparent",
                  color: typeFilter === f.key ? "#fff" : T.t2,
                  transition: "all 0.15s",
                }}
              >
                {f.label} <span style={{ opacity: 0.7, fontWeight: 400 }}>{f.count}</span>
              </button>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
              <button
                onClick={() => setOpenFunds(Object.fromEntries(allFilers.map(f => [f.name, true])))}
                style={{ padding: "4px 9px", border: `1px solid ${T.border}`, borderRadius: 14, fontSize: 11, fontWeight: 600, cursor: "pointer", background: "transparent", color: T.t3, transition: "color 0.15s" }}
              >Expand all</button>
              <button
                onClick={() => setOpenFunds({})}
                style={{ padding: "4px 9px", border: `1px solid ${T.border}`, borderRadius: 14, fontSize: 11, fontWeight: 600, cursor: "pointer", background: "transparent", color: T.t3, transition: "color 0.15s" }}
              >Collapse all</button>
            </div>
          </div>

          {/* Sort + Q4 toggle */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: T.t3, marginRight: 2 }}>Sort</span>
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                style={{
                  padding: "4px 10px",
                  border: `1px solid ${sortBy === opt.key ? T.accent : T.border}`,
                  borderRadius: 16,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: sortBy === opt.key ? `${T.accent}20` : "transparent",
                  color: sortBy === opt.key ? T.accent : T.t2,
                  transition: "all 0.15s",
                }}
              >{opt.label}</button>
            ))}
            <button
              onClick={() => setShowQ4(v => !v)}
              style={{
                marginLeft: "auto",
                padding: "4px 11px",
                border: `1px solid ${showQ4 ? T.purple : T.border}`,
                borderRadius: 16,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                background: showQ4 ? T.purpleBg : "transparent",
                color: showQ4 ? T.purple : T.t3,
                transition: "all 0.15s",
              }}
            >{showQ4 ? "◈ Q4 ON" : "◈ Q4 Compare"}</button>
          </div>

          {visibleFilers.map((fund) => (
            <FundCard key={fund.name} fund={fund} isOpen={query ? true : !!openFunds[fund.name]} onToggle={() => toggle(fund.name)} query={query} onTickerClick={openTicker} showQ4={showQ4} />
          ))}
        </div>
      )}

      {tab === "sectors" && (
        <div className="fade-up">
          <div style={{ fontSize: 13, color: T.t3, marginBottom: 14, lineHeight: 1.6 }}>
            Where multiple top filers are converging in Q1 2026:
          </div>
          {sectorThemes.map((s, i) => (
            <div key={i} style={{
              background: T.card,
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 10,
              border: `1px solid ${T.border}`,
              transition: "border-color 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = T.border2}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = T.border}
            >
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 15, color: T.t1 }}>{s.sector}</div>
              <div style={{ fontSize: 12, color: T.t2, marginTop: 6 }}>
                <span style={{ fontWeight: 700, color: T.t1 }}>Tickers:</span> {s.tickers}
              </div>
              <div style={{ fontSize: 12, color: T.t2, marginTop: 4 }}>
                <span style={{ fontWeight: 700, color: T.t1 }}>Buyers:</span> {s.buyers}
              </div>
              <div style={{ fontSize: 12, color: T.buy, marginTop: 8, fontWeight: 600, fontStyle: "italic" }}>
                {s.signal}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "exits" && (
        <div className="fade-up">
          <div style={{ fontSize: 13, color: T.t3, marginBottom: 14, lineHeight: 1.6 }}>
            Notable full exits and large reductions by major filers in Q1 2026:
          </div>
          {exits.map((e, i) => (
            <div key={i} style={{
              background: T.card,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 8,
              border: `1px solid ${T.border}`,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={(el) => el.currentTarget.style.borderColor = `${T.sell}40`}
              onMouseLeave={(el) => el.currentTarget.style.borderColor = T.border}
            >
              <div style={{ color: T.sell, fontWeight: 800, fontSize: 14, flexShrink: 0, marginTop: 2, background: T.sellBg, borderRadius: 4, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: T.t1 }}>{e.stock}</div>
                <div style={{ fontSize: 12, color: T.t3, marginTop: 2 }}>{e.funds}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "analysis" && (
        <div className="fade-up">
          <AnalysisTab filers={allFilers} onTickerClick={openTicker} />
        </div>
      )}

      {selectedTicker && (
        <TickerModal ticker={selectedTicker} filers={allFilers} onClose={closeTicker} />
      )}

      <div style={{
        marginTop: 28,
        padding: "14px 16px",
        background: T.card,
        borderRadius: 12,
        border: `1px solid ${T.border}`,
        fontSize: 11,
        color: T.t3,
        lineHeight: 1.7,
      }}>
        <strong style={{ color: T.t2 }}>Data sources:</strong> SEC EDGAR 13F-HR filings, Fortune, CNBC, Benzinga, Kiplinger, WhaleWisdom, Seeking Alpha, HedgeFollow, ValuSider, Insider Monkey, Fintel, TheStreet, Yahoo Finance, Quiver Quant, TipRanks, GuruFocus, HedgeFundAlpha, Institutional Investor, BusinessWire, Bloomberg. All data reflects positions as of Mar 31, 2026 with a 45-day disclosure lag. 13F filings only show long US equity positions — shorts, derivatives, and non-US holdings are excluded. This is not investment advice.
      </div>
      </div>
    </div>
  );
}

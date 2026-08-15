import { useState, useEffect } from "react";

// position entry helper: p(label, { pct, val, weight, note })
const p = (label, opts = {}) => ({ label, ...opts });

const funds = [
  {
    type: "fund",
    name: "Berkshire Hathaway",
    manager: "Greg Abel (CEO)",
    aum: "~$299.3B",
    quarter: "Q2 2026",
    filed: "Aug 14, 2026",
    holdings: 29,
    topHoldings: [
      { ticker: "AAPL",  weight: "~22.0%" },
      { ticker: "AXP",   weight: "~17.1%" },
      { ticker: "KO",    weight: "~10.9%" },
      { ticker: "GOOGL", weight: "~9.4%"  },
      { ticker: "BAC",   weight: "~9.2%"  },
      { ticker: "GOOG",  weight: "~top 10" },
      { ticker: "DAL",   weight: "~1.8%"  },
      { ticker: "OXY",   weight: "~4.0%"  },
    ],
    newBuys: [
      p("ULTA (Ulta Beauty)", { val: "~$267M", note: "~690K shares — re-entry after exiting in 2024" }),
      p("HEI (Heico)",        { val: "~$185M", note: "~1.0M shares — new aerospace/defense position" }),
      p("DHI (D.R. Horton)",  { note: "small toe-hold re-established (immaterial size)" }),
    ],
    increased: [
      p("GOOGL + GOOG (Alphabet)", { val: "+~$10B", pct: "+224%", note: "AI-infrastructure private placement — Alphabet now effectively the #3 holding by company" }),
      p("DAL (Delta Air Lines)",   { val: "+17.5M sh", note: "to ~57M shares (~$5.4B) — doubled down on the Q1 initiation" }),
      p("LEN (Lennar)",            { pct: "+30%", note: "housing/cyclical tilt" }),
      p("OXY (Occidental)",        { val: "+~7M sh" }),
      p("M (Macy's)",              { note: "more than doubled" }),
      p("NYT (New York Times)",    { pct: "+4%" }),
    ],
    reduced: [
      p("BAC (Bank of America)", { val: "−30M+ sh", note: "~8th consecutive quarter paring the bank" }),
      p("AAPL (Apple)",          { note: "modest continued trim — still ~22% of the book" }),
    ],
    exits: [
      p("STZ (Constellation Brands)", { note: "full exit — immaterial position initiated Q4 2024" }),
    ],
    theme: "Abel's second quarter is a regime shift. Berkshire flipped from a multi-year net seller to a ~$20B net equity buyer — the first net-buying quarter in over three years — plus ~$4.5B of buybacks, drawing cash down to $365.5B from a record $397.4B. The signature move is the aggressive Alphabet build (~$10B via an AI-infrastructure placement), vaulting Google to a top-3 holding and signaling comfort with mega-cap AI/compute exposure Buffett historically avoided. Abel paired that with a clear housing/cyclical tilt (Lennar, D.R. Horton, plus Delta and Occidental), funded partly by continued trimming of the legacy Apple and Bank of America mega-positions. The message: gradual diversification away from the concentrated Apple/financials core toward growth and real-economy cyclicals, while keeping the book concentrated (top 5 ≈ 66%).",
    sources: "SEC EDGAR, Berkshire Q2 2026 10-Q, CNBC, Benzinga, ValueSider, HoldingsChannel, Motley Fool",
    color: "#8B0000",
  },
  {
    type: "fund",
    name: "Bridgewater Associates",
    manager: "Nir Bar Dea (CEO)",
    aum: "$22.4B (13F) / ~$97B total",
    quarter: "Q1 2026",
    filed: "May 2026",
    pending: "Q2 2026 13F not yet indexed — Bridgewater files near the deadline; showing last confirmed quarter",
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
    aum: "~$875B (13F gross — options/notional-inflated)",
    quarter: "Q2 2026",
    filed: "Aug 14, 2026",
    holdings: "~13,000",
    topHoldings: [
      { ticker: "SPY",  weight: "~top 1" },
      { ticker: "QQQ",  weight: "~top 2" },
      { ticker: "NVDA", weight: "~top 3" },
      { ticker: "TSLA", weight: "~top 4" },
      { ticker: "GLD",  weight: "~top 5" },
    ],
    newBuys: [
      p("SpaceX (private)",     { note: "pre-IPO stake — frontier aerospace exposure" }),
      p("Cerebras Systems (private)", { note: "AI-chip hardware — pre-IPO" }),
      p("Quantinuum (private)", { note: "quantum computing — pre-IPO" }),
    ],
    increased: [
      p("SPY (S&P 500 ETF)", { val: "+~$4.3B" }),
      p("MSFT (Microsoft)",  { val: "+~$3.4B" }),
      p("MU (Micron)",       { val: "+~$2.8B", note: "AI memory demand" }),
      p("IVV (iShares S&P 500)", { val: "+~$2.5B" }),
    ],
    reduced: [
      p("TSLA (Tesla)",   { val: "−~$4.8B" }),
      p("NVDA (Nvidia)",  { val: "−~$3.0B", note: "trimming the crowded momentum leader" }),
      p("NFLX (Netflix)", { val: "−~$2.5B" }),
      p("QQQ (Nasdaq ETF)", { val: "−~$2.2B" }),
    ],
    exits: [p("Various smaller positions across the diversified book")],
    theme: "Citadel's 13F is dominated by index ETFs (SPY, QQQ, IVV, GLD) and options overlays reflecting its multi-strategy market-making and systematic books rather than concentrated stock-picking — the ~$875B gross and ~42% QoQ jump largely reflect derivatives notional and inventory, not directional conviction. The genuinely informative signal is the trio of new private-market stakes — SpaceX, Cerebras, and Quantinuum — pointing to deliberate exposure to frontier AI hardware, space, and quantum. Position-level flow shows Citadel rotating out of crowded momentum longs (TSLA, NVDA, NFLX) while adding broad-index and Micron/MSFT. Postscript: in late July Citadel bought the bulk of the imploding Situational Awareness book, and posted one of its best months in years.",
    sources: "SEC EDGAR, CryptoBriefing, HoldingsChannel, Insider Monkey, HedgeFollow, WSJ, Bloomberg",
    color: "#2c3e50",
  },
  {
    type: "fund",
    name: "Pershing Square",
    manager: "Bill Ackman",
    aum: "~$14.5B",
    quarter: "Q2 2026",
    filed: "Aug 14, 2026",
    holdings: 14,
    topHoldings: [
      { ticker: "MSFT", weight: "~12.4%" },
      { ticker: "UBER", weight: "~12.0%" },
      { ticker: "META", weight: "~top 3" },
      { ticker: "AMZN", weight: "~top 4" },
      { ticker: "BN",   weight: "~top 5" },
    ],
    newBuys: [
      p("NFLX (Netflix)",   { val: "3.15M sh (~4.9%)", note: "notable re-entry — the stock cost Ackman ~$400M in 2022" }),
      p("V (Visa)",         { note: "new — payments-network compounder, landed in top 10" }),
      p("MA (Mastercard)",  { note: "new — payments-network compounder, top 10" }),
      p("SPGI (S&P Global)", { note: "new — data/ratings duopoly, top 10" }),
    ],
    increased: [
      p("MSFT (Microsoft)", { note: "added — now the #1 position" }),
      p("META (Meta Platforms)", { note: "added — leaning further into mega-cap AI/advertising" }),
    ],
    reduced: [
      p("AMZN (Amazon)", { note: "trimmed after Q1 build" }),
    ],
    exits: [
      p("GOOGL + GOOG (Alphabet)", { note: "full exit of both classes — completes the rotation out of Google into MSFT/Meta" }),
    ],
    theme: "Q2 was Pershing Square's biggest portfolio overhaul in years — Ackman expanded from a hyper-concentrated 11 names to 14, adding four new wide-moat compounders that fit his template (Netflix, Visa, Mastercard, S&P Global). The headline move is completing the Alphabet exit while doubling down on Microsoft and Meta, a clean rotation within mega-cap tech toward the AI-cloud and advertising names he prefers. The surprising re-entry into Netflix — the stock that cost him ~$400M in 2022 — signals renewed conviction in streaming economics and pricing power. Net effect: a still-concentrated but noticeably more diversified book tilted toward payments networks, data/ratings, and mega-cap platforms. (Alcon and ICE, reported in some coverage, appear to be post-June-30 Q3 additions.)",
    sources: "SEC EDGAR, Benzinga, Insider Monkey, HoldingsChannel, ValueSider, Quiver Quant",
    color: "#6c3483",
  },
  {
    type: "fund",
    name: "Appaloosa Management",
    manager: "David Tepper",
    aum: "~$7.47B",
    quarter: "Q2 2026",
    filed: "Aug 14, 2026",
    holdings: 35,
    topHoldings: [
      { ticker: "AMZN", weight: "~15.95%" },
      { ticker: "MU",   weight: "~15.06%" },
      { ticker: "TSM",  weight: "~10.55%" },
      { ticker: "GOOG", weight: "~8.75%"  },
      { ticker: "UBER", weight: "~7.43%"  },
    ],
    newBuys: [
      p("6 new positions", { note: "concentrated in mega-cap tech/AI (full name list not yet fully indexed)" }),
    ],
    increased: [
      p("AMZN (Amazon)",    { val: "+~$470M", note: "biggest dollar add — now the #1 position at ~16%" }),
      p("TSM (TSMC)",       { pct: "+24.3%" }),
      p("UBER",             { pct: "+21.5%" }),
      p("GOOG (Alphabet)",  { pct: "+6.8%"  }),
      p("EWY (South Korea ETF)", { note: "small new EM/semiconductor-adjacent tilt" }),
    ],
    reduced: [
      p("MU (Micron)", { pct: "−41%", note: "booked gains after memory names soared ~+258% Mar–Jun — still the #2 position (~$1.13B)" }),
    ],
    exits: [
      p("SNDK (SanDisk)", { val: ">$400M", note: "full exit — striking, as it was a NEW buy just one quarter ago (Q1)" }),
      p("Kohl's, Occidental, Mosaic + others", { note: "12 full exits total (non-SanDisk names reported/less-verified)" }),
    ],
    theme: "Tepper rotated OUT of the AI-memory trade he had just championed and INTO Magnificent-Seven mega-caps. He exited SanDisk entirely (>$400M) and cut Micron ~41% after the memory names had roughly tripled Mar–Jun, effectively booking gains on the AI-memory theme near its peak. He simultaneously loaded up on Amazon, TSMC, Alphabet and Uber — shifting exposure from volatile memory hardware toward diversified mega-cap compute/platform names. Classic Tepper 'sell the parabola, concentrate in quality': the book stayed heavily AI-tilted but de-risked from single-commodity memory pricing. The tell of the quarter is fully dumping SanDisk one quarter after initiating it — a striking round-trip that, in hindsight, sidestepped the July memory-name drawdown.",
    sources: "SEC EDGAR, CNBC, ValueSider, HedgeFollow, TheStreet, TipRanks",
    color: "#b7950b",
  },
  {
    type: "fund",
    name: "Tiger Global Management",
    manager: "Chase Coleman",
    aum: "~$23.98B",
    quarter: "Q2 2026",
    filed: "Aug 14, 2026",
    holdings: 46,
    topHoldings: [
      { ticker: "GOOGL", weight: "~top 1" },
      { ticker: "NVDA",  weight: "~top 2" },
      { ticker: "AMZN",  weight: "~top 3" },
      { ticker: "TSM",   weight: "~top 4" },
      { ticker: "META",  weight: "~top 5" },
    ],
    newBuys: [
      p("CBRS (Cerebras Systems)", { note: "new AI-chip stake — also filed a 13G for up to 9.99% of Class A" }),
      p("APLD (Applied Digital)",  { note: "AI data-center / infrastructure" }),
      p("AMD",                     { note: "new position — second-source AI accelerator" }),
      p("SpaceX (private)",        { note: "unusual private stake via SPCX vehicle" }),
    ],
    increased: [
      p("INTC (Intel)",     { val: "1.64M → 4.25M sh", note: "more than doubled — foundry/US-supply-chain bet" }),
      p("TSM (TSMC)",       { val: "+$622M" }),
      p("AMAT (Applied Materials)", { val: "+$260M" }),
      p("MELI (MercadoLibre)", { val: "+$233M" }),
      p("AVGO (Broadcom)",  { val: "+$220M" }),
    ],
    reduced: [
      p("GOOGL (Alphabet)", { pct: "−45.4%", note: "the standout cut — to 5.81M shares" }),
      p("MSFT (Microsoft)", { pct: "−9.3%" }),
      p("META",             { pct: "−8.5%" }),
      p("NVDA (Nvidia)",    { pct: "−6.8%" }),
      p("AMZN (Amazon)",    { pct: "−3.2%" }),
    ],
    exits: [
      p("NFLX (Netflix)", { val: "2.44M sh (~$234.5M)", note: "full exit — the same quarter Ackman re-entered NFLX" }),
      p("BULL (Webull)",  { note: "full exit" }),
      p("ZS (Zscaler)",   { note: "full exit" }),
    ],
    theme: "Coleman meaningfully de-weighted his Big Tech core — cutting Alphabet almost in half and trimming Nvidia, Microsoft, Meta and Amazon — while rotating into the next leg of AI infrastructure and hardware: new stakes in Cerebras (up to a 9.99% position), Applied Digital and AMD, a doubled Intel bet, and adds to Applied Materials, Broadcom and TSMC. The move reads as Tiger taking profits on the crowded mega-cap AI leaders and redeploying toward semis/compute-infra names earlier in their re-rating, plus a headline-grabbing private SpaceX position. Net portfolio value still rose slightly, so this was rotation rather than de-grossing. Note the mirror-image trade with Pershing Square: Tiger fully exited Netflix the very quarter Ackman re-entered it.",
    sources: "SEC EDGAR, AP/Reuters, Seeking Alpha, HoldingsChannel, StockTitan, ValueSider",
    color: "#e67e22",
  },
  {
    type: "fund",
    name: "Viking Global Investors",
    manager: "Ole Andreas Halvorsen",
    aum: "$35.75B",
    quarter: "Q1 2026",
    filed: "May 15, 2026",
    pending: "Q2 2026 13F not yet indexed as of Aug 15 — showing last confirmed quarter",
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
    partial: "Q2 2026 filed (Aug 14): Alphabet increased +850K shares; flagship Offshore Fund +7.7% in Q2, led by SK Hynix, TSMC, Atom Computing (private) and Hut 8. Full Q2 position table not yet indexed — detail below is the confirmed Q1 book.",
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
    pending: "Q2 2026 13F not yet indexed as of Aug 15 — showing last confirmed quarter",
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
    pending: "Q2 2026 13F not yet indexed as of Aug 15 — showing last confirmed quarter",
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
    pending: "Q2 2026 13F not yet cleanly indexed as of Aug 15 (search leads conflicted with Q1) — showing last confirmed quarter",
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
    aum: "Wound down",
    quarter: "No 13F filed",
    filed: "Last 13F: Q3 2025",
    defunct: "Burry deregistered Scion with the SEC (Nov 10, 2025) and returned outside capital by year-end 2025 — no 13F has been filed since Q3 2025. The bets below are self-disclosed via his 'Cassandra Unchained' Substack / X, NOT a regulated 13F.",
    holdings: "—",
    newBuys: [
      p("MOH (Molina Healthcare)", { note: "self-disclosed contrarian long — bought more; stock down ~54% from its high" }),
    ],
    increased: [],
    reduced: [
      p("NVDA (Nvidia) puts", { note: "self-disclosed — ~1M shares, $110 strike, 2027 expiry; part of a ~$1.1B notional bearish book (~80% of capital)" }),
      p("PLTR (Palantir) puts + short", { note: "self-disclosed — $100 strike (Dec 2026) & $50 strike (Jun 2027), plus direct short" }),
      p("ORCL (Oracle) short", { note: "self-disclosed short" }),
      p("CAT (Caterpillar) short", { note: "self-disclosed short" }),
    ],
    exits: [
      p("Entire regulated long book", { note: "funds liquidated and capital returned by year-end 2025 — Scion no longer manages outside money" }),
    ],
    theme: "The biggest change in the cohort this cycle isn't a trade — it's an exit from the regulated world entirely. Michael Burry deregistered Scion Asset Management with the SEC on Nov 10, 2025, telling investors 'my estimation of value in securities is not, and has not been for some time, in sync with the markets,' and returned outside capital. Scion's last 13F was Q3 2025 — meaning the Q1 2026 'Scion holdings' previously shown here (Molina, Lululemon, SLM, etc.) were never an actual filing and have been removed. Burry now publishes via his paid 'Cassandra Unchained' Substack, where he has disclosed an aggressively bearish, concentrated options book — roughly $1.1B notional in NVDA and PLTR puts (~80% of his capital, about double his final 13F's bearish bet), plus shorts in Oracle and Caterpillar and a contrarian long in beaten-down Molina. The through-line from his Scion days is intact: high-conviction, contrarian, bubble-focused bets — now expressed through options and self-disclosure rather than a reportable equity book.",
    sources: "Bloomberg, CNBC, Sherwood News, Yahoo Finance (deregistration); Cassandra Unchained Substack, Benzinga (self-disclosed positions)",
    color: "#c0392b",
  },
  {
    type: "individual",
    name: "Greenlight Capital",
    manager: "David Einhorn",
    aum: "~$3.91B",
    quarter: "Q2 2026",
    filed: "Aug 14, 2026",
    holdings: 46,
    topHoldings: [
      { ticker: "GRBK", weight: "~high teens" },
      { ticker: "CNC",  weight: "~top 3 (+96% in Q2)" },
      { ticker: "FLR",  weight: "~6.9%"  },
      { ticker: "CNR",  weight: "~6.1%"  },
      { ticker: "BHF",  weight: "~5.3%"  },
    ],
    newBuys: [
      p("CMCSA (Comcast)",       { note: "entry ~$23.91 / ~5x EBITDA — classic Greenlight FCF-value; kept deliberately small" }),
      p("FBIN (Fortune Brands)", { note: "new small value position" }),
      p("PYPL (PayPal)",         { note: "new small position — fintech value at depressed multiples" }),
    ],
    increased: [
      p("CNC (Centene)", { pct: "+96% in-quarter", note: "top positive contributor — managed-care re-rating" }),
    ],
    reduced: [
      p("(short/macro book)", { note: "short basket of AI-adjacent names −12.3%; gold & SOFR-futures macro detracted" }),
    ],
    exits: [
      p("WFRD (Weatherford)", { note: "full exit" }),
    ],
    theme: "Einhorn kept 'capital preservation' as the stated priority — the Solasglas fund fell ~5.4% in Q2 (long book positive, but the short basket of AI-adjacent names −12.3% and macro/gold detracted), before rebounding +4.9% in July. The 13F long book still grew to ~$3.9B on winners, with Centene's near-doubling (+96%) the single biggest driver alongside Green Brick and Penn Entertainment. Rather than swing the portfolio, Einhorn nibbled at cheap large caps — Comcast at ~5x EBITDA is a textbook Greenlight FCF-value entry — keeping them deliberately small while the short/macro book expresses his caution. Net: a defensively-postured book leaning on a concentrated value long anchor (GRBK) with a few new small value/cyclical toeholds. The fund remains closed to new investors.",
    sources: "SEC EDGAR, Greenlight Re Q2 2026 call, Yahoo Finance, Seeking Alpha, Benzinga",
    color: "#2980b9",
  },
  {
    type: "individual",
    name: "Baupost Group",
    manager: "Seth Klarman",
    aum: "$5.416B",
    quarter: "Q2 2026",
    filed: "Aug 14, 2026",
    holdings: 23,
    topHoldings: [
      { ticker: "AMZN", weight: "~16.5%" },
      { ticker: "QSR",  weight: "~11-12%" },
      { ticker: "WCC",  weight: "~7.7%"  },
      { ticker: "UNP",  weight: "~7.3%"  },
      { ticker: "ELV",  weight: "~7.3%"  },
    ],
    newBuys: [
      p("CME (CME Group)",           { val: "~$137M", note: "largest new buy — derivatives-exchange franchise, durable fee revenue" }),
      p("AXTA (Axalta Coating)",     { val: "~$43.6M", note: "1.27M shares (~0.81%) — industrial coatings value" }),
      p("PSH (Pershing Square)",     { val: "~$13M",  note: "surprising new stake in Bill Ackman's own vehicle" }),
    ],
    increased: [
      p("AMZN (Amazon)", { pct: "+20%", val: "3.74M sh / ~$892M", note: "now the #1 holding — continued 'quality at scale' tilt" }),
      p("GOOG (Alphabet)", { pct: "+16%", note: "to ~1.37M shares" }),
    ],
    reduced: [
      p("(broader trims reported, not individually verified)"),
    ],
    exits: [
      p("WTW (Willis Towers Watson)", { note: "full exit — the single biggest Q2 move by weight (~−5.1% impact)" }),
    ],
    theme: "Klarman leaned further into mega-cap tech/quality compounders while adding financial-infrastructure exposure. The headline surprise is a fund famous for deep-value patience taking a new stake in Bill Ackman's Pershing Square vehicle, and building Amazon into its outright #1 position (~$892M, +20%). New CME (~$137M) pairs a steady, cash-generative exchange franchise with a couple of opportunistic value names (Axalta), funded partly by exiting insurance-broker Willis Towers Watson. It's incremental repositioning, not a regime change — still a concentrated ~23-name book, but tilting toward AMZN/GOOGL beta more than classic Baupost distressed/special-situations. When the market's most patient value investor makes Amazon his largest position, it's a signal about where 'margin of safety' now lives.",
    sources: "SEC EDGAR, CNBC, Yahoo Finance, Seeking Alpha, GuruFocus, ValueSider",
    color: "#8e44ad",
  },
  {
    type: "individual",
    name: "Icahn Capital",
    manager: "Carl Icahn",
    aum: "~$8.26B",
    quarter: "Q2 2026",
    filed: "Aug 14, 2026",
    holdings: 12,
    topHoldings: [
      { ticker: "IEP",  weight: "~48.5%" },
      { ticker: "CVI",  weight: "~26%"   },
      { ticker: "UAN",  weight: "~6.2%"  },
      { ticker: "CTRI", weight: "~4.9%"  },
      { ticker: "IFF",  weight: "~3.6%"  },
    ],
    newBuys: [],
    increased: [],
    reduced: [],
    exits: [],
    theme: "Icahn's 13F remains the most static and concentrated in the cohort — a de facto two-stock book (IEP + the CVR complex ≈ 76%) plus a handful of activist legacy stakes, unchanged at 12 positions with no verified buys, adds, trims or exits this quarter. The ~3% portfolio decline to $8.26B is a mark-to-market effect — CVR Energy fell ~$435M on refining weakness — rather than active selling. Separately, Icahn was busy in July M&A (a reported ~$34/share bid for Caesars), but that is an Icahn Enterprises corporate event, not a new Icahn Capital 13F line. Bottom line: hold-and-wait, with the energy/refining complex the swing factor for the whole book.",
    sources: "SEC EDGAR, GuruFocus, HoldingsChannel, Acquirer's Multiple, CNBC",
    color: "#d35400",
  },
  {
    type: "individual",
    name: "Himalaya Capital Management",
    manager: "Li Lu",
    aum: "$3.20B",
    quarter: "Q1 2026",
    filed: "May 2026",
    pending: "Q2 2026 13F not yet indexed as of Aug 15 — showing last confirmed quarter",
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
    pending: "Q2 2026 13F not yet indexed as of Aug 15 — showing last confirmed quarter",
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
    pending: "Q2 2026 13F not yet indexed as of Aug 15 — showing last confirmed quarter",
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
    aum: "sharply lower ex-JHG",
    quarter: "Q2 2026",
    filed: "Aug 14, 2026",
    partial: "Q2 confirmed structural change: the Janus Henderson take-private closed June 30, removing JHG (~42% of the Q1 book) from the 13F. Exact remaining share counts not yet indexed — residual public book below is reasoned from the confirmed exit.",
    holdings: 5,
    topHoldings: [
      { ticker: "GE",   weight: "~largest (post-JHG)" },
      { ticker: "SOLV", weight: "~top 2" },
      { ticker: "FERG", weight: "~top 3" },
      { ticker: "WEN",  weight: "~top 4" },
    ],
    newBuys: [],
    increased: [
      p("FERG (Ferguson)", { note: "prior reporting flagged Trian boosting Ferguson (add not independently confirmed for Q2)" }),
      p("WEN (Wendy's)",   { note: "prior reporting flagged an added stake (unconfirmed for Q2)" }),
    ],
    reduced: [],
    exits: [
      p("JHG (Janus Henderson)", { note: "left the 13F — take-private closed June 30 ($52/sh); Trian's ~25.1M shares rolled into private Jupiter Topco LLC" }),
    ],
    theme: "The dominant Q2 event is the completion of the Janus Henderson LBO (Trian / General Catalyst / QIA, ~$7.4B), which closed June 30 and converts Trian's single largest public holding into a private stake — mechanically removing ~42% of the reported book from 13F visibility and shrinking the disclosed portfolio sharply. Trian rolled ~25.1M JHG shares into the private holdco (Jupiter Topco) in exchange for equity interests, so the exposure isn't gone — it's just no longer public. The residual 13F book is Trian's remaining concentrated activist bets: GE Aerospace (the marquee long-term compounder), Solventum, Ferguson, and Wendy's. Confirm exact Q2 share counts against EDGAR once the filing is fully indexed.",
    sources: "SEC EDGAR, Janus Henderson / BusinessWire (deal close), StockTitan (13D/A), CNBC, TipRanks",
    color: "#ba4a00",
  },
  {
    type: "individual",
    name: "Situational Awareness LP",
    manager: "Leopold Aschenbrenner",
    aum: "~$20B AI book (levered; 13F top-line reported inconsistently)",
    quarter: "Q2 2026",
    filed: "Aug 14, 2026",
    holdings: "~26–42",
    topHoldings: [
      { ticker: "SNDK", weight: "~$5.7B" },
      { ticker: "MU",   weight: "~$5.6B" },
      { ticker: "BE",   weight: "~$1.9B" },
      { ticker: "TSM",  weight: "~$1.3B" },
      { ticker: "NBIS", weight: "~$1.2B" },
    ],
    newBuys: [
      p("MU (Micron) — now LONG", { val: "~$5.6B", note: "the tell of the quarter — Micron was a PUT in Q1, now the #2 long" }),
      p("NBIS (Nebius Group)",    { val: "~$1.2B", note: "new AI-cloud/infrastructure long" }),
    ],
    increased: [
      p("SNDK (SanDisk)",   { val: "~$5.7B", note: "largest position — flipped bullish; largely call-option (notional) exposure" }),
      p("BE (Bloom Energy)", { val: "~$1.9B", note: "off-grid data-center power" }),
      p("CRWV (CoreWeave)", { val: "~$745M", note: "7.48M shares — GPU cloud" }),
      p("CORZ (Core Scientific)", { val: "~$0.7B" }),
      p("IREN (IREN Ltd)",  { val: "~$0.4B" }),
    ],
    reduced: [
      p("Chip-sector put book", { note: "the ~$8.46B Q1 short book against NVDA/AVGO/AMD/SMH/ORCL/MU/TSM/ASML was slashed/rotated — no longer the top of the book; net exposure flipped LONG" }),
    ],
    exits: [
      p("Net-short-chips posture", { note: "abandoned — the defining Q1 hedge was reversed into a levered long AI-memory/infra bet" }),
    ],
    theme: "This 13F is effectively a tombstone. The June 30 snapshot shows Aschenbrenner had abandoned the Q1 'short-the-chips' hedge and loaded aggressively LONG into AI memory and infrastructure — SanDisk (~$5.7B) and Micron (~$5.6B) became the two largest positions (Micron had been a put just one quarter earlier), alongside Bloom Energy, Nebius, CoreWeave and the bitcoin-miner complex, at roughly 4x leverage. It was the wrong quarter for it: those exact names cratered in July, triggering margin calls that BofA, Goldman and JPMorgan helped manage, and Citadel bought the bulk of the public book in late July (then posted one of its best months in years). So the fund no longer holds most of what this filing shows. The wholesale reversal — from the cohort's largest chip-short to a highly-levered net-long memory/AI-infra book in a single quarter, followed by a forced unwind — is the cautionary tale of the AI-infrastructure trade's first real drawdown.",
    sources: "SEC EDGAR (CIK 0002045724), CNBC, WSJ, Bloomberg, Yahoo Finance, Blockspace",
    color: "#0a3d62",
  },
];

const allFilers = [...funds, ...individuals];

// Prior-quarter snapshot for quarter-over-quarter comparison.
// Confirmed Q2 2026 filers compare against Q1 2026 (Mar 31); filers whose
// Q2 filing is not yet indexed still display their Q1 2026 book and compare
// against Q4 2025 (Dec 31). Each entry carries its own label.
const q4Data = {
  // ── Confirmed Q2 2026 filers → prior quarter is Q1 2026 ──
  "Berkshire Hathaway":         { aum: "~$263.1B",            holdings: 29,    label: "Q1 2026" },
  "Citadel Advisors":           { aum: "$618B",               holdings: 12857, label: "Q1 2026" },
  "Pershing Square":            { aum: "$13.71B",             holdings: 11,    label: "Q1 2026" },
  "Appaloosa Management":       { aum: "$5.93B",              holdings: 31,    label: "Q1 2026" },
  "Tiger Global Management":    { aum: "$22.8B",              holdings: 54,    label: "Q1 2026" },
  "Greenlight Capital":         { aum: "~$3.19B",             holdings: 45,    label: "Q1 2026" },
  "Baupost Group":              { aum: "$5.115B",             holdings: 22,    label: "Q1 2026" },
  "Icahn Capital":              { aum: "~$8.55B",             holdings: 12,    label: "Q1 2026" },
  "Trian Fund Management":      { aum: "~$8.2B",              holdings: 6,     label: "Q1 2026" },
  "Situational Awareness LP":   { aum: "~$13.67B",            holdings: 42,    label: "Q1 2026" },
  // ── Q2 not yet indexed (still showing Q1 2026 book) → prior quarter is Q4 2025 ──
  "Bridgewater Associates":     { aum: "~$26.5B (13F)",       holdings: 1020,  label: "Q4 2025" },
  "Viking Global Investors":    { aum: "~$33.8B",             holdings: 72,    label: "Q4 2025" },
  "Third Point":                { aum: "~$6.8B (~$1.9B 13F)", holdings: 31,    label: "Q4 2025" },
  "Soros Fund Management":      { aum: "~$8.5B",              holdings: 175,   label: "Q4 2025" },
  "D.E. Shaw & Co.":            { aum: "~$172B (13F)",        holdings: 4410,  label: "Q4 2025" },
  "Duquesne Family Office":     { aum: "~$3.9B",              holdings: 37,    label: "Q4 2025" },
  "Himalaya Capital Management":{ aum: "~$2.9B",              holdings: 9,     label: "Q4 2025" },
  "Gotham Asset Management":    { aum: "~$10.5B",             holdings: 1612,  label: "Q4 2025" },
  "Miller Value Partners":      { aum: "~$262M",              holdings: 34,    label: "Q4 2025" },
  // Scion Asset Management: deregistered Nov 2025 — no prior-quarter comparison
};

const sectorThemes = [
  { sector: "AI Memory: The Round-Trip Trade", tickers: "SNDK, MU, WDC", buyers: "Bought the top: Situational Awareness (SNDK ~$5.7B, MU ~$5.6B — levered long). Sold the top: Appaloosa (exited SNDK >$400M, cut MU −41%). Added: Citadel (MU +$2.8B)", signal: "Memory was the parabola of Q2 — SanDisk and Micron roughly tripled Mar–Jun. The cohort split on timing, not thesis: Tepper booked gains and got out, Aschenbrenner levered in at 4x and blew up in July. The single clearest lesson of the quarter is that being right on the theme and wrong on the entry (and the leverage) can still be fatal." },
  { sector: "Down the AI Stack: Chip-Infra & Private Frontier Tech", tickers: "CBRS, AMD, INTC, APLD, NBIS, SpaceX, Quantinuum", buyers: "Tiger Global (Cerebras ~10% stake, AMD new, INTC doubled, APLD new), Citadel (SpaceX, Cerebras, Quantinuum — private), Situational Awareness (Nebius, CoreWeave)", signal: "The most consistent Q2 rotation: take profits on crowded mega-cap AI leaders and move one layer down the stack — into merchant accelerators (AMD), foundry/compute-infra (Intel, Applied Digital), and pre-IPO frontier tech (Cerebras, SpaceX, Quantinuum). When Tiger and Citadel independently reach for the same private names, the public AI leaders are viewed as fully priced." },
  { sector: "Alphabet: Berkshire's $10B Embrace vs. the Sellers", tickers: "GOOGL, GOOG", buyers: "Buying: Berkshire (+~$10B, now top-3), Baupost (+16%). Selling: Pershing Square (full exit), Tiger Global (−45%)", signal: "Alphabet remains the cohort's most two-sided mega-cap. Abel made it a top-3 Berkshire holding via a $10B AI-infrastructure placement the same quarter Ackman exited entirely and Coleman nearly halved his stake. The bull case is AI-platform optionality at a reasonable multiple; the bear case is search-monetization risk. No consensus." },
  { sector: "Quality-at-Scale: Mega-Cap Platforms & Compounders", tickers: "AMZN, MSFT, META, V, MA, SPGI, CME", buyers: "Baupost (AMZN now #1, +CME, +PSH), Pershing (MSFT #1, +META, +V, +MA, +SPGI), Appaloosa (AMZN #1), D.E. Shaw (MSFT — Q1)", signal: "Even the deep-value houses are concentrating into mega-cap platforms and wide-moat compounders. Klarman making Amazon his #1 position and buying a stake in Ackman's Pershing Square is the tell: 'margin of safety' has migrated toward dominant, cash-generative franchises (payments networks, data/ratings duopolies) rather than classic distressed value." },
  { sector: "The Netflix Mirror & Streaming Split", tickers: "NFLX", buyers: "In: Pershing Square (re-entry, 3.15M sh). Out: Tiger Global (full exit ~$234.5M), Citadel (−$2.5B trim)", signal: "The cleanest opposite-way trade of the quarter: Ackman bought back the stock that cost him ~$400M in 2022 the same quarter Coleman exited it entirely and Griffin trimmed hard. Streaming economics remain genuinely contested at the top of the market." },
  { sector: "The AI-Infra Blow-Up & Forced Deleveraging", tickers: "SNDK, MU, BE, NBIS, CRWV", buyers: "Situational Awareness (levered long, ~4x) → margin calls (July) → Citadel bought the book", signal: "The AI-infrastructure trade took its first real drawdown. Aschenbrenner's reversal from the cohort's largest chip-short to a highly-levered net-long memory/infra book, followed by a July margin-driven fire-sale to Citadel, is the cautionary tale: in a crowded, leveraged trade, the exit door is narrow. Watch whether leverage across the AI-infra complex is being quietly reduced into H2." },
];

const exits = [
  { stock: "GOOGL + GOOG (Alphabet)", funds: "Pershing Square — full exit of both classes (completing the rotation into MSFT/Meta), while Berkshire added ~$10B and Baupost +16%" },
  { stock: "SNDK (SanDisk)", funds: "Appaloosa — full exit >$400M, just ONE quarter after initiating it; Tepper booked the AI-memory parabola near the top" },
  { stock: "NFLX (Netflix)", funds: "Tiger Global — full exit ~$234.5M the same quarter Ackman re-entered; Citadel also trimmed −$2.5B" },
  { stock: "WTW (Willis Towers Watson)", funds: "Baupost — full exit, its single biggest Q2 move by weight" },
  { stock: "WFRD (Weatherford)", funds: "Greenlight Capital — full exit" },
  { stock: "STZ (Constellation Brands)", funds: "Berkshire Hathaway — full exit of an immaterial position" },
  { stock: "JHG (Janus Henderson)", funds: "Trian — leaves the 13F as the $52/sh take-private closed June 30 (~42% of the book rolled private)" },
  { stock: "ZS (Zscaler) + BULL (Webull)", funds: "Tiger Global — full exits amid a broad Big-Tech de-weighting" },
  { stock: "Chip-sector put book (~$8.46B)", funds: "Situational Awareness — abandoned its Q1 short-the-chips hedge entirely, flipping to a levered long that imploded in July" },
  { stock: "Entire regulated book", funds: "Scion / Michael Burry — funds wound down and capital returned; deregistered Nov 2025, no 13F since Q3 2025" },
  { stock: "TSLA / NVDA / NFLX (trims)", funds: "Citadel — rotated out of crowded momentum longs (−$4.8B / −$3.0B / −$2.5B)" },
  { stock: "BAC (Bank of America)", funds: "Berkshire — pared 30M+ shares, ~8th consecutive quarter trimming the bank" },
];

// ─── ANALYSIS DATA ────────────────────────────────────────────────────────────

const macroNarrative = {
  quarter: "Q2 2026",
  edition: "First Read · August 2026",
  headline: "The AI-Infrastructure Trade Breaks: A Blow-Up, Berkshire on Offense, and the Great Memory Round-Trip",
  paragraphs: [
    {
      title: "The First Blow-Up",
      body: "The Q2 filing that matters most is a tombstone. Leopold Aschenbrenner's Situational Awareness — the cohort's most ideologically pure AI bull — spent Q1 short the entire chip complex (~$8.46B of puts). By June 30 it had done a complete about-face: it abandoned the short book and went aggressively long AI memory and infrastructure at roughly 4x leverage, with SanDisk (~$5.7B) and Micron (~$5.6B) as its two largest positions — Micron having been a put just one quarter earlier — alongside Bloom Energy, Nebius, CoreWeave and the bitcoin-miner complex. It was precisely the wrong moment: those names cratered in July, margin calls followed, and Citadel bought the bulk of the public book in late July (then posted one of its best months in years). This is the AI-infrastructure trade's first real drawdown, and it happened to the person who wrote the manifesto for it.",
    },
    {
      title: "Berkshire Goes on Offense",
      body: "Greg Abel used his second quarter to flip Berkshire from seller to buyer. Berkshire was a net equity buyer of ~$20B — its first net-buying quarter in over three years — added ~$4.5B of buybacks, and drew cash down to $365.5B from a record $397.4B. The signature move is a ~$10B build in Alphabet via an AI-infrastructure placement, vaulting Google to a top-3 holding and marking Berkshire's clearest embrace yet of mega-cap AI/compute — exposure Buffett historically avoided. Abel paired it with a housing/cyclical tilt (Lennar, D.R. Horton, more Delta and Occidental) and new stakes in Heico and Ulta, funded by continued trims of the legacy Apple and Bank of America mega-positions. When the market's most famously patient capital allocator turns aggressive buyer in the same quarter a levered AI fund implodes, the two moves frame the quarter's central tension.",
    },
    {
      title: "The Great Memory Round-Trip",
      body: "AI memory was the round-trip trade of the quarter, and the cohort split hard on timing. David Tepper's Appaloosa exited SanDisk entirely — a position it had initiated only one quarter earlier — and cut Micron ~41% after memory names roughly tripled from March to June, booking gains near the top and rotating into Amazon, TSMC, Alphabet and Uber. Aschenbrenner did the opposite, levering into SanDisk and Micron at the peak. Tiger Global threaded a third path: Chase Coleman cut his mega-cap AI core (Alphabet −45%, plus trims to Nvidia, Microsoft, Meta and Amazon) and rotated one layer down the stack — into Cerebras (a near-10% stake), Applied Digital, AMD, a doubled Intel, and adds to Applied Materials and Broadcom. The debate is no longer whether to own AI, but which layer — and, increasingly, whether the memory/infra layer has run too far.",
    },
    {
      title: "Ackman's Overhaul and the Netflix Mirror",
      body: "Bill Ackman ran his biggest overhaul in years, expanding Pershing Square from 11 names to 14: he completed the full exit of Alphabet, made Microsoft his #1 position, added Meta, and initiated four wide-moat compounders — Netflix, Visa, Mastercard and S&P Global. The Netflix re-entry is remarkable (the stock cost him ~$400M in 2022) and produced the quarter's cleanest mirror trade: Tiger Global fully exited Netflix the very quarter Ackman bought back in. The 'quality at scale' drift ran through the value camp too — Seth Klarman's Baupost made Amazon its outright #1 holding (~$892M), added CME, and, most surprisingly for a deep-value house, took a stake in Ackman's own Pershing Square vehicle. Payments networks, data/ratings duopolies, and mega-cap platforms are where conviction pooled.",
    },
    {
      title: "What We Can — and Can't — Yet See",
      body: "A candid caveat: this is a filing-week read. Nine filers had clean, press-corroborated Q2 books by mid-August (Berkshire, Citadel, Pershing, Appaloosa, Tiger, Greenlight, Baupost, Icahn, Situational Awareness); Third Point and Trian had one confirmed structural change each (Loeb added 850K Alphabet shares and returned +7.7%; Trian's Janus Henderson take-private closed June 30, removing ~42% of its book from 13F view). Eight late/quant filers — Bridgewater, Soros, D.E. Shaw, Druckenmiller, Viking, Himalaya, Gotham and Miller — had not yet been indexed and still display their verified Q1 books, clearly flagged. And one name left the board entirely: Michael Burry deregistered Scion in November 2025, so its last 13F was Q3 2025; his bets are now known only through self-disclosure (a ~$1.1B NVDA/PLTR put book). The tracker will refresh the pending filers as their filings post.",
    },
  ],
  keySignals: [
    { label: "Story of the Quarter", value: "Situational Awareness flipped from a ~$8.46B chip-short to a 4x-levered long AI-memory book, then blew up in July — Citadel bought the wreckage and posted one of its best months in years" },
    { label: "Berkshire on Offense", value: "Abel net-bought ~$20B (first in 3+ years), added ~$10B to Alphabet (now top-3), and ran $4.5B of buybacks — cash down to $365.5B" },
    { label: "The Memory Round-Trip", value: "Tepper exited SanDisk and cut Micron −41% near the top; Aschenbrenner levered into the same names into the peak — opposite reads, weeks apart" },
    { label: "The Netflix Mirror Trade", value: "Ackman re-entered Netflix (which cost him ~$400M in 2022) the same quarter Tiger Global fully exited it" },
    { label: "Quality-at-Scale Drift", value: "Baupost made Amazon its #1 holding and bought a stake in Ackman's Pershing Square — the deep-value house tilting to mega-cap platforms" },
    { label: "Data Caveat", value: "9 of 20 fully confirmed at filing week; 8 late/quant filers still show Q1 (flagged); Scion deregistered — no 13F since Q3 2025" },
  ],
};

// Prior editions of the macro synthesis, preserved for the record.
// Newest first. Each entry mirrors the macroNarrative shape plus an archivedNote.
const macroArchive = [
  {
    quarter: "Q1 2026",
    edition: "Revised Edition · June 2026",
    headline: "The Great De-Grossing: Conviction Fractures Across Every Layer of the AI Trade",
    archivedNote: "The Q1 2026 synthesis, after primary-source verification. Superseded by the Q2 2026 read as the tracker rolled to the June 30 quarter. Preserved unedited for the record.",
    paragraphs: [
      {
        title: "The De-Grossing Quarter",
        body: "The defining feature of Q1 2026 — visible only after primary-source verification of the filings — is how aggressively the most storied stock-pickers shrank their books. Third Point executed the most dramatic reset in Dan Loeb's recent history, cutting 13F exposure from ~$7.26B to ~$2.08B and fully exiting both Microsoft and PG&E, its two former flagship positions. Druckenmiller's Duquesne shrank from $4.22B to $3.39B while fully exiting Alphabet and liquidating 99% of Amazon. Citadel reduced both Nvidia and Amazon. This was not a rotation between sectors — it was a withdrawal of gross exposure by the cohort's most experienced macro-aware managers, executed during a quarter when the S&P 500 fell -4.4%. The smartest money got smaller, not just different.",
      },
      {
        title: "The Microsoft Schism",
        body: "The 'MSFT as AI safe harbor' narrative did not survive verification — what the filings actually show is the widest single-stock disagreement in the cohort. On the buy side: Pershing Square deployed $2.09B into Microsoft at ~21x forward earnings, D.E. Shaw added $1.9B, and Viking increased +32.5%. On the sell side: Third Point fully exited, Appaloosa cut -82%, and Citadel trimmed $909M. Alphabet shows the same schism — Berkshire tripled its stake (+204%), Viking initiated, and Himalaya holds 44% combined, while Druckenmiller fully exited and Pershing sold ~95%. There is no platform consensus in Q1 2026. There are two camps with irreconcilable views on whether mega-cap AI platforms are the safest asset in the market or the most crowded.",
      },
      {
        title: "Value's Vindication",
        body: "The S&P 500 returned -4.4% in Q1 2026. Greenlight Capital returned +6.5% net. Miller Deep Value returned +8.39% — and grew to 55 holdings on ~$383M as inflows followed performance. Baupost quietly executed its most active quarter in years: AON ($248.2M) as the largest new buy, Amazon increased +47% to ~$649M, and four full exits (CRH, Dollar General, FIS, Fiserv). This is the structural dynamic at work: when macro uncertainty compresses multiples, concentrated value investors with pre-identified catalysts dramatically outperform momentum strategies. The Lebanese sovereign debt 66% IRR (Greenlight) and Molina Healthcare re-rating (Burry) are classic value outcomes that required patience and the willingness to be early.",
      },
      {
        title: "The Abel Era and the Delta Divergence",
        body: "Greg Abel's first 13F as Berkshire CEO produced 16 full exits (42 to 29 positions), a tripled Alphabet stake, and a new $2.6B Delta Air Lines position. The Delta buy contains the quarter's cleanest natural experiment: David Tepper's Appaloosa fully exited Delta in the exact same quarter — alongside full exits of American and United — completing a total withdrawal from the airline sector on tariff and demand-recession risk. Two of the most respected capital allocators alive looked at the same airline in the same ninety days and reached opposite conclusions. Abel is buying the quality carrier at a cyclical discount; Tepper is saying no airline is safe in a tariff war. One of them is wrong, and the resolution will be visible in Delta's 2026 results.",
      },
      {
        title: "The Macro Hedge Expansion",
        body: "Four of twenty filers carry explicit macro protection in their Q1 filings: Soros (SPY puts + energy puts, while cutting China via FXI −$111M and KWEB −$101M), Burry (~$85M in NVDA and PLTR puts plus $60M+ in cash), Greenlight (gold — which drove its Q1 outperformance), and Aschenbrenner (~$8.46B notional in puts against the entire chip complex, now including ASML). Aschenbrenner's book remains the purest expression of the 'infrastructure over chips' thesis: long Bitcoin-miners-turned-AI-hosts (CLSK +649%, new positions in Bitfarms, Solaris Energy, T1 Energy) against shorts on every chip incumbent. Dawn Fitzpatrick's March 2026 warning of 'a painful 18–24 months' is the narrative backdrop — and since 13Fs only disclose long equity positions, the true defensive positioning across the cohort is larger than what is visible.",
      },
    ],
    keySignals: [
      { label: "Widest Single-Stock Split (Q1 2026)", value: "MSFT — Pershing Square new $2.09B and D.E. Shaw +$1.9B vs. Third Point full exit, Appaloosa −82%, Citadel −$909M" },
      { label: "Most Surprising Move", value: "Third Point's de-grossing — 13F book cut from ~$7.26B to ~$2.08B with full MSFT and PCG exits, the biggest reset of Loeb's recent career" },
      { label: "Biggest Conviction Flip", value: "Druckenmiller fully exited Alphabet and cut Amazon −99% — the mega-cap platform trade he championed is gone from the book" },
      { label: "Value Beat in Q1", value: "Greenlight +6.5%, Miller Deep Value +8.39% vs. S&P 500 −4.4% — value managers dominated the drawdown" },
      { label: "Emerging AI Power Consensus", value: "Situational Awareness (CLSK +649%, new SEI/TE/BITF), D.E. Shaw (IREN +$687M, Bloom +$605M) — power infrastructure is the least crowded AI layer" },
      { label: "The Delta Divergence", value: "Berkshire initiated $2.6B in DAL the same quarter Appaloosa fully exited it — the cleanest two-sided bet in the cohort" },
    ],
  },
  {
    quarter: "Q1 2026",
    edition: "First Edition · May 2026",
    headline: "The Alphabet Convergence, Value's Vindication, and the First AI Chip Defectors",
    archivedNote: "Initial synthesis published on filing day from first-pass aggregator data. Superseded in June 2026 after primary-source verification: Third Point had fully exited MSFT and PCG (not added +175%), Druckenmiller had fully exited GOOGL and cut AMZN −99% (not added), and Citadel's reported $8.4B NFLX buy could not be verified. Preserved unedited for the record.",
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
        body: "Five of twenty filers now carry explicit macro protection: Third Point (SPY puts — largest hedge in recent history), Soros (SPY puts + energy puts), Burry ($85M in NVDA and PLTR puts), Greenlight (gold — drove Q1 outperformance), and Aschenbrenner ($8.46B in chip-sector puts — by far the largest bearish book in the cohort). This is a material expansion from prior quarters. Dawn Fitzpatrick's March 2026 warning of 'a painful 18–24 months' for markets crystallizes the concern: the tariff shock (announced early April, post Q1 reporting period), sovereign debt trajectories, and AI capex disappointment risk are all visible to sophisticated managers. The fact that this level of hedging is visible in 13F filings — which only show long equity positions — means the true macro protection is even larger than what is disclosed.",
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
  },
];

// ─── Q2 2026 EARLY PREVIEW ──────────────────────────────────────────────────
// Position-level 13Fs for the June 30, 2026 quarter are due Aug 14, 2026.
// As of this update only Berkshire's moves are confirmed (via its Q2 10-Q,
// filed Aug 8, 2026). The fund-by-fund book below remains the verified Q1 2026
// (Mar 31) data and will be refreshed once Q2 13Fs are public.
const q2Preview = {
  quarter: "Q2 2026",
  status: "Rolling update — filings posting through mid-August",
  updated: "Aug 15, 2026",
  headline: "Q2 2026 update in progress: 9 filers fully confirmed, 2 partial, 8 pending, 1 deregistered",
  intro: "The Q2 13F deadline (June 30 holdings) was Aug 14. Marquee funds are already press-verified; several late-filing and quant managers had not yet been indexed at the time of this update and still display their verified Q1 2026 book, clearly flagged on each card. Analysis below reflects the confirmed and partial filers.",
  groups: [
    { label: "Confirmed Q2", tone: "buy", items: ["Berkshire Hathaway", "Citadel", "Pershing Square", "Appaloosa", "Tiger Global", "Greenlight", "Baupost", "Icahn", "Situational Awareness"] },
    { label: "Partial (one confirmed change)", tone: "accent", items: ["Third Point — +850K Alphabet, +7.7% quarter", "Trian — Janus Henderson exits the 13F (take-private closed)"] },
    { label: "Q2 pending (showing Q1)", tone: "trim", items: ["Bridgewater", "Soros", "D.E. Shaw", "Druckenmiller", "Viking", "Himalaya", "Gotham", "Miller"] },
    { label: "Deregistered", tone: "sell", items: ["Scion / Michael Burry — no 13F since Q3 2025 (deregistered Nov 2025)"] },
  ],
  note: "The Conviction Heatmap and Divergence Radar are computed across all cards; because 8 filers still show their Q1 book and Scion is wound down, read cross-filer tallies as directional until the pending filings post.",
  sources: "SEC EDGAR, CNBC, Bloomberg, WSJ, Reuters, Seeking Alpha, HoldingsChannel, ValueSider",
};

const divergences = [
  {
    ticker: "SNDK / MU",
    subtitle: "AI Memory — Book the Parabola vs. Lever Into It",
    bulls: {
      filers: ["Situational Awareness (SNDK ~$5.7B + MU ~$5.6B, ~4x levered long)", "Citadel (MU +$2.8B)"],
      thesis: "AI memory is the highest-torque way to play the compute build-out: HBM and NAND are supply-constrained, pricing was inflecting sharply, and SanDisk and Micron roughly tripled from March to June. Aschenbrenner flipped his entire book from short-the-chips to a levered long on exactly these names, convinced the memory shortage would run further. Citadel independently added ~$2.8B to Micron. When the constraint on AI is physical (memory bandwidth, storage), the memory makers capture outsized economics.",
    },
    bears: {
      filers: ["Appaloosa (exited SNDK >$400M, cut MU −41%)"],
      thesis: "Tepper's read: the memory names had already tripled, and a commodity-cyclical trading at a parabolic premium is a sale, not a hold. He fully exited SanDisk one quarter after buying it and cut Micron 41%, rotating the proceeds into diversified mega-caps (Amazon, TSMC, Alphabet, Uber). The thesis wasn't 'AI is over' — it was 'this specific trade is too crowded and too parabolic to own at these prices.'",
    },
    verdict: "The July drawdown decisively vindicated the seller: the memory names cratered, and Situational Awareness's levered long triggered margin calls and a forced sale of the book to Citadel. The deeper lesson is about structure, not direction — Tepper and Aschenbrenner shared the AI-memory thesis, but position sizing, leverage, and entry timing separated a booked gain from a blow-up. The open question for H2: with the parabola broken, is memory now a value entry or a broken trade?",
  },
  {
    ticker: "GOOGL",
    subtitle: "Berkshire's $10B Embrace vs. the Sellers",
    bulls: {
      filers: ["Berkshire Hathaway (+~$10B — now top-3)", "Baupost (+16%)", "Himalaya Capital (~44% combined — Q1, pending)"],
      thesis: "Abel made Alphabet a top-3 Berkshire holding in Q2 via a ~$10B AI-infrastructure placement — the clearest institutional signal in the cohort that Google is the mega-cap AI platform with the widest gap between price and intrinsic value. Gemini across Search, YouTube, Cloud and Waymo creates compounding optionality, and a value-first allocator at Berkshire's scale committing $10B says the discount is too wide. Klarman added 16% alongside him.",
    },
    bears: {
      filers: ["Pershing Square (full exit — both classes)", "Tiger Global (−45%)"],
      thesis: "Ackman completed his exit of Alphabet entirely, rotating into Microsoft and Meta on the view that MSFT has cleaner AI monetization per dollar and that Google's ad revenue is structurally exposed to AI answer engines. Coleman nearly halved Tiger's stake in the same quarter. The bear case: even a modest search-monetization leak compresses the multiple, and the capital is better deployed in platforms with less disruption risk.",
    },
    verdict: "Alphabet is the cohort's most two-sided mega-cap: Berkshire committed ~$10B the same quarter Pershing exited and Tiger cut 45%. The core question is unchanged but the stakes are higher now that Berkshire has planted a flag — is search-monetization risk real and permanent, or is the market overpricing a risk Alphabet's own AI will neutralize? Watch AI Overviews ad-revenue disclosure in upcoming prints.",
  },
  {
    ticker: "NFLX",
    subtitle: "The Mirror Trade — Ackman Back In, Coleman Out",
    bulls: {
      filers: ["Pershing Square (re-entry, 3.15M sh ~4.9%)"],
      thesis: "Ackman re-entered Netflix — the very stock that cost Pershing ~$400M in 2022 — a rare public reversal that signals renewed conviction in streaming economics: pricing power, a maturing ad tier, password-sharing monetization, and a widening content moat now throwing off real free cash flow. Buying back a name you were burned on requires believing the business has structurally changed, not just the price.",
    },
    bears: {
      filers: ["Tiger Global (full exit ~$234.5M)", "Citadel (−$2.5B trim)"],
      thesis: "Coleman exited Netflix entirely the same quarter, and Griffin trimmed hard. The bear read: streaming is maturing into a competitive, capital-hungry business where content spend keeps ratcheting, subscriber growth is decelerating in developed markets, and the multiple already prices the ad-tier upside. Better risk/reward exists one layer down the AI/compute stack.",
    },
    verdict: "The cleanest opposite-way trade of the quarter — one legendary manager buying exactly what another sold, on the same tape. It's a pure referendum on whether streaming's best days (pricing power, ad monetization) are ahead or already discounted. Netflix's H2 subscriber and ad-revenue trajectory settles it.",
  },
  {
    ticker: "AI Positioning",
    subtitle: "Concentrate the Mega-Cap Leaders vs. Rotate Down the Stack",
    bulls: {
      filers: ["Pershing Square (MSFT #1, +META, +V/MA/SPGI)", "Baupost (AMZN now #1, +CME)", "Appaloosa (AMZN #1, +TSMC/GOOG)"],
      thesis: "The 'own the winners' camp is concentrating into proven mega-cap platforms and wide-moat compounders — the businesses already monetizing AI at scale with fortress balance sheets. Ackman made Microsoft his top position and added Meta; Klarman made Amazon his #1 and even the value house reached for quality-at-scale. The logic: in a maturing, capital-intensive AI cycle, the incumbents with distribution, data and cash flow compound most reliably — you don't need to guess the next winner.",
    },
    bears: {
      filers: ["Tiger Global (cut GOOGL −45%/NVDA/MSFT/META; +Cerebras/AMD/Intel/APLD)", "Citadel (+SpaceX/Cerebras/Quantinuum private; trimmed TSLA/NVDA/NFLX)"],
      thesis: "The 'rotate down the stack' camp argues the mega-cap leaders are fully priced and the incremental return now lives one layer down — merchant accelerators (AMD), foundry and compute-infra (Intel, Applied Digital), and pre-IPO frontier names (Cerebras, SpaceX, Quantinuum). Tiger de-weighted its entire Big-Tech core to fund it; Citadel independently reached for the same private names. The bet: the next re-rating is earlier-stage, not in the megacaps everyone already owns.",
    },
    verdict: "Not a single-stock fight but a strategy fork — and the quarter's most important one. One camp says the safe compounding is in the proven leaders; the other says the alpha has moved to the picks-and-shovels and private frontier tech. Situational Awareness's July blow-up is a warning to the aggressive end of the down-the-stack trade; whether the megacaps or the infra names lead H2 decides who's right.",
  },
  {
    ticker: "AI-Infra Leverage",
    subtitle: "Is the AI-Infrastructure Trade Over-Levered?",
    bulls: {
      filers: [
        "Situational Awareness (~4x levered long BE/SNDK/MU/NBIS/CRWV — pre-July)",
        "Citadel (bought the distressed book in late July)",
      ],
      thesis: "The bull case for AI infrastructure is unchanged and, if anything, strengthened by the shakeout: the constraint on AI is physical — power, memory, data-center capacity — and the names that provide it (Bloom Energy, the memory makers, GPU-cloud and bitcoin-miner-turned-compute hosts) sit on genuine, growing demand. Aschenbrenner expressed maximum conviction via ~4x leverage. Tellingly, when his book was force-sold, Citadel stepped in to buy it — a sophisticated counterparty treating the fire-sale as opportunity, not contagion.",
    },
    bears: {
      filers: [
        "The July drawdown itself (margin calls, forced deleveraging)",
        "Appaloosa (booked memory gains and left before the drop)",
      ],
      thesis: "The bear case is about structure, not thesis: a crowded, high-beta trade financed with leverage has a narrow exit. When AI-memory and infra names rolled over in July, Situational Awareness couldn't hold — margin calls forced a sale of the entire public book, and BofA, Goldman and JPMorgan had to help manage the unwind. Tepper's pre-emptive exit from the same names shows the disciplined read: the trade was right for a while, but the leverage made it un-survivable at the top.",
    },
    verdict: "The first genuine drawdown of the AI-infrastructure trade, and its lesson is about leverage and liquidity, not whether AI is real. The same names can be a durable long (Citadel bought them) and a fatal one (Situational Awareness was levered into them) depending entirely on structure. The signal to watch in H2: whether leverage across the AI-infra complex is being quietly reduced, and whether the group re-rates once forced selling clears.",
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
  const [openArchive, setOpenArchive] = useState(null);

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
      {/* ── Q2 2026 EARLY PREVIEW ────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg, #12220f 0%, #0f1a12 55%, #0d1117 100%)", borderRadius: 12, border: `1px solid ${T.buy}55`, overflow: "hidden", marginBottom: 16, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 90% 0%, ${T.buy}18, transparent 55%)`, pointerEvents: "none" }} />
        <div style={{ padding: "18px 20px", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "#07090f", background: T.buy, borderRadius: 4, padding: "3px 8px" }}>
                Live · {q2Preview.quarter}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: T.buy }}>
                Rolling Update
              </span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: T.t3 }}>{q2Preview.status}</span>
          </div>
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, fontWeight: 900, color: T.t1, lineHeight: 1.28, marginBottom: 8 }}>
            {q2Preview.headline}
          </div>
          <div style={{ fontSize: 12.5, color: T.t2, lineHeight: 1.65, marginBottom: 14 }}>
            {q2Preview.intro}
          </div>

          {q2Preview.groups.map((g, i) => {
            const c = { buy: T.buy, accent: T.accent, trim: T.trim, sell: T.sell }[g.tone] || T.t2;
            const bg = { buy: T.buyBg, accent: T.accentBg, trim: T.trimBg, sell: T.sellBg }[g.tone] || T.cardAlt;
            return (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: c, background: bg, border: `1px solid ${c}40`, borderRadius: 4, padding: "2px 7px" }}>
                    {g.label}
                  </span>
                  <span style={{ fontSize: 10, color: T.t3 }}>{g.items.length}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {g.items.map((it, j) => (
                    <span key={j} style={{ fontSize: 11, color: T.t2, background: "#0d111788", border: `1px solid ${T.border}`, borderRadius: 5, padding: "3px 8px" }}>{it}</span>
                  ))}
                </div>
              </div>
            );
          })}

          <div style={{ fontSize: 11.5, color: T.t3, lineHeight: 1.6, borderLeft: `2px solid ${T.border2}`, paddingLeft: 10, margin: "12px 0 8px" }}>
            {q2Preview.note}
          </div>
          <div style={{ fontSize: 10, color: T.t3 }}>
            <span style={{ fontWeight: 700 }}>Sources:</span> {q2Preview.sources} · Updated {q2Preview.updated}
          </div>
        </div>
      </div>

      {/* ── MACRO NARRATIVE ─────────────────────────────────────── */}
      <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ background: "linear-gradient(135deg, #0d1830 0%, #111827 60%, #0d1117 100%)", padding: "20px 20px", borderBottom: `1px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 80% 50%, #58a6ff10, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 6, position: "relative" }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: T.t3 }}>
              {macroNarrative.quarter} · Macro Synthesis
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: T.accent, background: T.accentBg, border: `1px solid ${T.accent}40`, borderRadius: 4, padding: "2px 7px", whiteSpace: "nowrap" }}>
              {macroNarrative.edition}
            </div>
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

      {/* ── ARTICLE ARCHIVE ─────────────────────────────────────── */}
      {macroArchive.length > 0 && (
        <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.border}`, padding: "14px 20px", marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: T.t3, marginBottom: 4 }}>
            Article Archive
          </div>
          <div style={{ fontSize: 12, color: T.t3, marginBottom: 10 }}>
            Earlier editions of the macro synthesis, preserved unedited as filings data was verified and revised.
          </div>
          {macroArchive.map((a, i) => {
            const isOpen = openArchive === i;
            return (
              <div key={i} style={{ border: `1px solid ${T.border}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
                <div
                  onClick={() => setOpenArchive(isOpen ? null : i)}
                  style={{ padding: "11px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, userSelect: "none", background: isOpen ? T.cardAlt : "transparent", transition: "background 0.15s" }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: T.trim, background: T.trimBg, border: `1px solid ${T.trim}40`, borderRadius: 4, padding: "2px 7px" }}>
                        Superseded
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: T.t3 }}>{a.quarter} · {a.edition}</span>
                    </div>
                    <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 14, color: T.t2, lineHeight: 1.3 }}>
                      {a.headline}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: T.t3, flexShrink: 0, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>›</div>
                </div>
                {isOpen && (
                  <div style={{ padding: "14px 14px 6px", borderTop: `1px solid ${T.border}` }}>
                    <div style={{ fontSize: 12, color: T.trim, background: T.trimBg, border: `1px solid ${T.trim}30`, borderRadius: 6, padding: "10px 12px", lineHeight: 1.6, marginBottom: 14 }}>
                      <span style={{ fontWeight: 700 }}>Editor's note:</span> {a.archivedNote}
                    </div>
                    {a.paragraphs.map((para, j) => (
                      <div key={j} style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: T.t3, marginBottom: 4 }}>{para.title}</div>
                        <div style={{ fontSize: 12.5, color: T.t3, lineHeight: 1.65 }}>{para.body}</div>
                      </div>
                    ))}
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: T.t3, margin: "4px 0 8px" }}>Key Signals (as published)</div>
                    {a.keySignals.map((s, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 11.5 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.t3, marginTop: 6, flexShrink: 0 }} />
                        <div>
                          <span style={{ fontWeight: 700, color: T.t2 }}>{s.label}:</span>{" "}
                          <span style={{ color: T.t3 }}>{s.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

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
        Analysis reflects Q2 2026 13F filings where confirmed; 8 late/quant filers still show their verified Q1 2026 book (flagged per card) and Scion is wound down. Conviction scores are mechanical — they do not account for position sizing, fund strategy, or non-disclosed short positions. This is not investment advice.
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
            {(() => {
              const badge = fund.defunct
                ? { label: "Deregistered", c: T.sell, bg: T.sellBg }
                : fund.pending
                ? { label: "Q2 pending", c: T.trim, bg: T.trimBg }
                : fund.partial
                ? { label: "Q2 partial", c: T.accent, bg: T.accentBg }
                : { label: fund.quarter, c: T.buy, bg: T.buyBg };
              return (
                <span style={{
                  fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8,
                  padding: "1px 6px", borderRadius: 4,
                  background: badge.bg, color: badge.c, border: `1px solid ${badge.c}30`,
                }}>{badge.label}</span>
              );
            })()}
          </div>
          <div style={{ fontSize: 12, color: T.t3, marginTop: 2 }}>{fund.manager} · {fund.aum} · {fund.holdings} holdings</div>
          {(fund.pending || fund.partial || fund.defunct) && (
            <div style={{
              fontSize: 11, marginTop: 5, lineHeight: 1.5,
              color: fund.defunct ? T.sell : fund.partial ? T.accent : T.trim,
              background: fund.defunct ? T.sellBg : fund.partial ? T.accentBg : T.trimBg,
              border: `1px solid ${(fund.defunct ? T.sell : fund.partial ? T.accent : T.trim)}30`,
              borderRadius: 6, padding: "6px 9px",
            }}>
              {fund.pending || fund.partial || fund.defunct}
            </div>
          )}
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
            {q4 ? `${q4.label} → ${fund.quarter}` : "Prior-quarter comparison"}
          </div>
          {!q4 ? (
            <span style={{ color: T.t3, fontStyle: "italic" }}>No prior-quarter comparison available</span>
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
            Q2 2026 · 13F Filings
          </div>
          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 32, fontWeight: 900, color: T.t1, margin: "0 0 8px",
            lineHeight: 1.1, letterSpacing: -0.5,
          }}>
            13F Institutional Tracker
          </h1>
          <p style={{ fontSize: 13, color: T.t2, margin: "0 0 20px", lineHeight: 1.5 }}>
            SEC 13F filings from 20 elite hedge funds &amp; investors · Q2 2026 (as of Jun 30, 2026)
          </p>

          {/* Stat pills */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {[
              { label: "20 Filers",          icon: "◈" },
              { label: "~$1.4T AUM tracked", icon: "◎" },
              { label: "Filed Aug 2026",      icon: "◷" },
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
            >{showQ4 ? "◈ QoQ ON" : "◈ QoQ Compare"}</button>
          </div>

          {visibleFilers.map((fund) => (
            <FundCard key={fund.name} fund={fund} isOpen={query ? true : !!openFunds[fund.name]} onToggle={() => toggle(fund.name)} query={query} onTickerClick={openTicker} showQ4={showQ4} />
          ))}
        </div>
      )}

      {tab === "sectors" && (
        <div className="fade-up">
          <div style={{ fontSize: 13, color: T.t3, marginBottom: 14, lineHeight: 1.6 }}>
            Where multiple top filers are converging in Q2 2026:
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
            Notable full exits and large reductions by major filers in Q2 2026:
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

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ContactButton from "./ContactButton";

const mrpSteps = [
  { key: "a", label: "Capture", title: "Sales orders arrive", description: "Incoming sales orders are fetched from the Zoho ERP workspace, giving planning one reliable starting point." },
  { key: "b", label: "Consolidate", title: "Demand becomes one", description: "Repeated product lines merge automatically into one demand table. This prevents duplicate counting and removes manual reconciliation." },
  { key: "c", label: "Compare", title: "Use finished stock first", description: "Demand is compared with assembled inventory. Covered orders turn green. Shortages stay red and continue to the next step." },
  { key: "d", label: "BOM", title: "BOM explosion", description: "The remaining demand expands through each bill of materials, including any subassemblies, until every required component is visible." },
  { key: "e", label: "Evaluate", title: "Check supply conditions", description: "Stock on hand, confirmed incoming quantities, arrival dates and supplier lead times determine whether purchasing action is needed." },
  { key: "f", label: "Release", title: "Give buyers the answer", description: "A final buyer report states exactly what to order, from whom and when so materials arrive just in time." },
];

function Topbar({ section }: { section: string }) {
  return (
    <nav className="project-nav">
      <Link href="/#outcomes" className="back-link" aria-label="Back to project grid"><span className="back-arrow">←</span><span className="back-text">All projects</span></Link>
      <span className="nav-section">{section}</span>
      <div className="nav-actions"><ContactButton /></div>
    </nav>
  );
}

function ZohoMockup() {
  return <div className="ui-window zoho-mock">
    <div className="ui-titlebar"><span className="window-dots">● ● ●</span><strong>Zoho ERP · Sales Orders</strong><span>Live</span></div>
    <div className="ui-toolbar"><span>Open sales orders</span><button>+ New order</button></div>
    <div className="mini-table">
      <div className="table-row table-head"><span>SO #</span><span>Customer</span><span>Product</span><span>Qty</span><span>Expected delivery</span></div>
      {[['1048','Atlas Labs','AX-410','24','Aug 14'],['1049','Kinetic Co.','VT-200','12','Aug 18'],['1050','Meridian','AX-410','36','Aug 22'],['1051','Forge Works','NX-075','18','Aug 28']].map((r,i)=><div className="table-row incoming-row" style={{'--i': i} as React.CSSProperties} key={r[0]}>{r.map(c=><span key={c}>{c}</span>)}</div>)}
    </div>
  </div>;
}

function ConsolidateMockup() {
  const rows = [['AX-410','24'],['VT-200','12'],['AX-410','36'],['NX-075','18']];
  return <div className="consolidate-mock">
    <div className="demand-stack">{rows.map((r,i)=><div className={`demand-pill demand-${i}`} key={i}><span>{r[0]}</span><b>{r[1]}</b></div>)}</div>
    <div className="merge-beam"><span>CONSOLIDATE</span></div>
    <div className="unified-table"><p>UNIFIED DEMAND</p><div><span>AX-410</span><b>60</b></div><div><span>VT-200</span><b>12</b></div><div><span>NX-075</span><b>18</b></div></div>
  </div>;
}

function StockMockup() {
  const rows = [
    ['AX-410','60','72','12 available','covered'],
    ['VT-200','12','4','8 short','short'],
    ['NX-075','18','2','16 short','short'],
    ['QX-320','8','11','3 available','covered'],
  ];
  return <div className="comparison-panel">
    <header><div><small>STOCK COVERAGE</small><strong>Demand comparison</strong></div><span>04 PRODUCTS</span></header>
    <div className="comparison-row comparison-head"><span>Product</span><span>Demand</span><span>Assembled</span><span>Result</span></div>
    {rows.map((row, index)=><div className={`comparison-row ${row[4]}`} style={{'--i': index} as React.CSSProperties} key={row[0]}><b>{row[0]}</b><span>{row[1]}</span><span>{row[2]}</span><strong><i />{row[3]}</strong></div>)}
    <footer><span><i className="coverage-dot" />Stock covers demand</span><span><i className="shortage-dot" />Purchasing required</span></footer>
  </div>;
}

function BomMockup() {
  return <div className="bom-flow" role="img" aria-label="VT 200 product expands from left to right into components and a control subassembly">
    <div className="bom-product"><small>PRODUCT</small><span>VT-200</span><b>× 8</b></div>
    <span className="bom-root-link" aria-hidden="true" />
    <div className="bom-level-one">
      <div className="bom-branch">
        <div className="bom-node"><small>COMPONENT</small><span>Spacer 3/8</span><b>× 8</b></div>
      </div>
      <div className="bom-branch bom-nested">
        <div className="bom-node bom-assembly"><small>SUBASSEMBLY</small><span>Control assembly</span><b>× 8</b></div>
        <span className="bom-child-link" aria-hidden="true" />
        <div className="bom-children">
          <div className="bom-child"><small>COMPONENT</small><span>Controller PCB</span><b>× 8</b></div>
          <div className="bom-child"><small>COMPONENT</small><span>Sensor board</span><b>× 8</b></div>
        </div>
      </div>
      <div className="bom-branch">
        <div className="bom-node"><small>COMPONENT</small><span>Fastener M4</span><b>× 64</b></div>
      </div>
    </div>
  </div>;
}

function SupplyMockup() {
  return <div className="supply-cards">
    <div className="component-card action"><div><span>CONTROLLER PCB</span><b>ACTION</b></div><dl><div><dt>On hand</dt><dd>2 units</dd></div><div><dt>Incoming quantity</dt><dd>0 units</dd></div><div><dt>Arrival date</dt><dd>None</dd></div><div><dt>Lead time</dt><dd>21 days</dd></div></dl><p>Order 6 units by Aug 04</p></div>
    <div className="component-card safe"><div><span>SPACER 3/8</span><b>COVERED</b></div><dl><div><dt>On hand</dt><dd>4 units</dd></div><div><dt>Incoming quantity</dt><dd>12 units</dd></div><div><dt>Arrival date</dt><dd>Aug 09</dd></div><div><dt>Lead time</dt><dd>14 days</dd></div></dl><p>No action required</p></div>
  </div>;
}

function BuyersMockup() {
  return <div className="ui-window buyers-mock">
    <div className="report-header"><div><small>FINAL OUTPUT</small><h3>Buyers’ Report</h3></div><button>Export CSV ↗</button></div>
    <div className="report-stats"><span><b>03</b> actions</span><span><b>$18.4K</b> planned</span><span><b>100%</b> timed</span></div>
    <div className="mini-table"><div className="table-row table-head"><span>Supplier</span><span>Part</span><span>Qty</span><span>Order by</span></div>{[['Orion Supply','PCB-218','6','Aug 04'],['Summit Metals','NX-HSG','16','Aug 07'],['Vertex Parts','FT-M4','96','Aug 12']].map(r=><div className="table-row" key={r[1]}>{r.map(c=><span key={c}>{c}</span>)}</div>)}</div>
  </div>;
}

const visuals = [<ZohoMockup key="a"/>,<ConsolidateMockup key="b"/>,<StockMockup key="c"/>,<BomMockup key="d"/>,<SupplyMockup key="e"/>,<BuyersMockup key="f"/>];

function MrpPage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step)); }), { rootMargin: '-35% 0px -45%', threshold: 0 });
    document.querySelectorAll('[data-step]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <main className="project-page mrp-page">
    <Topbar section="01 / MRP Automation" />
    <header className="project-hero">
      <p className="eyebrow">Planning system · Case study 01</p>
      <h1>From five days<br />to <em>half a day.</em></h1>
      <div className="hero-metric"><strong>90%</strong><span>reduction in order<br />processing time</span></div>
      <p className="hero-deck">A complete material requirements planning workflow that transforms live sales demand into a just in time buyers’ report.</p>
      <span className="scroll-cue">Scroll through the system ↓</span>
    </header>
    <section className="sticky-story">
      <div className="story-visual"><div className="visual-stage">{visuals.map((visual,i)=><div className={`visual-layer ${active===i?'active':''}`} key={i}>{visual}</div>)}</div><div className="step-progress">{mrpSteps.map((s,i)=><span className={active===i?'active':''} key={s.key}>{s.key}</span>)}</div></div>
      <div className="story-copy">{mrpSteps.map((step,i)=><article data-step={i} className={active===i?'active':''} key={step.key}><div className="step-tag"><span>{step.key}</span>{step.label}</div><h2>{step.title}</h2><p>{step.description}</p></article>)}</div>
    </section>
    <section className="outcome-band"><p>System outcome</p><h2>Demand in.<br /><em>Decisions out.</em></h2><div><span>5 days</span><i>→</i><strong>0.5 days</strong></div></section>
  </main>;
}

const inventoryValues = [
  { label: '01 MAR', value: 9.631834 },
  { label: '01 APR', value: 9.82818 },
  { label: '01 MAY', value: 10 },
  { label: '01 JUN', value: 9.508768 },
  { label: '01 JUL', value: 9.091549 },
  { label: '01 AUG', value: 8.501866 },
  { label: '01 SEP', value: 7.91553 },
];

const inventoryEvents = [
  { index: 2, threshold: 0, date: '01 MAY', title: 'Internship objective' },
  { index: 2.45, threshold: 1, date: 'MID MAY', title: 'Just in time ordering' },
  { index: 3.47, threshold: 2, date: 'MID JUN', title: 'Dynamic safety stocks' },
  { index: 4, threshold: 3, date: '01 JUL', title: 'Cycle counting' },
  { index: 4.97, threshold: 4, date: 'END JUL', title: 'Obsolete products recycled' },
];

const inventoryReadouts = [
  ...inventoryEvents.map(({date,title})=>({date,title})),
  { date: '01 SEP', title: '21% below the May peak' },
];

const inventoryStepToPoint = [2,3,4,4,5,6];

function InventoryChart({ active }: { active: number }) {
  const activeStep = Math.max(0, Math.min(inventoryStepToPoint.length - 1, active));
  const visible = inventoryStepToPoint[activeStep];
  const readout = inventoryReadouts[activeStep];
  const chartLeft = 70;
  const chartRight = 900;
  const chartTop = 56;
  const chartBottom = 360;
  const step = (chartRight - chartLeft) / (inventoryValues.length - 1);
  const xForIndex = (index: number) => chartLeft + index * step;
  const yForValue = (value: number) => chartBottom - (value / 10) * (chartBottom - chartTop);
  const valueAtIndex = (index: number) => {
    const start = Math.floor(index);
    const end = Math.min(inventoryValues.length - 1, Math.ceil(index));
    const progress = index - start;
    return inventoryValues[start].value + (inventoryValues[end].value - inventoryValues[start].value) * progress;
  };
  const points = inventoryValues.map((entry,i)=>`${xForIndex(i)},${yForValue(entry.value)}`).join(' ');
  const area = `${chartLeft},${chartBottom} ${points} ${chartRight},${chartBottom}`;
  return <div className="inventory-chart-wrap">
    <div className="chart-caption"><span>NORMALIZED INVENTORY VALUE</span><b>${inventoryValues[visible].value.toFixed(2)}M</b></div>
    <svg viewBox="0 0 940 430" role="img" aria-label="Normalized inventory value from March 1 to September 1, scaled between zero and ten million dollars while preserving the original percentage changes">
      <defs><linearGradient id="areaFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c8ff2d" stopOpacity=".42"/><stop offset="1" stopColor="#c8ff2d" stopOpacity="0"/></linearGradient><clipPath id="chartReveal"><rect x="0" y="0" width={xForIndex(visible) + 8} height="430" className="chart-reveal"/></clipPath></defs>
      {[0,2,4,6,8,10].map(value=><g key={value}><line x1={chartLeft} x2={chartRight} y1={yForValue(value)} y2={yForValue(value)} stroke="#2f332e"/><text x="58" y={yForValue(value)+4} textAnchor="end" fill="#747a72" fontSize="10">${value}M</text></g>)}
      <polygon points={area} fill="url(#areaFade)" clipPath="url(#chartReveal)"/>
      <polyline points={points} fill="none" stroke="#c8ff2d" strokeWidth="6" strokeLinejoin="round" clipPath="url(#chartReveal)"/>
      {inventoryValues.map((entry,i)=>i<=visible?<circle key={entry.label} cx={xForIndex(i)} cy={yForValue(entry.value)} r={i===visible?8:4} fill={i===visible?'#f1f3ee':'#c8ff2d'}/>:null)}
      {inventoryEvents.map((event,index)=>event.threshold<=activeStep?<g className={`inventory-event-marker${event.threshold===Math.min(activeStep,4)?' current':''}`} style={{'--event':index} as React.CSSProperties} key={event.date}><line className="event-guide" x1={xForIndex(event.index)} x2={xForIndex(event.index)} y1={chartTop} y2={chartBottom}/><circle cx={xForIndex(event.index)} cy={yForValue(valueAtIndex(event.index))} r="13"/><text className="event-number" x={xForIndex(event.index)} y={yForValue(valueAtIndex(event.index))+3} textAnchor="middle">{String(index+1).padStart(2,'0')}</text></g>:null)}
      {inventoryValues.map((entry,i)=><text key={entry.label} x={xForIndex(i)} y="400" textAnchor="middle" fill="#8a9088" fontSize="10">{entry.label}</text>)}
      <text className="axis-title" x="18" y="224" transform="rotate(-90 18 224)">INVENTORY VALUE</text>
      <text className="axis-title" x="900" y="424" textAnchor="end">2026 TIMELINE</text>
    </svg>
    <div className="inventory-event-readout" key={readout.date}><strong>{readout.title}</strong></div>
  </div>;
}

function InventoryPage() {
  const [active,setActive]=useState(0);
  useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(Number((entry.target as HTMLElement).dataset.inventoryStep))}),{rootMargin:'-35% 0px -45%',threshold:0});document.querySelectorAll('[data-inventory-step]').forEach(element=>observer.observe(element));return()=>observer.disconnect()},[]);
  return <main className="project-page inventory-page">
    <Topbar section="02 / Inventory Reduction"/>
    <header className="inventory-hero"><p className="eyebrow">Working capital · Case study 02</p><h1>Less stock.<br/><em>More agility.</em></h1><div className="inventory-stat"><span>From the May peak</span><s>$10.0M</s><strong>$7.9M</strong><small>21% reduction</small><p className="inventory-confidentiality">Percentages reflect actual project outcomes. Dollar values are fictionalized to protect confidential information.</p></div></header>
    <section className="chart-story">
      <div className="chart-sticky"><InventoryChart active={active}/><div className={`end-percentage ${active===5?'complete':''}`}><strong>−21%</strong><span>from the normalized<br/>May peak</span></div></div>
      <div className="chart-scroll-copy">
        <article data-inventory-step="0"><span>May 01 · Internship objective</span><h2>Turn inventory into cash flow.</h2><p>I began the internship with one clear goal: release cash tied up in inventory so the company could reinvest in developing new products for the fall.</p></article>
        <article data-inventory-step="1"><span>Mid May · Just in time</span><h2>Order when demand requires it.</h2><p>Implemented just in time ordering using the newly built MRP replacing blanket replenishment with order dates calculated from demand and supplier lead time.</p></article>
        <article data-inventory-step="2"><span>Mid June · Dynamic safety stocks</span><h2>Set smarter inventory minimums.</h2><p>Safety stock levels began adapting to demand forecasts, protecting availability without keeping unnecessary quantities on hand for heavy rollers.</p></article>
        <article data-inventory-step="3"><span>July 01 · Cycle counting</span><h2>Improve inventory accuracy.</h2><p>Frequent targeted counts identified discrepancies earlier and made the inventory record more reliable for planning decisions allowing for a complete inventory count 4 times a year.</p></article>
        <article data-inventory-step="4"><span>End of July · Obsolete stock</span><h2>Remove inventory that no longer creates value.</h2><p>Obsolete products were identified and responsibly recycled instead of remaining hidden in carrying cost.</p></article>
        <article data-inventory-step="5"><span>September 01 · Result</span><h2>Free cash for what comes next.</h2><p>The normalized inventory value moved from $10.0M to $7.9M, a 21% decrease that created more room to invest in new product development.</p></article>
      </div>
    </section>
    <section className="outcome-band result-outcome"><p>Internship outcome</p><h2>Inventory value<br/><em>reduced.</em></h2><div><strong>21%</strong><span>May to September<br/>inventory reduction</span></div></section>
  </main>;
}

const quoteSteps = [
  { label: "01 / DRAWING EXTRACTION", title: "Package every drawing.", body: "Engineering drawings are gathered, compressed, and distributed to a fictional supplier list in one controlled action." },
  { label: "02 / QUOTE AGGREGATION", title: "Normalize every return.", body: "Every supplier workbooks arrive once, then settle into a single standardized sheet that keeps every quoted quantity, unit price and lead time comparable." },
  { label: "03 / BEST QUOTED PRICE", title: "Find the lowest quote per piece.", body: "The system checks every returned quote line by line and immediately identifies the best price per piece, while retaining supplier totals and delivery lead times." },
  { label: "04 / PRICE CURVE ANALYSIS", title: "Predict the exact order price.", body: "I reverse engineered supplier quotes at their given quantities to build intersecting price curves. This provides an accurate unit price prediction for the exact quantity ordered each time, with dollar risk and confidence kept visible." },
  { label: "05 / PO ISSUANCE", title: "Issue the purchase order.", body: "The winning bid flows directly into a completed PO, ready for digital approval and dispatch." },
];

function DrawingVisual(){return <div className="drawing-visual"><div className="file-cloud">{['DWG-101.pdf','DWG-102.step','DWG-103.pdf','DWG-104.dxf','DWG-105.pdf'].map((f,i)=><span style={{'--i':i} as React.CSSProperties} key={f}>{f}</span>)}</div><div className="zip-box"><b>RFQ<br/>PACKAGE</b><small>5 files · ZIP</small></div><div className="mail-flight"><span>↗</span><div><b>TO</b> bids@orion.example<br/>quotes@summit.example<br/>rfq@vertex.example</div></div></div>}

const consolidatedRows = [
  ["PRT-210-1002", "1", "Support plate", "2", "2", "$118.40", "3 wk", "4", "$112.10", "4 wk", "2", "$121.80", "3 wk"],
  ["PRT-210-1003", "1", "Cross bar", "2", "2", "$111.28", "3 wk", "4", "$69.57", "3 wk", "2", "$116.20", "4 wk"],
  ["PRT-210-1004", "1", "Removable plate A", "1", "1", "$262.80", "3 wk", "3", "$199.20", "3 wk", "1", "$258.40", "5 wk"],
  ["PRT-210-1005", "1", "Removable plate B", "1", "1", "$262.80", "3 wk", "5", "$190.00", "3 wk", "1", "$255.10", "5 wk"],
];

function AggregateVisual() {
  return <div className="aggregate-visual quote-aggregate">
    <div className="quote-files" aria-hidden="true">
      {["ORION_QUOTE.xlsx", "SUMMIT_BID.xlsx", "VERTEX_RFQ.xlsx"].map((file, index) => <div className={`quote-file file-${index + 1}`} key={file}><span>X</span>{file}</div>)}
    </div>
    <div className="consolidated-workbook">
      <div className="workbook-title"><span>X</span><b>CONSOLIDATED_QUOTES.xlsx</b><small>3 supplier files aligned</small></div>
      <div className="quote-table-scroll">
        <table className="quote-grid-table">
          <thead><tr><th rowSpan={2}>Part number</th><th rowSpan={2}>Rev</th><th rowSpan={2}>Description</th><th rowSpan={2}>Qty / BOM</th><th colSpan={3}>Orion #210</th><th colSpan={3}>Summit #1038</th><th colSpan={3}>Vertex #8250</th></tr><tr>{Array.from({ length: 3 }).flatMap((_, supplier) => [<th key={`${supplier}-qty`}>Qty</th>, <th key={`${supplier}-price`}>Unit price</th>, <th key={`${supplier}-lead`}>Lead time</th>])}</tr></thead>
          <tbody>{consolidatedRows.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className="workbook-status"><b>48</b> normalized price points <span>READY FOR COMPARISON ✓</span></div>
    </div>
  </div>;
}

const bestQuoteRows = [
  { part: "PRT-210-1002", qty: 2, prices: [118.40, 109.80, 115.90, 112.25] },
  { part: "PRT-210-1003", qty: 2, prices: [111.28, 105.00, 120.00, 108.40] },
  { part: "PRT-210-1004", qty: 1, prices: [262.80, 631.50, 635.00, 450.00] },
  { part: "PRT-210-1005", qty: 1, prices: [262.80, 631.50, 635.00, 450.00] },
];
const bestQuoteSuppliers = ["Orion #210", "Summit #1038", "MetroFab #8250", "Nova #4402"];

function BestPriceVisual() {
  const totals = bestQuoteSuppliers.map((_, supplier) => bestQuoteRows.reduce((sum, row) => sum + row.prices[supplier] * row.qty, 0));
  return <div className="best-price-panel">
    <header><div><span>PRICE ENGINE</span><b>Best quoted price per piece</b></div><strong>4 / 4 MATCHED</strong></header>
    <div className="best-price-scroll"><table className="best-price-table"><thead><tr><th>Part number</th><th>Qty / BOM</th>{bestQuoteSuppliers.map(name => <th key={name}>{name}</th>)}</tr></thead><tbody>
      {bestQuoteRows.map(row => { const lowest = Math.min(...row.prices); return <tr key={row.part}><td>{row.part}</td><td>{row.qty}</td>{row.prices.map((price, supplier) => <td className={price === lowest ? "best-quote" : ""} key={bestQuoteSuppliers[supplier]}>{price === lowest && <i>BEST</i>}${price.toFixed(2)}</td>)}</tr>; })}
      <tr className="summary-row"><th colSpan={2}>Supplier total</th>{totals.map((total, index) => <td key={bestQuoteSuppliers[index]}>${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>)}</tr>
      <tr className="summary-row"><th colSpan={2}>Delivery lead time</th>{["3 weeks", "6 weeks", "4 weeks", "5 weeks"].map((lead, index) => <td key={`${lead}-${index}`}>{lead}</td>)}</tr>
    </tbody></table></div>
    <footer><span className="best-swatch"/>Lowest quoted price automatically detected on every part</footer>
  </div>;
}

const supplierCurves = [
  { name: "Orion", fullName: "Orion Industrial", className: "curve-one", confidence: 94, riskBase: 1.65, price: (quantity: number) => 15 + 59 / Math.pow(quantity / 50, .45) },
  { name: "Summit", fullName: "Summit Works", className: "curve-two", confidence: 87, riskBase: 2.15, price: (quantity: number) => 24 + 44 / Math.pow(quantity / 50, .55) },
  { name: "Vertex", fullName: "Vertex Supply", className: "curve-three", confidence: 97, riskBase: 1.25, price: (quantity: number) => 30 + 33 / Math.pow(quantity / 50, .75) },
];
const curveX = (quantity: number) => 60 + ((quantity - 50) / 950) * 610;
const curveY = (price: number) => 280 - ((price - 27) / 50) * 240;

function CurveVisual() {
  const [quantity, setQuantity] = useState(500);
  const quotes = supplierCurves.map(supplier => {
    const price = supplier.price(quantity);
    return { ...supplier, value: price, risk: supplier.riskBase + price * .018 };
  });
  const winner = quotes.reduce((best, quote) => quote.value < best.value ? quote : best, quotes[0]);
  const liveX = curveX(quantity);
  const moveQuantity = (clientX: number, bounds: DOMRect) => {
    const svgX = ((clientX - bounds.left) / bounds.width) * 700;
    const clampedX = Math.min(670, Math.max(60, svgX));
    setQuantity(Math.round(50 + ((clampedX - 60) / 610) * 950));
  };
  return <div className="curve-panel interactive-curve">
    <div className="curve-toolbar"><span>LIVE QUANTITY</span><strong>{quantity.toLocaleString()} <small>pieces</small></strong><em>Move across the chart</em></div>
    <div className="curve-readout">{quotes.map(quote => <div className={quote.name === winner.name ? "winner" : ""} key={quote.name}><b>{quote.name}</b><span>${quote.value.toFixed(2)}<small>/ unit</small></span><dl><div><dt>Risk</dt><dd>±${quote.risk.toFixed(2)}</dd></div><div><dt>Confidence</dt><dd>{quote.confidence}%</dd></div></dl></div>)}</div>
    <svg viewBox="0 0 700 330" aria-label={`Supplier unit price estimates at ${quantity} pieces`} onPointerMove={event => moveQuantity(event.clientX, event.currentTarget.getBoundingClientRect())} onPointerDown={event => moveQuantity(event.clientX, event.currentTarget.getBoundingClientRect())}>
      <g className="curve-grid">{[40, 100, 160, 220, 280].map(y => <line key={y} x1="60" y1={y} x2="670" y2={y}/>)}</g>
      <line x1="60" y1="280" x2="670" y2="280" className="curve-axis"/><line x1="60" y1="35" x2="60" y2="280" className="curve-axis"/>
      <text x="590" y="315">QUANTITY</text><text x="18" y="115" transform="rotate(-90 18 115)">UNIT PRICE</text>
      {supplierCurves.map(supplier => <polyline key={supplier.name} points={Array.from({ length: 64 }, (_, index) => { const q = 50 + index * (950 / 63); return `${curveX(q)},${curveY(supplier.price(q))}`; }).join(" ")} className={`curve ${supplier.className}`}/>)}
      <rect x="60" y="35" width="610" height="245" className="curve-hit-area"/>
      <line x1={liveX} y1="35" x2={liveX} y2="280" className="live-quantity-line"/>
      {quotes.map(quote => <circle key={quote.name} cx={liveX} cy={curveY(quote.value)} r={quote.name === winner.name ? 7 : 5} className={`curve-point ${quote.className} ${quote.name === winner.name ? "selected" : ""}`}/>)}
      <g className="quantity-label" transform={`translate(${Math.min(575, Math.max(65, liveX - 42))} 38)`}><rect width="84" height="24" rx="2"/><text x="42" y="16" textAnchor="middle">QTY {quantity}</text></g>
    </svg>
    <div className="winner-tag">Best predicted price at {quantity.toLocaleString()} pieces · {winner.fullName}</div>
  </div>;
}
function PoVisual(){return <div className="po-visual"><div className="po-document"><div className="po-head"><b>PO</b><span>PURCHASE ORDER<br/># PO-260814</span></div><dl><dt>Supplier</dt><dd>Vertex Supply</dd><dt>Item</dt><dd>Precision Housing A7</dd><dt>Quantity</dt><dd>500 units</dd><dt>Unit price</dt><dd>$35.87</dd><dt>Delivery</dt><dd>September 18</dd></dl><div className="po-total">TOTAL <b>$17,935.00</b></div><span className="approved-stamp">AUTO<br/>APPROVED</span></div><div className="send-beam">SENT TO SUPPLIER <span>✓</span></div></div>}
const quoteVisuals = [DrawingVisual, AggregateVisual, BestPriceVisual, CurveVisual, PoVisual];

function QuotationPage(){const[active,setActive]=useState(0);useEffect(()=>{const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(Number((e.target as HTMLElement).dataset.quote))}),{rootMargin:'-35% 0px -45%'});document.querySelectorAll('[data-quote]').forEach(el=>o.observe(el));return()=>o.disconnect()},[]);return <main className="project-page quotation-page"><Topbar section="03 / Automatic Quotation"/><header className="quote-hero"><div><p className="eyebrow">Sourcing automation · Case study 03</p><h1>RFQ to PO.<br/><em>Zero handoffs.</em></h1></div><div className="quote-pipeline">{['DRAWINGS','QUOTES','BEST PRICE','PREDICTION','PO'].map((x,i)=><span key={x}>{x}{i<4&&<b>→</b>}</span>)}</div><p>One automated sourcing loop transforms engineering documents into an issued purchase order with every decision traceable.</p></header><section className="quote-story"><div className="quote-visual-sticky"><div className="quote-stage">{quoteVisuals.map((Visual,i)=><div className={`quote-layer ${active===i?'active':''}`} key={Visual.name}><Visual/></div>)}</div></div><div className="quote-copy">{quoteSteps.map((s,i)=><article data-quote={i} className={active===i?'active':''} key={s.label}><small>{s.label}</small><h2>{s.title}</h2><p>{s.body}</p></article>)}</div></section><section className="outcome-band result-outcome"><p>Sourcing outcome</p><h2>RFQ to PO.<br/><em>Fully automated.</em></h2><div><strong>0</strong><span>Manual steps<br/>across the pipeline</span></div></section></main>}

type SupplierMetric={name:string;nonConformity:number;onTime:number;averageDelay:number;score:number};
const supplierMetrics:Record<number,SupplierMetric[]>={
  6:[
    {name:'Orion Manufacturing',nonConformity:1.4,onTime:86,averageDelay:43,score:85},
    {name:'Vertex Components',nonConformity:3.2,onTime:95,averageDelay:29,score:92},
    {name:'Summit Industrial',nonConformity:2.1,onTime:90,averageDelay:38,score:89},
    {name:'Northline Fabrication',nonConformity:5.4,onTime:82,averageDelay:49,score:75},
    {name:'MetroFab Supply',nonConformity:4.0,onTime:92,averageDelay:41,score:84},
  ],
  9:[
    {name:'Orion Manufacturing',nonConformity:1.6,onTime:88,averageDelay:42,score:87},
    {name:'Vertex Components',nonConformity:3.4,onTime:94,averageDelay:30,score:91},
    {name:'Summit Industrial',nonConformity:2.2,onTime:91,averageDelay:40,score:89},
    {name:'Northline Fabrication',nonConformity:5.2,onTime:83,averageDelay:48,score:77},
    {name:'MetroFab Supply',nonConformity:4.1,onTime:92,averageDelay:43,score:83},
  ],
  12:[
    {name:'Orion Manufacturing',nonConformity:1.8,onTime:87,averageDelay:44,score:86},
    {name:'Vertex Components',nonConformity:3.6,onTime:93,averageDelay:31,score:90},
    {name:'Summit Industrial',nonConformity:2.4,onTime:89,averageDelay:39,score:88},
    {name:'Northline Fabrication',nonConformity:5.1,onTime:84,averageDelay:47,score:78},
    {name:'MetroFab Supply',nonConformity:4.2,onTime:91,averageDelay:42,score:83},
  ],
};

function SupplierReliability({range}:{range:number}){
  const[sort,setSort]=useState<'score'|'quality'|'onTime'|'delay'>('score');
  const ranked=[...(supplierMetrics[range]??supplierMetrics[12])].sort((a,b)=>sort==='quality'?a.nonConformity-b.nonConformity:sort==='onTime'?b.onTime-a.onTime:sort==='delay'?a.averageDelay-b.averageDelay:b.score-a.score);
  return <div className="supplier-ranking"><div className="ranking-controls"><span>Rank by</span>{(['score','quality','onTime','delay'] as const).map(option=><button className={sort===option?'active':''} onClick={()=>setSort(option)} key={option}>{option==='onTime'?'On-time':option}</button>)}</div><div className="ranking-table"><div className="ranking-row ranking-head"><span>Rank</span><span>Supplier</span><span>Reliability score</span><span>Non-conformity returns</span><span>On-time delivery</span><span>Average delay</span></div>{ranked.map((supplier,index)=><div className="ranking-row" key={supplier.name}><strong>0{index+1}</strong><b>{supplier.name}</b><span className="score-cell"><i><em style={{width:`${supplier.score}%`}}/></i>{supplier.score}/100</span><span>{supplier.nonConformity.toFixed(1)}%</span><span>{supplier.onTime}%</span><span>{Math.round(supplier.averageDelay)} days</span></div>)}</div></div>;
}

const supplierMix:Record<number,number[]>={6:[36,27,21,16],9:[34,29,22,15],12:[34,28,23,15]};
function SupplierDonut({range}:{range:number}){
  const mix=supplierMix[range]??supplierMix[12];
  const names=['Orion','Summit','Vertex','Other'];
  const colors=['#c8ff2d','#4de9d5','#ff6a3d','#626760'];
  const depth=['#657e17','#1f7167','#87381f','#30332f'];
  const[selected,setSelected]=useState(0);
  const circumference=376.99;
  return <div className="depth-donut"><div className="depth-donut-chart"><svg viewBox="0 0 220 205" role="img" aria-label={`Supplier distribution for the selected ${range} month horizon`}><ellipse cx="110" cy="171" rx="79" ry="17" className="donut-shadow"/><g className="donut-depth">{mix.map((value,index)=>{const offset=mix.slice(0,index).reduce((sum,item)=>sum+item,0);return <circle key={`${range}-${names[index]}-depth`} cx="110" cy="105" r="60" fill="none" stroke={depth[index]} strokeWidth="34" strokeDasharray={`${value/100*circumference} ${circumference}`} strokeDashoffset={-offset/100*circumference} transform="rotate(-90 110 105)"/>})}</g><g className="donut-face">{mix.map((value,index)=>{const offset=mix.slice(0,index).reduce((sum,item)=>sum+item,0);return <circle className={selected===index?'selected':''} key={`${range}-${names[index]}`} cx="110" cy="96" r="60" fill="none" stroke={colors[index]} strokeWidth={selected===index?38:34} strokeDasharray={`${value/100*circumference} ${circumference}`} strokeDashoffset={-offset/100*circumference} transform="rotate(-90 110 96)" onPointerEnter={()=>setSelected(index)}/>})}</g><circle cx="110" cy="96" r="40" className="donut-core"/><text x="110" y="92" textAnchor="middle" className="donut-main-value">{mix[selected]}%</text><text x="110" y="111" textAnchor="middle" className="donut-main-label">{names[selected]}</text></svg><span className="donut-period">{range} MONTH VIEW</span></div><div className="donut-legend">{names.map((name,index)=><button className={selected===index?'active':''} onPointerEnter={()=>setSelected(index)} onFocus={()=>setSelected(index)} key={name}><i style={{background:colors[index]}}/><span>{name}</span><b>{mix[index]}%</b></button>)}</div></div>;
}

const dashboardMonths=['AUG','SEP','OCT','NOV','DEC','JAN','FEB','MAR','APR','MAY','JUN','JUL'];
const productSeries=[
  {name:'AX-410',color:'#c8ff2d',values:[84,92,118,132,98,76,64,72,96,124,138,116]},
  {name:'VT-200',color:'#4de9d5',values:[56,62,70,88,112,126,118,94,78,66,58,52]},
  {name:'NX-075',color:'#ff6a3d',values:[28,34,48,72,94,106,82,50,26,0,0,18]},
  {name:'QX-320',color:'#f1f3ee',values:[104,96,82,68,54,44,52,70,88,102,114,126]},
  {name:'AR-118',color:'#a57cff',values:[0,0,18,42,66,74,70,58,46,34,22,0]},
  {name:'MX-090',color:'#ffcc4d',values:[68,64,60,58,56,54,52,51,50,52,54,55]},
];
function ProductLines({range}:{range:number}){
  const start=12-range;
  const months=dashboardMonths.slice(start);
  const x=(index:number)=>72+index*(568/Math.max(1,range-1));
  const y=(value:number)=>270-value*1.5;
  const totals=productSeries.map(product=>({name:product.name,total:product.values.slice(start).reduce((sum,value)=>sum+value,0)})).sort((a,b)=>b.total-a.total);
  return <div className="product-lines"><div className="product-line-legend">{productSeries.map(product=><span className="active" key={product.name}><i style={{background:product.color}}/>{product.name}</span>)}</div><svg viewBox="0 0 680 325" role="img" aria-label={`Monthly assembled product volumes over the selected ${range} month horizon`}><g className="product-grid">{[0,40,80,120,160].map(value=><g key={value}><line x1="72" x2="640" y1={y(value)} y2={y(value)}/><text x="60" y={y(value)+3} textAnchor="end">{value}</text></g>)}</g><text x="19" y="145" transform="rotate(-90 19 145)" className="axis-title">UNITS ASSEMBLED</text>{productSeries.map(product=>{const values=product.values.slice(start);return <g className="product-series visible" style={{'--series-color':product.color} as React.CSSProperties} key={product.name}><polyline points={values.map((value,pointIndex)=>`${x(pointIndex)},${y(value)}`).join(' ')}/>{values.map((value,pointIndex)=><circle key={pointIndex} cx={x(pointIndex)} cy={y(value)} r="3"/>)}</g>})}<g className="product-months">{months.map((month,index)=><text key={month} x={x(index)} y="300" textAnchor="middle">{month}</text>)}</g></svg><div className="product-chart-footer"><span><i/>Monthly output · {range} month horizon</span><b>{totals[0].name} <strong>{totals[0].total.toLocaleString()}</strong> units assembled</b></div></div>;
}
type ForecastSeries={hist:number[];baseline:number[];optimistic:number[];pessimistic:number[];safety:number[]};
const forecasts:Record<string,ForecastSeries>={
  'PCB-218':{hist:[48,51,47,55,63,58,61,59,66,62,64,63],baseline:[62,65,63,67,66],optimistic:[69,73,71,75,74],pessimistic:[55,57,54,58,56],safety:[30,31,30,32,34,33,35,34,36,35,36,36,35,36,35,37,36]},
  'HSG-A7':{hist:[38,40,39,37,41,42,40,43,41,42,40,41],baseline:[42,41,43,42,44],optimistic:[47,46,49,48,50],pessimistic:[36,35,37,36,38],safety:[23,23,24,23,24,25,24,25,24,25,24,25,25,24,25,25,26]},
  'FST-M4':{hist:[72,68,64,60,58,62,70,82,94,88,80,74],baseline:[70,68,72,78,86],optimistic:[78,76,82,90,98],pessimistic:[62,60,63,67,72],safety:[45,44,43,42,41,42,44,47,50,49,47,46,45,44,45,47,50]},
};
type ChartPoint={x:number;y:number};
function smoothPath(points:ChartPoint[]){
  if(!points.length)return'';
  return points.slice(1).reduce((path,point,index)=>{const previous=points[index];const middle=(previous.x+point.x)/2;return `${path} C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`},`M ${points[0].x} ${points[0].y}`);
}
function Forecast({part,range}:{part:string;range:number}){
  const d=forecasts[part];
  const start=12-range;
  const history=d.hist.slice(start);
  const futureMonths=['AUG','SEP','OCT','NOV','DEC'];
  const labels=[...dashboardMonths.slice(start),...futureMonths];
  const combinedSafety=d.safety.slice(start);
  const count=labels.length;
  const[selected,setSelected]=useState(range-1);
  const capacity=part==='FST-M4'?112:part==='PCB-218'?88:68;
  const maxValue=Math.ceil((Math.max(capacity,...history,...d.optimistic)+8)/20)*20;
  const x=(index:number)=>70+index*(620/Math.max(1,count-1));
  const y=(value:number)=>250-value/maxValue*205;
  const historyPoints=history.map((value,index)=>({x:x(index),y:y(value)}));
  const currentIndex=history.length-1;
  const baselinePoints=[history[history.length-1],...d.baseline].map((value,index)=>({x:x(currentIndex+index),y:y(value)}));
  const optimisticPoints=[history[history.length-1],...d.optimistic].map((value,index)=>({x:x(currentIndex+index),y:y(value)}));
  const pessimisticPoints=[history[history.length-1],...d.pessimistic].map((value,index)=>({x:x(currentIndex+index),y:y(value)}));
  const safetyPoints=combinedSafety.map((value,index)=>({x:x(index),y:y(value)}));
  const areaPath=`${smoothPath(optimisticPoints)} ${smoothPath([...pessimisticPoints].reverse()).replace(/^M/,'L')} Z`;
  const futureIndex=selected-history.length;
  const selectedDemand=futureIndex<0?history[selected]:d.baseline[futureIndex];
  const selectedRange=futureIndex<0?`${history[selected]}`:`${d.pessimistic[futureIndex]}–${d.optimistic[futureIndex]}`;
  const setFromPointer=(clientX:number,bounds:DOMRect)=>{
    const svgX=(clientX-bounds.left)/bounds.width*720;
    const index=Math.round((Math.min(690,Math.max(70,svgX))-70)/620*(count-1));
    setSelected(Math.min(count-1,Math.max(0,index)));
  };
  return <div className="complex-forecast"><div className="forecast-legend"><span><i className="historical"/>Historical</span><span><i className="baseline"/>Baseline</span><span><i className="optimistic"/>Optimistic</span><span><i className="pessimistic"/>Constrained</span><span><i className="safety"/>Safety stock</span><span><i className="capacity"/>Capacity</span></div><div className="forecast-live-readout"><span><small>Selected month</small><b>{labels[selected]}</b></span><span><small>Expected demand</small><b>{selectedDemand} units</b></span><span><small>Forecast range</small><b>{selectedRange}</b></span><span><small>Safety stock</small><b>{combinedSafety[selected]} units</b></span></div><svg viewBox="0 0 720 330" className="forecast-chart" role="img" aria-label={`${part} demand forecast, capacity, safety stock and incoming supply over the selected ${range} month horizon`} onPointerMove={event=>setFromPointer(event.clientX,event.currentTarget.getBoundingClientRect())} onPointerDown={event=>setFromPointer(event.clientX,event.currentTarget.getBoundingClientRect())}><g className="forecast-grid">{[0,.25,.5,.75,1].map(ratio=>{const value=Math.round(maxValue*(1-ratio));return <g key={ratio}><line x1="70" x2="690" y1={45+ratio*205} y2={45+ratio*205}/><text x="59" y={49+ratio*205} textAnchor="end">{value}</text></g>})}</g><rect x={x(currentIndex)} y="45" width={690-x(currentIndex)} height="205" className="forecast-zone"/><path d={areaPath} className="forecast-range-band"/><path d={smoothPath(historyPoints)} className="forecast-hist"/><path d={smoothPath(baselinePoints)} className="forecast-baseline"/><path d={smoothPath(optimisticPoints)} className="forecast-optimistic"/><path d={smoothPath(pessimisticPoints)} className="forecast-pessimistic"/><path d={smoothPath(safetyPoints)} className="forecast-safety"/><line x1="70" x2="690" y1={y(capacity)} y2={y(capacity)} className="forecast-capacity"/><text x="686" y={y(capacity)-7} textAnchor="end">CAPACITY {capacity}</text><line x1={x(currentIndex)} x2={x(currentIndex)} y1="45" y2="250" className="forecast-now"/><text x={x(currentIndex)-7} y="277" textAnchor="end">NOW</text>{[{index:currentIndex+2,qty:72},{index:currentIndex+4,qty:96}].map(order=><g className="incoming-order" transform={`translate(${x(order.index)} ${y(capacity)-2})`} key={order.index}><path d="M0 0 L-7 -12 L7 -12 Z"/><text y="-18" textAnchor="middle">PO +{order.qty}</text></g>)}<rect x="70" y="45" width="620" height="205" className="forecast-hit"/><line x1={x(selected)} x2={x(selected)} y1="45" y2="250" className="forecast-cursor"/><circle cx={x(selected)} cy={y(selectedDemand)} r="6" className="forecast-selected-point"/><g className="forecast-months">{labels.map((month,index)=><text key={`${month}-${index}`} x={x(index)} y="292" textAnchor="end" transform={`rotate(-45 ${x(index)} 292)`}>{month}</text>)}</g></svg></div>
}

function KpiSparkline({points,tone}:{points:number[];tone:string}){
  const min=Math.min(...points);
  const max=Math.max(...points);
  const scale=Math.max(1,max-min);
  return <svg className={`kpi-spark ${tone}`} viewBox="0 0 120 35" aria-hidden="true"><polyline points={points.map((value,index)=>`${index*(120/(points.length-1))},${31-(value-min)/scale*27}`).join(' ')}/><circle cx="120" cy={31-(points[points.length-1]-min)/scale*27} r="3"/></svg>;
}

const exceptionRows=[
  {id:'PO-260814',issue:'Delivery confirmation overdue',supplier:'Summit',severity:'critical',due:'TODAY',exposure:'$184K',action:'Escalate confirmation request to the supplier account lead.'},
  {id:'PCB-218',issue:'Forecast above available supply',supplier:'Orion',severity:'critical',due:'2 DAYS',exposure:'$126K',action:'Advance the next order date and validate the optimistic demand case.'},
  {id:'HSG-A7',issue:'Safety stock below policy',supplier:'Vertex',severity:'watch',due:'5 DAYS',exposure:'$82K',action:'Review the next two production orders before adjusting the minimum.'},
  {id:'AX-410',issue:'Cycle count variance detected',supplier:'Internal',severity:'watch',due:'7 DAYS',exposure:'$70K',action:'Schedule a targeted count and hold automatic replenishment until verified.'},
] as const;

const exceptionRangeSummary:Record<number,{open:string;exposure:string;critical:string}>={
  6:{open:'04',exposure:'$462K',critical:'02'},
  9:{open:'07',exposure:'$701K',critical:'03'},
  12:{open:'11',exposure:'$1.04M',critical:'04'},
};
function ExceptionsQueue({range}:{range:number}){
  const[filter,setFilter]=useState<'all'|'critical'|'watch'>('all');
  const[selected,setSelected]=useState<(typeof exceptionRows)[number]['id']>(exceptionRows[0].id);
  const visible=exceptionRows.filter(row=>filter==='all'||row.severity===filter);
  const active=visible.find(row=>row.id===selected)??visible[0];
  const summary=exceptionRangeSummary[range]??exceptionRangeSummary[12];
  return <article className="dash-panel exceptions-panel">
    <header><div><small>05</small><h2>Operational Exceptions</h2></div><div className="exception-filters" aria-label="Exception severity filter">{(['all','critical','watch'] as const).map(option=><button className={filter===option?'active':''} onClick={()=>setFilter(option)} key={option}>{option}</button>)}</div></header>
    <div className="exception-summary"><span><b>{summary.open}</b>open exceptions</span><span><b>{summary.exposure}</b>value exposed</span><span><b>{summary.critical}</b>critical actions</span><em>{range} month view · Auto-ranked by operational impact</em></div>
    <div className="exception-layout"><div className="exception-table" role="table" aria-label="Operational exceptions"><div className="exception-row exception-head" role="row"><span>ID</span><span>Exception</span><span>Source</span><span>Due</span><span>Exposure</span></div>{visible.map(row=><button className={`exception-row ${row.severity} ${active.id===row.id?'selected':''}`} onClick={()=>setSelected(row.id)} key={row.id} role="row"><b>{row.id}</b><span>{row.issue}</span><span>{row.supplier}</span><strong>{row.due}</strong><em>{row.exposure}</em></button>)}</div><aside className="exception-inspector"><span>SELECTED EXCEPTION</span><b>{active.id}</b><h3>{active.issue}</h3><p>{active.action}</p><button>Open action plan <i>↗</i></button></aside></div>
  </article>;
}

function DashboardPage(){
  const[range,setRange]=useState(12);
  const[part,setPart]=useState('PCB-218');
  const[refreshedAt,setRefreshedAt]=useState('08:42');
  const[refreshing,setRefreshing]=useState(false);
  const start=12-range;
  const rangeProfile={6:{inventoryDelta:'−8.4%',lateOrders:7,lateCritical:3},9:{inventoryDelta:'−14.7%',lateOrders:12,lateCritical:5},12:{inventoryDelta:'−21.0%',lateOrders:18,lateCritical:7}}[range as 6|9|12];
  const inventoryHistory=[6.45,6.31,6.18,6.02,5.88,5.74,5.62,5.48,5.39,5.29,5.17,5.10];
  const lateOrderHistory=[3,5,4,6,5,7,4,6,8,5,9,7];
  const manufacturerShareHistory=[30,31,32,31,33,34,32,33,35,34,35,34];
  const topProduct=productSeries.map(product=>({product,total:product.values.slice(start).reduce((sum,value)=>sum+value,0)})).sort((a,b)=>b.total-a.total)[0];
  const currentMix=supplierMix[range]??supplierMix[12];
  const kpis=[
    {label:'Inventory valuation',value:'$5.10M',delta:`${rangeProfile.inventoryDelta} over ${range} months`,tone:'good',points:inventoryHistory.slice(start)},
    {label:'Most assembled product',value:topProduct.product.name,delta:`${topProduct.total.toLocaleString()} units`,tone:'cyan',points:topProduct.product.values.slice(start)},
    {label:'# Late orders',value:String(rangeProfile.lateOrders),delta:`${rangeProfile.lateCritical} require action`,tone:'orange',points:lateOrderHistory.slice(start)},
    {label:'Top manufacturer',value:'Orion',delta:`${currentMix[0]}% of ${range}M volume`,tone:'good',points:manufacturerShareHistory.slice(start)},
  ];
  const refresh=()=>{setRefreshing(true);setRefreshedAt(new Date().toLocaleTimeString('en-CA',{hour:'2-digit',minute:'2-digit',hour12:false}));window.setTimeout(()=>setRefreshing(false),650);};
  return <main className="project-page dashboard-page"><Topbar section="05 / Executive KPI Dashboard"/><header className="dashboard-head"><div><p className="eyebrow">Decision intelligence · Case study 05</p><h1>Operations<br/><em>control room.</em></h1></div><div className="live-status"><i/> 6 SOURCES ONLINE · UPDATED {refreshedAt}</div></header>
  <section className="dashboard-commandbar simplified"><div className="command-horizon"><span>Analysis horizon</span>{[6,9,12].map(months=><button className={range===months?'active':''} onClick={()=>setRange(months)} key={months}>{months} MONTHS</button>)}</div><button className={`dashboard-refresh ${refreshing?'refreshing':''}`} onClick={refresh}><span>↻</span>Refresh data</button></section>
  <section className="executive-kpi-strip" aria-label="Executive KPI summary">{kpis.map(kpi=><article key={kpi.label}><div><span>{kpi.label}</span><strong>{kpi.value}</strong><small className={kpi.tone}>{kpi.delta}</small></div><KpiSparkline points={kpi.points} tone={kpi.tone}/></article>)}</section>
  <section className="dashboard-grid">
<article className="dash-panel reliability-panel"><header><div><small>01</small><h2>Supplier Reliability Ranking</h2></div><div className="panel-sync"><i/>{range}M · Quality · Delivery · Delay</div></header><SupplierReliability range={range}/></article>
<article className="dash-panel manufacturer-panel"><header><div><small>02</small><h2>Supplier Distribution</h2></div><div className="panel-sync"><i/>Synced to {range}M horizon</div></header><SupplierDonut range={range}/></article>
<article className="dash-panel products-line-panel"><header><div><small>03</small><h2>Most Assembled Products</h2></div><div className="panel-sync"><i/>Monthly production · {range}M</div></header><ProductLines range={range}/></article>
<article className="dash-panel forecast-panel complex-forecast-panel"><header><div><small>04</small><h2>Heavy Roller Forecasts</h2></div><label>Component<select value={part} onChange={e=>setPart(e.target.value)} aria-label="Forecast component"><option>PCB-218</option><option>HSG-A7</option><option>FST-M4</option></select></label></header><Forecast key={`${part}-${range}`} part={part} range={range}/><div className="forecast-model-footer"><span><i/>Exponential smoothing</span><span><i/>Demand seasonality</span><span><i/>Supplier capacity</span><b>Model confidence 92%</b></div></article>
<ExceptionsQueue range={range}/>
  </section><footer className="dash-note">All organizations, supplier names, products, and values shown are fictional placeholders.</footer></main>}

const followSteps=[
  {label:'FETCH',title:'Read every open PO.',body:'A scheduled service requests open all purchase orders from Zoho ERP through a secure API connection.'},
  {label:'PARSE',title:'Find the confirmed date.',body:'Each record is normalized and its confirmed supplier delivery date becomes the anchor for follow-up.'},
  {label:'CHECK',title:'Watch two critical windows.',body:'The system evaluates both one-month and two-week checkpoints, escalating attention as delivery approaches.'},
  {label:'SEND',title:'Follow up automatically.',body:'A concise, pre-addressed confirmation email is generated and sent directly to the supplier contact.'}
];
function FollowVisual({active}:{active:number}){return <div className="follow-system">
  <div className={`api-console ${active===0?'active':''}`}><div><span>GET</span> /api/v2/purchase-orders?status=open</div><pre>{`{\n  "po_number": "PO-260814",\n  "supplier": "Summit Industrial",\n  "status": "OPEN",\n  "confirmed_delivery": "2026-09-18"\n}`}</pre><small>200 OK · 24 RECORDS</small></div>
  <div className={`date-parser ${active===1?'active':''}`}><span>CONFIRMED_DELIVERY</span><b>SEP <strong>18</strong> 2026</b><div><i/> Parsed from PO-260814</div></div>
  <div className={`trigger-timeline ${active===2?'active':''}`}><div className="timeline-line"><i/><i/><i/></div><div className="timeline-labels"><span><b>AUG 18</b>1 MONTH OUT<em>FLAG</em></span><span><b>SEP 04</b>2 WEEKS OUT<em>FLAG</em></span><span><b>SEP 18</b>DELIVERY</span></div></div>
  <div className={`email-draft ${active===3?'active':''}`}><header><span>NEW MESSAGE</span><b>×</b></header><dl><dt>To</dt><dd>orders@summit.example</dd><dt>Subject</dt><dd>Delivery confirmation · PO-260814</dd></dl><p>Hello,<br/><br/>Please confirm that PO-260814 remains on schedule for September 18.<br/><br/>Thank you,<br/>Purchasing Operations</p><button>Sent <span>✓</span></button></div>
  <div className="system-path">{followSteps.map((s,i)=><span className={active>=i?'passed':''} key={s.label}>{i+1}</span>)}</div>
  </div>}
function FollowPage(){const[active,setActive]=useState(0);useEffect(()=>{const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(Number((e.target as HTMLElement).dataset.follow))}),{rootMargin:'-38% 0px -42%'});document.querySelectorAll('[data-follow]').forEach(el=>o.observe(el));return()=>o.disconnect()},[]);return <main className="project-page follow-page"><Topbar section="04 / Order Follow-Up"/><header className="follow-hero"><p className="eyebrow">Supplier operations · Case study 04</p><div><h1>Know before<br/>it&apos;s <em>late.</em></h1><p>Proactive delay detection at one month and two weeks before every confirmed delivery date.</p></div><div className="follow-flags"><span><b>30</b>days out</span><span><b>14</b>days out</span></div></header><section className="follow-story"><div className="follow-sticky"><FollowVisual active={active}/></div><div className="follow-copy">{followSteps.map((s,i)=><article data-follow={i} className={active===i?'active':''} key={s.label}><span>{s.label}</span><h2>{s.title}</h2><p>{s.body}</p><small>0{i+1} / 04</small></article>)}</div></section><section className="follow-end"><p>Result</p><h2>Fewer surprises.<br/><em>Faster responses.</em></h2></section></main>}

function Placeholder({ slug }: { slug: string }) {
  const title = slug.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');
  return <main className="project-page"><Topbar section={title}/><section className="placeholder"><p className="eyebrow">Project not found</p><h1>{title}</h1><Link href="/">Return to the portfolio</Link></section></main>;
}

export default function ProjectExperience({ slug }: { slug: string }) {
  if (slug === "mrp-automation") return <MrpPage />;
  if (slug === "inventory-reduction") return <InventoryPage />;
  if (slug === "automatic-quotation") return <QuotationPage />;
  if (slug === "executive-kpi-dashboard") return <DashboardPage />;
  if (slug === "order-follow-up") return <FollowPage />;
  return <Placeholder slug={slug} />;
}

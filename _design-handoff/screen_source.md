# Screen source

The full source of the four-page Averis website prototype, inlined here as one
reference file so it cannot collide with the design system's component namespace.

These are design references, not production code. Recreate each screen in the target
codebase's framework and router; see README.md for the per-screen layout spec.


---

## `index.html`

```html
<!-- @dsCard group="Website" viewport="1280x760" name="averis.ai: marketing site" subtitle="Clickable four-page recreation of the Averis website" -->
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Averis, We prove you were right.</title>
<link rel="icon" href="../../assets/favicon.svg">
<link rel="stylesheet" href="../../styles.css">
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script src="../../_ds_bundle.js"></script>
<style>*{box-sizing:border-box}body{margin:0;font-family:var(--font-ui);color:var(--text-body);background:var(--surface-card);line-height:var(--leading-body);-webkit-font-smoothing:antialiased}
a{color:var(--text-heading);text-decoration:none}a:hover{color:var(--averis-pine)}
h1,h2,h3{margin:0;font-family:var(--font-display);color:var(--text-heading)}p{margin:0}
.wrap{max-width:var(--site-max);margin:0 auto;padding:0 40px}</style></head>
<body><div id="root"></div>
<script type="text/babel" src="Chrome.jsx"></script>
<script type="text/babel" src="HomeScreen.jsx"></script>
<script type="text/babel" src="EvidenceScreen.jsx"></script>
<script type="text/babel" src="MethodScreen.jsx"></script>
<script type="text/babel" src="AboutScreen.jsx"></script>
<script type="text/babel" src="ContactScreen.jsx"></script>
<script type="text/babel" src="App.jsx"></script>
</body></html>```

---

## `App.jsx`

```jsx
function App(){
  const [page,setPage]=React.useState(()=>{const h=(location.hash||'#home').slice(1);return h==='evidence'?'method':h});
  const go=id=>{const p=id==='evidence'?'method':id;setPage(p);location.hash=p;window.scrollTo({top:0})};
  return <>
    <SiteHeader page={page} go={go}/>
    {page==='home'&&<HomeScreen go={go}/>}
    {page==='method'&&<MethodScreen go={go}/>}
    {page==='about'&&<AboutScreen go={go}/>}
    {page==='contact'&&<ContactScreen go={go}/>}
    <SiteFooter go={go}/>
  </>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
```

---

## `Chrome.jsx`

```jsx
const {Logo,Button,Icon,AffirmationLine}=window.AverisDesignSystem_0ff329;

const LEGAL={'Privacy':'legal/privacy.html','Terms':'legal/terms.html','HIPAA & security':'legal/hipaa-security.html'};

const NAV=[{id:'home',label:'Overview'},{id:'method',label:'How it works'},{id:'about',label:'About'},{id:'contact',label:'Contact'}];

function SiteHeader({page,go}){
  return <header style={{position:'sticky',top:0,zIndex:20,background:'rgba(255,255,255,.92)',backdropFilter:'blur(10px)',borderBottom:'1px solid var(--border-hairline)'}}>
    <div className="wrap" style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:74}}>
      <a href="#" onClick={e=>{e.preventDefault();go('home')}} style={{display:'flex'}}><Logo height={21}/></a>
      <nav style={{display:'flex',gap:30,alignItems:'center'}}>
        {NAV.map(n=><a key={n.id} href="#" onClick={e=>{e.preventDefault();go(n.id)}}
          style={{fontSize:'var(--text-body-md)',fontWeight:page===n.id?600:500,color:page===n.id?'var(--text-heading)':'var(--text-muted)',position:'relative',paddingBottom:3}}>
          {n.label}{page===n.id&&<span style={{position:'absolute',left:0,right:0,bottom:-2,height:2,borderRadius:2,background:'var(--accent-line-on-light)'}}/>}
        </a>)}
        <Button size="sm" onClick={()=>go('contact')}>Request an analysis</Button>
      </nav>
    </div>
  </header>;
}

function SiteFooter({go}){
  return <footer style={{background:'var(--surface-inverse-deep)',color:'var(--text-on-inverse-sub)',padding:'56px 0 34px',marginTop:0}}>
    <div className="wrap" style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:40}}>
      <div>
        <Logo variant="reversed" descriptor height={20}/>
        <p style={{marginTop:18,fontSize:'var(--text-body-sm)',color:'var(--text-on-inverse-mute)',maxWidth:260}}>Averis provides healthcare claims analysis that defends providers against commercial and federal payer allegations.</p>
      </div>
      {[['Legal',['Privacy','Terms','HIPAA & security']]].map(([h,items])=>
        <div key={h}>
          <div style={{fontSize:'var(--text-micro)',fontWeight:600,letterSpacing:'var(--tracking-eyebrow)',textTransform:'uppercase',color:'var(--text-accent-on-dark)',marginBottom:14}}>{h}</div>
          <div style={{display:'flex',flexDirection:'column',gap:9}}>{items.map(i=><a key={i} href={LEGAL[i]||'#'} onClick={e=>{if(!LEGAL[i])e.preventDefault()}} style={{fontSize:'var(--text-body-sm)',color:'var(--text-on-inverse-sub)'}}>{i}</a>)}</div>
        </div>)}
    </div>
    <div className="wrap" style={{marginTop:44,paddingTop:20,borderTop:'1px solid var(--border-on-inverse)',display:'flex',justifyContent:'space-between',fontSize:'var(--text-caption)',color:'var(--text-on-inverse-mute)'}}>
      <span>© 2026 Averis. averis.ai</span><span>We prove you were right.</span>
    </div>
  </footer>;
}

function Eyebrow({children,tone='light'}){
  return <div style={{fontSize:'var(--text-micro)',fontWeight:600,letterSpacing:'var(--tracking-eyebrow)',textTransform:'uppercase',
    color:tone==='dark'?'var(--text-accent-on-dark)':'var(--text-eyebrow)',marginBottom:14}}>{children}</div>;
}

function Section({tone='light',children,style}){
  const bg={light:'var(--surface-card)',bone:'var(--surface-raised)',green:'var(--surface-inverse)',deep:'var(--surface-inverse-deep)'}[tone];
  return <section style={{background:bg,padding:'var(--section-pad-y) 0',...style}}><div className="wrap">{children}</div></section>;
}

Object.assign(window,{SiteHeader,SiteFooter,Eyebrow,Section,NAV});
```

---

## `HomeScreen.jsx`

```jsx
const {Button,Card,Badge,Icon,AffirmationHeading,AffirmationLine,Tag}=window.AverisDesignSystem_0ff329;

function Hero({go}){
  return <div style={{background:'var(--surface-inverse)',color:'var(--text-on-inverse)',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',right:-160,bottom:-200,width:520,height:520,borderRadius:'50%',background:'radial-gradient(circle,var(--tint-champagne-16),transparent 66%)'}}/>
    <div className="wrap" style={{padding:'104px 40px 92px',position:'relative',display:'grid',gridTemplateColumns:'minmax(0,1.15fr) minmax(0,.85fr)',gap:56,alignItems:'center'}}>
      <div>
        <Eyebrow tone="dark">Healthcare Claims Analysis</Eyebrow>
        <h1 style={{fontSize:'var(--text-display-2)',fontWeight:800,lineHeight:1.04,letterSpacing:'var(--tracking-display)',color:'var(--text-on-inverse)',maxWidth:640}}>
          When a payer alleges overpayment,<br/><span style={{background:'linear-gradient(var(--accent-line),var(--accent-line)) 0 100%/100% 6px no-repeat',paddingBottom:8,WebkitBoxDecorationBreak:'clone',boxDecorationBreak:'clone'}}>we prove you were right.</span>
        </h1>
        <p style={{marginTop:34,fontSize:'var(--text-lead)',color:'var(--text-on-inverse-sub)',maxWidth:'var(--measure-narrow)'}}>
          Averis analyzes claims data at scale to build the evidence that stands up in audit and appeal, working alongside your attorneys, on your side of the record.
        </p>
        <div style={{display:'flex',gap:12,marginTop:36}}>
          <Button variant="inverse" size="lg" onClick={()=>go('contact')}>Request an analysis</Button>
          <Button variant="ghost" size="lg" style={{color:'var(--text-on-inverse)',border:'1px solid var(--border-on-inverse)'}} onClick={()=>go('method')} iconRight={<Icon name="arrow-right" size={15}/>}>How it works</Button>
        </div>
      </div>
      <Card tone="green" padding={0} style={{background:'rgba(245,242,235,.06)',border:'1px solid var(--border-on-inverse)',boxShadow:'none'}}>
        <div style={{padding:'20px 22px',borderBottom:'1px solid var(--border-on-inverse)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:'var(--text-caption)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-on-inverse-mute)',fontWeight:600}}>One matter, at a glance</span>
          <Badge tone="inverse">Sample</Badge>
        </div>
        <div style={{padding:'22px'}}>
          {[['Claim lines in the extract','1,412,908'],['Lines cited by payer','6,140'],['Supported on the record','5,918'],['Demand withdrawn','$18.6M']].map(([k,v],i)=>
            <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',padding:'12px 0',borderTop:i?'1px solid var(--border-on-inverse)':'none'}}>
              <span style={{fontSize:'var(--text-body-sm)',color:'var(--text-on-inverse-mute)'}}>{k}</span>
              <span style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:19,color:i===3?'var(--text-accent-on-dark)':'var(--text-on-inverse)'}}>{v}</span>
            </div>)}
        </div>
      </Card>
    </div>
  </div>;
}

function HomeScreen({go}){
  return <>
    <Hero go={go}/>
    <Section tone="light">
      <div style={{display:'grid',gridTemplateColumns:'.9fr 1.1fr',gap:56}}>
        <div><Eyebrow>The problem</Eyebrow>
          <h2 style={{fontSize:'var(--text-h2)',fontWeight:700,letterSpacing:'var(--tracking-display)'}}>An allegation is an extrapolation, not a finding.</h2></div>
        <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-body)',maxWidth:'var(--measure)'}}>
          Payers sample a few dozen claims, find error, and project it across years of billing. The projection is only as sound as the sample. We rebuild the record line by line, the coding, the documentation, the medical necessity, and show where the sample does not carry the conclusion.
        </p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginTop:44}}>
        {[['database','Data at full scale','We work from the complete extract, not the payer’s sample: every line, every modifier, every remittance.'],
          ['file-search','Line-level evidence','Each disputed line is traced back to the documentation that supports it, and cited.'],
          ['scale','Built for counsel','Findings arrive in the form your attorneys file: reproducible, sourced, and defensible under challenge.']].map(([ic,t,d])=>
          <Card key={t} tone="bone" padding={24}>
            <Icon name={ic} size={22} color="var(--accent-line-on-light)"/>
            <h3 style={{fontSize:'var(--text-h3)',fontWeight:600,marginTop:16}}>{t}</h3>
            <p style={{marginTop:9,fontSize:'var(--text-body-md)',color:'var(--text-body)'}}>{d}</p>
          </Card>)}
      </div>
    </Section>
    <Section tone="green">
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:34}}>
        {[['1M+','Claim lines reviewed'],['60 days','To file rebuttal'],['$100M+','Largest exposure defended']].map(([n,l])=>
          <div key={n}>
            <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:42,color:'var(--text-on-inverse)',lineHeight:1}}>{n}</div>
            <span style={{display:'block',width:52,height:4,borderRadius:3,background:'var(--accent-line)',margin:'14px 0'}}/>
            <div style={{fontSize:'var(--text-body-sm)',color:'var(--text-on-inverse-sub)',maxWidth:190}}>{l}</div>
          </div>)}
      </div>
    </Section>
    <Section tone="bone">
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'center'}}>
        <div>
          <Eyebrow>Who we work with</Eyebrow>
          <h2 style={{fontSize:'var(--text-h2)',fontWeight:700,letterSpacing:'var(--tracking-display)'}}>Providers, their counsel, and no one else.</h2>
          <p style={{marginTop:16,fontSize:'var(--text-body-lg)',color:'var(--text-body)'}}>We do not take payer engagements. Health systems, physician groups, and the law firms defending them are the whole of our practice.</p>
          <div style={{display:'flex',gap:8,marginTop:22,flexWrap:'wrap'}}>
            {['Health systems','Physician groups','Behavioral health','Defense counsel','Compliance teams'].map(t=><Tag key={t}>{t}</Tag>)}
          </div>
        </div>
        <Card padding={30}>
          <p style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:22,color:'var(--text-heading)',lineHeight:1.4}}>
            “The extrapolation collapsed once the full population was on the table. Averis put the record in front of us in a form we could file.”
          </p>
          <AffirmationLine width={72} style={{margin:'22px 0 14px'}}/>
          <div style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>Partner, healthcare regulatory practice<br/>Sample attribution, replace with an approved client quote.</div>
        </Card>
      </div>
    </Section>
    <div style={{background:'var(--surface-inverse-deep)',padding:'72px 0'}}>
      <div className="wrap" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:40}}>
        <h2 style={{fontSize:'var(--text-h1)',fontWeight:700,color:'var(--text-on-inverse)',maxWidth:560}}>Send us the allegation letter. We will tell you what the data says.</h2>
        <Button variant="accent" size="lg" onClick={()=>go('contact')}>Request an analysis</Button>
      </div>
    </div>
  </>;
}
Object.assign(window,{HomeScreen});
```

---

## `MethodScreen.jsx`

```jsx
const {Card,Icon,Badge,Button,Tag,Tabs,Tooltip,AffirmationLine}=window.AverisDesignSystem_0ff329;

const STEPS=[
  ['Intake','file-text','The allegation letter, the sample, and the extrapolation method. We start where the payer started.'],
  ['Extraction','database','Full claims, remittance, and documentation data for the audit period, the whole population, not the sample.'],
  ['Analysis','line-chart','Line-by-line review against coding rules and clinical documentation, with every determination sourced.'],
  ['Rebuttal','scale','A cited findings packet your counsel can file, plus expert support through appeal.']];

function MethodScreen({go}){
  const [tab,setTab]=React.useState('findings');
  return <>
    <Section tone="green" style={{padding:'72px 0 64px'}}>
      <Eyebrow tone="dark">How it works</Eyebrow>
      <h1 style={{fontSize:'var(--text-display-2)',fontWeight:800,color:'var(--text-on-inverse)',letterSpacing:'var(--tracking-display)',maxWidth:760,lineHeight:1.06}}>Four steps, one standard: everything we assert, we can source.</h1>
      <p style={{marginTop:24,fontSize:'var(--text-lead)',color:'var(--text-on-inverse-sub)',maxWidth:'var(--measure)'}}>We work alongside healthcare attorneys to ensure your audit meets the legal requirement to rebuttal. The method is fixed so the findings are reproducible: your counsel receives the same artifacts every time, in the same order.</p>
    </Section>
    <Section tone="light">
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18}}>
        {STEPS.map(([t,ic,d],i)=>
          <Card key={t} padding={24} tone={i===3?'bone':'light'} accent={i===3}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <Icon name={ic} size={20} color="var(--text-heading)"/>
              <span style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:13,color:'var(--accent-line-on-light)'}}>{String(i+1).padStart(2,'0')}</span>
            </div>
            <h3 style={{fontSize:'var(--text-h3)',fontWeight:600,marginTop:18}}>{t}</h3>
            <p style={{marginTop:8,fontSize:'var(--text-body-md)'}}>{d}</p>
          </Card>)}
      </div>
      <div style={{marginTop:56,display:'grid',gridTemplateColumns:'1fr 1fr',gap:56}}>
        <div>
          <Eyebrow>What you receive</Eyebrow>
          {[['Findings packet','Every cited line, its determination, and the documentation reference.'],
            ['Statistical rebuttal','Where the sample fails to support the projection, and by how much.'],
            ['Source manifest','A hash-verified index of every file analyzed.'],
            ['Expert support','Declarations and testimony through appeal, if it goes that far.']].map(([t,d])=>
            <div key={t} style={{display:'flex',gap:14,padding:'16px 0',borderTop:'1px solid var(--border-hairline)'}}>
              <Icon name="check" size={17} color="var(--accent-line-on-light)" style={{marginTop:3}}/>
              <div><div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:15,color:'var(--text-heading)'}}>{t}</div>
              <div style={{fontSize:'var(--text-body-md)',color:'var(--text-body)',marginTop:4}}>{d}</div></div>
            </div>)}
        </div>
        <Card tone="sand" padding={28}>
          <Eyebrow>Engagement</Eyebrow>
          <h3 style={{fontSize:'var(--text-h2)',fontWeight:700}}>Sixty days, typical</h3>
          <div style={{marginTop:24}}>
            {[['Days 1–5','Intake and data access'],['Days 6–20','Extraction and validation'],['Days 21–50','Line-level analysis'],['Days 51–60','Packet delivered to counsel']].map(([w,d],i)=>
              <div key={w} style={{display:'grid',gridTemplateColumns:'92px 1fr',gap:16,padding:'13px 0',borderTop:i?'1px solid var(--border-soft)':'none'}}>
                <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--text-muted)',paddingTop:2}}>{w}</span>
                <span style={{fontSize:'var(--text-body-md)',color:'var(--text-strong)'}}>{d}</span>
              </div>)}
          </div>
          <AffirmationLine width={80} style={{marginTop:22}}/>
          <p style={{marginTop:14,fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>This is an average. An engagement can run shorter or longer depending on the matter type.</p>
        </Card>
      </div>
    </Section>
    <EvidenceSection tab={tab} setTab={setTab}/>
  </>;
}
Object.assign(window,{MethodScreen});
```

---

## `EvidenceScreen.jsx`

```jsx
const {Card,Badge,Tabs,Tag,Button,Icon,Tooltip,AffirmationLine}=window.AverisDesignSystem_0ff329;

const ROWS=[
  ['CLM-0093-221','99285','Emergency, level 5','Supported','proven','Documentation supports acuity'],
  ['CLM-0093-244','99284','Emergency, level 4','Supported','proven','Time and MDM documented'],
  ['CLM-0094-018','99215','Office, established','In review','review','Awaiting provider note'],
  ['CLM-0094-102','J18.9','Pneumonia, unspecified','Supported','proven','Radiology corroborates'],
  ['CLM-0094-311','99223','Inpatient admit','Disputed','critical','Payer cites missing history'],
  ['CLM-0095-007','99291','Critical care, 30–74 min','Supported','proven','Duration recorded in flowsheet']];

/* Rendered at the foot of How it works: the method, then what the method produces. */
function EvidenceSection({tab,setTab}){
  return <Section tone="bone" style={{paddingTop:56}}>
    <Eyebrow>The evidence</Eyebrow>
    <h2 style={{fontSize:'var(--text-h2)',fontWeight:700,letterSpacing:'var(--tracking-display)',maxWidth:700}}>What a findings packet looks like</h2>
    <p style={{marginTop:14,fontSize:'var(--text-body-lg)',color:'var(--text-body)',maxWidth:'var(--measure)'}}>An anonymized extract from a commercial payer matter. Every determination links to its source document.</p>
    <div style={{display:'flex',gap:8,flexWrap:'wrap',margin:'26px 0'}}>
      <Tag tone="outline">Commercial payer</Tag><Tag tone="outline">2021–2023</Tag><Tag tone="outline">6,140 cited lines</Tag><Tag tone="green">Anonymized</Tag>
    </div>
    <Tabs value={tab} onChange={setTab} tabs={[{value:'findings',label:'Findings',count:6},{value:'method',label:'Sampling'},{value:'sources',label:'Source manifest'}]}/>
    {tab==='findings'&&<Card padding={0} style={{marginTop:24,overflow:'hidden'}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'var(--text-body-sm)'}}>
        <thead><tr style={{background:'var(--surface-raised)'}}>
          {['Claim','Code','Description','Determination','Basis',''].map(h=><th key={h} style={{textAlign:'left',padding:'12px 18px',fontSize:'var(--text-micro)',letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-eyebrow)',fontWeight:600,borderBottom:'1px solid var(--border-hairline)'}}>{h}</th>)}
        </tr></thead>
        <tbody>{ROWS.map(([id,code,desc,det,tone,basis])=>
          <tr key={id} style={{borderBottom:'1px solid var(--border-hairline)'}}>
            <td style={{padding:'13px 18px',fontFamily:'var(--font-mono)',fontSize:12,color:'var(--text-strong)'}}>{id}</td>
            <td style={{padding:'13px 18px',fontFamily:'var(--font-mono)',fontSize:12,color:'var(--text-muted)'}}>{code}</td>
            <td style={{padding:'13px 18px',color:'var(--text-strong)'}}>{desc}</td>
            <td style={{padding:'13px 18px'}}><Badge tone={tone}>{det}</Badge></td>
            <td style={{padding:'13px 18px',color:'var(--text-muted)'}}>{basis}</td>
            <td style={{padding:'13px 18px',textAlign:'right'}}><Tooltip content="Open the source document" placement="left"><Icon name="file-search" size={16} color="var(--text-faint)"/></Tooltip></td>
          </tr>)}</tbody>
      </table>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 18px',background:'var(--surface-raised)'}}>
        <span style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>Showing 6 of 6,140 cited lines</span>
        <Button size="sm" variant="secondary" iconLeft={<Icon name="download" size={14}/>}>Download packet</Button>
      </div>
    </Card>}
    {tab==='method'&&<Card padding={28} style={{marginTop:24}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40}}>
        <div><h3 style={{fontSize:'var(--text-h3)',fontWeight:600}}>The payer’s sample</h3>
          <p style={{marginTop:10,fontSize:'var(--text-body-md)'}}>40 claims, drawn from a 2021–2023 population of 1,412,908 lines, projected to a $23.1M demand.</p></div>
        <div><h3 style={{fontSize:'var(--text-h3)',fontWeight:600}}>What the population shows</h3>
          <p style={{marginTop:10,fontSize:'var(--text-body-md)'}}>Error rate in the full cited set is 3.6%, not the 27% the sample implies. The projection does not survive the wider record.</p></div>
      </div>
      <AffirmationLine width={90} style={{marginTop:24}}/>
    </Card>}
    {tab==='sources'&&<Card padding={28} style={{marginTop:24}}>
      {[['837I claims extract','sha256:4f9c…a71b','1,412,908 lines'],['835 remittance','sha256:b120…9ce4','1,208,441 lines'],['Clinical documentation index','sha256:77ad…30f1','214,882 documents']].map(([n,h,c],i)=>
        <div key={n} style={{display:'grid',gridTemplateColumns:'1.2fr 1fr .6fr',gap:20,padding:'14px 0',borderTop:i?'1px solid var(--border-hairline)':'none',fontSize:'var(--text-body-sm)'}}>
          <span style={{color:'var(--text-strong)'}}>{n}</span><span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--text-muted)'}}>{h}</span><span style={{color:'var(--text-muted)',textAlign:'right'}}>{c}</span>
        </div>)}
    </Card>}
  </Section>;
}
Object.assign(window,{EvidenceSection});
```

---

## `AboutScreen.jsx`

```jsx
const {Card,Icon,Button,Tag,AffirmationLine,Badge}=window.AverisDesignSystem_0ff329;

const FOCUS=['Zero-paid adjudications','Misclassified claims','“Member not found” errors','Claims stuck in pending review','Unadjudicated claims in limbo','Inconsistencies between 837 (submitted) and 835 (paid) data','Payer patterns that hide collectible revenue'];

const DELIVER=[
  ['AR Recovery Audits','file-search'],
  ['Payer Forensics (835/837 deep dives)','database'],
  ['Demand Letters & CRN Preparation','file-text'],
  ['Litigation Support Packages','scale'],
  ['Complete AR Recovery Roadmaps','line-chart']];

function AboutScreen({go}){
  return <>
    <Section tone="green" style={{padding:'72px 0 64px'}}>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.25fr) minmax(0,.75fr)',gap:56,alignItems:'start'}}>
        <div>
          <Eyebrow tone="dark">Why Averis</Eyebrow>
          <h1 style={{fontSize:'var(--text-display-2)',fontWeight:800,color:'var(--text-on-inverse)',letterSpacing:'var(--tracking-display)',lineHeight:1.06,maxWidth:640}}>
            Built by someone who has already <span style={{background:'linear-gradient(var(--accent-line),var(--accent-line)) 0 100%/100% 6px no-repeat',paddingBottom:8,WebkitBoxDecorationBreak:'clone',boxDecorationBreak:'clone'}}>done the work.</span>
          </h1>
          <p style={{marginTop:34,fontSize:'var(--text-lead)',color:'var(--text-on-inverse-sub)',maxWidth:'var(--measure)'}}>
            Averis exists because the money a provider is owed is recoverable, and because the record almost always supports the provider once someone reads all of it.
          </p>
        </div>
        <Card tone="green" padding={26} style={{background:'rgba(245,242,235,.06)',border:'1px solid var(--border-on-inverse)',boxShadow:'none'}}>
          <div style={{width:74,height:74,borderRadius:'50%',background:'rgba(245,242,235,.10)',border:'1px solid var(--border-on-inverse)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontWeight:700,fontSize:24,color:'var(--text-accent-on-dark)'}}>NB</div>
          <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:22,color:'var(--text-on-inverse)',marginTop:18}}>Nadav Bernstein</div>
          <div style={{fontSize:'var(--text-body-sm)',color:'var(--text-accent-on-dark)',marginTop:5,letterSpacing:'.02em'}}>Founder &amp; Investor</div>
          <AffirmationLine tone="dark" width={52} style={{margin:'18px 0'}}/>
          <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-on-inverse-sub)'}}>
            Working with clinics, attorneys, and medical practices on complex payer disputes.
          </p>
          <a href="https://www.linkedin.com/in/nadav-bernstein-45912645/" target="_blank" rel="noreferrer"
            style={{display:'inline-flex',alignItems:'center',gap:8,marginTop:18,fontSize:'var(--text-body-sm)',color:'var(--text-accent-on-dark)',textDecoration:'none'}}>
            LinkedIn profile <Icon name="arrow-right" size={14}/>
          </a>
        </Card>
      </div>
    </Section>

    <Section tone="light">
      <div style={{display:'grid',gridTemplateColumns:'.9fr 1.1fr',gap:56,alignItems:'start'}}>
        <div>
          <Eyebrow>Background</Eyebrow>
          <h2 style={{fontSize:'var(--text-h2)',fontWeight:700,letterSpacing:'var(--tracking-display)'}}>A track record before a launch.</h2>
        </div>
        <div>
          <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-body)',maxWidth:'var(--measure)'}}>
            Before formally launching Pelican, I spent the past year supporting clinics, attorneys, and medical practices involved in complex payer disputes. This included building AR analysis packages that contributed to a recent successful court outcome against a major national healthcare payer, where our findings played a key role in clarifying the provider’s position.
          </p>
          <div style={{display:'flex',gap:8,marginTop:22,flexWrap:'wrap'}}>
            <Tag tone="outline">Clinics</Tag><Tag tone="outline">Attorneys</Tag><Tag tone="outline">Medical practices</Tag><Tag>Complex payer disputes</Tag>
          </div>
        </div>
      </div>
    </Section>

    <Section tone="bone">
      <Eyebrow>Focus areas</Eyebrow>
      <h2 style={{fontSize:'var(--text-h2)',fontWeight:700,letterSpacing:'var(--tracking-display)',maxWidth:560}}>Uncovering hidden collectible AR</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'0 40px',marginTop:26,maxWidth:900}}>
        {FOCUS.map(t=>
          <div key={t} style={{display:'flex',gap:13,alignItems:'flex-start',padding:'15px 0',borderTop:'1px solid var(--border-hairline)'}}>
            <Icon name="check" size={17} color="var(--accent-line-on-light)" style={{marginTop:2}}/>
            <span style={{fontSize:'var(--text-body-md)',color:'var(--text-strong)'}}>{t}</span>
          </div>)}
      </div>
    </Section>

    <Section tone="light">
      <Eyebrow>What we deliver</Eyebrow>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:14,marginTop:8}}>
        {DELIVER.map(([t,ic],i)=>
          <Card key={t} padding={22} tone={i===4?'bone':'light'} accent={i===4}>
            <Icon name={ic} size={20} color="var(--text-heading)"/>
            <h3 style={{fontSize:'var(--text-h4)',fontWeight:600,marginTop:16,lineHeight:1.35}}>{t}</h3>
          </Card>)}
      </div>
    </Section>

    <div style={{background:'var(--surface-inverse-deep)',padding:'72px 0'}}>
      <div className="wrap" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:40}}>
        <h2 style={{fontSize:'var(--text-h1)',fontWeight:700,color:'var(--text-on-inverse)',maxWidth:620}}>
          If you want to understand how much money your clinic is owed and how quickly you can recover it, feel free to reach out.
        </h2>
        <Button variant="accent" size="lg" onClick={()=>go('contact')}>Request an analysis</Button>
      </div>
    </div>
  </>;
}
Object.assign(window,{AboutScreen});
```

---

## `ContactScreen.jsx`

```jsx
const {Card,Input,Select,Checkbox,Button,Toast,Icon,AffirmationLine,RadioGroup}=window.AverisDesignSystem_0ff329;

/* ── Where the form goes ─────────────────────────────────────────────────────
   A static site cannot send mail on its own; something has to relay it.

   Option A (no setup, works now): leave FORM_ENDPOINT empty. Submitting opens
   the sender's own mail client with a pre-filled message addressed to
   INBOX. Whatever inbox that address points at, Gmail included, receives it.
   Downside: it depends on the visitor having a mail client configured.

   Option B (recommended for a live site): create a free form relay at
   formspree.io (or getform.io / basin.com) using the Gmail address you want
   submissions delivered to, then paste the endpoint URL below. Submissions
   POST straight to that inbox with no mail client involved.

   Note before you pick: a relay is a third party sitting between a provider
   and Averis. Keep the no-PHI warning on the form, and have counsel confirm
   the vendor is acceptable given the HIPAA posture on the security page. */
const FORM_ENDPOINT='';
const INBOX='counsel@averis.ai';

const ROLES={cfo:'Provider finance or compliance',counsel:'Outside counsel'};
const PAYERS={com:'Commercial',fed:'Federal (Medicare / Medicaid)',both:'Both'};

function ContactScreen(){
  const [f,setF]=React.useState({name:'',email:'',org:'',payer:'com',amount:'',role:'cfo',deadline:false});
  const [state,setState]=React.useState('idle');
  const set=k=>e=>setF(p=>({...p,[k]:e.target?e.target.value:e}));

  const body=()=>[
    `Name: ${f.name}`,`Work email: ${f.email}`,`Organization: ${f.org}`,
    `Payer type: ${PAYERS[f.payer]}`,`Alleged overpayment / restriction value: ${f.amount?'$'+f.amount:'not stated'}`,
    `Role: ${ROLES[f.role]}`,`Appeal deadline set: ${f.deadline?'Yes':'No'}`
  ].join('\n');

  const submit=async e=>{
    e.preventDefault();
    setState('sending');
    if(FORM_ENDPOINT){
      try{
        const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
          body:JSON.stringify({...f,_subject:`Analysis request, ${f.org||f.name}`})});
        setState(r.ok?'sent':'error');
      }catch(err){setState('error')}
    }else{
      window.location.href=`mailto:${INBOX}?subject=${encodeURIComponent(`Analysis request, ${f.org||f.name}`)}&body=${encodeURIComponent(body())}`;
      setState('sent');
    }
  };

  return <Section tone="bone" style={{padding:'64px 0 80px'}}>
    <div style={{display:'grid',gridTemplateColumns:'.85fr 1.15fr',gap:56,alignItems:'start'}}>
      <div>
        <Eyebrow>Contact</Eyebrow>
        <h1 style={{fontSize:'var(--text-h1)',fontWeight:700,letterSpacing:'var(--tracking-display)'}}>Send us the allegation letter.</h1>
        <p style={{marginTop:14,fontSize:'var(--text-body-lg)',color:'var(--text-body)'}}>We will read the letter and the sampling method, and come back with what we would need to test it. No cost for the first read.</p>
        <AffirmationLine width={90} style={{margin:'26px 0'}}/>
        {[['mail',INBOX],['phone','+1 (312) 555-0148'],['shield-check','HIPAA-compliant intake, BAA on request']].map(([ic,t])=>
          <div key={t} style={{display:'flex',gap:11,alignItems:'center',padding:'7px 0',fontSize:'var(--text-body-md)',color:'var(--text-strong)'}}>
            <Icon name={ic} size={16} color="var(--text-faint)"/>{t}</div>)}
      </div>
      <Card padding={30}>
        {state==='sent'
          ? <div style={{display:'flex',flexDirection:'column',gap:18,alignItems:'flex-start'}}>
              <Toast tone="proven" title="Request received" message="We reply within one business day."/>
              <p style={{fontSize:'var(--text-body-md)'}}>A member of the analysis team will confirm what data we would need to test the allegation.</p>
              <Button variant="secondary" size="sm" onClick={()=>setState('idle')}>Send another</Button>
            </div>
          : <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:16}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                <Input label="Name" placeholder="Jordan Reyes" value={f.name} onChange={set('name')} required/>
                <Input label="Work email" type="email" placeholder="jreyes@provider.org" value={f.email} onChange={set('email')} required/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                <Input label="Organization" placeholder="Northline Health" value={f.org} onChange={set('org')}/>
                <Select label="Payer type" value={f.payer} onChange={set('payer')}
                  options={Object.entries(PAYERS).map(([value,label])=>({value,label}))}/>
              </div>
              <Input label="Alleged overpayment / restriction value" hint="Optional" prefix="$" placeholder="0.00" value={f.amount} onChange={set('amount')}/>
              <RadioGroup label="Your role" value={f.role} onChange={v=>setF(p=>({...p,role:v}))}
                options={Object.entries(ROLES).map(([value,label])=>({value,label}))}/>
              <Checkbox label="An appeal deadline is already set" description="We will prioritize scoping if a date is on the calendar."
                checked={f.deadline} onChange={v=>setF(p=>({...p,deadline:v}))}/>
              <Button type="submit" size="lg" fullWidth disabled={state==='sending'}>
                {state==='sending'?'Sending':'Request an analysis'}</Button>
              {state==='error'&&<p style={{fontSize:'var(--text-body-sm)',color:'var(--status-critical)'}}>
                That did not send. Email us directly at <a href={`mailto:${INBOX}`}>{INBOX}</a>.</p>}
              <p style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>Do not send protected health information through this form. We will provide a secure channel at intake.</p>
            </form>}
      </Card>
    </div>
  </Section>;
}
Object.assign(window,{ContactScreen});
```

---

## `how-it-works.html`

```html
<!DOCTYPE html><html><head><meta charset="utf-8"><title>Averis, How it works</title>
<script>location.replace('index.html#method')</script></head><body></body></html>
```

---

## `legal/privacy.html`

```html
<!-- @dsCard group="Website" viewport="1280x700" name="Privacy policy" subtitle="Legal document page, draft for counsel review" -->
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Averis, Privacy policy</title>
<link rel="icon" href="../../../assets/favicon.svg"><link rel="stylesheet" href="../../../styles.css">
<style>*{box-sizing:border-box}body{margin:0;font-family:var(--font-ui);color:var(--text-body);background:var(--surface-card);line-height:var(--leading-body);-webkit-font-smoothing:antialiased}
a{color:var(--text-heading);text-decoration:none}a:hover{color:var(--averis-pine)}
.wrap{max-width:var(--site-max);margin:0 auto;padding:0 40px}
header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--border-hairline)}
.bar{display:flex;align-items:center;justify-content:space-between;height:74px}
.nav{display:flex;gap:30px;align-items:center;font-size:var(--text-body-md)}.nav a{color:var(--text-muted)}
h1{margin:0;font-family:var(--font-display);font-size:var(--text-h1);font-weight:700;letter-spacing:var(--tracking-display);color:var(--text-heading)}
h2{margin:0 0 10px;font-family:var(--font-display);font-size:var(--text-h3);font-weight:600;color:var(--text-heading)}
p,li{font-size:var(--text-body-md);margin:0 0 12px}ul{margin:0 0 12px;padding-left:20px}li{margin-bottom:7px}
.eyebrow{font-size:var(--text-micro);font-weight:600;letter-spacing:var(--tracking-eyebrow);text-transform:uppercase;color:var(--text-eyebrow);margin-bottom:14px}
.doc{display:grid;grid-template-columns:220px 1fr;gap:56px;padding:48px 40px 80px;max-width:var(--site-max);margin:0 auto}
.toc{position:sticky;top:106px;align-self:start;font-size:var(--text-body-sm)}
.toc a{display:block;padding:6px 0;color:var(--text-muted);border-left:2px solid transparent;padding-left:12px}
.toc a:hover{color:var(--text-heading);border-left-color:var(--accent-line-on-light)}
section{padding:26px 0;border-top:1px solid var(--border-hairline);max-width:var(--measure)}
section:first-of-type{border-top:none}
.notice{background:var(--surface-raised);border:1px solid var(--border-hairline);border-radius:var(--radius-xl);padding:20px 22px;font-size:var(--text-body-sm);color:var(--text-muted);margin-top:8px}
footer{background:var(--surface-inverse-deep);color:var(--text-on-inverse-sub);padding:48px 0 30px}
.fnav{display:flex;gap:22px;font-size:var(--text-body-sm)}.fnav a{color:var(--text-on-inverse-sub)}
.meta{margin-top:34px;padding-top:18px;border-top:1px solid var(--border-on-inverse);display:flex;justify-content:space-between;font-size:var(--text-caption);color:var(--text-on-inverse-mute)}
@media print{header,.toc,footer{display:none}.doc{grid-template-columns:1fr;padding:0}}
@media(max-width:820px){.doc{grid-template-columns:1fr;gap:0}.toc{display:none}}
</style></head><body>
<header><div class="wrap bar">
<a href="../index.html" style="display:flex;align-items:center;gap:10px"><img src="../../../assets/mark-green.svg" width="26" alt=""><span style="font-family:var(--font-display);font-weight:700;font-size:19px;letter-spacing:var(--tracking-wordmark);color:var(--text-heading)">AVERIS</span></a>
<nav class="nav"><a href="../index.html#home">Overview</a><a href="../index.html#method">How it works</a><a href="../index.html#about">About</a><a href="../index.html#contact">Contact</a><a href="../index.html#contact" style="background:var(--interactive-primary);color:var(--text-on-inverse);font-weight:600;padding:8px 14px;border-radius:var(--radius-md);font-size:var(--text-body-sm)">Request an analysis</a></nav>
</div></header>
<div class="wrap" style="padding-top:56px"><div class="eyebrow">Legal</div><h1>Privacy policy</h1>
<p style="margin-top:14px;font-size:var(--text-body-lg);max-width:var(--measure)">How Averis collects, uses, and protects information when you visit averis.ai or engage us for claims analysis.</p>
<p style="font-size:var(--text-caption);color:var(--text-faint)">Last updated 9 August 2026</p></div>
<div class="doc"><nav class="toc"><a href="#scope">Scope</a><a href="#information-we-collect">Information we collect</a><a href="#how-we-use-it">How we use it</a><a href="#disclosure">Disclosure</a><a href="#retention">Retention</a><a href="#security">Security</a><a href="#your-choices">Your choices</a><a href="#changes-and-contact">Changes and contact</a></nav>
<div><section id="scope"><h2>Scope</h2><p>This policy covers averis.ai and the business information we handle in the course of an engagement. Protected health information received under a Business Associate Agreement is governed separately by that agreement and by our <a href="hipaa-security.html">HIPAA and security</a> commitments, not by this policy.</p></section><section id="information-we-collect"><h2>Information we collect</h2><ul><li><strong>Information you give us.</strong> Name, work email, organization, role, and anything you write in a contact form or send by email.</li><li><strong>Engagement data.</strong> Claims extracts, remittance data, documentation, and correspondence provided by a client or its counsel under a written agreement.</li><li><strong>Site data.</strong> Standard server logs and basic analytics: IP address, browser, pages viewed, and referring page.</li></ul><p>We do not ask for protected health information through the website, and we ask that you not send it there. We provide a secure channel at intake.</p></section><section id="how-we-use-it"><h2>How we use it</h2><ul><li>To respond to your inquiry and scope an engagement.</li><li>To perform the analysis a client has retained us to perform.</li><li>To operate, secure, and improve the website.</li><li>To meet legal, regulatory, and contractual obligations.</li></ul><p>We do not sell information. We do not use client engagement data to train general-purpose models or for any purpose outside that engagement.</p></section><section id="disclosure"><h2>Disclosure</h2><p>We share information only with the client and the counsel it designates, with vetted subprocessors bound by written confidentiality and security terms, and where compelled by law. <strong>We do not take payer engagements</strong>, and we do not share client information with payers.</p></section><section id="retention"><h2>Retention</h2><p>Engagement data is retained for the period set out in the engagement letter, then deleted or returned at the client's direction. Website inquiry records are retained for 24 months. Server logs are retained for 90 days.</p></section><section id="security"><h2>Security</h2><p>Encryption in transit and at rest, least-privilege access, logged access to engagement data, and annual review of controls. Detail is in <a href="hipaa-security.html">HIPAA and security</a>.</p></section><section id="your-choices"><h2>Your choices</h2><p>Write to <a href="mailto:privacy@averis.ai">privacy@averis.ai</a> to ask what we hold about you, correct it, or ask us to delete it. Where state or federal law grants you additional rights, we honour them. Individuals whose PHI we process should direct requests to the provider that holds the record; we act on that provider's instruction.</p></section><section id="changes-and-contact"><h2>Changes and contact</h2><p>Material changes will be posted here with a revised date. Questions: <a href="mailto:privacy@averis.ai">privacy@averis.ai</a>.</p></section>
<div class="notice"><strong style="color:var(--text-heading)">Draft for counsel review.</strong> This document is a structural and editorial template written to the Averis brand voice. It is not legal advice and has not been reviewed by an attorney. Have counsel confirm every clause, jurisdiction, retention period, and statutory reference before publication.</div>
</div></div>
<footer><div class="wrap"><div class="fnav"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="hipaa-security.html">HIPAA &amp; security</a></div>
<div class="meta"><span>&copy; 2026 Averis. averis.ai</span><span>We prove you were right.</span></div></div></footer>
</body></html>```

---

## `legal/terms.html`

```html
<!-- @dsCard group="Website" viewport="1280x700" name="Terms of use" subtitle="Legal document page, draft for counsel review" -->
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Averis, Terms of use</title>
<link rel="icon" href="../../../assets/favicon.svg"><link rel="stylesheet" href="../../../styles.css">
<style>*{box-sizing:border-box}body{margin:0;font-family:var(--font-ui);color:var(--text-body);background:var(--surface-card);line-height:var(--leading-body);-webkit-font-smoothing:antialiased}
a{color:var(--text-heading);text-decoration:none}a:hover{color:var(--averis-pine)}
.wrap{max-width:var(--site-max);margin:0 auto;padding:0 40px}
header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--border-hairline)}
.bar{display:flex;align-items:center;justify-content:space-between;height:74px}
.nav{display:flex;gap:30px;align-items:center;font-size:var(--text-body-md)}.nav a{color:var(--text-muted)}
h1{margin:0;font-family:var(--font-display);font-size:var(--text-h1);font-weight:700;letter-spacing:var(--tracking-display);color:var(--text-heading)}
h2{margin:0 0 10px;font-family:var(--font-display);font-size:var(--text-h3);font-weight:600;color:var(--text-heading)}
p,li{font-size:var(--text-body-md);margin:0 0 12px}ul{margin:0 0 12px;padding-left:20px}li{margin-bottom:7px}
.eyebrow{font-size:var(--text-micro);font-weight:600;letter-spacing:var(--tracking-eyebrow);text-transform:uppercase;color:var(--text-eyebrow);margin-bottom:14px}
.doc{display:grid;grid-template-columns:220px 1fr;gap:56px;padding:48px 40px 80px;max-width:var(--site-max);margin:0 auto}
.toc{position:sticky;top:106px;align-self:start;font-size:var(--text-body-sm)}
.toc a{display:block;padding:6px 0;color:var(--text-muted);border-left:2px solid transparent;padding-left:12px}
.toc a:hover{color:var(--text-heading);border-left-color:var(--accent-line-on-light)}
section{padding:26px 0;border-top:1px solid var(--border-hairline);max-width:var(--measure)}
section:first-of-type{border-top:none}
.notice{background:var(--surface-raised);border:1px solid var(--border-hairline);border-radius:var(--radius-xl);padding:20px 22px;font-size:var(--text-body-sm);color:var(--text-muted);margin-top:8px}
footer{background:var(--surface-inverse-deep);color:var(--text-on-inverse-sub);padding:48px 0 30px}
.fnav{display:flex;gap:22px;font-size:var(--text-body-sm)}.fnav a{color:var(--text-on-inverse-sub)}
.meta{margin-top:34px;padding-top:18px;border-top:1px solid var(--border-on-inverse);display:flex;justify-content:space-between;font-size:var(--text-caption);color:var(--text-on-inverse-mute)}
@media print{header,.toc,footer{display:none}.doc{grid-template-columns:1fr;padding:0}}
@media(max-width:820px){.doc{grid-template-columns:1fr;gap:0}.toc{display:none}}
</style></head><body>
<header><div class="wrap bar">
<a href="../index.html" style="display:flex;align-items:center;gap:10px"><img src="../../../assets/mark-green.svg" width="26" alt=""><span style="font-family:var(--font-display);font-weight:700;font-size:19px;letter-spacing:var(--tracking-wordmark);color:var(--text-heading)">AVERIS</span></a>
<nav class="nav"><a href="../index.html#home">Overview</a><a href="../index.html#method">How it works</a><a href="../index.html#about">About</a><a href="../index.html#contact">Contact</a><a href="../index.html#contact" style="background:var(--interactive-primary);color:var(--text-on-inverse);font-weight:600;padding:8px 14px;border-radius:var(--radius-md);font-size:var(--text-body-sm)">Request an analysis</a></nav>
</div></header>
<div class="wrap" style="padding-top:56px"><div class="eyebrow">Legal</div><h1>Terms of use</h1>
<p style="margin-top:14px;font-size:var(--text-body-lg);max-width:var(--measure)">The terms that govern your use of averis.ai. Engagements are governed by a separate written agreement.</p>
<p style="font-size:var(--text-caption);color:var(--text-faint)">Last updated 9 August 2026</p></div>
<div class="doc"><nav class="toc"><a href="#acceptance">Acceptance</a><a href="#no-legal-or-clinical-advice">No legal or clinical advice</a><a href="#no-engagement-by-inquiry">No engagement by inquiry</a><a href="#illustrative-content">Illustrative content</a><a href="#intellectual-property">Intellectual property</a><a href="#acceptable-use">Acceptable use</a><a href="#third-party-links">Third-party links</a><a href="#disclaimers-and-liability">Disclaimers and liability</a><a href="#governing-law">Governing law</a><a href="#changes-and-contact">Changes and contact</a></nav>
<div><section id="acceptance"><h2>Acceptance</h2><p>By using averis.ai you accept these terms. If you do not accept them, do not use the site.</p></section><section id="no-legal-or-clinical-advice"><h2>No legal or clinical advice</h2><p>Everything on this site is general information about our analytical practice. It is not legal advice, coding advice, or clinical judgment, and it does not create an attorney-client, consultant, or engagement relationship. Averis is not a law firm. We work alongside your attorneys; we do not replace them.</p></section><section id="no-engagement-by-inquiry"><h2>No engagement by inquiry</h2><p>Submitting a form, emailing us, or discussing a matter does not retain Averis. An engagement begins only when both parties sign an engagement letter. Do not send confidential or privileged material before that point, and do not send protected health information through the website.</p></section><section id="illustrative-content"><h2>Illustrative content</h2><p>Figures, matter summaries, timelines, and sample findings shown on this site are anonymized or illustrative. They describe past work under specific facts. <strong>They are not a prediction or guarantee of any outcome.</strong> Every matter turns on its own record.</p></section><section id="intellectual-property"><h2>Intellectual property</h2><p>The Averis name, mark, wordmark, site content, methodology descriptions, and report formats are our property. You may quote short excerpts with attribution. You may not copy, reproduce, or reuse the site or our methodology materials commercially without written permission.</p></section><section id="acceptable-use"><h2>Acceptable use</h2><ul><li>Do not attempt to gain unauthorized access to the site or any related system.</li><li>Do not scrape, mirror, or bulk-download the site.</li><li>Do not misrepresent your identity or your authority to act for a provider.</li></ul></section><section id="third-party-links"><h2>Third-party links</h2><p>Links to other sites are provided for convenience. We do not control them and are not responsible for their content or practices.</p></section><section id="disclaimers-and-liability"><h2>Disclaimers and liability</h2><p>The site is provided as is, without warranties of any kind to the fullest extent the law permits. To the extent permitted by law, Averis is not liable for indirect, incidental, or consequential damages arising from your use of the site. Nothing here limits liability that cannot be limited by law. Obligations in a signed engagement letter control over this section for that engagement.</p></section><section id="governing-law"><h2>Governing law</h2><p>These terms are governed by the laws of the State of Maryland, without regard to conflict-of-law rules. Venue lies in the state and federal courts sitting in Montgomery County, Maryland.</p></section><section id="changes-and-contact"><h2>Changes and contact</h2><p>We may revise these terms; the revised date above governs. Questions: <a href="mailto:legal@averis.ai">legal@averis.ai</a>.</p></section>
<div class="notice"><strong style="color:var(--text-heading)">Draft for counsel review.</strong> This document is a structural and editorial template written to the Averis brand voice. It is not legal advice and has not been reviewed by an attorney. Have counsel confirm every clause, jurisdiction, retention period, and statutory reference before publication.</div>
</div></div>
<footer><div class="wrap"><div class="fnav"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="hipaa-security.html">HIPAA &amp; security</a></div>
<div class="meta"><span>&copy; 2026 Averis. averis.ai</span><span>We prove you were right.</span></div></div></footer>
</body></html>```

---

## `legal/hipaa-security.html`

```html
<!-- @dsCard group="Website" viewport="1280x700" name="HIPAA & security" subtitle="Legal document page, draft for counsel review" -->
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Averis, HIPAA and security</title>
<link rel="icon" href="../../../assets/favicon.svg"><link rel="stylesheet" href="../../../styles.css">
<style>*{box-sizing:border-box}body{margin:0;font-family:var(--font-ui);color:var(--text-body);background:var(--surface-card);line-height:var(--leading-body);-webkit-font-smoothing:antialiased}
a{color:var(--text-heading);text-decoration:none}a:hover{color:var(--averis-pine)}
.wrap{max-width:var(--site-max);margin:0 auto;padding:0 40px}
header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--border-hairline)}
.bar{display:flex;align-items:center;justify-content:space-between;height:74px}
.nav{display:flex;gap:30px;align-items:center;font-size:var(--text-body-md)}.nav a{color:var(--text-muted)}
h1{margin:0;font-family:var(--font-display);font-size:var(--text-h1);font-weight:700;letter-spacing:var(--tracking-display);color:var(--text-heading)}
h2{margin:0 0 10px;font-family:var(--font-display);font-size:var(--text-h3);font-weight:600;color:var(--text-heading)}
p,li{font-size:var(--text-body-md);margin:0 0 12px}ul{margin:0 0 12px;padding-left:20px}li{margin-bottom:7px}
.eyebrow{font-size:var(--text-micro);font-weight:600;letter-spacing:var(--tracking-eyebrow);text-transform:uppercase;color:var(--text-eyebrow);margin-bottom:14px}
.doc{display:grid;grid-template-columns:220px 1fr;gap:56px;padding:48px 40px 80px;max-width:var(--site-max);margin:0 auto}
.toc{position:sticky;top:106px;align-self:start;font-size:var(--text-body-sm)}
.toc a{display:block;padding:6px 0;color:var(--text-muted);border-left:2px solid transparent;padding-left:12px}
.toc a:hover{color:var(--text-heading);border-left-color:var(--accent-line-on-light)}
section{padding:26px 0;border-top:1px solid var(--border-hairline);max-width:var(--measure)}
section:first-of-type{border-top:none}
.notice{background:var(--surface-raised);border:1px solid var(--border-hairline);border-radius:var(--radius-xl);padding:20px 22px;font-size:var(--text-body-sm);color:var(--text-muted);margin-top:8px}
footer{background:var(--surface-inverse-deep);color:var(--text-on-inverse-sub);padding:48px 0 30px}
.fnav{display:flex;gap:22px;font-size:var(--text-body-sm)}.fnav a{color:var(--text-on-inverse-sub)}
.meta{margin-top:34px;padding-top:18px;border-top:1px solid var(--border-on-inverse);display:flex;justify-content:space-between;font-size:var(--text-caption);color:var(--text-on-inverse-mute)}
@media print{header,.toc,footer{display:none}.doc{grid-template-columns:1fr;padding:0}}
@media(max-width:820px){.doc{grid-template-columns:1fr;gap:0}.toc{display:none}}
</style></head><body>
<header><div class="wrap bar">
<a href="../index.html" style="display:flex;align-items:center;gap:10px"><img src="../../../assets/mark-green.svg" width="26" alt=""><span style="font-family:var(--font-display);font-weight:700;font-size:19px;letter-spacing:var(--tracking-wordmark);color:var(--text-heading)">AVERIS</span></a>
<nav class="nav"><a href="../index.html#home">Overview</a><a href="../index.html#method">How it works</a><a href="../index.html#about">About</a><a href="../index.html#contact">Contact</a><a href="../index.html#contact" style="background:var(--interactive-primary);color:var(--text-on-inverse);font-weight:600;padding:8px 14px;border-radius:var(--radius-md);font-size:var(--text-body-sm)">Request an analysis</a></nav>
</div></header>
<div class="wrap" style="padding-top:56px"><div class="eyebrow">Legal</div><h1>HIPAA and security</h1>
<p style="margin-top:14px;font-size:var(--text-body-lg);max-width:var(--measure)">Averis works with protected health information at scale. These are the commitments that make that safe for you and defensible for your counsel.</p>
<p style="font-size:var(--text-caption);color:var(--text-faint)">Last updated 9 August 2026</p></div>
<div class="doc"><nav class="toc"><a href="#our-role">Our role</a><a href="#minimum-necessary">Minimum necessary</a><a href="#how-data-reaches-us">How data reaches us</a><a href="#safeguards">Safeguards</a><a href="#subprocessors">Subprocessors</a><a href="#retention-and-return">Retention and return</a><a href="#breach-notification">Breach notification</a><a href="#documentation-for-your-file">Documentation for your file</a><a href="#contact">Contact</a></nav>
<div><section id="our-role"><h2>Our role</h2><p>When we analyze claims data for a provider, Averis acts as a <strong>business associate</strong> under HIPAA. We execute a Business Associate Agreement before any protected health information moves, and that agreement controls where it differs from this page. Where we work at the direction of outside counsel, we can be engaged so the work is positioned for privilege; your counsel decides that structure.</p></section><section id="minimum-necessary"><h2>Minimum necessary</h2><p>We request only the data needed to test the allegation: the audit period, the cited population, and the documentation that supports it. We do not request records outside the scope, and we say so in writing when a request would exceed it.</p></section><section id="how-data-reaches-us"><h2>How data reaches us</h2><ul><li>Encrypted transfer over SFTP or a client-controlled secure share. Never email attachments, never the website.</li><li>Access credentials are issued per person, per engagement, and revoked at close.</li><li>Every transfer is logged, and every file is hashed on receipt so the manifest in your findings packet is verifiable.</li></ul></section><section id="safeguards"><h2>Safeguards</h2><ul><li><strong>Technical.</strong> Encryption in transit (TLS 1.2+) and at rest (AES-256), role-based least-privilege access, multi-factor authentication, logged and reviewed access to engagement data, network segregation between engagements.</li><li><strong>Administrative.</strong> Workforce HIPAA training at hire and annually, background checks, written incident response plan, annual risk analysis, documented subprocessor review.</li><li><strong>Physical.</strong> Processing in access-controlled facilities operated by our infrastructure providers, with no PHI on local or removable media.</li></ul></section><section id="subprocessors"><h2>Subprocessors</h2><p>Any vendor with potential access to protected health information is under a written business associate or equivalent agreement and is reviewed before use. A current subprocessor list is available on request.</p></section><section id="retention-and-return"><h2>Retention and return</h2><p>Engagement data lives only as long as the engagement and the retention period your agreement sets. At close, we return or destroy it at your direction and provide written certification of destruction.</p></section><section id="breach-notification"><h2>Breach notification</h2><p>If we discover a breach of unsecured protected health information, we notify the covered entity without unreasonable delay and within the period the Business Associate Agreement requires, with the facts we have and the facts we are still establishing. We do not wait for a complete picture to tell you something happened.</p></section><section id="documentation-for-your-file"><h2>Documentation for your file</h2><p>On request we provide the executed BAA, our security overview, the subprocessor list, evidence of workforce training, and the source manifest for your matter. Compliance and internal audit teams should have what they need without a follow-up.</p></section><section id="contact"><h2>Contact</h2><p>Security and privacy inquiries: <a href="mailto:security@averis.ai">security@averis.ai</a>. To request a Business Associate Agreement before sending anything, write to <a href="mailto:counsel@averis.ai">counsel@averis.ai</a>.</p></section>
<div class="notice"><strong style="color:var(--text-heading)">Draft for counsel review.</strong> This document is a structural and editorial template written to the Averis brand voice. It is not legal advice and has not been reviewed by an attorney. Have counsel confirm every clause, jurisdiction, retention period, and statutory reference before publication.</div>
</div></div>
<footer><div class="wrap"><div class="fnav"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="hipaa-security.html">HIPAA &amp; security</a></div>
<div class="meta"><span>&copy; 2026 Averis. averis.ai</span><span>We prove you were right.</span></div></div></footer>
</body></html>```

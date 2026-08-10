# Component source

The full source of all 19 Averis design system primitives, inlined here as one
reference file. Each entry gives the props contract (`.d.ts`), the usage notes
(`.prompt.md`), and the implementation (`.jsx`).

These are prototype implementations built on React with inline styles reading CSS
custom properties. Recreate them in the target codebase's own component conventions;
treat the styling values as the spec.


---

# core

## Button

Use `Button` for any action or CTA; one `primary` per view, `secondary` for alternates.

```jsx
<Button variant="primary" size="lg" href="/contact">Talk to our team</Button>
<Button variant="secondary">Read the method</Button>
```

Variants: `primary` (Harbor Green), `secondary` (hairline outline), `accent` (champagne, max one per page), `ghost`, `inverse` (for use on green sections). Sizes `sm | md | lg`. Hover lightens green to Pine; press nudges down 1px. Never use red.


### Props

```ts
import * as React from 'react';
/**
 * Primary action control. Harbor Green solid for the one true action per view;
 * secondary outline for everything else. Accent (champagne) is reserved for a
 * single high-value CTA on light surfaces.
 */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';

const base={fontFamily:'var(--font-ui)',fontWeight:'var(--weight-semibold)',border:'1px solid transparent',borderRadius:'var(--radius-md)',cursor:'pointer',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'var(--space-3)',lineHeight:1,textDecoration:'none',transition:'background var(--duration-base) var(--ease-standard),color var(--duration-base) var(--ease-standard),border-color var(--duration-base) var(--ease-standard),transform var(--duration-fast) var(--ease-standard)',whiteSpace:'nowrap'};
const sizes={sm:{fontSize:'var(--text-body-sm)',padding:'8px 14px'},md:{fontSize:'var(--text-body-md)',padding:'11px 20px'},lg:{fontSize:'var(--text-body-lg)',padding:'14px 26px'}};
const variants={
  primary:{background:'var(--interactive-primary)',color:'var(--text-on-inverse)'},
  secondary:{background:'transparent',color:'var(--text-heading)',borderColor:'var(--border-soft)'},
  accent:{background:'var(--accent-line-on-light)',color:'var(--averis-deep-pine)'},
  ghost:{background:'transparent',color:'var(--text-heading)'},
  inverse:{background:'var(--averis-bone)',color:'var(--text-heading)'}
};
const hovers={
  primary:{background:'var(--interactive-primary-hover)'},
  secondary:{background:'var(--tint-green-05)',borderColor:'var(--border-strong)'},
  accent:{background:'var(--averis-champagne)'},
  ghost:{background:'var(--tint-green-05)'},
  inverse:{background:'var(--averis-white)'}
};

export function Button({variant='primary',size='md',disabled=false,fullWidth=false,href,iconLeft,iconRight,onClick,style,children,...rest}){
  const [hover,setHover]=React.useState(false);
  const [press,setPress]=React.useState(false);
  const Tag=href?'a':'button';
  const s={...base,...sizes[size],...variants[variant],...(hover&&!disabled?hovers[variant]:null),
    width:fullWidth?'100%':undefined,opacity:disabled?.42:1,pointerEvents:disabled?'none':undefined,
    transform:press?'translateY(1px)':'none',...style};
  return React.createElement(Tag,{href,onClick,disabled:href?undefined:disabled,style:s,
    onMouseEnter:()=>setHover(true),onMouseLeave:()=>{setHover(false);setPress(false)},
    onMouseDown:()=>setPress(true),onMouseUp:()=>setPress(false),...rest},
    iconLeft,children,iconRight);
}
```

## IconButton

Icon-only button for dense UI (table row actions, dialog close, toolbar).

```jsx
<IconButton name="download" label="Download evidence packet" variant="outline" />
```

Always pass `label`. Use `inverse` on Harbor Green surfaces.


### Props

```ts
import * as React from 'react';
/** Square, icon-only control for toolbars, table rows, and dialog dismissal. */
export interface IconButtonProps {
  /** Lucide icon name, e.g. "download". */
  name: string;
  /** Accessible label: required, the button has no text. */
  label: string;
  variant?: 'ghost' | 'outline' | 'solid' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
import { Icon } from './Icon.jsx';

const sizes={sm:28,md:36,lg:44};
export function IconButton({name,label,variant='ghost',size='md',disabled=false,onClick,style,...rest}){
  const [hover,setHover]=React.useState(false);
  const d=sizes[size];
  const tone=variant==='inverse'?'var(--text-on-inverse)':'var(--text-heading)';
  const bg=variant==='solid'?'var(--interactive-primary)':(hover?(variant==='inverse'?'rgba(245,242,235,.12)':'var(--tint-green-05)'):'transparent');
  return React.createElement('button',{'aria-label':label,onClick,disabled,onMouseEnter:()=>setHover(true),onMouseLeave:()=>setHover(false),
    style:{width:d,height:d,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:'var(--radius-sm)',
      border:variant==='outline'?'1px solid var(--border-soft)':'1px solid transparent',
      background:variant==='solid'?(hover?'var(--interactive-primary-hover)':bg):bg,
      color:variant==='solid'?'var(--text-on-inverse)':tone,cursor:'pointer',opacity:disabled?.42:1,
      transition:'background var(--duration-base) var(--ease-standard)',...style},...rest},
    React.createElement(Icon,{name,size:size==='sm'?14:size==='lg'?20:16}));
}
```

## Icon

Lucide 0.454.0 glyphs, vendored into the bundle (and mirrored in `assets/icons/`). Intentional addition: the brand guidelines specify no icon set.

```jsx
<Icon name="shield-check" size={20} color="var(--accent-line-on-light)" />
```

House icons: `file-search`, `shield-check`, `scale`, `database`, `line-chart`, `check`, `arrow-right`, `download`.

Only the 15 vendored glyphs resolve; anything else renders nothing rather than a placeholder box. Add a glyph by dropping its path data into `GLYPHS` in `Icon.jsx` and the file into `assets/icons/`.


### Props

```ts
import * as React from 'react';
/** Lucide 0.454.0 glyph, vendored and inlined as SVG. Unknown names render nothing. */
export interface IconProps {
  /** Vendored glyph name, e.g. "file-search". See ICON_NAMES for the full set. */
  name: string;
  size?: number;
  /** Any CSS colour; defaults to currentColor. */
  color?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element | null;
export declare const ICON_NAMES: string[];
```

### Implementation

```jsx
import React from 'react';
/* Lucide 0.454.0 (ISC), vendored. No icon set was supplied with the Averis brand
   guidelines; Lucide's 24px grid and 2px round-cap stroke match the logo mark's
   geometry. Path data is inlined so there is no network dependency and no
   opaque-square failure mode; the same glyphs also live in assets/icons/.
   An unknown name renders nothing. */
const GLYPHS = {
  'file-search':'<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="m9 18-1.5-1.5"/><circle cx="5" cy="14" r="3"/>',
  'shield-check':'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  'scale':'<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  'database':'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
  'line-chart':'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
  'check':'<path d="M20 6 9 17l-5-5"/>',
  'arrow-right':'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'download':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'info':'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  'clock':'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'triangle-alert':'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'file-text':'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  'mail':'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'phone':'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'ellipsis':'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>'
};

export function Icon({name,size=16,color='currentColor',strokeWidth=2,style,...rest}){
  const glyph=GLYPHS[name];
  if(!glyph) return null;
  return React.createElement('svg',{xmlns:'http://www.w3.org/2000/svg',width:size,height:size,viewBox:'0 0 24 24',
    fill:'none',stroke:color,strokeWidth,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true,
    dangerouslySetInnerHTML:{__html:glyph},
    style:{display:'inline-block',flex:'0 0 auto',verticalAlign:'middle',...style},...rest});
}

export const ICON_NAMES = Object.keys(GLYPHS);
```

## Logo

The brand lockup. Use `reversed` on Harbor Green, `primary` on bone/white.

```jsx
<Logo variant="reversed" descriptor height={28} />
```

Never recolour, stretch, or re-space it. Clear space = the height of the A mark on all sides. Minimum 120px wide for the lockup; `markOnly` may go to 16px.


### Props

```ts
import * as React from 'react';
/**
 * The Averis lockup: "A" monogram, Archivo wordmark tracked .15em, and the
 * champagne affirmation line running under the full wordmark.
 */
export interface LogoProps {
  variant?: 'primary' | 'reversed';
  /** Adds the "Healthcare Claims Analysis" category line beneath. */
  descriptor?: boolean;
  /** Wordmark cap height in px; everything scales from it. Min 120px total width. */
  height?: number;
  /** Renders only the "A" monogram (favicon / avatar use). */
  markOnly?: boolean;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';

export function Logo({variant='primary',descriptor=false,height=34,markOnly=false,style}){
  const dark=variant==='reversed';
  const stroke=dark?'#F5F2EB':'#16473F';
  const line=dark?'var(--accent-line)':'var(--accent-line-on-light)';
  const mark=React.createElement('svg',{width:height*1.35,height:height*1.35,viewBox:'0 0 100 100',fill:'none',style:{flex:'0 0 auto'}},
    React.createElement('path',{d:'M27 82 L50 22 L73 82',stroke,strokeWidth:11,strokeLinecap:'round',strokeLinejoin:'round'}));
  if(markOnly) return React.createElement('span',{style:{display:'inline-flex',...style}},mark);
  const wordmark=React.createElement('span',{style:{position:'relative',display:'inline-flex',alignItems:'center',gap:height*0.47}},
    mark,
    React.createElement('span',{style:{fontFamily:'var(--font-display)',fontWeight:700,letterSpacing:'var(--tracking-wordmark)',lineHeight:1,
      fontSize:height,color:dark?'var(--text-on-inverse)':'var(--text-heading)',position:'relative',zIndex:2}},'AVERIS'),
    React.createElement('span',{style:{position:'absolute',zIndex:1,height:Math.max(3,height*0.15),borderRadius:'var(--radius-xs)',
      left:6,right:-4,bottom:'22%',background:line}}));
  if(!descriptor) return React.createElement('span',{style:{display:'inline-flex',...style}},wordmark);
  return React.createElement('span',{style:{display:'inline-flex',flexDirection:'column',alignItems:'flex-start',gap:height*0.41,...style}},
    wordmark,
    React.createElement('span',{style:{fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'var(--text-nano)',textTransform:'uppercase',
      letterSpacing:'var(--tracking-catline)',color:dark?'var(--text-on-inverse-mute)':'#6A7C74'}},'Healthcare Claims Analysis'));
}
```

## AffirmationLine

The signature champagne rule. Use as a section divider, a data callout accent, or under one headline per view.

```jsx
<AffirmationHeading tone="dark" level="h1">The record is on your side</AffirmationHeading>
<AffirmationLine width={120} />
```

Never tilt it, never recolour it, never use more than one underlined headline per screen.


### Props

```ts
import * as React from 'react';
/**
 * The champagne affirmation line: the brand's signature graphic element.
 * Always horizontal, always champagne, always fully rounded caps.
 */
export interface AffirmationLineProps {
  tone?: 'light' | 'dark';
  thickness?: number;
  /** How far the line runs past its container, in px. */
  overhang?: number;
  width?: string | number;
  style?: React.CSSProperties;
}
export declare function AffirmationLine(props: AffirmationLineProps): JSX.Element;

export interface AffirmationHeadingProps {
  tone?: 'light' | 'dark';
  level?: 'h1' | 'h2' | 'h3';
  thickness?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function AffirmationHeading(props: AffirmationHeadingProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
/* The brand's signature device: a champagne rule that underlines a claim. */
export function AffirmationLine({tone='light',thickness=4,overhang=8,width,style}){
  return React.createElement('span',{style:{display:'block',height:thickness,borderRadius:'var(--radius-xs)',
    background:tone==='dark'?'var(--accent-line)':'var(--accent-line-on-light)',
    width:width||`calc(100% + ${overhang}px)`,...style}});
}

export function AffirmationHeading({children,tone='light',level='h2',thickness=4,style}){
  const dark=tone==='dark';
  return React.createElement('span',{style:{display:'inline-block',position:'relative',...style}},
    React.createElement(level,{style:{fontFamily:'var(--font-display)',fontWeight:700,margin:0,
      fontSize:level==='h1'?'var(--text-display-2)':'var(--text-h2)',letterSpacing:'var(--tracking-display)',
      lineHeight:'var(--leading-snug)',color:dark?'var(--text-on-inverse)':'var(--text-heading)'}},children),
    React.createElement('span',{style:{position:'absolute',left:0,right:-8,bottom:-10,height:thickness,borderRadius:'var(--radius-xs)',
      background:dark?'var(--accent-line)':'var(--accent-line-on-light)'}}));
}
```

## Card

Default surface for grouped content.

```jsx
<Card tone="bone" accent>…</Card>
```

Tones: `light` (white), `bone`, `sand`, `green` (inverse). Radius 14px, hairline border, shadows stay very soft, never a drop-shadow stack. `accent` draws a short champagne rule at the top edge; use on at most one card per group.


### Props

```ts
import * as React from 'react';
/**
 * Surface container. 14px radius, hairline green border, near-flat shadow.
 */
export interface CardProps {
  tone?: 'light' | 'bone' | 'sand' | 'green';
  /** Adds a short champagne rule at the top-left edge. */
  accent?: boolean;
  padding?: number;
  /** Lifts the shadow on hover. */
  interactive?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
export function Card({tone='light',accent=false,padding=26,interactive=false,style,children,...rest}){
  const [hover,setHover]=React.useState(false);
  const tones={
    light:{background:'var(--surface-card)',border:'1px solid var(--border-hairline)',color:'var(--text-body)'},
    bone:{background:'var(--surface-raised)',border:'1px solid var(--border-hairline)',color:'var(--text-body)'},
    sand:{background:'var(--surface-neutral)',border:'1px solid transparent',color:'var(--text-body)'},
    green:{background:'var(--surface-inverse)',border:'1px solid transparent',color:'var(--text-on-inverse-sub)'}
  };
  return React.createElement('div',{onMouseEnter:()=>setHover(true),onMouseLeave:()=>setHover(false),
    style:{borderRadius:'var(--radius-xl)',padding,position:'relative',overflow:'hidden',fontFamily:'var(--font-ui)',
      boxShadow:interactive&&hover?'var(--shadow-raised)':'var(--shadow-card)',
      transition:'box-shadow var(--duration-base) var(--ease-standard)',...tones[tone],...style},...rest},
    accent?React.createElement('span',{style:{position:'absolute',left:0,top:0,height:4,width:64,
      background:tone==='green'?'var(--accent-line)':'var(--accent-line-on-light)',borderRadius:'0 var(--radius-xs) var(--radius-xs) 0'}}):null,
    children);
}
```

## Badge

Status marker; uppercase, tracked, 11px.

```jsx
<Badge tone="proven">Supported</Badge>
```

`critical` is the only place the brand's off-red appears, reserve it for genuinely adverse states, never for emphasis.


### Props

```ts
import * as React from 'react';
/** Small status marker for claim/case state. */
export interface BadgeProps {
  tone?: 'proven' | 'review' | 'neutral' | 'critical' | 'inverse';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
const tones={
  proven:{background:'var(--tint-green-05)',color:'var(--status-proven)',border:'1px solid var(--border-soft)'},
  review:{background:'rgba(199,154,78,.10)',color:'#8A6A2C',border:'1px solid rgba(199,154,78,.32)'},
  neutral:{background:'var(--surface-neutral)',color:'var(--averis-slate-mid)',border:'1px solid transparent'},
  critical:{background:'var(--status-critical-tint)',color:'var(--status-critical)',border:'1px solid var(--status-critical-border)'},
  inverse:{background:'rgba(245,242,235,.10)',color:'var(--text-on-inverse)',border:'1px solid var(--border-on-inverse)'}
};
export function Badge({tone='neutral',children,style,...rest}){
  return React.createElement('span',{style:{fontFamily:'var(--font-ui)',fontSize:'var(--text-micro)',fontWeight:600,
    letterSpacing:'.06em',textTransform:'uppercase',padding:'4px 9px',borderRadius:'var(--radius-sm)',display:'inline-flex',
    alignItems:'center',gap:6,lineHeight:1.3,...tones[tone],...style},...rest},children);
}
```

## Tag

Pill-shaped filter or metadata chip.

```jsx
<Tag onRemove={() => drop('UHC')}>UnitedHealthcare</Tag>
```

Sentence case, not uppercase, that's Badge's job.


### Props

```ts
import * as React from 'react';
/** Pill for filters, payer names, CPT groupings. Removable when `onRemove` is given. */
export interface TagProps {
  tone?: 'sand' | 'outline' | 'green';
  onRemove?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
export function Tag({children,onRemove,tone='sand',style,...rest}){
  const tones={sand:{background:'var(--surface-neutral)',color:'var(--averis-slate-mid)'},
    outline:{background:'transparent',color:'var(--text-heading)',boxShadow:'inset 0 0 0 1px var(--border-soft)'},
    green:{background:'var(--surface-inverse)',color:'var(--text-on-inverse)'}};
  return React.createElement('span',{style:{fontFamily:'var(--font-ui)',fontSize:'var(--text-caption)',fontWeight:500,
    padding:'5px 10px',borderRadius:'var(--radius-pill)',display:'inline-flex',alignItems:'center',gap:7,...tones[tone],...style},...rest},
    children,
    onRemove?React.createElement('button',{onClick:onRemove,'aria-label':'Remove',style:{border:0,background:'none',cursor:'pointer',
      color:'inherit',opacity:.6,fontSize:13,lineHeight:1,padding:0}},'\u00d7'):null);
}
```

---

# forms

## Input

Text field.

```jsx
<Input label="Work email" placeholder="cfo@provider.org" type="email" />
```

Labels are uppercase, tracked .14em, Pine. Focus draws a champagne border plus soft ring, never blue.


### Props

```ts
import * as React from 'react';
/** Single-line text field with uppercase tracked label, champagne focus ring. */
export interface InputProps {
  label?: string;
  /** Right-aligned note beside the label, e.g. "Optional". */
  hint?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  /** Error message shown beneath; also recolours the border. */
  error?: string;
  disabled?: boolean;
  /** Static text or node inside the field's left edge. */
  prefix?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
const fieldBase={fontFamily:'var(--font-ui)',fontSize:'var(--text-body-md)',color:'var(--text-strong)',background:'var(--surface-card)',border:'1px solid var(--border-soft)',borderRadius:'var(--radius-md)',padding:'10px 13px',width:'100%',outline:'none',transition:'border-color var(--duration-base) var(--ease-standard),box-shadow var(--duration-base) var(--ease-standard)'};
function Label({children,hint}){return React.createElement('span',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',fontFamily:'var(--font-ui)',fontSize:'var(--text-micro)',fontWeight:600,letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-eyebrow)',marginBottom:8}},children,hint?React.createElement('span',{style:{textTransform:'none',letterSpacing:0,fontWeight:400,color:'var(--text-faint)'}},hint):null)}

export function Input({label,hint,placeholder,value,defaultValue,onChange,type='text',error,disabled,prefix,style,...rest}){
  const [focus,setFocus]=React.useState(false);
  return React.createElement('label',{style:{display:'block',...style}},
    label?React.createElement(Label,{hint},label):null,
    React.createElement('span',{style:{display:'flex',alignItems:'center',gap:8,...fieldBase,padding:prefix?'0 13px':fieldBase.padding,
      borderColor:error?'var(--status-critical-border)':focus?'var(--accent-line-on-light)':'var(--border-soft)',
      boxShadow:focus?'var(--ring-focus)':'none',opacity:disabled?.5:1}},
      prefix?React.createElement('span',{style:{color:'var(--text-faint)',fontSize:'var(--text-body-sm)'}},prefix):null,
      React.createElement('input',{type,placeholder,value,defaultValue,onChange,disabled,
        onFocus:()=>setFocus(true),onBlur:()=>setFocus(false),
        style:{border:0,outline:'none',background:'transparent',font:'inherit',color:'inherit',width:'100%',padding:prefix?'10px 0':0},...rest})),
    error?React.createElement('span',{style:{display:'block',marginTop:6,fontFamily:'var(--font-ui)',fontSize:'var(--text-caption)',color:'var(--status-critical)'}},error):null);
}
```

## Select

Dropdown, visually identical to `Input`.

```jsx
<Select label="Payer type" options={[{value:'com',label:'Commercial'},{value:'fed',label:'Federal'}]} />
```


### Props

```ts
import * as React from 'react';
/** Native select styled to match Input. */
export interface SelectOption { value: string; label: string; }
export interface SelectProps {
  label?: string;
  hint?: string;
  options?: Array<SelectOption | string>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
const fieldBase={fontFamily:'var(--font-ui)',fontSize:'var(--text-body-md)',color:'var(--text-strong)',background:'var(--surface-card)',border:'1px solid var(--border-soft)',borderRadius:'var(--radius-md)',padding:'10px 13px',width:'100%',outline:'none',transition:'border-color var(--duration-base) var(--ease-standard),box-shadow var(--duration-base) var(--ease-standard)'};
function Label({children,hint}){return React.createElement('span',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',fontFamily:'var(--font-ui)',fontSize:'var(--text-micro)',fontWeight:600,letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:'var(--text-eyebrow)',marginBottom:8}},children,hint?React.createElement('span',{style:{textTransform:'none',letterSpacing:0,fontWeight:400,color:'var(--text-faint)'}},hint):null)}

export function Select({label,hint,options=[],value,onChange,disabled,style,...rest}){
  const [focus,setFocus]=React.useState(false);
  return React.createElement('label',{style:{display:'block',...style}},
    label?React.createElement(Label,{hint},label):null,
    React.createElement('select',{value,onChange,disabled,onFocus:()=>setFocus(true),onBlur:()=>setFocus(false),
      style:{...fieldBase,appearance:'none',cursor:'pointer',opacity:disabled?.5:1,
        borderColor:focus?'var(--accent-line-on-light)':'var(--border-soft)',boxShadow:focus?'var(--ring-focus)':'none',
        backgroundImage:'linear-gradient(45deg,transparent 50%,#7A847E 50%),linear-gradient(135deg,#7A847E 50%,transparent 50%)',
        backgroundPosition:'calc(100% - 17px) 50%,calc(100% - 12px) 50%',backgroundSize:'5px 5px,5px 5px',backgroundRepeat:'no-repeat',
        paddingRight:34},...rest},
      options.map(o=>React.createElement('option',{key:o.value??o,value:o.value??o},o.label??o))));
}
```

## Checkbox

Multi-select control; fills Harbor Green when checked.

```jsx
<Checkbox label="Include federal payers" description="Medicare and Medicaid RAC audits" defaultChecked />
```


### Props

```ts
import * as React from 'react';
/** Checkbox with optional secondary description line. */
export interface CheckboxProps {
  label?: React.ReactNode;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean, e: React.MouseEvent) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
export function Checkbox({label,description,checked,defaultChecked,onChange,disabled,style,...rest}){
  const [inner,setInner]=React.useState(defaultChecked||false);
  const on=checked!==undefined?checked:inner;
  const toggle=e=>{if(disabled)return;if(checked===undefined)setInner(!on);onChange&&onChange(!on,e)};
  return React.createElement('label',{onClick:toggle,style:{display:'flex',gap:11,alignItems:'flex-start',cursor:disabled?'default':'pointer',
    fontFamily:'var(--font-ui)',opacity:disabled?.5:1,...style},...rest},
    React.createElement('span',{style:{width:18,height:18,flex:'0 0 auto',marginTop:1,borderRadius:'var(--radius-xs)',
      border:'1px solid '+(on?'var(--interactive-primary)':'var(--border-strong)'),background:on?'var(--interactive-primary)':'var(--surface-card)',
      display:'flex',alignItems:'center',justifyContent:'center',transition:'background var(--duration-fast) var(--ease-standard)'}},
      on?React.createElement('svg',{width:11,height:11,viewBox:'0 0 24 24',fill:'none'},
        React.createElement('path',{d:'M4 12.5 L9.5 18 L20 6',stroke:'#F5F2EB',strokeWidth:3.2,strokeLinecap:'round',strokeLinejoin:'round'})):null),
    React.createElement('span',null,
      React.createElement('span',{style:{display:'block',fontSize:'var(--text-body-md)',color:'var(--text-strong)'}},label),
      description?React.createElement('span',{style:{display:'block',fontSize:'var(--text-body-sm)',color:'var(--text-muted)',marginTop:3}},description):null));
}
```

## Radio

Exclusive choice.

```jsx
<RadioGroup label="Allegation type" value={v} onChange={setV}
  options={[{value:'up',label:'Upcoding'},{value:'mn',label:'Medical necessity'}]} />
```


### Props

```ts
import * as React from 'react';
/** Single-choice control. Use `RadioGroup` for the labelled set. */
export interface RadioProps {
  label?: React.ReactNode;
  description?: string;
  checked?: boolean;
  value?: string;
  name?: string;
  onChange?: (value?: string) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;

export interface RadioGroupProps {
  label?: string;
  options?: Array<{ value: string; label: string; description?: string }>;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
export function Radio({label,description,checked,onChange,name,value,disabled,style,...rest}){
  return React.createElement('label',{onClick:()=>!disabled&&onChange&&onChange(value),
    style:{display:'flex',gap:11,alignItems:'flex-start',cursor:disabled?'default':'pointer',fontFamily:'var(--font-ui)',opacity:disabled?.5:1,...style},...rest},
    React.createElement('span',{style:{width:18,height:18,flex:'0 0 auto',marginTop:1,borderRadius:'50%',
      border:'1px solid '+(checked?'var(--interactive-primary)':'var(--border-strong)'),background:'var(--surface-card)',
      display:'flex',alignItems:'center',justifyContent:'center'}},
      checked?React.createElement('span',{style:{width:9,height:9,borderRadius:'50%',background:'var(--interactive-primary)'}}):null),
    React.createElement('span',null,
      React.createElement('span',{style:{display:'block',fontSize:'var(--text-body-md)',color:'var(--text-strong)'}},label),
      description?React.createElement('span',{style:{display:'block',fontSize:'var(--text-body-sm)',color:'var(--text-muted)',marginTop:3}},description):null));
}

export function RadioGroup({label,options=[],value,onChange,style}){
  return React.createElement('div',{style:{fontFamily:'var(--font-ui)',...style}},
    label?React.createElement('span',{style:{display:'block',fontSize:'var(--text-micro)',fontWeight:600,letterSpacing:'var(--tracking-label)',
      textTransform:'uppercase',color:'var(--text-eyebrow)',marginBottom:10}},label):null,
    React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:12}},
      options.map(o=>React.createElement(Radio,{key:o.value,value:o.value,label:o.label,description:o.description,
        checked:value===o.value,onChange}))));
}
```

## Switch

Immediate-effect toggle (not a form submit value, use `Checkbox` for that).

```jsx
<Switch label="Show only disputed lines" defaultChecked />
```


### Props

```ts
import * as React from 'react';
/** Binary toggle; the knob turns champagne when on. */
export interface SwitchProps {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
export function Switch({label,checked,defaultChecked,onChange,disabled,style,...rest}){
  const [inner,setInner]=React.useState(defaultChecked||false);
  const on=checked!==undefined?checked:inner;
  return React.createElement('label',{onClick:()=>{if(disabled)return;if(checked===undefined)setInner(!on);onChange&&onChange(!on)},
    style:{display:'inline-flex',alignItems:'center',gap:11,cursor:disabled?'default':'pointer',fontFamily:'var(--font-ui)',
      fontSize:'var(--text-body-md)',color:'var(--text-strong)',opacity:disabled?.5:1,...style},...rest},
    React.createElement('span',{style:{width:38,height:22,borderRadius:'var(--radius-pill)',padding:2,
      background:on?'var(--interactive-primary)':'var(--averis-sand)',transition:'background var(--duration-base) var(--ease-standard)'}},
      React.createElement('span',{style:{display:'block',width:18,height:18,borderRadius:'50%',background:on?'var(--accent-line)':'#FFF',
        transform:on?'translateX(16px)':'none',transition:'transform var(--duration-base) var(--ease-standard)',
        boxShadow:'0 1px 2px rgba(15,54,48,.25)'}})),
    label?React.createElement('span',null,label):null);
}
```

---

# feedback

## Dialog

Modal for confirmation and short forms.

```jsx
<Dialog title="Export evidence packet" description="Includes all 4,182 supported lines."
  footer={<><Button variant="ghost">Cancel</Button><Button>Export</Button></>} />
```


### Props

```ts
import * as React from 'react';
/** Centred modal over a green-tinted, blurred scrim. */
export interface DialogProps {
  open?: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
  /** Action buttons, right-aligned. */
  footer?: React.ReactNode;
  width?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
```

### Implementation

```jsx
import React from 'react';
export function Dialog({open=true,title,description,onClose,footer,width=520,children,style}){
  if(!open) return null;
  return React.createElement('div',{style:{position:'fixed',inset:0,zIndex:60,display:'flex',alignItems:'center',justifyContent:'center',padding:24}},
    React.createElement('div',{onClick:onClose,style:{position:'absolute',inset:0,background:'rgba(15,54,48,.42)',backdropFilter:'blur(3px)'}}),
    React.createElement('div',{role:'dialog','aria-modal':true,style:{position:'relative',width,maxWidth:'100%',background:'var(--surface-card)',
      borderRadius:'var(--radius-xl)',boxShadow:'var(--shadow-dialog)',padding:'26px 26px 22px',fontFamily:'var(--font-ui)',...style}},
      React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16}},
        React.createElement('div',null,
          React.createElement('h3',{style:{margin:0,fontFamily:'var(--font-display)',fontWeight:600,fontSize:'var(--text-h3)',color:'var(--text-heading)'}},title),
          description?React.createElement('p',{style:{margin:'8px 0 0',fontSize:'var(--text-body-md)',color:'var(--text-body)',maxWidth:'42ch'}},description):null),
        onClose?React.createElement('button',{onClick:onClose,'aria-label':'Close',style:{border:0,background:'none',cursor:'pointer',
          fontSize:20,lineHeight:1,color:'var(--text-faint)'}},'\u00d7'):null),
      children?React.createElement('div',{style:{marginTop:18}},children):null,
      footer?React.createElement('div',{style:{marginTop:22,display:'flex',justifyContent:'flex-end',gap:10}},footer):null));
}
```

## Toast

Transient status message, bottom-right.

```jsx
<Toast tone="proven" title="Packet exported" message="4,182 lines, 62 MB." onDismiss={close} />
```


### Props

```ts
import * as React from 'react';
/** Transient confirmation. Copy stays factual: state what happened, not how to feel. */
export interface ToastProps {
  tone?: 'proven' | 'review' | 'neutral' | 'critical';
  title?: string;
  message?: string;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
import { Icon } from '../core/Icon.jsx';
const tones={proven:{icon:'check',color:'var(--status-proven)'},review:{icon:'clock',color:'var(--status-review)'},
  neutral:{icon:'info',color:'var(--text-muted)'},critical:{icon:'triangle-alert',color:'var(--status-critical)'}};
export function Toast({tone='neutral',title,message,onDismiss,style}){
  const t=tones[tone];
  return React.createElement('div',{role:'status',style:{display:'flex',gap:12,alignItems:'flex-start',background:'var(--surface-card)',
    border:'1px solid var(--border-hairline)',borderRadius:'var(--radius-lg)',boxShadow:'var(--shadow-raised)',padding:'14px 16px',
    fontFamily:'var(--font-ui)',minWidth:300,maxWidth:420,...style}},
    React.createElement(Icon,{name:t.icon,size:16,color:t.color,style:{marginTop:2}}),
    React.createElement('div',{style:{flex:1}},
      React.createElement('div',{style:{fontSize:'var(--text-body-md)',fontWeight:600,color:'var(--text-strong)'}},title),
      message?React.createElement('div',{style:{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',marginTop:3}},message):null),
    onDismiss?React.createElement('button',{onClick:onDismiss,'aria-label':'Dismiss',style:{border:0,background:'none',cursor:'pointer',
      color:'var(--text-faint)',fontSize:16,lineHeight:1}},'\u00d7'):null);
}
```

## Tooltip

Short definition on hover, useful for claim-data jargon.

```jsx
<Tooltip content="Extrapolated overpayment estimate"><Icon name="info" /></Tooltip>
```


### Props

```ts
import * as React from 'react';
/** Deep Pine tooltip on hover or focus. Definitions only: never hide an action in one. */
export interface TooltipProps {
  content?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
export function Tooltip({content,placement='top',children,style}){
  const [open,setOpen]=React.useState(false);
  const pos=placement==='top'?{bottom:'calc(100% + 8px)',left:'50%',transform:'translateX(-50%)'}
    :placement==='bottom'?{top:'calc(100% + 8px)',left:'50%',transform:'translateX(-50%)'}
    :placement==='left'?{right:'calc(100% + 8px)',top:'50%',transform:'translateY(-50%)'}
    :{left:'calc(100% + 8px)',top:'50%',transform:'translateY(-50%)'};
  return React.createElement('span',{style:{position:'relative',display:'inline-flex',...style},
    onMouseEnter:()=>setOpen(true),onMouseLeave:()=>setOpen(false),onFocus:()=>setOpen(true),onBlur:()=>setOpen(false)},
    children,
    open?React.createElement('span',{role:'tooltip',style:{position:'absolute',zIndex:70,...pos,background:'var(--surface-inverse-deep)',
      color:'var(--text-on-inverse)',fontFamily:'var(--font-ui)',fontSize:'var(--text-caption)',lineHeight:1.45,padding:'7px 10px',
      borderRadius:'var(--radius-sm)',whiteSpace:'nowrap',boxShadow:'var(--shadow-raised)'}},content):null);
}
```

---

# navigation

## Tabs

Section switcher within a page or panel.

```jsx
<Tabs value={tab} onChange={setTab} tabs={[{value:'a',label:'Findings',count:12},{value:'b',label:'Method'}]} />
```

Active state is the champagne rule, that is the only indicator; do not add background fills.


### Props

```ts
import * as React from 'react';
/**
 * Underlined tab bar; the active tab is marked with the champagne affirmation line.
 */
export interface TabsProps {
  tabs?: Array<{ value: string; label: string; count?: number }>;
  value?: string;
  onChange?: (value: string) => void;
  tone?: 'light' | 'dark';
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
```

### Implementation

```jsx
import React from 'react';
export function Tabs({tabs=[],value,onChange,tone='light',style}){
  const dark=tone==='dark';
  const active=value??tabs[0]?.value;
  return React.createElement('div',{style:{display:'flex',gap:26,borderBottom:'1px solid '+(dark?'var(--border-on-inverse)':'var(--border-hairline)'),
    fontFamily:'var(--font-ui)',...style}},
    tabs.map(t=>{
      const on=t.value===active;
      return React.createElement('button',{key:t.value,onClick:()=>onChange&&onChange(t.value),
        style:{border:0,background:'none',cursor:'pointer',padding:'0 0 12px',position:'relative',fontSize:'var(--text-body-md)',
          fontWeight:on?600:500,color:on?(dark?'var(--text-on-inverse)':'var(--text-heading)'):(dark?'var(--text-on-inverse-mute)':'var(--text-muted)'),
          transition:'color var(--duration-base) var(--ease-standard)'}},
        t.label,
        t.count!==undefined?React.createElement('span',{style:{marginLeft:7,fontSize:'var(--text-caption)',color:'var(--text-faint)'}},t.count):null,
        on?React.createElement('span',{style:{position:'absolute',left:0,right:0,bottom:-1,height:3,borderRadius:'var(--radius-xs)',
          background:dark?'var(--accent-line)':'var(--accent-line-on-light)'}}):null);
    }));
}
```

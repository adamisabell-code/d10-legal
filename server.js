const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const EVIDENCE = `
ADAM ISABELL — PORTFOLIO EVIDENCE

CAREER
- 10+ years in operations/construction leadership: crews, subcontractors, materials, scheduling, clients, compliance, P&L, project delivery.
- Austin Courts & Floors / Sport Court: end-to-end project delivery including estimating, crew scheduling, subcontractor coordination, materials logistics, client management, escalations, timeline changes, quality sign-off; built internal operations tooling.
- Toll Brothers: helped stand up a new division on an 80-unit, $40M condominium project; built permitting/compliance workflows from scratch.
- Education listed on resume: High School Diploma. Do not invent degrees or certifications.

PROJECT: INVENTORY & ORDERING [source: inventory]
- Connected construction inventory/purchasing workflow.
- Models on-hand, allocated, available, on-order, reorder exposure, job-level material allocation, completed-job consumption, and purchase-order generation.
- Demonstrates operations workflow design, product thinking, data model reasoning, AI-assisted implementation.

PROJECT: STOCKTON [source: stockton]
- AI company-knowledge operating system for trades businesses; not merely a generic chatbot.
- Employee asks company question -> retrieve approved knowledge/citations -> if unknown, clearly distinguish that gap -> create knowledge gap -> route to owner -> owner answers once -> answer becomes permanent retrievable knowledge.
- Architecture documented in prior project work: static HTML PWA, Netlify Functions, Supabase Postgres + pgvector, Claude, Voyage voyage-3 embeddings; single-company deployment architecture.
- Production validation covered approved retrieval and unknown/gap creation. Some later lifecycle features remained in development. Do not claim every planned feature shipped.

PROJECT: BUILD MODE [source: buildmode]
- Interactive Unity prototype for configurable physical products.
- BUILD -> INSPECT -> EXPERIENCE flow with configurable equipment, 3D asset integration, interaction design, cameras, warning lights, inspection states and drivable vehicle.
- Adam had no prior Unity development background and used AI-assisted development to rapidly learn and prototype.

PROJECT: D10 [source: d10]
- Working iOS personal operating system combining personal standards, Apple Health data, calendar context, Daily 10 accountability and one primary daily Mission.
- Adam drove product strategy, UX, requirements, AI-assisted implementation, QA, subscription/IAP flow and TestFlight iteration.

PROJECT: HYFIT [source: hyfit]
- Working mobile race-training product built with React Native/Expo.
- Inputs include race date, division/format, training days, running ability, gym access and goal; outputs a persistent Today/Plan/Progress experience with rebuildable future plan and preserved workout history.
- Distributed through TestFlight.

CURRENT AI-SOLUTIONS RESUME
- Current profile: operations leader and hands-on AI product builder with 10+ years running complex construction/service workflows and 2+ years independently building software with Claude, ChatGPT, Supabase, React Native, Unity, APIs, and modern AI tooling.
- Current capabilities emphasized: workflow discovery, process mapping, requirements, scoping, rapid prototyping, QA, iteration, documentation, client/vendor management, escalations, and ROI-oriented process improvement.
- Technical tools listed: Supabase/Postgres, APIs, React Native/Expo, Unity/C#, GitHub, Netlify, Stripe, Monday.com.

NOVOBI APPLICATION CONTEXT
- Adam is applying to Novobi's AI Solutions Consultant role because it combines business-process discovery, practical AI implementation, short-cycle delivery, client adoption, and measurable business value.
- The cover letter explicitly states Adam does NOT yet have Odoo implementation experience. Do not hide or soften that gap.
- The argument for transfer is: deep operating context + client ownership + hands-on AI fluency + demonstrated ability to learn unfamiliar tools quickly and produce working results.
- Use this Novobi-specific material only when the question is about Novobi, Odoo, or that application; do not make other employers sound like Novobi.

POSITIONING
- Strongest target families: AI implementation, technical implementation, product operations, solutions/solutions consulting, technical project management, AI product generalist/operator.
- Do NOT portray Adam as a traditional senior software engineer or claim specialist depth that is not evidenced.
- Be candid about gaps. Traditional enterprise SaaS tenure, domain-specific experience (e.g. healthcare/banking), formal credentials, or deep specialist engineering may be gaps depending on a job description.
`;

const SYSTEM = `You are Ask Adam, the hiring concierge embedded in Adam Isabell's portfolio. Your sole job is to help a recruiter or hiring manager understand Adam's fit using ONLY the evidence below.

Rules:
1. Never invent experience, metrics, employers, credentials, technologies, outcomes, or shipped status.
2. Distinguish demonstrated evidence from transferable fit.
3. If a job asks for something not supported, call it a gap plainly.
4. Be concise, useful, and recruiter-facing — usually 120-220 words.
5. Do not flatter. Do not say Adam is the best candidate. Do not fabricate interview odds.
6. When asked about a job description, organize the answer as: strongest matches, transferable matches, gaps/risks, and what to inspect in the portfolio.
7. End with SOURCE_IDS on its own line, containing a comma-separated subset of: inventory, stockton, buildmode, d10, hyfit, story, resume, application.

${EVIDENCE}`;

function send(res, status, body, type='text/plain; charset=utf-8') {
  res.writeHead(status, {
    'content-type': type,
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
    'x-frame-options': 'SAMEORIGIN'
  });
  res.end(body);
}

function mime(file) {
  const ext = path.extname(file).toLowerCase();
  return ({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.pdf':'application/pdf','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg'}[ext] || 'application/octet-stream');
}

async function askAdam(req, res) {
  let raw='';
  req.on('data', c => { raw += c; if (raw.length > 25000) req.destroy(); });
  req.on('end', async () => {
    let body={};
    try { body = JSON.parse(raw || '{}'); } catch { return send(res,400,JSON.stringify({error:'Invalid JSON'}),'application/json'); }
    const question = String(body.question || '').slice(0,16000).trim();
    if (!question) return send(res,400,JSON.stringify({error:'Question required'}),'application/json');
    if (!process.env.ANTHROPIC_API_KEY) return send(res,503,JSON.stringify({error:'AI provider not configured'}),'application/json');
    try {
      const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5';
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{'content-type':'application/json','x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},
        body:JSON.stringify({model,max_tokens:650,temperature:0.2,system:SYSTEM,messages:[{role:'user',content:question}]})
      });
      if (!r.ok) return send(res,502,JSON.stringify({error:'AI provider error'}),'application/json');
      const data = await r.json();
      let answer=(data.content||[]).filter(x=>x.type==='text').map(x=>x.text).join('\n').trim();
      let sources=[];
      const m=answer.match(/\n?SOURCE_IDS:\s*([^\n]+)/i);
      if(m){sources=m[1].split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);answer=answer.replace(m[0],'').trim();}
      return send(res,200,JSON.stringify({answer,sources}),'application/json');
    } catch(e) {
      return send(res,500,JSON.stringify({error:'Ask Adam failed'}),'application/json');
    }
  });
}

const server = http.createServer((req,res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/api/ask-adam' && req.method === 'POST') return askAdam(req,res);
  if (url.pathname === '/health') return send(res,200,'ok');
  let rel = decodeURIComponent(url.pathname);
  if (rel === '/') rel = '/index.html';
  rel = rel.replace(/^\/+/, '');
  const file = path.resolve(ROOT, rel);
  if (!file.startsWith(ROOT)) return send(res,403,'Forbidden');
  fs.stat(file,(err,st)=>{
    if(err || !st.isFile()) return send(res,404,'Not found');
    res.writeHead(200,{'content-type':mime(file),'x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','x-frame-options':'SAMEORIGIN'});
    fs.createReadStream(file).pipe(res);
  });
});

server.listen(PORT, () => console.log(`Portfolio live on ${PORT}`));

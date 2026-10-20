(() => {
  function updatePortfolio(){
    const cases=[...document.querySelectorAll('article.case')];
    const byTitle=t=>cases.find(a=>a.querySelector('h3')?.textContent.trim()===t);
    const watt=byTitle('D10');
    if(watt){
      watt.querySelector('h3').textContent='Wattkins';
      const intro=watt.querySelector('.case-copy > p');
      if(intro) intro.textContent='An AI-assisted daily accountability companion built around ten small wins and Watt, a responsive animated sidekick. Formerly D10.';
      const result=watt.querySelector('.result');
      if(result) result.innerHTML='<b>From idea to iPhone:</b> designed the companion, onboarding and daily check-in; directed AI coding agents, tested iterations in TestFlight, and developed a breathing animation for Watt. The product continues to evolve.';

      // Preserve existing embedded Wattkins screenshots until verified replacements are uploaded.\n      const chips=watt.querySelector('.chips');
      if(chips) chips.innerHTML='<span class="chip">AI-assisted development</span><span class="chip">iOS / TestFlight</span><span class="chip">Companion UX</span><span class="chip">Product iteration</span>';
    }
    let stock=byTitle('Stockton');
    const inventory=byTitle('Inventory & Ordering'), build=byTitle('Build Mode'), court=byTitle('Court Planner');
    if(!stock && inventory){
      stock=document.createElement('article');stock.className='case';
      stock.innerHTML='<div class="case-grid"><div class="case-copy"><div class="index">AI · Knowledge system</div><h3>Stockton</h3><p>An AI company-knowledge assistant designed to retrieve approved answers, cite sources, and surface questions the business cannot yet answer.</p><div class="result"><b>Core workflow:</b> Ask a question → retrieve trusted knowledge → flag an unanswered question → route it for review so the business can improve its knowledge base. Validated retrieval and gap capture; later workflow elements remained in development.</div><div class="chips"><span class="chip">Applied AI</span><span class="chip">Knowledge retrieval</span><span class="chip">Supabase</span><span class="chip">Workflow design</span></div></div><div class="media-stack"><div class="frame" style="padding:28px;min-height:240px;display:flex;align-items:center;justify-content:center"><div style="width:100%;max-width:430px;font-size:14px;line-height:1.7"><div style="font-weight:700;margin-bottom:12px">Knowledge that gets smarter as the team uses it</div><div style="border:1px solid currentColor;border-radius:10px;padding:12px;margin-bottom:10px">Employee question</div><div style="text-align:center">↓</div><div style="border:1px solid currentColor;border-radius:10px;padding:12px;margin:10px 0">Approved, cited answer — or knowledge gap</div><div style="text-align:center">↓</div><div style="border:1px solid currentColor;border-radius:10px;padding:12px;margin-top:10px">Route unanswered questions for human review</div></div></div></div></div>';
      inventory.parentElement.insertBefore(stock,inventory);
    }
    if(stock){const p=stock.querySelector('.case-copy > p');if(p)p.textContent='An AI company-knowledge assistant that retrieves approved answers, cites sources and surfaces questions the business cannot yet answer.';}
    if(inventory){const p=inventory.querySelector('.case-copy > p');if(p)p.textContent='An AI-assisted inventory and purchasing workflow built around real job materials, stock availability, ordering and field operations.';}
    const parent=inventory?.parentElement;
    if(parent&&stock&&inventory&&watt&&build&&court){
      const anchor=stock;
      [stock,inventory,watt,court,build].forEach(el=>parent.appendChild(el));
    }
    document.querySelectorAll('a,button,h1,h2,h3').forEach(el=>{
      if(el.textContent.trim()==='D10')el.textContent='Wattkins';
    });
    const meta=document.querySelector('meta[name="description"]');
    if(meta)meta.content='Adam Isabell — operations leader building practical AI tools, knowledge assistants, workflow automation and iOS products.';
    document.title='Adam Isabell | Operations + AI Implementation';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',updatePortfolio);
  else updatePortfolio();
})();
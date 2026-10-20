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
      const chips=watt.querySelector('.chips');
      if(chips) chips.innerHTML='<span class="chip">AI-assisted development</span><span class="chip">iOS / TestFlight</span><span class="chip">Companion UX</span><span class="chip">Product iteration</span>';
    }
    const stock=byTitle('Stockton'), inventory=byTitle('Inventory & Ordering'), build=byTitle('Build Mode'), court=byTitle('Court Planner');
    if(stock){const p=stock.querySelector('.case-copy > p');if(p)p.textContent='An AI company-knowledge assistant that retrieves approved answers, cites sources and surfaces questions the business cannot yet answer.';}
    if(inventory){const p=inventory.querySelector('.case-copy > p');if(p)p.textContent='An AI-assisted inventory and purchasing workflow built around real job materials, stock availability, ordering and field operations.';}
    const parent=inventory?.parentElement;
    if(parent&&stock&&inventory&&watt&&build&&court){
      const anchor=inventory;
      [stock,inventory,watt,court,build].forEach(el=>parent.insertBefore(el,anchor));
    }
    document.querySelectorAll('a,button,h1,h2,h3').forEach(el=>{
      if(el.textContent.trim()==='D10')el.textContent='Wattkins';
    });
    const meta=document.querySelector('meta[name="description"]');
    if(meta)meta.content='Adam Isabell — operations leader building practical AI tools, knowledge assistants, workflow automation and iOS products.';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',updatePortfolio);
  else updatePortfolio();
})();
const burger=document.querySelector('.hamburger'), mobile=document.querySelector('.mobile-menu');
if(burger){burger.addEventListener('click',()=>{const open=mobile.classList.toggle('open');burger.setAttribute('aria-expanded',open);});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');burger.setAttribute('aria-expanded','false')}));}
const lb=document.querySelector('.lightbox');const lbImg=lb.querySelector('img');
document.querySelectorAll('.gallery-item img,.menu-grid button img').forEach(img=>img.parentElement.addEventListener('click',()=>{lbImg.src=img.src;lbImg.alt=img.alt;lb.classList.add('open');lb.setAttribute('aria-hidden','false')}));
function close(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');lbImg.src=''}lb.querySelector('button').addEventListener('click',close);lb.addEventListener('click',e=>{if(e.target===lb)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});

// Interaktive Text-Speisekarte, Daten lokal eingebettet
(function(){
 const data=window.RYORI_MENU_DATA||[];
 const search=document.getElementById('menu-search'), categories=document.getElementById('menu-categories'), content=document.getElementById('text-menu-content'), count=document.getElementById('menu-result-count');
 if(!search||!categories||!content||!count)return;
 let active='Alle';
 const norm=s=>(s||'').toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 function renderCategories(){
  categories.replaceChildren();
  ['Alle',...data.map(g=>g.category)].forEach(category=>{
   const b=document.createElement('button');b.type='button';b.textContent=category;b.className=active===category?'active':'';
   b.addEventListener('click',()=>{active=category;renderCategories();renderMenu();});
   categories.appendChild(b);
  });
 }
 function renderMenu(){
  const q=norm(search.value.trim());content.replaceChildren();let total=0;
  data.filter(g=>active==='Alle'||g.category===active).forEach(group=>{
   const items=group.items.filter(item=>norm([item.id,item.name,item.desc,group.category].join(' ')).includes(q));
   if(!items.length)return;total+=items.length;
   const section=document.createElement('section');section.className='text-menu-group';
   const heading=document.createElement('div');heading.className='text-menu-group-title';
   const h=document.createElement('h3');h.textContent=group.category;
   const badge=document.createElement('span');badge.textContent=items.length+' Gerichte';
   heading.append(h,badge);section.appendChild(heading);
   items.forEach(item=>{
    const row=document.createElement('article');row.className='text-menu-item';
    const main=document.createElement('div');main.className='text-menu-item-main';
    const code=document.createElement('span');code.className='text-menu-code';code.textContent=item.id;
    main.append(code,document.createTextNode(item.name));
    const price=document.createElement('div');price.className='text-menu-price';price.textContent=item.price;
    const desc=document.createElement('div');desc.className='text-menu-desc';desc.textContent=item.desc||'';
    row.append(main,price,desc);section.appendChild(row);
   });
   content.appendChild(section);
  });
  count.textContent=total+' Gerichte angezeigt'+(q?' · Suche aktiv':'');
  if(!total){const empty=document.createElement('div');empty.className='text-menu-empty';empty.textContent='Keine passenden Gerichte gefunden. Bitte ändere deinen Suchbegriff.';content.appendChild(empty);}
 }
 search.addEventListener('input',renderMenu);renderCategories();renderMenu();
})();

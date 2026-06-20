document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu'),links=document.querySelector('.links');
  menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
  document.querySelectorAll('[data-count]').forEach(el=>{const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)return;let value=0,target=Number(el.dataset.count),step=Math.ceil(target/65);const tick=()=>{value=Math.min(target,value+step);el.textContent=value.toLocaleString('ta-IN')+'+';if(value<target)requestAnimationFrame(tick)};tick();observer.disconnect()},{threshold:.5});observer.observe(el)});
  const lightbox=document.querySelector('.lightbox');document.querySelectorAll('.art').forEach(item=>item.addEventListener('click',()=>{lightbox.querySelector('img').src=item.querySelector('img').src;lightbox.classList.add('open')}));
  lightbox.querySelector('button').addEventListener('click',()=>lightbox.classList.remove('open'));lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.classList.remove('open')});
  const top=document.querySelector('.to-top');addEventListener('scroll',()=>top.classList.toggle('show',scrollY>600));top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  const sections=[...document.querySelectorAll('main section[id]')],navLinks=[...document.querySelectorAll('.links a[href^="#"]')];addEventListener('scroll',()=>{let current='home';sections.forEach(section=>{if(scrollY>=section.offsetTop-180)current=section.id});navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+current))});
});

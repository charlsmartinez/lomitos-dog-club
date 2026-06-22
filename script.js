
const canvas=document.getElementById('canvas'),ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize();window.addEventListener('resize',resize);
class P{constructor(){this.reset()}reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.size=Math.random()*1.5+.5;this.sx=(Math.random()-.5)*.3;this.sy=(Math.random()-.5)*.3;this.op=Math.random()*.3+.1;this.life=0;this.max=Math.random()*300+200}update(){this.x+=this.sx;this.y+=this.sy;this.life++;if(this.life>this.max||this.x<0||this.x>W||this.y<0||this.y>H)this.reset()}draw(){ctx.save();ctx.globalAlpha=this.op*(1-this.life/this.max);ctx.fillStyle='#C9A84C';ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();ctx.restore()}}
for(let i=0;i<80;i++)particles.push(new P());
function anim(){ctx.clearRect(0,0,W,H);for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<90){ctx.save();ctx.globalAlpha=.1*(1-d/90);ctx.strokeStyle='#C9A84C';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.stroke();ctx.restore()}}particles[i].update();particles[i].draw()}requestAnimationFrame(anim)}
anim();
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>50));
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open')}
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
const TARIFAS={'50000':{p:50,l:'Centro Metepec',c:'#6BAF82'},'50001':{p:50,l:'Metepec Centro',c:'#6BAF82'},'50002':{p:80,l:'Metepec Norte',c:'#C9A84C'},'50003':{p:80,l:'Metepec Sur',c:'#C9A84C'},'50004':{p:80,l:'Metepec Oriente',c:'#C9A84C'},'50005':{p:120,l:'Zona lÃ­mite Metepec',c:'#E05555'},'50010':{p:50,l:'San JerÃ³nimo Chicahualco',c:'#6BAF82'},'50020':{p:80,l:'La AsunciÃ³n',c:'#C9A84C'},'50040':{p:80,l:'San BartolomÃ© Tlaltelulco',c:'#C9A84C'},'50090':{p:80,l:'San Francisco Coaxusco',c:'#C9A84C'},'50110':{p:80,l:'San Mateo Atenco',c:'#C9A84C'},'50140':{p:80,l:'San Lorenzo Tlalmimilolpan',c:'#C9A84C'},'50160':{p:80,l:'Mexicaltzingo',c:'#C9A84C'},'50170':{p:80,l:'Calimaya',c:'#C9A84C'},'50200':{p:120,l:'Zinacantepec',c:'#E05555'},'52140':{p:80,l:'Toluca Centro',c:'#C9A84C'},'52000':{p:80,l:'Toluca',c:'#C9A84C'}};
function calcularCP(){
  const cp=String(document.getElementById('cp-input').value).padStart(5,'0');
  const r=document.getElementById('calc-result');
  if(cp.replace(/\D/g,'').length!==5){r.style.display='none';return}
  let t=TARIFAS[cp];
  if(!t){if(cp.startsWith('500'))t={p:80,l:'Zona Metepec estimada',c:'#C9A84C'};else if(cp.startsWith('521')||cp.startsWith('520'))t={p:80,l:'Toluca zona estimada',c:'#C9A84C'};}
  r.className='calc-result show';
  if(t){r.style.cssText='display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding:14px;border-radius:10px;background:rgba(0,0,0,0.3);border:1px solid '+t.c+'44';r.innerHTML='<div><div style="font-size:11px;color:#6B6B5E;margin-bottom:4px">'+t.l+'</div><div style="font-size:12px;color:rgba(245,240,232,0.75)">Costo estimado de recolecciÃ³n</div></div><span style="font-family:\'Playfair Display\',serif;font-size:26px;font-weight:700;color:'+t.c+'">$'+t.p+' <span style="font-size:13px">MXN</span></span>';}
  else{r.style.cssText='display:flex;margin-top:14px;padding:14px;border-radius:10px;background:rgba(224,85,85,0.08);border:1px solid rgba(224,85,85,0.2)';r.innerHTML='<span style="color:#E05555;font-size:13px">Fuera de zona de servicio (mÃ¡x 5km de Metepec)</span>';}
}
function pedirDayPass(){
  const n=document.getElementById('dp-nombre').value,t=document.getElementById('dp-tel').value,e=document.getElementById('dp-email').value,l=document.getElementById('dp-lomito').value,f=document.getElementById('dp-fecha').value;
  if(!n||!t){alert('Por favor llena nombre y telÃ©fono');return}
  window.open('https://wa.me/527291432516?text='+encodeURIComponent('Hola, quiero reservar un *Day Pass* ð¾\n\nð¤ '+n+'\nð± '+t+'\nð§ '+e+'\nð '+l+'\nð '+f+'\n\nÂ¿EstÃ¡ disponible?'),'_blank');
}
async function registrar(){
  const btn=document.querySelector('#registro .btn-gold');
  const n=document.getElementById('r-nombre').value.trim();
  const e=document.getElementById('r-email').value.trim();
  const t=document.getElementById('r-tel').value.trim();
  const p=document.getElementById('r-pass').value;
  const p2=document.getElementById('r-pass2').value;
  const m=document.getElementById('r-memb').value;
  const l=document.getElementById('r-lomito').value.trim();
  if(!n||!e||!t||!p){alert('Por favor llena todos los campos');return}
  if(p.length<6){alert('La contraseÃ±a debe tener al menos 6 caracteres');return}
  if(p!==p2){alert('Las contraseÃ±as no coinciden');return}
  if(!e.includes('@')){alert('Ingresa un email vÃ¡lido');return}
  btn.disabled=true;btn.textContent='Creando tu cuenta...';
  try{
    const res=await fetch('https://dpljrhomnfcubxoahmiq.supabase.co/auth/v1/signup',{method:'POST',headers:{'Content-Type':'application/json','apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwbGpyaG9tbmZjdWJ4b2FobWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDc1NjQsImV4cCI6MjA5NTgyMzU2NH0.XPyq60LUgjQTExNWQYMX2lKR0O5Yc8yl5J4tCkcCnPw','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwbGpyaG9tbmZjdWJ4b2FobWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDc1NjQsImV4cCI6MjA5NTgyMzU2NH0.XPyq60LUgjQTExNWQYMX2lKR0O5Yc8yl5J4tCkcCnPw'},body:JSON.stringify({email:e,password:p,data:{nombre:n,telefono:t,membresia:m,lomito:l}})});
    const data=await res.json();
    if(data.error||data.msg){const msg=data.error||data.msg||'';if(msg.toLowerCase().includes('already registered')){btn.disabled=false;btn.textContent='Crear mi cuenta y unirme al club';alert('Este email ya tiene una cuenta.\nDescarga la app e inicia sesiÃ³n con tu email y contraseÃ±a.');return;}throw new Error(msg);}
    const userId=data.user?.id||data.id;
    if(userId){await fetch('https://dpljrhomnfcubxoahmiq.supabase.co/rest/v1/profiles',{method:'POST',headers:{'Content-Type':'application/json','apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwbGpyaG9tbmZjdWJ4b2FobWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDc1NjQsImV4cCI6MjA5NTgyMzU2NH0.XPyq60LUgjQTExNWQYMX2lKR0O5Yc8yl5J4tCkcCnPw','Authorization':'Bearer '+(data.access_token||''),'Prefer':'return=minimal'},body:JSON.stringify({id:userId,nombre:n,telefono:t,email:e,membresia:m})});}
    window.open('https://wa.me/527291432516?text='+encodeURIComponent('ð¾ *NUEVO REGISTRO WEB*\n\nð¤ '+n+'\nð§ '+e+'\nð± '+t+'\nð¯ '+m+'\nð '+(l||'No indicado')+'\n\nâ Ya puede iniciar sesiÃ³n en la app.'),'_blank');
    document.getElementById('registro-form-inner').innerHTML=`<div style="text-align:center;padding:32px 0"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6BAF82" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 20px;display:block"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><div style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#F5F0E8;margin-bottom:12px">Â¡Bienvenido al club!</div><div style="font-size:14px;color:rgba(245,240,232,0.75);line-height:1.75;margin-bottom:24px">Tu cuenta fue creada exitosamente.<br>Inicia sesiÃ³n en la app con:<br><strong style="color:#C9A84C">${e}</strong></div><div style="background:#1E1E1A;border-radius:12px;padding:16px;margin-bottom:20px;font-size:13px;color:#6B6B5E;line-height:1.65"><strong style="color:#F5F0E8;display:block;margin-bottom:6px">PrÃ³ximos pasos:</strong>1. Descarga la app de Lomitos Dog Club<br>2. Inicia sesiÃ³n con tu email y contraseÃ±a<br>3. Agenda tu evaluaciÃ³n de temperamento</div><button class="btn-gold" onclick="window.open('https://wa.me/527291432516?text=Hola,%20acabo%20de%20registrarme.%20Mi%20email%20es%20${encodeURIComponent(e)}','_blank')">Contactar asesor</button></div>`;
  }catch(err){btn.disabled=false;btn.textContent='Crear mi cuenta y unirme al club';alert('Error: '+err.message);}
}

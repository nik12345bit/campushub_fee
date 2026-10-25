(() => {
  'use strict';
  const init = () => {
    if (document.getElementById('cc-support-modal')) return;
    const css = `
#cc-support-modal{position:fixed;inset:0;z-index:999999;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(8,14,29,.76);backdrop-filter:blur(7px);font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;color:#172033}
#cc-support-modal.cc-open{display:flex}
#cc-support-modal *{box-sizing:border-box}
#cc-support-modal .cc-dialog{width:min(920px,100%);max-height:92vh;overflow:auto;background:#f7f9fc;color:#172033;border-radius:20px;border:1px solid rgba(255,255,255,.7);box-shadow:0 28px 90px rgba(0,0,0,.4)}
#cc-support-modal .cc-top{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:20px 24px;background:#fff;border-bottom:1px solid #e5eaf1;position:sticky;top:0;z-index:2}
#cc-support-modal .cc-brand{font-size:13px;font-weight:800;letter-spacing:.07em;color:#34617d;text-transform:uppercase}
#cc-support-modal .cc-close{border:0;border-radius:10px;padding:9px 13px;cursor:pointer;background:#edf1f6;color:#172033;font-weight:700;font-size:14px}
#cc-support-modal .cc-content{padding:26px}
#cc-support-modal .cc-eyebrow{margin:0 0 8px;text-align:center;color:#3f718b;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
#cc-support-modal .cc-title{margin:0;text-align:center;font-size:clamp(25px,4vw,36px);line-height:1.15;letter-spacing:-.035em}
#cc-support-modal .cc-subtitle{text-align:center;margin:10px 0 20px;color:#657287}
#cc-support-modal .cc-search{display:flex;gap:10px;align-items:center;max-width:620px;margin:0 auto 24px;background:#fff;border:1px solid #dce3ed;border-radius:11px;padding:0 14px}
#cc-support-modal .cc-search input{width:100%;border:0!important;outline:0!important;background:transparent!important;padding:14px 0!important;color:#172033!important;font-size:14px}
#cc-support-modal .cc-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
#cc-support-modal .cc-card{background:#fff;border:1px solid #e5eaf1;border-top:4px solid #4d91a8;border-radius:13px;padding:17px 15px;min-height:160px;box-shadow:0 4px 14px rgba(20,40,70,.04)}
#cc-support-modal .cc-card:nth-child(2){border-top-color:#d48c5b}#cc-support-modal .cc-card:nth-child(3){border-top-color:#4ba68b}#cc-support-modal .cc-card:nth-child(4){border-top-color:#8b7ac7}
#cc-support-modal .cc-card .cc-emoji{font-size:27px;margin-bottom:8px}#cc-support-modal .cc-card h3{margin:0 0 10px;font-size:15px}
#cc-support-modal .cc-card button,#cc-support-modal .cc-link{display:block;padding:4px 0;border:0;background:none;text-align:left;color:#416d83;font-size:13px;cursor:pointer;text-decoration:none}
#cc-support-modal .cc-card button:hover,#cc-support-modal .cc-link:hover{text-decoration:underline}
#cc-support-modal .cc-bottom{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:22px}
#cc-support-modal .cc-btn{border:0;border-radius:10px;padding:12px 16px;background:#246e85;color:white;font-weight:750;cursor:pointer}
#cc-support-modal .cc-btn.secondary{background:#e8eef4;color:#23354a}
#cc-support-modal .cc-panel{max-width:690px;margin:0 auto;background:#fff;border:1px solid #e1e7ef;border-radius:15px;padding:22px}
#cc-support-modal .cc-panel h3{margin:0 0 8px;font-size:22px}#cc-support-modal .cc-panel p{color:#5b687b;line-height:1.55}
#cc-support-modal form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
#cc-support-modal label{display:grid;gap:6px;font-size:13px;font-weight:700;color:#344256}
#cc-support-modal label.cc-full{grid-column:1/-1}
#cc-support-modal input,#cc-support-modal select,#cc-support-modal textarea{width:100%;min-width:0;padding:11px 12px;border:1px solid #cbd5e1;border-radius:9px;font:inherit;font-weight:400;background:#fff;color:#172033}
#cc-support-modal textarea{min-height:100px;resize:vertical}
#cc-support-modal .cc-note{font-size:12px;color:#6b7788;line-height:1.5}
#cc-support-modal .cc-success{padding:14px;border-radius:10px;background:#e4f7ec;color:#14532d;white-space:pre-wrap;line-height:1.55}
#cc-support-modal .cc-results{max-width:620px;margin:-10px auto 18px;background:#fff;border:1px solid #e1e7ef;border-radius:10px;padding:10px 14px}
#cc-support-modal .cc-results button{display:block;width:100%;text-align:left;border:0;background:transparent;padding:9px 2px;color:#315e75;cursor:pointer}
#cc-support-modal .cc-lock{background:#eff4f8;border:1px solid #dbe5ee;border-radius:11px;padding:12px;font-size:13px;color:#526377;line-height:1.5}
@media(max-width:680px){#cc-support-modal .cc-content{padding:18px}#cc-support-modal .cc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#cc-support-modal .cc-top{padding:15px 17px}#cc-support-modal form{grid-template-columns:1fr}#cc-support-modal label.cc-full{grid-column:auto}}
@media(max-width:390px){#cc-support-modal .cc-grid{grid-template-columns:1fr}}
`;
    const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
    const modal = document.createElement('div');
    modal.id = 'cc-support-modal';
    modal.innerHTML = `<section class="cc-dialog" role="dialog" aria-modal="true" aria-labelledby="cc-support-title"><header class="cc-top"><div class="cc-brand">◉ Campus Connect | Support</div><button class="cc-close" type="button" aria-label="Close support">× Close</button></header><div class="cc-content" id="cc-support-body"></div></section>`;
    document.body.appendChild(modal);
    const body = modal.querySelector('#cc-support-body');
    const close = () => { modal.classList.remove('cc-open'); document.body.style.overflow=''; };
    modal.querySelector('.cc-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if(e.target === modal) close(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('cc-open')) close(); });
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const saved = () => { try { return JSON.parse(localStorage.getItem('ccSupportTickets') || '[]'); } catch { return []; } };
    const home = () => {
      modal.querySelector('.cc-brand').textContent='◉ Campus Connect | Support';
      body.innerHTML = `<p class="cc-eyebrow">Help Center</p><h2 class="cc-title" id="cc-support-title">Welcome to the Help Center</h2><p class="cc-subtitle">How can we help you today?</p>
      <div class="cc-search"><span aria-hidden="true">⌕</span><input id="cc-help-search" type="search" placeholder="Search articles, FAQs, or ask a question..." aria-label="Search help articles"></div><div id="cc-help-results" class="cc-results" hidden></div>
      <div class="cc-grid">
      <article class="cc-card"><div class="cc-emoji">🚀</div><h3>Getting Started</h3><button data-article="account">• Create Account</button><button data-article="clubs">• Join Clubs</button><button data-article="events">• Post Event</button></article>
      <article class="cc-card"><div class="cc-emoji">🗓️</div><h3>Event Planning</h3><button data-article="submit">• Submit Event</button><button data-article="ticket">• Ticketing</button><button data-article="promotion">• Promotion</button></article>
      <article class="cc-card"><div class="cc-emoji">👥</div><h3>Club Management</h3><button data-article="clubs">• Club Registration</button><button data-article="membership">• Membership</button><button data-article="updates">• Updates</button></article>
      <article class="cc-card"><div class="cc-emoji">👤</div><h3>Account &amp; Support</h3><button data-article="profile">• Profile Settings</button><button data-action="contact">• Contact Support</button><button data-action="report">• Report an Issue</button></article>
      </div><div class="cc-bottom"><button class="cc-btn" data-action="admin">Direct Admin Contact</button><button class="cc-btn secondary" data-action="contact">Contact Support</button><button class="cc-btn secondary" data-action="report">Report an Issue</button></div>`;
      const articles = {
        account:['Create an account','Open Sign Up, enter your details and use an email address you can access. Keep your password and any verification code private.'],
        clubs:['Join a club','Open Clubs, select a club and complete the membership form. Check that your student details are correct before submitting.'],
        events:['Find and register for events','Open Events, choose an event and read its date, venue and eligibility information before registering.'],
        submit:['Submit an event','Use the event submission option if it is available to your account. Include an accurate title, date, venue and event description.'],
        ticket:['Event registration and tickets','Check the event details and your registration confirmation. If the event is full or registration fails, report the issue with the event name.'],
        promotion:['Promote an event','Share accurate event details and follow your campus guidelines for announcements and promotion.'],
        membership:['Membership status','Visit Clubs or your dashboard to review available membership information. Contact support if your status looks incorrect.'],
        updates:['Club updates','Check the club page and campus announcements for the latest updates.'],
        profile:['Profile settings','Use your account or dashboard options to review your details. Do not share passwords or OTPs with anyone.']
      };
      const results = body.querySelector('#cc-help-results');
      const search = body.querySelector('#cc-help-search');
      const renderResults = q => {
        const term=q.trim().toLowerCase();
        if(!term){results.hidden=true;results.innerHTML='';return;}
        const found=Object.entries(articles).filter(([k,v])=>(k+' '+v.join(' ')).toLowerCase().includes(term));
        results.hidden=false;
        results.innerHTML=found.length?found.map(([k,v])=>`<button data-article="${k}"><strong>${esc(v[0])}</strong><br><small>${esc(v[1])}</small></button>`).join(''):'<p class="cc-note">No matching article. Contact Support or Report an Issue below.</p>';
      };
      search.addEventListener('input',()=>renderResults(search.value));
      body.querySelectorAll('[data-article]').forEach(b=>b.addEventListener('click',()=>article(b.dataset.article,articles)));
      results.addEventListener('click',e=>{const b=e.target.closest('[data-article]');if(b)article(b.dataset.article,articles);});
      body.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.action)));
    };
    const article = (key, articles) => {
      const a=articles[key]; if(!a)return;
      body.innerHTML=`<div class="cc-panel"><p class="cc-eyebrow" style="text-align:left">Help article</p><h3 id="cc-support-title">${esc(a[0])}</h3><p>${esc(a[1])}</p><div class="cc-bottom"><button class="cc-btn secondary" data-back>← Back to Help Center</button><button class="cc-btn" data-action="contact">Still need help?</button></div></div>`;
      body.querySelector('[data-back]').addEventListener('click',home);
      body.querySelector('[data-action]').addEventListener('click',()=>show('contact'));
    };
    const show = type => {
      if(type==='help'){home();} 
      else if(type==='admin'){adminPortal();}
      else if(type==='contact'||type==='report'){supportForm(type);}
      modal.classList.add('cc-open'); document.body.style.overflow='hidden';
      modal.querySelector('.cc-close').focus();
    };
    const supportForm = type => {
      const report=type==='report';
      modal.querySelector('.cc-brand').textContent=report?'Report an Issue':'Contact Support';
      body.innerHTML=`<div class="cc-panel"><p class="cc-eyebrow" style="text-align:left">Campus Connect Support</p><h3 id="cc-support-title">${report?'Report an Issue':'Contact Support'}</h3><p>${report?'Tell us what went wrong. Include the page or event name if possible.':'Send a message to the support team. Please do not include passwords or OTPs.'}</p><form id="cc-support-form"><label>Name<input name="name" maxlength="100" required autocomplete="name"></label><label>College email<input name="email" type="email" maxlength="180" required autocomplete="email"></label>${report?'<label>Severity<select name="severity"><option>Low</option><option selected>Medium</option><option>High</option><option>Critical</option></select></label><label>Attachment (optional)<input name="attachment" type="file" accept="image/*,.pdf,.txt"></label>':''}<label class="cc-full">Description<textarea name="message" maxlength="5000" required placeholder="${report?'Describe the issue and steps to reproduce it':'How can we help?'}"></textarea></label><p class="cc-note cc-full">Device details captured: browser and operating system. This version stores requests in this browser only; it does not email an administrator.</p><div class="cc-bottom cc-full" style="justify-content:flex-start"><button class="cc-btn" type="submit">${report?'Submit issue':'Send message'}</button><button class="cc-btn secondary" type="button" data-back>Back</button></div></form></div>`;
      body.querySelector('[data-back]').addEventListener('click',home);
      body.querySelector('form').addEventListener('submit',e=>{
        e.preventDefault(); const form=e.currentTarget,fd=new FormData(form),file=form.elements.attachment?.files?.[0];
        const ticket='CC-'+Date.now().toString(36).toUpperCase();
        const item={ticket,type,createdAt:new Date().toISOString(),status:'Open',name:fd.get('name'),email:fd.get('email'),severity:fd.get('severity')||'Normal',message:fd.get('message'),browser:navigator.userAgent.slice(0,300),platform:navigator.platform||'Unknown',attachmentName:file?.name||''};
        try{const all=saved();all.push(item);localStorage.setItem('ccSupportTickets',JSON.stringify(all));body.innerHTML=`<div class="cc-panel"><div class="cc-success"><strong>${report?'Issue report submitted':'Message saved'} successfully.</strong>\nReference: ${esc(ticket)}\nStatus: Open\n\nSaved in this browser on this device. It has not been sent to an administrator.</div><div class="cc-bottom"><button class="cc-btn" id="cc-done">Done</button><button class="cc-btn secondary" id="cc-back">Back to Help Center</button></div></div>`;body.querySelector('#cc-done').addEventListener('click',close);body.querySelector('#cc-back').addEventListener('click',home);}
        catch(err){body.insertAdjacentHTML('beforeend','<p role="alert">Could not save the request. Check browser storage settings and try again.</p>');}
      });
    };
    const adminPortal = () => {
      modal.querySelector('.cc-brand').textContent='Campus Connect | Direct Admin Contact';
      body.innerHTML=`<div class="cc-panel"><p class="cc-eyebrow" style="text-align:left">Student verification</p><h3 id="cc-support-title">Direct Admin Contact Portal</h3><p>Step 1: Provide student information. All six fields are required before the contact options can be revealed.</p><form id="cc-admin-form"><label class="cc-full">Full name<input name="name" required maxlength="100" placeholder="e.g., Alex Johnson" autocomplete="name"></label><label class="cc-full">University email<input name="email" type="email" required placeholder="name@university.edu" autocomplete="email"></label><label class="cc-full">Phone number<input name="phone" inputmode="numeric" pattern="[0-9]{10}" minlength="10" maxlength="10" required placeholder="10-digit phone number"></label><label>Semester<input name="semester" type="number" min="1" max="12" required placeholder="e.g., 5"></label><label>Branch<input name="branch" required maxlength="100" placeholder="e.g., Computer Science"></label><label class="cc-full">Year<input name="year" type="number" min="1" max="6" required placeholder="e.g., 3"></label><div class="cc-lock cc-full">🔒 Step 2: Admin contact channels remain locked until required fields pass validation. This form checks the information format only; it does not verify student identity.</div><div class="cc-bottom cc-full" style="justify-content:flex-start"><button class="cc-btn" type="submit">Validate &amp; Unlock Contact Options</button><button class="cc-btn secondary" type="button" data-back>Back</button></div></form><div id="cc-admin-result"></div></div>`;
      body.querySelector('[data-back]').addEventListener('click',home);
      body.querySelector('#cc-admin-form').addEventListener('submit',e=>{
        e.preventDefault();const f=e.currentTarget;
        if(!f.reportValidity())return;
        const d=new FormData(f), phone=String(d.get('phone')||''), email=String(d.get('email')||'').trim();
        if(!/^\d{10}$/.test(phone)){f.elements.phone.setCustomValidity('Enter exactly 10 digits.');f.elements.phone.reportValidity();f.elements.phone.setCustomValidity('');return;}
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){f.elements.email.setCustomValidity('Enter a valid email address.');f.elements.email.reportValidity();f.elements.email.setCustomValidity('');return;}
        const result=body.querySelector('#cc-admin-result');
        result.innerHTML=`<div class="cc-success" style="margin-top:16px"><strong>Details validated.</strong>\nThe fields passed format checks. Your student identity has not been independently verified.</div><h3 style="margin-top:18px">Step 2: Admin contact options</h3><p class="cc-note">Add your real official admin contact details in the project before publishing. These placeholders do not contact anyone.</p><div class="cc-lock">✉ Admin email: not configured<br>in LinkedIn: not configured<br>◎ Instagram: not configured</div>`;
        try{const all=saved();all.push({ticket:'CC-VERIFY-'+Date.now().toString(36).toUpperCase(),type:'admin-contact-validation',createdAt:new Date().toISOString(),name:d.get('name'),email,phone,semester:d.get('semester'),branch:d.get('branch'),year:d.get('year'),status:'Validated format only'});localStorage.setItem('ccSupportTickets',JSON.stringify(all));}catch{}
      });
    };
    document.addEventListener('click', e => {
      const a=e.target.closest('a'); if(!a)return;
      const label=(a.textContent||'').trim().toLowerCase();
      if(label==='help center'||label==='help centre'||label==='contact'||label==='report an issue') {
        e.preventDefault(); e.stopPropagation();
        show(label==='contact'?'contact':label==='report an issue'?'report':'help');
      }
    }, true);
    // Allow other controls to open support via data attributes.
    document.addEventListener('click',e=>{const el=e.target.closest('[data-support-open]');if(el){e.preventDefault();show(el.dataset.supportOpen);}});
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

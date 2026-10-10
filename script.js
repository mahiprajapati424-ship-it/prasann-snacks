const WHATSAPP_NUMBER = '918448047203';
const $ = (id) => document.getElementById(id);
let language = 'hi';
const registration = $('registration'), welcome = $('welcome'), site = $('site');
function showSite(){ registration.classList.add('hidden'); welcome.classList.add('hidden'); site.classList.remove('hidden'); }
function applyLanguage(){
  document.documentElement.lang = language;
  document.querySelectorAll('[data-hi][data-en]').forEach(el => { el.textContent = el.dataset[language]; });
  $('languageToggle').textContent = language === 'hi' ? 'English' : 'हिंदी';
  $('mobile').placeholder = language === 'hi' ? '10 अंकों का मोबाइल नंबर' : '10-digit mobile number';
}
function openWhatsApp(product, size, price){
  const hi = language === 'hi';
  let msg = hi ? `नमस्ते PRASANN! मुझे ${product}` : `Hello PRASANN! I am interested in ${product}`;
  if(size) msg += hi ? ` (${size}g, ₹${price})` : ` (${size}g, ₹${price})`;
  msg += hi ? ' ऑर्डर करना है। कृपया उपलब्धता और डिलीवरी की जानकारी दें।' : '. Please share availability and delivery details.';
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}
$('registrationForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const mobile = $('mobile').value.trim();
  if(!/^[6-9]\d{9}$/.test(mobile)){ $('mobile').setCustomValidity(language==='hi'?'कृपया सही 10 अंकों का भारतीय मोबाइल नंबर डालें.':'Enter a valid 10-digit Indian mobile number.'); $('mobile').reportValidity(); $('mobile').setCustomValidity(''); return; }
  // Demo only: browser-local storage, not a central or secure customer database.
  localStorage.setItem('prasannRegistration', JSON.stringify({mobile, interested:$('interest').checked, registeredAt:new Date().toISOString()}));
  registration.classList.add('hidden'); welcome.classList.remove('hidden');
});
$('enterSite').addEventListener('click', showSite);
$('languageToggle').addEventListener('click', () => { language = language === 'hi' ? 'en' : 'hi'; applyLanguage(); });
$('kajuSize').addEventListener('change', () => { const s = $('kajuSize').value; $('kajuPrice').textContent = ({150:'₹60',300:'₹110',500:'₹180'})[s]; });
document.querySelectorAll('.order-button').forEach(btn => btn.addEventListener('click', () => {
  if(btn.dataset.product === 'Kaju Shape Snacks'){ const s=$('kajuSize').value; openWhatsApp(btn.dataset.product,s,({150:60,300:110,500:180})[s]); }
  else openWhatsApp(btn.dataset.product,null,null);
}));
$('year').textContent = new Date().getFullYear();
applyLanguage();
try { const saved = localStorage.getItem('prasannRegistration'); if(saved){ showSite(); } } catch(e) { /* If storage is blocked, registration will appear each visit. */ }

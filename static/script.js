let movies = [];
let activeGenre = 'All';
let query = '';
const STORAGE_KEY = 'cinetelugu-watchlist-v1';
const $ = (selector) => document.querySelector(selector);
const getSaved = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } };
const saveList = (ids) => localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let toastTimer;
function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('visible'),2600); }
function movieCard(movie, index=0) {
  const saved = getSaved().includes(movie.id);
  return `<article class="movie-card" style="--delay:${Math.min(index*45,400)}ms">
    <button class="poster palette-${escapeHtml(movie.palette)}" data-details="${movie.id}" aria-label="Details for ${escapeHtml(movie.title)}">
      <span class="poster-glow"></span><span class="poster-emoji">${movie.emoji}</span><span class="poster-letters">${escapeHtml(movie.initial)}</span><span class="poster-label">${escapeHtml(movie.tag)}</span><span class="poster-bottom">A TELUGU CINEMA STORY</span><span class="poster-play">▶</span>
    </button><div class="card-meta"><span class="rating">★ ${escapeHtml(movie.rating)}</span><span>${movie.year}</span><span class="card-genre">${escapeHtml(movie.genre)}</span></div>
    <div class="card-title-row"><button class="card-title" data-details="${movie.id}">${escapeHtml(movie.title)}</button><button class="heart ${saved?'saved':''}" data-save="${movie.id}" aria-label="${saved?'Remove from':'Add to'} watchlist: ${escapeHtml(movie.title)}">${saved?'♥':'♡'}</button></div>
  </article>`;
}
function render() {
  const filtered=movies.filter(m=>(activeGenre==='All'||m.genre===activeGenre)&&`${m.title} ${m.genre} ${m.description}`.toLowerCase().includes(query));
  $('#movieGrid').innerHTML=filtered.map(movieCard).join('');
  $('#emptyState').hidden=filtered.length>0;
  $('#movieCount').textContent=`${filtered.length} movie${filtered.length!==1?'s':''} to explore`;
  const saved=getSaved(); const list=movies.filter(m=>saved.includes(m.id));
  $('#watchlistGrid').innerHTML=list.map(movieCard).join('');
  $('#watchlistEmpty').hidden=list.length>0;
  $('#heroList').textContent=saved.includes(1)?'♥  In My List':'＋  My List';
}
function toggleSaved(id) { const saved=getSaved(); const exists=saved.includes(id); saveList(exists?saved.filter(x=>x!==id):[...saved,id]); render(); toast(exists?'Removed from your watchlist':'Added to your watchlist 💜'); }
function showDetails(id) {
  const movie=movies.find(m=>m.id===id); if(!movie)return;
  const saved=getSaved().includes(id);
  $('#dialogContent').innerHTML=`<div class="dialog-poster palette-${escapeHtml(movie.palette)}"><span class="dialog-emoji">${movie.emoji}</span><span class="dialog-letters">${escapeHtml(movie.initial)}</span></div><div class="dialog-body"><span class="overline">${escapeHtml(movie.tag)}</span><h2 id="dialogTitle">${escapeHtml(movie.title)}</h2><div class="dialog-meta"><span>★ ${escapeHtml(movie.rating)}</span><span>${movie.year}</span><span>${escapeHtml(movie.duration)}</span><span>${escapeHtml(movie.genre)}</span></div><p>${escapeHtml(movie.description)}</p><div class="dialog-actions"><button class="btn btn-primary" id="demoPlay">▶ &nbsp;Play preview</button><button class="btn btn-glass" data-save="${id}">${saved?'♥ Remove from list':'♡ Add to list'}</button></div><small>Discovery demo only — no full movies or licensed trailers are hosted.</small></div>`;
  $('#movieDialog').showModal();
}
document.addEventListener('click', e=>{
  const details=e.target.closest('[data-details]'); if(details)showDetails(Number(details.dataset.details));
  const save=e.target.closest('[data-save]'); if(save){toggleSaved(Number(save.dataset.save));if($('#movieDialog').open)showDetails(Number(save.dataset.save));}
  if(e.target.closest('#demoPlay'))toast('Preview playback is a demo feature 🎬');
});
$('#filters').addEventListener('click',e=>{const btn=e.target.closest('[data-genre]');if(!btn)return;activeGenre=btn.dataset.genre;document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('selected',c===btn));render();});
$('#searchInput').addEventListener('input',e=>{query=e.target.value.toLowerCase().trim();render();});
$('#resetFilters').addEventListener('click',()=>{query='';activeGenre='All';$('#searchInput').value='';document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('selected',c.dataset.genre==='All'));render();});
$('#searchFocus').addEventListener('click',()=>{$('#searchInput').focus();$('#explore').scrollIntoView({behavior:'smooth'});});
$('#heroDetails').addEventListener('click',()=>showDetails(1));
$('#heroList').addEventListener('click',()=>toggleSaved(1));
$('#closeDialog').addEventListener('click',()=>$('#movieDialog').close());
$('#movieDialog').addEventListener('click',e=>{if(e.target===$('#movieDialog'))$('#movieDialog').close();});
$('#menuButton').addEventListener('click',()=>$('#mobileNav').classList.toggle('open'));
$('#mobileNav').addEventListener('click',e=>{if(e.target.closest('a'))$('#mobileNav').classList.remove('open');});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!$('#movieDialog').open){e.preventDefault();$('#searchInput').focus();}});
fetch('/api/movies').then(r=>{if(!r.ok)throw new Error('API error');return r.json();}).then(data=>{movies=data;render();}).catch(()=>{$('#movieGrid').innerHTML='<p class="error">Unable to load movies. Check the Flask server.</p>';$('#movieCount').textContent='Unable to load';});

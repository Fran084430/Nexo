const QUIZ_EXTRA={
 ciencia:[['¿Qué principio transmite una presión por igual en un fluido confinado?','Principio de Pascal','Ley de Ohm','Principio de Arquímedes','Ley de Hooke']],
 geografia:[['¿Qué estrecho separa Europa de África?','Estrecho de Gibraltar','Bósforo','Magallanes','Bering']],
 futbol:[['¿Qué selección ganó la Eurocopa de 2004?','Grecia','Portugal','Italia','Francia']],
 deporte:[['¿En qué prueba se usan pértigas?','Salto con pértiga','Triple salto','Jabalina','Decatlón']],
 musica:[['¿Qué intervalo equivale a doce semitonos?','Octava','Quinta','Tercera','Unísono']],
 videojuegos:[['¿Qué estudio desarrolló Hollow Knight?','Team Cherry','Supergiant Games','Mojang','FromSoftware']],
 'peliculas-series':[['¿Quién dirigió Parasite?','Bong Joon-ho','Park Chan-wook','Denis Villeneuve','Alfonso Cuarón']],
 'cultura-general':[['¿Qué filósofo escribió Crítica de la razón pura?','Immanuel Kant','René Descartes','David Hume','Baruch Spinoza']]
};
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function extra(slug){return (QUIZ_EXTRA[slug]||[]).map(([question,answer,...wrong])=>({question,answer,options:shuffle([answer,...wrong]),explanation:'La respuesta correcta es '+answer+'.'}))}
function startQuiz(root,title,category,questions){
 if(!root||!Array.isArray(questions)||!questions.length){if(root)root.innerHTML='<div class="card center"><h2>⚠️ No hay preguntas disponibles.</h2></div>';return}
 const pool=shuffle([...questions,...extra(category)]).slice(0,10);let i=0,score=0,locked=false;
 const render=()=>{locked=false;const q=pool[i];root.innerHTML='<div style="width:100%"><div class="quizmeta"><span>'+escapeHtml(title)+'</span><span>'+(i+1)+'/'+pool.length+'</span></div><div class="card"><span class="badge">Pregunta '+(i+1)+'</span><h2 style="margin-top:12px">'+escapeHtml(q.question)+'</h2><div class="choicegrid">'+shuffle(q.options).map(x=>'<button class="choice" data-v="'+encodeURIComponent(x)+'">'+escapeHtml(x)+'</button>').join('')+'</div><div id="feedback"></div></div></div>';root.querySelectorAll('.choice').forEach(b=>b.onclick=()=>choose(b,q))};
 const choose=(btn,q)=>{if(locked)return;locked=true;const value=decodeURIComponent(btn.dataset.v),ok=value===q.answer,s=NexoStore.loadState();NexoStats.registerAnswer(s,ok,category);if(ok){score++;NexoXP.giveXP(s,'correct')}root.querySelectorAll('.choice').forEach(b=>{b.disabled=true;const v=decodeURIComponent(b.dataset.v);if(v===q.answer)b.classList.add('correct');if(v===value&&!ok)b.classList.add('wrong')});NexoStore.saveState(s);root.querySelector('#feedback').innerHTML='<div class="result"><strong>'+(ok?'✅ ¡Correcto!':'❌ Incorrecto')+'</strong><p>'+escapeHtml(q.explanation||('La respuesta correcta era: '+q.answer))+'</p><button id="next" class="btn primary">'+(i===pool.length-1?'Ver resultado':'Siguiente')+'</button></div>';root.querySelector('#next').onclick=()=>i<pool.length-1?(i++,render()):finish()};
 const finish=()=>{const s=NexoStore.loadState();s.stats.quizzesCompleted++;NexoStats.recordDailyProgress(s,'quiz',score);const gain=NexoXP.giveXP(s,'quiz'),got=NexoAch.checkAchievements(s);NexoStore.saveState(s);root.innerHTML='<div class="card center"><div class="icon">🏆</div><h2>Quiz completado</h2><p>'+score+'/'+pool.length+' respuestas correctas.</p><div style="font-size:2rem;font-weight:900">+'+(gain+score*10)+' XP</div><div class="actions" style="justify-content:center"><button id="again" class="btn primary">Repetir</button><a href="../pages/quizzes.html" class="btn secondary">Más quizzes</a></div></div>';toast('🎉 '+score+'/'+pool.length+' · +'+(gain+score*10)+' XP');got.forEach(x=>setTimeout(()=>toast('🏅 '+x),150));root.querySelector('#again').onclick=()=>startQuiz(root,title,category,questions)};
 render()
}
window.NexoQuiz={startQuiz,shuffle};
document.addEventListener('DOMContentLoaded',()=>{const root=document.querySelector('[data-quiz]');if(root){const slug=root.dataset.quiz;startQuiz(root,document.querySelector('h1')?.textContent?.replace(/^\S+\s*/,'')||slug,slug,window.NexoData?.quizzes?.[slug])}});

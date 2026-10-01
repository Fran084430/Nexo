const KEY='nexo_v1';
const DEFAULT={profile:{name:'Jugador',xp:0,level:1},stats:{gamesPlayed:0,quizzesCompleted:0,correctAnswers:0,questionsAnswered:0,records:0,countriesCorrect:0,footballersCorrect:0,streak:0},records:{},daily:{},achievements:[]};
function clone(v){return JSON.parse(JSON.stringify(v))}
function loadState(){try{const s=JSON.parse(localStorage.getItem(KEY)||'null')||clone(DEFAULT);s.profile={...DEFAULT.profile,...s.profile};s.stats={...DEFAULT.stats,...s.stats};s.records=s.records||{};s.daily=s.daily||{};s.achievements=s.achievements||[];return s}catch{return clone(DEFAULT)}}
function saveState(s){localStorage.setItem(KEY,JSON.stringify(s))}
function today(){return new Date().toISOString().slice(0,10)}
function resetState(){localStorage.removeItem(KEY);location.reload()}
window.NexoStore={loadState,saveState,today,resetState};

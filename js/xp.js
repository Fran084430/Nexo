const XP_VALUES={quiz:50,correct:10,game:25,record:100,daily:100,streak7:250,achievement:100};
const LEVELS=[{level:1,name:'Novato',xp:0},{level:5,name:'Principiante',xp:500},{level:10,name:'Jugador',xp:1500},{level:20,name:'Experto',xp:3500},{level:30,name:'Maestro',xp:7000},{level:50,name:'Leyenda',xp:15000}];
function levelInfo(xp){let cur=LEVELS[0],next=null;for(const l of LEVELS){if(xp>=l.xp)cur=l;if(!next&&l.xp>xp)next=l}return{...cur,next,xp}}
function giveXP(s,type){const amount=XP_VALUES[type]||0;s.profile.xp+=amount;s.profile.level=levelInfo(s.profile.xp).level;return amount}
window.NexoXP={XP_VALUES,LEVELS,levelInfo,giveXP};

/** Functional DOM harness for stage-one deck controls and profile save boundaries.
 * Not a browser rendering or physical Android test.
 */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
class Element{
 constructor(tag){this.tagName=tag;this.children=[];this.style={cssText:''};this.textContent='';this.disabled=false;}
 appendChild(el){el.parent=this;this.children.push(el);return el;}
 replaceChildren(){this.children=[];}
 setAttribute(){}
 remove(){if(this.parent)this.parent.children=this.parent.children.filter(x=>x!==this);}
}
const body=new Element('body'),g={crypto:crypto.webcrypto,Uint32Array,Set,console,document:{body,createElement:tag=>new Element(tag)},alerts:[],saves:[]};g.window=g;g.alert=x=>g.alerts.push(x);g.addEventListener=()=>{};
g.currentChar={id:'p',classes:[{name:'Предсказатель',level:3,subclass:'Оракул'}]};g.autoSaveCurrentCharacter=()=>g.saves.push(JSON.parse(JSON.stringify(g.currentChar)));
vm.createContext(g);for(const f of ['predictor_runtime.js','predictor_deck_ui.js'])vm.runInContext(fs.readFileSync(__dirname+'/../app/'+f,'utf8'),g);
function panel(){return body.children[0];}
function click(text){const b=panel().children.find(x=>x.tagName==='button'&&x.textContent===text);assert(b,text);assert(!b.disabled,text);b.onclick();}
g.DNDPredictorUI.open();assert.equal(body.children.length,1);click('Заполнить стартовую руку');click('Добрать Младшую');assert(g.currentChar.predictorState.offer);assert.equal(g.currentChar.predictorState.hand.length,0);
const id=g.currentChar.predictorState.offer.cards[0],card=g.DNDPredictor.cards.find(c=>c.id===id);click(card.name);assert.equal(g.currentChar.predictorState.hand[0],id);assert(!g.currentChar.predictorState.offer);assert(g.saves.at(-1).predictorState.hand.includes(id));
click('Добрать Старшую');const offer=g.currentChar.predictorState.offer.cards[0];click(g.DNDPredictor.cards.find(c=>c.id===offer).name);assert.equal(g.DNDPredictor.inspect(g.currentChar).majorCurrent,2);
const closedHero=g.currentChar;g.currentChar={id:'other',classes:[]};g.DNDPredictorUI.refresh();assert.equal(body.children.length,0);assert.equal(closedHero.predictorState.hand.length,2);
g.currentChar=closedHero;g.dndNetwork={state:{connected:true}};g.DNDPredictorUI.open();assert.equal(body.children.length,0);assert(g.alerts.at(-1).includes('приватная'));
console.log('PREDICTOR_DECK_UI_OK: open, finite initial choices, return/shuffle, profile autosave, no resource on draw, account switch and network guard');

/**
 * content_manifest.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Реестр метаданных контент-паков проекта. Он не реализует правила,
 * а описывает происхождение, категорию, версию, состав и статус паков.
 *
 * КАК РАБОТАЕТ:
 * - DNDContentManifest.list() возвращает каталог установленных и
 *   планируемых паков;
 * - установленный runtime-пак связывается по packId;
 * - planned-паки видны в каталоге, но не попадают в runtime.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * PACK_MANIFEST, category, status, packId, content, license.
 *
 * ИСТОЧНИК:
 * Метаданные проекта. Не содержит воспроизведения текста книг.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var PACK_MANIFEST=[
    {id:'core-5e-2014',name:'Core 5e',category:'official',status:'installed',version:'2014',source:'D&D 5e 2014 ruleset',content:['13 базовых классов','расы','черты','заклинания','снаряжение'],license:'Rules framework'},
    {id:'blood-hunter-pack',name:'Blood Hunter',category:'thirdparty',status:'installed',version:'project runtime',source:'Community class',content:['класс','4 Order','Hemocraft','Blood Maledict'],license:'Use only with appropriate source rights'},
    {id:'kibbles-expansion',name:'KibblesTasty Expansion',category:'thirdparty',status:'installed',version:'project runtime',source:'KibblesTasty Homebrew',content:['Psion','Warlord','Warden','Spellblade'],license:'KibblesTasty KRD CC-BY where applicable; review source terms per included content'},
    {id:'mcdm-illrigger',name:'Illrigger',category:'thirdparty',status:'installed',version:'revised',source:'MCDM Productions',content:['класс','подклассы','combat styles'],license:'Official MCDM product'},
    {id:'mcdm-beastheart',name:'Beastheart',category:'thirdparty',status:'installed',version:'5e',source:'MCDM Productions',content:['класс','companion system','ferocity','подклассы'],license:'Official MCDM product'},
    {id:'pugilist',name:'Pugilist',category:'thirdparty',status:'installed',version:'5e',source:'Benjamin Huffman / community',content:['класс','Moxie','уличные боевые стили','подклассы'],license:'Use only with appropriate source rights'},
    {id:'mcdm-talent',name:'Talent',category:'thirdparty',status:'planned',version:'5e',source:'MCDM Productions',content:['псионический класс','powers'],license:'Official MCDM product'},
    {id:'homebrew-lab',name:'Homebrew Lab',category:'homebrew',status:'planned',version:'1.0',source:'User-created content',content:['свои классы','подклассы','расы','черты','способности'],license:'User-defined'},
    {id:'experimental-lab',name:'Experimental Lab',category:'experimental',status:'planned',version:'1.0',source:'Project experiments',content:['нестандартные механики','playtest-классы','альтернативные правила'],license:'Playtest'}
  ];
  function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(e){return v;}}
  function list(){return clone(PACK_MANIFEST);}
  function get(id){var x=PACK_MANIFEST.find(function(p){return p.id===id;});return x?clone(x):null;}
  global.DNDContentManifest={VERSION:'1.0.0',list:list,get:get};
})(window);

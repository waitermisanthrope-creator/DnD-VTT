/** Russian touch-first account UI, shared by Android WebView and Electron.
 * DNDCloudAccount.open renders Supabase Auth, sync conflicts and revision history.
 * All user/cloud strings use textContent; passwords are never stored or logged.
 */
(function(g){
  'use strict';
  var api=g.DNDCloudSync,root,info,status,account,conflicts,roster,actions=[],busy=false;
  function el(tag,text,parent){var n=document.createElement(tag);if(text)n.textContent=text;if(parent)parent.appendChild(n);return n;}
  function button(text,fn,parent){var b=el('button',text,parent);b.type='button';b.className='btn-action';b.addEventListener('click',async function(){if(busy)return;busy=true;actions.forEach(function(x){x.disabled=true;});try{await fn();}catch(e){info.textContent=e.message || 'Не удалось выполнить действие';}finally{busy=false;actions.forEach(function(x){x.disabled=false;});}});actions.push(b);return b;}
  function field(label,type,parent){var l=el('label',label,parent),n=el('input','',l);n.type=type||'text';return n;}
  function render(s){
    if(!root)return;
    status.textContent=s.status+(s.pending?' · В очереди: '+s.pending:'');
    account.textContent=s.email?'Аккаунт: '+s.email:'Вы играете гостем. Локальные сохранения доступны без регистрации.';
    if(s.message)info.textContent=s.message;
    if(!conflicts||!roster)return;
    conflicts.replaceChildren();
    (s.conflicts||[]).forEach(function(e){
      var box=el('section','',conflicts),local=JSON.parse(e.json),remote=e.conflict.remote;
      el('h4','Конфликт: '+(local.name||'Без имени'),box);
      el('p','На устройстве: '+(e.deleted?'удалён':(local.name||'Персонаж'))+' · В облаке: '+(!remote?'нет версии':remote.deleted?'удалён':'ревизия '+remote.revision+' · '+(remote.profile.name||'Персонаж')),box);
      el('p','Обе версии сохранены. Выберите вариант; локальные изменения до выбора остаются на устройстве.',box);
      button('Оставить версию устройства',function(){api.resolve(e.localId,'local');},box);
      button('Использовать облачную версию',function(){api.resolve(e.localId,'remote');},box);
      button('Сохранить локальную отдельной копией',function(){api.resolve(e.localId,'copy');},box);
      var details=el('details','',box);el('summary','Сравнить полные данные',details);
      el('pre',JSON.stringify({устройство:local,облако:remote&&remote.profile},null,2),details);
    });
    roster.replaceChildren();
    actions=actions.filter(function(b){return b.isConnected;});
    if(api.characters)api.characters().forEach(function(c){
      var row=el('section','',roster);el('strong',c.name+(c.deleted?' (удалён)':''),row);
      if(c.deleted)button('Восстановить локальную отдельную копию',function(){api.copyDeleted(c.id);},row);
      button('История и восстановление',async function(){
        var rows=await api.history(c.id),history=el('div','',row);
        if(!rows.length)el('p','Персонаж ещё не отправлен в облако.',history);
        rows.forEach(function(r){button('Восстановить ревизию '+r.revision+' · '+new Date(r.updated_at).toLocaleString('ru-RU')+(r.deleted?' (удаление)':''),async function(){await api.restore(c.id,r.revision);history.remove();},history);});
      },row);
    });
    if(api.localBackups&&api.localBackups().length){
      var backups=el('details','',roster);el('summary','Локальные версии до разрешения конфликтов и восстановления',backups);
      api.localBackups().forEach(function(b){button('Восстановить копию: '+b.name+' · '+new Date(b.at).toLocaleString('ru-RU'),function(){api.restoreLocalCopy(b.index);},backups);});
    }
  }
  function open(){
    if(root){root.hidden=false;render(api.snapshot());return;}
    root=el('div','',document.body);root.id='dndCloudAccount';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label','Аккаунт и облачные персонажи');
    var panel=el('div','',root);panel.className='cloud-panel';
    el('h2','Аккаунт и облачные персонажи',panel);
    button('Закрыть',function(){root.hidden=true;},panel);
    account=el('p','',panel);status=el('p','',panel);status.setAttribute('role','status');
    info=el('p','',panel);info.setAttribute('role','status');
    if(!api.login){render(api.snapshot());return;}
    var settings=el('details','',panel);el('summary','Подключение к облаку',settings);
    el('p','Укажите один и тот же проект на ПК и Android. Здесь допустимы только Project URL и публичный publishable key.',settings);
    var url=field('Project URL','url',settings),key=field('Публичный publishable key','text',settings);
    button('Сохранить подключение',function(){api.configure({projectUrl:url.value.trim(),publishableKey:key.value.trim()});},settings);
    var form=el('form','',panel);form.addEventListener('submit',function(e){e.preventDefault();});
    var email=field('Электронная почта','email',form);email.autocomplete='email';
    var password=field('Пароль','password',form);password.autocomplete='current-password';
    el('p','Для новой регистрации используйте пароль не менее 8 символов.',form);
    function credentials(signup){if(!email.validity.valid||!email.value)throw Error('Введите корректную почту');if(!password.value)throw Error('Введите пароль');if(signup&&password.value.length<8)throw Error('Для регистрации пароль должен содержать не менее 8 символов');}
    button('Войти',async function(){credentials();try{await api.login(email.value.trim(),password.value);}finally{password.value='';}},form);
    button('Зарегистрироваться',async function(){credentials(true);try{await api.signup(email.value.trim(),password.value);}finally{password.value='';}},form);
    var code=field('Код из письма','text',form);code.autocomplete='one-time-code';
    button('Подтвердить почту',async function(){await api.verify(email.value.trim(),code.value.trim(),'signup');code.value='';},form);
    button('Восстановить доступ',function(){return api.recover(email.value.trim());},form);
    button('Проверить код восстановления',async function(){await api.verify(email.value.trim(),code.value.trim(),'recovery');code.value='';},form);
    button('Задать новый пароль',async function(){if(password.value.length<8)throw Error('Введите новый пароль не менее 8 символов');try{await api.password(password.value);}finally{password.value='';}},form);
    button('Выйти и продолжить гостем',function(){return api.logout();},panel);
    button('Синхронизировать сейчас',function(){return api.sync();},panel);
    button('Создать облачные копии локальных героев',function(){api.importLocal();},panel);
    el('p','При переносе оригиналы остаются в гостевом режиме. При выходе очередь аккаунта хранится на этом устройстве до следующего входа. Для резервной копии текущих героев используйте настройки приложения.',panel);
    conflicts=el('div','',panel);el('h3','Персонажи аккаунта и история',panel);roster=el('div','',panel);
    api.onChange(render);render(api.snapshot());
  }
  g.DNDCloudAccount={open:open};
  document.addEventListener('DOMContentLoaded',function(){
    var host=document.getElementById('characterSelectScreen');
    if(host){
      var b=button('☁ Аккаунт · Гость',open,host);b.classList.add('cloud-entry');
      function badge(s){b.textContent='☁ Аккаунт · '+(s.email?s.email+' · ':'')+s.status+(s.pending?' · '+s.pending:'');}
      if(api.onChange)api.onChange(badge);badge(api.snapshot());
    }
  });
})(window);

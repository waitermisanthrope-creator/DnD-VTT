/** Real Chromium integration: full application, two storage-isolated contexts,
 * Russian account UI, mocked Supabase API, direct 3D writes, conflicts and backup
 * redaction. PLAYWRIGHT_MODULE and BROWSER_EXECUTABLE select installed QA tools.
 */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {Server,hero}=require('../tests/cloud_sync_test.cjs');
const root=path.resolve(__dirname,'..'),api=new Server();
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async()=>{
  let browser;
  try{
    await new Promise(r=>server.listen(0,'127.0.0.1',r));
    browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    const errors=[],contexts=[];
    for(const viewport of [{width:1200,height:900},{width:390,height:844}]){
      const context=await browser.newContext({viewport});contexts.push(context);
      await context.addInitScript(()=>localStorage.setItem('dnd_v71_onboarding_done','1'));
      await context.route('https://**/*',async route=>{
        const request=route.request();if(!request.url().startsWith('https://example.supabase.co/'))return route.abort();
        const headers=request.headers();headers.Authorization=headers.authorization;
        const r=await api.fetch(request.url(),{headers,body:request.postData(),method:request.method()});
        await route.fulfill({status:r.status,contentType:'application/json',body:await r.text()});
      });
    }
    const [pc,phone]=await Promise.all(contexts.map(c=>c.newPage()));
    for(const page of [pc,phone]){
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto('http://127.0.0.1:'+server.address().port);
      await page.waitForFunction(()=>window.__DND_APP_BOOT_READY);
      assert.equal(await page.evaluate(()=>window.DND_UPDATE_MANIFEST_URL || ''),'','main distribution uses a test update override');
      await page.evaluate(()=>DNDCloudAccount.open());
      assert.equal(await page.getByLabel('Project URL',{exact:true}).count(),0,'distribution exposes project setup to new users');
      assert.equal(await page.getByLabel('Публичный publishable key',{exact:true}).count(),0);
      await page.evaluate(()=>DNDCloudSync.configure({projectUrl:'https://example.supabase.co',publishableKey:'sb_publishable_test'}));
      await page.getByLabel('Электронная почта',{exact:true}).fill('a@example.com');
      await page.getByLabel('Пароль',{exact:true}).fill(page===pc?'123456':'password123');
    }
    await pc.evaluate(h=>localStorage.setItem('dnd_multi_characters_v2',JSON.stringify([h])),hero);
    await pc.getByRole('button',{name:'Войти',exact:true}).click();
    await pc.waitForFunction(()=>DNDCloudSync.snapshot().email==='a@example.com'&&DNDCloudSync.snapshot().status==='Синхронизировано');
    assert.equal(await pc.getByLabel('Пароль',{exact:true}).inputValue(),'');
    await pc.getByRole('button',{name:'Создать облачные копии локальных героев',exact:true}).click();
    await pc.evaluate(()=>DNDCloudSync.sync());
    await phone.getByRole('button',{name:'Войти',exact:true}).click();
    await phone.waitForFunction(()=>DNDCloudSync.snapshot().status==='Синхронизировано');
    const read=page=>page.evaluate(()=>JSON.parse(localStorage.getItem('dnd_multi_characters_v2')));
    assert.equal((await read(phone))[0].appearance3d.morphs.height,.7);
    await pc.evaluate(()=>{let a=JSON.parse(localStorage.getItem('dnd_multi_characters_v2'));a[0].hpCurrent=5;localStorage.setItem('dnd_multi_characters_v2',JSON.stringify(a));});await pc.evaluate(()=>DNDCloudSync.sync());
    await phone.evaluate(()=>{let a=JSON.parse(localStorage.getItem('dnd_multi_characters_v2'));a[0].hpCurrent=1;localStorage.setItem('dnd_multi_characters_v2',JSON.stringify(a));});await phone.evaluate(()=>DNDCloudSync.sync());
    await phone.getByRole('button',{name:'Сохранить локальную отдельной копией',exact:true}).click();await phone.evaluate(()=>DNDCloudSync.sync());
    assert.equal((await read(phone)).length,2);assert.equal((await read(phone)).find(c=>c.name.includes('копия')).hpCurrent,1);
    await phone.reload();await phone.waitForFunction(()=>window.__DND_APP_BOOT_READY);assert.equal((await read(phone)).length,2);assert.equal(await phone.evaluate(()=>DNDCloudSync.snapshot().email),'a@example.com');
    await phone.evaluate(()=>{const a=JSON.parse(localStorage.getItem('dnd_multi_characters_v2'));currentCharacterId=a[0].id;currentChar=a[0];allCharacters=a;DNDCharacterAppearanceStore.save(DNDCharacterAppearanceStore.open(),{morphs:{height:.9},hair:'braid',clothing:{top:'shirt_long'}});currentCharacterId=null;});await phone.evaluate(()=>DNDCloudSync.sync());await pc.evaluate(()=>DNDCloudSync.sync());assert.equal((await read(pc))[0].appearance3d.hair,'braid');
    await pc.locator('#dndCloudAccount').getByRole('button',{name:'Закрыть',exact:true}).click();
    await pc.evaluate(()=>openSettingsModal());
    const download=pc.waitForEvent('download');await pc.getByRole('button',{name:'💾 Сохранить',exact:true}).click();
    const file=await (await download).path(),backup=JSON.parse(fs.readFileSync(file,'utf8'));assert(!Object.keys(backup).some(k=>k.startsWith('dnd_cloud_')));assert(backup.dnd_multi_characters_v2);
    // A remote string must render as text, never execute in the character menu.
    await pc.evaluate(()=>{const a=JSON.parse(localStorage.getItem('dnd_multi_characters_v2'));a[0].name='<img src=x onerror="window.__cloud_xss=1">';localStorage.setItem('dnd_multi_characters_v2',JSON.stringify(a));renderCharacterList();});assert.equal(await pc.evaluate(()=>window.__cloud_xss),undefined);assert.equal(await pc.locator('#characterList img').count(),0);
    await pc.evaluate(()=>DNDCloudSync.logout());assert.equal((await read(pc))[0].id,hero.id);
    await phone.evaluate(()=>DNDCloudAccount.open());assert(await phone.evaluate(()=>document.querySelector('.cloud-panel').getBoundingClientRect().width<=innerWidth));
    assert.deepEqual(errors,[]);
    console.log('CLOUD_ACCOUNT_BROWSER_OK: account UI, two devices, CAS/copy, reload, 3D fields, backup redaction, guest recovery, XSS, mobile');
  }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

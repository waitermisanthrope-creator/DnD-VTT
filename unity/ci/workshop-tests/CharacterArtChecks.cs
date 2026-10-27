using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class CharacterArtChecks
{
    public static int Run()
    {
        int checks=0;
        void Check(bool yes,string why) { if(!yes)throw new Exception(why);checks++; }
        void Reject(Action action,string why) { bool bad=false;try{action();}catch(FormatException){bad=true;}Check(bad,why); }
        Check(LegacyJson.ProfileBytes(JObject.Parse("{\"a\":[1,{\"b\":true}]}"))==System.Text.Encoding.UTF8.GetByteCount("{\"a\": [1, {\"b\": true}]}"),"nested jsonb separators");
        byte[] png=Convert.FromBase64String("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a2ioAAAAASUVORK5CYII=");
        var p=CharacterArt.Inspect(png);Check(p.width==1&&p.height==1&&p.format=="png","PNG header dimensions");
        Reject(()=>CharacterArt.Inspect(new byte[0]),"empty rejected");
        Reject(()=>CharacterArt.Inspect(png.Take(20).ToArray()),"truncated PNG rejected");
        var huge=(byte[])png.Clone();huge[16]=0x7f;Reject(()=>CharacterArt.Inspect(huge),"huge PNG rejected before decode");
        Reject(()=>CharacterArt.Inspect(new byte[CharacterArt.SourceLimit+1]),"source byte budget");
        byte[] jpg={255,216,255,192,0,17,8,0,2,0,3,3,1,17,0,2,17,0,3,17,0,255,218,0,8,1,1,0,0,63,0,1,255,217};
        var j=CharacterArt.Inspect(jpg);Check(j.width==3&&j.height==2&&j.format=="jpeg","JPEG SOF dimensions");
        Reject(()=>CharacterArt.Inspect(jpg.Take(12).ToArray()),"truncated JPEG rejected");
        byte[] bmp=new byte[62];bmp[0]=66;bmp[1]=77;bmp[2]=62;bmp[10]=54;bmp[14]=40;bmp[18]=2;bmp[22]=1;bmp[26]=1;bmp[28]=24;
        var b=CharacterArt.Inspect(bmp);Check(b.width==2&&b.height==1&&b.format=="bmp","24bit BMP accepted");
        bmp[54]=10;bmp[55]=20;bmp[56]=30;var rgba=CharacterArt.BmpRgba(bmp);Check(rgba[0]==30&&rgba[1]==20&&rgba[2]==10&&rgba[3]==255,"BMP BGR to opaque RGBA");
        byte[] tall=new byte[70];Array.Copy(bmp,tall,bmp.Length);tall[2]=70;tall[22]=2;tall[62]=90;
        var bottom=CharacterArt.BmpRgba(tall);Check(bottom[2]==10&&bottom[10]==90,"bottom-up BMP rows");
        tall[22]=254;tall[23]=tall[24]=tall[25]=255;var top=CharacterArt.BmpRgba(tall);Check(top[2]==90&&top[10]==10,"top-down BMP rows");
        Check(CharacterArt.JpegOrientation(jpg)==1,"JPEG without EXIF upright");
        byte[] exif={255,225,0,34,69,120,105,102,0,0,73,73,42,0,8,0,0,0,1,0,18,1,3,0,1,0,0,0,6,0,0,0,0,0,0,0};
        var rotated=jpg.Take(2).Concat(exif).Concat(jpg.Skip(2)).ToArray();Check(CharacterArt.JpegOrientation(rotated)==6,"EXIF clockwise rotation");
        Check(CharacterArt.JpegOrientation(rotated.Take(20).ToArray())==1,"truncated EXIF safely ignored");
        bmp[30]=1;Reject(()=>CharacterArt.Inspect(bmp),"compressed BMP rejected");
        var art=new JObject{["version"]=1,["mime"]="image/jpeg",["data"]=Convert.ToBase64String(jpg)};
        var archive=new LegacyCharacterArchive("{\"characters\":[{\"id\":\"a\",\"custom\":{\"x\":1}},{\"id\":\"b\",\"name\":\"Другой\"}],\"keep\":true}");
        var candidate=CharacterArt.WithArt(archive,"a",art);
        Check(archive.Snapshot(0)["heroArt"]==null,"original unchanged");
        Check(JToken.DeepEquals(candidate.Snapshot(1),archive.Snapshot(1)),"other hero untouched");
        Check((int)candidate.Snapshot(0)["custom"]["x"]==1,"unknown preserved");
        Check((bool)JObject.Parse(candidate.Export())["keep"],"wrapper preserved");
        Reject(()=>CharacterArt.WithArt(archive,"missing",art),"deleted callback target rejected");
        string dir=Path.Combine(Path.GetTempPath(),"vtt-art-"+Guid.NewGuid());Directory.CreateDirectory(dir);
        try {
            string path=Path.Combine(dir,"heroes.json");CharacterSheetStore.Save(path,archive);CharacterSheetStore.Save(path,candidate);
            var loaded=CharacterSheetStore.Load(path);Check(JToken.DeepEquals(loaded.Snapshot(0)["heroArt"],art),"restart art");
            Check(CharacterSheetStore.Load(path+".bak").Snapshot(0)["heroArt"]==null,"backup original retained");
            CharacterFiles.Write(Path.Combine(dir,"export.json"),loaded.Export());Check(new LegacyCharacterArchive(CharacterFiles.Read(Path.Combine(dir,"export.json"))).Export()==loaded.Export(),"portable export art");
            Check(CharacterArt.WithArt(loaded,"a",null).Snapshot(0)["heroArt"]==null,"removal");
            var full=new LegacyCharacterArchive(new JObject{["id"]="full",["notes"]=new string('x',1024*1024-100)}.ToString(Newtonsoft.Json.Formatting.None));
            string beforeDisk=File.ReadAllText(path),beforeBackup=File.ReadAllText(path+".bak");
            Reject(()=>CharacterArt.WithArt(full,"full",art),"portrait cannot exceed cloud profile budget");
            Check(File.ReadAllText(path)==beforeDisk&&File.ReadAllText(path+".bak")==beforeBackup,"rejected insertion preserves disk and backup");
            var over=(JObject)art.DeepClone();over["data"]=Convert.ToBase64String(new byte[CharacterArt.StoredLimit+1]);Reject(()=>CharacterArt.WithArt(loaded,"a",over),"stored bytes bound");
            Check(loaded.Export()==candidate.Export(),"rejected replacement intact");
            var large=new JArray();for(int i=0;i<24;i++)large.Add(new JObject{["id"]="hero"+i,["notes"]=new string('x',50000)});
            var multi=new LegacyCharacterArchive(large.ToString());Check(multi.Count==24,"aggregate beyond1MiB accepted");
            CharacterFiles.Write(Path.Combine(dir,"multi.json"),multi.Export());Check(new LegacyCharacterArchive(CharacterFiles.Read(Path.Combine(dir,"multi.json"))).Count==24,"large archive file roundtrip");
            Reject(()=>new LegacyCharacterArchive(new JObject{["id"]="a",["notes"]=new string('x',1024*1024-21)}.ToString(Newtonsoft.Json.Formatting.None)),"cloud jsonb separator bytes counted");
            Reject(()=>new LegacyCharacterArchive(new JObject{["id"]="too-large",["notes"]=new string('x',1024*1024)}.ToString()),"individual cloud profile1MiB retained");
        } finally {Directory.Delete(dir,true);}
        return checks;
    }
}

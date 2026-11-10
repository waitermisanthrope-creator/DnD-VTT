using System;
using System.IO;
using System.Text;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Portable, bounded portrait contract. Decode pixels only after header validation.
    public static class CharacterArt
    {
        public const int SourceLimit = 16 * 1024 * 1024, StoredLimit = 64 * 1024, Edge = 512;
        public const int ArchiveLimit = 16 * 1024 * 1024, ProfileLimit = 1024 * 1024;
        private static FormatException Invalid() => new FormatException("Не удалось прочитать изображение. Выберите PNG, JPG/JPEG или BMP без сжатия.");
        private static int BE(byte[] b,int p) => (b[p]<<24)|(b[p+1]<<16)|(b[p+2]<<8)|b[p+3];
        private static int LE(byte[] b,int p) => b[p]|(b[p+1]<<8)|(b[p+2]<<16)|(b[p+3]<<24);
        private static (int width,int height,string format) Size(int w,int h,string f)
        {
            if(w<=0||h<=0||w>8192||h>8192||(long)w*h>24*1024*1024)
                throw new FormatException("Изображение слишком большое. Максимум 24 Мп и 8192 пикселя по стороне.");
            return (w,h,f);
        }
        public static (int width,int height,string format) Inspect(byte[] b)
        {
            if(b==null||b.Length<24)throw Invalid();
            if(b.Length>SourceLimit)throw new FormatException("Изображение больше 16 МБ. Выберите файл поменьше.");
            if(b[0]==137&&b[1]==80&&b[2]==78&&b[3]==71&&b[4]==13&&b[5]==10&&b[6]==26&&b[7]==10)
            {
                if(b.Length<57||BE(b,8)!=13||BE(b,12)!=0x49484452)throw Invalid();
                var size=Size(BE(b,16),BE(b,20),"png");bool data=false,end=false;
                for(int p=8;p<=b.Length-12;)
                {
                    int n=BE(b,p);if(n<0||(long)p+n+12>b.Length)throw Invalid();
                    int type=BE(b,p+4);if(type==0x49444154)data=true;
                    if(type==0x49454e44){if(n!=0)throw Invalid();end=true;break;}
                    p+=n+12;
                }
                if(!data||!end)throw Invalid();return size;
            }
            if(b[0]==255&&b[1]==216)
            {
                if(b[b.Length-2]!=255||b[b.Length-1]!=217)throw Invalid();
                for(int p=2;p<b.Length-3;)
                {
                    if(b[p++]!=255)throw Invalid();while(p<b.Length&&b[p]==255)p++;
                    if(p>=b.Length)throw Invalid();int marker=b[p++];
                    if(marker==0xD9||marker==0xDA)break;
                    if(marker==0x01||(marker>=0xD0&&marker<=0xD7))continue;
                    if(p+2>b.Length)throw Invalid();int n=(b[p]<<8)|b[p+1];
                    if(n<2||(long)p+n>b.Length)throw Invalid();
                    if(marker==0xC0||marker==0xC1||marker==0xC2)
                    {
                        if(n<8||b[p+2]!=8)throw Invalid();
                        return Size((b[p+5]<<8)|b[p+6],(b[p+3]<<8)|b[p+4],"jpeg");
                    }
                    p+=n;
                }
                throw Invalid();
            }
            if(b[0]==66&&b[1]==77)
            {
                if(b.Length<54||LE(b,14)<40||LE(b,14)>b.Length-14||b[26]!=1||b[27]!=0||LE(b,30)!=0||(b[28]!=24&&b[28]!=32)||b[29]!=0)throw Invalid();
                int w=LE(b,18),rawH=LE(b,22);if(rawH==int.MinValue)throw Invalid();var size=Size(w,Math.Abs(rawH),"bmp");
                int offset=LE(b,10);long stride=((long)w*(b[28]/8)+3)&~3L;
                if(offset<14L+LE(b,14)||(long)offset+stride*size.height>b.Length)throw Invalid();return size;
            }
            throw Invalid();
        }
        public static int JpegOrientation(byte[] b)
        {
            if(b==null||b.Length<4||b[0]!=255||b[1]!=216)return 1;
            for(int p=2;p+4<b.Length;)
            {
                if(b[p++]!=255)return 1;while(p<b.Length&&b[p]==255)p++;
                if(p+3>=b.Length)return 1;int marker=b[p++],n=(b[p]<<8)|b[p+1];
                if(marker==0xDA||marker==0xD9||n<2||(long)p+n>b.Length)return 1;
                if(marker==0xE1&&n>=16&&b[p+2]==69&&b[p+3]==120&&b[p+4]==105&&b[p+5]==102&&b[p+6]==0&&b[p+7]==0)
                {
                    int t=p+8,end=p+n;bool little=b[t]==73&&b[t+1]==73;
                    if(!little&&!(b[t]==77&&b[t+1]==77))return 1;
                    int U16(int at)=>little?b[at]|b[at+1]<<8:b[at]<<8|b[at+1];
                    int U32(int at)=>little?LE(b,at):BE(b,at);
                    if(U16(t+2)!=42)return 1;int offset=U32(t+4);
                    if(offset<8||(long)t+offset+2>end)return 1;int dir=t+offset,count=U16(dir);
                    for(int k=0;k<count;k++)
                    {
                        long at=(long)dir+2+k*12;if(at+12>end)return 1;int a=(int)at;
                        if(U16(a)==0x112&&U16(a+2)==3&&U32(a+4)==1){int orientation=U16(a+8);return orientation>=1&&orientation<=8?orientation:1;}
                    }
                    return 1;
                }
                p+=n;
            }
            return 1;
        }
        public static byte[] BmpRgba(byte[] b)
        {
            var s=Inspect(b);if(s.format!="bmp")throw Invalid();
            int offset=LE(b,10),pixel=b[28]/8,stride=(s.width*pixel+3)&~3;bool top=LE(b,22)<0;
            var result=new byte[s.width*s.height*4];
            for(int y=0;y<s.height;y++)for(int x=0;x<s.width;x++)
            {
                int src=offset+(top?s.height-1-y:y)*stride+x*pixel,dst=(y*s.width+x)*4;
                result[dst]=b[src+2];result[dst+1]=b[src+1];result[dst+2]=b[src];result[dst+3]=255;
            }
            return result;
        }
        public static byte[] Read(string path)
        {
            using var stream=new FileStream(path,FileMode.Open,FileAccess.Read,FileShare.Read);
            if(stream.Length>SourceLimit)throw new FormatException("Изображение больше 16 МБ");
            using var data=new MemoryStream();var buffer=new byte[8192];int count;
            while((count=stream.Read(buffer,0,buffer.Length))>0){if(data.Length+count>SourceLimit)throw new FormatException("Изображение больше 16 МБ");data.Write(buffer,0,count);}
            var bytes=data.ToArray();Inspect(bytes);return bytes;
        }
        public static byte[] StoredBytes(JObject art)
        {
            if((int?)art?["version"]!=1||(string)art["mime"]!="image/jpeg"||art["data"]?.Type!=JTokenType.String)throw Invalid();
            string data=(string)art["data"];if(data.Length>(StoredLimit+2)/3*4)throw Invalid();
            var bytes=Convert.FromBase64String(data);if(bytes.Length>StoredLimit)throw Invalid();
            var size=Inspect(bytes);if(size.format!="jpeg"||size.width>Edge||size.height>Edge)throw Invalid();return bytes;
        }
        public static LegacyCharacterArchive WithArt(LegacyCharacterArchive archive,string id,JObject art)
        {
            if(art!=null)StoredBytes(art);
            var result=archive.DetachedCopy();int index=-1;
            for(int i=0;i<result.Count;i++)if((string)result.Snapshot(i)["id"]==id){index=i;break;}
            if(index<0)throw new FormatException("Персонаж больше не найден. Откройте лист заново.");
            var hero=result.Snapshot(index);if(art==null)hero.Remove("heroArt");else hero["heroArt"]=art.DeepClone();
            result.Replace(index,hero);
            return new LegacyCharacterArchive(result.Export()); // Validate aggregate before replacing live state or backup.
        }
    }
}

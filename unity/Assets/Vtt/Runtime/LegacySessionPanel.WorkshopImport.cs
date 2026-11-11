using System;
using System.Collections;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using UnityEngine;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private void PickWorkshopDataFile()
        {
            if(characterFileToken!=null||contentBusy)throw new InvalidOperationException("Сначала завершите текущую операцию");
#if UNITY_ANDROID && !UNITY_EDITOR
            using var player=new AndroidJavaClass("com.unity3d.player.UnityPlayer");using var activity=player.GetStatic<AndroidJavaObject>("currentActivity");
            string token=Guid.NewGuid().ToString("N");characterFileToken=token;characterFileOperation="workshop";
            try{using var bridge=new AndroidJavaClass("com.dndvtt.unityupdater.CharacterDocumentActivity");bridge.CallStatic("launch",activity,gameObject.name,token,"import");}
            catch{characterFileToken=characterFileOperation=null;throw;}
#elif UNITY_STANDALONE_WIN && !UNITY_EDITOR
            string path=CharacterFiles.PickWindowsData();if(path!=null)ImportWorkshopDataFile(path);else contentNotice="Выбор дополнения отменён";
#else
            throw new PlatformNotSupportedException("Импорт файла доступен в приложении Android и Windows");
#endif
        }
        private void ImportWorkshopDataFile(string path)
        {
            if(new FileInfo(path).Length>5*1024*1024)throw new FormatException("JSON дополнения больше5МБ");
            string text=File.ReadAllText(path,Encoding.UTF8);StartCoroutine(ImportWorkshopData(text));
        }
        private IEnumerator ImportWorkshopData(string text)
        {
            InitializeWorkshop();contentBusy=true;contentNotice="Проверка и установка локального дополнения…";contentProgress=0;
            string root=workshopStore.Root,platform=WorkshopRuntime.Platform,unity=Application.unityVersion;int code=UnityRelease.Code;
            yield return null;
            var task=Task.Run(()=>
            {
                try{return(new WorkshopStore(root).ImportLocalData(text,platform,unity,code),(string)null);}
                catch(Exception error){return((JObject)null,"Не удалось установить дополнение: "+error.Message);}
            });
            while(!task.IsCompleted){contentProgress=.5f;yield return null;}
            var result=task.Result;
            try{if(result.Item2!=null)contentNotice=result.Item2;else{RefreshWorkshop();contentNotice="Установлено: "+result.Item1["name"]+" · "+result.Item1["version"];}}
            finally{contentBusy=false;contentProgress=1;}
        }
    }
}

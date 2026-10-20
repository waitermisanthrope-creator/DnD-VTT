using System;
using System.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private bool workshopLibraryOpen, workshopLoading;
        private System.Collections.IEnumerator LoadWorkshopLibrary()
        {
            workshopLoading = true; yield return workshop.LoadBundles(); workshopLoading = false;
            world.ReloadCurrent(); status = workshop.Error;
        }
        private void DrawWorkshopLibrary()
        {
            InitializeWorkshop();
            if (GUILayout.Button("Библиотека скачанных объектов / материалов", GUILayout.Height(38)))
            {
                workshopLibraryOpen = !workshopLibraryOpen;
                if (workshopLibraryOpen && !workshopLoading) StartCoroutine(LoadWorkshopLibrary());
            }
            if (!workshopLibraryOpen) return;
            GUILayout.Label("Размещение: на две клетки перед текущим X. Карта автоматически сохраняется локально.");
            if (workshopLoading) GUILayout.Label("Загрузка AssetBundles…");
            foreach (string id in workshop.Models.Keys.ToArray())
                if (GUILayout.Button("Разместить: " + id, GUILayout.Height(34))) Attempt(() => world.PlaceWorkshopObject(id));
            foreach (string id in workshop.Surfaces.Keys.Where(k => !k.EndsWith(".material", StringComparison.Ordinal)).ToArray())
                if (GUILayout.Button("Пол текущего этажа: " + id, GUILayout.Height(34))) Attempt(() => world.ApplyWorkshopSurface(id));
            if (GUILayout.Button("Сохранить текущую карту", GUILayout.Height(34))) Attempt(() => world.SaveWorkshopMap());
            if (GUILayout.Button("Копировать резервную копию персонажей", GUILayout.Height(34))) Attempt(() => { GUIUtility.systemCopyBuffer = ExportCurrent() ?? throw new InvalidOperationException("Нет персонажей"); status = "Архив скопирован. Сохраните JSON вне приложения перед удалением Android-приложения."; });
            GUILayout.Label("Перед удалением Android-приложения экспортируйте персонажей и сохраните JSON вне приложения. Локальные файлы могут быть удалены системой.");
        }
    }
}

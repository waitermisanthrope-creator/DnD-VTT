using System;
using System.IO;
using System.Xml;
using DndVtt.UnityPrototype;
using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEditor.Build;
using UnityEditor.Android;
using UnityEngine;

public static class UnityReleaseBuild
{
    public static void Windows() => Build(BuildTarget.StandaloneWindows64, "windows/DndVtt.exe");
    public static void Android() => Build(BuildTarget.Android, "android-intermediate.apk");
    private static void Build(BuildTarget target, string suffix)
    {
        if (PlayerSettings.companyName != "DnDVttExperiment" || PlayerSettings.productName != "DnD VTT Unity Prototype")
            throw new Exception("Release must preserve existing Windows save identity");
        LegacyMigrationSetup.ValidateContracts();
        PlayerSettings.bundleVersion = UnityRelease.Version;
        PlayerSettings.Android.bundleVersionCode = UnityRelease.Code;
        PlayerSettings.SetApplicationIdentifier(NamedBuildTarget.Android, UnityRelease.Package);
        if (target == BuildTarget.Android)
        {
            PlayerSettings.Android.targetArchitectures = AndroidArchitecture.ARM64;
            PlayerSettings.SetScriptingBackend(NamedBuildTarget.Android, ScriptingImplementation.IL2CPP);
            PlayerSettings.Android.minSdkVersion = AndroidSdkVersions.AndroidApiLevel26;
            PlayerSettings.Android.targetSdkVersion = (AndroidSdkVersions)36;
        }
        string folder = "Builds/Unity-" + UnityRelease.Version; Directory.CreateDirectory(folder);
        var result = BuildPipeline.BuildPlayer(new[] { LegacyMigrationSetup.ScenePath }, folder + "/" + suffix, target, BuildOptions.None);
        if (result.summary.result != BuildResult.Succeeded) throw new Exception("Unity release build failed: " + result.summary.result);
        Debug.Log("VTT_RELEASE_BUILD_PASS: " + target + " / " + UnityRelease.Version);
    }
}

// Preserve Unity's own launcher manifest; add only this plugin's permission/provider.
public sealed class UnityUpdaterManifest : IPostGenerateGradleAndroidProject
{
    public int callbackOrder => 100;
    public void OnPostGenerateGradleAndroidProject(string path)
    {
        string file = Path.Combine(path, "src/main/AndroidManifest.xml"); var xml = new XmlDocument(); xml.Load(file);
        const string ns = "http://schemas.android.com/apk/res/android";
        var manifest = xml.DocumentElement;
        // Unity can reuse this generated manifest for incremental builds.
        foreach (XmlElement existing in manifest.SelectNodes("uses-permission"))
            if (existing.GetAttribute("name", ns) == "android.permission.REQUEST_INSTALL_PACKAGES") manifest.RemoveChild(existing);
        var permission = xml.CreateElement("uses-permission"); permission.SetAttribute("name", ns, "android.permission.REQUEST_INSTALL_PACKAGES"); manifest.AppendChild(permission);
        var app = (XmlElement)manifest.SelectSingleNode("application");
        // The launcher owns android:label; setting it on unityLibrary conflicts during manifest merging.
        // Remove the old callback's literal from reused generated manifests as well.
        if (app.GetAttribute("label", ns) == "DnD VTT Unity") app.RemoveAttribute("label", ns);
        foreach (XmlElement existing in app.SelectNodes("provider"))
            if (existing.GetAttribute("name", ns) == "com.dndvtt.unityupdater.UpdateProvider") app.RemoveChild(existing);
        var provider = xml.CreateElement("provider"); provider.SetAttribute("name", ns, "com.dndvtt.unityupdater.UpdateProvider");
        provider.SetAttribute("authorities", ns, UnityRelease.Package + ".updates"); provider.SetAttribute("exported", ns, "false"); provider.SetAttribute("grantUriPermissions", ns, "true");
        app.AppendChild(provider); xml.Save(file);
    }
}

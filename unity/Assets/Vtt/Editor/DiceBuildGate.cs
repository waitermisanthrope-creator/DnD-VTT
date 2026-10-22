using System;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

// PhysX local scenes exist only in Play Mode. Persist only non-secret gate state
// across domain reloads; never weaken the build gate to an edit-mode mock.
[InitializeOnLoad]
public static class DiceBuildGate
{
    private const string Target="VttDice.BuildTarget",Phase="VttDice.BuildPhase",Deadline="VttDice.CleanupDeadline";
    static DiceBuildGate()
    {
        EditorApplication.playModeStateChanged+=state=> { if(state==PlayModeStateChange.EnteredPlayMode||state==PlayModeStateChange.EnteredEditMode)Resume(); };
        EditorApplication.update+=Update;
        EditorApplication.delayCall+=Resume;
    }
    public static void Begin(string target)
    {
        if(target!="Android"&&target!="Windows")throw new ArgumentException(nameof(target));
        if(EditorApplication.isPlayingOrWillChangePlaymode)throw new InvalidOperationException("Dice gate must start in Edit Mode");
        SessionState.SetString(Target,target);SessionState.SetString(Phase,"play");
        EditorSceneManager.NewScene(NewSceneSetup.EmptyScene,NewSceneMode.Single);
        EditorApplication.EnterPlaymode();
    }
    private static void Resume()
    {
        string target=SessionState.GetString(Target,"");if(target=="")return;
        string phase=SessionState.GetString(Phase,"");
        if(phase=="play"&&EditorApplication.isPlaying) {
            SessionState.SetString(Phase,"validate");
            EditorApplication.delayCall+=Validate;
        } else if(phase=="build"&&!EditorApplication.isPlayingOrWillChangePlaymode) {
            SessionState.SetString(Phase,"building");
            try {
                if(target=="Android")UnityReleaseBuild.CloudAndroidAfterDice();else UnityReleaseBuild.CloudWindowsAfterDice();
                SessionState.EraseString(Target);SessionState.EraseString(Phase);EditorApplication.Exit(0);
            }catch(Exception error) { Fail(error); }
        }
    }
    private static void Validate()
    {
        try {
            DiceValidation.Run();
            SessionState.SetFloat(Deadline,(float)EditorApplication.timeSinceStartup+15);
            SessionState.SetString(Phase,"cleanup");
        }catch(Exception error) { Fail(error); }
    }
    private static void Update()
    {
        if(SessionState.GetString(Phase,"")!="cleanup"||!EditorApplication.isPlaying)return;
        if(SceneManager.sceneCount==DiceValidation.ExpectedSceneCount) {
            Debug.Log("VTT_DICE_PLAYMODE_CLEANUP_PASS: async local scene unload completed");
            SessionState.SetString(Phase,"build");EditorApplication.ExitPlaymode();
        }else if(EditorApplication.timeSinceStartup>SessionState.GetFloat(Deadline,0))Fail(new Exception("Dice physics scene did not unload"));
    }
    private static void Fail(Exception error)
    {
        Debug.LogException(error);SessionState.EraseString(Target);SessionState.EraseString(Phase);EditorApplication.Exit(1);
    }
}

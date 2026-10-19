Unicode true
!include "MUI2.nsh"
!include "FileFunc.nsh"
!include "LogicLib.nsh"
!ifndef VERSION
  !error "VERSION required"
!endif
Name "DnD VTT Unity ${VERSION}"
OutFile "${OUTPUT}"
InstallDir "$LOCALAPPDATA\Programs\DnD VTT Unity"
InstallDirRegKey HKCU "Software\DnDVttUnity" "InstallDir"
RequestExecutionLevel user
SetCompressor /SOLID lzma
CRCCheck force
VIProductVersion "${NUMVERSION}"
VIAddVersionKey "ProductName" "DnD VTT Unity"
VIAddVersionKey "FileVersion" "${VERSION}"
VIAddVersionKey "ProductVersion" "${VERSION}"
VIAddVersionKey "FileDescription" "DnD VTT Unity Setup"
VIAddVersionKey "LegalCopyright" "DnD VTT"
!define MUI_ABORTWARNING
!define MUI_FINISHPAGE_RUN "$INSTDIR\DndVtt.exe"
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "Russian"
!insertmacro MUI_LANGUAGE "English"
Var UpdatePid
Var NoLaunch
Function .onInit
  ${GetParameters} $R0
  ${GetOptions} $R0 "/NOAUTORUN=" $NoLaunch
  ${GetOptions} $R0 "/UPDATEPID=" $UpdatePid
  ${If} $UpdatePid != ""
    System::Call 'kernel32::OpenProcess(i 0x100000, i 0, i $UpdatePid) p.r0'
    ${If} $0 != 0
      System::Call 'kernel32::WaitForSingleObject(p r0, i 60000) i.r1'
      System::Call 'kernel32::CloseHandle(p r0)'
      ${If} $1 != 0
        MessageBox MB_ICONSTOP "Не удалось дождаться закрытия приложения. Запустите установку повторно."
        Abort
      ${EndIf}
    ${EndIf}
  ${EndIf}
FunctionEnd
Section "DnD VTT Unity"
  SetOutPath "$INSTDIR"
  SetOverwrite on
  File /r "${PAYLOAD}\*.*"
  WriteUninstaller "$INSTDIR\Uninstall.exe"
  WriteINIStr "$INSTDIR\install.ini" "App" "id" "com.dndvtt.unity"
  WriteRegStr HKCU "Software\DnDVttUnity" "InstallDir" "$INSTDIR"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\DnDVttUnity" "DisplayName" "DnD VTT Unity"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\DnDVttUnity" "DisplayVersion" "${VERSION}"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\DnDVttUnity" "UninstallString" '$\"$INSTDIR\Uninstall.exe$\"'
  WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\DnDVttUnity" "NoModify" 1
  CreateShortcut "$DESKTOP\DnD VTT Unity.lnk" "$INSTDIR\DndVtt.exe"
  CreateDirectory "$SMPROGRAMS\DnD VTT Unity"
  CreateShortcut "$SMPROGRAMS\DnD VTT Unity\DnD VTT Unity.lnk" "$INSTDIR\DndVtt.exe"
SectionEnd
Function .onInstSuccess
  IfSilent 0 done
  ${If} $NoLaunch != "1"
    Exec '$\"$INSTDIR\DndVtt.exe$\"'
  ${EndIf}
  done:
FunctionEnd
Section "Uninstall"
  ; Never touch AppData/LocalLow or saved characters/preferences.
  ReadINIStr $R0 "$INSTDIR\install.ini" "App" "id"
  ${If} $R0 != "com.dndvtt.unity"
    Abort
  ${EndIf}
  ; Generated from the exact packaged payload: delete only known program files,
  ; remove empty directories, and retain any files added by the user.
  !include "${UNINSTALL_FILES}"
  Delete "$INSTDIR\install.ini"
  Delete "$INSTDIR\Uninstall.exe"
  RMDir "$INSTDIR"
  Delete "$DESKTOP\DnD VTT Unity.lnk"
  Delete "$SMPROGRAMS\DnD VTT Unity\DnD VTT Unity.lnk"
  RMDir "$SMPROGRAMS\DnD VTT Unity"
  DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\DnDVttUnity"
  DeleteRegKey HKCU "Software\DnDVttUnity"
SectionEnd

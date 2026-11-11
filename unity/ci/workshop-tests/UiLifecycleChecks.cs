using System;
using System.IO;
using System.Linq;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
static class UiLifecycleChecks
{
 public static int Run(string root)
 {
  int n=0;
  foreach(string name in new[]{"LegacySessionPanel.Branding.cs","LegacySessionPanel.cs"})
  {
   var tree=CSharpSyntaxTree.ParseText(File.ReadAllText(Path.Combine(root,"unity/Assets/Vtt/Runtime",name)));
   foreach(var method in tree.GetRoot().DescendantNodes().OfType<MethodDeclarationSyntax>().Where(m=>m.Identifier.Text=="OnApplicationPause"||m.Identifier.Text=="OnApplicationFocus"))
   {if(method.DescendantNodes().OfType<InvocationExpressionSyntax>().Any(i=>i.Expression.ToString()=="InvalidateBrandStyles"))throw new Exception("Resume must preserve cached style backgrounds, not destroy their shared textures: "+method.Identifier.Text);n++;}
  }
  return n+GuiStyleResetChecks.Run(root);
 }
}

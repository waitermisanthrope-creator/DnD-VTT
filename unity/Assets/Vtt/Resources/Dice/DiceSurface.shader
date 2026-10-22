Shader "DnDVtt/DiceSurface" {
    Properties { _Color ("Color", Color) = (0.2,0.4,0.65,1) _Accent ("Accent", Color) = (1,.8,.3,1) _Pattern ("Pattern", Float) = 0 }
    SubShader {
        Tags { "RenderType"="Opaque" } Pass {
            ZWrite On Cull Back
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            fixed4 _Color,_Accent;float _Pattern;
            struct appdata { float4 vertex:POSITION; float3 normal:NORMAL; };
            struct v2f { float4 pos:SV_POSITION; float3 normal:TEXCOORD0; float3 world:TEXCOORD1;float3 local:TEXCOORD2; };
            v2f vert(appdata v) { v2f o;o.pos=UnityObjectToClipPos(v.vertex);o.normal=UnityObjectToWorldNormal(v.normal);o.local=v.vertex.xyz;o.world=mul(unity_ObjectToWorld,v.vertex).xyz;return o; }
            fixed4 frag(v2f i):SV_Target {
                float3 n=normalize(i.normal);float light=.35+.65*saturate(dot(n,normalize(float3(-.4,1,-.6))));
                float3 view=normalize(_WorldSpaceCameraPos-i.world);float spec=pow(saturate(dot(n,normalize(view+normalize(float3(-.4,1,-.6))))),32);
                float vein=pow(saturate(sin(i.local.x*37+sin(i.local.z*23)*3)*sin(i.local.y*31+i.local.z*19)),10)*_Pattern;
                float3 baseColor=lerp(_Color.rgb,_Accent.rgb,vein*.4);
                return fixed4(baseColor*light+spec*.28,1);
            }
            ENDCG
        }
    }
}

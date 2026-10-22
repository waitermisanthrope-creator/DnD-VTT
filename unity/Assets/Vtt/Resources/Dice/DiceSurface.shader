Shader "DnDVtt/DiceSurface" {
    Properties { _Color ("Color", Color) = (0.2,0.4,0.65,1) }
    SubShader {
        Tags { "RenderType"="Opaque" } Pass {
            ZWrite On Cull Back
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            fixed4 _Color;
            struct appdata { float4 vertex:POSITION; float3 normal:NORMAL; };
            struct v2f { float4 pos:SV_POSITION; float3 normal:TEXCOORD0; float3 world:TEXCOORD1; };
            v2f vert(appdata v) { v2f o;o.pos=UnityObjectToClipPos(v.vertex);o.normal=UnityObjectToWorldNormal(v.normal);o.world=mul(unity_ObjectToWorld,v.vertex).xyz;return o; }
            fixed4 frag(v2f i):SV_Target {
                float3 n=normalize(i.normal);float light=.35+.65*saturate(dot(n,normalize(float3(-.4,1,-.6))));
                float3 view=normalize(_WorldSpaceCameraPos-i.world);float spec=pow(saturate(dot(n,normalize(view+normalize(float3(-.4,1,-.6))))),32);
                return fixed4(_Color.rgb*light+spec*.28,1);
            }
            ENDCG
        }
    }
}

Shader "DnDVtt/DiceNumeral" {
    Properties { _MainTex ("Font atlas", 2D) = "white" {} }
    SubShader {
        Tags { "Queue"="AlphaTest" "RenderType"="TransparentCutout" }
        Pass {
            Cull Off ZTest LEqual ZWrite On
            Blend SrcAlpha OneMinusSrcAlpha
            // No slope depth bias: near-edge planes can otherwise pull rear glyphs forward on mobile.
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            sampler2D _MainTex;float4 _MainTex_TexelSize;
            struct appdata { float4 vertex:POSITION; float2 uv:TEXCOORD0;fixed4 color:COLOR; };
            struct v2f { float4 pos:SV_POSITION;float2 uv:TEXCOORD0;fixed4 color:COLOR; };
            v2f vert(appdata v) { v2f o;o.pos=UnityObjectToClipPos(v.vertex);o.uv=v.uv;o.color=v.color;return o; }
            fixed4 frag(v2f i):SV_Target {
                float2 dx=float2(_MainTex_TexelSize.x,0),dy=float2(0,_MainTex_TexelSize.y);
                fixed ink=tex2D(_MainTex,i.uv).a;
                fixed edge=max(ink,max(max(tex2D(_MainTex,i.uv+dx).a,tex2D(_MainTex,i.uv-dx).a),max(tex2D(_MainTex,i.uv+dy).a,tex2D(_MainTex,i.uv-dy).a)));
                fixed4 color;color.rgb=lerp(float3(.018,.012,.01),i.color.rgb,ink/max(edge,.001));color.a=edge*i.color.a;
                clip(color.a-.06);return color;
            }
            ENDCG
        }
    }
}

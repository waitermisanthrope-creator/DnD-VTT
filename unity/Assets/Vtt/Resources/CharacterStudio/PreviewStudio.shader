Shader "DnDVtt/CharacterStudio"
{
    Properties
    {
        [MainTexture] _BaseMap ("Skin", 2D) = "white" {}
        [MainColor] _BaseColor ("Tint", Color) = (1,1,1,1)
        _Smoothness ("Smoothness", Range(0,1)) = 0.32
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" "Queue"="Geometry" }
        Pass
        {
            // A fixed portrait rig keeps this preview independent of map lights,
            // ambient probes and the first-frame URP main-light selection.
            ZWrite On ZTest LEqual Cull Back
            HLSLPROGRAM
            #pragma target 3.0
            #pragma vertex Vert
            #pragma fragment Frag
            #include "UnityCG.cginc"
            sampler2D _BaseMap;
            float4 _BaseMap_ST;
            float4 _BaseColor;
            float _Smoothness;
            struct Attributes { float4 position : POSITION; float3 normal : NORMAL; float2 uv : TEXCOORD0; };
            struct Varyings { float4 position : SV_POSITION; float3 normal : TEXCOORD0; float2 uv : TEXCOORD1; float3 world : TEXCOORD2; };
            Varyings Vert(Attributes input)
            {
                Varyings output;
                output.position = UnityObjectToClipPos(input.position);
                output.normal = UnityObjectToWorldNormal(input.normal);
                output.uv = TRANSFORM_TEX(input.uv, _BaseMap);
                output.world = mul(unity_ObjectToWorld, input.position).xyz;
                return output;
            }
            float4 Frag(Varyings input) : SV_Target
            {
                float3 normal = normalize(input.normal);
                float3 view = normalize(_WorldSpaceCameraPos.xyz - input.world);
                float3 key = normalize(float3(-0.45, 0.7, 1));
                float3 fill = normalize(float3(0.8, 0.3, 0.5));
                float3 rim = normalize(float3(0.1, 0.5, -1));
                float3 light = float3(0.28, 0.29, 0.32)
                    + float3(0.8, 0.74, 0.67) * saturate(dot(normal, key))
                    + float3(0.18, 0.23, 0.3) * saturate(dot(normal, fill))
                    + float3(0.22, 0.25, 0.3) * saturate(dot(normal, rim));
                float specular = pow(saturate(dot(normal, normalize(key + view))), lerp(16, 96, _Smoothness))
                    * saturate(dot(normal, key)) * 0.08;
                float3 skin = tex2D(_BaseMap, input.uv).rgb * _BaseColor.rgb;
                return float4(skin * light + specular, 1);
            }
            ENDHLSL
        }
    }
}

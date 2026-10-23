Shader "DnDVtt/DiceSurface" {
    Properties { _Color ("Color", Color) = (0.2,0.4,0.65,1) _Accent ("Accent", Color) = (1,.8,.3,1) _Pattern ("Pattern", Float) = 0 _MainTex ("Material atlas", 2D) = "white" {} _Textured ("Use material atlas", Float) = 0 _Tile ("Atlas quadrant", Float) = 0 _Numbered ("Numbered material", Float) = 0 _Motion ("Organic motion", Float) = 0 _Clock ("Animation clock", Float) = 0 _Gloss ("Gloss", Float) = 0.4 _Squash ("Jelly squash", Float) = 0 }
    SubShader {
        Tags { "RenderType"="Opaque" } Pass {
            ZWrite On ZTest LEqual Cull Back
            CGPROGRAM
            #pragma target 3.0
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            fixed4 _Color,_Accent;float _Pattern,_Textured,_Tile,_Numbered,_Motion,_Clock,_Gloss,_Squash;sampler2D _MainTex;
            struct appdata { float4 vertex:POSITION; float3 normal:NORMAL;float2 uv:TEXCOORD0; };
            struct v2f { float4 pos:SV_POSITION; float3 normal:TEXCOORD0; float3 world:TEXCOORD1;float3 local:TEXCOORD2;float2 uv:TEXCOORD3; };
            v2f vert(appdata v) {
                // Decorations deform only; the stable numbered core remains readable.
                float weight=saturate((length(v.vertex.xyz)-.48)*4);
                v.vertex.xyz+=_Motion*weight*.035*float3(sin(_Clock*1.7+v.vertex.y*6),cos(_Clock*1.3+v.vertex.z*5),sin(_Clock*1.5+v.vertex.x*7));
                v.vertex.xyz*=float3(1+_Squash*.45,1-_Squash,1+_Squash*.45);
                v2f o;o.pos=UnityObjectToClipPos(v.vertex);o.normal=UnityObjectToWorldNormal(v.normal);o.local=v.vertex.xyz;o.world=mul(unity_ObjectToWorld,v.vertex).xyz;o.uv=v.uv;return o; }
            fixed4 frag(v2f i):SV_Target {
                float3 n=normalize(i.normal);float3 lightDir=normalize(float3(-.4,1,-.6));
                float3 view=normalize(_WorldSpaceCameraPos-i.world);
                float vein=pow(saturate(sin(i.local.x*37+sin(i.local.z*23)*3)*sin(i.local.y*31+i.local.z*19)),10)*_Pattern;
                float3 baseColor=lerp(_Color.rgb,_Accent.rgb,vein*.4);
                float2 offset=float2(fmod(_Tile,2),1-floor(_Tile/2))*.5;
                float2 uv=offset+lerp(.003,.497,saturate(i.uv));
                if(_Numbered>.5)uv=_Tile<0?i.uv:float2((fmod(_Tile,10)+lerp(.025,.975,saturate(i.uv.x)))/10,(8-floor(_Tile/10)+lerp(.025,.975,saturate(i.uv.y)))/9);
                float3 tint=_Color.rgb/max(1,max(_Color.r,max(_Color.g,_Color.b)));
                float3 art=tex2D(_MainTex,uv).rgb*tint;
                baseColor=lerp(baseColor,art,_Textured);
                // Fine embossed surface response, derived in world space from the albedo.
                // Large protrusions remain actual convex collision geometry.
                float height=dot(art,float3(.2126,.7152,.0722));
                float3 dx=ddx(i.world),dy=ddy(i.world),rx=cross(dy,n),ry=cross(n,dx);
                float determinant=dot(dx,rx);
                n=normalize(n-.002*_Textured*sign(determinant)*(ddx(height)*rx+ddy(height)*ry)/max(abs(determinant),.00001));
                float light=.45+.55*saturate(dot(n,lightDir));
                float spec=pow(saturate(dot(n,normalize(view+lightDir))),lerp(12,100,_Gloss));
                float rim=pow(1-saturate(dot(n,view)),4);
                return fixed4(baseColor*light+spec*lerp(.08,.45,_Gloss)+rim*_Accent.rgb*.08*_Textured,1);
            }
            ENDCG
        }
    }
}

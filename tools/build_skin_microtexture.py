"""Deterministic linear-data micro normal RGB + roughness A. No colour photograph is edited."""
from pathlib import Path
import math, random
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
N=256
rng=random.Random(7400061)
pores=[(rng.random()*N,rng.random()*N,rng.uniform(1.3,3.0),rng.uniform(.015,.045)) for _ in range(150)]
height=[0.0]*(N*N)
for cx,cy,radius,depth in pores:
 reach=math.ceil(radius*3)
 for yy in range(math.floor(cy)-reach,math.floor(cy)+reach+1):
  for xx in range(math.floor(cx)-reach,math.floor(cx)+reach+1):
   d=((xx-cx)**2+(yy-cy)**2)/(radius*radius)
   height[(yy%N)*N+xx%N]-=depth*math.exp(-d)
image=Image.new('RGBA',(N,N));pixels=[]
for y in range(N):
 for x in range(N):
  gx=(height[y*N+(x+1)%N]-height[y*N+(x-1)%N])*2
  gy=(height[((y+1)%N)*N+x]-height[((y-1)%N)*N+x])*2
  length=math.sqrt(gx*gx+gy*gy+1)
  rough=.56+.055*math.sin(x*2*math.pi/N)*math.sin(y*4*math.pi/N)+min(.07,abs(height[y*N+x]))
  pixels.append((round((-gx/length*.5+.5)*255),round((-gy/length*.5+.5)*255),round((1/length*.5+.5)*255),round(rough*255)))
image.putdata(pixels)
out=ROOT/'app/assets/3d/makehuman/materials/skin_micro_normal_roughness.png'
image.save(out)
print('SKIN_MICRO_MAP_OK',out.name,N,'RGBA; normal RGB, roughness A')

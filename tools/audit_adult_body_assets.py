"""Read-only, reproducible audit of the shipped body GLBs (requires numpy/Pillow)."""
import argparse
import hashlib
import json
import struct
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def read_glb(path):
    data = path.read_bytes()
    magic, version, length = struct.unpack_from('<4sII', data)
    if magic != b'glTF' or version != 2 or length != len(data):
        raise ValueError('Invalid GLB header: ' + str(path))
    offset, document, binary = 12, None, None
    while offset < length:
        size, kind = struct.unpack_from('<II', data, offset)
        chunk = data[offset + 8:offset + 8 + size]
        if kind == 0x4E4F534A:
            document = json.loads(chunk)
        elif kind == 0x004E4942:
            binary = chunk
        offset += 8 + size
    return document, binary, data


def accessor(document, binary, index):
    item = document['accessors'][index]
    view = document['bufferViews'][item['bufferView']]
    dtype = {5120: 'i1', 5121: 'u1', 5122: '<i2', 5123: '<u2', 5125: '<u4', 5126: '<f4'}[item['componentType']]
    count = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}[item['type']]
    width = np.dtype(dtype).itemsize
    return np.ndarray((item['count'], count), dtype=dtype, buffer=binary,
                      offset=view.get('byteOffset', 0) + item.get('byteOffset', 0),
                      strides=(view.get('byteStride', width * count), width)).copy()


def topology(positions, triangles):
    unique, ids = np.unique(np.round(positions, 6), axis=0, return_inverse=True)
    faces = ids[triangles]
    edges = np.sort(np.concatenate((faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [2, 0]])), axis=1)
    edges, counts = np.unique(edges, axis=0, return_counts=True)
    parent = list(range(len(unique)))

    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    for a, b in edges:
        a, b = find(int(a)), find(int(b))
        if a != b:
            parent[b] = a
    roots = {find(int(i)) for i in np.unique(faces)}
    area = np.linalg.norm(np.cross(positions[triangles[:, 1]] - positions[triangles[:, 0]],
                                   positions[triangles[:, 2]] - positions[triangles[:, 0]]), axis=1)
    return dict(weldTolerance=1e-6, uniquePositions=len(unique), seamDuplicates=len(positions)-len(unique),
                weldedBoundaryEdges=int(np.sum(counts == 1)), weldedNonManifoldEdges=int(np.sum(counts > 2)),
                connectedComponents=len(roots), degenerateTriangles=int(np.sum(area < 1e-12)))


def audit(path):
    document, binary, data = read_glb(ROOT / path)
    parts = []
    for mesh in document.get('meshes', []):
        for primitive in mesh['primitives']:
            attributes = {key: accessor(document, binary, value) for key, value in primitive['attributes'].items()}
            positions = attributes['POSITION']
            triangles = accessor(document, binary, primitive['indices']).reshape(-1, 3)
            if int(triangles.max()) >= len(positions):
                raise ValueError('Out-of-range index')
            weights = attributes.get('WEIGHTS_0')
            uv = attributes.get('TEXCOORD_0')
            parts.append(dict(vertices=len(positions), triangles=len(triangles), indexComponentType=document['accessors'][primitive['indices']]['componentType'],
                              attributes=list(attributes), nonFiniteValues={k:int(np.sum(~np.isfinite(v))) for k,v in attributes.items()},
                              rawBounds=[positions.min(axis=0).tolist(), positions.max(axis=0).tolist()],
                              uvRange=[uv.min(axis=0).tolist(), uv.max(axis=0).tolist()] if uv is not None else None,
                              uvOutsideUnitSquare=int(np.sum(np.any((uv < 0) | (uv > 1), axis=1))) if uv is not None else None,
                              weightSumMaxError=float(np.max(np.abs(weights.sum(axis=1)-1))) if weights is not None else None,
                              zeroWeightVertices=int(np.sum(weights.sum(axis=1)==0)) if weights is not None else None,
                              morphNames=mesh.get('extras', {}).get('targetNames', []),
                              topology=topology(positions, triangles)))
    return dict(path=path, bytes=len(data), sha256=hashlib.sha256(data).hexdigest(), primitives=parts,
                bones=[[document['nodes'][i].get('name', '') for i in s['joints']] for s in document.get('skins', [])],
                animationClips=[a.get('name', '') for a in document.get('animations', [])],
                materials=document.get('materials', []), meshMetadata=[n.get('extras', {}) for n in document['nodes'] if 'mesh' in n],
                embeddedMorphChannels=document.get('extras', {}).get('dndMorphChannels', {}))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    report = dict(schema=1, files=[audit(p) for p in ['human-base-rigged.glb', 'app/assets/3d/makehuman/human-body-morphs.glb']],
                  editorMorphs=json.loads((ROOT / 'app/assets/3d/makehuman/editor-morphs.json').read_text()),
                  skins=[dict(path=str(p.relative_to(ROOT)), pixels=list(Image.open(p).size), bytes=p.stat().st_size,
                              sha256=hashlib.sha256(p.read_bytes()).hexdigest()) for p in sorted((ROOT/'app/assets/3d/makehuman/skins').rglob('*.png'))])
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
    for item in report['files']:
        print(item['path'], json.dumps(item['primitives'][0]['topology']))
    print('ADULT_BODY_ASSET_AUDIT_OK', args.output)


if __name__ == '__main__':
    main()

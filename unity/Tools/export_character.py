"""Blender 4.x: merge verified WebView morphs, export FBX, and round-trip audit.
blender --background --python-exit-code 1 --python unity/Tools/export_character.py
"""
import bpy, hashlib, json, struct, tempfile
import numpy as np
from pathlib import Path
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'app/assets/3d/makehuman'
OUT = ROOT / 'unity/Assets/Vtt/Resources/CharacterStudio'

def sha(data): return hashlib.sha256(data).hexdigest()
def require(condition, message):
    if not condition: raise RuntimeError(message)

def export():
    raw = (SRC / 'human-body-morphs.glb').read_bytes()
    json_size = struct.unpack_from('<I', raw, 12)[0]
    doc = json.loads(raw[20:20 + json_size])
    binary = bytearray(raw[28 + json_size:])
    primitive = doc['meshes'][0]['primitives'][0]
    positions = doc['accessors'][primitive['attributes']['POSITION']]
    position_view = doc['bufferViews'][positions['bufferView']]
    start = position_view.get('byteOffset', 0) + positions.get('byteOffset', 0)
    count = positions['count']
    meta = json.loads((SRC / 'editor-morphs.json').read_text())
    sparse = (SRC / meta['binary']).read_bytes()
    require(count == meta['vertexCount'], 'Morph vertex count mismatch')
    require(sha(binary[start:start + count * 12]) == meta['basePositionsSha256'], 'Base hash mismatch')
    require(sha(sparse) == meta['binarySha256'], 'Sparse morph hash mismatch')
    channels = dict(doc['extras']['dndMorphChannels'])
    channels.update(meta['channels'])
    names = doc['meshes'][0]['extras']['targetNames']
    for target in meta['targets']:
        require(target['name'] not in names, 'Duplicate morph')
        delta = bytearray(count * 12)
        previous = -1
        for i in range(target['count']):
            at = target['offset'] + i * 16
            vertex, x, y, z = struct.unpack_from('<Ifff', sparse, at)
            require(previous < vertex < count, 'Invalid sparse vertex')
            require(all(__import__('math').isfinite(v) for v in (x, y, z)), 'Non-finite morph')
            struct.pack_into('<fff', delta, vertex * 12, x, y, z)
            previous = vertex
        binary.extend(b'\0' * (-len(binary) % 4))
        view = len(doc['bufferViews'])
        doc['bufferViews'].append({'buffer': 0, 'byteOffset': len(binary), 'byteLength': len(delta), 'target': 34962})
        accessor = len(doc['accessors'])
        doc['accessors'].append({'bufferView': view, 'componentType': 5126, 'type': 'VEC3', 'count': count})
        primitive['targets'].append({'POSITION': accessor})
        names.append(target['name'])
        doc['meshes'][0]['weights'].append(0)
        binary.extend(delta)
    doc['buffers'][0]['byteLength'] = len(binary)
    jb = json.dumps(doc, separators=(',', ':')).encode()
    jb += b' ' * (-len(jb) % 4)
    binary.extend(b'\0' * (-len(binary) % 4))
    merged = struct.pack('<III', 0x46546C67, 2, 28 + len(jb) + len(binary))
    merged += struct.pack('<II', len(jb), 0x4E4F534A) + jb
    merged += struct.pack('<II', len(binary), 0x004E4942) + binary
    OUT.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.read_factory_settings(use_empty=True)
    with tempfile.TemporaryDirectory() as folder:
        glb = Path(folder) / 'merged.glb'
        glb.write_bytes(merged)
        bpy.ops.import_scene.gltf(filepath=str(glb), merge_vertices=False)
    meshes = [o for o in bpy.context.scene.objects if o.type == 'MESH' and o.data.shape_keys]
    rigs = [o for o in bpy.context.scene.objects if o.type == 'ARMATURE']
    require(len(meshes) == len(rigs) == 1, 'Expected one body and one rig')
    body, rig = meshes[0], rigs[0]
    body.name = 'HumanBody'
    rig.name = 'HumanRig'
    expected_bones = len(rig.data.bones)
    expected_triangles = sum(len(p.vertices) - 2 for p in body.data.polygons)
    expected_shapes = set(names)
    require(set(k.name for k in body.data.shape_keys.key_blocks[1:]) == expected_shapes, 'Missing imported morphs')
    expected_extents = tuple(max(v.co[k] for v in body.data.vertices) - min(v.co[k] for v in body.data.vertices) for k in range(3))
    expected_coordinates = {}
    for key in body.data.shape_keys.key_blocks:
        coordinates = np.empty(len(key.data) * 3, dtype=np.float32)
        key.data.foreach_get('co', coordinates)
        expected_coordinates[key.name] = coordinates
    bpy.ops.object.select_all(action='DESELECT')
    body.select_set(True)
    rig.select_set(True)
    bpy.context.view_layer.objects.active = rig
    fbx = OUT / 'HumanBody.fbx'
    bpy.ops.export_scene.fbx(filepath=str(fbx), use_selection=True, object_types={'ARMATURE', 'MESH'},
        use_mesh_modifiers=False, add_leaf_bones=False, bake_anim=False,
        axis_forward='-Z', axis_up='Y', apply_unit_scale=True, mesh_smooth_type='FACE', path_mode='STRIP')
    # Re-import the actual deliverable rather than assuming the exporter retained its data.
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.fbx(filepath=str(fbx), use_anim=False)
    bodies = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    armatures = [o for o in bpy.context.scene.objects if o.type == 'ARMATURE']
    require(len(bodies) == len(armatures) == 1, 'FBX object round-trip failed')
    imported = bodies[0]
    require(len(armatures[0].data.bones) == expected_bones == 53, 'Rig was changed')
    require(sum(len(p.vertices)-2 for p in imported.data.polygons) == expected_triangles == 107024, 'Topology was changed')
    require(set(k.name for k in imported.data.shape_keys.key_blocks[1:]) == expected_shapes, 'FBX lost morphs')
    max_coordinate_error = 0.0
    for key in imported.data.shape_keys.key_blocks:
        coordinates = np.empty(len(key.data) * 3, dtype=np.float32)
        key.data.foreach_get('co', coordinates)
        expected = expected_coordinates[key.name]
        require(coordinates.shape == expected.shape, 'FBX changed vertex count')
        error = float(np.max(np.abs(coordinates - expected)))
        require(error < 1e-4, 'FBX changed shape coordinates: ' + key.name)
        max_coordinate_error = max(max_coordinate_error, error)
    extents = tuple(max(v.co[k] for v in imported.data.vertices)-min(v.co[k] for v in imported.data.vertices) for k in range(3))
    require(max(abs(a-b) for a,b in zip(extents,expected_extents)) < 1e-4, 'FBX scale changed')
    female = imported.data.shape_keys.key_blocks['human-female']
    require(max((a.co-b.co).length for a,b in zip(female.data,imported.data.shape_keys.key_blocks[0].data)) > .05, 'Female morph is empty')
    result = {'schema': 1, 'sourceGlbSha256': sha(raw), 'sourceSparseSha256': sha(sparse),
        'fbxSha256': sha(fbx.read_bytes()), 'triangles': expected_triangles, 'bones': expected_bones,
        'baseHeight': positions['max'][1] - positions['min'][1],
        'morphNames': names, 'channels': channels, 'maxCoordinateRoundTripError': max_coordinate_error,
        'validation': 'Blender FBX export/reimport: bones, triangles, all shape coordinates, morph names, scale, nonempty female target',
        'unityValidation': 'Not run: Unity Editor unavailable in execution environment'}
    (OUT / 'MorphCatalog.json').write_text(json.dumps(result, indent=2) + '\n')
    print('UNITY_CHARACTER_EXPORT_OK', json.dumps({'bones': expected_bones, 'triangles': expected_triangles, 'morphs': len(names), 'bytes': fbx.stat().st_size}))

export()

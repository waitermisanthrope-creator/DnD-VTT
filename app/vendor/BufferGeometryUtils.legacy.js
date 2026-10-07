/* Offline WebView legacy bridge. */
/**
 * Minimal Three.js BufferGeometryUtils subset required by the bundled GLTFLoader.
 * Kept local/offline so the Android WebView does not depend on external modules.
 */
function toTrianglesDrawMode(geometry, drawMode) {
  if (drawMode !== 5 && drawMode !== 6) return geometry;
  var index = geometry.getIndex();
  var numberOfTriangles = index ? index.count - 2 : geometry.attributes.position.count - 2;
  if (numberOfTriangles < 1) return geometry;
  var newIndices = [];
  if (drawMode === 6) {
    var a = index ? index.getX(0) : 0;
    for (var i = 1; i <= numberOfTriangles; i++) {
      var b = index ? index.getX(i) : i;
      var c = index ? index.getX(i + 1) : i + 1;
      newIndices.push(a, b, c);
    }
  } else {
    for (var j = 0; j < numberOfTriangles; j++) {
      var x = index ? index.getX(j) : j;
      var y = index ? index.getX(j + 1) : j + 1;
      var z = index ? index.getX(j + 2) : j + 2;
      if (j % 2 === 0) newIndices.push(x, y, z);
      else newIndices.push(y, x, z);
    }
  }
  geometry.setIndex(newIndices);
  return geometry;
}
globalThis.DND_BufferGeometryUtils={toTrianglesDrawMode};

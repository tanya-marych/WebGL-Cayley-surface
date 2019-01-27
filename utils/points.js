getX = (u,v) => u + v;
getY = (u,v) => (Math.pow(u,2)+Math.pow(v,2))/2 + a*(v-u);
getZ = (u,v) => (Math.pow(u,3)+Math.pow(v,3))/3 + a*(Math.pow(v,2)-Math.pow(u,2));

function getPoints () {
    let positions = [];

    const pushPoint = val => val.map(i => positions.push(i));
    
    for (let u = -diapazon; u <= diapazon; u += step) {
        for (let v = -diapazon; v <= diapazon; v += step) {
            const u0 = u;
            const v0 = v;
            const u1 = u+step;
            const v1 = v+step;

            let x0 = getX(u0, v0);
            let y0 = getY(u0, v0);
            let z0 = getZ(u0, v0);

            //left top point
            let xL = getX(u0, v1);
            let yL = getY(u0, v1);
            let zL = getZ(u0, v1);

            let x1 = getX(u1, v1);
            let y1 = getY(u1, v1);
            let z1 = getZ(u1, v1);

            //right bottom point
            let xR = getX(u1, v0);
            let yR = getY(u1, v0);
            let zR = getZ(u1, v0);

            pushPoint([x0, z0, y0]);
            pushPoint([xL, zL, yL]);
            pushPoint([x1, z1, y1]);
            pushPoint([xR, zR, yR]);
        }
    }

    return positions;
}

function getIndices(positions) {
    let indices = [];
    const pushInd = val => val.map(i => indices.push(i));

    let i = 0;

    while (i < positions.length) {
        pushInd([i, i+1, i+3]);
        pushInd([i+1, i+2, i+3]);
        i = i + 4;
    }

    return indices;
}

function getFaces(positions) {
    let faces =[];
    let facesCount = positions.length / 2;

    for (let index = 0; index < facesCount; index++) {
        faces.push([Math.random(), Math.random(), Math.random(), 1.0]);
    }

    return faces;
}

function getTextureCoordinates(faces) {
  let coordinates = [];
  let texture = [
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
  ];

  for (var j = 0; j < faces.length; j++) {
    coordinates.push(...texture);
}

return coordinates;
}

function getFacesColors (faces) {
    let facesColors = [];

    for (var j = 0; j < faces.length; ++j) {
        const c = faces[j];
    
        // Repeat each color four times for the four vertices of the face
        facesColors = facesColors.concat(c, c, c, c);
    }

    return facesColors;
}
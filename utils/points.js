function getPoints () {
    let positions = [];

    const getZ = (x,y) => x*y - Math.pow(x,3)/6;
    const pushPoint = val => val.map(i => positions.push(i));
    
    for (let x = -diapazon; x < diapazon; x += step) {
        for (let y = -diapazon; y < diapazon; y += step) {
            let x0 = x;
            let y0 = y;
            let z0 = getZ(x0, y0);

            //left top point
            let xL = x0;
            let yL = y0 + step;
            let zL = getZ(xL, yL);

            let x1 = x + step;
            let y1 = y + step;
            let z1 = getZ(x1, y1);

            //right bottom point
            let xR = x0 + step;
            let yR = y0;
            let zR = getZ(xR, yR);

            const z = x*y - Math.pow(x,3)/6;

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
        pushInd([i, i+2, i+1]);
        pushInd([i, i+3, i+2]);
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
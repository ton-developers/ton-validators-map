type Point = { 
  coords: {
    x: number, 
    y: number
  }
}

export function connectDots(points: Point[]) {
  const lines: Point[][] = []
  //iterate through all points and calculate the center, c
  const c = {x:0, y:0};
  for (const p of points) {
    c.x+=p.coords.x;
    c.y+=p.coords.y;
  }

  c.x/=points.length;
  c.y/=points.length;


  points.sort((p1, p2) => {
    const dx1 = p1.coords.x-c.x;
    const dy1 = p1.coords.y-c.y;
    const a1 = Math.atan2(dy1, dx1);

    const dx2 = p2.coords.x-c.x;
    const dy2 = p2.coords.y-c.y;
    const a2 = Math.atan2(dy2, dx2);

    //If angles are the same, sort by length
    if (a1===a2){
      const d1 = dx1*dx1 + dy1*dy1;
      const d2 = dx2*dx2 + dy2*dy2;

      return d1-d2;
    }

    //otherwise sort by angle
    return a1-a2;
  })

  const n = points.length;

  //Iterate through all Points and draw lines between them
  for (let i=0; i<n; i++){
    //This is not real code \/
    lines.push([points[i], points[(i+1)%n]]);
  }
  console.log(lines)
  return lines
}
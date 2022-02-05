module.exports =
  /*
  
  FRONT rotation clockwise
  
      u6  u7  u8                  l8  l5  l2

  l2  f0  f1  f2  r0          d0  f6  f3  f0  u6
  
  l5  f3  f4  f5  r3    ==>   d1  f7  f4  f1  u7
  
  l8  f6  f7  f8  r6          d2  f8  f5  f2  u8
  
      d0  d1  d2                  r6  r3  r0
  
  */
  
  /*
  
  FRONT rotation anticlock
  
      u6  u7  u8                  r0  r3  r6

  l2  f0  f1  f2  r0          u8  f2  f5  f8  d2
  
  l5  f3  f4  f5  r3    ==>   u7  f1  f4  f7  d1
  
  l8  f6  f7  f8  r6          u6  f0  f3  f6  d0
  
      d0  d1  d2                  l2  l5  l8
  
  */
  
  /*
  
  FRONT rotation onlytwice
  
      u6  u7  u8                  d2  d1  d0

  l2  f0  f1  f2  r0          r6  f8  f7  f6  l8
  
  l5  f3  f4  f5  r3    ==>   r3  f5  f4  f3  l5
  
  l8  f6  f7  f8  r6          r0  f2  f1  f0  l2
  
      d0  d1  d2                  u8  u7  u6
  
  */
class rubik_cube {
  constructor() {
    this.cube = {
    // front
      f :
        [ 'f', 'f', 'f',
          'f', 'f', 'f',
          'f', 'f', 'f' ],
    // back
      b :
        [ 'b', 'b', 'b',
          'b', 'b', 'b',
          'b', 'b', 'b' ],
    // up
      u :
        [ 'u', 'u', 'u',
          'u', 'u', 'u',
          'u', 'u', 'u' ],
    //down
      d :
        [ 'd', 'd', 'd',
          'd', 'd', 'd',
          'd', 'd', 'd' ],
    // left
      l :
        [ 'l', 'l', 'l',
          'l', 'l', 'l',
          'l', 'l', 'l' ],
    // right
      r :
        [ 'r', 'r', 'r',
          'r', 'r', 'r',
          'r', 'r', 'r' ]
    };
  }

  rotate_front_clockwise() {
    this.rotate_face_clockwise('f');
    this.rotate_side_clockwise({
      u:{idx:[6,7,8],side:'u'},r:{idx:[0,3,6],side:'r'},d:{idx:[2,1,0],side:'d'},l:{idx:[8,5,2],side:'l'}
    });
    return this.cube;
  }
  
  rotate_front_anticlock() {
    this.rotate_face_anticlock('f');
    this.rotate_side_anticlock({
      u:{idx:[6,7,8],side:'u'},r:{idx:[0,3,6],side:'r'},d:{idx:[2,1,0],side:'d'},l:{idx:[8,5,2],side:'l'}
    });
    return this.cube;
  }
  
  rotate_front_onlytwice() {
    this.rotate_face_onlytwice('f');
    this.rotate_side_onlytwice({
      u:{idx:[6,7,8],side:'u'},r:{idx:[0,3,6],side:'r'},d:{idx:[2,1,0],side:'d'},l:{idx:[8,5,2],side:'l'}
    });
    return this.cube;
  }
  
  rotate_back_clockwise() {
    this.rotate_face_clockwise('b');
    this.rotate_side_clockwise({
      u:{idx:[2,1,0],side:'u'},r:{idx:[2,5,8],side:'l'},d:{idx:[6,7,8],side:'d'},l:{idx:[8,5,2],side:'r'}
    });
    return this.cube;
  }
  
  rotate_back_anticlock() {
    this.rotate_face_anticlock('b');
    this.rotate_side_anticlock({
      u:{idx:[2,1,0],side:'u'},r:{idx:[2,5,8],side:'l'},d:{idx:[6,7,8],side:'d'},l:{idx:[8,5,2],side:'r'}
    });
    return this.cube;
  }
  
  rotate_back_onlytwice() {
    this.rotate_face_onlytwice('b');
    this.rotate_side_onlytwice({
      u:{idx:[2,1,0],side:'u'},r:{idx:[2,5,8],side:'l'},d:{idx:[6,7,8],side:'d'},l:{idx:[8,5,2],side:'r'}
    });
    return this.cube;
  }
  
  rotate_left_clockwise() {
    this.rotate_face_clockwise('l');
    this.rotate_side_clockwise({
      u:{idx:[0,3,6],side:'u'},r:{idx:[0,3,6],side:'f'},d:{idx:[0,3,6],side:'d'},l:{idx:[8,5,2],side:'b'}
    });
    return this.cube;
  }
  
  rotate_left_anticlock() {
    this.rotate_face_anticlock('l');
    this.rotate_side_anticlock({
      u:{idx:[0,3,6],side:'u'},r:{idx:[0,3,6],side:'f'},d:{idx:[0,3,6],side:'d'},l:{idx:[8,5,2],side:'b'}
    });
    return this.cube;
  }
  
  rotate_left_onlytwice() {
    this.rotate_face_onlytwice('l');
    this.rotate_side_onlytwice({
      u:{idx:[0,3,6],side:'u'},r:{idx:[0,3,6],side:'f'},d:{idx:[0,3,6],side:'d'},l:{idx:[8,5,2],side:'b'}
    });
    return this.cube;
  }
  
  rotate_right_clockwise() {
    this.rotate_face_clockwise('r');
    this.rotate_side_clockwise({
      u:{idx:[8,5,2],side:'u'},r:{idx:[0,3,6],side:'b'},d:{idx:[8,5,2],side:'d'},l:{idx:[8,5,2],side:'f'}
    });
    return this.cube;
  }
  
  rotate_right_anticlock() {
    this.rotate_face_anticlock('r');
    this.rotate_side_anticlock({
      u:{idx:[8,5,2],side:'u'},r:{idx:[0,3,6],side:'b'},d:{idx:[8,5,2],side:'d'},l:{idx:[8,5,2],side:'f'}
    });
    return this.cube;
  }
  
  rotate_right_onlytwice() {
    this.rotate_face_onlytwice('r');
    this.rotate_side_onlytwice({
      u:{idx:[8,5,2],side:'u'},r:{idx:[0,3,6],side:'b'},d:{idx:[8,5,2],side:'d'},l:{idx:[8,5,2],side:'f'}
    });
    return this.cube;
  }
  
  rotate_up_clockwise() {
    this.rotate_face_clockwise('u');
    this.rotate_side_clockwise({
      u:{idx:[6,7,8],side:'d'},r:{idx:[2,1,0],side:'r'},d:{idx:[2,1,0],side:'f'},l:{idx:[2,1,0],side:'l'}
    });
    return this.cube;
  }
  
  rotate_up_anticlock() {
    this.rotate_face_anticlock('u');
    this.rotate_side_anticlock({
      u:{idx:[6,7,8],side:'d'},r:{idx:[2,1,0],side:'r'},d:{idx:[2,1,0],side:'f'},l:{idx:[2,1,0],side:'l'}
    });
    return this.cube;
  }
  
  rotate_up_onlytwice() {
    this.rotate_face_onlytwice('u');
    this.rotate_side_onlytwice({
      u:{idx:[6,7,8],side:'d'},r:{idx:[2,1,0],side:'r'},d:{idx:[2,1,0],side:'f'},l:{idx:[2,1,0],side:'l'}
    });
    return this.cube;
  }
  
  rotate_down_clockwise() {
    this.rotate_face_clockwise('d');
    this.rotate_side_clockwise({
      u:{idx:[6,7,8],side:'f'},r:{idx:[6,7,8],side:'r'},d:{idx:[2,1,0],side:'u'},l:{idx:[6,7,8],side:'l'}
    });
    return this.cube;
  }
  
  rotate_down_anticlock() {
    this.rotate_face_anticlock('d');
    this.rotate_side_anticlock({
      u:{idx:[6,7,8],side:'f'},r:{idx:[6,7,8],side:'r'},d:{idx:[2,1,0],side:'u'},l:{idx:[6,7,8],side:'l'}
    });
    return this.cube;
  }
  
  rotate_down_onlytwice() {
    this.rotate_face_onlytwice('d');
    this.rotate_side_onlytwice({
      u:{idx:[6,7,8],side:'f'},r:{idx:[6,7,8],side:'r'},d:{idx:[2,1,0],side:'u'},l:{idx:[6,7,8],side:'l'}
    });
    return this.cube;
  }
  
  old_color(sides) {
    return {
      u: [
        this.cube[sides.u.side][sides.u.idx[0]],
        this.cube[sides.u.side][sides.u.idx[1]],
        this.cube[sides.u.side][sides.u.idx[2]]
      ],
      d: [
        this.cube[sides.d.side][sides.d.idx[0]],
        this.cube[sides.d.side][sides.d.idx[1]],
        this.cube[sides.d.side][sides.d.idx[2]]
      ],
      l: [
        this.cube[sides.l.side][sides.l.idx[0]],
        this.cube[sides.l.side][sides.l.idx[1]],
        this.cube[sides.l.side][sides.l.idx[2]]
      ],
      r: [
        this.cube[sides.r.side][sides.r.idx[0]],
        this.cube[sides.r.side][sides.r.idx[1]],
        this.cube[sides.r.side][sides.r.idx[2]]
      ]
    };
  }

  rotate_side_clockwise(sides) {
    const old_color = this.old_color(sides);

    this.cube[sides.u.side][sides.u.idx[0]] = old_color.l[0];
    this.cube[sides.u.side][sides.u.idx[1]] = old_color.l[1];
    this.cube[sides.u.side][sides.u.idx[2]] = old_color.l[2];

    this.cube[sides.r.side][sides.r.idx[0]] = old_color.u[0];
    this.cube[sides.r.side][sides.r.idx[1]] = old_color.u[1];
    this.cube[sides.r.side][sides.r.idx[2]] = old_color.u[2];

    this.cube[sides.d.side][sides.d.idx[0]] = old_color.r[0];
    this.cube[sides.d.side][sides.d.idx[1]] = old_color.r[1];
    this.cube[sides.d.side][sides.d.idx[2]] = old_color.r[2];

    this.cube[sides.l.side][sides.l.idx[0]] = old_color.d[0];
    this.cube[sides.l.side][sides.l.idx[1]] = old_color.d[1];
    this.cube[sides.l.side][sides.l.idx[2]] = old_color.d[2];

  }
  rotate_side_anticlock(sides) {
    const old_color = this.old_color(sides);

    this.cube[sides.u.side][sides.u.idx[0]] = old_color.r[0];
    this.cube[sides.u.side][sides.u.idx[1]] = old_color.r[1];
    this.cube[sides.u.side][sides.u.idx[2]] = old_color.r[2];

    this.cube[sides.r.side][sides.r.idx[0]] = old_color.d[0];
    this.cube[sides.r.side][sides.r.idx[1]] = old_color.d[1];
    this.cube[sides.r.side][sides.r.idx[2]] = old_color.d[2];

    this.cube[sides.d.side][sides.d.idx[0]] = old_color.l[0];
    this.cube[sides.d.side][sides.d.idx[1]] = old_color.l[1];
    this.cube[sides.d.side][sides.d.idx[2]] = old_color.l[2];

    this.cube[sides.l.side][sides.l.idx[0]] = old_color.u[0];
    this.cube[sides.l.side][sides.l.idx[1]] = old_color.u[1];
    this.cube[sides.l.side][sides.l.idx[2]] = old_color.u[2];
  }
  color_swap(side_former, idx_former, side_latter, idx_latter) {
    var color_former = [
      this.cube[side_former][idx_former[0]],
      this.cube[side_former][idx_former[1]],
      this.cube[side_former][idx_former[2]]
    ];
    var color_latter = [
      this.cube[side_latter][idx_latter[0]],
      this.cube[side_latter][idx_latter[1]],
      this.cube[side_latter][idx_latter[2]]
    ];
    this.cube[side_former][idx_former[0]] = color_latter[0];
    this.cube[side_former][idx_former[1]] = color_latter[1];
    this.cube[side_former][idx_former[2]] = color_latter[2];
    
    this.cube[side_latter][idx_latter[0]] = color_former[0];
    this.cube[side_latter][idx_latter[1]] = color_former[1];
    this.cube[side_latter][idx_latter[2]] = color_former[2];
  }
  rotate_side_onlytwice(sides) {
    this.color_swap(sides.u.side, sides.u.idx, sides.d.side, sides.d.idx);
    this.color_swap(sides.l.side, sides.l.idx, sides.r.side, sides.r.idx);
  }

  rotate_face_clockwise(face) {
    this.cube[face] = [
      this.cube[face][6], this.cube[face][3], this.cube[face][0],
      this.cube[face][7], this.cube[face][4], this.cube[face][1],
      this.cube[face][8], this.cube[face][5], this.cube[face][2]
    ];
  }
  rotate_face_anticlock(face) {
    this.cube[face] = [
      this.cube[face][2], this.cube[face][5], this.cube[face][8],
      this.cube[face][1], this.cube[face][4], this.cube[face][7],
      this.cube[face][0], this.cube[face][3], this.cube[face][6]
    ];
  }
  rotate_face_onlytwice(face) {
    this.cube[face] = [
      this.cube[face][8], this.cube[face][7], this.cube[face][6],
      this.cube[face][5], this.cube[face][4], this.cube[face][3],
      this.cube[face][2], this.cube[face][1], this.cube[face][0]
    ]
  }
}

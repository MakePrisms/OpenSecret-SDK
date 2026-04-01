var ng = Object.defineProperty;
var Nf = (r) => {
  throw TypeError(r);
};
var ig = (r, e, t) => e in r ? ng(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var qe = (r, e, t) => ig(r, typeof e != "symbol" ? e + "" : e, t), Gc = (r, e, t) => e.has(r) || Nf("Cannot " + t);
var $ = (r, e, t) => (Gc(r, e, "read from private field"), t ? t.call(r) : e.get(r)), nr = (r, e, t) => e.has(r) ? Nf("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), Ct = (r, e, t, n) => (Gc(r, e, "write to private field"), n ? n.call(r, t) : e.set(r, t), t), Me = (r, e, t) => (Gc(r, e, "access private method"), t);
var Pf = (r, e, t, n) => ({
  set _(i) {
    Ct(r, e, i, t);
  },
  get _() {
    return $(r, e, n);
  }
});
import { jsx as kd } from "react/jsx-runtime";
import { createContext as Cd, useState as Lo, useEffect as Ns, useContext as Bd } from "react";
const dr = 256;
class sg {
  // TODO(dchest): methods to encode chunk-by-chunk.
  constructor(e = "=") {
    qe(this, "_paddingCharacter");
    this._paddingCharacter = e;
  }
  encodedLength(e) {
    return this._paddingCharacter ? (e + 2) / 3 * 4 | 0 : (e * 8 + 5) / 6 | 0;
  }
  encode(e) {
    let t = "", n = 0;
    for (; n < e.length - 2; n += 3) {
      let s = e[n] << 16 | e[n + 1] << 8 | e[n + 2];
      t += this._encodeByte(s >>> 3 * 6 & 63), t += this._encodeByte(s >>> 2 * 6 & 63), t += this._encodeByte(s >>> 1 * 6 & 63), t += this._encodeByte(s >>> 0 * 6 & 63);
    }
    const i = e.length - n;
    if (i > 0) {
      let s = e[n] << 16 | (i === 2 ? e[n + 1] << 8 : 0);
      t += this._encodeByte(s >>> 3 * 6 & 63), t += this._encodeByte(s >>> 2 * 6 & 63), i === 2 ? t += this._encodeByte(s >>> 1 * 6 & 63) : t += this._paddingCharacter || "", t += this._paddingCharacter || "";
    }
    return t;
  }
  maxDecodedLength(e) {
    return this._paddingCharacter ? e / 4 * 3 | 0 : (e * 6 + 7) / 8 | 0;
  }
  decodedLength(e) {
    return this.maxDecodedLength(e.length - this._getPaddingLength(e));
  }
  decode(e) {
    if (e.length === 0)
      return new Uint8Array(0);
    const t = this._getPaddingLength(e), n = e.length - t, i = new Uint8Array(this.maxDecodedLength(n));
    let s = 0, o = 0, c = 0, u = 0, h = 0, v = 0, b = 0;
    for (; o < n - 4; o += 4)
      u = this._decodeChar(e.charCodeAt(o + 0)), h = this._decodeChar(e.charCodeAt(o + 1)), v = this._decodeChar(e.charCodeAt(o + 2)), b = this._decodeChar(e.charCodeAt(o + 3)), i[s++] = u << 2 | h >>> 4, i[s++] = h << 4 | v >>> 2, i[s++] = v << 6 | b, c |= u & dr, c |= h & dr, c |= v & dr, c |= b & dr;
    if (o < n - 1 && (u = this._decodeChar(e.charCodeAt(o)), h = this._decodeChar(e.charCodeAt(o + 1)), i[s++] = u << 2 | h >>> 4, c |= u & dr, c |= h & dr), o < n - 2 && (v = this._decodeChar(e.charCodeAt(o + 2)), i[s++] = h << 4 | v >>> 2, c |= v & dr), o < n - 3 && (b = this._decodeChar(e.charCodeAt(o + 3)), i[s++] = v << 6 | b, c |= b & dr), c !== 0)
      throw new Error("Base64Coder: incorrect characters for decoding");
    return i;
  }
  // Standard encoding have the following encoded/decoded ranges,
  // which we need to convert between.
  //
  // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  +   /
  // Index:   0 - 25                    26 - 51              52 - 61   62  63
  // ASCII:  65 - 90                    97 - 122             48 - 57   43  47
  //
  // Encode 6 bits in b into a new character.
  _encodeByte(e) {
    let t = e;
    return t += 65, t += 25 - e >>> 8 & 6, t += 51 - e >>> 8 & -75, t += 61 - e >>> 8 & -15, t += 62 - e >>> 8 & 3, String.fromCharCode(t);
  }
  // Decode a character code into a byte.
  // Must return 256 if character is out of alphabet range.
  _decodeChar(e) {
    let t = dr;
    return t += (42 - e & e - 44) >>> 8 & -dr + e - 43 + 62, t += (46 - e & e - 48) >>> 8 & -dr + e - 47 + 63, t += (47 - e & e - 58) >>> 8 & -dr + e - 48 + 52, t += (64 - e & e - 91) >>> 8 & -dr + e - 65 + 0, t += (96 - e & e - 123) >>> 8 & -dr + e - 97 + 26, t;
  }
  _getPaddingLength(e) {
    let t = 0;
    if (this._paddingCharacter) {
      for (let n = e.length - 1; n >= 0 && e[n] === this._paddingCharacter; n--)
        t++;
      if (e.length < 4 || t > 2)
        throw new Error("Base64Coder: incorrect padding");
    }
    return t;
  }
}
const Od = new sg();
function Er(r) {
  return Od.encode(r);
}
function $s(r) {
  return Od.decode(r);
}
function Kt(r, e = new Uint8Array(4), t = 0) {
  return e[t + 0] = r >>> 0, e[t + 1] = r >>> 8, e[t + 2] = r >>> 16, e[t + 3] = r >>> 24, e;
}
function jf(r, e = new Uint8Array(8), t = 0) {
  return Kt(r >>> 0, e, t), Kt(r / 4294967296 >>> 0, e, t + 4), e;
}
function Or(r) {
  for (let e = 0; e < r.length; e++)
    r[e] = 0;
  return r;
}
const og = 20;
function ag(r, e, t) {
  let n = 1634760805, i = 857760878, s = 2036477234, o = 1797285236, c = t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0], u = t[7] << 24 | t[6] << 16 | t[5] << 8 | t[4], h = t[11] << 24 | t[10] << 16 | t[9] << 8 | t[8], v = t[15] << 24 | t[14] << 16 | t[13] << 8 | t[12], b = t[19] << 24 | t[18] << 16 | t[17] << 8 | t[16], H = t[23] << 24 | t[22] << 16 | t[21] << 8 | t[20], T = t[27] << 24 | t[26] << 16 | t[25] << 8 | t[24], m = t[31] << 24 | t[30] << 16 | t[29] << 8 | t[28], A = e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0], k = e[7] << 24 | e[6] << 16 | e[5] << 8 | e[4], I = e[11] << 24 | e[10] << 16 | e[9] << 8 | e[8], P = e[15] << 24 | e[14] << 16 | e[13] << 8 | e[12], D = n, de = i, et = s, Re = o, Oe = c, Le = u, gt = h, yt = v, Se = b, be = H, _e = T, Ze = m, nt = A, tt = k, ie = I, Ie = P;
  for (let wt = 0; wt < og; wt += 2)
    D = D + Oe | 0, nt ^= D, nt = nt >>> 16 | nt << 16, Se = Se + nt | 0, Oe ^= Se, Oe = Oe >>> 20 | Oe << 12, de = de + Le | 0, tt ^= de, tt = tt >>> 16 | tt << 16, be = be + tt | 0, Le ^= be, Le = Le >>> 20 | Le << 12, et = et + gt | 0, ie ^= et, ie = ie >>> 16 | ie << 16, _e = _e + ie | 0, gt ^= _e, gt = gt >>> 20 | gt << 12, Re = Re + yt | 0, Ie ^= Re, Ie = Ie >>> 16 | Ie << 16, Ze = Ze + Ie | 0, yt ^= Ze, yt = yt >>> 20 | yt << 12, et = et + gt | 0, ie ^= et, ie = ie >>> 24 | ie << 8, _e = _e + ie | 0, gt ^= _e, gt = gt >>> 25 | gt << 7, Re = Re + yt | 0, Ie ^= Re, Ie = Ie >>> 24 | Ie << 8, Ze = Ze + Ie | 0, yt ^= Ze, yt = yt >>> 25 | yt << 7, de = de + Le | 0, tt ^= de, tt = tt >>> 24 | tt << 8, be = be + tt | 0, Le ^= be, Le = Le >>> 25 | Le << 7, D = D + Oe | 0, nt ^= D, nt = nt >>> 24 | nt << 8, Se = Se + nt | 0, Oe ^= Se, Oe = Oe >>> 25 | Oe << 7, D = D + Le | 0, Ie ^= D, Ie = Ie >>> 16 | Ie << 16, _e = _e + Ie | 0, Le ^= _e, Le = Le >>> 20 | Le << 12, de = de + gt | 0, nt ^= de, nt = nt >>> 16 | nt << 16, Ze = Ze + nt | 0, gt ^= Ze, gt = gt >>> 20 | gt << 12, et = et + yt | 0, tt ^= et, tt = tt >>> 16 | tt << 16, Se = Se + tt | 0, yt ^= Se, yt = yt >>> 20 | yt << 12, Re = Re + Oe | 0, ie ^= Re, ie = ie >>> 16 | ie << 16, be = be + ie | 0, Oe ^= be, Oe = Oe >>> 20 | Oe << 12, et = et + yt | 0, tt ^= et, tt = tt >>> 24 | tt << 8, Se = Se + tt | 0, yt ^= Se, yt = yt >>> 25 | yt << 7, Re = Re + Oe | 0, ie ^= Re, ie = ie >>> 24 | ie << 8, be = be + ie | 0, Oe ^= be, Oe = Oe >>> 25 | Oe << 7, de = de + gt | 0, nt ^= de, nt = nt >>> 24 | nt << 8, Ze = Ze + nt | 0, gt ^= Ze, gt = gt >>> 25 | gt << 7, D = D + Le | 0, Ie ^= D, Ie = Ie >>> 24 | Ie << 8, _e = _e + Ie | 0, Le ^= _e, Le = Le >>> 25 | Le << 7;
  Kt(D + n | 0, r, 0), Kt(de + i | 0, r, 4), Kt(et + s | 0, r, 8), Kt(Re + o | 0, r, 12), Kt(Oe + c | 0, r, 16), Kt(Le + u | 0, r, 20), Kt(gt + h | 0, r, 24), Kt(yt + v | 0, r, 28), Kt(Se + b | 0, r, 32), Kt(be + H | 0, r, 36), Kt(_e + T | 0, r, 40), Kt(Ze + m | 0, r, 44), Kt(nt + A | 0, r, 48), Kt(tt + k | 0, r, 52), Kt(ie + I | 0, r, 56), Kt(Ie + P | 0, r, 60);
}
function cl(r, e, t, n, i = 0) {
  if (r.length !== 32)
    throw new Error("ChaCha: key size must be 32 bytes");
  if (n.length < t.length)
    throw new Error("ChaCha: destination is shorter than source");
  let s, o;
  if (i === 0) {
    if (e.length !== 8 && e.length !== 12)
      throw new Error("ChaCha nonce must be 8 or 12 bytes");
    s = new Uint8Array(16), o = s.length - e.length, s.set(e, o);
  } else {
    if (e.length !== 16)
      throw new Error("ChaCha nonce with counter must be 16 bytes");
    s = e, o = i;
  }
  const c = new Uint8Array(64);
  for (let u = 0; u < t.length; u += 64) {
    ag(c, s, r);
    for (let h = u; h < u + 64 && h < t.length; h++)
      n[h] = t[h] ^ c[h - u];
    cg(s, 0, o);
  }
  return Or(c), i === 0 && Or(s), n;
}
function Rf(r, e, t, n = 0) {
  return Or(t), cl(r, e, t, t, n);
}
function cg(r, e, t) {
  let n = 1;
  for (; t--; )
    n = n + (r[e] & 255) | 0, r[e] = n & 255, n >>>= 8, e++;
  if (n > 0)
    throw new Error("ChaCha: counter overflow");
}
function lg(r, e) {
  if (r.length !== e.length)
    return 0;
  let t = 0;
  for (let n = 0; n < r.length; n++)
    t |= r[n] ^ e[n];
  return 1 & t - 1 >>> 8;
}
function ug(r, e) {
  return r.length === 0 || e.length === 0 ? !1 : lg(r, e) !== 0;
}
const fg = 16;
class hg {
  constructor(e) {
    qe(this, "digestLength", fg);
    qe(this, "_buffer", new Uint8Array(16));
    qe(this, "_r", new Uint16Array(10));
    qe(this, "_h", new Uint16Array(10));
    qe(this, "_pad", new Uint16Array(8));
    qe(this, "_leftover", 0);
    qe(this, "_fin", 0);
    qe(this, "_finished", !1);
    let t = e[0] | e[1] << 8;
    this._r[0] = t & 8191;
    let n = e[2] | e[3] << 8;
    this._r[1] = (t >>> 13 | n << 3) & 8191;
    let i = e[4] | e[5] << 8;
    this._r[2] = (n >>> 10 | i << 6) & 7939;
    let s = e[6] | e[7] << 8;
    this._r[3] = (i >>> 7 | s << 9) & 8191;
    let o = e[8] | e[9] << 8;
    this._r[4] = (s >>> 4 | o << 12) & 255, this._r[5] = o >>> 1 & 8190;
    let c = e[10] | e[11] << 8;
    this._r[6] = (o >>> 14 | c << 2) & 8191;
    let u = e[12] | e[13] << 8;
    this._r[7] = (c >>> 11 | u << 5) & 8065;
    let h = e[14] | e[15] << 8;
    this._r[8] = (u >>> 8 | h << 8) & 8191, this._r[9] = h >>> 5 & 127, this._pad[0] = e[16] | e[17] << 8, this._pad[1] = e[18] | e[19] << 8, this._pad[2] = e[20] | e[21] << 8, this._pad[3] = e[22] | e[23] << 8, this._pad[4] = e[24] | e[25] << 8, this._pad[5] = e[26] | e[27] << 8, this._pad[6] = e[28] | e[29] << 8, this._pad[7] = e[30] | e[31] << 8;
  }
  _blocks(e, t, n) {
    let i = this._fin ? 0 : 2048, s = this._h[0], o = this._h[1], c = this._h[2], u = this._h[3], h = this._h[4], v = this._h[5], b = this._h[6], H = this._h[7], T = this._h[8], m = this._h[9], A = this._r[0], k = this._r[1], I = this._r[2], P = this._r[3], D = this._r[4], de = this._r[5], et = this._r[6], Re = this._r[7], Oe = this._r[8], Le = this._r[9];
    for (; n >= 16; ) {
      let gt = e[t + 0] | e[t + 1] << 8;
      s += gt & 8191;
      let yt = e[t + 2] | e[t + 3] << 8;
      o += (gt >>> 13 | yt << 3) & 8191;
      let Se = e[t + 4] | e[t + 5] << 8;
      c += (yt >>> 10 | Se << 6) & 8191;
      let be = e[t + 6] | e[t + 7] << 8;
      u += (Se >>> 7 | be << 9) & 8191;
      let _e = e[t + 8] | e[t + 9] << 8;
      h += (be >>> 4 | _e << 12) & 8191, v += _e >>> 1 & 8191;
      let Ze = e[t + 10] | e[t + 11] << 8;
      b += (_e >>> 14 | Ze << 2) & 8191;
      let nt = e[t + 12] | e[t + 13] << 8;
      H += (Ze >>> 11 | nt << 5) & 8191;
      let tt = e[t + 14] | e[t + 15] << 8;
      T += (nt >>> 8 | tt << 8) & 8191, m += tt >>> 5 | i;
      let ie = 0, Ie = ie;
      Ie += s * A, Ie += o * (5 * Le), Ie += c * (5 * Oe), Ie += u * (5 * Re), Ie += h * (5 * et), ie = Ie >>> 13, Ie &= 8191, Ie += v * (5 * de), Ie += b * (5 * D), Ie += H * (5 * P), Ie += T * (5 * I), Ie += m * (5 * k), ie += Ie >>> 13, Ie &= 8191;
      let wt = ie;
      wt += s * k, wt += o * A, wt += c * (5 * Le), wt += u * (5 * Oe), wt += h * (5 * Re), ie = wt >>> 13, wt &= 8191, wt += v * (5 * et), wt += b * (5 * de), wt += H * (5 * D), wt += T * (5 * P), wt += m * (5 * I), ie += wt >>> 13, wt &= 8191;
      let Dt = ie;
      Dt += s * I, Dt += o * k, Dt += c * A, Dt += u * (5 * Le), Dt += h * (5 * Oe), ie = Dt >>> 13, Dt &= 8191, Dt += v * (5 * Re), Dt += b * (5 * et), Dt += H * (5 * de), Dt += T * (5 * D), Dt += m * (5 * P), ie += Dt >>> 13, Dt &= 8191;
      let $t = ie;
      $t += s * P, $t += o * I, $t += c * k, $t += u * A, $t += h * (5 * Le), ie = $t >>> 13, $t &= 8191, $t += v * (5 * Oe), $t += b * (5 * Re), $t += H * (5 * et), $t += T * (5 * de), $t += m * (5 * D), ie += $t >>> 13, $t &= 8191;
      let ae = ie;
      ae += s * D, ae += o * P, ae += c * I, ae += u * k, ae += h * A, ie = ae >>> 13, ae &= 8191, ae += v * (5 * Le), ae += b * (5 * Oe), ae += H * (5 * Re), ae += T * (5 * et), ae += m * (5 * de), ie += ae >>> 13, ae &= 8191;
      let at = ie;
      at += s * de, at += o * D, at += c * P, at += u * I, at += h * k, ie = at >>> 13, at &= 8191, at += v * A, at += b * (5 * Le), at += H * (5 * Oe), at += T * (5 * Re), at += m * (5 * et), ie += at >>> 13, at &= 8191;
      let bt = ie;
      bt += s * et, bt += o * de, bt += c * D, bt += u * P, bt += h * I, ie = bt >>> 13, bt &= 8191, bt += v * k, bt += b * A, bt += H * (5 * Le), bt += T * (5 * Oe), bt += m * (5 * Re), ie += bt >>> 13, bt &= 8191;
      let Q = ie;
      Q += s * Re, Q += o * et, Q += c * de, Q += u * D, Q += h * P, ie = Q >>> 13, Q &= 8191, Q += v * I, Q += b * k, Q += H * A, Q += T * (5 * Le), Q += m * (5 * Oe), ie += Q >>> 13, Q &= 8191;
      let vt = ie;
      vt += s * Oe, vt += o * Re, vt += c * et, vt += u * de, vt += h * D, ie = vt >>> 13, vt &= 8191, vt += v * P, vt += b * I, vt += H * k, vt += T * A, vt += m * (5 * Le), ie += vt >>> 13, vt &= 8191;
      let Lt = ie;
      Lt += s * Le, Lt += o * Oe, Lt += c * Re, Lt += u * et, Lt += h * de, ie = Lt >>> 13, Lt &= 8191, Lt += v * D, Lt += b * P, Lt += H * I, Lt += T * k, Lt += m * A, ie += Lt >>> 13, Lt &= 8191, ie = (ie << 2) + ie | 0, ie = ie + Ie | 0, Ie = ie & 8191, ie = ie >>> 13, wt += ie, s = Ie, o = wt, c = Dt, u = $t, h = ae, v = at, b = bt, H = Q, T = vt, m = Lt, t += 16, n -= 16;
    }
    this._h[0] = s, this._h[1] = o, this._h[2] = c, this._h[3] = u, this._h[4] = h, this._h[5] = v, this._h[6] = b, this._h[7] = H, this._h[8] = T, this._h[9] = m;
  }
  finish(e, t = 0) {
    const n = new Uint16Array(10);
    let i, s, o, c;
    if (this._leftover) {
      for (c = this._leftover, this._buffer[c++] = 1; c < 16; c++)
        this._buffer[c] = 0;
      this._fin = 1, this._blocks(this._buffer, 0, 16);
    }
    for (i = this._h[1] >>> 13, this._h[1] &= 8191, c = 2; c < 10; c++)
      this._h[c] += i, i = this._h[c] >>> 13, this._h[c] &= 8191;
    for (this._h[0] += i * 5, i = this._h[0] >>> 13, this._h[0] &= 8191, this._h[1] += i, i = this._h[1] >>> 13, this._h[1] &= 8191, this._h[2] += i, n[0] = this._h[0] + 5, i = n[0] >>> 13, n[0] &= 8191, c = 1; c < 10; c++)
      n[c] = this._h[c] + i, i = n[c] >>> 13, n[c] &= 8191;
    for (n[9] -= 8192, s = (i ^ 1) - 1, c = 0; c < 10; c++)
      n[c] &= s;
    for (s = ~s, c = 0; c < 10; c++)
      this._h[c] = this._h[c] & s | n[c];
    for (this._h[0] = (this._h[0] | this._h[1] << 13) & 65535, this._h[1] = (this._h[1] >>> 3 | this._h[2] << 10) & 65535, this._h[2] = (this._h[2] >>> 6 | this._h[3] << 7) & 65535, this._h[3] = (this._h[3] >>> 9 | this._h[4] << 4) & 65535, this._h[4] = (this._h[4] >>> 12 | this._h[5] << 1 | this._h[6] << 14) & 65535, this._h[5] = (this._h[6] >>> 2 | this._h[7] << 11) & 65535, this._h[6] = (this._h[7] >>> 5 | this._h[8] << 8) & 65535, this._h[7] = (this._h[8] >>> 8 | this._h[9] << 5) & 65535, o = this._h[0] + this._pad[0], this._h[0] = o & 65535, c = 1; c < 8; c++)
      o = (this._h[c] + this._pad[c] | 0) + (o >>> 16) | 0, this._h[c] = o & 65535;
    return e[t + 0] = this._h[0] >>> 0, e[t + 1] = this._h[0] >>> 8, e[t + 2] = this._h[1] >>> 0, e[t + 3] = this._h[1] >>> 8, e[t + 4] = this._h[2] >>> 0, e[t + 5] = this._h[2] >>> 8, e[t + 6] = this._h[3] >>> 0, e[t + 7] = this._h[3] >>> 8, e[t + 8] = this._h[4] >>> 0, e[t + 9] = this._h[4] >>> 8, e[t + 10] = this._h[5] >>> 0, e[t + 11] = this._h[5] >>> 8, e[t + 12] = this._h[6] >>> 0, e[t + 13] = this._h[6] >>> 8, e[t + 14] = this._h[7] >>> 0, e[t + 15] = this._h[7] >>> 8, this._finished = !0, this;
  }
  update(e) {
    let t = 0, n = e.length, i;
    if (this._leftover) {
      i = 16 - this._leftover, i > n && (i = n);
      for (let s = 0; s < i; s++)
        this._buffer[this._leftover + s] = e[t + s];
      if (n -= i, t += i, this._leftover += i, this._leftover < 16)
        return this;
      this._blocks(this._buffer, 0, 16), this._leftover = 0;
    }
    if (n >= 16 && (i = n - n % 16, this._blocks(e, t, i), t += i, n -= i), n) {
      for (let s = 0; s < n; s++)
        this._buffer[this._leftover + s] = e[t + s];
      this._leftover += n;
    }
    return this;
  }
  digest() {
    if (this._finished)
      throw new Error("Poly1305 was finished");
    let e = new Uint8Array(16);
    return this.finish(e), e;
  }
  clean() {
    return Or(this._buffer), Or(this._r), Or(this._h), Or(this._pad), this._leftover = 0, this._fin = 0, this._finished = !0, this;
  }
}
const dg = 32, pg = 12, yg = 16, Uf = new Uint8Array(16);
class Uu {
  /**
   * Creates a new instance with the given 32-byte key.
   */
  constructor(e) {
    qe(this, "nonceLength", pg);
    qe(this, "tagLength", yg);
    qe(this, "_key");
    if (e.length !== dg)
      throw new Error("ChaCha20Poly1305 needs 32-byte key");
    this._key = new Uint8Array(e);
  }
  /**
   * Encrypts and authenticates plaintext, authenticates associated data,
   * and returns sealed ciphertext, which includes authentication tag.
   *
   * RFC7539 specifies 12 bytes for nonce. It may be this 12-byte nonce
   * ("IV"), or full 16-byte counter (called "32-bit fixed-common part")
   * and nonce.
   *
   * If dst is given (it must be the size of plaintext + the size of tag
   * length) the result will be put into it. Dst and plaintext must not
   * overlap.
   */
  seal(e, t, n, i) {
    if (e.length > 16)
      throw new Error("ChaCha20Poly1305: incorrect nonce length");
    const s = new Uint8Array(16);
    s.set(e, s.length - e.length);
    const o = new Uint8Array(32);
    Rf(this._key, s, o, 4);
    const c = t.length + this.tagLength;
    let u;
    if (i) {
      if (i.length !== c)
        throw new Error("ChaCha20Poly1305: incorrect destination length");
      u = i;
    } else
      u = new Uint8Array(c);
    return cl(this._key, s, t, u, 4), this._authenticate(u.subarray(u.length - this.tagLength, u.length), o, u.subarray(0, u.length - this.tagLength), n), Or(s), u;
  }
  /**
   * Authenticates sealed ciphertext (which includes authentication tag) and
   * associated data, decrypts ciphertext and returns decrypted plaintext.
   *
   * RFC7539 specifies 12 bytes for nonce. It may be this 12-byte nonce
   * ("IV"), or full 16-byte counter (called "32-bit fixed-common part")
   * and nonce.
   *
   * If authentication fails, it returns null.
   *
   * If dst is given (it must be of ciphertext length minus tag length),
   * the result will be put into it. Dst and plaintext must not overlap.
   */
  open(e, t, n, i) {
    if (e.length > 16)
      throw new Error("ChaCha20Poly1305: incorrect nonce length");
    if (t.length < this.tagLength)
      return null;
    const s = new Uint8Array(16);
    s.set(e, s.length - e.length);
    const o = new Uint8Array(32);
    Rf(this._key, s, o, 4);
    const c = new Uint8Array(this.tagLength);
    if (this._authenticate(c, o, t.subarray(0, t.length - this.tagLength), n), !ug(c, t.subarray(t.length - this.tagLength, t.length)))
      return null;
    const u = t.length - this.tagLength;
    let h;
    if (i) {
      if (i.length !== u)
        throw new Error("ChaCha20Poly1305: incorrect destination length");
      h = i;
    } else
      h = new Uint8Array(u);
    return cl(this._key, s, t.subarray(0, t.length - this.tagLength), h, 4), Or(s), h;
  }
  clean() {
    return Or(this._key), this;
  }
  _authenticate(e, t, n, i) {
    const s = new hg(t);
    i && (s.update(i), i.length % 16 > 0 && s.update(Uf.subarray(i.length % 16))), s.update(n), n.length % 16 > 0 && s.update(Uf.subarray(n.length % 16));
    const o = new Uint8Array(8);
    i && jf(i.length, o), s.update(o), jf(n.length, o), s.update(o);
    const c = s.digest();
    for (let u = 0; u < c.length; u++)
      e[u] = c[u];
    s.clean(), Or(c), Or(o);
  }
}
const Df = 65536;
class gg {
  constructor() {
    qe(this, "isAvailable", !1);
    qe(this, "isInstantiated", !1);
    typeof crypto < "u" && "getRandomValues" in crypto && (this.isAvailable = !0, this.isInstantiated = !0);
  }
  randomBytes(e) {
    if (!this.isAvailable)
      throw new Error("System random byte generator is not available.");
    const t = new Uint8Array(e);
    for (let n = 0; n < t.length; n += Df)
      crypto.getRandomValues(t.subarray(n, n + Math.min(t.length - n, Df)));
    return t;
  }
}
const vg = new gg();
function mg(r, e = vg) {
  return e.randomBytes(r);
}
function Td(r, e) {
  const t = new Uu(r), n = mg(12), s = new TextEncoder().encode(e), o = t.seal(n, s), c = new Uint8Array(n.length + o.length);
  return c.set(n), c.set(o, n.length), Er(c);
}
function ll(r, e) {
  const t = new Uu(r), n = $s(e), i = 12, s = n.slice(0, i), o = n.slice(i), c = t.open(s, o);
  if (!c)
    throw new Error("Decryption failed");
  return new TextDecoder().decode(c);
}
var ul = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function wg(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function bg(r) {
  if (r.__esModule) return r;
  var e = r.default;
  if (typeof e == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(t, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), t;
}
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var $f;
(function(r) {
  (function(e) {
    var t = typeof globalThis == "object" ? globalThis : typeof ul == "object" ? ul : typeof self == "object" ? self : typeof this == "object" ? this : c(), n = i(r);
    typeof t.Reflect < "u" && (n = i(t.Reflect, n)), e(n, t), typeof t.Reflect > "u" && (t.Reflect = r);
    function i(u, h) {
      return function(v, b) {
        Object.defineProperty(u, v, { configurable: !0, writable: !0, value: b }), h && h(v, b);
      };
    }
    function s() {
      try {
        return Function("return this;")();
      } catch {
      }
    }
    function o() {
      try {
        return (0, eval)("(function() { return this; })()");
      } catch {
      }
    }
    function c() {
      return s() || o();
    }
  })(function(e, t) {
    var n = Object.prototype.hasOwnProperty, i = typeof Symbol == "function", s = i && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", o = i && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", c = typeof Object.create == "function", u = { __proto__: [] } instanceof Array, h = !c && !u, v = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: c ? function() {
        return _s(/* @__PURE__ */ Object.create(null));
      } : u ? function() {
        return _s({ __proto__: null });
      } : function() {
        return _s({});
      },
      has: h ? function(_, C) {
        return n.call(_, C);
      } : function(_, C) {
        return C in _;
      },
      get: h ? function(_, C) {
        return n.call(_, C) ? _[C] : void 0;
      } : function(_, C) {
        return _[C];
      }
    }, b = Object.getPrototypeOf(Function), H = typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : As(), T = typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : Ss(), m = typeof WeakMap == "function" ? WeakMap : Po(), A = i ? Symbol.for("@reflect-metadata:registry") : void 0, k = bs(), I = Ni(k);
    function P(_, C, N, K) {
      if (ae(N)) {
        if (!ps(_))
          throw new TypeError();
        if (!ys(C))
          throw new TypeError();
        return be(_, C);
      } else {
        if (!ps(_))
          throw new TypeError();
        if (!Q(C))
          throw new TypeError();
        if (!Q(K) && !ae(K) && !at(K))
          throw new TypeError();
        return at(K) && (K = void 0), N = ar(N), _e(_, C, N, K);
      }
    }
    e("decorate", P);
    function D(_, C) {
      function N(K, me) {
        if (!Q(K))
          throw new TypeError();
        if (!ae(me) && !Fc(me))
          throw new TypeError();
        Ie(_, C, K, me);
      }
      return N;
    }
    e("metadata", D);
    function de(_, C, N, K) {
      if (!Q(N))
        throw new TypeError();
      return ae(K) || (K = ar(K)), Ie(_, C, N, K);
    }
    e("defineMetadata", de);
    function et(_, C, N) {
      if (!Q(C))
        throw new TypeError();
      return ae(N) || (N = ar(N)), Ze(_, C, N);
    }
    e("hasMetadata", et);
    function Re(_, C, N) {
      if (!Q(C))
        throw new TypeError();
      return ae(N) || (N = ar(N)), nt(_, C, N);
    }
    e("hasOwnMetadata", Re);
    function Oe(_, C, N) {
      if (!Q(C))
        throw new TypeError();
      return ae(N) || (N = ar(N)), tt(_, C, N);
    }
    e("getMetadata", Oe);
    function Le(_, C, N) {
      if (!Q(C))
        throw new TypeError();
      return ae(N) || (N = ar(N)), ie(_, C, N);
    }
    e("getOwnMetadata", Le);
    function gt(_, C) {
      if (!Q(_))
        throw new TypeError();
      return ae(C) || (C = ar(C)), wt(_, C);
    }
    e("getMetadataKeys", gt);
    function yt(_, C) {
      if (!Q(_))
        throw new TypeError();
      return ae(C) || (C = ar(C)), Dt(_, C);
    }
    e("getOwnMetadataKeys", yt);
    function Se(_, C, N) {
      if (!Q(C))
        throw new TypeError();
      if (ae(N) || (N = ar(N)), !Q(C))
        throw new TypeError();
      ae(N) || (N = ar(N));
      var K = Jr(
        C,
        N,
        /*Create*/
        !1
      );
      return ae(K) ? !1 : K.OrdinaryDeleteMetadata(_, C, N);
    }
    e("deleteMetadata", Se);
    function be(_, C) {
      for (var N = _.length - 1; N >= 0; --N) {
        var K = _[N], me = K(C);
        if (!ae(me) && !at(me)) {
          if (!ys(me))
            throw new TypeError();
          C = me;
        }
      }
      return C;
    }
    function _e(_, C, N, K) {
      for (var me = _.length - 1; me >= 0; --me) {
        var Et = _[me], It = Et(C, N, K);
        if (!ae(It) && !at(It)) {
          if (!Q(It))
            throw new TypeError();
          K = It;
        }
      }
      return K;
    }
    function Ze(_, C, N) {
      var K = nt(_, C, N);
      if (K)
        return !0;
      var me = Ti(C);
      return at(me) ? !1 : Ze(_, me, N);
    }
    function nt(_, C, N) {
      var K = Jr(
        C,
        N,
        /*Create*/
        !1
      );
      return ae(K) ? !1 : ds(K.OrdinaryHasOwnMetadata(_, C, N));
    }
    function tt(_, C, N) {
      var K = nt(_, C, N);
      if (K)
        return ie(_, C, N);
      var me = Ti(C);
      if (!at(me))
        return tt(_, me, N);
    }
    function ie(_, C, N) {
      var K = Jr(
        C,
        N,
        /*Create*/
        !1
      );
      if (!ae(K))
        return K.OrdinaryGetOwnMetadata(_, C, N);
    }
    function Ie(_, C, N, K) {
      var me = Jr(
        N,
        K,
        /*Create*/
        !0
      );
      me.OrdinaryDefineOwnMetadata(_, C, N, K);
    }
    function wt(_, C) {
      var N = Dt(_, C), K = Ti(_);
      if (K === null)
        return N;
      var me = wt(K, C);
      if (me.length <= 0)
        return N;
      if (N.length <= 0)
        return me;
      for (var Et = new T(), It = [], De = 0, Z = N; De < Z.length; De++) {
        var ee = Z[De], ce = Et.has(ee);
        ce || (Et.add(ee), It.push(ee));
      }
      for (var pe = 0, Qe = me; pe < Qe.length; pe++) {
        var ee = Qe[pe], ce = Et.has(ee);
        ce || (Et.add(ee), It.push(ee));
      }
      return It;
    }
    function Dt(_, C) {
      var N = Jr(
        _,
        C,
        /*create*/
        !1
      );
      return N ? N.OrdinaryOwnMetadataKeys(_, C) : [];
    }
    function $t(_) {
      if (_ === null)
        return 1;
      switch (typeof _) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return _ === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function ae(_) {
      return _ === void 0;
    }
    function at(_) {
      return _ === null;
    }
    function bt(_) {
      return typeof _ == "symbol";
    }
    function Q(_) {
      return typeof _ == "object" ? _ !== null : typeof _ == "function";
    }
    function vt(_, C) {
      switch ($t(_)) {
        case 0:
          return _;
        case 1:
          return _;
        case 2:
          return _;
        case 3:
          return _;
        case 4:
          return _;
        case 5:
          return _;
      }
      var N = "string", K = No(_, s);
      if (K !== void 0) {
        var me = K.call(_, N);
        if (Q(me))
          throw new TypeError();
        return me;
      }
      return Lt(_);
    }
    function Lt(_, C) {
      var N, K;
      {
        var me = _.toString;
        if (gn(me)) {
          var K = me.call(_);
          if (!Q(K))
            return K;
        }
        var N = _.valueOf;
        if (gn(N)) {
          var K = N.call(_);
          if (!Q(K))
            return K;
        }
      }
      throw new TypeError();
    }
    function ds(_) {
      return !!_;
    }
    function Oi(_) {
      return "" + _;
    }
    function ar(_) {
      var C = vt(_);
      return bt(C) ? C : Oi(C);
    }
    function ps(_) {
      return Array.isArray ? Array.isArray(_) : _ instanceof Object ? _ instanceof Array : Object.prototype.toString.call(_) === "[object Array]";
    }
    function gn(_) {
      return typeof _ == "function";
    }
    function ys(_) {
      return typeof _ == "function";
    }
    function Fc(_) {
      switch ($t(_)) {
        case 3:
          return !0;
        case 4:
          return !0;
        default:
          return !1;
      }
    }
    function gs(_, C) {
      return _ === C || _ !== _ && C !== C;
    }
    function No(_, C) {
      var N = _[C];
      if (N != null) {
        if (!gn(N))
          throw new TypeError();
        return N;
      }
    }
    function vs(_) {
      var C = No(_, o);
      if (!gn(C))
        throw new TypeError();
      var N = C.call(_);
      if (!Q(N))
        throw new TypeError();
      return N;
    }
    function ms(_) {
      return _.value;
    }
    function Yr(_) {
      var C = _.next();
      return C.done ? !1 : C;
    }
    function ei(_) {
      var C = _.return;
      C && C.call(_);
    }
    function Ti(_) {
      var C = Object.getPrototypeOf(_);
      if (typeof _ != "function" || _ === b || C !== b)
        return C;
      var N = _.prototype, K = N && Object.getPrototypeOf(N);
      if (K == null || K === Object.prototype)
        return C;
      var me = K.constructor;
      return typeof me != "function" || me === _ ? C : me;
    }
    function ws() {
      var _;
      !ae(A) && typeof t.Reflect < "u" && !(A in t.Reflect) && typeof t.Reflect.defineMetadata == "function" && (_ = xs(t.Reflect));
      var C, N, K, me = new m(), Et = {
        registerProvider: It,
        getProvider: Z,
        setProvider: ce
      };
      return Et;
      function It(pe) {
        if (!Object.isExtensible(Et))
          throw new Error("Cannot add provider to a frozen registry.");
        switch (!0) {
          case _ === pe:
            break;
          case ae(C):
            C = pe;
            break;
          case C === pe:
            break;
          case ae(N):
            N = pe;
            break;
          case N === pe:
            break;
          default:
            K === void 0 && (K = new T()), K.add(pe);
            break;
        }
      }
      function De(pe, Qe) {
        if (!ae(C)) {
          if (C.isProviderFor(pe, Qe))
            return C;
          if (!ae(N)) {
            if (N.isProviderFor(pe, Qe))
              return C;
            if (!ae(K))
              for (var it = vs(K); ; ) {
                var xt = Yr(it);
                if (!xt)
                  return;
                var zt = ms(xt);
                if (zt.isProviderFor(pe, Qe))
                  return ei(it), zt;
              }
          }
        }
        if (!ae(_) && _.isProviderFor(pe, Qe))
          return _;
      }
      function Z(pe, Qe) {
        var it = me.get(pe), xt;
        return ae(it) || (xt = it.get(Qe)), ae(xt) && (xt = De(pe, Qe), ae(xt) || (ae(it) && (it = new H(), me.set(pe, it)), it.set(Qe, xt))), xt;
      }
      function ee(pe) {
        if (ae(pe))
          throw new TypeError();
        return C === pe || N === pe || !ae(K) && K.has(pe);
      }
      function ce(pe, Qe, it) {
        if (!ee(it))
          throw new Error("Metadata provider not registered.");
        var xt = Z(pe, Qe);
        if (xt !== it) {
          if (!ae(xt))
            return !1;
          var zt = me.get(pe);
          ae(zt) && (zt = new H(), me.set(pe, zt)), zt.set(Qe, it);
        }
        return !0;
      }
    }
    function bs() {
      var _;
      return !ae(A) && Q(t.Reflect) && Object.isExtensible(t.Reflect) && (_ = t.Reflect[A]), ae(_) && (_ = ws()), !ae(A) && Q(t.Reflect) && Object.isExtensible(t.Reflect) && Object.defineProperty(t.Reflect, A, {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: _
      }), _;
    }
    function Ni(_) {
      var C = new m(), N = {
        isProviderFor: function(ee, ce) {
          var pe = C.get(ee);
          return ae(pe) ? !1 : pe.has(ce);
        },
        OrdinaryDefineOwnMetadata: It,
        OrdinaryHasOwnMetadata: me,
        OrdinaryGetOwnMetadata: Et,
        OrdinaryOwnMetadataKeys: De,
        OrdinaryDeleteMetadata: Z
      };
      return k.registerProvider(N), N;
      function K(ee, ce, pe) {
        var Qe = C.get(ee), it = !1;
        if (ae(Qe)) {
          if (!pe)
            return;
          Qe = new H(), C.set(ee, Qe), it = !0;
        }
        var xt = Qe.get(ce);
        if (ae(xt)) {
          if (!pe)
            return;
          if (xt = new H(), Qe.set(ce, xt), !_.setProvider(ee, ce, N))
            throw Qe.delete(ce), it && C.delete(ee), new Error("Wrong provider for target.");
        }
        return xt;
      }
      function me(ee, ce, pe) {
        var Qe = K(
          ce,
          pe,
          /*Create*/
          !1
        );
        return ae(Qe) ? !1 : ds(Qe.has(ee));
      }
      function Et(ee, ce, pe) {
        var Qe = K(
          ce,
          pe,
          /*Create*/
          !1
        );
        if (!ae(Qe))
          return Qe.get(ee);
      }
      function It(ee, ce, pe, Qe) {
        var it = K(
          pe,
          Qe,
          /*Create*/
          !0
        );
        it.set(ee, ce);
      }
      function De(ee, ce) {
        var pe = [], Qe = K(
          ee,
          ce,
          /*Create*/
          !1
        );
        if (ae(Qe))
          return pe;
        for (var it = Qe.keys(), xt = vs(it), zt = 0; ; ) {
          var Pi = Yr(xt);
          if (!Pi)
            return pe.length = zt, pe;
          var Es = ms(Pi);
          try {
            pe[zt] = Es;
          } catch (jo) {
            try {
              ei(xt);
            } finally {
              throw jo;
            }
          }
          zt++;
        }
      }
      function Z(ee, ce, pe) {
        var Qe = K(
          ce,
          pe,
          /*Create*/
          !1
        );
        if (ae(Qe) || !Qe.delete(ee))
          return !1;
        if (Qe.size === 0) {
          var it = C.get(ce);
          ae(it) || (it.delete(pe), it.size === 0 && C.delete(it));
        }
        return !0;
      }
    }
    function xs(_) {
      var C = _.defineMetadata, N = _.hasOwnMetadata, K = _.getOwnMetadata, me = _.getOwnMetadataKeys, Et = _.deleteMetadata, It = new m(), De = {
        isProviderFor: function(Z, ee) {
          var ce = It.get(Z);
          return !ae(ce) && ce.has(ee) ? !0 : me(Z, ee).length ? (ae(ce) && (ce = new T(), It.set(Z, ce)), ce.add(ee), !0) : !1;
        },
        OrdinaryDefineOwnMetadata: C,
        OrdinaryHasOwnMetadata: N,
        OrdinaryGetOwnMetadata: K,
        OrdinaryOwnMetadataKeys: me,
        OrdinaryDeleteMetadata: Et
      };
      return De;
    }
    function Jr(_, C, N) {
      var K = k.getProvider(_, C);
      if (!ae(K))
        return K;
      if (N) {
        if (k.setProvider(_, C, I))
          return I;
        throw new Error("Illegal state.");
      }
    }
    function As() {
      var _ = {}, C = [], N = (
        /** @class */
        function() {
          function De(Z, ee, ce) {
            this._index = 0, this._keys = Z, this._values = ee, this._selector = ce;
          }
          return De.prototype["@@iterator"] = function() {
            return this;
          }, De.prototype[o] = function() {
            return this;
          }, De.prototype.next = function() {
            var Z = this._index;
            if (Z >= 0 && Z < this._keys.length) {
              var ee = this._selector(this._keys[Z], this._values[Z]);
              return Z + 1 >= this._keys.length ? (this._index = -1, this._keys = C, this._values = C) : this._index++, { value: ee, done: !1 };
            }
            return { value: void 0, done: !0 };
          }, De.prototype.throw = function(Z) {
            throw this._index >= 0 && (this._index = -1, this._keys = C, this._values = C), Z;
          }, De.prototype.return = function(Z) {
            return this._index >= 0 && (this._index = -1, this._keys = C, this._values = C), { value: Z, done: !0 };
          }, De;
        }()
      ), K = (
        /** @class */
        function() {
          function De() {
            this._keys = [], this._values = [], this._cacheKey = _, this._cacheIndex = -2;
          }
          return Object.defineProperty(De.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: !0,
            configurable: !0
          }), De.prototype.has = function(Z) {
            return this._find(
              Z,
              /*insert*/
              !1
            ) >= 0;
          }, De.prototype.get = function(Z) {
            var ee = this._find(
              Z,
              /*insert*/
              !1
            );
            return ee >= 0 ? this._values[ee] : void 0;
          }, De.prototype.set = function(Z, ee) {
            var ce = this._find(
              Z,
              /*insert*/
              !0
            );
            return this._values[ce] = ee, this;
          }, De.prototype.delete = function(Z) {
            var ee = this._find(
              Z,
              /*insert*/
              !1
            );
            if (ee >= 0) {
              for (var ce = this._keys.length, pe = ee + 1; pe < ce; pe++)
                this._keys[pe - 1] = this._keys[pe], this._values[pe - 1] = this._values[pe];
              return this._keys.length--, this._values.length--, gs(Z, this._cacheKey) && (this._cacheKey = _, this._cacheIndex = -2), !0;
            }
            return !1;
          }, De.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = _, this._cacheIndex = -2;
          }, De.prototype.keys = function() {
            return new N(this._keys, this._values, me);
          }, De.prototype.values = function() {
            return new N(this._keys, this._values, Et);
          }, De.prototype.entries = function() {
            return new N(this._keys, this._values, It);
          }, De.prototype["@@iterator"] = function() {
            return this.entries();
          }, De.prototype[o] = function() {
            return this.entries();
          }, De.prototype._find = function(Z, ee) {
            if (!gs(this._cacheKey, Z)) {
              this._cacheIndex = -1;
              for (var ce = 0; ce < this._keys.length; ce++)
                if (gs(this._keys[ce], Z)) {
                  this._cacheIndex = ce;
                  break;
                }
            }
            return this._cacheIndex < 0 && ee && (this._cacheIndex = this._keys.length, this._keys.push(Z), this._values.push(void 0)), this._cacheIndex;
          }, De;
        }()
      );
      return K;
      function me(De, Z) {
        return De;
      }
      function Et(De, Z) {
        return Z;
      }
      function It(De, Z) {
        return [De, Z];
      }
    }
    function Ss() {
      var _ = (
        /** @class */
        function() {
          function C() {
            this._map = new H();
          }
          return Object.defineProperty(C.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: !0,
            configurable: !0
          }), C.prototype.has = function(N) {
            return this._map.has(N);
          }, C.prototype.add = function(N) {
            return this._map.set(N, N), this;
          }, C.prototype.delete = function(N) {
            return this._map.delete(N);
          }, C.prototype.clear = function() {
            this._map.clear();
          }, C.prototype.keys = function() {
            return this._map.keys();
          }, C.prototype.values = function() {
            return this._map.keys();
          }, C.prototype.entries = function() {
            return this._map.entries();
          }, C.prototype["@@iterator"] = function() {
            return this.keys();
          }, C.prototype[o] = function() {
            return this.keys();
          }, C;
        }()
      );
      return _;
    }
    function Po() {
      var _ = 16, C = v.create(), N = K();
      return (
        /** @class */
        function() {
          function Z() {
            this._key = K();
          }
          return Z.prototype.has = function(ee) {
            var ce = me(
              ee,
              /*create*/
              !1
            );
            return ce !== void 0 ? v.has(ce, this._key) : !1;
          }, Z.prototype.get = function(ee) {
            var ce = me(
              ee,
              /*create*/
              !1
            );
            return ce !== void 0 ? v.get(ce, this._key) : void 0;
          }, Z.prototype.set = function(ee, ce) {
            var pe = me(
              ee,
              /*create*/
              !0
            );
            return pe[this._key] = ce, this;
          }, Z.prototype.delete = function(ee) {
            var ce = me(
              ee,
              /*create*/
              !1
            );
            return ce !== void 0 ? delete ce[this._key] : !1;
          }, Z.prototype.clear = function() {
            this._key = K();
          }, Z;
        }()
      );
      function K() {
        var Z;
        do
          Z = "@@WeakMap@@" + De();
        while (v.has(C, Z));
        return C[Z] = !0, Z;
      }
      function me(Z, ee) {
        if (!n.call(Z, N)) {
          if (!ee)
            return;
          Object.defineProperty(Z, N, { value: v.create() });
        }
        return Z[N];
      }
      function Et(Z, ee) {
        for (var ce = 0; ce < ee; ++ce)
          Z[ce] = Math.random() * 255 | 0;
        return Z;
      }
      function It(Z) {
        if (typeof Uint8Array == "function") {
          var ee = new Uint8Array(Z);
          return typeof crypto < "u" ? crypto.getRandomValues(ee) : typeof msCrypto < "u" ? msCrypto.getRandomValues(ee) : Et(ee, Z), ee;
        }
        return Et(new Array(Z), Z);
      }
      function De() {
        var Z = It(_);
        Z[6] = Z[6] & 79 | 64, Z[8] = Z[8] & 191 | 128;
        for (var ee = "", ce = 0; ce < _; ++ce) {
          var pe = Z[ce];
          (ce === 4 || ce === 6 || ce === 8) && (ee += "-"), pe < 16 && (ee += "0"), ee += pe.toString(16).toLowerCase();
        }
        return ee;
      }
    }
    function _s(_) {
      return _.__ = void 0, delete _.__, _;
    }
  });
})($f || ($f = {}));
/*!
 * MIT License
 * 
 * Copyright (c) 2017-2022 Peculiar Ventures, LLC
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
const xg = "[object ArrayBuffer]";
class W {
  static isArrayBuffer(e) {
    return Object.prototype.toString.call(e) === xg;
  }
  static toArrayBuffer(e) {
    return this.isArrayBuffer(e) ? e : e.byteLength === e.buffer.byteLength || e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? e.buffer : this.toUint8Array(e.buffer).slice(e.byteOffset, e.byteOffset + e.byteLength).buffer;
  }
  static toUint8Array(e) {
    return this.toView(e, Uint8Array);
  }
  static toView(e, t) {
    if (e.constructor === t)
      return e;
    if (this.isArrayBuffer(e))
      return new t(e);
    if (this.isArrayBufferView(e))
      return new t(e.buffer, e.byteOffset, e.byteLength);
    throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
  }
  static isBufferSource(e) {
    return this.isArrayBufferView(e) || this.isArrayBuffer(e);
  }
  static isArrayBufferView(e) {
    return ArrayBuffer.isView(e) || e && this.isArrayBuffer(e.buffer);
  }
  static isEqual(e, t) {
    const n = W.toUint8Array(e), i = W.toUint8Array(t);
    if (n.length !== i.byteLength)
      return !1;
    for (let s = 0; s < n.length; s++)
      if (n[s] !== i[s])
        return !1;
    return !0;
  }
  static concat(...e) {
    let t;
    Array.isArray(e[0]) && !(e[1] instanceof Function) || Array.isArray(e[0]) && e[1] instanceof Function ? t = e[0] : e[e.length - 1] instanceof Function ? t = e.slice(0, e.length - 1) : t = e;
    let n = 0;
    for (const o of t)
      n += o.byteLength;
    const i = new Uint8Array(n);
    let s = 0;
    for (const o of t) {
      const c = this.toUint8Array(o);
      i.set(c, s), s += c.length;
    }
    return e[e.length - 1] instanceof Function ? this.toView(i, e[e.length - 1]) : i.buffer;
  }
}
const zc = "string", Ag = /^[0-9a-f]+$/i, Sg = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, _g = /^[a-zA-Z0-9-_]+$/;
class Mf {
  static fromString(e) {
    const t = unescape(encodeURIComponent(e)), n = new Uint8Array(t.length);
    for (let i = 0; i < t.length; i++)
      n[i] = t.charCodeAt(i);
    return n.buffer;
  }
  static toString(e) {
    const t = W.toUint8Array(e);
    let n = "";
    for (let s = 0; s < t.length; s++)
      n += String.fromCharCode(t[s]);
    return decodeURIComponent(escape(n));
  }
}
class Xr {
  static toString(e, t = !1) {
    const n = W.toArrayBuffer(e), i = new DataView(n);
    let s = "";
    for (let o = 0; o < n.byteLength; o += 2) {
      const c = i.getUint16(o, t);
      s += String.fromCharCode(c);
    }
    return s;
  }
  static fromString(e, t = !1) {
    const n = new ArrayBuffer(e.length * 2), i = new DataView(n);
    for (let s = 0; s < e.length; s++)
      i.setUint16(s * 2, e.charCodeAt(s), t);
    return n;
  }
}
class le {
  static isHex(e) {
    return typeof e === zc && Ag.test(e);
  }
  static isBase64(e) {
    return typeof e === zc && Sg.test(e);
  }
  static isBase64Url(e) {
    return typeof e === zc && _g.test(e);
  }
  static ToString(e, t = "utf8") {
    const n = W.toUint8Array(e);
    switch (t.toLowerCase()) {
      case "utf8":
        return this.ToUtf8String(n);
      case "binary":
        return this.ToBinary(n);
      case "hex":
        return this.ToHex(n);
      case "base64":
        return this.ToBase64(n);
      case "base64url":
        return this.ToBase64Url(n);
      case "utf16le":
        return Xr.toString(n, !0);
      case "utf16":
      case "utf16be":
        return Xr.toString(n);
      default:
        throw new Error(`Unknown type of encoding '${t}'`);
    }
  }
  static FromString(e, t = "utf8") {
    if (!e)
      return new ArrayBuffer(0);
    switch (t.toLowerCase()) {
      case "utf8":
        return this.FromUtf8String(e);
      case "binary":
        return this.FromBinary(e);
      case "hex":
        return this.FromHex(e);
      case "base64":
        return this.FromBase64(e);
      case "base64url":
        return this.FromBase64Url(e);
      case "utf16le":
        return Xr.fromString(e, !0);
      case "utf16":
      case "utf16be":
        return Xr.fromString(e);
      default:
        throw new Error(`Unknown type of encoding '${t}'`);
    }
  }
  static ToBase64(e) {
    const t = W.toUint8Array(e);
    if (typeof btoa < "u") {
      const n = this.ToString(t, "binary");
      return btoa(n);
    } else
      return Buffer.from(t).toString("base64");
  }
  static FromBase64(e) {
    const t = this.formatString(e);
    if (!t)
      return new ArrayBuffer(0);
    if (!le.isBase64(t))
      throw new TypeError("Argument 'base64Text' is not Base64 encoded");
    return typeof atob < "u" ? this.FromBinary(atob(t)) : new Uint8Array(Buffer.from(t, "base64")).buffer;
  }
  static FromBase64Url(e) {
    const t = this.formatString(e);
    if (!t)
      return new ArrayBuffer(0);
    if (!le.isBase64Url(t))
      throw new TypeError("Argument 'base64url' is not Base64Url encoded");
    return this.FromBase64(this.Base64Padding(t.replace(/\-/g, "+").replace(/\_/g, "/")));
  }
  static ToBase64Url(e) {
    return this.ToBase64(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
  }
  static FromUtf8String(e, t = le.DEFAULT_UTF8_ENCODING) {
    switch (t) {
      case "ascii":
        return this.FromBinary(e);
      case "utf8":
        return Mf.fromString(e);
      case "utf16":
      case "utf16be":
        return Xr.fromString(e);
      case "utf16le":
      case "usc2":
        return Xr.fromString(e, !0);
      default:
        throw new Error(`Unknown type of encoding '${t}'`);
    }
  }
  static ToUtf8String(e, t = le.DEFAULT_UTF8_ENCODING) {
    switch (t) {
      case "ascii":
        return this.ToBinary(e);
      case "utf8":
        return Mf.toString(e);
      case "utf16":
      case "utf16be":
        return Xr.toString(e);
      case "utf16le":
      case "usc2":
        return Xr.toString(e, !0);
      default:
        throw new Error(`Unknown type of encoding '${t}'`);
    }
  }
  static FromBinary(e) {
    const t = e.length, n = new Uint8Array(t);
    for (let i = 0; i < t; i++)
      n[i] = e.charCodeAt(i);
    return n.buffer;
  }
  static ToBinary(e) {
    const t = W.toUint8Array(e);
    let n = "";
    for (let i = 0; i < t.length; i++)
      n += String.fromCharCode(t[i]);
    return n;
  }
  static ToHex(e) {
    const t = W.toUint8Array(e);
    let n = "";
    const i = t.length;
    for (let s = 0; s < i; s++) {
      const o = t[s];
      o < 16 && (n += "0"), n += o.toString(16);
    }
    return n;
  }
  static FromHex(e) {
    let t = this.formatString(e);
    if (!t)
      return new ArrayBuffer(0);
    if (!le.isHex(t))
      throw new TypeError("Argument 'hexString' is not HEX encoded");
    t.length % 2 && (t = `0${t}`);
    const n = new Uint8Array(t.length / 2);
    for (let i = 0; i < t.length; i = i + 2) {
      const s = t.slice(i, i + 2);
      n[i / 2] = parseInt(s, 16);
    }
    return n.buffer;
  }
  static ToUtf16String(e, t = !1) {
    return Xr.toString(e, t);
  }
  static FromUtf16String(e, t = !1) {
    return Xr.fromString(e, t);
  }
  static Base64Padding(e) {
    const t = 4 - e.length % 4;
    if (t < 4)
      for (let n = 0; n < t; n++)
        e += "=";
    return e;
  }
  static formatString(e) {
    return (e == null ? void 0 : e.replace(/[\n\r\t ]/g, "")) || "";
  }
}
le.DEFAULT_UTF8_ENCODING = "utf8";
function Eg(...r) {
  const e = r.map((i) => i.byteLength).reduce((i, s) => i + s), t = new Uint8Array(e);
  let n = 0;
  return r.map((i) => new Uint8Array(i)).forEach((i) => {
    for (const s of i)
      t[n++] = s;
  }), t.buffer;
}
function qo(r, e) {
  if (!(r && e) || r.byteLength !== e.byteLength)
    return !1;
  const t = new Uint8Array(r), n = new Uint8Array(e);
  for (let i = 0; i < r.byteLength; i++)
    if (t[i] !== n[i])
      return !1;
  return !0;
}
/*!
 Copyright (c) Peculiar Ventures, LLC
*/
function Li(r, e) {
  let t = 0;
  if (r.length === 1)
    return r[0];
  for (let n = r.length - 1; n >= 0; n--)
    t += r[r.length - 1 - n] * Math.pow(2, e * n);
  return t;
}
function ui(r, e, t = -1) {
  const n = t;
  let i = r, s = 0, o = Math.pow(2, e);
  for (let c = 1; c < 8; c++) {
    if (r < o) {
      let u;
      if (n < 0)
        u = new ArrayBuffer(c), s = c;
      else {
        if (n < c)
          return new ArrayBuffer(0);
        u = new ArrayBuffer(n), s = n;
      }
      const h = new Uint8Array(u);
      for (let v = c - 1; v >= 0; v--) {
        const b = Math.pow(2, v * e);
        h[s - v - 1] = Math.floor(i / b), i -= h[s - v - 1] * b;
      }
      return u;
    }
    o *= Math.pow(2, e);
  }
  return new ArrayBuffer(0);
}
function fl(...r) {
  let e = 0, t = 0;
  for (const s of r)
    e += s.length;
  const n = new ArrayBuffer(e), i = new Uint8Array(n);
  for (const s of r)
    i.set(s, t), t += s.length;
  return i;
}
function Nd() {
  const r = new Uint8Array(this.valueHex);
  if (this.valueHex.byteLength >= 2) {
    const c = r[0] === 255 && r[1] & 128, u = r[0] === 0 && (r[1] & 128) === 0;
    (c || u) && this.warnings.push("Needlessly long format");
  }
  const e = new ArrayBuffer(this.valueHex.byteLength), t = new Uint8Array(e);
  for (let c = 0; c < this.valueHex.byteLength; c++)
    t[c] = 0;
  t[0] = r[0] & 128;
  const n = Li(t, 8), i = new ArrayBuffer(this.valueHex.byteLength), s = new Uint8Array(i);
  for (let c = 0; c < this.valueHex.byteLength; c++)
    s[c] = r[c];
  return s[0] &= 127, Li(s, 8) - n;
}
function Ig(r) {
  const e = r < 0 ? r * -1 : r;
  let t = 128;
  for (let n = 1; n < 8; n++) {
    if (e <= t) {
      if (r < 0) {
        const o = t - e, c = ui(o, 8, n), u = new Uint8Array(c);
        return u[0] |= 128, c;
      }
      let i = ui(e, 8, n), s = new Uint8Array(i);
      if (s[0] & 128) {
        const o = i.slice(0), c = new Uint8Array(o);
        i = new ArrayBuffer(i.byteLength + 1), s = new Uint8Array(i);
        for (let u = 0; u < o.byteLength; u++)
          s[u + 1] = c[u];
        s[0] = 0;
      }
      return i;
    }
    t *= Math.pow(2, 8);
  }
  return new ArrayBuffer(0);
}
function kg(r, e) {
  if (r.byteLength !== e.byteLength)
    return !1;
  const t = new Uint8Array(r), n = new Uint8Array(e);
  for (let i = 0; i < t.length; i++)
    if (t[i] !== n[i])
      return !1;
  return !0;
}
function _r(r, e) {
  const t = r.toString(10);
  if (e < t.length)
    return "";
  const n = e - t.length, i = new Array(n);
  for (let o = 0; o < n; o++)
    i[o] = "0";
  return i.join("").concat(t);
}
/*!
 * Copyright (c) 2014, GMO GlobalSign
 * Copyright (c) 2015-2022, Peculiar Ventures
 * All rights reserved.
 * 
 * Author 2014-2019, Yury Strozhevsky
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice, this
 *   list of conditions and the following disclaimer in the documentation and/or
 *   other materials provided with the distribution.
 * 
 * * Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */
function Zo() {
  if (typeof BigInt > "u")
    throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.");
}
function Du(r) {
  let e = 0, t = 0;
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    e += s.byteLength;
  }
  const n = new Uint8Array(e);
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    n.set(new Uint8Array(s), t), t += s.byteLength;
  }
  return n.buffer;
}
function Cn(r, e, t, n) {
  return e instanceof Uint8Array ? e.byteLength ? t < 0 ? (r.error = "Wrong parameter: inputOffset less than zero", !1) : n < 0 ? (r.error = "Wrong parameter: inputLength less than zero", !1) : e.byteLength - t - n < 0 ? (r.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", !1) : !0 : (r.error = "Wrong parameter: inputBuffer has zero length", !1) : (r.error = "Wrong parameter: inputBuffer must be 'Uint8Array'", !1);
}
class qa {
  constructor() {
    this.items = [];
  }
  write(e) {
    this.items.push(e);
  }
  final() {
    return Du(this.items);
  }
}
const Is = [new Uint8Array([1])], Vf = "0123456789", Kc = "name", Lf = "valueHexView", Cg = "isHexOnly", Bg = "idBlock", Og = "tagClass", Tg = "tagNumber", Ng = "isConstructed", Pg = "fromBER", jg = "toBER", Rg = "local", gr = "", Zr = new ArrayBuffer(0), Za = new Uint8Array(0), Ms = "EndOfContent", Pd = "OCTET STRING", jd = "BIT STRING";
function dn(r) {
  var e;
  return e = class extends r {
    constructor(...n) {
      var i;
      super(...n);
      const s = n[0] || {};
      this.isHexOnly = (i = s.isHexOnly) !== null && i !== void 0 ? i : !1, this.valueHexView = s.valueHex ? W.toUint8Array(s.valueHex) : Za;
    }
    get valueHex() {
      return this.valueHexView.slice().buffer;
    }
    set valueHex(n) {
      this.valueHexView = new Uint8Array(n);
    }
    fromBER(n, i, s) {
      const o = n instanceof ArrayBuffer ? new Uint8Array(n) : n;
      if (!Cn(this, o, i, s))
        return -1;
      const c = i + s;
      return this.valueHexView = o.subarray(i, c), this.valueHexView.length ? (this.blockLength = s, c) : (this.warnings.push("Zero buffer length"), i);
    }
    toBER(n = !1) {
      return this.isHexOnly ? n ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.byteLength === this.valueHexView.buffer.byteLength ? this.valueHexView.buffer : this.valueHexView.slice().buffer : (this.error = "Flag 'isHexOnly' is not set, abort", Zr);
    }
    toJSON() {
      return {
        ...super.toJSON(),
        isHexOnly: this.isHexOnly,
        valueHex: le.ToHex(this.valueHexView)
      };
    }
  }, e.NAME = "hexBlock", e;
}
class ki {
  constructor({ blockLength: e = 0, error: t = gr, warnings: n = [], valueBeforeDecode: i = Za } = {}) {
    this.blockLength = e, this.error = t, this.warnings = n, this.valueBeforeDecodeView = W.toUint8Array(i);
  }
  static blockName() {
    return this.NAME;
  }
  get valueBeforeDecode() {
    return this.valueBeforeDecodeView.slice().buffer;
  }
  set valueBeforeDecode(e) {
    this.valueBeforeDecodeView = new Uint8Array(e);
  }
  toJSON() {
    return {
      blockName: this.constructor.NAME,
      blockLength: this.blockLength,
      error: this.error,
      warnings: this.warnings,
      valueBeforeDecode: le.ToHex(this.valueBeforeDecodeView)
    };
  }
}
ki.NAME = "baseBlock";
class hr extends ki {
  fromBER(e, t, n) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
  toBER(e, t) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
}
hr.NAME = "valueBlock";
class Rd extends dn(ki) {
  constructor({ idBlock: e = {} } = {}) {
    var t, n, i, s;
    super(), e ? (this.isHexOnly = (t = e.isHexOnly) !== null && t !== void 0 ? t : !1, this.valueHexView = e.valueHex ? W.toUint8Array(e.valueHex) : Za, this.tagClass = (n = e.tagClass) !== null && n !== void 0 ? n : -1, this.tagNumber = (i = e.tagNumber) !== null && i !== void 0 ? i : -1, this.isConstructed = (s = e.isConstructed) !== null && s !== void 0 ? s : !1) : (this.tagClass = -1, this.tagNumber = -1, this.isConstructed = !1);
  }
  toBER(e = !1) {
    let t = 0;
    switch (this.tagClass) {
      case 1:
        t |= 0;
        break;
      case 2:
        t |= 64;
        break;
      case 3:
        t |= 128;
        break;
      case 4:
        t |= 192;
        break;
      default:
        return this.error = "Unknown tag class", Zr;
    }
    if (this.isConstructed && (t |= 32), this.tagNumber < 31 && !this.isHexOnly) {
      const i = new Uint8Array(1);
      if (!e) {
        let s = this.tagNumber;
        s &= 31, t |= s, i[0] = t;
      }
      return i.buffer;
    }
    if (!this.isHexOnly) {
      const i = ui(this.tagNumber, 7), s = new Uint8Array(i), o = i.byteLength, c = new Uint8Array(o + 1);
      if (c[0] = t | 31, !e) {
        for (let u = 0; u < o - 1; u++)
          c[u + 1] = s[u] | 128;
        c[o] = s[o - 1];
      }
      return c.buffer;
    }
    const n = new Uint8Array(this.valueHexView.byteLength + 1);
    if (n[0] = t | 31, !e) {
      const i = this.valueHexView;
      for (let s = 0; s < i.length - 1; s++)
        n[s + 1] = i[s] | 128;
      n[this.valueHexView.byteLength] = i[i.length - 1];
    }
    return n.buffer;
  }
  fromBER(e, t, n) {
    const i = W.toUint8Array(e);
    if (!Cn(this, i, t, n))
      return -1;
    const s = i.subarray(t, t + n);
    if (s.length === 0)
      return this.error = "Zero buffer length", -1;
    switch (s[0] & 192) {
      case 0:
        this.tagClass = 1;
        break;
      case 64:
        this.tagClass = 2;
        break;
      case 128:
        this.tagClass = 3;
        break;
      case 192:
        this.tagClass = 4;
        break;
      default:
        return this.error = "Unknown tag class", -1;
    }
    this.isConstructed = (s[0] & 32) === 32, this.isHexOnly = !1;
    const c = s[0] & 31;
    if (c !== 31)
      this.tagNumber = c, this.blockLength = 1;
    else {
      let u = 1, h = this.valueHexView = new Uint8Array(255), v = 255;
      for (; s[u] & 128; ) {
        if (h[u - 1] = s[u] & 127, u++, u >= s.length)
          return this.error = "End of input reached before message was fully decoded", -1;
        if (u === v) {
          v += 255;
          const H = new Uint8Array(v);
          for (let T = 0; T < h.length; T++)
            H[T] = h[T];
          h = this.valueHexView = new Uint8Array(v);
        }
      }
      this.blockLength = u + 1, h[u - 1] = s[u] & 127;
      const b = new Uint8Array(u);
      for (let H = 0; H < u; H++)
        b[H] = h[H];
      h = this.valueHexView = new Uint8Array(u), h.set(b), this.blockLength <= 9 ? this.tagNumber = Li(h, 7) : (this.isHexOnly = !0, this.warnings.push("Tag too long, represented as hex-coded"));
    }
    if (this.tagClass === 1 && this.isConstructed)
      switch (this.tagNumber) {
        case 1:
        case 2:
        case 5:
        case 6:
        case 9:
        case 13:
        case 14:
        case 23:
        case 24:
        case 31:
        case 32:
        case 33:
        case 34:
          return this.error = "Constructed encoding used for primitive type", -1;
      }
    return t + this.blockLength;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      tagClass: this.tagClass,
      tagNumber: this.tagNumber,
      isConstructed: this.isConstructed
    };
  }
}
Rd.NAME = "identificationBlock";
class Ud extends ki {
  constructor({ lenBlock: e = {} } = {}) {
    var t, n, i;
    super(), this.isIndefiniteForm = (t = e.isIndefiniteForm) !== null && t !== void 0 ? t : !1, this.longFormUsed = (n = e.longFormUsed) !== null && n !== void 0 ? n : !1, this.length = (i = e.length) !== null && i !== void 0 ? i : 0;
  }
  fromBER(e, t, n) {
    const i = W.toUint8Array(e);
    if (!Cn(this, i, t, n))
      return -1;
    const s = i.subarray(t, t + n);
    if (s.length === 0)
      return this.error = "Zero buffer length", -1;
    if (s[0] === 255)
      return this.error = "Length block 0xFF is reserved by standard", -1;
    if (this.isIndefiniteForm = s[0] === 128, this.isIndefiniteForm)
      return this.blockLength = 1, t + this.blockLength;
    if (this.longFormUsed = !!(s[0] & 128), this.longFormUsed === !1)
      return this.length = s[0], this.blockLength = 1, t + this.blockLength;
    const o = s[0] & 127;
    if (o > 8)
      return this.error = "Too big integer", -1;
    if (o + 1 > s.length)
      return this.error = "End of input reached before message was fully decoded", -1;
    const c = t + 1, u = i.subarray(c, c + o);
    return u[o - 1] === 0 && this.warnings.push("Needlessly long encoded length"), this.length = Li(u, 8), this.longFormUsed && this.length <= 127 && this.warnings.push("Unnecessary usage of long length form"), this.blockLength = o + 1, t + this.blockLength;
  }
  toBER(e = !1) {
    let t, n;
    if (this.length > 127 && (this.longFormUsed = !0), this.isIndefiniteForm)
      return t = new ArrayBuffer(1), e === !1 && (n = new Uint8Array(t), n[0] = 128), t;
    if (this.longFormUsed) {
      const i = ui(this.length, 8);
      if (i.byteLength > 127)
        return this.error = "Too big length", Zr;
      if (t = new ArrayBuffer(i.byteLength + 1), e)
        return t;
      const s = new Uint8Array(i);
      n = new Uint8Array(t), n[0] = i.byteLength | 128;
      for (let o = 0; o < i.byteLength; o++)
        n[o + 1] = s[o];
      return t;
    }
    return t = new ArrayBuffer(1), e === !1 && (n = new Uint8Array(t), n[0] = this.length), t;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      isIndefiniteForm: this.isIndefiniteForm,
      longFormUsed: this.longFormUsed,
      length: this.length
    };
  }
}
Ud.NAME = "lengthBlock";
const se = {};
class Xt extends ki {
  constructor({ name: e = gr, optional: t = !1, primitiveSchema: n, ...i } = {}, s) {
    super(i), this.name = e, this.optional = t, n && (this.primitiveSchema = n), this.idBlock = new Rd(i), this.lenBlock = new Ud(i), this.valueBlock = s ? new s(i) : new hr(i);
  }
  fromBER(e, t, n) {
    const i = this.valueBlock.fromBER(e, t, this.lenBlock.isIndefiniteForm ? n : this.lenBlock.length);
    return i === -1 ? (this.error = this.valueBlock.error, i) : (this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength), i);
  }
  toBER(e, t) {
    const n = t || new qa();
    t || Dd(this);
    const i = this.idBlock.toBER(e);
    if (n.write(i), this.lenBlock.isIndefiniteForm)
      n.write(new Uint8Array([128]).buffer), this.valueBlock.toBER(e, n), n.write(new ArrayBuffer(2));
    else {
      const s = this.valueBlock.toBER(e);
      this.lenBlock.length = s.byteLength;
      const o = this.lenBlock.toBER(e);
      n.write(o), n.write(s);
    }
    return t ? Zr : n.final();
  }
  toJSON() {
    const e = {
      ...super.toJSON(),
      idBlock: this.idBlock.toJSON(),
      lenBlock: this.lenBlock.toJSON(),
      valueBlock: this.valueBlock.toJSON(),
      name: this.name,
      optional: this.optional
    };
    return this.primitiveSchema && (e.primitiveSchema = this.primitiveSchema.toJSON()), e;
  }
  toString(e = "ascii") {
    return e === "ascii" ? this.onAsciiEncoding() : le.ToHex(this.toBER());
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${le.ToHex(this.valueBlock.valueBeforeDecodeView)}`;
  }
  isEqual(e) {
    if (this === e)
      return !0;
    if (!(e instanceof this.constructor))
      return !1;
    const t = this.toBER(), n = e.toBER();
    return kg(t, n);
  }
}
Xt.NAME = "BaseBlock";
function Dd(r) {
  if (r instanceof se.Constructed)
    for (const e of r.valueBlock.value)
      Dd(e) && (r.lenBlock.isIndefiniteForm = !0);
  return !!r.lenBlock.isIndefiniteForm;
}
class $u extends Xt {
  constructor({ value: e = gr, ...t } = {}, n) {
    super(t, n), e && this.fromString(e);
  }
  getValue() {
    return this.valueBlock.value;
  }
  setValue(e) {
    this.valueBlock.value = e;
  }
  fromBER(e, t, n) {
    const i = this.valueBlock.fromBER(e, t, this.lenBlock.isIndefiniteForm ? n : this.lenBlock.length);
    return i === -1 ? (this.error = this.valueBlock.error, i) : (this.fromBuffer(this.valueBlock.valueHexView), this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength), i);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : '${this.valueBlock.value}'`;
  }
}
$u.NAME = "BaseStringBlock";
class $d extends dn(hr) {
  constructor({ isHexOnly: e = !0, ...t } = {}) {
    super(t), this.isHexOnly = e;
  }
}
$d.NAME = "PrimitiveValueBlock";
var Md;
class go extends Xt {
  constructor(e = {}) {
    super(e, $d), this.idBlock.isConstructed = !1;
  }
}
Md = go;
se.Primitive = Md;
go.NAME = "PRIMITIVE";
function Ug(r, e) {
  if (r instanceof e)
    return r;
  const t = new e();
  return t.idBlock = r.idBlock, t.lenBlock = r.lenBlock, t.warnings = r.warnings, t.valueBeforeDecodeView = r.valueBeforeDecodeView, t;
}
function ss(r, e = 0, t = r.length) {
  const n = e;
  let i = new Xt({}, hr);
  const s = new ki();
  if (!Cn(s, r, e, t))
    return i.error = s.error, {
      offset: -1,
      result: i
    };
  if (!r.subarray(e, e + t).length)
    return i.error = "Zero buffer length", {
      offset: -1,
      result: i
    };
  let c = i.idBlock.fromBER(r, e, t);
  if (i.idBlock.warnings.length && i.warnings.concat(i.idBlock.warnings), c === -1)
    return i.error = i.idBlock.error, {
      offset: -1,
      result: i
    };
  if (e = c, t -= i.idBlock.blockLength, c = i.lenBlock.fromBER(r, e, t), i.lenBlock.warnings.length && i.warnings.concat(i.lenBlock.warnings), c === -1)
    return i.error = i.lenBlock.error, {
      offset: -1,
      result: i
    };
  if (e = c, t -= i.lenBlock.blockLength, !i.idBlock.isConstructed && i.lenBlock.isIndefiniteForm)
    return i.error = "Indefinite length form used for primitive encoding form", {
      offset: -1,
      result: i
    };
  let u = Xt;
  switch (i.idBlock.tagClass) {
    case 1:
      if (i.idBlock.tagNumber >= 37 && i.idBlock.isHexOnly === !1)
        return i.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard", {
          offset: -1,
          result: i
        };
      switch (i.idBlock.tagNumber) {
        case 0:
          if (i.idBlock.isConstructed && i.lenBlock.length > 0)
            return i.error = "Type [UNIVERSAL 0] is reserved", {
              offset: -1,
              result: i
            };
          u = se.EndOfContent;
          break;
        case 1:
          u = se.Boolean;
          break;
        case 2:
          u = se.Integer;
          break;
        case 3:
          u = se.BitString;
          break;
        case 4:
          u = se.OctetString;
          break;
        case 5:
          u = se.Null;
          break;
        case 6:
          u = se.ObjectIdentifier;
          break;
        case 10:
          u = se.Enumerated;
          break;
        case 12:
          u = se.Utf8String;
          break;
        case 13:
          u = se.RelativeObjectIdentifier;
          break;
        case 14:
          u = se.TIME;
          break;
        case 15:
          return i.error = "[UNIVERSAL 15] is reserved by ASN.1 standard", {
            offset: -1,
            result: i
          };
        case 16:
          u = se.Sequence;
          break;
        case 17:
          u = se.Set;
          break;
        case 18:
          u = se.NumericString;
          break;
        case 19:
          u = se.PrintableString;
          break;
        case 20:
          u = se.TeletexString;
          break;
        case 21:
          u = se.VideotexString;
          break;
        case 22:
          u = se.IA5String;
          break;
        case 23:
          u = se.UTCTime;
          break;
        case 24:
          u = se.GeneralizedTime;
          break;
        case 25:
          u = se.GraphicString;
          break;
        case 26:
          u = se.VisibleString;
          break;
        case 27:
          u = se.GeneralString;
          break;
        case 28:
          u = se.UniversalString;
          break;
        case 29:
          u = se.CharacterString;
          break;
        case 30:
          u = se.BmpString;
          break;
        case 31:
          u = se.DATE;
          break;
        case 32:
          u = se.TimeOfDay;
          break;
        case 33:
          u = se.DateTime;
          break;
        case 34:
          u = se.Duration;
          break;
        default: {
          const h = i.idBlock.isConstructed ? new se.Constructed() : new se.Primitive();
          h.idBlock = i.idBlock, h.lenBlock = i.lenBlock, h.warnings = i.warnings, i = h;
        }
      }
      break;
    case 2:
    case 3:
    case 4:
    default:
      u = i.idBlock.isConstructed ? se.Constructed : se.Primitive;
  }
  return i = Ug(i, u), c = i.fromBER(r, e, i.lenBlock.isIndefiniteForm ? t : i.lenBlock.length), i.valueBeforeDecodeView = r.subarray(n, n + i.blockLength), {
    offset: c,
    result: i
  };
}
function $i(r) {
  if (!r.byteLength) {
    const e = new Xt({}, hr);
    return e.error = "Input buffer has zero length", {
      offset: -1,
      result: e
    };
  }
  return ss(W.toUint8Array(r).slice(), 0, r.byteLength);
}
function Dg(r, e) {
  return r ? 1 : e;
}
class Hn extends hr {
  constructor({ value: e = [], isIndefiniteForm: t = !1, ...n } = {}) {
    super(n), this.value = e, this.isIndefiniteForm = t;
  }
  fromBER(e, t, n) {
    const i = W.toUint8Array(e);
    if (!Cn(this, i, t, n))
      return -1;
    if (this.valueBeforeDecodeView = i.subarray(t, t + n), this.valueBeforeDecodeView.length === 0)
      return this.warnings.push("Zero buffer length"), t;
    let s = t;
    for (; Dg(this.isIndefiniteForm, n) > 0; ) {
      const o = ss(i, s, n);
      if (o.offset === -1)
        return this.error = o.result.error, this.warnings.concat(o.result.warnings), -1;
      if (s = o.offset, this.blockLength += o.result.blockLength, n -= o.result.blockLength, this.value.push(o.result), this.isIndefiniteForm && o.result.constructor.NAME === Ms)
        break;
    }
    return this.isIndefiniteForm && (this.value[this.value.length - 1].constructor.NAME === Ms ? this.value.pop() : this.warnings.push("No EndOfContent block encoded")), s;
  }
  toBER(e, t) {
    const n = t || new qa();
    for (let i = 0; i < this.value.length; i++)
      this.value[i].toBER(e, n);
    return t ? Zr : n.final();
  }
  toJSON() {
    const e = {
      ...super.toJSON(),
      isIndefiniteForm: this.isIndefiniteForm,
      value: []
    };
    for (const t of this.value)
      e.value.push(t.toJSON());
    return e;
  }
}
Hn.NAME = "ConstructedValueBlock";
var Vd;
class mr extends Xt {
  constructor(e = {}) {
    super(e, Hn), this.idBlock.isConstructed = !0;
  }
  fromBER(e, t, n) {
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    const i = this.valueBlock.fromBER(e, t, this.lenBlock.isIndefiniteForm ? n : this.lenBlock.length);
    return i === -1 ? (this.error = this.valueBlock.error, i) : (this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength), i);
  }
  onAsciiEncoding() {
    const e = [];
    for (const n of this.valueBlock.value)
      e.push(n.toString("ascii").split(`
`).map((i) => `  ${i}`).join(`
`));
    const t = this.idBlock.tagClass === 3 ? `[${this.idBlock.tagNumber}]` : this.constructor.NAME;
    return e.length ? `${t} :
${e.join(`
`)}` : `${t} :`;
  }
}
Vd = mr;
se.Constructed = Vd;
mr.NAME = "CONSTRUCTED";
class Ld extends hr {
  fromBER(e, t, n) {
    return t;
  }
  toBER(e) {
    return Zr;
  }
}
Ld.override = "EndOfContentValueBlock";
var Hd;
class Mu extends Xt {
  constructor(e = {}) {
    super(e, Ld), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 0;
  }
}
Hd = Mu;
se.EndOfContent = Hd;
Mu.NAME = Ms;
var Fd;
class fi extends Xt {
  constructor(e = {}) {
    super(e, hr), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 5;
  }
  fromBER(e, t, n) {
    return this.lenBlock.length > 0 && this.warnings.push("Non-zero length of value block for Null type"), this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.blockLength += n, t + n > e.byteLength ? (this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", -1) : t + n;
  }
  toBER(e, t) {
    const n = new ArrayBuffer(2);
    if (!e) {
      const i = new Uint8Array(n);
      i[0] = 5, i[1] = 0;
    }
    return t && t.write(n), n;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME}`;
  }
}
Fd = fi;
se.Null = Fd;
fi.NAME = "NULL";
class Gd extends dn(hr) {
  constructor({ value: e, ...t } = {}) {
    super(t), t.valueHex ? this.valueHexView = W.toUint8Array(t.valueHex) : this.valueHexView = new Uint8Array(1), e && (this.value = e);
  }
  get value() {
    for (const e of this.valueHexView)
      if (e > 0)
        return !0;
    return !1;
  }
  set value(e) {
    this.valueHexView[0] = e ? 255 : 0;
  }
  fromBER(e, t, n) {
    const i = W.toUint8Array(e);
    return Cn(this, i, t, n) ? (this.valueHexView = i.subarray(t, t + n), n > 1 && this.warnings.push("Boolean value encoded in more then 1 octet"), this.isHexOnly = !0, Nd.call(this), this.blockLength = n, t + n) : -1;
  }
  toBER() {
    return this.valueHexView.slice();
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.value
    };
  }
}
Gd.NAME = "BooleanValueBlock";
var zd;
let Wa = class extends Xt {
  constructor(e = {}) {
    super(e, Gd), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 1;
  }
  getValue() {
    return this.valueBlock.value;
  }
  setValue(e) {
    this.valueBlock.value = e;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.getValue}`;
  }
};
zd = Wa;
se.Boolean = zd;
Wa.NAME = "BOOLEAN";
class Kd extends dn(Hn) {
  constructor({ isConstructed: e = !1, ...t } = {}) {
    super(t), this.isConstructed = e;
  }
  fromBER(e, t, n) {
    let i = 0;
    if (this.isConstructed) {
      if (this.isHexOnly = !1, i = Hn.prototype.fromBER.call(this, e, t, n), i === -1)
        return i;
      for (let s = 0; s < this.value.length; s++) {
        const o = this.value[s].constructor.NAME;
        if (o === Ms) {
          if (this.isIndefiniteForm)
            break;
          return this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only", -1;
        }
        if (o !== Pd)
          return this.error = "OCTET STRING may consists of OCTET STRINGs only", -1;
      }
    } else
      this.isHexOnly = !0, i = super.fromBER(e, t, n), this.blockLength = n;
    return i;
  }
  toBER(e, t) {
    return this.isConstructed ? Hn.prototype.toBER.call(this, e, t) : e ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      isConstructed: this.isConstructed
    };
  }
}
Kd.NAME = "OctetStringValueBlock";
var qd;
let ai = class Zd extends Xt {
  constructor({ idBlock: e = {}, lenBlock: t = {}, ...n } = {}) {
    var i, s;
    (i = n.isConstructed) !== null && i !== void 0 || (n.isConstructed = !!(!((s = n.value) === null || s === void 0) && s.length)), super({
      idBlock: {
        isConstructed: n.isConstructed,
        ...e
      },
      lenBlock: {
        ...t,
        isIndefiniteForm: !!n.isIndefiniteForm
      },
      ...n
    }, Kd), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 4;
  }
  fromBER(e, t, n) {
    if (this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, n === 0)
      return this.idBlock.error.length === 0 && (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length === 0 && (this.blockLength += this.lenBlock.blockLength), t;
    if (!this.valueBlock.isConstructed) {
      const s = (e instanceof ArrayBuffer ? new Uint8Array(e) : e).subarray(t, t + n);
      try {
        if (s.byteLength) {
          const o = ss(s, 0, s.byteLength);
          o.offset !== -1 && o.offset === n && (this.valueBlock.value = [o.result]);
        }
      } catch {
      }
    }
    return super.fromBER(e, t, n);
  }
  onAsciiEncoding() {
    return this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length ? mr.prototype.onAsciiEncoding.call(this) : `${this.constructor.NAME} : ${le.ToHex(this.valueBlock.valueHexView)}`;
  }
  getValue() {
    if (!this.idBlock.isConstructed)
      return this.valueBlock.valueHexView.slice().buffer;
    const e = [];
    for (const t of this.valueBlock.value)
      t instanceof Zd && e.push(t.valueBlock.valueHexView);
    return W.concat(e);
  }
};
qd = ai;
se.OctetString = qd;
ai.NAME = Pd;
class Wd extends dn(Hn) {
  constructor({ unusedBits: e = 0, isConstructed: t = !1, ...n } = {}) {
    super(n), this.unusedBits = e, this.isConstructed = t, this.blockLength = this.valueHexView.byteLength;
  }
  fromBER(e, t, n) {
    if (!n)
      return t;
    let i = -1;
    if (this.isConstructed) {
      if (i = Hn.prototype.fromBER.call(this, e, t, n), i === -1)
        return i;
      for (const c of this.value) {
        const u = c.constructor.NAME;
        if (u === Ms) {
          if (this.isIndefiniteForm)
            break;
          return this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only", -1;
        }
        if (u !== jd)
          return this.error = "BIT STRING may consists of BIT STRINGs only", -1;
        const h = c.valueBlock;
        if (this.unusedBits > 0 && h.unusedBits > 0)
          return this.error = 'Using of "unused bits" inside constructive BIT STRING allowed for least one only', -1;
        this.unusedBits = h.unusedBits;
      }
      return i;
    }
    const s = W.toUint8Array(e);
    if (!Cn(this, s, t, n))
      return -1;
    const o = s.subarray(t, t + n);
    if (this.unusedBits = o[0], this.unusedBits > 7)
      return this.error = "Unused bits for BitString must be in range 0-7", -1;
    if (!this.unusedBits) {
      const c = o.subarray(1);
      try {
        if (c.byteLength) {
          const u = ss(c, 0, c.byteLength);
          u.offset !== -1 && u.offset === n - 1 && (this.value = [u.result]);
        }
      } catch {
      }
    }
    return this.valueHexView = o.subarray(1), this.blockLength = o.length, t + n;
  }
  toBER(e, t) {
    if (this.isConstructed)
      return Hn.prototype.toBER.call(this, e, t);
    if (e)
      return new ArrayBuffer(this.valueHexView.byteLength + 1);
    if (!this.valueHexView.byteLength)
      return Zr;
    const n = new Uint8Array(this.valueHexView.length + 1);
    return n[0] = this.unusedBits, n.set(this.valueHexView, 1), n.buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      unusedBits: this.unusedBits,
      isConstructed: this.isConstructed
    };
  }
}
Wd.NAME = "BitStringValueBlock";
var Yd;
let ci = class extends Xt {
  constructor({ idBlock: e = {}, lenBlock: t = {}, ...n } = {}) {
    var i, s;
    (i = n.isConstructed) !== null && i !== void 0 || (n.isConstructed = !!(!((s = n.value) === null || s === void 0) && s.length)), super({
      idBlock: {
        isConstructed: n.isConstructed,
        ...e
      },
      lenBlock: {
        ...t,
        isIndefiniteForm: !!n.isIndefiniteForm
      },
      ...n
    }, Wd), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 3;
  }
  fromBER(e, t, n) {
    return this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, super.fromBER(e, t, n);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length)
      return mr.prototype.onAsciiEncoding.call(this);
    {
      const e = [], t = this.valueBlock.valueHexView;
      for (const i of t)
        e.push(i.toString(2).padStart(8, "0"));
      const n = e.join("");
      return `${this.constructor.NAME} : ${n.substring(0, n.length - this.valueBlock.unusedBits)}`;
    }
  }
};
Yd = ci;
se.BitString = Yd;
ci.NAME = jd;
var Jd;
function $g(r, e) {
  const t = new Uint8Array([0]), n = new Uint8Array(r), i = new Uint8Array(e);
  let s = n.slice(0);
  const o = s.length - 1, c = i.slice(0), u = c.length - 1;
  let h = 0;
  const v = u < o ? o : u;
  let b = 0;
  for (let H = v; H >= 0; H--, b++) {
    switch (!0) {
      case b < c.length:
        h = s[o - b] + c[u - b] + t[0];
        break;
      default:
        h = s[o - b] + t[0];
    }
    switch (t[0] = h / 10, !0) {
      case b >= s.length:
        s = fl(new Uint8Array([h % 10]), s);
        break;
      default:
        s[o - b] = h % 10;
    }
  }
  return t[0] > 0 && (s = fl(t, s)), s;
}
function Hf(r) {
  if (r >= Is.length)
    for (let e = Is.length; e <= r; e++) {
      const t = new Uint8Array([0]);
      let n = Is[e - 1].slice(0);
      for (let i = n.length - 1; i >= 0; i--) {
        const s = new Uint8Array([(n[i] << 1) + t[0]]);
        t[0] = s[0] / 10, n[i] = s[0] % 10;
      }
      t[0] > 0 && (n = fl(t, n)), Is.push(n);
    }
  return Is[r];
}
function Mg(r, e) {
  let t = 0;
  const n = new Uint8Array(r), i = new Uint8Array(e), s = n.slice(0), o = s.length - 1, c = i.slice(0), u = c.length - 1;
  let h, v = 0;
  for (let b = u; b >= 0; b--, v++)
    switch (h = s[o - v] - c[u - v] - t, !0) {
      case h < 0:
        t = 1, s[o - v] = h + 10;
        break;
      default:
        t = 0, s[o - v] = h;
    }
  if (t > 0)
    for (let b = o - u + 1; b >= 0; b--, v++)
      if (h = s[o - v] - t, h < 0)
        t = 1, s[o - v] = h + 10;
      else {
        t = 0, s[o - v] = h;
        break;
      }
  return s.slice();
}
class Vu extends dn(hr) {
  constructor({ value: e, ...t } = {}) {
    super(t), this._valueDec = 0, t.valueHex && this.setValueHex(), e !== void 0 && (this.valueDec = e);
  }
  setValueHex() {
    this.valueHexView.length >= 4 ? (this.warnings.push("Too big Integer for decoding, hex only"), this.isHexOnly = !0, this._valueDec = 0) : (this.isHexOnly = !1, this.valueHexView.length > 0 && (this._valueDec = Nd.call(this)));
  }
  set valueDec(e) {
    this._valueDec = e, this.isHexOnly = !1, this.valueHexView = new Uint8Array(Ig(e));
  }
  get valueDec() {
    return this._valueDec;
  }
  fromDER(e, t, n, i = 0) {
    const s = this.fromBER(e, t, n);
    if (s === -1)
      return s;
    const o = this.valueHexView;
    return o[0] === 0 && o[1] & 128 ? this.valueHexView = o.subarray(1) : i !== 0 && o.length < i && (i - o.length > 1 && (i = o.length + 1), this.valueHexView = o.subarray(i - o.length)), s;
  }
  toDER(e = !1) {
    const t = this.valueHexView;
    switch (!0) {
      case (t[0] & 128) !== 0:
        {
          const n = new Uint8Array(this.valueHexView.length + 1);
          n[0] = 0, n.set(t, 1), this.valueHexView = n;
        }
        break;
      case (t[0] === 0 && (t[1] & 128) === 0):
        this.valueHexView = this.valueHexView.subarray(1);
        break;
    }
    return this.toBER(e);
  }
  fromBER(e, t, n) {
    const i = super.fromBER(e, t, n);
    return i === -1 || this.setValueHex(), i;
  }
  toBER(e) {
    return e ? new ArrayBuffer(this.valueHexView.length) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec
    };
  }
  toString() {
    const e = this.valueHexView.length * 8 - 1;
    let t = new Uint8Array(this.valueHexView.length * 8 / 3), n = 0, i;
    const s = this.valueHexView;
    let o = "", c = !1;
    for (let u = s.byteLength - 1; u >= 0; u--) {
      i = s[u];
      for (let h = 0; h < 8; h++) {
        if ((i & 1) === 1)
          switch (n) {
            case e:
              t = Mg(Hf(n), t), o = "-";
              break;
            default:
              t = $g(t, Hf(n));
          }
        n++, i >>= 1;
      }
    }
    for (let u = 0; u < t.length; u++)
      t[u] && (c = !0), c && (o += Vf.charAt(t[u]));
    return c === !1 && (o += Vf.charAt(0)), o;
  }
}
Jd = Vu;
Vu.NAME = "IntegerValueBlock";
Object.defineProperty(Jd.prototype, "valueHex", {
  set: function(r) {
    this.valueHexView = new Uint8Array(r), this.setValueHex();
  },
  get: function() {
    return this.valueHexView.slice().buffer;
  }
});
var Xd;
class on extends Xt {
  constructor(e = {}) {
    super(e, Vu), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 2;
  }
  toBigInt() {
    return Zo(), BigInt(this.valueBlock.toString());
  }
  static fromBigInt(e) {
    Zo();
    const t = BigInt(e), n = new qa(), i = t.toString(16).replace(/^-/, ""), s = new Uint8Array(le.FromHex(i));
    if (t < 0) {
      const c = new Uint8Array(s.length + (s[0] & 128 ? 1 : 0));
      c[0] |= 128;
      const h = BigInt(`0x${le.ToHex(c)}`) + t, v = W.toUint8Array(le.FromHex(h.toString(16)));
      v[0] |= 128, n.write(v);
    } else
      s[0] & 128 && n.write(new Uint8Array([0])), n.write(s);
    return new on({
      valueHex: n.final()
    });
  }
  convertToDER() {
    const e = new on({ valueHex: this.valueBlock.valueHexView });
    return e.valueBlock.toDER(), e;
  }
  convertFromDER() {
    return new on({
      valueHex: this.valueBlock.valueHexView[0] === 0 ? this.valueBlock.valueHexView.subarray(1) : this.valueBlock.valueHexView
    });
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString()}`;
  }
}
Xd = on;
se.Integer = Xd;
on.NAME = "INTEGER";
var Qd;
class Ya extends on {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 10;
  }
}
Qd = Ya;
se.Enumerated = Qd;
Ya.NAME = "ENUMERATED";
class hl extends dn(hr) {
  constructor({ valueDec: e = -1, isFirstSid: t = !1, ...n } = {}) {
    super(n), this.valueDec = e, this.isFirstSid = t;
  }
  fromBER(e, t, n) {
    if (!n)
      return t;
    const i = W.toUint8Array(e);
    if (!Cn(this, i, t, n))
      return -1;
    const s = i.subarray(t, t + n);
    this.valueHexView = new Uint8Array(n);
    for (let c = 0; c < n && (this.valueHexView[c] = s[c] & 127, this.blockLength++, !!(s[c] & 128)); c++)
      ;
    const o = new Uint8Array(this.blockLength);
    for (let c = 0; c < this.blockLength; c++)
      o[c] = this.valueHexView[c];
    return this.valueHexView = o, s[this.blockLength - 1] & 128 ? (this.error = "End of input reached before message was fully decoded", -1) : (this.valueHexView[0] === 0 && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = Li(this.valueHexView, 7) : (this.isHexOnly = !0, this.warnings.push("Too big SID for decoding, hex only")), t + this.blockLength);
  }
  set valueBigInt(e) {
    Zo();
    let t = BigInt(e).toString(2);
    for (; t.length % 7; )
      t = "0" + t;
    const n = new Uint8Array(t.length / 7);
    for (let i = 0; i < n.length; i++)
      n[i] = parseInt(t.slice(i * 7, i * 7 + 7), 2) + (i + 1 < n.length ? 128 : 0);
    this.fromBER(n.buffer, 0, n.length);
  }
  toBER(e) {
    if (this.isHexOnly) {
      if (e)
        return new ArrayBuffer(this.valueHexView.byteLength);
      const i = this.valueHexView, s = new Uint8Array(this.blockLength);
      for (let o = 0; o < this.blockLength - 1; o++)
        s[o] = i[o] | 128;
      return s[this.blockLength - 1] = i[this.blockLength - 1], s.buffer;
    }
    const t = ui(this.valueDec, 7);
    if (t.byteLength === 0)
      return this.error = "Error during encoding SID value", Zr;
    const n = new Uint8Array(t.byteLength);
    if (!e) {
      const i = new Uint8Array(t), s = t.byteLength - 1;
      for (let o = 0; o < s; o++)
        n[o] = i[o] | 128;
      n[s] = i[s];
    }
    return n;
  }
  toString() {
    let e = "";
    if (this.isHexOnly)
      e = le.ToHex(this.valueHexView);
    else if (this.isFirstSid) {
      let t = this.valueDec;
      this.valueDec <= 39 ? e = "0." : this.valueDec <= 79 ? (e = "1.", t -= 40) : (e = "2.", t -= 80), e += t.toString();
    } else
      e = this.valueDec.toString();
    return e;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec,
      isFirstSid: this.isFirstSid
    };
  }
}
hl.NAME = "sidBlock";
class ep extends hr {
  constructor({ value: e = gr, ...t } = {}) {
    super(t), this.value = [], e && this.fromString(e);
  }
  fromBER(e, t, n) {
    let i = t;
    for (; n > 0; ) {
      const s = new hl();
      if (i = s.fromBER(e, i, n), i === -1)
        return this.blockLength = 0, this.error = s.error, i;
      this.value.length === 0 && (s.isFirstSid = !0), this.blockLength += s.blockLength, n -= s.blockLength, this.value.push(s);
    }
    return i;
  }
  toBER(e) {
    const t = [];
    for (let n = 0; n < this.value.length; n++) {
      const i = this.value[n].toBER(e);
      if (i.byteLength === 0)
        return this.error = this.value[n].error, Zr;
      t.push(i);
    }
    return Du(t);
  }
  fromString(e) {
    this.value = [];
    let t = 0, n = 0, i = "", s = !1;
    do
      if (n = e.indexOf(".", t), n === -1 ? i = e.substring(t) : i = e.substring(t, n), t = n + 1, s) {
        const o = this.value[0];
        let c = 0;
        switch (o.valueDec) {
          case 0:
            break;
          case 1:
            c = 40;
            break;
          case 2:
            c = 80;
            break;
          default:
            this.value = [];
            return;
        }
        const u = parseInt(i, 10);
        if (isNaN(u))
          return;
        o.valueDec = u + c, s = !1;
      } else {
        const o = new hl();
        if (i > Number.MAX_SAFE_INTEGER) {
          Zo();
          const c = BigInt(i);
          o.valueBigInt = c;
        } else if (o.valueDec = parseInt(i, 10), isNaN(o.valueDec))
          return;
        this.value.length || (o.isFirstSid = !0, s = !0), this.value.push(o);
      }
    while (n !== -1);
  }
  toString() {
    let e = "", t = !1;
    for (let n = 0; n < this.value.length; n++) {
      t = this.value[n].isHexOnly;
      let i = this.value[n].toString();
      n !== 0 && (e = `${e}.`), t ? (i = `{${i}}`, this.value[n].isFirstSid ? e = `2.{${i} - 80}` : e += i) : e += i;
    }
    return e;
  }
  toJSON() {
    const e = {
      ...super.toJSON(),
      value: this.toString(),
      sidArray: []
    };
    for (let t = 0; t < this.value.length; t++)
      e.sidArray.push(this.value[t].toJSON());
    return e;
  }
}
ep.NAME = "ObjectIdentifierValueBlock";
var tp;
class Ja extends Xt {
  constructor(e = {}) {
    super(e, ep), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 6;
  }
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(e) {
    this.valueBlock.fromString(e);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.getValue()
    };
  }
}
tp = Ja;
se.ObjectIdentifier = tp;
Ja.NAME = "OBJECT IDENTIFIER";
class dl extends dn(ki) {
  constructor({ valueDec: e = 0, ...t } = {}) {
    super(t), this.valueDec = e;
  }
  fromBER(e, t, n) {
    if (n === 0)
      return t;
    const i = W.toUint8Array(e);
    if (!Cn(this, i, t, n))
      return -1;
    const s = i.subarray(t, t + n);
    this.valueHexView = new Uint8Array(n);
    for (let c = 0; c < n && (this.valueHexView[c] = s[c] & 127, this.blockLength++, !!(s[c] & 128)); c++)
      ;
    const o = new Uint8Array(this.blockLength);
    for (let c = 0; c < this.blockLength; c++)
      o[c] = this.valueHexView[c];
    return this.valueHexView = o, s[this.blockLength - 1] & 128 ? (this.error = "End of input reached before message was fully decoded", -1) : (this.valueHexView[0] === 0 && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = Li(this.valueHexView, 7) : (this.isHexOnly = !0, this.warnings.push("Too big SID for decoding, hex only")), t + this.blockLength);
  }
  toBER(e) {
    if (this.isHexOnly) {
      if (e)
        return new ArrayBuffer(this.valueHexView.byteLength);
      const i = this.valueHexView, s = new Uint8Array(this.blockLength);
      for (let o = 0; o < this.blockLength - 1; o++)
        s[o] = i[o] | 128;
      return s[this.blockLength - 1] = i[this.blockLength - 1], s.buffer;
    }
    const t = ui(this.valueDec, 7);
    if (t.byteLength === 0)
      return this.error = "Error during encoding SID value", Zr;
    const n = new Uint8Array(t.byteLength);
    if (!e) {
      const i = new Uint8Array(t), s = t.byteLength - 1;
      for (let o = 0; o < s; o++)
        n[o] = i[o] | 128;
      n[s] = i[s];
    }
    return n.buffer;
  }
  toString() {
    let e = "";
    return this.isHexOnly ? e = le.ToHex(this.valueHexView) : e = this.valueDec.toString(), e;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec
    };
  }
}
dl.NAME = "relativeSidBlock";
class rp extends hr {
  constructor({ value: e = gr, ...t } = {}) {
    super(t), this.value = [], e && this.fromString(e);
  }
  fromBER(e, t, n) {
    let i = t;
    for (; n > 0; ) {
      const s = new dl();
      if (i = s.fromBER(e, i, n), i === -1)
        return this.blockLength = 0, this.error = s.error, i;
      this.blockLength += s.blockLength, n -= s.blockLength, this.value.push(s);
    }
    return i;
  }
  toBER(e, t) {
    const n = [];
    for (let i = 0; i < this.value.length; i++) {
      const s = this.value[i].toBER(e);
      if (s.byteLength === 0)
        return this.error = this.value[i].error, Zr;
      n.push(s);
    }
    return Du(n);
  }
  fromString(e) {
    this.value = [];
    let t = 0, n = 0, i = "";
    do {
      n = e.indexOf(".", t), n === -1 ? i = e.substring(t) : i = e.substring(t, n), t = n + 1;
      const s = new dl();
      if (s.valueDec = parseInt(i, 10), isNaN(s.valueDec))
        return !0;
      this.value.push(s);
    } while (n !== -1);
    return !0;
  }
  toString() {
    let e = "", t = !1;
    for (let n = 0; n < this.value.length; n++) {
      t = this.value[n].isHexOnly;
      let i = this.value[n].toString();
      n !== 0 && (e = `${e}.`), t && (i = `{${i}}`), e += i;
    }
    return e;
  }
  toJSON() {
    const e = {
      ...super.toJSON(),
      value: this.toString(),
      sidArray: []
    };
    for (let t = 0; t < this.value.length; t++)
      e.sidArray.push(this.value[t].toJSON());
    return e;
  }
}
rp.NAME = "RelativeObjectIdentifierValueBlock";
var np;
class Lu extends Xt {
  constructor(e = {}) {
    super(e, rp), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 13;
  }
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(e) {
    this.valueBlock.fromString(e);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.getValue()
    };
  }
}
np = Lu;
se.RelativeObjectIdentifier = np;
Lu.NAME = "RelativeObjectIdentifier";
var ip;
class bn extends mr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 16;
  }
}
ip = bn;
se.Sequence = ip;
bn.NAME = "SEQUENCE";
var sp;
let xn = class extends mr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 17;
  }
};
sp = xn;
se.Set = sp;
xn.NAME = "SET";
class op extends dn(hr) {
  constructor({ ...e } = {}) {
    super(e), this.isHexOnly = !0, this.value = gr;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.value
    };
  }
}
op.NAME = "StringValueBlock";
class ap extends op {
}
ap.NAME = "SimpleStringValueBlock";
class Cr extends $u {
  constructor({ ...e } = {}) {
    super(e, ap);
  }
  fromBuffer(e) {
    this.valueBlock.value = String.fromCharCode.apply(null, W.toUint8Array(e));
  }
  fromString(e) {
    const t = e.length, n = this.valueBlock.valueHexView = new Uint8Array(t);
    for (let i = 0; i < t; i++)
      n[i] = e.charCodeAt(i);
    this.valueBlock.value = e;
  }
}
Cr.NAME = "SIMPLE STRING";
class cp extends Cr {
  fromBuffer(e) {
    this.valueBlock.valueHexView = W.toUint8Array(e);
    try {
      this.valueBlock.value = le.ToUtf8String(e);
    } catch (t) {
      this.warnings.push(`Error during "decodeURIComponent": ${t}, using raw string`), this.valueBlock.value = le.ToBinary(e);
    }
  }
  fromString(e) {
    this.valueBlock.valueHexView = new Uint8Array(le.FromUtf8String(e)), this.valueBlock.value = e;
  }
}
cp.NAME = "Utf8StringValueBlock";
var lp;
class Bn extends cp {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 12;
  }
}
lp = Bn;
se.Utf8String = lp;
Bn.NAME = "UTF8String";
class up extends Cr {
  fromBuffer(e) {
    this.valueBlock.value = le.ToUtf16String(e), this.valueBlock.valueHexView = W.toUint8Array(e);
  }
  fromString(e) {
    this.valueBlock.value = e, this.valueBlock.valueHexView = new Uint8Array(le.FromUtf16String(e));
  }
}
up.NAME = "BmpStringValueBlock";
var fp;
class Xa extends up {
  constructor({ ...e } = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 30;
  }
}
fp = Xa;
se.BmpString = fp;
Xa.NAME = "BMPString";
class hp extends Cr {
  fromBuffer(e) {
    const t = ArrayBuffer.isView(e) ? e.slice().buffer : e.slice(0), n = new Uint8Array(t);
    for (let i = 0; i < n.length; i += 4)
      n[i] = n[i + 3], n[i + 1] = n[i + 2], n[i + 2] = 0, n[i + 3] = 0;
    this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(t));
  }
  fromString(e) {
    const t = e.length, n = this.valueBlock.valueHexView = new Uint8Array(t * 4);
    for (let i = 0; i < t; i++) {
      const s = ui(e.charCodeAt(i), 8), o = new Uint8Array(s);
      if (o.length > 4)
        continue;
      const c = 4 - o.length;
      for (let u = o.length - 1; u >= 0; u--)
        n[i * 4 + u + c] = o[u];
    }
    this.valueBlock.value = e;
  }
}
hp.NAME = "UniversalStringValueBlock";
var dp;
class Qa extends hp {
  constructor({ ...e } = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 28;
  }
}
dp = Qa;
se.UniversalString = dp;
Qa.NAME = "UniversalString";
var pp;
class ec extends Cr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 18;
  }
}
pp = ec;
se.NumericString = pp;
ec.NAME = "NumericString";
var yp;
class tc extends Cr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 19;
  }
}
yp = tc;
se.PrintableString = yp;
tc.NAME = "PrintableString";
var gp;
class rc extends Cr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 20;
  }
}
gp = rc;
se.TeletexString = gp;
rc.NAME = "TeletexString";
var vp;
class nc extends Cr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 21;
  }
}
vp = nc;
se.VideotexString = vp;
nc.NAME = "VideotexString";
var mp;
class ic extends Cr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 22;
  }
}
mp = ic;
se.IA5String = mp;
ic.NAME = "IA5String";
var wp;
class sc extends Cr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 25;
  }
}
wp = sc;
se.GraphicString = wp;
sc.NAME = "GraphicString";
var bp;
class vo extends Cr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 26;
  }
}
bp = vo;
se.VisibleString = bp;
vo.NAME = "VisibleString";
var xp;
class oc extends Cr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 27;
  }
}
xp = oc;
se.GeneralString = xp;
oc.NAME = "GeneralString";
var Ap;
class ac extends Cr {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 29;
  }
}
Ap = ac;
se.CharacterString = Ap;
ac.NAME = "CharacterString";
var Sp;
class mo extends vo {
  constructor({ value: e, valueDate: t, ...n } = {}) {
    if (super(n), this.year = 0, this.month = 0, this.day = 0, this.hour = 0, this.minute = 0, this.second = 0, e) {
      this.fromString(e), this.valueBlock.valueHexView = new Uint8Array(e.length);
      for (let i = 0; i < e.length; i++)
        this.valueBlock.valueHexView[i] = e.charCodeAt(i);
    }
    t && (this.fromDate(t), this.valueBlock.valueHexView = new Uint8Array(this.toBuffer())), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 23;
  }
  fromBuffer(e) {
    this.fromString(String.fromCharCode.apply(null, W.toUint8Array(e)));
  }
  toBuffer() {
    const e = this.toString(), t = new ArrayBuffer(e.length), n = new Uint8Array(t);
    for (let i = 0; i < e.length; i++)
      n[i] = e.charCodeAt(i);
    return t;
  }
  fromDate(e) {
    this.year = e.getUTCFullYear(), this.month = e.getUTCMonth() + 1, this.day = e.getUTCDate(), this.hour = e.getUTCHours(), this.minute = e.getUTCMinutes(), this.second = e.getUTCSeconds();
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
  }
  fromString(e) {
    const n = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig.exec(e);
    if (n === null) {
      this.error = "Wrong input string for conversion";
      return;
    }
    const i = parseInt(n[1], 10);
    i >= 50 ? this.year = 1900 + i : this.year = 2e3 + i, this.month = parseInt(n[2], 10), this.day = parseInt(n[3], 10), this.hour = parseInt(n[4], 10), this.minute = parseInt(n[5], 10), this.second = parseInt(n[6], 10);
  }
  toString(e = "iso") {
    if (e === "iso") {
      const t = new Array(7);
      return t[0] = _r(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2), t[1] = _r(this.month, 2), t[2] = _r(this.day, 2), t[3] = _r(this.hour, 2), t[4] = _r(this.minute, 2), t[5] = _r(this.second, 2), t[6] = "Z", t.join("");
    }
    return super.toString(e);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.toDate().toISOString()}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second
    };
  }
}
Sp = mo;
se.UTCTime = Sp;
mo.NAME = "UTCTime";
var _p;
class cc extends mo {
  constructor(e = {}) {
    var t;
    super(e), (t = this.millisecond) !== null && t !== void 0 || (this.millisecond = 0), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 24;
  }
  fromDate(e) {
    super.fromDate(e), this.millisecond = e.getUTCMilliseconds();
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond));
  }
  fromString(e) {
    let t = !1, n = "", i = "", s = 0, o, c = 0, u = 0;
    if (e[e.length - 1] === "Z")
      n = e.substring(0, e.length - 1), t = !0;
    else {
      const b = new Number(e[e.length - 1]);
      if (isNaN(b.valueOf()))
        throw new Error("Wrong input string for conversion");
      n = e;
    }
    if (t) {
      if (n.indexOf("+") !== -1)
        throw new Error("Wrong input string for conversion");
      if (n.indexOf("-") !== -1)
        throw new Error("Wrong input string for conversion");
    } else {
      let b = 1, H = n.indexOf("+"), T = "";
      if (H === -1 && (H = n.indexOf("-"), b = -1), H !== -1) {
        if (T = n.substring(H + 1), n = n.substring(0, H), T.length !== 2 && T.length !== 4)
          throw new Error("Wrong input string for conversion");
        let m = parseInt(T.substring(0, 2), 10);
        if (isNaN(m.valueOf()))
          throw new Error("Wrong input string for conversion");
        if (c = b * m, T.length === 4) {
          if (m = parseInt(T.substring(2, 4), 10), isNaN(m.valueOf()))
            throw new Error("Wrong input string for conversion");
          u = b * m;
        }
      }
    }
    let h = n.indexOf(".");
    if (h === -1 && (h = n.indexOf(",")), h !== -1) {
      const b = new Number(`0${n.substring(h)}`);
      if (isNaN(b.valueOf()))
        throw new Error("Wrong input string for conversion");
      s = b.valueOf(), i = n.substring(0, h);
    } else
      i = n;
    switch (!0) {
      case i.length === 8:
        if (o = /(\d{4})(\d{2})(\d{2})/ig, h !== -1)
          throw new Error("Wrong input string for conversion");
        break;
      case i.length === 10:
        if (o = /(\d{4})(\d{2})(\d{2})(\d{2})/ig, h !== -1) {
          let b = 60 * s;
          this.minute = Math.floor(b), b = 60 * (b - this.minute), this.second = Math.floor(b), b = 1e3 * (b - this.second), this.millisecond = Math.floor(b);
        }
        break;
      case i.length === 12:
        if (o = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig, h !== -1) {
          let b = 60 * s;
          this.second = Math.floor(b), b = 1e3 * (b - this.second), this.millisecond = Math.floor(b);
        }
        break;
      case i.length === 14:
        if (o = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig, h !== -1) {
          const b = 1e3 * s;
          this.millisecond = Math.floor(b);
        }
        break;
      default:
        throw new Error("Wrong input string for conversion");
    }
    const v = o.exec(i);
    if (v === null)
      throw new Error("Wrong input string for conversion");
    for (let b = 1; b < v.length; b++)
      switch (b) {
        case 1:
          this.year = parseInt(v[b], 10);
          break;
        case 2:
          this.month = parseInt(v[b], 10);
          break;
        case 3:
          this.day = parseInt(v[b], 10);
          break;
        case 4:
          this.hour = parseInt(v[b], 10) + c;
          break;
        case 5:
          this.minute = parseInt(v[b], 10) + u;
          break;
        case 6:
          this.second = parseInt(v[b], 10);
          break;
        default:
          throw new Error("Wrong input string for conversion");
      }
    if (t === !1) {
      const b = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
      this.year = b.getUTCFullYear(), this.month = b.getUTCMonth(), this.day = b.getUTCDay(), this.hour = b.getUTCHours(), this.minute = b.getUTCMinutes(), this.second = b.getUTCSeconds(), this.millisecond = b.getUTCMilliseconds();
    }
  }
  toString(e = "iso") {
    if (e === "iso") {
      const t = [];
      return t.push(_r(this.year, 4)), t.push(_r(this.month, 2)), t.push(_r(this.day, 2)), t.push(_r(this.hour, 2)), t.push(_r(this.minute, 2)), t.push(_r(this.second, 2)), this.millisecond !== 0 && (t.push("."), t.push(_r(this.millisecond, 3))), t.push("Z"), t.join("");
    }
    return super.toString(e);
  }
  toJSON() {
    return {
      ...super.toJSON(),
      millisecond: this.millisecond
    };
  }
}
_p = cc;
se.GeneralizedTime = _p;
cc.NAME = "GeneralizedTime";
var Ep;
class Hu extends Bn {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 31;
  }
}
Ep = Hu;
se.DATE = Ep;
Hu.NAME = "DATE";
var Ip;
class Fu extends Bn {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 32;
  }
}
Ip = Fu;
se.TimeOfDay = Ip;
Fu.NAME = "TimeOfDay";
var kp;
class Gu extends Bn {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 33;
  }
}
kp = Gu;
se.DateTime = kp;
Gu.NAME = "DateTime";
var Cp;
class zu extends Bn {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 34;
  }
}
Cp = zu;
se.Duration = Cp;
zu.NAME = "Duration";
var Bp;
class Ku extends Bn {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 14;
  }
}
Bp = Ku;
se.TIME = Bp;
Ku.NAME = "TIME";
class hi {
  constructor({ name: e = gr, optional: t = !1 } = {}) {
    this.name = e, this.optional = t;
  }
}
class qu extends hi {
  constructor({ value: e = [], ...t } = {}) {
    super(t), this.value = e;
  }
}
class Wo extends hi {
  constructor({ value: e = new hi(), local: t = !1, ...n } = {}) {
    super(n), this.value = e, this.local = t;
  }
}
class Vg {
  constructor({ data: e = Za } = {}) {
    this.dataView = W.toUint8Array(e);
  }
  get data() {
    return this.dataView.slice().buffer;
  }
  set data(e) {
    this.dataView = W.toUint8Array(e);
  }
  fromBER(e, t, n) {
    const i = t + n;
    return this.dataView = W.toUint8Array(e).subarray(t, i), i;
  }
  toBER(e) {
    return this.dataView.slice().buffer;
  }
}
function ii(r, e, t) {
  if (t instanceof qu) {
    for (let s = 0; s < t.value.length; s++)
      if (ii(r, e, t.value[s]).verified)
        return {
          verified: !0,
          result: r
        };
    {
      const s = {
        verified: !1,
        result: {
          error: "Wrong values for Choice type"
        }
      };
      return t.hasOwnProperty(Kc) && (s.name = t.name), s;
    }
  }
  if (t instanceof hi)
    return t.hasOwnProperty(Kc) && (r[t.name] = e), {
      verified: !0,
      result: r
    };
  if (!(r instanceof Object))
    return {
      verified: !1,
      result: { error: "Wrong root object" }
    };
  if (!(e instanceof Object))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 data" }
    };
  if (!(t instanceof Object))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (!(Bg in t))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (!(Pg in t.idBlock))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (!(jg in t.idBlock))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  const n = t.idBlock.toBER(!1);
  if (n.byteLength === 0)
    return {
      verified: !1,
      result: { error: "Error encoding idBlock for ASN.1 schema" }
    };
  if (t.idBlock.fromBER(n, 0, n.byteLength) === -1)
    return {
      verified: !1,
      result: { error: "Error decoding idBlock for ASN.1 schema" }
    };
  if (t.idBlock.hasOwnProperty(Og) === !1)
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (t.idBlock.tagClass !== e.idBlock.tagClass)
    return {
      verified: !1,
      result: r
    };
  if (t.idBlock.hasOwnProperty(Tg) === !1)
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (t.idBlock.tagNumber !== e.idBlock.tagNumber)
    return {
      verified: !1,
      result: r
    };
  if (t.idBlock.hasOwnProperty(Ng) === !1)
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (t.idBlock.isConstructed !== e.idBlock.isConstructed)
    return {
      verified: !1,
      result: r
    };
  if (!(Cg in t.idBlock))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (t.idBlock.isHexOnly !== e.idBlock.isHexOnly)
    return {
      verified: !1,
      result: r
    };
  if (t.idBlock.isHexOnly) {
    if (!(Lf in t.idBlock))
      return {
        verified: !1,
        result: { error: "Wrong ASN.1 schema" }
      };
    const s = t.idBlock.valueHexView, o = e.idBlock.valueHexView;
    if (s.length !== o.length)
      return {
        verified: !1,
        result: r
      };
    for (let c = 0; c < s.length; c++)
      if (s[c] !== o[1])
        return {
          verified: !1,
          result: r
        };
  }
  if (t.name && (t.name = t.name.replace(/^\s+|\s+$/g, gr), t.name && (r[t.name] = e)), t instanceof se.Constructed) {
    let s = 0, o = {
      verified: !1,
      result: {
        error: "Unknown error"
      }
    }, c = t.valueBlock.value.length;
    if (c > 0 && t.valueBlock.value[0] instanceof Wo && (c = e.valueBlock.value.length), c === 0)
      return {
        verified: !0,
        result: r
      };
    if (e.valueBlock.value.length === 0 && t.valueBlock.value.length !== 0) {
      let u = !0;
      for (let h = 0; h < t.valueBlock.value.length; h++)
        u = u && (t.valueBlock.value[h].optional || !1);
      return u ? {
        verified: !0,
        result: r
      } : (t.name && (t.name = t.name.replace(/^\s+|\s+$/g, gr), t.name && delete r[t.name]), r.error = "Inconsistent object length", {
        verified: !1,
        result: r
      });
    }
    for (let u = 0; u < c; u++)
      if (u - s >= e.valueBlock.value.length) {
        if (t.valueBlock.value[u].optional === !1) {
          const h = {
            verified: !1,
            result: r
          };
          return r.error = "Inconsistent length between ASN.1 data and schema", t.name && (t.name = t.name.replace(/^\s+|\s+$/g, gr), t.name && (delete r[t.name], h.name = t.name)), h;
        }
      } else if (t.valueBlock.value[0] instanceof Wo) {
        if (o = ii(r, e.valueBlock.value[u], t.valueBlock.value[0].value), o.verified === !1)
          if (t.valueBlock.value[0].optional)
            s++;
          else
            return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, gr), t.name && delete r[t.name]), o;
        if (Kc in t.valueBlock.value[0] && t.valueBlock.value[0].name.length > 0) {
          let h = {};
          Rg in t.valueBlock.value[0] && t.valueBlock.value[0].local ? h = e : h = r, typeof h[t.valueBlock.value[0].name] > "u" && (h[t.valueBlock.value[0].name] = []), h[t.valueBlock.value[0].name].push(e.valueBlock.value[u]);
        }
      } else if (o = ii(r, e.valueBlock.value[u - s], t.valueBlock.value[u]), o.verified === !1)
        if (t.valueBlock.value[u].optional)
          s++;
        else
          return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, gr), t.name && delete r[t.name]), o;
    if (o.verified === !1) {
      const u = {
        verified: !1,
        result: r
      };
      return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, gr), t.name && (delete r[t.name], u.name = t.name)), u;
    }
    return {
      verified: !0,
      result: r
    };
  }
  if (t.primitiveSchema && Lf in e.valueBlock) {
    const s = ss(e.valueBlock.valueHexView);
    if (s.offset === -1) {
      const o = {
        verified: !1,
        result: s.result
      };
      return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, gr), t.name && (delete r[t.name], o.name = t.name)), o;
    }
    return ii(r, s.result, t.primitiveSchema);
  }
  return {
    verified: !0,
    result: r
  };
}
function Lg(r, e) {
  if (!(e instanceof Object))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema type" }
    };
  const t = ss(W.toUint8Array(r));
  return t.offset === -1 ? {
    verified: !1,
    result: t.result
  } : ii(t.result, t.result, e);
}
const Op = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: hi,
  BaseBlock: Xt,
  BaseStringBlock: $u,
  BitString: ci,
  BmpString: Xa,
  Boolean: Wa,
  CharacterString: ac,
  Choice: qu,
  Constructed: mr,
  DATE: Hu,
  DateTime: Gu,
  Duration: zu,
  EndOfContent: Mu,
  Enumerated: Ya,
  GeneralString: oc,
  GeneralizedTime: cc,
  GraphicString: sc,
  HexBlock: dn,
  IA5String: ic,
  Integer: on,
  Null: fi,
  NumericString: ec,
  ObjectIdentifier: Ja,
  OctetString: ai,
  Primitive: go,
  PrintableString: tc,
  RawData: Vg,
  RelativeObjectIdentifier: Lu,
  Repeated: Wo,
  Sequence: bn,
  Set: xn,
  TIME: Ku,
  TeletexString: rc,
  TimeOfDay: Fu,
  UTCTime: mo,
  UniversalString: Qa,
  Utf8String: Bn,
  ValueBlock: hr,
  VideotexString: nc,
  ViewWriter: qa,
  VisibleString: vo,
  compareSchema: ii,
  fromBER: $i,
  verifySchema: Lg
}, Symbol.toStringTag, { value: "Module" }));
var M;
(function(r) {
  r[r.Sequence = 0] = "Sequence", r[r.Set = 1] = "Set", r[r.Choice = 2] = "Choice";
})(M || (M = {}));
var x;
(function(r) {
  r[r.Any = 1] = "Any", r[r.Boolean = 2] = "Boolean", r[r.OctetString = 3] = "OctetString", r[r.BitString = 4] = "BitString", r[r.Integer = 5] = "Integer", r[r.Enumerated = 6] = "Enumerated", r[r.ObjectIdentifier = 7] = "ObjectIdentifier", r[r.Utf8String = 8] = "Utf8String", r[r.BmpString = 9] = "BmpString", r[r.UniversalString = 10] = "UniversalString", r[r.NumericString = 11] = "NumericString", r[r.PrintableString = 12] = "PrintableString", r[r.TeletexString = 13] = "TeletexString", r[r.VideotexString = 14] = "VideotexString", r[r.IA5String = 15] = "IA5String", r[r.GraphicString = 16] = "GraphicString", r[r.VisibleString = 17] = "VisibleString", r[r.GeneralString = 18] = "GeneralString", r[r.CharacterString = 19] = "CharacterString", r[r.UTCTime = 20] = "UTCTime", r[r.GeneralizedTime = 21] = "GeneralizedTime", r[r.DATE = 22] = "DATE", r[r.TimeOfDay = 23] = "TimeOfDay", r[r.DateTime = 24] = "DateTime", r[r.Duration = 25] = "Duration", r[r.TIME = 26] = "TIME", r[r.Null = 27] = "Null";
})(x || (x = {}));
class lc {
  constructor(e, t = 0) {
    if (this.unusedBits = 0, this.value = new ArrayBuffer(0), e)
      if (typeof e == "number")
        this.fromNumber(e);
      else if (W.isBufferSource(e))
        this.unusedBits = t, this.value = W.toArrayBuffer(e);
      else
        throw TypeError("Unsupported type of 'params' argument for BitString");
  }
  fromASN(e) {
    if (!(e instanceof ci))
      throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");
    return this.unusedBits = e.valueBlock.unusedBits, this.value = e.valueBlock.valueHex, this;
  }
  toASN() {
    return new ci({ unusedBits: this.unusedBits, valueHex: this.value });
  }
  toSchema(e) {
    return new ci({ name: e });
  }
  toNumber() {
    let e = "";
    const t = new Uint8Array(this.value);
    for (const n of t)
      e += n.toString(2).padStart(8, "0");
    return e = e.split("").reverse().join(""), this.unusedBits && (e = e.slice(this.unusedBits).padStart(this.unusedBits, "0")), parseInt(e, 2);
  }
  fromNumber(e) {
    let t = e.toString(2);
    const n = t.length + 7 >> 3;
    this.unusedBits = (n << 3) - t.length;
    const i = new Uint8Array(n);
    t = t.padStart(n << 3, "0").split("").reverse().join("");
    let s = 0;
    for (; s < n; )
      i[s] = parseInt(t.slice(s << 3, (s << 3) + 8), 2), s++;
    this.value = i.buffer;
  }
}
class ot {
  get byteLength() {
    return this.buffer.byteLength;
  }
  get byteOffset() {
    return 0;
  }
  constructor(e) {
    typeof e == "number" ? this.buffer = new ArrayBuffer(e) : W.isBufferSource(e) ? this.buffer = W.toArrayBuffer(e) : Array.isArray(e) ? this.buffer = new Uint8Array(e) : this.buffer = new ArrayBuffer(0);
  }
  fromASN(e) {
    if (!(e instanceof ai))
      throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");
    return this.buffer = e.valueBlock.valueHex, this;
  }
  toASN() {
    return new ai({ valueHex: this.buffer });
  }
  toSchema(e) {
    return new ai({ name: e });
  }
}
const Hg = {
  fromASN: (r) => r instanceof fi ? null : r.valueBeforeDecodeView,
  toASN: (r) => {
    if (r === null)
      return new fi();
    const e = $i(r);
    if (e.result.error)
      throw new Error(e.result.error);
    return e.result;
  }
}, Fg = {
  fromASN: (r) => r.valueBlock.valueHexView.byteLength >= 4 ? r.valueBlock.toString() : r.valueBlock.valueDec,
  toASN: (r) => new on({ value: +r })
}, Gg = {
  fromASN: (r) => r.valueBlock.valueDec,
  toASN: (r) => new Ya({ value: r })
}, _t = {
  fromASN: (r) => r.valueBlock.valueHexView,
  toASN: (r) => new on({ valueHex: r })
}, zg = {
  fromASN: (r) => r.valueBlock.valueHexView,
  toASN: (r) => new ci({ valueHex: r })
}, Kg = {
  fromASN: (r) => r.valueBlock.toString(),
  toASN: (r) => new Ja({ value: r })
}, qg = {
  fromASN: (r) => r.valueBlock.value,
  toASN: (r) => new Wa({ value: r })
}, Yo = {
  fromASN: (r) => r.valueBlock.valueHexView,
  toASN: (r) => new ai({ valueHex: r })
}, Zg = {
  fromASN: (r) => new ot(r.getValue()),
  toASN: (r) => r.toASN()
};
function Pr(r) {
  return {
    fromASN: (e) => e.valueBlock.value,
    toASN: (e) => new r({ value: e })
  };
}
const Tp = Pr(Bn), Wg = Pr(Xa), Yg = Pr(Qa), Jg = Pr(ec), Xg = Pr(tc), Qg = Pr(rc), ev = Pr(nc), tv = Pr(ic), rv = Pr(sc), nv = Pr(vo), iv = Pr(oc), sv = Pr(ac), ov = {
  fromASN: (r) => r.toDate(),
  toASN: (r) => new mo({ valueDate: r })
}, av = {
  fromASN: (r) => r.toDate(),
  toASN: (r) => new cc({ valueDate: r })
}, cv = {
  fromASN: () => null,
  toASN: () => new fi()
};
function Zu(r) {
  switch (r) {
    case x.Any:
      return Hg;
    case x.BitString:
      return zg;
    case x.BmpString:
      return Wg;
    case x.Boolean:
      return qg;
    case x.CharacterString:
      return sv;
    case x.Enumerated:
      return Gg;
    case x.GeneralString:
      return iv;
    case x.GeneralizedTime:
      return av;
    case x.GraphicString:
      return rv;
    case x.IA5String:
      return tv;
    case x.Integer:
      return Fg;
    case x.Null:
      return cv;
    case x.NumericString:
      return Jg;
    case x.ObjectIdentifier:
      return Kg;
    case x.OctetString:
      return Yo;
    case x.PrintableString:
      return Xg;
    case x.TeletexString:
      return Qg;
    case x.UTCTime:
      return ov;
    case x.UniversalString:
      return Yg;
    case x.Utf8String:
      return Tp;
    case x.VideotexString:
      return ev;
    case x.VisibleString:
      return nv;
    default:
      return null;
  }
}
function mn(r) {
  return typeof r == "function" && r.prototype ? r.prototype.toASN && r.prototype.fromASN ? !0 : mn(r.prototype) : !!(r && typeof r == "object" && "toASN" in r && "fromASN" in r);
}
function Np(r) {
  var e;
  if (r) {
    const t = Object.getPrototypeOf(r);
    return ((e = t == null ? void 0 : t.prototype) === null || e === void 0 ? void 0 : e.constructor) === Array ? !0 : Np(t);
  }
  return !1;
}
function lv(r, e) {
  if (!(r && e) || r.byteLength !== e.byteLength)
    return !1;
  const t = new Uint8Array(r), n = new Uint8Array(e);
  for (let i = 0; i < r.byteLength; i++)
    if (t[i] !== n[i])
      return !1;
  return !0;
}
class uv {
  constructor() {
    this.items = /* @__PURE__ */ new WeakMap();
  }
  has(e) {
    return this.items.has(e);
  }
  get(e, t = !1) {
    const n = this.items.get(e);
    if (!n)
      throw new Error(`Cannot get schema for '${e.prototype.constructor.name}' target`);
    if (t && !n.schema)
      throw new Error(`Schema '${e.prototype.constructor.name}' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'.`);
    return n;
  }
  cache(e) {
    const t = this.get(e);
    t.schema || (t.schema = this.create(e, !0));
  }
  createDefault(e) {
    const t = {
      type: M.Sequence,
      items: {}
    }, n = this.findParentSchema(e);
    return n && (Object.assign(t, n), t.items = Object.assign({}, t.items, n.items)), t;
  }
  create(e, t) {
    const n = this.items.get(e) || this.createDefault(e), i = [];
    for (const s in n.items) {
      const o = n.items[s], c = t ? s : "";
      let u;
      if (typeof o.type == "number") {
        const v = x[o.type], b = Op[v];
        if (!b)
          throw new Error(`Cannot get ASN1 class by name '${v}'`);
        u = new b({ name: c });
      } else mn(o.type) ? u = new o.type().toSchema(c) : o.optional ? this.get(o.type).type === M.Choice ? u = new hi({ name: c }) : (u = this.create(o.type, !1), u.name = c) : u = new hi({ name: c });
      const h = !!o.optional || o.defaultValue !== void 0;
      if (o.repeated) {
        u.name = "";
        const v = o.repeated === "set" ? xn : bn;
        u = new v({
          name: "",
          value: [
            new Wo({
              name: c,
              value: u
            })
          ]
        });
      }
      if (o.context !== null && o.context !== void 0)
        if (o.implicit)
          if (typeof o.type == "number" || mn(o.type)) {
            const v = o.repeated ? mr : go;
            i.push(new v({
              name: c,
              optional: h,
              idBlock: {
                tagClass: 3,
                tagNumber: o.context
              }
            }));
          } else {
            this.cache(o.type);
            const v = !!o.repeated;
            let b = v ? u : this.get(o.type, !0).schema;
            b = "valueBlock" in b ? b.valueBlock.value : b.value, i.push(new mr({
              name: v ? "" : c,
              optional: h,
              idBlock: {
                tagClass: 3,
                tagNumber: o.context
              },
              value: b
            }));
          }
        else
          i.push(new mr({
            optional: h,
            idBlock: {
              tagClass: 3,
              tagNumber: o.context
            },
            value: [u]
          }));
      else
        u.optional = h, i.push(u);
    }
    switch (n.type) {
      case M.Sequence:
        return new bn({ value: i, name: "" });
      case M.Set:
        return new xn({ value: i, name: "" });
      case M.Choice:
        return new qu({ value: i, name: "" });
      default:
        throw new Error("Unsupported ASN1 type in use");
    }
  }
  set(e, t) {
    return this.items.set(e, t), this;
  }
  findParentSchema(e) {
    const t = Object.getPrototypeOf(e);
    return t ? this.items.get(t) || this.findParentSchema(t) : null;
  }
}
const Tr = new uv(), F = (r) => (e) => {
  let t;
  Tr.has(e) ? t = Tr.get(e) : (t = Tr.createDefault(e), Tr.set(e, t)), Object.assign(t, r);
}, y = (r) => (e, t) => {
  let n;
  Tr.has(e.constructor) ? n = Tr.get(e.constructor) : (n = Tr.createDefault(e.constructor), Tr.set(e.constructor, n));
  const i = Object.assign({}, r);
  if (typeof i.type == "number" && !i.converter) {
    const s = Zu(r.type);
    if (!s)
      throw new Error(`Cannot get default converter for property '${t}' of ${e.constructor.name}`);
    i.converter = s;
  }
  n.items[t] = i;
};
class Ff extends Error {
  constructor() {
    super(...arguments), this.schemas = [];
  }
}
class fv {
  static parse(e, t) {
    const n = $i(e);
    if (n.result.error)
      throw new Error(n.result.error);
    return this.fromASN(n.result, t);
  }
  static fromASN(e, t) {
    var n;
    try {
      if (mn(t))
        return new t().fromASN(e);
      const i = Tr.get(t);
      Tr.cache(t);
      let s = i.schema;
      if (e.constructor === mr && i.type !== M.Choice) {
        s = new mr({
          idBlock: {
            tagClass: 3,
            tagNumber: e.idBlock.tagNumber
          },
          value: i.schema.valueBlock.value
        });
        for (const u in i.items)
          delete e[u];
      }
      const o = ii({}, e, s);
      if (!o.verified)
        throw new Ff(`Data does not match to ${t.name} ASN1 schema. ${o.result.error}`);
      const c = new t();
      if (Np(t)) {
        if (!("value" in e.valueBlock && Array.isArray(e.valueBlock.value)))
          throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");
        const u = i.itemType;
        if (typeof u == "number") {
          const h = Zu(u);
          if (!h)
            throw new Error(`Cannot get default converter for array item of ${t.name} ASN1 schema`);
          return t.from(e.valueBlock.value, (v) => h.fromASN(v));
        } else
          return t.from(e.valueBlock.value, (h) => this.fromASN(h, u));
      }
      for (const u in i.items) {
        const h = o.result[u];
        if (!h)
          continue;
        const v = i.items[u], b = v.type;
        if (typeof b == "number" || mn(b)) {
          const H = (n = v.converter) !== null && n !== void 0 ? n : mn(b) ? new b() : null;
          if (!H)
            throw new Error("Converter is empty");
          if (v.repeated)
            if (v.implicit) {
              const T = v.repeated === "sequence" ? bn : xn, m = new T();
              m.valueBlock = h.valueBlock;
              const A = $i(m.toBER(!1));
              if (A.offset === -1)
                throw new Error(`Cannot parse the child item. ${A.result.error}`);
              if (!("value" in A.result.valueBlock && Array.isArray(A.result.valueBlock.value)))
                throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");
              const k = A.result.valueBlock.value;
              c[u] = Array.from(k, (I) => H.fromASN(I));
            } else
              c[u] = Array.from(h, (T) => H.fromASN(T));
          else {
            let T = h;
            if (v.implicit) {
              let m;
              if (mn(b))
                m = new b().toSchema("");
              else {
                const A = x[b], k = Op[A];
                if (!k)
                  throw new Error(`Cannot get '${A}' class from asn1js module`);
                m = new k();
              }
              m.valueBlock = T.valueBlock, T = $i(m.toBER(!1)).result;
            }
            c[u] = H.fromASN(T);
          }
        } else if (v.repeated) {
          if (!Array.isArray(h))
            throw new Error("Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.");
          c[u] = Array.from(h, (H) => this.fromASN(H, b));
        } else
          c[u] = this.fromASN(h, b);
      }
      return c;
    } catch (i) {
      throw i instanceof Ff && i.schemas.push(t.name), i;
    }
  }
}
class Wu {
  static serialize(e) {
    return e instanceof Xt ? e.toBER(!1) : this.toASN(e).toBER(!1);
  }
  static toASN(e) {
    if (e && typeof e == "object" && mn(e))
      return e.toASN();
    if (!(e && typeof e == "object"))
      throw new TypeError("Parameter 1 should be type of Object.");
    const t = e.constructor, n = Tr.get(t);
    Tr.cache(t);
    let i = [];
    if (n.itemType) {
      if (!Array.isArray(e))
        throw new TypeError("Parameter 1 should be type of Array.");
      if (typeof n.itemType == "number") {
        const o = Zu(n.itemType);
        if (!o)
          throw new Error(`Cannot get default converter for array item of ${t.name} ASN1 schema`);
        i = e.map((c) => o.toASN(c));
      } else
        i = e.map((o) => this.toAsnItem({ type: n.itemType }, "[]", t, o));
    } else
      for (const o in n.items) {
        const c = n.items[o], u = e[o];
        if (u === void 0 || c.defaultValue === u || typeof c.defaultValue == "object" && typeof u == "object" && lv(this.serialize(c.defaultValue), this.serialize(u)))
          continue;
        const h = Wu.toAsnItem(c, o, t, u);
        if (typeof c.context == "number")
          if (c.implicit)
            if (!c.repeated && (typeof c.type == "number" || mn(c.type))) {
              const v = {};
              v.valueHex = h instanceof fi ? h.valueBeforeDecodeView : h.valueBlock.toBER(), i.push(new go({
                optional: c.optional,
                idBlock: {
                  tagClass: 3,
                  tagNumber: c.context
                },
                ...v
              }));
            } else
              i.push(new mr({
                optional: c.optional,
                idBlock: {
                  tagClass: 3,
                  tagNumber: c.context
                },
                value: h.valueBlock.value
              }));
          else
            i.push(new mr({
              optional: c.optional,
              idBlock: {
                tagClass: 3,
                tagNumber: c.context
              },
              value: [h]
            }));
        else c.repeated ? i = i.concat(h) : i.push(h);
      }
    let s;
    switch (n.type) {
      case M.Sequence:
        s = new bn({ value: i });
        break;
      case M.Set:
        s = new xn({ value: i });
        break;
      case M.Choice:
        if (!i[0])
          throw new Error(`Schema '${t.name}' has wrong data. Choice cannot be empty.`);
        s = i[0];
        break;
    }
    return s;
  }
  static toAsnItem(e, t, n, i) {
    let s;
    if (typeof e.type == "number") {
      const o = e.converter;
      if (!o)
        throw new Error(`Property '${t}' doesn't have converter for type ${x[e.type]} in schema '${n.name}'`);
      if (e.repeated) {
        if (!Array.isArray(i))
          throw new TypeError("Parameter 'objProp' should be type of Array.");
        const c = Array.from(i, (h) => o.toASN(h)), u = e.repeated === "sequence" ? bn : xn;
        s = new u({
          value: c
        });
      } else
        s = o.toASN(i);
    } else if (e.repeated) {
      if (!Array.isArray(i))
        throw new TypeError("Parameter 'objProp' should be type of Array.");
      const o = Array.from(i, (u) => this.toASN(u)), c = e.repeated === "sequence" ? bn : xn;
      s = new c({
        value: o
      });
    } else
      s = this.toASN(i);
    return s;
  }
}
class mt extends Array {
  constructor(e = []) {
    if (typeof e == "number")
      super(e);
    else {
      super();
      for (const t of e)
        this.push(t);
    }
  }
}
class q {
  static serialize(e) {
    return Wu.serialize(e);
  }
  static parse(e, t) {
    return fv.parse(e, t);
  }
  static toString(e) {
    const t = W.isBufferSource(e) ? W.toArrayBuffer(e) : q.serialize(e), n = $i(t);
    if (n.offset === -1)
      throw new Error(`Cannot decode ASN.1 data. ${n.result.error}`);
    return n.result.toString();
  }
}
function f(r, e, t, n) {
  var i = arguments.length, s = i < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(r, e, t, n);
  else for (var c = r.length - 1; c >= 0; c--) (o = r[c]) && (s = (i < 3 ? o(s) : i > 3 ? o(e, t, s) : o(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}
var Pp = { exports: {} };
(function(r) {
  (function(e) {
    const t = "(0?\\d+|0x[a-f0-9]+)", n = {
      fourOctet: new RegExp(`^${t}\\.${t}\\.${t}\\.${t}$`, "i"),
      threeOctet: new RegExp(`^${t}\\.${t}\\.${t}$`, "i"),
      twoOctet: new RegExp(`^${t}\\.${t}$`, "i"),
      longValue: new RegExp(`^${t}$`, "i")
    }, i = new RegExp("^0[0-7]+$", "i"), s = new RegExp("^0x[a-f0-9]+$", "i"), o = "%[0-9a-z]{1,}", c = "(?:[0-9a-f]+::?)+", u = {
      zoneIndex: new RegExp(o, "i"),
      native: new RegExp(`^(::)?(${c})?([0-9a-f]+)?(::)?(${o})?$`, "i"),
      deprecatedTransitional: new RegExp(`^(?:::)(${t}\\.${t}\\.${t}\\.${t}(${o})?)$`, "i"),
      transitional: new RegExp(`^((?:${c})|(?:::)(?:${c})?)${t}\\.${t}\\.${t}\\.${t}(${o})?$`, "i")
    };
    function h(m, A) {
      if (m.indexOf("::") !== m.lastIndexOf("::"))
        return null;
      let k = 0, I = -1, P = (m.match(u.zoneIndex) || [])[0], D, de;
      for (P && (P = P.substring(1), m = m.replace(/%.+$/, "")); (I = m.indexOf(":", I + 1)) >= 0; )
        k++;
      if (m.substr(0, 2) === "::" && k--, m.substr(-2, 2) === "::" && k--, k > A)
        return null;
      for (de = A - k, D = ":"; de--; )
        D += "0:";
      return m = m.replace("::", D), m[0] === ":" && (m = m.slice(1)), m[m.length - 1] === ":" && (m = m.slice(0, -1)), A = function() {
        const et = m.split(":"), Re = [];
        for (let Oe = 0; Oe < et.length; Oe++)
          Re.push(parseInt(et[Oe], 16));
        return Re;
      }(), {
        parts: A,
        zoneId: P
      };
    }
    function v(m, A, k, I) {
      if (m.length !== A.length)
        throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
      let P = 0, D;
      for (; I > 0; ) {
        if (D = k - I, D < 0 && (D = 0), m[P] >> D !== A[P] >> D)
          return !1;
        I -= k, P += 1;
      }
      return !0;
    }
    function b(m) {
      if (s.test(m))
        return parseInt(m, 16);
      if (m[0] === "0" && !isNaN(parseInt(m[1], 10))) {
        if (i.test(m))
          return parseInt(m, 8);
        throw new Error(`ipaddr: cannot parse ${m} as octal`);
      }
      return parseInt(m, 10);
    }
    function H(m, A) {
      for (; m.length < A; )
        m = `0${m}`;
      return m;
    }
    const T = {};
    T.IPv4 = function() {
      function m(A) {
        if (A.length !== 4)
          throw new Error("ipaddr: ipv4 octet count should be 4");
        let k, I;
        for (k = 0; k < A.length; k++)
          if (I = A[k], !(0 <= I && I <= 255))
            throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
        this.octets = A;
      }
      return m.prototype.SpecialRanges = {
        unspecified: [[new m([0, 0, 0, 0]), 8]],
        broadcast: [[new m([255, 255, 255, 255]), 32]],
        // RFC3171
        multicast: [[new m([224, 0, 0, 0]), 4]],
        // RFC3927
        linkLocal: [[new m([169, 254, 0, 0]), 16]],
        // RFC5735
        loopback: [[new m([127, 0, 0, 0]), 8]],
        // RFC6598
        carrierGradeNat: [[new m([100, 64, 0, 0]), 10]],
        // RFC1918
        private: [
          [new m([10, 0, 0, 0]), 8],
          [new m([172, 16, 0, 0]), 12],
          [new m([192, 168, 0, 0]), 16]
        ],
        // Reserved and testing-only ranges; RFCs 5735, 5737, 2544, 1700
        reserved: [
          [new m([192, 0, 0, 0]), 24],
          [new m([192, 0, 2, 0]), 24],
          [new m([192, 88, 99, 0]), 24],
          [new m([198, 18, 0, 0]), 15],
          [new m([198, 51, 100, 0]), 24],
          [new m([203, 0, 113, 0]), 24],
          [new m([240, 0, 0, 0]), 4]
        ],
        // RFC7534, RFC7535
        as112: [
          [new m([192, 175, 48, 0]), 24],
          [new m([192, 31, 196, 0]), 24]
        ],
        // RFC7450
        amt: [
          [new m([192, 52, 193, 0]), 24]
        ]
      }, m.prototype.kind = function() {
        return "ipv4";
      }, m.prototype.match = function(A, k) {
        let I;
        if (k === void 0 && (I = A, A = I[0], k = I[1]), A.kind() !== "ipv4")
          throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
        return v(this.octets, A.octets, 8, k);
      }, m.prototype.prefixLengthFromSubnetMask = function() {
        let A = 0, k = !1;
        const I = {
          0: 8,
          128: 7,
          192: 6,
          224: 5,
          240: 4,
          248: 3,
          252: 2,
          254: 1,
          255: 0
        };
        let P, D, de;
        for (P = 3; P >= 0; P -= 1)
          if (D = this.octets[P], D in I) {
            if (de = I[D], k && de !== 0)
              return null;
            de !== 8 && (k = !0), A += de;
          } else
            return null;
        return 32 - A;
      }, m.prototype.range = function() {
        return T.subnetMatch(this, this.SpecialRanges);
      }, m.prototype.toByteArray = function() {
        return this.octets.slice(0);
      }, m.prototype.toIPv4MappedAddress = function() {
        return T.IPv6.parse(`::ffff:${this.toString()}`);
      }, m.prototype.toNormalizedString = function() {
        return this.toString();
      }, m.prototype.toString = function() {
        return this.octets.join(".");
      }, m;
    }(), T.IPv4.broadcastAddressFromCIDR = function(m) {
      try {
        const A = this.parseCIDR(m), k = A[0].toByteArray(), I = this.subnetMaskFromPrefixLength(A[1]).toByteArray(), P = [];
        let D = 0;
        for (; D < 4; )
          P.push(parseInt(k[D], 10) | parseInt(I[D], 10) ^ 255), D++;
        return new this(P);
      } catch {
        throw new Error("ipaddr: the address does not have IPv4 CIDR format");
      }
    }, T.IPv4.isIPv4 = function(m) {
      return this.parser(m) !== null;
    }, T.IPv4.isValid = function(m) {
      try {
        return new this(this.parser(m)), !0;
      } catch {
        return !1;
      }
    }, T.IPv4.isValidCIDR = function(m) {
      try {
        return this.parseCIDR(m), !0;
      } catch {
        return !1;
      }
    }, T.IPv4.isValidFourPartDecimal = function(m) {
      return !!(T.IPv4.isValid(m) && m.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/));
    }, T.IPv4.networkAddressFromCIDR = function(m) {
      let A, k, I, P, D;
      try {
        for (A = this.parseCIDR(m), I = A[0].toByteArray(), D = this.subnetMaskFromPrefixLength(A[1]).toByteArray(), P = [], k = 0; k < 4; )
          P.push(parseInt(I[k], 10) & parseInt(D[k], 10)), k++;
        return new this(P);
      } catch {
        throw new Error("ipaddr: the address does not have IPv4 CIDR format");
      }
    }, T.IPv4.parse = function(m) {
      const A = this.parser(m);
      if (A === null)
        throw new Error("ipaddr: string is not formatted like an IPv4 Address");
      return new this(A);
    }, T.IPv4.parseCIDR = function(m) {
      let A;
      if (A = m.match(/^(.+)\/(\d+)$/)) {
        const k = parseInt(A[2]);
        if (k >= 0 && k <= 32) {
          const I = [this.parse(A[1]), k];
          return Object.defineProperty(I, "toString", {
            value: function() {
              return this.join("/");
            }
          }), I;
        }
      }
      throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
    }, T.IPv4.parser = function(m) {
      let A, k, I;
      if (A = m.match(n.fourOctet))
        return function() {
          const P = A.slice(1, 6), D = [];
          for (let de = 0; de < P.length; de++)
            k = P[de], D.push(b(k));
          return D;
        }();
      if (A = m.match(n.longValue)) {
        if (I = b(A[1]), I > 4294967295 || I < 0)
          throw new Error("ipaddr: address outside defined range");
        return function() {
          const P = [];
          let D;
          for (D = 0; D <= 24; D += 8)
            P.push(I >> D & 255);
          return P;
        }().reverse();
      } else return (A = m.match(n.twoOctet)) ? function() {
        const P = A.slice(1, 4), D = [];
        if (I = b(P[1]), I > 16777215 || I < 0)
          throw new Error("ipaddr: address outside defined range");
        return D.push(b(P[0])), D.push(I >> 16 & 255), D.push(I >> 8 & 255), D.push(I & 255), D;
      }() : (A = m.match(n.threeOctet)) ? function() {
        const P = A.slice(1, 5), D = [];
        if (I = b(P[2]), I > 65535 || I < 0)
          throw new Error("ipaddr: address outside defined range");
        return D.push(b(P[0])), D.push(b(P[1])), D.push(I >> 8 & 255), D.push(I & 255), D;
      }() : null;
    }, T.IPv4.subnetMaskFromPrefixLength = function(m) {
      if (m = parseInt(m), m < 0 || m > 32)
        throw new Error("ipaddr: invalid IPv4 prefix length");
      const A = [0, 0, 0, 0];
      let k = 0;
      const I = Math.floor(m / 8);
      for (; k < I; )
        A[k] = 255, k++;
      return I < 4 && (A[I] = Math.pow(2, m % 8) - 1 << 8 - m % 8), new this(A);
    }, T.IPv6 = function() {
      function m(A, k) {
        let I, P;
        if (A.length === 16)
          for (this.parts = [], I = 0; I <= 14; I += 2)
            this.parts.push(A[I] << 8 | A[I + 1]);
        else if (A.length === 8)
          this.parts = A;
        else
          throw new Error("ipaddr: ipv6 part count should be 8 or 16");
        for (I = 0; I < this.parts.length; I++)
          if (P = this.parts[I], !(0 <= P && P <= 65535))
            throw new Error("ipaddr: ipv6 part should fit in 16 bits");
        k && (this.zoneId = k);
      }
      return m.prototype.SpecialRanges = {
        // RFC4291, here and after
        unspecified: [new m([0, 0, 0, 0, 0, 0, 0, 0]), 128],
        linkLocal: [new m([65152, 0, 0, 0, 0, 0, 0, 0]), 10],
        multicast: [new m([65280, 0, 0, 0, 0, 0, 0, 0]), 8],
        loopback: [new m([0, 0, 0, 0, 0, 0, 0, 1]), 128],
        uniqueLocal: [new m([64512, 0, 0, 0, 0, 0, 0, 0]), 7],
        ipv4Mapped: [new m([0, 0, 0, 0, 0, 65535, 0, 0]), 96],
        // RFC6666
        discard: [new m([256, 0, 0, 0, 0, 0, 0, 0]), 64],
        // RFC6145
        rfc6145: [new m([0, 0, 0, 0, 65535, 0, 0, 0]), 96],
        // RFC6052
        rfc6052: [new m([100, 65435, 0, 0, 0, 0, 0, 0]), 96],
        // RFC3056
        "6to4": [new m([8194, 0, 0, 0, 0, 0, 0, 0]), 16],
        // RFC6052, RFC6146
        teredo: [new m([8193, 0, 0, 0, 0, 0, 0, 0]), 32],
        // RFC5180
        benchmarking: [new m([8193, 2, 0, 0, 0, 0, 0, 0]), 48],
        // RFC7450
        amt: [new m([8193, 3, 0, 0, 0, 0, 0, 0]), 32],
        as112v6: [
          [new m([8193, 4, 274, 0, 0, 0, 0, 0]), 48],
          [new m([9760, 79, 32768, 0, 0, 0, 0, 0]), 48]
        ],
        deprecated: [new m([8193, 16, 0, 0, 0, 0, 0, 0]), 28],
        orchid2: [new m([8193, 32, 0, 0, 0, 0, 0, 0]), 28],
        droneRemoteIdProtocolEntityTags: [new m([8193, 48, 0, 0, 0, 0, 0, 0]), 28],
        reserved: [
          // RFC3849
          [new m([8193, 0, 0, 0, 0, 0, 0, 0]), 23],
          // RFC2928
          [new m([8193, 3512, 0, 0, 0, 0, 0, 0]), 32]
        ]
      }, m.prototype.isIPv4MappedAddress = function() {
        return this.range() === "ipv4Mapped";
      }, m.prototype.kind = function() {
        return "ipv6";
      }, m.prototype.match = function(A, k) {
        let I;
        if (k === void 0 && (I = A, A = I[0], k = I[1]), A.kind() !== "ipv6")
          throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
        return v(this.parts, A.parts, 16, k);
      }, m.prototype.prefixLengthFromSubnetMask = function() {
        let A = 0, k = !1;
        const I = {
          0: 16,
          32768: 15,
          49152: 14,
          57344: 13,
          61440: 12,
          63488: 11,
          64512: 10,
          65024: 9,
          65280: 8,
          65408: 7,
          65472: 6,
          65504: 5,
          65520: 4,
          65528: 3,
          65532: 2,
          65534: 1,
          65535: 0
        };
        let P, D;
        for (let de = 7; de >= 0; de -= 1)
          if (P = this.parts[de], P in I) {
            if (D = I[P], k && D !== 0)
              return null;
            D !== 16 && (k = !0), A += D;
          } else
            return null;
        return 128 - A;
      }, m.prototype.range = function() {
        return T.subnetMatch(this, this.SpecialRanges);
      }, m.prototype.toByteArray = function() {
        let A;
        const k = [], I = this.parts;
        for (let P = 0; P < I.length; P++)
          A = I[P], k.push(A >> 8), k.push(A & 255);
        return k;
      }, m.prototype.toFixedLengthString = function() {
        const A = (function() {
          const I = [];
          for (let P = 0; P < this.parts.length; P++)
            I.push(H(this.parts[P].toString(16), 4));
          return I;
        }).call(this).join(":");
        let k = "";
        return this.zoneId && (k = `%${this.zoneId}`), A + k;
      }, m.prototype.toIPv4Address = function() {
        if (!this.isIPv4MappedAddress())
          throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
        const A = this.parts.slice(-2), k = A[0], I = A[1];
        return new T.IPv4([k >> 8, k & 255, I >> 8, I & 255]);
      }, m.prototype.toNormalizedString = function() {
        const A = (function() {
          const I = [];
          for (let P = 0; P < this.parts.length; P++)
            I.push(this.parts[P].toString(16));
          return I;
        }).call(this).join(":");
        let k = "";
        return this.zoneId && (k = `%${this.zoneId}`), A + k;
      }, m.prototype.toRFC5952String = function() {
        const A = /((^|:)(0(:|$)){2,})/g, k = this.toNormalizedString();
        let I = 0, P = -1, D;
        for (; D = A.exec(k); )
          D[0].length > P && (I = D.index, P = D[0].length);
        return P < 0 ? k : `${k.substring(0, I)}::${k.substring(I + P)}`;
      }, m.prototype.toString = function() {
        return this.toRFC5952String();
      }, m;
    }(), T.IPv6.broadcastAddressFromCIDR = function(m) {
      try {
        const A = this.parseCIDR(m), k = A[0].toByteArray(), I = this.subnetMaskFromPrefixLength(A[1]).toByteArray(), P = [];
        let D = 0;
        for (; D < 16; )
          P.push(parseInt(k[D], 10) | parseInt(I[D], 10) ^ 255), D++;
        return new this(P);
      } catch (A) {
        throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${A})`);
      }
    }, T.IPv6.isIPv6 = function(m) {
      return this.parser(m) !== null;
    }, T.IPv6.isValid = function(m) {
      if (typeof m == "string" && m.indexOf(":") === -1)
        return !1;
      try {
        const A = this.parser(m);
        return new this(A.parts, A.zoneId), !0;
      } catch {
        return !1;
      }
    }, T.IPv6.isValidCIDR = function(m) {
      if (typeof m == "string" && m.indexOf(":") === -1)
        return !1;
      try {
        return this.parseCIDR(m), !0;
      } catch {
        return !1;
      }
    }, T.IPv6.networkAddressFromCIDR = function(m) {
      let A, k, I, P, D;
      try {
        for (A = this.parseCIDR(m), I = A[0].toByteArray(), D = this.subnetMaskFromPrefixLength(A[1]).toByteArray(), P = [], k = 0; k < 16; )
          P.push(parseInt(I[k], 10) & parseInt(D[k], 10)), k++;
        return new this(P);
      } catch (de) {
        throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${de})`);
      }
    }, T.IPv6.parse = function(m) {
      const A = this.parser(m);
      if (A.parts === null)
        throw new Error("ipaddr: string is not formatted like an IPv6 Address");
      return new this(A.parts, A.zoneId);
    }, T.IPv6.parseCIDR = function(m) {
      let A, k, I;
      if ((k = m.match(/^(.+)\/(\d+)$/)) && (A = parseInt(k[2]), A >= 0 && A <= 128))
        return I = [this.parse(k[1]), A], Object.defineProperty(I, "toString", {
          value: function() {
            return this.join("/");
          }
        }), I;
      throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
    }, T.IPv6.parser = function(m) {
      let A, k, I, P, D, de;
      if (I = m.match(u.deprecatedTransitional))
        return this.parser(`::ffff:${I[1]}`);
      if (u.native.test(m))
        return h(m, 8);
      if ((I = m.match(u.transitional)) && (de = I[6] || "", A = I[1], I[1].endsWith("::") || (A = A.slice(0, -1)), A = h(A + de, 6), A.parts)) {
        for (D = [
          parseInt(I[2]),
          parseInt(I[3]),
          parseInt(I[4]),
          parseInt(I[5])
        ], k = 0; k < D.length; k++)
          if (P = D[k], !(0 <= P && P <= 255))
            return null;
        return A.parts.push(D[0] << 8 | D[1]), A.parts.push(D[2] << 8 | D[3]), {
          parts: A.parts,
          zoneId: A.zoneId
        };
      }
      return null;
    }, T.IPv6.subnetMaskFromPrefixLength = function(m) {
      if (m = parseInt(m), m < 0 || m > 128)
        throw new Error("ipaddr: invalid IPv6 prefix length");
      const A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let k = 0;
      const I = Math.floor(m / 8);
      for (; k < I; )
        A[k] = 255, k++;
      return I < 16 && (A[I] = Math.pow(2, m % 8) - 1 << 8 - m % 8), new this(A);
    }, T.fromByteArray = function(m) {
      const A = m.length;
      if (A === 4)
        return new T.IPv4(m);
      if (A === 16)
        return new T.IPv6(m);
      throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
    }, T.isValid = function(m) {
      return T.IPv6.isValid(m) || T.IPv4.isValid(m);
    }, T.isValidCIDR = function(m) {
      return T.IPv6.isValidCIDR(m) || T.IPv4.isValidCIDR(m);
    }, T.parse = function(m) {
      if (T.IPv6.isValid(m))
        return T.IPv6.parse(m);
      if (T.IPv4.isValid(m))
        return T.IPv4.parse(m);
      throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
    }, T.parseCIDR = function(m) {
      try {
        return T.IPv6.parseCIDR(m);
      } catch {
        try {
          return T.IPv4.parseCIDR(m);
        } catch {
          throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
        }
      }
    }, T.process = function(m) {
      const A = this.parse(m);
      return A.kind() === "ipv6" && A.isIPv4MappedAddress() ? A.toIPv4Address() : A;
    }, T.subnetMatch = function(m, A, k) {
      let I, P, D, de;
      k == null && (k = "unicast");
      for (P in A)
        if (Object.prototype.hasOwnProperty.call(A, P)) {
          for (D = A[P], D[0] && !(D[0] instanceof Array) && (D = [D]), I = 0; I < D.length; I++)
            if (de = D[I], m.kind() === de[0].kind() && m.match.apply(m, de))
              return P;
        }
      return k;
    }, r.exports ? r.exports = T : e.ipaddr = T;
  })(ul);
})(Pp);
var Gf = Pp.exports;
class zf {
  static decodeIP(e) {
    if (e.length === 64 && parseInt(e, 16) === 0)
      return "::/0";
    if (e.length !== 16)
      return e;
    const t = parseInt(e.slice(8), 16).toString(2).split("").reduce((i, s) => i + +s, 0);
    let n = e.slice(0, 8).replace(/(.{2})/g, (i) => `${parseInt(i, 16)}.`);
    return n = n.slice(0, -1), `${n}/${t}`;
  }
  static toString(e) {
    if (e.byteLength === 4 || e.byteLength === 16) {
      const t = new Uint8Array(e);
      return Gf.fromByteArray(Array.from(t)).toString();
    }
    return this.decodeIP(le.ToHex(e));
  }
  static fromString(e) {
    const t = Gf.parse(e);
    return new Uint8Array(t.toByteArray()).buffer;
  }
}
var pl, yl, gl;
let Qt = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
  toString() {
    return this.bmpString || this.printableString || this.teletexString || this.universalString || this.utf8String || "";
  }
};
f([
  y({ type: x.TeletexString })
], Qt.prototype, "teletexString", void 0);
f([
  y({ type: x.PrintableString })
], Qt.prototype, "printableString", void 0);
f([
  y({ type: x.UniversalString })
], Qt.prototype, "universalString", void 0);
f([
  y({ type: x.Utf8String })
], Qt.prototype, "utf8String", void 0);
f([
  y({ type: x.BmpString })
], Qt.prototype, "bmpString", void 0);
Qt = f([
  F({ type: M.Choice })
], Qt);
let Hi = class extends Qt {
  constructor(e = {}) {
    super(e), Object.assign(this, e);
  }
  toString() {
    return this.ia5String || (this.anyValue ? le.ToHex(this.anyValue) : super.toString());
  }
};
f([
  y({ type: x.IA5String })
], Hi.prototype, "ia5String", void 0);
f([
  y({ type: x.Any })
], Hi.prototype, "anyValue", void 0);
Hi = f([
  F({ type: M.Choice })
], Hi);
class uc {
  constructor(e = {}) {
    this.type = "", this.value = new Hi(), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], uc.prototype, "type", void 0);
f([
  y({ type: Hi })
], uc.prototype, "value", void 0);
let Fi = pl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, pl.prototype);
  }
};
Fi = pl = f([
  F({ type: M.Set, itemType: uc })
], Fi);
let vl = yl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, yl.prototype);
  }
};
vl = yl = f([
  F({ type: M.Sequence, itemType: Fi })
], vl);
let Ft = gl = class extends vl {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, gl.prototype);
  }
};
Ft = gl = f([
  F({ type: M.Sequence })
], Ft);
const hv = {
  fromASN: (r) => zf.toString(Yo.fromASN(r)),
  toASN: (r) => Yo.toASN(zf.fromString(r))
};
class Vs {
  constructor(e = {}) {
    this.typeId = "", this.value = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], Vs.prototype, "typeId", void 0);
f([
  y({ type: x.Any, context: 0 })
], Vs.prototype, "value", void 0);
class Yu {
  constructor(e = {}) {
    this.partyName = new Qt(), Object.assign(this, e);
  }
}
f([
  y({ type: Qt, optional: !0, context: 0, implicit: !0 })
], Yu.prototype, "nameAssigner", void 0);
f([
  y({ type: Qt, context: 1, implicit: !0 })
], Yu.prototype, "partyName", void 0);
let Ve = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: Vs, context: 0, implicit: !0 })
], Ve.prototype, "otherName", void 0);
f([
  y({ type: x.IA5String, context: 1, implicit: !0 })
], Ve.prototype, "rfc822Name", void 0);
f([
  y({ type: x.IA5String, context: 2, implicit: !0 })
], Ve.prototype, "dNSName", void 0);
f([
  y({ type: x.Any, context: 3, implicit: !0 })
], Ve.prototype, "x400Address", void 0);
f([
  y({ type: Ft, context: 4, implicit: !1 })
], Ve.prototype, "directoryName", void 0);
f([
  y({ type: Yu, context: 5 })
], Ve.prototype, "ediPartyName", void 0);
f([
  y({ type: x.IA5String, context: 6, implicit: !0 })
], Ve.prototype, "uniformResourceIdentifier", void 0);
f([
  y({ type: x.OctetString, context: 7, implicit: !0, converter: hv })
], Ve.prototype, "iPAddress", void 0);
f([
  y({ type: x.ObjectIdentifier, context: 8, implicit: !0 })
], Ve.prototype, "registeredID", void 0);
Ve = f([
  F({ type: M.Choice })
], Ve);
const Ju = "1.3.6.1.5.5.7", dv = `${Ju}.1`, os = `${Ju}.3`, fc = `${Ju}.48`, Kf = `${fc}.1`, qf = `${fc}.2`, Zf = `${fc}.3`, Wf = `${fc}.5`, Xn = "2.5.29";
var ml;
const wl = `${dv}.1`;
class wo {
  constructor(e = {}) {
    this.accessMethod = "", this.accessLocation = new Ve(), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], wo.prototype, "accessMethod", void 0);
f([
  y({ type: Ve })
], wo.prototype, "accessLocation", void 0);
let Ui = ml = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, ml.prototype);
  }
};
Ui = ml = f([
  F({ type: M.Sequence, itemType: wo })
], Ui);
const Jo = `${Xn}.35`;
class Xu extends ot {
}
class si {
  constructor(e = {}) {
    e && Object.assign(this, e);
  }
}
f([
  y({ type: Xu, context: 0, optional: !0, implicit: !0 })
], si.prototype, "keyIdentifier", void 0);
f([
  y({ type: Ve, context: 1, optional: !0, implicit: !0, repeated: "sequence" })
], si.prototype, "authorityCertIssuer", void 0);
f([
  y({
    type: x.Integer,
    context: 2,
    optional: !0,
    implicit: !0,
    converter: _t
  })
], si.prototype, "authorityCertSerialNumber", void 0);
const jp = `${Xn}.19`;
class Xo {
  constructor(e = {}) {
    this.cA = !1, Object.assign(this, e);
  }
}
f([
  y({ type: x.Boolean, defaultValue: !1 })
], Xo.prototype, "cA", void 0);
f([
  y({ type: x.Integer, optional: !0 })
], Xo.prototype, "pathLenConstraint", void 0);
var bl;
let lr = bl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, bl.prototype);
  }
};
lr = bl = f([
  F({ type: M.Sequence, itemType: Ve })
], lr);
var xl;
let Yf = xl = class extends lr {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, xl.prototype);
  }
};
Yf = xl = f([
  F({ type: M.Sequence })
], Yf);
var Al;
const Rp = `${Xn}.32`;
let _n = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
  toString() {
    return this.ia5String || this.visibleString || this.bmpString || this.utf8String || "";
  }
};
f([
  y({ type: x.IA5String })
], _n.prototype, "ia5String", void 0);
f([
  y({ type: x.VisibleString })
], _n.prototype, "visibleString", void 0);
f([
  y({ type: x.BmpString })
], _n.prototype, "bmpString", void 0);
f([
  y({ type: x.Utf8String })
], _n.prototype, "utf8String", void 0);
_n = f([
  F({ type: M.Choice })
], _n);
class Qu {
  constructor(e = {}) {
    this.organization = new _n(), this.noticeNumbers = [], Object.assign(this, e);
  }
}
f([
  y({ type: _n })
], Qu.prototype, "organization", void 0);
f([
  y({ type: x.Integer, repeated: "sequence" })
], Qu.prototype, "noticeNumbers", void 0);
class ef {
  constructor(e = {}) {
    Object.assign(this, e);
  }
}
f([
  y({ type: Qu, optional: !0 })
], ef.prototype, "noticeRef", void 0);
f([
  y({ type: _n, optional: !0 })
], ef.prototype, "explicitText", void 0);
let Qo = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: x.IA5String })
], Qo.prototype, "cPSuri", void 0);
f([
  y({ type: ef })
], Qo.prototype, "userNotice", void 0);
Qo = f([
  F({ type: M.Choice })
], Qo);
class tf {
  constructor(e = {}) {
    this.policyQualifierId = "", this.qualifier = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], tf.prototype, "policyQualifierId", void 0);
f([
  y({ type: x.Any })
], tf.prototype, "qualifier", void 0);
class hc {
  constructor(e = {}) {
    this.policyIdentifier = "", Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], hc.prototype, "policyIdentifier", void 0);
f([
  y({ type: tf, repeated: "sequence", optional: !0 })
], hc.prototype, "policyQualifiers", void 0);
let ea = Al = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Al.prototype);
  }
};
ea = Al = f([
  F({ type: M.Sequence, itemType: hc })
], ea);
let ta = class {
  constructor(e = 0) {
    this.value = e;
  }
};
f([
  y({ type: x.Integer })
], ta.prototype, "value", void 0);
ta = f([
  F({ type: M.Choice })
], ta);
let Jf = class extends ta {
};
Jf = f([
  F({ type: M.Choice })
], Jf);
var Sl;
const _l = `${Xn}.31`;
var $r;
(function(r) {
  r[r.unused = 1] = "unused", r[r.keyCompromise = 2] = "keyCompromise", r[r.cACompromise = 4] = "cACompromise", r[r.affiliationChanged = 8] = "affiliationChanged", r[r.superseded = 16] = "superseded", r[r.cessationOfOperation = 32] = "cessationOfOperation", r[r.certificateHold = 64] = "certificateHold", r[r.privilegeWithdrawn = 128] = "privilegeWithdrawn", r[r.aACompromise = 256] = "aACompromise";
})($r || ($r = {}));
class Up extends lc {
  toJSON() {
    const e = [], t = this.toNumber();
    return t & $r.aACompromise && e.push("aACompromise"), t & $r.affiliationChanged && e.push("affiliationChanged"), t & $r.cACompromise && e.push("cACompromise"), t & $r.certificateHold && e.push("certificateHold"), t & $r.cessationOfOperation && e.push("cessationOfOperation"), t & $r.keyCompromise && e.push("keyCompromise"), t & $r.privilegeWithdrawn && e.push("privilegeWithdrawn"), t & $r.superseded && e.push("superseded"), t & $r.unused && e.push("unused"), e;
  }
  toString() {
    return `[${this.toJSON().join(", ")}]`;
  }
}
let di = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: Ve, context: 0, repeated: "sequence", implicit: !0 })
], di.prototype, "fullName", void 0);
f([
  y({ type: Fi, context: 1, implicit: !0 })
], di.prototype, "nameRelativeToCRLIssuer", void 0);
di = f([
  F({ type: M.Choice })
], di);
class as {
  constructor(e = {}) {
    Object.assign(this, e);
  }
}
f([
  y({ type: di, context: 0, optional: !0 })
], as.prototype, "distributionPoint", void 0);
f([
  y({ type: Up, context: 1, optional: !0, implicit: !0 })
], as.prototype, "reasons", void 0);
f([
  y({ type: Ve, context: 2, optional: !0, repeated: "sequence", implicit: !0 })
], as.prototype, "cRLIssuer", void 0);
let Mi = Sl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Sl.prototype);
  }
};
Mi = Sl = f([
  F({ type: M.Sequence, itemType: as })
], Mi);
var El;
let Xf = El = class extends Mi {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, El.prototype);
  }
};
Xf = El = f([
  F({ type: M.Sequence, itemType: as })
], Xf);
class sr {
  constructor(e = {}) {
    this.onlyContainsUserCerts = sr.ONLY, this.onlyContainsCACerts = sr.ONLY, this.indirectCRL = sr.ONLY, this.onlyContainsAttributeCerts = sr.ONLY, Object.assign(this, e);
  }
}
sr.ONLY = !1;
f([
  y({ type: di, context: 0, optional: !0 })
], sr.prototype, "distributionPoint", void 0);
f([
  y({ type: x.Boolean, context: 1, defaultValue: sr.ONLY, implicit: !0 })
], sr.prototype, "onlyContainsUserCerts", void 0);
f([
  y({ type: x.Boolean, context: 2, defaultValue: sr.ONLY, implicit: !0 })
], sr.prototype, "onlyContainsCACerts", void 0);
f([
  y({ type: Up, context: 3, optional: !0, implicit: !0 })
], sr.prototype, "onlySomeReasons", void 0);
f([
  y({ type: x.Boolean, context: 4, defaultValue: sr.ONLY, implicit: !0 })
], sr.prototype, "indirectCRL", void 0);
f([
  y({ type: x.Boolean, context: 5, defaultValue: sr.ONLY, implicit: !0 })
], sr.prototype, "onlyContainsAttributeCerts", void 0);
var Ps;
(function(r) {
  r[r.unspecified = 0] = "unspecified", r[r.keyCompromise = 1] = "keyCompromise", r[r.cACompromise = 2] = "cACompromise", r[r.affiliationChanged = 3] = "affiliationChanged", r[r.superseded = 4] = "superseded", r[r.cessationOfOperation = 5] = "cessationOfOperation", r[r.certificateHold = 6] = "certificateHold", r[r.removeFromCRL = 8] = "removeFromCRL", r[r.privilegeWithdrawn = 9] = "privilegeWithdrawn", r[r.aACompromise = 10] = "aACompromise";
})(Ps || (Ps = {}));
let Il = class {
  constructor(e = Ps.unspecified) {
    this.reason = Ps.unspecified, this.reason = e;
  }
  toJSON() {
    return Ps[this.reason];
  }
  toString() {
    return this.toJSON();
  }
};
f([
  y({ type: x.Enumerated })
], Il.prototype, "reason", void 0);
Il = f([
  F({ type: M.Choice })
], Il);
var kl;
const Dp = `${Xn}.37`;
let ra = kl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, kl.prototype);
  }
};
ra = kl = f([
  F({ type: M.Sequence, itemType: x.ObjectIdentifier })
], ra);
const pv = `${os}.1`, yv = `${os}.2`, gv = `${os}.3`, vv = `${os}.4`, mv = `${os}.8`, wv = `${os}.9`;
let Cl = class {
  constructor(e = new ArrayBuffer(0)) {
    this.value = e;
  }
};
f([
  y({ type: x.Integer, converter: _t })
], Cl.prototype, "value", void 0);
Cl = f([
  F({ type: M.Choice })
], Cl);
let Bl = class {
  constructor(e) {
    this.value = /* @__PURE__ */ new Date(), e && (this.value = e);
  }
};
f([
  y({ type: x.GeneralizedTime })
], Bl.prototype, "value", void 0);
Bl = f([
  F({ type: M.Choice })
], Bl);
var Ol;
let Qf = Ol = class extends lr {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Ol.prototype);
  }
};
Qf = Ol = f([
  F({ type: M.Sequence })
], Qf);
const $p = `${Xn}.15`;
var Mr;
(function(r) {
  r[r.digitalSignature = 1] = "digitalSignature", r[r.nonRepudiation = 2] = "nonRepudiation", r[r.keyEncipherment = 4] = "keyEncipherment", r[r.dataEncipherment = 8] = "dataEncipherment", r[r.keyAgreement = 16] = "keyAgreement", r[r.keyCertSign = 32] = "keyCertSign", r[r.cRLSign = 64] = "cRLSign", r[r.encipherOnly = 128] = "encipherOnly", r[r.decipherOnly = 256] = "decipherOnly";
})(Mr || (Mr = {}));
class qc extends lc {
  toJSON() {
    const e = this.toNumber(), t = [];
    return e & Mr.cRLSign && t.push("crlSign"), e & Mr.dataEncipherment && t.push("dataEncipherment"), e & Mr.decipherOnly && t.push("decipherOnly"), e & Mr.digitalSignature && t.push("digitalSignature"), e & Mr.encipherOnly && t.push("encipherOnly"), e & Mr.keyAgreement && t.push("keyAgreement"), e & Mr.keyCertSign && t.push("keyCertSign"), e & Mr.keyEncipherment && t.push("keyEncipherment"), e & Mr.nonRepudiation && t.push("nonRepudiation"), t;
  }
  toString() {
    return `[${this.toJSON().join(", ")}]`;
  }
}
var Tl;
class dc {
  constructor(e = {}) {
    this.base = new Ve(), this.minimum = 0, Object.assign(this, e);
  }
}
f([
  y({ type: Ve })
], dc.prototype, "base", void 0);
f([
  y({ type: x.Integer, context: 0, defaultValue: 0, implicit: !0 })
], dc.prototype, "minimum", void 0);
f([
  y({ type: x.Integer, context: 1, optional: !0, implicit: !0 })
], dc.prototype, "maximum", void 0);
let na = Tl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Tl.prototype);
  }
};
na = Tl = f([
  F({ type: M.Sequence, itemType: dc })
], na);
class Mp {
  constructor(e = {}) {
    Object.assign(this, e);
  }
}
f([
  y({ type: na, context: 0, optional: !0, implicit: !0 })
], Mp.prototype, "permittedSubtrees", void 0);
f([
  y({ type: na, context: 1, optional: !0, implicit: !0 })
], Mp.prototype, "excludedSubtrees", void 0);
class Vp {
  constructor(e = {}) {
    Object.assign(this, e);
  }
}
f([
  y({
    type: x.Integer,
    context: 0,
    implicit: !0,
    optional: !0,
    converter: _t
  })
], Vp.prototype, "requireExplicitPolicy", void 0);
f([
  y({
    type: x.Integer,
    context: 1,
    implicit: !0,
    optional: !0,
    converter: _t
  })
], Vp.prototype, "inhibitPolicyMapping", void 0);
var Nl;
class rf {
  constructor(e = {}) {
    this.issuerDomainPolicy = "", this.subjectDomainPolicy = "", Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], rf.prototype, "issuerDomainPolicy", void 0);
f([
  y({ type: x.ObjectIdentifier })
], rf.prototype, "subjectDomainPolicy", void 0);
let eh = Nl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Nl.prototype);
  }
};
eh = Nl = f([
  F({ type: M.Sequence, itemType: rf })
], eh);
var Pl;
const nf = `${Xn}.17`;
let jl = Pl = class extends lr {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Pl.prototype);
  }
};
jl = Pl = f([
  F({ type: M.Sequence })
], jl);
let En = class {
  constructor(e = {}) {
    this.type = "", this.values = [], Object.assign(this, e);
  }
};
f([
  y({ type: x.ObjectIdentifier })
], En.prototype, "type", void 0);
f([
  y({ type: x.Any, repeated: "set" })
], En.prototype, "values", void 0);
var Rl;
let th = Rl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Rl.prototype);
  }
};
th = Rl = f([
  F({ type: M.Sequence, itemType: En })
], th);
const sf = `${Xn}.14`;
class Fn extends Xu {
}
class Lp {
  constructor(e = {}) {
    Object.assign(this, e);
  }
}
f([
  y({ type: x.GeneralizedTime, context: 0, implicit: !0, optional: !0 })
], Lp.prototype, "notBefore", void 0);
f([
  y({ type: x.GeneralizedTime, context: 1, implicit: !0, optional: !0 })
], Lp.prototype, "notAfter", void 0);
var js;
(function(r) {
  r[r.keyUpdateAllowed = 1] = "keyUpdateAllowed", r[r.newExtensions = 2] = "newExtensions", r[r.pKIXCertificate = 4] = "pKIXCertificate";
})(js || (js = {}));
class Hp extends lc {
  toJSON() {
    const e = [], t = this.toNumber();
    return t & js.pKIXCertificate && e.push("pKIXCertificate"), t & js.newExtensions && e.push("newExtensions"), t & js.keyUpdateAllowed && e.push("keyUpdateAllowed"), e;
  }
  toString() {
    return `[${this.toJSON().join(", ")}]`;
  }
}
class Fp {
  constructor(e = {}) {
    this.entrustVers = "", this.entrustInfoFlags = new Hp(), Object.assign(this, e);
  }
}
f([
  y({ type: x.GeneralString })
], Fp.prototype, "entrustVers", void 0);
f([
  y({ type: Hp })
], Fp.prototype, "entrustInfoFlags", void 0);
var Ul;
let rh = Ul = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Ul.prototype);
  }
};
rh = Ul = f([
  F({ type: M.Sequence, itemType: wo })
], rh);
class ne {
  constructor(e = {}) {
    this.algorithm = "", Object.assign(this, e);
  }
  isEqual(e) {
    return e instanceof ne && e.algorithm == this.algorithm && (e.parameters && this.parameters && qo(e.parameters, this.parameters) || e.parameters === this.parameters);
  }
}
f([
  y({
    type: x.ObjectIdentifier
  })
], ne.prototype, "algorithm", void 0);
f([
  y({
    type: x.Any,
    optional: !0
  })
], ne.prototype, "parameters", void 0);
class sn {
  constructor(e = {}) {
    this.algorithm = new ne(), this.subjectPublicKey = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: ne })
], sn.prototype, "algorithm", void 0);
f([
  y({ type: x.BitString })
], sn.prototype, "subjectPublicKey", void 0);
let Jt = class {
  constructor(e) {
    if (e)
      if (typeof e == "string" || typeof e == "number" || e instanceof Date) {
        const t = new Date(e);
        t.getUTCFullYear() > 2049 ? this.generalTime = t : this.utcTime = t;
      } else
        Object.assign(this, e);
  }
  getTime() {
    const e = this.utcTime || this.generalTime;
    if (!e)
      throw new Error("Cannot get time from CHOICE object");
    return e;
  }
};
f([
  y({
    type: x.UTCTime
  })
], Jt.prototype, "utcTime", void 0);
f([
  y({
    type: x.GeneralizedTime
  })
], Jt.prototype, "generalTime", void 0);
Jt = f([
  F({ type: M.Choice })
], Jt);
class pc {
  constructor(e) {
    this.notBefore = new Jt(/* @__PURE__ */ new Date()), this.notAfter = new Jt(/* @__PURE__ */ new Date()), e && (this.notBefore = new Jt(e.notBefore), this.notAfter = new Jt(e.notAfter));
  }
}
f([
  y({ type: Jt })
], pc.prototype, "notBefore", void 0);
f([
  y({ type: Jt })
], pc.prototype, "notAfter", void 0);
var Dl;
let Gr = class Gp {
  constructor(e = {}) {
    this.extnID = "", this.critical = Gp.CRITICAL, this.extnValue = new ot(), Object.assign(this, e);
  }
};
Gr.CRITICAL = !1;
f([
  y({ type: x.ObjectIdentifier })
], Gr.prototype, "extnID", void 0);
f([
  y({
    type: x.Boolean,
    defaultValue: Gr.CRITICAL
  })
], Gr.prototype, "critical", void 0);
f([
  y({ type: ot })
], Gr.prototype, "extnValue", void 0);
let pi = Dl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Dl.prototype);
  }
};
pi = Dl = f([
  F({ type: M.Sequence, itemType: Gr })
], pi);
var Gi;
(function(r) {
  r[r.v1 = 0] = "v1", r[r.v2 = 1] = "v2", r[r.v3 = 2] = "v3";
})(Gi || (Gi = {}));
class jr {
  constructor(e = {}) {
    this.version = Gi.v1, this.serialNumber = new ArrayBuffer(0), this.signature = new ne(), this.issuer = new Ft(), this.validity = new pc(), this.subject = new Ft(), this.subjectPublicKeyInfo = new sn(), Object.assign(this, e);
  }
}
f([
  y({
    type: x.Integer,
    context: 0,
    defaultValue: Gi.v1
  })
], jr.prototype, "version", void 0);
f([
  y({
    type: x.Integer,
    converter: _t
  })
], jr.prototype, "serialNumber", void 0);
f([
  y({ type: ne })
], jr.prototype, "signature", void 0);
f([
  y({ type: Ft })
], jr.prototype, "issuer", void 0);
f([
  y({ type: pc })
], jr.prototype, "validity", void 0);
f([
  y({ type: Ft })
], jr.prototype, "subject", void 0);
f([
  y({ type: sn })
], jr.prototype, "subjectPublicKeyInfo", void 0);
f([
  y({
    type: x.BitString,
    context: 1,
    implicit: !0,
    optional: !0
  })
], jr.prototype, "issuerUniqueID", void 0);
f([
  y({ type: x.BitString, context: 2, implicit: !0, optional: !0 })
], jr.prototype, "subjectUniqueID", void 0);
f([
  y({ type: pi, context: 3, optional: !0 })
], jr.prototype, "extensions", void 0);
class yi {
  constructor(e = {}) {
    this.tbsCertificate = new jr(), this.signatureAlgorithm = new ne(), this.signatureValue = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: jr })
], yi.prototype, "tbsCertificate", void 0);
f([
  y({ type: ne })
], yi.prototype, "signatureAlgorithm", void 0);
f([
  y({ type: x.BitString })
], yi.prototype, "signatureValue", void 0);
class yc {
  constructor(e = {}) {
    this.userCertificate = new ArrayBuffer(0), this.revocationDate = new Jt(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer, converter: _t })
], yc.prototype, "userCertificate", void 0);
f([
  y({ type: Jt })
], yc.prototype, "revocationDate", void 0);
f([
  y({ type: Gr, optional: !0, repeated: "sequence" })
], yc.prototype, "crlEntryExtensions", void 0);
class On {
  constructor(e = {}) {
    this.signature = new ne(), this.issuer = new Ft(), this.thisUpdate = new Jt(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer, optional: !0 })
], On.prototype, "version", void 0);
f([
  y({ type: ne })
], On.prototype, "signature", void 0);
f([
  y({ type: Ft })
], On.prototype, "issuer", void 0);
f([
  y({ type: Jt })
], On.prototype, "thisUpdate", void 0);
f([
  y({ type: Jt, optional: !0 })
], On.prototype, "nextUpdate", void 0);
f([
  y({ type: yc, repeated: "sequence", optional: !0 })
], On.prototype, "revokedCertificates", void 0);
f([
  y({ type: Gr, optional: !0, context: 0, repeated: "sequence" })
], On.prototype, "crlExtensions", void 0);
class of {
  constructor(e = {}) {
    this.tbsCertList = new On(), this.signatureAlgorithm = new ne(), this.signature = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: On })
], of.prototype, "tbsCertList", void 0);
f([
  y({ type: ne })
], of.prototype, "signatureAlgorithm", void 0);
f([
  y({ type: x.BitString })
], of.prototype, "signature", void 0);
class cs {
  constructor(e = {}) {
    this.issuer = new Ft(), this.serialNumber = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: Ft })
], cs.prototype, "issuer", void 0);
f([
  y({ type: x.Integer, converter: _t })
], cs.prototype, "serialNumber", void 0);
let zi = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: Fn, context: 0, implicit: !0 })
], zi.prototype, "subjectKeyIdentifier", void 0);
f([
  y({ type: cs })
], zi.prototype, "issuerAndSerialNumber", void 0);
zi = f([
  F({ type: M.Choice })
], zi);
var ln;
(function(r) {
  r[r.v0 = 0] = "v0", r[r.v1 = 1] = "v1", r[r.v2 = 2] = "v2", r[r.v3 = 3] = "v3", r[r.v4 = 4] = "v4", r[r.v5 = 5] = "v5";
})(ln || (ln = {}));
let Ls = class extends ne {
};
Ls = f([
  F({ type: M.Sequence })
], Ls);
let ia = class extends ne {
};
ia = f([
  F({ type: M.Sequence })
], ia);
let un = class extends ne {
};
un = f([
  F({ type: M.Sequence })
], un);
let sa = class extends ne {
};
sa = f([
  F({ type: M.Sequence })
], sa);
let nh = class extends ne {
};
nh = f([
  F({ type: M.Sequence })
], nh);
let $l = class extends ne {
};
$l = f([
  F({ type: M.Sequence })
], $l);
let ls = class {
  constructor(e = {}) {
    this.attrType = "", this.attrValues = [], Object.assign(this, e);
  }
};
f([
  y({ type: x.ObjectIdentifier })
], ls.prototype, "attrType", void 0);
f([
  y({ type: x.Any, repeated: "set" })
], ls.prototype, "attrValues", void 0);
var Ml;
class pn {
  constructor(e = {}) {
    this.version = ln.v0, this.sid = new zi(), this.digestAlgorithm = new Ls(), this.signatureAlgorithm = new ia(), this.signature = new ot(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], pn.prototype, "version", void 0);
f([
  y({ type: zi })
], pn.prototype, "sid", void 0);
f([
  y({ type: Ls })
], pn.prototype, "digestAlgorithm", void 0);
f([
  y({ type: ls, repeated: "set", context: 0, implicit: !0, optional: !0 })
], pn.prototype, "signedAttrs", void 0);
f([
  y({ type: ia })
], pn.prototype, "signatureAlgorithm", void 0);
f([
  y({ type: ot })
], pn.prototype, "signature", void 0);
f([
  y({ type: ls, repeated: "set", context: 1, implicit: !0, optional: !0 })
], pn.prototype, "unsignedAttrs", void 0);
let oa = Ml = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Ml.prototype);
  }
};
oa = Ml = f([
  F({ type: M.Set, itemType: pn })
], oa);
let ih = class extends Jt {
};
ih = f([
  F({ type: M.Choice })
], ih);
let sh = class extends pn {
};
sh = f([
  F({ type: M.Sequence })
], sh);
class af {
  constructor(e = {}) {
    this.acIssuer = new Ve(), this.acSerial = 0, this.attrs = [], Object.assign(this, e);
  }
}
f([
  y({ type: Ve })
], af.prototype, "acIssuer", void 0);
f([
  y({ type: x.Integer })
], af.prototype, "acSerial", void 0);
f([
  y({ type: En, repeated: "sequence" })
], af.prototype, "attrs", void 0);
var Vl;
let aa = Vl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Vl.prototype);
  }
};
aa = Vl = f([
  F({ type: M.Sequence, itemType: x.ObjectIdentifier })
], aa);
class gc {
  constructor(e = {}) {
    this.permitUnSpecified = !0, Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer, optional: !0 })
], gc.prototype, "pathLenConstraint", void 0);
f([
  y({ type: aa, implicit: !0, context: 0, optional: !0 })
], gc.prototype, "permittedAttrs", void 0);
f([
  y({ type: aa, implicit: !0, context: 1, optional: !0 })
], gc.prototype, "excludedAttrs", void 0);
f([
  y({ type: x.Boolean, defaultValue: !0 })
], gc.prototype, "permitUnSpecified", void 0);
class Ci {
  constructor(e = {}) {
    this.issuer = new lr(), this.serial = new ArrayBuffer(0), this.issuerUID = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: lr })
], Ci.prototype, "issuer", void 0);
f([
  y({ type: x.Integer, converter: _t })
], Ci.prototype, "serial", void 0);
f([
  y({ type: x.BitString, optional: !0 })
], Ci.prototype, "issuerUID", void 0);
var Ll;
(function(r) {
  r[r.publicKey = 0] = "publicKey", r[r.publicKeyCert = 1] = "publicKeyCert", r[r.otherObjectTypes = 2] = "otherObjectTypes";
})(Ll || (Ll = {}));
class Bi {
  constructor(e = {}) {
    this.digestedObjectType = Ll.publicKey, this.digestAlgorithm = new ne(), this.objectDigest = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.Enumerated })
], Bi.prototype, "digestedObjectType", void 0);
f([
  y({ type: x.ObjectIdentifier, optional: !0 })
], Bi.prototype, "otherObjectTypeID", void 0);
f([
  y({ type: ne })
], Bi.prototype, "digestAlgorithm", void 0);
f([
  y({ type: x.BitString })
], Bi.prototype, "objectDigest", void 0);
class vc {
  constructor(e = {}) {
    Object.assign(this, e);
  }
}
f([
  y({ type: lr, optional: !0 })
], vc.prototype, "issuerName", void 0);
f([
  y({ type: Ci, context: 0, implicit: !0, optional: !0 })
], vc.prototype, "baseCertificateID", void 0);
f([
  y({ type: Bi, context: 1, implicit: !0, optional: !0 })
], vc.prototype, "objectDigestInfo", void 0);
let Ki = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: Ve, repeated: "sequence" })
], Ki.prototype, "v1Form", void 0);
f([
  y({ type: vc, context: 0, implicit: !0 })
], Ki.prototype, "v2Form", void 0);
Ki = f([
  F({ type: M.Choice })
], Ki);
class mc {
  constructor(e = {}) {
    this.notBeforeTime = /* @__PURE__ */ new Date(), this.notAfterTime = /* @__PURE__ */ new Date(), Object.assign(this, e);
  }
}
f([
  y({ type: x.GeneralizedTime })
], mc.prototype, "notBeforeTime", void 0);
f([
  y({ type: x.GeneralizedTime })
], mc.prototype, "notAfterTime", void 0);
class bo {
  constructor(e = {}) {
    Object.assign(this, e);
  }
}
f([
  y({ type: Ci, implicit: !0, context: 0, optional: !0 })
], bo.prototype, "baseCertificateID", void 0);
f([
  y({ type: lr, implicit: !0, context: 1, optional: !0 })
], bo.prototype, "entityName", void 0);
f([
  y({ type: Bi, implicit: !0, context: 2, optional: !0 })
], bo.prototype, "objectDigestInfo", void 0);
var Hl;
(function(r) {
  r[r.v2 = 1] = "v2";
})(Hl || (Hl = {}));
class Wr {
  constructor(e = {}) {
    this.version = Hl.v2, this.holder = new bo(), this.issuer = new Ki(), this.signature = new ne(), this.serialNumber = new ArrayBuffer(0), this.attrCertValidityPeriod = new mc(), this.attributes = [], Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], Wr.prototype, "version", void 0);
f([
  y({ type: bo })
], Wr.prototype, "holder", void 0);
f([
  y({ type: Ki })
], Wr.prototype, "issuer", void 0);
f([
  y({ type: ne })
], Wr.prototype, "signature", void 0);
f([
  y({ type: x.Integer, converter: _t })
], Wr.prototype, "serialNumber", void 0);
f([
  y({ type: mc })
], Wr.prototype, "attrCertValidityPeriod", void 0);
f([
  y({ type: En, repeated: "sequence" })
], Wr.prototype, "attributes", void 0);
f([
  y({ type: x.BitString, optional: !0 })
], Wr.prototype, "issuerUniqueID", void 0);
f([
  y({ type: pi, optional: !0 })
], Wr.prototype, "extensions", void 0);
class wc {
  constructor(e = {}) {
    this.acinfo = new Wr(), this.signatureAlgorithm = new ne(), this.signatureValue = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: Wr })
], wc.prototype, "acinfo", void 0);
f([
  y({ type: ne })
], wc.prototype, "signatureAlgorithm", void 0);
f([
  y({ type: x.BitString })
], wc.prototype, "signatureValue", void 0);
var ca;
(function(r) {
  r[r.unmarked = 1] = "unmarked", r[r.unclassified = 2] = "unclassified", r[r.restricted = 4] = "restricted", r[r.confidential = 8] = "confidential", r[r.secret = 16] = "secret", r[r.topSecret = 32] = "topSecret";
})(ca || (ca = {}));
class Fl extends lc {
}
class cf {
  constructor(e = {}) {
    this.type = "", this.value = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier, implicit: !0, context: 0 })
], cf.prototype, "type", void 0);
f([
  y({ type: x.Any, implicit: !0, context: 1 })
], cf.prototype, "value", void 0);
class lf {
  constructor(e = {}) {
    this.policyId = "", this.classList = new Fl(ca.unclassified), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], lf.prototype, "policyId", void 0);
f([
  y({ type: Fl, defaultValue: new Fl(ca.unclassified) })
], lf.prototype, "classList", void 0);
f([
  y({ type: cf, repeated: "set" })
], lf.prototype, "securityCategories", void 0);
class bc {
  constructor(e = {}) {
    Object.assign(this, e);
  }
}
f([
  y({ type: ot })
], bc.prototype, "cotets", void 0);
f([
  y({ type: x.ObjectIdentifier })
], bc.prototype, "oid", void 0);
f([
  y({ type: x.Utf8String })
], bc.prototype, "string", void 0);
class zp {
  constructor(e = {}) {
    this.values = [], Object.assign(this, e);
  }
}
f([
  y({ type: lr, implicit: !0, context: 0, optional: !0 })
], zp.prototype, "policyAuthority", void 0);
f([
  y({ type: bc, repeated: "sequence" })
], zp.prototype, "values", void 0);
var Gl;
class xc {
  constructor(e = {}) {
    this.targetCertificate = new Ci(), Object.assign(this, e);
  }
}
f([
  y({ type: Ci })
], xc.prototype, "targetCertificate", void 0);
f([
  y({ type: Ve, optional: !0 })
], xc.prototype, "targetName", void 0);
f([
  y({ type: Bi, optional: !0 })
], xc.prototype, "certDigestInfo", void 0);
let qi = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: Ve, context: 0, implicit: !0 })
], qi.prototype, "targetName", void 0);
f([
  y({ type: Ve, context: 1, implicit: !0 })
], qi.prototype, "targetGroup", void 0);
f([
  y({ type: xc, context: 2, implicit: !0 })
], qi.prototype, "targetCert", void 0);
qi = f([
  F({ type: M.Choice })
], qi);
let zl = Gl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Gl.prototype);
  }
};
zl = Gl = f([
  F({ type: M.Sequence, itemType: qi })
], zl);
var Kl;
let oh = Kl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Kl.prototype);
  }
};
oh = Kl = f([
  F({ type: M.Sequence, itemType: zl })
], oh);
class Kp {
  constructor(e = {}) {
    Object.assign(this, e);
  }
}
f([
  y({ type: lr, implicit: !0, context: 0, optional: !0 })
], Kp.prototype, "roleAuthority", void 0);
f([
  y({ type: Ve, implicit: !0, context: 1 })
], Kp.prototype, "roleName", void 0);
class uf {
  constructor(e = {}) {
    this.service = new Ve(), this.ident = new Ve(), Object.assign(this, e);
  }
}
f([
  y({ type: Ve })
], uf.prototype, "service", void 0);
f([
  y({ type: Ve })
], uf.prototype, "ident", void 0);
f([
  y({ type: ot, optional: !0 })
], uf.prototype, "authInfo", void 0);
var ql;
class ff {
  constructor(e = {}) {
    this.otherCertFormat = "", this.otherCert = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], ff.prototype, "otherCertFormat", void 0);
f([
  y({ type: x.Any })
], ff.prototype, "otherCert", void 0);
let gi = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: yi })
], gi.prototype, "certificate", void 0);
f([
  y({ type: wc, context: 2, implicit: !0 })
], gi.prototype, "v2AttrCert", void 0);
f([
  y({ type: ff, context: 3, implicit: !0 })
], gi.prototype, "other", void 0);
gi = f([
  F({ type: M.Choice })
], gi);
let Hs = ql = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, ql.prototype);
  }
};
Hs = ql = f([
  F({ type: M.Set, itemType: gi })
], Hs);
class An {
  constructor(e = {}) {
    this.contentType = "", this.content = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], An.prototype, "contentType", void 0);
f([
  y({ type: x.Any, context: 0 })
], An.prototype, "content", void 0);
let Zi = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: ot })
], Zi.prototype, "single", void 0);
f([
  y({ type: x.Any })
], Zi.prototype, "any", void 0);
Zi = f([
  F({ type: M.Choice })
], Zi);
class Ac {
  constructor(e = {}) {
    this.eContentType = "", Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], Ac.prototype, "eContentType", void 0);
f([
  y({ type: Zi, context: 0, optional: !0 })
], Ac.prototype, "eContent", void 0);
let Fs = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: ot, context: 0, implicit: !0, optional: !0 })
], Fs.prototype, "value", void 0);
f([
  y({ type: ot, converter: Zg, context: 0, implicit: !0, optional: !0, repeated: "sequence" })
], Fs.prototype, "constructedValue", void 0);
Fs = f([
  F({ type: M.Choice })
], Fs);
class xo {
  constructor(e = {}) {
    this.contentType = "", this.contentEncryptionAlgorithm = new sa(), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], xo.prototype, "contentType", void 0);
f([
  y({ type: sa })
], xo.prototype, "contentEncryptionAlgorithm", void 0);
f([
  y({ type: Fs, optional: !0 })
], xo.prototype, "encryptedContent", void 0);
class Sc {
  constructor(e = {}) {
    this.keyAttrId = "", Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], Sc.prototype, "keyAttrId", void 0);
f([
  y({ type: x.Any, optional: !0 })
], Sc.prototype, "keyAttr", void 0);
var Zl;
class _c {
  constructor(e = {}) {
    this.subjectKeyIdentifier = new Fn(), Object.assign(this, e);
  }
}
f([
  y({ type: Fn })
], _c.prototype, "subjectKeyIdentifier", void 0);
f([
  y({ type: x.GeneralizedTime, optional: !0 })
], _c.prototype, "date", void 0);
f([
  y({ type: Sc, optional: !0 })
], _c.prototype, "other", void 0);
let Wi = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: _c, context: 0, implicit: !0, optional: !0 })
], Wi.prototype, "rKeyId", void 0);
f([
  y({ type: cs, optional: !0 })
], Wi.prototype, "issuerAndSerialNumber", void 0);
Wi = f([
  F({ type: M.Choice })
], Wi);
class hf {
  constructor(e = {}) {
    this.rid = new Wi(), this.encryptedKey = new ot(), Object.assign(this, e);
  }
}
f([
  y({ type: Wi })
], hf.prototype, "rid", void 0);
f([
  y({ type: ot })
], hf.prototype, "encryptedKey", void 0);
let la = Zl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Zl.prototype);
  }
};
la = Zl = f([
  F({ type: M.Sequence, itemType: hf })
], la);
class df {
  constructor(e = {}) {
    this.algorithm = new ne(), this.publicKey = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: ne })
], df.prototype, "algorithm", void 0);
f([
  y({ type: x.BitString })
], df.prototype, "publicKey", void 0);
let vi = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: Fn, context: 0, implicit: !0, optional: !0 })
], vi.prototype, "subjectKeyIdentifier", void 0);
f([
  y({ type: df, context: 1, implicit: !0, optional: !0 })
], vi.prototype, "originatorKey", void 0);
f([
  y({ type: cs, optional: !0 })
], vi.prototype, "issuerAndSerialNumber", void 0);
vi = f([
  F({ type: M.Choice })
], vi);
class us {
  constructor(e = {}) {
    this.version = ln.v3, this.originator = new vi(), this.keyEncryptionAlgorithm = new un(), this.recipientEncryptedKeys = new la(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], us.prototype, "version", void 0);
f([
  y({ type: vi, context: 0 })
], us.prototype, "originator", void 0);
f([
  y({ type: ot, context: 1, optional: !0 })
], us.prototype, "ukm", void 0);
f([
  y({ type: un })
], us.prototype, "keyEncryptionAlgorithm", void 0);
f([
  y({ type: la })
], us.prototype, "recipientEncryptedKeys", void 0);
let Yi = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: Fn, context: 0, implicit: !0 })
], Yi.prototype, "subjectKeyIdentifier", void 0);
f([
  y({ type: cs })
], Yi.prototype, "issuerAndSerialNumber", void 0);
Yi = f([
  F({ type: M.Choice })
], Yi);
class Ao {
  constructor(e = {}) {
    this.version = ln.v0, this.rid = new Yi(), this.keyEncryptionAlgorithm = new un(), this.encryptedKey = new ot(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], Ao.prototype, "version", void 0);
f([
  y({ type: Yi })
], Ao.prototype, "rid", void 0);
f([
  y({ type: un })
], Ao.prototype, "keyEncryptionAlgorithm", void 0);
f([
  y({ type: ot })
], Ao.prototype, "encryptedKey", void 0);
class So {
  constructor(e = {}) {
    this.keyIdentifier = new ot(), Object.assign(this, e);
  }
}
f([
  y({ type: ot })
], So.prototype, "keyIdentifier", void 0);
f([
  y({ type: x.GeneralizedTime, optional: !0 })
], So.prototype, "date", void 0);
f([
  y({ type: Sc, optional: !0 })
], So.prototype, "other", void 0);
class _o {
  constructor(e = {}) {
    this.version = ln.v4, this.kekid = new So(), this.keyEncryptionAlgorithm = new un(), this.encryptedKey = new ot(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], _o.prototype, "version", void 0);
f([
  y({ type: So })
], _o.prototype, "kekid", void 0);
f([
  y({ type: un })
], _o.prototype, "keyEncryptionAlgorithm", void 0);
f([
  y({ type: ot })
], _o.prototype, "encryptedKey", void 0);
class Eo {
  constructor(e = {}) {
    this.version = ln.v0, this.keyEncryptionAlgorithm = new un(), this.encryptedKey = new ot(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], Eo.prototype, "version", void 0);
f([
  y({ type: $l, context: 0, optional: !0 })
], Eo.prototype, "keyDerivationAlgorithm", void 0);
f([
  y({ type: un })
], Eo.prototype, "keyEncryptionAlgorithm", void 0);
f([
  y({ type: ot })
], Eo.prototype, "encryptedKey", void 0);
class pf {
  constructor(e = {}) {
    this.oriType = "", this.oriValue = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], pf.prototype, "oriType", void 0);
f([
  y({ type: x.Any })
], pf.prototype, "oriValue", void 0);
let zn = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: Ao, optional: !0 })
], zn.prototype, "ktri", void 0);
f([
  y({ type: us, context: 1, implicit: !0, optional: !0 })
], zn.prototype, "kari", void 0);
f([
  y({ type: _o, context: 2, implicit: !0, optional: !0 })
], zn.prototype, "kekri", void 0);
f([
  y({ type: Eo, context: 3, implicit: !0, optional: !0 })
], zn.prototype, "pwri", void 0);
f([
  y({ type: pf, context: 4, implicit: !0, optional: !0 })
], zn.prototype, "ori", void 0);
zn = f([
  F({ type: M.Choice })
], zn);
var Wl;
let ua = Wl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Wl.prototype);
  }
};
ua = Wl = f([
  F({ type: M.Set, itemType: zn })
], ua);
var Yl;
class Ec {
  constructor(e = {}) {
    this.otherRevInfoFormat = "", this.otherRevInfo = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], Ec.prototype, "otherRevInfoFormat", void 0);
f([
  y({ type: x.Any })
], Ec.prototype, "otherRevInfo", void 0);
let fa = class {
  constructor(e = {}) {
    this.other = new Ec(), Object.assign(this, e);
  }
};
f([
  y({ type: Ec, context: 1, implicit: !0 })
], fa.prototype, "other", void 0);
fa = f([
  F({ type: M.Choice })
], fa);
let ha = Yl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Yl.prototype);
  }
};
ha = Yl = f([
  F({ type: M.Set, itemType: fa })
], ha);
class yf {
  constructor(e = {}) {
    Object.assign(this, e);
  }
}
f([
  y({ type: Hs, context: 0, implicit: !0, optional: !0 })
], yf.prototype, "certs", void 0);
f([
  y({ type: ha, context: 1, implicit: !0, optional: !0 })
], yf.prototype, "crls", void 0);
var Jl;
let Xl = Jl = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Jl.prototype);
  }
};
Xl = Jl = f([
  F({ type: M.Set, itemType: ls })
], Xl);
class Io {
  constructor(e = {}) {
    this.version = ln.v0, this.recipientInfos = new ua(), this.encryptedContentInfo = new xo(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], Io.prototype, "version", void 0);
f([
  y({ type: yf, context: 0, implicit: !0, optional: !0 })
], Io.prototype, "originatorInfo", void 0);
f([
  y({ type: ua })
], Io.prototype, "recipientInfos", void 0);
f([
  y({ type: xo })
], Io.prototype, "encryptedContentInfo", void 0);
f([
  y({ type: Xl, context: 1, implicit: !0, optional: !0 })
], Io.prototype, "unprotectedAttrs", void 0);
const bv = "1.2.840.113549.1.7.1", Ql = "1.2.840.113549.1.7.2";
var eu;
let da = eu = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, eu.prototype);
  }
};
da = eu = f([
  F({ type: M.Set, itemType: Ls })
], da);
class Sn {
  constructor(e = {}) {
    this.version = ln.v0, this.digestAlgorithms = new da(), this.encapContentInfo = new Ac(), this.signerInfos = new oa(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], Sn.prototype, "version", void 0);
f([
  y({ type: da })
], Sn.prototype, "digestAlgorithms", void 0);
f([
  y({ type: Ac })
], Sn.prototype, "encapContentInfo", void 0);
f([
  y({ type: Hs, context: 0, implicit: !0, optional: !0 })
], Sn.prototype, "certificates", void 0);
f([
  y({ type: ha, context: 1, implicit: !0, optional: !0 })
], Sn.prototype, "crls", void 0);
f([
  y({ type: oa })
], Sn.prototype, "signerInfos", void 0);
const Gs = "1.2.840.10045.2.1", gf = "1.2.840.10045.4.1", qp = "1.2.840.10045.4.3.1", vf = "1.2.840.10045.4.3.2", mf = "1.2.840.10045.4.3.3", wf = "1.2.840.10045.4.3.4", ah = "1.2.840.10045.3.1.7", ch = "1.3.132.0.34", lh = "1.3.132.0.35";
function ko(r) {
  return new ne({ algorithm: r });
}
const xv = ko(gf);
ko(qp);
const Av = ko(vf), Sv = ko(mf), _v = ko(wf);
let zs = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: x.ObjectIdentifier })
], zs.prototype, "fieldType", void 0);
f([
  y({ type: x.Any })
], zs.prototype, "parameters", void 0);
zs = f([
  F({ type: M.Sequence })
], zs);
class Ev extends ot {
}
let Ji = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: x.OctetString })
], Ji.prototype, "a", void 0);
f([
  y({ type: x.OctetString })
], Ji.prototype, "b", void 0);
f([
  y({ type: x.BitString, optional: !0 })
], Ji.prototype, "seed", void 0);
Ji = f([
  F({ type: M.Sequence })
], Ji);
var tu;
(function(r) {
  r[r.ecpVer1 = 1] = "ecpVer1";
})(tu || (tu = {}));
let In = class {
  constructor(e = {}) {
    this.version = tu.ecpVer1, Object.assign(this, e);
  }
};
f([
  y({ type: x.Integer })
], In.prototype, "version", void 0);
f([
  y({ type: zs })
], In.prototype, "fieldID", void 0);
f([
  y({ type: Ji })
], In.prototype, "curve", void 0);
f([
  y({ type: Ev })
], In.prototype, "base", void 0);
f([
  y({ type: x.Integer, converter: _t })
], In.prototype, "order", void 0);
f([
  y({ type: x.Integer, optional: !0 })
], In.prototype, "cofactor", void 0);
In = f([
  F({ type: M.Sequence })
], In);
let Kn = class {
  constructor(e = {}) {
    Object.assign(this, e);
  }
};
f([
  y({ type: x.ObjectIdentifier })
], Kn.prototype, "namedCurve", void 0);
f([
  y({ type: x.Null })
], Kn.prototype, "implicitCurve", void 0);
f([
  y({ type: In })
], Kn.prototype, "specifiedCurve", void 0);
Kn = f([
  F({ type: M.Choice })
], Kn);
class Ic {
  constructor(e = {}) {
    this.version = 1, this.privateKey = new ot(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], Ic.prototype, "version", void 0);
f([
  y({ type: ot })
], Ic.prototype, "privateKey", void 0);
f([
  y({ type: Kn, context: 0, optional: !0 })
], Ic.prototype, "parameters", void 0);
f([
  y({ type: x.BitString, context: 1, optional: !0 })
], Ic.prototype, "publicKey", void 0);
class pa {
  constructor(e = {}) {
    this.r = new ArrayBuffer(0), this.s = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer, converter: _t })
], pa.prototype, "r", void 0);
f([
  y({ type: x.Integer, converter: _t })
], pa.prototype, "s", void 0);
const br = "1.2.840.113549.1.1", mi = `${br}.1`, Iv = `${br}.7`, kv = `${br}.9`, Rs = `${br}.10`, Cv = `${br}.2`, Bv = `${br}.4`, ya = `${br}.5`, Ov = `${br}.14`, ru = `${br}.11`, ga = `${br}.12`, va = `${br}.13`, Zp = `${br}.15`, Wp = `${br}.16`, ma = "1.3.14.3.2.26", Yp = "2.16.840.1.101.3.4.2.4", wa = "2.16.840.1.101.3.4.2.1", ba = "2.16.840.1.101.3.4.2.2", xa = "2.16.840.1.101.3.4.2.3", Tv = "2.16.840.1.101.3.4.2.5", Nv = "2.16.840.1.101.3.4.2.6", Pv = "1.2.840.113549.2.2", jv = "1.2.840.113549.2.5", kc = `${br}.8`;
function Gt(r) {
  return new ne({ algorithm: r, parameters: null });
}
Gt(Pv);
Gt(jv);
const wi = Gt(ma);
Gt(Yp);
Gt(wa);
Gt(ba);
Gt(xa);
Gt(Tv);
Gt(Nv);
const Jp = new ne({
  algorithm: kc,
  parameters: q.serialize(wi)
}), Xp = new ne({
  algorithm: kv,
  parameters: q.serialize(Yo.toASN(new Uint8Array([218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]).buffer))
});
Gt(mi);
Gt(Cv);
Gt(Bv);
Gt(ya);
Gt(Zp);
Gt(Wp);
Gt(ga);
Gt(va);
Gt(Zp);
Gt(Wp);
class Cc {
  constructor(e = {}) {
    this.hashAlgorithm = new ne(wi), this.maskGenAlgorithm = new ne({
      algorithm: kc,
      parameters: q.serialize(wi)
    }), this.pSourceAlgorithm = new ne(Xp), Object.assign(this, e);
  }
}
f([
  y({ type: ne, context: 0, defaultValue: wi })
], Cc.prototype, "hashAlgorithm", void 0);
f([
  y({ type: ne, context: 1, defaultValue: Jp })
], Cc.prototype, "maskGenAlgorithm", void 0);
f([
  y({ type: ne, context: 2, defaultValue: Xp })
], Cc.prototype, "pSourceAlgorithm", void 0);
new ne({
  algorithm: Iv,
  parameters: q.serialize(new Cc())
});
class bi {
  constructor(e = {}) {
    this.hashAlgorithm = new ne(wi), this.maskGenAlgorithm = new ne({
      algorithm: kc,
      parameters: q.serialize(wi)
    }), this.saltLength = 20, this.trailerField = 1, Object.assign(this, e);
  }
}
f([
  y({ type: ne, context: 0, defaultValue: wi })
], bi.prototype, "hashAlgorithm", void 0);
f([
  y({ type: ne, context: 1, defaultValue: Jp })
], bi.prototype, "maskGenAlgorithm", void 0);
f([
  y({ type: x.Integer, context: 2, defaultValue: 20 })
], bi.prototype, "saltLength", void 0);
f([
  y({ type: x.Integer, context: 3, defaultValue: 1 })
], bi.prototype, "trailerField", void 0);
new ne({
  algorithm: Rs,
  parameters: q.serialize(new bi())
});
class Bc {
  constructor(e = {}) {
    this.digestAlgorithm = new ne(), this.digest = new ot(), Object.assign(this, e);
  }
}
f([
  y({ type: ne })
], Bc.prototype, "digestAlgorithm", void 0);
f([
  y({ type: ot })
], Bc.prototype, "digest", void 0);
var nu;
class Oc {
  constructor(e = {}) {
    this.prime = new ArrayBuffer(0), this.exponent = new ArrayBuffer(0), this.coefficient = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer, converter: _t })
], Oc.prototype, "prime", void 0);
f([
  y({ type: x.Integer, converter: _t })
], Oc.prototype, "exponent", void 0);
f([
  y({ type: x.Integer, converter: _t })
], Oc.prototype, "coefficient", void 0);
let iu = nu = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, nu.prototype);
  }
};
iu = nu = f([
  F({ type: M.Sequence, itemType: Oc })
], iu);
class yn {
  constructor(e = {}) {
    this.version = 0, this.modulus = new ArrayBuffer(0), this.publicExponent = new ArrayBuffer(0), this.privateExponent = new ArrayBuffer(0), this.prime1 = new ArrayBuffer(0), this.prime2 = new ArrayBuffer(0), this.exponent1 = new ArrayBuffer(0), this.exponent2 = new ArrayBuffer(0), this.coefficient = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], yn.prototype, "version", void 0);
f([
  y({ type: x.Integer, converter: _t })
], yn.prototype, "modulus", void 0);
f([
  y({ type: x.Integer, converter: _t })
], yn.prototype, "publicExponent", void 0);
f([
  y({ type: x.Integer, converter: _t })
], yn.prototype, "privateExponent", void 0);
f([
  y({ type: x.Integer, converter: _t })
], yn.prototype, "prime1", void 0);
f([
  y({ type: x.Integer, converter: _t })
], yn.prototype, "prime2", void 0);
f([
  y({ type: x.Integer, converter: _t })
], yn.prototype, "exponent1", void 0);
f([
  y({ type: x.Integer, converter: _t })
], yn.prototype, "exponent2", void 0);
f([
  y({ type: x.Integer, converter: _t })
], yn.prototype, "coefficient", void 0);
f([
  y({ type: iu, optional: !0 })
], yn.prototype, "otherPrimeInfos", void 0);
class bf {
  constructor(e = {}) {
    this.modulus = new ArrayBuffer(0), this.publicExponent = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer, converter: _t })
], bf.prototype, "modulus", void 0);
f([
  y({ type: x.Integer, converter: _t })
], bf.prototype, "publicExponent", void 0);
var su;
(function(r) {
  r[r.Transient = 0] = "Transient", r[r.Singleton = 1] = "Singleton", r[r.ResolutionScoped = 2] = "ResolutionScoped", r[r.ContainerScoped = 3] = "ContainerScoped";
})(su || (su = {}));
const pr = su;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ou = function(r, e) {
  return ou = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, n) {
    t.__proto__ = n;
  } || function(t, n) {
    for (var i in n) n.hasOwnProperty(i) && (t[i] = n[i]);
  }, ou(r, e);
};
function xf(r, e) {
  ou(r, e);
  function t() {
    this.constructor = r;
  }
  r.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function Rv(r, e, t, n) {
  function i(s) {
    return s instanceof t ? s : new t(function(o) {
      o(s);
    });
  }
  return new (t || (t = Promise))(function(s, o) {
    function c(v) {
      try {
        h(n.next(v));
      } catch (b) {
        o(b);
      }
    }
    function u(v) {
      try {
        h(n.throw(v));
      } catch (b) {
        o(b);
      }
    }
    function h(v) {
      v.done ? s(v.value) : i(v.value).then(c, u);
    }
    h((n = n.apply(r, [])).next());
  });
}
function Uv(r, e) {
  var t = { label: 0, sent: function() {
    if (s[0] & 1) throw s[1];
    return s[1];
  }, trys: [], ops: [] }, n, i, s, o;
  return o = { next: c(0), throw: c(1), return: c(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function c(h) {
    return function(v) {
      return u([h, v]);
    };
  }
  function u(h) {
    if (n) throw new TypeError("Generator is already executing.");
    for (; t; ) try {
      if (n = 1, i && (s = h[0] & 2 ? i.return : h[0] ? i.throw || ((s = i.return) && s.call(i), 0) : i.next) && !(s = s.call(i, h[1])).done) return s;
      switch (i = 0, s && (h = [h[0] & 2, s.value]), h[0]) {
        case 0:
        case 1:
          s = h;
          break;
        case 4:
          return t.label++, { value: h[1], done: !1 };
        case 5:
          t.label++, i = h[1], h = [0];
          continue;
        case 7:
          h = t.ops.pop(), t.trys.pop();
          continue;
        default:
          if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (h[0] === 6 || h[0] === 2)) {
            t = 0;
            continue;
          }
          if (h[0] === 3 && (!s || h[1] > s[0] && h[1] < s[3])) {
            t.label = h[1];
            break;
          }
          if (h[0] === 6 && t.label < s[1]) {
            t.label = s[1], s = h;
            break;
          }
          if (s && t.label < s[2]) {
            t.label = s[2], t.ops.push(h);
            break;
          }
          s[2] && t.ops.pop(), t.trys.pop();
          continue;
      }
      h = e.call(r, t);
    } catch (v) {
      h = [6, v], i = 0;
    } finally {
      n = s = 0;
    }
    if (h[0] & 5) throw h[1];
    return { value: h[0] ? h[1] : void 0, done: !0 };
  }
}
function Ro(r) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && r[e], n = 0;
  if (t) return t.call(r);
  if (r && typeof r.length == "number") return {
    next: function() {
      return r && n >= r.length && (r = void 0), { value: r && r[n++], done: !r };
    }
  };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Aa(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t) return r;
  var n = t.call(r), i, s = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = n.next()).done; ) s.push(i.value);
  } catch (c) {
    o = { error: c };
  } finally {
    try {
      i && !i.done && (t = n.return) && t.call(n);
    } finally {
      if (o) throw o.error;
    }
  }
  return s;
}
function ni() {
  for (var r = [], e = 0; e < arguments.length; e++)
    r = r.concat(Aa(arguments[e]));
  return r;
}
var Dv = "injectionTokens";
function $v(r) {
  var e = Reflect.getMetadata("design:paramtypes", r) || [], t = Reflect.getOwnMetadata(Dv, r) || {};
  return Object.keys(t).forEach(function(n) {
    e[+n] = t[n];
  }), e;
}
function Qp(r) {
  return !!r.useClass;
}
function au(r) {
  return !!r.useFactory;
}
var e0 = function() {
  function r(e) {
    this.wrap = e, this.reflectMethods = [
      "get",
      "getPrototypeOf",
      "setPrototypeOf",
      "getOwnPropertyDescriptor",
      "defineProperty",
      "has",
      "set",
      "deleteProperty",
      "apply",
      "construct",
      "ownKeys"
    ];
  }
  return r.prototype.createProxy = function(e) {
    var t = this, n = {}, i = !1, s, o = function() {
      return i || (s = e(t.wrap()), i = !0), s;
    };
    return new Proxy(n, this.createHandler(o));
  }, r.prototype.createHandler = function(e) {
    var t = {}, n = function(i) {
      t[i] = function() {
        for (var s = [], o = 0; o < arguments.length; o++)
          s[o] = arguments[o];
        s[0] = e();
        var c = Reflect[i];
        return c.apply(void 0, ni(s));
      };
    };
    return this.reflectMethods.forEach(n), t;
  }, r;
}();
function ji(r) {
  return typeof r == "string" || typeof r == "symbol";
}
function Mv(r) {
  return typeof r == "object" && "token" in r && "multiple" in r;
}
function uh(r) {
  return typeof r == "object" && "token" in r && "transform" in r;
}
function Vv(r) {
  return typeof r == "function" || r instanceof e0;
}
function Ho(r) {
  return !!r.useToken;
}
function Fo(r) {
  return r.useValue != null;
}
function Lv(r) {
  return Qp(r) || Fo(r) || Ho(r) || au(r);
}
var Af = function() {
  function r() {
    this._registryMap = /* @__PURE__ */ new Map();
  }
  return r.prototype.entries = function() {
    return this._registryMap.entries();
  }, r.prototype.getAll = function(e) {
    return this.ensure(e), this._registryMap.get(e);
  }, r.prototype.get = function(e) {
    this.ensure(e);
    var t = this._registryMap.get(e);
    return t[t.length - 1] || null;
  }, r.prototype.set = function(e, t) {
    this.ensure(e), this._registryMap.get(e).push(t);
  }, r.prototype.setAll = function(e, t) {
    this._registryMap.set(e, t);
  }, r.prototype.has = function(e) {
    return this.ensure(e), this._registryMap.get(e).length > 0;
  }, r.prototype.clear = function() {
    this._registryMap.clear();
  }, r.prototype.ensure = function(e) {
    this._registryMap.has(e) || this._registryMap.set(e, []);
  }, r;
}(), Hv = function(r) {
  xf(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(Af), fh = /* @__PURE__ */ function() {
  function r() {
    this.scopedResolutions = /* @__PURE__ */ new Map();
  }
  return r;
}();
function Fv(r, e) {
  if (r === null)
    return "at position #" + e;
  var t = r.split(",")[e].trim();
  return '"' + t + '" at position #' + e;
}
function Gv(r, e, t) {
  return t === void 0 && (t = "    "), ni([r], e.message.split(`
`).map(function(n) {
    return t + n;
  })).join(`
`);
}
function zv(r, e, t) {
  var n = Aa(r.toString().match(/constructor\(([\w, ]+)\)/) || [], 2), i = n[1], s = i === void 0 ? null : i, o = Fv(s, e);
  return Gv("Cannot inject the dependency " + o + ' of "' + r.name + '" constructor. Reason:', t);
}
function Kv(r) {
  if (typeof r.dispose != "function")
    return !1;
  var e = r.dispose;
  return !(e.length > 0);
}
var qv = function(r) {
  xf(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(Af), Zv = function(r) {
  xf(e, r);
  function e() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return e;
}(Af), Wv = /* @__PURE__ */ function() {
  function r() {
    this.preResolution = new qv(), this.postResolution = new Zv();
  }
  return r;
}(), t0 = /* @__PURE__ */ new Map(), Yv = function() {
  function r(e) {
    this.parent = e, this._registry = new Hv(), this.interceptors = new Wv(), this.disposed = !1, this.disposables = /* @__PURE__ */ new Set();
  }
  return r.prototype.register = function(e, t, n) {
    n === void 0 && (n = { lifecycle: pr.Transient }), this.ensureNotDisposed();
    var i;
    if (Lv(t) ? i = t : i = { useClass: t }, Ho(i))
      for (var s = [e], o = i; o != null; ) {
        var c = o.useToken;
        if (s.includes(c))
          throw new Error("Token registration cycle detected! " + ni(s, [c]).join(" -> "));
        s.push(c);
        var u = this._registry.get(c);
        u && Ho(u.provider) ? o = u.provider : o = null;
      }
    if ((n.lifecycle === pr.Singleton || n.lifecycle == pr.ContainerScoped || n.lifecycle == pr.ResolutionScoped) && (Fo(i) || au(i)))
      throw new Error('Cannot use lifecycle "' + pr[n.lifecycle] + '" with ValueProviders or FactoryProviders');
    return this._registry.set(e, { provider: i, options: n }), this;
  }, r.prototype.registerType = function(e, t) {
    return this.ensureNotDisposed(), ji(t) ? this.register(e, {
      useToken: t
    }) : this.register(e, {
      useClass: t
    });
  }, r.prototype.registerInstance = function(e, t) {
    return this.ensureNotDisposed(), this.register(e, {
      useValue: t
    });
  }, r.prototype.registerSingleton = function(e, t) {
    if (this.ensureNotDisposed(), ji(e)) {
      if (ji(t))
        return this.register(e, {
          useToken: t
        }, { lifecycle: pr.Singleton });
      if (t)
        return this.register(e, {
          useClass: t
        }, { lifecycle: pr.Singleton });
      throw new Error('Cannot register a type name as a singleton without a "to" token');
    }
    var n = e;
    return t && !ji(t) && (n = t), this.register(e, {
      useClass: n
    }, { lifecycle: pr.Singleton });
  }, r.prototype.resolve = function(e, t) {
    t === void 0 && (t = new fh()), this.ensureNotDisposed();
    var n = this.getRegistration(e);
    if (!n && ji(e))
      throw new Error('Attempted to resolve unregistered dependency token: "' + e.toString() + '"');
    if (this.executePreResolutionInterceptor(e, "Single"), n) {
      var i = this.resolveRegistration(n, t);
      return this.executePostResolutionInterceptor(e, i, "Single"), i;
    }
    if (Vv(e)) {
      var i = this.construct(e, t);
      return this.executePostResolutionInterceptor(e, i, "Single"), i;
    }
    throw new Error("Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.");
  }, r.prototype.executePreResolutionInterceptor = function(e, t) {
    var n, i;
    if (this.interceptors.preResolution.has(e)) {
      var s = [];
      try {
        for (var o = Ro(this.interceptors.preResolution.getAll(e)), c = o.next(); !c.done; c = o.next()) {
          var u = c.value;
          u.options.frequency != "Once" && s.push(u), u.callback(e, t);
        }
      } catch (h) {
        n = { error: h };
      } finally {
        try {
          c && !c.done && (i = o.return) && i.call(o);
        } finally {
          if (n) throw n.error;
        }
      }
      this.interceptors.preResolution.setAll(e, s);
    }
  }, r.prototype.executePostResolutionInterceptor = function(e, t, n) {
    var i, s;
    if (this.interceptors.postResolution.has(e)) {
      var o = [];
      try {
        for (var c = Ro(this.interceptors.postResolution.getAll(e)), u = c.next(); !u.done; u = c.next()) {
          var h = u.value;
          h.options.frequency != "Once" && o.push(h), h.callback(e, t, n);
        }
      } catch (v) {
        i = { error: v };
      } finally {
        try {
          u && !u.done && (s = c.return) && s.call(c);
        } finally {
          if (i) throw i.error;
        }
      }
      this.interceptors.postResolution.setAll(e, o);
    }
  }, r.prototype.resolveRegistration = function(e, t) {
    if (this.ensureNotDisposed(), e.options.lifecycle === pr.ResolutionScoped && t.scopedResolutions.has(e))
      return t.scopedResolutions.get(e);
    var n = e.options.lifecycle === pr.Singleton, i = e.options.lifecycle === pr.ContainerScoped, s = n || i, o;
    return Fo(e.provider) ? o = e.provider.useValue : Ho(e.provider) ? o = s ? e.instance || (e.instance = this.resolve(e.provider.useToken, t)) : this.resolve(e.provider.useToken, t) : Qp(e.provider) ? o = s ? e.instance || (e.instance = this.construct(e.provider.useClass, t)) : this.construct(e.provider.useClass, t) : au(e.provider) ? o = e.provider.useFactory(this) : o = this.construct(e.provider, t), e.options.lifecycle === pr.ResolutionScoped && t.scopedResolutions.set(e, o), o;
  }, r.prototype.resolveAll = function(e, t) {
    var n = this;
    t === void 0 && (t = new fh()), this.ensureNotDisposed();
    var i = this.getAllRegistrations(e);
    if (!i && ji(e))
      throw new Error('Attempted to resolve unregistered dependency token: "' + e.toString() + '"');
    if (this.executePreResolutionInterceptor(e, "All"), i) {
      var s = i.map(function(c) {
        return n.resolveRegistration(c, t);
      });
      return this.executePostResolutionInterceptor(e, s, "All"), s;
    }
    var o = [this.construct(e, t)];
    return this.executePostResolutionInterceptor(e, o, "All"), o;
  }, r.prototype.isRegistered = function(e, t) {
    return t === void 0 && (t = !1), this.ensureNotDisposed(), this._registry.has(e) || t && (this.parent || !1) && this.parent.isRegistered(e, !0);
  }, r.prototype.reset = function() {
    this.ensureNotDisposed(), this._registry.clear(), this.interceptors.preResolution.clear(), this.interceptors.postResolution.clear();
  }, r.prototype.clearInstances = function() {
    var e, t;
    this.ensureNotDisposed();
    try {
      for (var n = Ro(this._registry.entries()), i = n.next(); !i.done; i = n.next()) {
        var s = Aa(i.value, 2), o = s[0], c = s[1];
        this._registry.setAll(o, c.filter(function(u) {
          return !Fo(u.provider);
        }).map(function(u) {
          return u.instance = void 0, u;
        }));
      }
    } catch (u) {
      e = { error: u };
    } finally {
      try {
        i && !i.done && (t = n.return) && t.call(n);
      } finally {
        if (e) throw e.error;
      }
    }
  }, r.prototype.createChildContainer = function() {
    var e, t;
    this.ensureNotDisposed();
    var n = new r(this);
    try {
      for (var i = Ro(this._registry.entries()), s = i.next(); !s.done; s = i.next()) {
        var o = Aa(s.value, 2), c = o[0], u = o[1];
        u.some(function(h) {
          var v = h.options;
          return v.lifecycle === pr.ContainerScoped;
        }) && n._registry.setAll(c, u.map(function(h) {
          return h.options.lifecycle === pr.ContainerScoped ? {
            provider: h.provider,
            options: h.options
          } : h;
        }));
      }
    } catch (h) {
      e = { error: h };
    } finally {
      try {
        s && !s.done && (t = i.return) && t.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return n;
  }, r.prototype.beforeResolution = function(e, t, n) {
    n === void 0 && (n = { frequency: "Always" }), this.interceptors.preResolution.set(e, {
      callback: t,
      options: n
    });
  }, r.prototype.afterResolution = function(e, t, n) {
    n === void 0 && (n = { frequency: "Always" }), this.interceptors.postResolution.set(e, {
      callback: t,
      options: n
    });
  }, r.prototype.dispose = function() {
    return Rv(this, void 0, void 0, function() {
      var e;
      return Uv(this, function(t) {
        switch (t.label) {
          case 0:
            return this.disposed = !0, e = [], this.disposables.forEach(function(n) {
              var i = n.dispose();
              i && e.push(i);
            }), [4, Promise.all(e)];
          case 1:
            return t.sent(), [2];
        }
      });
    });
  }, r.prototype.getRegistration = function(e) {
    return this.isRegistered(e) ? this._registry.get(e) : this.parent ? this.parent.getRegistration(e) : null;
  }, r.prototype.getAllRegistrations = function(e) {
    return this.isRegistered(e) ? this._registry.getAll(e) : this.parent ? this.parent.getAllRegistrations(e) : null;
  }, r.prototype.construct = function(e, t) {
    var n = this;
    if (e instanceof e0)
      return e.createProxy(function(s) {
        return n.resolve(s, t);
      });
    var i = function() {
      var s = t0.get(e);
      if (!s || s.length === 0) {
        if (e.length === 0)
          return new e();
        throw new Error('TypeInfo not known for "' + e.name + '"');
      }
      var o = s.map(n.resolveParams(t, e));
      return new (e.bind.apply(e, ni([void 0], o)))();
    }();
    return Kv(i) && this.disposables.add(i), i;
  }, r.prototype.resolveParams = function(e, t) {
    var n = this;
    return function(i, s) {
      var o, c, u;
      try {
        return Mv(i) ? uh(i) ? i.multiple ? (o = n.resolve(i.transform)).transform.apply(o, ni([n.resolveAll(i.token)], i.transformArgs)) : (c = n.resolve(i.transform)).transform.apply(c, ni([n.resolve(i.token, e)], i.transformArgs)) : i.multiple ? n.resolveAll(i.token) : n.resolve(i.token, e) : uh(i) ? (u = n.resolve(i.transform, e)).transform.apply(u, ni([n.resolve(i.token, e)], i.transformArgs)) : n.resolve(i, e);
      } catch (h) {
        throw new Error(zv(t, s, h));
      }
    };
  }, r.prototype.ensureNotDisposed = function() {
    if (this.disposed)
      throw new Error("This container has been disposed, you cannot interact with a disposed container");
  }, r;
}(), ur = new Yv();
function Tc() {
  return function(r) {
    t0.set(r, $v(r));
  };
}
if (typeof Reflect > "u" || !Reflect.getMetadata)
  throw new Error(`tsyringe requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`);
var cu;
class Nc {
  constructor(e = {}) {
    this.attrId = "", this.attrValues = [], Object.assign(e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], Nc.prototype, "attrId", void 0);
f([
  y({ type: x.Any, repeated: "set" })
], Nc.prototype, "attrValues", void 0);
let hh = cu = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, cu.prototype);
  }
};
hh = cu = f([
  F({ type: M.Sequence, itemType: Nc })
], hh);
var lu;
let dh = lu = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, lu.prototype);
  }
};
dh = lu = f([
  F({ type: M.Sequence, itemType: An })
], dh);
class r0 {
  constructor(e = {}) {
    this.certId = "", this.certValue = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], r0.prototype, "certId", void 0);
f([
  y({ type: x.Any, context: 0 })
], r0.prototype, "certValue", void 0);
class n0 {
  constructor(e = {}) {
    this.crlId = "", this.crltValue = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], n0.prototype, "crlId", void 0);
f([
  y({ type: x.Any, context: 0 })
], n0.prototype, "crltValue", void 0);
class i0 extends ot {
}
let Pc = class {
  constructor(e = {}) {
    this.encryptionAlgorithm = new ne(), this.encryptedData = new i0(), Object.assign(this, e);
  }
};
f([
  y({ type: ne })
], Pc.prototype, "encryptionAlgorithm", void 0);
f([
  y({ type: i0 })
], Pc.prototype, "encryptedData", void 0);
var uu, fu;
(function(r) {
  r[r.v1 = 0] = "v1";
})(fu || (fu = {}));
class s0 extends ot {
}
let hu = uu = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, uu.prototype);
  }
};
hu = uu = f([
  F({ type: M.Sequence, itemType: En })
], hu);
class Co {
  constructor(e = {}) {
    this.version = fu.v1, this.privateKeyAlgorithm = new ne(), this.privateKey = new s0(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], Co.prototype, "version", void 0);
f([
  y({ type: ne })
], Co.prototype, "privateKeyAlgorithm", void 0);
f([
  y({ type: s0 })
], Co.prototype, "privateKey", void 0);
f([
  y({ type: hu, implicit: !0, context: 0, optional: !0 })
], Co.prototype, "attributes", void 0);
let ph = class extends Co {
};
ph = f([
  F({ type: M.Sequence })
], ph);
let yh = class extends Pc {
};
yh = f([
  F({ type: M.Sequence })
], yh);
class o0 {
  constructor(e = {}) {
    this.secretTypeId = "", this.secretValue = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], o0.prototype, "secretTypeId", void 0);
f([
  y({ type: x.Any, context: 0 })
], o0.prototype, "secretValue", void 0);
class Bo {
  constructor(e = {}) {
    this.mac = new Bc(), this.macSalt = new ot(), this.iterations = 1, Object.assign(this, e);
  }
}
f([
  y({ type: Bc })
], Bo.prototype, "mac", void 0);
f([
  y({ type: ot })
], Bo.prototype, "macSalt", void 0);
f([
  y({ type: x.Integer, defaultValue: 1 })
], Bo.prototype, "iterations", void 0);
class jc {
  constructor(e = {}) {
    this.version = 3, this.authSafe = new An(), this.macData = new Bo(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], jc.prototype, "version", void 0);
f([
  y({ type: An })
], jc.prototype, "authSafe", void 0);
f([
  y({ type: Bo, optional: !0 })
], jc.prototype, "macData", void 0);
var du;
class Rc {
  constructor(e = {}) {
    this.bagId = "", this.bagValue = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: x.ObjectIdentifier })
], Rc.prototype, "bagId", void 0);
f([
  y({ type: x.Any, context: 0 })
], Rc.prototype, "bagValue", void 0);
f([
  y({ type: Nc, repeated: "set", optional: !0 })
], Rc.prototype, "bagAttributes", void 0);
let gh = du = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, du.prototype);
  }
};
gh = du = f([
  F({ type: M.Sequence, itemType: Rc })
], gh);
var pu, yu, gu;
const a0 = "1.2.840.113549.1.9", c0 = `${a0}.7`, Sf = `${a0}.14`;
let Sa = class extends Qt {
  constructor(e = {}) {
    super(e);
  }
  toString() {
    return this.ia5String || super.toString();
  }
};
f([
  y({ type: x.IA5String })
], Sa.prototype, "ia5String", void 0);
Sa = f([
  F({ type: M.Choice })
], Sa);
let vh = class extends An {
};
vh = f([
  F({ type: M.Sequence })
], vh);
let mh = class extends jc {
};
mh = f([
  F({ type: M.Sequence })
], mh);
let wh = class extends Pc {
};
wh = f([
  F({ type: M.Sequence })
], wh);
let vu = class {
  constructor(e = "") {
    this.value = e;
  }
  toString() {
    return this.value;
  }
};
f([
  y({ type: x.IA5String })
], vu.prototype, "value", void 0);
vu = f([
  F({ type: M.Choice })
], vu);
let bh = class extends Sa {
};
bh = f([
  F({ type: M.Choice })
], bh);
let xh = class extends Qt {
};
xh = f([
  F({ type: M.Choice })
], xh);
let mu = class {
  constructor(e = /* @__PURE__ */ new Date()) {
    this.value = e;
  }
};
f([
  y({ type: x.GeneralizedTime })
], mu.prototype, "value", void 0);
mu = f([
  F({ type: M.Choice })
], mu);
let Ah = class extends Qt {
};
Ah = f([
  F({ type: M.Choice })
], Ah);
let wu = class {
  constructor(e = "M") {
    this.value = e;
  }
  toString() {
    return this.value;
  }
};
f([
  y({ type: x.PrintableString })
], wu.prototype, "value", void 0);
wu = f([
  F({ type: M.Choice })
], wu);
let _a = class {
  constructor(e = "") {
    this.value = e;
  }
  toString() {
    return this.value;
  }
};
f([
  y({ type: x.PrintableString })
], _a.prototype, "value", void 0);
_a = f([
  F({ type: M.Choice })
], _a);
let Sh = class extends _a {
};
Sh = f([
  F({ type: M.Choice })
], Sh);
let _h = class extends Qt {
};
_h = f([
  F({ type: M.Choice })
], _h);
let bu = class {
  constructor(e = "") {
    this.value = e;
  }
  toString() {
    return this.value;
  }
};
f([
  y({ type: x.ObjectIdentifier })
], bu.prototype, "value", void 0);
bu = f([
  F({ type: M.Choice })
], bu);
let Eh = class extends Jt {
};
Eh = f([
  F({ type: M.Choice })
], Eh);
let xu = class {
  constructor(e = 0) {
    this.value = e;
  }
  toString() {
    return this.value.toString();
  }
};
f([
  y({ type: x.Integer })
], xu.prototype, "value", void 0);
xu = f([
  F({ type: M.Choice })
], xu);
let Ih = class extends pn {
};
Ih = f([
  F({ type: M.Sequence })
], Ih);
let Ea = class extends Qt {
};
Ea = f([
  F({ type: M.Choice })
], Ea);
let kh = pu = class extends pi {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, pu.prototype);
  }
};
kh = pu = f([
  F({ type: M.Sequence })
], kh);
let Ch = yu = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, yu.prototype);
  }
};
Ch = yu = f([
  F({ type: M.Set, itemType: ls })
], Ch);
let Au = class {
  constructor(e = "") {
    this.value = e;
  }
  toString() {
    return this.value;
  }
};
f([
  y({ type: x.BmpString })
], Au.prototype, "value", void 0);
Au = f([
  F({ type: M.Choice })
], Au);
let Su = class extends ne {
};
Su = f([
  F({ type: M.Sequence })
], Su);
let Bh = gu = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, gu.prototype);
  }
};
Bh = gu = f([
  F({ type: M.Sequence, itemType: Su })
], Bh);
var _u;
let Ia = _u = class extends mt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, _u.prototype);
  }
};
Ia = _u = f([
  F({ type: M.Sequence, itemType: En })
], Ia);
class fs {
  constructor(e = {}) {
    this.version = 0, this.subject = new Ft(), this.subjectPKInfo = new sn(), this.attributes = new Ia(), Object.assign(this, e);
  }
}
f([
  y({ type: x.Integer })
], fs.prototype, "version", void 0);
f([
  y({ type: Ft })
], fs.prototype, "subject", void 0);
f([
  y({ type: sn })
], fs.prototype, "subjectPKInfo", void 0);
f([
  y({ type: Ia, implicit: !0, context: 0 })
], fs.prototype, "attributes", void 0);
class Ks {
  constructor(e = {}) {
    this.certificationRequestInfo = new fs(), this.signatureAlgorithm = new ne(), this.signature = new ArrayBuffer(0), Object.assign(this, e);
  }
}
f([
  y({ type: fs })
], Ks.prototype, "certificationRequestInfo", void 0);
f([
  y({ type: ne })
], Ks.prototype, "signatureAlgorithm", void 0);
f([
  y({ type: x.BitString })
], Ks.prototype, "signature", void 0);
/*!
 * MIT License
 * 
 * Copyright (c) Peculiar Ventures. All rights reserved.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
const Oo = "crypto.algorithm";
class Jv {
  getAlgorithms() {
    return ur.resolveAll(Oo);
  }
  toAsnAlgorithm(e) {
    ({ ...e });
    for (const t of this.getAlgorithms()) {
      const n = t.toAsnAlgorithm(e);
      if (n)
        return n;
    }
    if (/^[0-9.]+$/.test(e.name)) {
      const t = new ne({
        algorithm: e.name
      });
      if ("parameters" in e) {
        const n = e;
        t.parameters = n.parameters;
      }
      return t;
    }
    throw new Error("Cannot convert WebCrypto algorithm to ASN.1 algorithm");
  }
  toWebAlgorithm(e) {
    for (const n of this.getAlgorithms()) {
      const i = n.toWebAlgorithm(e);
      if (i)
        return i;
    }
    return {
      name: e.algorithm,
      parameters: e.parameters
    };
  }
}
const Xi = "crypto.algorithmProvider";
ur.registerSingleton(Xi, Jv);
var Go;
const xr = "1.3.36.3.3.2.8.1.1", Oh = `${xr}.1`, Th = `${xr}.2`, Nh = `${xr}.3`, Ph = `${xr}.4`, jh = `${xr}.5`, Rh = `${xr}.6`, Uh = `${xr}.7`, Dh = `${xr}.8`, $h = `${xr}.9`, Mh = `${xr}.10`, Vh = `${xr}.11`, Lh = `${xr}.12`, Hh = `${xr}.13`, Fh = `${xr}.14`, Gh = "brainpoolP160r1", zh = "brainpoolP160t1", Kh = "brainpoolP192r1", qh = "brainpoolP192t1", Zh = "brainpoolP224r1", Wh = "brainpoolP224t1", Yh = "brainpoolP256r1", Jh = "brainpoolP256t1", Xh = "brainpoolP320r1", Qh = "brainpoolP320t1", ed = "brainpoolP384r1", td = "brainpoolP384t1", rd = "brainpoolP512r1", nd = "brainpoolP512t1", Bt = "ECDSA";
let qs = Go = class {
  toAsnAlgorithm(e) {
    switch (e.name.toLowerCase()) {
      case Bt.toLowerCase():
        if ("hash" in e)
          switch ((typeof e.hash == "string" ? e.hash : e.hash.name).toLowerCase()) {
            case "sha-1":
              return xv;
            case "sha-256":
              return Av;
            case "sha-384":
              return Sv;
            case "sha-512":
              return _v;
          }
        else if ("namedCurve" in e) {
          let t = "";
          switch (e.namedCurve) {
            case "P-256":
              t = ah;
              break;
            case "K-256":
              t = Go.SECP256K1;
              break;
            case "P-384":
              t = ch;
              break;
            case "P-521":
              t = lh;
              break;
            case Gh:
              t = Oh;
              break;
            case zh:
              t = Th;
              break;
            case Kh:
              t = Nh;
              break;
            case qh:
              t = Ph;
              break;
            case Zh:
              t = jh;
              break;
            case Wh:
              t = Rh;
              break;
            case Yh:
              t = Uh;
              break;
            case Jh:
              t = Dh;
              break;
            case Xh:
              t = $h;
              break;
            case Qh:
              t = Mh;
              break;
            case ed:
              t = Vh;
              break;
            case td:
              t = Lh;
              break;
            case rd:
              t = Hh;
              break;
            case nd:
              t = Fh;
              break;
          }
          if (t)
            return new ne({
              algorithm: Gs,
              parameters: q.serialize(new Kn({ namedCurve: t }))
            });
        }
    }
    return null;
  }
  toWebAlgorithm(e) {
    switch (e.algorithm) {
      case gf:
        return { name: Bt, hash: { name: "SHA-1" } };
      case vf:
        return { name: Bt, hash: { name: "SHA-256" } };
      case mf:
        return { name: Bt, hash: { name: "SHA-384" } };
      case wf:
        return { name: Bt, hash: { name: "SHA-512" } };
      case Gs: {
        if (!e.parameters)
          throw new TypeError("Cannot get required parameters from EC algorithm");
        switch (q.parse(e.parameters, Kn).namedCurve) {
          case ah:
            return { name: Bt, namedCurve: "P-256" };
          case Go.SECP256K1:
            return { name: Bt, namedCurve: "K-256" };
          case ch:
            return { name: Bt, namedCurve: "P-384" };
          case lh:
            return { name: Bt, namedCurve: "P-521" };
          case Oh:
            return { name: Bt, namedCurve: Gh };
          case Th:
            return { name: Bt, namedCurve: zh };
          case Nh:
            return { name: Bt, namedCurve: Kh };
          case Ph:
            return { name: Bt, namedCurve: qh };
          case jh:
            return { name: Bt, namedCurve: Zh };
          case Rh:
            return { name: Bt, namedCurve: Wh };
          case Uh:
            return { name: Bt, namedCurve: Yh };
          case Dh:
            return { name: Bt, namedCurve: Jh };
          case $h:
            return { name: Bt, namedCurve: Xh };
          case Mh:
            return { name: Bt, namedCurve: Qh };
          case Vh:
            return { name: Bt, namedCurve: ed };
          case Lh:
            return { name: Bt, namedCurve: td };
          case Hh:
            return { name: Bt, namedCurve: rd };
          case Fh:
            return { name: Bt, namedCurve: nd };
        }
      }
    }
    return null;
  }
};
qs.SECP256K1 = "1.3.132.0.10";
qs = Go = f([
  Tc()
], qs);
ur.registerSingleton(Oo, qs);
const l0 = Symbol("name"), u0 = Symbol("value");
class st {
  constructor(e, t = {}, n = "") {
    this[l0] = e, this[u0] = n;
    for (const i in t)
      this[i] = t[i];
  }
}
st.NAME = l0;
st.VALUE = u0;
class Xv {
  static toTextObject(e) {
    const t = new st("Algorithm Identifier", {}, Tn.toString(e.algorithm));
    if (e.parameters)
      switch (e.algorithm) {
        case Gs: {
          const n = new qs().toWebAlgorithm(e);
          n && "namedCurve" in n ? t["Named Curve"] = n.namedCurve : t.Parameters = e.parameters;
          break;
        }
        default:
          t.Parameters = e.parameters;
      }
    return t;
  }
}
class Tn {
  static toString(e) {
    const t = this.items[e];
    return t || e;
  }
}
Tn.items = {
  [ma]: "sha1",
  [Yp]: "sha224",
  [wa]: "sha256",
  [ba]: "sha384",
  [xa]: "sha512",
  [mi]: "rsaEncryption",
  [ya]: "sha1WithRSAEncryption",
  [Ov]: "sha224WithRSAEncryption",
  [ru]: "sha256WithRSAEncryption",
  [ga]: "sha384WithRSAEncryption",
  [va]: "sha512WithRSAEncryption",
  [Gs]: "ecPublicKey",
  [gf]: "ecdsaWithSHA1",
  [qp]: "ecdsaWithSHA224",
  [vf]: "ecdsaWithSHA256",
  [mf]: "ecdsaWithSHA384",
  [wf]: "ecdsaWithSHA512",
  [pv]: "TLS WWW server authentication",
  [yv]: "TLS WWW client authentication",
  [gv]: "Code Signing",
  [vv]: "E-mail Protection",
  [mv]: "Time Stamping",
  [wv]: "OCSP Signing",
  [Ql]: "Signed Data"
};
class qn {
  static serialize(e) {
    return this.serializeObj(e).join(`
`);
  }
  static pad(e = 0) {
    return "".padStart(2 * e, " ");
  }
  static serializeObj(e, t = 0) {
    const n = [];
    let i = this.pad(t++), s = "";
    const o = e[st.VALUE];
    o && (s = ` ${o}`), n.push(`${i}${e[st.NAME]}:${s}`), i = this.pad(t);
    for (const c in e) {
      if (typeof c == "symbol")
        continue;
      const u = e[c], h = c ? `${c}: ` : "";
      if (typeof u == "string" || typeof u == "number" || typeof u == "boolean")
        n.push(`${i}${h}${u}`);
      else if (u instanceof Date)
        n.push(`${i}${h}${u.toUTCString()}`);
      else if (Array.isArray(u))
        for (const v of u)
          v[st.NAME] = c, n.push(...this.serializeObj(v, t));
      else if (u instanceof st)
        u[st.NAME] = c, n.push(...this.serializeObj(u, t));
      else if (W.isBufferSource(u))
        c ? (n.push(`${i}${h}`), n.push(...this.serializeBufferSource(u, t + 1))) : n.push(...this.serializeBufferSource(u, t));
      else if ("toTextObject" in u) {
        const v = u.toTextObject();
        v[st.NAME] = c, n.push(...this.serializeObj(v, t));
      } else
        throw new TypeError("Cannot serialize data in text format. Unsupported type.");
    }
    return n;
  }
  static serializeBufferSource(e, t = 0) {
    const n = this.pad(t), i = W.toUint8Array(e), s = [];
    for (let o = 0; o < i.length; ) {
      const c = [];
      for (let u = 0; u < 16 && o < i.length; u++) {
        u === 8 && c.push("");
        const h = i[o++].toString(16).padStart(2, "0");
        c.push(h);
      }
      s.push(`${n}${c.join(" ")}`);
    }
    return s;
  }
  static serializeAlgorithm(e) {
    return this.algorithmSerializer.toTextObject(e);
  }
}
qn.oidSerializer = Tn;
qn.algorithmSerializer = Xv;
class Qn {
  constructor(...e) {
    if (e.length === 1) {
      const t = e[0];
      this.rawData = q.serialize(t), this.onInit(t);
    } else {
      const t = q.parse(e[0], e[1]);
      this.rawData = W.toArrayBuffer(e[0]), this.onInit(t);
    }
  }
  equal(e) {
    return e instanceof Qn ? qo(e.rawData, this.rawData) : !1;
  }
  toString(e = "text") {
    switch (e) {
      case "asn":
        return q.toString(this.rawData);
      case "text":
        return qn.serialize(this.toTextObject());
      case "hex":
        return le.ToHex(this.rawData);
      case "base64":
        return le.ToBase64(this.rawData);
      case "base64url":
        return le.ToBase64Url(this.rawData);
      default:
        throw TypeError("Argument 'format' is unsupported value");
    }
  }
  getTextName() {
    return this.constructor.NAME;
  }
  toTextObject() {
    const e = this.toTextObjectEmpty();
    return e[""] = this.rawData, e;
  }
  toTextObjectEmpty(e) {
    return new st(this.getTextName(), {}, e);
  }
}
Qn.NAME = "ASN";
class Rr extends Qn {
  constructor(...e) {
    let t;
    W.isBufferSource(e[0]) ? t = W.toArrayBuffer(e[0]) : t = q.serialize(new Gr({
      extnID: e[0],
      critical: e[1],
      extnValue: new ot(W.toArrayBuffer(e[2]))
    })), super(t, Gr);
  }
  onInit(e) {
    this.type = e.extnID, this.critical = e.critical, this.value = e.extnValue.buffer;
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue();
    return e[""] = this.value, e;
  }
  toTextObjectWithoutValue() {
    const e = this.toTextObjectEmpty(this.critical ? "critical" : void 0);
    return e[st.NAME] === Rr.NAME && (e[st.NAME] = Tn.toString(this.type)), e;
  }
}
var f0;
class Mn {
  static isCryptoKeyPair(e) {
    return e && e.privateKey && e.publicKey;
  }
  static isCryptoKey(e) {
    return e && e.usages && e.type && e.algorithm && e.extractable !== void 0;
  }
  constructor() {
    this.items = /* @__PURE__ */ new Map(), this[f0] = "CryptoProvider", typeof self < "u" && typeof crypto < "u" ? this.set(Mn.DEFAULT, crypto) : typeof global < "u" && global.crypto && global.crypto.subtle && this.set(Mn.DEFAULT, global.crypto);
  }
  clear() {
    this.items.clear();
  }
  delete(e) {
    return this.items.delete(e);
  }
  forEach(e, t) {
    return this.items.forEach(e, t);
  }
  has(e) {
    return this.items.has(e);
  }
  get size() {
    return this.items.size;
  }
  entries() {
    return this.items.entries();
  }
  keys() {
    return this.items.keys();
  }
  values() {
    return this.items.values();
  }
  [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }
  get(e = Mn.DEFAULT) {
    const t = this.items.get(e.toLowerCase());
    if (!t)
      throw new Error(`Cannot get Crypto by name '${e}'`);
    return t;
  }
  set(e, t) {
    if (typeof e == "string") {
      if (!t)
        throw new TypeError("Argument 'value' is required");
      this.items.set(e.toLowerCase(), t);
    } else
      this.items.set(Mn.DEFAULT, e);
    return this;
  }
}
f0 = Symbol.toStringTag;
Mn.DEFAULT = "default";
const Wt = new Mn(), Qv = /^[0-2](?:\.[1-9][0-9]*)+$/;
function em(r) {
  return new RegExp(Qv).test(r);
}
class h0 {
  constructor(e = {}) {
    this.items = {};
    for (const t in e)
      this.register(t, e[t]);
  }
  get(e) {
    return this.items[e] || null;
  }
  findId(e) {
    return em(e) ? e : this.get(e);
  }
  register(e, t) {
    this.items[e] = t, this.items[t] = e;
  }
}
const wr = new h0();
wr.register("CN", "2.5.4.3");
wr.register("L", "2.5.4.7");
wr.register("ST", "2.5.4.8");
wr.register("O", "2.5.4.10");
wr.register("OU", "2.5.4.11");
wr.register("C", "2.5.4.6");
wr.register("DC", "0.9.2342.19200300.100.1.25");
wr.register("E", "1.2.840.113549.1.9.1");
wr.register("G", "2.5.4.42");
wr.register("I", "2.5.4.43");
wr.register("SN", "2.5.4.4");
wr.register("T", "2.5.4.12");
function tm(r, e) {
  return `\\${le.ToHex(le.FromUtf8String(e)).toUpperCase()}`;
}
function rm(r) {
  return r.replace(/([,+"\\<>;])/g, "\\$1").replace(/^([ #])/, "\\$1").replace(/([ ]$)/, "\\$1").replace(/([\r\n\t])/, tm);
}
class Gn {
  static isASCII(e) {
    for (let t = 0; t < e.length; t++)
      if (e.charCodeAt(t) > 255)
        return !1;
    return !0;
  }
  static isPrintableString(e) {
    return /^[A-Za-z0-9 '()+,-./:=?]*$/g.test(e);
  }
  constructor(e, t = {}) {
    this.extraNames = new h0(), this.asn = new Ft();
    for (const n in t)
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        const i = t[n];
        this.extraNames.register(n, i);
      }
    typeof e == "string" ? this.asn = this.fromString(e) : e instanceof Ft ? this.asn = e : W.isBufferSource(e) ? this.asn = q.parse(e, Ft) : this.asn = this.fromJSON(e);
  }
  getField(e) {
    const t = this.extraNames.findId(e) || wr.findId(e), n = [];
    for (const i of this.asn)
      for (const s of i)
        s.type === t && n.push(s.value.toString());
    return n;
  }
  getName(e) {
    return this.extraNames.get(e) || wr.get(e);
  }
  toString() {
    return this.asn.map((e) => e.map((t) => {
      const n = this.getName(t.type) || t.type, i = t.value.anyValue ? `#${le.ToHex(t.value.anyValue)}` : rm(t.value.toString());
      return `${n}=${i}`;
    }).join("+")).join(", ");
  }
  toJSON() {
    var e;
    const t = [];
    for (const n of this.asn) {
      const i = {};
      for (const s of n) {
        const o = this.getName(s.type) || s.type;
        (e = i[o]) !== null && e !== void 0 || (i[o] = []), i[o].push(s.value.anyValue ? `#${le.ToHex(s.value.anyValue)}` : s.value.toString());
      }
      t.push(i);
    }
    return t;
  }
  fromString(e) {
    const t = new Ft(), n = /(\d\.[\d.]*\d|[A-Za-z]+)=((?:"")|(?:".*?[^\\]")|(?:[^,+].*?(?:[^\\][,+]))|(?:))([,+])?/g;
    let i = null, s = ",";
    for (; i = n.exec(`${e},`); ) {
      let [, o, c] = i;
      const u = c[c.length - 1];
      (u === "," || u === "+") && (c = c.slice(0, c.length - 1), i[3] = u);
      const h = i[3];
      o = this.getTypeOid(o);
      const v = this.createAttribute(o, c);
      s === "+" ? t[t.length - 1].push(v) : t.push(new Fi([v])), s = h;
    }
    return t;
  }
  fromJSON(e) {
    const t = new Ft();
    for (const n of e) {
      const i = new Fi();
      for (const s in n) {
        const o = this.getTypeOid(s), c = n[s];
        for (const u of c) {
          const h = this.createAttribute(o, u);
          i.push(h);
        }
      }
      t.push(i);
    }
    return t;
  }
  getTypeOid(e) {
    if (/[\d.]+/.test(e) || (e = this.getName(e) || ""), !e)
      throw new Error(`Cannot get OID for name type '${e}'`);
    return e;
  }
  createAttribute(e, t) {
    const n = new uc({ type: e });
    if (typeof t == "object")
      for (const i in t)
        switch (i) {
          case "ia5String":
            n.value.ia5String = t[i];
            break;
          case "utf8String":
            n.value.utf8String = t[i];
            break;
          case "universalString":
            n.value.universalString = t[i];
            break;
          case "bmpString":
            n.value.bmpString = t[i];
            break;
          case "printableString":
            n.value.printableString = t[i];
            break;
        }
    else if (t[0] === "#")
      n.value.anyValue = le.FromHex(t.slice(1));
    else {
      const i = this.processStringValue(t);
      e === this.getName("E") || e === this.getName("DC") ? n.value.ia5String = i : Gn.isPrintableString(i) ? n.value.printableString = i : n.value.utf8String = i;
    }
    return n;
  }
  processStringValue(e) {
    const t = /"(.*?[^\\])?"/.exec(e);
    return t && (e = t[1]), e.replace(/\\0a/ig, `
`).replace(/\\0d/ig, "\r").replace(/\\0g/ig, "	").replace(/\\(.)/g, "$1");
  }
  toArrayBuffer() {
    return q.serialize(this.asn);
  }
  async getThumbprint(...e) {
    var t;
    let n, i = "SHA-1";
    return e.length >= 1 && !(!((t = e[0]) === null || t === void 0) && t.subtle) ? (i = e[0] || i, n = e[1] || Wt.get()) : n = e[0] || Wt.get(), await n.subtle.digest(i, this.toArrayBuffer());
  }
}
const d0 = "Cannot initialize GeneralName from ASN.1 data.", id = `${d0} Unsupported string format in use.`, nm = `${d0} Value doesn't match to GUID regular expression.`, sd = /^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i, od = "1.3.6.1.4.1.311.25.1", ad = "1.3.6.1.4.1.311.20.2.3", Zc = "dns", Wc = "dn", Yc = "email", Jc = "ip", Xc = "url", Qc = "guid", el = "upn", Uo = "id";
class Vn extends Qn {
  constructor(...e) {
    let t;
    if (e.length === 2)
      switch (e[0]) {
        case Wc: {
          const n = new Gn(e[1]).toArrayBuffer(), i = q.parse(n, Ft);
          t = new Ve({ directoryName: i });
          break;
        }
        case Zc:
          t = new Ve({ dNSName: e[1] });
          break;
        case Yc:
          t = new Ve({ rfc822Name: e[1] });
          break;
        case Qc: {
          const n = new RegExp(sd, "i").exec(e[1]);
          if (!n)
            throw new Error("Cannot parse GUID value. Value doesn't match to regular expression");
          const i = n.slice(1).map((s, o) => o < 3 ? le.ToHex(new Uint8Array(le.FromHex(s)).reverse()) : s).join("");
          t = new Ve({
            otherName: new Vs({
              typeId: od,
              value: q.serialize(new ot(le.FromHex(i)))
            })
          });
          break;
        }
        case Jc:
          t = new Ve({ iPAddress: e[1] });
          break;
        case Uo:
          t = new Ve({ registeredID: e[1] });
          break;
        case el: {
          t = new Ve({
            otherName: new Vs({
              typeId: ad,
              value: q.serialize(Tp.toASN(e[1]))
            })
          });
          break;
        }
        case Xc:
          t = new Ve({ uniformResourceIdentifier: e[1] });
          break;
        default:
          throw new Error("Cannot create GeneralName. Unsupported type of the name");
      }
    else W.isBufferSource(e[0]) ? t = q.parse(e[0], Ve) : t = e[0];
    super(t);
  }
  onInit(e) {
    if (e.dNSName != null)
      this.type = Zc, this.value = e.dNSName;
    else if (e.rfc822Name != null)
      this.type = Yc, this.value = e.rfc822Name;
    else if (e.iPAddress != null)
      this.type = Jc, this.value = e.iPAddress;
    else if (e.uniformResourceIdentifier != null)
      this.type = Xc, this.value = e.uniformResourceIdentifier;
    else if (e.registeredID != null)
      this.type = Uo, this.value = e.registeredID;
    else if (e.directoryName != null)
      this.type = Wc, this.value = new Gn(e.directoryName).toString();
    else if (e.otherName != null)
      if (e.otherName.typeId === od) {
        this.type = Qc;
        const t = q.parse(e.otherName.value, ot), n = new RegExp(sd, "i").exec(le.ToHex(t));
        if (!n)
          throw new Error(nm);
        this.value = n.slice(1).map((i, s) => s < 3 ? le.ToHex(new Uint8Array(le.FromHex(i)).reverse()) : i).join("-");
      } else if (e.otherName.typeId === ad)
        this.type = el, this.value = q.parse(e.otherName.value, Qt).toString();
      else
        throw new Error(id);
    else
      throw new Error(id);
  }
  toJSON() {
    return {
      type: this.type,
      value: this.value
    };
  }
  toTextObject() {
    let e;
    switch (this.type) {
      case Wc:
      case Zc:
      case Qc:
      case Jc:
      case Uo:
      case el:
      case Xc:
        e = this.type.toUpperCase();
        break;
      case Yc:
        e = "Email";
        break;
      default:
        throw new Error("Unsupported GeneralName type");
    }
    let t = this.value;
    return this.type === Uo && (t = Tn.toString(t)), new st(e, void 0, t);
  }
}
class Zs extends Qn {
  constructor(e) {
    let t;
    if (e instanceof lr)
      t = e;
    else if (Array.isArray(e)) {
      const n = [];
      for (const i of e)
        if (i instanceof Ve)
          n.push(i);
        else {
          const s = q.parse(new Vn(i.type, i.value).rawData, Ve);
          n.push(s);
        }
      t = new lr(n);
    } else if (W.isBufferSource(e))
      t = q.parse(e, lr);
    else
      throw new Error("Cannot initialize GeneralNames. Incorrect incoming arguments");
    super(t);
  }
  onInit(e) {
    const t = [];
    for (const n of e) {
      let i = null;
      try {
        i = new Vn(n);
      } catch {
        continue;
      }
      t.push(i);
    }
    this.items = t;
  }
  toJSON() {
    return this.items.map((e) => e.toJSON());
  }
  toTextObject() {
    const e = super.toTextObjectEmpty();
    for (const t of this.items) {
      const n = t.toTextObject();
      let i = e[n[st.NAME]];
      Array.isArray(i) || (i = [], e[n[st.NAME]] = i), i.push(n);
    }
    return e;
  }
}
Zs.NAME = "GeneralNames";
const Us = "-{5}", Ws = "\\n", im = `[^${Ws}]+`, sm = `${Us}BEGIN (${im}(?=${Us}))${Us}`, om = `${Us}END \\1${Us}`, Qi = "\\n", am = `[^:${Ws}]+`, cm = `(?:[^${Ws}]+${Qi}(?: +[^${Ws}]+${Qi})*)`, lm = "[a-zA-Z0-9=+/]+", um = `(?:${lm}${Qi})+`, cd = `${sm}${Qi}(?:((?:${am}: ${cm})+))?${Qi}?(${um})${om}`;
class vr {
  static isPem(e) {
    return typeof e == "string" && new RegExp(cd, "g").test(e);
  }
  static decodeWithHeaders(e) {
    e = e.replace(/\r/g, "");
    const t = new RegExp(cd, "g"), n = [];
    let i = null;
    for (; i = t.exec(e); ) {
      const s = i[3].replace(new RegExp(`[${Ws}]+`, "g"), ""), o = {
        type: i[1],
        headers: [],
        rawData: le.FromBase64(s)
      }, c = i[2];
      if (c) {
        const u = c.split(new RegExp(Qi, "g"));
        let h = null;
        for (const v of u) {
          const [b, H] = v.split(/:(.*)/);
          if (H === void 0) {
            if (!h)
              throw new Error("Cannot parse PEM string. Incorrect header value");
            h.value += b.trim();
          } else
            h && o.headers.push(h), h = { key: b, value: H.trim() };
        }
        h && o.headers.push(h);
      }
      n.push(o);
    }
    return n;
  }
  static decode(e) {
    return this.decodeWithHeaders(e).map((n) => n.rawData);
  }
  static decodeFirst(e) {
    const t = this.decode(e);
    if (!t.length)
      throw new RangeError("PEM string doesn't contain any objects");
    return t[0];
  }
  static encode(e, t) {
    if (Array.isArray(e)) {
      const n = new Array();
      return t ? e.forEach((i) => {
        if (!W.isBufferSource(i))
          throw new TypeError("Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource");
        n.push(this.encodeStruct({
          type: t,
          rawData: W.toArrayBuffer(i)
        }));
      }) : e.forEach((i) => {
        if (!("type" in i))
          throw new TypeError("Cannot encode array of PemStruct in PEM format. Not all items of the array are PemStrut");
        n.push(this.encodeStruct(i));
      }), n.join(`
`);
    } else {
      if (!t)
        throw new Error("Required argument 'tag' is missed");
      return this.encodeStruct({
        type: t,
        rawData: W.toArrayBuffer(e)
      });
    }
  }
  static encodeStruct(e) {
    var t;
    const n = e.type.toLocaleUpperCase(), i = [];
    if (i.push(`-----BEGIN ${n}-----`), !((t = e.headers) === null || t === void 0) && t.length) {
      for (const h of e.headers)
        i.push(`${h.key}: ${h.value}`);
      i.push("");
    }
    const s = le.ToBase64(e.rawData);
    let o, c = 0;
    const u = Array();
    for (; c < s.length && (s.length - c < 64 ? o = s.substring(c) : (o = s.substring(c, c + 64), c += 64), o.length !== 0); )
      if (u.push(o), o.length < 64)
        break;
    return i.push(...u), i.push(`-----END ${n}-----`), i.join(`
`);
  }
}
vr.CertificateTag = "CERTIFICATE";
vr.CrlTag = "CRL";
vr.CertificateRequestTag = "CERTIFICATE REQUEST";
vr.PublicKeyTag = "PUBLIC KEY";
vr.PrivateKeyTag = "PRIVATE KEY";
class zr extends Qn {
  static isAsnEncoded(e) {
    return W.isBufferSource(e) || typeof e == "string";
  }
  static toArrayBuffer(e) {
    if (typeof e == "string") {
      if (vr.isPem(e))
        return vr.decode(e)[0];
      if (le.isHex(e))
        return le.FromHex(e);
      if (le.isBase64(e))
        return le.FromBase64(e);
      if (le.isBase64Url(e))
        return le.FromBase64Url(e);
      throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url");
    } else {
      const t = le.ToBinary(e);
      return vr.isPem(t) ? vr.decode(t)[0] : le.isHex(t) ? le.FromHex(t) : le.isBase64(t) ? le.FromBase64(t) : le.isBase64Url(t) ? le.FromBase64Url(t) : W.toArrayBuffer(e);
    }
  }
  constructor(...e) {
    zr.isAsnEncoded(e[0]) ? super(zr.toArrayBuffer(e[0]), e[1]) : super(e[0]);
  }
  toString(e = "pem") {
    switch (e) {
      case "pem":
        return vr.encode(this.rawData, this.tag);
      default:
        return super.toString(e);
    }
  }
}
class an extends zr {
  static async create(e, t = Wt.get()) {
    if (e instanceof an)
      return e;
    if (Mn.isCryptoKey(e)) {
      if (e.type !== "public")
        throw new TypeError("Public key is required");
      const n = await t.subtle.exportKey("spki", e);
      return new an(n);
    } else {
      if (e.publicKey)
        return e.publicKey;
      if (W.isBufferSource(e))
        return new an(e);
      throw new TypeError("Unsupported PublicKeyType");
    }
  }
  constructor(e) {
    zr.isAsnEncoded(e) ? super(e, sn) : super(e), this.tag = vr.PublicKeyTag;
  }
  async export(...e) {
    let t, n = ["verify"], i = { hash: "SHA-256", ...this.algorithm };
    e.length > 1 ? (i = e[0] || i, n = e[1] || n, t = e[2] || Wt.get()) : t = e[0] || Wt.get();
    let s = this.rawData;
    const o = q.parse(this.rawData, sn);
    return o.algorithm.algorithm === Rs && (s = fm(o, s)), t.subtle.importKey("spki", s, i, !0, n);
  }
  onInit(e) {
    const t = ur.resolve(Xi), n = this.algorithm = t.toWebAlgorithm(e.algorithm);
    switch (e.algorithm.algorithm) {
      case mi: {
        const i = q.parse(e.subjectPublicKey, bf), s = W.toUint8Array(i.modulus);
        n.publicExponent = W.toUint8Array(i.publicExponent), n.modulusLength = (s[0] ? s : s.slice(1)).byteLength << 3;
        break;
      }
    }
  }
  async getThumbprint(...e) {
    var t;
    let n, i = "SHA-1";
    return e.length >= 1 && !(!((t = e[0]) === null || t === void 0) && t.subtle) ? (i = e[0] || i, n = e[1] || Wt.get()) : n = e[0] || Wt.get(), await n.subtle.digest(i, this.rawData);
  }
  async getKeyIdentifier(...e) {
    let t, n = "SHA-1";
    e.length === 1 ? typeof e[0] == "string" ? (n = e[0], t = Wt.get()) : t = e[0] : e.length === 2 ? (n = e[0], t = e[1]) : t = Wt.get();
    const i = q.parse(this.rawData, sn);
    return await t.subtle.digest(n, i.subjectPublicKey);
  }
  toTextObject() {
    const e = this.toTextObjectEmpty(), t = q.parse(this.rawData, sn);
    switch (e.Algorithm = qn.serializeAlgorithm(t.algorithm), t.algorithm.algorithm) {
      case Gs:
        e["EC Point"] = t.subjectPublicKey;
        break;
      case mi:
      default:
        e["Raw Data"] = t.subjectPublicKey;
    }
    return e;
  }
}
function fm(r, e) {
  return r.algorithm = new ne({
    algorithm: mi,
    parameters: null
  }), e = q.serialize(r), e;
}
class Ys extends Rr {
  static async create(e, t = !1, n = Wt.get()) {
    if ("name" in e && "serialNumber" in e)
      return new Ys(e, t);
    const s = await (await an.create(e, n)).getKeyIdentifier(n);
    return new Ys(le.ToHex(s), t);
  }
  constructor(...e) {
    if (W.isBufferSource(e[0]))
      super(e[0]);
    else if (typeof e[0] == "string") {
      const t = new si({ keyIdentifier: new Xu(le.FromHex(e[0])) });
      super(Jo, e[1], q.serialize(t));
    } else {
      const t = e[0], n = t.name instanceof Zs ? q.parse(t.name.rawData, lr) : t.name, i = new si({
        authorityCertIssuer: n,
        authorityCertSerialNumber: le.FromHex(t.serialNumber)
      });
      super(Jo, e[1], q.serialize(i));
    }
  }
  onInit(e) {
    super.onInit(e);
    const t = q.parse(e.extnValue, si);
    t.keyIdentifier && (this.keyId = le.ToHex(t.keyIdentifier)), (t.authorityCertIssuer || t.authorityCertSerialNumber) && (this.certId = {
      name: t.authorityCertIssuer || [],
      serialNumber: t.authorityCertSerialNumber ? le.ToHex(t.authorityCertSerialNumber) : ""
    });
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue(), t = q.parse(this.value, si);
    return t.authorityCertIssuer && (e["Authority Issuer"] = new Zs(t.authorityCertIssuer).toTextObject()), t.authorityCertSerialNumber && (e["Authority Serial Number"] = t.authorityCertSerialNumber), t.keyIdentifier && (e[""] = t.keyIdentifier), e;
  }
}
Ys.NAME = "Authority Key Identifier";
class p0 extends Rr {
  constructor(...e) {
    if (W.isBufferSource(e[0])) {
      super(e[0]);
      const t = q.parse(this.value, Xo);
      this.ca = t.cA, this.pathLength = t.pathLenConstraint;
    } else {
      const t = new Xo({
        cA: e[0],
        pathLenConstraint: e[1]
      });
      super(jp, e[2], q.serialize(t)), this.ca = e[0], this.pathLength = e[1];
    }
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue();
    return this.ca && (e.CA = this.ca), this.pathLength !== void 0 && (e["Path Length"] = this.pathLength), e;
  }
}
p0.NAME = "Basic Constraints";
var ld;
(function(r) {
  r.serverAuth = "1.3.6.1.5.5.7.3.1", r.clientAuth = "1.3.6.1.5.5.7.3.2", r.codeSigning = "1.3.6.1.5.5.7.3.3", r.emailProtection = "1.3.6.1.5.5.7.3.4", r.timeStamping = "1.3.6.1.5.5.7.3.8", r.ocspSigning = "1.3.6.1.5.5.7.3.9";
})(ld || (ld = {}));
class y0 extends Rr {
  constructor(...e) {
    if (W.isBufferSource(e[0])) {
      super(e[0]);
      const t = q.parse(this.value, ra);
      this.usages = t.map((n) => n);
    } else {
      const t = new ra(e[0]);
      super(Dp, e[1], q.serialize(t)), this.usages = e[0];
    }
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue();
    return e[""] = this.usages.map((t) => Tn.toString(t)).join(", "), e;
  }
}
y0.NAME = "Extended Key Usages";
var ud;
(function(r) {
  r[r.digitalSignature = 1] = "digitalSignature", r[r.nonRepudiation = 2] = "nonRepudiation", r[r.keyEncipherment = 4] = "keyEncipherment", r[r.dataEncipherment = 8] = "dataEncipherment", r[r.keyAgreement = 16] = "keyAgreement", r[r.keyCertSign = 32] = "keyCertSign", r[r.cRLSign = 64] = "cRLSign", r[r.encipherOnly = 128] = "encipherOnly", r[r.decipherOnly = 256] = "decipherOnly";
})(ud || (ud = {}));
class g0 extends Rr {
  constructor(...e) {
    if (W.isBufferSource(e[0])) {
      super(e[0]);
      const t = q.parse(this.value, qc);
      this.usages = t.toNumber();
    } else {
      const t = new qc(e[0]);
      super($p, e[1], q.serialize(t)), this.usages = e[0];
    }
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue(), t = q.parse(this.value, qc);
    return e[""] = t.toJSON().join(", "), e;
  }
}
g0.NAME = "Key Usages";
class Uc extends Rr {
  static async create(e, t = !1, n = Wt.get()) {
    const s = await (await an.create(e, n)).getKeyIdentifier(n);
    return new Uc(le.ToHex(s), t);
  }
  constructor(...e) {
    if (W.isBufferSource(e[0])) {
      super(e[0]);
      const t = q.parse(this.value, Fn);
      this.keyId = le.ToHex(t);
    } else {
      const t = typeof e[0] == "string" ? le.FromHex(e[0]) : e[0], n = new Fn(t);
      super(sf, e[1], q.serialize(n)), this.keyId = le.ToHex(t);
    }
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue(), t = q.parse(this.value, Fn);
    return e[""] = t, e;
  }
}
Uc.NAME = "Subject Key Identifier";
class v0 extends Rr {
  constructor(...e) {
    W.isBufferSource(e[0]) ? super(e[0]) : super(nf, e[1], new Zs(e[0] || []).rawData);
  }
  onInit(e) {
    super.onInit(e);
    const t = q.parse(e.extnValue, jl);
    this.names = new Zs(t);
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue(), t = this.names.toTextObject();
    for (const n in t)
      e[n] = t[n];
    return e;
  }
}
v0.NAME = "Subject Alternative Name";
class Ur {
  static register(e, t) {
    this.items.set(e, t);
  }
  static create(e) {
    const t = new Rr(e), n = this.items.get(t.type);
    return n ? new n(e) : t;
  }
}
Ur.items = /* @__PURE__ */ new Map();
class m0 extends Rr {
  constructor(...e) {
    var t;
    if (W.isBufferSource(e[0])) {
      super(e[0]);
      const n = q.parse(this.value, ea);
      this.policies = n.map((i) => i.policyIdentifier);
    } else {
      const n = e[0], i = (t = e[1]) !== null && t !== void 0 ? t : !1, s = new ea(n.map((o) => new hc({
        policyIdentifier: o
      })));
      super(Rp, i, q.serialize(s)), this.policies = n;
    }
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue();
    return e.Policy = this.policies.map((t) => new st("", {}, Tn.toString(t))), e;
  }
}
m0.NAME = "Certificate Policies";
Ur.register(Rp, m0);
class w0 extends Rr {
  constructor(...e) {
    var t;
    if (W.isBufferSource(e[0]))
      super(e[0]);
    else if (Array.isArray(e[0]) && typeof e[0][0] == "string") {
      const i = e[0].map((o) => new as({
        distributionPoint: new di({
          fullName: [new Ve({ uniformResourceIdentifier: o })]
        })
      })), s = new Mi(i);
      super(_l, e[1], q.serialize(s));
    } else {
      const n = new Mi(e[0]);
      super(_l, e[1], q.serialize(n));
    }
    (t = this.distributionPoints) !== null && t !== void 0 || (this.distributionPoints = []);
  }
  onInit(e) {
    super.onInit(e);
    const t = q.parse(e.extnValue, Mi);
    this.distributionPoints = t;
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue();
    return e["Distribution Point"] = this.distributionPoints.map((t) => {
      var n;
      const i = {};
      return t.distributionPoint && (i[""] = (n = t.distributionPoint.fullName) === null || n === void 0 ? void 0 : n.map((s) => new Vn(s).toString()).join(", ")), t.reasons && (i.Reasons = t.reasons.toString()), t.cRLIssuer && (i["CRL Issuer"] = t.cRLIssuer.map((s) => s.toString()).join(", ")), i;
    }), e;
  }
}
w0.NAME = "CRL Distribution Points";
class b0 extends Rr {
  constructor(...e) {
    var t, n, i, s;
    if (W.isBufferSource(e[0]))
      super(e[0]);
    else if (e[0] instanceof Ui) {
      const o = new Ui(e[0]);
      super(wl, e[1], q.serialize(o));
    } else {
      const o = e[0], c = new Ui();
      $o(c, o, Kf, "ocsp"), $o(c, o, qf, "caIssuers"), $o(c, o, Zf, "timeStamping"), $o(c, o, Wf, "caRepository"), super(wl, e[1], q.serialize(c));
    }
    (t = this.ocsp) !== null && t !== void 0 || (this.ocsp = []), (n = this.caIssuers) !== null && n !== void 0 || (this.caIssuers = []), (i = this.timeStamping) !== null && i !== void 0 || (this.timeStamping = []), (s = this.caRepository) !== null && s !== void 0 || (this.caRepository = []);
  }
  onInit(e) {
    super.onInit(e), this.ocsp = [], this.caIssuers = [], this.timeStamping = [], this.caRepository = [], q.parse(e.extnValue, Ui).forEach((n) => {
      switch (n.accessMethod) {
        case Kf:
          this.ocsp.push(new Vn(n.accessLocation));
          break;
        case qf:
          this.caIssuers.push(new Vn(n.accessLocation));
          break;
        case Zf:
          this.timeStamping.push(new Vn(n.accessLocation));
          break;
        case Wf:
          this.caRepository.push(new Vn(n.accessLocation));
          break;
      }
    });
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue();
    return this.ocsp.length && Do(e, "OCSP", this.ocsp), this.caIssuers.length && Do(e, "CA Issuers", this.caIssuers), this.timeStamping.length && Do(e, "Time Stamping", this.timeStamping), this.caRepository.length && Do(e, "CA Repository", this.caRepository), e;
  }
}
b0.NAME = "Authority Info Access";
function Do(r, e, t) {
  if (t.length === 1)
    r[e] = t[0].toTextObject();
  else {
    const n = new st("");
    t.forEach((i, s) => {
      const o = i.toTextObject(), c = `${o[st.NAME]} ${s + 1}`;
      let u = n[c];
      Array.isArray(u) || (u = [], n[c] = u), u.push(o);
    }), r[e] = n;
  }
}
function $o(r, e, t, n) {
  const i = e[n];
  i && (Array.isArray(i) ? i : [i]).forEach((o) => {
    typeof o == "string" && (o = new Vn("url", o)), r.push(new wo({
      accessMethod: t,
      accessLocation: q.parse(o.rawData, Ve)
    }));
  });
}
class hs extends Qn {
  constructor(...e) {
    let t;
    if (W.isBufferSource(e[0]))
      t = W.toArrayBuffer(e[0]);
    else {
      const n = e[0], i = Array.isArray(e[1]) ? e[1].map((s) => W.toArrayBuffer(s)) : [];
      t = q.serialize(new En({ type: n, values: i }));
    }
    super(t, En);
  }
  onInit(e) {
    this.type = e.type, this.values = e.values;
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue();
    return e.Value = this.values.map((t) => new st("", { "": t })), e;
  }
  toTextObjectWithoutValue() {
    const e = this.toTextObjectEmpty();
    return e[st.NAME] === hs.NAME && (e[st.NAME] = Tn.toString(this.type)), e;
  }
}
hs.NAME = "Attribute";
class x0 extends hs {
  constructor(...e) {
    var t;
    if (W.isBufferSource(e[0]))
      super(e[0]);
    else {
      const n = new Ea({
        printableString: e[0]
      });
      super(c0, [q.serialize(n)]);
    }
    (t = this.password) !== null && t !== void 0 || (this.password = "");
  }
  onInit(e) {
    if (super.onInit(e), this.values[0]) {
      const t = q.parse(this.values[0], Ea);
      this.password = t.toString();
    }
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue();
    return e[st.VALUE] = this.password, e;
  }
}
x0.NAME = "Challenge Password";
class _f extends hs {
  constructor(...e) {
    var t;
    if (W.isBufferSource(e[0]))
      super(e[0]);
    else {
      const n = e[0], i = new pi();
      for (const s of n)
        i.push(q.parse(s.rawData, Gr));
      super(Sf, [q.serialize(i)]);
    }
    (t = this.items) !== null && t !== void 0 || (this.items = []);
  }
  onInit(e) {
    if (super.onInit(e), this.values[0]) {
      const t = q.parse(this.values[0], pi);
      this.items = t.map((n) => Ur.create(q.serialize(n)));
    }
  }
  toTextObject() {
    const e = this.toTextObjectWithoutValue(), t = this.items.map((n) => n.toTextObject());
    for (const n of t)
      e[n[st.NAME]] = n;
    return e;
  }
}
_f.NAME = "Extensions";
class Dc {
  static register(e, t) {
    this.items.set(e, t);
  }
  static create(e) {
    const t = new hs(e), n = this.items.get(t.type);
    return n ? new n(e) : t;
  }
}
Dc.items = /* @__PURE__ */ new Map();
const $c = "crypto.signatureFormatter";
class hm {
  toAsnSignature(e, t) {
    return W.toArrayBuffer(t);
  }
  toWebSignature(e, t) {
    return W.toArrayBuffer(t);
  }
}
var zo;
let Eu = zo = class {
  static createPssParams(e, t) {
    const n = zo.getHashAlgorithm(e);
    return n ? new bi({
      hashAlgorithm: n,
      maskGenAlgorithm: new ne({
        algorithm: kc,
        parameters: q.serialize(n)
      }),
      saltLength: t
    }) : null;
  }
  static getHashAlgorithm(e) {
    const t = ur.resolve(Xi);
    return typeof e == "string" ? t.toAsnAlgorithm({ name: e }) : typeof e == "object" && e && "name" in e ? t.toAsnAlgorithm(e) : null;
  }
  toAsnAlgorithm(e) {
    switch (e.name.toLowerCase()) {
      case "rsassa-pkcs1-v1_5":
        if ("hash" in e) {
          let t;
          if (typeof e.hash == "string")
            t = e.hash;
          else if (e.hash && typeof e.hash == "object" && "name" in e.hash && typeof e.hash.name == "string")
            t = e.hash.name.toUpperCase();
          else
            throw new Error("Cannot get hash algorithm name");
          switch (t.toLowerCase()) {
            case "sha-1":
              return new ne({ algorithm: ya, parameters: null });
            case "sha-256":
              return new ne({ algorithm: ru, parameters: null });
            case "sha-384":
              return new ne({ algorithm: ga, parameters: null });
            case "sha-512":
              return new ne({ algorithm: va, parameters: null });
          }
        } else
          return new ne({ algorithm: mi, parameters: null });
        break;
      case "rsa-pss":
        if ("hash" in e) {
          if (!("saltLength" in e && typeof e.saltLength == "number"))
            throw new Error("Cannot get 'saltLength' from 'alg' argument");
          const t = zo.createPssParams(e.hash, e.saltLength);
          if (!t)
            throw new Error("Cannot create PSS parameters");
          return new ne({ algorithm: Rs, parameters: q.serialize(t) });
        } else
          return new ne({ algorithm: Rs, parameters: null });
    }
    return null;
  }
  toWebAlgorithm(e) {
    switch (e.algorithm) {
      case mi:
        return { name: "RSASSA-PKCS1-v1_5" };
      case ya:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-1" } };
      case ru:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
      case ga:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-384" } };
      case va:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-512" } };
      case Rs:
        if (e.parameters) {
          const t = q.parse(e.parameters, bi);
          return {
            name: "RSA-PSS",
            hash: ur.resolve(Xi).toWebAlgorithm(t.hashAlgorithm),
            saltLength: t.saltLength
          };
        } else
          return { name: "RSA-PSS" };
    }
    return null;
  }
};
Eu = zo = f([
  Tc()
], Eu);
ur.registerSingleton(Oo, Eu);
let Iu = class {
  toAsnAlgorithm(e) {
    switch (e.name.toLowerCase()) {
      case "sha-1":
        return new ne({ algorithm: ma });
      case "sha-256":
        return new ne({ algorithm: wa });
      case "sha-384":
        return new ne({ algorithm: ba });
      case "sha-512":
        return new ne({ algorithm: xa });
    }
    return null;
  }
  toWebAlgorithm(e) {
    switch (e.algorithm) {
      case ma:
        return { name: "SHA-1" };
      case wa:
        return { name: "SHA-256" };
      case ba:
        return { name: "SHA-384" };
      case xa:
        return { name: "SHA-512" };
    }
    return null;
  }
};
Iu = f([
  Tc()
], Iu);
ur.registerSingleton(Oo, Iu);
class Nr {
  addPadding(e, t) {
    const n = W.toUint8Array(t), i = new Uint8Array(e);
    return i.set(n, e - n.length), i;
  }
  removePadding(e, t = !1) {
    let n = W.toUint8Array(e);
    for (let i = 0; i < n.length; i++)
      if (n[i]) {
        n = n.slice(i);
        break;
      }
    if (t && n[0] > 127) {
      const i = new Uint8Array(n.length + 1);
      return i.set(n, 1), i.buffer;
    }
    return n.buffer;
  }
  toAsnSignature(e, t) {
    if (e.name === "ECDSA") {
      const n = e.namedCurve, i = Nr.namedCurveSize.get(n) || Nr.defaultNamedCurveSize, s = new pa(), o = W.toUint8Array(t);
      return s.r = this.removePadding(o.slice(0, i), !0), s.s = this.removePadding(o.slice(i, i + i), !0), q.serialize(s);
    }
    return null;
  }
  toWebSignature(e, t) {
    if (e.name === "ECDSA") {
      const n = q.parse(t, pa), i = e.namedCurve, s = Nr.namedCurveSize.get(i) || Nr.defaultNamedCurveSize, o = this.addPadding(s, this.removePadding(n.r)), c = this.addPadding(s, this.removePadding(n.s));
      return Eg(o, c);
    }
    return null;
  }
}
Nr.namedCurveSize = /* @__PURE__ */ new Map();
Nr.defaultNamedCurveSize = 32;
const tl = "1.3.101.110", fd = "1.3.101.111", rl = "1.3.101.112", hd = "1.3.101.113";
let ku = class {
  toAsnAlgorithm(e) {
    let t = null;
    switch (e.name.toLowerCase()) {
      case "ed25519":
        t = rl;
        break;
      case "x25519":
        t = tl;
        break;
      case "eddsa":
        switch (e.namedCurve.toLowerCase()) {
          case "ed25519":
            t = rl;
            break;
          case "ed448":
            t = hd;
            break;
        }
        break;
      case "ecdh-es":
        switch (e.namedCurve.toLowerCase()) {
          case "x25519":
            t = tl;
            break;
          case "x448":
            t = fd;
            break;
        }
    }
    return t ? new ne({
      algorithm: t
    }) : null;
  }
  toWebAlgorithm(e) {
    switch (e.algorithm) {
      case rl:
        return { name: "Ed25519" };
      case hd:
        return { name: "EdDSA", namedCurve: "Ed448" };
      case tl:
        return { name: "X25519" };
      case fd:
        return { name: "ECDH-ES", namedCurve: "X448" };
    }
    return null;
  }
};
ku = f([
  Tc()
], ku);
ur.registerSingleton(Oo, ku);
class dm extends zr {
  constructor(e) {
    zr.isAsnEncoded(e) ? super(e, Ks) : super(e), this.tag = vr.CertificateRequestTag;
  }
  onInit(e) {
    this.tbs = q.serialize(e.certificationRequestInfo), this.publicKey = new an(e.certificationRequestInfo.subjectPKInfo);
    const t = ur.resolve(Xi);
    this.signatureAlgorithm = t.toWebAlgorithm(e.signatureAlgorithm), this.signature = e.signature, this.attributes = e.certificationRequestInfo.attributes.map((i) => Dc.create(q.serialize(i)));
    const n = this.getAttribute(Sf);
    this.extensions = [], n instanceof _f && (this.extensions = n.items), this.subjectName = new Gn(e.certificationRequestInfo.subject), this.subject = this.subjectName.toString();
  }
  getAttribute(e) {
    for (const t of this.attributes)
      if (t.type === e)
        return t;
    return null;
  }
  getAttributes(e) {
    return this.attributes.filter((t) => t.type === e);
  }
  getExtension(e) {
    for (const t of this.extensions)
      if (t.type === e)
        return t;
    return null;
  }
  getExtensions(e) {
    return this.extensions.filter((t) => t.type === e);
  }
  async verify(e = Wt.get()) {
    const t = { ...this.publicKey.algorithm, ...this.signatureAlgorithm }, n = await this.publicKey.export(t, ["verify"], e), i = ur.resolveAll($c).reverse();
    let s = null;
    for (const c of i)
      if (s = c.toWebSignature(t, this.signature), s)
        break;
    if (!s)
      throw Error("Cannot convert WebCrypto signature value to ASN.1 format");
    return await e.subtle.verify(this.signatureAlgorithm, n, s, this.tbs);
  }
  toTextObject() {
    const e = this.toTextObjectEmpty(), t = q.parse(this.rawData, Ks), n = t.certificationRequestInfo, i = new st("", {
      Version: `${Gi[n.version]} (${n.version})`,
      Subject: this.subject,
      "Subject Public Key Info": this.publicKey
    });
    if (this.attributes.length) {
      const s = new st("");
      for (const o of this.attributes) {
        const c = o.toTextObject();
        s[c[st.NAME]] = c;
      }
      i.Attributes = s;
    }
    return e.Data = i, e.Signature = new st("", {
      Algorithm: qn.serializeAlgorithm(t.signatureAlgorithm),
      "": t.signature
    }), e;
  }
}
dm.NAME = "PKCS#10 Certificate Request";
class xi extends zr {
  constructor(e) {
    zr.isAsnEncoded(e) ? super(e, yi) : super(e), this.tag = vr.CertificateTag;
  }
  onInit(e) {
    const t = e.tbsCertificate;
    this.tbs = q.serialize(t), this.serialNumber = le.ToHex(t.serialNumber), this.subjectName = new Gn(t.subject), this.subject = new Gn(t.subject).toString(), this.issuerName = new Gn(t.issuer), this.issuer = this.issuerName.toString();
    const n = ur.resolve(Xi);
    this.signatureAlgorithm = n.toWebAlgorithm(e.signatureAlgorithm), this.signature = e.signatureValue;
    const i = t.validity.notBefore.utcTime || t.validity.notBefore.generalTime;
    if (!i)
      throw new Error("Cannot get 'notBefore' value");
    this.notBefore = i;
    const s = t.validity.notAfter.utcTime || t.validity.notAfter.generalTime;
    if (!s)
      throw new Error("Cannot get 'notAfter' value");
    this.notAfter = s, this.extensions = [], t.extensions && (this.extensions = t.extensions.map((o) => Ur.create(q.serialize(o)))), this.publicKey = new an(t.subjectPublicKeyInfo);
  }
  getExtension(e) {
    for (const t of this.extensions)
      if (typeof e == "string") {
        if (t.type === e)
          return t;
      } else if (t instanceof e)
        return t;
    return null;
  }
  getExtensions(e) {
    return this.extensions.filter((t) => typeof e == "string" ? t.type === e : t instanceof e);
  }
  async verify(e = {}, t = Wt.get()) {
    let n, i;
    const s = e.publicKey;
    try {
      if (!s)
        n = { ...this.publicKey.algorithm, ...this.signatureAlgorithm }, i = await this.publicKey.export(n, ["verify"], t);
      else if ("publicKey" in s)
        n = { ...s.publicKey.algorithm, ...this.signatureAlgorithm }, i = await s.publicKey.export(n, ["verify"], t);
      else if (s instanceof an)
        n = { ...s.algorithm, ...this.signatureAlgorithm }, i = await s.export(n, ["verify"], t);
      else if (W.isBufferSource(s)) {
        const h = new an(s);
        n = { ...h.algorithm, ...this.signatureAlgorithm }, i = await h.export(n, ["verify"], t);
      } else
        n = { ...s.algorithm, ...this.signatureAlgorithm }, i = s;
    } catch {
      return !1;
    }
    const o = ur.resolveAll($c).reverse();
    let c = null;
    for (const h of o)
      if (c = h.toWebSignature(n, this.signature), c)
        break;
    if (!c)
      throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
    const u = await t.subtle.verify(this.signatureAlgorithm, i, c, this.tbs);
    if (e.signatureOnly)
      return u;
    {
      const v = (e.date || /* @__PURE__ */ new Date()).getTime();
      return u && this.notBefore.getTime() < v && v < this.notAfter.getTime();
    }
  }
  async getThumbprint(...e) {
    let t, n = "SHA-1";
    return e[0] && (e[0].subtle ? t = e[0] : (n = e[0] || n, t = e[1])), t ?? (t = Wt.get()), await t.subtle.digest(n, this.rawData);
  }
  async isSelfSigned(e = Wt.get()) {
    return this.subject === this.issuer && await this.verify({ signatureOnly: !0 }, e);
  }
  toTextObject() {
    const e = this.toTextObjectEmpty(), t = q.parse(this.rawData, yi), n = t.tbsCertificate, i = new st("", {
      Version: `${Gi[n.version]} (${n.version})`,
      "Serial Number": n.serialNumber,
      "Signature Algorithm": qn.serializeAlgorithm(n.signature),
      Issuer: this.issuer,
      Validity: new st("", {
        "Not Before": n.validity.notBefore.getTime(),
        "Not After": n.validity.notAfter.getTime()
      }),
      Subject: this.subject,
      "Subject Public Key Info": this.publicKey
    });
    if (n.issuerUniqueID && (i["Issuer Unique ID"] = n.issuerUniqueID), n.subjectUniqueID && (i["Subject Unique ID"] = n.subjectUniqueID), this.extensions.length) {
      const s = new st("");
      for (const o of this.extensions) {
        const c = o.toTextObject();
        s[c[st.NAME]] = c;
      }
      i.Extensions = s;
    }
    return e.Data = i, e.Signature = new st("", {
      Algorithm: qn.serializeAlgorithm(t.signatureAlgorithm),
      "": t.signatureValue
    }), e;
  }
}
xi.NAME = "Certificate";
class pm extends Array {
  constructor(e) {
    if (super(), zr.isAsnEncoded(e))
      this.import(e);
    else if (e instanceof xi)
      this.push(e);
    else if (Array.isArray(e))
      for (const t of e)
        this.push(t);
  }
  export(e) {
    const t = new Sn();
    t.version = 1, t.encapContentInfo.eContentType = bv, t.encapContentInfo.eContent = new Zi({
      single: new ot()
    }), t.certificates = new Hs(this.map((s) => new gi({
      certificate: q.parse(s.rawData, yi)
    })));
    const n = new An({
      contentType: Ql,
      content: q.serialize(t)
    }), i = q.serialize(n);
    return e === "raw" ? i : this.toString(e);
  }
  import(e) {
    const t = zr.toArrayBuffer(e), n = q.parse(t, An);
    if (n.contentType !== Ql)
      throw new TypeError("Cannot parse CMS package. Incoming data is not a SignedData object.");
    const i = q.parse(n.content, Sn);
    this.clear();
    for (const s of i.certificates || [])
      s.certificate && this.push(new xi(s.certificate));
  }
  clear() {
    for (; this.pop(); )
      ;
  }
  toString(e = "pem") {
    const t = this.export("raw");
    switch (e) {
      case "pem":
        return vr.encode(t, "CMS");
      case "pem-chain":
        return this.map((n) => n.toString("pem")).join(`
`);
      case "asn":
        return q.toString(t);
      case "hex":
        return le.ToHex(t);
      case "base64":
        return le.ToBase64(t);
      case "base64url":
        return le.ToBase64Url(t);
      case "text":
        return qn.serialize(this.toTextObject());
      default:
        throw TypeError("Argument 'format' is unsupported value");
    }
  }
  toTextObject() {
    const e = q.parse(this.export("raw"), An), t = q.parse(e.content, Sn);
    return new st("X509Certificates", {
      "Content Type": Tn.toString(e.contentType),
      Content: new st("", {
        Version: `${ln[t.version]} (${t.version})`,
        Certificates: new st("", { Certificate: this.map((i) => i.toTextObject()) })
      })
    });
  }
}
class ym {
  constructor(e = {}) {
    this.certificates = [], e.certificates && (this.certificates = e.certificates);
  }
  async build(e, t = Wt.get()) {
    const n = new pm(e);
    let i = e;
    for (; i = await this.findIssuer(i, t); ) {
      const s = await i.getThumbprint(t);
      for (const o of n) {
        const c = await o.getThumbprint(t);
        if (qo(s, c))
          throw new Error("Cannot build a certificate chain. Circular dependency.");
      }
      n.push(i);
    }
    return n;
  }
  async findIssuer(e, t = Wt.get()) {
    if (!await e.isSelfSigned(t)) {
      const n = e.getExtension(Jo);
      for (const i of this.certificates)
        if (i.subject === e.issuer) {
          if (n) {
            if (n.keyId) {
              const s = i.getExtension(sf);
              if (s && s.keyId !== n.keyId)
                continue;
            } else if (n.certId) {
              const s = i.getExtension(nf);
              if (s && !(n.certId.serialNumber === i.serialNumber && qo(q.serialize(n.certId.name), q.serialize(s))))
                continue;
            }
          }
          try {
            const s = { ...i.publicKey.algorithm, ...e.signatureAlgorithm }, o = await i.publicKey.export(s, ["verify"], t);
            if (!await e.verify({ publicKey: o, signatureOnly: !0 }, t))
              continue;
          } catch {
            continue;
          }
          return i;
        }
    }
    return null;
  }
}
var dd;
(function(r) {
  r[r.unspecified = 0] = "unspecified", r[r.keyCompromise = 1] = "keyCompromise", r[r.cACompromise = 2] = "cACompromise", r[r.affiliationChanged = 3] = "affiliationChanged", r[r.superseded = 4] = "superseded", r[r.cessationOfOperation = 5] = "cessationOfOperation", r[r.certificateHold = 6] = "certificateHold", r[r.removeFromCRL = 8] = "removeFromCRL", r[r.privilegeWithdrawn = 9] = "privilegeWithdrawn", r[r.aACompromise = 10] = "aACompromise";
})(dd || (dd = {}));
Ur.register(jp, p0);
Ur.register(Dp, y0);
Ur.register($p, g0);
Ur.register(sf, Uc);
Ur.register(Jo, Ys);
Ur.register(nf, v0);
Ur.register(_l, w0);
Ur.register(wl, b0);
Dc.register(c0, x0);
Dc.register(Sf, _f);
ur.registerSingleton($c, hm);
ur.registerSingleton($c, Nr);
Nr.namedCurveSize.set("P-256", 32);
Nr.namedCurveSize.set("K-256", 32);
Nr.namedCurveSize.set("P-384", 48);
Nr.namedCurveSize.set("P-521", 66);
const ge = { POS_INT: 0, NEG_INT: 1, BYTE_STRING: 2, UTF8_STRING: 3, ARRAY: 4, MAP: 5, TAG: 6, SIMPLE_FLOAT: 7 }, kt = { DATE_STRING: 0, DATE_EPOCH: 1, POS_BIGINT: 2, NEG_BIGINT: 3, DECIMAL_FRAC: 4, BIGFLOAT: 5, BASE64URL_EXPECTED: 21, BASE64_EXPECTED: 22, BASE16_EXPECTED: 23, CBOR: 24, URI: 32, BASE64URL: 33, BASE64: 34, MIME: 36, SET: 258, JSON: 262, REGEXP: 21066, SELF_DESCRIBED: 55799, INVALID_16: 65535, INVALID_32: 4294967295, INVALID_64: 0xffffffffffffffffn }, St = { ZERO: 0, ONE: 24, TWO: 25, FOUR: 26, EIGHT: 27, INDEFINITE: 31 }, Ln = { FALSE: 20, TRUE: 21, NULL: 22, UNDEFINED: 23 };
var ks;
let kr = (ks = class {
}, qe(ks, "BREAK", Symbol.for("github.com/hildjj/cbor2/break")), qe(ks, "ENCODED", Symbol.for("github.com/hildjj/cbor2/cbor-encoded")), qe(ks, "LENGTH", Symbol.for("github.com/hildjj/cbor2/length")), ks);
const ka = { MIN: -(2n ** 63n), MAX: 2n ** 64n - 1n };
var wn, tn;
let Xe = (wn = class {
  constructor(e, t = void 0) {
    qe(this, "tag");
    qe(this, "contents");
    this.tag = e, this.contents = t;
  }
  get noChildren() {
    var e;
    return !!((e = $(wn, tn).get(this.tag)) != null && e.noChildren);
  }
  static registerDecoder(e, t, n) {
    const i = $(this, tn).get(e);
    return $(this, tn).set(e, t), i && ("comment" in t || (t.comment = i.comment), "noChildren" in t || (t.noChildren = i.noChildren)), n && !t.comment && (t.comment = () => `(${n})`), i;
  }
  static clearDecoder(e) {
    const t = $(this, tn).get(e);
    return $(this, tn).delete(e), t;
  }
  *[Symbol.iterator]() {
    yield this.contents;
  }
  push(e) {
    return this.contents = e, 1;
  }
  decode(e) {
    const t = $(wn, tn).get(this.tag);
    return t ? t(this, e) : this;
  }
  comment(e, t) {
    const n = $(wn, tn).get(this.tag);
    if (n != null && n.comment) return n.comment(this, e, t);
  }
  toCBOR() {
    return [this.tag, this.contents];
  }
  [Symbol.for("nodejs.util.inspect.custom")](e, t, n) {
    return `${this.tag}(${n(this.contents, t)})`;
  }
}, tn = new WeakMap(), nr(wn, tn, /* @__PURE__ */ new Map()), wn);
function Ca(r) {
  if (r != null && typeof r == "object") return r[kr.ENCODED];
}
function gm(r) {
  if (r != null && typeof r == "object") return r[kr.LENGTH];
}
function Js(r, e) {
  Object.defineProperty(r, kr.ENCODED, { configurable: !0, enumerable: !1, value: e });
}
function Cs(r, e) {
  const t = Object(r);
  return Js(t, e), t;
}
function A0(r) {
  let e = Math.ceil(r.length / 2);
  const t = new Uint8Array(e);
  e--;
  for (let n = r.length, i = n - 2; n >= 0; n = i, i -= 2, e--) t[e] = parseInt(r.substring(i, n), 16);
  return t;
}
function Hr(r) {
  return r.reduce((e, t) => e + t.toString(16).padStart(2, "0"), "");
}
function vm(r) {
  const e = r.reduce((i, s) => i + s.length, 0), t = new Uint8Array(e);
  let n = 0;
  for (const i of r) t.set(i, n), n += i.length;
  return t;
}
function Ef(r) {
  const e = atob(r);
  return Uint8Array.from(e, (t) => t.codePointAt(0));
}
const mm = { "-": "+", _: "/" };
function wm(r) {
  const e = r.replace(/[_-]/g, (t) => mm[t]);
  return Ef(e.padEnd(Math.ceil(e.length / 4) * 4, "="));
}
function bm() {
  const r = new Uint8Array(4), e = new Uint32Array(r.buffer);
  return !((e[0] = 1) & r[0]);
}
function pd(r) {
  var t;
  let e = "";
  for (const n of r) {
    const i = (t = n.codePointAt(0)) == null ? void 0 : t.toString(16).padStart(4, "0");
    e && (e += ", "), e += `U+${i}`;
  }
  return e;
}
function S0(r, e) {
  const [t, n, i] = r, [s, o, c] = e, u = Math.min(i.length, c.length);
  for (let h = 0; h < u; h++) {
    const v = i[h] - c[h];
    if (v !== 0) return v;
  }
  return 0;
}
var Dn, qt, yr, Vt, $n, rt, ti, Ko, Cu, Qr, en;
const Ga = class Ga {
  constructor(e = {}) {
    nr(this, rt);
    nr(this, Dn);
    nr(this, qt, []);
    nr(this, yr, null);
    nr(this, Vt, 0);
    nr(this, $n, 0);
    if (Ct(this, Dn, { ...Ga.defaultOptions, ...e }), $(this, Dn).chunkSize < 8) throw new RangeError(`Expected size >= 8, got ${$(this, Dn).chunkSize}`);
    Me(this, rt, ti).call(this);
  }
  get length() {
    return $(this, $n);
  }
  read() {
    Me(this, rt, Ko).call(this);
    const e = new Uint8Array($(this, $n));
    let t = 0;
    for (const n of $(this, qt)) e.set(n, t), t += n.length;
    return Me(this, rt, ti).call(this), e;
  }
  write(e) {
    const t = e.length;
    t > Me(this, rt, Cu).call(this) ? (Me(this, rt, Ko).call(this), t > $(this, Dn).chunkSize ? ($(this, qt).push(e), Me(this, rt, ti).call(this)) : (Me(this, rt, ti).call(this), $(this, qt)[$(this, qt).length - 1].set(e), Ct(this, Vt, t))) : ($(this, qt)[$(this, qt).length - 1].set(e, $(this, Vt)), Ct(this, Vt, $(this, Vt) + t)), Ct(this, $n, $(this, $n) + t);
  }
  writeUint8(e) {
    Me(this, rt, Qr).call(this, 1), $(this, yr).setUint8($(this, Vt), e), Me(this, rt, en).call(this, 1);
  }
  writeUint16(e, t = !1) {
    Me(this, rt, Qr).call(this, 2), $(this, yr).setUint16($(this, Vt), e, t), Me(this, rt, en).call(this, 2);
  }
  writeUint32(e, t = !1) {
    Me(this, rt, Qr).call(this, 4), $(this, yr).setUint32($(this, Vt), e, t), Me(this, rt, en).call(this, 4);
  }
  writeBigUint64(e, t = !1) {
    Me(this, rt, Qr).call(this, 8), $(this, yr).setBigUint64($(this, Vt), e, t), Me(this, rt, en).call(this, 8);
  }
  writeInt16(e, t = !1) {
    Me(this, rt, Qr).call(this, 2), $(this, yr).setInt16($(this, Vt), e, t), Me(this, rt, en).call(this, 2);
  }
  writeInt32(e, t = !1) {
    Me(this, rt, Qr).call(this, 4), $(this, yr).setInt32($(this, Vt), e, t), Me(this, rt, en).call(this, 4);
  }
  writeBigInt64(e, t = !1) {
    Me(this, rt, Qr).call(this, 8), $(this, yr).setBigInt64($(this, Vt), e, t), Me(this, rt, en).call(this, 8);
  }
  writeFloat32(e, t = !1) {
    Me(this, rt, Qr).call(this, 4), $(this, yr).setFloat32($(this, Vt), e, t), Me(this, rt, en).call(this, 4);
  }
  writeFloat64(e, t = !1) {
    Me(this, rt, Qr).call(this, 8), $(this, yr).setFloat64($(this, Vt), e, t), Me(this, rt, en).call(this, 8);
  }
  clear() {
    Ct(this, $n, 0), Ct(this, qt, []), Me(this, rt, ti).call(this);
  }
};
Dn = new WeakMap(), qt = new WeakMap(), yr = new WeakMap(), Vt = new WeakMap(), $n = new WeakMap(), rt = new WeakSet(), ti = function() {
  const e = new Uint8Array($(this, Dn).chunkSize);
  $(this, qt).push(e), Ct(this, Vt, 0), Ct(this, yr, new DataView(e.buffer, e.byteOffset, e.byteLength));
}, Ko = function() {
  if ($(this, Vt) === 0) {
    $(this, qt).pop();
    return;
  }
  const e = $(this, qt).length - 1;
  $(this, qt)[e] = $(this, qt)[e].subarray(0, $(this, Vt)), Ct(this, Vt, 0), Ct(this, yr, null);
}, Cu = function() {
  const e = $(this, qt).length - 1;
  return $(this, qt)[e].length - $(this, Vt);
}, Qr = function(e) {
  Me(this, rt, Cu).call(this) < e && (Me(this, rt, Ko).call(this), Me(this, rt, ti).call(this));
}, en = function(e) {
  Ct(this, Vt, $(this, Vt) + e), Ct(this, $n, $(this, $n) + e);
}, qe(Ga, "defaultOptions", { chunkSize: 4096 });
let Ba = Ga;
function _0(r, e = 0, t = !1) {
  const n = r[e] & 128 ? -1 : 1, i = (r[e] & 124) >> 2, s = (r[e] & 3) << 8 | r[e + 1];
  if (i === 0) {
    if (t && s !== 0) throw new Error(`Unwanted subnormal: ${n * 5960464477539063e-23 * s}`);
    return n * 5960464477539063e-23 * s;
  } else if (i === 31) return s ? NaN : n * (1 / 0);
  return n * 2 ** (i - 25) * (1024 + s);
}
function xm(r) {
  const e = new DataView(new ArrayBuffer(4));
  e.setFloat32(0, r, !1);
  const t = e.getUint32(0, !1);
  if (t & 8191) return null;
  let n = t >> 16 & 32768;
  const i = t >> 23 & 255, s = t & 8388607;
  if (!(i === 0 && s === 0)) if (i >= 113 && i <= 142) n += (i - 112 << 10) + (s >> 13);
  else if (i >= 103 && i < 113) {
    if (s & (1 << 126 - i) - 1) return null;
    n += s + 8388608 >> 126 - i;
  } else if (i === 255) n |= 31744, n |= s >> 13;
  else return null;
  return n;
}
function Am(r) {
  if (r !== 0) {
    const e = new ArrayBuffer(8), t = new DataView(e);
    t.setFloat64(0, r, !1);
    const n = t.getBigUint64(0, !1);
    if ((n & 0x7ff0000000000000n) === 0n) return n & 0x8000000000000000n ? -0 : 0;
  }
  return r;
}
function Sm(r) {
  switch (r.length) {
    case 2:
      _0(r, 0, !0);
      break;
    case 4: {
      const e = new DataView(r.buffer, r.byteOffset, r.byteLength), t = e.getUint32(0, !1);
      if (!(t & 2139095040) && t & 8388607) throw new Error(`Unwanted subnormal: ${e.getFloat32(0, !1)}`);
      break;
    }
    case 8: {
      const e = new DataView(r.buffer, r.byteOffset, r.byteLength), t = e.getBigUint64(0, !1);
      if ((t & 0x7ff0000000000000n) === 0n && t & 0x000fffffffffffn) throw new Error(`Unwanted subnormal: ${e.getFloat64(0, !1)}`);
      break;
    }
    default:
      throw new TypeError(`Bad input to isSubnormal: ${r}`);
  }
}
const yd = ge.SIMPLE_FLOAT << 5 | St.TWO, _m = ge.SIMPLE_FLOAT << 5 | St.FOUR, Em = ge.SIMPLE_FLOAT << 5 | St.EIGHT, Im = ge.SIMPLE_FLOAT << 5 | Ln.TRUE, km = ge.SIMPLE_FLOAT << 5 | Ln.FALSE, Cm = ge.SIMPLE_FLOAT << 5 | Ln.UNDEFINED, Bm = ge.SIMPLE_FLOAT << 5 | Ln.NULL, Om = new TextEncoder(), Tm = { ...Ba.defaultOptions, avoidInts: !1, cde: !1, collapseBigInts: !0, dcbor: !1, float64: !1, flushToZero: !1, forceEndian: null, ignoreOriginalEncoding: !1, largeNegativeAsBigInt: !1, reduceUnsafeNumbers: !1, rejectBigInts: !1, rejectCustomSimples: !1, rejectDuplicateKeys: !1, rejectFloats: !1, rejectUndefined: !1, simplifyNegativeZero: !1, sortKeys: null, stringNormalization: null }, E0 = { cde: !0, ignoreOriginalEncoding: !0, sortKeys: S0 }, Nm = { ...E0, dcbor: !0, largeNegativeAsBigInt: !0, reduceUnsafeNumbers: !0, rejectCustomSimples: !0, rejectDuplicateKeys: !0, rejectUndefined: !0, simplifyNegativeZero: !0, stringNormalization: "NFC" };
function I0(r) {
  const e = r < 0;
  return typeof r == "bigint" ? [e ? -r - 1n : r, e] : [e ? -r - 1 : r, e];
}
function nl(r, e, t) {
  if (t.rejectFloats) throw new Error(`Attempt to encode an unwanted floating point number: ${r}`);
  if (isNaN(r)) e.writeUint8(yd), e.writeUint16(32256);
  else if (!t.float64 && Math.fround(r) === r) {
    const n = xm(r);
    n === null ? (e.writeUint8(_m), e.writeFloat32(r)) : (e.writeUint8(yd), e.writeUint16(n));
  } else e.writeUint8(Em), e.writeFloat64(r);
}
function Kr(r, e, t) {
  const [n, i] = I0(r);
  if (i && t) throw new TypeError(`Negative size: ${r}`);
  t ?? (t = i ? ge.NEG_INT : ge.POS_INT), t <<= 5, n < 24 ? e.writeUint8(t | n) : n <= 255 ? (e.writeUint8(t | St.ONE), e.writeUint8(n)) : n <= 65535 ? (e.writeUint8(t | St.TWO), e.writeUint16(n)) : n <= 4294967295 ? (e.writeUint8(t | St.FOUR), e.writeUint32(n)) : (e.writeUint8(t | St.EIGHT), e.writeBigUint64(BigInt(n)));
}
function Oa(r, e, t) {
  typeof r == "number" ? Kr(r, e, ge.TAG) : typeof r == "object" && !t.ignoreOriginalEncoding && kr.ENCODED in r ? e.write(r[kr.ENCODED]) : r <= Number.MAX_SAFE_INTEGER ? Kr(Number(r), e, ge.TAG) : (e.writeUint8(ge.TAG << 5 | St.EIGHT), e.writeBigUint64(BigInt(r)));
}
function k0(r, e, t) {
  const [n, i] = I0(r);
  if (t.collapseBigInts && (!t.largeNegativeAsBigInt || r >= -0x8000000000000000n)) {
    if (n <= 0xffffffffn) {
      Kr(Number(r), e);
      return;
    }
    if (n <= 0xffffffffffffffffn) {
      const h = (i ? ge.NEG_INT : ge.POS_INT) << 5;
      e.writeUint8(h | St.EIGHT), e.writeBigUint64(n);
      return;
    }
  }
  if (t.rejectBigInts) throw new Error(`Attempt to encode unwanted bigint: ${r}`);
  const s = i ? kt.NEG_BIGINT : kt.POS_BIGINT, o = n.toString(16), c = o.length % 2 ? "0" : "";
  Oa(s, e, t);
  const u = A0(c + o);
  Kr(u.length, e, ge.BYTE_STRING), e.write(u);
}
function Pm(r, e, t) {
  t.flushToZero && (r = Am(r)), Object.is(r, -0) ? t.simplifyNegativeZero ? t.avoidInts ? nl(0, e, t) : Kr(0, e) : nl(r, e, t) : !t.avoidInts && Number.isSafeInteger(r) ? Kr(r, e) : t.reduceUnsafeNumbers && Math.floor(r) === r && r >= ka.MIN && r <= ka.MAX ? k0(BigInt(r), e, t) : nl(r, e, t);
}
function jm(r, e, t) {
  const n = t.stringNormalization ? r.normalize(t.stringNormalization) : r, i = Om.encode(n);
  Kr(i.length, e, ge.UTF8_STRING), e.write(i);
}
function Rm(r, e, t) {
  const n = r;
  If(n, n.length, ge.ARRAY, e, t);
  for (const i of n) oi(i, e, t);
}
function Um(r, e) {
  const t = r;
  Kr(t.length, e, ge.BYTE_STRING), e.write(t);
}
const Bu = /* @__PURE__ */ new Map([[Array, Rm], [Uint8Array, Um]]);
function Ut(r, e) {
  const t = Bu.get(r);
  return Bu.set(r, e), t;
}
function If(r, e, t, n, i) {
  const s = gm(r);
  s && !i.ignoreOriginalEncoding ? n.write(s) : Kr(e, n, t);
}
function Dm(r, e, t) {
  if (r === null) {
    e.writeUint8(Bm);
    return;
  }
  if (!t.ignoreOriginalEncoding && kr.ENCODED in r) {
    e.write(r[kr.ENCODED]);
    return;
  }
  const n = Bu.get(r.constructor);
  if (n) {
    const s = n(r, e, t);
    s && ((typeof s[0] == "bigint" || isFinite(Number(s[0]))) && Oa(s[0], e, t), oi(s[1], e, t));
    return;
  }
  if (typeof r.toCBOR == "function") {
    const s = r.toCBOR(e, t);
    s && ((typeof s[0] == "bigint" || isFinite(Number(s[0]))) && Oa(s[0], e, t), oi(s[1], e, t));
    return;
  }
  if (typeof r.toJSON == "function") {
    oi(r.toJSON(), e, t);
    return;
  }
  const i = Object.entries(r).map((s) => [s[0], s[1], Mc(s[0], t)]);
  t.sortKeys && i.sort(t.sortKeys), If(r, i.length, ge.MAP, e, t);
  for (const [s, o, c] of i) e.write(c), oi(o, e, t);
}
function oi(r, e, t) {
  switch (typeof r) {
    case "number":
      Pm(r, e, t);
      break;
    case "bigint":
      k0(r, e, t);
      break;
    case "string":
      jm(r, e, t);
      break;
    case "boolean":
      e.writeUint8(r ? Im : km);
      break;
    case "undefined":
      if (t.rejectUndefined) throw new Error("Attempt to encode unwanted undefined.");
      e.writeUint8(Cm);
      break;
    case "object":
      Dm(r, e, t);
      break;
    case "symbol":
      throw new TypeError(`Unknown symbol: ${r.toString()}`);
    default:
      throw new TypeError(`Unknown type: ${typeof r}, ${String(r)}`);
  }
}
function Mc(r, e = {}) {
  const t = { ...Tm };
  e.dcbor ? Object.assign(t, Nm) : e.cde && Object.assign(t, E0), Object.assign(t, e);
  const n = new Ba(t);
  return oi(r, n, t), n.read();
}
var C0 = ((r) => (r[r.NEVER = -1] = "NEVER", r[r.PREFERRED = 0] = "PREFERRED", r[r.ALWAYS = 1] = "ALWAYS", r))(C0 || {});
const Pn = class Pn {
  constructor(e) {
    qe(this, "value");
    this.value = e;
  }
  static create(e) {
    return Pn.KnownSimple.has(e) ? Pn.KnownSimple.get(e) : new Pn(e);
  }
  toCBOR(e, t) {
    if (t.rejectCustomSimples) throw new Error(`Cannot encode non-standard Simple value: ${this.value}`);
    Kr(this.value, e, ge.SIMPLE_FLOAT);
  }
  toString() {
    return `simple(${this.value})`;
  }
  decode() {
    return Pn.KnownSimple.has(this.value) ? Pn.KnownSimple.get(this.value) : this;
  }
  [Symbol.for("nodejs.util.inspect.custom")](e, t, n) {
    return `simple(${n(this.value, t)})`;
  }
};
qe(Pn, "KnownSimple", /* @__PURE__ */ new Map([[Ln.FALSE, !1], [Ln.TRUE, !0], [Ln.NULL, null], [Ln.UNDEFINED, void 0]]));
let Xs = Pn;
const $m = new TextDecoder("utf8", { fatal: !0, ignoreBOM: !0 });
var Sr, Vr, Zt, Br, Yt, ri, Ou, Bs;
const za = class za {
  constructor(e, t) {
    nr(this, Yt);
    nr(this, Sr);
    nr(this, Vr);
    nr(this, Zt, 0);
    nr(this, Br);
    if (Ct(this, Br, { ...za.defaultOptions, ...t }), typeof e == "string") switch ($(this, Br).encoding) {
      case "hex":
        Ct(this, Sr, A0(e));
        break;
      case "base64":
        Ct(this, Sr, Ef(e));
        break;
      default:
        throw new TypeError(`Encoding not implemented: "${$(this, Br).encoding}"`);
    }
    else Ct(this, Sr, e);
    Ct(this, Vr, new DataView($(this, Sr).buffer, $(this, Sr).byteOffset, $(this, Sr).byteLength));
  }
  toHere(e) {
    return $(this, Sr).subarray(e, $(this, Zt));
  }
  *[Symbol.iterator]() {
    if (yield* Me(this, Yt, ri).call(this, 0), $(this, Zt) !== $(this, Sr).length) throw new Error("Extra data in input");
  }
};
Sr = new WeakMap(), Vr = new WeakMap(), Zt = new WeakMap(), Br = new WeakMap(), Yt = new WeakSet(), ri = function* (e) {
  if (e++ > $(this, Br).maxDepth) throw new Error(`Maximum depth ${$(this, Br).maxDepth} exceeded`);
  const t = $(this, Zt), n = $(this, Vr).getUint8(Pf(this, Zt)._++), i = n >> 5, s = n & 31;
  let o = s, c = !1, u = 0;
  switch (s) {
    case St.ONE:
      if (u = 1, o = $(this, Vr).getUint8($(this, Zt)), i === ge.SIMPLE_FLOAT) {
        if (o < 32) throw new Error(`Invalid simple encoding in extra byte: ${o}`);
        c = !0;
      } else if ($(this, Br).requirePreferred && o < 24) throw new Error(`Unexpectedly long integer encoding (1) for ${o}`);
      break;
    case St.TWO:
      if (u = 2, i === ge.SIMPLE_FLOAT) o = _0($(this, Sr), $(this, Zt));
      else if (o = $(this, Vr).getUint16($(this, Zt), !1), $(this, Br).requirePreferred && o <= 255) throw new Error(`Unexpectedly long integer encoding (2) for ${o}`);
      break;
    case St.FOUR:
      if (u = 4, i === ge.SIMPLE_FLOAT) o = $(this, Vr).getFloat32($(this, Zt), !1);
      else if (o = $(this, Vr).getUint32($(this, Zt), !1), $(this, Br).requirePreferred && o <= 65535) throw new Error(`Unexpectedly long integer encoding (4) for ${o}`);
      break;
    case St.EIGHT: {
      if (u = 8, i === ge.SIMPLE_FLOAT) o = $(this, Vr).getFloat64($(this, Zt), !1);
      else if (o = $(this, Vr).getBigUint64($(this, Zt), !1), o <= Number.MAX_SAFE_INTEGER && (o = Number(o)), $(this, Br).requirePreferred && o <= 4294967295) throw new Error(`Unexpectedly long integer encoding (8) for ${o}`);
      break;
    }
    case 28:
    case 29:
    case 30:
      throw new Error(`Additional info not implemented: ${s}`);
    case St.INDEFINITE:
      switch (i) {
        case ge.POS_INT:
        case ge.NEG_INT:
        case ge.TAG:
          throw new Error(`Invalid indefinite encoding for MT ${i}`);
        case ge.SIMPLE_FLOAT:
          yield [i, s, kr.BREAK, t, 0];
          return;
      }
      o = 1 / 0;
      break;
    default:
      c = !0;
  }
  switch (Ct(this, Zt, $(this, Zt) + u), i) {
    case ge.POS_INT:
      yield [i, s, o, t, u];
      break;
    case ge.NEG_INT:
      yield [i, s, typeof o == "bigint" ? -1n - o : -1 - Number(o), t, u];
      break;
    case ge.BYTE_STRING:
      o === 1 / 0 ? yield* Me(this, Yt, Bs).call(this, i, e, t) : yield [i, s, Me(this, Yt, Ou).call(this, o), t, o];
      break;
    case ge.UTF8_STRING:
      o === 1 / 0 ? yield* Me(this, Yt, Bs).call(this, i, e, t) : yield [i, s, $m.decode(Me(this, Yt, Ou).call(this, o)), t, o];
      break;
    case ge.ARRAY:
      if (o === 1 / 0) yield* Me(this, Yt, Bs).call(this, i, e, t, !1);
      else {
        const h = Number(o);
        yield [i, s, h, t, u];
        for (let v = 0; v < h; v++) yield* Me(this, Yt, ri).call(this, e + 1);
      }
      break;
    case ge.MAP:
      if (o === 1 / 0) yield* Me(this, Yt, Bs).call(this, i, e, t, !1);
      else {
        const h = Number(o);
        yield [i, s, h, t, u];
        for (let v = 0; v < h; v++) yield* Me(this, Yt, ri).call(this, e), yield* Me(this, Yt, ri).call(this, e);
      }
      break;
    case ge.TAG:
      yield [i, s, o, t, u], yield* Me(this, Yt, ri).call(this, e);
      break;
    case ge.SIMPLE_FLOAT: {
      const h = o;
      c && (o = Xs.create(Number(o))), yield [i, s, o, t, h];
      break;
    }
  }
}, Ou = function(e) {
  const t = $(this, Sr).subarray($(this, Zt), Ct(this, Zt, $(this, Zt) + e));
  if (t.length !== e) throw new Error(`Unexpected end of stream reading ${e} bytes, got ${t.length}`);
  return t;
}, Bs = function* (e, t, n, i = !0) {
  for (yield [e, St.INDEFINITE, 1 / 0, n, 1 / 0]; ; ) {
    const s = Me(this, Yt, ri).call(this, t), o = s.next(), [c, u, h] = o.value;
    if (h === kr.BREAK) {
      yield o.value, s.next();
      return;
    }
    if (i) {
      if (c !== e) throw new Error(`Unmatched major type.  Expected ${e}, got ${c}.`);
      if (u === St.INDEFINITE) throw new Error("New stream started in typed stream");
    }
    yield o.value, yield* s;
  }
}, qe(za, "defaultOptions", { maxDepth: 1024, encoding: "hex", requirePreferred: !1 });
let Qs = za;
const Mm = /* @__PURE__ */ new Map([[St.ZERO, 1], [St.ONE, 2], [St.TWO, 3], [St.FOUR, 5], [St.EIGHT, 9]]), Vm = new Uint8Array(0);
var nn, cr, rn, Ka, B0;
let jn = (nn = class {
  constructor(e, t, n, i) {
    nr(this, Ka);
    qe(this, "parent");
    qe(this, "mt");
    qe(this, "ai");
    qe(this, "left");
    qe(this, "offset");
    qe(this, "count", 0);
    qe(this, "children", []);
    qe(this, "depth", 0);
    nr(this, cr);
    nr(this, rn, null);
    if ([this.mt, this.ai, , this.offset] = e, this.left = t, this.parent = n, Ct(this, cr, i), n && (this.depth = n.depth + 1), this.mt === ge.MAP && ($(this, cr).sortKeys || $(this, cr).rejectDuplicateKeys) && Ct(this, rn, []), $(this, cr).rejectStreaming && this.ai === St.INDEFINITE) throw new Error("Streaming not supported");
  }
  get isStreaming() {
    return this.left === 1 / 0;
  }
  get done() {
    return this.left === 0;
  }
  static create(e, t, n, i) {
    const [s, o, c, u] = e;
    switch (s) {
      case ge.POS_INT:
      case ge.NEG_INT: {
        if (n.rejectInts) throw new Error(`Unexpected integer: ${c}`);
        if (n.rejectLargeNegatives && c < -0x8000000000000000n) throw new Error(`Invalid 65bit negative number: ${c}`);
        let h = c;
        return n.convertUnsafeIntsToFloat && h >= ka.MIN && h <= ka.MAX && (h = Number(c)), n.boxed ? Cs(h, i.toHere(u)) : h;
      }
      case ge.SIMPLE_FLOAT:
        if (o > St.ONE) {
          if (n.rejectFloats) throw new Error(`Decoding unwanted floating point number: ${c}`);
          if (n.rejectNegativeZero && Object.is(c, -0)) throw new Error("Decoding negative zero");
          if (n.rejectLongLoundNaN && isNaN(c)) {
            const h = i.toHere(u);
            if (h.length !== 3 || h[1] !== 126 || h[2] !== 0) throw new Error(`Invalid NaN encoding: "${Hr(h)}"`);
          }
          if (n.rejectSubnormals && Sm(i.toHere(u + 1)), n.rejectLongFloats) {
            const h = Mc(c, { chunkSize: 9, reduceUnsafeNumbers: n.rejectUnsafeFloatInts });
            if (h[0] >> 5 !== s) throw new Error(`Should have been encoded as int, not float: ${c}`);
            if (h.length < Mm.get(o)) throw new Error(`Number should have been encoded shorter: ${c}`);
          }
          if (typeof c == "number" && n.boxed) return Cs(c, i.toHere(u));
        } else {
          if (n.rejectSimple && c instanceof Xs) throw new Error(`Invalid simple value: ${c}`);
          if (n.rejectUndefined && c === void 0) throw new Error("Unexpected undefined");
        }
        return c;
      case ge.BYTE_STRING:
      case ge.UTF8_STRING:
        if (c === 1 / 0) return new n.ParentType(e, 1 / 0, t, n);
        if (n.rejectStringsNotNormalizedAs && typeof c == "string") {
          const h = c.normalize(n.rejectStringsNotNormalizedAs);
          if (c !== h) throw new Error(`String not normalized as "${n.rejectStringsNotNormalizedAs}", got [${pd(c)}] instead of [${pd(h)}]`);
        }
        return n.boxed ? Cs(c, i.toHere(u)) : c;
      case ge.ARRAY:
        return new n.ParentType(e, c, t, n);
      case ge.MAP:
        return new n.ParentType(e, c * 2, t, n);
      case ge.TAG: {
        const h = new n.ParentType(e, 1, t, n);
        return h.children = new Xe(c), h;
      }
    }
    throw new TypeError(`Invalid major type: ${s}`);
  }
  push(e, t, n) {
    if (this.children.push(e), $(this, rn)) {
      const i = Ca(e) || t.toHere(n);
      $(this, rn).push(i);
    }
    return --this.left;
  }
  replaceLast(e, t, n) {
    let i, s = -1 / 0;
    if (this.children instanceof Xe ? (s = 0, i = this.children.contents, this.children.contents = e) : (s = this.children.length - 1, i = this.children[s], this.children[s] = e), $(this, rn)) {
      const o = Ca(e) || n.toHere(t.offset);
      $(this, rn)[s] = o;
    }
    return i;
  }
  convert(e) {
    let t;
    switch (this.mt) {
      case ge.ARRAY:
        t = this.children;
        break;
      case ge.MAP: {
        const n = Me(this, Ka, B0).call(this);
        if ($(this, cr).sortKeys) {
          let i;
          for (const s of n) {
            if (i && $(this, cr).sortKeys(i, s) >= 0) throw new Error(`Duplicate or out of order key: "0x${s[2]}"`);
            i = s;
          }
        } else if ($(this, cr).rejectDuplicateKeys) {
          const i = /* @__PURE__ */ new Set();
          for (const [s, o, c] of n) {
            const u = Hr(c);
            if (i.has(u)) throw new Error(`Duplicate key: "0x${u}"`);
            i.add(u);
          }
        }
        t = !$(this, cr).boxed && !$(this, cr).preferMap && n.every(([i]) => typeof i == "string") ? Object.fromEntries(n) : new Map(n);
        break;
      }
      case ge.BYTE_STRING:
        return vm(this.children);
      case ge.UTF8_STRING: {
        const n = this.children.join("");
        t = $(this, cr).boxed ? Cs(n, e.toHere(this.offset)) : n;
        break;
      }
      case ge.TAG:
        t = this.children.decode($(this, cr));
        break;
      default:
        throw new TypeError(`Invalid mt on convert: ${this.mt}`);
    }
    return $(this, cr).saveOriginal && t && typeof t == "object" && Js(t, e.toHere(this.offset)), t;
  }
}, cr = new WeakMap(), rn = new WeakMap(), Ka = new WeakSet(), B0 = function() {
  const e = this.children, t = e.length;
  if (t % 2) throw new Error("Missing map value");
  const n = new Array(t / 2);
  if ($(this, rn)) for (let i = 0; i < t; i += 2) n[i >> 1] = [e[i], e[i + 1], $(this, rn)[i]];
  else for (let i = 0; i < t; i += 2) n[i >> 1] = [e[i], e[i + 1], Vm];
  return n;
}, qe(nn, "defaultDecodeOptions", { ...Qs.defaultOptions, ParentType: nn, boxed: !1, cde: !1, dcbor: !1, diagnosticSizes: C0.PREFERRED, convertUnsafeIntsToFloat: !1, pretty: !1, preferMap: !1, rejectLargeNegatives: !1, rejectBigInts: !1, rejectDuplicateKeys: !1, rejectFloats: !1, rejectInts: !1, rejectLongLoundNaN: !1, rejectLongFloats: !1, rejectNegativeZero: !1, rejectSimple: !1, rejectStreaming: !1, rejectStringsNotNormalizedAs: null, rejectSubnormals: !1, rejectUndefined: !1, rejectUnsafeFloatInts: !1, saveOriginal: !1, sortKeys: null }), qe(nn, "cdeDecodeOptions", { cde: !0, rejectStreaming: !0, requirePreferred: !0, sortKeys: S0 }), qe(nn, "dcborDecodeOptions", { ...nn.cdeDecodeOptions, dcbor: !0, convertUnsafeIntsToFloat: !0, rejectDuplicateKeys: !0, rejectLargeNegatives: !0, rejectLongLoundNaN: !0, rejectLongFloats: !0, rejectNegativeZero: !0, rejectSimple: !0, rejectUndefined: !0, rejectUnsafeFloatInts: !0, rejectStringsNotNormalizedAs: "NFC" }), nn);
var Ed, Id;
class Tu extends (Id = jn, Ed = kr.ENCODED, Id) {
  constructor(t, n, i, s) {
    super(t, n, i, s);
    qe(this, "depth", 0);
    qe(this, "leaf", !1);
    qe(this, "value");
    qe(this, "length");
    qe(this, Ed);
    this.parent ? this.depth = this.parent.depth + 1 : this.depth = s.initialDepth, [, , this.value, , this.length] = t;
  }
  numBytes() {
    switch (this.ai) {
      case St.ONE:
        return 1;
      case St.TWO:
        return 2;
      case St.FOUR:
        return 4;
      case St.EIGHT:
        return 8;
    }
    return 0;
  }
}
function O0(r) {
  return r instanceof Tu;
}
function Mo(r, e) {
  return r === 1 / 0 ? "Indefinite" : e ? `${r} ${e}${r !== 1 && r !== 1n ? "s" : ""}` : String(r);
}
function il(r) {
  return "".padStart(r, " ");
}
function T0(r, e, t) {
  let n = "";
  n += il(r.depth * 2);
  const i = Ca(r);
  n += Hr(i.subarray(0, 1));
  const s = r.numBytes();
  s && (n += " ", n += Hr(i.subarray(1, s + 1))), n = n.padEnd(e.minCol + 1, " "), n += "-- ", t !== void 0 && (n += il(r.depth * 2), t !== "" && (n += `[${t}] `));
  let o = !1;
  const [c] = r.children;
  switch (r.mt) {
    case ge.POS_INT:
      n += `Unsigned: ${c}`, typeof c == "bigint" && (n += "n");
      break;
    case ge.NEG_INT:
      n += `Negative: ${c}`, typeof c == "bigint" && (n += "n");
      break;
    case ge.BYTE_STRING:
      n += `Bytes (Length: ${Mo(r.length)})`;
      break;
    case ge.UTF8_STRING:
      n += `UTF8 (Length: ${Mo(r.length)})`, r.length !== 1 / 0 && (n += `: ${JSON.stringify(c)}`);
      break;
    case ge.ARRAY:
      n += `Array (Length: ${Mo(r.value, "item")})`;
      break;
    case ge.MAP:
      n += `Map (Length: ${Mo(r.value, "pair")})`;
      break;
    case ge.TAG: {
      n += `Tag #${r.value}`;
      const u = r.children, [h] = u.contents.children, v = new Xe(u.tag, h);
      Js(v, i);
      const b = v.comment(e, r.depth);
      b && (n += ": ", n += b), o || (o = v.noChildren);
      break;
    }
    case ge.SIMPLE_FLOAT:
      c === kr.BREAK ? n += "BREAK" : r.ai > St.ONE ? Object.is(c, -0) ? n += "Float: -0" : n += `Float: ${c}` : (n += "Simple: ", c instanceof Xs ? n += c.value : n += c);
      break;
  }
  if (!o) if (r.leaf) {
    if (n += `
`, i.length > s + 1) {
      const u = il((r.depth + 1) * 2);
      for (let h = s + 1; h < i.length; h += 8) n += u, n += Hr(i.subarray(h, h + 8)), n += `
`;
    }
  } else {
    n += `
`;
    let u = 0;
    for (const h of r.children) {
      if (O0(h)) {
        let v = String(u);
        r.mt === ge.MAP ? v = u % 2 ? `val ${(u - 1) / 2}` : `key ${u / 2}` : r.mt === ge.TAG && (v = ""), n += T0(h, e, v);
      }
      u++;
    }
  }
  return n;
}
const Lm = { ...jn.defaultDecodeOptions, initialDepth: 0, noPrefixHex: !1, minCol: 0 };
function Hm(r, e) {
  const t = { ...Lm, ...e, ParentType: Tu, saveOriginal: !0 }, n = new Qs(r, t);
  let i, s;
  for (const c of n) {
    if (s = jn.create(c, i, t, n), c[2] === kr.BREAK) if (i != null && i.isStreaming) i.left = 1;
    else throw new Error("Unexpected BREAK");
    if (!O0(s)) {
      const v = new Tu(c, 0, i, t);
      v.leaf = !0, v.children.push(s), Js(v, n.toHere(c[3])), s = v;
    }
    let u = (s.depth + 1) * 2;
    const h = s.numBytes();
    for (h && (u += 1, u += h * 2), t.minCol = Math.max(t.minCol, u), i && i.push(s, n, c[3]), i = s; i != null && i.done; ) s = i, s.leaf || Js(s, n.toHere(s.offset)), { parent: i } = i;
  }
  e && (e.minCol = t.minCol);
  let o = t.noPrefixHex ? "" : `0x${Hr(n.toHere(0))}
`;
  return o += T0(s, t), o;
}
const gd = !bm();
function N0(r) {
  if (typeof r == "object" && r) {
    if (r.constructor !== Number) throw new Error(`Expected number: ${r}`);
  } else if (typeof r != "number") throw new Error(`Expected number: ${r}`);
}
function Rn(r) {
  if (typeof r == "object" && r) {
    if (r.constructor !== String) throw new Error(`Expected string: ${r}`);
  } else if (typeof r != "string") throw new Error(`Expected string: ${r}`);
}
function Ai(r) {
  if (!(r instanceof Uint8Array)) throw new Error(`Expected Uint8Array: ${r}`);
}
function P0(r) {
  if (!Array.isArray(r)) throw new Error(`Expected Array: ${r}`);
}
Ut(Map, (r, e, t) => {
  const n = [...r.entries()].map((i) => [i[0], i[1], Mc(i[0], t)]);
  if (t.rejectDuplicateKeys) {
    const i = /* @__PURE__ */ new Set();
    for (const [s, o, c] of n) {
      const u = Hr(c);
      if (i.has(u)) throw new Error(`Duplicate map key: 0x${u}`);
      i.add(u);
    }
  }
  t.sortKeys && n.sort(t.sortKeys), If(r, r.size, ge.MAP, e, t);
  for (const [i, s, o] of n) e.write(o), oi(s, e, t);
});
function vd(r) {
  return Rn(r.contents), new Date(r.contents);
}
vd.comment = (r) => (Rn(r.contents), `(String Date) ${new Date(r.contents).toISOString()}`), Xe.registerDecoder(kt.DATE_STRING, vd);
function md(r) {
  return N0(r.contents), new Date(r.contents * 1e3);
}
md.comment = (r) => (N0(r.contents), `(Epoch Date) ${new Date(r.contents * 1e3).toISOString()}`), Xe.registerDecoder(kt.DATE_EPOCH, md), Ut(Date, (r) => [kt.DATE_EPOCH, r.valueOf() / 1e3]);
function Ta(r, e, t) {
  if (Ai(e.contents), t.rejectBigInts) throw new Error(`Decoding unwanted big integer: ${e}(h'${Hr(e.contents)}')`);
  if (t.requirePreferred && e.contents[0] === 0) throw new Error(`Decoding overly-large bigint: ${e.tag}(h'${Hr(e.contents)})`);
  let n = e.contents.reduce((i, s) => i << 8n | BigInt(s), 0n);
  if (r && (n = -1n - n), t.requirePreferred && n >= Number.MIN_SAFE_INTEGER && n <= Number.MAX_SAFE_INTEGER) throw new Error(`Decoding bigint that could have been int: ${n}n`);
  return t.boxed ? Cs(n, e.contents) : n;
}
const wd = Ta.bind(null, !1), bd = Ta.bind(null, !0);
wd.comment = (r, e) => `(Positive BigInt) ${Ta(!1, r, e)}n`, bd.comment = (r, e) => `(Negative BigInt) ${Ta(!0, r, e)}n`, Xe.registerDecoder(kt.POS_BIGINT, wd), Xe.registerDecoder(kt.NEG_BIGINT, bd);
function sl(r, e) {
  return Ai(r.contents), r;
}
sl.comment = (r, e, t) => {
  Ai(r.contents);
  const n = { ...e, initialDepth: t + 2, noPrefixHex: !0 }, i = Ca(r);
  let s = 2 ** ((i[0] & 31) - 24) + 1;
  const o = i[s] & 31;
  let c = Hr(i.subarray(s, ++s));
  o >= 24 && (c += " ", c += Hr(i.subarray(s, s + 2 ** (o - 24)))), n.minCol = Math.max(n.minCol, (t + 1) * 2 + c.length);
  const u = Hm(r.contents, n);
  let h = `Embedded CBOR
`;
  return h += `${"".padStart((t + 1) * 2, " ")}${c}`.padEnd(n.minCol + 1, " "), h += `-- Bytes (Length: ${r.contents.length})
`, h += u, h;
}, sl.noChildren = !0, Xe.registerDecoder(kt.CBOR, sl), Xe.registerDecoder(kt.URI, (r) => (Rn(r.contents), new URL(r.contents)), "URI"), Ut(URL, (r) => [kt.URI, r.toString()]), Xe.registerDecoder(kt.BASE64URL, (r) => (Rn(r.contents), wm(r.contents)), "Base64url-encoded"), Xe.registerDecoder(kt.BASE64, (r) => (Rn(r.contents), Ef(r.contents)), "Base64-encoded"), Xe.registerDecoder(35, (r) => (Rn(r.contents), new RegExp(r.contents)), "RegExp"), Xe.registerDecoder(21065, (r) => {
  Rn(r.contents);
  let e = r.contents.replace(new RegExp("(?<!\\\\)(?<!\\[(?:[^\\]]|\\\\\\])*)\\.", "g"), `[^
\r]`);
  return e = `^(?:${e})$`, new RegExp(e, "u");
}, "I-RegExp"), Xe.registerDecoder(kt.REGEXP, (r) => {
  if (P0(r.contents), r.contents.length < 1 || r.contents.length > 2) throw new Error(`Invalid RegExp Array: ${r.contents}`);
  return new RegExp(r.contents[0], r.contents[1]);
}, "RegExp"), Ut(RegExp, (r) => [kt.REGEXP, [r.source, r.flags]]), Xe.registerDecoder(64, (r) => (Ai(r.contents), r.contents), "uint8 Typed Array");
function ir(r, e, t) {
  Ai(r.contents);
  let n = r.contents.length;
  if (n % e.BYTES_PER_ELEMENT !== 0) throw new Error(`Number of bytes must be divisible by ${e.BYTES_PER_ELEMENT}, got: ${n}`);
  n /= e.BYTES_PER_ELEMENT;
  const i = new e(n), s = new DataView(r.contents.buffer, r.contents.byteOffset, r.contents.byteLength), o = s[`get${e.name.replace(/Array/, "")}`].bind(s);
  for (let c = 0; c < n; c++) i[c] = o(c * e.BYTES_PER_ELEMENT, t);
  return i;
}
function Nn(r, e, t, n, i) {
  const s = i.forceEndian ?? gd;
  if (Oa(s ? e : t, r, i), Kr(n.byteLength, r, ge.BYTE_STRING), gd === s) r.write(new Uint8Array(n.buffer, n.byteOffset, n.byteLength));
  else {
    const o = `write${n.constructor.name.replace(/Array/, "")}`, c = r[o].bind(r);
    for (const u of n) c(u, s);
  }
}
Xe.registerDecoder(65, (r) => ir(r, Uint16Array, !1), "uint16, big endian, Typed Array"), Xe.registerDecoder(66, (r) => ir(r, Uint32Array, !1), "uint32, big endian, Typed Array"), Xe.registerDecoder(67, (r) => ir(r, BigUint64Array, !1), "uint64, big endian, Typed Array"), Xe.registerDecoder(68, (r) => (Ai(r.contents), new Uint8ClampedArray(r.contents)), "uint8 Typed Array, clamped arithmetic"), Ut(Uint8ClampedArray, (r) => [68, new Uint8Array(r.buffer, r.byteOffset, r.byteLength)]), Xe.registerDecoder(69, (r) => ir(r, Uint16Array, !0), "uint16, little endian, Typed Array"), Ut(Uint16Array, (r, e, t) => Nn(e, 69, 65, r, t)), Xe.registerDecoder(70, (r) => ir(r, Uint32Array, !0), "uint32, little endian, Typed Array"), Ut(Uint32Array, (r, e, t) => Nn(e, 70, 66, r, t)), Xe.registerDecoder(71, (r) => ir(r, BigUint64Array, !0), "uint64, little endian, Typed Array"), Ut(BigUint64Array, (r, e, t) => Nn(e, 71, 67, r, t)), Xe.registerDecoder(72, (r) => (Ai(r.contents), new Int8Array(r.contents)), "sint8 Typed Array"), Ut(Int8Array, (r) => [72, new Uint8Array(r.buffer, r.byteOffset, r.byteLength)]), Xe.registerDecoder(73, (r) => ir(r, Int16Array, !1), "sint16, big endian, Typed Array"), Xe.registerDecoder(74, (r) => ir(r, Int32Array, !1), "sint32, big endian, Typed Array"), Xe.registerDecoder(75, (r) => ir(r, BigInt64Array, !1), "sint64, big endian, Typed Array"), Xe.registerDecoder(77, (r) => ir(r, Int16Array, !0), "sint16, little endian, Typed Array"), Ut(Int16Array, (r, e, t) => Nn(e, 77, 73, r, t)), Xe.registerDecoder(78, (r) => ir(r, Int32Array, !0), "sint32, little endian, Typed Array"), Ut(Int32Array, (r, e, t) => Nn(e, 78, 74, r, t)), Xe.registerDecoder(79, (r) => ir(r, BigInt64Array, !0), "sint64, little endian, Typed Array"), Ut(BigInt64Array, (r, e, t) => Nn(e, 79, 75, r, t)), Xe.registerDecoder(81, (r) => ir(r, Float32Array, !1), "IEEE 754 binary32, big endian, Typed Array"), Xe.registerDecoder(82, (r) => ir(r, Float64Array, !1), "IEEE 754 binary64, big endian, Typed Array"), Xe.registerDecoder(85, (r) => ir(r, Float32Array, !0), "IEEE 754 binary32, little endian, Typed Array"), Ut(Float32Array, (r, e, t) => Nn(e, 85, 81, r, t)), Xe.registerDecoder(86, (r) => ir(r, Float64Array, !0), "IEEE 754 binary64, big endian, Typed Array"), Ut(Float64Array, (r, e, t) => Nn(e, 86, 82, r, t)), Xe.registerDecoder(kt.SET, (r) => (P0(r.contents), new Set(r.contents)), "Set"), Ut(Set, (r) => [kt.SET, [...r]]), Xe.registerDecoder(kt.JSON, (r) => (Rn(r.contents), JSON.parse(r.contents)), "JSON-encoded"), Xe.registerDecoder(kt.SELF_DESCRIBED, (r) => r.contents, "Self-Described"), Xe.registerDecoder(kt.INVALID_16, () => {
  throw new Error(`Tag always invalid: ${kt.INVALID_16}`);
}, "Invalid"), Xe.registerDecoder(kt.INVALID_32, () => {
  throw new Error(`Tag always invalid: ${kt.INVALID_32}`);
}, "Invalid"), Xe.registerDecoder(kt.INVALID_64, () => {
  throw new Error(`Tag always invalid: ${kt.INVALID_64}`);
}, "Invalid");
function ol(r) {
  throw new Error(`Encoding ${r.constructor.name} intentionally unimplmented.  It is not concrete enough to interoperate.  Convert to Uint8Array first.`);
}
Ut(ArrayBuffer, ol), Ut(DataView, ol), typeof SharedArrayBuffer < "u" && Ut(SharedArrayBuffer, ol);
function Vo(r) {
  return [NaN, r.valueOf()];
}
Ut(Boolean, Vo), Ut(Number, Vo), Ut(String, Vo), Ut(BigInt, Vo);
function Na(r, e = {}) {
  const t = { ...jn.defaultDecodeOptions };
  if (e.dcbor ? Object.assign(t, jn.dcborDecodeOptions) : e.cde && Object.assign(t, jn.cdeDecodeOptions), Object.assign(t, e), Object.hasOwn(t, "rejectLongNumbers")) throw new TypeError("rejectLongNumbers has changed to requirePreferred");
  t.boxed && (t.saveOriginal = !0);
  const n = new Qs(r, t);
  let i, s;
  for (const o of n) {
    if (s = jn.create(o, i, t, n), o[2] === kr.BREAK) if (i != null && i.isStreaming) i.left = 0;
    else throw new Error("Unexpected BREAK");
    else i && i.push(s, n, o[3]);
    for (s instanceof jn && (i = s); i != null && i.done; ) {
      s = i.convert(n);
      const c = i.parent;
      c == null || c.replaceLast(s, i, n), i = c;
    }
  }
  return s;
}
new TextEncoder();
var ut;
(function(r) {
  r.assertEqual = (i) => i;
  function e(i) {
  }
  r.assertIs = e;
  function t(i) {
    throw new Error();
  }
  r.assertNever = t, r.arrayToEnum = (i) => {
    const s = {};
    for (const o of i)
      s[o] = o;
    return s;
  }, r.getValidEnumValues = (i) => {
    const s = r.objectKeys(i).filter((c) => typeof i[i[c]] != "number"), o = {};
    for (const c of s)
      o[c] = i[c];
    return r.objectValues(o);
  }, r.objectValues = (i) => r.objectKeys(i).map(function(s) {
    return i[s];
  }), r.objectKeys = typeof Object.keys == "function" ? (i) => Object.keys(i) : (i) => {
    const s = [];
    for (const o in i)
      Object.prototype.hasOwnProperty.call(i, o) && s.push(o);
    return s;
  }, r.find = (i, s) => {
    for (const o of i)
      if (s(o))
        return o;
  }, r.isInteger = typeof Number.isInteger == "function" ? (i) => Number.isInteger(i) : (i) => typeof i == "number" && isFinite(i) && Math.floor(i) === i;
  function n(i, s = " | ") {
    return i.map((o) => typeof o == "string" ? `'${o}'` : o).join(s);
  }
  r.joinValues = n, r.jsonStringifyReplacer = (i, s) => typeof s == "bigint" ? s.toString() : s;
})(ut || (ut = {}));
var Nu;
(function(r) {
  r.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(Nu || (Nu = {}));
const re = ut.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), Un = (r) => {
  switch (typeof r) {
    case "undefined":
      return re.undefined;
    case "string":
      return re.string;
    case "number":
      return isNaN(r) ? re.nan : re.number;
    case "boolean":
      return re.boolean;
    case "function":
      return re.function;
    case "bigint":
      return re.bigint;
    case "symbol":
      return re.symbol;
    case "object":
      return Array.isArray(r) ? re.array : r === null ? re.null : r.then && typeof r.then == "function" && r.catch && typeof r.catch == "function" ? re.promise : typeof Map < "u" && r instanceof Map ? re.map : typeof Set < "u" && r instanceof Set ? re.set : typeof Date < "u" && r instanceof Date ? re.date : re.object;
    default:
      return re.unknown;
  }
}, G = ut.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), Fm = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:");
class Ir extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const t = e || function(s) {
      return s.message;
    }, n = { _errors: [] }, i = (s) => {
      for (const o of s.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(i);
        else if (o.code === "invalid_return_type")
          i(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          i(o.argumentsError);
        else if (o.path.length === 0)
          n._errors.push(t(o));
        else {
          let c = n, u = 0;
          for (; u < o.path.length; ) {
            const h = o.path[u];
            u === o.path.length - 1 ? (c[h] = c[h] || { _errors: [] }, c[h]._errors.push(t(o))) : c[h] = c[h] || { _errors: [] }, c = c[h], u++;
          }
        }
    };
    return i(this), n;
  }
  static assert(e) {
    if (!(e instanceof Ir))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, ut.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, n = [];
    for (const i of this.issues)
      i.path.length > 0 ? (t[i.path[0]] = t[i.path[0]] || [], t[i.path[0]].push(e(i))) : n.push(e(i));
    return { formErrors: n, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
Ir.create = (r) => new Ir(r);
const es = (r, e) => {
  let t;
  switch (r.code) {
    case G.invalid_type:
      r.received === re.undefined ? t = "Required" : t = `Expected ${r.expected}, received ${r.received}`;
      break;
    case G.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(r.expected, ut.jsonStringifyReplacer)}`;
      break;
    case G.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${ut.joinValues(r.keys, ", ")}`;
      break;
    case G.invalid_union:
      t = "Invalid input";
      break;
    case G.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${ut.joinValues(r.options)}`;
      break;
    case G.invalid_enum_value:
      t = `Invalid enum value. Expected ${ut.joinValues(r.options)}, received '${r.received}'`;
      break;
    case G.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case G.invalid_return_type:
      t = "Invalid function return type";
      break;
    case G.invalid_date:
      t = "Invalid date";
      break;
    case G.invalid_string:
      typeof r.validation == "object" ? "includes" in r.validation ? (t = `Invalid input: must include "${r.validation.includes}"`, typeof r.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${r.validation.position}`)) : "startsWith" in r.validation ? t = `Invalid input: must start with "${r.validation.startsWith}"` : "endsWith" in r.validation ? t = `Invalid input: must end with "${r.validation.endsWith}"` : ut.assertNever(r.validation) : r.validation !== "regex" ? t = `Invalid ${r.validation}` : t = "Invalid";
      break;
    case G.too_small:
      r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "more than"} ${r.minimum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "over"} ${r.minimum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${r.minimum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(r.minimum))}` : t = "Invalid input";
      break;
    case G.too_big:
      r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "less than"} ${r.maximum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "under"} ${r.maximum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "bigint" ? t = `BigInt must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly" : r.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(r.maximum))}` : t = "Invalid input";
      break;
    case G.custom:
      t = "Invalid input";
      break;
    case G.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case G.not_multiple_of:
      t = `Number must be a multiple of ${r.multipleOf}`;
      break;
    case G.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, ut.assertNever(r);
  }
  return { message: t };
};
let j0 = es;
function Gm(r) {
  j0 = r;
}
function Pa() {
  return j0;
}
const ja = (r) => {
  const { data: e, path: t, errorMaps: n, issueData: i } = r, s = [...t, ...i.path || []], o = {
    ...i,
    path: s
  };
  if (i.message !== void 0)
    return {
      ...i,
      path: s,
      message: i.message
    };
  let c = "";
  const u = n.filter((h) => !!h).slice().reverse();
  for (const h of u)
    c = h(o, { data: e, defaultError: c }).message;
  return {
    ...i,
    path: s,
    message: c
  };
}, zm = [];
function X(r, e) {
  const t = Pa(), n = ja({
    issueData: e,
    data: r.data,
    path: r.path,
    errorMaps: [
      r.common.contextualErrorMap,
      r.schemaErrorMap,
      t,
      t === es ? void 0 : es
      // then global default map
    ].filter((i) => !!i)
  });
  r.common.issues.push(n);
}
class or {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const n = [];
    for (const i of t) {
      if (i.status === "aborted")
        return Ce;
      i.status === "dirty" && e.dirty(), n.push(i.value);
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(e, t) {
    const n = [];
    for (const i of t) {
      const s = await i.key, o = await i.value;
      n.push({
        key: s,
        value: o
      });
    }
    return or.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, t) {
    const n = {};
    for (const i of t) {
      const { key: s, value: o } = i;
      if (s.status === "aborted" || o.status === "aborted")
        return Ce;
      s.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), s.value !== "__proto__" && (typeof o.value < "u" || i.alwaysSet) && (n[s.value] = o.value);
    }
    return { status: e.value, value: n };
  }
}
const Ce = Object.freeze({
  status: "aborted"
}), Di = (r) => ({ status: "dirty", value: r }), fr = (r) => ({ status: "valid", value: r }), Pu = (r) => r.status === "aborted", ju = (r) => r.status === "dirty", eo = (r) => r.status === "valid", to = (r) => typeof Promise < "u" && r instanceof Promise;
function Ra(r, e, t, n) {
  if (typeof e == "function" ? r !== e || !n : !e.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e.get(r);
}
function R0(r, e, t, n, i) {
  if (typeof e == "function" ? r !== e || !i : !e.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(r, t), t;
}
var Ae;
(function(r) {
  r.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, r.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(Ae || (Ae = {}));
var Os, Ts;
class fn {
  constructor(e, t, n, i) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = i;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const xd = (r, e) => {
  if (eo(e))
    return { success: !0, data: e.value };
  if (!r.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new Ir(r.common.issues);
      return this._error = t, this._error;
    }
  };
};
function ze(r) {
  if (!r)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: n, description: i } = r;
  if (e && (t || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: i } : { errorMap: (o, c) => {
    var u, h;
    const { message: v } = r;
    return o.code === "invalid_enum_value" ? { message: v ?? c.defaultError } : typeof c.data > "u" ? { message: (u = v ?? n) !== null && u !== void 0 ? u : c.defaultError } : o.code !== "invalid_type" ? { message: c.defaultError } : { message: (h = v ?? t) !== null && h !== void 0 ? h : c.defaultError };
  }, description: i };
}
class Ye {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Un(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: Un(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new or(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Un(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (to(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const n = this.safeParse(e, t);
    if (n.success)
      return n.data;
    throw n.error;
  }
  safeParse(e, t) {
    var n;
    const i = {
      common: {
        issues: [],
        async: (n = t == null ? void 0 : t.async) !== null && n !== void 0 ? n : !1,
        contextualErrorMap: t == null ? void 0 : t.errorMap
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Un(e)
    }, s = this._parseSync({ data: e, path: i.path, parent: i });
    return xd(i, s);
  }
  async parseAsync(e, t) {
    const n = await this.safeParseAsync(e, t);
    if (n.success)
      return n.data;
    throw n.error;
  }
  async safeParseAsync(e, t) {
    const n = {
      common: {
        issues: [],
        contextualErrorMap: t == null ? void 0 : t.errorMap,
        async: !0
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Un(e)
    }, i = this._parse({ data: e, path: n.path, parent: n }), s = await (to(i) ? i : Promise.resolve(i));
    return xd(n, s);
  }
  refine(e, t) {
    const n = (i) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(i) : t;
    return this._refinement((i, s) => {
      const o = e(i), c = () => s.addIssue({
        code: G.custom,
        ...n(i)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((u) => u ? !0 : (c(), !1)) : o ? !0 : (c(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((n, i) => e(n) ? !0 : (i.addIssue(typeof t == "function" ? t(n, i) : t), !1));
  }
  _refinement(e) {
    return new qr({
      schema: this,
      typeName: ke.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return cn.create(this, this._def);
  }
  nullable() {
    return Jn.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Fr.create(this, this._def);
  }
  promise() {
    return rs.create(this, this._def);
  }
  or(e) {
    return so.create([this, e], this._def);
  }
  and(e) {
    return oo.create(this, e, this._def);
  }
  transform(e) {
    return new qr({
      ...ze(this._def),
      schema: this,
      typeName: ke.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new fo({
      ...ze(this._def),
      innerType: this,
      defaultValue: t,
      typeName: ke.ZodDefault
    });
  }
  brand() {
    return new kf({
      typeName: ke.ZodBranded,
      type: this,
      ...ze(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new ho({
      ...ze(this._def),
      innerType: this,
      catchValue: t,
      typeName: ke.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return To.create(this, e);
  }
  readonly() {
    return po.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Km = /^c[^\s-]{8,}$/i, qm = /^[0-9a-z]+$/, Zm = /^[0-9A-HJKMNP-TV-Z]{26}$/, Wm = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Ym = /^[a-z0-9_-]{21}$/i, Jm = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Xm = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Qm = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let al;
const e1 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, t1 = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, r1 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, U0 = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", n1 = new RegExp(`^${U0}$`);
function D0(r) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return r.precision ? e = `${e}\\.\\d{${r.precision}}` : r.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function i1(r) {
  return new RegExp(`^${D0(r)}$`);
}
function $0(r) {
  let e = `${U0}T${D0(r)}`;
  const t = [];
  return t.push(r.local ? "Z?" : "Z"), r.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function s1(r, e) {
  return !!((e === "v4" || !e) && e1.test(r) || (e === "v6" || !e) && t1.test(r));
}
class Lr extends Ye {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== re.string) {
      const s = this._getOrReturnCtx(e);
      return X(s, {
        code: G.invalid_type,
        expected: re.string,
        received: s.parsedType
      }), Ce;
    }
    const n = new or();
    let i;
    for (const s of this._def.checks)
      if (s.kind === "min")
        e.data.length < s.value && (i = this._getOrReturnCtx(e, i), X(i, {
          code: G.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), n.dirty());
      else if (s.kind === "max")
        e.data.length > s.value && (i = this._getOrReturnCtx(e, i), X(i, {
          code: G.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), n.dirty());
      else if (s.kind === "length") {
        const o = e.data.length > s.value, c = e.data.length < s.value;
        (o || c) && (i = this._getOrReturnCtx(e, i), o ? X(i, {
          code: G.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : c && X(i, {
          code: G.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), n.dirty());
      } else if (s.kind === "email")
        Xm.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
          validation: "email",
          code: G.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "emoji")
        al || (al = new RegExp(Qm, "u")), al.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
          validation: "emoji",
          code: G.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "uuid")
        Wm.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
          validation: "uuid",
          code: G.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "nanoid")
        Ym.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
          validation: "nanoid",
          code: G.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "cuid")
        Km.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
          validation: "cuid",
          code: G.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "cuid2")
        qm.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
          validation: "cuid2",
          code: G.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "ulid")
        Zm.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
          validation: "ulid",
          code: G.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "url")
        try {
          new URL(e.data);
        } catch {
          i = this._getOrReturnCtx(e, i), X(i, {
            validation: "url",
            code: G.invalid_string,
            message: s.message
          }), n.dirty();
        }
      else s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
        validation: "regex",
        code: G.invalid_string,
        message: s.message
      }), n.dirty())) : s.kind === "trim" ? e.data = e.data.trim() : s.kind === "includes" ? e.data.includes(s.value, s.position) || (i = this._getOrReturnCtx(e, i), X(i, {
        code: G.invalid_string,
        validation: { includes: s.value, position: s.position },
        message: s.message
      }), n.dirty()) : s.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : s.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : s.kind === "startsWith" ? e.data.startsWith(s.value) || (i = this._getOrReturnCtx(e, i), X(i, {
        code: G.invalid_string,
        validation: { startsWith: s.value },
        message: s.message
      }), n.dirty()) : s.kind === "endsWith" ? e.data.endsWith(s.value) || (i = this._getOrReturnCtx(e, i), X(i, {
        code: G.invalid_string,
        validation: { endsWith: s.value },
        message: s.message
      }), n.dirty()) : s.kind === "datetime" ? $0(s).test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
        code: G.invalid_string,
        validation: "datetime",
        message: s.message
      }), n.dirty()) : s.kind === "date" ? n1.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
        code: G.invalid_string,
        validation: "date",
        message: s.message
      }), n.dirty()) : s.kind === "time" ? i1(s).test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
        code: G.invalid_string,
        validation: "time",
        message: s.message
      }), n.dirty()) : s.kind === "duration" ? Jm.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
        validation: "duration",
        code: G.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "ip" ? s1(e.data, s.version) || (i = this._getOrReturnCtx(e, i), X(i, {
        validation: "ip",
        code: G.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64" ? r1.test(e.data) || (i = this._getOrReturnCtx(e, i), X(i, {
        validation: "base64",
        code: G.invalid_string,
        message: s.message
      }), n.dirty()) : ut.assertNever(s);
    return { status: n.value, value: e.data };
  }
  _regex(e, t, n) {
    return this.refinement((i) => e.test(i), {
      validation: t,
      code: G.invalid_string,
      ...Ae.errToObj(n)
    });
  }
  _addCheck(e) {
    return new Lr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...Ae.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...Ae.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...Ae.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...Ae.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...Ae.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...Ae.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...Ae.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...Ae.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...Ae.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...Ae.errToObj(e) });
  }
  datetime(e) {
    var t, n;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (t = e == null ? void 0 : e.offset) !== null && t !== void 0 ? t : !1,
      local: (n = e == null ? void 0 : e.local) !== null && n !== void 0 ? n : !1,
      ...Ae.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...Ae.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...Ae.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...Ae.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...Ae.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...Ae.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...Ae.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...Ae.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...Ae.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...Ae.errToObj(t)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(e) {
    return this.min(1, Ae.errToObj(e));
  }
  trim() {
    return new Lr({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Lr({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Lr({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
Lr.create = (r) => {
  var e;
  return new Lr({
    checks: [],
    typeName: ke.ZodString,
    coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
    ...ze(r)
  });
};
function o1(r, e) {
  const t = (r.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, i = t > n ? t : n, s = parseInt(r.toFixed(i).replace(".", "")), o = parseInt(e.toFixed(i).replace(".", ""));
  return s % o / Math.pow(10, i);
}
class Zn extends Ye {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== re.number) {
      const s = this._getOrReturnCtx(e);
      return X(s, {
        code: G.invalid_type,
        expected: re.number,
        received: s.parsedType
      }), Ce;
    }
    let n;
    const i = new or();
    for (const s of this._def.checks)
      s.kind === "int" ? ut.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), X(n, {
        code: G.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), i.dirty()) : s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (n = this._getOrReturnCtx(e, n), X(n, {
        code: G.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), i.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (n = this._getOrReturnCtx(e, n), X(n, {
        code: G.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), i.dirty()) : s.kind === "multipleOf" ? o1(e.data, s.value) !== 0 && (n = this._getOrReturnCtx(e, n), X(n, {
        code: G.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), i.dirty()) : s.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), X(n, {
        code: G.not_finite,
        message: s.message
      }), i.dirty()) : ut.assertNever(s);
    return { status: i.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, Ae.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, Ae.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, Ae.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, Ae.toString(t));
  }
  setLimit(e, t, n, i) {
    return new Zn({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: n,
          message: Ae.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Zn({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: Ae.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: Ae.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: Ae.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: Ae.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: Ae.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: Ae.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: Ae.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: Ae.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: Ae.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && ut.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const n of this._def.checks) {
      if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
        return !0;
      n.kind === "min" ? (t === null || n.value > t) && (t = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
Zn.create = (r) => new Zn({
  checks: [],
  typeName: ke.ZodNumber,
  coerce: (r == null ? void 0 : r.coerce) || !1,
  ...ze(r)
});
class Wn extends Ye {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== re.bigint) {
      const s = this._getOrReturnCtx(e);
      return X(s, {
        code: G.invalid_type,
        expected: re.bigint,
        received: s.parsedType
      }), Ce;
    }
    let n;
    const i = new or();
    for (const s of this._def.checks)
      s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (n = this._getOrReturnCtx(e, n), X(n, {
        code: G.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), i.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (n = this._getOrReturnCtx(e, n), X(n, {
        code: G.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), i.dirty()) : s.kind === "multipleOf" ? e.data % s.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n), X(n, {
        code: G.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), i.dirty()) : ut.assertNever(s);
    return { status: i.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, Ae.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, Ae.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, Ae.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, Ae.toString(t));
  }
  setLimit(e, t, n, i) {
    return new Wn({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: n,
          message: Ae.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Wn({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: Ae.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: Ae.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: Ae.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: Ae.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: Ae.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
Wn.create = (r) => {
  var e;
  return new Wn({
    checks: [],
    typeName: ke.ZodBigInt,
    coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
    ...ze(r)
  });
};
class ro extends Ye {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== re.boolean) {
      const n = this._getOrReturnCtx(e);
      return X(n, {
        code: G.invalid_type,
        expected: re.boolean,
        received: n.parsedType
      }), Ce;
    }
    return fr(e.data);
  }
}
ro.create = (r) => new ro({
  typeName: ke.ZodBoolean,
  coerce: (r == null ? void 0 : r.coerce) || !1,
  ...ze(r)
});
class Si extends Ye {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== re.date) {
      const s = this._getOrReturnCtx(e);
      return X(s, {
        code: G.invalid_type,
        expected: re.date,
        received: s.parsedType
      }), Ce;
    }
    if (isNaN(e.data.getTime())) {
      const s = this._getOrReturnCtx(e);
      return X(s, {
        code: G.invalid_date
      }), Ce;
    }
    const n = new or();
    let i;
    for (const s of this._def.checks)
      s.kind === "min" ? e.data.getTime() < s.value && (i = this._getOrReturnCtx(e, i), X(i, {
        code: G.too_small,
        message: s.message,
        inclusive: !0,
        exact: !1,
        minimum: s.value,
        type: "date"
      }), n.dirty()) : s.kind === "max" ? e.data.getTime() > s.value && (i = this._getOrReturnCtx(e, i), X(i, {
        code: G.too_big,
        message: s.message,
        inclusive: !0,
        exact: !1,
        maximum: s.value,
        type: "date"
      }), n.dirty()) : ut.assertNever(s);
    return {
      status: n.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Si({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: Ae.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: Ae.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
Si.create = (r) => new Si({
  checks: [],
  coerce: (r == null ? void 0 : r.coerce) || !1,
  typeName: ke.ZodDate,
  ...ze(r)
});
class Ua extends Ye {
  _parse(e) {
    if (this._getType(e) !== re.symbol) {
      const n = this._getOrReturnCtx(e);
      return X(n, {
        code: G.invalid_type,
        expected: re.symbol,
        received: n.parsedType
      }), Ce;
    }
    return fr(e.data);
  }
}
Ua.create = (r) => new Ua({
  typeName: ke.ZodSymbol,
  ...ze(r)
});
class no extends Ye {
  _parse(e) {
    if (this._getType(e) !== re.undefined) {
      const n = this._getOrReturnCtx(e);
      return X(n, {
        code: G.invalid_type,
        expected: re.undefined,
        received: n.parsedType
      }), Ce;
    }
    return fr(e.data);
  }
}
no.create = (r) => new no({
  typeName: ke.ZodUndefined,
  ...ze(r)
});
class io extends Ye {
  _parse(e) {
    if (this._getType(e) !== re.null) {
      const n = this._getOrReturnCtx(e);
      return X(n, {
        code: G.invalid_type,
        expected: re.null,
        received: n.parsedType
      }), Ce;
    }
    return fr(e.data);
  }
}
io.create = (r) => new io({
  typeName: ke.ZodNull,
  ...ze(r)
});
class ts extends Ye {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return fr(e.data);
  }
}
ts.create = (r) => new ts({
  typeName: ke.ZodAny,
  ...ze(r)
});
class li extends Ye {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return fr(e.data);
  }
}
li.create = (r) => new li({
  typeName: ke.ZodUnknown,
  ...ze(r)
});
class kn extends Ye {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return X(t, {
      code: G.invalid_type,
      expected: re.never,
      received: t.parsedType
    }), Ce;
  }
}
kn.create = (r) => new kn({
  typeName: ke.ZodNever,
  ...ze(r)
});
class Da extends Ye {
  _parse(e) {
    if (this._getType(e) !== re.undefined) {
      const n = this._getOrReturnCtx(e);
      return X(n, {
        code: G.invalid_type,
        expected: re.void,
        received: n.parsedType
      }), Ce;
    }
    return fr(e.data);
  }
}
Da.create = (r) => new Da({
  typeName: ke.ZodVoid,
  ...ze(r)
});
class Fr extends Ye {
  _parse(e) {
    const { ctx: t, status: n } = this._processInputParams(e), i = this._def;
    if (t.parsedType !== re.array)
      return X(t, {
        code: G.invalid_type,
        expected: re.array,
        received: t.parsedType
      }), Ce;
    if (i.exactLength !== null) {
      const o = t.data.length > i.exactLength.value, c = t.data.length < i.exactLength.value;
      (o || c) && (X(t, {
        code: o ? G.too_big : G.too_small,
        minimum: c ? i.exactLength.value : void 0,
        maximum: o ? i.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: i.exactLength.message
      }), n.dirty());
    }
    if (i.minLength !== null && t.data.length < i.minLength.value && (X(t, {
      code: G.too_small,
      minimum: i.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.minLength.message
    }), n.dirty()), i.maxLength !== null && t.data.length > i.maxLength.value && (X(t, {
      code: G.too_big,
      maximum: i.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.maxLength.message
    }), n.dirty()), t.common.async)
      return Promise.all([...t.data].map((o, c) => i.type._parseAsync(new fn(t, o, t.path, c)))).then((o) => or.mergeArray(n, o));
    const s = [...t.data].map((o, c) => i.type._parseSync(new fn(t, o, t.path, c)));
    return or.mergeArray(n, s);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new Fr({
      ...this._def,
      minLength: { value: e, message: Ae.toString(t) }
    });
  }
  max(e, t) {
    return new Fr({
      ...this._def,
      maxLength: { value: e, message: Ae.toString(t) }
    });
  }
  length(e, t) {
    return new Fr({
      ...this._def,
      exactLength: { value: e, message: Ae.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Fr.create = (r, e) => new Fr({
  type: r,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: ke.ZodArray,
  ...ze(e)
});
function Ri(r) {
  if (r instanceof Tt) {
    const e = {};
    for (const t in r.shape) {
      const n = r.shape[t];
      e[t] = cn.create(Ri(n));
    }
    return new Tt({
      ...r._def,
      shape: () => e
    });
  } else return r instanceof Fr ? new Fr({
    ...r._def,
    type: Ri(r.element)
  }) : r instanceof cn ? cn.create(Ri(r.unwrap())) : r instanceof Jn ? Jn.create(Ri(r.unwrap())) : r instanceof hn ? hn.create(r.items.map((e) => Ri(e))) : r;
}
class Tt extends Ye {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = ut.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== re.object) {
      const h = this._getOrReturnCtx(e);
      return X(h, {
        code: G.invalid_type,
        expected: re.object,
        received: h.parsedType
      }), Ce;
    }
    const { status: n, ctx: i } = this._processInputParams(e), { shape: s, keys: o } = this._getCached(), c = [];
    if (!(this._def.catchall instanceof kn && this._def.unknownKeys === "strip"))
      for (const h in i.data)
        o.includes(h) || c.push(h);
    const u = [];
    for (const h of o) {
      const v = s[h], b = i.data[h];
      u.push({
        key: { status: "valid", value: h },
        value: v._parse(new fn(i, b, i.path, h)),
        alwaysSet: h in i.data
      });
    }
    if (this._def.catchall instanceof kn) {
      const h = this._def.unknownKeys;
      if (h === "passthrough")
        for (const v of c)
          u.push({
            key: { status: "valid", value: v },
            value: { status: "valid", value: i.data[v] }
          });
      else if (h === "strict")
        c.length > 0 && (X(i, {
          code: G.unrecognized_keys,
          keys: c
        }), n.dirty());
      else if (h !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const h = this._def.catchall;
      for (const v of c) {
        const b = i.data[v];
        u.push({
          key: { status: "valid", value: v },
          value: h._parse(
            new fn(i, b, i.path, v)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: v in i.data
        });
      }
    }
    return i.common.async ? Promise.resolve().then(async () => {
      const h = [];
      for (const v of u) {
        const b = await v.key, H = await v.value;
        h.push({
          key: b,
          value: H,
          alwaysSet: v.alwaysSet
        });
      }
      return h;
    }).then((h) => or.mergeObjectSync(n, h)) : or.mergeObjectSync(n, u);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return Ae.errToObj, new Tt({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, n) => {
          var i, s, o, c;
          const u = (o = (s = (i = this._def).errorMap) === null || s === void 0 ? void 0 : s.call(i, t, n).message) !== null && o !== void 0 ? o : n.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (c = Ae.errToObj(e).message) !== null && c !== void 0 ? c : u
          } : {
            message: u
          };
        }
      } : {}
    });
  }
  strip() {
    return new Tt({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new Tt({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new Tt({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new Tt({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: ke.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new Tt({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return ut.objectKeys(e).forEach((n) => {
      e[n] && this.shape[n] && (t[n] = this.shape[n]);
    }), new Tt({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return ut.objectKeys(this.shape).forEach((n) => {
      e[n] || (t[n] = this.shape[n]);
    }), new Tt({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return Ri(this);
  }
  partial(e) {
    const t = {};
    return ut.objectKeys(this.shape).forEach((n) => {
      const i = this.shape[n];
      e && !e[n] ? t[n] = i : t[n] = i.optional();
    }), new Tt({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return ut.objectKeys(this.shape).forEach((n) => {
      if (e && !e[n])
        t[n] = this.shape[n];
      else {
        let s = this.shape[n];
        for (; s instanceof cn; )
          s = s._def.innerType;
        t[n] = s;
      }
    }), new Tt({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return M0(ut.objectKeys(this.shape));
  }
}
Tt.create = (r, e) => new Tt({
  shape: () => r,
  unknownKeys: "strip",
  catchall: kn.create(),
  typeName: ke.ZodObject,
  ...ze(e)
});
Tt.strictCreate = (r, e) => new Tt({
  shape: () => r,
  unknownKeys: "strict",
  catchall: kn.create(),
  typeName: ke.ZodObject,
  ...ze(e)
});
Tt.lazycreate = (r, e) => new Tt({
  shape: r,
  unknownKeys: "strip",
  catchall: kn.create(),
  typeName: ke.ZodObject,
  ...ze(e)
});
class so extends Ye {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), n = this._def.options;
    function i(s) {
      for (const c of s)
        if (c.result.status === "valid")
          return c.result;
      for (const c of s)
        if (c.result.status === "dirty")
          return t.common.issues.push(...c.ctx.common.issues), c.result;
      const o = s.map((c) => new Ir(c.ctx.common.issues));
      return X(t, {
        code: G.invalid_union,
        unionErrors: o
      }), Ce;
    }
    if (t.common.async)
      return Promise.all(n.map(async (s) => {
        const o = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await s._parseAsync({
            data: t.data,
            path: t.path,
            parent: o
          }),
          ctx: o
        };
      })).then(i);
    {
      let s;
      const o = [];
      for (const u of n) {
        const h = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, v = u._parseSync({
          data: t.data,
          path: t.path,
          parent: h
        });
        if (v.status === "valid")
          return v;
        v.status === "dirty" && !s && (s = { result: v, ctx: h }), h.common.issues.length && o.push(h.common.issues);
      }
      if (s)
        return t.common.issues.push(...s.ctx.common.issues), s.result;
      const c = o.map((u) => new Ir(u));
      return X(t, {
        code: G.invalid_union,
        unionErrors: c
      }), Ce;
    }
  }
  get options() {
    return this._def.options;
  }
}
so.create = (r, e) => new so({
  options: r,
  typeName: ke.ZodUnion,
  ...ze(e)
});
const vn = (r) => r instanceof co ? vn(r.schema) : r instanceof qr ? vn(r.innerType()) : r instanceof lo ? [r.value] : r instanceof Yn ? r.options : r instanceof uo ? ut.objectValues(r.enum) : r instanceof fo ? vn(r._def.innerType) : r instanceof no ? [void 0] : r instanceof io ? [null] : r instanceof cn ? [void 0, ...vn(r.unwrap())] : r instanceof Jn ? [null, ...vn(r.unwrap())] : r instanceof kf || r instanceof po ? vn(r.unwrap()) : r instanceof ho ? vn(r._def.innerType) : [];
class Vc extends Ye {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== re.object)
      return X(t, {
        code: G.invalid_type,
        expected: re.object,
        received: t.parsedType
      }), Ce;
    const n = this.discriminator, i = t.data[n], s = this.optionsMap.get(i);
    return s ? t.common.async ? s._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : s._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (X(t, {
      code: G.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [n]
    }), Ce);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, t, n) {
    const i = /* @__PURE__ */ new Map();
    for (const s of t) {
      const o = vn(s.shape[e]);
      if (!o.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const c of o) {
        if (i.has(c))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(c)}`);
        i.set(c, s);
      }
    }
    return new Vc({
      typeName: ke.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: i,
      ...ze(n)
    });
  }
}
function Ru(r, e) {
  const t = Un(r), n = Un(e);
  if (r === e)
    return { valid: !0, data: r };
  if (t === re.object && n === re.object) {
    const i = ut.objectKeys(e), s = ut.objectKeys(r).filter((c) => i.indexOf(c) !== -1), o = { ...r, ...e };
    for (const c of s) {
      const u = Ru(r[c], e[c]);
      if (!u.valid)
        return { valid: !1 };
      o[c] = u.data;
    }
    return { valid: !0, data: o };
  } else if (t === re.array && n === re.array) {
    if (r.length !== e.length)
      return { valid: !1 };
    const i = [];
    for (let s = 0; s < r.length; s++) {
      const o = r[s], c = e[s], u = Ru(o, c);
      if (!u.valid)
        return { valid: !1 };
      i.push(u.data);
    }
    return { valid: !0, data: i };
  } else return t === re.date && n === re.date && +r == +e ? { valid: !0, data: r } : { valid: !1 };
}
class oo extends Ye {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e), i = (s, o) => {
      if (Pu(s) || Pu(o))
        return Ce;
      const c = Ru(s.value, o.value);
      return c.valid ? ((ju(s) || ju(o)) && t.dirty(), { status: t.value, value: c.data }) : (X(n, {
        code: G.invalid_intersection_types
      }), Ce);
    };
    return n.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }),
      this._def.right._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      })
    ]).then(([s, o]) => i(s, o)) : i(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
}
oo.create = (r, e, t) => new oo({
  left: r,
  right: e,
  typeName: ke.ZodIntersection,
  ...ze(t)
});
class hn extends Ye {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== re.array)
      return X(n, {
        code: G.invalid_type,
        expected: re.array,
        received: n.parsedType
      }), Ce;
    if (n.data.length < this._def.items.length)
      return X(n, {
        code: G.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), Ce;
    !this._def.rest && n.data.length > this._def.items.length && (X(n, {
      code: G.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const s = [...n.data].map((o, c) => {
      const u = this._def.items[c] || this._def.rest;
      return u ? u._parse(new fn(n, o, n.path, c)) : null;
    }).filter((o) => !!o);
    return n.common.async ? Promise.all(s).then((o) => or.mergeArray(t, o)) : or.mergeArray(t, s);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new hn({
      ...this._def,
      rest: e
    });
  }
}
hn.create = (r, e) => {
  if (!Array.isArray(r))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new hn({
    items: r,
    typeName: ke.ZodTuple,
    rest: null,
    ...ze(e)
  });
};
class ao extends Ye {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== re.object)
      return X(n, {
        code: G.invalid_type,
        expected: re.object,
        received: n.parsedType
      }), Ce;
    const i = [], s = this._def.keyType, o = this._def.valueType;
    for (const c in n.data)
      i.push({
        key: s._parse(new fn(n, c, n.path, c)),
        value: o._parse(new fn(n, n.data[c], n.path, c)),
        alwaysSet: c in n.data
      });
    return n.common.async ? or.mergeObjectAsync(t, i) : or.mergeObjectSync(t, i);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, n) {
    return t instanceof Ye ? new ao({
      keyType: e,
      valueType: t,
      typeName: ke.ZodRecord,
      ...ze(n)
    }) : new ao({
      keyType: Lr.create(),
      valueType: e,
      typeName: ke.ZodRecord,
      ...ze(t)
    });
  }
}
class $a extends Ye {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== re.map)
      return X(n, {
        code: G.invalid_type,
        expected: re.map,
        received: n.parsedType
      }), Ce;
    const i = this._def.keyType, s = this._def.valueType, o = [...n.data.entries()].map(([c, u], h) => ({
      key: i._parse(new fn(n, c, n.path, [h, "key"])),
      value: s._parse(new fn(n, u, n.path, [h, "value"]))
    }));
    if (n.common.async) {
      const c = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const u of o) {
          const h = await u.key, v = await u.value;
          if (h.status === "aborted" || v.status === "aborted")
            return Ce;
          (h.status === "dirty" || v.status === "dirty") && t.dirty(), c.set(h.value, v.value);
        }
        return { status: t.value, value: c };
      });
    } else {
      const c = /* @__PURE__ */ new Map();
      for (const u of o) {
        const h = u.key, v = u.value;
        if (h.status === "aborted" || v.status === "aborted")
          return Ce;
        (h.status === "dirty" || v.status === "dirty") && t.dirty(), c.set(h.value, v.value);
      }
      return { status: t.value, value: c };
    }
  }
}
$a.create = (r, e, t) => new $a({
  valueType: e,
  keyType: r,
  typeName: ke.ZodMap,
  ...ze(t)
});
class _i extends Ye {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== re.set)
      return X(n, {
        code: G.invalid_type,
        expected: re.set,
        received: n.parsedType
      }), Ce;
    const i = this._def;
    i.minSize !== null && n.data.size < i.minSize.value && (X(n, {
      code: G.too_small,
      minimum: i.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.minSize.message
    }), t.dirty()), i.maxSize !== null && n.data.size > i.maxSize.value && (X(n, {
      code: G.too_big,
      maximum: i.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.maxSize.message
    }), t.dirty());
    const s = this._def.valueType;
    function o(u) {
      const h = /* @__PURE__ */ new Set();
      for (const v of u) {
        if (v.status === "aborted")
          return Ce;
        v.status === "dirty" && t.dirty(), h.add(v.value);
      }
      return { status: t.value, value: h };
    }
    const c = [...n.data.values()].map((u, h) => s._parse(new fn(n, u, n.path, h)));
    return n.common.async ? Promise.all(c).then((u) => o(u)) : o(c);
  }
  min(e, t) {
    return new _i({
      ...this._def,
      minSize: { value: e, message: Ae.toString(t) }
    });
  }
  max(e, t) {
    return new _i({
      ...this._def,
      maxSize: { value: e, message: Ae.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
_i.create = (r, e) => new _i({
  valueType: r,
  minSize: null,
  maxSize: null,
  typeName: ke.ZodSet,
  ...ze(e)
});
class Vi extends Ye {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== re.function)
      return X(t, {
        code: G.invalid_type,
        expected: re.function,
        received: t.parsedType
      }), Ce;
    function n(c, u) {
      return ja({
        data: c,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Pa(),
          es
        ].filter((h) => !!h),
        issueData: {
          code: G.invalid_arguments,
          argumentsError: u
        }
      });
    }
    function i(c, u) {
      return ja({
        data: c,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Pa(),
          es
        ].filter((h) => !!h),
        issueData: {
          code: G.invalid_return_type,
          returnTypeError: u
        }
      });
    }
    const s = { errorMap: t.common.contextualErrorMap }, o = t.data;
    if (this._def.returns instanceof rs) {
      const c = this;
      return fr(async function(...u) {
        const h = new Ir([]), v = await c._def.args.parseAsync(u, s).catch((T) => {
          throw h.addIssue(n(u, T)), h;
        }), b = await Reflect.apply(o, this, v);
        return await c._def.returns._def.type.parseAsync(b, s).catch((T) => {
          throw h.addIssue(i(b, T)), h;
        });
      });
    } else {
      const c = this;
      return fr(function(...u) {
        const h = c._def.args.safeParse(u, s);
        if (!h.success)
          throw new Ir([n(u, h.error)]);
        const v = Reflect.apply(o, this, h.data), b = c._def.returns.safeParse(v, s);
        if (!b.success)
          throw new Ir([i(v, b.error)]);
        return b.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new Vi({
      ...this._def,
      args: hn.create(e).rest(li.create())
    });
  }
  returns(e) {
    return new Vi({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, n) {
    return new Vi({
      args: e || hn.create([]).rest(li.create()),
      returns: t || li.create(),
      typeName: ke.ZodFunction,
      ...ze(n)
    });
  }
}
class co extends Ye {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
co.create = (r, e) => new co({
  getter: r,
  typeName: ke.ZodLazy,
  ...ze(e)
});
class lo extends Ye {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return X(t, {
        received: t.data,
        code: G.invalid_literal,
        expected: this._def.value
      }), Ce;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
lo.create = (r, e) => new lo({
  value: r,
  typeName: ke.ZodLiteral,
  ...ze(e)
});
function M0(r, e) {
  return new Yn({
    values: r,
    typeName: ke.ZodEnum,
    ...ze(e)
  });
}
class Yn extends Ye {
  constructor() {
    super(...arguments), Os.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), n = this._def.values;
      return X(t, {
        expected: ut.joinValues(n),
        received: t.parsedType,
        code: G.invalid_type
      }), Ce;
    }
    if (Ra(this, Os) || R0(this, Os, new Set(this._def.values)), !Ra(this, Os).has(e.data)) {
      const t = this._getOrReturnCtx(e), n = this._def.values;
      return X(t, {
        received: t.data,
        code: G.invalid_enum_value,
        options: n
      }), Ce;
    }
    return fr(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return Yn.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return Yn.create(this.options.filter((n) => !e.includes(n)), {
      ...this._def,
      ...t
    });
  }
}
Os = /* @__PURE__ */ new WeakMap();
Yn.create = M0;
class uo extends Ye {
  constructor() {
    super(...arguments), Ts.set(this, void 0);
  }
  _parse(e) {
    const t = ut.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
    if (n.parsedType !== re.string && n.parsedType !== re.number) {
      const i = ut.objectValues(t);
      return X(n, {
        expected: ut.joinValues(i),
        received: n.parsedType,
        code: G.invalid_type
      }), Ce;
    }
    if (Ra(this, Ts) || R0(this, Ts, new Set(ut.getValidEnumValues(this._def.values))), !Ra(this, Ts).has(e.data)) {
      const i = ut.objectValues(t);
      return X(n, {
        received: n.data,
        code: G.invalid_enum_value,
        options: i
      }), Ce;
    }
    return fr(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Ts = /* @__PURE__ */ new WeakMap();
uo.create = (r, e) => new uo({
  values: r,
  typeName: ke.ZodNativeEnum,
  ...ze(e)
});
class rs extends Ye {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== re.promise && t.common.async === !1)
      return X(t, {
        code: G.invalid_type,
        expected: re.promise,
        received: t.parsedType
      }), Ce;
    const n = t.parsedType === re.promise ? t.data : Promise.resolve(t.data);
    return fr(n.then((i) => this._def.type.parseAsync(i, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
rs.create = (r, e) => new rs({
  type: r,
  typeName: ke.ZodPromise,
  ...ze(e)
});
class qr extends Ye {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ke.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e), i = this._def.effect || null, s = {
      addIssue: (o) => {
        X(n, o), o.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (s.addIssue = s.addIssue.bind(s), i.type === "preprocess") {
      const o = i.transform(n.data, s);
      if (n.common.async)
        return Promise.resolve(o).then(async (c) => {
          if (t.value === "aborted")
            return Ce;
          const u = await this._def.schema._parseAsync({
            data: c,
            path: n.path,
            parent: n
          });
          return u.status === "aborted" ? Ce : u.status === "dirty" || t.value === "dirty" ? Di(u.value) : u;
        });
      {
        if (t.value === "aborted")
          return Ce;
        const c = this._def.schema._parseSync({
          data: o,
          path: n.path,
          parent: n
        });
        return c.status === "aborted" ? Ce : c.status === "dirty" || t.value === "dirty" ? Di(c.value) : c;
      }
    }
    if (i.type === "refinement") {
      const o = (c) => {
        const u = i.refinement(c, s);
        if (n.common.async)
          return Promise.resolve(u);
        if (u instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return c;
      };
      if (n.common.async === !1) {
        const c = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return c.status === "aborted" ? Ce : (c.status === "dirty" && t.dirty(), o(c.value), { status: t.value, value: c.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((c) => c.status === "aborted" ? Ce : (c.status === "dirty" && t.dirty(), o(c.value).then(() => ({ status: t.value, value: c.value }))));
    }
    if (i.type === "transform")
      if (n.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!eo(o))
          return o;
        const c = i.transform(o.value, s);
        if (c instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: c };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((o) => eo(o) ? Promise.resolve(i.transform(o.value, s)).then((c) => ({ status: t.value, value: c })) : o);
    ut.assertNever(i);
  }
}
qr.create = (r, e, t) => new qr({
  schema: r,
  typeName: ke.ZodEffects,
  effect: e,
  ...ze(t)
});
qr.createWithPreprocess = (r, e, t) => new qr({
  schema: e,
  effect: { type: "preprocess", transform: r },
  typeName: ke.ZodEffects,
  ...ze(t)
});
class cn extends Ye {
  _parse(e) {
    return this._getType(e) === re.undefined ? fr(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
cn.create = (r, e) => new cn({
  innerType: r,
  typeName: ke.ZodOptional,
  ...ze(e)
});
class Jn extends Ye {
  _parse(e) {
    return this._getType(e) === re.null ? fr(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Jn.create = (r, e) => new Jn({
  innerType: r,
  typeName: ke.ZodNullable,
  ...ze(e)
});
class fo extends Ye {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let n = t.data;
    return t.parsedType === re.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
fo.create = (r, e) => new fo({
  innerType: r,
  typeName: ke.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...ze(e)
});
class ho extends Ye {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), n = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, i = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n
      }
    });
    return to(i) ? i.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Ir(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new Ir(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ho.create = (r, e) => new ho({
  innerType: r,
  typeName: ke.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...ze(e)
});
class Ma extends Ye {
  _parse(e) {
    if (this._getType(e) !== re.nan) {
      const n = this._getOrReturnCtx(e);
      return X(n, {
        code: G.invalid_type,
        expected: re.nan,
        received: n.parsedType
      }), Ce;
    }
    return { status: "valid", value: e.data };
  }
}
Ma.create = (r) => new Ma({
  typeName: ke.ZodNaN,
  ...ze(r)
});
const a1 = Symbol("zod_brand");
class kf extends Ye {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), n = t.data;
    return this._def.type._parse({
      data: n,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class To extends Ye {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return s.status === "aborted" ? Ce : s.status === "dirty" ? (t.dirty(), Di(s.value)) : this._def.out._parseAsync({
          data: s.value,
          path: n.path,
          parent: n
        });
      })();
    {
      const i = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      return i.status === "aborted" ? Ce : i.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: i.value
      }) : this._def.out._parseSync({
        data: i.value,
        path: n.path,
        parent: n
      });
    }
  }
  static create(e, t) {
    return new To({
      in: e,
      out: t,
      typeName: ke.ZodPipeline
    });
  }
}
class po extends Ye {
  _parse(e) {
    const t = this._def.innerType._parse(e), n = (i) => (eo(i) && (i.value = Object.freeze(i.value)), i);
    return to(t) ? t.then((i) => n(i)) : n(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
po.create = (r, e) => new po({
  innerType: r,
  typeName: ke.ZodReadonly,
  ...ze(e)
});
function V0(r, e = {}, t) {
  return r ? ts.create().superRefine((n, i) => {
    var s, o;
    if (!r(n)) {
      const c = typeof e == "function" ? e(n) : typeof e == "string" ? { message: e } : e, u = (o = (s = c.fatal) !== null && s !== void 0 ? s : t) !== null && o !== void 0 ? o : !0, h = typeof c == "string" ? { message: c } : c;
      i.addIssue({ code: "custom", ...h, fatal: u });
    }
  }) : ts.create();
}
const c1 = {
  object: Tt.lazycreate
};
var ke;
(function(r) {
  r.ZodString = "ZodString", r.ZodNumber = "ZodNumber", r.ZodNaN = "ZodNaN", r.ZodBigInt = "ZodBigInt", r.ZodBoolean = "ZodBoolean", r.ZodDate = "ZodDate", r.ZodSymbol = "ZodSymbol", r.ZodUndefined = "ZodUndefined", r.ZodNull = "ZodNull", r.ZodAny = "ZodAny", r.ZodUnknown = "ZodUnknown", r.ZodNever = "ZodNever", r.ZodVoid = "ZodVoid", r.ZodArray = "ZodArray", r.ZodObject = "ZodObject", r.ZodUnion = "ZodUnion", r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", r.ZodIntersection = "ZodIntersection", r.ZodTuple = "ZodTuple", r.ZodRecord = "ZodRecord", r.ZodMap = "ZodMap", r.ZodSet = "ZodSet", r.ZodFunction = "ZodFunction", r.ZodLazy = "ZodLazy", r.ZodLiteral = "ZodLiteral", r.ZodEnum = "ZodEnum", r.ZodEffects = "ZodEffects", r.ZodNativeEnum = "ZodNativeEnum", r.ZodOptional = "ZodOptional", r.ZodNullable = "ZodNullable", r.ZodDefault = "ZodDefault", r.ZodCatch = "ZodCatch", r.ZodPromise = "ZodPromise", r.ZodBranded = "ZodBranded", r.ZodPipeline = "ZodPipeline", r.ZodReadonly = "ZodReadonly";
})(ke || (ke = {}));
const l1 = (r, e = {
  message: `Input not instance of ${r.name}`
}) => V0((t) => t instanceof r, e), L0 = Lr.create, H0 = Zn.create, u1 = Ma.create, f1 = Wn.create, F0 = ro.create, h1 = Si.create, d1 = Ua.create, p1 = no.create, y1 = io.create, g1 = ts.create, v1 = li.create, m1 = kn.create, w1 = Da.create, b1 = Fr.create, x1 = Tt.create, A1 = Tt.strictCreate, S1 = so.create, _1 = Vc.create, E1 = oo.create, I1 = hn.create, k1 = ao.create, C1 = $a.create, B1 = _i.create, O1 = Vi.create, T1 = co.create, N1 = lo.create, P1 = Yn.create, j1 = uo.create, R1 = rs.create, Ad = qr.create, U1 = cn.create, D1 = Jn.create, $1 = qr.createWithPreprocess, M1 = To.create, V1 = () => L0().optional(), L1 = () => H0().optional(), H1 = () => F0().optional(), F1 = {
  string: (r) => Lr.create({ ...r, coerce: !0 }),
  number: (r) => Zn.create({ ...r, coerce: !0 }),
  boolean: (r) => ro.create({
    ...r,
    coerce: !0
  }),
  bigint: (r) => Wn.create({ ...r, coerce: !0 }),
  date: (r) => Si.create({ ...r, coerce: !0 })
}, G1 = Ce;
var Ot = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: es,
  setErrorMap: Gm,
  getErrorMap: Pa,
  makeIssue: ja,
  EMPTY_PATH: zm,
  addIssueToContext: X,
  ParseStatus: or,
  INVALID: Ce,
  DIRTY: Di,
  OK: fr,
  isAborted: Pu,
  isDirty: ju,
  isValid: eo,
  isAsync: to,
  get util() {
    return ut;
  },
  get objectUtil() {
    return Nu;
  },
  ZodParsedType: re,
  getParsedType: Un,
  ZodType: Ye,
  datetimeRegex: $0,
  ZodString: Lr,
  ZodNumber: Zn,
  ZodBigInt: Wn,
  ZodBoolean: ro,
  ZodDate: Si,
  ZodSymbol: Ua,
  ZodUndefined: no,
  ZodNull: io,
  ZodAny: ts,
  ZodUnknown: li,
  ZodNever: kn,
  ZodVoid: Da,
  ZodArray: Fr,
  ZodObject: Tt,
  ZodUnion: so,
  ZodDiscriminatedUnion: Vc,
  ZodIntersection: oo,
  ZodTuple: hn,
  ZodRecord: ao,
  ZodMap: $a,
  ZodSet: _i,
  ZodFunction: Vi,
  ZodLazy: co,
  ZodLiteral: lo,
  ZodEnum: Yn,
  ZodNativeEnum: uo,
  ZodPromise: rs,
  ZodEffects: qr,
  ZodTransformer: qr,
  ZodOptional: cn,
  ZodNullable: Jn,
  ZodDefault: fo,
  ZodCatch: ho,
  ZodNaN: Ma,
  BRAND: a1,
  ZodBranded: kf,
  ZodPipeline: To,
  ZodReadonly: po,
  custom: V0,
  Schema: Ye,
  ZodSchema: Ye,
  late: c1,
  get ZodFirstPartyTypeKind() {
    return ke;
  },
  coerce: F1,
  any: g1,
  array: b1,
  bigint: f1,
  boolean: F0,
  date: h1,
  discriminatedUnion: _1,
  effect: Ad,
  enum: P1,
  function: O1,
  instanceof: l1,
  intersection: E1,
  lazy: T1,
  literal: N1,
  map: C1,
  nan: u1,
  nativeEnum: j1,
  never: m1,
  null: y1,
  nullable: D1,
  number: H0,
  object: x1,
  oboolean: H1,
  onumber: L1,
  optional: U1,
  ostring: V1,
  pipeline: M1,
  preprocess: $1,
  promise: R1,
  record: k1,
  set: B1,
  strictObject: A1,
  string: L0,
  symbol: d1,
  transformer: Ad,
  tuple: I1,
  undefined: p1,
  union: S1,
  unknown: v1,
  void: w1,
  NEVER: G1,
  ZodIssueCode: G,
  quotelessJson: Fm,
  ZodError: Ir
});
const Va = new Uint8Array([48, 130, 2, 17, 48, 130, 1, 150, 160, 3, 2, 1, 2, 2, 17, 0, 249, 49, 117, 104, 27, 144, 175, 225, 29, 70, 204, 180, 228, 231, 248, 86, 48, 10, 6, 8, 42, 134, 72, 206, 61, 4, 3, 3, 48, 73, 49, 11, 48, 9, 6, 3, 85, 4, 6, 19, 2, 85, 83, 49, 15, 48, 13, 6, 3, 85, 4, 10, 12, 6, 65, 109, 97, 122, 111, 110, 49, 12, 48, 10, 6, 3, 85, 4, 11, 12, 3, 65, 87, 83, 49, 27, 48, 25, 6, 3, 85, 4, 3, 12, 18, 97, 119, 115, 46, 110, 105, 116, 114, 111, 45, 101, 110, 99, 108, 97, 118, 101, 115, 48, 30, 23, 13, 49, 57, 49, 48, 50, 56, 49, 51, 50, 56, 48, 53, 90, 23, 13, 52, 57, 49, 48, 50, 56, 49, 52, 50, 56, 48, 53, 90, 48, 73, 49, 11, 48, 9, 6, 3, 85, 4, 6, 19, 2, 85, 83, 49, 15, 48, 13, 6, 3, 85, 4, 10, 12, 6, 65, 109, 97, 122, 111, 110, 49, 12, 48, 10, 6, 3, 85, 4, 11, 12, 3, 65, 87, 83, 49, 27, 48, 25, 6, 3, 85, 4, 3, 12, 18, 97, 119, 115, 46, 110, 105, 116, 114, 111, 45, 101, 110, 99, 108, 97, 118, 101, 115, 48, 118, 48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5, 43, 129, 4, 0, 34, 3, 98, 0, 4, 252, 2, 84, 235, 166, 8, 193, 243, 104, 112, 226, 154, 218, 144, 190, 70, 56, 50, 146, 115, 110, 137, 75, 255, 246, 114, 217, 137, 68, 75, 80, 81, 229, 52, 164, 177, 246, 219, 227, 192, 188, 88, 26, 50, 183, 177, 118, 7, 14, 222, 18, 214, 154, 63, 234, 33, 27, 102, 231, 82, 207, 125, 209, 221, 9, 95, 111, 19, 112, 244, 23, 8, 67, 217, 220, 16, 1, 33, 228, 207, 99, 1, 40, 9, 102, 68, 135, 201, 121, 98, 132, 48, 77, 197, 63, 244, 163, 66, 48, 64, 48, 15, 6, 3, 85, 29, 19, 1, 1, 255, 4, 5, 48, 3, 1, 1, 255, 48, 29, 6, 3, 85, 29, 14, 4, 22, 4, 20, 144, 37, 181, 13, 217, 5, 71, 231, 150, 195, 150, 250, 114, 157, 207, 153, 169, 223, 75, 150, 48, 14, 6, 3, 85, 29, 15, 1, 1, 255, 4, 4, 3, 2, 1, 134, 48, 10, 6, 8, 42, 134, 72, 206, 61, 4, 3, 3, 3, 105, 0, 48, 102, 2, 49, 0, 163, 127, 47, 145, 161, 201, 189, 94, 231, 184, 98, 124, 22, 152, 210, 85, 3, 142, 31, 3, 67, 249, 91, 99, 169, 98, 140, 61, 57, 128, 149, 69, 161, 30, 188, 191, 46, 59, 85, 216, 174, 238, 113, 180, 195, 214, 173, 243, 2, 49, 0, 162, 243, 155, 22, 5, 178, 112, 40, 165, 221, 75, 160, 105, 181, 1, 110, 101, 180, 251, 222, 143, 224, 6, 29, 106, 83, 25, 127, 156, 218, 245, 217, 67, 188, 97, 252, 43, 235, 3, 203, 111, 238, 141, 35, 2, 243, 223, 246]);
if (!Va || Va.length === 0)
  throw new Error("AWS root certificate is empty or not loaded correctly");
const z1 = Ot.object({
  module_id: Ot.string().min(1),
  digest: Ot.literal("SHA384"),
  timestamp: Ot.number().min(1677721600),
  pcrs: Ot.map(Ot.number(), Ot.instanceof(Uint8Array)),
  certificate: Ot.instanceof(Uint8Array),
  cabundle: Ot.array(Ot.instanceof(Uint8Array)),
  public_key: Ot.nullable(Ot.instanceof(Uint8Array)),
  user_data: Ot.nullable(Ot.instanceof(Uint8Array)),
  nonce: Ot.nullable(Ot.instanceof(Uint8Array))
}), K1 = Ot.object({
  protected: Ot.instanceof(Uint8Array),
  // There's an "unprotected" header in the CBOR, but we never use it
  payload: Ot.instanceof(Uint8Array),
  signature: Ot.instanceof(Uint8Array)
});
async function q1(r) {
  try {
    if (!r)
      throw new Error("Attestation document is empty.");
    const e = $s(r), t = Na(e), n = t[0], i = t[2], s = t[3];
    return K1.parse({
      protected: n,
      payload: i,
      signature: s
    });
  } catch (e) {
    throw console.error("Error parsing document data:", e), new Error("Failed to parse document data.");
  }
}
async function Z1(r) {
  try {
    const e = Na(r);
    return z1.parse(e);
  } catch (e) {
    throw console.error("Error parsing document payload:", e), new Error("Failed to parse document payload.");
  }
}
function W1(r, e) {
  const t = [
    "Signature1",
    // Context string
    r,
    // Protected headers
    new Uint8Array(0),
    // external_aad (empty ByteBuf in Rust)
    e
    // payload
  ];
  return Mc(t);
}
async function Y1(r, e) {
  try {
    console.log("SIGNATURE:"), console.log(Er(r.signature));
    const t = W1(r.protected, r.payload), n = await crypto.subtle.digest("SHA-384", t);
    return console.log("SIGNATURE STRUCTURE DIGEST:"), console.log(Er(new Uint8Array(n))), await crypto.subtle.verify(
      // TODO: these could be derived from the document, but we're hardcoding them for now
      {
        name: "ECDSA",
        hash: "SHA-384"
      },
      e,
      r.signature,
      t
    );
  } catch (t) {
    throw console.error("Error verifying signature:", t), t instanceof Error ? new Error(`Signature verification failed: ${t.message}`) : new Error(`Signature verification failed: ${t}`);
  }
}
async function Ei(r, e, t) {
  try {
    const n = await q1(r), i = await Z1(n.payload);
    if (!i.nonce)
      throw new Error("Attestation document does not have a nonce.");
    const o = new TextDecoder("utf-8").decode(i.nonce);
    if (t !== o)
      throw console.log("Nonce mismatch"), console.log("Provided nonce:", t), console.log("Attestation document nonce:", o), new Error("Attestation document's nonce does not match the provided nonce.");
    const c = [], u = Er(i.cabundle[0]);
    if (u !== Er(e))
      throw console.error("Root cert doesn't match first cert"), console.log("First cert base64:", u), console.log("Trusted root cert base64:", Er(e)), new Error("Root cert does not match first cert in attestation document.");
    for (let I = 0; I < i.cabundle.length; I++) {
      const P = new xi(i.cabundle[I]);
      c.push(P);
    }
    const h = new xi(i.certificate), b = await new ym({
      certificates: c
    }).build(h);
    console.log("Chain items:", b);
    const T = (/* @__PURE__ */ new Date()).getTime();
    for (let I = 0; I < b.length; I++) {
      const P = b[I];
      if (console.log("CERT: ", I), console.log(P.subject), console.log("Not before:", P.notBefore), console.log("Not after:", P.notAfter), console.log(P.toString("pem")), P.notBefore.getTime() > T || P.notAfter.getTime() < T)
        throw new Error("Certificate is expired.");
      console.log(`Certificate ${I} is not expired.`);
    }
    if (b.length !== i.cabundle.length + 1)
      throw new Error("Certificate chain length does not match length of cabundle.");
    const m = h.publicKey;
    console.log("PUBLIC KEY:"), console.log(Er(new Uint8Array(m.rawData)));
    const A = await m.export(), k = await Y1(n, A);
    if (console.log("Signature verified:", k), !k)
      throw new Error("Signature verification failed.");
    return i;
  } catch (n) {
    throw console.error("Error verifying attestation document:", n), n;
  }
}
const J1 = Ot.object({
  public_key: Ot.nullable(Ot.instanceof(Uint8Array))
});
async function X1(r) {
  const e = $s(r), n = Na(e)[2], i = Na(n);
  return await J1.parse(i);
}
async function Q1(r, e) {
  try {
    const t = await _w(r, e), n = e || we();
    return n && (n === "http://127.0.0.1:3000" || n === "http://localhost:3000" || n === "http://0.0.0.0:3000") ? (console.log("DEV MODE: Using fake attestation document"), await X1(t)) : await Ei(t, Va, r);
  } catch (t) {
    throw t instanceof Error ? (console.error("Error verifying attestation document:", t), new Error(`Couldn't process attestation document: ${t.message}`)) : (console.error("Error verifying attestation document:", t), new Error("Couldn't process attestation document."));
  }
}
function ew(r) {
  throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var G0 = { exports: {} };
const tw = {}, rw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tw
}, Symbol.toStringTag, { value: "Module" })), nw = /* @__PURE__ */ bg(rw);
(function(r) {
  (function(e) {
    var t = function(l) {
      var p, d = new Float64Array(16);
      if (l) for (p = 0; p < l.length; p++) d[p] = l[p];
      return d;
    }, n = function() {
      throw new Error("no PRNG");
    }, i = new Uint8Array(16), s = new Uint8Array(32);
    s[0] = 9;
    var o = t(), c = t([1]), u = t([56129, 1]), h = t([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), v = t([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), b = t([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), H = t([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), T = t([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    function m(l, p, d, a) {
      l[p] = d >> 24 & 255, l[p + 1] = d >> 16 & 255, l[p + 2] = d >> 8 & 255, l[p + 3] = d & 255, l[p + 4] = a >> 24 & 255, l[p + 5] = a >> 16 & 255, l[p + 6] = a >> 8 & 255, l[p + 7] = a & 255;
    }
    function A(l, p, d, a, g) {
      var S, E = 0;
      for (S = 0; S < g; S++) E |= l[p + S] ^ d[a + S];
      return (1 & E - 1 >>> 8) - 1;
    }
    function k(l, p, d, a) {
      return A(l, p, d, a, 16);
    }
    function I(l, p, d, a) {
      return A(l, p, d, a, 32);
    }
    function P(l, p, d, a) {
      for (var g = a[0] & 255 | (a[1] & 255) << 8 | (a[2] & 255) << 16 | (a[3] & 255) << 24, S = d[0] & 255 | (d[1] & 255) << 8 | (d[2] & 255) << 16 | (d[3] & 255) << 24, E = d[4] & 255 | (d[5] & 255) << 8 | (d[6] & 255) << 16 | (d[7] & 255) << 24, R = d[8] & 255 | (d[9] & 255) << 8 | (d[10] & 255) << 16 | (d[11] & 255) << 24, z = d[12] & 255 | (d[13] & 255) << 8 | (d[14] & 255) << 16 | (d[15] & 255) << 24, ve = a[4] & 255 | (a[5] & 255) << 8 | (a[6] & 255) << 16 | (a[7] & 255) << 24, J = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, ht = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, oe = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, Be = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, Te = a[8] & 255 | (a[9] & 255) << 8 | (a[10] & 255) << 16 | (a[11] & 255) << 24, He = d[16] & 255 | (d[17] & 255) << 8 | (d[18] & 255) << 16 | (d[19] & 255) << 24, $e = d[20] & 255 | (d[21] & 255) << 8 | (d[22] & 255) << 16 | (d[23] & 255) << 24, Ne = d[24] & 255 | (d[25] & 255) << 8 | (d[26] & 255) << 16 | (d[27] & 255) << 24, je = d[28] & 255 | (d[29] & 255) << 8 | (d[30] & 255) << 16 | (d[31] & 255) << 24, Pe = a[12] & 255 | (a[13] & 255) << 8 | (a[14] & 255) << 16 | (a[15] & 255) << 24, ue = g, xe = S, te = E, fe = R, ye = z, Y = ve, B = J, O = ht, V = oe, j = Be, U = Te, L = He, Ee = $e, Fe = Ne, Ke = je, Ge = Pe, w, Je = 0; Je < 20; Je += 2)
        w = ue + Ee | 0, ye ^= w << 7 | w >>> 25, w = ye + ue | 0, V ^= w << 9 | w >>> 23, w = V + ye | 0, Ee ^= w << 13 | w >>> 19, w = Ee + V | 0, ue ^= w << 18 | w >>> 14, w = Y + xe | 0, j ^= w << 7 | w >>> 25, w = j + Y | 0, Fe ^= w << 9 | w >>> 23, w = Fe + j | 0, xe ^= w << 13 | w >>> 19, w = xe + Fe | 0, Y ^= w << 18 | w >>> 14, w = U + B | 0, Ke ^= w << 7 | w >>> 25, w = Ke + U | 0, te ^= w << 9 | w >>> 23, w = te + Ke | 0, B ^= w << 13 | w >>> 19, w = B + te | 0, U ^= w << 18 | w >>> 14, w = Ge + L | 0, fe ^= w << 7 | w >>> 25, w = fe + Ge | 0, O ^= w << 9 | w >>> 23, w = O + fe | 0, L ^= w << 13 | w >>> 19, w = L + O | 0, Ge ^= w << 18 | w >>> 14, w = ue + fe | 0, xe ^= w << 7 | w >>> 25, w = xe + ue | 0, te ^= w << 9 | w >>> 23, w = te + xe | 0, fe ^= w << 13 | w >>> 19, w = fe + te | 0, ue ^= w << 18 | w >>> 14, w = Y + ye | 0, B ^= w << 7 | w >>> 25, w = B + Y | 0, O ^= w << 9 | w >>> 23, w = O + B | 0, ye ^= w << 13 | w >>> 19, w = ye + O | 0, Y ^= w << 18 | w >>> 14, w = U + j | 0, L ^= w << 7 | w >>> 25, w = L + U | 0, V ^= w << 9 | w >>> 23, w = V + L | 0, j ^= w << 13 | w >>> 19, w = j + V | 0, U ^= w << 18 | w >>> 14, w = Ge + Ke | 0, Ee ^= w << 7 | w >>> 25, w = Ee + Ge | 0, Fe ^= w << 9 | w >>> 23, w = Fe + Ee | 0, Ke ^= w << 13 | w >>> 19, w = Ke + Fe | 0, Ge ^= w << 18 | w >>> 14;
      ue = ue + g | 0, xe = xe + S | 0, te = te + E | 0, fe = fe + R | 0, ye = ye + z | 0, Y = Y + ve | 0, B = B + J | 0, O = O + ht | 0, V = V + oe | 0, j = j + Be | 0, U = U + Te | 0, L = L + He | 0, Ee = Ee + $e | 0, Fe = Fe + Ne | 0, Ke = Ke + je | 0, Ge = Ge + Pe | 0, l[0] = ue >>> 0 & 255, l[1] = ue >>> 8 & 255, l[2] = ue >>> 16 & 255, l[3] = ue >>> 24 & 255, l[4] = xe >>> 0 & 255, l[5] = xe >>> 8 & 255, l[6] = xe >>> 16 & 255, l[7] = xe >>> 24 & 255, l[8] = te >>> 0 & 255, l[9] = te >>> 8 & 255, l[10] = te >>> 16 & 255, l[11] = te >>> 24 & 255, l[12] = fe >>> 0 & 255, l[13] = fe >>> 8 & 255, l[14] = fe >>> 16 & 255, l[15] = fe >>> 24 & 255, l[16] = ye >>> 0 & 255, l[17] = ye >>> 8 & 255, l[18] = ye >>> 16 & 255, l[19] = ye >>> 24 & 255, l[20] = Y >>> 0 & 255, l[21] = Y >>> 8 & 255, l[22] = Y >>> 16 & 255, l[23] = Y >>> 24 & 255, l[24] = B >>> 0 & 255, l[25] = B >>> 8 & 255, l[26] = B >>> 16 & 255, l[27] = B >>> 24 & 255, l[28] = O >>> 0 & 255, l[29] = O >>> 8 & 255, l[30] = O >>> 16 & 255, l[31] = O >>> 24 & 255, l[32] = V >>> 0 & 255, l[33] = V >>> 8 & 255, l[34] = V >>> 16 & 255, l[35] = V >>> 24 & 255, l[36] = j >>> 0 & 255, l[37] = j >>> 8 & 255, l[38] = j >>> 16 & 255, l[39] = j >>> 24 & 255, l[40] = U >>> 0 & 255, l[41] = U >>> 8 & 255, l[42] = U >>> 16 & 255, l[43] = U >>> 24 & 255, l[44] = L >>> 0 & 255, l[45] = L >>> 8 & 255, l[46] = L >>> 16 & 255, l[47] = L >>> 24 & 255, l[48] = Ee >>> 0 & 255, l[49] = Ee >>> 8 & 255, l[50] = Ee >>> 16 & 255, l[51] = Ee >>> 24 & 255, l[52] = Fe >>> 0 & 255, l[53] = Fe >>> 8 & 255, l[54] = Fe >>> 16 & 255, l[55] = Fe >>> 24 & 255, l[56] = Ke >>> 0 & 255, l[57] = Ke >>> 8 & 255, l[58] = Ke >>> 16 & 255, l[59] = Ke >>> 24 & 255, l[60] = Ge >>> 0 & 255, l[61] = Ge >>> 8 & 255, l[62] = Ge >>> 16 & 255, l[63] = Ge >>> 24 & 255;
    }
    function D(l, p, d, a) {
      for (var g = a[0] & 255 | (a[1] & 255) << 8 | (a[2] & 255) << 16 | (a[3] & 255) << 24, S = d[0] & 255 | (d[1] & 255) << 8 | (d[2] & 255) << 16 | (d[3] & 255) << 24, E = d[4] & 255 | (d[5] & 255) << 8 | (d[6] & 255) << 16 | (d[7] & 255) << 24, R = d[8] & 255 | (d[9] & 255) << 8 | (d[10] & 255) << 16 | (d[11] & 255) << 24, z = d[12] & 255 | (d[13] & 255) << 8 | (d[14] & 255) << 16 | (d[15] & 255) << 24, ve = a[4] & 255 | (a[5] & 255) << 8 | (a[6] & 255) << 16 | (a[7] & 255) << 24, J = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, ht = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, oe = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, Be = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, Te = a[8] & 255 | (a[9] & 255) << 8 | (a[10] & 255) << 16 | (a[11] & 255) << 24, He = d[16] & 255 | (d[17] & 255) << 8 | (d[18] & 255) << 16 | (d[19] & 255) << 24, $e = d[20] & 255 | (d[21] & 255) << 8 | (d[22] & 255) << 16 | (d[23] & 255) << 24, Ne = d[24] & 255 | (d[25] & 255) << 8 | (d[26] & 255) << 16 | (d[27] & 255) << 24, je = d[28] & 255 | (d[29] & 255) << 8 | (d[30] & 255) << 16 | (d[31] & 255) << 24, Pe = a[12] & 255 | (a[13] & 255) << 8 | (a[14] & 255) << 16 | (a[15] & 255) << 24, ue = g, xe = S, te = E, fe = R, ye = z, Y = ve, B = J, O = ht, V = oe, j = Be, U = Te, L = He, Ee = $e, Fe = Ne, Ke = je, Ge = Pe, w, Je = 0; Je < 20; Je += 2)
        w = ue + Ee | 0, ye ^= w << 7 | w >>> 25, w = ye + ue | 0, V ^= w << 9 | w >>> 23, w = V + ye | 0, Ee ^= w << 13 | w >>> 19, w = Ee + V | 0, ue ^= w << 18 | w >>> 14, w = Y + xe | 0, j ^= w << 7 | w >>> 25, w = j + Y | 0, Fe ^= w << 9 | w >>> 23, w = Fe + j | 0, xe ^= w << 13 | w >>> 19, w = xe + Fe | 0, Y ^= w << 18 | w >>> 14, w = U + B | 0, Ke ^= w << 7 | w >>> 25, w = Ke + U | 0, te ^= w << 9 | w >>> 23, w = te + Ke | 0, B ^= w << 13 | w >>> 19, w = B + te | 0, U ^= w << 18 | w >>> 14, w = Ge + L | 0, fe ^= w << 7 | w >>> 25, w = fe + Ge | 0, O ^= w << 9 | w >>> 23, w = O + fe | 0, L ^= w << 13 | w >>> 19, w = L + O | 0, Ge ^= w << 18 | w >>> 14, w = ue + fe | 0, xe ^= w << 7 | w >>> 25, w = xe + ue | 0, te ^= w << 9 | w >>> 23, w = te + xe | 0, fe ^= w << 13 | w >>> 19, w = fe + te | 0, ue ^= w << 18 | w >>> 14, w = Y + ye | 0, B ^= w << 7 | w >>> 25, w = B + Y | 0, O ^= w << 9 | w >>> 23, w = O + B | 0, ye ^= w << 13 | w >>> 19, w = ye + O | 0, Y ^= w << 18 | w >>> 14, w = U + j | 0, L ^= w << 7 | w >>> 25, w = L + U | 0, V ^= w << 9 | w >>> 23, w = V + L | 0, j ^= w << 13 | w >>> 19, w = j + V | 0, U ^= w << 18 | w >>> 14, w = Ge + Ke | 0, Ee ^= w << 7 | w >>> 25, w = Ee + Ge | 0, Fe ^= w << 9 | w >>> 23, w = Fe + Ee | 0, Ke ^= w << 13 | w >>> 19, w = Ke + Fe | 0, Ge ^= w << 18 | w >>> 14;
      l[0] = ue >>> 0 & 255, l[1] = ue >>> 8 & 255, l[2] = ue >>> 16 & 255, l[3] = ue >>> 24 & 255, l[4] = Y >>> 0 & 255, l[5] = Y >>> 8 & 255, l[6] = Y >>> 16 & 255, l[7] = Y >>> 24 & 255, l[8] = U >>> 0 & 255, l[9] = U >>> 8 & 255, l[10] = U >>> 16 & 255, l[11] = U >>> 24 & 255, l[12] = Ge >>> 0 & 255, l[13] = Ge >>> 8 & 255, l[14] = Ge >>> 16 & 255, l[15] = Ge >>> 24 & 255, l[16] = B >>> 0 & 255, l[17] = B >>> 8 & 255, l[18] = B >>> 16 & 255, l[19] = B >>> 24 & 255, l[20] = O >>> 0 & 255, l[21] = O >>> 8 & 255, l[22] = O >>> 16 & 255, l[23] = O >>> 24 & 255, l[24] = V >>> 0 & 255, l[25] = V >>> 8 & 255, l[26] = V >>> 16 & 255, l[27] = V >>> 24 & 255, l[28] = j >>> 0 & 255, l[29] = j >>> 8 & 255, l[30] = j >>> 16 & 255, l[31] = j >>> 24 & 255;
    }
    function de(l, p, d, a) {
      P(l, p, d, a);
    }
    function et(l, p, d, a) {
      D(l, p, d, a);
    }
    var Re = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
    function Oe(l, p, d, a, g, S, E) {
      var R = new Uint8Array(16), z = new Uint8Array(64), ve, J;
      for (J = 0; J < 16; J++) R[J] = 0;
      for (J = 0; J < 8; J++) R[J] = S[J];
      for (; g >= 64; ) {
        for (de(z, R, E, Re), J = 0; J < 64; J++) l[p + J] = d[a + J] ^ z[J];
        for (ve = 1, J = 8; J < 16; J++)
          ve = ve + (R[J] & 255) | 0, R[J] = ve & 255, ve >>>= 8;
        g -= 64, p += 64, a += 64;
      }
      if (g > 0)
        for (de(z, R, E, Re), J = 0; J < g; J++) l[p + J] = d[a + J] ^ z[J];
      return 0;
    }
    function Le(l, p, d, a, g) {
      var S = new Uint8Array(16), E = new Uint8Array(64), R, z;
      for (z = 0; z < 16; z++) S[z] = 0;
      for (z = 0; z < 8; z++) S[z] = a[z];
      for (; d >= 64; ) {
        for (de(E, S, g, Re), z = 0; z < 64; z++) l[p + z] = E[z];
        for (R = 1, z = 8; z < 16; z++)
          R = R + (S[z] & 255) | 0, S[z] = R & 255, R >>>= 8;
        d -= 64, p += 64;
      }
      if (d > 0)
        for (de(E, S, g, Re), z = 0; z < d; z++) l[p + z] = E[z];
      return 0;
    }
    function gt(l, p, d, a, g) {
      var S = new Uint8Array(32);
      et(S, a, g, Re);
      for (var E = new Uint8Array(8), R = 0; R < 8; R++) E[R] = a[R + 16];
      return Le(l, p, d, E, S);
    }
    function yt(l, p, d, a, g, S, E) {
      var R = new Uint8Array(32);
      et(R, S, E, Re);
      for (var z = new Uint8Array(8), ve = 0; ve < 8; ve++) z[ve] = S[ve + 16];
      return Oe(l, p, d, a, g, z, R);
    }
    var Se = function(l) {
      this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0;
      var p, d, a, g, S, E, R, z;
      p = l[0] & 255 | (l[1] & 255) << 8, this.r[0] = p & 8191, d = l[2] & 255 | (l[3] & 255) << 8, this.r[1] = (p >>> 13 | d << 3) & 8191, a = l[4] & 255 | (l[5] & 255) << 8, this.r[2] = (d >>> 10 | a << 6) & 7939, g = l[6] & 255 | (l[7] & 255) << 8, this.r[3] = (a >>> 7 | g << 9) & 8191, S = l[8] & 255 | (l[9] & 255) << 8, this.r[4] = (g >>> 4 | S << 12) & 255, this.r[5] = S >>> 1 & 8190, E = l[10] & 255 | (l[11] & 255) << 8, this.r[6] = (S >>> 14 | E << 2) & 8191, R = l[12] & 255 | (l[13] & 255) << 8, this.r[7] = (E >>> 11 | R << 5) & 8065, z = l[14] & 255 | (l[15] & 255) << 8, this.r[8] = (R >>> 8 | z << 8) & 8191, this.r[9] = z >>> 5 & 127, this.pad[0] = l[16] & 255 | (l[17] & 255) << 8, this.pad[1] = l[18] & 255 | (l[19] & 255) << 8, this.pad[2] = l[20] & 255 | (l[21] & 255) << 8, this.pad[3] = l[22] & 255 | (l[23] & 255) << 8, this.pad[4] = l[24] & 255 | (l[25] & 255) << 8, this.pad[5] = l[26] & 255 | (l[27] & 255) << 8, this.pad[6] = l[28] & 255 | (l[29] & 255) << 8, this.pad[7] = l[30] & 255 | (l[31] & 255) << 8;
    };
    Se.prototype.blocks = function(l, p, d) {
      for (var a = this.fin ? 0 : 2048, g, S, E, R, z, ve, J, ht, oe, Be, Te, He, $e, Ne, je, Pe, ue, xe, te, fe = this.h[0], ye = this.h[1], Y = this.h[2], B = this.h[3], O = this.h[4], V = this.h[5], j = this.h[6], U = this.h[7], L = this.h[8], Ee = this.h[9], Fe = this.r[0], Ke = this.r[1], Ge = this.r[2], w = this.r[3], Je = this.r[4], dt = this.r[5], pt = this.r[6], We = this.r[7], ct = this.r[8], lt = this.r[9]; d >= 16; )
        g = l[p + 0] & 255 | (l[p + 1] & 255) << 8, fe += g & 8191, S = l[p + 2] & 255 | (l[p + 3] & 255) << 8, ye += (g >>> 13 | S << 3) & 8191, E = l[p + 4] & 255 | (l[p + 5] & 255) << 8, Y += (S >>> 10 | E << 6) & 8191, R = l[p + 6] & 255 | (l[p + 7] & 255) << 8, B += (E >>> 7 | R << 9) & 8191, z = l[p + 8] & 255 | (l[p + 9] & 255) << 8, O += (R >>> 4 | z << 12) & 8191, V += z >>> 1 & 8191, ve = l[p + 10] & 255 | (l[p + 11] & 255) << 8, j += (z >>> 14 | ve << 2) & 8191, J = l[p + 12] & 255 | (l[p + 13] & 255) << 8, U += (ve >>> 11 | J << 5) & 8191, ht = l[p + 14] & 255 | (l[p + 15] & 255) << 8, L += (J >>> 8 | ht << 8) & 8191, Ee += ht >>> 5 | a, oe = 0, Be = oe, Be += fe * Fe, Be += ye * (5 * lt), Be += Y * (5 * ct), Be += B * (5 * We), Be += O * (5 * pt), oe = Be >>> 13, Be &= 8191, Be += V * (5 * dt), Be += j * (5 * Je), Be += U * (5 * w), Be += L * (5 * Ge), Be += Ee * (5 * Ke), oe += Be >>> 13, Be &= 8191, Te = oe, Te += fe * Ke, Te += ye * Fe, Te += Y * (5 * lt), Te += B * (5 * ct), Te += O * (5 * We), oe = Te >>> 13, Te &= 8191, Te += V * (5 * pt), Te += j * (5 * dt), Te += U * (5 * Je), Te += L * (5 * w), Te += Ee * (5 * Ge), oe += Te >>> 13, Te &= 8191, He = oe, He += fe * Ge, He += ye * Ke, He += Y * Fe, He += B * (5 * lt), He += O * (5 * ct), oe = He >>> 13, He &= 8191, He += V * (5 * We), He += j * (5 * pt), He += U * (5 * dt), He += L * (5 * Je), He += Ee * (5 * w), oe += He >>> 13, He &= 8191, $e = oe, $e += fe * w, $e += ye * Ge, $e += Y * Ke, $e += B * Fe, $e += O * (5 * lt), oe = $e >>> 13, $e &= 8191, $e += V * (5 * ct), $e += j * (5 * We), $e += U * (5 * pt), $e += L * (5 * dt), $e += Ee * (5 * Je), oe += $e >>> 13, $e &= 8191, Ne = oe, Ne += fe * Je, Ne += ye * w, Ne += Y * Ge, Ne += B * Ke, Ne += O * Fe, oe = Ne >>> 13, Ne &= 8191, Ne += V * (5 * lt), Ne += j * (5 * ct), Ne += U * (5 * We), Ne += L * (5 * pt), Ne += Ee * (5 * dt), oe += Ne >>> 13, Ne &= 8191, je = oe, je += fe * dt, je += ye * Je, je += Y * w, je += B * Ge, je += O * Ke, oe = je >>> 13, je &= 8191, je += V * Fe, je += j * (5 * lt), je += U * (5 * ct), je += L * (5 * We), je += Ee * (5 * pt), oe += je >>> 13, je &= 8191, Pe = oe, Pe += fe * pt, Pe += ye * dt, Pe += Y * Je, Pe += B * w, Pe += O * Ge, oe = Pe >>> 13, Pe &= 8191, Pe += V * Ke, Pe += j * Fe, Pe += U * (5 * lt), Pe += L * (5 * ct), Pe += Ee * (5 * We), oe += Pe >>> 13, Pe &= 8191, ue = oe, ue += fe * We, ue += ye * pt, ue += Y * dt, ue += B * Je, ue += O * w, oe = ue >>> 13, ue &= 8191, ue += V * Ge, ue += j * Ke, ue += U * Fe, ue += L * (5 * lt), ue += Ee * (5 * ct), oe += ue >>> 13, ue &= 8191, xe = oe, xe += fe * ct, xe += ye * We, xe += Y * pt, xe += B * dt, xe += O * Je, oe = xe >>> 13, xe &= 8191, xe += V * w, xe += j * Ge, xe += U * Ke, xe += L * Fe, xe += Ee * (5 * lt), oe += xe >>> 13, xe &= 8191, te = oe, te += fe * lt, te += ye * ct, te += Y * We, te += B * pt, te += O * dt, oe = te >>> 13, te &= 8191, te += V * Je, te += j * w, te += U * Ge, te += L * Ke, te += Ee * Fe, oe += te >>> 13, te &= 8191, oe = (oe << 2) + oe | 0, oe = oe + Be | 0, Be = oe & 8191, oe = oe >>> 13, Te += oe, fe = Be, ye = Te, Y = He, B = $e, O = Ne, V = je, j = Pe, U = ue, L = xe, Ee = te, p += 16, d -= 16;
      this.h[0] = fe, this.h[1] = ye, this.h[2] = Y, this.h[3] = B, this.h[4] = O, this.h[5] = V, this.h[6] = j, this.h[7] = U, this.h[8] = L, this.h[9] = Ee;
    }, Se.prototype.finish = function(l, p) {
      var d = new Uint16Array(10), a, g, S, E;
      if (this.leftover) {
        for (E = this.leftover, this.buffer[E++] = 1; E < 16; E++) this.buffer[E] = 0;
        this.fin = 1, this.blocks(this.buffer, 0, 16);
      }
      for (a = this.h[1] >>> 13, this.h[1] &= 8191, E = 2; E < 10; E++)
        this.h[E] += a, a = this.h[E] >>> 13, this.h[E] &= 8191;
      for (this.h[0] += a * 5, a = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += a, a = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += a, d[0] = this.h[0] + 5, a = d[0] >>> 13, d[0] &= 8191, E = 1; E < 10; E++)
        d[E] = this.h[E] + a, a = d[E] >>> 13, d[E] &= 8191;
      for (d[9] -= 8192, g = (a ^ 1) - 1, E = 0; E < 10; E++) d[E] &= g;
      for (g = ~g, E = 0; E < 10; E++) this.h[E] = this.h[E] & g | d[E];
      for (this.h[0] = (this.h[0] | this.h[1] << 13) & 65535, this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535, this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535, this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535, this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535, this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535, this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535, this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535, S = this.h[0] + this.pad[0], this.h[0] = S & 65535, E = 1; E < 8; E++)
        S = (this.h[E] + this.pad[E] | 0) + (S >>> 16) | 0, this.h[E] = S & 65535;
      l[p + 0] = this.h[0] >>> 0 & 255, l[p + 1] = this.h[0] >>> 8 & 255, l[p + 2] = this.h[1] >>> 0 & 255, l[p + 3] = this.h[1] >>> 8 & 255, l[p + 4] = this.h[2] >>> 0 & 255, l[p + 5] = this.h[2] >>> 8 & 255, l[p + 6] = this.h[3] >>> 0 & 255, l[p + 7] = this.h[3] >>> 8 & 255, l[p + 8] = this.h[4] >>> 0 & 255, l[p + 9] = this.h[4] >>> 8 & 255, l[p + 10] = this.h[5] >>> 0 & 255, l[p + 11] = this.h[5] >>> 8 & 255, l[p + 12] = this.h[6] >>> 0 & 255, l[p + 13] = this.h[6] >>> 8 & 255, l[p + 14] = this.h[7] >>> 0 & 255, l[p + 15] = this.h[7] >>> 8 & 255;
    }, Se.prototype.update = function(l, p, d) {
      var a, g;
      if (this.leftover) {
        for (g = 16 - this.leftover, g > d && (g = d), a = 0; a < g; a++)
          this.buffer[this.leftover + a] = l[p + a];
        if (d -= g, p += g, this.leftover += g, this.leftover < 16)
          return;
        this.blocks(this.buffer, 0, 16), this.leftover = 0;
      }
      if (d >= 16 && (g = d - d % 16, this.blocks(l, p, g), p += g, d -= g), d) {
        for (a = 0; a < d; a++)
          this.buffer[this.leftover + a] = l[p + a];
        this.leftover += d;
      }
    };
    function be(l, p, d, a, g, S) {
      var E = new Se(S);
      return E.update(d, a, g), E.finish(l, p), 0;
    }
    function _e(l, p, d, a, g, S) {
      var E = new Uint8Array(16);
      return be(E, 0, d, a, g, S), k(l, p, E, 0);
    }
    function Ze(l, p, d, a, g) {
      var S;
      if (d < 32) return -1;
      for (yt(l, 0, p, 0, d, a, g), be(l, 16, l, 32, d - 32, l), S = 0; S < 16; S++) l[S] = 0;
      return 0;
    }
    function nt(l, p, d, a, g) {
      var S, E = new Uint8Array(32);
      if (d < 32 || (gt(E, 0, 32, a, g), _e(p, 16, p, 32, d - 32, E) !== 0)) return -1;
      for (yt(l, 0, p, 0, d, a, g), S = 0; S < 32; S++) l[S] = 0;
      return 0;
    }
    function tt(l, p) {
      var d;
      for (d = 0; d < 16; d++) l[d] = p[d] | 0;
    }
    function ie(l) {
      var p, d, a = 1;
      for (p = 0; p < 16; p++)
        d = l[p] + a + 65535, a = Math.floor(d / 65536), l[p] = d - a * 65536;
      l[0] += a - 1 + 37 * (a - 1);
    }
    function Ie(l, p, d) {
      for (var a, g = ~(d - 1), S = 0; S < 16; S++)
        a = g & (l[S] ^ p[S]), l[S] ^= a, p[S] ^= a;
    }
    function wt(l, p) {
      var d, a, g, S = t(), E = t();
      for (d = 0; d < 16; d++) E[d] = p[d];
      for (ie(E), ie(E), ie(E), a = 0; a < 2; a++) {
        for (S[0] = E[0] - 65517, d = 1; d < 15; d++)
          S[d] = E[d] - 65535 - (S[d - 1] >> 16 & 1), S[d - 1] &= 65535;
        S[15] = E[15] - 32767 - (S[14] >> 16 & 1), g = S[15] >> 16 & 1, S[14] &= 65535, Ie(E, S, 1 - g);
      }
      for (d = 0; d < 16; d++)
        l[2 * d] = E[d] & 255, l[2 * d + 1] = E[d] >> 8;
    }
    function Dt(l, p) {
      var d = new Uint8Array(32), a = new Uint8Array(32);
      return wt(d, l), wt(a, p), I(d, 0, a, 0);
    }
    function $t(l) {
      var p = new Uint8Array(32);
      return wt(p, l), p[0] & 1;
    }
    function ae(l, p) {
      var d;
      for (d = 0; d < 16; d++) l[d] = p[2 * d] + (p[2 * d + 1] << 8);
      l[15] &= 32767;
    }
    function at(l, p, d) {
      for (var a = 0; a < 16; a++) l[a] = p[a] + d[a];
    }
    function bt(l, p, d) {
      for (var a = 0; a < 16; a++) l[a] = p[a] - d[a];
    }
    function Q(l, p, d) {
      var a, g, S = 0, E = 0, R = 0, z = 0, ve = 0, J = 0, ht = 0, oe = 0, Be = 0, Te = 0, He = 0, $e = 0, Ne = 0, je = 0, Pe = 0, ue = 0, xe = 0, te = 0, fe = 0, ye = 0, Y = 0, B = 0, O = 0, V = 0, j = 0, U = 0, L = 0, Ee = 0, Fe = 0, Ke = 0, Ge = 0, w = d[0], Je = d[1], dt = d[2], pt = d[3], We = d[4], ct = d[5], lt = d[6], Mt = d[7], At = d[8], Pt = d[9], jt = d[10], Rt = d[11], Ht = d[12], er = d[13], tr = d[14], rr = d[15];
      a = p[0], S += a * w, E += a * Je, R += a * dt, z += a * pt, ve += a * We, J += a * ct, ht += a * lt, oe += a * Mt, Be += a * At, Te += a * Pt, He += a * jt, $e += a * Rt, Ne += a * Ht, je += a * er, Pe += a * tr, ue += a * rr, a = p[1], E += a * w, R += a * Je, z += a * dt, ve += a * pt, J += a * We, ht += a * ct, oe += a * lt, Be += a * Mt, Te += a * At, He += a * Pt, $e += a * jt, Ne += a * Rt, je += a * Ht, Pe += a * er, ue += a * tr, xe += a * rr, a = p[2], R += a * w, z += a * Je, ve += a * dt, J += a * pt, ht += a * We, oe += a * ct, Be += a * lt, Te += a * Mt, He += a * At, $e += a * Pt, Ne += a * jt, je += a * Rt, Pe += a * Ht, ue += a * er, xe += a * tr, te += a * rr, a = p[3], z += a * w, ve += a * Je, J += a * dt, ht += a * pt, oe += a * We, Be += a * ct, Te += a * lt, He += a * Mt, $e += a * At, Ne += a * Pt, je += a * jt, Pe += a * Rt, ue += a * Ht, xe += a * er, te += a * tr, fe += a * rr, a = p[4], ve += a * w, J += a * Je, ht += a * dt, oe += a * pt, Be += a * We, Te += a * ct, He += a * lt, $e += a * Mt, Ne += a * At, je += a * Pt, Pe += a * jt, ue += a * Rt, xe += a * Ht, te += a * er, fe += a * tr, ye += a * rr, a = p[5], J += a * w, ht += a * Je, oe += a * dt, Be += a * pt, Te += a * We, He += a * ct, $e += a * lt, Ne += a * Mt, je += a * At, Pe += a * Pt, ue += a * jt, xe += a * Rt, te += a * Ht, fe += a * er, ye += a * tr, Y += a * rr, a = p[6], ht += a * w, oe += a * Je, Be += a * dt, Te += a * pt, He += a * We, $e += a * ct, Ne += a * lt, je += a * Mt, Pe += a * At, ue += a * Pt, xe += a * jt, te += a * Rt, fe += a * Ht, ye += a * er, Y += a * tr, B += a * rr, a = p[7], oe += a * w, Be += a * Je, Te += a * dt, He += a * pt, $e += a * We, Ne += a * ct, je += a * lt, Pe += a * Mt, ue += a * At, xe += a * Pt, te += a * jt, fe += a * Rt, ye += a * Ht, Y += a * er, B += a * tr, O += a * rr, a = p[8], Be += a * w, Te += a * Je, He += a * dt, $e += a * pt, Ne += a * We, je += a * ct, Pe += a * lt, ue += a * Mt, xe += a * At, te += a * Pt, fe += a * jt, ye += a * Rt, Y += a * Ht, B += a * er, O += a * tr, V += a * rr, a = p[9], Te += a * w, He += a * Je, $e += a * dt, Ne += a * pt, je += a * We, Pe += a * ct, ue += a * lt, xe += a * Mt, te += a * At, fe += a * Pt, ye += a * jt, Y += a * Rt, B += a * Ht, O += a * er, V += a * tr, j += a * rr, a = p[10], He += a * w, $e += a * Je, Ne += a * dt, je += a * pt, Pe += a * We, ue += a * ct, xe += a * lt, te += a * Mt, fe += a * At, ye += a * Pt, Y += a * jt, B += a * Rt, O += a * Ht, V += a * er, j += a * tr, U += a * rr, a = p[11], $e += a * w, Ne += a * Je, je += a * dt, Pe += a * pt, ue += a * We, xe += a * ct, te += a * lt, fe += a * Mt, ye += a * At, Y += a * Pt, B += a * jt, O += a * Rt, V += a * Ht, j += a * er, U += a * tr, L += a * rr, a = p[12], Ne += a * w, je += a * Je, Pe += a * dt, ue += a * pt, xe += a * We, te += a * ct, fe += a * lt, ye += a * Mt, Y += a * At, B += a * Pt, O += a * jt, V += a * Rt, j += a * Ht, U += a * er, L += a * tr, Ee += a * rr, a = p[13], je += a * w, Pe += a * Je, ue += a * dt, xe += a * pt, te += a * We, fe += a * ct, ye += a * lt, Y += a * Mt, B += a * At, O += a * Pt, V += a * jt, j += a * Rt, U += a * Ht, L += a * er, Ee += a * tr, Fe += a * rr, a = p[14], Pe += a * w, ue += a * Je, xe += a * dt, te += a * pt, fe += a * We, ye += a * ct, Y += a * lt, B += a * Mt, O += a * At, V += a * Pt, j += a * jt, U += a * Rt, L += a * Ht, Ee += a * er, Fe += a * tr, Ke += a * rr, a = p[15], ue += a * w, xe += a * Je, te += a * dt, fe += a * pt, ye += a * We, Y += a * ct, B += a * lt, O += a * Mt, V += a * At, j += a * Pt, U += a * jt, L += a * Rt, Ee += a * Ht, Fe += a * er, Ke += a * tr, Ge += a * rr, S += 38 * xe, E += 38 * te, R += 38 * fe, z += 38 * ye, ve += 38 * Y, J += 38 * B, ht += 38 * O, oe += 38 * V, Be += 38 * j, Te += 38 * U, He += 38 * L, $e += 38 * Ee, Ne += 38 * Fe, je += 38 * Ke, Pe += 38 * Ge, g = 1, a = S + g + 65535, g = Math.floor(a / 65536), S = a - g * 65536, a = E + g + 65535, g = Math.floor(a / 65536), E = a - g * 65536, a = R + g + 65535, g = Math.floor(a / 65536), R = a - g * 65536, a = z + g + 65535, g = Math.floor(a / 65536), z = a - g * 65536, a = ve + g + 65535, g = Math.floor(a / 65536), ve = a - g * 65536, a = J + g + 65535, g = Math.floor(a / 65536), J = a - g * 65536, a = ht + g + 65535, g = Math.floor(a / 65536), ht = a - g * 65536, a = oe + g + 65535, g = Math.floor(a / 65536), oe = a - g * 65536, a = Be + g + 65535, g = Math.floor(a / 65536), Be = a - g * 65536, a = Te + g + 65535, g = Math.floor(a / 65536), Te = a - g * 65536, a = He + g + 65535, g = Math.floor(a / 65536), He = a - g * 65536, a = $e + g + 65535, g = Math.floor(a / 65536), $e = a - g * 65536, a = Ne + g + 65535, g = Math.floor(a / 65536), Ne = a - g * 65536, a = je + g + 65535, g = Math.floor(a / 65536), je = a - g * 65536, a = Pe + g + 65535, g = Math.floor(a / 65536), Pe = a - g * 65536, a = ue + g + 65535, g = Math.floor(a / 65536), ue = a - g * 65536, S += g - 1 + 37 * (g - 1), g = 1, a = S + g + 65535, g = Math.floor(a / 65536), S = a - g * 65536, a = E + g + 65535, g = Math.floor(a / 65536), E = a - g * 65536, a = R + g + 65535, g = Math.floor(a / 65536), R = a - g * 65536, a = z + g + 65535, g = Math.floor(a / 65536), z = a - g * 65536, a = ve + g + 65535, g = Math.floor(a / 65536), ve = a - g * 65536, a = J + g + 65535, g = Math.floor(a / 65536), J = a - g * 65536, a = ht + g + 65535, g = Math.floor(a / 65536), ht = a - g * 65536, a = oe + g + 65535, g = Math.floor(a / 65536), oe = a - g * 65536, a = Be + g + 65535, g = Math.floor(a / 65536), Be = a - g * 65536, a = Te + g + 65535, g = Math.floor(a / 65536), Te = a - g * 65536, a = He + g + 65535, g = Math.floor(a / 65536), He = a - g * 65536, a = $e + g + 65535, g = Math.floor(a / 65536), $e = a - g * 65536, a = Ne + g + 65535, g = Math.floor(a / 65536), Ne = a - g * 65536, a = je + g + 65535, g = Math.floor(a / 65536), je = a - g * 65536, a = Pe + g + 65535, g = Math.floor(a / 65536), Pe = a - g * 65536, a = ue + g + 65535, g = Math.floor(a / 65536), ue = a - g * 65536, S += g - 1 + 37 * (g - 1), l[0] = S, l[1] = E, l[2] = R, l[3] = z, l[4] = ve, l[5] = J, l[6] = ht, l[7] = oe, l[8] = Be, l[9] = Te, l[10] = He, l[11] = $e, l[12] = Ne, l[13] = je, l[14] = Pe, l[15] = ue;
    }
    function vt(l, p) {
      Q(l, p, p);
    }
    function Lt(l, p) {
      var d = t(), a;
      for (a = 0; a < 16; a++) d[a] = p[a];
      for (a = 253; a >= 0; a--)
        vt(d, d), a !== 2 && a !== 4 && Q(d, d, p);
      for (a = 0; a < 16; a++) l[a] = d[a];
    }
    function ds(l, p) {
      var d = t(), a;
      for (a = 0; a < 16; a++) d[a] = p[a];
      for (a = 250; a >= 0; a--)
        vt(d, d), a !== 1 && Q(d, d, p);
      for (a = 0; a < 16; a++) l[a] = d[a];
    }
    function Oi(l, p, d) {
      var a = new Uint8Array(32), g = new Float64Array(80), S, E, R = t(), z = t(), ve = t(), J = t(), ht = t(), oe = t();
      for (E = 0; E < 31; E++) a[E] = p[E];
      for (a[31] = p[31] & 127 | 64, a[0] &= 248, ae(g, d), E = 0; E < 16; E++)
        z[E] = g[E], J[E] = R[E] = ve[E] = 0;
      for (R[0] = J[0] = 1, E = 254; E >= 0; --E)
        S = a[E >>> 3] >>> (E & 7) & 1, Ie(R, z, S), Ie(ve, J, S), at(ht, R, ve), bt(R, R, ve), at(ve, z, J), bt(z, z, J), vt(J, ht), vt(oe, R), Q(R, ve, R), Q(ve, z, ht), at(ht, R, ve), bt(R, R, ve), vt(z, R), bt(ve, J, oe), Q(R, ve, u), at(R, R, J), Q(ve, ve, R), Q(R, J, oe), Q(J, z, g), vt(z, ht), Ie(R, z, S), Ie(ve, J, S);
      for (E = 0; E < 16; E++)
        g[E + 16] = R[E], g[E + 32] = ve[E], g[E + 48] = z[E], g[E + 64] = J[E];
      var Be = g.subarray(32), Te = g.subarray(16);
      return Lt(Be, Be), Q(Te, Te, Be), wt(l, Te), 0;
    }
    function ar(l, p) {
      return Oi(l, p, s);
    }
    function ps(l, p) {
      return n(p, 32), ar(l, p);
    }
    function gn(l, p, d) {
      var a = new Uint8Array(32);
      return Oi(a, d, p), et(l, i, a, Re);
    }
    var ys = Ze, Fc = nt;
    function gs(l, p, d, a, g, S) {
      var E = new Uint8Array(32);
      return gn(E, g, S), ys(l, p, d, a, E);
    }
    function No(l, p, d, a, g, S) {
      var E = new Uint8Array(32);
      return gn(E, g, S), Fc(l, p, d, a, E);
    }
    var vs = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    function ms(l, p, d, a) {
      for (var g = new Int32Array(16), S = new Int32Array(16), E, R, z, ve, J, ht, oe, Be, Te, He, $e, Ne, je, Pe, ue, xe, te, fe, ye, Y, B, O, V, j, U, L, Ee = l[0], Fe = l[1], Ke = l[2], Ge = l[3], w = l[4], Je = l[5], dt = l[6], pt = l[7], We = p[0], ct = p[1], lt = p[2], Mt = p[3], At = p[4], Pt = p[5], jt = p[6], Rt = p[7], Ht = 0; a >= 128; ) {
        for (ye = 0; ye < 16; ye++)
          Y = 8 * ye + Ht, g[ye] = d[Y + 0] << 24 | d[Y + 1] << 16 | d[Y + 2] << 8 | d[Y + 3], S[ye] = d[Y + 4] << 24 | d[Y + 5] << 16 | d[Y + 6] << 8 | d[Y + 7];
        for (ye = 0; ye < 80; ye++)
          if (E = Ee, R = Fe, z = Ke, ve = Ge, J = w, ht = Je, oe = dt, Be = pt, Te = We, He = ct, $e = lt, Ne = Mt, je = At, Pe = Pt, ue = jt, xe = Rt, B = pt, O = Rt, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = (w >>> 14 | At << 18) ^ (w >>> 18 | At << 14) ^ (At >>> 9 | w << 23), O = (At >>> 14 | w << 18) ^ (At >>> 18 | w << 14) ^ (w >>> 9 | At << 23), V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, B = w & Je ^ ~w & dt, O = At & Pt ^ ~At & jt, V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, B = vs[ye * 2], O = vs[ye * 2 + 1], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, B = g[ye % 16], O = S[ye % 16], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, te = U & 65535 | L << 16, fe = V & 65535 | j << 16, B = te, O = fe, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = (Ee >>> 28 | We << 4) ^ (We >>> 2 | Ee << 30) ^ (We >>> 7 | Ee << 25), O = (We >>> 28 | Ee << 4) ^ (Ee >>> 2 | We << 30) ^ (Ee >>> 7 | We << 25), V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, B = Ee & Fe ^ Ee & Ke ^ Fe & Ke, O = We & ct ^ We & lt ^ ct & lt, V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, Be = U & 65535 | L << 16, xe = V & 65535 | j << 16, B = ve, O = Ne, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = te, O = fe, V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, ve = U & 65535 | L << 16, Ne = V & 65535 | j << 16, Fe = E, Ke = R, Ge = z, w = ve, Je = J, dt = ht, pt = oe, Ee = Be, ct = Te, lt = He, Mt = $e, At = Ne, Pt = je, jt = Pe, Rt = ue, We = xe, ye % 16 === 15)
            for (Y = 0; Y < 16; Y++)
              B = g[Y], O = S[Y], V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = g[(Y + 9) % 16], O = S[(Y + 9) % 16], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, te = g[(Y + 1) % 16], fe = S[(Y + 1) % 16], B = (te >>> 1 | fe << 31) ^ (te >>> 8 | fe << 24) ^ te >>> 7, O = (fe >>> 1 | te << 31) ^ (fe >>> 8 | te << 24) ^ (fe >>> 7 | te << 25), V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, te = g[(Y + 14) % 16], fe = S[(Y + 14) % 16], B = (te >>> 19 | fe << 13) ^ (fe >>> 29 | te << 3) ^ te >>> 6, O = (fe >>> 19 | te << 13) ^ (te >>> 29 | fe << 3) ^ (fe >>> 6 | te << 26), V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, g[Y] = U & 65535 | L << 16, S[Y] = V & 65535 | j << 16;
        B = Ee, O = We, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = l[0], O = p[0], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, l[0] = Ee = U & 65535 | L << 16, p[0] = We = V & 65535 | j << 16, B = Fe, O = ct, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = l[1], O = p[1], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, l[1] = Fe = U & 65535 | L << 16, p[1] = ct = V & 65535 | j << 16, B = Ke, O = lt, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = l[2], O = p[2], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, l[2] = Ke = U & 65535 | L << 16, p[2] = lt = V & 65535 | j << 16, B = Ge, O = Mt, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = l[3], O = p[3], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, l[3] = Ge = U & 65535 | L << 16, p[3] = Mt = V & 65535 | j << 16, B = w, O = At, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = l[4], O = p[4], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, l[4] = w = U & 65535 | L << 16, p[4] = At = V & 65535 | j << 16, B = Je, O = Pt, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = l[5], O = p[5], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, l[5] = Je = U & 65535 | L << 16, p[5] = Pt = V & 65535 | j << 16, B = dt, O = jt, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = l[6], O = p[6], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, l[6] = dt = U & 65535 | L << 16, p[6] = jt = V & 65535 | j << 16, B = pt, O = Rt, V = O & 65535, j = O >>> 16, U = B & 65535, L = B >>> 16, B = l[7], O = p[7], V += O & 65535, j += O >>> 16, U += B & 65535, L += B >>> 16, j += V >>> 16, U += j >>> 16, L += U >>> 16, l[7] = pt = U & 65535 | L << 16, p[7] = Rt = V & 65535 | j << 16, Ht += 128, a -= 128;
      }
      return a;
    }
    function Yr(l, p, d) {
      var a = new Int32Array(8), g = new Int32Array(8), S = new Uint8Array(256), E, R = d;
      for (a[0] = 1779033703, a[1] = 3144134277, a[2] = 1013904242, a[3] = 2773480762, a[4] = 1359893119, a[5] = 2600822924, a[6] = 528734635, a[7] = 1541459225, g[0] = 4089235720, g[1] = 2227873595, g[2] = 4271175723, g[3] = 1595750129, g[4] = 2917565137, g[5] = 725511199, g[6] = 4215389547, g[7] = 327033209, ms(a, g, p, d), d %= 128, E = 0; E < d; E++) S[E] = p[R - d + E];
      for (S[d] = 128, d = 256 - 128 * (d < 112 ? 1 : 0), S[d - 9] = 0, m(S, d - 8, R / 536870912 | 0, R << 3), ms(a, g, S, d), E = 0; E < 8; E++) m(l, 8 * E, a[E], g[E]);
      return 0;
    }
    function ei(l, p) {
      var d = t(), a = t(), g = t(), S = t(), E = t(), R = t(), z = t(), ve = t(), J = t();
      bt(d, l[1], l[0]), bt(J, p[1], p[0]), Q(d, d, J), at(a, l[0], l[1]), at(J, p[0], p[1]), Q(a, a, J), Q(g, l[3], p[3]), Q(g, g, v), Q(S, l[2], p[2]), at(S, S, S), bt(E, a, d), bt(R, S, g), at(z, S, g), at(ve, a, d), Q(l[0], E, R), Q(l[1], ve, z), Q(l[2], z, R), Q(l[3], E, ve);
    }
    function Ti(l, p, d) {
      var a;
      for (a = 0; a < 4; a++)
        Ie(l[a], p[a], d);
    }
    function ws(l, p) {
      var d = t(), a = t(), g = t();
      Lt(g, p[2]), Q(d, p[0], g), Q(a, p[1], g), wt(l, a), l[31] ^= $t(d) << 7;
    }
    function bs(l, p, d) {
      var a, g;
      for (tt(l[0], o), tt(l[1], c), tt(l[2], c), tt(l[3], o), g = 255; g >= 0; --g)
        a = d[g / 8 | 0] >> (g & 7) & 1, Ti(l, p, a), ei(p, l), ei(l, l), Ti(l, p, a);
    }
    function Ni(l, p) {
      var d = [t(), t(), t(), t()];
      tt(d[0], b), tt(d[1], H), tt(d[2], c), Q(d[3], b, H), bs(l, d, p);
    }
    function xs(l, p, d) {
      var a = new Uint8Array(64), g = [t(), t(), t(), t()], S;
      for (d || n(p, 32), Yr(a, p, 32), a[0] &= 248, a[31] &= 127, a[31] |= 64, Ni(g, a), ws(l, g), S = 0; S < 32; S++) p[S + 32] = l[S];
      return 0;
    }
    var Jr = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
    function As(l, p) {
      var d, a, g, S;
      for (a = 63; a >= 32; --a) {
        for (d = 0, g = a - 32, S = a - 12; g < S; ++g)
          p[g] += d - 16 * p[a] * Jr[g - (a - 32)], d = Math.floor((p[g] + 128) / 256), p[g] -= d * 256;
        p[g] += d, p[a] = 0;
      }
      for (d = 0, g = 0; g < 32; g++)
        p[g] += d - (p[31] >> 4) * Jr[g], d = p[g] >> 8, p[g] &= 255;
      for (g = 0; g < 32; g++) p[g] -= d * Jr[g];
      for (a = 0; a < 32; a++)
        p[a + 1] += p[a] >> 8, l[a] = p[a] & 255;
    }
    function Ss(l) {
      var p = new Float64Array(64), d;
      for (d = 0; d < 64; d++) p[d] = l[d];
      for (d = 0; d < 64; d++) l[d] = 0;
      As(l, p);
    }
    function Po(l, p, d, a) {
      var g = new Uint8Array(64), S = new Uint8Array(64), E = new Uint8Array(64), R, z, ve = new Float64Array(64), J = [t(), t(), t(), t()];
      Yr(g, a, 32), g[0] &= 248, g[31] &= 127, g[31] |= 64;
      var ht = d + 64;
      for (R = 0; R < d; R++) l[64 + R] = p[R];
      for (R = 0; R < 32; R++) l[32 + R] = g[32 + R];
      for (Yr(E, l.subarray(32), d + 32), Ss(E), Ni(J, E), ws(l, J), R = 32; R < 64; R++) l[R] = a[R];
      for (Yr(S, l, d + 64), Ss(S), R = 0; R < 64; R++) ve[R] = 0;
      for (R = 0; R < 32; R++) ve[R] = E[R];
      for (R = 0; R < 32; R++)
        for (z = 0; z < 32; z++)
          ve[R + z] += S[R] * g[z];
      return As(l.subarray(32), ve), ht;
    }
    function _s(l, p) {
      var d = t(), a = t(), g = t(), S = t(), E = t(), R = t(), z = t();
      return tt(l[2], c), ae(l[1], p), vt(g, l[1]), Q(S, g, h), bt(g, g, l[2]), at(S, l[2], S), vt(E, S), vt(R, E), Q(z, R, E), Q(d, z, g), Q(d, d, S), ds(d, d), Q(d, d, g), Q(d, d, S), Q(d, d, S), Q(l[0], d, S), vt(a, l[0]), Q(a, a, S), Dt(a, g) && Q(l[0], l[0], T), vt(a, l[0]), Q(a, a, S), Dt(a, g) ? -1 : ($t(l[0]) === p[31] >> 7 && bt(l[0], o, l[0]), Q(l[3], l[0], l[1]), 0);
    }
    function _(l, p, d, a) {
      var g, S = new Uint8Array(32), E = new Uint8Array(64), R = [t(), t(), t(), t()], z = [t(), t(), t(), t()];
      if (d < 64 || _s(z, a)) return -1;
      for (g = 0; g < d; g++) l[g] = p[g];
      for (g = 0; g < 32; g++) l[g + 32] = a[g];
      if (Yr(E, l, d), Ss(E), bs(R, z, E), Ni(z, p.subarray(32)), ei(R, z), ws(S, R), d -= 64, I(p, 0, S, 0)) {
        for (g = 0; g < d; g++) l[g] = 0;
        return -1;
      }
      for (g = 0; g < d; g++) l[g] = p[g + 64];
      return d;
    }
    var C = 32, N = 24, K = 32, me = 16, Et = 32, It = 32, De = 32, Z = 32, ee = 32, ce = N, pe = K, Qe = me, it = 64, xt = 32, zt = 64, Pi = 32, Es = 64;
    e.lowlevel = {
      crypto_core_hsalsa20: et,
      crypto_stream_xor: yt,
      crypto_stream: gt,
      crypto_stream_salsa20_xor: Oe,
      crypto_stream_salsa20: Le,
      crypto_onetimeauth: be,
      crypto_onetimeauth_verify: _e,
      crypto_verify_16: k,
      crypto_verify_32: I,
      crypto_secretbox: Ze,
      crypto_secretbox_open: nt,
      crypto_scalarmult: Oi,
      crypto_scalarmult_base: ar,
      crypto_box_beforenm: gn,
      crypto_box_afternm: ys,
      crypto_box: gs,
      crypto_box_open: No,
      crypto_box_keypair: ps,
      crypto_hash: Yr,
      crypto_sign: Po,
      crypto_sign_keypair: xs,
      crypto_sign_open: _,
      crypto_secretbox_KEYBYTES: C,
      crypto_secretbox_NONCEBYTES: N,
      crypto_secretbox_ZEROBYTES: K,
      crypto_secretbox_BOXZEROBYTES: me,
      crypto_scalarmult_BYTES: Et,
      crypto_scalarmult_SCALARBYTES: It,
      crypto_box_PUBLICKEYBYTES: De,
      crypto_box_SECRETKEYBYTES: Z,
      crypto_box_BEFORENMBYTES: ee,
      crypto_box_NONCEBYTES: ce,
      crypto_box_ZEROBYTES: pe,
      crypto_box_BOXZEROBYTES: Qe,
      crypto_sign_BYTES: it,
      crypto_sign_PUBLICKEYBYTES: xt,
      crypto_sign_SECRETKEYBYTES: zt,
      crypto_sign_SEEDBYTES: Pi,
      crypto_hash_BYTES: Es,
      gf: t,
      D: h,
      L: Jr,
      pack25519: wt,
      unpack25519: ae,
      M: Q,
      A: at,
      S: vt,
      Z: bt,
      pow2523: ds,
      add: ei,
      set25519: tt,
      modL: As,
      scalarmult: bs,
      scalarbase: Ni
    };
    function jo(l, p) {
      if (l.length !== C) throw new Error("bad key size");
      if (p.length !== N) throw new Error("bad nonce size");
    }
    function rg(l, p) {
      if (l.length !== De) throw new Error("bad public key size");
      if (p.length !== Z) throw new Error("bad secret key size");
    }
    function Ar() {
      for (var l = 0; l < arguments.length; l++)
        if (!(arguments[l] instanceof Uint8Array))
          throw new TypeError("unexpected type, use Uint8Array");
    }
    function Tf(l) {
      for (var p = 0; p < l.length; p++) l[p] = 0;
    }
    e.randomBytes = function(l) {
      var p = new Uint8Array(l);
      return n(p, l), p;
    }, e.secretbox = function(l, p, d) {
      Ar(l, p, d), jo(d, p);
      for (var a = new Uint8Array(K + l.length), g = new Uint8Array(a.length), S = 0; S < l.length; S++) a[S + K] = l[S];
      return Ze(g, a, a.length, p, d), g.subarray(me);
    }, e.secretbox.open = function(l, p, d) {
      Ar(l, p, d), jo(d, p);
      for (var a = new Uint8Array(me + l.length), g = new Uint8Array(a.length), S = 0; S < l.length; S++) a[S + me] = l[S];
      return a.length < 32 || nt(g, a, a.length, p, d) !== 0 ? null : g.subarray(K);
    }, e.secretbox.keyLength = C, e.secretbox.nonceLength = N, e.secretbox.overheadLength = me, e.scalarMult = function(l, p) {
      if (Ar(l, p), l.length !== It) throw new Error("bad n size");
      if (p.length !== Et) throw new Error("bad p size");
      var d = new Uint8Array(Et);
      return Oi(d, l, p), d;
    }, e.scalarMult.base = function(l) {
      if (Ar(l), l.length !== It) throw new Error("bad n size");
      var p = new Uint8Array(Et);
      return ar(p, l), p;
    }, e.scalarMult.scalarLength = It, e.scalarMult.groupElementLength = Et, e.box = function(l, p, d, a) {
      var g = e.box.before(d, a);
      return e.secretbox(l, p, g);
    }, e.box.before = function(l, p) {
      Ar(l, p), rg(l, p);
      var d = new Uint8Array(ee);
      return gn(d, l, p), d;
    }, e.box.after = e.secretbox, e.box.open = function(l, p, d, a) {
      var g = e.box.before(d, a);
      return e.secretbox.open(l, p, g);
    }, e.box.open.after = e.secretbox.open, e.box.keyPair = function() {
      var l = new Uint8Array(De), p = new Uint8Array(Z);
      return ps(l, p), { publicKey: l, secretKey: p };
    }, e.box.keyPair.fromSecretKey = function(l) {
      if (Ar(l), l.length !== Z)
        throw new Error("bad secret key size");
      var p = new Uint8Array(De);
      return ar(p, l), { publicKey: p, secretKey: new Uint8Array(l) };
    }, e.box.publicKeyLength = De, e.box.secretKeyLength = Z, e.box.sharedKeyLength = ee, e.box.nonceLength = ce, e.box.overheadLength = e.secretbox.overheadLength, e.sign = function(l, p) {
      if (Ar(l, p), p.length !== zt)
        throw new Error("bad secret key size");
      var d = new Uint8Array(it + l.length);
      return Po(d, l, l.length, p), d;
    }, e.sign.open = function(l, p) {
      if (Ar(l, p), p.length !== xt)
        throw new Error("bad public key size");
      var d = new Uint8Array(l.length), a = _(d, l, l.length, p);
      if (a < 0) return null;
      for (var g = new Uint8Array(a), S = 0; S < g.length; S++) g[S] = d[S];
      return g;
    }, e.sign.detached = function(l, p) {
      for (var d = e.sign(l, p), a = new Uint8Array(it), g = 0; g < a.length; g++) a[g] = d[g];
      return a;
    }, e.sign.detached.verify = function(l, p, d) {
      if (Ar(l, p, d), p.length !== it)
        throw new Error("bad signature size");
      if (d.length !== xt)
        throw new Error("bad public key size");
      var a = new Uint8Array(it + l.length), g = new Uint8Array(it + l.length), S;
      for (S = 0; S < it; S++) a[S] = p[S];
      for (S = 0; S < l.length; S++) a[S + it] = l[S];
      return _(g, a, a.length, d) >= 0;
    }, e.sign.keyPair = function() {
      var l = new Uint8Array(xt), p = new Uint8Array(zt);
      return xs(l, p), { publicKey: l, secretKey: p };
    }, e.sign.keyPair.fromSecretKey = function(l) {
      if (Ar(l), l.length !== zt)
        throw new Error("bad secret key size");
      for (var p = new Uint8Array(xt), d = 0; d < p.length; d++) p[d] = l[32 + d];
      return { publicKey: p, secretKey: new Uint8Array(l) };
    }, e.sign.keyPair.fromSeed = function(l) {
      if (Ar(l), l.length !== Pi)
        throw new Error("bad seed size");
      for (var p = new Uint8Array(xt), d = new Uint8Array(zt), a = 0; a < 32; a++) d[a] = l[a];
      return xs(p, d, !0), { publicKey: p, secretKey: d };
    }, e.sign.publicKeyLength = xt, e.sign.secretKeyLength = zt, e.sign.seedLength = Pi, e.sign.signatureLength = it, e.hash = function(l) {
      Ar(l);
      var p = new Uint8Array(Es);
      return Yr(p, l, l.length), p;
    }, e.hash.hashLength = Es, e.verify = function(l, p) {
      return Ar(l, p), l.length === 0 || p.length === 0 || l.length !== p.length ? !1 : A(l, 0, p, 0, l.length) === 0;
    }, e.setPRNG = function(l) {
      n = l;
    }, function() {
      var l = typeof self < "u" ? self.crypto || self.msCrypto : null;
      if (l && l.getRandomValues) {
        var p = 65536;
        e.setPRNG(function(d, a) {
          var g, S = new Uint8Array(a);
          for (g = 0; g < a; g += p)
            l.getRandomValues(S.subarray(g, g + Math.min(a - g, p)));
          for (g = 0; g < a; g++) d[g] = S[g];
          Tf(S);
        });
      } else typeof ew < "u" && (l = nw, l && l.randomBytes && e.setPRNG(function(d, a) {
        var g, S = l.randomBytes(a);
        for (g = 0; g < a; g++) d[g] = S[g];
        Tf(S);
      }));
    }();
  })(r.exports ? r.exports : self.nacl = self.nacl || {});
})(G0);
var iw = G0.exports;
const z0 = /* @__PURE__ */ wg(iw);
let Ds = null;
function sw(r) {
  Ds = r;
}
function Ue() {
  if (!Ds)
    if (typeof window < "u")
      Ds = {
        persistent: window.localStorage,
        session: window.sessionStorage
      };
    else
      throw new Error(
        "OpenSecret SDK: no storage provider configured. In non-browser environments, call configure({ storage: ... }) before using the SDK."
      );
  return Ds;
}
function ow() {
  Ds = null;
}
function aw() {
  return z0.box.keyPair();
}
async function Ii(r, e) {
  const t = Ue().session.getItem("sessionKey"), n = Ue().session.getItem("sessionId");
  console.groupCollapsed("Attestation");
  try {
    if (t && n && !r) {
      const o = $s(t);
      return console.log("Using existing attestation from session storage."), { sessionKey: o, sessionId: n };
    }
    const i = globalThis.crypto.randomUUID();
    console.log("Generated attestation nonce:", i);
    const s = await Q1(i, e);
    if (s && s.public_key) {
      console.log("Attestation document verification succeeded");
      const o = aw();
      console.log("Generated client key pair");
      const c = new Uint8Array(s.public_key), { encrypted_session_key: u, session_id: h } = await Ew(
        Er(o.publicKey),
        i,
        e
      );
      console.log("Key exchange completed.");
      const v = z0.scalarMult(
        o.secretKey,
        c
      ), b = $s(u), H = 12, T = b.slice(0, H), m = b.slice(H), k = new Uu(v).open(T, m);
      if (k)
        return console.log("Session key decrypted successfully"), Ue().session.setItem("sessionKey", Er(k)), Ue().session.setItem("sessionId", h), { sessionKey: k, sessionId: h };
      throw new Error("Failed to decrypt session key");
    } else
      throw new Error("Invalid attestation document");
  } catch (i) {
    throw console.error("Error verifying attestation:", i), i;
  } finally {
    console.groupEnd();
  }
}
let ft = "";
function cw(r) {
  ft = r;
}
async function lw(r, e) {
  return Nt(
    `${ft}/platform/login`,
    "POST",
    { email: r, password: e },
    void 0,
    "Failed to login"
  );
}
async function uw(r, e, t, n) {
  return Nt(
    `${ft}/platform/register`,
    "POST",
    { email: r, password: e, invite_code: t, name: n },
    void 0,
    "Failed to register"
  );
}
async function fw(r) {
  return Nt(
    `${ft}/platform/logout`,
    "POST",
    { refresh_token: r },
    void 0,
    "Failed to logout"
  );
}
async function hw() {
  const r = Ue().persistent.getItem("refresh_token");
  if (!r) throw new Error("No refresh token available");
  const e = { refresh_token: r };
  try {
    const t = await Nt(
      `${ft}/platform/refresh`,
      "POST",
      e,
      void 0,
      "Failed to refresh platform token"
    );
    return Ue().persistent.setItem("access_token", t.access_token), Ue().persistent.setItem("refresh_token", t.refresh_token), t;
  } catch (t) {
    throw console.error("Error refreshing platform token:", t), t;
  }
}
async function K0(r) {
  return he(
    `${ft}/platform/orgs`,
    "POST",
    { name: r }
  );
}
async function q0() {
  return he(
    `${ft}/platform/orgs`,
    "GET",
    void 0
  );
}
async function Z0(r) {
  return he(
    `${ft}/platform/orgs/${r}`,
    "DELETE",
    void 0
  );
}
async function W0(r, e, t) {
  return he(
    `${ft}/platform/orgs/${r}/projects`,
    "POST",
    { name: e, description: t }
  );
}
async function Y0(r) {
  return he(
    `${ft}/platform/orgs/${r}/projects`,
    "GET",
    void 0
  );
}
async function J0(r, e) {
  return he(
    `${ft}/platform/orgs/${r}/projects/${e}`,
    "GET",
    void 0
  );
}
async function X0(r, e, t) {
  return he(
    `${ft}/platform/orgs/${r}/projects/${e}`,
    "PATCH",
    t
  );
}
async function Q0(r, e) {
  return he(
    `${ft}/platform/orgs/${r}/projects/${e}`,
    "DELETE",
    void 0
  );
}
function dw(r) {
  const e = /^[A-Za-z0-9+/]*[=]{0,2}$/, t = r.length % 4 === 0, n = e.test(r);
  return t && n;
}
async function ey(r, e, t, n) {
  if (!dw(n))
    throw new Error(
      "Secret must be base64 encoded. Use @stablelib/base64's encode function to encode your data."
    );
  return he(
    `${ft}/platform/orgs/${r}/projects/${e}/secrets`,
    "POST",
    { key_name: t, secret: n }
  );
}
async function ty(r, e) {
  return he(
    `${ft}/platform/orgs/${r}/projects/${e}/secrets`,
    "GET",
    void 0
  );
}
async function ry(r, e, t) {
  return he(
    `${ft}/platform/orgs/${r}/projects/${e}/secrets/${t}`,
    "DELETE",
    void 0
  );
}
async function ny(r, e) {
  return he(
    `${ft}/platform/orgs/${r}/projects/${e}/settings/email`,
    "GET",
    void 0
  );
}
async function iy(r, e, t) {
  return he(
    `${ft}/platform/orgs/${r}/projects/${e}/settings/email`,
    "PUT",
    t
  );
}
async function sy(r, e) {
  return he(
    `${ft}/platform/orgs/${r}/projects/${e}/settings/oauth`,
    "GET",
    void 0
  );
}
async function oy(r, e, t) {
  return he(
    `${ft}/platform/orgs/${r}/projects/${e}/settings/oauth`,
    "PUT",
    t
  );
}
async function ay(r, e, t) {
  if (!e || e.trim() === "")
    throw new Error("Email is required");
  return he(`${ft}/platform/orgs/${r}/invites`, "POST", {
    email: e,
    role: t
  });
}
async function cy(r) {
  return he(
    `${ft}/platform/orgs/${r}/invites`,
    "GET",
    void 0
  );
}
async function ly(r, e) {
  return he(
    `${ft}/platform/orgs/${r}/invites/${e}`,
    "GET",
    void 0
  );
}
async function uy(r, e) {
  return he(
    `${ft}/platform/orgs/${r}/invites/${e}`,
    "DELETE",
    void 0
  );
}
async function fy(r) {
  return he(
    `${ft}/platform/orgs/${r}/memberships`,
    "GET",
    void 0
  );
}
async function hy(r, e, t) {
  return he(
    `${ft}/platform/orgs/${r}/memberships/${e}`,
    "PATCH",
    { role: t }
  );
}
async function dy(r, e) {
  return he(
    `${ft}/platform/orgs/${r}/memberships/${e}`,
    "DELETE",
    void 0
  );
}
async function py(r) {
  return he(
    `${ft}/platform/accept_invite/${r}`,
    "POST",
    void 0
  );
}
async function pw() {
  return he(
    `${ft}/platform/me`,
    "GET",
    void 0
  );
}
async function yy(r) {
  return Nt(
    `${ft}/platform/verify-email/${r}`,
    "GET",
    void 0,
    void 0,
    "Failed to verify email"
  );
}
async function La() {
  return he(
    `${ft}/platform/request_verification`,
    "POST",
    void 0,
    "Failed to request new verification code"
  );
}
async function gy(r, e) {
  const t = {
    email: r,
    hashed_secret: e
  };
  return Nt(
    `${ft}/platform/password-reset/request`,
    "POST",
    t,
    void 0,
    "Failed to request platform password reset"
  );
}
async function vy(r, e, t, n) {
  const i = {
    email: r,
    alphanumeric_code: e,
    plaintext_secret: t,
    new_password: n
  };
  return Nt(
    `${ft}/platform/password-reset/confirm`,
    "POST",
    i,
    void 0,
    "Failed to confirm platform password reset"
  );
}
async function my(r, e) {
  const t = {
    current_password: r,
    new_password: e
  };
  return he(
    `${ft}/platform/change-password`,
    "POST",
    t,
    "Failed to change platform password"
  );
}
let yo = null;
function yw(r) {
  if (!r.apiUrl || r.apiUrl.trim() === "")
    throw new Error("OpenSecret SDK requires a non-empty apiUrl");
  if (!r.clientId || r.clientId.trim() === "")
    throw new Error("OpenSecret SDK requires a non-empty clientId");
  r.storage && sw(r.storage), yo = {
    apiUrl: r.apiUrl.replace(/\/$/, ""),
    // Remove trailing slash
    clientId: r.clientId
  };
}
function Dr() {
  if (!yo)
    throw new Error(
      "OpenSecret SDK not configured. Please call configure() with your apiUrl and clientId first."
    );
  return yo;
}
function gw() {
  return yo !== null;
}
function Jx() {
  yo = null, ow();
}
class vw {
  constructor() {
    qe(this, "_platformApiUrl", "");
  }
  /**
   * Configure the platform API URL
   */
  configurePlatform(e) {
    this._platformApiUrl = e;
  }
  /**
   * Get the platform API URL
   */
  get platformApiUrl() {
    return this._platformApiUrl;
  }
  /**
   * Get the app API URL (derived from global config)
   */
  get appApiUrl() {
    return gw() ? Dr().apiUrl : "";
  }
  /**
   * Determine if a path is for the platform context
   */
  isPlatformPath(e) {
    return e.includes("/platform/");
  }
  /**
   * Get the API endpoint for a given path
   */
  resolveEndpoint(e) {
    const t = this.isPlatformPath(e);
    return {
      baseUrl: t ? this._platformApiUrl : this.appApiUrl,
      context: t ? "platform" : "app"
    };
  }
  /**
   * Build a complete URL for an API path
   */
  buildUrl(e) {
    if (e.startsWith("http"))
      return e;
    const t = this.resolveEndpoint(e), n = t.baseUrl.endsWith("/") ? t.baseUrl.slice(0, -1) : t.baseUrl, i = e.startsWith("/") ? e : `/${e}`;
    return `${n}${i}`;
  }
  /**
   * Get the appropriate refresh token function name for a given path
   */
  getRefreshFunction(e) {
    return this.isPlatformPath(e) ? "platformRefreshToken" : "refreshToken";
  }
}
const Ha = new vw();
async function he(r, e, t, n) {
  const i = async (s = !1) => {
    try {
      if (s) {
        console.log("Refreshing access token");
        const u = Ha.getRefreshFunction(r);
        console.log(`Using ${u}`), u === "platformRefreshToken" ? await hw() : await Lc();
      }
      const o = Ue().persistent.getItem("access_token");
      if (!o)
        throw new Error("No access token available");
      const c = await Cf(
        r,
        e,
        t,
        o,
        n
      );
      if (c.status === 401 && !s)
        return console.log(`Received 401 for URL ${r}, attempting to refresh token`), i(!0);
      if (c.error)
        throw new Error(c.error);
      if (!c.data)
        throw new Error("No data received from the server");
      return c.data;
    } catch (o) {
      throw console.error(o), o;
    }
  };
  return i();
}
async function wy(r, e, t, n, i) {
  if (!i)
    return he(r, e, t, n);
  const s = await Cf(
    r,
    e,
    t,
    i,
    n
  );
  if (s.error)
    throw new Error(s.error);
  if (!s.data)
    throw new Error(n || `Request to ${r} failed`);
  return s.data;
}
async function Cf(r, e, t, n, i) {
  const o = Ha.resolveEndpoint(r).context === "platform" ? Ha.platformApiUrl : void 0;
  let { sessionKey: c, sessionId: u } = await Ii(!1, o);
  const h = async (b, H = !1) => {
    if (H || !c || !u) {
      const P = await Ii(!0, o);
      c = P.sessionKey, u = P.sessionId;
    }
    if (!c || !u)
      throw new Error(
        "Failed to make encrypted API call, no attestation available."
      );
    const T = t ? JSON.stringify(t) : void 0, m = T ? Td(c, T) : void 0, A = {
      "Content-Type": "application/json",
      "x-session-id": u
    };
    b && (A.Authorization = `Bearer ${b}`);
    const k = await fetch(r, {
      method: e,
      headers: A,
      body: m ? JSON.stringify({ encrypted: m }) : void 0
    }), I = {
      status: k.status
    };
    if (k.ok)
      try {
        const P = await k.json(), D = ll(
          c,
          P.encrypted
        );
        I.data = JSON.parse(D);
      } catch (P) {
        console.error("Error decrypting or parsing response:", P), I.status = 500, I.error = "Failed to decrypt or parse the response";
      }
    else
      try {
        const P = await k.json();
        I.error = P.message || i || `HTTP error! Status: ${k.status}`;
      } catch {
        I.error = i || `HTTP error! Status: ${k.status}`;
      }
    return I;
  }, v = async (b, H = !1) => {
    var T;
    try {
      const m = await h(b, H);
      return (m.status === 400 || (T = m.error) != null && T.includes("Encryption error")) && !H ? (console.log(
        "Encryption error or Bad Request, attempting to renew attestation"
      ), v(b, !0)) : m;
    } catch (m) {
      return {
        status: 500,
        error: m instanceof Error ? m.message : "Unknown error occurred"
      };
    }
  };
  return v(n);
}
async function Nt(r, e, t, n, i) {
  const s = await Cf(
    r,
    e,
    t,
    n,
    i
  );
  if (s.error)
    throw new Error(s.error);
  if (!s.data)
    throw new Error("No data received from the server");
  return s.data;
}
function we() {
  return Dr().apiUrl;
}
async function mw(r, e) {
  const { clientId: t } = Dr(), n = await Nt(`${we()}/login`, "POST", { email: r, password: e, client_id: t });
  return Ue().persistent.setItem("access_token", n.access_token), Ue().persistent.setItem("refresh_token", n.refresh_token), n;
}
async function ww(r, e) {
  const { clientId: t } = Dr(), n = await Nt(`${we()}/login`, "POST", { id: r, password: e, client_id: t });
  return Ue().persistent.setItem("access_token", n.access_token), Ue().persistent.setItem("refresh_token", n.refresh_token), n;
}
async function bw(r, e, t, n) {
  const { clientId: i } = Dr(), s = await Nt(`${we()}/register`, "POST", {
    email: r,
    password: e,
    inviteCode: t.toLowerCase(),
    client_id: i,
    name: n
  });
  return Ue().persistent.setItem("access_token", s.access_token), Ue().persistent.setItem("refresh_token", s.refresh_token), s;
}
async function xw(r, e) {
  const { clientId: t } = Dr(), n = await Nt(`${we()}/register`, "POST", {
    password: r,
    inviteCode: e.toLowerCase(),
    client_id: t
  });
  return Ue().persistent.setItem("access_token", n.access_token), Ue().persistent.setItem("refresh_token", n.refresh_token), n;
}
async function Lc() {
  const r = Ue().persistent.getItem("refresh_token");
  if (!r) throw new Error("No refresh token available");
  const e = { refresh_token: r };
  try {
    const t = await Nt(
      `${we()}/refresh`,
      "POST",
      e,
      void 0,
      "Failed to refresh token"
    );
    return Ue().persistent.setItem("access_token", t.access_token), Ue().persistent.setItem("refresh_token", t.refresh_token), t;
  } catch (t) {
    throw console.error("Error refreshing token:", t), t;
  }
}
async function Aw() {
  return he(
    `${we()}/protected/user`,
    "GET",
    void 0,
    "Failed to fetch user"
  );
}
async function by(r, e) {
  return he(
    `${we()}/protected/kv/${r}`,
    "PUT",
    e,
    "Failed to put key-value pair"
  );
}
async function xy(r) {
  return he(
    `${we()}/protected/kv/${r}`,
    "DELETE",
    void 0,
    "Failed to delete key-value pair"
  );
}
async function Ay() {
  return he(
    `${we()}/protected/kv`,
    "DELETE",
    void 0,
    "Failed to delete all key-value pairs"
  );
}
async function Sy(r) {
  try {
    return await he(
      `${we()}/protected/kv/${r}`,
      "GET",
      void 0,
      "Failed to get key-value pair"
    );
  } catch (e) {
    console.error(`Error fetching key "${r}":`, e);
    return;
  }
}
async function _y() {
  return he(
    `${we()}/protected/kv`,
    "GET",
    void 0,
    "Failed to list key-value pairs"
  );
}
async function Sw() {
  const r = Ue().persistent.getItem("refresh_token");
  if (r)
    try {
      const e = { refresh_token: r };
      await Nt(
        `${we()}/logout`,
        "POST",
        e
      );
    } catch (e) {
      console.error("Error during logout API call:", e);
    }
  Ue().persistent.removeItem("access_token"), Ue().persistent.removeItem("refresh_token"), Ue().session.removeItem("sessionKey"), Ue().session.removeItem("sessionId");
}
async function Ey(r) {
  return Nt(
    `${we()}/verify-email/${r}`,
    "GET",
    void 0,
    void 0,
    "Failed to verify email"
  );
}
async function Fa() {
  return he(
    `${we()}/protected/request_verification`,
    "POST",
    void 0,
    "Failed to request new verification code"
  );
}
async function _w(r, e) {
  const t = e || we(), n = await fetch(`${t}/attestation/${r}`);
  if (!n.ok)
    throw new Error(`Request failed with status ${n.status}`);
  return (await n.json()).attestation_document;
}
async function Ew(r, e, t) {
  const n = t || we(), i = await fetch(`${n}/key_exchange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ client_public_key: r, nonce: e })
  });
  if (!i.ok)
    throw new Error("Key exchange failed");
  return i.json();
}
async function Iw(r, e) {
  const { clientId: t } = Dr(), n = {
    email: r,
    hashed_secret: e,
    client_id: t
  };
  return Nt(
    `${we()}/password-reset/request`,
    "POST",
    n,
    void 0,
    "Failed to request password reset"
  );
}
async function kw(r, e, t, n) {
  const { clientId: i } = Dr(), s = {
    email: r,
    alphanumeric_code: e,
    plaintext_secret: t,
    new_password: n,
    client_id: i
  };
  return Nt(
    `${we()}/password-reset/confirm`,
    "POST",
    s,
    void 0,
    "Failed to confirm password reset"
  );
}
async function Iy(r, e) {
  const t = {
    current_password: r,
    new_password: e
  };
  return he(
    `${we()}/protected/change_password`,
    "POST",
    t,
    "Failed to change password"
  );
}
async function Cw(r) {
  const { clientId: e } = Dr();
  try {
    return await Nt(
      `${we()}/auth/github`,
      "POST",
      r ? { invite_code: r, client_id: e } : { client_id: e },
      void 0,
      "Failed to initiate GitHub auth"
    );
  } catch (t) {
    throw t instanceof Error && t.message.includes("Invalid invite code") ? new Error("Invalid invite code. Please check and try again.") : t;
  }
}
async function Bw(r, e, t) {
  const n = { code: r, state: e, invite_code: t };
  try {
    const i = await Nt(
      `${we()}/auth/github/callback`,
      "POST",
      n,
      void 0,
      "GitHub callback failed"
    );
    return Ue().persistent.setItem("access_token", i.access_token), Ue().persistent.setItem("refresh_token", i.refresh_token), i;
  } catch (i) {
    throw console.error("Detailed GitHub callback error:", i), i instanceof Error ? i.message.includes("User exists") || i.message.includes("Email already registered") ? new Error(
      "An account with this email already exists. Please sign in using your existing account."
    ) : i.message.includes("Invalid invite code") ? new Error(
      "Invalid invite code. Please try signing up with a valid invite code."
    ) : i.message.includes("User not found") ? new Error(
      "User not found. Please sign up first before attempting to log in with GitHub."
    ) : new Error(
      "Failed to authenticate with GitHub. Please try again."
    ) : i;
  }
}
async function Ow(r) {
  const { clientId: e } = Dr();
  try {
    return await Nt(
      `${we()}/auth/google`,
      "POST",
      r ? { invite_code: r, client_id: e } : { client_id: e },
      void 0,
      "Failed to initiate Google auth"
    );
  } catch (t) {
    throw t instanceof Error && t.message.includes("Invalid invite code") ? new Error("Invalid invite code. Please check and try again.") : t;
  }
}
async function Tw(r, e, t) {
  const n = { code: r, state: e, invite_code: t };
  try {
    const i = await Nt(
      `${we()}/auth/google/callback`,
      "POST",
      n,
      void 0,
      "Google callback failed"
    );
    return Ue().persistent.setItem("access_token", i.access_token), Ue().persistent.setItem("refresh_token", i.refresh_token), i;
  } catch (i) {
    throw console.error("Detailed Google callback error:", i), i instanceof Error ? i.message.includes("User exists") || i.message.includes("Email already registered") ? new Error(
      "An account with this email already exists. Please sign in using your existing account."
    ) : i.message.includes("Invalid invite code") ? new Error(
      "Invalid invite code. Please try signing up with a valid invite code."
    ) : i.message.includes("User not found") ? new Error(
      "User not found. Please sign up first before attempting to log in with Google."
    ) : new Error(
      "Failed to authenticate with Google. Please try again."
    ) : i;
  }
}
async function Nw(r) {
  const { clientId: e } = Dr();
  try {
    return await Nt(
      `${we()}/auth/apple`,
      "POST",
      r ? { invite_code: r, client_id: e } : { client_id: e },
      void 0,
      "Failed to initiate Apple auth"
    );
  } catch (t) {
    throw t instanceof Error && t.message.includes("Invalid invite code") ? new Error("Invalid invite code. Please check and try again.") : t;
  }
}
async function Pw(r, e, t) {
  const n = { code: r, state: e, invite_code: t };
  try {
    const i = await Nt(
      `${we()}/auth/apple/callback`,
      "POST",
      n,
      void 0,
      "Apple callback failed"
    );
    return Ue().persistent.setItem("access_token", i.access_token), Ue().persistent.setItem("refresh_token", i.refresh_token), i;
  } catch (i) {
    throw console.error("Detailed Apple callback error:", i), i instanceof Error ? i.message.includes("User exists") || i.message.includes("Email already registered") ? new Error(
      "An account with this email already exists. Please sign in using your existing account."
    ) : i.message.includes("Invalid invite code") ? new Error(
      "Invalid invite code. Please try signing up with a valid invite code."
    ) : i.message.includes("User not found") ? new Error(
      "User not found. Please sign up first before attempting to log in with Apple."
    ) : new Error("Failed to authenticate with Apple. Please try again.") : i;
  }
}
async function jw(r, e) {
  const { clientId: t } = Dr(), n = {
    ...r,
    client_id: t,
    ...e ? { invite_code: e } : {}
  };
  try {
    const i = await Nt(
      `${we()}/auth/apple/native`,
      "POST",
      n,
      void 0,
      "Apple Sign-In failed"
    );
    return Ue().persistent.setItem("access_token", i.access_token), Ue().persistent.setItem("refresh_token", i.refresh_token), i;
  } catch (i) {
    throw console.error("Detailed Apple Sign-In error:", i), i instanceof Error ? i.message.includes("User exists") || i.message.includes("Email already registered") ? new Error(
      "An account with this email already exists. Please sign in using your existing account."
    ) : i.message.includes("Invalid invite code") ? new Error(
      "Invalid invite code. Please try signing up with a valid invite code."
    ) : i.message.includes("User not found") ? new Error(
      "User not found. Please sign up first before attempting to log in with Apple."
    ) : i.message.includes("No email found") ? new Error(
      "Unable to retrieve email from Apple. Please try another sign-in method."
    ) : new Error("Failed to authenticate with Apple. Please try again.") : i;
  }
}
async function ky(r) {
  let e = `${we()}/protected/private_key`;
  const t = [];
  return r != null && r.seed_phrase_derivation_path && t.push(
    `seed_phrase_derivation_path=${encodeURIComponent(r.seed_phrase_derivation_path)}`
  ), r != null && r.private_key_derivation_path && t.push(
    `private_key_derivation_path=${encodeURIComponent(r.private_key_derivation_path)}`
  ), t.length > 0 && (e += `?${t.join("&")}`), he(
    e,
    "GET",
    void 0,
    "Failed to fetch private key"
  );
}
async function Cy(r) {
  let e = `${we()}/protected/private_key_bytes`;
  const t = [];
  return r != null && r.seed_phrase_derivation_path && t.push(
    `seed_phrase_derivation_path=${encodeURIComponent(r.seed_phrase_derivation_path)}`
  ), r != null && r.private_key_derivation_path && t.push(
    `private_key_derivation_path=${encodeURIComponent(r.private_key_derivation_path)}`
  ), t.length > 0 && (e += `?${t.join("&")}`), he(
    e,
    "GET",
    void 0,
    "Failed to fetch private key bytes"
  );
}
async function By(r, e, t) {
  const i = {
    message_base64: Er(r),
    algorithm: e,
    ...t && Object.keys(t).length > 0 && { key_options: t }
  };
  return he(
    `${we()}/protected/sign_message`,
    "POST",
    i,
    "Failed to sign message"
  );
}
async function Oy(r, e) {
  let t = `${we()}/protected/public_key?algorithm=${r}`;
  return e != null && e.seed_phrase_derivation_path && (t += `&seed_phrase_derivation_path=${encodeURIComponent(e.seed_phrase_derivation_path)}`), e != null && e.private_key_derivation_path && (t += `&private_key_derivation_path=${encodeURIComponent(e.private_key_derivation_path)}`), he(
    t,
    "GET",
    void 0,
    "Failed to fetch public key"
  );
}
async function Rw(r, e, t) {
  const n = {
    email: r,
    password: e,
    ...t !== void 0 && { name: t }
  };
  return he(
    `${we()}/protected/convert_guest`,
    "POST",
    n,
    "Failed to convert guest account"
  );
}
async function Uw(r) {
  return he(
    `${we()}/protected/third_party_token`,
    "POST",
    r ? { audience: r } : {},
    "Failed to generate third party token"
  );
}
async function Ty(r, e) {
  const t = {
    data: r,
    ...e && Object.keys(e).length > 0 && { key_options: e }
  };
  return he(
    `${we()}/protected/encrypt`,
    "POST",
    t,
    "Failed to encrypt data"
  );
}
async function Ny(r, e) {
  const t = {
    encrypted_data: r,
    ...e && Object.keys(e).length > 0 && { key_options: e }
  };
  return he(
    `${we()}/protected/decrypt`,
    "POST",
    t,
    "Failed to decrypt data"
  );
}
async function Dw(r) {
  const e = {
    hashed_secret: r
  };
  return he(
    `${we()}/protected/delete-account/request`,
    "POST",
    e,
    "Failed to request account deletion"
  );
}
async function $w(r, e) {
  const t = {
    confirmation_code: r,
    plaintext_secret: e
  };
  return he(
    `${we()}/protected/delete-account/confirm`,
    "POST",
    t,
    "Failed to confirm account deletion"
  );
}
async function Py(r) {
  try {
    const e = await wy(
      `${we()}/v1/models`,
      "GET",
      void 0,
      "Failed to fetch models",
      r
    );
    if (!e || typeof e != "object")
      throw new Error("Invalid response from models endpoint");
    if (e.object !== "list" || !Array.isArray(e.data))
      throw new Error(
        "Models response missing expected 'object' or 'data' fields"
      );
    return e.data;
  } catch (e) {
    throw console.error("Error fetching models:", e), e;
  }
}
const Sd = 10 * 1024 * 1024;
function Mw(r) {
  return new Promise((e) => setTimeout(e, r));
}
async function jy(r) {
  return he(
    `${we()}/protected/api-keys`,
    "POST",
    { name: r },
    "Failed to create API key"
  );
}
async function Ry() {
  const r = await he(
    `${we()}/protected/api-keys`,
    "GET",
    void 0,
    "Failed to list API keys"
  );
  return r.keys.sort(
    (e, t) => new Date(t.created_at).getTime() - new Date(e.created_at).getTime()
  ), r;
}
async function Uy(r) {
  const e = encodeURIComponent(r);
  return he(
    `${we()}/protected/api-keys/${e}`,
    "DELETE",
    void 0,
    "Failed to delete API key"
  );
}
async function Bf(r) {
  if (r.size > Sd)
    throw new Error(
      `File size exceeds maximum limit of ${Sd / 1024 / 1024}MB`
    );
  const e = await r.arrayBuffer(), t = new Uint8Array(e), n = Er(t), s = {
    filename: r instanceof File ? r.name : "document",
    content_base64: n
  };
  return he(
    `${we()}/v1/documents/upload`,
    "POST",
    s,
    "Failed to upload document"
  );
}
async function Of(r) {
  const e = {
    task_id: r
  };
  return he(
    `${we()}/v1/documents/status`,
    "POST",
    e,
    "Failed to check document status"
  );
}
async function Dy(r, e) {
  const { pollInterval: t = 2e3, maxAttempts: n = 150, onProgress: i } = e || {}, s = await Bf(r);
  let o = 0;
  for (; o < n; ) {
    const c = await Of(s.task_id);
    switch (i && i(c.status, c.progress), c.status) {
      case "success":
        if (!c.document)
          throw new Error(
            "Document processing succeeded but no document returned"
          );
        return c.document;
      case "failure":
        throw new Error(c.error || "Document processing failed");
      case "pending":
      case "started":
        await Mw(t), o++;
        break;
      default:
        throw new Error(`Unknown document status: ${c.status}`);
    }
  }
  throw new Error("Document processing timed out");
}
async function $y(r, e, t, n, i, s) {
  const o = await r.arrayBuffer(), c = new Uint8Array(o), u = Er(c), h = r instanceof File ? r.name : "audio", v = r.type || "audio/mpeg", b = {
    file: u,
    filename: h,
    content_type: v,
    model: e || "whisper-large-v3",
    ...t && { language: t },
    ...n && { prompt: n },
    ...i !== void 0 && { temperature: i }
  };
  return wy(
    `${we()}/v1/audio/transcriptions`,
    "POST",
    b,
    "Failed to transcribe audio",
    s
  );
}
async function My(r) {
  let e = `${we()}/v1/responses`;
  const t = [];
  return (r == null ? void 0 : r.limit) !== void 0 && t.push(`limit=${r.limit}`), r != null && r.after && t.push(`after=${encodeURIComponent(r.after)}`), r != null && r.before && t.push(`before=${encodeURIComponent(r.before)}`), r != null && r.order && t.push(`order=${encodeURIComponent(r.order)}`), t.length > 0 && (e += `?${t.join("&")}`), he(
    e,
    "GET",
    void 0,
    "Failed to list responses"
  );
}
async function Vy(r) {
  return he(
    `${we()}/v1/responses/${encodeURIComponent(r)}`,
    "GET",
    void 0,
    "Failed to retrieve response"
  );
}
async function Ly(r) {
  return he(
    `${we()}/v1/responses/${encodeURIComponent(r)}/cancel`,
    "POST",
    void 0,
    "Failed to cancel response"
  );
}
async function Hy() {
  return he(
    `${we()}/v1/conversations`,
    "DELETE",
    void 0,
    "Failed to delete conversations"
  );
}
async function Fy(r) {
  return he(
    `${we()}/v1/conversations/batch-delete`,
    "POST",
    { ids: r },
    "Failed to batch delete conversations"
  );
}
async function Gy(r) {
  let e = `${we()}/v1/conversations`;
  const t = [];
  return (r == null ? void 0 : r.limit) !== void 0 && t.push(`limit=${r.limit}`), r != null && r.after && t.push(`after=${encodeURIComponent(r.after)}`), r != null && r.before && t.push(`before=${encodeURIComponent(r.before)}`), t.length > 0 && (e += `?${t.join("&")}`), he(
    e,
    "GET",
    void 0,
    "Failed to list conversations"
  );
}
async function zy(r) {
  return he(
    `${we()}/v1/responses`,
    "POST",
    r,
    "Failed to create response"
  );
}
async function Ky(r) {
  return he(
    `${we()}/v1/responses/${encodeURIComponent(r)}`,
    "DELETE",
    void 0,
    "Failed to delete response"
  );
}
async function qy(r) {
  return he(
    `${we()}/v1/instructions`,
    "POST",
    r,
    "Failed to create instruction"
  );
}
async function Zy(r) {
  let e = `${we()}/v1/instructions`;
  const t = [];
  return (r == null ? void 0 : r.limit) !== void 0 && t.push(`limit=${r.limit}`), r != null && r.after && t.push(`after=${encodeURIComponent(r.after)}`), r != null && r.before && t.push(`before=${encodeURIComponent(r.before)}`), r != null && r.order && t.push(`order=${encodeURIComponent(r.order)}`), t.length > 0 && (e += `?${t.join("&")}`), he(
    e,
    "GET",
    void 0,
    "Failed to list instructions"
  );
}
async function Wy(r) {
  return he(
    `${we()}/v1/instructions/${encodeURIComponent(r)}`,
    "GET",
    void 0,
    "Failed to retrieve instruction"
  );
}
async function Yy(r, e) {
  return he(
    `${we()}/v1/instructions/${encodeURIComponent(r)}`,
    "POST",
    e,
    "Failed to update instruction"
  );
}
async function Jy(r) {
  return he(
    `${we()}/v1/instructions/${encodeURIComponent(r)}`,
    "DELETE",
    void 0,
    "Failed to delete instruction"
  );
}
async function Xy(r) {
  return he(
    `${we()}/v1/instructions/${encodeURIComponent(r)}/set-default`,
    "POST",
    void 0,
    "Failed to set default instruction"
  );
}
function Vw(r) {
  return async (e, t) => {
    var i, s;
    const n = () => {
      if (r != null && r.apiKey)
        return `Bearer ${r.apiKey}`;
      const o = Ue().persistent.getItem("access_token");
      if (!o)
        throw new Error("No access token or API key available");
      return `Bearer ${o}`;
    };
    try {
      const o = new Headers(t == null ? void 0 : t.headers);
      o.set("Authorization", n());
      const { sessionKey: c, sessionId: u } = await Ii(
        !1,
        r == null ? void 0 : r.apiUrl
      );
      if (!c || !u)
        throw new Error("No session key or ID available");
      o.set("x-session-id", u);
      const h = { ...t, headers: o };
      if (t != null && t.body) {
        const H = Td(c, t.body);
        h.body = JSON.stringify({ encrypted: H }), o.set("Content-Type", "application/json");
      }
      let v = await fetch(e, h);
      if (v.status === 401 && !(r != null && r.apiKey) && (console.warn("Unauthorized, refreshing access token"), await Lc(), o.set("Authorization", n()), h.headers = o, v = await fetch(e, h)), !v.ok) {
        const H = await v.text();
        throw console.error(
          "Request failed with response status:",
          v.status,
          " and message:",
          H
        ), new Error(
          `Request failed with status ${v.status}: ${H}`
        );
      }
      if ((i = v.headers.get("content-type")) != null && i.includes("text/event-stream")) {
        const H = (s = v.body) == null ? void 0 : s.getReader(), T = new TextDecoder();
        let m = "";
        const A = new ReadableStream({
          async start(k) {
            for (; ; ) {
              const { done: I, value: P } = await H.read();
              if (I) break;
              const D = T.decode(P);
              m += D;
              let de;
              for (; de = Lw(m); ) {
                m = m.slice(de.length);
                const et = de.split(`
`);
                for (const Re of et)
                  if (Re.trim().startsWith("event: "))
                    k.enqueue(Re + `
`);
                  else if (Re.trim().startsWith("data: ")) {
                    const Oe = Re.slice(6).trim();
                    if (Oe === "[DONE]")
                      k.enqueue(`data: [DONE]

`);
                    else
                      try {
                        const Le = ll(c, Oe);
                        k.enqueue(`data: ${Le}
`);
                      } catch (Le) {
                        console.error(
                          "Decryption error:",
                          Le,
                          "Data:",
                          Oe
                        ), console.log("Skipping corrupted chunk");
                      }
                  } else Re === "" && k.enqueue(`
`);
              }
            }
            k.close();
          }
        });
        return new Response(A, {
          headers: v.headers,
          status: v.status,
          statusText: v.statusText
        });
      }
      const b = await v.text();
      try {
        const H = JSON.parse(b);
        if (H.encrypted) {
          const T = ll(c, H.encrypted);
          try {
            const m = JSON.parse(T);
            if (m.content_base64 && m.content_type) {
              console.log(
                "TTS response detected with content_type:",
                m.content_type
              );
              let A;
              try {
                const I = atob(m.content_base64);
                A = new Uint8Array(I.length);
                for (let P = 0; P < I.length; P++)
                  A[P] = I.charCodeAt(P);
              } catch (I) {
                throw console.error("Failed to decode base64 audio data:", I), new Error("Invalid base64 audio data in TTS response");
              }
              console.log("Decoded audio bytes length:", A.length);
              const k = new Headers(v.headers);
              return k.set("content-type", m.content_type), k.delete("content-encoding"), k.delete("content-length"), k.delete("transfer-encoding"), new Response(A, {
                headers: k,
                status: v.status,
                statusText: v.statusText
              });
            }
          } catch {
          }
          return new Response(T, {
            headers: v.headers,
            status: v.status,
            statusText: v.statusText
          });
        }
      } catch {
        console.log("Response is not encrypted JSON, returning as-is");
      }
      return new Response(b, {
        headers: v.headers,
        status: v.status,
        statusText: v.statusText
      });
    } catch (o) {
      throw console.error("Error during fetch process:", o), o;
    }
  };
}
function Lw(r) {
  const e = r.indexOf(`

`);
  return e === -1 ? null : r.slice(0, e + 2);
}
const Hw = [
  "eeddbb58f57c38894d6d5af5e575fbe791c5bf3bbcfb5df8da8cfcf0c2e1da1913108e6a762112444740b88c163d7f4b",
  "74ed417f88cb0ca76c4a3d10f278bd010f1d3f95eafb254d4732511bb50e404507a4049b779c5230137e4091a5582271",
  "9043fcab93b972d3c14ad2dc8fa78ca7ad374fc937c02435681772a003f7a72876bc4d578089b5c4cf3fe9b480f1aabb",
  "52c3595b151d93d8b159c257301bfd5aa6f49210de0c55a6cd6df5ebeee44e4206cab950500f5d188f7fa14e6d900b75",
  "91cb67311e910cce68cd5b7d0de77aa40610d87c6681439b44c46c3ff786ae643956ab2c812478a1da8745b259f07a45",
  "859065ac81b81d3735130ba08b8af72a7256b603fefb74faabae25ed28cca6edcaa7c10ea32b5948d675c18a9b0f2b1d",
  "acd82a7d3943e23e95a9dc3ce0b0107ea358d6287f9e3afa245622f7c7e3e0a66142a928b6efcc02f594a95366d3a99d"
], Fw = [
  "62c0407056217a4c10764ed9045694c29fa93255d3cc04c2f989cdd9a1f8050c8b169714c71f1118ebce2fcc9951d1a9",
  "cb95519905443f9f66f05f63c548b61ad1561a27fd5717b69285861aaea3c3063fe12a2571773b67fea3c6c11b4d8ec6",
  "deb5895831b5e4286f5a2dcf5e9c27383821446f8df2b465f141d10743599be20ba3bb381ce063bf7139cc89f7f61d4c",
  "70ba26c6af1ec3b57ce80e1adcc0ee96d70224d4c7a078f427895cdf68e1c30f09b5ac4c456588d872f3f21ff77c036b",
  "669404ea71435b8f498b48db7816a5c2ab1d258b1a77685b11d84d15a73189504d79c4dee13a658de9f4a0cbfc39cfe8",
  "a791bf92c25ffdfd372660e460a0e238c6778c090672df6509ae4bc065cf8668b6baac6b6a11d554af53ee0ff0172ad5",
  "c4285443b87b9b12a6cea3bef1064ec060f652b235a297095975af8f134e5ed65f92d70d4616fdec80af9dff48bb9f35"
], Gw = "MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEHiUY9kFWK1GqBGzczohhwEwElXzgWLDZa9R6wBx3JOBocgSt9+UIzZlJbPDjYeGBfDUXh7Z62BG2vVsh2NgclLB5S7A2ucBBtb1wd8vSQHP8jpdPhZX1slauPgbnROIP", zw = {
  prod: "https://raw.githubusercontent.com/OpenSecretCloud/opensecret/master/pcrProdHistory.json",
  dev: "https://raw.githubusercontent.com/OpenSecretCloud/opensecret/master/pcrDevHistory.json"
};
async function Kw() {
  try {
    const r = new Uint8Array(
      atob(Gw).split("").map((e) => e.charCodeAt(0))
    );
    return await crypto.subtle.importKey(
      "spki",
      // The format: SubjectPublicKeyInfo
      r,
      // Pass the Uint8Array directly, not .buffer
      {
        name: "ECDSA",
        // The algorithm
        namedCurve: "P-384"
        // The curve (must be P-384 to match our backend)
      },
      !1,
      // Not extractable
      ["verify"]
      // Only for verification
    );
  } catch (r) {
    throw console.error("Error importing verification key:", r), new Error("Failed to import PCR verification key");
  }
}
async function qw(r, e) {
  try {
    const t = (e == null ? void 0 : e[r]) || zw[r], n = await fetch(t);
    if (!n.ok)
      throw new Error(`Failed to fetch PCR history: ${n.status}`);
    return await n.json();
  } catch (t) {
    throw console.error("Error fetching PCR history:", t), new Error("Failed to fetch PCR history");
  }
}
async function Zw(r, e, t) {
  try {
    const i = new TextEncoder().encode(r), s = new Uint8Array(
      atob(e).split("").map((o) => o.charCodeAt(0))
    );
    return await crypto.subtle.verify(
      {
        name: "ECDSA",
        hash: { name: "SHA-384" }
        // Must match the hash used for signing
      },
      t,
      s,
      i
    );
  } catch (n) {
    return console.error("Signature verification error:", n), !1;
  }
}
async function _d(r, e, t) {
  try {
    const n = await Kw(), i = await qw(e, t);
    for (const s of i)
      if (s.PCR0 === r && await Zw(s.PCR0, s.signature, n))
        return {
          isMatch: !0,
          text: "PCR0 matches remotely attested value",
          verifiedAt: new Date(s.timestamp * 1e3).toLocaleString()
        };
    return null;
  } catch (n) {
    return console.error("PCR remote validation error:", n), null;
  }
}
async function Ww(r, e) {
  const t = [...(e == null ? void 0 : e.pcr0Values) || [], ...Hw], n = [...(e == null ? void 0 : e.pcr0DevValues) || [], ...Fw];
  if (t.includes(r))
    return {
      isMatch: !0,
      text: "PCR0 matches a known good value"
    };
  if (n.includes(r))
    return {
      isMatch: !0,
      text: "PCR0 matches development enclave"
    };
  if ((e == null ? void 0 : e.remoteAttestation) !== !1)
    try {
      const s = await _d(
        r,
        "prod",
        e == null ? void 0 : e.remoteAttestationUrls
      );
      if (s)
        return s;
      const o = await _d(
        r,
        "dev",
        e == null ? void 0 : e.remoteAttestationUrls
      );
      if (o)
        return o;
    } catch (s) {
      console.error("Error during remote PCR validation:", s);
    }
  return {
    isMatch: !1,
    text: "PCR0 does not match a known good value"
  };
}
const ns = Va, Hc = "641a0321a3e244efe456463195d606317ed7cdcc3c1756e09893f3c68f79bb5b";
function Qy(r) {
  return Array.from(r).map((e) => e.toString(16).padStart(2, "0")).join("");
}
async function Yw(r) {
  const e = await crypto.subtle.digest("SHA-256", r);
  return Qy(new Uint8Array(e));
}
async function is(r, e, t) {
  console.log("Raw timestamp:", r.timestamp), console.log("Date object:", new Date(r.timestamp));
  const n = Array.from(r.pcrs.entries()).map(([v, b]) => ({
    id: v,
    value: Qy(b)
  })).filter((v) => !v.value.match(/^0+$/)), i = n.find((v) => v.id === 0);
  let s = null;
  i && (s = await Ww(i.value, t));
  const o = [...e, r.certificate].map((v) => {
    const b = new xi(v);
    return {
      subject: b.subject,
      notBefore: b.notBefore.toLocaleString(),
      notAfter: b.notAfter.toLocaleString(),
      pem: b.toString("pem"),
      isRoot: b.subject === "C=US, O=Amazon, OU=AWS, CN=aws.nitro-enclaves"
    };
  }), c = new TextDecoder(), u = new xi(e[0]), h = await Yw(u.rawData);
  return {
    moduleId: r.module_id,
    publicKey: r.public_key ? Er(r.public_key) : null,
    timestamp: new Date(r.timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short"
    }),
    digest: r.digest,
    pcrs: n,
    certificates: o,
    userData: r.user_data ? c.decode(r.user_data) : null,
    nonce: r.nonce ? c.decode(r.nonce) : null,
    cert0hash: h,
    validatedPcr0Hash: s
  };
}
const eg = Cd({
  auth: {
    loading: !0,
    user: void 0
  },
  clientId: "",
  apiKey: void 0,
  setApiKey: () => {
  },
  signIn: async () => {
  },
  signUp: async () => {
  },
  signInGuest: async () => {
  },
  signUpGuest: async () => ({
    id: "",
    email: void 0,
    access_token: "",
    refresh_token: ""
  }),
  convertGuestToUserAccount: async () => {
  },
  signOut: async () => {
  },
  get: Sy,
  put: by,
  list: _y,
  del: xy,
  delAll: Ay,
  verifyEmail: Ey,
  requestNewVerificationCode: Fa,
  requestNewVerificationEmail: Fa,
  refetchUser: async () => {
  },
  changePassword: Iy,
  refreshAccessToken: Lc,
  requestPasswordReset: async () => {
  },
  confirmPasswordReset: async () => {
  },
  requestAccountDeletion: async () => {
  },
  confirmAccountDeletion: async () => {
  },
  initiateGitHubAuth: async () => ({ auth_url: "", csrf_token: "" }),
  handleGitHubCallback: async () => {
  },
  initiateGoogleAuth: async () => ({ auth_url: "", csrf_token: "" }),
  handleGoogleCallback: async () => {
  },
  initiateAppleAuth: async () => ({ auth_url: "", state: "" }),
  handleAppleCallback: async () => {
  },
  handleAppleNativeSignIn: async () => {
  },
  getPrivateKey: ky,
  getPrivateKeyBytes: Cy,
  getPublicKey: Oy,
  signMessage: By,
  aiCustomFetch: async () => new Response(),
  apiUrl: "",
  pcrConfig: {},
  getAttestation: Ii,
  authenticate: Ei,
  parseAttestationForView: is,
  awsRootCertDer: ns,
  expectedRootCertHash: Hc,
  getAttestationDocument: async () => {
    throw new Error(
      "getAttestationDocument called outside of OpenSecretProvider"
    );
  },
  generateThirdPartyToken: async () => ({ token: "" }),
  encryptData: Ty,
  decryptData: Ny,
  fetchModels: Py,
  uploadDocument: Bf,
  checkDocumentStatus: Of,
  uploadDocumentWithPolling: Dy,
  createApiKey: jy,
  listApiKeys: Ry,
  deleteApiKey: Uy,
  transcribeAudio: $y,
  fetchResponsesList: My,
  fetchResponse: Vy,
  cancelResponse: Ly,
  deleteResponse: Ky,
  createResponse: zy,
  listConversations: Gy,
  deleteConversations: Hy,
  batchDeleteConversations: Fy,
  createInstruction: qy,
  listInstructions: Zy,
  getInstruction: Wy,
  updateInstruction: Yy,
  deleteInstruction: Jy,
  setDefaultInstruction: Xy
});
function Xx({
  children: r,
  apiUrl: e,
  clientId: t,
  pcrConfig: n = {}
}) {
  const [i, s] = Lo({
    loading: !0,
    user: void 0
  }), [o, c] = Lo(), [u, h] = Lo(), v = (Se) => {
    if (Se === void 0) {
      c(void 0);
      return;
    }
    const be = Se.trim();
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(be)) {
      console.warn(
        "setApiKey: provided key does not look like a UUID; clearing apiKey"
      ), c(void 0);
      return;
    }
    c(be);
  };
  Ns(() => {
    if (!e || e.trim() === "")
      throw new Error(
        "OpenSecretProvider requires a non-empty apiUrl. Please provide a valid API endpoint URL."
      );
    if (!t || t.trim() === "")
      throw new Error(
        "OpenSecretProvider requires a non-empty clientId. Please provide a valid project UUID."
      );
    yw({ apiUrl: e, clientId: t });
  }, [e, t]), Ns(() => {
    h(
      e ? () => Vw(o ? { apiKey: o } : void 0) : void 0
    );
  }, [e, o]);
  async function b() {
    const Se = Ue().persistent.getItem("access_token"), be = Ue().persistent.getItem("refresh_token");
    if (!Se || !be) {
      s({
        loading: !1,
        user: void 0
      });
      return;
    }
    try {
      const _e = await Aw();
      s({
        loading: !1,
        user: _e
      });
    } catch (_e) {
      console.error("Failed to fetch user:", _e), s({
        loading: !1,
        user: void 0
      });
    }
  }
  Ns(() => {
    b();
  }, []);
  async function H(Se, be) {
    console.log("Signing in");
    try {
      await mw(Se, be), v(void 0), await b();
    } catch (_e) {
      throw console.error(_e), _e;
    }
  }
  async function T(Se, be, _e, Ze) {
    try {
      await bw(Se, be, _e, Ze || null), v(void 0), await b();
    } catch (nt) {
      throw console.error(nt), nt;
    }
  }
  async function m(Se, be) {
    console.log("Signing in Guest");
    try {
      await ww(Se, be), v(void 0), await b();
    } catch (_e) {
      throw console.error(_e), _e;
    }
  }
  async function A(Se, be) {
    try {
      const _e = await xw(Se, be);
      return v(void 0), await b(), _e;
    } catch (_e) {
      throw console.error(_e), _e;
    }
  }
  async function k(Se, be, _e) {
    try {
      await Rw(Se, be, _e), await b();
    } catch (Ze) {
      throw console.error(Ze), Ze;
    }
  }
  async function I() {
    await Sw(), v(void 0), s({
      loading: !1,
      user: void 0
    });
  }
  const yt = {
    auth: i,
    clientId: t,
    apiKey: o,
    setApiKey: v,
    signIn: H,
    signInGuest: m,
    signOut: I,
    signUp: T,
    signUpGuest: A,
    convertGuestToUserAccount: k,
    get: Sy,
    put: by,
    list: _y,
    del: xy,
    delAll: Ay,
    refetchUser: b,
    verifyEmail: Ey,
    requestNewVerificationCode: Fa,
    requestNewVerificationEmail: Fa,
    changePassword: Iy,
    refreshAccessToken: Lc,
    requestPasswordReset: Iw,
    confirmPasswordReset: kw,
    requestAccountDeletion: Dw,
    confirmAccountDeletion: $w,
    initiateGitHubAuth: async (Se) => {
      try {
        return await Cw(Se);
      } catch (be) {
        throw console.error("Failed to initiate GitHub auth:", be), be;
      }
    },
    handleGitHubCallback: async (Se, be, _e) => {
      try {
        await Bw(Se, be, _e), v(void 0), await b();
      } catch (Ze) {
        throw console.error("GitHub callback error:", Ze), Ze;
      }
    },
    initiateGoogleAuth: async (Se) => {
      try {
        return await Ow(Se);
      } catch (be) {
        throw console.error("Failed to initiate Google auth:", be), be;
      }
    },
    handleGoogleCallback: async (Se, be, _e) => {
      try {
        await Tw(Se, be, _e), v(void 0), await b();
      } catch (Ze) {
        throw console.error("Google callback error:", Ze), Ze;
      }
    },
    initiateAppleAuth: async (Se) => {
      try {
        return await Nw(Se);
      } catch (be) {
        throw console.error("Failed to initiate Apple auth:", be), be;
      }
    },
    handleAppleCallback: async (Se, be, _e) => {
      try {
        await Pw(Se, be, _e), v(void 0), await b();
      } catch (Ze) {
        throw console.error("Apple callback error:", Ze), Ze;
      }
    },
    handleAppleNativeSignIn: async (Se, be) => {
      try {
        await jw(Se, be), v(void 0), await b();
      } catch (_e) {
        throw console.error("Apple native sign-in error:", _e), _e;
      }
    },
    getPrivateKey: ky,
    getPrivateKeyBytes: Cy,
    getPublicKey: Oy,
    signMessage: By,
    aiCustomFetch: u || (async () => new Response()),
    apiUrl: e,
    pcrConfig: n,
    getAttestation: Ii,
    authenticate: Ei,
    parseAttestationForView: is,
    awsRootCertDer: ns,
    expectedRootCertHash: Hc,
    getAttestationDocument: async () => {
      const Se = globalThis.crypto.randomUUID(), be = await fetch(`${e}/attestation/${Se}`);
      if (!be.ok)
        throw new Error("Failed to fetch attestation document");
      const _e = await be.json(), Ze = await Ei(
        _e.attestation_document,
        ns,
        Se
      );
      return is(
        Ze,
        Ze.cabundle,
        n
      );
    },
    generateThirdPartyToken: Uw,
    encryptData: Ty,
    decryptData: Ny,
    fetchModels: Py,
    uploadDocument: Bf,
    checkDocumentStatus: Of,
    uploadDocumentWithPolling: Dy,
    createApiKey: jy,
    listApiKeys: Ry,
    deleteApiKey: Uy,
    transcribeAudio: $y,
    fetchResponsesList: My,
    fetchResponse: Vy,
    cancelResponse: Ly,
    deleteResponse: Ky,
    createResponse: zy,
    listConversations: Gy,
    deleteConversations: Hy,
    batchDeleteConversations: Fy,
    createInstruction: qy,
    listInstructions: Zy,
    getInstruction: Wy,
    updateInstruction: Yy,
    deleteInstruction: Jy,
    setDefaultInstruction: Xy
  };
  return /* @__PURE__ */ kd(eg.Provider, { value: yt, children: r });
}
const tg = Cd({
  auth: {
    loading: !0,
    developer: void 0
  },
  signIn: async () => {
    throw new Error("signIn called outside of OpenSecretDeveloper provider");
  },
  signUp: async () => {
    throw new Error("signUp called outside of OpenSecretDeveloper provider");
  },
  signOut: async () => {
    throw new Error("signOut called outside of OpenSecretDeveloper provider");
  },
  refetchDeveloper: async () => {
    throw new Error(
      "refetchDeveloper called outside of OpenSecretDeveloper provider"
    );
  },
  verifyEmail: yy,
  requestNewVerificationCode: La,
  requestNewVerificationEmail: La,
  requestPasswordReset: gy,
  confirmPasswordReset: vy,
  changePassword: my,
  pcrConfig: {},
  getAttestation: Ii,
  authenticate: Ei,
  parseAttestationForView: is,
  awsRootCertDer: ns,
  expectedRootCertHash: Hc,
  getAttestationDocument: async () => {
    throw new Error(
      "getAttestationDocument called outside of OpenSecretDeveloper provider"
    );
  },
  createOrganization: K0,
  listOrganizations: q0,
  deleteOrganization: Z0,
  createProject: W0,
  listProjects: Y0,
  getProject: J0,
  updateProject: X0,
  deleteProject: Q0,
  createProjectSecret: ey,
  listProjectSecrets: ty,
  deleteProjectSecret: ry,
  getEmailSettings: ny,
  updateEmailSettings: iy,
  getOAuthSettings: sy,
  updateOAuthSettings: oy,
  inviteDeveloper: ay,
  listOrganizationMembers: fy,
  listOrganizationInvites: cy,
  getOrganizationInvite: ly,
  deleteOrganizationInvite: uy,
  updateMemberRole: hy,
  removeMember: dy,
  acceptInvite: py,
  apiUrl: ""
});
function Qx({
  children: r,
  apiUrl: e,
  pcrConfig: t = {}
}) {
  const [n, i] = Lo({
    loading: !0,
    developer: void 0
  });
  Ns(() => {
    if (!e || e.trim() === "")
      throw new Error(
        "OpenSecretDeveloper requires a non-empty apiUrl. Please provide a valid API endpoint URL."
      );
    cw(e), Ha.configurePlatform(e);
  }, [e]);
  async function s() {
    const v = Ue().persistent.getItem("access_token"), b = Ue().persistent.getItem("refresh_token");
    if (!v || !b) {
      i({
        loading: !1,
        developer: void 0
      });
      return;
    }
    try {
      const H = await pw();
      i({
        loading: !1,
        developer: {
          ...H.user,
          organizations: H.organizations
        }
      });
    } catch (H) {
      console.error("Failed to fetch developer:", H), i({
        loading: !1,
        developer: void 0
      });
    }
  }
  const o = async () => {
    const v = globalThis.crypto.randomUUID(), b = await fetch(`${e}/attestation/${v}`);
    if (!b.ok)
      throw new Error("Failed to fetch attestation document");
    const H = await b.json(), T = await Ei(
      H.attestation_document,
      ns,
      v
    );
    return is(
      T,
      T.cabundle,
      t
    );
  };
  Ns(() => {
    s();
  }, []);
  async function c(v, b) {
    try {
      const { access_token: H, refresh_token: T } = await lw(
        v,
        b
      );
      return Ue().persistent.setItem("access_token", H), Ue().persistent.setItem("refresh_token", T), await s(), { access_token: H, refresh_token: T, id: "", email: v };
    } catch (H) {
      throw console.error("Login error:", H), H;
    }
  }
  async function u(v, b, H, T) {
    try {
      const { access_token: m, refresh_token: A } = await uw(v, b, H, T);
      return Ue().persistent.setItem("access_token", m), Ue().persistent.setItem("refresh_token", A), await s(), { access_token: m, refresh_token: A, id: "", email: v, name: T };
    } catch (m) {
      throw console.error("Registration error:", m), m;
    }
  }
  const h = {
    auth: n,
    signIn: c,
    signUp: u,
    refetchDeveloper: s,
    signOut: async () => {
      const v = Ue().persistent.getItem("refresh_token");
      if (v)
        try {
          await fw(v);
        } catch (b) {
          console.error("Error during logout:", b);
        }
      Ue().persistent.removeItem("access_token"), Ue().persistent.removeItem("refresh_token"), i({
        loading: !1,
        developer: void 0
      });
    },
    verifyEmail: yy,
    requestNewVerificationCode: La,
    requestNewVerificationEmail: La,
    requestPasswordReset: gy,
    confirmPasswordReset: vy,
    changePassword: my,
    pcrConfig: t,
    getAttestation: Ii,
    authenticate: Ei,
    parseAttestationForView: is,
    awsRootCertDer: ns,
    expectedRootCertHash: Hc,
    getAttestationDocument: o,
    createOrganization: K0,
    listOrganizations: q0,
    deleteOrganization: Z0,
    createProject: W0,
    listProjects: Y0,
    getProject: J0,
    updateProject: X0,
    deleteProject: Q0,
    createProjectSecret: ey,
    listProjectSecrets: ty,
    deleteProjectSecret: ry,
    getEmailSettings: ny,
    updateEmailSettings: iy,
    getOAuthSettings: sy,
    updateOAuthSettings: oy,
    inviteDeveloper: ay,
    listOrganizationMembers: fy,
    listOrganizationInvites: cy,
    getOrganizationInvite: ly,
    deleteOrganizationInvite: uy,
    updateMemberRole: hy,
    removeMember: dy,
    acceptInvite: py,
    apiUrl: e
  };
  return /* @__PURE__ */ kd(tg.Provider, { value: h, children: r });
}
function e2() {
  return Bd(eg);
}
function t2() {
  return Bd(tg);
}
function r2() {
  const r = new Uint8Array(32);
  return crypto.getRandomValues(r), Array.from(r, (e) => e.toString(16).padStart(2, "0")).join("");
}
async function n2(r) {
  const t = new TextEncoder().encode(r), n = await crypto.subtle.digest("SHA-256", t);
  return Array.from(new Uint8Array(n)).map((s) => s.toString(16).padStart(2, "0")).join("");
}
export {
  eg as OpenSecretContext,
  Qx as OpenSecretDeveloper,
  tg as OpenSecretDeveloperContext,
  Xx as OpenSecretProvider,
  Ha as apiConfig,
  Ei as authenticate,
  ns as awsRootCertDer,
  Iy as changePassword,
  Of as checkDocumentStatus,
  yw as configure,
  $w as confirmAccountDeletion,
  kw as confirmPasswordReset,
  Rw as convertGuestToUserAccount,
  Vw as createAiCustomFetch,
  jy as createApiKey,
  Vw as createCustomFetch,
  Ny as decryptData,
  xy as del,
  Uy as deleteApiKey,
  Ty as encryptData,
  Hc as expectedRootCertHash,
  Py as fetchModels,
  Aw as fetchUser,
  r2 as generateSecureSecret,
  Uw as generateThirdPartyToken,
  Sy as get,
  we as getApiUrl,
  Ii as getAttestation,
  Dr as getConfig,
  ky as getPrivateKey,
  Cy as getPrivateKeyBytes,
  Oy as getPublicKey,
  Ue as getStorage,
  Pw as handleAppleCallback,
  jw as handleAppleNativeSignIn,
  Bw as handleGitHubCallback,
  Tw as handleGoogleCallback,
  n2 as hashSecret,
  Nw as initiateAppleAuth,
  Cw as initiateGitHubAuth,
  Ow as initiateGoogleAuth,
  gw as isConfigured,
  _y as list,
  Ry as listApiKeys,
  is as parseAttestationForView,
  by as put,
  Lc as refreshAccessToken,
  Dw as requestAccountDeletion,
  Fa as requestNewVerificationCode,
  Iw as requestPasswordReset,
  Jx as resetConfig,
  mw as signIn,
  ww as signInGuest,
  By as signMessage,
  Sw as signOut,
  bw as signUp,
  xw as signUpGuest,
  Bf as uploadDocument,
  Dy as uploadDocumentWithPolling,
  e2 as useOpenSecret,
  t2 as useOpenSecretDeveloper,
  Ey as verifyEmail
};

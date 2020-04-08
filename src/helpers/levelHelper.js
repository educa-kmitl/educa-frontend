export const leveling = likes => {
  const title = ['Novice', 'Intermediate', 'Expert', 'Professional']
  const color = ['green', 'blue', 'red', 'purple']
  const rank = [
    { title: title[0], lv: 1, color: color[0] },
    { title: title[0], lv: 2, color: color[0] },
    { title: title[0], lv: 3, color: color[0] },
    { title: title[1], lv: 1, color: color[1] },
    { title: title[1], lv: 2, color: color[1] },
    { title: title[1], lv: 3, color: color[1] },
    { title: title[2], lv: 1, color: color[2] },
    { title: title[2], lv: 2, color: color[2] },
    { title: title[2], lv: 3, color: color[2] },
    { title: title[3], lv: 1, color: color[3] },
    { title: title[3], lv: 2, color: color[3] },
    { title: title[3], lv: 3, color: color[3] }
  ]
  const requiredExp = level => {
    if (level === 1) return 2
    if (level === 2) return 3 //
    if (level === 3) return 5
    if (level === 4) return 8
    if (level === 5) return 12 //
    if (level === 6) return 15
    if (level === 7) return 18
    if (level === 8) return 22 //
    if (level === 9) return 30
    if (level === 10) return 40
    if (level === 11) return 50
    return 50
  }
  let lv = 1
  let exp = likes
  while (lv < 12 && exp >= 0) {
    exp = exp - requiredExp(lv)
    lv = lv + 1
    if (exp < 0) lv = lv - 1
  }
  return {
    ...rank[lv - 1],
    percent: `${(100 * (exp + requiredExp(lv))) / requiredExp(lv)}%`
  }
}
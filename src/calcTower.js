function recalcTower(num, from, mid, to) {
  if (num === 0) {
    return [];
  }

  const ans = [];
  ans.push(...recalcTower(num - 1, from, to, mid));
  ans.push({ num, from, to });
  ans.push(...recalcTower(num - 1, mid, from, to));
  return ans;
}

function calcTower(num) {
 return recalcTower(num, 1, 2, 3);
}

export default calcTower;

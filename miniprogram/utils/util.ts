// 时间格式【2022/08/12 14：31：13】
export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
}

// 10位空缺补零
const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : '0' + s;
}

// 随机颜色，格式：#ffffff
export const getRandomColor = () => {
  // 法一：
  // let r = Math.floor(Math.random() * 256);
  // let g = Math.floor(Math.random() * 256);
  // let b = Math.floor(Math.random() * 256);
  // let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  // return color;

  // 法二：
  const getColor = function (color: string): string {
    if (color && color.length === 6) {
      return '#' + color;
    }
    color += "0123456789abcdef"[Math.floor(Math.random() * 16)];
    return getColor(color);
  }
  return getColor('');
}

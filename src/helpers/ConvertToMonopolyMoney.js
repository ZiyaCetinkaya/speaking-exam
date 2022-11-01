var convert = {
  Convert(money) {
    if (money <= 0) return "0M";
    else if (money >= 100000 && money < 1000000) return `${money / 1000}K`;
    else if (money >= 1000000) return `${money / 1000000}M`;
    else return "0M";
  },
};

export default convert;

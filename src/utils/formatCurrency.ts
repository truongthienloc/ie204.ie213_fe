const formatCurrency = (price: number) => {
  return new Intl.NumberFormat('en-DE').format(price);
};

export default formatCurrency;

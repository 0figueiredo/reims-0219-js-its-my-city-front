const pickColor = (keyword) => {
  switch (keyword) {
    case 'Sport & Loisirs':
      return 'st0_1';
    case 'Nature & Développement Durable':
      return 'st0_2';
    case 'Services Publics':
      return 'st0_3';
    case 'Vie Quotidienne':
      return 'st0_4';
    case 'Transports & Mobilité':
      return 'st0_5';
    default: return 'st0';
  }
};

export default pickColor;

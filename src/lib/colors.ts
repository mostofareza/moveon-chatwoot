const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#F8990D';
    case 'approved':
      return '#00893C';
    case 'delivered':
      return '#00893C';
    case 'cancelled':
      return '#ba0606';
    case 'processing':
      return '#1565C0';
    default:
      return '#000000';
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#fbefe0';
    case 'approved':
      return '#e6f4ea';
    case 'delivered':
      return '#EFFFF6';
    case 'cancelled':
      return '#ffeeee';
    case 'processing':
      return '#eefbff';
    default:
      return '#d1d0d0';
  }
}

export { getStatusColor, getStatusBadgeColor };

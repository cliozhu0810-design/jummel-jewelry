// Mock data for admin dashboard

export const mockProducts = [
  {
    id: 1,
    name: '经典钻石戒指',
    code: 'JM-R001',
    price: 12800,
    stock: 15,
    category: '戒指',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    status: 'active',
    sales: 45
  },
  {
    id: 2,
    name: '优雅珍珠项链',
    code: 'JM-N001',
    price: 8900,
    stock: 8,
    category: '项链',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
    status: 'active',
    sales: 32
  },
  {
    id: 3,
    name: '时尚手链',
    code: 'JM-B001',
    price: 5600,
    stock: 3,
    category: '手链',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
    status: 'active',
    sales: 28
  },
  {
    id: 4,
    name: '奢华耳环',
    code: 'JM-E001',
    price: 6800,
    stock: 20,
    category: '耳环',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
    status: 'active',
    sales: 56
  },
  {
    id: 5,
    name: '复古胸针',
    code: 'JM-P001',
    price: 4200,
    stock: 2,
    category: '胸针',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    status: 'low_stock',
    sales: 18
  },
  {
    id: 6,
    name: '订婚戒指',
    code: 'JM-R002',
    price: 18900,
    stock: 12,
    category: '戒指',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400',
    status: 'active',
    sales: 67
  }
];

export const mockOrders = [
  {
    id: 'ORD-2024-001',
    customer: {
      name: '张小姐',
      email: 'zhang@example.com',
      phone: '+86 138 0000 1234'
    },
    items: [
      { productId: 1, name: '经典钻石戒指', quantity: 1, price: 12800 }
    ],
    total: 12800,
    status: 'pending',
    paymentStatus: 'paid',
    trackingNumber: '',
    createdAt: '2024-05-09T10:30:00',
    shippingAddress: '上海市浦东新区世纪大道1000号'
  },
  {
    id: 'ORD-2024-002',
    customer: {
      name: '李先生',
      email: 'li@example.com',
      phone: '+86 139 0000 5678'
    },
    items: [
      { productId: 2, name: '优雅珍珠项链', quantity: 1, price: 8900 },
      { productId: 4, name: '奢华耳环', quantity: 1, price: 6800 }
    ],
    total: 15700,
    status: 'processing',
    paymentStatus: 'paid',
    trackingNumber: 'SF1234567890',
    createdAt: '2024-05-08T14:20:00',
    shippingAddress: '北京市朝阳区建国路88号'
  },
  {
    id: 'ORD-2024-003',
    customer: {
      name: '王女士',
      email: 'wang@example.com',
      phone: '+86 137 0000 9012'
    },
    items: [
      { productId: 6, name: '订婚戒指', quantity: 1, price: 18900 }
    ],
    total: 18900,
    status: 'shipped',
    paymentStatus: 'paid',
    trackingNumber: 'SF0987654321',
    createdAt: '2024-05-07T09:15:00',
    shippingAddress: '广州市天河区珠江新城花城大道123号'
  },
  {
    id: 'ORD-2024-004',
    customer: {
      name: '陈先生',
      email: 'chen@example.com',
      phone: '+86 136 0000 3456'
    },
    items: [
      { productId: 3, name: '时尚手链', quantity: 2, price: 5600 }
    ],
    total: 11200,
    status: 'delivered',
    paymentStatus: 'paid',
    trackingNumber: 'SF5678901234',
    createdAt: '2024-05-05T16:45:00',
    shippingAddress: '深圳市南山区科技园南区'
  },
  {
    id: 'ORD-2024-005',
    customer: {
      name: '刘小姐',
      email: 'liu@example.com',
      phone: '+86 135 0000 7890'
    },
    items: [
      { productId: 5, name: '复古胸针', quantity: 1, price: 4200 }
    ],
    total: 4200,
    status: 'pending',
    paymentStatus: 'pending',
    trackingNumber: '',
    createdAt: '2024-05-09T11:00:00',
    shippingAddress: '杭州市西湖区文三路456号'
  }
];

export const mockStats = {
  totalOrders: 156,
  totalRevenue: 1248600,
  totalProducts: 48,
  totalUsers: 892,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  productsGrowth: 5.2,
  usersGrowth: 15.7
};

export const mockSalesData = [
  { month: '1月', sales: 85000 },
  { month: '2月', sales: 92000 },
  { month: '3月', sales: 108000 },
  { month: '4月', sales: 125000 },
  { month: '5月', sales: 142000 },
  { month: '6月', sales: 158000 }
];

export const mockLowStockProducts = mockProducts.filter(p => p.stock < 5);

export const mockRecentOrders = mockOrders.slice(0, 5);

export const orderStatusMap = {
  pending: { label: '待处理', color: '#f39c12' },
  processing: { label: '处理中', color: '#3498db' },
  shipped: { label: '已发货', color: '#9b59b6' },
  delivered: { label: '已送达', color: '#27ae60' },
  cancelled: { label: '已取消', color: '#e74c3c' }
};

export const paymentStatusMap = {
  pending: { label: '待支付', color: '#f39c12' },
  paid: { label: '已支付', color: '#27ae60' },
  refunded: { label: '已退款', color: '#e74c3c' }
};

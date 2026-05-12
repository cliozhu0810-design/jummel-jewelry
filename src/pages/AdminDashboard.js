import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { mockStats, mockSalesData, mockLowStockProducts, mockRecentOrders, orderStatusMap } from '../data/mockData';

function AdminDashboard() {
  const stats = [
    {
      title: '总订单',
      value: mockStats.totalOrders,
      growth: mockStats.ordersGrowth,
      icon: ShoppingCart,
      color: '#3498db',
      bgColor: '#e3f2fd'
    },
    {
      title: '总收入',
      value: `¥${(mockStats.totalRevenue / 10000).toFixed(1)}万`,
      growth: mockStats.revenueGrowth,
      icon: DollarSign,
      color: '#27ae60',
      bgColor: '#e8f5e9'
    },
    {
      title: '产品数量',
      value: mockStats.totalProducts,
      growth: mockStats.productsGrowth,
      icon: Package,
      color: '#9b59b6',
      bgColor: '#f3e5f5'
    },
    {
      title: '用户数',
      value: mockStats.totalUsers,
      growth: mockStats.usersGrowth,
      icon: Users,
      color: '#e67e22',
      bgColor: '#fff3e0'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="admin-page-header">
          <h1>仪表板</h1>
          <p>欢迎回来，这是您的业务概览</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.growth > 0;
            
            return (
              <motion.div
                key={stat.title}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="stat-icon" style={{ backgroundColor: stat.bgColor }}>
                  <Icon size={28} style={{ color: stat.color }} />
                </div>
                <div className="stat-content">
                  <p className="stat-title">{stat.title}</p>
                  <h3 className="stat-value">{stat.value}</h3>
                  <div className={`stat-growth ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span>{Math.abs(stat.growth)}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sales Chart */}
        <motion.div
          className="dashboard-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="section-header">
            <h2>
              <TrendingUp size={24} />
              销售趋势
            </h2>
          </div>
          <div className="sales-chart">
            <div className="chart-bars">
              {mockSalesData.map((data, index) => {
                const maxSales = Math.max(...mockSalesData.map(d => d.sales));
                const height = (data.sales / maxSales) * 100;
                
                return (
                  <div key={data.month} className="chart-bar-container">
                    <motion.div
                      className="chart-bar"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    >
                      <span className="chart-value">¥{(data.sales / 1000).toFixed(0)}k</span>
                    </motion.div>
                    <span className="chart-label">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="dashboard-grid">
          {/* Low Stock Alert */}
          <motion.div
            className="dashboard-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="section-header">
              <h2>
                <AlertTriangle size={24} />
                低库存预警
              </h2>
              <Link to="/admin/inventory" className="section-link">
                查看全部
              </Link>
            </div>
            <div className="low-stock-list">
              {mockLowStockProducts.map((product) => (
                <div key={product.id} className="low-stock-item">
                  <img src={product.image} alt={product.name} />
                  <div className="low-stock-info">
                    <h4>{product.name}</h4>
                    <p className="product-code">{product.code}</p>
                  </div>
                  <div className="stock-badge warning">
                    库存: {product.stock}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            className="dashboard-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="section-header">
              <h2>
                <ShoppingCart size={24} />
                最近订单
              </h2>
              <Link to="/admin/orders" className="section-link">
                查看全部
              </Link>
            </div>
            <div className="recent-orders-list">
              {mockRecentOrders.map((order) => (
                <div key={order.id} className="recent-order-item">
                  <div className="order-info">
                    <h4>{order.id}</h4>
                    <p>{order.customer.name}</p>
                    <span className="order-date">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-details">
                    <p className="order-total">¥{order.total.toLocaleString()}</p>
                    <span
                      className="order-status-badge"
                      style={{ backgroundColor: orderStatusMap[order.status].color }}
                    >
                      {orderStatusMap[order.status].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;

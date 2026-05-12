import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Eye,
  Truck,
  X,
  Package,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { mockOrders, orderStatusMap, paymentStatusMap } from '../data/mockData';

function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleTrackingUpdate = (orderId, trackingNumber) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, trackingNumber } : order
    ));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, trackingNumber });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="admin-orders">
        <div className="admin-page-header">
          <div>
            <h1>订单管理</h1>
            <p>查看和管理所有订单</p>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="搜索订单号或客户名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">全部状态</option>
              {Object.keys(orderStatusMap).map(status => (
                <option key={status} value={status}>
                  {orderStatusMap[status].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <motion.div
          className="admin-table-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <table className="admin-table">
            <thead>
              <tr>
                <th>订单号</th>
                <th>客户</th>
                <th>商品数量</th>
                <th>总金额</th>
                <th>订单状态</th>
                <th>支付状态</th>
                <th>下单时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="order-id">{order.id}</td>
                  <td>
                    <div className="customer-info">
                      <strong>{order.customer.name}</strong>
                      <span>{order.customer.email}</span>
                    </div>
                  </td>
                  <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td className="order-total">¥{order.total.toLocaleString()}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: orderStatusMap[order.status].color }}
                    >
                      {orderStatusMap[order.status].label}
                    </span>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: paymentStatusMap[order.paymentStatus].color }}
                    >
                      {paymentStatusMap[order.paymentStatus].label}
                    </span>
                  </td>
                  <td className="order-date">{formatDate(order.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon btn-view"
                        onClick={() => handleViewDetails(order)}
                        title="查看详情"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="empty-state">
              <p>没有找到匹配的订单</p>
            </div>
          )}
        </motion.div>

        {/* Order Detail Modal */}
        {showDetailModal && selectedOrder && (
          <div className="modal-backdrop" onClick={() => setShowDetailModal(false)}>
            <motion.div
              className="modal-content modal-large"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>订单详情 - {selectedOrder.id}</h2>
                <button className="modal-close" onClick={() => setShowDetailModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="order-detail-content">
                {/* Customer Info */}
                <div className="detail-section">
                  <h3>客户信息</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <strong>姓名：</strong>
                      <span>{selectedOrder.customer.name}</span>
                    </div>
                    <div className="info-item">
                      <Mail size={16} />
                      <span>{selectedOrder.customer.email}</span>
                    </div>
                    <div className="info-item">
                      <Phone size={16} />
                      <span>{selectedOrder.customer.phone}</span>
                    </div>
                    <div className="info-item">
                      <MapPin size={16} />
                      <span>{selectedOrder.shippingAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="detail-section">
                  <h3>订单商品</h3>
                  <div className="order-items-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="order-item-row">
                        <div className="item-info">
                          <Package size={20} />
                          <div>
                            <strong>{item.name}</strong>
                            <span>数量: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="item-price">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-total-row">
                    <strong>订单总额：</strong>
                    <strong className="total-amount">¥{selectedOrder.total.toLocaleString()}</strong>
                  </div>
                </div>

                {/* Order Status */}
                <div className="detail-section">
                  <h3>订单状态</h3>
                  <div className="status-update-section">
                    <div className="form-group">
                      <label>订单状态</label>
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
                        className="status-select"
                      >
                        {Object.keys(orderStatusMap).map(status => (
                          <option key={status} value={status}>
                            {orderStatusMap[status].label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <Truck size={18} />
                        物流单号
                      </label>
                      <input
                        type="text"
                        value={selectedOrder.trackingNumber}
                        onChange={(e) => handleTrackingUpdate(selectedOrder.id, e.target.value)}
                        placeholder="输入物流单号"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="detail-section">
                  <h3>订单时间</h3>
                  <div className="order-timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <strong>订单创建</strong>
                        <span>{formatDate(selectedOrder.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowDetailModal(false)}>
                  关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminOrders;

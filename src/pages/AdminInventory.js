import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Package,
  Edit,
  Save,
  X
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { mockProducts } from '../data/mockData';

function AdminInventory() {
  const [products, setProducts] = useState(mockProducts);
  const [editingStock, setEditingStock] = useState({});

  const lowStockProducts = products.filter(p => p.stock < 5);
  const outOfStockProducts = products.filter(p => p.stock === 0);
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const averageStock = Math.round(totalStock / products.length);

  const handleStockEdit = (productId, value) => {
    setEditingStock({
      ...editingStock,
      [productId]: value
    });
  };

  const handleStockSave = (productId) => {
    const newStock = parseInt(editingStock[productId]);
    if (!isNaN(newStock) && newStock >= 0) {
      setProducts(products.map(p => 
        p.id === productId ? { ...p, stock: newStock } : p
      ));
      const { [productId]: _, ...rest } = editingStock;
      setEditingStock(rest);
    }
  };

  const handleStockCancel = (productId) => {
    const { [productId]: _, ...rest } = editingStock;
    setEditingStock(rest);
  };

  const handleBulkUpdate = (adjustment) => {
    setProducts(products.map(p => ({
      ...p,
      stock: Math.max(0, p.stock + adjustment)
    })));
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: '缺货', color: '#e74c3c', icon: AlertTriangle };
    if (stock < 5) return { label: '低库存', color: '#f39c12', icon: TrendingDown };
    return { label: '正常', color: '#27ae60', icon: TrendingUp };
  };

  return (
    <AdminLayout>
      <div className="admin-inventory">
        <div className="admin-page-header">
          <div>
            <h1>库存管理</h1>
            <p>监控和管理产品库存</p>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="inventory-stats-grid">
          <motion.div
            className="inventory-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="stat-icon" style={{ backgroundColor: '#e3f2fd' }}>
              <Package size={28} style={{ color: '#3498db' }} />
            </div>
            <div className="stat-content">
              <p className="stat-title">总库存</p>
              <h3 className="stat-value">{totalStock}</h3>
              <span className="stat-subtitle">件商品</span>
            </div>
          </motion.div>

          <motion.div
            className="inventory-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stat-icon" style={{ backgroundColor: '#fff3e0' }}>
              <AlertTriangle size={28} style={{ color: '#f39c12' }} />
            </div>
            <div className="stat-content">
              <p className="stat-title">低库存预警</p>
              <h3 className="stat-value">{lowStockProducts.length}</h3>
              <span className="stat-subtitle">需要补货</span>
            </div>
          </motion.div>

          <motion.div
            className="inventory-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-icon" style={{ backgroundColor: '#ffebee' }}>
              <TrendingDown size={28} style={{ color: '#e74c3c' }} />
            </div>
            <div className="stat-content">
              <p className="stat-title">缺货商品</p>
              <h3 className="stat-value">{outOfStockProducts.length}</h3>
              <span className="stat-subtitle">急需补货</span>
            </div>
          </motion.div>

          <motion.div
            className="inventory-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-icon" style={{ backgroundColor: '#e8f5e9' }}>
              <TrendingUp size={28} style={{ color: '#27ae60' }} />
            </div>
            <div className="stat-content">
              <p className="stat-title">平均库存</p>
              <h3 className="stat-value">{averageStock}</h3>
              <span className="stat-subtitle">件/产品</span>
            </div>
          </motion.div>
        </div>

        {/* Bulk Actions */}
        <motion.div
          className="bulk-actions-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>批量操作</h3>
          <div className="bulk-actions-buttons">
            <button className="btn-secondary" onClick={() => handleBulkUpdate(10)}>
              全部 +10
            </button>
            <button className="btn-secondary" onClick={() => handleBulkUpdate(5)}>
              全部 +5
            </button>
            <button className="btn-secondary" onClick={() => handleBulkUpdate(-5)}>
              全部 -5
            </button>
          </div>
        </motion.div>

        {/* Inventory Table */}
        <motion.div
          className="admin-table-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <table className="admin-table inventory-table">
            <thead>
              <tr>
                <th>图片</th>
                <th>产品名称</th>
                <th>编号</th>
                <th>分类</th>
                <th>当前库存</th>
                <th>状态</th>
                <th>销量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const status = getStockStatus(product.stock);
                const StatusIcon = status.icon;
                const isEditing = editingStock.hasOwnProperty(product.id);
                
                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={product.stock < 5 ? 'low-stock-row' : ''}
                  >
                    <td>
                      <img src={product.image} alt={product.name} className="product-thumb" />
                    </td>
                    <td className="product-name">{product.name}</td>
                    <td className="product-code">{product.code}</td>
                    <td>
                      <span className="category-badge">{product.category}</span>
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          className="stock-input"
                          value={editingStock[product.id]}
                          onChange={(e) => handleStockEdit(product.id, e.target.value)}
                          min="0"
                          autoFocus
                        />
                      ) : (
                        <span className="stock-value">{product.stock}</span>
                      )}
                    </td>
                    <td>
                      <span
                        className="inventory-status-badge"
                        style={{ backgroundColor: status.color }}
                      >
                        <StatusIcon size={14} />
                        {status.label}
                      </span>
                    </td>
                    <td>{product.sales}</td>
                    <td>
                      <div className="action-buttons">
                        {isEditing ? (
                          <>
                            <button
                              className="btn-icon btn-save"
                              onClick={() => handleStockSave(product.id)}
                              title="保存"
                            >
                              <Save size={18} />
                            </button>
                            <button
                              className="btn-icon btn-cancel"
                              onClick={() => handleStockCancel(product.id)}
                              title="取消"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn-icon btn-edit"
                            onClick={() => handleStockEdit(product.id, product.stock)}
                            title="编辑库存"
                          >
                            <Edit size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Low Stock Alert Section */}
        {lowStockProducts.length > 0 && (
          <motion.div
            className="alert-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="alert-header">
              <AlertTriangle size={24} />
              <h3>低库存预警 ({lowStockProducts.length})</h3>
            </div>
            <div className="alert-products-grid">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="alert-product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="alert-product-info">
                    <h4>{product.name}</h4>
                    <p className="product-code">{product.code}</p>
                    <div className="alert-stock-info">
                      <span className="stock-warning">库存: {product.stock}</span>
                      <span className="sales-info">销量: {product.sales}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminInventory;

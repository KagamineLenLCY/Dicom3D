/**
 * 模拟数据
 * 用于前端开发和测试
 */

// 最近病例数据
export const recentCases = [
  {
    id: 'P20240315-001',
    name: '肺部CT扫描',
    uploadTime: '2024-03-15 14:32',
    slices: 128,
    status: 'completed'
  },
  {
    id: 'P20240314-022',
    name: '肾脏MRI',
    uploadTime: '2024-03-14 09:18',
    slices: 256,
    status: 'completed'
  },
  {
    id: 'P20240313-015',
    name: '骨骼CT',
    uploadTime: '2024-03-13 16:45',
    slices: 192,
    status: 'processing'
  },
  {
    id: 'P20240312-008',
    name: '肝脏CT增强',
    uploadTime: '2024-03-12 11:20',
    slices: 320,
    status: 'completed'
  }
]

// 工作库数据
export const libraryData = [
  {
    id: 'P20240315-001',
    organ: '肺部',
    status: 'completed',
    uploadTime: '2024-03-15 14:32',
    slices: 128
  },
  {
    id: 'P20240314-022',
    organ: '肾脏',
    status: 'completed',
    uploadTime: '2024-03-14 09:18',
    slices: 256
  },
  {
    id: 'P20240313-015',
    organ: '骨骼',
    status: 'processing',
    uploadTime: '2024-03-13 16:45',
    slices: 192
  },
  {
    id: 'P20240312-008',
    organ: '肝脏',
    status: 'completed',
    uploadTime: '2024-03-12 11:20',
    slices: 320
  },
  {
    id: 'P20240311-034',
    organ: '肺部',
    status: 'completed',
    uploadTime: '2024-03-11 15:50',
    slices: 156
  },
  {
    id: 'P20240310-019',
    organ: '心脏',
    status: 'processing',
    uploadTime: '2024-03-10 10:12',
    slices: 288
  }
]

// 病例树数据
export const caseTree = [
  {
    id: 'P20240315-001',
    name: 'P20240315-001',
    type: 'folder',
    children: [
      { id: 'S001', name: 'Series 1 - Axial CT', type: 'series', selected: true },
      { id: 'S002', name: 'Series 2 - Coronal CT', type: 'series' },
      { id: 'S003', name: 'Series 3 - Sagittal CT', type: 'series' }
    ]
  },
  {
    id: 'P20240314-022',
    name: 'P20240314-022',
    type: 'folder',
    children: [
      { id: 'S004', name: 'Series 1 - T1 MRI', type: 'series' },
      { id: 'S005', name: 'Series 2 - T2 MRI', type: 'series' }
    ]
  },
  {
    id: 'P20240313-015',
    name: 'P20240313-015',
    type: 'folder',
    children: [
      { id: 'S006', name: 'Series 1 - Bone CT', type: 'series' }
    ]
  }
]

// 历史记录数据
export const historyData = [
  {
    time: '2024-03-15 14:45:22',
    type: 'view',
    title: '查看病例',
    description: '打开并查看病例 P20240315-001 的 DICOM 影像和 3D 模型'
  },
  {
    time: '2024-03-15 14:32:10',
    type: 'upload',
    title: '上传病例',
    description: '成功上传病例 P20240315-001，共 128 个切片文件'
  },
  {
    time: '2024-03-14 16:18:45',
    type: 'segment',
    title: '完成分割',
    description: '病例 P20240314-022 的肾脏分割已完成，体积 285.6 cm³'
  },
  {
    time: '2024-03-14 09:25:33',
    type: 'export',
    title: '导出模型',
    description: '导出病例 P20240313-015 的 3D 模型为 STL 格式'
  },
  {
    time: '2024-03-13 16:45:12',
    type: 'upload',
    title: '上传病例',
    description: '成功上传病例 P20240313-015，共 192 个切片文件'
  },
  {
    time: '2024-03-12 15:20:08',
    type: 'view',
    title: '查看病例',
    description: '打开并查看病例 P20240312-008 的增强 CT 影像'
  },
  {
    time: '2024-03-12 11:52:30',
    type: 'segment',
    title: '完成分割',
    description: '病例 P20240312-008 的肝脏分割已完成，体积 1560.2 cm³'
  },
  {
    time: '2024-03-12 11:20:15',
    type: 'upload',
    title: '上传病例',
    description: '成功上传病例 P20240312-008，共 320 个切片文件'
  }
]

// 分类数据
export const categories = [
  { id: 'all', name: '全部', count: 156 },
  { id: 'bone', name: '骨骼', count: 42 },
  { id: 'lung', name: '肺', count: 38 },
  { id: 'kidney', name: '肾', count: 28 },
  { id: 'liver', name: '肝', count: 24 },
  { id: 'heart', name: '心脏', count: 15 },
  { id: 'brain', name: '脑部', count: 8 },
  { id: 'other', name: '其他', count: 1 }
]

// 统计卡片数据
export const statsData = {
  total: 156,
  completed: 142,
  processing: 12,
  pending: 2
}

// 模型信息
export const modelInfo = {
  organType: '肺部',
  volume: '4250.3 cm³',
  status: '已完成',
  triangles: '152,480'
}

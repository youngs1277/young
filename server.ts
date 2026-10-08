import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const DATA_DIR = path.resolve(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  createdAt: string;
}

function loadUsers(): User[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read users:', err);
  }
  return [];
}

function saveUsers(users: User[]): void {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save users:', err);
  }
}

// Seed default sample user '스테판' if not present
if (!fs.existsSync(USERS_FILE) || loadUsers().length === 0) {
  saveUsers([
    {
      id: 'user-stephen',
      email: 'stephen@example.com',
      password: 'password123',
      name: '스테판',
      phone: '010-1234-5678',
      createdAt: new Date().toISOString(),
    },
  ]);
}

export interface Order {
  id: string;
  recipientName: string;
  phone: string;
  address: string;
  addressDetail?: string;
  deliveryNote: string;
  packageType: '1box' | '2box';
  productName: string;
  boxCount: string;
  totalPrice: number;
  paymentMethod: 'card' | 'easy' | 'bank';
  paymentStatus: '결제대기' | '결제완료';
  status: '주문접수' | '입금확인' | '배송준비' | '배송중' | '배송완료' | '취소됨';
  createdAt: string;
}

function loadOrders(): Order[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read orders:', err);
  }
  return [];
}

function saveOrders(orders: Order[]): void {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save orders:', err);
  }
}

// Ensure initial file if not present
if (!fs.existsSync(ORDERS_FILE)) {
  saveOrders([]);
}

// 0-1. 회원가입 API (이메일, 비밀번호 6자 이상, 이름)
app.post('/api/auth/register', (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: '이메일 주소를 입력해 주세요.',
      });
    }

    if (!email.includes('@') || !email.includes('.')) {
      return res.status(400).json({
        success: false,
        message: '올바른 이메일 형식(예: name@example.com)으로 입력해 주세요.',
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: '비밀번호를 입력해 주세요.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: '비밀번호는 최소 6자 이상이어야 합니다. 6자 이상으로 안전하게 입력해 주세요.',
      });
    }

    const userName = name && name.trim() ? name.trim() : '스테판';

    const users = loadUsers();
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (existing) {
      return res.status(400).json({
        success: false,
        message: '이미 등록된 이메일 주소입니다. 로그인하시거나 다른 이메일을 입력해 주세요.',
      });
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      email: email.trim().toLowerCase(),
      password: password,
      name: userName,
      phone: phone ? phone.trim() : '',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    console.log(`[회원가입 완료] ${newUser.name} (${newUser.email})`);

    return res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
      },
      message: `${newUser.name}님, 회원가입이 완료되었습니다! 환영합니다.`,
    });
  } catch (err) {
    console.error('회원가입 오류:', err);
    return res.status(500).json({
      success: false,
      message: '회원가입 처리 중 오류가 발생했습니다.',
    });
  }
});

// 0-2. 로그인 API (이메일, 비밀번호 6자 이상)
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: '이메일 주소를 입력해 주세요.',
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: '비밀번호를 입력해 주세요.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: '비밀번호는 6자 이상이어야 합니다. 비밀번호 글자 수가 부족합니다.',
      });
    }

    const users = loadUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: '등록되지 않은 이메일 주소입니다. 이메일을 다시 확인하시거나 회원가입을 먼저 진행해 주세요.',
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: '비밀번호가 일치하지 않습니다. 대소문자나 오타가 없는지 다시 확인해 주세요.',
      });
    }

    console.log(`[로그인 성공] ${user.name} (${user.email})`);

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
      message: `${user.name}님 환영합니다!`,
    });
  } catch (err) {
    console.error('로그인 오류:', err);
    return res.status(500).json({
      success: false,
      message: '로그인 처리 중 오류가 발생했습니다.',
    });
  }
});

// 1. 주문 목록 조회 (전체 또는 전화번호 검색)
app.get('/api/orders', (req, res) => {
  const orders = loadOrders();
  const phoneQuery = req.query.phone as string | undefined;

  if (phoneQuery) {
    const cleanedQuery = phoneQuery.replace(/[^0-9]/g, '');
    const filtered = orders.filter((o) =>
      o.phone.replace(/[^0-9]/g, '').includes(cleanedQuery)
    );
    return res.json({ success: true, orders: filtered });
  }

  // Admin/전체 목록 반환
  res.json({ success: true, orders });
});

// 2. 신규 실제 주문 접수
app.post('/api/orders', (req, res) => {
  try {
    const {
      recipientName,
      phone,
      address,
      addressDetail,
      deliveryNote,
      packageType,
      paymentMethod,
    } = req.body;

    if (!recipientName || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: '받는 분 성함, 휴대폰 번호, 배송지 주소는 필수입니다.',
      });
    }

    const orders = loadOrders();
    const dateStr = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-${dateStr}-${randomSuffix}`;

    const isTwoBox = packageType === '2box';
    const totalPrice = isTwoBox ? 89000 : 48000;
    const boxCount = isTwoBox ? '2박스 (60포 / 보틀 2개)' : '1박스 (30포 / 보틀 1개)';

    const newOrder: Order = {
      id: orderId,
      recipientName: recipientName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      addressDetail: (addressDetail || '').trim(),
      deliveryNote: deliveryNote || '문 앞에 두고 벨 눌러주세요',
      packageType: isTwoBox ? '2box' : '1box',
      productName: '자연온 50곡 순수 생식',
      boxCount,
      totalPrice,
      paymentMethod: paymentMethod || 'card',
      paymentStatus: paymentMethod === 'bank' ? '결제대기' : '결제완료',
      status: '주문접수',
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    saveOrders(orders);

    console.log(`[실제 신규 주문 접수] ${orderId} - ${recipientName} (${phone}) - ${totalPrice}원`);

    return res.status(201).json({
      success: true,
      order: newOrder,
      message: '주문이 성공적으로 저장되었습니다.',
    });
  } catch (error) {
    console.error('주문 생성 오류:', error);
    return res.status(500).json({
      success: false,
      message: '주문 처리 중 서버 오류가 발생했습니다.',
    });
  }
});

// 3. 주문 상태 변경 (관리자)
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  const orders = loadOrders();
  const orderIndex = orders.findIndex((o) => o.id === id);

  if (orderIndex === -1) {
    return res.status(404).json({ success: false, message: '주문을 찾을 수 없습니다.' });
  }

  if (status) orders[orderIndex].status = status;
  if (paymentStatus) orders[orderIndex].paymentStatus = paymentStatus;

  saveOrders(orders);
  return res.json({ success: true, order: orders[orderIndex] });
});

// 4. 주문 삭제 (관리자)
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  let orders = loadOrders();
  const initialLength = orders.length;
  orders = orders.filter((o) => o.id !== id);

  if (orders.length === initialLength) {
    return res.status(404).json({ success: false, message: '주문을 찾을 수 없습니다.' });
  }

  saveOrders(orders);
  return res.json({ success: true, message: '주문이 삭제되었습니다.' });
});

// 5. 서버 통계 (관리자 대시보드용)
app.get('/api/stats', (req, res) => {
  const orders = loadOrders();
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingOrders = orders.filter((o) => o.status === '주문접수').length;
  const preparingOrders = orders.filter((o) => o.status === '배송준비').length;
  const completedOrders = orders.filter((o) => o.status === '배송완료').length;

  res.json({
    totalOrders,
    totalAmount,
    pendingOrders,
    preparingOrders,
    completedOrders,
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();

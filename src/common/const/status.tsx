export const statusObject = {
  NEW: {
    title: 'Tạo mới',
    color: 'text-blue-500'
  },
  WAIT_APPROVE: {
    title: 'Chờ duyệt',
    color: 'text-yellow-500'
  },
  APPROVED: {
    title: 'Đã được duyệt',
    color: 'text-yellow-500'
  },
  APPROVE_FAIL: {
    title: 'Xin duyệt thất bại',
    color: 'text-green-500'
  },
  WAIT_SIGN_A: {
    title: 'Chờ bên A ký',
    color: 'text-green-500'
  },
  SIGN_A_OK: { title: 'Bên A kí thành công', color: 'text-green-500' },
  SIGN_A_FAIL: {
    title: 'Bên A từ chối ký',
    color: 'text-green-500'
  },
  WAIT_SIGN_B: {
    title: 'Chờ bên B ký',
    color: 'text-green-500'
  },
  SIGN_B_OK: { title: 'Bên B kí thành công', color: 'text-green-500' },
  SIGN_B_FAIL: {
    title: 'Bên B từ chối ký',
    color: 'text-green-500'
  },
  SUCCESS: {
    title: 'Hợp đồng hoàn thành',
    color: 'text-green-500'
  }
}
export const statusRequest: any = {
  1: {
    status: 'WAIT_APPROVE',
    title: 'Xin duyệt hợp đồng',
    description: 'Yêu cầu xin trình duyệt hợp đồng'
  },
  2: { status: 'APPROVED', title: 'Xác nhận duyệt hợp đồng', description: 'Xác nhận duyệt hợp đồng' },
  3: { status: 'APPROVE_FAIL', title: 'Từ chối duyệt hợp đồng', description: 'Từ chối duyệt hợp đồng' },
  4: { status: 'WAIT_SIGN_A', title: 'Xác nhận xin ký hợp đồng', description: 'Yêu cầu xin trình kí hợp đồng' },
  5: { status: 'SIGN_A_OK', title: 'Xác nhận ký hợp đồng', description: 'Xác nhận ký hợp đồng' },
  6: { status: 'SIGN_A_FAIL', title: 'Từ chối ký hợp đồng', description: 'Từ chối ký hợp đồng' },
  7: {
    status: 'WAIT_SIGN_B',
    title: 'Xác nhận trao đổi và ký hợp đồng',
    description: 'Yêu cầu xác nhận trao đổi và xin ký hợp đồng'
  },
  8: { status: 'SIGN_B_OK', title: 'Xác nhận ký hợp đồng', description: 'Xác nhận ký hợp đồng' },
  9: { status: 'SIGN_B_FAIL', title: 'Từ chối ký hợp đồng', description: 'Từ chối ký hợp đồng' },
  10: { status: 'NEW', title: 'Tạo mới hợp đồng', description: 'Bạn đã tạo mới hợp đồng thành công' }
}
export const statusContract: any = [
  {
    status: 'NEW',
    title: 'Tạo mới'
  },
  { status: 'WAIT_APPROVE', title: 'Chờ duyệt' },
  { status: 'WAIT_SIGN_A', title: 'Chờ ký' },
  { status: 'WAIT_SIGN_B', title: 'Gửi khách hàng' },
  { sttaus: 'SUCCESS', title: 'Hoàn thành' }
]

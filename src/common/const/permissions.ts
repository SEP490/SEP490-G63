export const permissionObject = {
  OFFICE_ADMIN: 'OFFICE_ADMIN',
  SALE: 'SALE',
  OFFICE_STAFF: 'OFFICE_STAFF',
  MANAGER: 'MANAGER',
  LEADER_SALE: 'LEADER_SALE'
}
const permissions = [
  {
    id: 1,
    title: 'SALE',
    tooltip:
      'Nhân viên Sale có các chức năng như tạo mới hợp đồng,\n tải lên hợp đồng cũ, gửi hợp đồng cho khách hàng, gửi lên cho hành chính văn phòng yêu cầu duyệt hợp đồng',
    value: 'SALE'
  },
  {
    id: 2,
    title: 'ADMIN CLIENT',
    tooltip: 'PERMISSION MANAGER',
    value: 'MANAGER'
  },
  {
    id: 3,
    title: 'OFFICER ADMIN',
    tooltip: 'PERMISSION OFFICE ADMIN',
    value: 'OFFICE_ADMIN'
  },
  {
    id: 4,
    title: 'OFFICE STAFF',
    tooltip: 'PERMISSION OFFICE STAFF',
    value: 'OFFICE_STAFF'
  },
  {
    id: 5,
    title: 'LEADER SALE',
    tooltip: 'PERMISSION LEADER SALE',
    value: 'LEADER_SALE'
  }
]

export default permissions

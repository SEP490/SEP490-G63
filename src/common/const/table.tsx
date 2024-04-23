import { Badge, Tag } from 'antd'
import { REQUEST_STATUS } from './status'

const TABLE = {
  COLUMN: {
    RENDER_INDEX: (id: string, record: any, index: number, pageIndex: number, pageSize: number) => {
      return ++index + --pageIndex * pageSize
    },
    REQUEST_RENDER_STATUS: (Status: string) => {
      let statusColor = 'error'
      switch (Status) {
        case REQUEST_STATUS.duocnhan:
          statusColor = 'success'
          break
        case REQUEST_STATUS.doi1:
        case REQUEST_STATUS.doi2:
        case REQUEST_STATUS.doi3:
        case REQUEST_STATUS.doi4:
        case REQUEST_STATUS.doi5:
        case REQUEST_STATUS.doi6:
        case REQUEST_STATUS.doi7:
          statusColor = 'processing'
          break
        default:
          break
      }

      return <Tag color={statusColor}>{Status}</Tag>
    },
    REQUEST_STATUS_FILTER: [
      {
        text: REQUEST_STATUS.Khongqua,
        value: '0'
      },
      {
        text: REQUEST_STATUS.doi1,
        value: '1'
      },
      {
        text: REQUEST_STATUS.doi2,
        value: '2'
      },
      {
        text: REQUEST_STATUS.doi3,
        value: '3'
      },
      {
        text: REQUEST_STATUS.doi4,
        value: '4'
      },
      {
        text: REQUEST_STATUS.doi5,
        value: '5'
      },
      {
        text: REQUEST_STATUS.doi6,
        value: '6'
      },
      {
        text: REQUEST_STATUS.doi7,
        value: '7'
      },
      {
        text: REQUEST_STATUS.duocnhan,
        value: '8'
      },
      {
        text: REQUEST_STATUS.tuhuy,
        value: '9'
      }
    ]
  }
}

export { TABLE }

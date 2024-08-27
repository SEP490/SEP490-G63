export const statusObject = {
  NEW: {
    title: { ['SALE']: 'Tạo mới', ['OFFICE_ADMIN']: 'Tạo mới', ['ADMIN']: 'Tạo mới', ['LEADER_SALE']: 'Tạo mới' },
    color: 'text-blue-500'
  },
  WAIT_APPROVE: {
    title: {
      ['SALE']: 'Chờ duyệt',
      ['OFFICE_ADMIN']: 'Chờ duyệt',
      ['ADMIN']: 'Chờ duyệt',
      ['LEADER_SALE']: 'Chờ duyệt'
    },
    color: 'text-yellow-500'
  },
  APPROVED: {
    title: {
      ['SALE']: 'Đã được duyệt',
      ['OFFICE_ADMIN']: 'Đã duyệt',
      ['ADMIN']: 'Chờ duyệt',
      ['LEADER_SALE']: 'Đã được duyệt'
    },
    color: 'text-yellow-500'
  },
  APPROVE_FAIL: {
    title: {
      ['SALE']: 'Xin duyệt thất bại',
      ['OFFICE_ADMIN']: 'Đã từ chối duyệt',
      ['ADMIN']: 'Đã từ chối duyệt',
      ['LEADER_SALE']: 'Xin duyệt thất bại'
    },
    color: 'text-red-500'
  },
  WAIT_SIGN_A: {
    title: {
      ['SALE']: 'Chờ sếp ký',
      ['OFFICE_ADMIN']: 'Chờ sếp ký',
      ['ADMIN']: 'Chờ ký',
      ['LEADER_SALE']: 'Chờ sếp ký'
    },
    color: 'text-yellow-500'
  },
  SIGN_A_OK: {
    title: {
      ['SALE']: 'Sếp ký thành công',
      ['OFFICE_ADMIN']: 'Sếp ký thành công',
      ['ADMIN']: 'Đã ký',
      ['LEADER_SALE']: 'Sếp ký thành công'
    },
    color: 'text-green-500'
  },
  SIGN_A_FAIL: {
    title: {
      ['SALE']: 'Sếp từ chối ký',
      ['OFFICE_ADMIN']: 'Sếp từ chối ký',
      ['ADMIN']: 'Đã từ chối ký',
      ['LEADER_SALE']: 'Sếp từ chối ký'
    },
    color: 'text-red-500'
  },
  WAIT_SIGN_B: {
    title: {
      ['SALE']: 'Chờ khách hàng ký',
      ['OFFICE_ADMIN']: 'Chờ khách hàng ký',
      ['ADMIN']: 'Chờ khách hàng ký',
      ['LEADER_SALE']: 'Chờ khách hàng ký'
    },
    color: 'text-yellow-500'
  },
  SIGN_B_OK: {
    title: {
      ['SALE']: 'Khách ký thành công',
      ['OFFICE_ADMIN']: 'Khách ký thành công',
      ['ADMIN']: 'Khách ký thành công',
      ['LEADER_SALE']: 'Khách ký thành công'
    },
    color: 'text-green-500'
  },
  SIGN_B_FAIL: {
    title: {
      ['SALE']: 'Khách từ chối ký',
      ['OFFICE_ADMIN']: 'Khách từ chối ký',
      ['ADMIN']: 'Khách từ chối ký',
      ['LEADER_SALE']: 'Khách từ chối ký'
    },
    color: 'text-red-500'
  },
  SUCCESS: {
    title: {
      ['SALE']: 'Hợp đồng hoàn thành',
      ['OFFICE_ADMIN']: 'Hợp đồng hoàn thành',
      ['ADMIN']: 'Hợp đồng hoàn thành',
      ['LEADER_SALE']: 'Hợp đồng hoàn thành'
    },
    color: 'text-black'
  }
}
export const statusObjectHistory = {
  NEW: {
    title: 'Tạo mới',
    color: 'text-blue-500'
  },
  UPDATE: {
    title: 'Chỉnh sửa',
    color: 'text-blue-500'
  },
  WAIT_APPROVE: {
    title: 'Yêu cầu duyệt',
    color: 'text-yellow-500'
  },
  APPROVED: {
    title: 'Xác nhận duyệt',
    color: 'text-yellow-500'
  },
  APPROVE_FAIL: {
    title: 'Từ chối duyệt',
    color: 'text-red-500'
  },
  WAIT_SIGN_A: {
    title: 'Chờ sếp ký',
    color: 'text-yellow-500'
  },
  SIGN_A_OK: {
    title: 'Sếp đã ký',
    color: 'text-green-500'
  },
  SIGN_A_FAIL: {
    title: 'Từ chối ký',
    color: 'text-red-500'
  },
  WAIT_SIGN_B: {
    title: 'Chờ khách ký',
    color: 'text-yellow-500'
  },
  SIGN_B_OK: {
    title: 'Khách đã ký',
    color: 'text-green-500'
  },
  SIGN_B_FAIL: {
    title: 'Từ chối ký',
    color: 'text-red-500'
  },
  SUCCESS: {
    title: 'Hoàn thành',
    color: 'text-black'
  }
}
export const statusRequest: any = {
  1: {
    status: 'WAIT_APPROVE',
    title: 'Xin duyệt hợp đồng',
    description: ({ name = '', html = '', src = '' }: any) => {
      return `<div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px',
              margin: 'auto'
            }}
          >
            <h2 style='color: #2c3e50;'>Tdocman</h2>
            <p style='fontSize: "16px"; line-height: "1.6";'>Kính gửi ${name},</p>
            <p style='fontSize: "16px"; line-height: "1.6";'>
              Chúng tôi xin gửi đến hợp đồng để ký kết. Vui lòng xem qua nội dung hợp đồng và duyệt nếu đồng ý
              với các điều khoản.
            </p>
            ${html}
            <p style='fontSize: "16px"; line-height: "1.6";'>
              Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ lại với chúng tôi.
            </p>
            <p style='fontSize: "16px"; line-height: "1.6";'>Trân trọng,</p>
            <p style='fontSize:" 16px"; line-height: "1.6";'>
              <strong>Tdocman</strong>
            </p>
            <a
              href="${src}"
              style='display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;'
            >
              Xem Hợp Đồng
            </a>
          </div>
        </div>`
    }
  },
  2: {
    status: 'APPROVED',
    title: 'Xác nhận duyệt hợp đồng',
    description: ({ name = '', html = '', src = '' }: any) => {
      return `<div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: 'auto'
          }}
        >
          <h2 style='color: #2c3e50;'>Tdocman</h2>
          <p style='fontSize: "16px"; line-height: "1.6";'>Kính gửi ${name},</p>
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Chúng tôi xin gửi đến hợp đồng để ký kết. Vui lòng xem qua nội dung hợp đồng và duyệt nếu đồng ý
            với các điều khoản.
          </p>
          ${html}
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ lại với chúng tôi.
          </p>
          <p style='fontSize: "16px"; line-height: "1.6";'>Trân trọng,</p>
          <p style='fontSize:" 16px"; line-height: "1.6";'>
            <strong>Tdocman</strong>
          </p>
          <a
            href="${src}"
            style='display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;'
          >
            Xem Hợp Đồng
          </a>
        </div>
      </div>`
    }
  },
  3: {
    status: 'APPROVE_FAIL',
    title: 'Từ chối duyệt hợp đồng',
    description: ({ name = '', html = '', src = '' }: any) => {
      return `<div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: 'auto'
          }}
        >
          <h2 style='color: #2c3e50;'>Tdocman</h2>
          <p style='fontSize: "16px"; line-height: "1.6";'>Kính gửi ${name},</p>
          <p style='fontSize: "16px"; line-height: "1.6";'>
            ADMIN OFFICER đã từ chối duyệt hợp đồng.
          </p>
          ${html}
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ lại với chúng tôi.
          </p>
          <p style='fontSize: "16px"; line-height: "1.6";'>Trân trọng,</p>
          <p style='fontSize:" 16px"; line-height: "1.6";'>
            <strong>Tdocman</strong>
          </p>
          <a
            href="${src}"
            style='display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;'
          >
            Xem Hợp Đồng
          </a>
        </div>
      </div>`
    }
  },
  4: {
    status: 'WAIT_SIGN_A',
    title: 'Xác nhận xin ký hợp đồng',
    description: ({ name = '', html = '', src = '' }: any) => {
      return `<div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: 'auto'
          }}
        >
          <h2 style='color: #2c3e50;'>Tdocman</h2>
          <p style='fontSize: "16px"; line-height: "1.6";'>Kính gửi ${name},</p>
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Chờ sếp ký hợp đồng.
          </p>
          ${html}
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ lại với chúng tôi.
          </p>
          <p style='fontSize: "16px"; line-height: "1.6";'>Trân trọng,</p>
          <p style='fontSize:" 16px"; line-height: "1.6";'>
            <strong>Tdocman</strong>
          </p>
          <a
            href="${src}"
            style='display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;'
          >
            Xem Hợp Đồng
          </a>
        </div>
      </div>`
    }
  },
  5: {
    status: 'SIGN_A_OK',
    title: 'Xác nhận ký hợp đồng',
    description: ({ name = '', html = '', src = '' }: any) => {
      return `<div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px',
              margin: 'auto'
            }}
          >
            <h2 style='color: #2c3e50;'>Tdocman</h2>
            <p style='fontSize: "16px"; line-height: "1.6";'>Kính gửi ${name},</p>
            <p style='fontSize: "16px"; line-height: "1.6";'>
              ADMIN đã ký.
            </p>
            ${html}
            <p style='fontSize: "16px"; line-height: "1.6";'>
              Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ lại với chúng tôi.
            </p>
            <p style='fontSize: "16px"; line-height: "1.6";'>Trân trọng,</p>
            <p style='fontSize:" 16px"; line-height: "1.6";'>
              <strong>Tdocman</strong>
            </p>
            <a
              href="${src}"
              style='display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;'
            >
              Xem Hợp Đồng
            </a>
          </div>
        </div>`
    }
  },
  6: {
    status: 'SIGN_A_FAIL',
    title: 'Từ chối ký hợp đồng',
    description: ({ name = '', html = '', src = '' }: any) => {
      return `<div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: 'auto'
          }}
        >
          <h2 style='color: #2c3e50;'>Tdocman</h2>
          <p style='fontSize: "16px"; line-height: "1.6";'>Kính gửi ${name},</p>
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Chúng tôi xin gửi đến hợp đồng để ký kết. Vui lòng xem qua nội dung hợp đồng và duyệt nếu đồng ý
            với các điều khoản.
          </p>
          ${html}
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ lại với chúng tôi.
          </p>
          <p style='fontSize: "16px"; line-height: "1.6";'>Trân trọng,</p>
          <p style='fontSize:" 16px"; line-height: "1.6";'>
            <strong>Tdocman</strong>
          </p>
          <a
            href="${src}"
            style='display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;'
          >
            Xem Hợp Đồng
          </a>
        </div>
      </div>`
    }
  },
  7: {
    status: 'WAIT_SIGN_B',
    title: 'Xác nhận trao đổi và ký hợp đồng',
    description: ({ name = '', html = '', src = '' }: any) => {
      return `<div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px',
              margin: 'auto'
            }}
          >
            <h2 style='color: #2c3e50;'>Tdocman</h2>
            <p style='fontSize: "16px"; line-height: "1.6";'>Kính gửi ${name},</p>
            <p style='fontSize: "16px"; line-height: "1.6";'>
               Chúng tôi xin gửi đến hợp đồng để ký kết. Vui lòng xem qua nội dung hợp đồng và ký nếu đồng ý
            với các điều khoản
            </p>
            ${html}
            <p style='fontSize: "16px"; line-height: "1.6";'>
              Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ lại với chúng tôi.
            </p>
            <p style='fontSize: "16px"; line-height: "1.6";'>Trân trọng,</p>
            <p style='fontSize:" 16px"; line-height: "1.6";'>
              <strong>Tdocman</strong>
            </p>
            <a
              href="${src}"
              style='display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;'
            >
              Xem Hợp Đồng
            </a>
          </div>
        </div>`
    }
  },
  8: {
    status: 'SIGN_B_OK',
    title: 'Xác nhận ký hợp đồng',
    description: ({ name = '', html = '', src = '' }: any) => {
      return `<div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px',
              margin: 'auto'
            }}
          >
            <h2 style='color: #2c3e50;'>Tdocman</h2>
            <p style='fontSize: "16px"; line-height: "1.6";'>Kính gửi ${name},</p>
            <p style='fontSize: "16px"; line-height: "1.6";'>
              Khách Hàng đã ký thành công.
            </p>
            ${html}
            <p style='fontSize: "16px"; line-height: "1.6";'>
              Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ lại với chúng tôi.
            </p>
            <p style='fontSize: "16px"; line-height: "1.6";'>Trân trọng,</p>
            <p style='fontSize:" 16px"; line-height: "1.6";'>
              <strong>Tdocman</strong>
            </p>
            <a
              href="${src}"
              style='display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;'
            >
              Xem Hợp Đồng
            </a>
          </div>
        </div>`
    }
  },
  9: {
    status: 'SIGN_B_FAIL',
    title: 'Từ chối ký hợp đồng',
    description: ({ name = '', html = '', src = '' }: any) => {
      return `<div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: 'auto'
          }}
        >
          <h2 style='color: #2c3e50;'>Tdocman</h2>
          <p style='fontSize: "16px"; line-height: "1.6";'>Kính gửi ${name},</p>
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Khách hàng ký thành công.
          </p>
          ${html}
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ lại với chúng tôi.
          </p>
          <p style='fontSize: "16px"; line-height: "1.6";'>Trân trọng,</p>
          <p style='fontSize:" 16px"; line-height: "1.6";'>
            <strong>Tdocman</strong>
          </p>
          <a
            href="${src}"
            style='display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;'
          >
            Xem Hợp Đồng
          </a>
        </div>
      </div>`
    }
  },
  10: {
    status: 'NEW',
    title: 'Tạo mới hợp đồng',
    description: ({ name = '', html = '', src = '' }: any) => {
      return `<div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: 'auto'
          }}
        >
          <h2 style='color: #2c3e50;'>Tdocman</h2>
          <p style='fontSize: "16px"; line-height: "1.6";'>Kính gửi ${name},</p>
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Tạo mới hợp đồng thành công.
          </p>
          ${html}
          <p style='fontSize: "16px"; line-height: "1.6";'>
            Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ lại với chúng tôi.
          </p>
          <p style='fontSize: "16px"; line-height: "1.6";'>Trân trọng,</p>
          <p style='fontSize:" 16px"; line-height: "1.6";'>
            <strong>Tdocman</strong>
          </p>
          <a
            href="${src}"
            style='display: inline-block; background-color: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;'
          >
            Xem Hợp Đồng
          </a>
        </div>
      </div>`
    }
  }
}
export const statusContract: any = [
  {
    status: 'NEW',
    title: 'Tạo mới'
  },
  { status: 'WAIT_APPROVE', title: 'Chờ duyệt' },
  { status: 'WAIT_SIGN_A', title: 'Chờ ký' },
  { status: 'SIGN_B_OK', title: 'Khách ký thành công' },
  { status: 'SIGN_A_OK', title: 'Sếp ký thành công' },
  { status: 'SUCCESS', title: 'Hoàn thành' }
]

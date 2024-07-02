import './index.css'
const StepProgressBar = () => {
  return (
    <div className='stepper-wrapper'>
      <div className='stepper-item completed'>
        <div className='step-counter'>1</div>
        <div className='step-name'>Tạo mới</div>
      </div>
      <div className='stepper-item completed'>
        <div className='step-counter'>2</div>
        <div className='step-name'>Chờ duyệt</div>
      </div>
      <div className='stepper-item completed'>
        <div className='step-counter'>3</div>
        <div className='step-name'>Chờ ký</div>
      </div>
      <div className='stepper-item completed'>
        <div className='step-counter'>4</div>
        <div className='step-name'>Gửi khách hàng</div>
      </div>
      <div className='stepper-item completed'>
        <div className='step-counter'>5</div>
        <div className='step-name'>Hoàn thành</div>
      </div>
    </div>
  )
}
export default StepProgressBar

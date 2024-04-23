import Icon from '@ant-design/icons'
import logoSvg from '../assets/icons/ic_logo.svg'
import historySvg from '../assets/icons/ic_history.svg'
import bookSvg from '../assets/icons/ic_book.svg'
import notifySvg from '../assets/icons/ic_notification.svg'
import shopSvg from '../assets/icons/ic_shop.svg'
import walletSvg from '../assets/icons/ic_wallet.svg'
import firstSvg from '../assets/icons/ic_1st.svg'
import secondSvg from '../assets/icons/ic_2nd.svg'
import thirdSvg from '../assets/icons/ic_3rd.svg'
import fourthSvg from '../assets/icons/ic_4th.svg'
import fifthSvg from '../assets/icons/ic_5th.svg'
import topPlusSvg from '../assets/icons/ic_top_plus.svg'
import topMinusSvg from '../assets/icons/ic_top_minus.svg'
import risingStarSvg from '../assets/icons/ic_rising_star.svg'
import dividerSvg from '../assets/icons/ic_divider.svg'
import tagSvg from '../assets/icons/ic_tag.svg'
import arrowUpSvg from '../assets/icons/ic_arrow_up.svg'
import arrowDownSvg from '../assets/icons/ic_arrow_down.svg'
import top1Svg from '../assets/icons/ic_top1.svg'
import top2Svg from '../assets/icons/ic_top2.svg'
import top3Svg from '../assets/icons/ic_top3.svg'
import votedSvg from '../assets/icons/ic_voted.svg'
import unvoteSvg from '../assets/icons/ic_unvote.svg'
import deleteSvg from '../assets/icons/ic_delete.svg'
import alertSuccessSvg from '../assets/icons/ic_alert_success.svg'
import alertErrorSvg from '../assets/icons/ic_alert_error.svg'
import alertInfoSvg from '../assets/icons/ic_alert_info.svg'
import alertWarningSvg from '../assets/icons/ic_alert_warning.svg'
import fptSvg from '../assets/icons/ic_fpt.svg'
import fltSvg from '../assets/icons/ic_flt.svg'
import logo2Svg from '../assets/icons/ic_logo_2.svg'
import errorPageSvg from '../assets/icons/ic_error_page.svg'
import shopCartSvg from '../assets/icons/ic_shop_cart.svg'
import shopUserSvg from '../assets/icons/ic_shop_user.svg'
import shopMenuSvg from '../assets/icons/ic_shop_menu.svg'
import soldSvg from '../assets/icons/ic_sold.svg'
import cloudUpload from '../assets/icons/ic_cloud_upload.svg'
import OnlymeSee from '../assets/icons/ic_lock.svg'
import Bu from '../assets/icons/ic_bu.svg'
import Everyone from '../assets/icons/ic_everyone.svg'
import CameraUploadButton from '../assets/icons/ic_camera.svg'
import arrowRight from '../assets/icons/ic_arrow_right.svg'
import topMonth from '../assets/icons/ic_top_month.svg'
import addCircle from '../assets/icons/ic_add_circle.svg'
import schedule from '../assets/icons/schedule-icon.png'
import recruitlogo from '../assets/images/Logo30x30.svg'
type SvgIcon = {
  svgPath: string
  props: any
}
function SvgIcon(p: SvgIcon) {
  return <Icon component={() => <img src={p.svgPath} />} {...p.props} />
}

const AkaLogoIcon = (props: any) => <SvgIcon svgPath={logoSvg} {...props} />
const ScheduleIcon = (props: any) => <SvgIcon svgPath={schedule} style={{ fontSize: '24px' }} {...props} />
const RecruitLogo = (props: any) => <SvgIcon svgPath={recruitlogo} {...props} />
const HistoryIcon = (props: any) => <SvgIcon svgPath={historySvg} {...props} />
const BookIcon = (props: any) => <SvgIcon svgPath={bookSvg} {...props} />
const NotifyIcon = (props: any) => <SvgIcon svgPath={notifySvg} {...props} />
const ShopIcon = (props: any) => <SvgIcon svgPath={shopSvg} {...props} />
const WalletIcon = (props: any) => <SvgIcon svgPath={walletSvg} {...props} />
const FirstIcon = (props: any) => <SvgIcon svgPath={firstSvg} {...props} />
const SecondIcon = (props: any) => <SvgIcon svgPath={secondSvg} {...props} />
const ThirdIcon = (props: any) => <SvgIcon svgPath={thirdSvg} {...props} />
const FourthIcon = (props: any) => <SvgIcon svgPath={fourthSvg} {...props} />
const FifthIcon = (props: any) => <SvgIcon svgPath={fifthSvg} {...props} />
const TopPlusIcon = (props: any) => <SvgIcon svgPath={topPlusSvg} {...props} />
const TopMinusIcon = (props: any) => <SvgIcon svgPath={topMinusSvg} {...props} />
const RisingStarIcon = (props: any) => <SvgIcon svgPath={risingStarSvg} {...props} />
const ArrowUpIcon = (props: any) => <SvgIcon svgPath={arrowUpSvg} {...props} />
const ArrowDownIcon = (props: any) => <SvgIcon svgPath={arrowDownSvg} {...props} />
const Top1Icon = (props: any) => <SvgIcon svgPath={top1Svg} {...props} />
const Top2Icon = (props: any) => <SvgIcon svgPath={top2Svg} {...props} />
const Top3Icon = (props: any) => <SvgIcon svgPath={top3Svg} {...props} />
const UnVoteIcon = (props: any) => <SvgIcon svgPath={unvoteSvg} {...props} />
const VotedIcon = (props: any) => <SvgIcon svgPath={votedSvg} {...props} />
const DeleteIcon = (props: any) => <SvgIcon svgPath={deleteSvg} {...props} />
const SuccessAlertIcon = (props: any) => <SvgIcon svgPath={alertSuccessSvg} {...props} />
const ErrorAlertIcon = (props: any) => <SvgIcon svgPath={alertErrorSvg} {...props} />
const InfoAlertIcon = (props: any) => <SvgIcon svgPath={alertInfoSvg} {...props} />
const WarningAlertIcon = (props: any) => <SvgIcon svgPath={alertWarningSvg} {...props} />
const FPTLogoIcon = (props: any) => <SvgIcon svgPath={fptSvg} {...props} />
const FLTLogoIcon = (props: any) => <SvgIcon svgPath={fltSvg} {...props} />
const AkaLogo2Icon = (props: any) => <SvgIcon svgPath={logo2Svg} {...props} />
const ErrorPageIcon = (props: any) => <SvgIcon svgPath={errorPageSvg} {...props} />
const ShopCartIcon = (props: any) => <SvgIcon svgPath={shopCartSvg} {...props} />
const ShopUserIcon = (props: any) => <SvgIcon svgPath={shopUserSvg} {...props} />
const ShopMenuIcon = (props: any) => <SvgIcon svgPath={shopMenuSvg} {...props} />
const SoldIcon = (props: any) => <SvgIcon svgPath={soldSvg} {...props} />
const CloudUploadImage = (props: any) => <SvgIcon svgPath={cloudUpload} {...props} />
const OnlymeSeeProfile = (props: any) => <SvgIcon svgPath={OnlymeSee} {...props} />
const BuSeeProfile = (props: any) => <SvgIcon svgPath={Bu} {...props} />
const EveryoneSeeProfile = (props: any) => <SvgIcon svgPath={Everyone} {...props} />
const CameraButtonUploadImg = (props: any) => <SvgIcon svgPath={CameraUploadButton} {...props} />
const ArrowRightIcon = (props: any) => <SvgIcon svgPath={arrowRight} {...props} />
const TopMonthIcon = (props: any) => <SvgIcon svgPath={topMonth} {...props} />
const AddCircleIcon = (props: any) => <SvgIcon svgPath={addCircle} {...props} />

const DividerVector = (props: any) => <SvgIcon svgPath={dividerSvg} {...props} />
const TagVector = (props: any) => <SvgIcon svgPath={tagSvg} {...props} />

export {
  AkaLogoIcon,
  HistoryIcon,
  BookIcon,
  NotifyIcon,
  ShopIcon,
  WalletIcon,
  FirstIcon,
  SecondIcon,
  ThirdIcon,
  FourthIcon,
  FifthIcon,
  TopPlusIcon,
  TopMinusIcon,
  RisingStarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  Top1Icon,
  RecruitLogo,
  Top2Icon,
  Top3Icon,
  UnVoteIcon,
  VotedIcon,
  DeleteIcon,
  SuccessAlertIcon,
  ErrorAlertIcon,
  InfoAlertIcon,
  WarningAlertIcon,
  FPTLogoIcon,
  AkaLogo2Icon,
  ErrorPageIcon,
  ShopCartIcon,
  ShopUserIcon,
  ShopMenuIcon,
  SoldIcon,
  FLTLogoIcon,
  ArrowRightIcon,
  DividerVector,
  TagVector,
  CloudUploadImage,
  OnlymeSeeProfile,
  BuSeeProfile,
  EveryoneSeeProfile,
  CameraButtonUploadImg,
  TopMonthIcon,
  AddCircleIcon,
  ScheduleIcon
}

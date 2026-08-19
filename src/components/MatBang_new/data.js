/**
 * ============================================================================
 *  DỮ LIỆU CẤU HÌNH — chỉnh ở đây, KHÔNG cần đụng vào MatBangTang.jsx.
 * ============================================================================
 */

import layout2pn from "../../assets/images/layout/matbang/2pn.jpg";
import layout3pn from "../../assets/images/layout/matbang/3pn.jpg";
import layout3pnGoc from "../../assets/images/layout/matbang/3pn-goc.jpg";
import layout2pnGoc from "../../assets/images/layout/matbang/2pn-goc.jpg";
import layout3pnDb from "../../assets/images/layout/matbang/3pn-db.jpg";
import layout2pnDb from "../../assets/images/layout/matbang/2pn-db.jpg";

// Kích thước gốc của ảnh mặt bằng (px). Toạ độ polygon bên dưới lấy đúng theo hệ này.
export const IMAGE_WIDTH = 5000;
export const IMAGE_HEIGHT = 3335;

// 6 nhóm loại hình căn hộ — mỗi nhóm 1 màu riêng để phân biệt trên mặt bằng & chú giải.
// -> Đổi label/màu/ảnh đại diện tại đây.
// labelTop / labelLeft: toạ độ % để đặt "chip" chú giải NỔI TRÊN ẢNH (giống
// hintTop/hintLeft của TongThe) — không còn là hàng nút nằm dưới ảnh nữa.
// Mặc định mình xếp thành 1 cột dọc ở khoảng trống giữa 2 khối nhà — chỉnh
// lại % theo đúng bố cục ảnh thật của bạn.
export const APARTMENT_TYPES = {
  "2pn": {
    label: "Căn hộ 2PN",
    short: "2PN",
    color: "#4DA8FF",
    image: layout2pn,
    desc: "Căn 2 phòng ngủ tiêu chuẩn, bố cục vuông vắn, tối ưu công năng.",
    labelTop: "30%",
    labelLeft: "52%",
  },
  "3pn": {
    label: "Căn hộ 3PN",
    short: "3PN",
    color: "#F2A65A",
    image: layout3pn,
    desc: "Căn 3 phòng ngủ, phù hợp gia đình nhiều thế hệ.",
    labelTop: "42%",
    labelLeft: "52%",
  },
  "3pn-goc": {
    label: "Căn hộ 3PN Góc",
    short: "3PN Góc",
    color: "#6FCF97",
    image: layout3pnGoc,
    desc: "Căn góc 3 phòng ngủ, 2 mặt thoáng, đón trọn tầm nhìn sông.",
    labelTop: "50%",
    labelLeft: "52%",
  },
  "2pn-goc": {
    label: "Căn hộ 2PN Góc",
    short: "2PN Góc",
    color: "#BB86FC",
    image: layout2pnGoc,
    desc: "Căn góc 2 phòng ngủ, ban công rộng, view kép.",
    labelTop: "58%",
    labelLeft: "52%",
  },
  "3pn-db": {
    label: "Căn hộ 3PN Đặc Biệt",
    short: "3PN Đặc Biệt",
    color: "#FFD166",
    image: layout3pnDb,
    desc: "Phiên bản giới hạn — diện tích lớn, mặt tiền hướng sông.",
    labelTop: "66%",
    labelLeft: "52%",
  },
  "2pn-db": {
    label: "Căn hộ 2PN Đặc Biệt",
    short: "2PN Đặc Biệt",
    color: "#FF6B81",
    image: layout2pnDb,
    desc: "Phiên bản giới hạn 2 phòng ngủ, layout độc bản trong toà.",
    labelTop: "74%",
    labelLeft: "52%",
  },
};

// 12 lớp phủ (polygon) lấy nguyên toạ độ từ file gốc.
// Mặc định gán luân phiên 12 layout -> 6 loại hình (2 layout / loại) — ĐÂY LÀ GIẢ ĐỊNH,
// hãy sửa `typeId`, `area`, `ratio`, `priceFrom/priceTo` theo dữ liệu thật của dự án.
//
// popupTop / popupLeft: toạ độ % (so với khung ảnh) nơi ĐẶT popup — giống cách
// làm hintTop/hintLeft trong TongThe. Đây là điểm neo (anchor) của popup, KHÔNG
// phải tâm zone, mà đã dịch ra sát mép zone để popup nằm CẠNH zone chứ không đè lên.
// popupSide: "right" -> popup mở rộng sang PHẢI kể từ điểm neo (dùng cho zone
//   nằm bên trái/giữa ảnh, còn dư chỗ bên phải).
//   "left" -> popup mở rộng sang TRÁI kể từ điểm neo (dùng cho zone nằm sát mép
//   phải ảnh, tránh popup bị tràn ra ngoài).
// Tất cả số liệu dưới đây là ước lượng ban đầu từ toạ độ polygon — chỉnh trực
// tiếp popupTop/popupLeft/popupSide theo % để căn cho đúng ý bạn.
export const ZONES = [
  {
    id: "layout-1",
    code: "Căn hộ 2PN",
    typeId: "2pn",
    area: 62,
    ratio: 14,
    priceFrom: 2.8,
    priceTo: 3.1,
    popupTop: "64%",
    popupLeft: "65%",
    popupSide: "left",
    points:
      "3628.5,2071.7 3521.4,2018.1 3504.9,2009.9 3484.3,2009.9 3463.8,2022.2 3410.2,2108.7 3451.4,2137.6 3418.5,2195.2 3492.6,2244.7 3504.9,2219.9 3542.0,2232.3",
  },
  {
    id: "layout-2",
    code: "Căn hộ 3PN",
    typeId: "3pn",
    area: 86,
    ratio: 11,
    priceFrom: 3.6,
    priceTo: 3.9,
    popupTop: "69%",
    popupLeft: "72%",
    popupSide: "left",
    points:
      "3826.2,2187.0 3764.4,2298.2 3805.6,2327.0 3785.0,2364.1 3888.0,2417.6 3978.6,2265.2",
  },
  {
    id: "layout-3",
    code: "Căn hộ 3PN Góc",
    typeId: "3pn-goc",
    area: 94,
    ratio: 9,
    priceFrom: 4.1,
    priceTo: 4.5,
    popupTop: "72%",
    popupLeft: "75%",
    popupSide: "left",
    points:
      "3982.7,2273.5 3896.2,2421.8 3958.0,2458.8 4040.4,2500.0 4073.3,2471.2 4122.7,2491.8 4168.0,2409.4 4180.4,2388.8 4172.2,2368.2 4139.2,2351.7",
  },
  {
    id: "layout-4",
    code: "Căn hộ 2PN Góc",
    typeId: "2pn-goc",
    area: 68,
    ratio: 13,
    priceFrom: 3.0,
    priceTo: 3.3,
    popupTop: "69%",
    popupLeft: "62%",
    popupSide: "left",
    points:
      "3336.1,2166.4 3278.4,2277.6 3274.3,2322.9 3303.1,2355.9 3509.1,2454.7 3599.7,2298.2",
  },
  {
    id: "layout-5",
    code: "Căn hộ 3PN Đặc Biệt",
    typeId: "3pn-db",
    area: 108,
    ratio: 5,
    priceFrom: 5.2,
    priceTo: 5.8,
    popupTop: "73%",
    popupLeft: "67%",
    popupSide: "left",
    points:
      "3607.9,2306.4 3521.4,2462.9 3723.2,2561.8 3793.2,2462.9 3731.5,2421.8 3747.9,2380.6",
  },
  {
    id: "layout-6",
    code: "Căn hộ 2PN Đặc Biệt",
    typeId: "2pn-db",
    area: 74,
    ratio: 6,
    priceFrom: 3.4,
    priceTo: 3.7,
    popupTop: "77%",
    popupLeft: "73%",
    popupSide: "left",
    points:
      "3888.0,2458.8 3805.6,2611.2 3892.1,2664.8 3999.2,2710.1 4081.5,2570.0",
  },
  {
    id: "layout-7",
    code: "Căn hộ 2PN",
    typeId: "2pn",
    area: 60,
    ratio: 14,
    priceFrom: 2.7,
    priceTo: 3.0,
    popupTop: "51%",
    popupLeft: "72%",
    popupSide: "left",
    points:
      "3319.6,1544.5 3171.3,1643.3 3286.7,1828.7 3311.4,1836.9 3332.0,1828.7 3422.6,1779.3 3430.8,1750.4 3426.7,1713.4",
  },
  {
    id: "layout-8",
    code: "Căn hộ 3PN",
    typeId: "3pn",
    area: 88,
    ratio: 11,
    priceFrom: 3.7,
    priceTo: 4.0,
    popupTop: "45%",
    popupLeft: "69%",
    popupSide: "right",
    points: "3311.4,1536.3 3204.3,1367.4 3051.9,1462.1 3163.1,1635.1",
  },
  {
    id: "layout-9",
    code: "Căn hộ 3PN Góc",
    typeId: "3pn-goc",
    area: 96,
    ratio: 9,
    priceFrom: 4.2,
    priceTo: 4.6,
    popupTop: "36%",
    popupLeft: "66%",
    popupSide: "right",
    points:
      "3138.4,1280.9 3027.2,1091.4 3014.8,1079.1 2994.2,1062.6 2948.9,1075.0 2891.3,1112.0 2916.0,1161.5 2878.9,1186.2 2924.2,1260.3 2998.4,1371.5",
  },
  {
    id: "layout-10",
    code: "Căn hộ 2PN Góc",
    typeId: "2pn-goc",
    area: 70,
    ratio: 13,
    priceFrom: 3.1,
    priceTo: 3.4,
    popupTop: "54%",
    popupLeft: "68%",
    popupSide: "right",
    points:
      "3134.3,1663.9 2986.0,1754.5 3093.1,1931.6 3117.8,1944.0 3154.9,1931.6 3220.8,1882.2 3200.2,1836.9 3233.1,1812.2",
  },
  {
    id: "layout-11",
    code: "Căn hộ 3PN Đặc Biệt",
    typeId: "3pn-db",
    area: 110,
    ratio: 5,
    priceFrom: 5.4,
    priceTo: 6.0,
    popupTop: "47%",
    popupLeft: "64%",
    popupSide: "right",
    points:
      "2973.6,1404.5 2829.5,1499.2 2965.4,1717.5 3076.6,1651.6 3035.4,1577.4 3072.5,1565.1",
  },
  {
    id: "layout-12",
    code: "Căn hộ 2PN Đặc Biệt",
    typeId: "2pn-db",
    area: 76,
    ratio: 6,
    priceFrom: 3.5,
    priceTo: 3.8,
    popupTop: "41%",
    popupLeft: "62%",
    popupSide: "right",
    points:
      "2870.7,1252.1 2837.7,1268.5 2796.5,1210.9 2718.3,1260.3 2705.9,1272.7 2697.7,1293.3 2710.0,1322.1 2751.2,1379.7 2821.3,1495.1 2965.4,1400.3",
  },
];

// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const foodData = [
    {
      name: "Phở Bò",
      image:
        "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_26_638418715174070559_pho-bo-anh-dai-dien.jpg",
      price: 65000,
      rating: 4.8,
      description:
        "Phở bò truyền thống Hà Nội với nước dùng ninh xương bò 12 tiếng, thịt bò tái mềm, bánh phở tươi dai, ăn kèm rau thơm",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Bún Chả Hà Nội",
      image:
        "https://top10tphcm.com/wp-content/uploads/2021/01/Quan-bun-cha-ha-noi-o-TPHCM.jpg",
      price: 55000,
      rating: 4.9,
      description:
        "Bún chả Hà Nội chính gốc với chả nướng thơm lừng, thịt ba chỉ nướng giòn, nước mắm chua ngọt đậm đà, ăn kèm bún tươi và rau sống",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Cơm Tấm Sườn Bì Chả",
      image:
        "https://hawonkoo.vn/medias/thumbs/74/images-2023-10-cach-lam-com-tam-suon-bi-cha-ngon-chuan-vi-sai-gon-1-1200x0.jpg.webp",
      price: 45000,
      rating: 4.7,
      description:
        "Cơm tấm Sài Gòn truyền thống với sườn nướng mềm thơm, bì giòn, chả trứng béo ngậy, nước mắm chua ngọt, ăn kèm dưa leo",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Hủ Tiếu Nam Vang",
      image:
        "https://vietair.com.vn/Media/Images/vietair/Tin-tuc/2024/3/hu-tieu-nam-vang-1.jpg?p=1&w=412",
      price: 50000,
      rating: 4.6,
      description:
        "Hủ tiếu Nam Vang đậm đà với tôm tươi, thịt băm, gan, nước dùng ngọt từ xương heo, bánh hủ tiếu dai mềm",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Bánh Mì Thịt Đặc Biệt",
      image:
        "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/banh_mi_cuon_thit_nguoi_01_4f4804ebe8.jpg",
      price: 25000,
      rating: 4.8,
      description:
        "Bánh mì Việt Nam với vỏ giòn ruột mềm, pate gan, jambon, thịt nguội, dưa chua, rau thơm, tương ớt đặc trưng",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Gỏi Cuốn Tôm Thịt",
      image:
        "https://cdn.tgdd.vn/2021/08/CookRecipe/Avatar/goi-cuon-tom-thit-thumbnail-1.jpg",
      price: 35000,
      rating: 4.7,
      description:
        "Gỏi cuốn tươi mát với tôm luộc, thịt heo, bún tươi, rau sống cuốn trong bánh tráng, chấm tương đậu phộng béo ngậy",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Nem Rán Hà Nội",
      image:
        "https://cdn.tgdd.vn/2022/10/CookDish/cach-lam-mon-nem-ran-thom-ngon-chuan-vi-don-gian-tai-nha-avt-1200x676.jpg",
      price: 40000,
      rating: 4.6,
      description:
        "Nem rán giòn rụm với nhân thịt heo, miến, mộc nhĩ, cà rốt, chiên vàng ươm, ăn kèm nước mắm chua ngọt",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Bánh Xèo Miền Trung",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqsWFMXvmPX0yFfioNy98jHAaPF4BpAcIj0w&s",
      price: 45000,
      rating: 4.7,
      description:
        "Bánh xèo giòn tan với nhân tôm, thịt, giá đỗ, cuốn cùng rau sống, chấm nước mắm chua ngọt đặc biệt",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Bánh Cuốn Hà Nội",
      image:
        "https://dakifood.vn/wp-content/uploads/2025/08/Kham-pha-cach-lam-banh-cuon-ngon-chuan-vi-2.jpg",
      price: 35000,
      rating: 4.5,
      description:
        "Bánh cuốn mỏng mịn với nhân thịt heo, mộc nhĩ, hành phi thơm, chấm nước mắm pha, ăn kèm chả lụa",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Bún Bò Huế",
      image:
        "https://file.hstatic.net/200000700229/article/bun-bo-hue-1_da318989e7c2493f9e2c3e010e722466.jpg",
      price: 55000,
      rating: 4.8,
      description:
        "Bún bò Huế cay thơm với nước lèo sả, thịt bò, chả cua, giò heo, ăn kèm rau sống và mắm ruốc",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Trà Sữa Trân Châu Đường Đen",
      image:
        "https://vietsuntravel.com/_next/image?url=https%3A%2F%2Fvietsuntravel.com%2Fassets%2Fuploads%2FTra_sua_duong_den_kem_sua_mon_best_seller_tai_Tiger_Sugar_5aabde44f2.png&w=3840&q=75",
      price: 45000,
      rating: 4.6,
      description:
        "Trà sữa Taiwan với trân châu đường đen dai mềm, trà Oolong thơm, sữa tươi béo ngậy, topping phong phú",
      category: "Nước Uống",
      isAvailable: "đang còn",
    },
    {
      name: "Cà Phê Sữa Đá Hà Nội",
      image:
        "https://file.hstatic.net/1000075078/article/1_dfbd30f9f180406c827d95d77c87704c.jpg",
      price: 30000,
      rating: 4.9,
      description:
        "Cà phê phin truyền thống với cafe rang xay Robusta, sữa đặc ngọt béo, đá lạnh sảng khoái",
      category: "Nước Uống",
      isAvailable: "đang còn",
    },
    {
      name: "Matcha Latte Đá",
      image:
        "https://thuytinhocean.com/wp-content/uploads/2024/12/Gioi-thieu-ve-Matcha-Latte-Kem-Pho-Mai.jpg",
      price: 50000,
      rating: 4.5,
      description:
        "Matcha Nhật Bản cao cấp pha với sữa tươi, vị đắng nhẹ hòa quyện sữa béo, topping kem phô mai mặn",
      category: "Nước Uống",
      isAvailable: "đang còn",
    },
    {
      name: "Trà Đào Cam Sả",
      image:
        "https://www.huongnghiepaau.com/wp-content/uploads/2017/07/tra-dao-cam-sa-ngot-ngao.jpg",
      price: 40000,
      rating: 4.7,
      description:
        "Trà đào ngọt thanh với cam tươi, sả thơm nồng, đào miếng mềm, uống mát lạnh giải nhiệt",
      category: "Nước Uống",
      isAvailable: "đang còn",
    },
    {
      name: "Sinh Tố Bơ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYfgc-r9NnCcpqD3UH68WN0Gdu1VIMH_lOqA&s",
      price: 45000,
      rating: 4.6,
      description:
        "Sinh tố bơ Đà Lạt béo ngậy, xay với sữa tươi không đường, topping hạt điều rang giòn",
      category: "Nước Uống",
      isAvailable: "đang còn",
    },
    {
      name: "Nước Cam Ép Tươi",
      image:
        "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2023/11/7/uong-nuoc-cam-16993504421751885406385.jpg",
      price: 35000,
      rating: 4.5,
      description:
        "Nước cam ép tươi 100% từ cam Canh, ngọt tự nhiên, giàu vitamin C, không đường phụ gia",
      category: "Nước Uống",
      isAvailable: "đang còn",
    },
    {
      name: "Pizza Hải Sản Đặc Biệt",
      image:
        "https://core.afg.vn/uploads/images/pizza-hai-san-keo-soi-tropicana-seafood_11zon.jpg",
      price: 199000,
      rating: 4.4,
      description:
        "Pizza size M với tôm, mực, nghêu, sò điệp tươi, phô mai Mozzarella tan chảy, đế giòn mỏng",
      category: "Thức Ăn Nhanh",
      isAvailable: "đang còn",
    },
    {
      name: "Pizza Bò Phô Mai BBQ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvgTLrN8B9WgxLIncHn4kDyBnDZnnjrFRwg&s",
      price: 189000,
      rating: 4.5,
      description:
        "Pizza size M với bò băm sốt BBQ, hành tây, ớt chuông, phủ phô mai Cheddar và Mozzarella",
      category: "Thức Ăn Nhanh",
      isAvailable: "đang còn",
    },
    {
      name: "Hamburger Bò Úc Nướng",
      image:
        "https://bizweb.dktcdn.net/100/227/495/products/bugger-ba-chi-bo-my.jpg?v=1622432618313",
      price: 65000,
      rating: 4.3,
      description:
        "Burger với thịt bò Úc 100%, phô mai Cheddar tan chảy, xà lách, cà chua, hành tây, sốt đặc biệt",
      category: "Thức Ăn Nhanh",
      isAvailable: "đang còn",
    },
    {
      name: "Gà Rán Giòn Cay",
      image:
        "https://file.hstatic.net/200000700229/article/dui-ga-chien-xu-1_9f961db92a3b4c4ea2b5679eda4fa71a.jpg",
      price: 39000,
      rating: 4.6,
      description:
        "Gà rán 1 miếng tẩm bột giòn rụm, gia vị cay nồng đậm đà, chiên vàng ươm thơm ngon",
      category: "Thức Ăn Nhanh",
      isAvailable: "đang còn",
    },
    {
      name: "Combo Gà Rán 3 Miếng",
      image:
        "https://cdn.dealtoday.vn/img/s280x280/820875fe38324666946bd5bc6d5032a2.jpg?sign=u0AQLE-ND_QA5NvsGFXQRg",
      price: 99000,
      rating: 4.7,
      description:
        "Combo gồm 3 miếng gà giòn, khoai tây chiên lớn, pepsi 390ml, sốt tương ớt và tương cà",
      category: "Thức Ăn Nhanh",
      isAvailable: "đang còn",
    },
    {
      name: "Khoai Tây Chiên Giòn",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjkI1SIJ12tdnMCCxaPs__O6obJkiNCCEYfQ&s",
      price: 35000,
      rating: 4.4,
      description:
        "Khoai tây Đà Lạt cắt múi cau, chiên giòn vàng, rắc muối ớt, ăn kèm tương cà Heinz",
      category: "Thức Ăn Nhanh",
      isAvailable: "đang còn",
    },
    {
      name: "Mì Ý Sốt Bò Bằm",
      image:
        "https://img-global.cpcdn.com/recipes/8c1d026c7fa6d252/1200x630cq80/photo.jpg",
      price: 75000,
      rating: 4.6,
      description:
        "Spaghetti với sốt Bolognese bò băm Úc, cà chua tươi, rượu vang đỏ, rắc phô mai Parmesan",
      category: "Món Ý",
      isAvailable: "đang còn",
    },
    {
      name: "Mì Ý Sốt Kem Gà Nấm",
      image:
        "https://italianis.vn/wp-content/uploads/2022/10/292218711_2277871579043345_1999872384132476230_n.jpg",
      price: 79000,
      rating: 4.5,
      description:
        "Fettuccine với sốt Carbonara béo ngậy, gà phi lê, nấm tươi, kem tươi Pháp, phô mai Parmesan",
      category: "Món Ý",
      isAvailable: "đang còn",
    },
    {
      name: "Lasagna Bò Phô Mai",
      image:
        "https://cdn.tgdd.vn/2020/07/CookRecipe/GalleryStep/thanh-pham-431.jpg",
      price: 89000,
      rating: 4.7,
      description:
        "Lasagna 5 lớp với bò băm, sốt cà chua, phô mai Mozzarella và Parmesan, nướng vàng thơm",
      category: "Món Ý",
      isAvailable: "đang còn",
    },
    {
      name: "Sushi Cá Hồi Tươi",
      image:
        "https://www.lottemart.vn/media/catalog/product/cache/0x0/0/4/0400245520002.jpg.webp",
      price: 129000,
      rating: 4.9,
      description:
        "Set 10 miếng sushi cá hồi Na Uy tươi sống, cơm trộn giấm, wasabi, gừng ngâm, tương Nhật",
      category: "Món Nhật",
      isAvailable: "đang còn",
    },
    {
      name: "Sashimi Cá Ngừ Đại Dương",
      image: "https://cdn.tgdd.vn/2021/04/content/sasi-800x533.jpg",
      price: 159000,
      rating: 4.8,
      description:
        "Sashimi cá ngừ vây xanh tươi sống thái lát mỏng, ăn kèm wasabi, gừng ngâm, tương xì dầu",
      category: "Món Nhật",
      isAvailable: "đang còn",
    },
    {
      name: "Ramen Tonkotsu Chuẩn Nhật",
      image:
        "https://toptentravel.com.vn/Data/Sites/1/media/content/mi-ramen-mon-mi-quoc-dan-cua-nguoi-nhat-2.jpg",
      price: 119000,
      rating: 4.8,
      description:
        "Ramen nước dùng xương heo ninh 18h, mì làm thủ công, thịt xá xíu, trứng lòng đào, hành lá",
      category: "Món Nhật",
      isAvailable: "đang còn",
    },
    {
      name: "Tempura Tôm Rau",
      image:
        "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/bhsht-1757576135809.jpg",
      price: 95000,
      rating: 4.6,
      description:
        "Set tempura 8 miếng gồm tôm, bí ngòi, cà tím, nấm, tẩm bột mỏng chiên giòn, chấm sốt tentsuyu",
      category: "Món Nhật",
      isAvailable: "đang còn",
    },
    {
      name: "Udon Nước Dùng Nóng",
      image:
        "https://store.longphuong.vn/wp-content/uploads/2025/03/cach-nau-mi-udon-sapo.png",
      price: 75000,
      rating: 4.5,
      description:
        "Udon mì dày dai mềm, nước dùng dashi thanh ngọt, tôm tempura, hành lá, ăn kèm wakame",
      category: "Món Nhật",
      isAvailable: "đang còn",
    },
    {
      name: "Lẩu Thái Chua Cay",
      image:
        "https://cdn.zsoft.solutions/poseidon-web/app/media/Kham-pha-am-thuc/06.2023/220623-bi-quyet-lam-lau-Thai-TomYum-buffet-poseidon-03.jpg",
      price: 180000,
      rating: 4.7,
      description:
        "Lẩu Thái Tom Yum với tôm, mực, nấm, sả, ớt, chanh, nước lẩu chua cay đậm đà (2-3 người)",
      category: "Lẩu",
      isAvailable: "đang còn",
    },
    {
      name: "Lẩu Bò Úc Nhúng Giấm",
      image:
        "https://www.lemon8-app.com/seo/image?item_id=7214050770348540417&index=2&sign=abf7ed8dcd1d8f85aad746ae0e9cc610",
      price: 220000,
      rating: 4.8,
      description:
        "Lẩu bò Úc cao cấp với 5 vị bò: ba chỉ, nạc vai, gân, sụn, lưỡi, nhúng giấm thanh mát (2-3 người)",
      category: "Lẩu",
      isAvailable: "đang còn",
    },
    {
      name: "Lẩu Hải Sản Tươi Sống",
      image:
        "https://haisanviet.com.vn/upload_content/lau-thai-tomyum-giang-vo-ba-dinh.jpg",
      price: 250000,
      rating: 4.6,
      description:
        "Lẩu hải sản gồm tôm hùm, cua, ghẹ, mực ống, cá, nghêu, sò điệp tươi sống (2-3 người)",
      category: "Lẩu",
      isAvailable: "đang còn",
    },
    {
      name: "Cơm Chiên Hải Sản Đặc Biệt",
      image:
        "https://i.ytimg.com/vi/usTj_4CfGrA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBPxFasfrjBEOcyU2sfJHPES2Ezew",
      price: 55000,
      rating: 4.5,
      description:
        "Cơm chiên với tôm, mực, nghêu tươi, trứng, hành tây, đậu Hà Lan, xào thơm đều",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Cơm Chiên Dương Châu",
      image:
        "https://daotaobeptruong.vn/wp-content/uploads/2021/02/nguoc-goc.jpg",
      price: 50000,
      rating: 4.4,
      description:
        "Cơm chiên Dương Châu với xá xíu, lạp xưởng, tôm, trứng, rau củ thập cẩm xào thơm",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Bánh Flan Caramen",
      image: "https://atuankhang.vn/wp-content/uploads/2020/05/banh-flan.jpg",
      price: 20000,
      rating: 4.5,
      description:
        "Bánh flan mềm mịn với lớp caramen đắng nhẹ, làm từ trứng gà, sữa tươi, vani thơm",
      category: "Tráng Miệng",
      isAvailable: "đang còn",
    },
    {
      name: "Chè Thái Sầu Riêng",
      image:
        "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/174232/Originals/cach-lam-che-thai-0.png",
      price: 40000,
      rating: 4.6,
      description:
        "Chè Thái với sầu riêng Ri6, thạch dừa, thạch lá nếp, nhãn, nước cốt dừa béo ngậy",
      category: "Tráng Miệng",
      isAvailable: "đang còn",
    },
    {
      name: "Kem Dâu Tây Tươi",
      image:
        "https://nafotech.com/wp-content/uploads/2020/03/yaourt-da%CC%82u-ta%CC%82y.jpg",
      price: 35000,
      rating: 4.4,
      description:
        "Kem dâu tây Đà Lạt tươi nguyên chất, không hương liệu, ăn kèm dâu tươi và sốt chocolate",
      category: "Tráng Miệng",
      isAvailable: "đang còn",
    },
    {
      name: "Kem Socola Bỉ",
      image:
        "https://babyboss.com.vn/img_data/images/kem-gelato-chocolate-cookies-baby-boss.jpg",
      price: 35000,
      rating: 4.5,
      description:
        "Kem chocolate Bỉ đắng 70%, béo mịn, ăn kèm wafer giòn và sốt chocolate đặc",
      category: "Tráng Miệng",
      isAvailable: "đang còn",
    },
    {
      name: "Bánh Donut Phủ Socola",
      image:
        "https://www.lemon8-app.com/seo/image?item_id=7506911583826756113&index=0&sign=c9dfd2720ab203a53162aaf445f1dd51",
      price: 25000,
      rating: 4.3,
      description:
        "Bánh donut mềm xốp phủ chocolate, rắc mè, nhân kem vani béo ngậy bên trong",
      category: "Tráng Miệng",
      isAvailable: "đang còn",
    },
    {
      name: "Sữa Chua Trân Châu Đường Đen",
      image:
        "https://cdn.tgdd.vn/2021/09/CookRecipe/Avatar/sua-chua-mit-thach-la-dua-thumbnail.jpg",
      price: 35000,
      rating: 4.6,
      description:
        "Sữa chua Đà Lạt chua thanh, trân châu đường đen dai mềm, topping thạch dừa",
      category: "Tráng Miệng",
      isAvailable: "đang còn",
    },
    {
      name: "Bánh Chuối Nướng",
      image:
        "https://www.noichienkhongdau.com/wp-content/uploads/2021/12/cach-lam-chuoi-nep-nuong-bang-noi-chien-khong-dau-6.jpg",
      price: 30000,
      rating: 4.5,
      description:
        "Bánh chuối nướng thơm béo với chuối già, nước cốt dừa, nho khô, nướng vàng đều",
      category: "Tráng Miệng",
      isAvailable: "đang còn",
    },
    {
      name: "Bò Kho Bánh Mì",
      image:
        "https://bepxua.vn/wp-content/uploads/2020/08/Bo-kho-banh-mi-ngon.jpg.webp",
      price: 55000,
      rating: 4.7,
      description:
        "Bò kho kho mềm với nước sốt cà chua đặc, cà rốt, sả, ăn kèm bánh mì hoặc bún",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Mì Quảng",
      image: "https://statics.vinpearl.com/mi-quang-12_1628500341.jpg",
      price: 50000,
      rating: 4.6,
      description:
        "Mì Quảng Đà Nẵng với tôm, thịt, trứng cút, bánh tráng nướng, nước lèo vàng ươm",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Cháo Gà Xé Phay",
      image:
        "https://static.hawonkoo.vn/hwk02/images/2023/10/cach-nau-chao-ga-1.jpg",
      price: 40000,
      rating: 4.5,
      description:
        "Cháo gà nấu từ gạo Nàng Nhen, gà ta thả, hành phi, gừng, ăn kèm quẩy giòn",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Xôi Mặn Thập Cẩm",
      image: "https://statics.vinpearl.com/xoi-ga-da-nang-02_1700060890.jpg",
      price: 30000,
      rating: 4.4,
      description:
        "Xôi nếp dẻo với gà xé, chả lụa, giò, pate, hành phi, nước tương đặc biệt",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Bánh Bao Nhân Thịt",
      image:
        "https://cdn.tgdd.vn/2021/11/CookDish/cach-lam-banh-bao-nhan-thit-mien-thom-ngon-de-lam-avt-1200x676.jpg",
      price: 18000,
      rating: 4.3,
      description:
        "Bánh bao trắng mềm xốp với nhân thịt heo, trứng cút, nấm hương thơm ngon",
      category: "Món Việt",
      isAvailable: "đang còn",
    },
    {
      name: "Bánh Tráng Trộn Sài Gòn",
      image:
        "https://giavichinsu.com/wp-content/uploads/2025/07/cach-lam-banh-trang-tron-cay-2.jpg",
      price: 25000,
      rating: 4.5,
      description:
        "Bánh tráng trộn với tôm khô, trứng cút, mắm ruốc, tỏi phi, rau thơm, ăn vặt đặc trưng",
      category: "Ăn Vặt",
      isAvailable: "đang còn",
    },
  ];
  for (const food of foodData) {
    await prisma.food.create({ data: food });
  }

  console.log("✅ Seed dữ liệu Food hoàn tất!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
